'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  endpoint: 'serverImage' | 'messageFile';
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value.split('.').pop();

  if (value && fileType !== 'pdf')
    return (
      <div className="relative h-20 w-20">
        <Image src={value} fill alt="Upload" className="rounded-full" />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-md"
          onClick={() => onChange('')}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );

  if (value && fileType === 'pdf') {
    return (
      <div className="relative flex items-center p-2 mt-4 rounded-md bg-background/10 ">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-200" />
        <a
          className="ml-2 hover:underline text-sm text-indigo-500 dark:text-indigo-400"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-0 -right-0 shadow-md"
          onClick={() => onChange('')}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log(res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
