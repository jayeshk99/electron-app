import { Attendance, MachineData } from './types';
import ZKLib from 'zklib';
import * as date from 'date-and-time';
import { getDatabase } from '../database';
import axios from 'axios';
import { chunkArray } from '../utils';
export const getAttendance = async (
  attendanceDate: string,
  machineData: MachineData
): Promise<Attendance[]> => {
  try {
    const instance = await createInstance(machineData);

    await connectInstance(instance);

    const data = await fetchAttendanceData(instance);

    await disconnectInstance(instance);

    const resultData = filterAttendanceByDate(data, attendanceDate);
    console.table(resultData);
    return resultData;
  } catch (error) {
    console.log(`Failed to get attendance: ${error.message}`);
    return []; // Or return an empty array if you'd prefer not to throw
  }
};

export const createInstance = async (data: MachineData) => {
  try {
    const instance = new ZKLib({
      connectionType: 'tcp',
      // ip: '10.101.15.52',
      // port: 4370,
      ip: data.ip,
      port: data.port,
      inport: 5200,
      timeout: 40000,
      attendanceParser: 'v6.60',
    });

    return instance;
  } catch (error) {
    console.log(`Failed to create instance: ${error.message}`);
    throw error;
  }
};

export const connectInstance = async (
  instance: any
): Promise<boolean | Error> => {
  return new Promise((resolve, reject) => {
    instance.connect((err: Error) => {
      if (err) {
        console.log(`Failed to connect: ${err.message}`);
        return reject(err);
      }
      resolve(true);
    });
  });
};

export const fetchAttendanceData = async (instance: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    instance.getAttendance((error: Error, data: any) => {
      if (error) {
        console.log(`Failed to get attendance data: ${error.message}`);
        return reject(error);
      }
      console.log(`The data length is ===> ${data?.length}`);
      resolve(data);
    });
  });
};

export const disconnectInstance = async (instance: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    instance.disconnect((err: Error) => {
      if (err) {
        console.log(`Failed to disconnect: ${err.message}`);
        return reject(err);
      }
      resolve();
    });
  });
};

export const filterAttendanceByDate = (
  data: any[],
  attendanceDate: string
): Attendance[] => {
  return data
    .filter((item) => {
      const checkInDate = new Date(item.timestamp);
      const attendanceDateFormatted = date.format(checkInDate, 'YYYY-MM-DD');
      return attendanceDateFormatted === attendanceDate;
    })
    .map((item) => {
      const checkInDate = new Date(item.timestamp);
      return {
        ...item,
        timestamp: date.format(checkInDate, 'YYYY-MM-DD HH:mm:ss'),
      } as Attendance;
    });
};

export const syncAttendance = async (
  startTime: number,
  endTime: number,
  data: MachineData
) => {
  try {
    const machineInstance = await createInstance(data);
    await connectInstance(machineInstance);
    const attendanceData = await fetchAttendanceData(machineInstance);
    const filteredData = attendanceData.filter(
      (row) =>
        new Date(row.timestamp) >= new Date(startTime) &&
        new Date(row.timestamp) <= new Date(endTime)
    );
    if (filteredData.length) {
      const chunkedArrays = chunkArray(filteredData, 1000);
      // send data over webhook
      let webhookURL =
        'https://webhook.site/de0c1c59-068c-4b2d-be84-d06a4b618e03';

      // Send a POST request to the Webhook URL
      for (let array of chunkedArrays) {
        try {
          const response = await axios.post(webhookURL, array);
          console.log('Data sent successfully');
          console.log('Response:', response.data);
        } catch (error) {
          // send mail if fails
        }
      }
    }
    // update last synced time of a machine
    const db = await getDatabase();
    await db.run(
      `UPDATE machines SET last_synced = ? WHERE ip = ? AND port = ?`,
      [new Date().toISOString(), data.ip, data.port]
    );
  } catch (error) {
    console.log('error in syncing attendance', error);
  }
};
