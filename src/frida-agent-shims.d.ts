/** Ambient shims for Frida agent compile (no DOM lib). */
declare const console: {
  log(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  info(...args: any[]): void
  debug(...args: any[]): void
}
