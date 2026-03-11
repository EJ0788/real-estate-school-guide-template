import Link from 'next/link'
import type { Metadata } from 'next'
import { catchments } from '@/data/catchments'
import { schools } from '@/data/schools'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Squamish School Catchment Map | CorridorHomes.ca',
  description: 'Visual guide to every Squamish school catchment area — see which neighbourhood feeds which elementary school.',
}

// Group catchments by elementary school
const grouped = schools
  .filter((s) => s.type === 'elementary')
  .map((s) => ({
    school: s,
    areas: catchments.filter((c) => c.elementarySlug === s.slug),
  }))

const COLOURS = [
  { bg: 'bg-forest', text: 'text-cream', border: 'border-forest', light: 'bg-forest/8' },
  { bg: 'bg-[#2D5A3D]', text: 'text-cream', border: 'border-[#2D5A3D]', light: 'bg-[#2D5A3D]/8' },
  { bg: 'bg-[#1A4A35]', text: 'text-cream', border: 'border-[#1A4A35]', light: 'bg-[#1A4A35]/8' },
  { bg: 'bg-[#3A6B4A]', text: 'text-cream', border: 'border-[#3A6B4A]', light: 'bg-[#3A6B4A]/8' },
  { bg: 'bg-[#4A7A5A]', text: 'text-cream', border: 'border-[#4A7A5A]', light: 'bg-[#4A7A5A]/8' },
  { bg: 'bg-gold', text: 'text-ink', border: 'border-gold', light: 'bg-gold/8' },
]

export default function MapPage() {
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
            Catchment Map
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Squamish School Catchment Areas
          </h1>
          <p className="text-cream/70 text-lg max-w-xl">
            Every neighbourhood colour-coded by elementary school catchment. Click any school or neighbourhood for the full profile.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gold/10 border-b border-gold/20 px-5 py-3">
        <p className="text-xs text-ink/70 text-center max-w-3xl mx-auto">
          <strong className="text-forest">Important:</strong> This map is a visual guide only. Boundaries are approximate.
          Always confirm with <a href="https://www.sd48seatosky.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest">SD48 Sea to Sky</a> before purchasing.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">

        {/* Legend */}
        <div className="mb-12">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">Catchment Legend</p>
          <div className="w-11 h-0.5 bg-gold mb-6" aria-hidden="true" />
          <div className="flex flex-wrap gap-3">
            {grouped.map((g, i) => {
              const c = COLOURS[i % COLOURS.length]
              return (
                <Link key={g.school.slug} href={`/school/${g.school.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm border ${c.border} ${c.light} hover:opacity-80 transition-opacity`}>
                  <span className={`w-3 h-3 rounded-sm ${c.bg} shrink-0`} aria-hidden="true" />
                  <span className="text-sm font-medium text-forest">{g.school.shortName}</span>
                  <span className="text-xs text-muted">{g.school.name.replace(g.school.shortName, '').trim()}</span>
                  {g.school.fraserRating && <span className="text-xs font-bold text-gold">{g.school.fraserRating}/10</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Visual catchment grid — grouped by school */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {grouped.map((g, i) => {
            const c = COLOURS[i % COLOURS.length]
            return (
              <div key={g.school.slug} className={`rounded-sm border-2 ${c.border} overflow-hidden`}>
                {/* School header */}
                <Link href={`/school/${g.school.slug}`} className={`block ${c.bg} px-5 py-4 hover:opacity-90 transition-opacity`}>
                  <div className={`flex items-start justify-between gap-2 ${c.text}`}>
                    <div>
                      <div className="font-display font-semibold text-base leading-snug">{g.school.name}</div>
                      <div className="text-xs opacity-70 mt-0.5">Grades {g.school.grades}</div>
                    </div>
                    <div className="text-right shrink-0">
                      {g.school.fraserRating ? (
                        <div className="font-display font-bold text-xl">{g.school.fraserRating}</div>
                      ) : (
                        <div className="text-xs opacity-60">N/R</div>
                      )}
                      {g.school.frenchImmersion && (
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">FI</div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Neighbourhood list */}
                <div className="bg-white">
                  {g.areas.length > 0 ? g.areas.map((area) => (
                    <Link key={area.neighbourhoodSlug} href={`/neighbourhood/${area.neighbourhoodSlug}`}
                      className="flex items-center justify-between px-5 py-3 border-b border-forest/6 hover:bg-cream transition-colors last:border-0">
                      <span className="text-sm text-forest font-medium">{area.neighbourhoodName}</span>
                      <div className="flex items-center gap-2">
                        {area.frenchImmersionAvailable && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-forest/10 px-1.5 py-0.5 rounded-sm">FI</span>
                        )}
                        {area.notes && <span className="text-xs text-muted hidden lg:block max-w-[120px] text-right truncate">{area.notes.split('.')[0]}</span>}
                      </div>
                    </Link>
                  )) : (
                    <p className="px-5 py-3 text-sm text-muted italic">No catchment boundaries — serves all of Squamish</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Middle + Secondary — district-wide */}
        <div className="mb-16">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">District-Wide Schools</p>
          <div className="w-11 h-0.5 bg-gold mb-6" aria-hidden="true" />
          <p className="text-muted text-sm leading-relaxed max-w-xl mb-6">
            These two schools serve every Squamish neighbourhood — no catchment boundaries, no purchasing decisions required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schools.filter((s) => s.type !== 'elementary').map((s) => (
              <Link key={s.slug} href={`/school/${s.slug}`}
                className="group flex items-center justify-between bg-white border border-forest/10 hover:border-gold/40 rounded-sm px-5 py-4 transition-all">
                <div>
                  <div className="font-display text-base font-semibold text-forest">{s.name}</div>
                  <div className="text-xs text-muted mt-0.5">Grades {s.grades} · All Squamish neighbourhoods{s.frenchImmersion ? ' · FI' : ''}</div>
                </div>
                <span className="text-xs font-bold text-gold group-hover:text-gold transition-colors">View →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Lead form */}
        <div className="max-w-2xl mx-auto">
          <LeadForm
            headline="Find a Home in Your Target Catchment"
            subtext="Tell us the school zone and we'll send matching listings."
            source="map-page"
          />
        </div>
      </div>
    </>
  )
}
