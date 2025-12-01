<template>
  <div class="users">
    <a-page-header title="用户管理" />
    <a-card style="margin-top: 24px">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ pageSize: 10 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const dataSource = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: '管理员'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: '普通用户'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    role: '普通用户'
  }
])
</script>

<style scoped lang="less">
.users {
  // 样式
}
</style>

