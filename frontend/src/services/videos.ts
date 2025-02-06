import api from "./api"

export const getVideos = async () => {
  const response = await api.get("/videos")
  return response.data
}

export const uploadVideo = async (file: File, title: string) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("title", title)
  const response = await api.post("/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const deleteVideo = async (videoId: number) => {
  const response = await api.delete(`/videos/${videoId}`)
  return response.data
}

