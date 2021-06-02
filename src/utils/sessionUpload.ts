import axios from 'axios';
import dotenv from 'dotenv';
import logError from './logError';

async function sessionUpload(apiToken: string, projectId: string, testResult: object, logFilePath?: string) {
  dotenv.config();
  const uploadUrl = (`${process.env.TAUK_ENV}` === 'local') ? `${process.env.SESSION_UPLOAD_URL}` : "https://www.tauk.com/api/v1/session/upload";
  let response = await axios.post(uploadUrl, testResult, {
    headers: {
      'api-token': apiToken,
      'project-id': projectId
    }
  }).catch(function (error) {
    if (logFilePath) {
      logError(logFilePath, error);
    }
  });
}

export default sessionUpload;