import { useState } from 'react';

type AddFormModalProps = {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function AddFormModal({ onClose, onSubmit }: AddFormModalProps) {
  const [formName, setFormName] = useState<string>('');

  return (
    <div className='fixed inset-0 z-100 flex items-start justify-center bg-overlay-shade'>
      <div className='bg-white rounded-lg shadow-lg w-[400px] p-6 relative mt-[100px]'>

        {/* Close button */}
        <button 
          className='absolute top-[-10px] right-[-10px] text-gray-500 bg-gray-100 shadow-custom-shadow-1 rounded-[50%] w-8 h-8 
          hover:cursor-pointer hover:text-active-text'
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <p className='text-[18px] font-medium mb-4'>Name your form page</p>

        {/* Input */}
        <input
          type='text'
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-1 mb-4 focus:outline-none focus:ring focus:border-royal-blue-1'
        />

        {/* Continue button */}
        <button
          onClick={() => onSubmit(formName)}
          className={`
            bg-royal-blue-1 text-white px-3 py-1 rounded float-right 
            ${formName.trim().length === 0 ? 'opacity-30' : 'hover:cursor-pointer hover:opacity-70'}
          `}
          disabled={formName.trim().length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}