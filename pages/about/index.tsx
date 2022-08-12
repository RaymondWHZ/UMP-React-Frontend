import { NextPage } from "next";
import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Center, Spacer, SimpleGrid,
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "../about/about.module.css"
import React from 'react'
import {SiteLinkButton} from "@/components/SiteLink";
import {ArrowForwardIcon} from "@chakra-ui/icons";

interface settingP {
  p: string
}

interface cardInfo {
  data: string,
  title: string,
  explanation: string
}

interface reasonInfo {
  icon: string,
  title: string,
  explanation: string
}

interface memberInfo {
  position: string,
  avatar: string,
  firstName: string,
  lastName: string,
  major1: string,
  major2: string,
  email: string
}

const HeadingSection = () => (
  <Center bg={"#13253F"} pt="20px">
    <HStack className={styles.HeadingWrapper} maxW="1200px">
      <Flex flex={1}>
        <VStack align={"left"} pl={45} pt="10px">
          <Heading fontStyle={'bold'} fontSize="5xl">
            <Text fontFamily="Inika" color={'white'} as={'span'}>
              About <br/>
              Ultra Music Practice
            </Text>
          </Heading>
          <br/>
          <Text fontSize="17px" color={'white'} mb={10}>
            Ultra-Music-Practice is developed by a group of students<br/>
            from University of Illinois at Urbana-Champaign<br/>
            It is the <Text fontStyle={'bold'} fontSize={{ base: 'xl', lg: '3xl' }} as={"span"} color={"#60D1FA"}>FIRST</Text> Music Software that can generate very <br/>
            good fingerings for piano scores. It can also highlight all<br/>
            the sharp & flat notes in a music score to help you sight-read<br/>
            any piece you want to play
          </Text>
          <SiteLinkButton
            href={"/services"}
            size={"lg"}
            bg={'#FBA140'}
            color={'white'}
            _hover={{
              bg: '#FBA140',
            }}
            width={"40"}
            style={{"fontSize": "17px","marginTop": "40px"}}
            fontWeight={'bold'}
            rightIcon={<ArrowForwardIcon/>}
          >
            Try Today
          </SiteLinkButton>
        </VStack>
      </Flex>
      <Flex flex={1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="616" height="702" fill="none" viewBox="0 0 616 702">
          <path fill="#fff" stroke="#fff" d="M75.615 600.818C-9.835 536.874-9.161 493.88 15.19 413.792c0 0 226.134-409.944 283.356-412.778 57.221-2.833 307.618 412.778 307.618 412.778 25.652 51.348-10.987 120.433-28.382 142.631-17.395 22.197-181.891 162.65-279.236 142.63-97.346-20.02-222.931-98.235-222.931-98.235Z"/>
          <image href='about_piano.png' x={-580} y={210} height={350} width={540} style={{"transform": "scaleX(-1)"}}></image>
        </svg>
      </Flex>
    </HStack>
  </Center>
)

const cardInfo1: cardInfo[] = [
  {data: "16000+" , title:"Website Traffic", explanation:`Our app are now very popular among piano beginers and major & non-major piano players`},
  {data: "200%", title:"Efficency Imporved", explanation:"According to survey, users’ efficency of learning new music score is increased by 200%"},
  {data: "6000+", title:"Users Registered", explanation:"Our app are popular and trusted by many users who are not only piano beginers but also piano players"}
]

const cardInfo2: cardInfo[] = [
  {data: "4.8/5", title:"Reats in Feedback", explanation:"Customners are very satisfied about our services"},
  {data: "95.5%", title:"Get Unlimited Plan", explanation:"Our unlimited plan provides most enjoyable at very cost-effective price"},
  {data: "69.1%", title:"Recognize the Role", explanation:"Based on report, 69.1% customners believe ultra music practice help them learn instrument much faster"},
]

const OutcomesCard = ({data, title, explanation}: cardInfo) => (
  <VStack flex={1} justifyContent={"top"} p="30px" w="300px" h="250px">
    <Heading fontSize="6xl" fontStyle={'bold'} color={"#FBA140"}>
      {data}
    </Heading>
    <Text fontSize={"3xl"} fontFamily="Inika" style={{"fontWeight":"bold"}} color={"#13253F"}>
      {title}
    </Text>
    <Text fontSize={"17px"} textAlign="center">
      {explanation}
    </Text>
  </VStack>
)

const OutcomesSection = () => (
  <Center>
    <VStack className={styles.OutcomesWrapper} spacing="20px" maxW="1200px">
      <Flex justify="center" mb={15}>
        <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }}>
          <Text color={'#13253F'} as={'span'} fontFamily="Inika">
            Drive Outcomes Across Our App
          </Text>
        </Heading>
      </Flex>
      <HStack width={"100%"} spacing="4px">
        {
          cardInfo1.map((obj, index) => <OutcomesCard key={index} {...obj}/>)
        }
      </HStack>
      <HStack width={"100%"} spacing="4px">
        {
          cardInfo2.map((obj, index) => <OutcomesCard key={index} {...obj}/>)
        }
      </HStack>
    </VStack>
  </Center>
)

