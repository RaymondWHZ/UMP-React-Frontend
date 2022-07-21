import type { NextPage } from 'next'
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  Container
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "pages/home.module.css"

const TitleSection = () => (
  <Stack bg={'#4073A2'} className={styles.skewed_container} style={{"marginTop": "-200px", "height":"800px"}} pt={100}  direction={{ base: 'column', md: 'row' }}>
    <Stack className={styles.content_wrapper} style={{"height":"700px"}} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} align={'center'} justify={'right'}>
        <Stack spacing={3} w={'full'} maxW={'lg'}>
          <Heading fontStyle={'bold'} fontSize={{ base: 'xl', md: '5xl', lg: '6xl' }}>
            <Text color={'white'} as={'span'}>
              Piano Fingering Generator & 
            </Text>
            <br/>
            <Text color={'white'} as={'span'}>
              Sight Reading Assistance
            </Text>
          </Heading>
            <Text fontStyle={'bold'} fontSize={{ base: 'xl', lg: '3xl' }} color={'#FBA140'}>
              Best Music Practice Software For Free
            </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              size={"lg"}
              bg={'#FBA140'}
              color={'white'}
              _hover={{
                bg: '#FBA140',
              }} style={{"fontSize": "20px"}}>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} align={'center'} justify={'left'}>
        <Image src="/home_piano.jpg" alt='Home Piano' width="580" height="550">
        </Image>
      </Flex>
    </Stack>
  </Stack>
)


const FingeringSection = () => (
  <Stack bg={'#13253F'} className={styles.skewed_container} style={{"height": "600px"}} direction={{ base: 'column', md: 'row' }}>
    <Stack style={{"height":"580px", "width": "100%", "marginTop": "20px"}} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={2}  justify={'right'} className={styles.content_wrapper}>
        <Stack spacing={6} w={'full'} maxW={'lg'} pt={31}>
          <Box height={100} width={100} style={{"transform": "rotate(15deg)"}}>
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
        </Stack>
      </Flex>
      <Flex flex={3} align={'end'} justify={'left'}  pl={40} overflow="hidden">
        <Box height={400} width={250} marginBottom={-170} style={{"transform": "skewY(-6deg) rotate(-15deg)"}} marginLeft="-35">
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
      <Flex flex={2}  justify={'right'} className={styles.content_wrapper}>
        <Stack spacing={6} w={'full'} maxW={'lg'} pt={31}>
          <Box height={100} width={100} style={{"transform": "rotate(15deg)"}}>
            <Image src="/home_music1.png" alt='home music icon' layout='intrinsic' height={100} width={100}>
            </Image>
          </Box>
          <Heading fontStyle={'bold'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#FBA140'} as={'span'}>
            Hard to Do <br/>
            Sight-Reading?
            </Text>
          </Heading>
          <Text fontStyle={'bold'} fontSize={{ base: 'md', lg: '2xl' }} color={'white'}>
          Ultra Music Practice helps distiguish different notes by 
          three colors: <br/>
            Flat Note - Red <br/>
            Sharp Note - Greeen <br/>
            Nautrual Note - Yellow <br/>
          </Text>
        </Stack>
      </Flex>
      <Flex flex={3} align={'end'} justify={'left'}  pl={40} overflow="hidden">
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
        <Flex flex={1} justify={'right'} width="">
          <Image src="/hello_woman.png" height={600} width={300}/>
        </Flex>
        <Flex bg={"orange"} flex={1.5} align={'end'} justify={'left'}  pl={40} overflow="hidden">
          <Box style={{"height":"100px", "width":"100px", "marginLeft":"-160px", "marginBottom": "500px", "transform": "rotate(10deg)"}}>
          <Image src="/hello_sign.png" height={100} width={100}/>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  </Box>
)

const Home: NextPage = () => {
  return (
    <>
      {/* <TitleSection/> */}
      <TitleSection/>
      <FingeringSection/>
      <SightReadingSection/>
      <HelloSection/>
    </>
  )
}

export default Home
