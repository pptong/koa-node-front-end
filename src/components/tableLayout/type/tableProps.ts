import { ColumnProps, tableProps } from 'ant-design-vue/es/table/interface'
import { SetData } from '@/types/api/public/setData'
import { EditData } from '@/types/api/public/editData'
import { FormItem } from './formItem'
import { OptionsData } from './optionsData'


export interface TableProps {
    columns: ColumnProps[],
    formItem: FormItem[],
    selectItem?: FormItem[],
    rules?: any,
    get: SetData,
    add?: SetData,
    editData?: EditData,
    edit?: SetData,
    del?: SetData,
    options?: OptionsData,
    rowkey?: string,
    page?: boolean,
    operationWidth?: number,
    operationShow?: boolean,
  
    addItem?: FormItem[],
    editItem?: FormItem[],
    editKey?: string,
    delKey?: string,
    addRules?: any,
    editRules?: any,
    params?: any,
    addToData?: any
    replaceFields?: any
  }