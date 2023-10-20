import { ResponseData } from './public/baseResponseData/responseData'
import { UserState } from '@/store/modules/auth'

// 登录接口约束
export interface LoginSuccess extends ResponseData {
  token: string
}

// 用户信息接口约束
export interface UserInfo extends ResponseData {
  info: UserState
}

// 路由对象约束
export interface RouterObj {
  id: number,
  path: string,
  menuName: string,
  component: string,
  menuCode: string,
  redirect?: string,
  icon?: string,
  children?: RouterObj[],
  pid?: number,
  hidden?: boolean,
  keepAlive?: boolean
}

// 路由数组约束
export type RouterTable = RouterObj[]

// 路由接口约束
export interface RouterData extends ResponseData {
  data: RouterTable
}