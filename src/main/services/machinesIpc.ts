import { ipcMain } from 'electron';
import { getDatabase } from '../database';
import { MachineData } from './types';
import { connectInstance, createInstance } from './attendance';
ipcMain.handle('sync-machine', async (event, data) => {
  const db = await getDatabase();

  console.log('macine data', data);
  return 'hii from electron main';
});

ipcMain.handle('add-machine', async (event, data: MachineData) => {
  const { ip, name, port, status } = data;
  const db = await getDatabase();
  const result = await db.run(
    'INSERT INTO machines (name, ip, port, status, last_synced) VALUES (?, ?, ?, ?, ?)',
    [name, ip, port, status, new Date()]
  );
  console.log('add-machine', data);
});

ipcMain.handle('get-machines', async (event) => {
  const db = await getDatabase();
  const result = await db.all(`SELECT * FROM machines`);
  console.log('result:', result);
  return result;
});

ipcMain.handle('delete-machine', async (event, data: MachineData) => {
  const db = await getDatabase();
  const result = await db.run(`DELETE FROM machines WHERE id = ${data.id}`);
  return 'Succesfully Deleted';
});

ipcMain.handle('test-connection', async (event, data: MachineData) => {
  try {
    const machineInstance = await createInstance(data);
    const connection = await connectInstance(machineInstance);
    if (connection) return true;
    return false;
  } catch (error) {
    console.log('error in testing connection', error);
    return false;
  }
});
