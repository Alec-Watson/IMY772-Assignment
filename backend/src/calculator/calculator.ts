export function add(a: string, b: string): string {
  const parsedA = validateAndParse(a);
  const parsedB = validateAndParse(b);
  const result = parsedA + parsedB;
  return formatHex(result);
}

export function subtract(a: string, b: string): string {
  const parsedA = validateAndParse(a);
  const parsedB = validateAndParse(b);
  const result = Math.max(parsedA - parsedB, 0);
  return formatHex(result);
}

export function multiply(a: string, b: string): string {
  const parsedA = validateAndParse(a);
  const parsedB = validateAndParse(b);
  const result = parsedA * parsedB;
  return formatHex(result);
}

export function divide(a: string, b: string): string {
  const parsedA = validateAndParse(a);
  const parsedB = validateAndParse(b);
  if (parsedB === 0) {
    throw new Error('Division by zero is not allowed');
  }
  const result = Math.floor(parsedA / parsedB);
  return formatHex(result);
}

function validateAndParse(input: string): number {
  validateHexLength(input);
  return parseHex(input);
}

function parseHex(input: string): number {
  if (!/^[0-9A-Fa-f]{1,2}$/.test(input)) {
    throw new Error('Invalid hexadecimal input');
  }
  return parseInt(input, 16);
}

function validateHexLength(input: string): void {
  if (input.length > 2) {
    throw new Error('Input exceeds maximum of 2 hex digits');
  }
}

function formatHex(value: number): string {
  if (value < 0) value = 0;
  if (value > 0xFFFF) value = 0xFFFF; // Clamp to 4-digit hex max
  return value.toString(16).toUpperCase().padStart(2, '0');
}
