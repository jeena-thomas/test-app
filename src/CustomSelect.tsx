import React from "react";
import { components, Select } from "chakra-react-select";
// import type { SelectProps } from "../chakra-react-select";
// import { SelectProps } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { InputRightElement } from "@chakra-ui/react";

const CustomOption = ({ children, ...props }: any) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {console.log("log:: ", children)}
        {children}
        {props.isSelected && (
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        )}
      </div>
    </components.Option>
  );
};

const CustomSelect = (props: any) => {
  return (
    <Select
      // name="gender"
      components={CustomOption}
      selectedOptionColorScheme="blue"
      colorScheme="purple"
      {...props}
    />
  );
};

export default CustomSelect;
