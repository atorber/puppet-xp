/* eslint-disable sort-keys */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-undef */

/**
 * WeChat 3.9.2.23
 *  > Special thanks to: @cixingguangming55555 老张学技术
 * Credit: https://github.com/cixingguangming55555/wechat-bot
 */

// https://blog.csdn.net/iloveitvm/article/details/109119687  frida学习

// 偏移地址,来自于wxhelper项目
const wxOffsets = {
  snsDataMgr: {
    WX_SNS_DATA_MGR_OFFSET: 0xc39680,
  },
  chatRoomMgr: {
    WX_CHAT_ROOM_MGR_OFFSET: 0x78cf20,
  },
  contactMgr: {
    WX_CONTACT_MGR_OFFSET: 0x75a4a0,
  },
  syncMgr: {
    WX_SYNC_MGR_OFFSET: 0xa87fd0,
  },
  preDownloadMgr: {
    WX_GET_PRE_DOWNLOAD_MGR_OFFSET: 0x80f110,
  },
  chatMgr: {
    WX_CHAT_MGR_OFFSET: 0x792700,
  },
  videoMgr: {
    WX_VIDEO_MGR_OFFSET: 0x829820,
  },
  patMgr: {
    WX_PAT_MGR_OFFSET: 0x931730,
  },
  searchContactMgr: {
    WX_SEARCH_CONTACT_MGR_OFFSET: 0xa6cb00,
  },
  appMsgMgr: {
    WX_APP_MSG_MGR_OFFSET: 0x76ae20,
  },
  sendMessageMgr: {
    WX_SEND_MESSAGE_MGR_OFFSET: 0x768140,
  },
  setChatMsgValue: {
    WX_INIT_CHAT_MSG_OFFSET: 0xf59e40,
  },
  chatMsg: {
    WX_NEW_CHAT_MSG_OFFSET: 0x76f010,
    WX_FREE_CHAT_MSG_OFFSET: 0x756960,
    WX_FREE_CHAT_MSG_2_OFFSET: 0x6f4ea0,
    WX_FREE_CHAT_MSG_INSTANCE_COUNTER_OFFSET: 0x756e30,
  },
  sns: {
    WX_SNS_GET_FIRST_PAGE_OFFSET: 0x14e2140,
    WX_SNS_GET_NEXT_PAGE_OFFSET: 0x14e21e0,
  },
  chatRoom: {
    WX_GET_CHAT_ROOM_DETAIL_INFO_OFFSET: 0xbde090,
    WX_NEW_CHAT_ROOM_INFO_OFFSET: 0xe99c40,
    WX_FREE_CHAT_ROOM_INFO_OFFSET: 0xe99f40,
    WX_DEL_CHAT_ROOM_MEMBER_OFFSET: 0xbd22a0,
    WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET: 0xbd1dc0,
    WX_INIT_CHAT_ROOM_OFFSET: 0xe97890,
    WX_FREE_CHAT_ROOM_OFFSET: 0xe97ab0,
    WX_GET_MEMBER_FROM_CHAT_ROOM_OFFSET: 0xbdf260,
    WX_MOD_CHAT_ROOM_MEMBER_NICK_NAME_OFFSET: 0xbd9680,
    WX_TOP_MSG_OFFSET: 0xbe1840,
    WX_REMOVE_TOP_MSG_OFFSET: 0xbe1620,
    WX_GET_MEMBER_NICKNAME_OFFSET: 0xbdf3f0, // 0xbdf3f0 0xb703f0
    WX_FREE_CONTACT_OFFSET: 0xea7880,
  },
  wcpayinfo: {
    WX_NEW_WCPAYINFO_OFFSET: 0x7b2e60,
    WX_FREE_WCPAYINFO_OFFSET: 0x79c250,
    WX_CONFIRM_RECEIPT_OFFSET: 0x15e2c20,
  },
  contact: {
    WX_CONTACT_GET_LIST_OFFSET: 0xc089f0,
    WX_CONTACT_DEL_OFFSET: 0xb9b3b0,
    WX_SET_VALUE_OFFSET: 0x1f80900,
    WX_DO_DEL_CONTACT_OFFSET: 0xca6480,
    WX_GET_CONTACT_OFFSET: 0xc04e00,
    WX_DO_VERIFY_USER_OFFSET: 0xc02100,
    WX_VERIFY_MSG_OFFSET: 0xf59d40,
    WX_VERIFY_OK_OFFSET: 0xa18bd0,
    WX_NEW_ADD_FRIEND_HELPER_OFFSET: 0xa17d50,
    WX_FREE_ADD_FRIEND_HELPER_OFFSET: 0xa17e70,
  },
  pushAttachTask: {
    WX_PUSH_ATTACH_TASK_OFFSET: 0x82bb40,
    WX_FREE_CHAT_MSG_OFFSET: 0x756960,
    WX_GET_MGR_BY_PREFIX_LOCAL_ID_OFFSET: 0xbc0370,
    WX_GET_CURRENT_DATA_PATH_OFFSET: 0xc872c0,
    WX_APP_MSG_INFO_OFFSET: 0x7b3d20,
    WX_GET_APP_MSG_XML_OFFSET: 0xe628a0,
    WX_FREE_APP_MSG_INFO_OFFSET: 0x79d900,
    WX_PUSH_THUMB_TASK_OFFSET: 0x82ba40,
    WX_DOWNLOAD_VIDEO_IMG_OFFSET: 0xd46c30,
  },
  // pat
  pat: {
    WX_SEND_PAT_MSG_OFFSET: 0x1421940,
    WX_RET_OFFSET: 0x1D58751,
  },
  // search hook
  searchHook: {
    WX_SEARCH_CONTACT_ERROR_CODE_HOOK_OFFSET: 0xe17054,
    WX_SEARCH_CONTACT_ERROR_CODE_HOOK_NEXT_OFFSET: 0xf57a20,
    WX_SEARCH_CONTACT_DETAIL_HOOK_OFFSET: 0xa8ceb0,
    WX_SEARCH_CONTACT_DETAIL_HOOK_NEXT_OFFSET: 0xa8d100,
    WX_SEARCH_CONTACT_OFFSET: 0xcd1510,
  },
  // login
  login: {
    WX_LOGIN_URL_OFFSET: 0x3AD1070, // 3.9.5.81
    WX_LOGOUT_OFFSET: 0xe58870,
    WX_ACCOUNT_SERVICE_OFFSET: 0x768c80,
    WX_GET_APP_DATA_SAVE_PATH_OFFSET: 0xf3a610,
    WX_GET_CURRENT_DATA_PATH_OFFSET: 0xc872c0,
  },
  myselfInfo: {
    WX_SELF_ID_OFFSET: 0x2FFD484,
  },
  // forward
  forward: {
    WX_FORWARD_MSG_OFFSET: 0xce6730,
  },
  // send file
  sendFile: {
    WX_SEND_FILE_OFFSET: 0xb6d1f0,
  },
  // send image
  sendImage: {
    WX_SEND_IMAGE_OFFSET: 0xce6640,
  },
  // send text
  sendText: {
    WX_SEND_TEXT_OFFSET: 0xce6c80,
  },
  // ocr
  ocr: {
    WX_INIT_OBJ_OFFSET: 0x80a800,
    WX_OCR_MANAGER_OFFSET: 0x80f270,
    WX_DO_OCR_TASK_OFFSET: 0x13da3e0,
  },
  storage: {
    CONTACT_G_PINSTANCE_OFFSET: 0x2ffddc8,
    DB_MICRO_MSG_OFFSET: 0x68,
    DB_CHAT_MSG_OFFSET: 0x1C0,
    DB_MISC_OFFSET: 0x3D8,
    DB_EMOTION_OFFSET: 0x558,
    DB_MEDIA_OFFSET: 0x9B8,
    DB_BIZCHAT_MSG_OFFSET: 0x1120,
    DB_FUNCTION_MSG_OFFSET: 0x11B0,
    DB_NAME_OFFSET: 0x14,
    STORAGE_START_OFFSET: 0x13f8,
    STORAGE_END_OFFSET: 0x13fc,
    PUBLIC_MSG_MGR_OFFSET: 0x303df74,
    MULTI_DB_MSG_MGR_OFFSET: 0x30403b8,
    FAVORITE_STORAGE_MGR_OFFSET: 0x303fd40,
    FTS_FAVORITE_MGR_OFFSET: 0x2ffe908,
    OP_LOG_STORAGE_VFTABLE: 0x2AD3A20,
    CHAT_MSG_STORAGE_VFTABLE: 0x2AC10F0,
    CHAT_CR_MSG_STORAGE_VFTABLE: 0x2ABEF14,
    SESSION_STORAGE_VFTABLE: 0x2AD3578,
    APP_INFO_STORAGE_VFTABLE: 0x2ABCC58,
    HEAD_IMG_STORAGE_VFTABLE: 0x2ACD9DC,
    HEAD_IMG_URL_STORAGE_VFTABLE: 0x2ACDF70,
    BIZ_INFO_STORAGE_VFTABLE: 0x2ABD718,
    TICKET_INFO_STORAGE_VFTABLE: 0x2AD5400,
    CHAT_ROOM_STORAGE_VFTABLE: 0x2AC299C,
    CHAT_ROOM_INFO_STORAGE_VFTABLE: 0x2AC245C,
    MEDIA_STORAGE_VFTABLE: 0x2ACE998,
    NAME_2_ID_STORAGE_VFTABLE: 0x2AD222C,
    EMOTION_PACKAGE_STORAGE_VFTABLE: 0x2AC6400,
    EMOTION_STORAGE_VFTABLE: 0x2AC7018,
    BUFINFO_STORAGE_VFTABLE: 0x2AC3178,
    CUSTOM_EMOTION_STORAGE_VFTABLE: 0x2AC4E90,
    DEL_SESSIONINFO_STORAGE_VFTABLE: 0x2AC5F98,
    FUNCTION_MSG_STORAGE_VFTABLE: 0x2ACD10C,
    FUNCTION_MSG_TASK_STORAGE_VFTABLE: 0x2ACC5C8,
    REVOKE_MSG_STORAGE_VFTABLE: 0x2AD27BC,
  },
  hookImage: {
    WX_HOOK_IMG_OFFSET: 0xd723dc,
    WX_HOOK_IMG_NEXT_OFFSET: 0xe91d90,
  },
  hookLog: {
    WX_HOOK_LOG_OFFSET: 0xf57d67,
    WX_HOOK_LOG_NEXT_OFFSET: 0x240ea71,
  },
  hookMsg: {
    WX_RECV_MSG_HOOK_OFFSET: 0xd19a0b,
    WX_RECV_MSG_HOOK_NEXT_OFFSET: 0x756960,
    WX_SNS_HOOK_OFFSET: 0x14f9e15,
    WX_SNS_HOOK_NEXT_OFFSET: 0x14fa0a0,
  },
  hookVoice: {
    WX_HOOK_VOICE_OFFSET: 0xd4d8d8,
    WX_HOOK_VOICE_NEXT_OFFSET: 0x203d130,
  },
}

