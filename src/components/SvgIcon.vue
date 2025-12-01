<template>
    <!-- 加一个简单的 loading/fallback -->
    <component
      v-if="SvgComp"
      :is="SvgComp"
      v-bind="$attrs"
      class="svg-icon"
    />
  </template>
  
  <script setup lang="ts">
  import { computed, defineAsyncComponent } from 'vue'
  
  interface Props {
    /** 不带后缀的 svg 文件名，例如 'home' => src/assets/icons/home.svg */
    name: string
  }
  
  const props = defineProps<Props>()
  
// 预先收集 src/assets/icons 下所有 svg，供运行时按 name 选择
const svgModules = import.meta.glob('../assets/icons/*.svg')

// 根据 name 选择对应的 svg 组件
const SvgComp = computed(() => {
  const path = `../assets/icons/${props.name}.svg`
  const loader = svgModules[path]

  if (!loader) {
    // 未找到对应的 svg，可以在这里打印日志或返回一个占位组件
    console.warn(`[SvgIcon] 未找到图标: ${path}`)
    return null
  }

  return defineAsyncComponent(loader as any)
})
  </script>
  
  <style scoped>
  .svg-icon {
    display: inline-block;
    vertical-align: middle;
  }
  </style>