import { log } from "..";
import { Argument } from "../@types/Argument";

export default {
  execute() {
    log.info(
      "It looks that you didn't supply the command with any arguments. Consider using a help argument."
    );
  },
} as Argument;
