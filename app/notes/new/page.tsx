"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createNote } from "@/app/actions/notes"
import { useNotification } from "@/app/components/NotificationContext"
import FormField from "@/app/components/FormField"
import Button from "@/app/components/Button"

const initialState: Parameters<typeof createNote>[0] = {
  error: "",
  success: false,
}

const NewNote = () => {
  const [state, formAction, pending] = useActionState(createNote, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("note created")
      router.push("/notes")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new note</h2>
      <form action={formAction} className="space-y-4">
        <FormField label="Content" type="text" name="content" required minLength={10} />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="important" className="h-4 w-4" />
          Important
        </label>
        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
        <Button type="submit" disabled={pending || state.success}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default NewNote