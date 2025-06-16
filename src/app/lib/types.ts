import type { StaticImageData } from 'next/image';

export type NavigationPageData = {
  id: string;
  title: string;
  active_icon: StaticImageData;
  inactive_icon: StaticImageData;
};

export type SettingsMenuData = {
  id: string;
  title: string;
  icon: StaticImageData;
}