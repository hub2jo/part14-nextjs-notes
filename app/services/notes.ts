import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { notes } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getNotes = async (importantOnly: boolean) => {
  if (importantOnly) {
    return db.query.notes.findMany({
      where: eq(notes.important, true),
    })
  }

  return db.query.notes.findMany()
}

export const getNoteById = async (id: number) => {
  return db.query.notes.findFirst({
    where: eq(notes.id, id),
  })
}

export const addNote = async (content: string, important: boolean) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    throw new Error("cannot create a note: no users exist")
  }

  await db.insert(notes).values({ content, important, userId: user.id })
}

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id)
  if (note) {
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id))
  }
}