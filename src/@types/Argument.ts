export type Argument = {
  name: string | null;
  description: string | null;
  execute: (() => Promise<void>) | (() => null);
};
