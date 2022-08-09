import type { NextPage } from 'next'
import {
  Flex,
  Stack,
  Text,
  Box,
  VStack, Spacer, ChakraProps, UnorderedList, ListItem
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "pages/home.module.css"
import {SiteLinkButton} from "@/components/SiteLink";
import React from "react";
import {ArrowForwardIcon} from "@chakra-ui/icons";

interface TwoColumnLayoutProps extends ChakraProps {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  columnSpacing?: any;
}

const SkewedTwoColumnLayout = (props: TwoColumnLayoutProps) => {
  const { leftChildren, rightChildren, columnSpacing } = props;
  return (
    <Box className={styles.skewed_container} {...props}>
      <Stack
        className={styles.content_wrapper}
        justify="center"
        h="100%"
        direction={{ base: 'row' }}
        spacing={columnSpacing ?? "80px"}
      >
        <Flex align={"center"}>
          {leftChildren}
        </Flex>
        <Flex align={'center'}>
          {rightChildren}
        </Flex>
      </Stack>
    </Box>
  )
}

const TitleSection = () => (
  <SkewedTwoColumnLayout
    bg={'#4073A2'}
    mt="-200px"
    h="900px"
    pt="100px"
    leftChildren={
      <VStack align={"left"} spacing="20px">
        <Text className={styles.displayTitle} fontStyle="bold" color={"white"}>
          Piano Fingering <br/>
          Generator & <br/>
          Sight Reading <br/>
          Assistance
        </Text>
        <Text className={styles.displaySubtitle} color={'#FBA140'}>
          Best Music Practice Software For Free
        </Text>
        <Spacer/>
        <SiteLinkButton
          href={"/services"}
          bg={'#FBA140'}
          color={'white'}
          w={170}
          h={50}
          _hover={{
            bg: '#FBA140',
          }}
          fontSize={'17px'}
          rightIcon={<ArrowForwardIcon />}
        >
          Get Started
        </SiteLinkButton>
      </VStack>
    }
    rightChildren={
      <Image src="/home_piano.jpg" alt='Home Piano' width="500" height="500" style={{transform: "matrix(-1, 0, 0, 1, 0, 0)"}}/>
    }
  />
)

const FingeringSection = () => (
  <SkewedTwoColumnLayout
    bg={'#13253F'}
    h="600px"
    leftChildren={
      <>
        <Box height={350} width={240} mb={-300} transform="rotate(-15deg)">
          <Image alt="" src="/fingering_before.png" layout='fill'></Image>
        </Box>
        <Box height={550} width={450} mb={-150} transform="rotate(-5deg)">
          <Image alt="" src="/fingering_after2.png" layout='fill'></Image>
        </Box>
      </>
    }
    rightChildren={
      <VStack spacing="20px" align={"left"} mt={10}>
        <Box height={100} width={100} ml="8px" style={{"transform": "rotate(15deg)", "WebkitTransform":"rotate(15deg)"}}>
          <Image src="/home_music1.png" alt='home music icon' layout='intrinsic' height={100} width={100} />
        </Box>
        <Spacer/>
        <Text className={styles.displayTitle2} color={'#60D1FA'}>
          Troubling in Fingering <br/>
          For Beginer?
        </Text>
        <Text className={styles.displayText} color={'white'}>
          Ultra Music Practice generates best piano fingering <br/>
          automatically based on different hand sizes<br/>
        </Text>
      </VStack>
    }
  />
)

const SightReadingSection = () => (
  <SkewedTwoColumnLayout
    bg={'#4073A2'}
    h="600px"
    leftChildren={
      <VStack spacing="20px" align={"left"} mt={-110}>
        <Box height={100} width={100} ml="10px" style={{"transform": "rotate(15deg)", "WebkitTransform":"rotate(15deg)"}}>
          <Image src="/home_music2.png" alt='home music icon' layout='intrinsic' height={100} width={100}/>
        </Box>
        <Spacer/>
        <Text className={styles.displayTitle2} color={'#FBA140'}>
          Having Hardship Doing <br/>
          Sight-Reading?
        </Text>
        <VStack align="left" spacing="9px">
          <Text className={styles.displayText} color="white">
            Ultra Music Practice helps distinguish different notes <br/>
            by three colors:
          </Text>
          <UnorderedList className={styles.displayText} pl="19px" color="white">
            <ListItem>Flat Note - Red</ListItem>
            <ListItem>Sharp Note - Green</ListItem>
            <ListItem>Natural Note - Yellow</ListItem>
          </UnorderedList>
        </VStack>
      </VStack>
    }
    rightChildren={
      <Box height={700} width={550} mb={-400} ml={-10} style={{"transform": "rotate(15deg)"}} >
        <Image alt="" src="/sightReading.png" layout='fill'></Image>
      </Box>
    }
  />
)

const HelloSection = () => (
  <Box bg={"#13253F"} height={700}>
    <SkewedTwoColumnLayout
      bg={'#13253F'}
      height={600}
      columnSpacing="10px"
      leftChildren={
        <Box mt="80px">
          <Image alt="" src="/hello_woman.png" height={600} width={300}/>
        </Box>
      }
      rightChildren={
        <VStack align="left" spacing="40px">
          <Box h={100} w={100} transform="rotate(10deg)">
            <Image alt="" src="/hello_sign.png" height={100} width={100}/>
          </Box>
          <VStack spacing={4}>
            <Text className={styles.displayTitle} color={"#60D1FA"}>Try Ultra Music Practice Today</Text>
            <Text className={styles.displaySubtitle} color={"white"}>Getting Start For Free</Text>
            <Spacer/>
            <SiteLinkButton
              href={'/services'}
              size="lg"
              bg={'#FBA140'}
              color={'white'}
              _hover={{
                bg: '#FBA140',
              }}
              fontSize="17px"
              rightIcon={<ArrowForwardIcon />}
            >
              Try Now
            </SiteLinkButton>
          </VStack>
        </VStack>
      }
    />
  </Box>
)

const Home: NextPage = () => {
  return (
    <>
      <TitleSection/>
      <FingeringSection/>
      <SightReadingSection/>
      <HelloSection/>
    </>
  )
}

export default Home
