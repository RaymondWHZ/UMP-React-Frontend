import request, {API_END_POINT} from "@/utils/request";

export async function markUpload(file: File, email: string, type: number, watermark: string, abortController?: AbortController): Promise<string> {
  const newFileName = file.name.replaceAll(' ', '-')
  const formData = new FormData()
  file = new File([file], newFileName, {type: "application/octet-stream"})
  formData.append('file', file, newFileName)
  const jsonBlob = new Blob([JSON.stringify({
    email,
    watermark
  })], { type: "application/json" })
  formData.append("json", jsonBlob, 'some-json')
  await request.post(type == 0 ? '/single_upload' : '/double_upload', formData, {
    signal: abortController?.signal
  })
  return newFileName
}

export async function markProgress(filename: string, email: string) {
  const postData = {
    filename,
    email
  }
  return (await request.post('/mark_progress', postData)).data
}

export function getMarkDownloadUrl(filename: string, email: string) {
  return API_END_POINT + "/mark_receive?filename=" + filename + "&email=" + email
}