const reasonInfo1: reasonInfo[] = [
  {icon: "/icons/thumb.png", title: "First & Best Music Practice Software", explanation:`This is the first music software ever developed with user-oriented design.
  Everything it does is to help you practice music much more easily.
  For your convenience, it can accept PDF & Image Files of music scores.`},
  {icon: "/icons/tick.png", title: "Generate Piano Fingering and Annotate Directly", explanation:`Upload your PRINTED piano score to our website.
  Then it automatically generates the best fingering tailored for you, with all the piano fingering techniques incorporated.
  Most importantly, it saves you a lot amount of time.`},
  {icon: "/icons/music.png", title: "Highlight Flat & Sharp Notes for Sight-Reading", explanation:`Sometimes you always forgot a note should be flattened or sharpened?
  You want to learn a piece much faster without making so many mistakes?
  Upload you score to our website, and all the special notes are highlighted with different colors`},
]

const reasonInfo2: reasonInfo[] = [
  {icon: "/icons/devices.png", title: "Advanced Algorithm with Machine Learning", explanation:`The Fingering behind each output piano score is supported by advanced algorithm developed with Machine Learning and years of Piano Performance Experiences.
  Ensure you are playing in the most comfortable way.`},
  {icon: "/icons/team.png", title: "Community of 5K+ Users", explanation:`You are not alone!
  Join our community of over five thousand users. More and more people are using our product to learn playing a music piece much faster.
  We are dedicated to improving your practice experience and create an evolution in music practicing`},
  {icon: "/icons/lol.png", title: "Saves you a lot of Money", explanation:`Previously people spend thousands dollars in learning how to play one music instrument
  Now comes the solutions that only cost you a few pennies !
  With only a click, you will enjoy practicing music throughout your life !`},
]

const ReasonCard = ({icon, title, explanation}: reasonInfo) => (
  <VStack className={`${styles.ReasonCardBg} ${styles.ReasonAnimation}`} align="left" justifyContent="top" p={"30"} w="350px" h="400px">
    <Flex justify={"center"}>
      <Image alt="" src={icon} height={50} width={50}/>
    </Flex>
    <Heading fontSize="3xl" fontStyle={'bold'} fontFamily="Inika" color={"#60D1FA"} textAlign="center" mb={3}>
      {title}
    </Heading>
    <Text fontSize="17px" textAlign="center" color={"white"}>
      {explanation}
    </Text>
  </VStack>
)

const ReasonSection = () => (
  <Center className={styles.ReasonWrapper} bg={"#13253F"}>
    <VStack spacing="40px" maxW="1200px">
      <Flex justify="center" mb={15}>
        <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }}>
          <Text color={'white'} fontFamily="Inika" as={'span'}>
            Reasons to Choose Us
          </Text>
        </Heading>
      </Flex>
      <HStack width={"100%"} spacing="30px">
        {
          reasonInfo1.map((obj, index) => <ReasonCard key={index} {...obj}/>)
        }
      </HStack>
      <HStack width={"100%"} spacing="30px">
        {
          reasonInfo2.map((obj, index) => <ReasonCard key={index} {...obj}/>)
        }
      </HStack>
    </VStack>
  </Center>
)

const WaveLine = ({p}:settingP) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" preserveAspectRatio="none" height="300px">
    <path fill="#13253F" d={p}>
    </path>
  </svg>
)

interface FAQItemProps {
  title: React.ReactNode;
  explanation: React.ReactNode;
}

const FAQItem = ({title, explanation}: FAQItemProps) => (
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box fontFamily="Inika" flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"17px"}>
      {explanation}
    </AccordionPanel>
  </AccordionItem>
)

