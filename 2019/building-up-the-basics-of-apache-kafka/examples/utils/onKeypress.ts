// Adapted from https://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/

import readline, { Key } from "readline";

type CallbackFn = (str: string, key: Key) => void;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const onKeypress = (callback: CallbackFn) => {
  process.stdin.on("keypress", callback);
};

export default onKeypress;
