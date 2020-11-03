import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//urql
import { useQuery, useSubscription, useMutation } from "urql";

//state-pool
import { useGlobalState } from "state-pool";

//messages ui
import { ChatFeed } from "react-chat-ui";

//chakra
import { useColorMode, Button, Grid, Flex, Box } from "@chakra-ui/core";

//Navbar
import Navbar from "./Navbar";

//formik
import { Form, Formik } from "formik";
import { InputField } from "./InputField";

interface ChatProps {}

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

const newMessageQuery = `
subscription {
  newMessage {
      id
      message
      senderName
  }
}
`;

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

const Chat: React.FC<ChatProps> = () => {
  //get messages query
  const [{ data }]: any = useQuery({ query: allMessagesQuery });

  //new messages subscription
  const [result] = useSubscription({ query: newMessageQuery });

  //store messages
  const [messages, setMessages] = useState<String[]>([]);

  //get global user
  const [user] = useGlobalState("user");

  //router
  let history = useHistory();
  useEffect(() => {
    //check if user is logged in
    if (user.username === "") {
      history.push("/");
    }

    //set messages
    setMessages(data?.allMessages?.messages);

    //display new messages
    if (result?.data) {
      const messageText = {
        id: result?.data?.newMessage.id,
        message: result?.data?.newMessage.message,
        senderName: result?.data?.newMessage.senderName,
      } as any;
       // eslint-disable-next-line
      if (messages.length < 1) {
        setMessages([messageText])
      } else {
        setMessages([...messages, messageText])
      }
    }
    // eslint-disable-next-line
  }, [setMessages, data, result.data, history, user]);
  return (
    <>
      <Flex>
        <Navbar />
      </Flex>
      <Messages messages={messages} />
    </>
  );
};

const Messages = (props: any) => {
  //colormode
  const { colorMode } = useColorMode();

  //send message mutation
  // eslint-disable-next-line
  const [_, send] = useMutation(sendMessageMutation);

  const { messages } = props;

  //get global user
  const [user] = useGlobalState("user");

  let textBubble = colorMode === "light" ? "gray.50" : "gray.800";
  let textColor = colorMode === "light" ? "#D53F8C" : "#3182CE";
  //check if messages are loaded
  if (messages === undefined) {
    return (
      <>
        <div>Loading...</div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={async (values: any, actions: any) => {
            await send({ message: values.message, senderName: user.username });
            actions.setSubmitting(false);
            values.message = "";
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid gridColumn={2} gridRow={1} width={"100%"}>
                <Flex>
                  <Box pos={"fixed"} bottom={0} mb={4} w={"100%"}>
                    <InputField
                      name="message"
                      placeholder="Enter Message"
                      label=""
                    />
                  </Box>
                </Flex>
                <Button
                  pos={"fixed"}
                  bottom={0}
                  mb={4}
                  right={0}
                  borderBottomLeftRadius={0}
                  borderTopLeftRadius={0}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="purple"
                  variant="ghost"
                >
                  Send
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  return (
    <>
      <Flex w='100%' ml='10px'>
        <Box  pos="fixed" w={"100%"} bg={colorMode === "light" ? "white" : "gray.800"} zIndex={10} bottom='0'>
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
                <Grid gridColumn={2} gridRow={1} width={"100%"}>
                  <Flex>
                    <Box mr="70px" mb={4} w={"100%"}>
                      <InputField
                        name="message"
                        placeholder="Enter Message"
                        label=""
                      />
                    </Box>
                  </Flex>
                  <Button
                    pos={"fixed"}
                    bottom={0}
                    mb={4}
                    right={0}
                    borderBottomLeftRadius={0}
                    borderTopLeftRadius={0}
                    type="submit"
                    isLoading={isSubmitting}
                    variantColor={colorMode === "light" ? 'pink' : 'blue'}
                    variant="ghost"
                  >
                    Send
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mb='70px' mt='50px' w='100%' pos='relative'>
          {/* Display Messages */}
          <ChatFeed
            messages={messages}
            hasInputField={false}
            showSenderName
            bubbleStyles={{
              text: {
                fontSize: 15,
                color: textColor,
              },
              chatbubble: {
                border: "none",
                padding: 10,
                backgroundColor: textBubble,
                maxWidth: '100%'
              },
            }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Chat;
