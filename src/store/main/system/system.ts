import { defineStore } from 'pinia'
import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },

    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 2.重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newUserResult = await newUserData(userInfo)
      console.log(newUserResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editUserResult = await editUserData(id, userInfo)
      console.log(editUserResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对所有的页面的数据: 增删改查 */

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      // this.pageTotalCount = totalCount // 正式方案有bug
      // 目前因为服务器每次按条件查询部门时totalCount总是返回所有记录条目,临时解决方案
      this.pageTotalCount =
        Object.keys(queryInfo).length === 2 ? totalCount : list.length
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 重新获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newPageResult = await newPageData(pageName, pageInfo)
      console.log(newPageResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 重新获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editPageResult = await editPageData(pageName, id, pageInfo)
      console.log(editPageResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      //重新获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
