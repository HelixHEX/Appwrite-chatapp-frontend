import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

//state-pool
import { useGlobalState } from "state-pool";

//Messages Component
import Messages from "../../Components/Chat/Messages";

//chakra
import { Grid, Flex, Text } from "@chakra-ui/core";

//Navbar
import Navbar from "../../Components/Navbar";

//Online Users
import OnlineUsers from "../../Components/Chat/OnlineUsers";
import useWindowDimensions from "../../Providers/WindowWidthProvider";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  //get global user
  const [user] = useGlobalState("user");

  //router
  let history = useHistory();

  useEffect(() => {
    if (user.username === "") {
      history.push("/");
    }
  }, [history, user]);

  return (
    <>
      <Flex>
        <Navbar />
      </Flex>

      <Grid mt="50px" templateColumns="repeat(5, 1fr)" gap={3}>
        {/* <OnlineUsers /> */}
        <Messages />
      </Grid>
    </>
  );
};

export default Chat;
