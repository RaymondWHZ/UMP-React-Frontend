import {ButtonSelect, ButtonSelectItem} from "@/components/ButtonSelect";
import {
  Center,
  Divider,
  HStack,
  Text, useToast,
  VStack
} from "@chakra-ui/react";
import {ArrowLeftIcon} from "@chakra-ui/icons";
import React, {useCallback, useEffect, useState} from "react";
import {arrayWithoutItem, dispatch, sleep} from "@/utils/utils";
import {useUserInfo} from "@/services/user";
import {getMarkDownloadUrl, markProgress, markUpload} from "@/services/mark";
import {CanceledError} from "axios";
import { FileProcessModal } from "@/components/FileProcessModal";
import {SiteLinkIconButton} from "@/components/SiteLink";
import {UploadHistoryZone, UploadZone} from "@/components/FileUpload";

const clefTypeOptions: ButtonSelectItem[] = [
  {
    text: 'Single Clef',
    value: 0,
  },
  {
    text: 'Double Clef',
    value: 1,
  }
]

interface ClefTypeProps {
  onChange: (item: ButtonSelectItem) => void;
  disabled?: boolean;
}

function HandSizeSelect({ onChange, disabled }: ClefTypeProps) {
  return (
    <VStack w="100%" align="left" spacing="20px">
      <Text fontSize="35px" fontFamily="Inika" pt={4} color="white">
        <SiteLinkIconButton
          href={"/services"}
          colorScheme='white'
          aria-label='Back to previous'
          icon={<ArrowLeftIcon />}
          ml="-11px"
          mb="6px"
          mr="5px"
        />
        Ultra Sight-Reading
      </Text>
      <Divider />
      <HStack spacing="24px">
        <Text fontSize="20px" fontWeight="bold" color={'#FBA140'}>
          Choose the clef type:
        </Text>
        <ButtonSelect
          items={clefTypeOptions}
          onChange={item => onChange(item)}
          disabled={disabled}
        />
      </HStack>
    </VStack>
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

  useEffect(() => {
    if (!userInfo) {
      location.replace('/')
    }
  }, [userInfo])

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
    <Center bg="#13253F">
      <VStack w="100%" maxW="1100px" minH="800px" spacing="20px" pt="30px" pb="50px">
        <HandSizeSelect onChange={setClefType} />
        <UploadZone onFileSubmit={onFileSubmit} watermarkEnforced={userInfo.freeTrial}/>
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
    </Center>
  )
}