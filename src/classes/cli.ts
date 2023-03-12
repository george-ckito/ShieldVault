const args = process.argv.slice(2);
import { glob } from "glob";
import { promisify } from "util";
import * as fs from "fs";
import { basename } from "path";
import { log } from "../util/log";
import { createSpinner, Spinner } from "nanospinner";
import { Argument } from "../@types/Argument";

export class CLI {
  public log: log;
  public argsDir: string[];
  public sleep: (ms: number, message: string) => Promise<Spinner>;
  constructor(log: log) {
    this.log = log;
    const sleep = async (ms = 2000, message) => {
      const sleepF = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
      let spinner = createSpinner(message).start();
      await sleepF(ms);
      return spinner;
    };
    this.sleep = sleep;
  }
  async start() {
    const files = await this.loadFiles("dist/args");
    this.argsDir = files;
    this.log.logTit();
    files.forEach(async (file) => {
      const arg: Argument = require(`${process
        .cwd()
        .replace(/\\/g, "/")}/dist/args/${file}`).default;
      if ((file as string) == "none.js") {
        if (args.length == 0) {
          arg.execute();
          return;
        }
      }
      if (arg.name == args[0]) {
        await arg.execute();
      }
    });
  }
  async loadFiles(dirName: string) {
    const Files = fs.readdirSync(
      `${process.cwd().replace(/\\/g, "/")}/${dirName}`
    );
    Files.forEach(
      (file) =>
        delete require.cache[
          require.resolve(
            `${process.cwd().replace(/\\/g, "/")}/dist/args/${file as string}`
          )
        ]
    );
    return Files as string[];
  }
}
