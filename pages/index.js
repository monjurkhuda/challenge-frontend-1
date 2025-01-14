import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Avatar,
  Select,
  HStack,
  Button,
  Input,
  Image,
  useToast,
  Heading,
} from "@chakra-ui/react";
import locationArr from "../data/locationArr";

export default function Home() {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [countryOne, setCountryOne] = useState("Loading");
  const [countryTwo, setCountryTwo] = useState("Loading");
  const [countryThree, setCountryThree] = useState("Loading");
  const [correctNum, setCorrectNum] = useState(0);
  const [balance, setBalance] = useState(20);

  const toast = useToast();

  let randomNumOne,
    randomNumTwo,
    randomNumThree,
    randomCorrectNum = 0;

  function randomNumGenerator() {
    randomNumOne = Math.floor(Math.random() * Object.keys(locationArr).length);

    randomNumTwo = Math.floor(Math.random() * Object.keys(locationArr).length);
    while (randomNumTwo === randomNumOne)
      randomNumTwo = Math.floor(
        Math.random() * Object.keys(locationArr).length
      );

    randomNumThree = Math.floor(
      Math.random() * Object.keys(locationArr).length
    );
    while (randomNumThree === randomNumOne || randomNumThree === randomNumTwo)
      randomNumThree = Math.floor(
        Math.random() * Object.keys(locationArr).length
      );

    randomCorrectNum = Math.floor(Math.random() * 3);
    setCorrectNum(randomCorrectNum);

    setCountryOne(locationArr[randomNumOne].country);
    setCountryTwo(locationArr[randomNumTwo].country);
    setCountryThree(locationArr[randomNumThree].country);
  }

  function startGame() {
    setGameStarted(true);
    randomNumGenerator();
  }

  function judgeAnswer(answer) {
    const index = locationArr.findIndex((object) => {
      return object.country === answer;
    });

    if (index === correctNum) {
      setBalance(balance + 10);
      randomNumGenerator();
      toast({
        title: "+$10 🎉",
        status: "success",
        duration: 800,
        isClosable: true,
      });
    } else {
      setBalance(balance - 10);
      randomNumGenerator();
      toast({
        title: "-$10 😔",
        status: "error",
        duration: 800,
        isClosable: true,
      });
    }
  }

  if (balance < 0)
    return (
      <Flex
        minH="100vh"
        backgroundColor="gray.100"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Flex
          backgroundColor="red.500"
          p={12}
          borderRadius={20}
          boxShadow="base"
        >
          <Text fontWeight="600" fontSize={26} color="white">
            Defeat 😔
          </Text>
        </Flex>
        <Button
          onClick={(e) => {
            window.location.reload();
          }}
          mt={2}
          colorScheme="green"
        >
          ♻️ Try Again
        </Button>
      </Flex>
    );

  if (balance >= 50)
    return (
      <Flex
        minH="100vh"
        backgroundColor="gray.100"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Flex
          backgroundColor="yellow.400"
          p={12}
          borderRadius={20}
          boxShadow="base"
        >
          <Text fontWeight="600" fontSize={26}>
            🎉 VICTORY! 🎉
          </Text>
        </Flex>
        <Button
          onClick={(e) => {
            window.location.reload();
          }}
          mt={2}
          colorScheme="green"
        >
          ♻️ Go Again
        </Button>
      </Flex>
    );

  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <meta
          name="Guess Location Game"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minH="100vh" backgroundColor="gray.100" justifyContent="center">
        <Flex direction="column" w="80%" p={2} alignItems="center">
          <Heading mt={2} color="purple.500">
            🗺️ Country Quiz
          </Heading>

          <Text
            mt={2}
            color="gray.800"
            fontWeight="700"
            fontSize={18}
            display={gameStarted ? "none" : ""}
          >
            You start with 💰20.
          </Text>

          <Text
            color="gray.800"
            fontWeight="700"
            fontSize={18}
            display={gameStarted ? "none" : ""}
          >
            Gamble 💰10. Guess the country.
          </Text>

          <Text
            color="gray.800"
            fontWeight="700"
            fontSize={18}
            display={gameStarted ? "none" : ""}
          >
            Win 💰50 or go broke trying..
          </Text>

          <Flex mt={2}>
            <Input
              disabled={gameStarted}
              backgroundColor="white"
              border="4px"
              borderColor="gray.200"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            ></Input>

            <Button
              ml={2}
              disabled={name.length < 1 || gameStarted}
              colorScheme="yellow"
              onClick={startGame}
            >
              START
            </Button>
          </Flex>

          <Text
            mt={2}
            fontWeight="700"
            fontSize={16}
            hidden={!gameStarted}
          >{`Hello ${name}!`}</Text>

          <Flex mt={2} display={!gameStarted ? "none" : ""}>
            <Flex justify="space-between">
              <Text fontWeight="600" fontSize={20} color="purple.500">
                Guess the country:
              </Text>{" "}
              <Text
                fontWeight="600"
                fontSize={20}
                hidden={!gameStarted}
                color="purple.500"
              >{`💰${balance}`}</Text>
            </Flex>

            <Image
              mt={2}
              border="4px"
              borderColor="white"
              boxShadow="base"
              src={locationArr[correctNum].image}
              alt="guess"
              maxWidth="100%"
              maxHeight="700px"
            ></Image>
            <Flex mt={2} justifyContent="space-around">
              <Button
                colorScheme="blue"
                boxShadow="base"
                onClick={(e) => judgeAnswer(countryOne)}
              >
                {countryOne}
              </Button>
              <Button
                colorScheme="red"
                boxShadow="base"
                onClick={(e) => judgeAnswer(countryTwo)}
              >
                {countryTwo}
              </Button>
              <Button
                colorScheme="green"
                boxShadow="base"
                onClick={(e) => judgeAnswer(countryThree)}
              >
                {countryThree}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
