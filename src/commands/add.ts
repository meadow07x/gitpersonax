import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getProfiles, addProfileData } from '../config.js';
import { switchProfile } from './switch.js';

interface InquirerAnswers {
  name: string;
  username: string;
  email: string;
  sshKey: string;
  signingKey: string;
  autoSwitch: boolean;
}

export async function addProfile(): Promise<void> {
  console.log('\n📝 Add new Git Profile\n');

  const answers = await inquirer.prompt<InquirerAnswers>([
    {
      type: 'input',
      name: 'name',
      message: 'Profile name (e.g., company, personal):',
      validate: (value: string) => {
        if (!value) return 'Please enter profile name';
        const profiles = getProfiles();
        if (profiles[value]) return 'This name already exists';
        return true;
      }
    },
    {
      type: 'input',
      name: 'username',
      message: 'Git Username:',
      validate: (value: string) => value ? true : 'Please enter username'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Git Email:',
      validate: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Please enter email';
        if (!emailRegex.test(value)) return 'Please enter valid email address';
        return true;
      }
    },
    {
      type: 'input',
      name: 'sshKey',
      message: 'SSH Key path (e.g., ~/.ssh/id_rsa_company):',
      validate: (value: string) => {
        if (!value) return 'Please enter SSH Key path';
        const keyPath = value.startsWith('~') ? path.join(os.homedir(), value.slice(1)) : value;
        if (!fs.existsSync(keyPath)) {
          return 'SSH Key file does not exist';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'signingKey',
      message: 'GPG Signing Key (optional, press Enter to skip):',
    },
    {
      type: 'confirm',
      name: 'autoSwitch',
      message: 'Switch to this profile automatically?',
      default: false
    }
  ]);

  addProfileData(answers.name, {
    username: answers.username,
    email: answers.email,
    sshKey: answers.sshKey,
    signingKey: answers.signingKey || null
  });

  console.log(`\n✅ Profile "${answers.name}" added successfully!`);
  if (answers.autoSwitch) {
    await switchProfile(answers.name);
  }
}
