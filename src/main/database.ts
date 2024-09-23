// import path from 'path';
// import { app } from 'electron';
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// export async function initializeDatabase() {
//   const dbPath = path.join(app.getPath('userData'), 'machines.db');
//   console.log('dbPath:', dbPath);

//   // Open the SQLite database
//   const db = await open({
//     filename: dbPath,
//     driver: sqlite3.Database,
//   });

//   // Create a table for machines if it doesn't exist
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS machines (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       ip TEXT NOT NULL,
//       port INTEGER NOT NULL,
//       status TEXT DEFAULT 'inactive',
//       last_synced TEXT
//     )
//   `);

//   return db;
// }

// src/main/db.ts
import path from 'path';
import { app } from 'electron';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbInstance: any;

export async function getDatabase() {
  if (!dbInstance) {
    const dbPath = path.join(app.getPath('userData'), 'machines.db');
    console.log('dbPath:', dbPath);
    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create the table if it doesn't exist
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS machines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ip TEXT NOT NULL,
        port INTEGER NOT NULL,
        status TEXT DEFAULT 'inactive',
        last_synced DATETIME 
      )
    `);
  }

  return dbInstance;
}
