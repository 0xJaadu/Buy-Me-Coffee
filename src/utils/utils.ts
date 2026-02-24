/**
 * Utility for combining Tailwind CSS classes with automatic conflict resolution
 * Merges conditional classes and ensures proper override behavior
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';




export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}