import path from "path";
import { execFile } from "child_process";

export const helloworld = path.join(__dirname, "..", "/public/hello");

export function executeProgram(
    executable: string = helloworld,
    envVars?: any,
): Promise<{ success: boolean; output?: any; err?: any }> {
    return new Promise((resolve, reject) => {
        execFile(executable, { env: envVars }, (error, stdout, stderr) => {
            if (error) {
                reject({ success: false, err: error });
            } else {
                resolve({ success: true, output: stdout });
            }
        });
    });
}
