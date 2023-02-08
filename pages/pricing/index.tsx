import { NextPage } from "next";

import {
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  UnorderedList,
  ListItem, Center, Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, Button,
} from '@chakra-ui/react';
import Image from 'next/image'
import styles from "../pricing/pricing.module.css"
import {useCallback, useState} from 'react'
import {useCountdown} from "@/utils/hooks";

import React from "react";
import {FUNDING, PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData} from "@paypal/paypal-js";
import request from "@/utils/request";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";

interface PaymentButtonProps {
  postFix: string
  onComplete?: (success: boolean) => void
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ postFix, onComplete }) => {

  const createOrder = useCallback(async (data: CreateOrderData, actions: CreateOrderActions) => {
    const res = await request.post("/purchase" + postFix)
    const { token } = res.data
    return token
  }, [postFix]);

  const onApprove = useCallback(async (data: OnApproveData, actions: OnApproveActions) => {
    const res = await request.post("/execute" + postFix, {
      paymentID: data.paymentID,
      payerID: data.payerID
    })
    const { success } = res.data
    onComplete && onComplete(success)
  }, [postFix, onComplete]);

  // render the button only after loading SDK to avoid hydration error
  const [{ isResolved }] = usePayPalScriptReducer()
  if (!isResolved) {
    return <></>
  }
  return (
    <PayPalButtons
      fundingSource={FUNDING.PAYPAL}
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
}

interface PriceInfo {
  oldPrice: string,
  newPrice: string,
  time: string,
  postFix: string
}

interface PriceCardProps extends PriceInfo {
  onComplete?: (success: boolean) => void
}

const PriceCard = ({oldPrice, newPrice, time, postFix, onComplete}: PriceCardProps) => {

  const [isExpand, setExpand] = useState(false)
  return (
    <VStack flex={1} width="200px" className={`${!isExpand ? styles.priceBg : styles.cardWrapper} ${styles.animation}`}  px={7} py={10}
      onMouseEnter = {() => setExpand(true)} onMouseLeave={() => setExpand(false)}
    >
      <Text color={isExpand ? "black" : "white"} fontSize={"xl"} className={styles.priceText}>{oldPrice}</Text>
      <Text fontWeight={"bold"} fontSize={"5xl"} color={"#60D1FA"}>{newPrice}</Text>
      <Text fontWeight={"bold"} fontSize={"2xl"} color={isExpand ? "#60D1FA" : "white"}>{time}</Text>
      <Box style={{display: isExpand ? undefined : "none"}}>
        <PaymentButton postFix={postFix} onComplete={onComplete}/>
      </Box>
    </VStack>
  )
}

const SuccessDialog: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <Modal isCentered closeOnOverlayClick={false} isOpen={show} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            Payment Successful!
          </Center>
        </ModalHeader>
        <ModalBody pt="60px" pb="40px">
          <VStack align="center" spacing="50px">
            <CheckCircleIcon boxSize="60px" color="green" />
            <Heading size="md" textAlign="center">
              You can now enjoy your subscription by reloading the window.
            </Heading>
            <HStack mt="20px">
              <Button onClick={() => location.reload()} colorScheme="green">
                Reload window
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const FailedDialog: React.FC<{ show: boolean, onClose: () => void }> = ({ show, onClose }) => {
  return (
    <Modal isCentered isOpen={show} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            Payment Failed!
          </Center>
        </ModalHeader>
        <ModalBody pt="60px" pb="40px">
          <VStack align="center" spacing="50px">
            <WarningIcon boxSize="60px" color="red" />
            <Heading size="md" textAlign="center">
              Please return to payment page to try again.
            </Heading>
            <HStack mt="20px">
              <Button onClick={onClose}>
                Try again
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const priceData: PriceInfo[] = [
  {newPrice: "$7.99", oldPrice: "$27.99", time: "One Month", postFix: "" },
  {newPrice: "$8.99", oldPrice: "$28.99", time: "One Year", postFix: "1"},
  {newPrice: "$9.99", oldPrice: "$29.99", time: "Forever", postFix: "2"}
]

const Pricing: NextPage = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
  return (
    <Center className={styles.PricingWrapper} bg={"#13253F"}>
      <SuccessDialog show={showSuccess}/>
      <FailedDialog show={showFailed} onClose={() => setShowFailed(false)}/>
      <HStack w="100%" maxW="1400px" pr="60px">
        <Box ml="-30px" mt="-70px" mr="-50px" maxW="600px">
          <Image alt="" src="/pricingImage.png" height={1000} width={1000} />
        </Box>
        <VStack align={"left"} justify={"center"} spacing="30px" w="700px">
          <Heading textColor={"white"} fontSize={"42px"} fontWeight={"bold"} fontFamily={"Inika"}>Enjoy Your Full Service by Today!</Heading>
          <UnorderedList spacing={2} fontSize={"17px"} color={"white"} style={{"marginLeft": "22px"}}>
            <ListItem>generates best piano fingering automatically based on different hand sizes</ListItem>
            <ListItem>helps distinguish different notes by three colors</ListItem>
            <ListItem>remove watermark from music score</ListItem>
          </UnorderedList>
          <HStack spacing={10} py={5} h="300px">
            {
              priceData.map((obj, index) =>
                <PriceCard
                  {...obj}
                  key={index}
                  onComplete={success => {
                    if (success) {
                      setShowSuccess(true)
                    } else {
                      setShowFailed(true)
                    }
                  }}/>
              )
            }
          </HStack>
        </VStack>
      </HStack>
    </Center>
  )
}

export default Pricing
