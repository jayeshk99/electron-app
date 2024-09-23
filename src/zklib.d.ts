// src/types/zklib.d.ts
declare module 'zklib' {
  interface ZKLibOptions {
    connectionType: 'tcp' | 'udp';
    ip: string;
    port: number;
    inport: number;
    timeout: number;
    attendanceParser: string;
  }

  class ZKLib {
    constructor(options: ZKLibOptions);

    connect(): Promise<void>;
    getUsers(): Promise<any[]>;
    getAttendances(): Promise<any[]>;
    disconnect(): Promise<void>;
  }

  export default ZKLib;
}
