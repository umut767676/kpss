import express from 'express';
import bodyParser from 'body-parser';
import { db } from './firebase.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send('Boş veri geldi.');
    }

    // Gerekli alanları al
    const {
      "Kurum Adı": kurum,
      "Pozisyon Unvanı": unvan,
      "Kadro Sayısı": kadro,
      "Ehliyet": ehliyet,
      "Aranan Bölümler": bolum,
      "KPSS Puanı": kpss,
      "Eğitim Düzeyi": egitim,
      "Başvuru Başlangıç": baslangic,
      "Başvuru Bitiş": bitis,
      "Detay Linki": link
    } = data;

    // Firestore'a kaydet
    const docRef = await db.collection('ilanlar').add({
      kurum,
      unvan,
      kadro,
      ehliyet,
      bolum,
      kpss,
      egitim,
      baslangic,
      bitis,
      link,
      createdAt: new Date().toISOString()
    });

    console.log('📦 Yeni ilan eklendi:', docRef.id);
    res.status(200).send('Veri başarıyla eklendi.');

  } catch (error) {
    console.error('🔥 Hata:', error.message);
    res.status(500).send('Sunucu hatası.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
