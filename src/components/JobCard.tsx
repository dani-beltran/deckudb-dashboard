import type { Job, JobStatus, JobType } from '../types'
import './JobCard.css'

interface JobCardProps {
  job: Job
}

function JobCard({ job }: JobCardProps) {
  const getStatusIcon = (status: JobStatus): string => {
    switch (status) {
      case 'running':
        return '⚙️'
      case 'queued':
        return '⏳'
      case 'completed':
        return '✓'
      default:
        return '•'
    }
  }

  const getTypeIcon = (type: JobType): string => {
    return type === 'scrape_game' ? '🕷️' : '🎮'
  }

  const formatTime = (timestamp?: string): string => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <div className={`job-card ${job.status}`}>
      <div className="job-header">
        <span className="job-type-icon" title={job.type}>
          {getTypeIcon(job.type)}
        </span>
        <span className="job-name">{job.name}</span>
        <span className="job-status-icon">{getStatusIcon(job.status)}</span>
      </div>

      <div className="job-details">
        <div className="game-name">{job.gameName}</div>

        {job.status === 'running' && job.progress && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${job.progress}%` }} />
            <span className="progress-text">{job.progress}%</span>
          </div>
        )}

        <div className="job-meta">
          {job.status === 'running' && (
            <span className="meta-item">Started: {formatTime(job.startedAt)}</span>
          )}
          {job.status === 'queued' && (
            <span className="meta-item">Queued: {formatTime(job.queuedAt)}</span>
          )}
          {job.status === 'completed' && (
            <>
              <span className="meta-item">Completed: {formatTime(job.completedAt)}</span>
              {job.duration && <span className="meta-item">Duration: {job.duration}</span>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobCard
