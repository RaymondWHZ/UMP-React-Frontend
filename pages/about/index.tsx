import { NextPage } from "next";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Box,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "../about/about.module.css"
import {useState} from 'react'

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
  <Stack className={styles.HeadingWrapper} bg={"#13253F"} direction={{ base: 'column', md: 'row' }}>
    <Flex flex={1}>
      <VStack align={"left"} pl={45} pt={75}>
        <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '5xl', lg: '6xl' }}>
          <Text color={'white'} as={'span'}>
            About Ultra Music <br/>
            Practice
          </Text>
        </Heading>
        <br/>
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'white'} mb={10}>
           Ultra-Music-Practice is developed by a group of students from University of Illinois at Urbana-Champaign
          <br/>
          It is the <Text fontStyle={'bold'} fontSize={{ base: 'xl', lg: '3xl' }} as={"span"} color={"#60D1FA"}>FIRST</Text> Music Software that can generate very good fingerings for piano scores
          <br/>
          It can also highlight all the sharp & flat nots in a music scroe to help you sight-read any piece you want to play
        </Text>
        <Button
          size={"lg"}
          bg={'#FBA140'}
          color={'white'}
          _hover={{
            bg: '#FBA140',
          }} 
          width={"40"}
          style={{"fontSize": "20px","marginTop": "30px", "marginLeft": "50px"}}>
              Try Today!
        </Button>
      </VStack>
    </Flex>
    <Flex flex={1}> 
      <svg xmlns="http://www.w3.org/2000/svg" width="1002" height="700" fill="none" viewBox="0 0 802 682" x="100" className={styles.svgStyle}>
        <path fill="#fff" stroke="#fff" d="M171.1 209.708C1.879 124.677-50.315 78.213 56.582 1h944.388v498.505c1.53 14.971-54.206 38.995-54.206 38.995s-177.667 63.832-270.261 62.479c-92.593-1.353-343.561-56.842-321.412-62.479-184.114-55.206-225.786-88.658-133.604-155.091 0 0 108.41-79.318 70.238-114.767-38.173-35.449-120.625-58.934-120.625-58.934Z"/>
        <image href='about_piano.png' x={-900} y={170} height={350} width={600} style={{"transform": "scaleX(-1)"}}></image>
      </svg>
    </Flex>
  </Stack>
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
  <VStack flex={1} className={styles.OutcomesCard} justifyContent={"center"} p={"30"} minW={"300"}>
    <Heading fontSize="7xl" fontStyle={'bold'} color={"#FBA140"}>
      {data}
    </Heading>
    <Text fontSize={"4xl"} style={{"fontWeight":"bold"}} color={"#13253F"}>
      {title}
    </Text>
    <Text fontSize={"xl"} textAlign="center">
      {explanation}
    </Text>
  </VStack>
)

const OutcomesSection = () => (
  <Stack className={styles.OutcomesWrapper} direction={"column"} px={160} spacing="10">
    <Flex justify="center" mb={15}> 
      <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }}>
        <Text color={'#13253F'} as={'span'}>
          Drive Outcomes Across Our App
        </Text>
      </Heading>
    </Flex>
    <HStack width={"100%"} spacing="3">
      {
        cardInfo1.map((obj, index) => <OutcomesCard key={index} {...obj}/>)
      }
    </HStack>
    <HStack width={"100%"} spacing="3">
      {
        cardInfo2.map((obj, index) => <OutcomesCard key={index} {...obj}/>)
      }
    </HStack>
  </Stack>
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
  <Box flex={1} className={`${styles.ReasonCardBg} ${styles.ReasonAnimation}`} justifyContent={"center"} p={"30"} minW={"250"} h={500}>
    <Flex justify={"center"} mb={5}>
      <Image alt="" src={icon} height={50} width={50}/>
    </Flex>
    <Heading fontSize="3xl" fontStyle={'bold'} color={"#60D1FA"} textAlign="center" mb={3}>
      {title}
    </Heading>
    <Text fontSize={"xl"} textAlign="center" color={"white"} style={{"fontWeight":"bold"}}>
      {explanation}
    </Text>
  </Box>
)

