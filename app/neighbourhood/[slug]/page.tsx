import { notFound } from 'next/navigation'
import Link from 'next/link'
import { catchments, type CatchmentEntry } from '@/data/catchments'
import { getSchoolsForNeighbourhood } from '@/data/schools'
import { config } from '@/config/client'
import LeadForm from '@/components/LeadForm'
import SchoolCard from '@/components/SchoolCard'

export function generateStaticParams() {
  return catchments.map((c) => ({ slug: c.neighbourhoodSlug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = catchments.find((c) => c.neighbourhoodSlug === slug)
  if (!c) return {}
  return {
    title: `${c.neighbourhoodName} School Catchment | Squamish School Guide`,
    description: `${c.neighbourhoodName} feeds into ${c.elementaryName} (Fraser ${c.fraserRating ?? 'N/R'}/10). ${c.frenchImmersionAvailable ? 'French Immersion available.' : ''}`,
  }
}

export default async function NeighbourhoodCatchmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const catchment = catchments.find((c) => c.neighbourhoodSlug === slug)
  if (!catchment) notFound()

  const allSchools = getSchoolsForNeighbourhood(slug)
  const elementary = allSchools.find((s) => s.type === 'elementary')
  const middle = allSchools.find((s) => s.type === 'middle')
  const secondary = allSchools.find((s) => s.type === 'secondary')

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 md:py-28 relative"
        style={{ background: 'linear-gradient(158deg, #091510 0%, #1B3A2D 55%, #243D2F 100%)' }}
      >
        <div className="absolute inset-0 bg-[rgba(9,21,16,0.35)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream/50 hover:text-gold transition-colors mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Schools
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            {catchment.fraserRating && (
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold border border-gold/35 px-3 py-1 rounded-sm">
                Fraser {catchment.fraserRating}/10
              </span>
            )}
            {catchment.frenchImmersionAvailable && (
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold bg-gold/15 px-3 py-1 rounded-sm">
                French Immersion
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {catchment.neighbourhoodName}
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl">
            School catchment guide — from Kindergarten through Grade 12.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-forest">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap gap-x-10 gap-y-2">
          <Stat label="Elementary" value={catchment.elementaryName.split(' ').slice(0, 2).join(' ')} />
          <Stat label="Fraser Rating" value={catchment.fraserRating ? `${catchment.fraserRating}/10` : 'N/R'} />
          <Stat label="French Immersion" value={catchment.frenchImmersionAvailable ? 'Available' : 'Not here'} />
          <Stat label="Middle School" value="Don Ross (7–9)" />
          <Stat label="Secondary" value="Howe Sound (10–12)" />
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-12">

            {/* Full K-12 pathway */}
            <div>
              <SectionLabel>K–12 School Pathway</SectionLabel>
              <div className="flex flex-col gap-3">
                {[
                  { grade: 'K–6', school: elementary?.name ?? catchment.elementaryName, slug: elementary?.slug ?? catchment.elementarySlug, note: `Fraser ${catchment.fraserRating ?? 'N/R'}${catchment.frenchImmersionAvailable ? ' · French Immersion' : ''}` },
                  { grade: '7–9', school: 'Don Ross Middle School', slug: 'don-ross-middle', note: 'French Immersion continues here' },
                  { grade: '10–12', school: 'Howe Sound Secondary', slug: 'howe-sound-secondary', note: 'French Immersion graduation pathway' },
                ].map((row) => (
                  <Link key={row.slug} href={`/school/${row.slug}`}
                    className="group flex items-center justify-between bg-white border border-forest/10 hover:border-gold/40 rounded-sm px-5 py-4 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded-sm whitespace-nowrap">{row.grade}</span>
                      <span className="text-sm font-semibold text-forest group-hover:text-forest">{row.school}</span>
                    </div>
                    <span className="text-xs text-muted hidden sm:block">{row.note}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Catchment notes */}
            {catchment.notes && (
              <div className="bg-gold/10 border-l-4 border-gold rounded-sm p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gold mb-2">Local Note</p>
                <p className="text-sm text-ink leading-relaxed">{catchment.notes}</p>
              </div>
            )}

            {/* French Immersion info */}
            {catchment.frenchImmersionAvailable && (
              <div className="bg-forest text-cream rounded-sm p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gold mb-2">French Immersion Pathway</p>
                <p className="text-sm text-cream/85 leading-relaxed mb-3">
                  {catchment.neighbourhoodName} feeds into Squamish Elementary, which offers French Immersion from Kindergarten. The pathway continues seamlessly through Don Ross Middle School (7–9) and Howe Sound Secondary (10–12) — all with FI streams.
                </p>
                <p className="text-xs text-cream/55">Enrolment in FI is not automatic — apply to SD48 by the registration deadline.</p>
              </div>
            )}

            {/* SD48 disclaimer */}
            <div className="border border-forest/15 rounded-sm p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-muted mb-2">Important</p>
              <p className="text-sm text-muted leading-relaxed">
                Catchment boundaries are approximate and subject to change. Always confirm your specific address with{' '}
                <a href="https://www.sd48seatosky.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest">SD48 Sea to Sky</a>{' '}
                before purchasing a property.
              </p>
            </div>

            {/* Resources */}
            <div>
              <SectionLabel>Community Resources</SectionLabel>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'BC Student Success — SD48', href: 'https://studentsuccess.gov.bc.ca/schools/in-school-district/048' },
                  { label: 'SD48 Sea to Sky School District', href: 'https://www.sd48seatosky.org' },
                  { label: 'Parent Advisory Councils', href: 'https://www.sd48seatosky.org/parents' },
                  { label: 'r/Squamish', href: 'https://www.reddit.com/r/Squamish/' },
                ].map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-forest hover:text-gold transition-colors flex items-center gap-1.5">
                    {r.label} <span className="text-muted text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Link to neighbourhood guide */}
            <div className="flex items-center gap-3 p-5 bg-white border border-forest/10 rounded-sm">
              <div className="flex-1">
                <p className="text-sm font-semibold text-forest mb-1">See the full {catchment.neighbourhoodName} neighbourhood profile</p>
                <p className="text-xs text-muted">Prices, commute times, dining, pros/cons, and market insight.</p>
              </div>
              <a href={`${config.neighbourhoodGuideUrl}/neighbourhood/${catchment.neighbourhoodSlug}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors whitespace-nowrap">
                View →
              </a>
            </div>
          </div>

          {/* Right col — sticky form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm
                headline={`Homes in the ${catchment.elementaryName.split(' ').slice(0, 2).join(' ')} Catchment`}
                subtext={`We'll send listings in ${catchment.neighbourhoodName} as they hit the market.`}
                defaultNeighbourhood={catchment.neighbourhoodName}
                source={`catchment-${slug}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other catchments */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-forest mb-8">Explore Other Catchments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {catchments.filter((c) => c.neighbourhoodSlug !== slug).slice(0, 6).map((c) => (
              <Link key={c.neighbourhoodSlug} href={`/neighbourhood/${c.neighbourhoodSlug}`}
                className="group flex items-center justify-between bg-cream hover:bg-gold/5 border border-forest/10 hover:border-gold/30 rounded-sm px-4 py-3 transition-all">
                <span className="text-sm font-medium text-forest">{c.neighbourhoodName}</span>
                <span className="text-xs text-muted">{c.fraserRating ? `Fraser ${c.fraserRating}/10` : 'N/R'}</span>
              </Link>
            ))}
          </div>
          <Link href="/" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-forest hover:text-gold transition-colors">
            ← All schools &amp; catchments
          </Link>
        </div>
      </section>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-gold mb-2">{children}</p>
      <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
    </div>
  )
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-cream/75">
      <strong className="text-gold font-semibold">{value}</strong>
      <span className="ml-1.5">{label}</span>
    </div>
  )
}
