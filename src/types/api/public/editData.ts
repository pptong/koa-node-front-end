import { ResponseData } from "@/types/api/public/baseResponseData/responseData";
import { AxiosResponse } from 'axios'

//编辑数据时后台的返回结构
export type EditData = (x?: any) => Promise<AxiosResponse<ResponseData>>