const ReasonSection = () => (
  <Stack className={styles.ReasonWrapper} bg={"#13253F"} direction={"column"} px={160} spacing="10">
    <Flex justify="center" mb={15}> 
      <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }}>
        <Text color={'white'} as={'span'}>
          Reasons to Choose Us
        </Text>
      </Heading>
    </Flex>
    <HStack width={"100%"} spacing="20">
      {
        reasonInfo1.map((obj, index) => <ReasonCard key={index} {...obj}/>)
      }
    </HStack>
    <HStack width={"100%"} spacing="20">
      { 
        reasonInfo2.map((obj, index) => <ReasonCard key={index} {...obj}/>)
      }
    </HStack>
  </Stack>
)

const WaveLine = ({p}:settingP) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" preserveAspectRatio="none" height="300px">
    <path fill="#13253F" d={p}>
    </path>
  </svg>
)

const FAQs = () => (
  <Accordion>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        How much does Ultra Music Practice cost?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
      It is FREE for everyone who wants to give it a try.
      <br/>
      You will enjoy practicing piano everyday and sightreading for free !
      <br/>
      And you can also get a discount or even FREE Unlimited Access if you recommend Ultra Music Practice to your friends.
      <br/>
      After the free trial period, it only costs one purchase starting at $ 7.99, and that's it !
      <br/>
      No extra cost , No extra contracts.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        Why the piano fingering placement from Ultra Music Practice is good ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
      All the piano fingering techniques come from years of experiences of both professional and non-professional piano players.
      <br/>
      Supported by Machine Learning and advanced computer algorithms, the piano finger number on each note is tailored best to your handsize, incorporating every single one of popular piano finger patterns.
      <br/>
      Thus ensuring that you will be playing in the most comfortable way, with correct and efficient keyboard fingering exercise.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        What format of music scores does Ultra Music Practice accept?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
    Nowadays almost all the music scores are in digital printed format, so Ultra Music Practice accepts any format of PDF, PNG and JPG music scores as long as they are in PRINTED form.
      <br/>
      We feel really sorry that we are not able to do anything to Scanned or Hand-Written version of music scores.
      <br/>
      However, if your score is not in digital printed format, we encourage you to find scores of the same piece in such format from other websites, such as the Musescore community: <a href='https://musescore.com/community' color='#FBA140'>click here</a>
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        How does Ultra Music Practice help me sightread the score I want to play?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
    It would be pretty awesome if you can play at the first sight of any music score. But to achieve this, people used to spend years and years on sightreading practice.
      <br/>
      Now with Ultra Music Practice, you can do that ULTRA FAST!
      <br/>
      All the special notes (flat / sharp / natural) notes are marked with different colors, so you can quickly find what notes you are going to play next. And this function applies not only to sightreading piano, but to sightreading a wide range of music instruments.
      <br/>
      Upload a printed music score, and congratulations, you will enjoy the sightreading game!


    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        What can I expect to benefit from Ultra Music Practice?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
    If you are someone who just started learning to play the piano, Ultra Music Practice can give you a boost start with the best piano finger placement for beginners.
      <br/>
      If you have been playing the piano for a while, Ultra Music Practice will let you experience the best of practicing piano by removing a lot of redundancies when picking up a new piece.
      <br/>
      No matter what instrument are you practicing, with the help of Ultra Music Practice, you will grow into a master in practicing music ULTRA FAST !
      <br/>
      In short, it's the good deal of buying yourself much more time when practicing music.


    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h1>
      <AccordionButton _expanded={{color: '#FBA140' }}>
        <Box flex='1' textAlign='left' fontSize={"2xl"} style={{"fontWeight": "bold"}}>
        Is Ultra Music Practice good for everyone?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h1>
    <AccordionPanel pb={4} fontSize={"xl"}>
    Yes ! Absolutely !
      <br/>
      Fingering is one of the fundamentals for learning piano. That's why we have different hand-size options to annotate the fingerings of any piano score just tailored to your hand and to your skills.
      <br/>
      No matter what instrument you are practicing, you don't want to play any wrong notes. Now comes the Sight Reading tools from Ultra Music Practice, which helps you resolve the biggest factor of playing a wrong note while practicing.
      <br/>
      
And after hundreds of times of correctly practicing a piece, you become a wonderful performer for that piece you like.

    </AccordionPanel>
  </AccordionItem>
  
</Accordion>
)

