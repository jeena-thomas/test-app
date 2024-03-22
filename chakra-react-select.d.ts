import { ComponentProps, ReactNode } from "react";
declare module "chakra-react-select" {
  export interface SelectProps extends ComponentProps<"div"> {
    isMulti?: boolean;
    options: Array<{ value: string; label: ReactNode }>;
    components?: {
      Option?: React.FC<any>;
    };
    // Add any other props specific to the Select component from chakra-react-select
  }

  const Select: React.FC<SelectProps>;
  export default Select;
}
