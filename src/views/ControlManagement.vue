<template>
  <div class="control-page">
    <header class="control-header">
      <div class="title-block">
        <p class="title">
          设备列表
        </p>
        <p class="subtitle">
          Equipment List
        </p>
      </div>
      <div class="actions-row">
        <a-input
          v-model:value="equipmentKeyword"
          class="search-input"
          allow-clear
          placeholder="按设备名称搜索"
        >
          <template #suffix>
            <SvgIcon
              name="search"
              width="16"
              height="16"
            />
          </template>
        </a-input>
        <div class="status-select">
          <a-select
            v-model:value="statusFilter"
            :bordered="false"
            :options="statusOptions"
            popup-class-name="status-select-dropdown"
          >
            <template #suffixIcon>
              <SvgIcon
                name="arrow"
                width="12"
                height="12"
              />
            </template>
          </a-select>
        </div>
        <a-button
          class="ghost-btn"
          @click="handleReset"
        >
          <SvgIcon
            name="refresh"
            width="16"
            height="16"
          />
          重置
        </a-button>
        <a-button class="ghost-btn">
          <SvgIcon
            name="tool"
            width="16"
            height="16"
          />
          高级筛选
        </a-button>
      </div>
    </header>

    <section class="control-body">
      <aside class="filter-panel">
        <a-input
          v-model:value="areaKeyword"
          class="panel-search"
          placeholder="按关键字进行搜索"
        >
          <template #suffix>
            <SvgIcon
              name="search"
              width="16"
              height="16"
            />
          </template>
        </a-input>
        <ul class="area-list">
          <li
            v-for="area in filteredAreas"
            :key="area.value"
            :class="['area-item', { active: selectedArea === area.value }]"
            @click="selectedArea = area.value"
          >
            <span
              class="radio"
              :data-active="selectedArea === area.value"
            />
            <span>{{ area.label }}</span>
          </li>
        </ul>
        <div class="panel-footer">
          <button class="icon-btn" type="button">
            <SvgIcon
              name="device"
              width="16"
              height="16"
            />
          </button>
          <button class="icon-btn" type="button">
            <SvgIcon
              name="clear"
              width="16"
              height="16"
            />
          </button>
        </div>
      </aside>

      <div class="devices-wrapper">
        <div class="device-grid">
          <div
            v-for="device in filteredDevices"
            :key="device.id"
            class="device-card"
          >
            <div class="device-card__head">
              <div class="device-icon">
                <SvgIcon
                  name="device"
                  width="28"
                  height="28"
                />
              </div>
              <a-switch
                :checked="device.status === 'open'"
                :disabled="!device.online"
                checked-children="ON"
                un-checked-children="OFF"
                @change="() => handleToggle(device.id)"
              />
            </div>
            <div class="device-card__body">
              <div class="device-info">
                <p class="device-name">
                  {{ device.name }}
                </p>
                <p class="device-status">
                  状态：<span>{{ device.status === 'open' ? '开启' : '关闭' }}</span>
                </p>
              </div>
              <div
                :class="['online-status', device.online ? 'is-online' : 'is-offline']"
              >
                <span class="dot" />
                {{ device.online ? '在线' : '离线' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

type StatusFilter = 'all' | 'online' | 'offline' | 'open' | 'closed'
type AreaValue = 'all' | 'green' | 'eco' | 'agriculture' | 'production' | 'smart'
type DeviceStatus = 'open' | 'closed'

interface DeviceItem {
  id: number
  name: string
  status: DeviceStatus
  online: boolean
  area: AreaValue
}

const equipmentKeyword = ref('')
const areaKeyword = ref('')
const statusFilter = ref<StatusFilter>('all')
const selectedArea = ref<AreaValue>('agriculture')

const statusOptions = [
  { label: '状态', value: 'all' },
  { label: '在线', value: 'online' },
  { label: '离线', value: 'offline' },
  { label: '开启', value: 'open' },
  { label: '关闭', value: 'closed' }
]

const areaFilters = [
  { label: '全部区域', value: 'all' },
  { label: '绿化种植区', value: 'green' },
  { label: '生态种植区', value: 'eco' },
  { label: '农业种植区', value: 'agriculture' },
  { label: '植物生产区', value: 'production' },
  { label: '智能种植区', value: 'smart' }
]

const devices = ref<DeviceItem[]>([
  { id: 1, name: '通风口', status: 'closed', online: false, area: 'agriculture' },
  { id: 2, name: '通风口', status: 'closed', online: true, area: 'agriculture' },
  { id: 3, name: '通风口', status: 'closed', online: true, area: 'eco' },
  { id: 4, name: '通风口', status: 'open', online: true, area: 'green' },
  { id: 5, name: '通风口', status: 'open', online: true, area: 'agriculture' },
  { id: 6, name: '通风口', status: 'open', online: true, area: 'production' },
  { id: 7, name: '通风口', status: 'open', online: true, area: 'smart' },
  { id: 8, name: '通风口', status: 'closed', online: false, area: 'agriculture' }
])

const filteredAreas = computed(() => {
  if (!areaKeyword.value) return areaFilters
  return areaFilters.filter(area =>
    area.label.toLowerCase().includes(areaKeyword.value.toLowerCase())
  )
})

const filteredDevices = computed(() => {
  return devices.value.filter(device => {
    const keyword = equipmentKeyword.value.trim()
    const matchesKeyword = keyword ? device.name.includes(keyword) : true
    const matchesArea =
      selectedArea.value === 'all' || device.area === selectedArea.value

    const matchesStatus = (() => {
      switch (statusFilter.value) {
        case 'online':
          return device.online
        case 'offline':
          return !device.online
        case 'open':
          return device.status === 'open'
        case 'closed':
          return device.status === 'closed'
        default:
          return true
      }
    })()

    return matchesKeyword && matchesArea && matchesStatus
  })
})

const handleToggle = (id: number) => {
  const device = devices.value.find(item => item.id === id)
  if (!device || !device.online) return

  device.status = device.status === 'open' ? 'closed' : 'open'
}

const handleReset = () => {
  equipmentKeyword.value = ''
  areaKeyword.value = ''
  statusFilter.value = 'all'
  selectedArea.value = 'all'
}
</script>

<style scoped lang="less">
.control-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 16px;
  background: #f3f6ff;
}

.control-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 12px 30px rgba(65, 113, 238, 0.08);
}

