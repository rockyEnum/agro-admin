<template>
  <div class="page-content">
    <div class="mapDiv">
      <!-- 地图左侧列表 -->
      <MapSidebar @item-click="handleItemClick" @search="handleSearch" />

      <tdt-map :center="state.center" :zoom="state.zoom">
        <tdt-tilelayer-tdt :url="state.url" :zIndex="1"></tdt-tilelayer-tdt>

        <!-- 区域多边形 -->
        <tdt-polygon
          v-for="(region, rIndex) in regions"
          :key="`region-${rIndex}`"
          :path="region.path"
          color="#999"
          fillColor="#ccc"
          :weight="2"
          lineStyle="solid"
          @click="openRegionModal(region)"
        />

        <!-- 标记点 -->
        <tdt-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :icon="marker.icon"
          @click="openMarkerModal(marker)"
          class="aaa"
        />
      </tdt-map>

      <a-modal
        v-model:open="modal.visible"
        :title="null"
        :footer="null"
        :destroyOnClose="true"
        :maskClosable="true"
        width="420px"
        :bodyStyle="{ padding: 0 }"
        @cancel="closeModal"
      >
        <MarkerDetailCard v-if="selectedMarker" :data="selectedMarker.data" />
      </a-modal>

      <!-- 区域详情弹窗（带折线图） -->
      <RegionDetailModal
        v-model:open="regionModalOpen"
        :title="regionTitle"
        :xData="regionChartX"
        :yData="regionChartY"
      />

      <!-- 地图右上角图标 -->
      <div class="map-top-right-icons">
        <img src="@/assets/camera.png" alt="相机" class="icon-item" />
        <img src="@/assets/sensor-grey.png" alt="传感器" class="icon-item" />
        <img src="@/assets/marker-pos.png" alt="标记位置" class="icon-item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import MapSidebar from "@/components/MapSidebar.vue";
import MarkerDetailCard from "@/components/MarkerDetailCard.vue";
import RegionDetailModal from "@/components/RegionDetailModal.vue";
import solarError from "@/assets/icons/solar-error.svg?url";
import solarIcon from "@/assets/icons/solar-success.svg?url";
import sensorIcon from "@/assets/icons/sensor-success.svg?url";
import sensorError from "@/assets/icons/sensor-error.svg?url";
import type { MarkerDetail } from "@/types/marker";

type Marker = {
  position: [number, number];
  icon: {
    iconUrl: string;
    iconSize: [number, number];
  };
  title: string;
  data: MarkerDetail;
};

const state = reactive({
  center: [113.280637, 23.125178],
  zoom: 11,
  url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=89c275f45280dafa212081b0e9cdce7b",
});

type Region = {
  path: [number, number][];
  targetIndex: number; // 关联的 markers 下标
};

// 标记点数据
const markers = ref<Marker[]>([
  {
    position: [113.280637, 23.125178] as [number, number],
    icon: {
      iconUrl: sensorIcon,
      iconSize: [24, 28],
    },
    title: "传感器节点",

    data: {
      name: "Node one",
      nodeCode: "21100000008-1N",
      nodeType: "DATA",
      status: "online",
      lastReportTime: "2024-09-27 03:49:57",
      stats: { total: 14, normal: 13, abnormal: 1 },
    },
  },
  {
    position: [113.285637, 23.130178] as [number, number],
    icon: {
      iconUrl: solarIcon,
      iconSize: [24, 28],
    },
    title: "太阳能温室",

    data: {
      name: "Solar Hub A",
      nodeCode: "21100000008-2N",
      nodeType: "SOLAR",
      status: "online",
      lastReportTime: "2024-09-27 03:40:21",
      stats: { total: 6, normal: 6, abnormal: 0 },
    },
  },
  {
    position: [113.275637, 23.120178] as [number, number],
    icon: {
      iconUrl: solarError,
      iconSize: [24, 28],
    },
    title: "故障节点",
    data: {
      name: "Node alert",
      nodeCode: "21100000008-3N",
      nodeType: "DATA",
      status: "error",
      lastReportTime: "2024-09-27 02:30:15",
      stats: { total: 12, normal: 9, abnormal: 3 },
    },
  },
  {
    position: [113.290637, 23.135178] as [number, number],
    icon: {
      iconUrl: sensorError,
      iconSize: [24, 28],
    },
    title: "传感器节点2",
    data: {
      name: "Node two",
      nodeCode: "21100000008-4N",
      nodeType: "DATA",
      status: "error",
      lastReportTime: "2024-09-27 03:50:20",
      stats: { total: 10, normal: 10, abnormal: 0 },
    },
  },
  {
    position: [113.270637, 23.115178] as [number, number],
    icon: {
      iconUrl: solarIcon,
      iconSize: [24, 27],
    },
    title: "太阳能温室2",
    data: {
      name: "Solar Hub B",
      nodeCode: "21100000008-5N",
      nodeType: "SOLAR",
      status: "offline",
      lastReportTime: "2024-09-27 01:15:42",
      stats: { total: 5, normal: 4, abnormal: 1 },
    },
  },
]);
console.log(markers, 2);
// 区域（多边形）数据
const regions = ref<Region[]>([
  {
    // 大致包围第一个 Node one 的区域，按需要再微调
    path: [
      [113.276, 23.129] as [number, number],
      [113.286, 23.129] as [number, number],
      [113.286, 23.12] as [number, number],
      [113.276, 23.12] as [number, number],
    ],
    targetIndex: 0,
  },
]);

const selectedMarker = ref<Marker | null>(null);
const modal = reactive({
  visible: false,
});

// 区域弹窗数据
const regionModalOpen = ref(false);
const regionChartX = ref<(string | number)[]>([
  "Jan 1",
  "Jan 5",
  "Jan 9",
  "Jan 13",
  "Jan 17",
  "Jan 21",
  "Jan 25",
  "Jan 29",
]);
const regionChartY = ref<number[]>([30, 32, 34, 36, 37, 38, 40, 42]);
const regionTitle = ref("4号地");

// 打开弹窗
const openMarkerModal = (marker: Marker) => {
  selectedMarker.value = marker;
  modal.visible = true;
};

// 点击区域时，打开区域分析弹窗
const openRegionModal = (region: Region) => {
  const marker = markers.value[region.targetIndex];
  if (marker) {
    regionTitle.value = marker.data.name || "区域详情";
  }
  regionModalOpen.value = true;
};

// 关闭弹窗
const closeModal = () => {
  modal.visible = false;
  selectedMarker.value = null;
};

// 处理列表项点击
const handleItemClick = (item: any) => {
  console.log("点击了列表项:", item);
  // 这里可以根据点击的项来定位地图或显示相关信息
};

// 处理搜索
const handleSearch = (keyword: string) => {
  console.log("搜索关键词:", keyword);
  // 这里可以实现搜索功能
};
</script>

<script lang="ts">
export default { name: "Home" };
</script>

<style scoped>
.mapDiv {
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: 8px;
}

.map-top-right-icons {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
}

.icon-item {
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-item:hover {
  transform: scale(1.1);
}

.modal-body {
  font-size: 14px;
  color: #444;
}
:deep(.tdt-bottom) {
  display: none;
}
</style>
