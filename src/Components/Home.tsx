import { Flex, Box, Button, Grid, SimpleGrid, Input, InputGroup, InputRightElement } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    // <Formik
    //   initialValues={{ message: "" }}
    //   onSubmit={async (values, actions) => {
    //     actions.setSubmitting(false);
    //     values.message = "";
    //   }}
    // >
    //   {({ isSubmitting }) => (
    //     <Form>
    //       <SimpleGrid>
    //         <Box>
    //           <InputField
    //             name="message"
    //             placeholder="Enter Message"
    //             label=""
    //           />
    //         </Box>
    //         <Flex>
    //           <Button
    //             type="submit"
    //             isLoading={isSubmitting}
    //             variantColor="cyan"
    //             variant="ghost"
    //           >
    //             Send
    //           </Button>
    //         </Flex>
    //       </SimpleGrid>
    //     </Form>
    //   )}
    // </Formik>
    <>
      <Flex w="100%" mr="10px">
        <Box pos="fixed" w={"100%"} zIndex={10} bottom="0">
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values, actions) => {
              alert(values.message);
              actions.setSubmitting(false);
              values.message = "";
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box ml='10px' mr='10px' w="auto" pos="relative" mt="-10px" mb={4}>
                  <InputField label='' name='message'  placeholder='Enter message' isSubmitting={isSubmitting} />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
