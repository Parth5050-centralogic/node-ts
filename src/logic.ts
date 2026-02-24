export interface SplitResponse {
  revisedString: string;
}

export interface ConcatResponse {
  revisedString: string;
}

export interface LeapResponse {
  isLeap: boolean;
}

export interface HandshakeResponse {
  result: string[];
}

export function splitByUnderscore(text: string): string {
  return text.split('_').join(' ');
}

export function concatenate(first: string, second: string): string {
  return first + second;
}

export function isLeapYear(year: number): boolean {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

const handshakeActions: Record<number, string> = {
  1: 'wink',
  2: 'double blink',
  4: 'close your eyes',
  8: 'jump',
};
const BITS = [1, 2, 4, 8];
const REVERSE = 16;

export function secretHandshake(n: number): string[] {
  const out: string[] = [];
  for (const b of BITS) {
    if (n & b) out.push(handshakeActions[b]);
  }
  if (n & REVERSE) out.reverse();
  return out;
}
