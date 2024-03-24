import { Box, Flex, Text } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { formDataType } from "./FormComponent";

// Custom component for displaying form data
const FormDataDisplay = forwardRef((props, ref) => {
  const [formData, setFormData] = useState<formDataType>();

  useImperativeHandle(ref, () => ({
    showFormData: (data: formDataType) => setFormData(data),
  }));

  const formatDate = (dateString: string | undefined) => {
    const date = new Date(dateString as string);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  console.log(formData);

  return !!formData ? (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#F5EEE6",
        alignContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        padding: 50,
        textAlign: "center",
        display: "block",
        width: "70%",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Box mt={4}>
        <Flex>
          <Text as="b">First Name: </Text>
          <Text ml={2}>{formData?.firstName}</Text>
        </Flex>
        <Flex>
          <Text as="b">Last Name: </Text>
          <Text ml={2}>{formData?.lastName}</Text>
        </Flex>
        <Flex>
          <Text as="b">Gender: </Text>
          <Text ml={2}>{formData?.gender?.value}</Text>
        </Flex>
        <Flex>
          <Text as="b">Date of Birth: </Text>
          <Text ml={2}>{formatDate(formData?.dateOfBirth)}</Text>
        </Flex>
        <Flex>
          <Text as="b">Email:</Text>
          <Text ml={2}>{formData?.email}</Text>
        </Flex>
        <Flex>
          <Text as="b">Phone Number: </Text>
          <Text ml={2}>{formData?.phoneNumber}</Text>
        </Flex>
        <Flex>
          <Text as="b">TechStack: </Text>
          {formData?.techStack.map((item) => (
            <Text ml={2}>{item.value},</Text>
          ))}
        </Flex>
      </Box>
    </div>
  ) : null;
});

export default FormDataDisplay;
