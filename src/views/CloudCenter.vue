<template>
  <div class="cloud-center-page">
    <div class="page-header">
      <div class="title-block">
        <span class="title-cn">云台中心</span>
        <span class="title-en">PTZ Center</span>
      </div>
      <div class="header-toolbar">
        <a-input-search
          v-model:value="deviceKeyword"
          placeholder="按设备名称搜索"
          allow-clear
          class="toolbar-search"
        >
          <template #suffix>
            <SvgIcon name="search" width="16" height="16" />
          </template>
        </a-input-search>

        <a-select
          v-model:value="statusFilter"
          class="toolbar-select"
          :options="statusOptions"
          :bordered="false"
          popup-class-name="cloud-center-select-popup"
        />

        <a-button class="ghost-btn" @click="handleReset">
          <SvgIcon name="refresh" width="16" height="16" />
          重置
        </a-button>

        <a-button class="ghost-btn">
          <SvgIcon name="node" width="16" height="16" />
          高级筛选
        </a-button>
      </div>
    </div>

    <div class="page-body">
      <section class="zone-panel">
        <a-input-search
          v-model:value="zoneKeyword"
          placeholder="按关键字进行搜索"
          allow-clear
          class="panel-search"
        >
          <template #suffix>
            <SvgIcon name="search" width="16" height="16" />
          </template>
        </a-input-search>

        <div class="zone-list">
          <div
            v-for="zone in filteredZones"
            :key="zone.id"
            class="zone-group"
          >
            <div
              class="zone-group-header"
              :class="{ active: activeZoneId === zone.id }"
            >
              <button
                type="button"
                class="arrow-btn"
                @click.stop="toggleZone(zone.id)"
              >
                <SvgIcon
                  name="arrow"
                  width="12"
                  height="12"
                  :class="{ expanded: expandedZoneIds.includes(zone.id) }"
                />
              </button>
              <button
                type="button"
                class="header-main"
                @click="handleSelectZone(zone.id)"
              >
                <SvgIcon name="folder" width="16" height="16" />
                <span>{{ zone.label }}</span>
              </button>
              <button type="button" class="header-actions">
                <SvgIcon name="more" width="12" height="12" />
              </button>
            </div>

            <transition name="fade">
              <div
                v-if="expandedZoneIds.includes(zone.id)"
                class="zone-devices"
              >
                <button
                  v-for="device in zone.devices"
                  :key="device.id"
                  type="button"
                  class="zone-device"
                  :class="{
                    active: activeZoneId === zone.id,
                  }"
                  @click="handleSelectZone(zone.id)"
                >
                  <SvgIcon name="device" width="16" height="16" />
                  <span>{{ device.label }}</span>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <div class="panel-actions">
          <button type="button" class="action-icon">
            <SvgIcon name="association" width="16" height="16" />
          </button>
          <button type="button" class="action-icon">
            <SvgIcon name="clear" width="16" height="16" />
          </button>
        </div>
      </section>

      <section class="monitor-panel">
        <div class="monitor-grid">
          <button
            v-for="camera in filteredCameras"
            :key="camera.id"
            type="button"
            class="monitor-card"
            @click="handleOpenDetail(camera.id)"
          >
            <div class="monitor-preview">
              <div class="preview-icon">
                <img :src="cameraIcon" alt="camera" />
              </div>
              <span class="status-chip" :class="camera.status">
                <span class="dot" />
                {{ statusText[camera.status] }}
              </span>
            </div>
            <div class="monitor-info">
              <div class="info-title">{{ camera.name }}</div>
              <div class="info-tag">{{ camera.zoneLabel }}</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import cameraIcon from '@/assets/camera.png'

type CameraStatus = 'online' | 'offline'

interface ZoneDevice {
  id: string
  label: string
}

interface ZoneItem {
  id: string
  label: string
  devices: ZoneDevice[]
}

interface CameraCard {
  id: string
  name: string
  zoneId: string
  zoneLabel: string
  status: CameraStatus
}

const router = useRouter()

const zones = ref<ZoneItem[]>([
  {
    id: 'zone-green',
    label: '绿化种植区',
    devices: [
      { id: 'device-green-1', label: 'Solar Greenhouse' },
      { id: 'device-green-2', label: 'Solar Greenhouse' },
      { id: 'device-green-3', label: 'Solar Greenhouse' },
    ],
  },
  {
    id: 'zone-eco',
    label: '生态种植区',
    devices: [{ id: 'device-eco-1', label: 'Solar Greenhouse' }],
  },
  {
    id: 'zone-farm',
    label: '农业种植区',
    devices: [{ id: 'device-farm-1', label: 'Solar Greenhouse' }],
  },
  {
    id: 'zone-plant',
    label: '植物生产区',
    devices: [{ id: 'device-plant-1', label: 'Solar Greenhouse' }],
  },
  {
    id: 'zone-smart',
    label: '智能种植区',
    devices: [
      { id: 'device-smart-1', label: 'Solar Greenhouse' },
      { id: 'device-smart-2', label: 'Solar Greenhouse' },
    ],
  },
])

