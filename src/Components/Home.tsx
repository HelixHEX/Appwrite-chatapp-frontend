import React, { useEffect } from "react";

import { useQuery } from "urql";

import {Text} from '@chakra-ui/core'

const TodosQuery = `
  query {
    allMessagess {
      messages {
        id
        message
        senderName
      }
    }
  }
`;

interface HomeProps {}
const Home: React.FC<HomeProps> = ({}) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <>
      <ul>
      {data.allMessages.messages.map((data, index) => (
        <li>{data.message}</li>
      ))}
      </ul>
    </>
  );
};

export default Home;
