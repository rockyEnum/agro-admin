<template>
  <div class="chat-view">
    <ChatComponent class="chat-view__content" panelClass="chat-view__panel" chatClass="chat-view__chat" layoutClass="chat-view__layout" />
  </div>
</template>

<script setup lang="ts">
import ChatComponent from '@/components/chat.vue'
</script>

<style scoped>
.chat-view{
  width: 100%;
  height: 100%;
  padding:0 16px 16px;
}
 .chat-view__content{
 
  background: #fff;
 }

:deep(.chat-view__panel) {
  background: inherit !important;
  
  border-right: 0.5px solid #D2D9EC;
}

:deep(.chat-view__chat),
:deep(.chat-view__layout) {
  /* background: inherit; */
  border-radius: 8px !important;
}
</style>
