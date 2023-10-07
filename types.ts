import { Member, Server, Profile, Channel } from '@prisma/client';
import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
  // channels: Channel
};

export type NextResponseServerIo = NextApiResponse & {
  socket: Socket & { server: NetServer & { io: SocketIOServer } };
};
