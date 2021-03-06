import React, { useEffect, useState } from "react";

//Chakra ui components
import { ListItem, Text, useColorMode, Flex, Box } from "@chakra-ui/core";

import useWindowDimensions from '../../Providers/WindowWidthProvider'

interface MessageProps {
  id: string;
  index?: number;
  message: string;
  senderName: string;
}

const Message: React.FC<MessageProps> = ({ index, message, senderName }) => {
  const { colorMode } = useColorMode();

  let textBubble = colorMode === "light" ? "blue.400" : "blue.900";
  let textColor = colorMode === "light" ? "white" : "blue.200";
  let senderColor = colorMode === 'light' ? 'gray.700' : 'gray.200'

  //check screen size
  const { width } = useWindowDimensions()
  const [maxWidth, setMaxWidth] = useState(800)
  if (width < 768) {
    return (
      <MobileMessages message={message} index={index} senderName={senderName} />
    )
  }
  if (index === 0) {
    return (
      <ListItem mt={5} >
        <Flex
          display="inline-block"
          padding={2}
          roundedTopLeft={10}
          roundedTopRight={10}
          roundedBottomRight={10}
          bg={textBubble}
          maxW={maxWidth}
          w="max-content"
        >
          <Text fontSize="15px"  color={textColor}>
            {message}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="13px" color={senderColor}>
            {senderName}
          </Text>
        </Flex>
      </ListItem>
    );
  }

  return (
    <ListItem pos='relative' mt={5} >
      <Box
        maxW={width-300}
        w='max-content'
        display="inline-block"
        padding={2}
        pos='relative'
        roundedTopLeft={10}
        roundedTopRight={10}
        roundedBottomRight={10}
        bg={textBubble}
       
      >
        <Text overflowX='auto' wordBreak='break-word' fontSize="16px" color={textColor}>
          {message}
        </Text>
      </Box>
      <Flex>
        <Text fontSize="13px" color={senderColor} >
          {senderName}
        </Text>
      </Flex>
    </ListItem>
  );
};

const MobileMessages = (props: any) => {
  const { index, message, senderName } = props

  const { colorMode } = useColorMode();

  let textBubble = colorMode === "light" ? "blue.400" : "blue.900";
  let textColor = colorMode === "light" ? "white" : "blue.200";
  let senderColor = colorMode === 'light' ? 'gray.700' : 'gray.200'

  if (index === 0) {
    return (
      <ListItem mt={5} >
        <Flex
          display="inline-block"
          padding={2}
          roundedTopLeft={10}
          roundedTopRight={10}
          roundedBottomRight={10}
          bg={textBubble}
          maxW={300}
          w="max-content"
        >
          <Text fontSize="15px"  color={textColor}>
            {message}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="13px" color={senderColor}>
            {senderName}
          </Text>
        </Flex>
      </ListItem>
    );
  }

  return (
    <ListItem pos='relative' mt={5} >
      <Box
        maxW={300}
        w='max-content'
        display="inline-block"
        padding={2}
        pos='relative'
        roundedTopLeft={10}
        roundedTopRight={10}
        roundedBottomRight={10}
        bg={textBubble}
       
      >
        <Text overflowX='auto' wordBreak='break-word' fontSize="16px" color={textColor}>
          {message}
        </Text>
      </Box>
      <Flex>
        <Text fontSize="13px" color={senderColor} >
          {senderName}
        </Text>
      </Flex>
    </ListItem>
  );
}

export default Message;
