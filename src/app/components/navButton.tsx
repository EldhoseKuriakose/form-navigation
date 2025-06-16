import React, { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { MoreIcon } from '@/app/assets/images';
import { settingsMenuData } from '@/app/lib/data';

type NavButtonProps = {
  title: string;
  isActive?: boolean;
  onClick: () => void;
  icon: StaticImageData;
  buttonIndex: number;
};

export default function NavButton({ title, isActive, onClick, icon, buttonIndex }: NavButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // Hiding the settings menu on outside click if it is open
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    // Mouse event listeners
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Cleanup on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Update the state on settings menu click
  const handleSettingsMenuClick = (e: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {
    e.preventDefault();
    setIsMenuOpen(isMenuOpen => !isMenuOpen);
  }

  return (
    <div 
      className={`
        ${isActive ? 
          'bg-white border-white text-active-text' 
          : 'bg-disabled-primary border-disabled-primary text-disabled-text hover:bg-disabled-secondary hover:border-disabled-secondary'
        } 
        flex items-center hover:cursor-pointer font-medium text-[14px] pl-2.5 pr-1 py-1 rounded-lg shadow-custom-shadow-1 border-[0.5px] focus:border-royal-blue-1 
        focus:shadow-custom-shadow-2 relative z-10 transition-colors duration-100 ease-linear
      `}
      tabIndex={0}
      onClick={onClick}
    >
      <Image src={icon} alt={title} className='w-[20px] h-[20px] mr-1' draggable={false} />
      <span className='pr-1.5'>{title}</span>

      {/* More button */}
      {isActive && (
        <details 
          className='relative ml-auto'
          ref={menuRef}
          open={isMenuOpen}
          onClick={handleSettingsMenuClick}
        >

          <summary className='list-none cursor-pointer'>
            <Image src={MoreIcon} alt='settings' className='w-4 h-4' />
          </summary>

          {/* Settings menu */}
          <div className='absolute shadow-custom-shadow-1 z-50 w-[240px] rounded-xl overflow-hidden bottom-10 translate-x-[-30%]'>
            <div className='bg-gray-shade-3 border-b border-b-gray-shade-2 text-[16px] font-bold text-active-text py-2 px-2.5'>Settings</div>
            <div className='bg-white py-2 px-3'>
              {settingsMenuData.map((menu, index) => (
                <button 
                  key={menu.id} 
                  disabled={menu.title === "Set as first page" && buttonIndex === 0}
                  className={`
                    flex items-center py-1.5 text-[14px] font-medium w-full hover:cursor-pointer transition-opacity duration-150 
                    ${index === settingsMenuData.length - 1 ? 'border-t border-gray-shade-2' : ''} 
                    ${menu.title === 'Delete' ? 'text-red-shade-1' : 'text-active-text'}
                    ${(menu.title === "Set as first page" && buttonIndex === 0) ? 'opacity-30' : 'hover:opacity-70'}
                  `}
                >
                  <Image src={menu.icon} alt={menu.title} className='w-4 h-4 mr-1' />
                  {menu.title}
                </button>
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  );
}