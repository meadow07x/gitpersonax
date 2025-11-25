import { execSync } from 'child_process';

// Safe command execution function, handles Windows compatibility
export function safeExec(command: string): boolean {
  try {
    execSync(command, {
      stdio: 'ignore',
      encoding: 'utf-8',
      windowsHide: true
    });
    return true;
  } catch (error) {
    // Ignore errors, especially unset command errors (when config doesn't exist)
    return false;
  }
}
