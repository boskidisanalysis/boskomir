'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const EmptyBoards = () => {
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)
    const { organization } = useOrganization()

    const onClick = () => {
        if (!organization) return
        mutate({
            title: 'Untitled',
            orgId: organization.id,
        })
            .then((id) => {
                toast.success('Board created')
                // TODO: redirect to dashboard/[id]
                router.push(`/board/${id}`)
            })
            .catch(() => toast.error('Failed to create board'))
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Image src="/note.svg" height={110} width={110} alt="Empty" />
            <h2 className="mt-6 text-2xl font-semibold">
                Create your first board!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoards
