import React, {useCallback, useState} from "react";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import styles from "../../pages/services/fingering/fingering.module.css";
import {FileDropZone} from "@/components/FileDropZone";
import {AttachmentIcon, CloseIcon} from "@chakra-ui/icons";
import {FileTypeInstruction} from "@/components/FileTypeInstruction";

export interface UploadZoneProps {
  onFileSubmit?: (file: File, watermark: boolean) => void;
  watermarkEnforced?: boolean
}

export const UploadZone = ({ onFileSubmit, watermarkEnforced }: UploadZoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState<boolean>(false);
  const onSubmit = useCallback(
    () => onFileSubmit && onFileSubmit(file!, watermarkEnforced || watermark),
    [onFileSubmit, file, watermarkEnforced, watermark]
  )
  return (
    <VStack width="100%" className={styles.cardBg} p="40px" spacing="20px">
      <FileDropZone onDrop={files => setFile(files[0])} />
      {file && (
        <Flex className={styles.fileInfo} alignItems="center">
          <AttachmentIcon color="white" boxSize="30px" mr="14px"/>
          <Text color="white">
            {file.name} <br/>
            {file.size} bytes <br/>
          </Text>
          <Spacer/>
          <CloseButton color="white" onClick={() => setFile(null)}/>
        </Flex>
      )}
      <VStack>
        <Button
          color="white"
          bg="#60D1FA"
          disabled={!file}
          onClick={onSubmit}
        >
          Upload & Process
        </Button>
      </VStack>
      <Text fontSize="16px" color="white">
        {watermarkEnforced ?
          <>
            Watermark cannot be turned off for free trial users.
          </> :
          <>
            Watermark <Switch checked={watermark} onChange={event => setWatermark(event.target.checked)} size='lg' />
          </>
        }
      </Text>
      <FileTypeInstruction/>
    </VStack>
  )
}

export interface UploadHistoryZoneProps {
  filenames: string[]
  onDeleteFilename: (filename: string) => void
  onClickFilename: (filename: string) => void
}

export const UploadHistoryZone = ({filenames, onDeleteFilename, onClickFilename}: UploadHistoryZoneProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack className={styles.cardBg} width="100%" p="40px" spacing="20px" align={'left'}>
      <Text color="white"><b>Files being processed</b></Text>
      <HStack width="100%">
        {filenames.map(filename => (
          <ButtonGroup key={filename} isAttached>
            <Button
              onClick={() => onClickFilename(filename)}
            >
              {filename}
            </Button>
            <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            >
              <PopoverTrigger>
                <IconButton
                  aria-label='Delete'
                  icon={<CloseIcon/>}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Delete processing file</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  Are you sure you want to delete this file record? You have no way to track this file again.
                </PopoverBody>
                <PopoverFooter>
                  <HStack spacing="10px" justify="right">
                    <Button size="sm" onClick={onClose}>Cancel</Button>
                    <Button
                      size="sm"
                      colorScheme='red'
                      onClick={() => {
                        onClose()
                        onDeleteFilename(filename)
                      }}
                    >
                      Delete
                    </Button>
                  </HStack>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        ))}
      </HStack>
    </VStack>
  )
}