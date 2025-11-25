import { getProfiles, getCurrentProfile } from '../config.js';

export function listProfiles(): void {
  const profiles = getProfiles();
  const current = getCurrentProfile();

  console.log('\n📋 Git Profiles List:\n');

  if (Object.keys(profiles).length === 0) {
    console.log('  No profiles yet, use "git-profile add" to add one\n');
    return;
  }

  Object.entries(profiles).forEach(([name, profile]) => {
    const isCurrent = current === name;
    const indicator = isCurrent ? '▶️ ' : '  ';
    console.log(`${indicator} ${name}`);
    console.log(`   Username: ${profile.username}`);
    console.log(`   Email:    ${profile.email}`);
    console.log(`   SSH Key:  ${profile.sshKey}`);
    if (profile.signingKey) {
      console.log(`   GPG Key:  ${profile.signingKey}`);
    }
    console.log('');
  });

  if (current) {
    console.log(`Current: ${current}\n`);
  }
}
