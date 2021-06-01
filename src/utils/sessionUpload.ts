import axios from 'axios';
import logError from './logError';

async function sessionUpload(apiToken: string, projectId: string, testResult: object, logFilePath?: string) {
  const uploadUrl = "http://127.0.0.1:5000/api/v1/session/upload";
  // const uploadUrl = "https://www.tauk.com/api/v1/session/upload";
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
  debugger;
}

export default sessionUpload;