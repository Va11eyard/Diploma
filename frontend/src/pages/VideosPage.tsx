import type React from "react"
import { useState, useEffect, useCallback } from "react"
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
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Fetch videos from API
  const fetchVideos = useCallback(async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const fetchedVideos = await getVideos()
      setVideos(fetchedVideos as Video[])
    } catch (error) {
      console.error("Failed to fetch videos:", error)
      setErrorMessage("Failed to load videos. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  // Handle video upload
  const handleUploadVideo = async (file: File, title: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      await uploadVideo(file, title)
      fetchVideos()
    } catch (error) {
      console.error("Failed to upload video:", error)
      setErrorMessage("Video upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle video deletion
  const handleDeleteVideo = async (videoId: number) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      await deleteVideo(videoId)
      fetchVideos()
      setSelectedVideo(null)
    } catch (error) {
      console.error("Failed to delete video:", error)
      setErrorMessage("Video deletion failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      
      {/* Show Error Message */}
      {errorMessage && <div className="bg-red-500 text-white p-2 mb-4">{errorMessage}</div>}

      <VideoUpload onUpload={handleUploadVideo} />

      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="flex mt-8">
        <div className="w-1/3 pr-4">
          {videos.length > 0 ? (
            <VideoList videos={videos} onSelectVideo={setSelectedVideo} onDeleteVideo={handleDeleteVideo} />
          ) : (
            <p className="text-gray-500">No videos available. Upload a video to get started!</p>
          )}
        </div>
        <div className="w-2/3">{selectedVideo && <VideoPlayer video={selectedVideo} />}</div>
      </div>
    </div>
  )
}

export default VideosPage
