from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Transport Scoreboard"
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # Email settings
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    FRONTEND_URL: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # ✅ Allow extra fields (Fixes the issue)

# Create an instance of Settings
settings = Settings()
