import React, { InputHTMLAttributes } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isSubmitting: any;
};

export const InputField: React.FC<InputFieldProps> = ({
  isSubmitting,
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          rounded={25}
          bg={colorMode === "light" ? "gray.200" : "gray.900"}
          height="40px"
          pr="4.5rem"
          {...field}
          {...props}
          id={field.name}
        />
        <InputRightElement width="4.5rem">
          <Button
            isLoading={isSubmitting}
            variantColor={colorMode === "light" ? "blue" : "blue"}
            height="25px"
            rounded={20}
            mr="10px"
            type="submit"
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
