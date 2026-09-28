export type EvidenceKind = 'experimental' | 'simulation' | 'target' | 'literature'

export const evidenceLabels: Record<EvidenceKind, string> = {
  experimental: '实验数据',
  simulation: '模拟结果',
  target: '设计目标',
  literature: '文献参考',
}

export const resultMetrics = [
  { label: '灵敏度', value: null, unit: 'μA·mM⁻¹·cm⁻²', evidence: 'experimental' as EvidenceKind, status: '待录入实验数据' },
  { label: '线性范围', value: null, unit: 'mM', evidence: 'experimental' as EvidenceKind, status: '待录入实验数据' },
  { label: '响应时间', value: null, unit: 's', evidence: 'experimental' as EvidenceKind, status: '待录入实验数据' },
  { label: '检测限', value: null, unit: 'μM', evidence: 'experimental' as EvidenceKind, status: '待录入实验数据' },
]

export const predictionMetrics = [
  { label: '30 min Prediction MAE', value: null, unit: 'mmol/L', evidence: 'simulation' as EvidenceKind, status: '模型评估中' },
  { label: '趋势判断准确率', value: null, unit: '%', evidence: 'simulation' as EvidenceKind, status: '模型评估中' },
]

export const environmentMetrics = [
  { label: '温度影响', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '待制定测试条件' },
  { label: '湿度影响', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '待制定测试条件' },
  { label: '佩戴状态稳定性', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '验证中' },
]

export const safetyMetrics = [
  { label: '材料相容性', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '待制定评价方案' },
  { label: '贴附舒适性', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '待制定评价方案' },
  { label: '持续佩戴评估', value: null, unit: '待定义', evidence: 'experimental' as EvidenceKind, status: '验证中' },
]
