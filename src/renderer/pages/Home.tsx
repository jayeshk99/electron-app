import React, { useEffect } from 'react';
import AddMachineForm from '../components/AddMachineForm';
// import { ipcRenderer } from 'electron';

const Home: React.FC = () => {
  // async function fetchMachinesList() {
  //   const data = await ipcRenderer.invoke('fetch-machines');
  //   console.log('data infrontend:', data);
  // }
  // useEffect(() => {
  //   fetchMachinesList();
  // }, []);
  return (
    <div className="p-6">
      <AddMachineForm />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                IP
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Port
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Last Synced
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-4 px-6">192.168.1.10</td>
              <td className="py-4 px-6">3000</td>{' '}
              <td className="py-4 px-6">Server 1</td>
              <td className="py-4 px-6">
                <span className="text-green-500 font-semibold">Active</span>
              </td>
              <td className="py-4 px-6">2024-09-16 10:45 AM</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-4 px-6">192.168.1.10</td>
              <td className="py-4 px-6">8080</td>
              <td className="py-4 px-6">Server 1</td>
              <td className="py-4 px-6">
                <span className="text-green-500 font-semibold">Active</span>
              </td>
              <td className="py-4 px-6">2024-09-16 10:45 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
