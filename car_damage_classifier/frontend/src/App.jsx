import { useState, useRef } from 'react';
import './App.css';

const DAMAGE_COLORS = {
  crack: 'var(--damage-crack)',
  scratch: 'var(--damage-scratch)',
  'tire flat': 'var(--damage-tire)',
  dent: 'var(--damage-dent)',
  'glass shatter': 'var(--damage-glass)',
  'lamp broken': 'var(--damage-lamp)',
};

const DAMAGE_LABELS_TR = {
  'crack': 'Çatlak',
  'scratch': 'Çizik',
  'tire flat': 'Patlak Lastik',
  'dent': 'Göçük',
  'glass shatter': 'Kırık Cam',
  'lamp broken': 'Kırık Far',
};

const formatLabel = (label) => {
  const lowerLabel = label.toLowerCase();
  return DAMAGE_LABELS_TR[lowerLabel] || label;
};

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResults(null);
      setError(null);
    } else {
      setError('Lütfen geçerli bir resim dosyası seçin.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResults(null);
      setError(null);
    } else {
      setError('Lütfen geçerli bir resim dosyası bırakın.');
    }
  };

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.predictions);
      } else {
        setError(data.error || 'Analiz sırasında bir hata oluştu.');
      }
    } catch (err) {
      setError('Sunucuya bağlanılamadı. Backend API çalışıyor mu?');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Hasar Dedektifi</h1>
        <p>Yapay Zeka Destekli Araç Hasar Analizi</p>
      </header>

      <main className="main-content glass-panel">
        {!preview ? (
          <div 
            className="dropzone" 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <div className="upload-icon">📸</div>
            <div className="upload-text">Görseli sürükleyin veya tıklayarak seçin</div>
            <div className="upload-subtext">PNG, JPG veya JPEG (Maks. 5MB)</div>
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <div style={{display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center'}}>
              <button className="btn-secondary" onClick={resetForm} disabled={loading}>
                Yeni Görsel
              </button>
              <button className="btn-primary" onClick={analyzeImage} disabled={loading} style={{flex: 1}}>
                {loading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '1rem' }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="loader-container">
            <span className="loader"></span>
            <p>Yapay zeka hasar türünü tespit ediyor...</p>
          </div>
        )}

        {results && !loading && (
          <div className="results-container">
            <h2>Analiz Sonuçları</h2>
            {results.map((result, index) => {
              const lowerLabel = result.label.toLowerCase();
              const color = DAMAGE_COLORS[lowerLabel] || 'var(--primary-color)';
              const scorePercent = (result.score * 100).toFixed(1);
              
              return (
                <div key={index} className="result-item">
                  <div className="result-header">
                    <span>{formatLabel(result.label)}</span>
                    <span style={{ color }}>{scorePercent}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${scorePercent}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
