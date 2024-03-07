<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        新建用户
      </el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="55px"
        />

        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          width="100px"
        >
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scop">
            {{ formatUTC(scop.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scop">
            {{ formatUTC(scop.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="170px">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
              size="small"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import useSystemStore from '@/store/main/system/system'
import usePermissions from '@/hooks/usePermissions'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions('users' + ':create')
const isDelete = usePermissions('users' + ':delete')
const isUpdate = usePermissions('users' + ':update')
const isQuery = usePermissions('users' + ':query')

// 1.发起action,请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deleteUserByIdAction' ||
      name === 'editUserDataAction' ||
      name === 'newUserDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

fetchUsersListData()

// 2.获取usersList数据,进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUsersListData()
}
function handleCurrentChange() {
  fetchUsersListData()
}

// 4.定义函数,用于发送网络请求
function fetchUsersListData(formData?: any) {
  if (!isQuery) {
    systemStore.usersList = []
    systemStore.usersTotalCount = 0
    return
  }

  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 5.编辑和删除的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

// 6.新建和编辑用户的操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 6.新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}

defineExpose({ fetchUsersListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
    :deep(.el-button) {
      margin-left: 0;
      padding: 5px 0;
    }
    :deep(.el-button--small) {
      margin-left: 0;
      padding: 5px 0;
    }
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
