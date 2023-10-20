import request from '../request'
import { AxiosResponse } from 'axios'
//import { TableList, EditData } from '@/types/api/user'
import { EditData } from '@/types/api/public/editData'
import { ResponseData } from '@/types/api/public/baseResponseData/responseData'
import { TableResponseData } from '@/types/api/public/baseResponseData/tableResponseData'
import { RoleList } from '@/types/api/role'
import { SetData } from '@/types/api/public/setData'

type ConfigType<T=ResponseData> = Promise<AxiosResponse<T>>

export const getAllRoles = (data: any): ConfigType<RoleList> => {
  return request({
    url: '/role/getallroles',
    method: 'post',
    data
  })
}





export const  getRoles= (data: any): ConfigType<TableResponseData> => {
  return request({
    url: '/role/getroles',
    method: 'post',
    data
  })
}



export const addRole = (data: any): ConfigType<TableResponseData> => {
  return request({
    url: '/role/createrole',
    method: 'post',
    data
  })
}

export const getRole = (data: any): ConfigType => {
  return request({
    url: '/role/getrole',
    method: 'post',
    data
  })
}

export const editRole = (data: any): ConfigType => {
  return request({
    url: '/role/updaterole',
    method: 'post',
    data
  })
}

export const delRole = (data: any): ConfigType => {
  return request({
    url: '/role/deleterole',
    method: 'post',
    data
  })
}
