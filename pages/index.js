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
} from "@chakra-ui/react";

export default function Home() {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [countryOne, setCountryOne] = useState("Loading");
  const [countryTwo, setCountryTwo] = useState("Loading");
  const [countryThree, setCountryThree] = useState("Loading");
  // const [numOne, setNumOne] = useState(0);
  // const [numTwo, setNumTwo] = useState(0);
  // const [numThree, setNumThree] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);
  const [balance, setBalance] = useState(20);

  const toast = useToast();

  let randomNumOne,
    randomNumTwo,
    randomNumThree,
    randomCorrectNum = 0;

  let locationArr = [
    {
      country: "Spain",
      image:
        "https://farm66.static.flickr.com/65535/51266741084_782f378023.jpg",
    },
    {
      country: "India",
      image:
        "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1634005083664-f06a3bbc9416",
    },
    {
      country: "United States",
      image:
        "https://images.discerningassets.com/image/upload/c_limit,h_500,w_500/v1586445396/Grand_Canyon_at_Dusk_Hopi_Point_mqlnkr.jpg",
    },
  ];

  function randomNumGenerator() {
    randomNumOne = Math.floor(Math.random() * Object.keys(locationArr).length);
    //setNumOne(randomNumOne);

    randomNumTwo = Math.floor(Math.random() * Object.keys(locationArr).length);
    while (randomNumTwo === randomNumOne)
      randomNumTwo = Math.floor(
        Math.random() * Object.keys(locationArr).length
      );
    //setNumTwo(randomNumTwo);

    randomNumThree = Math.floor(
      Math.random() * Object.keys(locationArr).length
    );
    while (randomNumThree === randomNumOne || randomNumThree === randomNumTwo)
      randomNumThree = Math.floor(
        Math.random() * Object.keys(locationArr).length
      );
    //setNumThree(randomNumThree);

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
        title: "Correct!",
        description: "Correct answer, take $10",
        status: "success",
        duration: 800,
        isClosable: true,
      });
    } else {
      setBalance(balance - 10);
      randomNumGenerator();
      toast({
        title: "Wrong :(",
        description: "Wrong answer, you loose $10",
        status: "error",
        duration: 800,
        isClosable: true,
      });
    }
  }

  if (balance < 0) return <div>Game Over !!</div>;
  if (balance >= 100) return <div>You Won !!</div>;
  return (
    <>
      <Head>
        <title>Guess Location Game</title>
        <meta
          name="Guess Location Game"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minH="100vh" justifyContent="center">
        <Flex direction="column" w="60%" p={2}>
          <Text>
            Game time! Gamble $10. Guess the country. Get $100 or go broke
            trying..
          </Text>

          <Flex>
            <Input
              disabled={gameStarted}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Button
              disabled={name.length < 1 || gameStarted}
              onClick={startGame}
            >
              START
            </Button>
          </Flex>

          <Text hidden={!gameStarted}>{`Welcome ${name}. Let's play!`}</Text>

          <Flex display={!gameStarted ? "none" : ""}>
            <Image
              mt={10}
              src={locationArr[correctNum].image}
              alt="guess"
              maxWidth="100%"
              maxHeight="700px"
            ></Image>

            <Flex mt={2}>
              <Button onClick={(e) => judgeAnswer(countryOne)}>
                {countryOne}
              </Button>
              <Button onClick={(e) => judgeAnswer(countryTwo)}>
                {countryTwo}
              </Button>
              <Button onClick={(e) => judgeAnswer(countryThree)}>
                {countryThree}
              </Button>
            </Flex>

            <Text>{`Balance: $${balance}`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
