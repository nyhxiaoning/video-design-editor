import { FormItem, Input } from "@formily/antd";
import { FormProvider, createSchemaField } from "@formily/react";
import { createForm, onFormInit, onFormValuesChange } from "@formily/core";
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
});
const SchemaForm = ({
  schema,
}: {
  data: Record<string, any>;
  schema: Record<string, any>;
}) => {
  const form = createForm({
    effects() {
      onFormInit((form) => {
        console.log("form init", form.values);
      });
      onFormValuesChange(() => {});
    },
  });
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  );
};
const EditorAttribute = () => {
  const schema = {
    type: "object",
    properties: {
      input: {
        type: "string",
        title: "输入框",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-component-props": {
          style: {
            width: 240,
          },
        },
      },
      textarea: {
        type: "string",
        title: "输入框",
        "x-decorator": "FormItem",
        "x-component": "Input.TextArea",
        "x-component-props": {
          style: {
            width: 240,
          },
        },
      },
    },
  };
  const renderComponent = () => {
    if (1) {
      return <SchemaForm data={{}} schema={schema} />;
    }
    // 如果组件不存在，可以返回null或一些加载/错误指示器
    return null;
  };

  return (
    <div className="p-4 w-[320px] min-w-[320px] border-solid border-l-2 h-full border-[#101214]">
      {renderComponent()}
    </div>
  );
};
export default EditorAttribute;
