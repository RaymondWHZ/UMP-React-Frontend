import {ButtonSelect, ButtonSelectItem} from "@/components/ButtonSelect";
import {
  Box,
  Button,
  CircularProgress,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent, ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverHeader,
  PopoverTrigger,
  Switch,
  Text, useToast,
  VStack
} from "@chakra-ui/react";
import {CheckCircleIcon, QuestionOutlineIcon} from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import {useCallback, useEffect, useState} from "react";
import styles from "./fingering.module.css";
import {dispatch, sleep} from "@/utils/utils";
import {SiteLinkButton} from "@/components/SiteLink";
import {fingerProgress, fingerUpload, getFingerDownloadUrl, useUserInfo} from "../../../services/services";

const handSizeOptions: ButtonSelectItem[] = [
  {
    text: 'Children Size',
    value: 0,
  },
  {
    text: 'Average Size',
    value: 1,
  },
  {
    text: 'Very Big Size',
    value: 2,
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
  filename: string;
}

const FileProcessModal = ({
  isOpen,
  onClose,
  progress,
  downloadUrl,
  filename,
}: FileProcessModalProps) => {
  return (
    <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{filename}</ModalHeader>
        <ModalBody pt="60px" pb="40px">
          <VStack align="center" spacing="50px">
            {downloadUrl ? (
              <>
                <CheckCircleIcon boxSize="60px" color="green" />
                <Heading size="md">
                  Processing finished!
                </Heading>
                <HStack mt="20px">
                  <SiteLinkButton href={downloadUrl} colorScheme="green" onClick={onClose}>Download file</SiteLinkButton>
                </HStack>
              </>
            ) : (
              <>
                <CircularProgress size="60px" value={progress == -1 ? 0 : progress} isIndeterminate={progress == -1}/>
                <Heading size="md">
                  Please hold on a second. <br/>
                  We are still processing...
                </Heading>
                <Button colorScheme="red" mt="20px" onClick={onClose}>Cancel task</Button>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const FINGERING_PROCESSING_FILE_KEY = 'fingering-processing-file'

const saveProcessingFileName = (filename: string) => {
  localStorage.setItem(FINGERING_PROCESSING_FILE_KEY, filename)
}

const getProcessingFileName = (): string | null => {
  return localStorage.getItem(FINGERING_PROCESSING_FILE_KEY)
}

const removeProcessingFileName = () => {
  localStorage.removeItem(FINGERING_PROCESSING_FILE_KEY)
}

export default function Fingering() {
  const { data: userInfo } = useUserInfo()

  const toast = useToast()

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
    removeProcessingFileName()
  }

  // this effect uploads the file to the server if there is a file to upload, and then it sets up filename to monitor
  useEffect(() => {
    let active = true
    dispatch(async () => {
      if (fileToUpload && userInfo) {
        try {
          const newFileName = await fingerUpload(
            fileToUpload,
            userInfo!.email,
            handSize.value,
            watermark ? 'yes' : 'no'
          )
          if (!active) return
          saveProcessingFileName(newFileName)
          setFilenameToMonitor(newFileName)
          setFileToUpload(null)
        } catch (e) {
          toast({
            title: 'Failed to upload file.',
            description: "Please try again.",
            status: 'error'
          })
          setFileToUpload(null)
          throw e
        }
      }
    })
    return () => {
      active = false
    }
  }, [fileToUpload, watermark, handSize, setFilenameToMonitor, userInfo, toast])

  // this effect monitors the progress of the process of a file if there is a filename to monitor
  useEffect(() => {
    let active = true
    dispatch(async () => {
      if (filenameToMonitor && userInfo) {
        setDownloadUrl(null)
        setProgress(-1)
        while (true) {
          const progress = await fingerProgress(filenameToMonitor, userInfo.email)
          if (!active) return
          setProgress(progress * 100)
          if (progress == 1) {
            break
          }
          await sleep(5000)
          if (!active) return
        }
        const downloadUrl = getFingerDownloadUrl(filenameToMonitor, userInfo.email)
        setDownloadUrl(downloadUrl)
      }
    })
    return () => {
      active = false
    }
  }, [filenameToMonitor, setDownloadUrl, setProgress, userInfo])

  // this effect retrieves the previous uploaded file (mainly to cope with page refreshes)
  useEffect(() => {
    const filename = getProcessingFileName()
    if (filename) {
      setFilenameToMonitor(filename)
    }
  }, [setFilenameToMonitor])

  const onFileSubmit = useCallback(async (file: File, watermark: boolean) => {
    setWatermark(watermark)
    setFileToUpload(file)
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
        filename={filenameToMonitor ?? fileToUpload?.name ?? ''}
      />
    </VStack>
  )
}