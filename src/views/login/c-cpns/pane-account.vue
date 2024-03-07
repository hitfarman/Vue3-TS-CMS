<template>
  <div class="pane-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="Account" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME),
  password: localCache.getCache(CACHE_PASSWORD)
})

const formRef = ref<InstanceType<typeof ElForm>>()

// 2.定义校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input account name', trigger: 'blur' },
    // {
    //   pattern: /^[A-Za-z0-9]{6,20}$/,
    //   message: 'Accountmust be 6 to 20 character or number',
    //   trigger: 'change'
    // },
    {
      pattern: /^[A-Za-z0-9]{6,20}$/,
      message: 'Account must be 6 to 20 character or number',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input account password',
      trigger: 'blur'
    },
    // {
    //   pattern: /^[A-Za-z0-9]{6,20}$/,
    //   message: 'Password must be 6 to 20 character or number',
    //   trigger: 'change'
    // },
    {
      pattern: /^[A-Za-z0-9]{6,20}$/,
      message: 'Password must be 6 to 20 character or number',
      trigger: 'blur'
    }
  ]
})

const loginStore = useLoginStore()
// 3.执行帐号的登录逻辑
function loginAction(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带帐号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isKeepPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, bad account or password format!')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
