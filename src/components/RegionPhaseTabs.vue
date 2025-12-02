<template>
  <div class="region-phase-tabs">
    <!-- 基本信息 -->
    <div class="field-block">
      <div class="field-name">{{ title }}</div>
      <div class="field-meta">
        <div class="meta-row">
          <span class="meta-label">种植面积</span>
          <span class="meta-value">{{ area }}亩</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">当前作物</span>
          <span class="meta-value">{{ crop }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">播种时间</span>
          <span class="meta-value">{{ sowingDate }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">智能管控</span>
          <span class="meta-value online">{{ statusText }}</span>
        </div>
      </div>
    </div>

    <a-tabs size="small">
      <a-tab-pane key="phase" tab="作物物候期">
        <a-steps
          :current="activeIndex"
          direction="vertical"
          size="small"
          class="phase-steps"
        >
          <a-step
            v-for="(phase, index) in phases"
            :key="phase.name"
            :status="index <= activeIndex ? 'process' : 'wait'"
          >
            <template #title>
              <div class="phase-header">
                <div class="phase-name">
                  {{ index + 1 }}. {{ phase.name }}
                </div>
                <div v-if="phase.badge" class="phase-badge">
                  {{ phase.badge }}
                </div>
              </div>
            </template>
            <template #description>
              <div class="phase-range">{{ phase.range }}</div>
            </template>
          </a-step>
        </a-steps>
      </a-tab-pane>

      <a-tab-pane key="estimate" tab="产量预估">
        <div class="estimate-placeholder">
          <slot name="estimate">
            产量预估内容开发中…
          </slot>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
export type Phase = {
  name: string;
  range: string;
  badge?: string;
};

defineProps<{
  phases: Phase[];
  activeIndex: number;
  title: string;
  area: number | string;
  crop: string;
  sowingDate: string;
  statusText?: string;
}>();
</script>

<style scoped>
.region-phase-tabs {
  margin-top: 4px;
}

.field-block {
  margin-bottom: 12px;
}

.field-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.field-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
}

.meta-label {
  color: #9ca3af;
}

.meta-value {
  color: #111827;
}

.meta-value.online {
  color: #22c55e;
}

.phase-steps {
  margin-top: 4px;
}

.phase-steps :deep(.ant-steps-item) {
  cursor: default;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phase-name {
  font-size: 13px;
  color: #111827;
}

.phase-range {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}

.phase-badge {
  font-size: 11px;
  color: #f97316;
  background: #fff7ed;
  padding: 2px 6px;
  border-radius: 10px;
}

.estimate-placeholder {
  padding: 12px 4px;
  font-size: 13px;
  color: #9ca3af;
}
</style>


