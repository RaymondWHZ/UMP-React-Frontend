import request, {API_END_POINT} from "@/utils/request";

export async function fingerUpload(file: File, email: string, handSize: number, watermark: string, abortController?: AbortController): Promise<string> {
  const newFileName = file.name.replaceAll(' ', '-')
  const formData = new FormData()
  file = new File([file], newFileName, {type: "application/octet-stream"})
  formData.append('file', file, newFileName)
  const jsonBlob = new Blob([JSON.stringify({
    email,
    handsize: handSize,
    watermark
  })], { type: "application/json" })
  formData.append("json", jsonBlob, 'some-json')
  await request.post('/finger_upload', formData, {
    signal: abortController?.signal
  })
  return newFileName
}

export async function fingerProgress(filename: string, email: string) {
  const postData = {
    filename,
    email
  }
  return (await request.post('/finger_progress', postData)).data
}

export function getFingerDownloadUrl(filename: string, email: string) {
  return API_END_POINT + "/finger_receive?filename=" + filename + "&email=" + email
}
