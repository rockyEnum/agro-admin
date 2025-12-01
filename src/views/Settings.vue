<template>
  <div class="settings">
    <a-page-header title="系统设置" />
    <a-card style="margin-top: 24px">
      <a-form
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="系统名称">
          <a-input v-model:value="formState.systemName" />
        </a-form-item>
        <a-form-item label="系统描述">
          <a-textarea v-model:value="formState.description" :rows="4" />
        </a-form-item>
        <a-form-item label="启用通知">
          <a-switch v-model:checked="formState.notification" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 14 }">
          <a-button type="primary">保存</a-button>
          <a-button style="margin-left: 10px">重置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formState = ref({
  systemName: 'Agro Admin',
  description: '农业管理系统',
  notification: true
})
</script>

<style scoped lang="less">
.settings {
  // 样式
}
</style>

