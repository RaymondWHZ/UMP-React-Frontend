import {
  Button, CircularProgress,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
                <CircularProgress size="60px" value={progress < 0 ? 0 : progress} isIndeterminate={progress < 0}/>
                <Heading size="md">
                  Please hold on a second. <br/>
                  We are still processing...
                </Heading>
                {progress == -2 ? (
                  <Button colorScheme="red" mt="20px" onClick={onClose}>
                    Cancel
                  </Button>
                ) : (
                  <Button mt="20px" onClick={onClose}>
                    Close window
                  </Button>
                )}
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
