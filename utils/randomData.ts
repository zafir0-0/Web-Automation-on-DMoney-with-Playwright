export function randomThreeDigit(): number {
  return Math.floor(Math.random() * 900) + 100;
}



export function randomPhone(): string {
  const suffix = Math.floor(Math.random() * 90000000) + 10000000;
  return `013${suffix}`;
}

export function randomNid(): string {
  return String(Math.floor(Math.random() * 9000000) + 1000000);
}



export function randomAmount(min: number, max: number): number {
  if (min > max) throw new Error('min must be <= max');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}