const FAQSection = () => (
  <Box className={styles.FAQWrapper} bg={"white"} px={160}>
    <Flex align={"center"} mb={10}>
      <Image alt="" src={"/FAQ.png"} height="150" width="150"/>
      <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '6xl' }} color={"#13253F"} ml={10}>
        FAQs
      </Heading>
    </Flex>
    <FAQs/>
    <Box bg={"#13253F"} mt={"50px"} className={styles.ackownledgeCard} fontSize="xl" py={35} px={30} mb={10}>
      We do acknowledge that there are indeed many similar products to Ultra Music Practice.
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
)

const memberInfo1 = [
  {position:"CEO - FOUNDER", avatar:"/TeamMember/tommy.png", firstName:"Haoxiang", lastName:"Sun", major1:"Computer Science", major2:"Piano Performance", email:"hs23@illinois.edu"},
  {position:"CEO - FOUNDER", avatar:"/TeamMember/vivek.png", firstName:"Vivek", lastName:"Bhookya", major1:"Computer Science &", major2:"Astronomy", email:"v.bhookya98@gmail.com"},
  {position:"ASSISTANT DEVELOPER", avatar:"/TeamMember/Victoria.jpg", firstName:"Victoria", lastName:"Hu", major1:"Computer Science", major2: "Communication", email:"runzhao3@illinois.edu"}
]

const memberInfo2 = [
  {position:"MARKETING CONSULTANT", avatar:"/TeamMember/Linda.jpeg", firstName:"Linda", lastName:"Luo", major1:"Finance", major2: "Accounting", email:"rluo7@illinois.edu"}
]

const MemberCard = ({position, avatar, firstName, lastName, major1, major2, email}: memberInfo) => {
  
  const [isExpand, setExpand] = useState(false)
  
  return (
  <Box className={`${styles.ReasonCardBg} ${styles.memberCard}`} p={"30"} style={{"width":"350px", "flexGrow":"1"}} maxW={350} flex={1}>
    <Flex justify={"left"}>
      <Text fontSize={"xl"} fontWeight="bold" color={"white"}>{position}</Text>
    </Flex>
    <Box height={175} width={175} className={styles.avatarWrapper}>
      <Image alt="" src={avatar} width={175} height={175}></Image>
    </Box>
    <Text fontSize={"2xl"} fontWeight="bold" color={"white"}>{firstName}</Text>
    <Text fontSize={"2xl"} fontWeight="bold" color={"white"}>{lastName}</Text>
    <Box className={styles.plusIcon} width={50} height={50} onClick={() => setExpand(!isExpand)}>
      <Image alt="" src={`${isExpand ? "/icons/minus.png" : "/icons/plus.png"}`} width={50} height={50}></Image>
    </Box>
    <div className={`${!isExpand ? styles.TeamAfterExpand : styles.TeamBeforeExpand}`}>
      <Flex justify={"center"} flexDirection="column" justifyContent={"center"}>
        <Text fontSize={"xl"} fontWeight="bold" color={"white"}>{major1}</Text>
        <Text fontSize={"xl"} fontWeight="bold" color={"white"}>{major2}</Text>
        <Text fontSize={"xl"} fontWeight="bold" color={"white"}>{email}</Text>
      </Flex>
    </div>
  </Box>
  )
}

const TeamSection = () => (
  <Stack className={styles.TeamWrapper} bg={"#13253F"} direction={"column"} px={160} spacing="10">
    <Flex justify="center" mb={15}> 
      <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '4xl', lg: '5xl' }}>
        <Text color={'white'} as={'span'}>
          Our Team Members
        </Text>
      </Heading>
    </Flex>
    <div className={styles.TeamMemberLayout}>
        {
          memberInfo1.map((obj, index) => <MemberCard {...obj} key={index}/>)
        }
    </div>
    <div className={styles.TeamMemberLayout}>
        {
          memberInfo2.map((obj, index) => <MemberCard {...obj} key={index}/>)
        }
        <Box flex={2} className={styles.ReasonCardBg} py={10} px={50} maxW={770}>
          <Heading fontSize={"4xl"} fontWeight="bold" color={"white"} my={5}>We Value Your Feedback</Heading>
          <Text fontSize={"xl"} color={"white"}>To be the first such kind of software, we have a lot to improve.
          Please give us any suggestions you may have about this website.</Text>
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
              Feedback Form
        </Button>
        </Box>
    </div>
  </Stack>
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
