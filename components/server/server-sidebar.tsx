import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole, TypeEnum } from '@prisma/client';
import { redirect } from 'next/navigation';
import ServerHeader from './server-header';
import { ScrollArea } from '../ui/scroll-area';
import ServerSearch from './server-search';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) redirect('/');

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          created_at: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  if (!server) redirect('/');

  const iconMap = {
    [TypeEnum.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [TypeEnum.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
    [TypeEnum.VIDEO]: <Video className="mr-2 w-4 h-4" />,
  };

  const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-rose-500" />,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />
    ),
  };

  const textChannels = server?.channels.filter(
    (channel) => channel.type === TypeEnum.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === TypeEnum.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === TypeEnum.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text channels',
                type: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Voice channels',
                type: 'channel',
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Video channels',
                type: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((member) => ({
                  id: member.id,
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
