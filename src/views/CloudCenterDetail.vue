<template>
  <div class="cloud-detail-page">
    <header class="detail-header">
      <button type="button" class="back-button" @click="handleBack">
        <SvgIcon name="arrow" width="16" height="16" />
      </button>
      <div class="header-text">
        <h1>{{ activeCamera?.name ?? '未知设备' }}</h1>
        <p>This is a description</p>
      </div>
    </header>

    <div class="detail-content">
      <section class="detail-main">
        <div class="monitor-stage">
          <img :src="heroImage" alt="monitor" class="stage-bg" />

          <div class="channel-chip">
            <SvgIcon name="node" width="16" height="16" />
            <span>AI 模型训练</span>
            <SvgIcon name="arrow" width="14" height="14" class="chip-arrow" />
          </div>

          <div class="stage-status" :class="activeCamera?.status ?? 'online'">
            <span class="dot" />
            {{ statusText[activeCamera?.status ?? 'online'] }}
          </div>

          <div class="ptz-joystick">
            <button
              v-for="direction in joystickDirections"
              :key="direction.name"
              type="button"
              class="joystick-btn"
              :class="direction.position"
              @click="handleControl(direction.action)"
            >
              <SvgIcon
                name="arrow"
                width="14"
                height="14"
                :style="{ transform: `rotate(${direction.rotation}deg)` }"
              />
            </button>
            <button
              type="button"
              class="joystick-center"
              @click="handleControl('center')"
            >
              <SvgIcon name="device" width="20" height="20" />
            </button>
          </div>

          <div class="stage-side-controls">
            <button
              v-for="action in sideActions"
              :key="action.label"
              type="button"
              class="side-control"
              @click="handleControl(action.action)"
            >
              <SvgIcon :name="action.icon" width="18" height="18" />
            </button>
          </div>

          <div class="stage-bottom-controls">
            <button
              v-for="action in bottomActions"
              :key="action.label"
              type="button"
              class="stage-control"
              @click="handleControl(action.action)"
            >
              <SvgIcon :name="action.icon" width="18" height="18" />
            </button>
          </div>
        </div>

        <footer class="stage-footer">
          <div class="footer-info">
            <span class="info-title">{{ activeCamera?.name }}</span>
            <span class="info-tag">{{ activeCamera?.zoneLabel }}</span>
          </div>
          <div class="quality-toggle">
            <button
              type="button"
              :class="{ active: streamMode === 'smooth' }"
              @click="setStreamMode('smooth')"
            >
              流畅
            </button>
            <button
              type="button"
              :class="{ active: streamMode === 'hd' }"
              @click="setStreamMode('hd')"
            >
              高清
            </button>
          </div>
        </footer>
      </section>

      <aside class="detail-sidebar">
        <a-input-search
          v-model:value="listKeyword"
          placeholder="按设备名称搜索"
          allow-clear
          class="sidebar-search-input"
        >
          <template #suffix>
            <SvgIcon name="search" width="16" height="16" />
          </template>
        </a-input-search>

        <div class="sidebar-list">
          <button
            v-for="camera in sidebarCameras"
            :key="camera.id"
            type="button"
            class="sidebar-card"
            :class="{ active: camera.id === selectedCameraId }"
            @click="handleCardSelect(camera.id)"
          >
            <div class="card-status" :class="camera.status">
              <span class="dot" />
              {{ statusText[camera.status] }}
            </div>
            <div class="card-preview">
              <div class="preview-icon">
                <img :src="cameraIcon" alt="" />
              </div>
            </div>
            <div class="card-info">
              <p>{{ camera.name }}</p>
              <span>{{ camera.zoneLabel }}</span>
            </div>
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import cameraIcon from '@/assets/camera.png'

type CameraStatus = 'online' | 'offline'

interface CameraCard {
  id: string
  name: string
  zoneLabel: string
  status: CameraStatus
}

const heroImage =
  'https://www.figma.com/api/mcp/asset/265fa3c3-0fba-4430-84d5-d5417be5a14f'

const cameras = ref<CameraCard[]>([
  {
    id: 'camera-1',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-2',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-3',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-4',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-5',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'offline',
  },
  {
    id: 'camera-6',
    name: 'Solar Greenhouse',
    zoneLabel: '农业种植区',
    status: 'online',
  },
])

const statusText: Record<CameraStatus, string> = {
  online: '在线',
  offline: '离线',
}

const joystickDirections = [
  { name: 'up', rotation: 270, position: 'dir-up', action: 'move-up' },
  { name: 'right', rotation: 0, position: 'dir-right', action: 'move-right' },
  { name: 'down', rotation: 90, position: 'dir-down', action: 'move-down' },
  { name: 'left', rotation: 180, position: 'dir-left', action: 'move-left' },
]

