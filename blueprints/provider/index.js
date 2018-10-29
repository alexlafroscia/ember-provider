/* eslint-env node */

const path = require('path');

module.exports = {
  description: 'Generates a Provider',

  availableOptions: [
    {
      name: 'file-type',
      type: ['js', 'ts'],
      default: 'js',
      aliases: [{ ts: 'ts' }]
    }
  ],

  filesPath(options = {}) {
    const useTypescript = options.fileType === 'ts';
    const fileDirectory = useTypescript ? 'ts-files' : 'js-files';

    return path.join(this.path, fileDirectory);
  }
};
