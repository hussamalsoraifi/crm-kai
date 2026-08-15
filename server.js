// خادم بسيط لعرض ملفات CRM.KAI (بعد البناء) مع دعم مسارات React Router
// يعمل هذا الملف على Hostinger Node.js Web App

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// المنفذ: هوستنجر يحدده تلقائيًا عبر متغير البيئة PORT
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, "dist");

// تقديم الملفات الثابتة (JS, CSS, الصور...) مباشرة إن وُجدت
app.use(express.static(distPath));

// أي مسار آخر لم يُطابق ملفًا فعليًا (مثل /app/contacts أو /app/pipeline)
// يُعاد توجيهه إلى index.html ليتولى React Router عرض الصفحة الصحيحة
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CRM.KAI يعمل الآن على المنفذ ${PORT}`);
});