const offsets = {
  kGetAccountServiceMgr: 0x8c1230,
  kSyncMsg: 0xc39680,
  kSyncMsgNext: 0xc39680,
  kGetCurrentDataPath: 0xf5d130,
  kGetAppDataSavePath: 0x12d7040,
  kGetSendMessageMgr: 0x8c00e0,
  kSendTextMsg: 0xfcd8d0,
  kFreeChatMsg: 0x8aaa00,
  kDoAddMsg: 0x1010d80,
  kSendImageMsg: 0xfc3d30,
  kChatMsgInstanceCounter: 0x8c7fd0,
  kSendFileMsg: 0xdd27f0,
  kGetAppMsgMgr: 0x8c33f0,
  kGetContactMgr: 0x8ae3d0,
  kGetContactList: 0xeab270,
  k_sqlite3_exec: 0x252e340,
  k_sqlite3_prepare: 0x2535eb0,
  k_sqlite3_open: 0x256d6b0,
  k_sqlite3_backup_init: 0x24e8450,
  k_sqlite3_errcode: 0x256bfb0,
  k_sqlite3_close: 0x256a110,
  k_sqlite3_step: 0x24f2350,
  k_sqlite3_column_count: 0x24f2b70,
  k_sqlite3_column_name: 0x24f3570,
  k_sqlite3_column_type: 0x24f33c0,
  k_sqlite3_column_blob: 0x24f2ba0,
  k_sqlite3_column_bytes: 0x24f2c90,
  k_sqlite3_finalize: 0x24f1400,
  kGPInstance: 0x3a6f908,
  kMicroMsgDB: 0xb8,
  kChatMsgDB: 0x2c8,
  kMiscDB: 0x5f0,
  kEmotionDB: 0x838,
  kMediaDB: 0xef8,
  kBizchatMsgDB: 0x1a70,
  kFunctionMsgDB: 0x1b48,
  kDBName: 0x28,
  kStorageStart: 0x0,
  kStorageEnd: 0x0,
  kMultiDBMgr: 0x3acfb68,
  kPublicMsgMgr: 0x3acc268,
  kFavoriteStorageMgr: 0x3acf0d0,
  kChatRoomMgr: 0x8e9d30,
  kGetChatRoomDetailInfo: 0xe73590,
  kNewChatRoomInfo: 0x12006b0,
  kFreeChatRoomInfo: 0x1200890,
  kDoAddMemberToChatRoom: 0xe63c70,
  kDoModChatRoomMemberNickName: 0xe6db00,
  kDelMemberFromChatRoom: 0xe64290,
  kGetMemberFromChatRoom: 0xe74de0,
  kNewChatRoom: 0x11fde50,
  kFreeChatRoom: 0x11fe030,
  kTopMsg: 0xa5e4f0,
  kRemoveTopMsg: 0xe787b0,
  kInviteMember: 0xe63650,
  kHookLog: 0x1304e60,
  kCreateChatRoom: 0xe63340,
  kQuitChatRoom: 0xe6e3b0,
  kForwardMsg: 0xfcd0f0,
  kOnSnsTimeLineSceneFinish: 0x1a73150,
  kSNSGetFirstPage: 0x1a51dd0,
  kSNSGetNextPageScene: 0x1a77240,
  kSNSDataMgr: 0xeebda0,
  kSNSTimeLineMgr: 0x19e83a0,
  kGetMgrByPrefixLocalId: 0xe4add0,
  kAddFavFromMsg: 0x1601520,
  kGetChatMgr: 0x8f0400,
  kGetFavoriteMgr: 0x8c69b0,
  kAddFavFromImage: 0x160b920,
  kGetContact: 0xEA5F90,
  kNewContact: 0x1212e40,
  kFreeContact: 0x12134e0,
  kNewMMReaderItem: 0x8c79a0,
  kFreeMMReaderItem: 0x8c6da0,
  kForwordPublicMsg: 0xddc6c0,
  kParseAppMsgXml: 0x11b0a70,
  kNewAppMsgInfo: 0x91a550,
  kFreeAppMsgInfo: 0x8fd1a0,
  kGetPreDownLoadMgr: 0x9996f0,
  kPushAttachTask: 0x9c0080,
  kGetCustomSmileyMgr: 0x915c00,
  kSendCustomEmotion: 0xec0a40,
  kNewJsApiShareAppMessage: 0x13be1a0,
  kInitJsConfig: 0x137bc00,
  kSendApplet: 0x13c0920,
  kSendAppletSecond: 0x13c1150,
  kGetAppInfoByWaid: 0x13c5790,
  kCopyShareAppMessageRequest: 0x13c0670,
  kNewWAUpdatableMsgInfo: 0x919ca0,
  kFreeWAUpdatableMsgInfo: 0x8fc230,
  kSendPatMsg: 0x195f340,
  kGetOCRManager: 0x999780,
  kDoOCRTask: 0x190b2a0
};