const cameras = ref<CameraCard[]>([
  {
    id: 'camera-1',
    name: 'Solar Greenhouse',
    zoneId: 'zone-green',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-2',
    name: 'Solar Greenhouse',
    zoneId: 'zone-green',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-3',
    name: 'Solar Greenhouse',
    zoneId: 'zone-green',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-4',
    name: 'Solar Greenhouse',
    zoneId: 'zone-eco',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-5',
    name: 'Solar Greenhouse',
    zoneId: 'zone-farm',
    zoneLabel: '农业种植区',
    status: 'offline',
  },
  {
    id: 'camera-6',
    name: 'Solar Greenhouse',
    zoneId: 'zone-plant',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-7',
    name: 'Solar Greenhouse',
    zoneId: 'zone-smart',
    zoneLabel: '农业种植区',
    status: 'online',
  },
  {
    id: 'camera-8',
    name: 'Solar Greenhouse',
    zoneId: 'zone-smart',
    zoneLabel: '农业种植区',
    status: 'offline',
  },
  {
    id: 'camera-9',
    name: 'Solar Greenhouse',
    zoneId: 'zone-smart',
    zoneLabel: '农业种植区',
    status: 'online',
  },
])

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '在线', value: 'online' },
  { label: '离线', value: 'offline' },
]

const statusText: Record<CameraStatus, string> = {
  online: '在线',
  offline: '离线',
}

const zoneKeyword = ref('')
const deviceKeyword = ref('')
const statusFilter = ref<'all' | CameraStatus>('all')
const expandedZoneIds = ref(zones.value.map((zone) => zone.id))
const activeZoneId = ref(zones.value[0]?.id ?? '')

const filteredZones = computed<ZoneItem[]>(() => {
  const keyword = zoneKeyword.value.trim()
  if (!keyword) {
    return zones.value
  }

  return zones.value
    .map((zone) => {
      if (zone.label.includes(keyword)) {
        return zone
      }

      const matchedDevices = zone.devices.filter((device) =>
        device.label.includes(keyword)
      )

      if (matchedDevices.length) {
        return {
          ...zone,
          devices: matchedDevices,
        }
      }

      return null
    })
    .filter((zone): zone is ZoneItem => Boolean(zone))
})

const filteredCameras = computed(() => {
  const keyword = deviceKeyword.value.trim().toLowerCase()

  return cameras.value.filter((camera) => {
    const matchStatus =
      statusFilter.value === 'all' || camera.status === statusFilter.value
    const matchKeyword =
      !keyword || camera.name.toLowerCase().includes(keyword)
    const matchZone = !activeZoneId.value || camera.zoneId === activeZoneId.value

    return matchStatus && matchKeyword && matchZone
  })
})

const toggleZone = (id: string) => {
  expandedZoneIds.value = expandedZoneIds.value.includes(id)
    ? expandedZoneIds.value.filter((zoneId) => zoneId !== id)
    : [...expandedZoneIds.value, id]
}

const handleSelectZone = (zoneId: string) => {
  activeZoneId.value = zoneId
}

const handleReset = () => {
  deviceKeyword.value = ''
  statusFilter.value = 'all'
}

const handleOpenDetail = (cameraId: string) => {
  router.push({
    name: 'CloudCenterDetail',
    params: {
      cameraId,
    },
  })
}
</script>

<style scoped lang="less">
.cloud-center-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  gap: 12px;
  background: #f5f7fb;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.title-block {
  display: flex;
  align-items: baseline;
  gap: 8px;

  .title-cn {
    font-size: 20px;
    font-weight: 600;
    color: #373f4b;
  }

  .title-en {
    font-size: 12px;
    color: #6d7d95;
    text-transform: capitalize;
  }
}

.header-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-search {
  width: 320px;
  .ant-input-affix-wrapper {
    border: 1px solid #ebeef5;
    background: #f9fbff;
  }
}

.toolbar-select {
  width: 120px;
  background: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 4px 12px;
  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    padding: 0;
    background: transparent;
  }
}

.ghost-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #ebeef5;
  background: #ffffff;
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;
  color: #373f4b;
}

.page-body {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 12px;
  min-height: 0;
}

.zone-panel {
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
}

.panel-search :deep(.ant-input-affix-wrapper) {
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background: #f9fbff;
}

.zone-list {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.zone-group {
  border-radius: 10px;
  background: #f8fbff;
  padding: 4px;

  & + & {
    margin-top: 4px;
  }
}

.zone-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &.active {
    background: rgba(64, 113, 239, 0.08);
  }
}

.zone-group-header button {
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  color: #373f4b;
}

.arrow-btn {
  width: 24px;
  justify-content: flex-start;

  svg {
    transition: transform 0.2s ease;
  }

  svg.expanded {
    transform: rotate(90deg);
  }
}

.header-main {
  flex: 1;
  gap: 8px;
  font-size: 14px;
}

.header-actions {
  width: 32px;
  justify-content: center;
}

.zone-devices {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

.zone-device {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6d7d95;
  transition: background 0.2s ease, color 0.2s ease;

  &.active {
    background: rgba(64, 113, 239, 0.08);
    color: #373f4b;
  }
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.action-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.monitor-panel {
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
}

.monitor-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.monitor-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 307px;
  height: 189px;
  position: relative;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.monitor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
}

.monitor-card:focus-visible {
  outline: 2px solid #85a5ff;
  outline-offset: 2px;
}

.monitor-preview {
  height: 144px;
  background: linear-gradient(90deg, #111827, #1f2937);
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.preview-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
  }
}

.status-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #ffffff;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  &.online {
    background: rgba(49, 207, 112, 0.18);
    color: #31cf70;
  }

  &.offline {
    background: rgba(253, 150, 5, 0.18);
    color: #fd9605;
  }
}

.monitor-info {
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-title {
  font-size: 14px;
  font-weight: 500;
  color: #373f4b;
}

.info-tag {
  font-size: 12px;
  color: #6d7d95;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

