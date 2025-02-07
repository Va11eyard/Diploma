from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, users, videos

app = FastAPI(title=settings.PROJECT_NAME)

# ✅ Ensure CORS middleware is added BEFORE including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],  # Ensure all methods are allowed, including OPTIONS
    allow_headers=["*"],  # Allow all headers
)

# ✅ Now include the routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(videos.router, prefix="/api/videos", tags=["videos"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