// 当前支持的微信版本
const availableVersion = 1661534801 // 3.9.5.81
let isLoggedIn = 0
const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
console.log('moduleBaseAddress:', moduleBaseAddress)

/* -----------------base------------------------- */
console.log('开始初始化微信基础函数...')

let retidPtr: any = null
let retidStruct: any = null
const initidStruct = (str: any) => {
  retidPtr = Memory.alloc(str.length * 2 + 1)
  retidPtr.writeUtf16String(str)

  retidStruct = Memory.alloc(0x14) // returns a NativePointer

  retidStruct
    .writePointer(retidPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return retidStruct
}

let retPtr: any = null
let retStruct: any = null
const initStruct = (str: any) => {
  retPtr = Memory.alloc(str.length * 2 + 1)
  retPtr.writeUtf16String(str)

  retStruct = Memory.alloc(0x14) // returns a NativePointer

  retStruct
    .writePointer(retPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return retStruct
}

let msgstrPtr: any = null
let msgStruct: any = null
const initmsgStruct = (str: any) => {
  msgstrPtr = Memory.alloc(str.length * 2 + 1)
  msgstrPtr.writeUtf16String(str)

  msgStruct = Memory.alloc(0x14) // returns a NativePointer

  msgStruct
    .writePointer(msgstrPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return msgStruct
}

let atStruct: any = null
const initAtMsgStruct = (wxidStruct: any) => {
  atStruct = Memory.alloc(0x10)

  atStruct.writePointer(wxidStruct).add(0x04)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)// 0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
    .writeU32(0)
  return atStruct
}

const readStringPtr = (address: any) => {
  const addr: any = ptr(address)
  const size = addr.add(16).readU32()
  const capacity = addr.add(20).readU32()
  addr.ptr = addr
  addr.size = size
  addr.capacity = capacity
  if (capacity > 15 && !addr.readPointer().isNull()) {
    addr.ptr = addr.readPointer()
  }
  addr.ptr._readCString = addr.ptr.readCString
  addr.ptr._readAnsiString = addr.ptr.readAnsiString
  addr.ptr._readUtf8String = addr.ptr.readUtf8String
  addr.readCString = () => {
    return addr.size ? addr.ptr._readCString(addr.size) : ''
  }
  addr.readAnsiString = () => {
    return addr.size ? addr.ptr._readAnsiString(addr.size) : ''
  }
  addr.readUtf8String = () => {
    return addr.size ? addr.ptr._readUtf8String(addr.size) : ''
  }

  // console.log('readStringPtr() address:',address,' -> str ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readStringPtr() str:' , addr.readUtf8String())
  // console.log('readStringPtr() address:', addr,'dump:', addr.readByteArray(24))

  return addr
}

const readWStringPtr = (address: any) => {
  const addr: any = ptr(address)
  const size = addr.add(4).readU32()
  const capacity = addr.add(8).readU32()
  addr.ptr = addr.readPointer()
  addr.size = size
  addr.capacity = capacity
  addr.ptr._readUtf16String = addr.ptr.readUtf16String
  addr.readUtf16String = () => {
    return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : ''
  }

  // console.log('readWStringPtr() address:',address,' -> ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readWStringPtr() str:' ,  `"${addr.readUtf16String()}"`,'\n',addr.ptr.readByteArray(addr.size*2+2),'\n')
  // console.log('readWStringPtr() address:', addr,'dump:', addr.readByteArray(16),'\n')

  return addr
}

const readString = (address: any) => {
  return readStringPtr(address).readUtf8String()
}

const readWideString = (address: any) => {
  return readWStringPtr(address).readUtf16String()
}

console.log('初始化微信基础函数完成')

/* -----------------base------------------------- */

// 获取微信版本号
const getWechatVersionFunction = () => {
  console.log('getWechatVersionFunction begin ...')
  const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
  const results: any = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
  if (results.length === 0) {
    console.log('微信版本号: 0')
    return 0
  }
  const addr = results[0].address
  const ret = addr.add(0x07).readPointer()
  const ver = ret.add(0x0).readU32()
  console.log('微信版本号:', ver)
  return ver
}

// 获取微信版本号字符串
const getWechatVersionStringFunction = () => {
  console.log('getWechatVersionStringFunction begin ...')
  const ver: number = getWechatVersionFunction()
  if (!ver) {
    return '0.0.0.0'
  }
  const vers: number[] = []
  vers.push((ver >> 24) & 255 - 0x60)
  vers.push((ver >> 16) & 255)
  vers.push((ver >> 8) & 255)
  vers.push(ver & 255)
  const versStr = vers.join('.')
  console.log('微信版本号:', versStr)
  return versStr
}

// 检查微信版本是否支持
const checkSupportedFunction = () => {
  console.log('checkSupportedFunction begin ...')
  const ver = getWechatVersionFunction()
  return ver === availableVersion
}

// 检查是否已登录—s
const isLoggedInFunction = () => {
  console.log('isLoggedInFunction begin ...')
  let success = -1
  const accout_service_addr = moduleBaseAddress.add(offsets.kGetAccountServiceMgr)
  const callFunction = new NativeFunction(accout_service_addr, 'pointer', [])
  const service_addr = callFunction()

  // console.log('service_addr:', service_addr)

  try {
    if (!service_addr.isNull()) {
      const loginStatusAddress = service_addr.add(0x7F8)
      success = loginStatusAddress.readU32()
    }
  } catch (e: any) {
    throw new Error(e)
  }
  console.log('isLoggedInFunction res:', success)
  // 813746031、813746031、813746031

  return success
}

// 登录事件回调,登陆状态下每3s检测一次，非登陆状态下不间断检测且每3s打印一次状态，直到登陆成功
const hookLoginEventCallback = (() => {
  console.log('hookLoginEventCallback begin ...')
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
  Interceptor.attach(moduleBaseAddress.add(offsets.kGetAccountServiceMgr), {
    onLeave: function (retval) {
      // console.log('hookLoginEventCallback:', retval)
      if (isLoggedIn !== 1) {
        console.log('当前登陆状态:', isLoggedIn)
        setImmediate(() => nativeativeFunction())
      }
      return retval
    },
  })

  const checkLoginStatus = () => {
    isLoggedIn = isLoggedInFunction()
    console.log('当前登陆状态:', isLoggedIn);
    if (isLoggedIn !== 1) {
      setImmediate(() => nativeativeFunction())
      setTimeout(checkLoginStatus, 30000)  // 每3秒检查一次，直到登陆成功
    } else {
      setImmediate(() => nativeativeFunction())
    }
  }

  setTimeout(checkLoginStatus, 3000)  // 初始延迟3秒启动
  console.log('hookLoginEventCallback end ...')
  return nativeCallback
})()

// 获取登录二维码
const getQrcodeLoginData = () => {
  console.log('getQrcodeLoginData begin ...')
  const getQRCodeLoginMgr = new NativeFunction(moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET), 'pointer', [])
  const qlMgr = getQRCodeLoginMgr()

  const json: any = {
    status: 0,
    uuid: '',
    wxid: '',
    avatarUrl: '',
  }

  if (!qlMgr.isNull()) {
    json.uuid = readString(qlMgr.add(8))
    json.status = qlMgr.add(40).readUInt()
    json.wxid = readString(qlMgr.add(44))
    json.avatarUrl = readString(qlMgr.add(92))
  }
  return json
}

let isReady = false
// 准备就绪回调
const agentReadyCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
  const checkLoginStatus = () => {
    // console.log('当前登陆状态:', isLoggedIn);
    // 如果已经登陆则执行回调
    if (isLoggedIn === 1) {
      if (!isReady) {
        setImmediate(() => nativeativeFunction())
        isReady = true
      }
      setTimeout(checkLoginStatus, 3000)  // 每3秒检查一次，直到登陆成功
    }
  }

  setTimeout(checkLoginStatus, 3000)  // 初始延迟3秒启动
  return nativeCallback
})()

