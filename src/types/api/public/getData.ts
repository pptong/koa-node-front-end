import { AxiosResponse } from 'axios'
import { ResponseData } from "@/types/api/public/baseResponseData/responseData";

//获取列表数据的接口格式
export type GetData = (x?: any) => Promise<AxiosResponse<ResponseData>>