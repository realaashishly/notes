import Link from 'next/link'
import { getAllNotes } from '@/lib/notes'
import { FuturistCard } from '@/components/ui/FuturistCard'

export default async function Home() {
  const notes = await getAllNotes()

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--deep-bg)] text-white selection:bg-[var(--neon-cyan)] selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--neon-purple)] rounded-full blur-[120px] opacity-20 animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--neon-cyan)] rounded-full blur-[120px] opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        <header className="py-24 md:py-32 text-center">
            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter flex flex-col items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 filter drop-shadow-2xl">
                FUTURE
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-blue)] to-[var(--neon-purple)]">
                NOTES
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide border-t border-white/10 pt-8 mt-8">
              Curated knowledge for the next generation of builders.
            </p>
        </header>
        
        <section className="mt-12 backdrop-blur-sm bg-black/20 rounded-3xl p-8 border border-white/5">
            <div className="flex items-center justify-between mb-12">
                 <h2 className="text-3xl font-bold flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-[var(--neon-cyan)] rounded-full shadow-[0_0_15px_var(--neon-cyan)]"/>
                    Latest Archives
                 </h2>
                 <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 ml-8" />
            </div>

          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-20 font-mono">No data streams found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note, index) => (
                <FuturistCard 
                    key={note.path}
                    href={note.path}
                    title={note.note.replace(/-/g, ' ')}
                    subtitle={note.subject}
                    index={index}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
