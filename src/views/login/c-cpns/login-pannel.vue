<template>
  <div class="login-panel">
    <h1 class="title">Backend Management System</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.帐号登录 -->
        <el-tab-pane label="Account Login" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">Account Login</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 2.手机登录 -->
        <el-tab-pane label="Phone Login" name="phone">
          <template v-slot:label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">Phone Login</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="Remember Password" size="large" />
      <el-link type="primary">Forgot Password</el-link>
    </div>
    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleLoginBtnClick"
    >
      Login
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isKeepPwd = ref<boolean>(localCache.getCache('isKeepPwd') ?? false)
watch(isKeepPwd, (newValue) => {
  localCache.setCache('isKeepPwd', newValue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

// 处理登录按钮事件
const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isKeepPwd.value)
    // console.log('帐号登录')
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
    font-size: 24px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
