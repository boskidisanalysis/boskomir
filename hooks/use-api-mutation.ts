import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";

interface ApiMutationReturnType<T extends FunctionReference<"mutation">> {
    pending: boolean
    mutate: (payload: T["_args"]) => Promise<T["_returnType"] | void>
}

export function useApiMutation<Mutation extends FunctionReference<"mutation">>(
    mutationFunction: Mutation,
  ): ApiMutationReturnType<Mutation>{
    const [pending, setPending] = useState(false)
    const apiMutation = useMutation(mutationFunction)
    const mutate = async (payload: Mutation["_args"]) => {
        setPending(true)
        return apiMutation(payload)
        .finally(()=> setPending(false))
        .then((result)=>{
            return result
        })
        .catch((error) => {
            throw error
        })
    }
    return {
        mutate,
        pending,
    }
}