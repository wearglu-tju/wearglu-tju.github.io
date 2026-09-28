export const navigation = [
  { id: 'top', label: '首页' },
  { id: 'background', label: '项目背景' },
  { id: 'architecture', label: '系统架构' },
  { id: 'sensor', label: '传感技术' },
  { id: 'intelligence', label: '智能分析' },
  { id: 'demo', label: '交互演示' },
  { id: 'team', label: '团队' },
]

export const projectStatement = {
  eyebrow: 'WEARABLE GLUCOSE INTELLIGENCE',
  title: ['可穿戴汗糖', '智能管理系统'],
  english: 'Wearable Sweat-Glucose Monitoring & Intelligent Management System',
  descriptor: '柔性生物传感 × 时序智能分析 × 个性化健康管理',
  summary: '面向连续糖代谢健康管理，探索从生理信号感知、数据分析，到风险提示与健康建议的一体化可穿戴系统。',
}

export const backgroundCards = [
  {
    title: '传统指尖血糖',
    tag: 'BGM',
    image: '/assets/generated/bgm-concept.webp',
    alt: '指尖血糖仪概念示意图',
    points: ['需要采血操作', '单次测量，数据有间隔', '依赖个人记录与观察'],
    tone: 'neutral',
  },
  {
    title: '连续血糖监测',
    tag: 'CGM',
    image: '/assets/generated/cgm-concept.webp',
    alt: '连续血糖监测设备概念示意图',
    points: ['提供连续趋势信息', '传感器与皮肤接触或微创', '长期使用涉及耗材更换'],
    tone: 'neutral',
  },
  {
    title: 'WearGlu 探索方向',
    tag: 'OUR APPROACH',
    image: '/assets/generated/wearglu-on-skin.webp',
    alt: '柔性贴片概念渲染图',
    points: ['柔性可穿戴贴片', '汗液采样与电化学检测', '结合生活记录进行趋势分析'],
    tone: 'accent',
  },
]

export const architectureSteps = [
  { icon: 'droplet', title: '体液标志物', detail: '汗液采样' },
  { icon: 'sensor', title: '柔性生物传感', detail: '电化学检测' },
  { icon: 'wave', title: '信号处理', detail: '质量控制' },
  { icon: 'brain', title: '时序智能分析', detail: '趋势与风险' },
  { icon: 'phone', title: '移动端应用', detail: '数据可视化' },
  { icon: 'heart', title: '个性化建议', detail: '辅助健康管理' },
]

export const sensorTabs = [
  {
    id: 'structure', label: '结构设计', title: '柔性多层结构',
    body: '围绕皮肤贴合与信号采集，方案包括保护层、微流控层、电化学传感层与柔性基底。当前处于材料和器件迭代阶段。',
    points: ['改性 PDMS / 水凝胶基底方向', '微流控通道结构设计', '柔性电极与贴合方式探索'],
  },
  {
    id: 'microfluidic', label: '微流控采样', title: '体液采样与输运',
    body: '通过微尺度通道引导汗液到达检测区域。通道几何、采样稳定性与佩戴状态仍需实验验证。',
    points: ['入口与采样区布局', '通道输运路径', '体液残留与交叉污染控制'],
  },
  {
    id: 'electrochemical', label: '电化学检测', title: '酶电极检测路线',
    body: '项目材料提出以葡萄糖氧化酶与普鲁士蓝为基础的电化学检测方案，正在推进电极结构与传感性能研究。',
    points: ['葡萄糖氧化酶反应体系', '普鲁士蓝介体方向', '检测限、线性范围与响应时间待规范验证'],
  },
  {
    id: 'substrate', label: '柔性基底', title: '贴合皮肤的柔性材料',
    body: '围绕改性 PDMS 与导电水凝胶等材料开展配方筛选，重点关注柔软性、透气性、界面稳定和生物相容性。',
    points: ['柔性和共形贴合', '材料配方与加工工艺', '佩戴舒适性和安全性评估'],
  },
]

export const intelligenceInputs = [
  { icon: 'activity', label: '糖代谢信号' },
  { icon: 'utensils', label: '饮食记录' },
  { icon: 'move', label: '运动数据' },
  { icon: 'moon', label: '睡眠状态' },
  { icon: 'pill', label: '用药信息' },
]

export const intelligenceOutputs = ['趋势预测', '风险提示', '个性化建议', '健康画像']

export const demoScenes = [
  { id: 'routine', label: '正常日常', value: '6.1', trend: '平稳', risk: '低风险', summary: '模拟趋势处于相对平稳区间。保持规律记录，继续观察全天变化。', chart: 'routine' },
  { id: 'meal', label: '餐后上升', value: '8.7', trend: '上升趋势', risk: '中等风险', summary: '模拟数据出现餐后上升趋势。可以补充饮食与活动记录，并持续观察后续变化。', chart: 'meal' },
  { id: 'activity', label: '运动场景', value: '5.4', trend: '缓慢回落', risk: '关注趋势', summary: '模拟数据在活动后缓慢回落。记录运动时长和主观感受，观察恢复过程。', chart: 'activity' },
  { id: 'low', label: '低值关注', value: '3.8', trend: '接近低值', risk: '需留意', summary: '这是用于界面演示的低值场景。真实健康判断应结合可靠测量和专业医疗意见。', chart: 'low' },
]
