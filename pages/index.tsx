import type { NextPage } from 'next'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';

const TitleSection = () => (
  <Stack maxH={'100vh'} direction={{ base: 'column', md: 'row' }} bg={'#4073A2'}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={6} w={'full'} maxW={'lg'}>
        <Heading fontStyle={'bold'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          <Text color={'white'} as={'span'}>
            Piano Fingering Generator & Sight Reading Assistance
          </Text>
        </Heading>
        <Text fontStyle={'bold'} fontSize={{ base: 'md', lg: 'lg' }} color={'#FBA140'}>
          Best Music Practice Software For Free
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Button
            bg={'#FBA140'}
            color={'white'}
            _hover={{
              bg: '#FBA140',
            }}>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Flex>
    <Flex flex={1} p={20}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
      />
    </Flex>
  </Stack>
)

const FingeringSection = () => (
  <Stack maxH={'100vh'} direction={{ base: 'column', md: 'row' }} bg={'#13253F'}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={6} w={'full'} maxW={'lg'}>
        <Heading fontStyle={'bold'} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          <Text color={'#60D1FA'} as={'span'}>
            Troubling in Fingering <br/>
            For Biginer?
          </Text>
        </Heading>
        <Text fontStyle={'bold'} fontSize={{ base: 'md', lg: 'lg' }} color={'white'}>
          Ultra Music Practice generates best piano fingering automatically based on differnt hand sizes
        </Text>
      </Stack>
    </Flex>
    <Flex flex={1} p={20}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
      />
    </Flex>
  </Stack>
)

const Home: NextPage = () => {
  return (
    <>
      <TitleSection/>
      <FingeringSection/>
    </>
  )
}

export default Home
