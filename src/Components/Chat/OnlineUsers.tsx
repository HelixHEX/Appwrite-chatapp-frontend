import React, {useState} from 'react'

//chakra ui components
import {Flex, Text, List, ListItem, ListIcon} from '@chakra-ui/core'

import useWindowDimensions from '../../Providers/WindowWidthProvider'

const OnlineUsers = (props: any) => {
  const [users] = useState([
    "Someone",
    "Helix",
    "Someone",
    "Helix",
    "Someone",
    "Helix",
    "Someone",
    "Helix",
  ]);
  // const [onlineIndicator, setOnlineIndicator] = useState(0);
  // let onlineUsersList;
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
    </Flex>
  );
};

export default OnlineUsers