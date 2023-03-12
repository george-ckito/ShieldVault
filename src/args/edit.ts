import { Argument } from "../@types/Argument";
import { prompt } from "enquirer";
import * as fs from "fs";
import { cli, log } from "..";

export default {
  name: "edit",
  description: "Edits a password",
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
    const { password: passAscii0 } = (await prompt({
      type: "password",
      name: "password",
      message: "Enter your password:",
    })) as { [key: string]: string };

    const { password: passAscii1 } = (await prompt({
      type: "password",
      name: "password",
      message: "Repeat your password:",
    })) as { [key: string]: string };
    if (passAscii0 !== passAscii1) {
      return log.error("Passwords don't match!");
    }
    const spin = await cli.sleep(5000, "Editting the password...");
    let buff1 = Buffer.from(passAscii0);
    let passBase64 = buff1.toString("base64");
    fs.unlinkSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`);
    fs.writeFileSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`, passBase64);
    spin.success({
      text: "Password editted!",
    });
  },
} as Argument;
