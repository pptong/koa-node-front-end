import { UploadResponseData } from './baseResponseData/uploadResponseData'
import { AxiosResponse } from 'axios'

//设置数据时后台的返回结构
export type UploadData = (x?: any) => Promise<AxiosResponse<UploadResponseData>>