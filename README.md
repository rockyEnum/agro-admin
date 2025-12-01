# Agro Admin

基于 Vue 3 + TypeScript + Ant Design Vue 的管理端项目

## 技术栈

- Vue 3
- TypeScript
- Ant Design Vue
- Vue Router
- Vite

## 项目结构

```
agro-admin/
├── src/
│   ├── layouts/          # 布局组件
│   │   └── BasicLayout.vue  # 主布局（左侧菜单 + 右上头部 + 右下内容）
│   ├── views/            # 页面视图
│   │   ├── Dashboard.vue    # 仪表盘
│   │   ├── Users.vue        # 用户管理
│   │   └── Settings.vue     # 系统设置
│   ├── router/           # 路由配置
│   │   └── index.ts
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能特性

- ✅ 响应式布局（左侧菜单可折叠）
- ✅ 路由导航
- ✅ 示例页面（仪表盘、用户管理、系统设置）

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 布局说明

项目采用经典的管理后台布局：

- **左侧菜单**：可折叠的侧边栏导航菜单
- **右上头部**：包含菜单折叠按钮和用户信息下拉菜单
- **右下内容**：主内容区域，显示当前路由对应的页面
