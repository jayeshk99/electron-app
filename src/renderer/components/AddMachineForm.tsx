import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';

type MachineFormData = {
  ip: string;
  port: string;
  name: string;
};

const AddMachineForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MachineFormData>();

  const onSubmit = (data: MachineFormData) => {
    console.log('Machine Data: ', data);
    setIsModalOpen(false); // Close modal on submit
  };

  return (
    <div>
      {/* Add Machine Button */}
      <div className="justify-end">
        <button
          className="bg-gray-700 hover:bg-gray-700 text-white justify-end py-2 px-4 rounded-md shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add Machine to Sync
        </button>
      </div>

      {/* Modal with Form */}
      <Modal
        isOpen={isModalOpen}
        title="Add Machine"
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              IP Address
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full p-2"
              {...register('ip', { required: 'IP Address is required' })}
            />
            {errors.ip && (
              <span className="text-red-500 text-sm">{errors.ip.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Port
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full p-2"
              {...register('port', { required: 'Port is required' })}
            />
            {errors.port && (
              <span className="text-red-500 text-sm">
                {errors.port.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full p-2"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
        </form>
        <div>
          <button className="rounded-md bg-gray-300 p-2">
            Test Connection
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddMachineForm;