const faqList: FAQItemProps[] = [
  {
    title: "How much does Ultra Music Practice cost?",
    explanation: (
      <>
        It is FREE for everyone who wants to give it a try.
        <br/>
        You will enjoy practicing piano everyday and sightreading for free !
        <br/>
        And you can also get a discount or even FREE Unlimited Access if you recommend Ultra Music Practice to your friends.
        <br/>
        After the free trial period, it only costs one purchase starting at $ 7.99, and that's it !
        <br/>
        No extra cost , No extra contracts.
      </>
    )
  },
  {
    title: "Why the piano fingering placement from Ultra Music Practice is good?",
    explanation: (
      <>
        All the piano fingering techniques come from years of experiences of both professional and non-professional piano players.
        <br/>
        Supported by Machine Learning and advanced computer algorithms, the piano finger number on each note is tailored best to your handsize, incorporating every single one of popular piano finger patterns.
        <br/>
        Thus ensuring that you will be playing in the most comfortable way, with correct and efficient keyboard fingering exercise.
      </>
    )
  },
  {
    title: "What format of music scores does Ultra Music Practice accept?",
    explanation: (
      <>
        Nowadays almost all the music scores are in digital printed format, so Ultra Music Practice accepts any format of PDF, PNG and JPG music scores as long as they are in PRINTED form.
        <br/>
        We feel really sorry that we are not able to do anything to Scanned or Hand-Written version of music scores.
        <br/>
        However, if your score is not in digital printed format, we encourage you to find scores of the same piece in such format from other websites, such as the Musescore community: <a href='https://musescore.com/community' color='#FBA140'>click here</a>
      </>
    )
  },
  {
    title: "How does Ultra Music Practice help me sightread the score I want to play?",
    explanation: (
      <>
        It would be pretty awesome if you can play at the first sight of any music score. But to achieve this, people used to spend years and years on sightreading practice.
        <br/>
        Now with Ultra Music Practice, you can do that ULTRA FAST!
        <br/>
        All the special notes (flat / sharp / natural) notes are marked with different colors, so you can quickly find what notes you are going to play next. And this function applies not only to sightreading piano, but to sightreading a wide range of music instruments.
        <br/>
        Upload a printed music score, and congratulations, you will enjoy the sightreading game!
      </>
    )
  },
  {
    title: "What can I expect to benefit from Ultra Music Practice?",
    explanation: (
      <>
        If you are someone who just started learning to play the piano, Ultra Music Practice can give you a boost start with the best piano finger placement for beginners.
        <br/>
        If you have been playing the piano for a while, Ultra Music Practice will let you experience the best of practicing piano by removing a lot of redundancies when picking up a new piece.
        <br/>
        No matter what instrument are you practicing, with the help of Ultra Music Practice, you will grow into a master in practicing music ULTRA FAST !
        <br/>
        In short, it's the good deal of buying yourself much more time when practicing music.
      </>
    )
  },
  {
    title: "Is Ultra Music Practice good for everyone?",
    explanation: (
      <>
        Yes ! Absolutely !
        <br/>
        Fingering is one of the fundamentals for learning piano. That's why we have different hand-size options to annotate the fingerings of any piano score just tailored to your hand and to your skills.
        <br/>
        No matter what instrument you are practicing, you don't want to play any wrong notes. Now comes the Sight Reading tools from Ultra Music Practice, which helps you resolve the biggest factor of playing a wrong note while practicing.
        <br/>
        And after hundreds of times of correctly practicing a piece, you become a wonderful performer for that piece you like.
      </>
    )
  }
]

const FAQs = () => (
  <Accordion defaultIndex={[0]} allowMultiple>
    {faqList.map((item, index) => <FAQItem key={index + 1} {...item}/>)}
  </Accordion>
)

const FAQSection = () => (
  <Center>
    <Box className={styles.FAQWrapper} bg={"white"} maxW="1100px">
      <Flex align={"center"} mb={10}>
        <Image alt="" src={"/FAQ.png"} height="150" width="150"/>
        <Heading fontFamily="Inika" fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '6xl' }} color={"#13253F"} ml={10}>
          FAQs
        </Heading>
      </Flex>
      <FAQs/>
      <Box bg={"#13253F"} mt={"50px"} className={styles.ackownledgeCard} fontSize="17px" py={35} px={30} mb={10}>
        We do acknowledge that there are many similar products to Ultra Music Practice.
        <br/><br/>
        For example, another popular product for generating piano fingering is the Python Piano Player, which is a GitHub piano repo that takes XML format of piano scores and annotate fingering numbers with their algorithm: https://github.com/marcomusy/pianoplayer
        <br/><br/>
        And some people would also choose the Sight Reading Factory, which builds up your sightreading skills step by step on music scores from their website : https://www.sightreadingfactory.com
        <br/><br/>
        BUT !!! Ultra Music Practice is the
        <Text fontSize={"2xl"} as="span" color={"#60D1FA"} fontWeight="bold"> FIRST</Text>
        , the <Text fontSize={"2xl"} as="span" color={"#60D1FA"} fontWeight="bold"> ONLY</Text>, and the
        <Text fontSize={"2xl"} as="span" color={"#60D1FA"} fontWeight="bold"> BEST</Text>
        option for a user-oriented music software that can provide you with an ultra efficient music practice experience, right here and right now !
      </Box>
      <Box className={styles.workingImg}>
        <Image alt="" src="/working.png" width={"400"} height={"400"}></Image>
      </Box>
    </Box>
  </Center>
)

