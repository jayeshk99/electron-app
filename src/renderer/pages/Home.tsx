import React, { useEffect, useState } from 'react';
import AddMachineForm from '../components/AddMachineForm';
import { MachineData } from '../components/types/types';
import { formattedDate } from '../utils/date-time';
import Modal from '../components/Modal';
// import { ipcRenderer } from 'electron';

const Home: React.FC = () => {
  const [machinesList, setMachinesList] = useState<MachineData[]>([]);
  const [machineToDelete, setMachineToDelete] = useState<MachineData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchMachinesList() {
    const data = await window.electronAPI.invoke('get-machines');
    setMachinesList(data);
  }
  const addMachineHandler = async (data: MachineData) => {
    try {
      const result = await window.electronAPI.invoke('add-machine', {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  };
  const syncMachineHandler = async (machine: MachineData) => {
    try {
      const startTime = new Date().setHours(0, 0, 0, 0);
      const endTime = new Date().setHours(23, 59, 59, 0);
      await window.electronAPI.invoke('sync-attendance', {
        startTime: startTime,
        endTime: endTime,
        data: machine,
      });
      console.log(`Synced machine: ${machine.name}`);
    } catch (error) {
      console.error(`Failed to sync machine: ${machine.name}`, error);
    }
  };
  const openDeleteModal = (machine: MachineData) => {
    setMachineToDelete(machine);
    setIsModalOpen(true);
  };
  const deleteMachineHandler = async () => {
    if (machineToDelete) {
      try {
        await window.electronAPI.invoke('delete-machine', machineToDelete);
        fetchMachinesList();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to delete machine:', error);
      }
    }
  };
  useEffect(() => {
    fetchMachinesList();
  }, [addMachineHandler]);
  return (
    <div className="p-6">
      <AddMachineForm addMachineHandler={addMachineHandler} />
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
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Sync Manually
              </th>{' '}
              <th className="py-3 px-6 text-left text-xs font-semibold  uppercase">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {machinesList &&
              machinesList.map((machine) => (
                <tr className="border-t border-gray-200">
                  <td className="py-4 px-6">{machine.ip}</td>
                  <td className="py-4 px-6">{machine.port}</td>
                  <td className="py-4 px-6">{machine.name}</td>
                  <td className="py-4 px-6">
                    {machine.status === 'active' ? (
                      <span className="text-green-500 font-semibold">
                        {machine.status}
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        {machine.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {formattedDate(machine.last_synced)}
                  </td>
                  <td className="py-4 px-6">
                    {/* Sync Button */}
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() => syncMachineHandler(machine)}
                    >
                      Sync
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    {/* Delete Icon */}
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteModal(machine)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {machineToDelete && (
        <Modal
          isOpen={isModalOpen}
          title="Confirm Deletion"
          onCancel={() => setIsModalOpen(false)}
          onSubmit={deleteMachineHandler}
        >
          <p>Are you sure you want to delete machine {machineToDelete.name}?</p>
        </Modal>
      )}
    </div>
  );
};

export default Home;
