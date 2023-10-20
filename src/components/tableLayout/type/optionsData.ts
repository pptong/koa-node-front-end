import { AxiosResponse } from 'axios'

// options选项查询函数
export type OptionsData = () => Promise<AxiosResponse<{
    code: number,
    message: string,
    data: any
  }>>