import Link from 'next/link'
import { schools } from '@/data/schools'
import { catchments } from '@/data/catchments'
import { config } from '@/config/client'
import SchoolCard from '@/components/SchoolCard'
import LeadForm from '@/components/LeadForm'

const elementaries = schools.filter((s) => s.type === 'elementary')
const middle = schools.find((s) => s.type === 'middle')!
const secondary = schools.find((s) => s.type === 'secondary')!

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[75svh] flex flex-col justify-center"
        style={{ background: 'linear-gradient(158deg, #091510 0%, #1B3A2D 45%, #243D2F 70%, #0E1E15 100%)' }}
      >
        <div className="absolute inset-0 bg-[rgba(9,21,16,0.4)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(201,168,76,0.07)_0%,transparent_55%)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 text-center">
          <span className="inline-block text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold border border-gold/35 px-3 py-1 rounded-sm mb-6">
            SD48 Sea to Sky · {config.marketYear}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6 max-w-3xl mx-auto">
            {config.heroHeadline}
          </h1>
          <p className="text-cream/75 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {config.heroSubline}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#schools" className="bg-gold hover:bg-gold-hover text-ink font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm transition-colors">
              Explore Schools
            </a>
            <Link href="/map" className="border border-cream/30 hover:border-gold text-cream/80 hover:text-gold text-sm font-medium px-8 py-4 rounded-sm transition-colors">
              View Catchment Map
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-forest">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {[
            { val: '8', lbl: 'Schools covered' },
            { val: '6.1/10', lbl: 'Top Fraser rating (GHE)' },
            { val: 'K–12', lbl: 'Full pathway mapped' },
            { val: 'FI', lbl: 'French Immersion available' },
          ].map((s) => (
            <div key={s.lbl} className="flex items-center gap-2 text-sm text-cream/75">
              <strong className="text-gold font-semibold">{s.val}</strong> {s.lbl}
            </div>
          ))}
        </div>
      </div>

      {/* ── IMPORTANT DISCLAIMER ── */}
      <div className="bg-gold/10 border-b border-gold/20 px-5 py-3">
        <p className="text-xs text-ink/70 text-center max-w-3xl mx-auto">
          <strong className="text-forest">Important:</strong> Catchment boundaries are approximate and subject to change.
          Always confirm your address with <a href="https://www.sd48seatosky.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest">SD48 Sea to Sky</a> before purchasing.
        </p>
      </div>

      {/* ── ELEMENTARY SCHOOLS ── */}
      <section id="schools" className="py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">Elementary Schools</p>
          <div className="w-11 h-0.5 bg-gold mb-5" aria-hidden="true" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-4">Grades K–6</h2>
          <p className="text-muted leading-relaxed max-w-xl mb-12">
            Six elementary schools, each serving a distinct set of Squamish neighbourhoods. Catchment determines which school your child attends — and it significantly influences property values.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {elementaries.map((s, i) => (
              <>
                <SchoolCard key={s.slug} s={s} />
                {i === 2 && (
                  <div key="form" className="sm:col-span-2 lg:col-span-3">
                    <LeadForm
                      headline="Find Homes in Your Preferred School Catchment"
                      subtext="Tell us your target school and we'll send matching listings as they come to market."
                      source="homepage-inline"
                    />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Middle + Secondary */}
          <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">Middle &amp; Secondary</p>
          <div className="w-11 h-0.5 bg-gold mb-5" aria-hidden="true" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-4">Grades 7–12</h2>
          <p className="text-muted leading-relaxed max-w-xl mb-10">
            Both serve all of Squamish — no catchment boundary purchasing decisions required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SchoolCard s={middle} />
            <SchoolCard s={secondary} />
          </div>
        </div>
      </section>

      {/* ── CATCHMENT QUICK REFERENCE ── */}
      <section className="bg-white py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">Quick Reference</p>
          <div className="w-11 h-0.5 bg-gold mb-5" aria-hidden="true" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-4">Neighbourhood → School Lookup</h2>
          <p className="text-muted leading-relaxed max-w-xl mb-10">
            Find your neighbourhood and see exactly which elementary school it feeds, plus the Fraser rating.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {catchments.map((c) => (
              <div key={c.neighbourhoodSlug}
                className="flex items-center justify-between bg-cream border border-forest/10 rounded-sm px-4 py-3 gap-3">
                <div>
                  <Link href={`/neighbourhood/${c.neighbourhoodSlug}`}
                    className="text-sm font-semibold text-forest hover:text-gold transition-colors">
                    {c.neighbourhoodName}
                  </Link>
                  {c.frenchImmersionAvailable && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-forest bg-forest/10 px-1.5 py-0.5 rounded-sm">FI</span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <Link href={`/school/${c.elementarySlug}`}
                    className="text-xs text-muted hover:text-gold transition-colors block">{c.elementaryName}</Link>
                  <span className={`text-xs font-bold ${c.fraserRating && c.fraserRating >= 6 ? 'text-forest' : 'text-muted'}`}>
                    {c.fraserRating ? `Fraser ${c.fraserRating}/10` : 'Not ranked'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted mt-6 italic">
            All students attend <Link href={`/school/don-ross-middle`} className="underline hover:text-forest">Don Ross Middle School</Link> (7–9) and <Link href={`/school/howe-sound-secondary`} className="underline hover:text-forest">Howe Sound Secondary</Link> (10–12) regardless of neighbourhood.
          </p>
        </div>
      </section>

      {/* ── AGENT ── */}
      <section className="py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center font-display text-2xl text-gold shrink-0">EJ</div>
            <div className="max-w-xl">
              <div className="font-display text-xl font-bold text-forest mb-1">{config.agentName}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">{config.agentTitle}</div>
              <p className="text-muted leading-relaxed mb-5">
                Local Squamish REALTOR® who knows every school catchment by name. I help families find homes in exactly the right zone — no guesswork, no boundary surprises.
              </p>
              <div className="flex flex-wrap gap-5">
                <a href={`tel:${config.agentPhone.replace(/\./g, '')}`} className="text-sm font-semibold text-forest hover:text-gold transition-colors">{config.agentPhone}</a>
                <a href={`mailto:${config.agentEmail}`} className="text-sm font-semibold text-forest hover:text-gold transition-colors">{config.agentEmail}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM LEAD FORM ── */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-2xl">
          <LeadForm source="homepage-bottom" />
        </div>
      </section>
    </>
  )
}
