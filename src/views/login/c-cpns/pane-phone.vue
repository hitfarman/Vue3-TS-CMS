<template>
  <div class="pane-phone">
    <el-form label-width="100px" :label-position="labelPosition" size="large">
      <el-form-item label="Phone Number">
        <el-input />
      </el-form-item>
      <el-form-item label="Validate Code">
        <div class="verify-code">
          <el-input />
          <span>
            <el-button class="get-btn" type="primary">Get Code</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('left')
</script>

<style lang="less" scoped>
.pane-phone {
  color: red;
}

.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