// 获取登录二维码(登录地址)
const getLoginUrlFunction1 = () => {
  const loginUrlAddr = moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET).readPointer()
  const loginUrl = 'http://weixin.qq.com/x/' + loginUrlAddr.readUtf8String()
  return loginUrl
}

const getLoginUrlFunction = () => {
  const loginUrl = 'http://weixin.qq.com/x/'
  return loginUrl
}

// 获取自己的信息
const getMyselfInfoFunction1 = () => {

  // const ptr = 0
  let wx_code: any = ''
  let wx_id: any = ''
  let wx_name: any = ''
  let head_img_url: any = ''

  const base = moduleBaseAddress.add(wxOffsets.myselfInfo.WX_SELF_ID_OFFSET)
  const wxid_len = base.add(0x4D4).readU32()

  if (wxid_len === 0x13) { // 新版本微信
    wx_id = base.readPointer().readAnsiString(wxid_len)
    wx_code = base.add(0x64).readAnsiString()
  } else {
    wx_id = readString(base)
    wx_code = wx_id
  }

  wx_name = readString(base.add(0x10C))
  const img_addr = base.add(0x2D8).readPointer()
  const img_len = base.add(0x2E8).readU32()

  head_img_url = img_addr.readAnsiString(img_len)

  const myself = {
    id: wx_id,
    code: wx_code,
    name: wx_name,
    head_img_url,
  }
  const myselfJson = JSON.stringify(myself)
  // console.log('myselfJson:', myselfJson)
  return myselfJson

}

class SelfInfoInner {
  wxid: string = '';
  account: string = '';
  mobile: string = '';
  signature: string = '';
  country: string = '';
  province: string = '';
  city: string = '';
  name: string = '';
  headImg: string = '';
  dataSavePath: string = '';
  currentDataPath: string = '';
  dbKey: string = '';
}

function getMyselfInfoFunction(): SelfInfoInner {
  const baseAddr = moduleBaseAddress;
  let success = -1;

  const accountServiceAddr = baseAddr.add(offsets.kGetAccountServiceMgr);
  const getAppDataSavePathAddr = baseAddr.add(offsets.kGetAppDataSavePath);
  const getCurrentDataPathAddr = baseAddr.add(offsets.kGetCurrentDataPath);

  // 假设 GetSevice, GetDataSavePath 和 GetCurrentDataPath 函数已经定义
  const GetSevice = new NativeFunction(accountServiceAddr, 'pointer', []);
  const GetDataSavePath = new NativeFunction(getAppDataSavePathAddr, 'pointer', ['pointer']);
  const GetCurrentDataPath = new NativeFunction(getCurrentDataPathAddr, 'pointer', ['pointer']);

  console.log('GetSevice:', GetSevice)
  const serviceAddr = GetSevice();
  console.log('serviceAddr:', serviceAddr)
  const out: any = new SelfInfoInner();

  if (!serviceAddr.isNull()) {
    console.log('serviceAddr is not null:', serviceAddr)
    // 示例：读取 wxid
    const wxidAddr = serviceAddr.add(0x80);
    const wxidLength = wxidAddr.add(0x10).readPointer().toInt32();
    // console.log('wxidAddr:', wxidAddr)
    if (wxidLength === 19) {
      // console.log('wxidLength:', wxidLength)
      out.wxid = wxidAddr.readPointer().readAnsiString(wxidLength);
      // console.log('out.wxid:', out.wxid)
    } else {
      out.wxid = readString(wxidAddr)
    }

    // 读取其他属性，例如 account
    const accountAddr = serviceAddr.add(0x108);
    const accountLength = accountAddr.add(0x10).readPointer().toInt32();
    if (accountLength === 19) {
      // console.log('accountLength:', accountLength)
      out.account = accountAddr.readPointer().readAnsiString(accountLength);
    } else {
      out.account = readString(accountAddr)
    }
    // console.log('out.account:', out.account)

    // 读取 mobile
    const mobileAddr = serviceAddr.add(0x128);
    const mobileLength = serviceAddr.add(0x128 + 0x10).readPointer().toInt32();
    if (mobileLength === 19) {
      out.mobile = mobileAddr.readPointer().readAnsiString(mobileLength);
      // console.log('out.mobile:', out.mobile)
    } else {
      out.mobile = readString(mobileAddr)
    }

    // 读取 signature
    const signatureAddr = serviceAddr.add(0x148);
    const signatureLength = serviceAddr.add(0x148 + 0x10).readPointer().toInt32();
    if (signatureLength === 0) {
      out.signature = signatureAddr.readPointer().readAnsiString(signatureLength);
      // console.log('out.signature:', out.signature)
    } else {
      out.signature = readString(signatureAddr)
    }

    // console.log('myselfinfo:', JSON.stringify(out))

    // 调用 GetDataSavePath 和 GetCurrentDataPath 函数
    const dataSavePathPtr = GetDataSavePath(serviceAddr);
    // console.log('dataSavePathPtr:', dataSavePathPtr)

    if (!dataSavePathPtr.isNull()) {
      console.log('dataSavePathPtr is not null:', dataSavePathPtr)
      out.dataSavePath = dataSavePathPtr.readPointer().readUtf16String();
    }

    // console.log('out.dataSavePath:', out.dataSavePath)
    const currentDataPathPtr = GetCurrentDataPath(serviceAddr);
    if (!currentDataPathPtr.isNull()) {
      out.currentDataPath = currentDataPathPtr.readPointer().readUtf16String();
    }

  }
  console.log('myselinfo:', JSON.stringify(out))
  success = 1;
  return out;
}

