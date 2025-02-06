from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
from app.core.database import get_db
from app.models.video import Video
from app.schemas.video import Video as VideoSchema, VideoCreate, VideoUpdate

router = APIRouter()

UPLOAD_DIRECTORY = "uploads/"

@router.get("/", response_model=List[VideoSchema])
def read_videos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    videos = db.query(Video).offset(skip).limit(limit).all()
    return videos

@router.post("/", response_model=VideoSchema)
async def create_video(title: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    db_video = Video(title=title, file_path=file_path)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

@router.get("/{video_id}", response_model=VideoSchema)
def read_video(video_id: int, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if db_video is None:
        raise HTTPException(status_code=404, detail="Video not found")
    return db_video

@router.put("/{video_id}", response_model=VideoSchema)
def update_video(video_id: int, video: VideoUpdate, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if db_video is None:
        raise HTTPException(status_code=404, detail="Video not found")
    for key, value in video.dict(exclude_unset=True).items():
        setattr(db_video, key, value)
    db.commit()
    db.refresh(db_video)
    return db_video

@router.delete("/{video_id}", response_model=VideoSchema)
def delete_video(video_id: int, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if db_video is None:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Delete the file from the filesystem
    if os.path.exists(db_video.file_path):
        os.remove(db_video.file_path)
    
    db.delete(db_video)
    db.commit()
    return db_video

