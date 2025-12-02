<template>
  <div class="line-chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

type SeriesPoint = number | [string | number, number];

const props = withDefaults(
  defineProps<{
    xData: (string | number)[];
    yData: SeriesPoint[];
    /** 图表标题，可选 */
    title?: string;
    /** 图表高度，默认 220px */
    height?: string;
  }>(),
  {
    title: "",
    height: "220px"
  }
);

const chartRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const renderChart = () => {
  if (!chartRef.value) return;
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const option: echarts.EChartsOption = {
    title: props.title
      ? {
          text: props.title,
          left: "center",
          textStyle: {
            fontSize: 14,
            fontWeight: 500
          }
        }
      : undefined,
    grid: {
      top: props.title ? 40 : 20,
      left: 40,
      right: 20,
      bottom: 40
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: props.xData,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#A3B1C6" } },
      axisLabel: { color: "#7C8796" }
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: {
        lineStyle: {
          color: "#E3E8F0",
          type: "dashed"
        }
      },
      axisLabel: { color: "#7C8796" }
    },
    series: [
      {
        type: "line",
        data: props.yData,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: "#2F54EB"
        },
        areaStyle: {
          color: "rgba(47, 84, 235, 0.16)"
        }
      }
    ]
  };

  chart.setOption(option);
};

onMounted(() => {
  if (chartRef.value) {
    chartRef.value.style.height = props.height;
  }
  renderChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (chart) {
    chart.dispose();
    chart = null;
  }
});

const handleResize = () => {
  chart?.resize();
};

watch(
  () => [props.xData, props.yData, props.title] as const,
  () => {
    renderChart();
  },
  { deep: true }
);
</script>

<style scoped>
.line-chart {
  width: 100%;
}
</style>


