import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const body = await req.json();
    const { name, imageUrl } = body;

    if (!profile) return new NextResponse('UnAuthorized', { status: 401 });

    if (!params.serverId)
      return new NextResponse('Server id is missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        imageUrl,
        name,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
