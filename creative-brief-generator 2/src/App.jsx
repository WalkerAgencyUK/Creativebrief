import React, { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Copy, RefreshCw, Sparkles, Printer, Share2, ArrowRight, CheckCircle2 } from 'lucide-react'

function tidy(s) {
  if (!s) return ''
  const x = s.trim()
  return x.charAt(0).toUpperCase() + x.slice(1)
}

function downloadFile(filename, text) {
  const element = document.createElement('a')
  const file = new Blob([text], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
  element.remove()
}

const Card = ({ className = '', children }) => (
  <div className={`rounded-2xl shadow-sm border border-neutral-200 bg-white ${className}`}>{children}</div>
)

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-neutral-700 mb-2">{children}</label>
)

const Input = (props) => (
  <input {...props} className={`w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-[#FF4778]/20 focus:border-[#FF4778] ${props.className||''}`} />
)

const TextArea = (props) => (
  <textarea {...props} className={`w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-[#FF4778]/20 focus:border-[#FF4778] ${props.className||''}`} />
)

const Select = (props) => (
  <select {...props} className={`w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-[#FF4778]/20 focus:border-[#FF4778] ${props.className||''}`} />
)

const Small = ({children}) => (
  <p className="text-xs text-neutral-500 leading-relaxed">{children}</p>
)