.title-block {
  display: flex;
  gap: 12px;
  align-items: baseline;

  .title {
    font-size: 20px;
    color: #1f2430;
    font-weight: 600;
    margin: 0;
  }

  .subtitle {
    font-size: 12px;
    color: #6d7d95;
    margin: 0;
  }
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-input {
  width: 320px;

  :deep(.ant-input) {
    border: 1px solid #ebeef5;
    border-radius: 10px;
    height: 40px;
    padding: 0 12px;
  }
}

.status-select {
  width: 120px;
  height: 40px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  :deep(.ant-select-selector) {
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
    height: 38px;
    display: flex;
    align-items: center;
  }
}

:deep(.status-select-dropdown .ant-select-item-option-content) {
  font-size: 14px;
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  height: 40px;
  background: #fff;
  color: #373f4b;
}

.control-body {
  display: flex;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.filter-panel {
  width: 320px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-search {
  :deep(.ant-input) {
    border: 1px solid #ebeef5;
    border-radius: 10px;
    height: 40px;
    padding: 0 12px;
  }
}

.area-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow: auto;
}

.area-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #373f4b;
  font-size: 14px;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f7ff;
  }

  &.active {
    background: #e7edff;
  }
}

.radio {
  width: 14px;
  height: 14px;
  border: 1px solid #ebeef5;
  border-radius: 50%;
  position: relative;

  &[data-active='true']::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background: #4171ee;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

.panel-footer {
  display: flex;
  gap: 12px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.devices-wrapper {
  flex: 1;
  min-width: 0;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.device-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 15px 30px rgba(65, 113, 238, 0.08);
}

.device-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  :deep(.ant-switch) {
    background: #ebeef5;
    height: 24px;
  }

  :deep(.ant-switch-handle) {
    width: 18px;
    height: 18px;
    top: 3px;
  }

  :deep(.ant-switch-checked) {
    background: #4171ee;
  }
}

.device-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #e7edff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-card__body {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.device-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.device-name {
  margin: 0;
  font-size: 16px;
  color: #373f4b;
  font-weight: 600;
}

.device-status {
  margin: 0;
  font-size: 12px;
  color: #a7b1bf;

  span {
    color: #373f4b;
  }
}

.online-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;

  &.is-online {
    color: #31cf70;
  }

  &.is-offline {
    color: #fd9605;
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

@media screen and (max-width: 1200px) {
  .control-body {
    flex-direction: column;
  }

  .filter-panel {
    width: 100%;
  }
}
</style>
