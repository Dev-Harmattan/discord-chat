'use client';

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import ActionTooltip from '@/components/action-tooltip';

interface NavigationActionProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationActionProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center" side="right">
      <button onClick={onClick} className="flex items-center group relative">
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <div
          className={cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            params?.serverId === id &&
              'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <Image fill src={imageUrl} alt="channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
