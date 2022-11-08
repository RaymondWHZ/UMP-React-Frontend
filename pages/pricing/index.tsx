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
import {useCountdown} from "@/utils/hooks";

interface priceInfo {
  oldPrice: string,
  newPrice: string,
  time: string
}

const freeUntil: string = process.env.NEXT_PUBLIC_FREE_UNTIL!

const LabelSection = () => {
  const [days, hours, minutes, seconds] = useCountdown(new Date(freeUntil))
  return (
    <Box bg={"#60D1FA"} className={styles.labelWrapper}>
      <Text textColor={"white"} fontSize={"3xl"} fontWeight={"bold"} textAlign="center">
        We are now FREE until {freeUntil}. Remaining time: {days} d {hours} h {minutes} m {seconds} s
      </Text>
    </Box>
  )
}

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
          fontSize={"17px"}
          fontWeight={'bold'}
          px={20}
          mt="20px"
          isDisabled
        >
          Select
        </Button>
      }
    </VStack>
  )
}

const priceData = [
  {newPrice: "Free", oldPrice: "$27.99", time: "One Month"},
  {newPrice: "Free", oldPrice: "$28.99", time: "One Year"},
  {newPrice: "Free", oldPrice: "$29.99", time: "Forever"}
]

const PricingSection = () => (
  <Center className={styles.PricingWrapper} bg={"#13253F"}>
    <HStack w="100%" maxW="1400px" pr="60px">
      <Box ml="-30px" mt="-70px" mr="-50px" maxW="600px">
        <Image alt="" src="/pricingImage.png" height={1000} width={1000} />
      </Box>
      <VStack align={"left"} justify={"center"} spacing="30px" w="700px">
        <Heading textColor={"white"} fontSize={"42px"} fontWeight={"bold"} fontFamily={"Inika"}>Enjoy Your Full Service by Today!</Heading>
        <UnorderedList spacing={2} fontSize={"17px"} color={"white"} style={{"marginLeft": "22px"}}>
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
