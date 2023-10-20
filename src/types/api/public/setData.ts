import { ResponseData } from "@/types/api/public/baseResponseData/responseData";
import { AxiosResponse } from 'axios'

//设置数据时后台的返回结构
export type SetData = (x?: any) => Promise<AxiosResponse<ResponseData>>