# Wechaty Puppet XP

[![Join Wechaty Discord Developer Community](https://img.shields.io/discord/916984413944967180?logo=discord&style=flat)](https://discord.gg/uE8Tb77VBm)
[![NPM](https://github.com/wechaty/wechaty-puppet-xp/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty/actions?query=workflow%3ANPM)
[![NPM Version](https://img.shields.io/npm/v/wechaty-puppet-xp?color=brightgreen)](https://www.npmjs.com/package/wechaty-puppet-xp)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-xp/next.svg)](https://www.npmjs.com/package/wechaty-puppet-xp?activeTab=versions)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/wechaty/wechaty)
[![Powered by Sidecar](https://img.shields.io/badge/Powered%20By-Sidecar-red.svg)](https://github.com/huan/sidecar)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/wechaty-puppet-xp.svg?style=flat-square)](https://www.npmjs.com/package/wechaty)
[![GitHub stars](https://img.shields.io/github/stars/wechaty/wechaty-puppet-xp.svg?label=github%20stars)](https://github.com/wechaty/wechaty)
[![Gitter](https://badges.gitter.im/wechaty/wechaty.svg)](https://gitter.im/wechaty/wechaty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<img src="https://github.com/atorber/puppet-xp/assets/19552906/ac34b791-bfff-4beb-9631-088939d40465" alt="chatie puppet xp" width="300" height="300" align="bottom" style="border-radius: 24px;" />

- Official website: <https://wechaty.js.org/docs/puppet-providers/xp>
- Join XP Discord: <https://discord.gg/uE8Tb77VBm>

## WECHATY PUPPET YOUTH STAR

wechaty-puppet-xp is a local puppet for Wechaty:

1. If you are a user of Windows, you can use this puppet to implement your chatbot.
2. It's a completely free service and doesn't need token.

## GETTING STARTED

- STEP 1: Install WeChat client on your Windows computer.

> Current latest (`2.2.x`) supports WeChat **v3.9.10.27**. Always install the npm / repo version that matches your WeChat client (see [VERSION SUPPORT](#version-support)). Recommended Node.js: **18 LTS**.

- STEP 2: Login the WeChat client on the computer.
- STEP 3: Getting Started with TypeScript/JavaScript (RECOMMENDED).

```sh
# Official upstream
git clone https://github.com/wechaty/wechaty-puppet-xp.git
# Or active development fork: https://github.com/atorber/puppet-xp.git
cd wechaty-puppet-xp

# Install dependencies
npm install

# Start (WeChat must be installed with the required version and already logged in)
npm start
```

| Run | Source code | Description |
| :------------- |:-------------| :-----|
| `npm start` | [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) | Puppet ding/dong |
| `npm run start:ripe` | [examples/ripe-wechaty.ts](examples/ripe-wechaty.ts) | Wechaty ding/dong |
| `npm run start:raw` | [examples/raw-sidecar.ts](examples/raw-sidecar.ts) | Sidecar ding/dong |

## RUNNING WITH NPM

puppet-xp is also published on NPM. Running with NPM and more examples: [wechaty-puppet-xp-getting-started](https://github.com/atorber/wechaty-puppet-xp-getting-started).

## PUPPET COMPARISON

XP is a young puppet, it keeps growing and improving.

版本|3.3.0.115|3.6.0.18|3.9.2.23|3.9.10.27|
:---|:---|:---|:---|:---|
**<消息>**|
接收文本|✅|✅|✅|✅
接收图片|✅|✅|✅
接收文件|✅|✅|✅|✅
接收动图|✅|✅|✅|✅
接收表情|✅|✅|✅|✅
接收小程序卡片|✅|✅|✅
接收联系人卡片|✅|✅|✅
接收位置卡片|✅|✅|✅
发送文本|✅|✅|✅|✅
发送图片|✅|✅|✅
发送文件|✅|✅|✅
发送动图|✅|✅|✅
**<群组>**|
@群成员|✅|✅|✅
群列表|✅|✅|✅|✅
群成员列表|✅|✅|✅
群详情|✅|✅|✅
进群提示|✅|✅|✅
**<联系人>**|
好友列表|✅|✅|✅|✅
好友详情|✅|✅|✅
**<其他>**|
登录事件|✅|✅|✅|✅
扫码登录|||✅

## VERSION SUPPORT

Note: You need to install an NPM / repo version that matches your WeChat client version.

| puppet-xp | WeChat | npm install |
|:---|:---|:---|
| 2.2.1 (latest) | [WeChat-v3.9.10.27](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.10.27/WeChatSetup-3.9.10.27.exe) | `npm i wechaty-puppet-xp@2.2.1` |
| 2.1.1 | [WeChat-v3.9.10.27](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.10.27/WeChatSetup-3.9.10.27.exe) | `npm i wechaty-puppet-xp@2.1.1` |
| 1.13.12 | [WeChat-v3.9.2.23](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.2.23/WeChatSetup-3.9.2.23.exe) | `npm i wechaty-puppet-xp@1.13.12` |
| 1.12.7 | [WeChat-v3.6.0.18](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe) | `npm i wechaty-puppet-xp@1.12.7` |
| 1.11.14 | [WeChat-v3.3.0.115](https://github.com/wechaty/wechaty-puppet-xp/releases/download/v0.5/WeChatSetup-v3.3.0.115.exe) | `npm i wechaty-puppet-xp@1.11.14` |

## 常见问题 (FAQ)

### 1. 微信版本与 npm 包版本不匹配

本项目依赖 Frida Hook，**微信客户端版本必须与 puppet-xp 版本对应**，见上方 [VERSION SUPPORT](#version-support)。

- 微信 `3.9.10.27` → 使用本仓库当前代码 / `wechaty-puppet-xp@2.2.1`（或 `2.1.1+`）
- 启动前请先打开并登录对应版本的微信

### 2. `nvm use` 后 `node -v` 仍是旧版本（Windows）

常见原因：系统里同时安装了官方 Node（如 `C:\Program Files\nodejs`），且排在 PATH 前面，覆盖了 nvm 的 symlink。

处理建议：

1. 卸载官方 Node，或从用户/系统 PATH 中移除 `C:\Program Files\nodejs`
2. 确认环境变量：
   - `NVM_HOME` = nvm 安装目录（如 `%APPDATA%\nvm`）
   - `NVM_SYMLINK` = `C:\Program Files (x86)\nodejs`
3. **完全退出并重启终端 / Cursor**，再执行：

```powershell
nvm use 18.20.5
node -v
where.exe node
```

`where.exe node` 第一条应指向 nvm 的 symlink，而不是 `C:\Program Files\nodejs`。

推荐使用 **Node.js 18 LTS**（如 `18.20.5`）安装与运行本项目。

### 3. `npm install` 失败：`leveldown` / `node-gyp` / 找不到 Visual Studio

原生模块编译需要 Windows C++ 构建环境。请安装 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)，并勾选 **Desktop development with C++**。

参考：<https://github.com/nodejs/node-gyp#on-windows>

### 4. `Cannot find module 'bindings'` 或 `Could not locate the bindings file`（frida）

说明 `frida` 依赖不完整，或原生 `.node` 文件未下载成功（常见于访问 GitHub 超时）。

可尝试：

```powershell
# 清理后重装（需网络能访问 frida 预编译包）
Remove-Item -Recurse -Force node_modules\frida -ErrorAction SilentlyContinue
npm install frida@16.7.10
```

若直连 GitHub 超时，可改用镜像下载对应平台的预编译包，解压到：

`node_modules/frida/build/Release/frida_binding.node`

（frida 16.x 也可能是 `node_modules/frida/build/frida_binding.node`）

验证（本仓库 `"type": "module"`，验证时用 `createRequire`）：

```powershell
node --input-type=module -e "import { createRequire } from 'module'; import { pathToFileURL } from 'url'; const require = createRequire(pathToFileURL(process.cwd() + '/package.json')); console.log(require('frida/package.json').version); require('frida'); console.log('frida ok')"
```

### 5. `refused to load frida-agent, or terminated during injection`

注入微信进程失败。本仓库依赖的 `sidecar` 默认会拉到较旧的 `frida@15.x`，在部分环境（含 Windows on ARM）上可能无法注入；**Frida 16.7.10** 通常可正常 attach。

本仓库已通过 `dependencies` + `overrides` 将 `frida` 固定为 `16.7.10`。若你仍落在 15.x，请确认：

```powershell
npm ls frida
# 应为 frida@16.7.10
```

其他排查：

1. 微信已启动并已登录，版本与 puppet 匹配
2. 关闭或排除 Windows Defender 对项目目录 / Frida 的拦截后重试
3. 必要时以管理员权限运行终端再执行 `npm start`

### 6. `npm start` 一直停在 `Please wait... I'm trying to login in...`

优先检查：

1. 微信是否已打开并登录
2. 微信版本是否与当前 puppet 一致（见 VERSION SUPPORT）
3. `npm ls frida` 是否为 `16.7.10`，以及 Frida 能否 attach：

```powershell
node --input-type=module -e "import { createRequire } from 'module'; import { pathToFileURL } from 'url'; import { execSync } from 'child_process'; const require = createRequire(pathToFileURL(process.cwd() + '/package.json')); const frida = require('frida'); const pid = execSync('powershell -NoProfile -Command \"(Get-Process WeChat | Select -First 1).Id\"').toString().trim(); const s = await frida.attach(Number(pid)); console.log('attach OK', s.pid); await s.detach();"
```

### 7. `git push` 失败：`ambiguous argument 'HEAD0'`（Windows，仅贡献者）

> 仅在向本仓库执行 `git push` 时相关；使用 npm 包的普通用户可忽略。

`@chatie/git-scripts` 的 pre-push 逻辑没有问题，命令是 `git log ... HEAD^0`。  
失败原因是：hook 通过 `shelljs` 调用 git 时，在 Windows 默认走 `cmd.exe`，`^` 被当成转义符，`HEAD^0` 变成了 `HEAD0`。

处理：`scripts/git-pre-push.cjs` 在调用原 hook 前，为 `shelljs.exec` 注入 Git Bash 作为 `shell`（不改 `@chatie/git-scripts` 行为）。

请安装 [Git for Windows](https://git-scm.com/download/win)，或设置 `GIT_BASH` 指向 `bash.exe`。

## HISTORY

### v2.2.1

1. Pin `frida@16.7.10` (via `dependencies` + `overrides`) to fix inject failures on some Windows environments
2. Add agent build `tsconfig.agent.json` to avoid DOM / `@types/frida-gum` type conflicts
3. Add FAQ for Node/nvm PATH, native build tools, Frida install, and Windows pre-push (`HEAD0`)
4. Windows pre-push wrapper: run `@chatie/git-scripts` under Git Bash via `scripts/git-pre-push.cjs`

### v2.1.1

1. Support WeChat version 3.9.10.27
2. Support list
    - getMyselfInfo
    - contactList
    - sendMsg
    - recvMsg

### v2.0.0

1. Support WeChat version 3.9.10.19
2. Support list
    - getMyselfInfo
    - sendMsg
    - recvMsg

### v1.13.12

1. Fixed the bug where the system crashes upon receiving a message before successful startup

### v1.13.9

1. Add setting for contact remark
2. Optimize sample code

### v1.13.0 (September 21, 2023)

1. This version start to support WeChat v3.9.2.23,need to update WeChat on your pc to 3.9.2.23
2. [WeChatSetup-v3.9.2.23.exe](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.2.23/WeChatSetup-3.9.2.23.exe)

### main v1.12.7 (November 22, 2022)

1. This version start to support WeChat v3.6.0.18,need to update WeChat on your pc to 3.6.0.18
2. [WeChatSetup-v3.6.0.18.exe](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe)

### v1.11.14

the last version base WeChat 3.3.0.115, next version will support WeChat 3.6.0.18

### v1.0

wechaty 1.xx support

### v0.5

1. ES Module support
2. [WeChatSetup-v3.3.0.115.exe](https://github.com/wechaty/wechaty-puppet-xp/releases/download/v0.5/WeChatSetup-v3.3.0.115.exe)

### v0.4.7 (Aug 15, 2021)

1. Support send files.
2. Support forward text message.

### v0.4.2 (Aug 10, 2021)

Support room.say(text, ...mentionList), you can at RoomMember.

### v0.4 (Aug 9, 2021)

1. Added some support for classes Contact and Room
2. Support bot.Contact.findAll()/bot.Contact.find(query)
3. Support bot.Room.findAll()/bot.Room.find(query)

### v0.2 (July 23, 2021)

1. Code clean
2. Fix all unit tests
3. Run unit testings under Windows
4. Deploy to NPM with GitHub actions
5. [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) works on Windows!
6. [examples/raw-sidecar.ts](examples/raw-sidecar.ts) works on Windows!
7. [wechaty-getting-started](https://github.com/wechaty/wechaty-getting-started) supports `WECHATY_PUPPET=wechaty-puppet-xp` now.

### v0.0.1 (July 19, 2021)

Initial version: <https://wechaty.js.org/docs/puppet-providers/xp>

Blogs:

- [喜讯：使用Windows微信桌面版协议登录，wechaty免费版协议即将登场, @atorber, Jul 05, 2021](https://wechaty.js.org/2021/07/05/puppet-laozhang-wechat-bot/)
- [全新的Windows puppet项目wechaty-puppet-xp启动, @atorber, Jul 13, 2021](https://wechaty.js.org/2021/07/13/wechaty-puppet-xp-start-up/)
- [code如诗，bot如歌，由Wechaty引发的一个小白冒险之旅, @老张学技术, Jul 05, 2021](https://wechaty.js.org/2021/07/05/code-like-poetry-bot-like-song/)

## Author

1. Hua ZHANG [@cixingguangming55555](https://github.com/cixingguangming55555)
2. Yuchao LU [@atorber](https://github.com/atorber)

## Copyright & License

- Code & Docs © 2021 Wechaty Contributors
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
