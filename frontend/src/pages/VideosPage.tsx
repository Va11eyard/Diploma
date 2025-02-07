import React, { useState, useEffect, useCallback } from "react";
import VideoList from "../components/Videos/VideoList";
import VideoUpload from "../components/Videos/VideoUpload";
import VideoPlayer from "../components/Videos/VideoPlayer";
import { getVideos, uploadVideo, deleteVideo } from "../services/videos";

interface Video {
  id: number;
  title: string;
  file_path: string;
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos as Video[]);
    } catch (error) {
      setErrorMessage("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleUploadVideo = async (file: File, title: string) => {
    setLoading(true);
    try {
      await uploadVideo(file, title);
      fetchVideos();
    } catch {
      setErrorMessage("Video upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    setLoading(true);
    try {
      await deleteVideo(videoId);
      fetchVideos();
      setSelectedVideo(null);
    } catch {
      setErrorMessage("Video deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {errorMessage && <div className="bg-red-500 text-white p-2">{errorMessage}</div>}
      <VideoUpload onUpload={handleUploadVideo} />
      <div className="flex mt-8">
        <div className="w-1/3 pr-4">
          <VideoList videos={videos} onSelectVideo={setSelectedVideo} onDeleteVideo={handleDeleteVideo} />
        </div>
        <div className="w-2/3">{selectedVideo && <VideoPlayer video={selectedVideo} />}</div>
      </div>
    </div>
  );
};

export default VideosPage;