function readStringFromMemory(base: NativePointer, lengthOffset: number, flagOffset: number): string {
  const length = base.add(lengthOffset).readU32();
  if (length === 0) return '';

  if (base.add(flagOffset).readU32() === 0xF) {
    return base.readCString(length) || '';
  } else {
    const strPtr = base.readPointer();
    return strPtr.readCString(length) || '';
  }
}

// 获取联系人列表
class ContactInner {
  wxid: string = '';
  customAccount: string = '';
  encryptName: string = '';
  nickname: string = '';
  name: string = '';
  pinyin: string = '';
  pinyinAll: string = '';
  verifyFlag: number = 0;
  type: number = 0;
  reserved1: number = 0;
  reserved2: number = 0;
}

function getContactNativeFunction(): string {
  console.log('getContactNativeFunction begin ...')
  let success: any = -1;
  const baseAddr = moduleBaseAddress;
  const getContactMgrAddr = baseAddr.add(offsets.kGetContactMgr);
  const getContactListAddr = baseAddr.add(offsets.kGetContactList);

  const GetContactMgr = new NativeFunction(getContactMgrAddr, 'pointer', []);
  const GetContactList = new NativeFunction(getContactListAddr, 'int64', ['pointer', 'pointer']);
  // console.log('GetContactMgr:', GetContactMgr)

  const mgr: NativePointer = GetContactMgr();

  const contactVec: NativePointer = Memory.alloc(3 * Process.pointerSize);
  success = GetContactList(mgr, contactVec);
  // console.log('success:', success)
  const start: NativePointer = contactVec.readPointer();
  const end: NativePointer = contactVec.add(2 * Process.pointerSize).readPointer();

  const contacts: ContactInner[] = [];

  let current = start;
  while (current.compare(end) < 0) {
    // console.log('current:', current);
    const temp = new ContactInner();
    temp.wxid = readWideString(current.add(0x10));
    // console.log('temp.wxid:', temp.wxid);
    temp.customAccount = readWideString(current.add(0x30));
    // console.log('temp.customAccount:', temp.customAccount);
    temp.encryptName = readWideString(current.add(0x50));
    temp.nickname = readWideString(current.add(0xA0));
    temp.name = readWideString(current.add(0xA0));
    // console.log('temp.nickname:', temp.nickname);
    temp.pinyin = readWideString(current.add(0x108));
    temp.pinyinAll = readWideString(current.add(0x128));
    temp.verifyFlag = current.add(0x70).readU32();
    temp.type = current.add(0x74).readU32();
    temp.reserved1 = current.add(0x1F0).readU32();
    temp.reserved2 = current.add(0x1F4).readU32();
    contacts.push(temp);
    current = current.add(0x698); // 根据实际的结构大小调整
    // console.log('temp:', JSON.stringify(temp));
  }

  return JSON.stringify(contacts);
}

// 调试中
function GetContactOrChatRoomNickname(wxId) {
  console.log('GetContactOrChatRoomNickname begin ...')
  const buff = Memory.alloc(0x440);
  const pri = Memory.allocUtf16String(wxId);
  const WX_CONTACT_MGR_OFFSET = wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET; // 替换为实际的偏移量
  const WX_GET_CONTACT_OFFSET = wxOffsets.contact.WX_GET_CONTACT_OFFSET; // 替换为实际的偏移量
  const WX_FREE_CONTACT_OFFSET = wxOffsets.chatRoom.WX_FREE_CONTACT_OFFSET; // 替换为实际的偏移量
  const contactMgrAddr = moduleBaseAddress.add(WX_CONTACT_MGR_OFFSET);
  const getContactAddr = moduleBaseAddress.add(WX_GET_CONTACT_OFFSET);
  const freeContactAddr = moduleBaseAddress.add(WX_FREE_CONTACT_OFFSET);
  let contactOrChatRooNickBuffAsm: any = Memory.alloc(Process.pageSize)

  Memory.patchCode(ptr(contactOrChatRooNickBuffAsm), Process.pageSize, code => {
    const cw = new X86Writer(code, { pc: ptr(contactOrChatRooNickBuffAsm) });

    cw.putPushfx();
    cw.putPushax();
    cw.putMovRegAddress('ecx', contactMgrAddr);
    cw.putCallReg('ecx');
    cw.putMovRegAddress('ecx', buff);
    cw.putPushReg('ecx');
    cw.putMovRegAddress('ecx', pri);
    cw.putPushReg('ecx');
    cw.putMovRegReg('ecx', 'eax');
    cw.putCallAddress(getContactAddr);
    cw.putAddRegImm('esp', 0x08);
    cw.putMovRegAddress('ecx', buff);
    cw.putCallAddress(freeContactAddr);
    cw.putPopax();
    cw.putPopfx();
    cw.putRet();

    cw.flush();
  });

  // 执行汇编代码
  let success = -1;
  try {
    const nativeFunction = new NativeFunction(contactOrChatRooNickBuffAsm, 'int', []);
    success = nativeFunction();
    console.log('success:', success)
  } catch (e) {
    console.error('Error during function execution:', e);
    return '';
  }

  const name = contactOrChatRooNickBuffAsm.readUtf16String()
  console.log('name:', name)
  return name;
}

