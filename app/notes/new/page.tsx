"use client"

import { useActionState, useEffect } from "react"
import { createNote } from "@/app/actions/notes"
import { useRouter } from "next/navigation"
import { useNotification } from "@/app/components/NotificationContext"

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
    <div>
      <h2>Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type="text" name="content" required minLength={10} />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="important" />
            Important
          </label>
        </div>
        <button type="submit" disabled={pending}>Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewNote