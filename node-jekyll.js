#!/usr/bin/env node --harmony

const program = require('commander');

program
  .version('0.0.1')
  .command('new <PATH>')
  .description('Creates a new node-jekyll site scaffold in PATH')
  .action((path) => {
    console.log(`path is ${path}`);
  });

program.parse(process.argv);
