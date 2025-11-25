import inquirer from 'inquirer';
import { getProfiles, setCurrentProfile } from '../config.js';
import { setGitConfig } from '../git.js';
import { updateSSHConfig } from '../ssh.js';

interface SwitchAnswers {
  profile: string;
}

export async function switchProfile(profileName?: string): Promise<void> {
  const profiles = getProfiles();

  if (!profileName) {
    const choices = Object.keys(profiles);
    if (choices.length === 0) {
      console.log('❌ No profiles available');
      return;
    }

    const answer = await inquirer.prompt<SwitchAnswers>([
      {
        type: 'rawlist',
        name: 'profile',
        message: 'Select profile to switch (use ↑↓ arrow keys):',
        choices: choices,
        loop: false
      }
    ]);
    profileName = answer.profile;
  }

  if (!profiles[profileName]) {
    console.log(`❌ Profile "${profileName}" does not exist`);
    return;
  }

  const profile = profiles[profileName];

  try {
    // Set git config
    console.log('🔧 Updating Git config...');
    setGitConfig(profile);

    // Set SSH config
    console.log('🔐 Updating SSH config...');
    updateSSHConfig(profileName, profile.sshKey);

    setCurrentProfile(profileName);

    console.log(`\n✅ Switched to profile: ${profileName}`);
    console.log(`   Username: ${profile.username}`);
    console.log(`   Email:    ${profile.email}`);
    console.log(`   SSH Key:  ${profile.sshKey}\n`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Switch failed:', errorMessage);
  }
}
