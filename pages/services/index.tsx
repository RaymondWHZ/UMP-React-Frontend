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
  Spacer
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

const ServiceCard = ({image, title, description, url}: ServiceCardProps) => (
  <VStack width="450px" height="500px" className={styles.cardBg} p={10} style={{"textAlign": "center"}} spacing={5}>
    <Image alt="" src={image} height={300} width={800} style={{"borderRadius":"16px"}}/>
    <Heading fontFamily={"Arima"} color={"white"}>{title}</Heading>
    <Text style={{"whiteSpace": "pre-line"}} color={"white"} fontSize={"16px"} mt={5} textAlign={'left'} w="300px">{description}</Text>
    <Spacer/>
    <AuthorizeButton
      href={url}
      size={"lg"}
      bg={'#FBA140'}
      color={'white'}
      _hover={{
        bg: '#FBA140',
      }}
      width={"40"}
      px={20}
      style={{"fontSize": "20px","marginTop": "30px",}}
    >
      Select
    </AuthorizeButton>
  </VStack>
)

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
    title: "Ultra SightReading",
    description: `The BEST assistance for Sight-Reading
                  Flat notes -- RED
                  Sharp notes -- GREEN
                  Natural notes -- YELLOW`,
    url: "/services/sightreading"
  }
]

const ServiceWrapper = () => (
  <HStack className={styles.ServiceWrapper} bg={"#13253F"} spacing="120px" justify="center">
    {
      cardData.map(obj => <ServiceCard {...obj} key={obj.url}/>)
    }
  </HStack>
)


const Services: NextPage = () => 
<>
  <ServiceWrapper/>
</>

export default Services
