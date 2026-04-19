# Araç Hasar Sınıflandırıcı (Car Damage Classifier)

Yapay zeka destekli, modern bir web uygulamasıdır. Kullanıcıların yüklediği araç fotoğraflarındaki hasar türünü analiz ederek sınıflandırır. Hugging Face üzerinde bulunan `beingamit99/car_damage_detection` modeli kullanılarak geliştirilmiştir.

<img width="1877" height="788" alt="Ekran görüntüsü 2026-04-18 220959" src="https://github.com/user-attachments/assets/d1f2527d-2e52-424a-a2e9-5bf78617f65d" />


## 🚀 Özellikler

- **AI Destekli Analiz**: Araçlardaki hasarları 6 farklı sınıfa (Çatlak, Çizik, Patlak Lastik, Göçük, Kırık Cam, Kırık Far) ayırır.
- **Modern ve Premium Arayüz**: Glassmorphism (cam efekti), koyu tema (dark mode) ve özel neon renk paleti ile tasarlanmış kullanıcı deneyimi.
- **Sürükle & Bırak Desteği**: Hızlı ve kolay fotoğraf yükleme.
- **Hızlı Backend**: Python ve FastAPI kullanılarak geliştirilmiş, lokal model çıkarımı (inference) yapan yüksek performanslı API.

<img width="1180" height="925" alt="Ekran görüntüsü 2026-04-18 220953" src="https://github.com/user-attachments/assets/e488daa1-4eba-4c2a-bd70-de6f11fb5da4" />

## 🛠️ Kullanılan Teknolojiler

- **Frontend**: React, Vite, Vanilla CSS
- **Backend**: Python, FastAPI, Uvicorn
- **Yapay Zeka**: Transformers (Hugging Face), PyTorch, Pillow

## 📦 Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Backend Kurulumu

Yeni bir terminal açın ve backend dizinine gidin. Python projelerinde çakışmaları önlemek için sanal ortam (virtual environment) kullanılması önerilir:

```bash
cd backend
python -m venv venv
```

Sanal ortamı aktifleştirin:
- **Windows için:** `.\venv\Scripts\activate`
- **Mac/Linux için:** `source venv/bin/activate`

Ardından gerekli kütüphaneleri kurun:
```bash
pip install -r requirements.txt
```

Backend sunucusunu başlatın:
```bash
uvicorn main:app --reload
```
> **Not:** Uygulama ilk kez çalıştığında yapay zeka modeli arka planda indirilecektir.

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

Uygulama başarıyla başladığında tarayıcınızdan uygulamanın linkine (genelde `http://localhost:5173`) giderek projeyi kullanmaya başlayabilirsiniz.



