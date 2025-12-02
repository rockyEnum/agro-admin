<template>
  <a-modal
    v-model:open="innerOpen"
    :title="title"
    :footer="null"
    width="960px"
    :destroyOnClose="true"
    :maskClosable="true"
    wrapClassName="region-detail-modal"
  >
    <div class="region-modal-body">
      <!-- 左侧信息栏 -->
      <div class="side-panel">
        <RegionPhaseTabs
          :phases="phases"
          v-model:activeIndex="activePhaseIndex"
          :title="title || ''"
          :area="area || 0"
          :crop="crop || ''"
          :sowingDate="sowingDate || ''"
          statusText="运行中"
        />
      </div>

      <!-- 右侧图表区 -->
      <div class="main-panel">
        <!-- 工具栏 -->
        <div class="toolbar">
          <div class="toolbar-left">
            <a-date-picker size="small" placeholder="开始日期" />
            <span class="to-label">To</span>
            <a-date-picker size="small" placeholder="结束日期" />
            <a-select
              size="small"
              style="width: 120px"
              :options="metricOptions"
              :value="metricOptions[0]?.value"
            />
          </div>
          <div class="toolbar-right">
            <a-button size="small" shape="circle">
              <span class="icon-font">⟳</span>
            </a-button>
            <a-button size="small" type="primary">
              导出Excel
            </a-button>
            <a-button size="small" shape="circle">
              <span class="icon-font">⬈</span>
            </a-button>
          </div>
        </div>

        <!-- 折线图 -->
        <div class="chart-panel">
          <LineChart
            :title="''"
            :xData="xData"
            :yData="yData"
            height="260px"
          />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LineChart from "./LineChart.vue";
import RegionPhaseTabs, { type Phase } from "./RegionPhaseTabs.vue";

const props = withDefaults(
  defineProps<{
    /** v-model:open */
    open: boolean;
    /** 区域名称 */
    title?: string;
    area?: number;
    crop?: string;
    sowingDate?: string;
    chartTitle?: string;
    xData: (string | number)[];
    yData: (number | [string | number, number])[];
  }>(),
  {
    title: "示例农田",
    area: 5.82,
    crop: "草莓-天仙醉",
    sowingDate: "2025年8月20日",
    chartTitle: "长势指数"
  }
);

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const innerOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("update:open", val)
});

const phases = ref<Phase[]>([
  { name: "生长期", range: "8/20–9/15" },
  { name: "现蕾期", range: "9/15–10/10" },
  { name: "开花结果", range: "预计11/08前结果", badge: "采摘活动进行中" },
  { name: "旺盛生长", range: "预计3/01前" },
  { name: "花芽分化期", range: "预计9/05前" },
  { name: "休眠期", range: "预计7/05前" }
]);

const activePhaseIndex = ref(2);

const metricOptions = [
  { label: "原始数据", value: "raw" },
  { label: "生长指数", value: "growth" }
];
</script>

<style scoped>
:global(.region-detail-modal .ant-modal-content) {
  padding: 0;
}
:global(.region-detail-modal .ant-modal-header) {
  padding: 16px;
  border-bottom: 1px solid #edf1f5;
  margin-bottom: 0;
}
.region-modal-body {
  display: flex;
  gap: 0;
}

.side-panel {
  width: 260px;
  border-right: 1px solid #edf1f5;
  padding: 16px 16px 16px 24px;
}

.main-panel {
  flex: 1;
  padding: 16px 24px 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.to-label {
  font-size: 12px;
  color: #9ca3af;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-font {
  font-size: 12px;
}

.chart-panel {
  border: 1px solid #edf1f5;
  border-radius: 4px;
  padding: 4px 8px 0;
}
</style>


