'use client'

import Link from 'next/link'
import { useState } from 'react'
import { config } from '@/config/client'

const nav = [
  { label: 'Schools', href: '/' },
  { label: 'By Neighbourhood', href: '/neighbourhood/garibaldi-highlands' },
  { label: 'Compare Schools', href: '/compare' },
  { label: 'Catchment Map', href: '/map' },
  { label: 'Neighbourhood Guide', href: config.neighbourhoodGuideUrl, external: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-forest/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="font-display text-base font-semibold text-cream tracking-wide shrink-0">
          Corridor<span className="text-gold">Homes</span>.ca
          <span className="hidden sm:inline text-cream/40 font-normal text-sm ml-2">/ School Guide</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {nav.map((l) => l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-sm text-cream/65 hover:text-gold transition-colors">{l.label}</a>
          ) : (
            <Link key={l.href} href={l.href} className="text-sm text-cream/65 hover:text-gold transition-colors">{l.label}</Link>
          ))}
        </nav>

        <a href={`tel:${config.agentPhone.replace(/\./g, '')}`}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors shrink-0">
          <PhoneIcon /> {config.agentPhone}
        </a>

        <button className="md:hidden text-cream/80 hover:text-gold" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-forest-dark border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          {nav.map((l) => l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-sm text-cream/75 hover:text-gold transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ) : (
            <Link key={l.href} href={l.href} className="text-sm text-cream/75 hover:text-gold transition-colors" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href={`tel:${config.agentPhone.replace(/\./g, '')}`} className="text-sm font-semibold text-gold">{config.agentPhone}</a>
        </div>
      )}
    </header>
  )
}

function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
}
function MenuIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
}
function XIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
}
