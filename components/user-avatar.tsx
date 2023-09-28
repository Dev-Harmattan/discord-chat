import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className?: string;
  src?: string;
}

const UserAvatar = ({ className, src }: UserAvatarProps) => {
  return (
    <Avatar className={cn('h-7 w-7 md:10 md:10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
