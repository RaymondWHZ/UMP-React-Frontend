import { NextPage } from "next";
import {
  Button,
  HStack,
  VStack,
  Text,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Spacer,
  Box
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "./services.module.css"
import {SiteLinkButton} from "@/components/SiteLink";
import {useUserInfo} from "@/services/user";
import React from "react";
import {FocusableElement} from "@chakra-ui/utils";

const LoginPromptButton = (props: React.ComponentProps<typeof Button>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<FocusableElement>()

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {props.children}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Login Required
            </AlertDialogHeader>

            <AlertDialogBody>
              Sign in with Google to access this service.
            </AlertDialogBody>

            <AlertDialogFooter>
              {/*// @ts-ignore*/}
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const AuthorizeButton = (props: React.ComponentProps<typeof Button>) => {
  const { data: userData, loading } = useUserInfo()
  if (!loading && userData.email) {
    return <SiteLinkButton {...props}>{props.children}</SiteLinkButton>
  }
  return <LoginPromptButton {...props}>{props.children}</LoginPromptButton>
}

interface ServiceCardProps {
  image: string,
  title: string,
  description: string
  url: string
}

const cardData: ServiceCardProps[] = [
  {
    image: "/service_fingering.png",
    title: "Ultra Fingering",
    description: `Ultra Music Practice generates best piano fingering automatically based on different hand sizes and \
                  annotate the fingerings tailored for you`,
    url: "/services/fingering"
  },
  {
    image: "/service_sightreading.png",
    title: "Ultra Sight-Reading",
    description: `The BEST assistance for Sight-Reading
                  Flat notes -- RED
                  Sharp notes -- GREEN
                  Natural notes -- YELLOW`,
    url: "/services/sightreading"
  }
]

const ServiceWrapper = () => (
  <HStack className={styles.ServiceWrapper} bg={"#13253F"}>
    <Box height={335} width={335} bg={"#FBA140"} className={styles.circleStyle}
        style={{
          "bottom":"-100px",
          "left": "-40px"
    }}></Box>
    <Box height={120} width={120} bg={"#60D1FA"} className={styles.circleStyle}
        style={{
          "bottom":"0px",
          "left": "260px"
    }}></Box>
    <Box height={76} width={76} bg={"#60D1FA"} className={styles.circleStyle}
        style={{
          "top":"30px",
          "left": "-10px"
    }}></Box>
    <Box height={100} width={100} bg={"#FBA140"} className={styles.circleStyle}
        style={{
          "top":"-20px",
          "left": "50px"
    }}></Box>
    <Box height={160} width={160} bg={"#60D1FA"} className={styles.circleStyle}
        style={{
          "bottom":"-30px",
          "right": "40px"
    }}></Box>
    <Box height={250} width={250} bg={"#60D1FA"} className={styles.circleStyle}
        style={{
          "top":"0px",
          "right": "40px"
    }}></Box>
    <Box height={100} width={100} bg={"#FBA140"} className={styles.circleStyle}
        style={{
          "top":"0px",
          "right": "40px"
    }}></Box>
    <Box height={100} width={100} bg={"#FBA140"} className={styles.circleStyle}
        style={{
          "top":"500px",
          "right": "150px"
    }}></Box>
    <Box height={150} width={150} bg={"#60D1FA"} className={styles.circleStyle}
        style={{
          "top":"150px",
          "left": "200px"
    }}></Box>
    <HStack style={{"width":"100%"}} justify="center" spacing="120px">
    <VStack width="450px" height="500px" className={styles.cardBg} p={10} align="center" spacing={5}>
      <Image alt="" src={cardData[0].image} height={300} width={800} style={{"borderRadius":"16px"}}/>
      <Heading fontFamily={"Inika"} color={"white"}>{cardData[0].title}</Heading>
      <Text style={{"whiteSpace": "pre-line"}} color={"white"} fontSize={"16px"} mt={5} textAlign={'center'} w="300px">{cardData[0].description}</Text>
      <Spacer/>
      <AuthorizeButton
        href={cardData[0].url}
        size={"lg"}
        bg={'#FBA140'}
        color={'white'}
        _hover={{
          bg: '#FBA140',
        }}
        width={"40"}
        px={20}
        fontSize={'17px'}
        fontWeight={'bold'}
        mt="30px"
      >
        Select
      </AuthorizeButton>
    </VStack>
    <VStack width="450px" height="500px" className={styles.cardBg} p={10} align="center" spacing={5}>
      <Image alt="" src={cardData[1].image} height={300} width={800} style={{"borderRadius":"16px"}}/>
      <Heading fontFamily={"Inika"} color={"white"}>{cardData[1].title}</Heading>
      <Text color={"white"} fontSize={"16px"} mt={5} textAlign={'center'} w="300px">
      The BEST assistance for Sight-Reading
                  <br/>
                  Flat notes -- <span style={{"color": "#FF420E", "fontWeight": "bold"}}>Red</span>
                  <br/>
                  Sharp notes -- <span style={{"color": "#89DA59", "fontWeight": "bold"}}>Green</span>
                  <br/>
                  Natural notes -- <span style={{"color": "#FFBB00","fontWeight": "bold"}}>Yellow</span>
      </Text>
      <Spacer/>
      <AuthorizeButton
        href={cardData[1].url}
        size={"lg"}
        bg={'#FBA140'}
        color={'white'}
        _hover={{
          bg: '#FBA140',
        }}
        width={"40"}
        px={20}
        fontSize={'17px'}
        fontWeight={'bold'}
        mt="30px"
      >
        Select
      </AuthorizeButton>
    </VStack>
    </HStack>
    
  </HStack>
)


const Services: NextPage = () => 
<>
  <ServiceWrapper/>
</>

export default Services
