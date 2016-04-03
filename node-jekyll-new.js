'use strict';

const fs = require('fs');
const path = require('path');
const program = require('commander');

function _createBlankSite(blogPath) {
  const dirs = ['_layouts', '_posts', '_drafts'].map((currentValue) => (
    path.join(blogPath, currentValue)
  ));
  const files = ['index.html'].map((currentValue) => (
    path.join(blogPath, currentValue)
  ));

  fs.mkdirSync(blogPath);

  dirs.forEach((dir) => {
    fs.mkdirSync(dir);
  });

  files.forEach((file) => {
    fs.writeFileSync(file, '');
  });
}

function _createSampleSite(blogPath) {
  // generate based on a template directory
}

function _shouldPreserveSource(blogPath, options) {
  return new Promise((resolve, reject) => {
    fs.access(blogPath, fs.F_OK, (isEmpty) => {
      if (!isEmpty && !options.force) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

const proc = module.exports = function proc(blogPath, options) {
  _shouldPreserveSource(blogPath, options)
    .then(() => {
      console.error(`Conflict: ${blogPath} exists and is not empty.`);
      process.exit(1);
    })
    .catch(() => {
      if (options.blank) {
        _createBlankSite(blogPath);
      } else {
        _createSampleSite(blogPath);
      }

      console.log(`New Jekyll site installed in ${blogPath}.`);
    });
};

program
  .option('-f, --force', 'Force creation even if PATH already exists')
  .option('--blank', 'Creates scaffolding but with empty files')
  .parse(process.argv);

proc(program.args[0], { force: program.force, blank: program.blank });
