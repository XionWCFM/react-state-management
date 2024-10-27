"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { UnderlineInput } from "@xionwcfm/xds/underline-input";
import { Stack } from "@xionwcfm/xds/stack";
import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";

interface FormData {
  name: string;
  password: string;
}

const Form = () => {
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    toast.success("submit");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack my={"32"} gap={"32"}>
          <NameInput />
          <PasswordInput />
        </Stack>
        <SubmitButton />
      </form>
    </FormProvider>
  );
};

const SubmitButton = () => {
  return (
    <Button variant={"emphasis"} size={"lg"} type="submit">
      Submit
    </Button>
  );
};

const NameInput = () => {
  const { control } = useFormContext<FormData>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => <UnderlineInput placeholder="name" {...field} />}
    />
  );
};

const PasswordInput = () => {
  const { control } = useFormContext<FormData>();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <UnderlineInput placeholder="password" {...field} />
      )}
    />
  );
};

export default function Page() {
  return <Form />;
}
