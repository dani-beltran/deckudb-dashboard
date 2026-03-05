import type { Job } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export interface JobsResponse {
  data: Job[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function fetchJobs(params?: Record<string, string | number>): Promise<JobsResponse> {
  const url = new URL(`${BASE_URL}/jobs`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url.toString(), { credentials: 'include' })

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<JobsResponse>
}
