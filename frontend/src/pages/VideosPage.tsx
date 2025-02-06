import type React from "react"
import { useState, useEffect } from "react"
import VideoList from "../components/Videos/VideoList"
import VideoUpload from "../components/Videos/VideoUpload"
import VideoPlayer from "../components/Videos/VideoPlayer"
import { getVideos, uploadVideo, deleteVideo } from "../services/videos"

interface Video {
  id: number
  title: string
  file_path: string
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos()
      setVideos(fetchedVideos as Video[])
    } catch (error) {
      console.error("Failed to fetch videos:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleUploadVideo = async (file: File, title: string) => {
    try {
      await uploadVideo(file, title)
      fetchVideos()
    } catch (error) {
      console.error("Failed to upload video:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleDeleteVideo = async (videoId: number) => {
    try {
      await deleteVideo(videoId)
      fetchVideos()
      setSelectedVideo(null)
    } catch (error) {
      console.error("Failed to delete video:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <VideoUpload onUpload={handleUploadVideo} />
      <div className="flex mt-8">
        <div className="w-1/3 pr-4">
          <VideoList videos={videos} onSelectVideo={setSelectedVideo} onDeleteVideo={handleDeleteVideo} />
        </div>
        <div className="w-2/3">{selectedVideo && <VideoPlayer video={selectedVideo} />}</div>
      </div>
    </div>
  )
}

export default VideosPage

