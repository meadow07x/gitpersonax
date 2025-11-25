import { safeExec } from './utils/exec.js';
import { Profile } from './types/index.js';

// Set git config for a profile
export function setGitConfig(profile: Profile): void {
  // Set git config
  safeExec(`git config --global user.name "${profile.username}"`);
  safeExec(`git config --global user.email "${profile.email}"`);

  if (profile.signingKey && profile.signingKey.trim() !== '') {
    safeExec(`git config --global user.signingkey "${profile.signingKey}"`);
    safeExec(`git config --global commit.gpgsign true`);
  } else {
    // Try to disable GPG signing (ignore errors)
    safeExec(`git config --global --unset commit.gpgsign`);
    safeExec(`git config --global --unset user.signingkey`);
  }
}
