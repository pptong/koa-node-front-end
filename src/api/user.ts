import request from '../request'
import { AxiosResponse } from 'axios'
import { EditData } from '@/types/api/public/editData'
import { ResponseData } from '@/types/api/public/baseResponseData/responseData'
import { TableResponseData } from '@/types/api/public/baseResponseData/tableResponseData'

type ConfigType<T=ResponseData> = Promise<AxiosResponse<T>>

export const GetUsers = (data: any): ConfigType<TableResponseData> => {
  return request({
    url: '/user/getusers',
    method: 'post',
    data
  })
}



export const addUser = (data: any): ConfigType => {
  return request({
    url: '/user/createuser',
    method: 'post',
    data
  })
}

export const getUser = (data: any): ConfigType => {
  return request({
    url: '/user/getuser',
    method: 'post',
    data
  })
}

export const editUser = (data: any): ConfigType => {
  return request({
    url: '/user/updateuser',
    method: 'post',
    data
  })
}

export const delUser = (data: any): ConfigType => {
  return request({
    url: '/user/deleteuser',
    method: 'post',
    data
  })
}
