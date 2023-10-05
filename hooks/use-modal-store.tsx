import { Server } from '@prisma/client';
import { create } from 'zustand';

export type modalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer';

interface ModalData {
  server?: Server;
}

interface ModalProps {
  type: modalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: modalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
