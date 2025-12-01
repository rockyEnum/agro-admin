<template>
  <div class="svg-icon-demo">
    <a-page-header title="SVG 图标组件示例" />
    
    <a-card style="margin-top: 24px" title="基础用法">
      <a-space wrap>
        <SvgIcon path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="32"
        />
      </a-space>
    </a-card>

    <a-card style="margin-top: 24px" title="自定义颜色">
      <a-space wrap>
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          color="#1890ff"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          color="#52c41a"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          color="#ff4d4f"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          color="#faad14"
        />
      </a-space>
    </a-card>

    <a-card style="margin-top: 24px" title="旋转图标">
      <a-space wrap>
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          :rotate="0"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          :rotate="45"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          :rotate="90"
        />
        <SvgIcon 
          path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
          :size="24"
          :rotate="180"
        />
      </a-space>
    </a-card>

    <a-card style="margin-top: 24px" title="使用插槽">
      <a-space wrap>
        <SvgIcon :size="24" color="#1890ff">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </SvgIcon>
        <SvgIcon :size="24" color="#52c41a">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" fill="none" />
        </SvgIcon>
      </a-space>
    </a-card>

    <a-card style="margin-top: 24px" title="不同尺寸">
      <a-space wrap align="center">
        <div style="text-align: center">
          <SvgIcon 
            path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            :size="16"
          />
          <div>16px</div>
        </div>
        <div style="text-align: center">
          <SvgIcon 
            path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            :size="24"
          />
          <div>24px</div>
        </div>
        <div style="text-align: center">
          <SvgIcon 
            path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            :size="32"
          />
          <div>32px</div>
        </div>
        <div style="text-align: center">
          <SvgIcon 
            path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            :size="48"
          />
          <div>48px</div>
        </div>
        <div style="text-align: center">
          <SvgIcon 
            path="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            :size="64"
          />
          <div>64px</div>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components'
</script>

<style scoped lang="less">
.svg-icon-demo {
  // 样式
}
</style>

