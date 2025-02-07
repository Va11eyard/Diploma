from pydantic import BaseModel

class VideoBase(BaseModel):
    title: str

class VideoCreate(VideoBase):
    pass

class VideoUpdate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    file_path: str

    class Config:
        from_attributes = True  # Updated for Pydantic V2
