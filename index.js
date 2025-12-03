import express from "express";
import { db } from "./firebase.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send("Boş veri geldi.");
    }

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
      "Detay Linki": link,
    } = data;

    const docRef = await db.collection("ilanlar").add({
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
      createdAt: new Date().toISOString(),
    });

    console.log("📦 Yeni ilan eklendi:", docRef.id);
    res.status(200).send("Veri başarıyla eklendi.");
  } catch (error) {
    console.error("🔥 Hata:", error.message);
    res.status(500).send("Sunucu hatası.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
