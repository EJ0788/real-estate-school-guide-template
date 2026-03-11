'use client'

import { useState } from 'react'
import { config } from '@/config/client'
import { catchments } from '@/data/catchments'

const SUBMIT_URL = process.env.NEXT_PUBLIC_SUBMIT_URL ?? ''

interface Props {
  headline?: string
  subtext?: string
  defaultNeighbourhood?: string
  source?: string
}

export default function LeadForm({ headline, subtext, defaultNeighbourhood = '', source = 'school-guide' }: Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [neighbourhood, setNeighbourhood] = useState(defaultNeighbourhood)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName || !lastName || !email) return
    setStatus('loading')
    try {
      await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, neighbourhood,
          source: 'Squamish Neighbourhoods Guide 2026',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch { /* show success anyway */ }
    setStatus('success')
  }

  return (
    <div className="bg-forest rounded-sm px-6 py-8 md:px-10 md:py-10">
      {status === 'success' ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 className="font-display text-xl text-cream mb-2">You&apos;re on the list!</h3>
          <p className="text-sm text-cream/65">We&apos;ll send matching listings for your preferred school catchment.</p>
        </div>
      ) : (
        <>
          <h2 className="font-display text-xl md:text-2xl text-cream mb-2 leading-snug">
            {headline ?? config.formHeadline}
          </h2>
          <p className="text-sm text-cream/60 mb-6 leading-relaxed">{subtext ?? config.formSubtext}</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" id="lf-fname" type="text" placeholder="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" required />
              <Field label="Last Name" id="lf-lname" type="text" placeholder="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" required />
            </div>
            <Field label="Email Address" id="lf-email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} autoComplete="email" required />

            <div className="flex flex-col gap-1">
              <label htmlFor="lf-hood" className="text-xs font-semibold text-cream/60 uppercase tracking-widest">
                Target School Catchment <span className="font-normal normal-case opacity-60">(optional)</span>
              </label>
              <select id="lf-hood" value={neighbourhood} onChange={(e) => setNeighbourhood(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-sm px-3 py-3 text-sm text-cream focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="">Any neighbourhood</option>
                {catchments.map((c) => (
                  <option key={c.neighbourhoodSlug} value={c.neighbourhoodName} className="text-ink bg-white">
                    {c.neighbourhoodName} → {c.elementaryName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-gold hover:bg-gold-hover disabled:opacity-60 text-ink font-bold text-sm uppercase tracking-wider py-4 rounded-sm transition-colors flex items-center justify-center gap-2 mt-1">
              {status === 'loading' ? <><Spinner />Sending…</> : <>Get Listings by School<ArrowIcon /></>}
            </button>
            <p className="text-xs text-cream/35 text-center leading-relaxed">We respect your privacy. Unsubscribe anytime.</p>
          </form>
        </>
      )}
    </div>
  )
}

function Field({ label, id, type, placeholder, value, onChange, autoComplete, required }: {
  label: string; id: string; type: string; placeholder: string
  value: string; onChange: (v: string) => void; autoComplete?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-cream/60 uppercase tracking-widest">{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete} required={required}
        className="w-full bg-white/10 border border-white/20 rounded-sm px-3 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />
    </div>
  )
}

function ArrowIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
}
function Spinner() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin" aria-hidden="true"><circle cx="12" cy="12" r="9" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" /></svg>
}
