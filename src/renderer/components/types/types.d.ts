export interface MachineData {
  id?: number;
  name: string;
  ip: string;
  port: number;
  status?: 'inactive' | 'active';
  last_synced?: Date;
}
