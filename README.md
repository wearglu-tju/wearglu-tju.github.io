# WearGlu · 可穿戴汗糖智能管理系统

天津大学学生跨学科科研项目展示站。页面以柔性生物传感、时序分析和健康管理交互为主线，实验区按项目当前材料保留待验证状态，演示区所有趋势均为前端模拟数据。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

构建结果位于 `dist/`，站点使用根路径 `base: /`。

## GitHub Pages 部署

仓库已包含 `.github/workflows/deploy.yml`。将代码推送到 `main` 分支后，GitHub Actions 会安装依赖、构建静态文件并部署到 Pages。页脚二维码指向 `https://wearglu-tju.github.io/`，与当前 GitHub 仓库组织名一致。

首次启用时，在 GitHub 仓库打开 **Settings → Pages → Build and deployment**，将 **Source** 设为 **GitHub Actions**。等待 `Deploy to GitHub Pages` 工作流完成后，即可通过仓库 Pages 设置显示的域名访问。

## 项目结构

- `src/data/siteContent.ts`：导航、项目介绍、技术说明和工程历程
- `src/data/demoData.ts`：交互演示中的前端模拟序列
- `src/data/results.ts`：实验指标与证据状态配置
- `src/data/team.ts`：指导教师和团队成员信息
- `src/components/`：导航、分区标题和趋势图
- `public/assets/generated/`：网站概念视觉素材
- `docs/image-prompts.md`：概念视觉生成提示词与使用边界

## 内容与数据说明

网站概念图用于视觉说明，不代表已完成的设备原型或实验现场。交互 Dashboard 的数值和曲线均明确标记为模拟数据。实验指标在核验并录入真实数据前保持为空。页面不提供医疗诊断、治疗或用药建议。
