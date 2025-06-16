import {
  InfoActive,
  InfoInactive,
  DocActive,
  DocInactive,
  CheckActive,
  CheckInactive,
  FlagIcon,
  EditIcon,
  CopyIcon,
  DuplicateIcon,
  DeleteIcon
} from '@/app/assets/images';
import { generateRandomId } from '@/app/lib/customFunctions';
import { NavigationPageData, SettingsMenuData } from './types';

// Navigation pages default data
export const navigationPagesData: NavigationPageData[] = [
  {
    id: generateRandomId(),
    title: 'Info',
    active_icon: InfoActive,
    inactive_icon: InfoInactive
  },
  {
    id: generateRandomId(),
    title: 'Details',
    active_icon: DocActive,
    inactive_icon: DocInactive
  },
  {
    id: generateRandomId(),
    title: 'Other',
    active_icon: DocActive,
    inactive_icon: DocInactive
  },
  {
    id: generateRandomId(),
    title: 'Ending',
    active_icon: CheckActive,
    inactive_icon: CheckInactive
  }
];

// Settings menu data
export const settingsMenuData: SettingsMenuData[] = [
  {
    id:  generateRandomId(),
    title: 'Set as first page',
    icon: FlagIcon
  },
  {
    id:  generateRandomId(),
    title: 'Rename',
    icon: EditIcon
  },
  {
    id:  generateRandomId(),
    title: 'Copy',
    icon: CopyIcon
  },
  {
    id:  generateRandomId(),
    title: 'Duplicate',
    icon: DuplicateIcon
  },
  {
    id:  generateRandomId(),
    title: 'Delete',
    icon: DeleteIcon
  }
];