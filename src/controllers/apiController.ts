import { Request, Response } from 'express';
import * as apiService from '../services/apiService';

export function health(_req: Request, res: Response) {
  res.json({ status: 'ok', message: 'Server is running' });
}

export function split(req: Request, res: Response) {
  const text = req.params.text;
  if (!text?.trim()) {
    res.status(400).json({ error: 'Parameter :text is required' });
    return;
  }
  res.json({ revisedString: apiService.splitByUnderscore(text) });
}

export function concatParams(req: Request, res: Response) {
  const { first, second } = req.params;
  if (!first || !second) {
    res.status(400).json({ error: 'Parameters :first and :second are required' });
    return;
  }
  res.json({ revisedString: apiService.concatenate(first, second) });
}

export function concatQuery(req: Request, res: Response) {
  const first = req.query.first as string | undefined;
  const second = req.query.second as string | undefined;
  if (!first?.trim() || !second?.trim()) {
    res.status(400).json({ error: 'Query params first and second are required' });
    return;
  }
  res.json({ revisedString: apiService.concatenate(first, second) });
}

export function leap(req: Request, res: Response) {
  const y = parseInt(req.params.year, 10);
  if (Number.isNaN(y) || y < 1 || y > 9999) {
    res.status(400).json({ error: 'Valid year (1-9999) is required' });
    return;
  }
  res.json({ isLeap: apiService.isLeapYear(y) });
}

export function handshake(req: Request, res: Response) {
  const num = parseInt(req.params.number, 10);
  if (Number.isNaN(num) || num < 0 || num > 31) {
    res.status(400).json({ error: 'Number must be between 0 and 31' });
    return;
  }
  res.json({ result: apiService.secretHandshake(num) });
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' });
}
