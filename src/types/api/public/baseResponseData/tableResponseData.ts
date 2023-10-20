import { ResponseData } from "@/types/api/public/baseResponseData/responseData";

interface Table {
  total: number;
  current: number;
  pageSize: number;
  data: [];
}

//分页列表的返回结构
export interface TableResponseData extends ResponseData<Table> {}
