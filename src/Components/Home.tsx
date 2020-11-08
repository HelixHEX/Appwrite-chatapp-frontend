import {
  Flex,
  Box,
  Button,
  Grid,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  List,
} from "@chakra-ui/core";
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
const courseQuery = `
query allMessagesTest {
  allMessages {
    messages {
      id
      message,
      senderName
    }
  }
}
`;
const Messages: React.FC<MessagesProps> = () => {
  //get messages query
  const [result] = useQuery({
    query: courseQuery,
    variables: {
      offset: 1,
    },
  });
  const [offset, setOffset] = useState(1);
  const [scroller, setScroller] = useState<HTMLDivElement | null>();
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
      console.log(scroller.scrollTop);
    }
  };
  console.log("hi");
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
  if (data?.allMessages?.messages === undefined) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  return (
    <>
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
          <div
            key={index}
            onScroll={handleScroll}
            ref={(scroller) => setScroller(scroller)}
          >
            <Message
              id={message.id}
              message={message.message}
              senderName={message.senderName}
              index={index}
            />
          </div>
        ))}
      </List>
    </>
  );
};

export default Home;
