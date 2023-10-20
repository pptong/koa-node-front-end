import { ResponseData } from "@/types/api/public/baseResponseData/responseData";

interface Upload {
  url: string;
}


//上传接口返回结构
export interface UploadResponseData extends ResponseData<Upload> {}