import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ChakraProvider,
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Spinner,
} from "@chakra-ui/react";
import CustomSelect from "./CustomSelect";

// Custom hook for form submission and data display
// const useFormSubmit = () => {
//   const formDataRef = useRef(null);

//   const showFormData = (data: any) => {
//     formDataRef.current = data;
//   };

//   return { formDataRef, showFormData };
// };

// Custom component for displaying form data
const FormDataDisplay = forwardRef((props, ref) => {
  const [formData, setFormData] = React.useState(null);

  useImperativeHandle(ref, () => ({
    showFormData: (data: any) => setFormData(data),
  }));

  return formData ? (
    <Box mt={4}>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </Box>
  ) : null;
});

const FormComponent = () => {
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });
  // const { formDataRef, showFormData } = useFormSubmit();

  interface FormDataDisplayRefObject {
    showFormData: (data: any) => void;
  }

  const formDataDisplayRef = useRef<FormDataDisplayRefObject>(null);

  const onSubmit = async (data: any) => {
    // Show loading spinner for 3 seconds
    const showLoadingSpinner = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("res");
        }, 3000);
      });

    await showLoadingSpinner();
    // showFormData(data);
    if (formDataDisplayRef.current) {
      formDataDisplayRef.current?.showFormData(data);
    }
  };

  const namePattern = /^[a-zA-Z\s'-]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(\+91\d{10})$/;

  const isValidDate = (date: string) => {
    const parsedDate = Date.parse(date);
    console.log("parsed date", !isNaN(parsedDate));
    return !isNaN(parsedDate);
  };

  // const formatDate = (date: Date) => {
  //   console.log("log::  value", date);
  //   const parsedDate = new Date(date);
  //   console.log(
  //     "format",
  //     `${parsedDate.getDate()}/${parsedDate.toLocaleString("default", {
  //       month: "short",
  //     })}/${parsedDate.getFullYear()}`
  //   );
  //   return `${parsedDate.getDate()}/${parsedDate.toLocaleString("default", {
  //     month: "short",
  //   })}/${parsedDate.getFullYear()}`;
  // };

  const formatDate = (date: Date) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const month = parsedDate.toLocaleString("default", { month: "short" });
    const year = parsedDate.getFullYear();

    console.log(`log:: date ---->${day}/${month}/${year}`);
    return `${day}/${month}/${year}`;
  };

  return (
    <ChakraProvider>
      <Box>
        <Flex mb={4}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Enter First name"
              {...register("firstName", {
                required: "Name is required",
                pattern: {
                  value: namePattern,
                  message: "Name is incorrect",
                },
              })}
            />
            <FormErrorMessage>
              {errors.firstName &&
                (typeof errors.firstName.message === "string"
                  ? errors.firstName.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Enter Last name"
              {...register("lastName", {
                required: "Name is required",
                pattern: {
                  value: namePattern,
                  message: "Name is incorrect",
                },
              })}
            />
            <FormErrorMessage>
              {errors.lastName &&
                (typeof errors.lastName.message === "string"
                  ? errors.lastName.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mb={4}>
          <FormControl isInvalid={!!errors.gender}>
            <FormLabel>Gender</FormLabel>
            <CustomSelect
              // name="gender"
              placeholder="Select Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              {...register("gender", { required: "Gender is required" })}
              // control={control}
            />
            <FormErrorMessage>
              {errors.gender &&
                (typeof errors.gender.message === "string"
                  ? errors.gender.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
          {/* </Box>
        <Box mb={4}> */}
          <FormControl isInvalid={!!errors.dateOfBirth}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              placeholder="DD/Mon/YYYY"
              max={new Date().toISOString().split("T")[0]}
              {...register("dateOfBirth", {
                // value={getValues('dateOfBirth')},
                required: "Date of birth is required",
                validate: {
                  isValidDate: (value) =>
                    isValidDate(value) || "Invalid date format",
                  formatDate: (value) =>
                    formatDate(value) === value || "Invalid date format",

                  setValueAs: (value) => formatDate(new Date(value)),
                },
                // pattern: {
                //   value: formatDate(value) === value,
                //   message: "Name is incorrect",
                // },
                onChange(event) {
                  console.log("log:: e", event);
                },
              })}
            />
            <FormErrorMessage>
              {errors.dateOfBirth &&
                (typeof errors.dateOfBirth.message === "string"
                  ? errors.dateOfBirth.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mb={4}>
          {/* <Box mb={4}> */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email &&
                (typeof errors.email.message === "string"
                  ? errors.email.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
          {/* </Box> */}
          {/* <Box mb={4}> */}
          <FormControl isInvalid={!!errors.phoneNumber} m={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Enter phone number"
              defaultValue="+91"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: phonePattern,
                  message: "Invalid phone number format",
                },
              })}
            />
            <FormErrorMessage>
              {errors.phoneNumber &&
                (typeof errors.phoneNumber.message === "string"
                  ? errors.phoneNumber.message
                  : "")}
            </FormErrorMessage>
          </FormControl>
          {/* </Box> */}
        </Flex>
        <Box mb={4}>
          <FormLabel>Tech Stack</FormLabel>
          {fields.map((item, index) => (
            <Flex key={item.id} mb={2} alignItems="center">
              <Input
                defaultValue={item.id}
                placeholder="Enter tech stack"
                {...register(`techStack.${index}.value`, {
                  required: "Tech stack is required",
                })}
              />
              {index > 0 && (
                <Button ml={2} size="sm" onClick={() => remove(index)}>
                  x
                </Button>
              )}
            </Flex>
          ))}
          <Button onClick={() => append({ value: "" })}>+</Button>
        </Box>

        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          loadingText="Submitting..."
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
      <FormDataDisplay ref={formDataDisplayRef} />
    </ChakraProvider>
  );
};

export default FormComponent;
