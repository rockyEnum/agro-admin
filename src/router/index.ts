import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      },
      {
        path: 'analysis',
        name: 'DataAnalysis',
        component: () => import('@/views/DataAnalysis.vue'),
        meta: {
          title: '数据分析',
          icon: 'DashboardOutlined'
        }
      },
      {
        path: 'cloud-center',
        name: 'CloudCenter',
        component: () => import('@/views/CloudCenter.vue'),
        meta: {
          title: '云台中心',
          icon: 'AppstoreOutlined'
        }
      },
      {
        path: 'cloud-center/:cameraId',
        name: 'CloudCenterDetail',
        component: () => import('@/views/CloudCenterDetail.vue'),
        meta: {
          title: '云台详情',
          hidden: true
        }
      },
      {
        path: 'control-management',
        name: 'ControlManagement',
        component: () => import('@/views/ControlManagement.vue'),
        meta: {
          title: '控制管理',
          icon: 'ControlOutlined'
        }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserOutlined'
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: {
          title: '系统设置',
          icon: 'SettingOutlined'
        }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/views/Chat.vue'),
        meta: {
          title: 'AI助手',
          icon: 'RobotOutlined'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

