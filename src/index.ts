import { Command } from 'commander';
import { addProfile } from './commands/add.js';
import { listProfiles } from './commands/list.js';
import { switchProfile } from './commands/switch.js';
import { deleteProfile } from './commands/delete.js';
import { showCurrentProfile } from './commands/current.js';
import { initConfig } from './commands/init.js';

const program = new Command();

// Command definitions
program
  .name('gitpersonax')
  .description('GitPersonaX - Git profile management tool - quickly switch between multiple Git accounts')
  .version('1.0.0');

program.command('add')
  .description('Add new Git profile')
  .action(addProfile);

program.command('list')
  .alias('ls')
  .description('List all profiles')
  .action(listProfiles);

program.command('switch')
  .alias('use')
  .description('Switch to specified profile')
  .argument('[name]', 'profile name')
  .action(switchProfile);

program.command('delete')
  .alias('rm')
  .description('Delete specified profile')
  .argument('[name]', 'profile name')
  .action(deleteProfile);

program.command('current')
  .description('Show current active profile')
  .action(showCurrentProfile);

program.command('init')
  .description('Initialize config directory')
  .action(initConfig);

// Add help information
program.addHelpCommand('help [command]', 'Show help information');

// Parse arguments
program.parse();
