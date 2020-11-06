import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

//urql
import { useQuery, useSubscription, useMutation } from "urql";

//state-pool
import { useGlobalState } from "state-pool";

//messages ui
import { ChatFeed, ChatBubble } from "react-chat-ui";

//chakra
import {
  useColorMode,
  Button,
  Grid,
  Flex,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
} from "@chakra-ui/core";

// import "semantic-ui-css/semantic.min.css";

import { Comment } from "semantic-ui-react";

//Navbar
import Navbar from "./Navbar";

//formik
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import useWindowDimensions from "../Providers/WindowWidthProvider";

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

const UPDATE_LASTSEEN_MUTATION = `
  mutation udpateLastSeen($now: timestamptz!) {
    update_users(where: {}, _set: { last_seen: $now})
  }
`;

const Chat: React.FC<ChatProps> = () => {
  //get messages query
  const [result, reexecuteQuery] = useQuery({
    query: allMessagesQuery,
  });
  const { data, fetching, error } = result;
  const [messages, setMessages] = useState([]) as any;

  //new messages subscription
  // const [result] = useSubscription({ query: newMessageQuery });

  //store messages
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   if(data) {
  //     setMessages(data.allMessages.messages)
  //   }
  // }, [])
  // var messages = data?.allMessages?.messages

  // const [res] = useSubscription({ query: newMessageQuery }, handleSubscription);
  // const newmessages = res.data;
  // const handleSubscription = (messages = [], response) => {
  //   return [response.newMessages, ...messages];
  // };
  // const newmessages = res.data

  //get global user
  const [user] = useGlobalState("user");

  //router
  let history = useHistory();

  //scroll to bottom
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user.username === "") {
      history.push("/");
    }

    if (!fetching) {
      setMessages(data.allMessages.messages);
    }
  }, [data, history, user]);
  // const handleSubscription = (messages:any = [], response) => {
  //   return [response.newMessage, ...messages]
  // }
  // const [newmessage] = useSubscription({query: newMessageQuery})
  // if (newmessage) {
  //   setMessages([newmessage.data.newMessage, ...messages])
  // }
  // const scrollToBottom = () => {
  //   // window.scrollTo({
  //   //   top:document.documentElement.scrollHeight,
  //   //   behavior: "smooth"
  //   // })
  //   messageRef!.current!.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  //   //check if user is logged in
  //   if (user.username === "") {
  //     history.push("/");
  //   }

  //   // //set messages
  //   // if (data) {
  //   //   setMessages(data?.allMessages?.messages);
  //   // }

  //   //display new messages
  //   if (result?.data) {
  //     const messageText = {
  //       id: result?.data?.newMessage.id,
  //       message: result?.data?.newMessage.message,
  //       senderName: result?.data?.newMessage.senderName,
  //     } as any;
  //     // eslint-disable-next-line
  //     if (messages.length < 1) {
  //       setMessages([messageText]);
  //     } else {
  //       setMessages([...messages, messageText]);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [setMessages, data?.allMessages, history, user, result?.data]);
  // const [res] = useSubscription({ query: newMessageQuery }, handleSubscription);
  // const Messages = (props:any) => {
  //   return (
  //     <>
  //       {props.messages.map((data) => (
  //         <h1>{data.senderName} - {data.message}</h1>
  //       ))}
  //     </>
  //   )
  // }

  return (
    <>
      <Flex>
        <Navbar />
      </Flex>

      <Grid mt="50px" templateColumns="repeat(5, 1fr)" gap={3}>
        <OnlineUsers />
        <div ref={messageRef}>
          <Messages messages={messages} />
          {/* {res.data?.map(message => (
            <h1 key={message.id}>{message.message}</h1>
          ))} */}
        </div>
      </Grid>
    </>
  );
};
const SmallScreenModal = (props: any) => {
  return null;
};

