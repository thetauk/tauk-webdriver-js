import axios from 'axios';
import logError from './logError';

async function sessionUpload(apiToken: string, projectId: string, testResult: object, logFilePath?: string, customSessionUploadURL?: string) {
  let uploadUrl = "https://www.tauk.com/api/v1/session/upload"
  if (customSessionUploadURL) {
    uploadUrl = customSessionUploadURL;
  }
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