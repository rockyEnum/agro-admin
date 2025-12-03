<template>
  <div class="chat-view">
    <ChatComponent class="chat-view__content" panelClass="chat-view__panel" chatClass="chat-view__chat" layoutClass="chat-view__layout" />
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
 

:deep(.chat-view__panel) {
  background: inherit !important;
  
  border-right: 0.5px solid #D2D9EC;
}

:deep(.chat-view__chat),
:deep(.chat-view__layout) {
  background: inherit;
  border-radius: 0 !important;
}
</style>
