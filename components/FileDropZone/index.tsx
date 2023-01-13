import {useDropzone} from "react-dropzone";
import {Text, VStack} from "@chakra-ui/react";
import styles from "../../pages/services/fingering/fingering.module.css";
import React from "react";

interface FileDropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    validator: (file) => {
      // test if file name only contains letters, numbers, dots, underscores, and dashes
      const fileNameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!fileNameRegex.test(file.name)) {
        return {
          code: 'file-name',
          message: 'File name can only contain letters, numbers, dots, underscores, and dashes.',
        };
      }
      return null
    },
    onDropRejected: (rejectedFiles) => {
      const { errors } = rejectedFiles[0];  // only one file can be dropped at a time
      errors.forEach((error) => {
        alert(error.message);
      })
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
          <Text fontSize="20px" color="white">Please Only Upload Digital Printed Music Score</Text>
        </>
      )}
    </VStack>
  )
}
