import {
  Button, Center, CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay, Text,
  VStack
} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {SiteLinkButton} from "@/components/SiteLink";

interface FileProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  progress: number;
  downloadUrl: string | null;
  filename: string;
}

export function FileProcessModal({
  isOpen,
  onClose,
  onDownload,
  progress,
  downloadUrl,
  filename,
}: FileProcessModalProps) {
  return (
    <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            {filename}
          </Center>
        </ModalHeader>
        <ModalBody pt="60px" pb="40px">
          <VStack align="center" spacing="50px">
            {downloadUrl ? (
              <>
                <CheckCircleIcon boxSize="60px" color="green" />
                <Heading size="md">
                  Processing finished!
                </Heading>
                <HStack mt="20px">
                  <Button onClick={onClose}>
                    Close window
                  </Button>
                  <SiteLinkButton href={downloadUrl} colorScheme="green" onClick={onDownload}>
                    Download file
                  </SiteLinkButton>
                </HStack>
              </>
            ) : (
              <>
                <CircularProgress size="70px" isIndeterminate>
                  <CircularProgressLabel>{progress >= 0 && `${Math.round(progress)}%`}</CircularProgressLabel>
                </CircularProgress>
                {progress == -2 ? (
                  <>
                    <Heading size="md" textAlign="center">
                      Uploading file...
                    </Heading>
                    <Button colorScheme="red" mt="20px" onClick={onClose}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Text fontSize="17px" textAlign="center">
                      <Heading size="md" mb="10px">
                        We are processing your file...
                      </Heading>
                      It takes about 30 seconds to process <br/>
                      each page. You may leave this view <br/>
                      and come back later.
                    </Text>
                    <Button mt="20px" onClick={onClose}>
                      Close window
                    </Button>
                  </>
                )}
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
