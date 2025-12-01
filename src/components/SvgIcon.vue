<template>
  <svg
    :class="['svg-icon', className]"
    :style="svgStyle"
    :width="computedWidth"
    :height="computedHeight"
    :fill="computedFill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :viewBox="viewBox"
    v-bind="$attrs"
  >
    <!-- 支持传入 SVG 路径 -->
    <path v-if="path" :d="path" />
    <!-- 支持传入完整的 SVG 内容 -->
    <component v-else-if="component" :is="component" />
    <!-- 支持通过插槽传入自定义内容 -->
    <slot v-else />
  </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

interface Props {
  // SVG 路径（path 元素的 d 属性）
  path?: string
  // 组件形式（用于传入完整的 SVG 组件）
  component?: any
  // 尺寸（同时设置 width 和 height）
  size?: string | number
  // 宽度
  width?: string | number
  // 高度
  height?: string | number
  // 填充颜色
  fill?: string
  // 描边颜色
  stroke?: string
  // 描边宽度
  strokeWidth?: string | number
  // 视图框
  viewBox?: string
  // 自定义类名
  className?: string
  // 自定义样式
  style?: CSSProperties | string
  // 旋转角度
  rotate?: number
  // 颜色（如果设置了 color，会覆盖 fill）
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  fill: 'currentColor',
  stroke: 'none',
  strokeWidth: 0,
  viewBox: '0 0 24 24',
  rotate: 0
})

// 计算 SVG 样式
const svgStyle = computed(() => {
  const style: CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle'
  }

  // 如果设置了 width，使用 width，否则使用 size
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  } else {
    style.width = typeof props.size === 'number' ? `${props.size}px` : props.size
  }

  // 如果设置了 height，使用 height，否则使用 size
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  } else {
    style.height = typeof props.size === 'number' ? `${props.size}px` : props.size
  }

  // 旋转
  if (props.rotate) {
    style.transform = `rotate(${props.rotate}deg)`
    style.transformOrigin = 'center'
  }

  // 合并自定义样式
  if (props.style) {
    if (typeof props.style === 'string') {
      // 如果是字符串，需要解析（这里简化处理）
      Object.assign(style, parseStyleString(props.style))
    } else {
      Object.assign(style, props.style)
    }
  }

  return style
})

// 计算宽度
const computedWidth = computed(() => {
  if (props.width) {
    return typeof props.width === 'number' ? props.width : props.width
  }
  return typeof props.size === 'number' ? props.size : props.size
})

// 计算高度
const computedHeight = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? props.height : props.height
  }
  return typeof props.size === 'number' ? props.size : props.size
})

// 计算最终的 fill 颜色（如果设置了 color，优先使用 color）
const computedFill = computed(() => props.color || props.fill)

// 解析样式字符串（简单实现）
function parseStyleString(styleStr: string): CSSProperties {
  const style: CSSProperties = {}
  const pairs = styleStr.split(';')
  pairs.forEach((pair) => {
    const [key, value] = pair.split(':').map((s) => s.trim())
    if (key && value) {
      // 转换 kebab-case 到 camelCase
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      style[camelKey as keyof CSSProperties] = value
    }
  })
  return style
}
</script>

<style scoped lang="less">
.svg-icon {
  flex-shrink: 0;
  overflow: hidden;
}
</style>

