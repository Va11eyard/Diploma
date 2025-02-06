import type React from "react"

interface Video {
  id: number
  title: string
  file_path: string
}

interface VideoListProps {
  videos: Video[]
  onSelectVideo: (video: Video) => void
  onDeleteVideo: (videoId: number) => void
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, onDeleteVideo }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {videos.map((video) => (
          <li key={video.id}>
            <div className="px-4 py-4 flex items-center justify-between sm:px-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-indigo-600 truncate">
                  <a href="#" onClick={() => onSelectVideo(video)} className="hover:underline">
                    {video.title}
                  </a>
                </h3>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button onClick={() => onDeleteVideo(video.id)} className="font-medium text-red-600 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideoList

