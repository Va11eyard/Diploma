from pydantic import BaseModel
from datetime import datetime

class VideoBase(BaseModel):
    title: str

class VideoCreate(VideoBase):
    pass

class VideoUpdate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    file_path: str
    uploaded_by: int
    created_at: datetime
    updated_at: datetime | None

    class Config:
        orm_mode = True

