const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .name('wordsCounter')
  .description('CLI to count words in a file')
  .version('12.1.0');

program
  .command('count <file>')
  .description('count no of words in a file')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
      } else {
        const wordCount = data.split(/\s+/).filter(Boolean).length;
        console.log(`No of words in given file "${file}" are: ${wordCount}`);
      }
    });
  });

program.parse();
