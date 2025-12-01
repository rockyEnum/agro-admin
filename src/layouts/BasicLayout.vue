<template>
  <a-layout class="layout-container">
    <!-- 左侧菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="light"
      class="layout-sider"
    >
      <div class="logo">
        <h2 v-if="!collapsed">Agro Admin</h2>
        <h2 v-else>A</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="light"
        :items="menuItems"
        @click="handleMenuClick"
      />
    </a-layout-sider>

    <a-layout>
      <!-- 右上头部 -->
      <a-layout-header
        class="layout-header"
        :style="{ left: collapsed ? '80px' : '200px' }"
      >
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="header-right">
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

      <!-- 右下内容区域 -->
      <a-layout-content
        class="layout-content"
        :style="{ marginLeft: collapsed ? '80px' : '200px' }"
      >
        <div class="content-wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 菜单项配置
const menuItems = computed<MenuProps['items']>(() => [
  {
    key: '/dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
    title: '仪表盘'
  },
  {
    key: '/users',
    icon: () => h(UserOutlined),
    label: '用户管理',
    title: '用户管理'
  },
  {
    key: '/settings',
    icon: () => h(SettingOutlined),
    label: '系统设置',
    title: '系统设置'
  }
])

// 监听路由变化，更新选中的菜单项
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]
  },
  { immediate: true }
)

// 菜单点击处理
const handleMenuClick: MenuProps['onClick'] = (e) => {
  router.push(e.key as string)
}
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
  overflow: hidden;
}

.layout-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f0f0f0;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1890ff;
    }
  }
}

.layout-header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(29, 35, 41, 0.05);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  transition: left 0.2s;
  height: 64px;

  .header-left {
    display: flex;
    align-items: center;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .header-right {
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

.layout-content {
  margin-top: 64px;
  transition: margin-left 0.2s;
  overflow: auto;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);

  .content-wrapper {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: calc(100vh - 112px);
    border-radius: 4px;
  }
}
</style>

