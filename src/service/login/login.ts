import type { IAccount } from '@/types'
import hyRequest from '..'
import { HEADERS } from '../config'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    headers: HEADERS,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    headers: HEADERS
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
    headers: HEADERS
  })
}
