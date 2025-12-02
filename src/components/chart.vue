<template>
  <div class="yomi-layout">
    <!-- 左侧：推荐话术 + 搜索 -->
    <div class="yomi-panel">
      <!-- 搜索框（Ant Design Vue） -->
      <a-input-search
        v-model:value="keyword"
        class="yomi-search-input"
        placeholder="按关键字进行搜索"
        @search="onSearch"
        @press-enter="onSearch"
        :allow-clear="true"
      >
        <template #suffix>
          <SearchOutlined class="yomi-search-icon" @click="onSearch" />
        </template>
      </a-input-search>

      <!-- 内容区域 -->
      <div class="yomi-content">
        <a-card :bordered="false" class="yomi-card" body-style="{ padding: '8px 8px 12px' }">
          <!-- 头像 & 名称 -->
          <div class="yomi-header">
            <a-avatar class="yomi-avatar">
              <div class="yomi-avatar-inner"></div>
            </a-avatar>
            <div class="yomi-title">YoMi</div>
          </div>

          <!-- 消息卡片 -->
          <div class="yomi-messages">
            <div class="yomi-message yomi-message-primary">
              <div class="yomi-message-text">
                下面给你一份玉米种植环境参考指标，涵盖温度、光照、水分、土壤、空气等主要条件，方便你在不同气候区或种植模式中参考
              </div>
              <a-button type="text" class="yomi-more-btn">
                <MoreOutlined />
              </a-button>
            </div>

            <div class="yomi-message">
              <div class="yomi-message-text">
                光周期特性：玉米属短日照作物，但对光周期不敏感，可在不同纬度种植
              </div>
              <a-button type="text" class="yomi-more-btn yomi-more-btn-light">
                <MoreOutlined />
              </a-button>
            </div>
          </div>
        </a-card>
      </div>
    </div>

    <!-- 右侧：YoMi 主会话区域 -->
    <div class="yomi-chat">
      <div class="yomi-chat-header">
        <div class="yomi-chat-title">
          <MenuOutlined class="yomi-chat-menu" />
          <span>YoMi</span>
        </div>
        <CloseOutlined class="yomi-chat-close" />
      </div>

      <div class="yomi-chat-body">
        <div class="yomi-chat-avatar-wrapper">
          <a-avatar class="yomi-chat-avatar" :size="100">
            <div class="yomi-chat-avatar-inner"></div>
          </a-avatar>
        </div>
        <div class="yomi-chat-hi">Hi, Admin</div>
      </div>

      <div class="yomi-chat-input-wrapper">
        <div class="yomi-chat-input-card">
          <a-textarea
            v-model:value="message"
            :rows="1"
            auto-size
            class="yomi-chat-textarea"
            placeholder="和YoMi说点什么"
          />
          <div class="yomi-chat-toolbar">
            <a-button class="yomi-chat-icon-btn" shape="circle">
              <PaperClipOutlined />
            </a-button>
            <a-button class="yomi-chat-chip">
              <ExperimentOutlined />
              <span class="yomi-chat-chip-text">深度思考</span>
            </a-button>
            <a-button
              type="primary"
              shape="circle"
              class="yomi-chat-send"
            >
              <SendOutlined />
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SearchOutlined,
  MoreOutlined,
  MenuOutlined,
  CloseOutlined,
  PaperClipOutlined,
  ExperimentOutlined,
  SendOutlined
} from '@ant-design/icons-vue'

const keyword = ref('')
const message = ref('')

const onSearch = () => {
  // 预留搜索回调，方便后续接入实际逻辑
  // console.log('搜索：', keyword.value)
}
</script>

<style scoped>
.yomi-layout {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
}

.yomi-panel {
  width: 320px;
  min-height: 100%;
  padding: 12px;
  background: #ebeef5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0;
}

.yomi-search-input {
  margin-bottom: 8px;
}

/* 覆盖 Antd 的搜索输入样式，使其更接近设计 */
.yomi-panel :deep(.ant-input-search) {
  border-radius: 999px;
}

.yomi-panel :deep(.ant-input-affix-wrapper) {
  border-radius: 999px;
  border-color: #ebeef5;
  background: #ffffff;
  box-shadow: none;
}

.yomi-panel :deep(.ant-input-affix-wrapper-focused) {
  box-shadow: 0 0 0 1px rgba(64, 150, 255, 0.4);
}

.yomi-panel :deep(.ant-input) {
  font-size: 14px;
  color: #373f4b;
}

.yomi-panel :deep(.ant-input::placeholder) {
  color: #a7b1bf;
}

.yomi-search-icon {
  font-size: 16px;
  color: #4096ff;
  cursor: pointer;
}

.yomi-content {
  margin-top: 8px;
  padding: 0 0 12px;
  border-radius: 8px;
  overflow: hidden;
}

.yomi-card {
  background: transparent;
}

.yomi-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
}

.yomi-avatar {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle at 30% 20%, #a9d5ff 0%, #3f69ff 50%, #5b2cff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.yomi-avatar-inner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
}

.yomi-title {
  font-size: 16px;
  font-weight: 600;
  color: #373f4b;
}

.yomi-messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 0;
}

.yomi-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background: transparent;
}

.yomi-message-primary {
  background: rgba(0, 0, 0, 0.06);
}

.yomi-message-text {
  flex: 1;
  font-size: 14px;
  line-height: 22px;
  color: #373f4b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yomi-more-btn {
  width: 26px;
  height: 26px;
  border-radius: 4px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #6d7d95;
}

.yomi-more-btn-light {
  color: #c5ccd8;
}

/* 右侧主会话区域 */
.yomi-chat {
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 16px 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(210, 217, 236, 0.5);
}

.yomi-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.yomi-chat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #373f4b;
}

.yomi-chat-menu {
  font-size: 18px;
  color: #6d7d95;
  cursor: pointer;
}

.yomi-chat-close {
  font-size: 16px;
  color: #606266;
  cursor: pointer;
}

.yomi-chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.yomi-chat-avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.yomi-chat-avatar {
  background: radial-gradient(circle at 30% 20%, #a9d5ff 0%, #3f69ff 50%, #5b2cff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.yomi-chat-avatar-inner {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.yomi-chat-hi {
  font-size: 16px;
  color: #373f4b;
}

.yomi-chat-input-wrapper {
  margin-top: 40px;
}

.yomi-chat-input-card {
  background: #ffffff;
  border-radius: 12px;
  border: 0.5px solid #ebeef5;
  box-shadow: 0 0 24px rgba(210, 217, 236, 0.6);
  padding: 12px 12px 10px;
}

.yomi-chat-textarea {
  border: none;
  box-shadow: none;
  padding: 0;
}

.yomi-chat-textarea :deep(.ant-input) {
  border: none;
  box-shadow: none;
  padding: 0;
}

.yomi-chat-textarea :deep(.ant-input::placeholder) {
  color: #a7b1bf;
}

.yomi-chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.yomi-chat-icon-btn {
  border-radius: 8px !important;
  border-color: #ebeef5;
}

.yomi-chat-chip {
  border-radius: 8px;
  border-color: #ebeef5;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
}

.yomi-chat-chip-text {
  font-size: 12px;
  color: #373f4b;
}

.yomi-chat-send {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 480px) {
  .yomi-panel {
    width: 100%;
    border-radius: 0;
  }

  .yomi-layout {
    flex-direction: column;
  }
}
</style>