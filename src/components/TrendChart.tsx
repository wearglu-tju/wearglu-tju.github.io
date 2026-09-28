import { chartTimes, demoSeries, type DemoSeriesKey } from '../data/demoData'

type Props = { variant: DemoSeriesKey }

const chart = { width: 620, height: 278, left: 54, right: 18, top: 19, bottom: 42 }
const yMin = 2
const yMax = 12

function coordinates(values: readonly number[]) {
  const plotW = chart.width - chart.left - chart.right
  const plotH = chart.height - chart.top - chart.bottom
  return values.map((value, index) => ({
    x: chart.left + (plotW * index) / (values.length - 1),
    y: chart.top + ((yMax - value) / (yMax - yMin)) * plotH,
  }))
}

function makePath(values: readonly number[]) {
  return coordinates(values).map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

export default function TrendChart({ variant }: Props) {
  const series = demoSeries[variant]
  const actual = coordinates(series.actual)
  const event = series.event === null ? null : actual[series.event]
  const plotW = chart.width - chart.left - chart.right
  const plotH = chart.height - chart.top - chart.bottom
  return (
    <svg className="trend-chart" viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label="模拟汗糖趋势图，蓝色实线为模拟实时趋势，虚线为预测示意">
      {[4, 6, 8, 10, 12].map((value) => {
        const y = chart.top + ((yMax - value) / (yMax - yMin)) * plotH
        return <g key={value}><line x1={chart.left} x2={chart.width - chart.right} y1={y} y2={y} className="chart-grid" /><text x={chart.left - 14} y={y + 4} textAnchor="end" className="chart-label">{value}</text></g>
      })}
      {chartTimes.map((time, index) => {
        const x = chart.left + (plotW * index) / (chartTimes.length - 1)
        return <g key={time}><line x1={x} x2={x} y1={chart.top} y2={chart.height - chart.bottom} className="chart-grid chart-grid-vertical" /><text x={x} y={chart.height - 12} textAnchor="middle" className="chart-label">{time}</text></g>
      })}
      <path d={makePath(series.forecast)} className="chart-forecast" />
      <path d={makePath(series.actual)} className="chart-actual" />
      {actual.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="3.2" className="chart-point" />)}
      {event && <g><line x1={event.x} x2={event.x} y1={chart.top} y2={chart.height - chart.bottom} className="chart-event-line" /><circle cx={event.x} cy={event.y} r="6.3" className="chart-event-dot" /></g>}
      <text x="8" y="15" className="chart-unit">mmol/L</text>
    </svg>
  )
}
