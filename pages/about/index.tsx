import { NextPage } from "next";
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
import styles from "../about/about.module.css"

const HeadingSection = () => (
  <Stack className={styles.HeadingWrapper} bg={"#13253F"} direction={{ base: 'column', md: 'row' }}>
    <Flex flex={1} bg="green">
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="682" fill="none" viewBox="0 0 802 682" x="100" className={styles.svgStyle}>
        <path fill="#fff" stroke="#fff" d="M137.08 237.535C1.703 141.168-40.052 88.508 45.466 1h755.509v564.973c1.222 16.966-43.364 44.193-43.364 44.193s-142.134 72.343-216.208 70.81c-74.075-1.533-274.849-64.42-257.13-70.81-147.291-62.567-180.629-100.479-106.883-175.769 0 0 86.728-89.894 56.19-130.069-30.538-40.176-96.5-66.793-96.5-66.793Z"/>
      </svg>
    </Flex>
    <Flex flex={1} bg="green"> 

    </Flex>
  </Stack>
)

interface settingP {
  p: string
}

const WaveLine = ({p}:settingP) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#13253F" fill-opacity="1" d={p}>
    </path>
  </svg>
)

const About: NextPage = () => (
  <>
    <HeadingSection/>
    <WaveLine p="M0,64L80,58.7C160,53,320,43,480,69.3C640,96,800,160,960,160C1120,160,1280,96,1360,64L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
  </>
)

export default About
