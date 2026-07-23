#!/usr/bin/env node
/**
 * Wrapper for @chatie/git-scripts pre-push (hook logic unchanged).
 *
 * On Windows, shelljs sync exec runs git under cmd.exe, where `^` is an
 * escape character. That turns the hook's `HEAD^0` into `HEAD0`.
 * Inject Git Bash as shelljs.exec's `shell` option so the original hook works.
 */
'use strict'

const fs = require('fs')
const path = require('path')

function findGitBash () {
  const candidates = [
    process.env.GIT_BASH,
    process.env.SHELL,
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
  ].filter(Boolean)

  for (const candidate of candidates) {
    const base = path.basename(candidate).toLowerCase()
    if (base === 'bash' || base === 'bash.exe') {
      if (fs.existsSync(candidate)) return candidate
    }
  }
  return null
}

if (process.platform === 'win32') {
  const bash = findGitBash()
  if (!bash) {
    console.warn(
      '[pre-push] Git Bash not found; HEAD^0 may break under cmd.exe. '
      + 'Install Git for Windows or set GIT_BASH to bash.exe.',
    )
  } else {
    const shelljs = require('shelljs')
    const originalExec = shelljs.exec
    shelljs.exec = function patchedExec (command, options, callback) {
      if (typeof options === 'function') {
        callback = options
        options = { shell: bash }
      } else if (options == null) {
        options = { shell: bash }
      } else {
        options = Object.assign({}, options, { shell: bash })
      }
      return originalExec.call(this, command, options, callback)
    }
  }
}

// Original @chatie/git-scripts pre-push (same as npx git-scripts-pre-push)
require(path.join(
  path.dirname(require.resolve('@chatie/git-scripts/package.json')),
  'dist',
  'bin',
  'pre-push.js',
))
