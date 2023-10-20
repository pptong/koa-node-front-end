<template>
  <tableLayout 
    :columns="columns" 
    :formItem="formItem" 
    :selectItem="selectItem" 
    :rules="rules" 
    :get="getRoles"
    :add="addRole" 
    :editData="getRole" 
    :edit="editRole" 
    :del="delRole" 
    @editOpen="editOpen" 
    @addOpen="addOpen"
    @editBefore="editBefore" 
    @createBefore="createBefore"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" 
    ref="layout">
    <template #operationMore="item">
      <a-divider type="vertical" />
    </template>
    <template v-slot:custom="data">
      <a-input v-model:value="data.formData[data.key]" />
    </template>
  </tableLayout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getRoles, addRole, getRole, editRole, delRole } from '../../api/role'
import tableLayout from '../../components/tableLayout/tableLayout.vue'
import { getAllMenus } from '@/api/menu'
export default defineComponent({
  name: 'el_table',
  components: {
    tableLayout
  },
  setup() {
    // 列表
    const columns = [
      { title: '序号', dataIndex: 'id' },
      { title: '角色', dataIndex: 'roleName' },
      { title: '角色代码', dataIndex: 'roleCode' },
      { title: '描述', dataIndex: 'roleDescrption' },
      { title: '创建时间', dataIndex: 'createdAt' },
    ]

    // 表单
    const formItem: any = ref<any[]>()
    const formItemFixed = [
      { title: '角色', key: 'roleName', type: 'input' },
      { title: '角色代码', key: 'roleCode', type: 'input' },
      { title: '描述', key: 'roleDescrption', type: 'input' },


    ]

    // 筛选
    const selectItem = ref([
      { title: '角色', key: 'roleName', type: 'input', itemWidth: '290px' },
      { title: '描述', key: 'roleDescrption', type: 'input', itemWidth: '290px' },
    ])

    // 规则
    const rules = {
      roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
      roleDescrption: [{ required: true, message: '请输入角色描述', trigger: 'change' }],
    }


    const selectedRowKeys = ref<any[]>([])
    const onSelectChange = (keys: []) => {
      selectedRowKeys.value = keys
    }



    //在创建保存前执行
    const createBefore = (data: any) => {
      setSubmitFormData(data);


    };

    //在编辑保存前执行
    const editBefore = (data: any) => {
      setSubmitFormData(data);


    };


    //在打开编辑窗口后执行
    const editOpen = (data: any) => {
      getFormItem().then(item => {
        formItem.value = item;
      })

      //将menus转换为下拉框value
      let options: any = [];
      for (let i = 0; i < (data.menus || []).length; i++) {
        options.push(data.menus[i].menuCode);
      }
      data.menus = options;

    }




    //打开新增窗口后执行
    const addOpen = () => {

      getFormItem().then(item => {
        formItem.value = item;
      })

    }



    //获取FormItem
    const getFormItem = async () => {
      const menuTree = await getAllMenus({})
      const treeItem = getTreeItem(menuTree.data.data)
      return [
        ...formItemFixed, ...[{
          title: '菜单权限', key: 'menus', type: 'treeSelect',
          options: treeItem
        }]
      ]
    }

    const getTreeItem = (data: any) => {
      var list: Array<any> = [];
      for (let i = 0; i < data.length; i++) {
        var e = {
          title: data[i].menuName,
          value: data[i].menuCode,
          key: data[i].menuCode,
          children: getTreeItem(data[i].children || [])
        }
        list.push(e);
      }
      return list;
    }


    //将下拉框的值转换为menus
    const setSubmitFormData = (data: any) => {
      const menus = data.menus;
      let menuObjs = [];
      for (let i = 0; i < (menus || []).length; i++) {
        menuObjs.push({ "menuCode": menus[i] });
      }
      data.menus = menuObjs;
    }


    return {
      columns, formItem, selectItem, createBefore, editBefore, getRoles, addRole, getRole, editRole, delRole, rules, selectedRowKeys, onSelectChange,
      editOpen, addOpen
    }

  }
})
</script>
<style lang="scss" scoped>
pre {
  background-color: #f6f6f6;
  padding: 10px;
  margin: 10px;
  display: block;
}
</style>
