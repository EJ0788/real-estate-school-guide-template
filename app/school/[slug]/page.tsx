import { notFound } from 'next/navigation'
import Link from 'next/link'
import { schools, getSchool } from '@/data/schools'
import { catchments } from '@/data/catchments'
import LeadForm from '@/components/LeadForm'
import SchoolCard from '@/components/SchoolCard'

export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSchool(slug)
  if (!s) return {}
  return {
    title: `${s.name} | Squamish School Guide`,
    description: `${s.name} serves grades ${s.grades} in Squamish, BC. ${s.fraserRating ? `Fraser Institute rating: ${s.fraserRating}/10.` : ''} ${s.frenchImmersion ? 'French Immersion available.' : ''}`,
  }
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSchool(slug)
  if (!s) notFound()

  const neighbourhoodCatchments = catchments.filter((c) => c.elementarySlug === s.slug)
  const related = schools.filter((r) => r.slug !== s.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section
        className="py-14 md:py-20 lg:py-28 relative"
        style={{ background: 'linear-gradient(158deg, #091510 0%, #1B3A2D 55%, #243D2F 100%)' }}
      >
        <div className="absolute inset-0 bg-[rgba(9,21,16,0.35)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream/50 hover:text-gold transition-colors mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Schools
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold border border-gold/35 px-3 py-1 rounded-sm">
              Grades {s.grades}
            </span>
            {s.type === 'independent' ? (
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold bg-gold/15 px-3 py-1 rounded-sm">
                Independent School
              </span>
            ) : s.fraserRating ? (
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-cream/60 border border-white/20 px-3 py-1 rounded-sm">
                Fraser {s.fraserRating}/10
              </span>
            ) : null}
            {s.frenchImmersion && (
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-gold bg-gold/15 px-3 py-1 rounded-sm">
                French Immersion
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{s.name}</h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">{s.description}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-forest">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap gap-x-4 sm:gap-x-10 gap-y-2">
          <Stat label="Grades" value={s.grades} />
          {s.type === 'independent' ? (
            <Stat label="Enrollment" value="Open — Tuition-Based" />
          ) : (
            <Stat label="Fraser Rating" value={s.fraserRating ? `${s.fraserRating}/10` : 'Not Ranked'} />
          )}
          <Stat label="French Immersion" value={s.frenchImmersion ? 'Yes' : 'No'} />
          <Stat label="Type" value={s.type === 'independent' ? 'Independent' : s.type.charAt(0).toUpperCase() + s.type.slice(1)} />
          {neighbourhoodCatchments.length > 0 && (
            <Stat label="Catchment Areas" value={String(neighbourhoodCatchments.length)} />
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left col */}
          <div className="lg:col-span-2 flex flex-col gap-12">

            {/* Programs */}
            <div>
              <SectionLabel>Programs &amp; Features</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {s.programs.map((p) => (
                  <span key={p} className="text-sm text-forest bg-forest/8 border border-forest/15 px-3 py-1.5 rounded-sm">{p}</span>
                ))}
              </div>
            </div>

            {/* Principal note */}
            {s.principalNote && (
              <div className="bg-gold/10 border-l-4 border-gold rounded-sm p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gold mb-2">Agent&apos;s Note</p>
                <p className="text-sm text-ink leading-relaxed">{s.principalNote}</p>
              </div>
            )}

            {/* Catchment neighbourhoods — only for SD48 elementaries */}
            {neighbourhoodCatchments.length > 0 && (
              <div>
                <SectionLabel>Catchment Neighbourhoods</SectionLabel>
                <p className="text-sm text-muted mb-5 leading-relaxed">
                  These neighbourhoods feed into {s.name}. Buying within these boundaries guarantees your children attend this school.
                </p>
                <div className="flex flex-col gap-2">
                  {neighbourhoodCatchments.map((c) => (
                    <Link key={c.neighbourhoodSlug} href={`/neighbourhood/${c.neighbourhoodSlug}`}
                      className="group flex items-center justify-between bg-white border border-forest/10 hover:border-gold/40 rounded-sm px-4 py-3 transition-all">
                      <span className="text-sm font-medium text-forest group-hover:text-forest">{c.neighbourhoodName}</span>
                      {c.notes && <span className="text-xs text-muted hidden sm:block max-w-xs text-right">{c.notes}</span>}
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-muted mt-3 italic">
                  Always confirm your specific address with <a href="https://www.sd48seatosky.org" target="_blank" rel="noopener noreferrer" className="underline">SD48 Sea to Sky</a> before purchasing.
                </p>
              </div>
            )}

            {/* For middle + secondary, note they serve everyone */}
            {(s.type === 'middle' || s.type === 'secondary') && (
              <div className="bg-forest/5 border border-forest/15 rounded-sm p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-forest mb-2">District-Wide</p>
                <p className="text-sm text-muted leading-relaxed">
                  {s.name} serves all of Squamish — no catchment boundaries apply. Every student in Squamish attends this school for grades {s.grades}.
                </p>
              </div>
            )}

            {/* For independent schools, explain open enrollment */}
            {s.type === 'independent' && (
              <div className="bg-gold/8 border border-gold/25 rounded-sm p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gold mb-2">Open Enrollment</p>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {s.name} is an independent, tuition-based school. There is no SD48 catchment boundary — families from any Squamish neighbourhood may apply regardless of where they live.
                </p>
                {s.philosophy && (
                  <p className="text-sm text-ink leading-relaxed font-medium">{s.philosophy}</p>
                )}
                <p className="text-xs text-muted mt-3">Contact the school directly for current tuition rates, registration timelines, and bursary information.</p>
              </div>
            )}

            {/* Contact */}
            <div>
              <SectionLabel>School Contact</SectionLabel>
              <div className="flex flex-col gap-2">
                <div className="text-sm text-muted">{s.address}</div>
                <a href={`tel:${s.phone.replace(/-/g, '')}`} className="text-sm font-semibold text-forest hover:text-gold transition-colors">{s.phone}</a>
                <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-forest hover:text-gold transition-colors">School Website →</a>
              </div>
            </div>
          </div>

          {/* Right col — sticky form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm
                headline={s.type === 'independent' ? `Find a Home Near ${s.shortName}` : `Find Homes in the ${s.name} Catchment`}
                subtext={s.type === 'independent' ? "Tell us your target neighbourhood and we'll send matching listings." : "We'll send listings in this school zone as they come to market."}
                defaultNeighbourhood={neighbourhoodCatchments[0]?.neighbourhoodName ?? ''}
                source={`school-${s.slug}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related schools */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-forest mb-8">Other Squamish Schools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => <SchoolCard key={r.slug} s={r} />)}
          </div>
          <Link href="/" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-forest hover:text-gold transition-colors">
            ← View all schools
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
