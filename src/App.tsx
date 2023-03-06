import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email(),
    age: yup.number().positive().integer().required().min(18).max(99),
    numberOfRecidencies: yup
      .number()
      .positive()
      .integer()
      .required()
      .min(1)
      .max(99),
    address: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
    state: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const App = () => {
  const [numOfRecidencies, setNumOfRecidencies] = React.useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Enter your first name" {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input placeholder="Enter your last name" {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <label htmlFor="age">Enter your age</label>
      <input
        min={18}
        max={99}
        defaultValue={18}
        type="number"
        {...register("age")}
      />
      <p>{errors.age?.message}</p>

      <input placeholder="Enter your email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <label htmlFor="numberOfRecidencies">Select number of recidencies</label>
      <input
        min={1}
        defaultValue={1}
        type="number"
        {...register("numberOfRecidencies")}
        onChange={(e) => setNumOfRecidencies(Number(e.target.value))}
      />
      <p>{errors.numberOfRecidencies?.message}</p>

      <div className="recidencies">
        {Array.from(Array(numOfRecidencies)).length ? (
          Array.from(Array(numOfRecidencies)).map((_, i) => {
            console.log("we are here");
            return (
              <div key={Date.now() * Math.random()}>
                <p>Recidence # {i + 1}</p>
                <input
                  placeholder={`Enter Residence #${i + 1} address`}
                  {...register("address")}
                />
                <p>{errors.address?.message}</p>

                <input
                  placeholder={`Enter Residence #${i + 1} postal code`}
                  {...register("postalCode")}
                />
                <p>{errors.postalCode?.message}</p>

                <input
                  placeholder={`Enter Residence #${i + 1} city`}
                  {...register("city")}
                />
                <p>{errors.city?.message}</p>

                <input
                  placeholder={`Enter Residence #${i + 1} state`}
                  {...register("state")}
                />
                <p>{errors.state?.message}</p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>

      <input type="submit" />
    </form>
  );
};

export default App;
