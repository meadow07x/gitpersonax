import inquirer from 'inquirer';
import { getProfiles, getCurrentProfile, deleteProfileData } from '../config.js';

interface DeleteAnswers {
  profile: string;
}

interface ConfirmAnswers {
  confirm: boolean;
}

export async function deleteProfile(profileName?: string): Promise<void> {
  const profiles = getProfiles();
  const current = getCurrentProfile();

  if (!profileName) {
    const choices = Object.keys(profiles);
    if (choices.length === 0) {
      console.log('❌ No profiles available');
      return;
    }

    const answer = await inquirer.prompt<DeleteAnswers>([
      {
        type: 'rawlist',
        name: 'profile',
        message: 'Select profile to delete (use ↑↓ arrow keys):',
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

  if (current === profileName) {
    console.log('❌ Cannot delete current active profile, please switch to another profile first');
    return;
  }

  const answer = await inquirer.prompt<ConfirmAnswers>([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to delete profile "${profileName}"?`,
      default: false
    }
  ]);

  if (!answer.confirm) {
    console.log('Deletion cancelled');
    return;
  }

  deleteProfileData(profileName);

  console.log(`\n✅ Profile "${profileName}" deleted\n`);
}
