import hyRequest from '..'
import { HEADERS } from '../config'

export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list',
    headers: HEADERS
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list',
    headers: HEADERS
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
    headers: HEADERS
  })
}
