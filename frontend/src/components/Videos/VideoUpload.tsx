import type React from "react"
import { useState } from "react"

interface VideoUploadProps {
  onUpload: (file: File, title: string) => Promise<void>
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file && title) {
      await onUpload(file, title)
      setFile(null)
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
          Choose video file
        </label>
        <input
          type="file"
          id="video"
          accept="video/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mt-1 block w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload Video
      </button>
    </form>
  )
}

export default VideoUpload

