'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from './user-avatar'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { connectionIdToColor } from '@/lib/utils'

const MAX_SHOWN_USERS = 2

export const Participants = () => {
    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUsers = users.length > MAX_SHOWN_USERS
    return (
        <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
            <div className="flex gap-x-2">
                {users
                    .slice(0, MAX_SHOWN_USERS)
                    .map(({ connectionId, info }) => {
                        return (
                            <UserAvatar
                                borderColor={connectionIdToColor(connectionId)}
                                key={connectionId}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name?.[0] || 'T'}
                            />
                        )
                    })}
                {currentUser && (
                    <UserAvatar
                    borderColor={connectionIdToColor(currentUser.connectionId)}
                    src={currentUser.info?.picture}
                    name={`${currentUser.info?.name} (You)`}
                    fallback={currentUser.info?.name?.[0]}
                    />
                )}
                {hasMoreUsers && (
                    <UserAvatar 
                     name={`${users.length - MAX_SHOWN_USERS} more`}
                     fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute right-2 top-2 flex h-12 w-[100px] items-center rounded-md bg-white p-3 shadow-md">
            <Skeleton className="bg-muted-400 h-full w-full" />
        </div>
    )
}
