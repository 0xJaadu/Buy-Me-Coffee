/**
 * Utility for combining Tailwind CSS classes with automatic conflict resolution
 * Merges conditional classes and ensures proper override behavior
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for flexible class composition
 * @param {any[]} inputs - CSS class strings and conditional objects
 * @returns {string} Merged class string with resolved conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}