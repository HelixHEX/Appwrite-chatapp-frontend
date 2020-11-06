import React, { InputHTMLAttributes } from "react";

import { FormControl, FormErrorMessage, FormLabel, Input, useColorMode } from "@chakra-ui/core";
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};
 

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, {error}] = useField(props);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input rounded={25} bg={colorMode === "light" ? "gray.200" : 'blue.900'}  {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

