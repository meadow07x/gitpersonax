export interface Profile {
  username: string;
  email: string;
  sshKey: string;
  signingKey: string | null;
  createdAt: string;
}

export interface Config {
  profiles: Record<string, Profile>;
  current: string | null;
}

export interface AddProfileAnswers {
  name: string;
  username: string;
  email: string;
  sshKey: string;
  signingKey: string;
  autoSwitch: boolean;
}
