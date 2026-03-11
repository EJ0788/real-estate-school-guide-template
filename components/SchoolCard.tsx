import Link from 'next/link'
import type { School } from '@/data/schools'

export default function SchoolCard({ s }: { s: School }) {
  const ratingColor = !s.fraserRating
    ? 'text-muted'
    : s.fraserRating >= 6
    ? 'text-forest'
    : s.fraserRating >= 5.5
    ? 'text-forest/80'
    : 'text-muted'

  return (
    <Link
      href={`/school/${s.slug}`}
      className="group bg-white rounded-sm border border-forest/10 hover:border-gold/40 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
    >
      <div className="h-1 bg-gold w-full" />
      <div className="p-6 flex flex-col flex-1 gap-4">

        {/* Grade badge + name */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-forest leading-snug group-hover:text-forest">
              {s.name}
            </h3>
            <p className="text-xs text-muted mt-0.5">Grades {s.grades}</p>
          </div>
          <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-sm whitespace-nowrap shrink-0 mt-0.5">
            {s.grades}
          </span>
        </div>

        {/* Fraser rating */}
        <div className="flex items-center gap-3">
          <div className={`font-display text-2xl font-bold ${ratingColor}`}>
            {s.fraserRating ? `${s.fraserRating}/10` : 'N/R'}
          </div>
          <div className="text-xs text-muted leading-tight">
            Fraser Institute<br />Rating {!s.fraserRating && '(not ranked)'}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {s.frenchImmersion && (
            <span className="text-xs font-semibold text-forest bg-forest/8 border border-forest/15 px-2 py-0.5 rounded-sm">
              French Immersion
            </span>
          )}
          <span className="text-xs text-muted bg-cream border border-forest/8 px-2 py-0.5 rounded-sm capitalize">
            {s.type}
          </span>
          <span className="text-xs text-muted bg-cream border border-forest/8 px-2 py-0.5 rounded-sm">
            {s.catchmentNeighbourhoods.length} {s.type === 'secondary' || s.type === 'middle' ? 'areas' : 'catchment area(s)'}
          </span>
        </div>

        {/* Description preview */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 flex-1">
          {s.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-forest/60 group-hover:text-gold transition-colors mt-auto pt-2">
          View school profile
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
