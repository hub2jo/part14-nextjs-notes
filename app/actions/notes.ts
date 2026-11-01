"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addNote, toggleImportance } from "../services/notes"
import { auth } from "@/auth"

type NoteFormState = { error: string; success: boolean }

export const createNote = async (
  prevState: NoteFormState,
  formData: FormData
): Promise<NoteFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  
  const content = (formData.get("content") as string)?.trim()

  if (!content || content.length < 10) {
    return {
      error: "Note content must be at least 10 characters long",
      success: false,
    }
  }

  const important = formData.get("important") === "on"
  await addNote(content, important)

  revalidatePath("/notes")
  return { error: "", success: true }
}

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await toggleImportance(id)

  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}