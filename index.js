const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hh/vacancies", async (req, res) => {
  const { text, professional_role, industry, page } = req.query;

  let url = `https://api.hh.ru/vacancies?page= ${page || 0}`;
  if (text) url += `&text=${encodeURIComponent(text)}`;
  if (professional_role) url += `&professional_role=${professional_role}`;
  if (industry) url += `&industry=${industry}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("HH Proxy API работает!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
