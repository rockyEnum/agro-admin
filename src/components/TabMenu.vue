<template>
  <div class="tab-menu">
    <a-tabs
      v-model:activeKey="currentActiveKey"
      :size="size"
      :animated="animated"
      class="tabs"
      @change="handleChange"
    >
      <a-tab-pane
        v-for="item in tabItems"
        :key="item.key"
        :tab="item.label"
      />
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

export interface TabItem {
  key: string
  label: string
}

interface Props {
  tabItems: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  size?: 'large' | 'middle' | 'small'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  animated: false,
})

const emit = defineEmits<{
  'update:activeKey': [key: string]
  'change': [key: string]
}>()

// 使用内部状态或受控状态
const internalActiveKey = ref(props.defaultActiveKey || props.tabItems[0]?.key || '')
const currentActiveKey = computed({
  get: () => props.activeKey !== undefined ? props.activeKey : internalActiveKey.value,
  set: (value: string) => {
    if (props.activeKey === undefined) {
      internalActiveKey.value = value
    } else {
      emit('update:activeKey', value)
    }
  }
})

// 监听外部 activeKey 变化
watch(() => props.activeKey, (newKey) => {
  if (newKey !== undefined) {
    internalActiveKey.value = newKey
  }
})

const handleChange = (key: string) => {
  emit('update:activeKey', key)
  emit('change', key)
}
</script>

<style scoped lang="less">
.tab-menu {
  display: flex;
  padding: 4px;
  color: #6d7d95;
  
  .tabs {
    width: 100%;
  }
  
  :deep(.ant-tabs-nav) {
    margin: 0px;
    padding-left: 16px;
  }
  
  :deep(.ant-tabs-tab) {
    padding: 12px 32px;
    
    & + .ant-tabs-tab {
      margin: 0px;
    }
    
    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #4071ef;
    }
  }
  
  :deep(.ant-tabs-ink-bar) {
    border-radius: 6px 6px 0px 0px;
    background: linear-gradient(315deg, #4171ee 0%, #84a6ff 100%);
    height: 4px;
  }
}
</style>

