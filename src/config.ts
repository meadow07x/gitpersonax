import fs from 'fs';
import path from 'path';
import os from 'os';
import { Config, Profile } from './types/index.js';

const CONFIG_DIR = path.join(os.homedir(), '.git-profile');
const CONFIG_FILE = path.join(CONFIG_DIR, 'profiles.json');

// Ensure config directory exists
export function ensureConfigDir(): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ profiles: {}, current: null }, null, 2));
  }
}

// Read config
export function readConfig(): Config {
  ensureConfigDir();
  const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
  return JSON.parse(data) as Config;
}

// Save config
export function saveConfig(config: Config): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// Get all profiles
export function getProfiles(): Record<string, Profile> {
  const config = readConfig();
  return config.profiles;
}

// Get current profile
export function getCurrentProfile(): string | null {
  const config = readConfig();
  return config.current;
}

// Set current profile
export function setCurrentProfile(profileName: string | null): void {
  const config = readConfig();
  config.current = profileName;
  saveConfig(config);
}

// Add profile
export function addProfileData(profileName: string, profileData: Omit<Profile, 'createdAt'>): void {
  const config = readConfig();
  config.profiles[profileName] = {
    ...profileData,
    createdAt: new Date().toISOString()
  };
  saveConfig(config);
}

// Delete profile
export function deleteProfileData(profileName: string): void {
  const config = readConfig();
  delete config.profiles[profileName];
  saveConfig(config);
}
