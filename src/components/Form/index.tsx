import React from "react";
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { FieldType, FormType, SimpleFormType } from "../../data/data";
import { Input } from "./fields/Input";
import Select from "./fields/Select";

const onSubmit = (data: any) => console.log(data);

type FormPropsType = {
  formData: FormType;
};

const mapper = (item: FieldType): React.ReactNode => {
  switch (item.type) {
    case "input":
      return <Input key={item.id} id={item.id} />;
    case "select":
      return <Select key={item.id} id={item.id} dataChildren={item.children} />;
    case "subForm":
      return item.subform?.map(({ form }) => {
        return (
          <div key={Date.now() * Math.random()}>
            {form.map((item) => {
              return mapper(item);
            })}
          </div>
        );
      });
  }
};

export const Form = ({ formData }: FormPropsType) => {
  const methods = useForm<SimpleFormType>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formData.form.map((item) => {
          return mapper(item);
        })}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
