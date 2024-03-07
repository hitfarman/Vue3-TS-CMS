<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapMenusToBreadcrumbs } from '@/utils/map-menus'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const route = useRoute()
const breadcrumbs = computed(() => mapMenusToBreadcrumbs(route.path, userMenus))
</script>

<style lang="less" scoped></style>
