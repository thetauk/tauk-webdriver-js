import * as fs from 'fs';

function logError(filePath: string, content: any) {
  fs.writeFile(filePath + '.log', content, err => {
    if (err) {
      console.log(err);
      return
    }
  });
}

export default logError;