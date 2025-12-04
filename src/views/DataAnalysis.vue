<template>
  <div class="data-analysis-page">
    <TabMenu
      :tab-items="tabItems"
      v-model:active-key="activeTab"
      @change="handleTabChange"
    />

    <div class="page-header">
      <div class="title-block">
        <span>数据分析</span>
        <span>Data analysis</span>
      </div>
      <a-button class="action-chip" shape="round">
        <SvgIcon name="association" width="16" height="16" />
        便捷组合
      </a-button>
    </div>

    <div class="page-body">
      <div class="filter-panel">
        <a-input
        v-model:value="searchKeyword"
        class="yomi-search-input"
        placeholder="按关键字进行搜索"
        :allow-clear="true"
      >
        <template #suffix>
          <SvgIcon name="search" />
        </template>
      </a-input>

        <div class="tree-list">
          <div
            v-for="section in filteredSections"
            :key="section.id"
            class="tree-section"
          >
            <div class="tree-section-header" @click="toggleExpand(section.id)">
              <SvgIcon
                name="arrow"
                width="12"
                height="12"
                class="section-arrow"
                :class="{ expanded: expandedKeys.includes(section.id) }"
              />
              <SvgIcon name="folder" width="16" height="16" />
              <span class="section-label">{{ section.label }}</span>
            </div>
            <transition name="fade">
              <div
                v-if="
                  expandedKeys.includes(section.id) && section.sensors?.length
                "
                class="tree-children"
              >
                <div
                  v-for="sensor in section.sensors"
                  :key="sensor.id"
                  class="tree-sensor"
                  :class="{
                    active: activeSensor === sensor.id,
                    muted: sensor.disabled,
                  }"
                  @mouseenter="activeSensor = sensor.id"
                >
                  <a-checkbox
                    :checked="checkedSensors.includes(sensor.id)"
                    :disabled="sensor.disabled"
                    @change.stop="toggleSensor(sensor.id)"
                  >
                    {{ sensor.label }}
                  </a-checkbox>
                  <a-button
                    v-if="activeSensor === sensor.id"
                    class="sensor-more"
                    type="text"
                    size="small"
                  >
                    <SvgIcon name="more" width="12" height="12" />
                  </a-button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="filter-actions">
          <div class="action-item">
            <SvgIcon name="association" width="16" height="16" />
          </div>

          <div class="action-item">
            <SvgIcon name="clear" width="16" height="16" />
          </div>
        </div>
      </div>

      <div class="chart-panel">
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="picker-group">
              <a-date-picker
                v-model:value="startDate"
                valueFormat="YYYY-MM-DD"
                placeholder="开始日期"
                class="date-picker"
              />
              <span class="to-label">To</span>
              <a-date-picker
                v-model:value="endDate"
                valueFormat="YYYY-MM-DD"
                placeholder="结束日期"
                class="date-picker"
              />
            </div>
            <a-select
              v-model:value="selectedMetric"
              :options="metricOptions"
              size="large"
              class="metric-select"
            />
          </div>

          <div class="toolbar-right">
            <a-button @click="handleRefresh">
              <SvgIcon name="refresh" />
            </a-button>
            <a-button>
              <SvgIcon name="excel" />
              导出Excel
            </a-button>
            <a-button>
              <SvgIcon name="caidan1" color="#4071EF" />
            </a-button>
            <a-button>
              <SvgIcon name="table" />
            </a-button>
          </div>
        </div>

        <div class="chart-card">
          <LineChart
            :xData="xAxisData"
            :yData="[]"
            :seriesList="chartSeries"
            height="360px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import LineChart from "@/components/LineChart.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import TabMenu from "@/components/TabMenu.vue";

interface SensorItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface SectionItem {
  id: string;
  label: string;
  sensors: SensorItem[];
}

const tabItems = [
  { key: "comparison", label: "数据对比" },
  { key: "sensor", label: "传感器配置" },
];

const activeTab = ref(tabItems[0].key);

const sections = ref<SectionItem[]>([
  {
    id: "zone-green",
    label: "绿化种植区",
    sensors: [
      { id: "sensor-soil-30", label: "土壤水分(30cm)" },
      { id: "sensor-soil-20", label: "土壤水分(20cm)" },
      { id: "sensor-soil-10", label: "土壤水分(10cm)", disabled: true },
      { id: "sensor-air", label: "空气温度" },
    ],
  },
  {
    id: "zone-eco",
    label: "生态种植区",
    sensors: [],
  },
  {
    id: "zone-farm",
    label: "农业种植区",
    sensors: [],
  },
  {
    id: "zone-plant",
    label: "植物生产区",
    sensors: [],
  },
  {
    id: "zone-smart",
    label: "智能种植区",
    sensors: [],
  },
]);

