import { NextPage } from "next";

import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  UnorderedList,
  ListItem,
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
  <VStack flex={1} width={200} className={`${!isExpand ? styles.priceBg : styles.cardWrapper} ${styles.animation}`}  px={7} py={10}
    onMouseEnter = {() => setExpand(true)} onMouseLeave={() => setExpand(false)}
  >
    <Text color={isExpand ? "black" : "white"} fontSize={"xl"} className={styles.priceText}>{oldPrice}</Text>
    <Text fontWeight={"bold"} fontSize={"5xl"} color={"#60D1FA"}>{newPrice}</Text>
    <Text fontWeight={"bold"} fontSize={"3xl"} color={"#60D1FA"}>{time}</Text>
    <Box className={`${isExpand ? styles.PriceAfterExpand : styles.PriceBeforeExpand}`}>
      <Button
          size={"lg"}
          bg={'#60D1FA'}
          color={'white'}
          _hover={{
            bg: '#66b6d4',
          }} 
          width={"20"}
          fontSize={"3xl"}
          px={20}>
            Select
      </Button>
    </Box>
    
   
  </VStack>

  )
}

const priceData = [
  {newPrice: "Free", oldPrice: "$19.99", time: "One Month"},
  {newPrice: "$8.99", oldPrice: "$29.99", time: "One Year"},
  {newPrice: "$9.99", oldPrice: "$39.99", time: "Forever"}
]

const PricingSection = () => (
  <HStack className={styles.PricingWrapper} bg={"#13253F"}>
    <Box flex={1.2}>
      <Image src="/pricingImage.png" height={1000} width={1000}></Image>
    </Box>
    <VStack flex={2} align={"left"} justify={"center"}>
      <Heading textColor={"white"} fontSize={"5xl"} fontWeight={"bold"}>Enjoy Your Full Service By Today!</Heading>
      <UnorderedList spacing={2} fontSize={"xl"} color={"white"} style={{"marginLeft": "30px"}}>
        <ListItem>generates best piano fingering automatically based on differnt hand sizes</ListItem>
        <ListItem>helps distiguish different notes by three colorst</ListItem>
        <ListItem>remove watermark from music score</ListItem>
      </UnorderedList>
      {/* <Button 
          
          size={"lg"}
          bg={'#60D1FA'}
          color={'white'}
          _hover={{
            bg: '#66b6d4',
          }} 
          width={"80"}
          px={20}
          style={{"fontSize": "20px","marginTop": "30px",}}>
              Begin Your Free Trail By Today
      </Button> */}
      <HStack spacing={10} pr={20} py={5}>
        {
          priceData.map((obj, index) => <PriceCard {...obj} key={index}/>) 
        }
       
      </HStack>
    </VStack>
  </HStack>
)


const Pricing: NextPage = () => <>
  <LabelSection/>
  <PricingSection/>
</>

export default Pricing
