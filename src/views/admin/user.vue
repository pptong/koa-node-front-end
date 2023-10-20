<template>
  <tableLayout 
    :columns="columns" 
    :formItem="formItem" 
    :selectItem="selectItem" 
    :rules="rules" 
    :get="GetUsers"
    :add="addUser" 
    :editData="getUser" 
    :edit="editUser" 
    :del="delUser" 
    @editOpen="editOpen" 
    @addOpen="addOpen"
    @editBefore="editBefore" 
    @createBefore="createBefore"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" ref="layout">
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
import { GetUsers, addUser, getUser, editUser, delUser } from '../../api/user'
import { getAllRoles } from '../../api/role'
import tableLayout from '../../components/tableLayout/tableLayout.vue'
export default defineComponent({
  name: 'el_table',
  components: {
    tableLayout
  },
  setup() {
    // 列表
    const columns = [
      { title: '序号', dataIndex: 'id' },
      { title: '账号', dataIndex: 'username' },
      { title: '姓', dataIndex: 'firstName' },
      { title: '名', dataIndex: 'lastName' },
      { title: '昵称', dataIndex: 'name' },
      { title: '角色', dataIndex: 'roles' },
      { title: '创建时间', dataIndex: 'createdAt' },
    ]

    // 表单
    const formItem: any = ref<any[]>()
    const formItemFixed = [
      { title: '账号', key: 'username', type: 'input' },
      { title: '姓', key: 'firstName', type: 'input' },
      { title: '名', key: 'lastName', type: 'input' },
      { title: '昵称', key: 'name', type: 'input' }
    ]

    // 筛选
    const selectItem = ref([
      { title: '账号', key: 'username', type: 'input', itemWidth: '290px' },
      { title: '姓', key: 'firstName', type: 'input', itemWidth: '290px' },
      { title: '名', key: 'lastName', type: 'input', itemWidth: '290px' },
      { title: '昵称', key: 'name', type: 'input', itemWidth: '290px' },
    ])

    // 规则
    const rules = {
      name: [{ required: true, message: '请输入昵称', trigger: 'change' }],
      firstName: [{ required: true, message: '请输入年姓', trigger: 'change' }],
      lastName: [{ required: true, message: '请输入名', trigger: 'change' }],
      username: [{ required: true, message: '请输入账号', trigger: 'change' }],
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

      //将role转换为下拉框value
      let rolesOption: any = [];
      for (let i = 0; i < (data.roles || []).length; i++) {
        rolesOption.push(data.roles[i].roleCode);
      }
      data.roles = rolesOption;
    }




    //打开新增窗口后执行
    const addOpen = () => {
      getFormItem().then(item => {
        formItem.value = item;
      })
    }


    
    //获取FormItem
    const getFormItem = async () => {
      const roles = await getAllRoles({})
      const selectOptions = roles.data.data?.map(x => Object.assign({ value: x.roleCode, label: x.roleName }));
      return [
        ...formItemFixed, ...[{
          title: '角色', key: 'roles', type: 'multiSelect',
          options: selectOptions
        }]
      ]
    }


    //将下拉框的值转换为role
    const setSubmitFormData = (data: any) => {
      const rolesOption = data.roles;
      let roles = [];
      for (let i = 0; i < (rolesOption || []).length; i++) {
        roles.push({ "roleCode": rolesOption[i] });
      }
      data.roles = roles;
    }


    return {
      columns, formItem, selectItem, createBefore, editBefore, GetUsers, addUser, getUser, editUser, delUser, rules, selectedRowKeys, onSelectChange,
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
