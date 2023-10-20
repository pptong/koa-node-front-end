import { UploadData } from "@/types/api/public/uploadData"

// 表单项类型_增改查
export interface FormItem {
    title: string,
    key: string,
    type: string,
    options?: any[],
    itemWidth?: string,
    defaultVal?: any,
    labelCol?: number,
    upload?: UploadData,
    slotName?: string,
    optionKey?: string,
    disabled?: boolean
  }
  