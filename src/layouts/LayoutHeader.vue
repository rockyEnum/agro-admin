<template>
  <a-layout-header class="layout-header">
    <div class="header-left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="handleToggle"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="handleToggle"
      />
    </div>
    <div class="header-right">
      <img
        :src="chartImg"
        alt="chart"
        class="chart-icon"
        @click="chartVisible = true"
      >
<a-modal
        v-model:open="chartVisible"
        :footer="null"
        :width="modalWidth"
       
        destroyOnClose
        centered
        :title="null"
          wrapClassName="chart-modal"
          :bodyStyle="{ height: '100%' }"
      >
        <Chart v-model:expanded="chartExpanded" />
      </a-modal>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <user-outlined />
          <span class="username">管理员</span>
          <down-outlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="profile">
              <user-outlined />
              个人中心
            </a-menu-item>
            <a-menu-item key="settings">
              <setting-outlined />
              设置
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <logout-outlined />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import chartImg from '@/assets/chart.png'
import Chart from '@/components/chart.vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined
} from "@ant-design/icons-vue";

defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const chartVisible = ref(false)
const chartExpanded = ref(true)
const modalWidth = computed(() => chartExpanded.value ? '950px' : '360px')

const handleToggle = () => {
  emit("toggle");
};
</script>

<style scoped lang="less">
:global(.chart-modal .ant-modal-content) {
  padding: 0;
  height: 658px;
}
:global(.chart-modal .ant-modal-header) {
  padding: 16px;
  border-bottom: 1px solid #edf1f5;
  margin-bottom: 0;
}
.layout-header {
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(29, 35, 41, 0.05);
  transition: left 0.2s;
  height: 64px;
  background: transparent;
  .header-left {
    display: flex;
    align-items: center;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    .chart-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    .ant-dropdown-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;

      .username {
        margin: 0 4px;
      }

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>

