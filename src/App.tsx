import { useEffect, useState } from 'react'
import {
  Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Beaker, BrainCircuit,
  Check, ChevronDown, Droplets, HeartPulse, Moon,
  Pill, ShieldCheck, Smartphone, Sparkles, Utensils, Waves, Zap,
} from 'lucide-react'
import Navbar from './components/Navbar'
import SlideDeck, { useSlideNavigation } from './components/SlideDeck'
import SectionIntro from './components/SectionIntro'
import TrendChart from './components/TrendChart'
import { architectureSteps, backgroundCards, demoScenes, intelligenceInputs, intelligenceOutputs, projectStatement, sensorTabs } from './data/siteContent'
import { advisor, team } from './data/team'
import type { DemoSeriesKey } from './data/demoData'

const iconMap = {
  droplet: Droplets, sensor: Activity, wave: Waves, brain: BrainCircuit, phone: Smartphone, heart: HeartPulse,
  meal: Utensils, sport: Activity, sleep: Moon, medicine: Pill,
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function Hero() {
  const { total } = useSlideNavigation()
  return (
    <section className="hero-section" id="top">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="pulse-dot" />{projectStatement.eyebrow}</div>
          <h1>{projectStatement.title[0]}<br /><span>{projectStatement.title[1]}</span></h1>
          <p className="hero-english">{projectStatement.english}</p>
          <p className="hero-descriptor">{projectStatement.descriptor}</p>
          <p className="hero-summary">{projectStatement.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#architecture">探索系统架构 <ArrowRight size={16} /></a>
            <a className="button button-quiet" href="#demo"><span className="play-icon">▶</span>体验交互演示</a>
          </div>
          <div className="hero-points">
            <div><span className="hero-point-icon"><Waves size={17} /></span><span><b>连续感知</b><small>Continuous sensing</small></span></div>
            <div><span className="hero-point-icon"><BrainCircuit size={17} /></span><span><b>智能分析</b><small>Time-series analysis</small></span></div>
            <div><span className="hero-point-icon"><ShieldCheck size={17} /></span><span><b>柔性可穿戴</b><small>Flexible wearable</small></span></div>
          </div>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-art-glow" />
          <div className="hero-art-card">
            <img src="/assets/generated/hero-wearable-exploded.webp" alt="柔性传感贴片概念图" />
          </div>
          <div className="hero-index">01 <span>/ {String(total).padStart(2, '0')}</span></div>
        </div>
      </div>
      <a className="scroll-cue" href="#background"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      <div className="hero-bottom-wave" aria-hidden="true" />
    </section>
  )
}

function Background() {
  return (
    <section className="section section-background" id="background">
      <div className="page-shell">
        <SectionIntro number="02" eyebrow="项目背景" title="血糖监测不应止步于测量" description="关注传统检测在连续性、佩戴体验和数据利用上的局限，探索面向日常管理的柔性可穿戴方案。" />
        <div className="comparison-track reveal">
          {backgroundCards.map((card, index) => (
            <div className="comparison-fragment" key={card.tag}>
              <article className={`comparison-card ${card.tone === 'accent' ? 'comparison-card-accent' : ''}`}>
                <div className="comparison-image"><img src={card.image} alt={card.alt} loading="lazy" /><span className="image-tag">{card.tag}</span></div>
                <div className="comparison-card-content">
                  <div className="card-title-row"><h3>{card.title}</h3>{index === 2 && <span className="small-status">探索方向</span>}</div>
                  <ul>{card.points.map((point) => <li key={point}><span className="list-dot" />{point}</li>)}</ul>
                </div>
              </article>
              {index < backgroundCards.length - 1 && <span className="comparison-arrow"><ArrowRight size={19} /></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section className="section section-architecture" id="architecture">
      <div className="page-shell architecture-shell">
        <SectionIntro number="03" eyebrow="系统架构" title="从感知到建议的完整闭环" description="将柔性生物传感、信号处理、时序分析与移动端交互连接起来，形成以数据为基础的健康管理流程。" />
        <div className="architecture-panel reveal">
          <div className="architecture-topline"><span><span className="live-dot" />系统数据流</span><span className="architecture-topline-caption">SENSING → UNDERSTANDING → GUIDANCE</span></div>
          <div className="flow-grid">
            {architectureSteps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              return <div className="flow-item" key={step.title} style={{ animationDelay: `${index * 110}ms` }}>
                <div className="flow-card"><span className="flow-icon"><Icon size={20} strokeWidth={1.7} /></span><b>{step.title}</b><small>{step.detail}</small></div>
                {index < architectureSteps.length - 1 && <span className="flow-connector"><ArrowRight size={15} /></span>}
              </div>
            })}
          </div>
          <div className="architecture-loop"><span />数据反馈用于持续优化分析与建议流程<span /></div>
        </div>
        <div className="architecture-foot reveal"><div className="architecture-foot-mark"><BrainCircuit size={22} /></div><div><b>多源信息在同一条时间线上汇合</b><p>传感趋势与饮食、运动等生活记录共同构成分析上下文。给药决策和医疗判断不属于本演示范围。</p></div><div className="foot-data-badge"><span>DATA FLOW</span><Activity size={18} /></div></div>
      </div>
    </section>
  )
}

function Sensor() {
  const [tab, setTab] = useState(sensorTabs[0].id)
  const activeTab = sensorTabs.find((item) => item.id === tab) ?? sensorTabs[0]
  return (
    <section className="section section-sensor" id="sensor">
      <div className="page-shell">
        <SectionIntro number="04" eyebrow="柔性传感技术" title="面向皮肤的工程化设计" description="从材料、微流控与电化学界面入手，探索稳定采样、可靠检测与舒适贴合之间的工程平衡。" />
        <div className="sensor-tabs" role="tablist" aria-label="传感技术主题">
          {sensorTabs.map((item) => <button key={item.id} role="tab" aria-selected={tab === item.id} className={tab === item.id ? 'selected' : ''} onClick={() => setTab(item.id)}>{item.label}</button>)}
        </div>
        <div className="sensor-layout reveal">
          <div className="sensor-visual">
            <div className="sensor-visual-top"><span>STRUCTURE OVERVIEW</span><span>CONCEPT RENDER</span></div>
            <img src="/assets/generated/hero-wearable-exploded.webp" alt="柔性传感贴片分层结构概念渲染" loading="lazy" />
          </div>
          <div className="sensor-detail-card" key={activeTab.id}>
            <div className="sensor-detail-icon"><Beaker size={19} /></div>
            <span className="eyebrow">{activeTab.label}</span>
            <h3>{activeTab.title}</h3>
            <p>{activeTab.body}</p>
            <div className="sensor-feature-list">{activeTab.points.map((point) => <div key={point}><Check size={15} />{point}</div>)}</div>
            <div className="microfluidic-mini">
              <div className="mini-flow-title"><span>采样路径示意</span><small>CONCEPT</small></div>
              <div className="mini-flow"><span className="mini-drop"><Droplets size={17} /></span><span className="mini-channel"><i /><i /><i /></span><span className="mini-electrode"><Zap size={16} /></span><ArrowRight size={16} className="mini-flow-arrow" /></div>
              <div className="mini-flow-labels"><span>汗液入口</span><span>微流控通道</span><span>传感区域</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intelligence({ mode = 'all' }: { mode?: 'all' | 'engine' | 'assistant' }) {
  const [question, setQuestion] = useState('为什么要结合饮食和运动记录？')
  const [answer, setAnswer] = useState('多源记录能为趋势变化补充上下文，帮助用户回顾生活因素。实际分析能力仍需结合真实采集数据验证。')
  const questions = [
    ['为什么要结合饮食和运动记录？', '多源记录能为趋势变化补充上下文，帮助用户回顾生活因素。实际分析能力仍需结合真实采集数据验证。'],
    ['系统会自动给出治疗方案吗？', '不会。本演示仅展示科研方向中的趋势解释与健康信息组织，不提供诊断、治疗或药物剂量建议。'],
  ]
  return (
    <section className="section section-intelligence" id={mode === 'assistant' ? 'intelligence-more' : 'intelligence'}>
      <div className="page-shell">
        <SectionIntro number="05" eyebrow="智能分析引擎" title={mode === 'assistant' ? '健康信息如何呈现' : '从信号到理解'} description={mode === 'assistant' ? '助手围绕趋势与生活记录提供信息组织示例，不给出诊断、治疗或用药建议。' : '融合多源健康信息进行时序分析，探索趋势预测、风险提示与个性化健康信息呈现。'} />
        <div className="intelligence-layout reveal">
          {mode !== 'assistant' && <div className="engine-panel">
            <div className="engine-panel-heading"><span className="eyebrow">MULTI-SOURCE INPUT</span><span className="data-pill"><span />多源信息输入</span></div>
            <div className="input-grid">{intelligenceInputs.map((item, index) => {
              const Icon = [Activity, Utensils, Activity, Moon, Pill][index]
              return <div className="input-chip" key={item.label}><span><Icon size={17} /></span><b>{item.label}</b></div>
            })}</div>
            <div className="input-connector"><span /><span /><span /><ArrowDown size={15} /></div>
            <div className="engine-core"><div className="engine-orbit orbit-a" /><div className="engine-orbit orbit-b" /><span className="engine-core-icon"><BrainCircuit size={26} /></span><b>多模态时序分析模型</b><small>Time-Series Intelligence Engine</small></div>
            <div className="output-heading"><span>ANALYSIS OUTPUT</span><span className="output-line" /></div>
            <div className="output-grid">{intelligenceOutputs.map((item, i) => <span key={item}><i>{['↗', '!', '✳', '◌'][i]}</i>{item}</span>)}</div>
          </div>}
          {mode !== 'engine' && <aside className="assistant-card">
            <div className="assistant-head"><span className="assistant-avatar"><Sparkles size={17} /></span><span><b>AI 健康助手</b><small>科研演示 · 模拟对话</small></span><span className="assistant-online" /></div>
            <div className="chat-log"><div className="chat-bubble chat-user">{question}</div><div className="chat-time">WEARGLU ASSISTANT</div><div className="chat-bubble chat-assistant">{answer}</div></div>
            <div className="suggested-questions">{questions.map(([q, a]) => <button key={q} className={question === q ? 'chosen' : ''} onClick={() => { setQuestion(q); setAnswer(a) }}>{q}</button>)}</div>
          </aside>}
        </div>
      </div>
    </section>
  )
}

type DemoProps = {
  mode?: 'all' | 'chart' | 'advice'
  sceneId: string
  setSceneId: (value: string) => void
  generated: boolean
  setGenerated: (value: boolean) => void
  loading: boolean
  setLoading: (value: boolean) => void
  timeRange: string
  setTimeRange: (value: string) => void
}

function Demo({ mode = 'all', sceneId, setSceneId, generated, setGenerated, loading, setLoading, timeRange, setTimeRange }: DemoProps) {
  const scene = demoScenes.find((item) => item.id === sceneId) ?? demoScenes[0]
  const generateAdvice = () => {
    setLoading(true)
    setGenerated(false)
    window.setTimeout(() => { setLoading(false); setGenerated(true) }, 700)
  }
  return (
    <section className="section section-demo" id={mode === 'advice' ? 'demo-more' : 'demo'}>
      <div className="page-shell">
        <SectionIntro number="06" eyebrow="交互演示" title={mode === 'advice' ? '模拟状态与信息提示' : '体验系统的工作方式'} description="通过可切换的模拟场景，了解趋势变化、状态提示与建议呈现的交互方式。" />
        {mode !== 'advice' && <div className="demo-toolbar"><span className="simulation-label"><i />SIMULATION · 模拟数据</span><div className="range-switch">{['今日', '近 7 天', '近 30 天'].map((range) => <button key={range} className={timeRange === range ? 'selected' : ''} onClick={() => setTimeRange(range)}>{range}</button>)}</div></div>}
        <div className={`dashboard reveal ${mode === 'advice' ? 'dashboard-advice-only' : ''}`}>
          {mode !== 'advice' && <>
          <aside className="dashboard-profile">
            <div className="dashboard-column-title"><span>用户画像（模拟）</span><ChevronDown size={14} /></div>
            <div className="profile-user"><div className="profile-avatar">A</div><div><b>用户 A</b><small>模拟健康数据</small></div></div>
            <div className="profile-meta"><span>演示时间范围</span><b>{timeRange}</b></div>
            <div className="scene-label">选择一个场景</div>
            <div className="scene-options">{demoScenes.map((item) => <button key={item.id} className={item.id === sceneId ? 'active' : ''} onClick={() => { setSceneId(item.id); setGenerated(false) }}><span className={`scene-marker marker-${item.id}`} />{item.label}{item.id === sceneId && <Check size={14} />}</button>)}</div>
          </aside>
          <div className="dashboard-chart-panel">
            <div className="chart-panel-head"><div><span className="chart-panel-title">汗糖趋势</span><span className="chart-panel-sub">mmol/L · 示例数据</span></div><div className="chart-legend"><span><i className="legend-line" />模拟趋势</span><span><i className="legend-dash" />预测示意</span><span><i className="legend-event" />场景标记</span></div></div>
            <div className="chart-event-banner"><span><Activity size={15} /></span><b>{scene.id === 'meal' ? '餐后趋势上升' : scene.id === 'low' ? '低值场景演示' : scene.id === 'activity' ? '活动后趋势变化' : '日常趋势示意'}</b><small>仅用于交互展示</small></div>
            <TrendChart variant={scene.chart as DemoSeriesKey} />
            <div className="chart-timeline"><span><Utensils size={14} />早餐</span><span><Utensils size={14} />午餐</span><span><Activity size={14} />活动</span><span><Utensils size={14} />晚餐</span></div>
          </div>
          </>}
          {mode !== 'chart' && <aside className="dashboard-insight">
            <div className="status-card"><span className="status-eyebrow">当前模拟值</span><div className="status-reading">{scene.value}<small>mmol/L</small></div><div className={`status-trend ${scene.id === 'meal' ? 'trend-up' : ''}`}>{scene.id === 'meal' ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{scene.trend}</div><div className="risk-chip"><span className="risk-dot" />{scene.risk}</div></div>
            <div className="insight-card"><div className="insight-title"><Sparkles size={15} />AI 分析</div><p>{scene.summary}</p>{generated && <div className="generated-advice"><b>模拟建议</b><span>补充记录相关生活事件，持续观察趋势变化。若对健康状态有疑问，请咨询专业医务人员。</span></div>}<button className="button button-primary button-full" onClick={generateAdvice} disabled={loading}>{loading ? <><span className="button-spinner" />生成中</> : generated ? '重新生成建议' : '生成健康建议'} {!loading && <ArrowRight size={14} />}</button></div>
          </aside>}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section section-team" id="team">
      <div className="page-shell">
        <SectionIntro number="07" eyebrow="团队与支持" title="跨学科协作，面向工程实践" description="天津大学学生团队围绕材料、传感、人工智能与工程转化开展协同研发。" />
        <div className="team-advisor reveal"><img src={advisor.photo} alt={`${advisor.name}指导教师照片`} /><div className="advisor-copy"><span className="eyebrow">FACULTY ADVISOR · 指导教师</span><h3>{advisor.name}</h3><p>{advisor.role}</p><small>{advisor.focus}</small></div><span className="advisor-badge"><ShieldCheck size={15} />项目指导</span></div>
        <div className="team-people team-single-page reveal">{team.map((member) => <article className="team-person" key={member.name}><div className="team-portrait"><img src={member.photo} alt={`${member.name}团队成员照片`} loading="lazy" /></div><div className="team-person-copy"><span className="team-person-group">{member.education}</span><h3>{member.name}</h3><b>{member.role}</b><p>{member.focus}</p><span className="team-person-line" /></div></article>)}</div>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  const [sceneId, setSceneId] = useState(demoScenes[1].id)
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('今日')
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setCompact(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return <SlideDeck header={<Navbar />}>
    <Hero /><Background /><Architecture /><Sensor /><Intelligence mode={compact ? 'engine' : 'all'} />{compact && <Intelligence mode="assistant" />}
    <Demo mode={compact ? 'chart' : 'all'} sceneId={sceneId} setSceneId={setSceneId} generated={generated} setGenerated={setGenerated} loading={loading} setLoading={setLoading} timeRange={timeRange} setTimeRange={setTimeRange} />
    {compact && <Demo mode="advice" sceneId={sceneId} setSceneId={setSceneId} generated={generated} setGenerated={setGenerated} loading={loading} setLoading={setLoading} timeRange={timeRange} setTimeRange={setTimeRange} />}
    <Team />
  </SlideDeck>
}
