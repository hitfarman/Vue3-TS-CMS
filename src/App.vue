<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  /* 设置App占满全屏 */
  /* position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  width: 100vw;
  height: 100vh;
}
</style>
