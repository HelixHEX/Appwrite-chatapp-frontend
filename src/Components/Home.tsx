import { Flex, Box, Button, Grid, SimpleGrid, Input, InputGroup, InputRightElement, useColorMode, List } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "urql";
import Message from "./Chat/Message";
import { InputField } from "./InputField";

import * as Scroll from "react-scroll";
import { useGlobalState } from "state-pool";

interface HomeProps {}

interface MessagesProps {}

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
      <Messages />
    </>
  );
};
const allMessagesQuery = `
query {
	allMessages  {
    messages {
      message
      senderName
      id
    }
  }
}
`;
const Messages: React.FC<MessagesProps> = () => {
  //get messages query
  const [result] = useQuery({
    query: allMessagesQuery
  });
  const [offset, setOffset] = useState(1)
  const [scroller, setScroller] = useState<HTMLDivElement | null>()
  const { data, fetching } = result;
  const [messages, setMessages] = useState([]) as any;
  //colormode
  const { colorMode } = useColorMode();

  //send message mutation
  // eslint-disable-next-line

  //get global user
  const [user] = useGlobalState("user");

  // const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const scroll = Scroll.animateScroll;
  const scrollToBottom = () => {
    if (data?.allMessages?.messages) {
      scroll.scrollTo(data.allMessages.messages.length * 80);
    }
  };
  const handleScroll = (event) => {
    // const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // alert("hi");
    // console.log("scrolltop: ", scrollTop);
    if (scroller) {
      console.log(scroller.scrollTop)
    }
  };
  console.log('hi')
  //setMessages
  useEffect(() => {
    if (!fetching) {
      setMessages(data?.allMessages?.messages);
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
                <div>
                  <Message
                    id={message.id}
                    message={message.message}
                    senderName={message.senderName}
                    index={index}
                  />
                </div>
              ))}
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
          <div>
            <List>
              {messages.map((message, index) => (
                // if (index === 0) {
                //   return (
                //     <div onScroll={handleScroll} ref={(scroller) => setScroller(scroller)} >
                //       <Message
                //         id={message.id}
                //         message={message.message}
                //         senderName={message.senderName}
                //         index={index}
                //       />
                //     </div>
                //   );
                // }
                <div key={index} onScroll={handleScroll} ref={(scroller) => setScroller(scroller)}>
                  <Message
                    id={message.id}
                    message={message.message}
                    senderName={message.senderName}
                    index={index}
                  />
                </div>
              ))}
            </List>
          </div>
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

export default Home;
