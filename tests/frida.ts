// frida -n WeChat.exe -l frida.js

// 偏移地址,来自于wxhelper项目
const testRoom = '25172281579@chatroom'
const testContact = 'tyutluyc'

const log = {
  info: (a: any, b?: any) => {
    b = b || ''
    let text = ''
    for (let i = 0; i < a.length + 4; i++) {
      text += '-'
    }
    text += ''
    console.log(text)
    console.log(`${a}`)
    // console.log(text)
    console.log(b)
    console.log(text)
  },
  error: (a: any, b: any) => {
    console.error(a, b)
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
  kDoOCRTask: 0x190b2a0,
};

const base_addr_ = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
console.log('baseAddr:', base_addr_)
// console.log('moduleLoad', moduleLoad)

/* -----------------base------------------------- */
let retidPtr: any = null
let retidStruct: any = null
const initidStruct = ((str: string | any[]) => {

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
})

let retPtr: any = null
let retStruct: any = null
const initStruct = ((str: any) => {
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
})

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

const readStringPtr = (address: number) => {
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

const readWStringPtr = (address: number) => {
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

const readByteArray = (address: any) => {
  return readStringPtr(address).readByteArray(16)
}

const readWideString = (address: any) => {
  return readWStringPtr(address).readUtf16String()
}

const createWeChatString = (s: string) => {
  // 分配内存为 WeChatString 结构体：ptr (4 bytes), length (4 bytes), max_length (4 bytes), c_ptr (4 bytes), c_len (4 bytes)
  const stringStruct = Memory.alloc(Process.pointerSize * 5);
  const stringLength = s.length;
  const stringMaxLen = stringLength * 2;
  const stringBuffer = Memory.allocUtf16String(s); // 为字符串数据分配内存并将字符串写入其中。

  // 构造 WeChatString 结构
  stringStruct.writePointer(stringBuffer);                     // ptr
  stringStruct.add(Process.pointerSize).writeU32(stringLength); // length
  stringStruct.add(Process.pointerSize * 2).writeU32(stringMaxLen); // max_length
  // c_ptr 和 c_len 可以保持默认的0值，不需要写入。

  return stringStruct;
}

const readWeChatString = (address: any) => {
  const ptr = address.readPointer();
  const len = address.add(Process.pointerSize).readU32();
  return ptr.readUtf16String(len);
}

// 获取当前登录状态——ok
const checkLogin = () => {
  var success = -1; // 初始化为-1，表示失败
  // 计算__GetAccountService函数的实际地址
  var getServiceAddr = base_addr_.add(offsets.kGetAccountServiceMgr);

  // 定义__GetAccountService函数
  // 假设__GetAccountService函数返回类型为'pointer'，并且不接受任何参数
  var GetService = new NativeFunction(getServiceAddr, 'pointer', []);

  // 调用__GetAccountService获取服务地址
  var serviceAddr = GetService();

  // 检查serviceAddr是否非空
  if (!serviceAddr.isNull()) {
    // 读取serviceAddr + 0x7F8处的值作为成功标志
    success = serviceAddr.add(0x7F8).readU32();
    console.log('serviceAddr:', serviceAddr, 'success:', success);
  }

  log.info("[检查登录状态]Login check result: ", success === 1 ? "已登录" : "未登录");
  return success;
}

checkLogin();

// 获取登录账号信息——ok ,部分成功
const getSelfInfo = () => {
  const out: any = {};
  // 定义原生函数
  var GetService = new NativeFunction(base_addr_.add(offsets.kGetAccountServiceMgr), 'pointer', []);
  var GetDataSavePath = new NativeFunction(base_addr_.add(offsets.kGetAppDataSavePath), 'void', ['pointer']);
  var GetCurrentDataPath = new NativeFunction(base_addr_.add(offsets.kGetCurrentDataPath), 'void', ['pointer']);

  // 调用GetService获取服务地址
  var serviceAddr = GetService();

  // 根据需要从serviceAddr读取数据并处理
  // 注意：以下仅为示例，具体实现应根据目标应用的内存结构来决定

  if (!serviceAddr.isNull()) {
    // 假设wxid位于服务地址偏移0x80处

    // 例如对于wxid的处理，其它字段处理类似
    const wxidAddr = serviceAddr.add(0x80);

    if (!wxidAddr.readPointer().isNull() && wxidAddr.add(0x10).readPointer().toInt32() !== 0) {
      if (wxidAddr.add(0x18).readU8() === 0xF) {
        // 直接从内存地址中构建字符串
        out.wxid = wxidAddr.readUtf8String(wxidAddr.add(0x10).readU64().toNumber());
        console.log('wxid:', out.wxid);
      } else {
        // 从内存地址读取指向字符数组的指针，然后构建字符串
        out.wxid = wxidAddr.readPointer().readUtf8String(wxidAddr.add(0x10).readU64().toNumber());
        console.log('wxid:', out.wxid);
      }
    } else {
      console.log('wxidAddr is null or wxidAddr.add(0x10).readPointer().toInt32() === 0');
    }

    if (!serviceAddr.add(0x108).readPointer().isNull() && serviceAddr.add(0x108 + 0x10).readPointer().toInt32() !== 0) {
      if (serviceAddr.add(0x108 + 0x18).readU8() === 0xF) {
        // 直接从内存地址中构建字符串
        out.account = serviceAddr.add(0x108).readUtf8String(serviceAddr.add(0x108 + 0x10).readU64().toNumber());
        console.log('account:', out.account);
      } else {
        // 从内存地址读取指向字符数组的指针，然后构建字符串
        out.account = serviceAddr.add(0x108).readPointer().readUtf8String(serviceAddr.add(0x108 + 0x10).readU64().toNumber());
        console.log('account:', out.account);
      }
    } else {
      console.log('account is null or account.add(0x10).readPointer().toInt32() === 0');
    }

    // if (*(INT64 *)(service_addr + 0x1A8) == 0 ||
    // *(INT64 *)(service_addr + 0x1A8 + 0x10) == 0) {
    // out.city = std::string();
    // } else {
    // if (*(INT64 *)(service_addr + 0x1A8 + 0x18) == 0xF) {
    // out.city = std::string((char *)(service_addr + 0x1A8),
    //                        *(INT64 *)(service_addr + 0x1A8 + 0x10));
    // } else {
    // out.city = std::string(*(char **)(service_addr + 0x1A8),
    //                        *(INT64 *)(service_addr + 0x1A8 + 0x10));
    // }
    // }

    // try {
    //   if (!serviceAddr.add(0x1A8).readPointer().isNull() && serviceAddr.add(0x1A8 + 0x10).readPointer().toInt32() !== 0) {
    //     if (serviceAddr.add(0x1A8 + 0x18).readU8() === 0xF) {
    //       // 直接从内存地址中构建字符串
    //       out.city = serviceAddr.add(0x1A8).readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU64().toNumber());
    //       console.log('city:', out.city);
    //     } else {
    //       // 从内存地址读取指向字符数组的指针，然后构建字符串
    //       out.city = serviceAddr.add(0x1A8).readPointer().readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU64().toNumber());
    //       console.log('city:', out.city);
    //     }
    //   } else {
    //     console.log('city is null or city.add(0x10).readPointer().toInt32() === 0');
    //   }
    // } catch (error) {
    //   console.error('city error:', error);
    // }

    // if (*(INT64 *)(service_addr + 0x1E8) == 0 ||
    // *(INT64 *)(service_addr + 0x1E8 + 0x10) == 0) {
    // out.name = std::string();
    // } else {
    // if (*(INT64 *)(service_addr + 0x1E8 + 0x18) == 0xF) {
    // out.name = std::string((char *)(service_addr + 0x1E8),
    //                        *(INT64 *)(service_addr + 0x1E8 + 0x10));
    // } else {
    // out.name = std::string(*(char **)(service_addr + 0x1E8),
    //                        *(INT64 *)(service_addr + 0x1E8 + 0x10));
    // }
    // }

    try {
      console.log('get name...');
      if (!serviceAddr.add(0x1E8).readPointer().isNull() && serviceAddr.add(0x1E8 + 0x10).readPointer().toInt32() !== 0) {
        if (serviceAddr.add(0x1E8 + 0x18).readU8() === 0xF) {
          // 直接从内存地址中构建字符串
          out.name = serviceAddr.add(0x1E8).readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU64().toNumber());
          console.log('name:', out.name);
        } else {
          // 从内存地址读取指向字符数组的指针，然后构建字符串
          out.name = serviceAddr.add(0x1E8).readPointer().readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU64().toNumber());
          console.log('name:', out.name);
        }
      } else {
        console.log('name is null or name.add(0x10).readPointer().toInt32() === 0');
      }
    } catch (error) {
      console.error('name error:', error);
    }

    //     if (*(INT64 *)(service_addr + 0x128) == 0 ||
    //     *(INT64 *)(service_addr + 0x128 + 0x10) == 0) {
    //   out.mobile = std::string();
    // } else {
    //   if (*(INT64 *)(service_addr + 0x128 + 0x18) == 0xF) {
    //     out.mobile = std::string((char *)(service_addr + 0x128),
    //                              *(INT64 *)(service_addr + 0x128 + 0x10));
    //   } else {
    //     out.mobile = std::string(*(char **)(service_addr + 0x128),
    //                              *(INT64 *)(service_addr + 0x128 + 0x10));
    //   }
    // }

    try {
      console.log('get mobile...');
      if (!serviceAddr.add(0x128).readPointer().isNull() && serviceAddr.add(0x128 + 0x10).readPointer().toInt32() !== 0) {
        if (serviceAddr.add(0x128 + 0x18).readU8() === 0xF) {
          // 直接从内存地址中构建字符串
          out.mobile = serviceAddr.add(0x128).readUtf8String(serviceAddr.add(0x128 + 0x10).readU64().toNumber());
          console.log('mobile:', out.mobile);
        } else {
          // 从内存地址读取指向字符数组的指针，然后构建字符串
          out.mobile = serviceAddr.add(0x128).readPointer().readUtf8String(serviceAddr.add(0x128 + 0x10).readU64().toNumber());
          console.log('mobile:', out.mobile);
        }
      } else {
        console.log('mobile is null or mobile.add(0x10).readPointer().toInt32() === 0');
      }
    } catch (error) {
      console.error('mobile error:', error);
    }

    //     if (*(INT64 *)(service_addr + 0x168) == 0 ||
    //     *(INT64 *)(service_addr + 0x168 + 0x10) == 0) {
    //   out.country = std::string();
    // } else {
    //   if (*(INT64 *)(service_addr + 0x168 + 0x18) == 0xF) {
    //     out.country = std::string((char *)(service_addr + 0x168),
    //                               *(INT64 *)(service_addr + 0x168 + 0x10));
    //   } else {
    //     out.country = std::string(*(char **)(service_addr + 0x168),
    //                               *(INT64 *)(service_addr + 0x168 + 0x10));
    //   }
    // }

    // try {
    //   console.log('get country...');
    //   if (!serviceAddr.add(0x168).readPointer().isNull() && serviceAddr.add(0x168 + 0x10).readPointer().toInt32() !== 0) {
    //     if (serviceAddr.add(0x168 + 0x18).readU8() === 0xF) {
    //       // 直接从内存地址中构建字符串
    //       out.country = serviceAddr.add(0x168).readUtf8String(serviceAddr.add(0x168 + 0x10).readU64().toNumber());
    //       console.log('country:', out.country);
    //     } else {
    //       // 从内存地址读取指向字符数组的指针，然后构建字符串
    //       out.country = serviceAddr.add(0x168).readPointer().readUtf8String(serviceAddr.add(0x168 + 0x10).readU64().toNumber());
    //       console.log('country:', out.country);
    //     }
    //   } else {
    //     console.log('country is null or country.add(0x10).readPointer().toInt32() === 0');
    //   }
    // } catch (error) {
    //   console.error('country error:', error);
    // }

    //     if (*(INT64 *)(service_addr + 0x188) == 0 ||
    //     *(INT64 *)(service_addr + 0x188 + 0x10) == 0) {
    //   out.province = std::string();
    // } else {
    //   if (*(INT64 *)(service_addr + 0x188 + 0x18) == 0xF) {
    //     out.province = std::string((char *)(service_addr + 0x188),
    //                                *(INT64 *)(service_addr + 0x188 + 0x10));
    //   } else {
    //     out.province = std::string(*(char **)(service_addr + 0x188),
    //                                *(INT64 *)(service_addr + 0x188 + 0x10));
    //   }
    // }

    // try {
    //   console.log('get province...');
    //   if (!serviceAddr.add(0x188).readPointer().isNull() && serviceAddr.add(0x188 + 0x10).readPointer().toInt32() !== 0) {
    //     if (serviceAddr.add(0x188 + 0x18).readU8() === 0xF) {
    //       // 直接从内存地址中构建字符串
    //       out.province = serviceAddr.add(0x188).readUtf8String(serviceAddr.add(0x188 + 0x10).readU64().toNumber());
    //       console.log('province:', out.province);
    //     } else {
    //       // 从内存地址读取指向字符数组的指针，然后构建字符串
    //       out.province = serviceAddr.add(0x188).readPointer().readUtf8String(serviceAddr.add(0x188 + 0x10).readU64().toNumber());
    //       console.log('province:', out.province);
    //     }
    //   } else {
    //     console.log('province is null or province.add(0x10).readPointer().toInt32() === 0');
    //   }
    // } catch (error) {
    //   console.error('province error:', error);
    // }

    // if (*(INT64 *)(service_addr + 0x450) == 0 ||
    //         *(INT64 *)(service_addr + 0x450 + 0x10) == 0) {
    //       out.head_img = std::string();
    //     } else {
    //       out.head_img = std::string(*(char **)(service_addr + 0x450),
    //                                    *(INT64 *)(service_addr + 0x450 + 0x10));
    //     }

    //     if (*(INT64 *)(service_addr + 0x6E0) == 0 ||
    //         *(INT64 *)(service_addr + 0x6E8) == 0) {
    //       out.db_key = std::string();
    //     } else {
    //       INT64 byte_addr = *(INT64 *)(service_addr + 0x6E0);
    //       INT64 len = *(INT64 *)(service_addr + 0x6E8);
    //       out.db_key = Utils::Bytes2Hex((BYTE *)byte_addr, static_cast<int>(len));
    //     }

    try {
      console.log('get head_img...');
      if (!serviceAddr.add(0x450).readPointer().isNull() && serviceAddr.add(0x450 + 0x10).readPointer().toInt32() !== 0) {
        // 从内存地址读取指向字符数组的指针，然后构建字符串
        out.head_img = serviceAddr.add(0x450).readPointer().readUtf8String(serviceAddr.add(0x450 + 0x10).readU64().toNumber());
        console.log('head_img:', out.head_img);
      } else {
        console.log('head_img is null or head_img.add(0x10).readPointer().toInt32() === 0');
      }
    } catch (error) {
      console.error('head_img error:', error);
    }

    // UINT64 flag = *(UINT64 *)(service_addr + 0x7F8);
    // if (flag == 1) {
    //   prototype::WeChatString current_data_path;
    //   // _GetCurrentDataPath(get_current_data_path_addr,
    //   //                     reinterpret_cast<ULONG_PTR>(&current_data_path));
    //   GetCurrentDataPath(reinterpret_cast<ULONG_PTR>(&current_data_path));
    //   if (current_data_path.ptr) {
    //     out.current_data_path = Utils::WstringToUTF8(
    //         std::wstring(current_data_path.ptr, current_data_path.length));
    //   } else {
    //     out.current_data_path = std::string();
    //   }
    // }

    try {
      console.log('get currentDataPath...');
      const flag = serviceAddr.add(0x7F8).readU32();
      if (flag === 1) {
        const currentDataPathStruct = Memory.alloc(Process.pointerSize * 2); // 模拟 WeChatString 结构体
        GetCurrentDataPath(currentDataPathStruct);
        if (currentDataPathStruct.readPointer().isNull()) {
          out.currentDataPath = '';
        } else {
          // 构建字符串
          out.currentDataPath = currentDataPathStruct.readPointer().readUtf16String(currentDataPathStruct.add(0x8).readU32());
        }
        console.log('currentDataPath:', out.currentDataPath);
      }
    } catch (error) {
      console.error('currentDataPath error:', error);
    }

    //     if (*(INT64 *)(service_addr + 0x148) == 0 ||
    //     *(INT64 *)(service_addr + 0x148 + 0x10) == 0) {
    //   out.signature = std::string();
    // } else {
    //   if (*(INT64 *)(service_addr + 0x148 + 0x18) == 0xF) {
    //     out.signature = std::string((char *)(service_addr + 0x148),
    //                                 *(INT64 *)(service_addr + 0x148 + 0x10));
    //   } else {
    //     out.signature = std::string(*(char **)(service_addr + 0x148),
    //                                 *(INT64 *)(service_addr + 0x148 + 0x10));
    //   }
    // }

    // try{
    //   if (!serviceAddr.add(0x148).readPointer().isNull() && serviceAddr.add(0x148 + 0x10).readPointer().toInt32() !== 0) {
    //     if (serviceAddr.add(0x148 + 0x18).readU8() === 0xF) {
    //       // 直接从内存地址中构建字符串
    //       out.signature = serviceAddr.add(0x148).readUtf8String(serviceAddr.add(0x148 + 0x10).readU64().toNumber());
    //       console.log('signature:', out.signature);
    //     } else {
    //       // 从内存地址读取指向字符数组的指针，然后构建字符串
    //       out.signature = serviceAddr.add(0x148).readPointer().readUtf8String(serviceAddr.add(0x148 + 0x10).readU64().toNumber());
    //       console.log('signature:', out.signature);
    //     }
    //   } else {
    //     console.log('signature is null or signature.add(0x10).readPointer().toInt32() === 0');
    //   }
    // } catch(e){
    //   console.log('signature error:', e);
    // }

    // 获取当前数据路径
    // prototype::WeChatString data_save_path;
    // // _GetDataSavePath(get_app_data_save_path_addr,
    // //                  reinterpret_cast<ULONG_PTR>(&data_save_path));
    // GetCurrentDataPath(reinterpret_cast<ULONG_PTR>(&data_save_path));
    // if (data_save_path.ptr) {
    //   out.data_save_path = Utils::WstringToUTF8(
    //       std::wstring(data_save_path.ptr, data_save_path.length));
    // } else {
    //   out.data_save_path = std::string();
    // }

    log.info('[获取当前账号信息]userInfo uot:', JSON.stringify(out, null, 2));

    const myself = {
      id: out.wxid,
      code: out.account,
      name: out.name,
      head_img_url: out.head_img,
    }
    const myselfJson = JSON.stringify(myself)
    console.log('myselfJson:', myselfJson)
    return myselfJson
  } else {
    return -1; // 失败
  }
}

// getSelfInfo();

// WeChatString 结构体的Frida实现，包括完整的字段
function WeChatString(str) {
  console.log('WeChatString str:', str)
  const strMem = str ? Memory.allocUtf16String(str) : ptr(0);
  const strLen = str ? str.length : 0;
  const structSize = Process.pointerSize + 4 + 4 + Process.pointerSize + 4;
  const structMem = Memory.alloc(structSize);

  structMem.writePointer(strMem);
  structMem.add(Process.pointerSize).writeU32(strLen); // 字符数
  structMem.add(Process.pointerSize + 4).writeU32(strLen * 2); // 字节计数，UTF-16编码

  // c_ptr 和 c_len 字段初始化为0
  structMem.add(Process.pointerSize + 4 + 4).writePointer(ptr("0x0"));
  structMem.add(Process.pointerSize + 4 + 4 + Process.pointerSize).writeU32(0);

  return structMem;
}

function WeChatString1(str) {
  // 处理空字符串的情况
  if (!str) {
    str = "";
  }
  const strLen = str.length;

  // UTF-16 encoding has 2 bytes per character, and a null-terminator at the end
  const strMem = Memory.allocUtf16String(str);
  const structSize = Process.pointerSize + 4 + 4 + Process.pointerSize + 4;
  const structMem = Memory.alloc(structSize);

  structMem.writePointer(strMem); // 写入字符串指针
  structMem.add(Process.pointerSize).writeU32(strLen); // 写入长度，假设是字符数
  structMem.add(4).writeU32((strLen + 1) * 2); // 写入最大长度（字节数），包括 null-terminator

  // c_ptr 和 c_len 默认是0, 所以我们可以省略这部分的初始化
  return structMem;
}

// 发送文本消息——未通过测试
const sendTextMsg = (wxid: string, msg: string) => {
  // INT64 success = -1;
  let success = -1;
  const successPtr = Memory.alloc(4);
  successPtr.writeS32(success);

  // Address calculations
  // UINT64 send_message_mgr_addr = base_addr_ + offset::kGetSendMessageMgr;
  const send_message_mgr_addr = base_addr_.add(offsets.kGetSendMessageMgr);
  // UINT64 send_text_msg_addr = base_addr_ + offset::kSendTextMsg;
  const send_text_msg_addr = base_addr_.add(offsets.kSendTextMsg);
  // UINT64 free_chat_msg_addr = base_addr_ + offset::kFreeChatMsg;
  const free_chat_msg_addr = base_addr_.add(offsets.kFreeChatMsg);

  // Native function declarations
  const GetSendMessageMgr = new NativeFunction(send_message_mgr_addr, 'int64', []);
  const SendTextMsg = new NativeFunction(send_text_msg_addr, 'int64', ['pointer', 'pointer', 'pointer', 'pointer', 'int', 'int', 'int', 'int']);
  const FreeChatMsg = new NativeFunction(free_chat_msg_addr, 'int64', ['pointer']);

  // prototype::WeChatString to_user(wxid);
  const to_user = WeChatString(wxid); // Replace 'wxid123' with the actual wxid.

  // prototype::WeChatString text_msg(msg);
  const text_msg = WeChatString(msg); // Replace with the actual message.

  // char chat_msg[0x460] = {0};
  const chat_msg = Memory.alloc(0x460);

  // UINT64 temp[3] ={0};
  const temp = Memory.alloc(8 * 3);
  // temp.writeByteArray(Array(8 * 3).fill(0))

  // func::__GetSendMessageMgr mgr;
  // mgr = (func::__GetSendMessageMgr)send_message_mgr_addr;
  // mgr();
  try {
    const res0 = GetSendMessageMgr();
    log.info('[发送文本消息]GetSendMessageMgr:', res0);
    // send(reinterpret_cast<UINT64>(&chat_msg), reinterpret_cast<UINT64>(&to_user),
    // reinterpret_cast<UINT64>(&text_msg), reinterpret_cast<UINT64>(&temp), 1,
    // 1, 0, 0);
    const res1 = SendTextMsg(chat_msg, to_user, text_msg, temp, 1, 1, 0, 0);
    log.info("[发送文本消息]Message sent successfully", res1);
    // free(reinterpret_cast<UINT64>(&chat_msg));
    const res2 = FreeChatMsg(chat_msg);
    log.info('[发送文本消息]FreeChatMsg success', String(res2));
    success = 1;
    return success;
  } catch (e) {
    console.error('[发送文本消息]FreeChatMsg error:', e);
    return success
  }
}

// sendTextMsg(testContact, 'hello, world!');

// 获取联系人列表——通过测试
const getContacts = () => {
  // INT64 success = -1;
  let success = -1;
  const successPtr = Memory.alloc(4);
  successPtr.writeS32(success);

  // UINT64 get_contact_mgr_addr = base_addr_ + offset::kGetContactMgr;
  // UINT64 get_contact_list_addr = base_addr_ + offset::kGetContactList;
  const get_contact_mgr_addr = base_addr_.add(offsets.kGetContactMgr);
  const get_contact_list_addr = base_addr_.add(offsets.kGetContactList);

  const get_contact_mgr = new NativeFunction(get_contact_mgr_addr, 'uint64', []);
  const get_contact_list = new NativeFunction(get_contact_list_addr, 'int64', ['uint64', 'pointer']);

  // UINT64 mgr = get_contact_mgr();
  const mgr = get_contact_mgr();
  console.log('mgr:', mgr.toNumber());

  // UINT64 contact_vec[3] = {0, 0, 0};
  const contact_vec = Memory.alloc(8 * 3);

  success = get_contact_list(mgr, contact_vec).toNumber();

  // const contactVec = contact_vec.readPointer();
  // console.log('contactVec:', contactVec);

  const startPtr = contact_vec.add(0);
  const endPtr = contact_vec.add(2 * Process.pointerSize);
  let start = startPtr.readU64().toNumber();
  const end = endPtr.readU64().toNumber();
  console.log('start:', start, 'end:', end);

  // 这是一个用于收集所有联系人信息的数组
  const contacts: any = [];

  while (start < end) {
    // 模拟 ContactInner 结构体和读取数据的逻辑
    // const wxid = readWideString(start + 0x10);
    // console.log('wxid:', wxid);
    const contact = {
      wxid: readWideString(start + 0x10),
      custom_account: readWideString(start + 0x30),
      encrypt_name: readWideString(start + 0x50),
      nickname: readWideString(start + 0xA0),
      pinyin: readWideString(start + 0x108),
      pinyin_all: readWideString(start + 0x128),
      verify_flag: ptr(start + 0x70).readU32(),
      type: ptr(start + 0x74).readU32(),
      reserved1: ptr(start + 0x1F0).readU32(),
      reserved2: ptr(start + 0x1F4).readU32(),
    };
    console.log('contact:', JSON.stringify(contact, null, 2));
    contacts.push(contact);

    start += 0x698;
    // console.log('start:', start);
  }
  log.info('[获取联系人]contacts:', contacts.length);
  return contacts;
};

getContacts();

// 获取群详情——未通过测试
const getChatRoomDetailInfo = (room_id) => {
  // UINT64 get_chat_room_mgr_addr = base_addr_ + offset::kChatRoomMgr;
  // UINT64 get_chat_room_detail_addr =
  //     base_addr_ + offset::kGetChatRoomDetailInfo;
  // UINT64 new_chat_room_info_addr = base_addr_ + offset::kNewChatRoomInfo;
  // UINT64 free_chat_room_info_addr = base_addr_ + offset::kFreeChatRoomInfo;
  const get_chat_room_mgr_addr = base_addr_.add(offsets.kChatRoomMgr);
  const get_chat_room_detail_addr = base_addr_.add(offsets.kGetChatRoomDetailInfo);
  const new_chat_room_info_addr = base_addr_.add(offsets.kNewChatRoomInfo);
  const free_chat_room_info_addr = base_addr_.add(offsets.kFreeChatRoomInfo);

  const GetChatRoomMgr = new NativeFunction(get_chat_room_mgr_addr, 'pointer', []);
  const GetChatRoomDetailInfo = new NativeFunction(get_chat_room_detail_addr, 'int64', ['pointer', 'pointer', 'pointer', 'int']);
  const NewChatRoomInfo = new NativeFunction(new_chat_room_info_addr, 'pointer', ['pointer']);
  const FreeChatRoomInfo = new NativeFunction(free_chat_room_info_addr, 'void', ['pointer']);

  const chat_room_id = WeChatString(room_id);
  const chat_room_info = Memory.alloc(0x148); // 假定聊天室信息结构体大小为0x148字节
  const p_chat_room_info = NewChatRoomInfo(chat_room_info);
  // const p_chat_room_info_ptr = p_chat_room_info.readPointer();

  const mgr = GetChatRoomMgr();
  const success = GetChatRoomDetailInfo(mgr, chat_room_id, p_chat_room_info, 1);

  // 假设room_info的字段可以通过指定的偏移直接读取
  const roomInfo = {
    admin: readWideString(p_chat_room_info.add(0x48)),
    chatRoomId: readWideString(p_chat_room_info.add(0x8)),
    notice: readWideString(p_chat_room_info.add(0x28)),
    xml: readWideString(p_chat_room_info.add(0x78))
  };

  FreeChatRoomInfo(p_chat_room_info);
  const res = { success, roomInfo }
  console.log("Success:", success, "Room Info:", JSON.stringify(roomInfo, null, 2));
  return res;
}

getChatRoomDetailInfo(testRoom);

// 获取群成员——未通过测试
const getMemberFromChatRoom = (room_id)=> {
  let success:any = -1;
  let get_chat_room_mgr_addr = base_addr_.add(offsets.kChatRoomMgr);
  let get_members_addr = base_addr_.add(offsets.kGetMemberFromChatRoom);
  let new_chat_room_addr = base_addr_.add(offsets.kNewChatRoom);
  let free_chat_room_addr = base_addr_.add(offsets.kFreeChatRoom);

  let get_chat_room_mgr = new NativeFunction(get_chat_room_mgr_addr, 'pointer', []);
  let get_members = new NativeFunction(get_members_addr, 'int64', ['pointer', 'pointer', 'pointer']);
  let new_chat_room = new NativeFunction(new_chat_room_addr, 'void', ['pointer']);
  let free_chat_room = new NativeFunction(free_chat_room_addr, 'void', ['pointer']);
  console.log('room_id:', room_id);

  let chat_room_id = WeChatString(room_id);
  let chat_room_info = Memory.alloc(0x2E0);
  new_chat_room(chat_room_info);
  console.log('chat_room_info:', chat_room_info);

  let mgr = get_chat_room_mgr();
  console.log('mgr:', mgr);
  console.log('chat_room_id:', chat_room_id);
  console.log('chat_room_info:', chat_room_info);

  success = get_members(mgr, chat_room_id, chat_room_info);
  console.log('success:', success);
  let member = {
      chat_room_id: readWideString(chat_room_info.add(0x10)),
      admin: readWideString(chat_room_info.add(0x78)),
      member_nickname: readWideString(chat_room_info.add(0x50)),
      admin_nickname: readWideString(chat_room_info.add(0xA0)),
      member: ReadWeChatStr(chat_room_info.add(0x30)) // 假设这个函数也已经实现
  };
  free_chat_room(chat_room_info);
  console.log('member:', JSON.stringify(member, null, 2));
  return success;
}

function ReadWeChatStr(addr) {
  let len = ptr(addr).add(0x10).readPointer().toInt32();
  if (len === 0) {
      return "";
  }
  let max_len = ptr(addr).add(0x18).readPointer().toInt32();
  if ((max_len | 0xF) === 0xF) {
      // 如果max_len符合条件，表示字符串直接存储在当前地址，使用Memory.readUtf8String读取
      return ptr(addr).readUtf8String(len);
  } else {
      // 否则，字符串通过指针间接存储，首先读取指针，然后再读取字符串
      let char_from_user_ptr = ptr(addr).readPointer();
      return char_from_user_ptr.readUtf8String(len);
  }
}

// getMemberFromChatRoom(testRoom);

// 获取联系人或群昵称——未通过测试
const getContactOrChatRoomNickname = (wxId) => {
  // 先假设Memory.allocUtf16String可以正确分配WeChatString的内存空间
  let wechatString = initidStruct(wxId);
  
  let getContactMgrAddr = base_addr_.add(offsets.kGetContactMgr);
  let newContactAddr = base_addr_.add(offsets.kNewContact);
  let getContactAddr = base_addr_.add(offsets.kGetContact);
  let freeContactAddr = base_addr_.add(offsets.kFreeContact);

  let getContactMgr = new NativeFunction(getContactMgrAddr, 'pointer', []);
  let getContact = new NativeFunction(getContactAddr, 'int64', ['pointer', 'pointer', 'pointer']);
  let newContact = new NativeFunction(newContactAddr, 'pointer', []);
  let freeContact = new NativeFunction(freeContactAddr, 'void', ['pointer']);

  let buff = Memory.alloc(0x6A9);
  // 直接用newContact函数创建contact对象并返回contact对象的地址
  console.log('buff:', buff);
  let contact = newContact();

  console.log('contact:', contact);
  let mgr = getContactMgr();
  console.log('mgr:', mgr);
  let success:any = getContact(mgr, wechatString, contact);
  console.log('success:', success);
  let nickname:any = "";
  if (success === 1) {
      // 读取UTF16字符串，从contact指针的0xA0位置开始
      nickname = contact.add(0xA0).readUtf16String();
  }

  // 调用来释放之前分配的contact对象
  freeContact(contact);
  
  console.log('[获取联系人或聊天室昵称]', nickname);
  return nickname;
};

// getContactOrChatRoomNickname(testContact);
