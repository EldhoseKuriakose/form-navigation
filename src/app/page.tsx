'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import CustomForm from '@/app/components/CustomForm';
import NavButton from '@/app/components/navButton';
import AddFormModal from '@/app/components/AddFormModal';
import { navigationPagesData } from '@/app/lib/data';
import { DocActive, DocInactive, PlusIcon, PlusRound } from '@/app/assets/images';
import { NavigationPageData } from '@/app/lib/types';
import { generateRandomId } from '@/app/lib/customFunctions';

export default function Home() {
  const [pagesData, setPagesData] = useState<NavigationPageData[]>([...navigationPagesData]);
  const [activePage, setActivePage] = useState<NavigationPageData>(pagesData[0]);
  const [draggedIndex, setDraggedIndex] = useState<null | number>(null);
  const [openAddFormModal, setOpenAddFormModal] = useState<{index: number, show: boolean}>({ index: 0, show: false });

  // Handling navigation button click
  const handleNavButtonClick = (item: NavigationPageData) => {
    setActivePage(item);
  }

  // Handling the navigation button drop on over another button
  const handleDropOverButton = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index);
    }
  }

  // Handling the navigation button drop on the gap between the navigation buttons
  const handleDropOnGap = (index: number) => {
    if (draggedIndex !== null) {
      moveItem(draggedIndex, index + 1);
    }
  }

  // Moving the navigation button to the dropped index position
  const moveItem = (fromIndex: number, toIndex: number) => {
    const updated = [...pagesData];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPagesData(updated);
  };

  // Handling adding a new form
  const handleAddForm = (formName: string) => {
    const formItem = {
      id: generateRandomId(),
      title: formName,
      // Temp icons
      active_icon: DocActive,
      inactive_icon: DocInactive
    };

    if (openAddFormModal.index > pagesData.length - 1) {
      // Add form as the last page
      setPagesData(prevPagesData => [...prevPagesData, formItem]);
    } else {
      // Add form in the given index
      const newFormData: NavigationPageData[] = [];
      pagesData.forEach((item, index) => {
        if (index === openAddFormModal.index) {
          newFormData.push(formItem);
        }

        // Push existing form items
        newFormData.push(item);
      });

      // Update state
      setPagesData([...newFormData]);
    }

    // Hide form modal
    setOpenAddFormModal(oldData => ({ ...oldData, show: false }));
  }

  // Move to next form
  const navigateToNextForm = () => {
    for (let i = 0; i < pagesData.length; i++) {
      if (pagesData[i].id === activePage.id) {

        // If active page is the last one do nothing else move to next page
        if (i !== pagesData.length - 1) {
          setActivePage(pagesData[i + 1]);
        }
      }
    }
  }

  return (
    <div className='w-full h-[100vh] flex flex-col justify-content-between'>
      
      <div className='m-auto'>
        {/* Sample form for demo, not retaining any form input values in state since this is a demo form */}
        <CustomForm 
          title={activePage.title} 
          handleNext={navigateToNextForm}
          key={activePage.id}
        />
      </div>

      {/* Navigation Bar */}
      <div className='bg-white p-5 mt-auto overflow-x-auto'>
        <div className='flex items-center w-max relative'>
          {pagesData.map((item, index) => (
            <Fragment key={item.id}>
              <div
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOverButton(index)}
              >
                <NavButton 
                  isActive={item.id === activePage.id}
                  title={item.title}
                  onClick={() => handleNavButtonClick(item)}
                  icon={item.id === activePage.id ? item.active_icon : item.inactive_icon}
                  buttonIndex={index}
                />
              </div>

              {index < pagesData.length - 1 ? (
                <div 
                  className='w-5 h-5 group relative transition-all duration-300 ease-in-out hover:cursor-pointer hover:w-[52px]'
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnGap(index)}
                >
                  {/* Plus button to add page displays on hover */}
                  <Image 
                    src={PlusRound} 
                    alt='add-page' 
                    className='w-6 h-6 absolute top-[-1px] left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out 
                    z-10 mx-4 hover:cursor-pointer'
                    onClick={() => setOpenAddFormModal({ index: index + 1, show: true })}
                  />
                </div>
              ) : (
                <div className='w-5 h-5'></div>
              )}
            </Fragment>
          ))}

          {/* Add page button */}
          <button 
            className='text-active-text bg-white text-[14px] font-medium px-2.5 py-1 rounded-[8px] flex items-center
            shadow-custom-shadow-1 relative z-10 hover:cursor-pointer'
            onClick={() => setOpenAddFormModal({ index: pagesData.length, show: true })}
          >
            <Image src={PlusIcon} alt="add-page" className='w-4 h-4 mr-1' />
            Add page
          </button>

          {/* Dashed line */}
          <div className='border-b border-b-gray-shade-1 border-dashed absolute left-0 right-0 top-[calc(50%-0.5px)]' />
        </div>
      </div>

      {/* Add form modal */}
      {openAddFormModal.show && (
        <AddFormModal 
          onClose={() => setOpenAddFormModal({ index: 0, show: false })}
          onSubmit={handleAddForm}
        />
      )}
    </div>
  );
}
