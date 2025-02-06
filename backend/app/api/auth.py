from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import create_access_token, get_password_hash, verify_password
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, ResetPassword, User
from app.core.email import send_reset_password_email
import secrets

router = APIRouter()

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully"}

@router.post("/reset-password-request")
async def reset_password_request(email: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.commit()
    background_tasks.add_task(send_reset_password_email, email, reset_token)
    return {"message": "Password reset email sent"}

@router.post("/reset-password")
def reset_password(reset_data: ResetPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reset_token == reset_data.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    user.hashed_password = get_password_hash(reset_data.new_password)
    user.reset_token = None
    db.commit()
    return {"message": "Password reset successfully"}

