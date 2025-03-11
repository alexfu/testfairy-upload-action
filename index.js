const core = require('@actions/core');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('api-key', { required: true });
    const file = core.getInput('file', { required: true });
    const groups = core.getInput('groups');
    const notify = core.getInput('notify');

    const data = new FormData();
    data.set('api_key', apiKey);
    data.set('file', fs.createReadStream(file));

    if (groups) {
      data.set('groups', groups);
    }

    if (notify) {
      data.set('notify', notify);
    }

    await axios.post('https://app.testfairy.com/api/upload', data);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