const memberInfo = [
  {position:"CEO - FOUNDER", avatar:"/TeamMember/tommy.png", firstName:"Haoxiang", lastName:"Sun", major1:"Computer Science", major2:"Piano Performance", email:"hs23@illinois.edu"},
  {position:"CEO - FOUNDER", avatar:"/TeamMember/vivek.png", firstName:"Vivek", lastName:"Bhookya", major1:"Computer Science", major2:"Astronomy", email:"v.bhookya98@gmail.com"},
  {position:"ASSISTANT DEVELOPER", avatar:"/TeamMember/Victoria.jpg", firstName:"Victoria", lastName:"Hu", major1:"Computer Science", major2: "Communication", email:"runzhao3@illinois.edu"},
  {position:"MARKETING CONSULTANT", avatar:"/TeamMember/Linda.jpeg", firstName:"Linda", lastName:"Luo", major1:"Finance", major2: "Accounting", email:"rluo7@illinois.edu"},
  {position:"FRONTEND DEVELOPER", avatar:"/TeamMember/Raymond.jpg", firstName:"Raymond", lastName:"Wu", major1:"Computer Science", major2: "Information Science", email:"haozhen6@illinois.edu"},
  {position:"UI DESIGNER & DEVELOPER", avatar:"/TeamMember/Sarah.png", firstName:"Sarah", lastName:"Wang", major1:"Computer Science", major2: "Mathematics", email:"peiranw3@illinois.edu"},
  {position:"UI DESIGNER", avatar:"/TeamMember/Annie.png", firstName:"Annie", lastName:"Sun", major1:"Inforation Science", major2: "Data Science", email:"qingyue7@illinois.edu"}
]

const MemberCard = ({position, avatar, firstName, lastName, major1, major2, email}: memberInfo) => {
  return (
  <VStack className={`${styles.ReasonCardBg} ${styles.memberCard}`} p="40px" pt="25px" w="350px" align="left" spacing="6px">
    <Box height={175} width={175} className={styles.avatarWrapper}>
      <Image alt="" src={avatar} width={175} height={175}></Image>
    </Box>
    <Text fontFamily="Inika" fontSize={"3xl"} fontWeight="bold" color={"white"}>{firstName} {lastName}</Text>
    <Flex justify={"left"}>
      <Text fontSize={"18px"} fontWeight="bold" color={"white"}>{position}</Text>
    </Flex>
    <Spacer/>
    <Text fontSize="17px" color={"white"}>{major1} & <br/> {major2}</Text>
    <Text fontSize="17px" color={"white"}>{email}</Text>
  </VStack>
  )
}

const TeamSection = () => (
  <Center className={styles.TeamWrapper} bg={"#13253F"} pb="100px">
    <VStack spacing="10" maxW="1100px">
      <Flex justify="center" mb={15}>
        <Heading fontStyle={'bold'} fontFamily="Inika" fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }} color="white">
          Our Team Members
        </Heading>
      </Flex>
      <SimpleGrid columns={3} spacing="30px">
        {
          memberInfo.map((obj, index) => <MemberCard {...obj} key={index}/>)
        }
        <VStack className={styles.ReasonCardBg} py={10} px={50} w="730px" align="left" justify="center">
          <Heading fontFamily="Inika" fontSize={"4xl"} fontWeight="bold" color={"white"}>We Value Your Feedback</Heading>
          <Text fontSize="17px" color={"white"}>
            To be the first such kind of software, we have a lot to improve.
            Please give us any suggestions you may have about this website.
          </Text>
          <Button
            size={"lg"}
            bg={'#FBA140'}
            color={'white'}
            _hover={{
              bg: '#FBA140',
            }}
            width={"40"}
            px={20}
            style={{"fontSize": "17px","marginTop": "30px",}}>
            Feedback Form
          </Button>
        </VStack>
      </SimpleGrid>
    </VStack>
  </Center>
)

const About: NextPage = () => (
  <>
    <HeadingSection/>
    <WaveLine p="M0,64L60,90.7C120,117,240,171,360,165.3C480,160,600,96,720,69.3C840,43,960,53,1080,69.3C1200,85,1320,107,1380,117.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
    <OutcomesSection/>
    <WaveLine p="M0,64L60,69.3C120,75,240,85,360,117.3C480,149,600,203,720,224C840,245,960,235,1080,197.3C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
    <ReasonSection/>
    <WaveLine p="M0,160L60,154.7C120,149,240,139,360,138.7C480,139,600,149,720,176C840,203,960,245,1080,234.7C1200,224,1320,160,1380,128L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
    <FAQSection/>
    <WaveLine p="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,192C840,203,960,213,1080,202.7C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
    <TeamSection/>
  </>
)

export default About
