#!/usr/bin/env node
import { CLI } from "./classes/cli";
import * as logger from "./util/log";

export const log = new logger.log();
export const cli = new CLI(log);

(async () => {
  await cli.start();
})();
