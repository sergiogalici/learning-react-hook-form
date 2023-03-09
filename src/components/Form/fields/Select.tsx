import React from "react";
import { FieldType } from "../../../data/data";
import { useFormContext } from "react-hook-form";

type SelectPropsType = {
  id: string;
  dataChildren?: FieldType[];
};

export const Select = ({ id, dataChildren }: SelectPropsType) => {
  const { register } = useFormContext();
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <select {...register(id)}>
        {dataChildren &&
          dataChildren.map((child) => {
            return (
              <option key={child.id} value={child.id}>
                {child.id}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;
