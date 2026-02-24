import express, { Request, Response } from 'express';
import {
  splitByUnderscore,
  concatenate,
  isLeapYear,
  secretHandshake,
} from './logic';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (_, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/split/:text', (req, res) => {
  const text = req.params.text;
  if (!text?.trim()) {
    res.status(400).json({ error: 'Parameter :text is required' });
    return;
  }
  res.json({ revisedString: splitByUnderscore(text) });
});

app.get('/concat/:first/:second', (req, res) => {
  const { first, second } = req.params;
  if (!first || !second) {
    res.status(400).json({ error: 'Parameters :first and :second are required' });
    return;
  }
  res.json({ revisedString: concatenate(first, second) });
});

app.get('/concat-query', (req, res) => {
  const first = req.query.first as string | undefined;
  const second = req.query.second as string | undefined;
  if (!first?.trim() || !second?.trim()) {
    res.status(400).json({ error: 'Query params first and second are required' });
    return;
  }
  res.json({ revisedString: concatenate(first, second) });
});

app.get('/leap/:year', (req, res) => {
  const y = parseInt(req.params.year, 10);
  if (Number.isNaN(y) || y < 1 || y > 9999) {
    res.status(400).json({ error: 'Valid year (1-9999) is required' });
    return;
  }
  res.json({ isLeap: isLeapYear(y) });
});

app.get('/handshake/:number', (req, res) => {
  const num = parseInt(req.params.number, 10);
  if (Number.isNaN(num) || num < 0 || num > 31) {
    res.status(400).json({ error: 'Number must be between 0 and 31' });
    return;
  }
  res.json({ result: secretHandshake(num) });
});

app.use((_, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
