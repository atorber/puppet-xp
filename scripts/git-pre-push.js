#!/usr/bin/env node
/**
 * Windows-safe pre-push hook.
 *
 * Replaces `npx git-scripts-pre-push` (@chatie/git-scripts), which runs:
 *   git log ... HEAD^0
 * On Windows cmd.exe, `^` is an escape character, so `HEAD^0` becomes `HEAD0`
 * and the hook fails before push.
 *
 * This script intentionally does not auto-bump package version on push.
 */
'use strict'

if (process.env.NO_HOOK || process.env.CHATIE_INNER_PRE_HOOK) {
  process.exit(0)
}

console.info('[pre-push] ok')
process.exit(0)
