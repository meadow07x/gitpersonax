# GitPersonaX

A command-line tool similar to GitKraken Profile that helps you quickly switch between multiple Git accounts, including username, email, SSH Key and other configurations.

## Features

- ✅ Multiple Git profile management
- ✅ Quick profile switching
- ✅ Automatic git config (user.name, user.email)
- ✅ Automatic SSH config
- ✅ GPG signing key support
- ✅ Interactive UI

## Installation

```bash
npm install -g gitpersonax
```

## Usage

### Add a new profile

```bash
gitpersonax add
```

Follow the prompts to enter:

- Profile name (e.g., company, personal)
- Git Username
- Git Email
- SSH Key path (e.g., ~/.ssh/id_rsa_company)
- GPG Signing Key (optional)

### List all profiles

```bash
gitpersonax list
# or
gitpersonax ls
```

### Switch to a specified profile

```bash
# Interactive selection
gitpersonax switch

# Specify directly
gitpersonax switch company
gitpersonax use company
```

### Delete a profile

```bash
# Interactive selection
gitpersonax delete

# Specify directly
gitpersonax delete company
gitpersonax rm company
```

### View current profile

```bash
gitpersonax current
```

### Initialize config directory

```bash
gitpersonax init
```

## Usage Examples

### Scenario 1: Add company and personal accounts

```bash
# Add company account
$ gitpersonax add
Profile name: company
Git Username: John Doe
Git Email: john@company.com
SSH Key path: ~/.ssh/id_rsa_company
GPG Signing Key: (leave empty or enter)
Switch to this profile automatically? No

# Add personal account
$ gitpersonax add
Profile name: personal
Git Username: Jane Doe
Git Email: jane@gmail.com
SSH Key path: ~/.ssh/id_rsa_personal
GPG Signing Key: ABCD1234EFGH5678
Switch to this profile automatically? Yes
```

### Scenario 2: Quickly switch accounts

```bash
# View current account
$ gitpersonax current
👤 Current Git Profile:
  Name: personal
  User: Jane Doe
  Email: jane@gmail.com
  SSH Key: ~/.ssh/id_rsa_personal
  GPG Key: ABCD1234EFGH5678

# Switch to company account
$ gitpersonax switch company
🔧 Updating Git config...
🔐 Updating SSH config...

✅ Switched to profile: company
   Username: John Doe
   Email:    john@company.com
   SSH Key:  ~/.ssh/id_rsa_company
```

## Configuration File

The tool creates configuration files in `~/.git-profile/` directory:

- `profiles.json` - Store all profile information

Example content:

```json
{
  "profiles": {
    "company": {
      "username": "John Doe",
      "email": "john@company.com",
      "sshKey": "~/.ssh/id_rsa_company",
      "signingKey": null,
      "createdAt": "2025-11-25T15:30:00.000Z"
    },
    "personal": {
      "username": "Jane Doe",
      "email": "jane@gmail.com",
      "sshKey": "~/.ssh/id_rsa_personal",
      "signingKey": "ABCD1234EFGH5678",
      "createdAt": "2025-11-25T15:30:00.000Z"
    }
  },
  "current": "personal"
}
```

## SSH Configuration

When switching profiles, the tool automatically updates `~/.ssh/config` file and adds Host configuration for each profile:

```bash
# GitPersonaX: company
Host company
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_company
  IdentitiesOnly yes

# GitPersonaX: personal
Host personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_personal
  IdentitiesOnly yes
```

Usage with different hosts:

```bash
# Clone personal repository
git clone git@personal:username/repo.git

# Clone company repository
git clone git@company:username/repo.git
```

## Quick Command Reference

| Command | Description |
|---------|-------------|
| `gitpersonax add` | Add new profile |
| `gitpersonax list` | View all profiles |
| `gitpersonax switch` | Switch profile |
| `gitpersonax delete` | Delete profile |
| `gitpersonax current` | View current profile |

## Notes

1. Ensure SSH Key file exists and path is correct
2. Switching profile will modify global git configuration
3. Cannot delete current active profile, must switch to another profile first
4. Using GPG signing requires pre-configured GPG keys

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
