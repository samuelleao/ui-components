import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import axios from "axios";
import { APIResponse } from "@/types/api-response";

export async function loginAPI(){
  const response = await axios.post("")
  return response
}

type loginResponse = {
  token: string
}

type loginPayload = {
  username: string,
  password: string
}

export function Login() {
  const form = useForm()

  const { data, isPending, mutateAsync } = useMutation<APIResponse<loginResponse>, Error, loginPayload>({ mutationFn: loginAPI })

  function sendForm(payload: loginPayload){
    mutateAsync(payload)
  }

  // Token
  console.log(data.data.data.token)

  return (
    <form onSubmit={form.handleSubmit(sendForm)}>
      <Input label="Username" placeholder="Type your username" {...form.register("username")} />
      <Input label="Password" placeholder="Type your password" {...form.register("password")} type="password" />
      <Button loading={isPending} loadingText="Accessing...">Continue</Button>
    </form>
  )
}