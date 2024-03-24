import React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Select,
  components,
  Props as SelectProps,
  GroupBase,
} from "chakra-react-select";
import { CheckIcon } from "@chakra-ui/icons";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
}

export const CustomOption = ({ children, ...props }: any) => {
  return (
    <components.Option {...props} selectedOptionColorScheme="red">
      {console.log(props)}
      <InputGroup>
        <div>
          {children}
          {props.isSelected && (
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          )}
        </div>
      </InputGroup>
    </components.Option>
  );
};

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */
function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} isInvalid={!!error} id={name} m={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select<Option, IsMulti, Group>
        options={options}
        {...selectProps}
        {...field}
        components={{ Option: CustomOption }}
        variant="filled"
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default ControlledSelect;
