<template>
  <div class="mapDiv">
    <!-- 地图左侧列表 -->
    <MapSidebar
      @item-click="handleItemClick"
      @search="handleSearch"
    />
    
    <tdt-map :center="state.center" :zoom="state.zoom">
      <tdt-tilelayer-tdt :url="state.url" :zIndex="1"></tdt-tilelayer-tdt>
      
      <!-- 标记点 -->
      <tdt-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :icon="marker.icon"
        @click="openInfoWindow(marker)"
      />
      
      <!-- 信息弹出窗口 -->
      <tdt-infowindow
        v-if="infoWindow.visible"
        :target="infoWindow.position"
        :content="infoWindow.content"
        @close="closeInfoWindow"
      />
    </tdt-map>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import MapSidebar from "@/components/MapSidebar.vue";
import errorIcon from "@/assets/error.png";
import sensorIcon from "@/assets/sensor-success.png";
import solarIcon from "@/assets/solar-success.png";

const state = reactive({
  center: [113.280637, 23.125178],
  zoom: 11,
  url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=89c275f45280dafa212081b0e9cdce7b"
});

// 标记点数据
const markers = ref([
  {
    position: [113.280637, 23.125178] as [number, number],
    icon: sensorIcon,
    title: "传感器节点",
    content: `
      <div style="padding: 0px;">
        <h3 style="margin: 0 0 10px 0;">传感器节点</h3>
        <p><strong>节点编码:</strong> 21100000008-1N</p>
        <p><strong>节点类型:</strong> DATA</p>
        <p><strong>状态:</strong> <span style="color: green;">正常</span></p>
        <p><strong>最后上报时间:</strong> 2024-09-27 03:49:57</p>
        <p><strong>传感器配置:</strong></p>
        <ul style="margin: 5px 0; padding-left: 20px;">
          <li>已绑定: 14</li>
          <li>正常: 13</li>
          <li>异常: 1</li>
        </ul>
      </div>
    `
  },
  {
    position: [113.285637, 23.130178] as [number, number],
    icon: solarIcon,
    title: "太阳能温室",
    iconSize: [24, 27],
    content: `
      <div style="padding: 0px;">
        <h3 style="margin: 0 0 10px 0;">太阳能温室</h3>
        <p><strong>节点编码:</strong> 21100000008-2N</p>
        <p><strong>节点类型:</strong> SOLAR</p>
        <p><strong>状态:</strong> <span style="color: green;">在线</span></p>
        <p><strong>发电功率:</strong> 2.5kW</p>
        <p><strong>电池电量:</strong> 85%</p>
      </div>
    `
  },
  {
    position: [113.275637, 23.120178] as [number, number],
    icon: errorIcon,
    title: "故障节点",
    iconSize: [24, 27],
    content: `
      <div style="padding: 0px;">
        <h3 style="margin: 0 0 10px 0;">故障节点</h3>
        <p><strong>节点编码:</strong> 21100000008-3N</p>
        <p><strong>节点类型:</strong> DATA</p>
        <p><strong>状态:</strong> <span style="color: red;">异常</span></p>
        <p><strong>故障信息:</strong> 传感器连接超时</p>
        <p><strong>最后上报时间:</strong> 2024-09-27 02:30:15</p>
      </div>
    `
  },
  {
    position: [113.290637, 23.135178] as [number, number],
    icon: sensorIcon,
    iconSize: [24, 27],
    title: "传感器节点2",
    content: `
      <div style="padding: 0px;">
        <h3 style="margin: 0 0 10px 0;">传感器节点2</h3>
        <p><strong>节点编码:</strong> 21100000008-4N</p>
        <p><strong>节点类型:</strong> DATA</p>
        <p><strong>状态:</strong> <span style="color: green;">正常</span></p>
        <p><strong>最后上报时间:</strong> 2024-09-27 03:50:20</p>
      </div>
    `
  },
  {
    position: [113.270637, 23.115178] as [number, number],
    icon: solarIcon,
    title: "太阳能温室2",
    iconSize: [24, 27],
    content: `
      <div style="padding: 0px;">
        <h3 style="margin: 0 0 10px 0;">太阳能温室2</h3>
        <p><strong>节点编码:</strong> 21100000008-5N</p>
        <p><strong>节点类型:</strong> SOLAR</p>
        <p><strong>状态:</strong> <span style="color: green;">在线</span></p>
        <p><strong>发电功率:</strong> 3.2kW</p>
        <p><strong>电池电量:</strong> 92%</p>
      </div>
    `
  }
]);

// 信息窗口状态
const infoWindow = reactive({
  visible: false,
  position: null as [number, number] | null,
  content: ""
});

// 打开信息窗口
const openInfoWindow = (marker: typeof markers.value[0]) => {
  infoWindow.position = marker.position;
  infoWindow.content = marker.content;
  infoWindow.visible = true;
};

// 关闭信息窗口
const closeInfoWindow = () => {
  infoWindow.visible = false;
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
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>