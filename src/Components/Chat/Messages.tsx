import React, { useState, useEffect, useRef } from "react";

//urql
import { useQuery, useSubscription, useMutation } from "urql";

//state-pool
import { useGlobalState } from "state-pool";

//Chakra ui components
import { useColorMode, Flex, Grid, Button, Box, List, Text } from "@chakra-ui/core";

//Formik
import { Form, Formik } from "formik";
import { InputField } from "../../Components/InputField";

//Message Component
import Message from "./Message";
import useWindowDimensions from "../../Providers/WindowWidthProvider";

import * as Scroll from 'react-scroll'

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

  // const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const Element = Scroll.Element
  const scroll = Scroll.animateScroll
  const {height} = useWindowDimensions()
  const scrollToBottom = () => {
    scroll.scrollTo(height+height)
  }
  
  //setMessages 
  useEffect(() => {
    if (!fetching) {
      setMessages(data?.allMessages?.messages)
      scrollToBottom();
    }
  }, [data?.allMessages?.messages, user, fetching]);
  //
  //check screen size

  //check if messages are loaded
  if (messages === undefined) {
    var MockMessages = [
      { id: "1", message: "Text", senderName: "Helix" },
      { id: "1", message: "Text", senderName: "Helix" },
      { id: "1", message: "Text", senderName: "Helix" },
      {
        id: "1",
        message:
          "Texfdskl fjlsdkf asdlkfj asdlkfj asldfj asdlkjf alsdfj dsaljf sladjfsadljflkajfdklfjasjda;lkdjf aslkdfj aslkdjf a;sdklf als;kf asjld kfjalsdkfjaslk dfjalksdjfa dflksajflkasjd ff dslkfj sl;kfj;lakdjfa s;ldjkfasf asdklfasdfjaksldjfalkdjalksdjf lka sfasldfk aldj faklsf jdsl ft",
        senderName: "Helix",
      },
    ];
    return (
      <>
        <Flex ml="10px" w="100%">
          <Box
            bg={colorMode === "light" ? "white" : "gray.800"}
            pos="fixed"
            w={"100%"}
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
                  <Box w="auto" pos="relative" mb="10px" mr="20px">
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
              {MockMessages?.map((message, index) => (
                <div >
                  <Message
                    id={message.id}
                    message={message.message}
                    senderName={message.senderName}
                    index={index}
                  />
                </div>
              ))}
              <NewMessages />
            </List>
          </Flex>
        </Flex>
      </>
    );
  }
  //hi
  return (
    <>
      {/* ml={["10px", "10px", "200px", "250px"]} */}
      <Flex ml="10px" w="100%">
        <Box
          bg={colorMode === "light" ? "white" : "gray.800"}
          pos="fixed"
          w={"100%"}
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
                <Box w="auto" pos="relative" mb="10px" mr="20px">
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
          <List >
            {messages.map((message, index) => (
              <div >
                <Message
                  id={message.id}
                  message={message.message}
                  senderName={message.senderName}
                  index={index}
                />
              </div>
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
  const scroll = Scroll.animateScroll
  const {height} = useWindowDimensions()
  const scrollToBottom = () => {
    scroll.scrollTo(height+height)
  }
  const handleSubscription = (prevMessages: any = [], response) => {
    scrollToBottom();
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
        <div >
          <Message
            id={message.id}
            message={message.message}
            senderName={message.senderName}
          />
        </div>
      ))}
    </>
  );
};

const MobileInput = (props: any) => {
  const { messages } = props;

  return <></>;
};

export default Messages;
