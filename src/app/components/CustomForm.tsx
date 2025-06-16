type CustomFormProps = {
  title: string;
  handleNext: () => void;
}

export default function CustomForm({ title, handleNext }: CustomFormProps) {
  return (
    <form className='flex flex-col'>
      <p className='text-white text-[24px] font-bold'>{title}</p>
      <label className='text-[20px] text-white font-medium'>What&apos;s your name?<sup>*</sup></label>
      <input 
        className='text-[18px] text-white font-medium border border-blue-shade-2 bg-blue-shade-1 outline-0 px-2 min-w-[30vw] rounded-sm mt-2 py-1' 
      />

      {/* Next button */}
      <button 
        className='bg-primary-button rounded-sm self-start px-4 py-1.5 mt-4 hover:cursor-pointer hover:opacity-70' 
        type='button'
        onClick={handleNext}  
      >
        Next
      </button>
    </form>
  );
}