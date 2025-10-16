from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import io
import base64
from dotenv import load_dotenv

# Load env before anything else
load_dotenv()

# Lazy imports (to avoid loading heavy models at startup)
pipe = None

app = FastAPI(
    title="AI Art Generator",
    description="Real AI image generation using Hugging Face (CPU mode)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str

def get_pipeline():
    global pipe
    if pipe is not None:
        return pipe

    from diffusers import StableDiffusionPipeline
    import torch

    model_id = "nota-ai/bk-sdm-small"  # Lightweight (~2.1GB), works on CPU
    # Alternatively: "stabilityai/stable-diffusion-2-1-base" (larger, slower)

    print("Loading model... This may take a few minutes on CPU.")
    try:
        pipe = StableDiffusionPipeline.from_pretrained(
            model_id,
            use_auth_token=os.getenv("HF_TOKEN"),
            torch_dtype=torch.float32,  # CPU uses float32
            safety_checker=None,        # Disable for speed (optional)
            requires_safety_checker=False
        )
        pipe = pipe.to("cpu")
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Failed to load model: {e}")
        raise
    return pipe

@app.post("/generate")
async def generate(request: GenerateRequest):
    global pipe
    try:
        if not os.getenv("HF_TOKEN"):
            raise HTTPException(status_code=500, detail="HF_TOKEN missing")

        # Load model on first request (to avoid startup delay)
        pipeline = get_pipeline()

        print(f"Generating image for prompt: '{request.prompt}'")
        image = pipeline(
            request.prompt,
            num_inference_steps=20,  # Reduce for speed (default: 50)
            guidance_scale=7.5,
            height=512,
            width=512
        ).images[0]

        # Convert to base64
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return {
            "success": True,
            "prompt": request.prompt,
            "image": f"data:image/png;base64,{img_str}"
        }

    except Exception as e:
        print(f"Error during generation: {e}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")