const sideActions = [
  { label: 'zoom-in', action: 'zoom-in', icon: 'node' },
  { label: 'zoom-out', action: 'zoom-out', icon: 'clear' },
]

const bottomActions = [
  { label: 'sound', action: 'sound', icon: 'association' },
  { label: 'fullscreen', action: 'fullscreen', icon: 'more' },
]

const route = useRoute()
const router = useRouter()

const listKeyword = ref('')
const streamMode = ref<'smooth' | 'hd'>('smooth')
const selectedCameraId = ref(
  (typeof route.params.cameraId === 'string' && route.params.cameraId) ||
    cameras.value[0]?.id ||
    ''
)

watch(
  () => route.params.cameraId,
  (cameraId) => {
    if (typeof cameraId === 'string' && cameraId !== selectedCameraId.value) {
      selectedCameraId.value = cameraId
    }
  }
)

const activeCamera = computed(() => {
  return (
    cameras.value.find((camera) => camera.id === selectedCameraId.value) ||
    cameras.value[0] ||
    null
  )
})

const sidebarCameras = computed(() => {
  const keyword = listKeyword.value.trim().toLowerCase()
  if (!keyword) {
    return cameras.value
  }
  return cameras.value.filter((camera) =>
    camera.name.toLowerCase().includes(keyword)
  )
})

const handleBack = () => {
  router.push({ name: 'CloudCenter' })
}

const handleCardSelect = (cameraId: string) => {
  if (cameraId === selectedCameraId.value) return
  router.replace({
    name: 'CloudCenterDetail',
    params: { cameraId },
  })
}

const handleControl = (action: string) => {
  console.info(`[cloud-center] control action: ${action}`)
}

const setStreamMode = (mode: 'smooth' | 'hd') => {
  streamMode.value = mode
}
</script>

<style scoped lang="less">
.cloud-detail-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  gap: 12px;
  background: #e9eef9;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.back-button {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background: #f7f8fc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(180deg);
}

.header-text {
  display: flex;
  align-items: baseline;
  gap: 8px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #373f4b;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #6d7d95;
  }
}

.detail-content {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 12px;
  min-height: 0;
}

.detail-main {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.monitor-stage {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 420px;
  background: #111827;
}

.stage-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.channel-chip {
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;

  .chip-arrow {
    transform: rotate(90deg);
  }
}

.stage-status {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  &.online {
    color: #31cf70;
  }

  &.offline {
    color: #fd9605;
  }
}

.ptz-joystick {
  position: absolute;
  left: 50%;
  bottom: 48px;
  width: 210px;
  height: 210px;
  transform: translate(-50%, 0);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.joystick-btn {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.dir-up {
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
}

.dir-right {
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.dir-down {
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
}

.dir-left {
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.joystick-center {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #373f4b;
  font-weight: 600;
}

.stage-side-controls {
  position: absolute;
  right: 24px;
  bottom: 72px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.side-control {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.stage-bottom-controls {
  position: absolute;
  right: 24px;
  bottom: 16px;
  display: flex;
  gap: 16px;
}

.stage-control {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.stage-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px 0 4px;
  border-top: 1px solid #ebeef5;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 12px;

  .info-title {
    font-size: 16px;
    font-weight: 600;
    color: #373f4b;
  }

  .info-tag {
    font-size: 12px;
    color: #6d7d95;
    padding: 4px 10px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
  }
}

.quality-toggle {
  display: inline-flex;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;

  button {
    border: none;
    padding: 8px 20px;
    background: transparent;
    font-size: 14px;
    color: #6d7d95;

    &.active {
      background: #1a6afe;
      color: #ffffff;
    }
  }
}

.detail-sidebar {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-search-input :deep(.ant-input-affix-wrapper) {
  border-radius: 12px;
  border: 1px solid #ebeef5;
  height: 40px;
}

.sidebar-search-input
  :deep(.ant-input-affix-wrapper .ant-input-suffix svg) {
  fill: #6d7d95;
}

.sidebar-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding-right: 4px;
}

.sidebar-card {
  position: relative;
  border: none;
  border-radius: 16px;
  padding: 16px;
  background: #232b3b;
  display: flex;
  gap: 16px;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &.active {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.3);
  }
}

.card-status {
  position: absolute;
  top: 12px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  &.online {
    color: #31cf70;
  }

  &.offline {
    color: #fd9605;
  }
}

.card-preview {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-icon {
  width: 32px;
  height: 32px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  p {
    margin: 0;
    font-size: 14px;
  }

  span {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>

