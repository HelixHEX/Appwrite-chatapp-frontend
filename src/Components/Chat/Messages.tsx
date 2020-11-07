import React, { useState, useEffect } from "react";

//urql
import { useQuery, useSubscription, useMutation } from "urql";

//state-pool
import { useGlobalState } from "state-pool";

//Chakra ui components
import { useColorMode, Flex, Grid, Button, Box, List } from "@chakra-ui/core";

//Formik
import { Form, Formik } from "formik";
import { InputField } from "../../Components/InputField";

//Message Component
import Message from "./Message";
import useWindowDimensions from "../../Providers/WindowWidthProvider";

interface MessagesProps {}

//Get Messages Query
const allMessagesQuery = `
query {
  allMessages {
    messages {
      id
      message
      senderName
    }
  }
}
`;

//Send Message Mutation
const sendMessageMutation = `
mutation ($message:String!, $senderName:String!){
  send(input: {message:$message, senderName:$senderName}) {
    message {
      senderName
      message
      id
    }
  }
}
`;

//Subscriptions
const newMessageSubscription = `
subscription {
  newMessage {
      id
      message
      senderName
  }
}
`;

const Messages: React.FC<MessagesProps> = () => {
  //get messages query
  const [result] = useQuery({
    query: allMessagesQuery,
  });
  const { data, fetching } = result;
  const [messages, setMessages] = useState([]) as any;
  //colormode
  const { colorMode } = useColorMode();

  //send message mutation
  // eslint-disable-next-line
  const [_, send] = useMutation(sendMessageMutation);

  //get global user
  const [user] = useGlobalState("user");

  //setMessages
  useEffect(() => {
    if (!fetching) {
      setMessages(data?.allMessages?.messages);
    }
  }, [data, user, fetching]);

  //check screen size

  //check if messages are loaded
  if (messages === undefined) {
    return (
      <>
        <Flex ml='10px' w="100%" >
        <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} pos="fixed" w={"100%"} zIndex={10} bottom="0">
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values, actions) => {
              await send({
                message: values.message,
                senderName: user.username,
              });
              actions.setSubmitting(false);
              values.message = "";
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  w="auto"
                  pos="relative"
                  mb='10px'
                  mr="20px"
                >
                  <InputField
                    label=""
                    name="message"
                    placeholder="Enter message"
                    isSubmitting={isSubmitting}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mb="80px" w="100%" pos="relative">
          <List>
            {messages?.map((message, index) => (
              <Message
                id={message.id}
                message={message.message}
                senderName={message.senderName}
                index={index}
              />
            ))}
            <NewMessages />
          </List>
        </Flex>
      </Flex>
      </>
    );
  }

  return (
    <>
      {/* ml={["10px", "10px", "200px", "250px"]} */}
      <Flex ml='10px' w="100%" >
        <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} pos="fixed" w={"100%"} zIndex={10} bottom="0">
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values, actions) => {
              await send({
                message: values.message,
                senderName: user.username,
              });
              actions.setSubmitting(false);
              values.message = "";
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  w="auto"
                  pos="relative"
                  mb='10px'
                  mr="20px"
                >
                  <InputField
                    label=""
                    name="message"
                    placeholder="Enter message"
                    isSubmitting={isSubmitting}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mb="80px" w="100%" pos="relative">
          <List>
            {messages.map((message, index) => (
              <Message
                id={message.id}
                message={message.message}
                senderName={message.senderName}
                index={index}
              />
            ))}
            <NewMessages />
          </List>
        </Flex>
      </Flex>
      {/* <Flex w="100%" ml='10px' mr='200px'>
        <Box
          pos="fixed"
          w={"100%"}
          bg={colorMode === "light" ? "white" : "gray.800"}
          zIndex={10}
          bottom="0"
        >
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values, actions) => {
              await send({
                message: values.message,
                senderName: user.username,
              });
              actions.setSubmitting(false);
              values.message = "";
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                
                <Box w="auto" pos="relative" mt="-10px" mb={4}>
                  <InputField
                    isSubmitting={isSubmitting}
                    name="message"
                    placeholder="Enter Message"
                    label=""
                  />
                </Box>
                <Flex>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    variantColor={colorMode === "light" ? "cyan" : "blue"}
                    variant="ghost"
                  >
                    Send
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mb="80px" w="100%" pos="relative">
          <List>
            {messages.map((message, index) => (
              <Message
                id={message.id}
                message={message.message}
                senderName={message.senderName}
                index={index}
              />
            ))}
            <NewMessages />
          </List>
        </Flex>
      </Flex> */}
    </>
  );
};

const NewMessages = () => {
  const handleSubscription = (prevMessages: any = [], response) => {
    return [...prevMessages, response.newMessage];
  };
  const [res] = useSubscription(
    { query: newMessageSubscription },
    handleSubscription
  );

  if (!res.data) {
    return null;
  }
  return (
    <>
      {res.data.map((message) => (
        <Message
          id={message.id}
          message={message.message}
          senderName={message.senderName}
        />
      ))}
    </>
  );
};

const MobileInput = (props: any) => {
  const { messages } = props;

  return <></>;
};

export default Messages;
