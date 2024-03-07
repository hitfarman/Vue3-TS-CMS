import type { RouteRecordRaw } from 'vue-router'

function loadLoaclRoutes() {
  // 1.动态获取所有的路由对象,放到数组中
  // 路由对象都在独立的文件中
  // 从文件中将所有的路由对象都先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取router/main下所有的ts文件:vite中是import.meta.glob; webpack中是require.context
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  // 1.2将加载的对象放入到localRoutes
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLoaclRoutes()

  // 2.根据菜单去匹配正确的路由,动态添加路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      //类型缩小
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是,只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.将二级菜单对应的路由加入到routes
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumb {
  name: string
  path: string
}
export function mapMenusToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumb[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id的列表
 * @param menulist
 */
export function mapMenuListToIds(menulist: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menulist)

  return ids
}

/**
 * 从菜单映射到按钮的权限数组
 * @param menulist: 菜单列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menulist: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      // 是第三级,递归出口,把权限加入到数组permissions中
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        // 不是第3级,做一个递归的调用; 当item没有children时,给它传入一个空数组[],而不能是默认的null
        recurseGetPermission(item.children ?? [])
      }
    }
  }

  recurseGetPermission(menulist)

  return permissions
}
