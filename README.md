
# AI Art Generator 🎨

Generate AI-powered images from text prompts using Stable Diffusion.

## 🛠️ Tech Stack
- **Backend**: FastAPI, PyTorch, Hugging Face `diffusers`
- **AI Model**: `nota-ai/bk-sdm-small` (lightweight, works on CPU/GPU)
- **Hardware**: Supports NVIDIA GPU (CUDA) with auto fallback to CPU

## 🚀 Quick Start

```bash
git clone https://github.com/tu-usuario/ai-art-generator.git
cd ai-art-generator/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your HF token to .env
uvicorn main:app --port 8000
