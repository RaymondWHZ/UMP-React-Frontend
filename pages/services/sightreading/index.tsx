import {ButtonSelect, ButtonSelectItem} from "@/components/ButtonSelect";
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent, PopoverFooter, PopoverHeader,
  PopoverTrigger, Spacer,
  Switch,
  Text, useDisclosure, useToast,
  VStack
} from "@chakra-ui/react";
import {AttachmentIcon, CloseIcon} from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import {useCallback, useEffect, useState} from "react";
import styles from "./signtreading.module.css";
import {arrayWithoutItem, dispatch, sleep} from "@/utils/utils";
import {useUserInfo} from "@/services/user";
import {getMarkDownloadUrl, markProgress, markUpload} from "@/services/mark";
import {CanceledError} from "axios";
import { FileProcessModal } from "@/components/FileProcessModal";

const clefTypeOptions: ButtonSelectItem[] = [
  {
    text: 'Single',
    value: 0,
  },
  {
    text: 'Double',
    value: 1,
  }
]

interface ClefTypeProps {
  onChange: (item: ButtonSelectItem) => void;
  disabled?: boolean;
}

function HandSizeSelect({ onChange, disabled }: ClefTypeProps) {
  return (
    <VStack w="100%" maxW="1200px" align="left" pl="50px">
      <Text fontSize="35px" pt={4} color={'#FBA140'}>
        Choose the Clef Type of the sheet
      </Text>
      <HStack spacing="24px">
        <ButtonSelect
          items={clefTypeOptions}
          onChange={item => onChange(item)}
          disabled={disabled}
        />
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
  )
}

interface UploadZoneProps {
  onFileSubmit?: (file: File, watermark: boolean) => void;
}

const UploadZone = ({ onFileSubmit }: UploadZoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState<boolean>(false);
  return (
    <Box width="100%" maxW="1200px" pl="40px" pr="40px">
      <VStack className={styles.cardBg} p="40px" spacing="20px">
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

interface UploadHistoryZoneProps {
  filenames: string[]
  onDeleteFilename: (filename: string) => void
  onClickFilename: (filename: string) => void
}

const UploadHistoryZone = ({filenames, onDeleteFilename, onClickFilename}: UploadHistoryZoneProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box width="100%" maxW="1200px" pl="40px" pr="40px">
      <VStack className={styles.cardBg} p="40px" spacing="20px" align={'left'}>
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
    </Box>
  )
}

const SIGHTREADING_PROCESSING_FILE_KEY = 'sightreading-processing-file'

const saveProcessingFileName = (filename: string) => {
  localStorage.setItem(SIGHTREADING_PROCESSING_FILE_KEY, filename)
}

const getProcessingFileName = (): string | null => {
  return localStorage.getItem(SIGHTREADING_PROCESSING_FILE_KEY)
}

const removeProcessingFileName = () => {
  localStorage.removeItem(SIGHTREADING_PROCESSING_FILE_KEY)
}

const SIGHT_READING_UPLOADED_FILES_KEY = 'sightreading-uploaded-files'

const getUploadedFiles = (): string[] => {
  const uploadedFiles = localStorage.getItem(SIGHT_READING_UPLOADED_FILES_KEY)
  return uploadedFiles ? JSON.parse(uploadedFiles) : []
}

const saveUploadedFiles = (filenames: string[]) => {
  localStorage.setItem(SIGHT_READING_UPLOADED_FILES_KEY, JSON.stringify(filenames))
}

export default function Sightreading() {
  const { data: userInfo } = useUserInfo()

  const toast = useToast()

  const [clefType, setClefType] = useState<ButtonSelectItem>(clefTypeOptions[0])
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [watermark, setWatermark] = useState<boolean>(false)
  const [filenameToMonitor, setFilenameToMonitor] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(-1)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [uploadedFilenames, setUploadedFilenames] = useState<string[]>([])

  const isOpen = Boolean(fileToUpload || filenameToMonitor)

  const onClose = useCallback(() => {
    setFileToUpload(null)
    setFilenameToMonitor(null)
    setProgress(-1)
    setDownloadUrl(null)
    removeProcessingFileName()
  }, [setFileToUpload, setFilenameToMonitor, setProgress, setDownloadUrl])

  const onFileSubmit = useCallback(async (file: File, watermark: boolean) => {
    setProgress(-2)
    setWatermark(watermark)
    setFileToUpload(file)
  }, [setFileToUpload])

  const onUploadedFilesChange = useCallback((filenames: string[]) => {
    setUploadedFilenames(filenames)
    saveUploadedFiles(filenames)
  }, [setUploadedFilenames])

  const onDeleteUploadedFilename = useCallback((filename: string) => {
    onUploadedFilesChange(arrayWithoutItem(uploadedFilenames, filename))
  }, [onUploadedFilesChange, uploadedFilenames])

  // this effect uploads the file to the server if there is a file to upload, and then it sets up filename to monitor
  useEffect(() => {
    let active = true
    const abortController = new AbortController()
    dispatch(async () => {
      if (fileToUpload && userInfo) {
        try {
          const newFileName = await markUpload(
            fileToUpload,
            userInfo!.email,
            clefType.value,
            watermark ? 'yes' : 'no',
            abortController
          )
          if (!active) return
          saveProcessingFileName(newFileName)
          setFilenameToMonitor(newFileName)
          if (!uploadedFilenames.includes(newFileName)) {
            onUploadedFilesChange([...uploadedFilenames, newFileName])
          }
          setFileToUpload(null)
        } catch (e) {
          if (e instanceof CanceledError) {
            return
          }
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
      abortController.abort()
    }
  }, [
    fileToUpload,
    userInfo,
    watermark,
    clefType,
    setFilenameToMonitor,
    toast,
    onUploadedFilesChange,
    uploadedFilenames
  ])

  // this effect monitors the progress of the process of a file if there is a filename to monitor
  useEffect(() => {
    let active = true
    dispatch(async () => {
      if (filenameToMonitor && userInfo) {
        setDownloadUrl(null)
        setProgress(-1)
        while (true) {
          const progress = await markProgress(filenameToMonitor, userInfo.email)
          if (!active) return
          setProgress(progress * 100)
          if (progress == 1) {
            break
          }
          await sleep(5000)
          if (!active) return
        }
        const downloadUrl = getMarkDownloadUrl(filenameToMonitor, userInfo.email)
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
    setUploadedFilenames(getUploadedFiles())
  }, [setFilenameToMonitor, setUploadedFilenames])

  return (
    <VStack bg="#13253F" minH="800px" spacing="20px" pt="30px" pb="50px">
      <HandSizeSelect onChange={setClefType} />
      <UploadZone onFileSubmit={onFileSubmit} />
      {uploadedFilenames.length > 0 &&
        <UploadHistoryZone
          filenames={uploadedFilenames}
          onDeleteFilename={onDeleteUploadedFilename}
          onClickFilename={filename => {
            setFilenameToMonitor(filename)
            saveProcessingFileName(filename)
          }}
        />
      }
      <FileProcessModal
        isOpen={isOpen}
        onClose={onClose}
        onDownload={() => {
          onClose()
          onDeleteUploadedFilename(filenameToMonitor!)
        }}
        progress={progress}
        downloadUrl={downloadUrl}
        filename={filenameToMonitor ?? fileToUpload?.name ?? ''}
      />
    </VStack>
  )
}