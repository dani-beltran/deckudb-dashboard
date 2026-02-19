export type JobStatus = 'running' | 'queued' | 'completed'
export type JobType = 'scrape_game' | 'generate_game'

export interface Job {
  id: number
  name: string
  type: JobType
  status: JobStatus
  gameName: string
  queuedAt?: string
  startedAt?: string
  completedAt?: string
  progress?: number
  duration?: string
}
