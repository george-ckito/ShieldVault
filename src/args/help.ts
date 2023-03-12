import { cli, log } from "..";
import ascii from "ascii-table";
import { Argument } from "../@types/Argument";

export default {
  name: "help",
  description: "Displays all arguments",
  execute() {
    // log.fatal("hey mf u passed help");
    const table = new ascii().setHeading("Argument", "Description");
    const argsDir = cli.argsDir;
    argsDir.forEach((file) => {
      const arg = require(`${process.cwd().replace(/\\/g, "/")}/dist/args/${
        file as string
      }`).default;
      if (file == "none.js") return;
      table.addRow(arg.name, arg.description);
    });
    return console.log(table.toString());
  },
} as Argument;
