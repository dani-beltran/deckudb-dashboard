export type JobStatus = 'queued' | 'in_progress' | 'completed' | 'failed'
export type JobType = 'scrape' | 'generate'

export interface Job {
  job_id: string
  job_type: JobType
  game_id: number
  game_name?: string
  status: JobStatus
  started_at: string | null
  completed_at: string | null
  error_message?: string
  created_at: string
  updated_at: string
}
