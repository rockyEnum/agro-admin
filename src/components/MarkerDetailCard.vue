<template>
  <div class="marker-card">
    <div class="card-header">
      <div class="title">{{ data.name }}</div>
      <div class="status-wrapper">
        <span class="status-dot" :class="`status-${statusMeta.key}`"></span>
        <span class="status-text">{{ statusMeta.text }}</span>
        <SvgIcon name="wifi" :class="`${statusMeta.key}-icon`" />
      </div>
    </div>

    <div class="meta-list">
      <div class="meta-item">
        <span class="meta-label">节点编码</span>
        <span class="meta-value">{{ data.nodeCode }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">节点类型</span>
        <span class="meta-value">{{ data.nodeType }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">最后上报时间</span>
        <span class="meta-value">{{ data.lastReportTime }}</span>
      </div>
    </div>

    <div v-if="data.stats" class="stats-block">
      <div class="stats-title">
         <SvgIcon name="node" size="24"/>
        <span>传感器配置</span>
      </div>
      <div class="stats-grid">
        <div class="stats-item">
          <div class="stats-label">已绑定</div>
          <div class="stats-value">{{ data.stats.total }}</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">正常</div>
          <div class="stats-value">{{ data.stats.normal }}</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">异常</div>
          <div class="stats-value warning">{{ data.stats.abnormal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MarkerDetail } from "@/types/marker";
import SvgIcon from "@/components/SvgIcon.vue";

const props = defineProps<{
  data: MarkerDetail;
}>();

const statusMeta = computed(() => {
  switch (props.data.status) {
    case "online":
      return { key: "online", text: "在线" };
    case "error":
      return { key: "error", text: "告警" };
    default:
      return { key: "offline", text: "离线" };
  }
});
</script>

<style scoped>
.marker-card {
  /* padding: 12px 16px 4px; */
  border-radius: 12px;
  background: #fff;
  font-size: 14px;
  color: #333;
}

.card-header {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e2e8f0;
  gap: 24px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #111;
}

.status-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-flex;
}

.status-online {
  background: #43d089;
}

.status-offline {
  background: #b0b7c3;
}
/* .offline-icon{
    color: #b0b7c3;
} */

.status-error {
  background: #ff7875;
}

.status-text {
  color: #4a5568;
}

.signal-icon {
  color: #43d089;
  font-size: 16px;
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
}

.meta-item {
  display: flex;
  /* justify-content: space-between; */
  color: #4a5568;
}

.meta-label {
  color: #a7b1bf;
  width: 110px;
}

 
.stats-block {
  padding-top: 12px;
}

.stats-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  text-align: center;
}

.stats-label {
  color: #94a3b8;
  margin-bottom: 6px;
}

.stats-value {
  font-size: 20px;
  font-weight: 600;
  color: #111;
}

.warning {
  color: #d97706;
}
</style>