// 获取群组列表
const getChatroomMemberInfoFunction = () => {
  console.log('getChatroomMemberInfoFunction begin ...')
  // 获取群组列表地址
  const getChatroomNodeAddress = () => {
    const baseAddress = moduleBaseAddress.add(offsets.kGPInstance).readPointer()
    if (baseAddress.isNull()) {
      return baseAddress
    }
    return baseAddress.add(0x8c8).readPointer()
  }

  // 递归遍历群组节点
  const chatroomRecurse = (node: NativePointer, chatroomNodeList: any[], chatroomMemberList: any[]) => {
    const chatroomNodeAddress = getChatroomNodeAddress()
    if (chatroomNodeAddress.isNull() || node.equals(chatroomNodeAddress)) {
      return
    }

    if (chatroomNodeList.some((n: any) => node.equals(n))) {
      return
    }

    chatroomNodeList.push(node)
    const roomid = readWideString(node.add(0x10))
    // try{
    //   console.log('获取群信息...', roomid)
    //   GetMemberFromChatRoom(roomid)
    // }catch(e){
    //   console.error('获取群信息失败：', e)
    // }
    const len = node.add(0x54).readU32()
    if (len > 4) {
      const memberStr: any = readString(node.add(0x44))
      if (memberStr.length > 0) {
        const admin = readWideString(node.add(0x74))
        // console.log('获取到的admin', admin)
        const memberList = memberStr.split(/[\\^][G]/)
        chatroomMemberList.push({ roomid, roomMember: memberList, admin })
      }
    }

    chatroomRecurse(node.add(0x0).readPointer(), chatroomNodeList, chatroomMemberList)
    chatroomRecurse(node.add(0x04).readPointer(), chatroomNodeList, chatroomMemberList)
    chatroomRecurse(node.add(0x08).readPointer(), chatroomNodeList, chatroomMemberList)
  }

  // 主函数逻辑
  try {
    const chatroomNodeAddress = getChatroomNodeAddress()
    if (chatroomNodeAddress.isNull()) {
      return '[]'
    }

    const chatroomNodeList: never[] = []
    const chatroomMemberList: never[] = []
    const startNode = chatroomNodeAddress.add(0x0).readPointer()
    chatroomRecurse(startNode, chatroomNodeList, chatroomMemberList)
    let results = '[]'
    try {
      results = JSON.stringify(chatroomMemberList)
      // console.log('群组列表：', results)
    } catch (e) {
      console.log('格式转换错误：', 'e')
    }
    return results
  } catch (e) {
    console.error('获取群组列表失败：', e)
    return '[]'
  }
}

// 调试中
function GetMemberFromChatRoom(chatRoomId) {
  console.log('GetMemberFromChatRoom begin ...')
  const base_addr = moduleBaseAddress;  // 替换为实际的基地址
  const WX_GET_MEMBER_FROM_CHAT_ROOM_OFFSET = wxOffsets.chatRoom.WX_GET_MEMBER_FROM_CHAT_ROOM_OFFSET;  // 替换为实际的偏移量
  const WX_CHAT_ROOM_MGR_OFFSET = wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET;  // 替换为实际的偏移量
  const WX_INIT_CHAT_ROOM_OFFSET = wxOffsets.chatRoom.WX_INIT_CHAT_ROOM_OFFSET;  // 替换为实际的偏移量
  const WX_FREE_CHAT_ROOM_OFFSET = wxOffsets.chatRoom.WX_FREE_CHAT_ROOM_OFFSET;  // 替换为实际的偏移量

  // 准备函数地址
  const get_member_addr = base_addr.add(WX_GET_MEMBER_FROM_CHAT_ROOM_OFFSET);
  const get_chat_room_mgr_addr = base_addr.add(WX_CHAT_ROOM_MGR_OFFSET);
  const create_chat_room_addr = base_addr.add(WX_INIT_CHAT_ROOM_OFFSET);
  const free_chat_room_addr = base_addr.add(WX_FREE_CHAT_ROOM_OFFSET);

  // 准备内存空间
  const buffer = Memory.alloc(0x1D4);
  const chat_room_ptr = Memory.allocUtf16String(chatRoomId);
  // 分配内存来存储 success 值
  const successPtr = Memory.alloc(4); // 分配 4 字节，因为 int 类型通常是 4 字节

  // 使用 X86Writer 编写内联汇编
  const asmCode = Memory.alloc(Process.pageSize);

  Memory.patchCode(asmCode, Process.pageSize, code => {
    const cw = new X86Writer(code, { pc: asmCode });

    // 模拟 C++ 中的内联汇编操作
    cw.putPushax();

    cw.putMovRegAddress('ecx', buffer);
    cw.putCallAddress(create_chat_room_addr);
    cw.putCallAddress(get_chat_room_mgr_addr);

    cw.putMovRegAddress('eax', buffer);
    cw.putPushReg('eax');
    cw.putPushImmPtr(chat_room_ptr);
    cw.putCallAddress(get_member_addr);

    cw.putBytes([0x0F, 0xB6, 0xC0]); // movzx eax, al
    cw.putMovRegAddress('eax', successPtr); // 将 EAX 寄存器的值存储到 successPtr 指向的内存地址

    cw.putPopax();
    cw.putRet();

    cw.flush();
  });

  // 使用 NativeFunction 调用汇编代码
  let success = -1;
  try {
    const nativeFunction = new NativeFunction(asmCode, 'int', []);
    success = nativeFunction();
    console.log('success:', success);
  } catch (e) {
    console.error('Error during function execution:', e);
  }

  // 读取结果
  const membersPtr = buffer.add(0x1c).readPointer();
  const roomPtr = buffer.add(0x8).readPointer();
  const adminPtr = buffer.add(0x4c).readPointer();

  const members = membersPtr.readCString();
  const room = roomPtr.readUtf16String();
  const admin = adminPtr.readUtf16String();

  console.log('Members:', members);
  console.log('Room:', room);
  console.log('Admin:', admin);

  // 清理
  const freeChatRoom = new NativeFunction(free_chat_room_addr, 'void', ['pointer']);
  freeChatRoom(buffer);

  return {
    members,
    room,
    admin
  };
}

// 获取群成员昵称
let memberNickBuffAsm: any = null
let nickRoomId: any = null
let nickMemberId: any = null
let nickBuff: any = null
const getChatroomMemberNickInfoFunction = ((memberId: any, roomId: any) => {
  // console.log('Function called with wxid:', memberId, 'chatRoomId:', roomId);
  nickBuff = Memory.alloc(0x7e4)
  //const nickRetAddr = Memory.alloc(0x04)
  memberNickBuffAsm = Memory.alloc(Process.pageSize)
  //console.log('asm address----------',memberNickBuffAsm)
  nickRoomId = initidStruct(roomId)
  //console.log('nick room id',nickRoomId)
  nickMemberId = initStruct(memberId)

  //console.log('nick nickMemberId id',nickMemberId)
  //const nickStructPtr = initmsgStruct('')

  Memory.patchCode(memberNickBuffAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, {
      pc: memberNickBuffAsm
    })

    cw.putPushfx()
    cw.putPushax()
    cw.putMovRegAddress('edi', nickRoomId)
    cw.putMovRegAddress('eax', nickBuff)
    cw.putMovRegReg('edx', 'edi')
    cw.putPushReg('eax')
    cw.putMovRegAddress('ecx', nickMemberId)
    // console.log('moduleBaseAddress', moduleBaseAddress)
    cw.putCallAddress(moduleBaseAddress.add(offsets.kGetMemberFromChatRoom))
    cw.putAddRegImm('esp', 0x04)

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), 'void', [])
  nativeativeFunction()
  const nickname = readWideString(nickBuff)
  // console.log('--------------------------nickname', nickname)
  return nickname
})

