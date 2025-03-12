const core = require('@actions/core');
const fs = require('fs');
const { default: axios } = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('api-key', { required: true });
    const file = core.getInput('file', { required: true });
    const groups = core.getInput('groups');
    const notify = core.getInput('notify');

    const data = {
      'api_key': apiKey,
      'file': fs.createReadStream(file)
    };

    if (groups) {
      data['groups'] = groups;
    }

    if (notify) {
      data['notify'] = notify;
    }

    const opts = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    await axios.post('https://app.testfairy.com/api/upload', data, opts);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
