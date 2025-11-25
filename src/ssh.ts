import fs from 'fs';
import path from 'path';
import os from 'os';

// Update SSH config
export function updateSSHConfig(profileName: string, sshKey: string): void {
  const sshConfigPath = path.join(os.homedir(), '.ssh', 'config');
  const sshConfigDir = path.join(os.homedir(), '.ssh');

  // Ensure .ssh directory exists
  if (!fs.existsSync(sshConfigDir)) {
    fs.mkdirSync(sshConfigDir, { recursive: true });
  }

  let configContent = '';
  if (fs.existsSync(sshConfigPath)) {
    configContent = fs.readFileSync(sshConfigPath, 'utf-8');
  }

  // Check if this host already has a config
  const hostRegex = new RegExp(`^Host\\s+${profileName}`, 'm');
  const startIndex = configContent.search(hostRegex);

  if (startIndex !== -1) {
    // Update existing config
    const endIndex = configContent.indexOf('\nHost ', startIndex + 1);
    const before = configContent.substring(0, startIndex);
    const after = endIndex === -1 ? '' : configContent.substring(endIndex);
    configContent = before + `Host ${profileName}
  HostName github.com
  User git
  IdentityFile ${sshKey}
  IdentitiesOnly yes
` + after;
  } else {
    // Add new config
    configContent += `
# Git Profile: ${profileName}
Host ${profileName}
  HostName github.com
  User git
  IdentityFile ${sshKey}
  IdentitiesOnly yes
`;
  }

  fs.writeFileSync(sshConfigPath, configContent);
}