export default function App() {
  const [data, setData] = useState({
    projectTitle: '',
    projectType: 'Campaign',
    brand: '',
    requester: '',
    dateDue: '',
    budget: '',
    background: '',
    currentSituation: '',
    keyChallenge: '',
    audience: '',
    audienceSecondary: '',
    audienceInsight: '',
    audienceBarriers: '',
    desiredBehaviour: '',
    commercialObjective: '',
    commsObjective: '',
    singleMindedProp: '',
    reasonToBelieve: '',
    toneOfVoice: 'Confident and friendly',
    mandatories: '',
    primaryChannels: '',
    deliverables: '',
    timings: '',
    brandAssets: '',
    approvals: '',
    measurement: '',
    legal: '',
  })

  const formRef = useRef(null)

  const concise = useMemo(() => {
    const GET = data.desiredBehaviour || data.commsObjective || 'drive action'
    const WHO = data.audience || 'the target audience'
    const TO = data.commercialObjective || data.desiredBehaviour || 'do the thing we need'
    const BY = data.singleMindedProp || data.reasonToBelieve || 'showing how we solve their problem'

    return `Get ${tidy(WHO)} who ${data.audienceInsight ? data.audienceInsight.trim() : 'we know share this insight'} to ${tidy(TO)} by ${tidy(BY)}.`
  }, [data])

  const longform = useMemo(() => {
    return (
`PROJECT: ${data.projectTitle || 'Untitled'}
BRAND: ${data.brand || ''}
TYPE: ${data.projectType}
REQUESTER: ${data.requester || ''}
DUE: ${data.dateDue || ''}
BUDGET: ${data.budget || ''}

BACKGROUND
${data.background || '—'}

CURRENT SITUATION
${data.currentSituation || '—'}

KEY CHALLENGE
${data.keyChallenge || '—'}

AUDIENCE
Primary: ${data.audience || '—'}
Secondary: ${data.audienceSecondary || '—'}
Insight (WHO): ${data.audienceInsight || '—'}
Barriers: ${data.audienceBarriers || '—'}

OBJECTIVES
Commercial: ${data.commercialObjective || '—'}
Comms: ${data.commsObjective || '—'}
Desired behaviour (GET/TO): ${data.desiredBehaviour || '—'}

PROPOSITION
Single‑minded proposition (BY): ${data.singleMindedProp || '—'}
Reasons to believe: ${data.reasonToBelieve || '—'}
Tone of voice: ${data.toneOfVoice || '—'}
Mandatories: ${data.mandatories || '—'}

CHANNELS & DELIVERABLES
Primary channels: ${data.primaryChannels || '—'}
Deliverables: ${data.deliverables || '—'}
Timings & milestones: ${data.timings || '—'}

PRACTICALS
Brand/assets: ${data.brandAssets || '—'}
Approvals: ${data.approvals || '—'}
Measurement (success): ${data.measurement || '—'}
Legal/compliance: ${data.legal || '—'}
`)
  }, [data])

  const resetForm = () => {
    if (!formRef.current) return
    formRef.current.reset()
    setData({
      projectTitle: '',
      projectType: 'Campaign',
      brand: '',
      requester: '',
      dateDue: '',
      budget: '',
      background: '',
      currentSituation: '',
      keyChallenge: '',
      audience: '',
      audienceSecondary: '',
      audienceInsight: '',
      audienceBarriers: '',
      desiredBehaviour: '',
      commercialObjective: '',
      commsObjective: '',
      singleMindedProp: '',
      reasonToBelieve: '',
      toneOfVoice: 'Confident and friendly',
      mandatories: '',
      primaryChannels: '',
      deliverables: '',
      timings: '',
      brandAssets: '',
      approvals: '',
      measurement: '',
      legal: '',
    })
  }

  const handle = (e) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: value }))
  }

  const [copied, setCopied] = useState(false)
  const copyOut = async () => {
    const text = `${concise}\n\n${longform}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF7FA] text-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF4778] text-white grid place-items-center font-bold" aria-hidden>W</div>
            <div className="leading-tight">
              <p className="text-sm tracking-wide text-neutral-500">Creative Brief</p>
              <h1 className="text-lg font-semibold">GET · WHO · TO · BY Generator</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => downloadFile(`${data.projectTitle||'creative-brief'}.txt`, `${concise}\n\n${longform}`)} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm hover:shadow">
              <Download className="w-4 h-4" aria-hidden/> Export .txt
            </button>
            <button onClick={copyOut} className="inline-flex items-center gap-2 rounded-xl bg-[#FF4778] text-white px-3 py-2 text-sm shadow hover:opacity-90">
              {copied ? <CheckCircle2 className="w-4 h-4" aria-hidden/> : <Copy className="w-4 h-4" aria-hidden/>}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.4}}>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-white to-[#FFE4EE]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug">Brief smart. Create boldly.</h2>
                <p className="mt-3 text-neutral-600">Fill in the essentials once. Hand a crystal‑clear brief to your creative or production teams. Written in simple UK English, designed to be used on any project.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs border border-neutral-200"><Sparkles className="w-3 h-3" aria-hidden/> Succinct GET/WHO/TO/BY</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs border border-neutral-200"><Printer className="w-3 h-3" aria-hidden/> Export‑ready</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs border border-neutral-200"><Share2 className="w-3 h-3" aria-hidden/> Copy & share</span>
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-[#FFB3C8] bg-white/70 p-4">
                  <p className="text-sm text-neutral-700"><span className="font-semibold">Format preview:</span> <em>Get</em> <span className="text-[#FF4778] font-medium">[WHO]</span> who <span className="text-[#FF4778] font-medium">[INSIGHT]</span> <em>to</em> <span className="text-[#FF4778] font-medium">[DO]</span> <em>by</em> <span className="text-[#FF4778] font-medium">[PROPOSITION]</span>.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-2 gap-8">
        <form ref={formRef} className="space-y-6" onSubmit={(e)=>e.preventDefault()} aria-label="Creative brief form">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project overview</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Project title</Label>
                <Input name="projectTitle" placeholder="e.g. Spring launch – OOH & Social" onChange={handle}/>
              </div>
              <div>
                <Label>Project type</Label>
                <Select name="projectType" defaultValue={data.projectType} onChange={handle}>
                  <option>Campaign</option>
                  <option>Brand</option>
                  <option>Content</option>
                  <option>Digital</option>
                  <option>Social</option>
                  <option>Production</option>
                </Select>
              </div>
              <div>
                <Label>Brand / client</Label>
                <Input name="brand" placeholder="Brand name" onChange={handle}/>
              </div>
              <div>
                <Label>Requester / account lead</Label>
                <Input name="requester" placeholder="Full name" onChange={handle}/>
              </div>
              <div>
                <Label>Date due</Label>
                <Input type="date" name="dateDue" onChange={handle}/>
              </div>
              <div>
                <Label>Budget (approx.)</Label>
                <Input name="budget" placeholder="£ —" onChange={handle}/>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Context & background</h3>
            <div className="grid gap-4">
              <div>
                <Label>Background</Label>
                <TextArea name="background" rows={4} placeholder="Where are we now? What’s happened so far?" onChange={handle}/>
              </div>
              <div>
                <Label>Current situation</Label>
                <TextArea name="currentSituation" rows={3} placeholder="Market, competitors, trends, internal context" onChange={handle}/>
              </div>
              <div>
                <Label>Key challenge</Label>
                <Input name="keyChallenge" placeholder="The problem to crack in one line" onChange={handle}/>
                <Small>Keep it human and specific.</Small>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Audience (WHO)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Primary audience</Label>
                <Input name="audience" placeholder="Who is this really for?" onChange={handle}/>
              </div>
              <div>
                <Label>Secondary audience (optional)</Label>
                <Input name="audienceSecondary" placeholder="Anyone else who matters" onChange={handle}/>
              </div>
              <div>
                <Label>Audience insight</Label>
                <Input name="audienceInsight" placeholder="What do they think/feel/do right now?" onChange={handle}/>
              </div>
              <div className="md:col-span-2">
                <Label>Main barriers</Label>
                <TextArea name="audienceBarriers" rows={3} placeholder="What stops them acting? Price? Trust? Effort?" onChange={handle}/>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Objectives (GET / TO)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Desired behaviour (GET)</Label>
                <Input name="desiredBehaviour" placeholder="e.g. get lapsed buyers to try again" onChange={handle}/>
              </div>
              <div>
                <Label>Commercial objective</Label>
                <Input name="commercialObjective" placeholder="What business result are we after?" onChange={handle}/>
              </div>
              <div className="md:col-span-2">
                <Label>Comms objective (TO)</Label>
                <Input name="commsObjective" placeholder="What do we want people to think/feel/do?" onChange={handle}/>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Proposition (BY)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Single‑minded proposition</Label>
                <Input name="singleMindedProp" placeholder="The one thought the work must land" onChange={handle}/>
              </div>
              <div>
                <Label>Tone of voice</Label>
                <Select name="toneOfVoice" defaultValue={data.toneOfVoice} onChange={handle}>
                  <option>Confident and friendly</option>
                  <option>Playful and bold</option>
                  <option>Premium and refined</option>
                  <option>Straightforward and practical</option>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Reasons to believe</Label>
                <TextArea name="reasonToBelieve" rows={3} placeholder="Proof points, features, social proof, data" onChange={handle}/>
              </div>
              <div className="md:col-span-2">
                <Label>Mandatories</Label>
                <TextArea name="mandatories" rows={2} placeholder="Logos, lockups, disclaimers, taglines, CTAs" onChange={handle}/>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Channels & deliverables</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Primary channels</Label>
                <Input name="primaryChannels" placeholder="e.g. TikTok, OOH 6‑sheets, CRM" onChange={handle}/>
              </div>
              <div>
                <Label>Deliverables</Label>
                <Input name="deliverables" placeholder="e.g. 6x statics, 2x 10s edits, landing page" onChange={handle}/>
              </div>
              <div className="md:col-span-2">
                <Label>Timings & milestones</Label>
                <TextArea name="timings" rows={2} placeholder="Key dates, dependencies, go‑live" onChange={handle}/>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-3">
              <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm hover:shadow"><RefreshCw className="w-4 h-4" aria-hidden/> Reset</button>
              <a href="#output" className="inline-flex items-center gap-2 rounded-xl bg-[#FF4778] text-white px-4 py-2 text-sm shadow hover:opacity-90"><ArrowRight className="w-4 h-4" aria-hidden/> Jump to output</a>
            </div>
          </Card>
        </form>

        <div id="output" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Succinct Brief</h3>
            <div className="rounded-xl border border-[#FFB3C8] bg-white p-4">
              <p className="text-base leading-relaxed"><span className="font-semibold">GET</span> {tidy(data.audience || 'the target audience')} <span className="text-neutral-500">who</span> {data.audienceInsight || 'share this insight'} <span className="font-semibold">TO</span> {tidy(data.commsObjective || data.desiredBehaviour || 'act')} <span className="font-semibold">BY</span> {tidy(data.singleMindedProp || data.reasonToBelieve || 'showing how we solve their problem')}.</p>
            </div>
            <Small>This sentence interlaces the classic <em>GET/WHO/TO/BY</em> framework so anyone can grasp the job of the work at a glance.</Small>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Full Creative Brief</h3>
            <div className="prose prose-neutral max-w-none">
              <h4 className="mt-0">{data.projectTitle || 'Untitled Project'}</h4>
              <p className="m-0 text-sm text-neutral-500">{[data.brand, data.projectType].filter(Boolean).join(' · ')}</p>
              <hr className="my-4"/>
              <h5>Background</h5>
              <p>{data.background || '—'}</p>
              <h5>Current situation</h5>
              <p>{data.currentSituation || '—'}</p>
              <h5>Key challenge</h5>
              <p>{data.keyChallenge || '—'}</p>

              <h5>Audience</h5>
              <ul>
                <li><strong>Primary:</strong> {data.audience || '—'}</li>
                <li><strong>Secondary:</strong> {data.audienceSecondary || '—'}</li>
                <li><strong>Insight (WHO):</strong> {data.audienceInsight || '—'}</li>
                <li><strong>Barriers:</strong> {data.audienceBarriers || '—'}</li>
              </ul>

              <h5>Objectives</h5>
              <ul>
                <li><strong>Commercial:</strong> {data.commercialObjective || '—'}</li>
                <li><strong>Comms (TO):</strong> {data.commsObjective || '—'}</li>
                <li><strong>Desired behaviour (GET/TO):</strong> {data.desiredBehaviour || '—'}</li>
              </ul>

              <h5>Proposition</h5>
              <ul>
                <li><strong>Single‑minded proposition (BY):</strong> {data.singleMindedProp || '—'}</li>
                <li><strong>Reasons to believe:</strong> {data.reasonToBelieve || '—'}</li>
                <li><strong>Tone of voice:</strong> {data.toneOfVoice || '—'}</li>
                <li><strong>Mandatories:</strong> {data.mandatories || '—'}</li>
              </ul>

              <h5>Channels & deliverables</h5>
              <ul>
                <li><strong>Primary channels:</strong> {data.primaryChannels || '—'}</li>
                <li><strong>Deliverables:</strong> {data.deliverables || '—'}</li>
                <li><strong>Timings & milestones:</strong> {data.timings || '—'}</li>
              </ul>

              <h5>Practicals</h5>
              <ul>
                <li><strong>Brand/assets:</strong> {data.brandAssets || '—'}</li>
                <li><strong>Approvals:</strong> {data.approvals || '—'}</li>
                <li><strong>Measurement:</strong> {data.measurement || '—'}</li>
                <li><strong>Legal/compliance:</strong> {data.legal || '—'}</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Ready to share</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => downloadFile(`${data.projectTitle||'creative-brief'}.txt`, `${concise}\n\n${longform}`)} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm hover:shadow"><Download className="w-4 h-4" aria-hidden/> Export .txt</button>
              <button onClick={copyOut} className="inline-flex items-center gap-2 rounded-xl bg-[#FF4778] text-white px-3 py-2 text-sm shadow hover:opacity-90"><Copy className="w-4 h-4" aria-hidden/> Copy to clipboard</button>
            </div>
          </Card>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-500">
          <p>Built for creative teams. Styled with a soft, confident look inspired by UK agency sites.</p>
        </div>
      </footer>
    </div>
  )
}
