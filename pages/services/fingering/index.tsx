import {ButtonSelect, ButtonSelectItem} from "@/components/ButtonSelect";
import {
  HStack,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverHeader,
  PopoverTrigger,
  Text,
  VStack
} from "@chakra-ui/react";
import {QuestionOutlineIcon} from "@chakra-ui/icons";

const fingeringOptions: ButtonSelectItem[] = [
  {
    text: 'Children Size',
    value: 'children',
  },
  {
    text: 'Average Size',
    value: 'average',
  },
  {
    text: 'Very Big Size',
    value: 'big',
  }
]

function HandSizeSelect({ onChange }: { onChange: (item: ButtonSelectItem) => void }) {
  return (
    <VStack w="100%" align="left" p={4}>
      <Text fontSize="35px" pt={4} color={'#FBA140'}>
        Choose Your Hand Size
      </Text>
      <HStack spacing="24px">
        <ButtonSelect
          items={fingeringOptions}
          onChange={item => onChange(item)}
        />
        <Popover trigger="hover">
          <PopoverTrigger>
            <QuestionOutlineIcon boxSize="24px" color="white"/>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Hand Size Explanation</PopoverHeader>
            <PopoverBody>
              <b>Children Size:</b> for children or people with small hands <br/>
              <b>Average Size:</b> for most major & non-major players <br/>
              <b>Really Big Size:</b> for people whose hands can stretch to ten white keys across
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </VStack>
  )
}

export default function Fingering() {
  return (
    <VStack  bg="#13253F">
      <HandSizeSelect onChange={() => {}} />
    </VStack>
  )
}