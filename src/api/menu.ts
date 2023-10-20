import request from '../request'
import { AxiosResponse } from 'axios'
import { ResponseData } from '@/types/api/public/baseResponseData/responseData'
import { menuTree } from '@/types/api/menu'

type ConfigType<T=ResponseData> = Promise<AxiosResponse<T>>

export const getAllMenus = (data: any): ConfigType<menuTree> => {
  return request({
    url: '/menu/getallmenus',
    method: 'post',
    data
  })
}
