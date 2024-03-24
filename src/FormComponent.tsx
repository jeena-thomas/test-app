import React, { useRef } from "react";
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
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ControlledSelect from "./CustomSelect";
import FormDataDisplay from "./FormDisplay";

const validationSchema = z.object({
  firstName: z
    .string()
    .nonempty("Name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Name is incorrect"),
  lastName: z
    .string()
    .nonempty("Name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Name is incorrect"),
  gender: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable(),
  dateOfBirth: z
    .string()
    .nonempty("Date of birth is required")
    .refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format")
    .refine(
      (val) => new Date(val) <= new Date(),
      "Date cannot be in the future"
    ),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phoneNumber: z
    .string()
    .regex(/^(\+91\d{10})$/, "Invalid phone number format")
    .nonempty("Phone number is required"),
  techStack: z
    .array(
      z.object({
        value: z.string().nonempty("Tech stack is required"),
      })
    )
    .nonempty("At least one tech stack is required"),
});

export type formDataType = {
  firstName: string;
  lastName: string;
  gender: { label: string; value: string };
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  techStack: Array<{ value: string }>;
};

const FormComponent = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validationSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });

  interface FormDataDisplayRefObject {
    showFormData: (data: formDataType) => void;
  }

  const formDataDisplayRef = useRef<FormDataDisplayRefObject>(null);

  const onSubmit = async (data: any) => {
    // Show loading spinner for 3 seconds
    const showLoadingSpinner = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <ChakraProvider>
      <Text fontSize="xl" as="b" mt={60}>
        User Details
      </Text>
      <div
        style={{
          borderRadius: 20,
          backgroundColor: "#F5EEE6",
          alignContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
          padding: 10,
          textAlign: "center",
          display: "block",
          width: "70%",
        }}
      >
        <Box>
          <Text fontSize="xl" as="b">
            Basic Details
          </Text>
          <Flex mb={4}>
            <FormControl isInvalid={!!errors.firstName} m={4}>
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
                bg={"#E7F2F8"}
                color={"#000"}
              />
              <FormErrorMessage>
                {errors.firstName &&
                  (typeof errors.firstName.message === "string"
                    ? errors.firstName.message
                    : "")}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} m={4}>
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
                bg={"#E7F2F8"}
                color={"#000"}
              />
              <FormErrorMessage>
                {errors.lastName &&
                  (typeof errors.lastName.message === "string"
                    ? errors.lastName.message
                    : "")}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Text fontSize="xl" as="b">
            Other Information
          </Text>
          <Flex mb={4}>
            <ControlledSelect
              name="gender"
              control={control}
              label="Gender"
              placeholder="Select Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <FormControl isInvalid={!!errors.dateOfBirth} m={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                bg={"#E7F2F8"}
                color={"#000"}
                type="date"
                placeholder="DD/MM/YYYY"
                max={new Date().toISOString().split("T")[0]}
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                  validate: {
                    isValidDate: (value) =>
                      isValidDate(value) || "Invalid date format",
                    formatDate: (value) =>
                      formatDate(value) === value || "Invalid date format",
                  },
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
            <FormControl isInvalid={!!errors.email} m={4}>
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
                bg={"#E7F2F8"}
                color={"#000"}
              />
              <FormErrorMessage>
                {errors.email &&
                  (typeof errors.email.message === "string"
                    ? errors.email.message
                    : "")}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phoneNumber} m={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                bg={"#E7F2F8"}
                color={"#000"}
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
          </Flex>
          <Box m={4}>
            <Flex>
              <FormLabel>Tech Stack</FormLabel>
              <Button size="xs" onClick={() => append({ value: "" })}>
                +
              </Button>
            </Flex>
            {fields.map((item, index) => (
              <Flex key={item.id} mb={2} alignItems="center">
                <Input
                  bg={"#E7F2F8"}
                  color={"#000"}
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
                {
                  //@ts-ignore
                  errors?.techStack?.[index]?.value && (
                    <FormControl isInvalid={!!errors.techStack}>
                      <FormErrorMessage ml={2}>
                        {
                          //@ts-ignore
                          errors.techStack[index as any].value.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                  )
                }
              </Flex>
            ))}
            <FormControl isInvalid={!!errors.techStack}>
              <FormErrorMessage ml={2}>
                {errors.techStack &&
                  (typeof errors.techStack.message === "string"
                    ? errors.techStack.message
                    : "")}
              </FormErrorMessage>
            </FormControl>
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
      </div>
      <FormDataDisplay ref={formDataDisplayRef} />
    </ChakraProvider>
  );
};

export default FormComponent;