const getChatroomMemberNickInfoFunction1 = (wxid, chatRoomId) => {
  console.log('Function called with wxid:', wxid, 'chatRoomId:', chatRoomId);

  const base_addr = moduleBaseAddress; // 替换为实际的基地址
  const WX_CHAT_ROOM_MGR_OFFSET = wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET; // 替换为实际的偏移量
  const WX_GET_MEMBER_NICKNAME_OFFSET = wxOffsets.chatRoom.WX_GET_MEMBER_NICKNAME_OFFSET; // 替换为实际的偏移量
  const WX_CONTACT_MGR_OFFSET = wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET; // 替换为实际的偏移量
  const WX_GET_CONTACT_OFFSET = wxOffsets.contact.WX_GET_CONTACT_OFFSET; // 替换为实际的偏移量
  const WX_FREE_CONTACT_OFFSET = wxOffsets.chatRoom.WX_FREE_CONTACT_OFFSET; // 替换为实际的偏移量

  // 准备函数地址
  const get_chat_room_mgr_addr = base_addr.add(WX_CHAT_ROOM_MGR_OFFSET);
  const get_nickname_addr = base_addr.add(WX_GET_MEMBER_NICKNAME_OFFSET);
  const contact_mgr_addr = base_addr.add(WX_CONTACT_MGR_OFFSET);
  const get_contact_addr = base_addr.add(WX_GET_CONTACT_OFFSET);
  const free_contact_addr = base_addr.add(WX_FREE_CONTACT_OFFSET);

  // 准备内存空间
  const chat_room = Memory.allocUtf16String(chatRoomId);
  const member_id = Memory.allocUtf16String(wxid);
  const nickname = Memory.allocUtf16String(''); // 初始化为空的 WeChatString
  const buffer = Memory.alloc(0x440); // 分配用于存储姓名的缓冲区

  let name: any = '';

  // 使用 X86Writer 编写内联汇编
  const asmCode = Memory.alloc(Process.pageSize);

  try {
    Memory.patchCode(asmCode, Process.pageSize, code => {
      const cw = new X86Writer(code, { pc: asmCode });

      console.log('保存寄存器状态');
      cw.putPushax();
      cw.putPushfx();

      console.log('调用 get_chat_room_mgr_addr:', get_chat_room_mgr_addr);
      cw.putCallAddress(get_chat_room_mgr_addr);

      console.log('将 nickname 地址移动到 ecx:', nickname);
      cw.putMovRegAddress('ecx', nickname);
      console.log('将 ecx 压栈');
      cw.putPushReg('ecx');

      console.log('将 member_id 地址移动到 ecx:', member_id);
      cw.putMovRegAddress('ecx', member_id);
      console.log('将 ecx 压栈');
      cw.putPushReg('ecx');

      console.log('将 chat_room 地址移动到 ecx:', chat_room);
      cw.putMovRegAddress('ecx', chat_room);
      console.log('将 ecx 压栈');
      cw.putPushReg('ecx');

      console.log('将 eax 移动到 ecx');
      cw.putMovRegReg('ecx', 'eax');

      console.log('调用 get_nickname_addr:', get_nickname_addr);
      cw.putCallAddress(get_nickname_addr);

      console.log('恢复寄存器状态');
      cw.putPopfx();
      cw.putPopax();

      console.log('返回');
      cw.putRet();
      cw.flush();
    });

    console.log('调用汇编代码的第一部分');
    const nativeFunction = new NativeFunction(asmCode, 'void', []);
    nativeFunction();
  } catch (e) {
    console.error('执行第一部分汇编代码时出错:', e);
  }

  if (nickname.readPointer().isNull() || nickname.readPointer().equals(ptr(0))) {
    console.log('昵称指针为空，调用汇编代码的第二部分');

    try {
      Memory.patchCode(asmCode, Process.pageSize, code => {
        const cw = new X86Writer(code, { pc: asmCode });

        cw.putPushfx();
        cw.putPushax();

        // 第二部分汇编
        cw.putCallAddress(contact_mgr_addr);
        cw.putMovRegAddress('ecx', buffer);
        cw.putPushReg('ecx');
        cw.putMovRegAddress('ecx', member_id);
        cw.putPushReg('ecx');
        cw.putMovRegReg('ecx', 'eax');
        cw.putCallAddress(get_contact_addr);

        cw.putPopax();
        cw.putPopfx();
        cw.putRet();

        cw.flush();
      });

      const nativeFunction = new NativeFunction(asmCode, 'void', []);
      nativeFunction();
    } catch (e) {
      console.error('执行第二部分汇编代码时出错:', e);
    }

    try {
      name = buffer.add(0x6C).readUtf16String();
      console.log('从联系人管理器中找到姓名:', name);
    } catch (e) {
      console.error('从缓冲区读取姓名时出错:', e);
    }

    try {
      const freeChatRoom = new NativeFunction(free_contact_addr, 'void', ['pointer']);
      freeChatRoom(buffer);
    } catch (e) {
      console.error('清理资源时出错:', e);
    }
  } else {
    console.log('昵称指针非空，直接读取昵称');
    try {
      name = nickname.readPointer().readUtf16String();
      console.log('从聊天室管理器中找到姓名:', name);
    } catch (e) {
      console.error('从昵称指针读取姓名时出错:', e);
    }
  }

  console.log('最终姓名:', name);
  return name;
};

// 发送文本消息
const sendMsgNativeFunction = (talkerId: any, content: any) => {
  console.log('sendMsgNativeFunction begin ...')
  const txtAsm: any = Memory.alloc(Process.pageSize)
  // const buffwxid = Memory.alloc(0x20)

  const wxidPtr: any = Memory.alloc(talkerId.length * 2 + 2)
  wxidPtr.writeUtf16String(talkerId)

  const picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(wxidPtr)).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)

  const contentPtr = Memory.alloc(content.length * 2 + 2)
  contentPtr.writeUtf16String(content)

  const sizeOfStringStruct = Process.pointerSize * 5
  const contentStruct = Memory.alloc(sizeOfStringStruct)

  contentStruct
    .writePointer(contentPtr).add(0x4)
    .writeU32(content.length).add(0x4)
    .writeU32(content.length * 2)

  const ecxBuffer = Memory.alloc(0x2d8)

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })
    cw.putPushfx()
    cw.putPushax()

    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    cw.putPushU32(0x0)

    // cw.putMovRegReg

    cw.putMovRegAddress('eax', contentStruct)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edx', picWxid) // room_id

    cw.putMovRegAddress('ecx', ecxBuffer)
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendText.WX_SEND_TEXT_OFFSET,
    ))

    cw.putAddRegImm('esp', 0x18)
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  // console.log('----------txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  nativeativeFunction()

}

