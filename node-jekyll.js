#!/usr/bin/env node --harmony
'use strict';

const program = require('commander');

program
  .version('0.0.1')
  .command('new <PATH>', 'Creates a new node-jekyll site scaffold in PATH')
  .parse(process.argv);
