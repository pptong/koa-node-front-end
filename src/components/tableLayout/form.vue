<template>
  <a-form ref="formRef" :rules="rules" :model="formData" :name="name" layout="inline" class="comform">
    <template v-for="item in formItem">
      <a-form-item :label="item.title" :name="item.key" :style="{ width: item.itemWidth || 'calc(50% - 20px)' }"
        :labelCol="{ span: item.labelCol ? item.labelCol : 6 }"
        :wrapperCol="{ span: item.labelCol ? 24 - item.labelCol : 18 }" class="form__item">

        <!-- 输入框 -->
        <a-input v-model:value="formData[item.key]" :allowClear="true" autocomplete="off"
          :placeholder="'请输入' + item.title" :disabled="item.disabled ? true : false" v-if="item.type === 'input'" />

        <!-- 多选下拉选择框 -->
        <a-select v-model:value="formData[item.key]" mode="multiple" :placeholder="'请选择' + item.title" :allowClear="true"
          v-if="item.type === 'multiSelect'">
          <a-select-option :value="option.value" v-for="option in item.options">{{ option.label }}</a-select-option>
        </a-select>

        <!-- 下拉选择框 -->
        <a-select v-model:value="formData[item.key]" :placeholder="'请选择' + item.title" :allowClear="true"
          :disabled="item.disabled ? true : false" v-if="item.type === 'select'">

          <a-select-option :value="option.value" v-for="option in item.options">
            {{ option.label }}
          </a-select-option>


        </a-select>


        <!-- 时间选择框 -->
        <a-date-picker v-model:value="formData[item.key]" :allowClear="true" valueFormat="YYYY-MM-DD" style="width: 100%;"
          :disabled="item.disabled ? true : false" v-if="item.type === 'datePicker'" />


        <!-- 时间范围选择框 -->
        <a-range-picker v-model:value="formData[item.key]" :allowClear="true" valueFormat="YYYY-MM-DD"
          style="width: 100%;" :disabled="item.disabled ? true : false" v-if="item.type === 'rangePicker'" />


        <!-- 多行文本输入 -->
        <a-textarea v-model:value="formData[item.key]" :allowClear="true" autocomplete="off"
          :placeholder="'请输入' + item.title" style="width: 100%;" :disabled="item.disabled ? true : false"
          v-if="item.type === 'textarea'" />


        <!-- 树形下拉选择框 -->
        <a-tree-select v-model:value="formData[item.key]" :placeholder="'请选择' + item.title" :allowClear="true"
          :tree-data="item.options" :dropdownStyle="{ maxHeight: '500px' }" style="width: 100%;"
          :disabled="item.disabled ? true : false" v-if="item.type === 'treeSelect'" tree-checkable  />


        <!-- 数值输入框 -->
        <a-input-number v-model:value="formData[item.key]" autocomplete="off" :placeholder="'请输入' + item.title"
          style="width: 100%;" :disabled="item.disabled ? true : false" v-if="item.type === 'number'" />
        <!-- 密码输入框 -->
        <a-input-password v-model:value="formData[item.key]" autocomplete="off" :placeholder="'请输入' + item.title"
          style="width: 100%;" :disabled="item.disabled ? true : false" v-if="item.type === 'password'" />
        <!-- 开关 -->
        <a-switch v-model:checked="formData[item.key]" checked-children="开" un-checked-children="关"
          :disabled="item.disabled ? true : false" v-if="item.type === 'switch'" />
        <!-- 单选框 -->
        <a-radio-group v-model:value="formData[item.key]" :options="item.options" :disabled="item.disabled ? true : false"
          v-if="item.type === 'radio'" />
        <!-- 多选框 -->
        <a-checkbox-group v-model:value="formData[item.key]" :options="item.options"
          :disabled="item.disabled ? true : false" v-if="item.type === 'checkbox'" />
        <!-- 图片上传 -->
        <upload v-model:value="formData[item.key]" :upload="item.upload" :disabled="item.disabled ? true : false"
          v-if="item.type === 'upload'" />
        <!-- 文件上传 -->
        <uploadFile v-model:value="formData[item.key]" :upload="item.upload" :disabled="item.disabled ? true : false"
          v-if="item.type === 'uploadFile'" />
        <!-- 自定义插槽 -->
        <slot :name="item.slotName" :formData="formData" :key="item.key" v-if="item.type === 'slot'" />
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts">
import upload from './upload.vue'
import uploadFile from './uploadFile.vue'
import { message } from 'ant-design-vue'
import { SetData } from '@/types/api/public/setData'
import { FormItem } from './type/formItem'
import { defineComponent, PropType, ref, watch, reactive, computed } from 'vue'
export default defineComponent({
  name: 'comForm',
  emits: ['saveSucceed', 'saveFailed', 'saveBefore'],
  components: {
    upload,
    uploadFile
  },
  props: {
    // 表单项
    formItem: {
      type: Array as PropType<FormItem[]>,
      required: true
    },
    // 提交数据的api接口
    setData: {
      type: Function as PropType<SetData>,
      required: true
    },
    // 表单名称
    name: {
      type: String,
      required: false,
      default: 'form'
    },
    // 修改数据的key
    dataKey: {
      type: String,
      required: false,
      default: undefined
    },
    // 规则
    rules: {
      type: Object,
      required: false,
      default: {}
    },
    // 初始化数据(编辑)
    defaultData: {
      type: Object,
      required: false,
      default: {}
    },
    // 表单额外追加数据
    additional: {
      type: Object,
      required: false,
      default: {}
    }
  },
  setup(props, context) {

    // 表单数据
    const formData = ref(props.defaultData);
    const formRef = ref()

    /**
     * @desc: 表单提交
     */
    const onSubmit = () => {
      formRef.value.validate().then(() => {

        let submitData = Object.assign({},formData.value);
        
        context.emit('saveBefore', submitData)
        props.setData(submitData).then(e => {
          message.success(e.data.message)
          context.emit('saveSucceed', e)
        }).catch(err => {
          message.error(err.message || err.data.message)
          context.emit('saveFailed', 'api返回错误')
        })
      }).catch(() => {
        context.emit('saveBefore', '规则验证未通过')
      })
    }

    /**
     * @desc: 表单重置
     */
    const reset = () => {
      formRef.value.resetFields()
    }

    return { formData, formRef, onSubmit, reset }

  }
})
</script>
<style  lang="scss" scoped>
.comform {
  & .form__item {
    margin-bottom: 16px;

    & .ant-form-item-label {
      flex-grow: 1 !important;
      flex-shrink: 0;
    }
  }
}
</style>
<style  lang="scss">
.comform {
  & .form__item {
    & .ant-form-item-label {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
}
</style>