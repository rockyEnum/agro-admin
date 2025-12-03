<template>
  <div class="chat-view">
    <ChatComponent class="chat-view__content" />
  </div>
</template>

<script setup lang="ts">
import ChatComponent from '@/components/chat.vue'
</script>

<style scoped>
.chat-view,
.chat-view__content {
  width: 100%;
  height: 100%;
}
</style>

