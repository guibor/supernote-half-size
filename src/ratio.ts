export const DEFAULT_RATIO = 50;
export const MIN_RATIO = 10;
export const MAX_RATIO = 200;

let scaleRatio = DEFAULT_RATIO;

export function getScaleRatio(): number {
  return scaleRatio;
}

export function setScaleRatio(value: number): number {
  scaleRatio = normalizeRatio(value);
  return scaleRatio;
}

export function ratioToScale(value: number): number {
  return normalizeRatio(value) / 100;
}

export function normalizeRatio(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_RATIO;
  }

  const rounded = Math.round(value);
  return Math.min(MAX_RATIO, Math.max(MIN_RATIO, rounded));
}
