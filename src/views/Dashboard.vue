<template>
  <div class="dashboard">
    <a-page-header title="仪表盘" />
    <a-row :gutter="16" style="margin-top: 24px">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总用户数"
            :value="1128"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <user-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="今日访问"
            :value="1128"
            :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <eye-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="订单数"
            :value="93"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <shopping-cart-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="销售额"
            :value="112893"
            :precision="2"
            :value-style="{ color: '#722ed1' }"
          >
            <template #prefix>
              <dollar-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  DollarOutlined
} from '@ant-design/icons-vue'
</script>

<style scoped lang="less">
.dashboard {
  .ant-card {
    text-align: center;
  }
}
</style>

