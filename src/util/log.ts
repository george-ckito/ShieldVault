import { version, name } from "../../package.json";
import chalk from "chalk";

export class log {
  private debu;
  private warnC;
  private infoC;
  private erro;
  private fata;
  private v;
  private text;
  constructor() {
    this.debu = chalk.rgb(86, 99, 202);
    this.warnC = chalk.rgb(225, 243, 156);
    this.infoC = chalk.rgb(127, 219, 199);
    this.erro = chalk.rgb(210, 110, 133);
    this.fata = chalk.rgb(141, 99, 149);
    this.text = chalk.rgb(214, 214, 214);
    this.v = chalk.rgb(179, 171, 171);
  }
  logTit() {
    console.log(
      `${chalk.rgb(209, 77, 77)("ShieldVault")} ${this.v(`v${version}`)}`
    );
  }
  debug(text: string) {
    console.log(`${this.debu("DEBU")} ${this.text(text)}`);
  }
  warn(text: string) {
    console.log(`${this.warnC("WARN")} ${this.text(text)}`);
  }
  info(text: string) {
    console.log(`${this.infoC("INFO")} ${this.text(text)}`);
  }
  error(text: string) {
    console.log(`${this.erro("ERRO")} ${this.text(text)}`);
  }
  fatal(text: string) {
    console.log(`${this.fata("FATA")} ${this.text(text)}`);
  }
}
