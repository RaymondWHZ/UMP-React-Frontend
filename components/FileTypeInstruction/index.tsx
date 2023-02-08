import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";

import {CloseIcon, CheckIcon} from "@chakra-ui/icons";
import Image from 'next/image'
import { useDisclosure } from '@chakra-ui/react'
import styles from "./FileTypeInstruction.module.css"

export function FileTypeInstruction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Button color='white' variant='link' onClick={onOpen}>
      Why my file doesn't work?
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Why my file doesn't work?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          For now, we only accept <span style={{fontWeight: "bold"}}>digital printed version </span> 
          of a music sheet but not <span style={{fontWeight: "bold"}}>hand-written or scanned version</span>
          , for example:
          <Flex>
            <Box flex={1} position="relative">
              <Image alt="Printed version" src={"/printedVersion.png"} height={300} width={200}></Image>
              <CheckIcon boxSize="30px" color="green" className={styles.ImageIcon}/>
            </Box>
            <Box flex={1} position="relative">
              <Image alt="Hand written" src={"/handWritten.png"} height={300} width={200}></Image>
              <CloseIcon boxSize="30px" color="red" className={styles.ImageIcon}/>
            </Box>
            <Box flex={1} position="relative">
              <Image alt="Scanned version" src={"/scannedVersion.png"} height={300} width={200}></Image>
              <CloseIcon boxSize="30px" color="red" className={styles.ImageIcon}/>
            </Box>
          </Flex>
          Please check your file version and upload again. Thank you.  
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}