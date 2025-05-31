const db = require("./firebase");
const { getSheetData } = require("./sheets");

async function main() {
  const ilanlar = await getSheetData();

  for (const ilan of ilanlar) {
    const docRef = db.collection("ilanlar").doc(); // ID otomatik
    await docRef.set(ilan);
    console.log("✅ İlan kaydedildi:", ilan.unvan);
  }

  console.log("🎉 Tüm ilanlar başarıyla Firestore'a aktarıldı.");
}

main().catch(console.error);