// 发送@消息
const sendAtMsgNativeFunction = (roomId: any, text: string, contactId: any, nickname: string) => {
  console.log('sendAtMsgNativeFunction begin ...')
  let asmAtMsg: any = null
  asmAtMsg = Memory.alloc(Process.pageSize)
  const ecxBuffer = Memory.alloc(0x3b0)

  const atContent = '@' + nickname + ' ' + text

  const roomid_: NativePointerValue = initStruct(roomId)
  const wxid_ = initidStruct(contactId)
  const msg_: NativePointerValue = initmsgStruct(atContent)
  const atid_: NativePointerValue = initAtMsgStruct(wxid_)

  Memory.patchCode(asmAtMsg, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: asmAtMsg,
    })
    cw.putPushfx()
    cw.putPushax()

    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    // cw.putPushU32(0x0)
    cw.putMovRegAddress('eax', atid_)
    cw.putPushReg('eax')

    // cw.putMovRegReg

    cw.putMovRegAddress('eax', msg_)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edx', roomid_) // room_id

    cw.putMovRegAddress('ecx', ecxBuffer)
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendText.WX_SEND_TEXT_OFFSET,
    ))

    cw.putAddRegImm('esp', 0x18)
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  // console.log('----------txtAsm', asmAtMsg)
  const nativeativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', [])
  nativeativeFunction()

}

// 发送图片消息
const sendPicMsgNativeFunction = (contactId: string, path: string) => {
  console.log('sendPicMsgNativeFunction begin ...')
  const picAsm: any = Memory.alloc(Process.pageSize)
  const buffwxid = Memory.alloc(0x20)
  const picbuff = Memory.alloc(0x2D8)

  const pathPtr = Memory.alloc(path.length * 2 + 1)
  pathPtr.writeUtf16String(path)

  const imagefilepath = Memory.alloc(0x24)
  imagefilepath.writePointer(pathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  const picWxidPtr: any = Memory.alloc(contactId.length * 2 + 1)
  picWxidPtr.writeUtf16String(contactId)

  const picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)

  // const test_offset1 = 0x701DC0;
  Memory.patchCode(picAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: picAsm,
    })
    cw.putPushfx()
    cw.putPushax()
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendMessageMgr.WX_SEND_MESSAGE_MGR_OFFSET,
    ))
    cw.putMovRegReg('edx', 'eax') // 缓存

    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegAddress('eax', buffwxid)
    cw.putMovRegReg('ecx', 'esp')
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET,
    ))

    cw.putMovRegReg('ecx', 'edx')
    cw.putMovRegAddress('eax', picWxid) //= lea
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('edi')
    cw.putPushReg('eax')
    cw.putMovRegAddress('eax', picbuff)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edi', picWxid) // edi
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendImage.WX_SEND_IMAGE_OFFSET,
    ))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  // console.log('----------picAsm',picAsm)
  const nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', [])
  nativeativeFunction()

}

// 接收消息回调
const recvMsgNativeCallback = (() => {
  console.log('recvMsgNativeCallback begin ...')
  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  try {
    Interceptor.attach(
      moduleBaseAddress.add(offsets.kDoAddMsg), {
      onEnter() {
        console.log('recvMsgNativeCallback onEnter ...')
        try {
          console.log('recvMsgNativeCallback onEnter this.context ...', this.context)
          const addr = (this.context as any).ecx // 0xc30-0x08
          const msgType = addr.add(0x24).readU32()
          console.log('msgType....', msgType)
          const isMyMsg = addr.add(0x3C).readU32() // add isMyMsg

          if (msgType > 0) {

            const talkerIdPtr = addr.add(0x48).readPointer()
            // console.log('txt msg',talkerIdPtr.readUtf16String())
            const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2

            const myTalkerIdPtr = Memory.alloc(talkerIdLen)
            Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen)

            let contentPtr: any = null
            let contentLen = 0
            let myContentPtr: any = null
            if (msgType === 3) { // pic path
              const thumbPtr = addr.add(0x198).readPointer()
              const hdPtr = addr.add(0x1ac).readPointer()
              const thumbPath = thumbPtr.readUtf16String()
              const hdPath = hdPtr.readUtf16String()
              const picData = [
                thumbPath, //  PUPPET.types.Image.Unknown
                thumbPath, //  PUPPET.types.Image.Thumbnail
                hdPath, //  PUPPET.types.Image.HD
                hdPath, //  PUPPET.types.Image.Artwork
              ]
              const content = JSON.stringify(picData)
              myContentPtr = Memory.allocUtf16String(content)
            } else {
              contentPtr = addr.add(0x70).readPointer()
              contentLen = addr.add(0x70 + 0x04).readU32() * 2 + 2
              myContentPtr = Memory.alloc(contentLen)
              Memory.copy(myContentPtr, contentPtr, contentLen)
            }

            //  console.log('----------------------------------------')
            //  console.log(msgType)
            //  console.log(contentPtr.readUtf16String())
            //  console.log('----------------------------------------')
            const groupMsgAddr = addr.add(0x174).readU32() //* 2 + 2
            let myGroupMsgSenderIdPtr: any = null
            if (groupMsgAddr === 0) { // weChatPublic is zero，type is 49

              myGroupMsgSenderIdPtr = Memory.alloc(0x10)
              myGroupMsgSenderIdPtr.writeUtf16String('null')

            } else {

              const groupMsgSenderIdPtr = addr.add(0x174).readPointer()
              const groupMsgSenderIdLen = addr.add(0x174 + 0x04).readU32() * 2 + 2
              myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen)
              Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen)

            }

            const xmlNullPtr = addr.add(0x1f0).readU32() // 3.9.2.23
            let myXmlContentPtr: any = null
            if (xmlNullPtr === 0) {

              myXmlContentPtr = Memory.alloc(0x10)
              myXmlContentPtr.writeUtf16String('null')

            } else {
              const xmlContentPtr = addr.add(0x1f0).readPointer() // 3.9.2.23

              const xmlContentLen = addr.add(0x1f0 + 0x04).readU32() * 2 + 2
              myXmlContentPtr = Memory.alloc(xmlContentLen)
              Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen)
            }

            setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))
          }
        } catch (e: any) {
          console.error('接收消息回调失败：', e)
          throw new Error(e)
        }
      },
    })
    return nativeCallback
  } catch (e) {
    console.error('回调消息失败：')
    return null
  }

})()

// 登出事件回调
const hookLogoutEventCallback = (() => {
  console.log('hookLogoutEventCallback begin ...')
  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32'])

  try {
    Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_LOGOUT_OFFSET), {
      onEnter: function (args: any) {
        try {
          console.log('已登出:', args[0].toInt32())
          const bySrv = args[0].toInt32()
          setImmediate(() => nativeativeFunction(bySrv))
        } catch (e: any) {
          console.error('登出回调失败：', e)
          throw new Error(e)
        }
      },
    })
    return nativeCallback
  } catch (e) {
    console.error('登出回调失败：', e)
    return null
  }

})()

// getChatroomMemberNickInfoFunction('tyutluyc','21341182572@chatroom')