const OnlineUsers = (props: any) => {
  const [users, setUsers] = useState([
    "Someone",
    "Helix",
    "Someone",
    "Helix",
    "Someone",
    "Helix",
    "Someone",
    "Helix",
  ]);
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;
  // useEffect(() => {
  //   // Every 30s, run a mutation to tell the backend that you're online
  //   updateLastSeen();eli
  //   setOnlineIndicator(window.setInterval(() => updateLastSeen(), 30000));
  //   return () => {
  //     // Clean up
  //     clearInterval(onlineIndicator);
  //   };
  // }, []);
  // const [_, updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);
  // const updateLastSeen = () => {
  //   // Use the apollo client to run a mutation to update the last_seen value
  //   updateLastSeenMutation({ now: new Date().toISOString() });
  // };
  const { width } = useWindowDimensions();
  if (width < 768) {
    return null;
  }
  return (
    <Flex
      display="flex"
      pos="fixed"
      width="200px"
      height="100%"
      justify="space-between"
    >
      {/* <SimpleGrid columns={1} spacingY="1px" > */}
      <Flex justifyContent="center" width="100%">
        <Text fontWeight="700" textAlign="center">
          Online Users (Beta)
        </Text>
      </Flex>
      <Flex pos="absolute" left={2} top={10}>
        <List spacing={3}>
          {users.map((data, index) => (
            <ListItem key={index}>
              <ListIcon icon="check-circle" color="green.500" />
              <Text display="inline-block">{data}</Text>
            </ListItem>
          ))}
        </List>
      </Flex>
      {/* </SimpleGrid> */}
    </Flex>
  );
};

const Messages = (props: any) => {
  //colormode
  const { colorMode } = useColorMode();

  //send message mutation
  // eslint-disable-next-line
  const [_, send] = useMutation(sendMessageMutation);

  const { messages, newmessages } = props;

  //get global user
  const [user] = useGlobalState("user");

  //get screen width
  const { width } = useWindowDimensions();

  let textBubble = colorMode === "light" ? "gray.50" : "gray.800";
  let textColor = colorMode === "light" ? "#D53F8C" : "#3182CE";

  //check if messages are loaded
  if (messages === undefined) {
    return (
      <>
        <Flex ml={["10px", "10px", "200px", "250px"]}>
          <div>Loading...</div>
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values: any, actions: any) => {
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
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex w="100%" ml={["10px", "10px", "200px", "250px"]}>
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
                    variantColor={colorMode === "light" ? "pink" : "blue"}
                    variant="ghost"
                  >
                    Send
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mb="80px" w="100%" pos="relative">
          <List>
            {messages.map((message, index) => (
              <Message message={message} index={index} />
            ))}
            <NewMessages />
          </List>
        </Flex>
      </Flex>
    </>
  );
};

const Message = (props: any) => {
  const { colorMode } = useColorMode();

  let textColor = colorMode === "light" ? "#D53F8C" : "#3182CE";

  if (props.index === 0) {
    return (
      <ListItem fontWeight={200}>
        <Text fontWeight={700}>{props.message.senderName}</Text>
        <Text fontSize="14px" ml={"20px"} fontWeight={200} color={textColor}>
          {props.message.message}
        </Text>
      </ListItem>
    );
  }

  return (
    <ListItem mt={5} fontWeight={200}>
      <Text fontWeight={700}>{props.message.senderName}</Text>
      <Text fontSize="14px" ml={"20px"} fontWeight={200} color={textColor}>
        {props.message.message}
      </Text>
    </ListItem>
  );
};

const NewMessages = (props: any) => {
  const { colorMode } = useColorMode();

  let textBubble = colorMode === "light" ? "gray.50" : "gray.800";
  let textColor = colorMode === "light" ? "#D53F8C" : "#3182CE";
  const handleSubscription = (prevMessages: any = [], response) => {
    return [...prevMessages, response.newMessage];
  };
  const [res] = useSubscription({ query: newMessageQuery }, handleSubscription);

  if (!res.data) {
    return null;
  }
  return (
    <>
      {res.data.map((message) => (
        <Message message={message} />
      ))}
      {/* {res.data.map((data) => (
        // <Comment key={data.id}>
        //   <Comment.Content>
        //     <Comment.Author>{data.senderName}</Comment.Author>
        //     <Comment.Metadata>
        //       <div>5 days ago</div>
        //     </Comment.Metadata>
        //     <Comment.Text>{data.message}</Comment.Text>
        //   </Comment.Content>
        // </Comment>

        // <ChatBubble
        //   message={data}
        //   // bubbleStyles={{
        //   //   text: {
        //   //     fontSize: 15,
        //   //     color: textColor,
        //   //   },
        //   //   chatbubble: {
        //   //     border: "none",
        //   //     padding: 10,
        //   //     backgroundColor: textBubble,
        //   //     maxWidth: "100%",
        //   //   },
        //   // }}
        // />
        // <h1>{data.message}</h1>
      ))} */}
    </>
  );
};

{
  /* Display Messages */
}
{
  /* <ChatFeed
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
    maxWidth: "100%",
  },
}}
/> */
}

export default Chat;
