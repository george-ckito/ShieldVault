import { Argument } from "../@types/Argument";
import { prompt } from "enquirer";
import * as fs from "fs";
import { log } from "..";

export default {
  name: "view",
  description: "Shows you your password!",
  async execute() {
    const { passwordID: passAsciiId } = (await prompt({
      type: "input",
      name: "passwordID",
      message: "Enter your password ID:",
    })) as { [key: string]: string };
    let buff = Buffer.from(passAsciiId);
    let passBase64ID = buff.toString("base64");
    if (!fs.existsSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`)) {
      return log.error("Password doesn't exist!");
    }
    //   fs.writeFileSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`);
    let file = fs.readFileSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`, {
      encoding: "utf-8",
    });
    let fileAscii = Buffer.from(file, "base64").toString("ascii");
    return log.info(`Password found! ${fileAscii}`);
  },
} as Argument;
