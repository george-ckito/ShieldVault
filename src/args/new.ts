import { createSpinner } from "nanospinner";
import { Argument } from "../@types/Argument";
import inquirer from "inquirer";
import { prompt } from "enquirer";
import { cli, log } from "..";
import * as fs from "fs";

export default {
  name: "new",
  description: "Saves a new password",
  async execute() {
    const sleep = cli.sleep;
    log.warn(
      "We recommend that your password is at least 8 characters, includes at least one symbol and one number."
    );
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
    const { passwordID: passAsciiId } = (await prompt({
      type: "input",
      name: "passwordID",
      message: "Enter your password ID:",
    })) as { [key: string]: string };

    if (passAscii0 !== passAscii1) {
      return log.error("Passwords don't match!");
    }

    let buff = Buffer.from(passAscii0);
    let passBase64 = buff.toString("base64");
    let buff1 = Buffer.from(passAsciiId);
    let passBase64ID = buff1.toString("base64");

    const spin = await sleep(3000, "Saving the password...");
    if (!fs.existsSync("C:/ShieldVault")) {
      fs.mkdirSync("C:/ShieldVault");
      if (!fs.existsSync("C:/ShieldVault/Pass")) {
        fs.mkdirSync("C:/ShieldVault/Pass");
      }
    }
    if (!fs.existsSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`)) {
      fs.writeFileSync(`C:/ShieldVault/Pass/${passBase64ID}.shv`, passBase64);
    } else {
      spin.stop().reset();
      return log.fatal("Password ID already exists!");
    }

    spin.success({
      text: "Password Saved!",
    });
  },
} as Argument;
