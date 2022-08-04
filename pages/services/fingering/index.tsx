import {ButtonSelect, ButtonSelectItem} from "@/components/ButtonSelect";
import {
  Box,
  Button,
  CircularProgress,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverHeader,
  PopoverTrigger,
  Switch,
  Text,
  VStack
} from "@chakra-ui/react";
import {CheckCircleIcon, QuestionOutlineIcon} from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import {useCallback, useEffect, useState} from "react";
import styles from "./fingering.module.css";
import {dispatch, sleep} from "@/utils/utils";
import {SiteLinkButton} from "@/components/SiteLink";

const handSizeOptions: ButtonSelectItem[] = [
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

interface HandSizeSelectProps {
  onChange: (item: ButtonSelectItem) => void;
  disabled?: boolean;
}

function HandSizeSelect({ onChange, disabled }: HandSizeSelectProps) {
  return (
    <VStack w="100%" align="left" pl="50px" pt="30px">
      <Text fontSize="35px" pt={4} color={'#FBA140'}>
        Choose Your Hand Size
      </Text>
      <HStack spacing="24px">
        <ButtonSelect
          items={handSizeOptions}
          onChange={item => onChange(item)}
          disabled={disabled}
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

interface FileDropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onDrop }: FileDropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  })

  return (
    <Box width="100%" pl="60px" pr="60px">
      <VStack
        className={styles.fileDropZone}
        justify="center"
        align="center"
        textAlign="center"
        p="30px"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text fontSize="30px" color="white">Drop here...</Text>
        ) : (
          <>
            <Text fontSize="30px" color="white">Drag Your File Here or Browse</Text>
          </>
        )}
      </VStack>
    </Box>
  )
}

interface UploadZoneProps {
  onFileSubmit?: (file: File, watermark: boolean) => void;
}

const UploadZone = ({ onFileSubmit }: UploadZoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState<boolean>(false);
  return (
    <Box width="100%" pl="40px" pr="40px" pb="40px" pt="20px">
      <VStack className={styles.cardBg} p="40px" spacing="20px">
        <FileDropZone onDrop={files => setFile(files[0])} />
        {file && (
          <HStack className={styles.fileInfo} spacing="30px">
            <Text color="white">
              {file.name} <br/>
              {file.size} bytes <br/>
            </Text>
          </HStack>
        )}
        <VStack>
          <Button
            color="white"
            bg="#60D1FA"
            disabled={!file}
            onClick={() => onFileSubmit && onFileSubmit(file!, watermark)}
          >
            Upload & Process
          </Button>
        </VStack>
        <Text fontSize="16px" color="white">
          Watermark <Switch onChange={event => setWatermark(event.target.checked)} size='lg' />
        </Text>
      </VStack>
    </Box>
  )
}

interface FileProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  downloadUrl: string | null;
}

const FileProcessModal = ({
  isOpen,
  onClose,
  progress,
  downloadUrl
}: FileProcessModalProps) => {
  return (
    <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt="60px" pb="40px">
          <VStack align="center" spacing="50px">
            {downloadUrl ? (
              <>
                <CheckCircleIcon boxSize="60px" color="green" />
                <Heading size="md">
                  Processing finished!
                </Heading>
                <HStack mt="20px">
                  <Button onClick={onClose}>Exit</Button>
                  <SiteLinkButton href={downloadUrl} colorScheme="green">Download</SiteLinkButton>
                </HStack>
              </>
            ) : (
              <>
                <CircularProgress size="60px" value={progress == -1 ? 0 : progress} isIndeterminate={progress == -1}/>
                <Heading size="md">
                  Please hold on a second. <br/>
                  We are still processing...
                </Heading>
                <Button colorScheme="red" mt="20px" onClick={onClose}>Cancel Task</Button>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const FINGERING_PROCESSING_FILE_KEY = 'fingering-processing-file'

const saveProcessingFileInfo = (file: File) => {
  const fileInfo = {
    name: file.name,
    size: file.size,
  }
  localStorage.setItem(FINGERING_PROCESSING_FILE_KEY, JSON.stringify(fileInfo))
}

const getProcessingFileInfo = () => {
  const file = localStorage.getItem(FINGERING_PROCESSING_FILE_KEY)
  if (file) {
    return JSON.parse(file)
  }
  return null
}

const removeProcessingFileInfo = () => {
  localStorage.removeItem(FINGERING_PROCESSING_FILE_KEY)
}

export default function Fingering() {
  const [handSize, setHandSize] = useState<ButtonSelectItem>(handSizeOptions[0])
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [watermark, setWatermark] = useState<boolean>(false)
  const [filenameToMonitor, setFilenameToMonitor] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(-1)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const isOpen = Boolean(fileToUpload || filenameToMonitor)

  const onClose = () => {
    setFileToUpload(null)
    setFilenameToMonitor(null)
    setProgress(-1)
    setDownloadUrl(null)
    removeProcessingFileInfo()
  }

  // this effect uploads the file to the server if there is a file to upload, and then it sets up filename to monitor
  useEffect(() => {
    let active = true
    dispatch(async () => {
      if (fileToUpload) {
        await sleep(2000)  // replace with a real uploader
        if (!active) return
        saveProcessingFileInfo(fileToUpload)
        setFilenameToMonitor(fileToUpload.name)
        setFileToUpload(null)
      }
    })
    return () => {
      active = false
    }
  }, [fileToUpload, watermark, handSize, setFilenameToMonitor])

  // this effect monitors the progress of the process of a file if there is a filename to monitor
  useEffect(() => {
    let active = true
    dispatch(async () => {
      if (filenameToMonitor) {
        setDownloadUrl(null)
        setProgress(-1)
        await sleep(500)  // replace with a real progress monitor
        if (!active) return
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i)
          await sleep(500)  // replace with a real progress monitor
          if (!active) return
        }
        await sleep(500)  // replace with a url getter
        setDownloadUrl("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")
      }
    })
    return () => {
      active = false
    }
  }, [filenameToMonitor, setDownloadUrl, setProgress])

  // this effect retrieves the previous uploaded file (mainly to cope with page refreshes)
  useEffect(() => {
    const info = getProcessingFileInfo()
    if (info) {
      setFilenameToMonitor(info.name)
    }
  }, [setFilenameToMonitor])

  const onFileSubmit = useCallback(async (file: File, watermark: boolean) => {
    setFileToUpload(file)
    setWatermark(watermark)
  }, [setFileToUpload])

  return (
    <VStack bg="#13253F">
      <HandSizeSelect onChange={setHandSize} />
      <UploadZone onFileSubmit={onFileSubmit} />
      <FileProcessModal
        isOpen={isOpen}
        onClose={onClose}
        progress={progress}
        downloadUrl={downloadUrl}
      />
    </VStack>
  )
}