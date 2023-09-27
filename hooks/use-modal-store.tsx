import { create } from 'zustand';

export type modalType = 'createServer';

interface ModalProps {
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalProps>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
