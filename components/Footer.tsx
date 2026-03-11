import Link from 'next/link'
import { config } from '@/config/client'

const resources = [
  { label: 'BC Student Success', href: 'https://studentsuccess.gov.bc.ca/schools/in-school-district/048' },
  { label: 'SD48 Sea to Sky', href: 'https://www.sd48seatosky.org' },
  { label: 'Parent Advisory Councils', href: 'https://www.sd48seatosky.org/parents' },
  { label: 'r/Squamish', href: 'https://www.reddit.com/r/Squamish/' },
]

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <div className="font-display text-base font-semibold text-cream/80 mb-1">
              Corridor<span className="text-gold">Homes</span>.ca
            </div>
            <div className="text-xs text-cream/40 mb-4">{config.agentName} · {config.agentTitle}</div>
            <div className="flex flex-col gap-1.5">
              <a href={`tel:${config.agentPhone.replace(/\./g, '')}`} className="text-sm text-cream/50 hover:text-gold transition-colors">{config.agentPhone}</a>
              <a href={`mailto:${config.agentEmail}`} className="text-sm text-cream/50 hover:text-gold transition-colors">{config.agentEmail}</a>
              <a href={config.mainSiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/50 hover:text-gold transition-colors">corridorhomes.ca</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <Link href="/" className="text-sm text-cream/45 hover:text-gold transition-colors">All Schools</Link>
            <Link href="/compare" className="text-sm text-cream/45 hover:text-gold transition-colors">Compare Schools</Link>
            <Link href="/map" className="text-sm text-cream/45 hover:text-gold transition-colors">Catchment Map</Link>
            <a href={config.neighbourhoodGuideUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-cream/45 hover:text-gold transition-colors">Neighbourhood Guide</a>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-cream/30 mb-3">Community Resources</p>
            <div className="flex flex-col gap-2">
              {resources.map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-cream/45 hover:text-gold transition-colors">{r.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.07] text-xs text-cream/25 leading-relaxed">
          © {new Date().getFullYear()} CorridorHomes.ca. School data sourced from SD48 Sea to Sky and Fraser Institute {config.marketYear}.
          Catchment boundaries are approximate — always confirm with SD48 before purchasing.
          {config.agentName} is a licensed REALTOR® with {config.agentTitle.replace('REALTOR® | ', '')} Squamish/Whistler.
        </div>
      </div>
    </footer>
  )
}
