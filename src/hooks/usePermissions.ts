import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  // 0.获取是否有对应的增删改查的权限
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  // 这里find()的返回结果是: string(找到) | undefined(未找到)
  // 但是,我们想拿到的结果是boolean类型,所以,在前面加上 !!(第一个!是给它取反转成boolean类型,再取返就得到正确结果)
  return !!permissions.find((item) => item.includes(permissionID))
  // return Boolean(permissions.find((item) => item.includes(permissionID)))
}

export default usePermissions
