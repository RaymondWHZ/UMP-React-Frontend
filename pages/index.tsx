import type { NextPage } from 'next'
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  VStack
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "pages/home.module.css"


const TitleSection = () => (
  <Stack bg={'#4073A2'} className={styles.skewed_container} style={{"marginTop": "-200px", "height":"800px"}} pt={100}  direction={{ base: 'column', md: 'row' }}>
    <Stack className={styles.content_wrapper} style={{"height":"700px"}} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} align={"center"} justify={"right"} style={{"WebkitJustifyContent": "flex-end"}}>
        <VStack spacing={4} align={"left"}>
          <Heading fontStyle={'bold'} fontSize={"6xl"} color={"white"}>
            Piano Fingering 
            <br/>
            Generator & 
            <br/>
            Sight Reading 
            <br/>
            Assistance
          </Heading>
          <Text fontStyle={'bold'} fontSize={"3xl"} color={'#FBA140'} textAlign={"right"}>
              Best Music Practice Software For Free
          </Text>
          <Button
              size={"lg"}
              bg={'#FBA140'}
              color={'white'}
              width={150}
              _hover={{
                bg: '#FBA140',
              }} style={{"fontSize": "20px"}}>
              Get Started
          </Button>
        </VStack>

      </Flex>
      <Flex flex={1} align={'center'}>
        <Image src="/home_piano.jpg" alt='Home Piano' width="580" height="550">
        </Image>
      </Flex>
    </Stack>
  </Stack>
)

const FingeringSection = () => (
  <Stack bg={'#13253F'} className={styles.skewed_container} style={{"height": "600px"}} direction={{ base: 'column', md: 'row' }}>
    <Stack style={{"height":"580px", "width": "100%", "marginTop": "20px"}} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={2} className={styles.content_wrapper}>
        <VStack pl={50} spacing={6} align={"left"} pt={30}>
          <Box height={100} width={100} style={{"transform": "rotate(15deg)", "WebkitTransform":"rotate(15deg)"}}>
            <Image src="/home_music1.png" alt='home music icon' layout='intrinsic' height={100} width={100}>
            </Image>
          </Box>
          <Heading fontStyle={'bold'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#60D1FA'} as={'span'}>
              Troubling in Fingering <br/>
              For Beginer?
            </Text>
          </Heading>
          <Text fontStyle={'bold'} fontSize={{ base: 'md', lg: '2xl' }} color={'white'}>
            Ultra Music Practice generates best piano fingering automatically based on differnt hand sizes
          </Text>
        </VStack>
      </Flex>
      <Flex flex={3} align={'end'}  pl={40} overflow="hidden" style={{"WebkitAlignItems":"flex-end"}}>
        <Box height={400} width={250} className={styles.fingeringBefore}>
          <Image src="/fingering_before.png"layout='fill'></Image>
        </Box>
        <Box height={700} width={550} marginBottom={-170} style={{"transform": "skewY(-6deg) rotate(-5deg)"}} >
          <Image src="/fingering_after2.png"layout='fill'></Image>
        </Box>
      </Flex>
    </Stack>
  </Stack>
)


const SightReadingSection = () => (
  <Stack bg={'#4073A2'} className={styles.skewed_container} style={{"height": "600px"}} direction={{ base: 'column', md: 'row' }}>
    <Stack style={{"height":"580px", "width": "100%", "marginTop": "20px"}} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={2} className={styles.content_wrapper}>
        <VStack pl={50} spacing={6} align={"left"} pt={30}>
          <Box height={100} width={100} style={{"transform": "rotate(15deg)", "WebkitTransform":"rotate(15deg)"}}>
            <Image src="/home_music2.png" alt='home music icon' layout='intrinsic' height={100} width={100}>
            </Image>
          </Box>
          <Heading fontStyle={'bold'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color={'#FBA140'}>
            Hard to Do <br/>
            Sight-Reading?
          </Heading>
          <Text fontStyle={'bold'} fontSize={{ base: 'md', lg: '2xl' }} color={'white'}>
          Ultra Music Practice helps distiguish different notes by 
          three colors: <br/>
            Flat Note - Red <br/>
            Sharp Note - Greeen <br/>
            Nautrual Note - Yellow <br/>
          </Text>
        </VStack>
      </Flex>
      <Flex flex={3} align={'end'}  pl={40} overflow="hidden" style={{"WebkitAlignItems":"flex-end"}}>
        <Box height={700} width={550} marginBottom={-170} style={{"transform": "skewY(-6deg) rotate(15deg)"}} >
          <Image src="/sightReading.png"layout='fill'></Image>
        </Box>
      </Flex>
    </Stack>
  </Stack>
)

const HelloSection = () => (
  <Box bg={"#13253F"} height={700}>
    <Stack bg={'#13253F'} className={styles.skewed_container} style={{"height": "600px"}} direction={{ base: 'column', md: 'row' }}>
      <Stack style={{"height":"650px", "width": "100%", "marginTop": "20px"}} direction={{ base: 'column', md: 'row' }} className={styles.content_wrapper}>
        <Flex flex={1} pl={20}>
          <Image src="/hello_woman.png" height={600} width={300}/>
        </Flex>
        <Flex flex={2.5} align={'end'} justify={'left'}  pl={40} style={{"WebkitAlignItems":"flex-end"}}>
          <Box style={{"height":"100px", "width":"100px", "marginLeft":"-160px", "marginBottom": "500px", "transform": "rotate(10deg)"}}>
            <Image src="/hello_sign.png" height={100} width={100}/>
          </Box>
          <VStack mb={250} spacing={4}>
            <Heading size="3xl" fontStyle={'bold'} color={"#60D1FA"}>Try Ultra Muisc Practice Today</Heading>
            <Text fontSize="3xl" fontStyle={'bold'} color={"white"}>Geting Start For Free</Text>
            <Button
              size={"lg"}
              bg={'#FBA140'}
              color={'white'}
              _hover={{
                bg: '#FBA140',
              }} style={{"fontSize": "20px"}}>
              Try Now!
            </Button>
          </VStack>
        </Flex>
      </Stack>
    </Stack>
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
