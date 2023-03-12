import { Argument } from "../@types/Argument";
import { prompt } from "enquirer";
import { cli, log } from "..";
import * as fs from "fs";

export default {
  name: "delete",
  description: "Deletes one of your passwords!",
  async execute() {
    const { passwordID: passAsciiId } = (await prompt({
      type: "input",
      name: "passwordID",
      message: "Enter your password ID:",
    })) as { [key: string]: string };
    const spin = await cli.sleep(5000, "Deleting the password...");
    let buff = Buffer.from(passAsciiId);
    let passBase64ID = buff.toString("base64");
    if (!fs.existsSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`)) {
      spin.stop().reset();
      return log.error("Password doesn't exist!");
    }
    fs.unlinkSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`);
    spin.success({
      text: "Password Deleted!",
    });
  },
} as Argument;
