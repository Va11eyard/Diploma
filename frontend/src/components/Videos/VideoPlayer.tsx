import type React from "react"

interface Video {
  id: number
  title: string
  file_path: string
}

interface VideoPlayerProps {
  video: Video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
      <video controls className="w-full">
        <source src={video.file_path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer

