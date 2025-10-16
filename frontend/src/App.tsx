// frontend/src/App.tsx
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateArt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const response = await axios.post('http://localhost:8000/generate', {
        prompt: prompt.trim(),
      });
      setImage(response.data.image);
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate image. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🎨 Generative AI Art Generator</h1>
      <p>Describe the image you want to create:</p>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., a cyberpunk cat in Tokyo at night"
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      />
      <button
        onClick={generateArt}
        disabled={loading || !prompt.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Art'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {image && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <img
            src={`data:${image}`}
            alt="AI-generated art"
            style={{
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #eee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <br />
          <a
            href={`data:${image}`}
            download="ai-art.png"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default App;