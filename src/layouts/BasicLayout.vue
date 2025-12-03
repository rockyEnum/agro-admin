<template>
  <a-layout class="layout-container">
    <!-- 左侧菜单 -->
  <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="light"
      :collapsed-width="60"
      class="layout-sider"
    >
      <div class="logo">
        <SvgIcon name="logo" width="38" height="38" />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="light"
        @click="handleMenuClick"
        inlineIndent="20"
      >
        <a-menu-item
          v-for="item in menuItems"
          :key="item.key"
          class="menu-item menu-item-middle"
        >
          <template #icon>
            <SvgIcon
              :name="item.icon"
              width="18"
              height="18"
            />
          </template>
          {{ item.label }}
        </a-menu-item>

        <!-- 单独的 AI 助手菜单项，放在列表最下面 -->
        <a-menu-item
          key="/chat"
          class="menu-item menu-item-large"
        >
          <template #icon>
            <img
              :src="caidan4"
              alt=""
              class="menu-icon-img-large"
            />
          </template>
          AI 助手
        </a-menu-item>
      </a-menu>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="light"
        @click="handleMenuClick"
        inlineIndent="20"
        class="footer-menu"
      >
        <a-menu-item
          v-for="item in menuFooterItems"
          :key="item.key"
          class="menu-item menu-item-middle"
        >
          <template #icon>
            <SvgIcon
              :name="item.icon"
              width="18"
              height="18"
            />
          </template>
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 右上头部 -->
      <LayoutHeader
        :collapsed="collapsed"
        @toggle="collapsed = !collapsed"
      />

      <!-- 右下内容区域 -->
      <a-layout-content
        class="layout-content"
      >
      
          <router-view />
       
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import LayoutHeader from './LayoutHeader.vue'
import caidan4 from '@/assets/caidan4.png'


const router = useRouter()
const route = useRoute()

const collapsed = ref(true)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 菜单项配置
const menuItems =  [
  {
    key: '/',
    icon: 'home',
    label: '首页',
    title: '首页'
  },
 
  {
    key: '/analysis',
    icon: 'caidan1',
    label: '数据分析',
    title: '数据分析'
  },
  {
    key: '/control-management',
    icon:    'caidan2',
    label: '控制管理',
    title: '控制管理'
  },
  {
    key: '/cloud-center',
    icon:    'caidan3',
    label: '云台中心',
    title: '云台中心'
  },
]

const menuFooterItems =  [
  {
    key: '/control1',
    icon:    'snowflake',
    label: '控制管理',
    title: '控制管理'
  },
  {
    key: '/setting',
    icon:    'tool',
    label: '设置',
    title: '设置'
  },
]

// 监听路由变化，更新选中的菜单项
watch(
  () => route.path,
  (path: string) => {
    selectedKeys.value = [path]
  },
  { immediate: true }
)

type MenuClickEvent = Parameters<NonNullable<MenuProps['onClick']>>[0]

// 菜单点击处理
const handleMenuClick = (e: MenuClickEvent) => {
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
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  width: 60px;
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1890ff;
    }
  }
}

.layout-content {
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
  padding-bottom: 12px;
}

.menu-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: inline-block;
  vertical-align: middle;
}

.menu-icon-img-large {
  width: 28px;
  height: 28px;
}

:deep(.menu-item-middle.ant-menu-submenu-title){
  padding-inline: calc(50% - 20px);
    /* width: 32px; */
    height: 32px;
    line-height: 32px;
    width: calc(100% - 20px);
}
.menu-item-middle{
 
}
.footer-menu{
  margin-top: auto;
  margin-bottom: 24px;
}
:deep(.menu-item-large){
  padding-left: 10px;
  padding-top: 6px;
}
:deep(.ant-layout-sider-children){
  display: flex;
  flex-direction: column;
}
</style>

