
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


MIT License

Copyright (c) 2025 Alessandro Velasco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
