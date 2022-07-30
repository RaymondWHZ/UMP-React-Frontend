import { NextPage } from "next";
import { 
  Button,
  HStack,
  VStack,
  Text,
  Heading
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image'
import styles from "../services/services.module.css"

interface cardInfo {
  image: string,
  title: string,
  description: string
  url: string
}

const ServiceCard = ({image, title, description, url}: cardInfo) => (
  <VStack flex={1} width={400} className={styles.cardBg} p={10} style={{"textAlign": "center"}} spacing={5}>
    <Image src={image} height={300} width={800} style={{"borderRadius":"16px"}}></Image>
    <Heading color={"white"}>{title}</Heading>
    <Text style={{"whiteSpace": "pre-line"}} color={"white"} fontSize={"2xl"} mt={5}>{description}</Text>
    <Link href={url}>
      <Button 
          
          size={"lg"}
          bg={'#FBA140'}
          color={'white'}
          _hover={{
            bg: '#FBA140',
          }} 
          width={"40"}
          px={20}
          style={{"fontSize": "20px","marginTop": "30px",}}>
              Select
        </Button>
    </Link>
  </VStack>
)

const cardData = [
  {image: "/service_fingering.png", title: "Ultra Fingering", description: `Ultra Music Practice generates best piano fingering automatically based on differnt hand sizes
  and Annotate the fingerings tailored for you`, url: "/services/fingering"},
  {image: "/service_sightreading.png", title: "Ultra SightReading", description: `The BEST assistance for Sight-Reading
  Flat notes -- RED
  Sharp notes -- GREEN
  Natural notes -- YELLOW`, url: "/services/sightreading"},
]

const ServiceWrapper = () => (
  <HStack className={styles.ServiceWrapper} bg={"#13253F"} px={60} spacing={60}>
    {
      cardData.map(obj => <ServiceCard {...obj} key={obj.url}/>)
    }
  </HStack>
)


const Services: NextPage = () => 
<>
  {/* <Link href="/services/fingering">
    <Button>
      Select 1
    </Button>
  </Link>
  <Button>
    Select 2
  </Button> */}
  <ServiceWrapper/>
</>

export default Services
