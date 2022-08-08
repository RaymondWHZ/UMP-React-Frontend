import { NextPage } from "next";

import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  UnorderedList,
  ListItem, Center,
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "../pricing/pricing.module.css"
import {useState} from 'react'

interface priceInfo {
  oldPrice: string,
  newPrice: string,
  time: string
}

const LabelSection = () => (
  <Box bg={"#60D1FA"} className={styles.labelWrapper}>
    <Text textColor={"white"} fontSize={"3xl"} fontWeight={"bold"} textAlign="center">We are now FREE until Sep 13th</Text>
  </Box>
)

const PriceCard = ({oldPrice, newPrice, time}: priceInfo) => {

  const [isExpand, setExpand] = useState(false)
  
  return (
    <VStack flex={1} width="200px" className={`${!isExpand ? styles.priceBg : styles.cardWrapper} ${styles.animation}`}  px={7} py={10}
      onMouseEnter = {() => setExpand(true)} onMouseLeave={() => setExpand(false)}
    >
      <Text color={isExpand ? "black" : "white"} fontSize={"xl"} className={styles.priceText}>{oldPrice}</Text>
      <Text fontWeight={"bold"} fontSize={"5xl"} color={"#60D1FA"}>{newPrice}</Text>
      <Text fontWeight={"bold"} fontSize={"2xl"} color={isExpand ? "#60D1FA" : "white"}>{time}</Text>
      {isExpand &&
        <Button
          bg={'#60D1FA'}
          color={'white'}
          _hover={{
            bg: '#66b6d4',
          }}
          width={"20"}
          fontSize={"2xl"}
          px={20}
        >
          Select
        </Button>
      }
    </VStack>
  )
}

const priceData = [
  {newPrice: "Free", oldPrice: "$7.99", time: "One Month"},
  {newPrice: "Free", oldPrice: "$8.99", time: "One Year"},
  {newPrice: "Free", oldPrice: "$9.99", time: "Forever"}
]

const PricingSection = () => (
  <Center className={styles.PricingWrapper} bg={"#13253F"}>
    <HStack w="100%" maxW="1400px" pr="60px">
      <Box mt="-70px">
        <Image alt="" src="/pricingImage.png" height={1000} width={1000} />
      </Box>
      <VStack align={"left"} justify={"center"} spacing="30px">
        <Heading textColor={"white"} fontSize={"5xl"} fontWeight={"bold"} fontFamily={"Arima"}>Enjoy Your Full Service By Today!</Heading>
        <UnorderedList spacing={2} fontSize={"xl"} color={"white"} style={{"marginLeft": "30px"}}>
          <ListItem>generates best piano fingering automatically based on different hand sizes</ListItem>
          <ListItem>helps distinguish different notes by three colors</ListItem>
          <ListItem>remove watermark from music score</ListItem>
        </UnorderedList>
        <HStack spacing={10} py={5} h="300px">
          {
            priceData.map((obj, index) => <PriceCard {...obj} key={index}/>)
          }
        </HStack>
      </VStack>
    </HStack>
  </Center>

)

const Pricing: NextPage = () => <>
  <LabelSection/>
  <PricingSection/>
</>

export default Pricing
