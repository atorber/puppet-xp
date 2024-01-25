interface TableInfo {
    name: string;
    nameLen: bigint;
    tableName: string;
    tableNameLen: bigint;
    sql: string;
    sqlLen: bigint;
    rootpage: string;
    rootpageLen: bigint;
  }

  interface DatabaseInfo {
    handle: bigint;
    dbName: string | null;
    dbNameLen: bigint;
    tables: TableInfo[];
    count: bigint;
    extrainfo: bigint;
  }

  interface SqlResult {
    columnName: string;
    columnNameLen: bigint;
    content: string;
    contentLen: bigint;
    isBlob: boolean;
  }

  interface InnerMessageStruct {
    buffer: string;
    length: bigint;
  }

  interface SelfInfoInner {
    name: string;
    city: string;
    province: string;
    country: string;
    account: string;
    wxid: string;
    mobile: string;
    headImg: string;
    dataSavePath: string;
    signature: string;
    currentDataPath: string;
    dbKey: string;
  }

  interface ContactInner {
    wxid: string;
    customAccount: string;
    encryptName: string;
    nickname: string;
    pinyin: string;
    pinyinAll: string;
    type: number;
    verifyFlag: number;
    reserved1: number;
    reserved2: number;
  }

  interface ChatRoomInfoInner {
    chatRoomId: string;
    notice: string;
    admin: string;
    xml: string;
  }

  interface VectorInner {
    // 在 TypeScript 中可能会省略与调试相关的属性
    start: bigint;
    finish: bigint;
    end: bigint;
  }

  interface ChatRoomMemberInner {
    chatRoomId: string;
    admin: string;
    adminNickname: string;
    memberNickname: string;
    member: string;
  }

  interface ContactProfileInner {
    wxid: string;
    account: string;
    v3: string;
    nickname: string;
    headImage: string;
  }

export type {
  TableInfo,
  DatabaseInfo,
  SqlResult,
  InnerMessageStruct,
  SelfInfoInner,
  ContactInner,
  ChatRoomInfoInner,
  VectorInner,
  ChatRoomMemberInner,
  ContactProfileInner,
}
