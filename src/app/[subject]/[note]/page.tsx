import { getNoteContent, getSubjects, getNotes } from '@/lib/notes'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    subject: string
    note: string
  }>
}

export default async function NotePage({ params }: PageProps) {
  const { subject, note } = await params
  const content = await getNoteContent(subject, note)

  if (!content) {
    notFound()
  }

  return (
    <>
      <div className="min-h-screen p-8 transition-colors duration-500">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center border-black/10 dark:border-white/10 pb-8">
            <div className="relative bg-[#9d6381] text-4xl md:text-5xl font-bold capitalize mb-4 ">
              {note.replace(/-/g, ' ')}
              <span className='absolute -bottom-5 left-0 w-full h-[2px] bg-black dark:bg-white'></span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-[var(--accent)] prose-a:text-[var(--accent-2)]">
            {/* Direct HTML rendering as requested */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
    const subjects = await getSubjects()
    let params: { subject: string, note: string }[] = []
    
    for (const subject of subjects) {
        const notes = await getNotes(subject)
        params = [
            ...params,
            ...notes.map(note => ({
                subject,
                note
            }))
        ]
    }
    
    return params
}
