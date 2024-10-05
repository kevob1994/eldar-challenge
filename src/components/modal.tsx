import { useClickOutside } from "@hooks";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: IModalProps) {
  const modalRef = useClickOutside(onClose);
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        ref={modalRef}
        className='relative bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3'
      >
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-30'
        >
          <IoMdClose size={25}/> 
        </button>
        {children}
      </div>
    </div>
  );
}
