'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Hint } from '@/components/hint'
import { useRenameModal } from '@/store/use-rename-modal'
import { Actions } from '@/components/actions'
import { Menu } from 'lucide-react'

interface InfoProps {
    boardId: string
}

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

const TabSeparator = () => {
    return <div className="px-1.5 text-neutral-300">
        |
    </div>
}

export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal()
    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>,
    })

    if (!data) return <InfoSkeleton />
    return (
        <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
            <Hint label="Go to Boards" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Board Logo"
                            height={40}
                            width={40}
                        />
                        <span
                            className={cn(
                                'ml-2 text-xl font-semibold text-black',
                                font.className
                            )}
                        >
                            Board
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label='Edit title' side='bottom' sideOffset={10}>
            <Button
                variant="board"
                className='text-base font-normal px-2'
                onClick={()=> onOpen(data._id, data.title)}
            >
                {data.title}
            </Button>
            </Hint>
            <TabSeparator />
            <Actions
            id={data._id}
            title={data.title}
            side='bottom'
            sideOffset={10}
            >
                <div>
                <Hint label='Main menu' side='bottom' sideOffset={10}>
                    <Button size="icon" variant="board">
                        <Menu />
                    </Button>
                </Hint>
                </div>
            </Actions>
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md">
            <Skeleton className="bg-muted-400 h-full w-full" />
        </div>
    )
}
