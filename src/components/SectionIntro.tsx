type Props = { number: string; eyebrow: string; title: string; description?: string; light?: boolean }

export default function SectionIntro({ number, eyebrow, title, description, light = false }: Props) {
  return (
    <div className={`section-intro ${light ? 'section-intro-light' : ''}`}>
      <span className="section-number">{number}</span>
      <div className="section-intro-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
