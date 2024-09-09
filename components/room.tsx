"use client"
import { ReactNode } from "react"
import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
  } from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

  
interface RoomProps {
    children: ReactNode
    roomId: string
    fallback: NonNullable<ReactNode>|null
}
export const Room =({
    children,
    roomId,
    fallback
}: RoomProps) => {
    // const liveblocks_public_api = process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!
    
    return(
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
            <RoomProvider id={roomId} 
            initialPresence={{
                cursor: null,
                selection:[]
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList<string>([""])
              }}
            >
            <ClientSideSuspense fallback={fallback}>
                {()=> children}
            </ClientSideSuspense>
        </RoomProvider>  
        </LiveblocksProvider>
      
    )
}
