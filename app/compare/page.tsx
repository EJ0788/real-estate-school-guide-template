'use client'

import { useState } from 'react'
import Link from 'next/link'
import { schools, type School } from '@/data/schools'
import LeadForm from '@/components/LeadForm'

const MAX = 3

const ROWS: { label: string; render: (s: School) => string }[] = [
  { label: 'Grades', render: (s) => s.grades },
  { label: 'Fraser Rating', render: (s) => s.fraserRating ? `${s.fraserRating}/10` : 'Not ranked' },
  { label: 'French Immersion', render: (s) => s.frenchImmersion ? 'Yes' : 'No' },
  { label: 'Type', render: (s) => s.type.charAt(0).toUpperCase() + s.type.slice(1) },
  { label: 'Programs', render: (s) => s.programs.join(', ') },
  { label: 'Catchment Areas', render: (s) => s.type === 'elementary' ? s.catchmentNeighbourhoods.length + ' neighbourhoods' : 'All of Squamish' },
  { label: 'Phone', render: (s) => s.phone },
]

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug)
        : prev.length >= MAX ? prev
        : [...prev, slug]
    )
  }

  const chosen = selected.map((s) => schools.find((sc) => sc.slug === s)!)

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 md:py-20 relative"
        style={{ background: 'linear-gradient(158deg, #091510 0%, #1B3A2D 55%, #243D2F 100%)' }}
      >
        <div className="absolute inset-0 bg-[rgba(9,21,16,0.35)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <span className="inline-block text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold border border-gold/35 px-3 py-1 rounded-sm mb-6">
            Comparison Tool
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Compare Schools</h1>
          <p className="text-cream/70 text-lg max-w-xl">Select up to {MAX} schools to compare side by side.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        {/* Picker */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-forest">Select up to {MAX} schools</h2>
            <span className="text-sm text-muted">{selected.length}/{MAX} selected</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {schools.map((s) => {
              const on = selected.includes(s.slug)
              const off = !on && selected.length >= MAX
              return (
                <button key={s.slug} onClick={() => toggle(s.slug)} disabled={off}
                  className={`text-left px-3 py-3 rounded-sm border text-sm transition-all ${on ? 'bg-forest text-cream border-forest' : off ? 'bg-cream/50 text-muted/40 border-forest/5 cursor-not-allowed' : 'bg-white text-forest border-forest/15 hover:border-gold/40 hover:bg-gold/5'}`}>
                  <div className="font-medium leading-snug">{s.name}</div>
                  <div className={`text-xs mt-0.5 ${on ? 'text-gold' : 'text-muted'}`}>
                    {s.fraserRating ? `Fraser ${s.fraserRating}/10` : `Grades ${s.grades}`}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Table */}
        {chosen.length >= 2 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 bg-cream border border-forest/10 text-xs font-bold uppercase tracking-widest text-muted w-24 sm:w-36">—</th>
                  {chosen.map((s) => (
                    <th key={s.slug} className="text-left px-2 sm:px-4 py-2 sm:py-3 bg-forest text-cream border border-forest/80">
                      <div className="font-display font-semibold text-base leading-snug">{s.name}</div>
                      <div className="text-gold text-xs font-normal mt-0.5">Grades {s.grades}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/60'}>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs font-bold uppercase tracking-wider text-muted/70 border border-forest/8 align-top">{row.label}</td>
                    {chosen.map((s) => (
                      <td key={s.slug} className="px-2 sm:px-4 py-2 sm:py-3 text-forest border border-forest/8 align-top leading-relaxed">{row.render(s)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-white">
                  <td className="px-4 py-3 border border-forest/8" />
                  {chosen.map((s) => (
                    <td key={s.slug} className="px-4 py-4 border border-forest/8">
                      <Link href={`/school/${s.slug}`} className="text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors">Full profile →</Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-muted border border-dashed border-forest/20 rounded-sm">
            <p className="text-lg font-medium mb-2">Select at least 2 schools to compare</p>
            <p className="text-sm">Use the grid above to pick up to {MAX}.</p>
          </div>
        )}

        <div className="mt-16 max-w-2xl mx-auto">
          <LeadForm headline="Found the Right School? Let's Find the Home." subtext="We'll pull current listings in your target catchment." source="compare-page" />
        </div>
      </div>
    </>
  )
}
