import { AxiosResponse } from "axios"

type Base<T = unknown> = {
  message: string,
  status: 200 | 201 | 404 | 401 | 400,
  pagination: {
    current_page: number,
    total_items: number,
  },
  data: T,
}

export type APIResponse<T = unknown> = AxiosResponse<Base<T>>

