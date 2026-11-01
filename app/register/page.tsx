import { registerUser } from "@/app/actions/users"
import FormField from "@/app/components/FormField"
import Button from "@/app/components/Button"

const messages: Record<string, string> = {
  invalid: "All fields are required and the password must be at least 3 characters",
  taken: "That username is already taken",
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && messages[error] && (
        <p className="text-red-600 text-sm mb-4">{messages[error]}</p>
      )}
      <form action={registerUser} className="space-y-4">
        <FormField label="Username" type="text" name="username" required />
        <FormField label="Name" type="text" name="name" required />
        <FormField label="Password" type="password" name="password" required minLength={3} />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  )
}