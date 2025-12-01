# SvgIcon 组件

一个通用的 SVG 图标组件，支持多种使用方式。

## 使用方式

### 1. 通过 path 属性传入 SVG 路径

```vue
<template>
  <SvgIcon path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
</template>

<script setup>
import { SvgIcon } from '@/components'
</script>
```

### 2. 通过插槽传入自定义 SVG 内容

```vue
<template>
  <SvgIcon>
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
    <circle cx="12" cy="12" r="3" />
  </SvgIcon>
</template>
```

### 3. 自定义大小和颜色

```vue
<template>
  <!-- 使用 size 属性 -->
  <SvgIcon path="..." :size="24" color="#1890ff" />
  
  <!-- 使用 width 和 height -->
  <SvgIcon path="..." :width="32" :height="32" fill="red" />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| path | string | - | SVG 路径（path 元素的 d 属性） |
| component | any | - | SVG 组件 |
| size | string \| number | 16 | 图标尺寸（同时设置 width 和 height） |
| width | string \| number | - | 图标宽度 |
| height | string \| number | - | 图标高度 |
| fill | string | 'currentColor' | 填充颜色 |
| color | string | - | 颜色（如果设置，会覆盖 fill） |
| stroke | string | 'none' | 描边颜色 |
| strokeWidth | string \| number | 0 | 描边宽度 |
| viewBox | string | '0 0 24 24' | SVG 视图框 |
| className | string | - | 自定义类名 |
| style | CSSProperties \| string | - | 自定义样式 |
| rotate | number | 0 | 旋转角度（度） |

## 示例

### 基础用法

```vue
<template>
  <SvgIcon path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
</template>
```

### 自定义颜色和大小

```vue
<template>
  <SvgIcon 
    path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
    :size="32"
    color="#1890ff"
  />
</template>
```

### 旋转图标

```vue
<template>
  <SvgIcon 
    path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
    :rotate="45"
  />
</template>
```

### 使用插槽

```vue
<template>
  <SvgIcon :size="24" color="#52c41a">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
  </SvgIcon>
</template>
```

