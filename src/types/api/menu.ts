import { ResponseData } from "./public/baseResponseData/responseData";

export interface menu {
  id: number;
  menuName: string;
  menuCode: string;
  chilred: menu;
}

export interface menuTree extends ResponseData<menu[]> {}

