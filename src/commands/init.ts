import { ensureConfigDir } from '../config.js';

export function initConfig(): void {
  ensureConfigDir();
  console.log('✅ Config directory initialized\n');
}
