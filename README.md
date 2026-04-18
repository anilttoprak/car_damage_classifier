# Araç Hasar Sınıflandırıcı (Car Damage Classifier)

Yapay zeka destekli, modern bir web uygulamasıdır. Kullanıcıların yüklediği araç fotoğraflarındaki hasar türünü analiz ederek sınıflandırır. Hugging Face üzerinde bulunan `beingamit99/car_damage_detection` modeli kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **AI Destekli Analiz**: Araçlardaki hasarları 6 farklı sınıfa (Çatlak, Çizik, Patlak Lastik, Göçük, Kırık Cam, Kırık Far) ayırır.
- **Modern ve Premium Arayüz**: Glassmorphism (cam efekti), koyu tema (dark mode) ve özel neon renk paleti ile tasarlanmış kullanıcı deneyimi.
- **Sürükle & Bırak Desteği**: Hızlı ve kolay fotoğraf yükleme.
- **Hızlı Backend**: Python ve FastAPI kullanılarak geliştirilmiş, lokal model çıkarımı (inference) yapan yüksek performanslı API.

## 🛠️ Kullanılan Teknolojiler

- **Frontend**: React, Vite, Vanilla CSS
- **Backend**: Python, FastAPI, Uvicorn
- **Yapay Zeka**: Transformers (Hugging Face), PyTorch, Pillow

## 📦 Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Backend Kurulumu

Yeni bir terminal açın ve backend dizinine gidin:
```bash
cd backend
pip install -r requirements.txt
```

Backend sunucusunu başlatın:
```bash
uvicorn main:app --reload
```
> **Not:** Uygulama ilk kez çalıştığında yapay zeka modeli (yaklaşık birkaç yüz MB) arka planda indirilecektir.

### 2. Frontend Kurulumu

Yeni bir terminal açın ve frontend dizinine gidin:
```bash
cd frontend
npm install
```

Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama başarıyla başladığında tarayıcınızdan `http://localhost:5173` (veya terminalde belirtilen adrese) giderek projeyi kullanmaya başlayabilirsiniz.


