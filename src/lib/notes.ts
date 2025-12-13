import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

export interface NoteItem {
  subject: string
  note: string
  path: string
}

export async function getSubjects(): Promise<string[]> {
  if (!fs.existsSync(contentDir)) {
    return []
  }
  const items = await fs.promises.readdir(contentDir, { withFileTypes: true })
  return items.filter(item => item.isDirectory()).map(item => item.name)
}

export async function getNotes(subject: string): Promise<string[]> {
  const subjectDir = path.join(contentDir, subject)
  if (!fs.existsSync(subjectDir)) {
    return []
  }
  const items = await fs.promises.readdir(subjectDir, { withFileTypes: true })
  return items
    .filter(item => item.isFile() && item.name.endsWith('.mdx'))
    .map(item => item.name.replace('.mdx', ''))
}

export async function getAllNotes(): Promise<NoteItem[]> {
    const subjects = await getSubjects()
    let allNotes: NoteItem[] = []

    for (const subject of subjects) {
        const notes = await getNotes(subject)
        allNotes = [
            ...allNotes,
            ...notes.map(note => ({
                subject,
                note,
                path: `/${subject}/${note}`
            }))
        ]
    }
    return allNotes
}

export async function getNoteContent(subject: string, note: string): Promise<string | null> {
  const notePath = path.join(contentDir, subject, `${note}.mdx`)
  if (!fs.existsSync(notePath)) {
    return null
  }
  return await fs.promises.readFile(notePath, 'utf-8')
}
