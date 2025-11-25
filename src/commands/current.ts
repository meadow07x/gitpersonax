import { getCurrentProfile, getProfiles } from '../config.js';

export function showCurrentProfile(): void {
  const current = getCurrentProfile();
  const profiles = getProfiles();

  console.log('\n👤 Current Git Profile:\n');

  if (!current) {
    console.log('  No profile set\n');
    return;
  }

  const profile = profiles[current];
  console.log(`  Name: ${current}`);
  console.log(`  User: ${profile.username}`);
  console.log(`  Email: ${profile.email}`);
  console.log(`  SSH Key: ${profile.sshKey}`);
  if (profile.signingKey) {
    console.log(`  GPG Key: ${profile.signingKey}`);
  }
  console.log('');
}
