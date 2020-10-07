import * as fs from "fs";
import * as path from "path";

interface ISessionData {
  sessionId: string;
  accessToken: string;
  accessTokenExpTS: number;
}

const simpleDbFilePath: string = path.resolve(__dirname + `../../resumebuilderdb.txt`);

export function persistSessionData(data: ISessionData): Promise<void> {
  return new Promise((resolve, reject) => {

    const newEntry: string = JSON.stringify(data) + "\n";

    fs.appendFile(simpleDbFilePath, newEntry, (err) => {
      if (err) return reject(err);
      return resolve();
    });
    
  });
}