const expandedKeys = ref<string[]>(["zone-green"]);
const checkedSensors = ref<string[]>([
  "sensor-soil-30",
  "sensor-soil-20",
  "sensor-air",
]);
const activeSensor = ref("sensor-soil-20");
const searchKeyword = ref("");

const toggleExpand = (id: string) => {
  expandedKeys.value = expandedKeys.value.includes(id)
    ? expandedKeys.value.filter((key) => key !== id)
    : [...expandedKeys.value, id];
};

const toggleSensor = (id: string) => {
  const exists = checkedSensors.value.includes(id);
  checkedSensors.value = exists
    ? checkedSensors.value.filter((key) => key !== id)
    : [...checkedSensors.value, id];
  activeSensor.value = id;
};

const filteredSections = computed(() => {
  const keyword = searchKeyword.value.trim();
  if (!keyword) {
    return sections.value;
  }

  return sections.value
    .map((section) => {
      if (!section.sensors.length) {
        return section.label.includes(keyword) ? section : null;
      }

      const matchedSensors = section.sensors.filter((sensor) =>
        sensor.label.includes(keyword)
      );

      if (section.label.includes(keyword)) {
        return {
          ...section,
          sensors: matchedSensors.length ? matchedSensors : section.sensors,
        };
      }

      if (matchedSensors.length) {
        return {
          ...section,
          sensors: matchedSensors,
        };
      }

      return null;
    })
    .filter((item): item is SectionItem => Boolean(item));
});

const metricOptions = [
  { label: "原始数据", value: "raw" },
  { label: "生长指数", value: "growth" },
  { label: "农事记录", value: "tasks" },
];
const selectedMetric = ref("raw");
const startDate = ref<string>();
const endDate = ref<string>();

const xAxisData = Array.from({ length: 30 }, (_, index) => `Jan ${index + 1}`);

const generateSeries = () => {
  const bases = [
    { name: "Label A", color: "#2EC7C9", offset: 20 },
    { name: "Label B", color: "#4071EF", offset: 25 },
    { name: "Label C", color: "#A07EF5", offset: 35 },
    { name: "Label D", color: "#FF8F6B", offset: 15 },
    { name: "Label E", color: "#FFC53D", offset: 10 },
    { name: "Label F", color: "#40DF9F", offset: 30 },
  ];

  return bases.map((base, baseIndex) => ({
    name: base.name,
    color: base.color,
    data: xAxisData.map((_label, idx) =>
      Math.round(
        base.offset +
          Math.sin((idx + baseIndex) / 3) * 6 +
          idx * 0.5 +
          baseIndex * 2
      )
    ),
  }));
};

const chartSeries = ref(generateSeries());

const handleRefresh = () => {
  chartSeries.value = generateSeries();
};

const handleTabChange = (key: string) => {
  activeTab.value = key;
};
</script>

<style scoped lang="less">
.data-analysis-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f5f7fb;
  overflow: hidden;
}


.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-block {
  display: flex;
  gap: 4px;
  span:first-child {
    font-size: 18px;
    color: #373f4b;
    font-weight: 600;
  }

  span:last-child {
    margin: 4px 0 0;
    font-size: 12px;
    color: #6d7d95;
    text-transform: capitalize;
  }
}

.action-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ebeef5;
  background: #fff;
  color: #373f4b;
  height: 40px;
  border-radius: 8px;
}

.page-body {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}

.filter-panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.tree-list {
  flex: 1;
  overflow: auto;
  padding-right: 4px;
}

.tree-section + .tree-section {
  margin-top: 4px;
}

.tree-section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #373f4b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #f6f8ff;
  }
}

.section-arrow {
  transition: transform 0.2s;

  &.expanded {
    transform: rotate(90deg);
  }
}

.tree-children {
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
}

.tree-sensor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 8px;
  transition: background 0.2s;

  &.active {
    background: #edf2ff;
  }

  &.muted :deep(.ant-checkbox-wrapper) {
    color: #a7b1bf;
  }

  .sensor-more {
    opacity: 0.6;
  }
}

.filter-actions {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  border-top: 0.5px solid #ebeef5;
  padding: 12px 0 0;
  .action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 0.5px solid #ebeef5;
    background: #fff;
  }
}

.chart-panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.picker-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-picker {
  min-width: 150px;
}

.metric-select {
  min-width: 140px;
   
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-card {
  margin-top: 12px;
  background: #fdfdff;
  border: 1px solid #f0f2fb;
  border-radius: 12px;
  padding: 8px 12px 16px;
  flex: 1;
  overflow: hidden;
}

.to-label {
  font-size: 12px;
  color: #a7b1bf;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.ant-input-search) {
  border-radius: 8px;
}

:deep(.ant-checkbox-wrapper) {
  color: #4071ef;
}

:deep(.ant-select-selector){
  color: #6D7D95;
}
</style>
