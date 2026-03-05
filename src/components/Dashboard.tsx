import { useState } from 'react'
import { sampleJobs } from '../data/sampleJobs'
import type { Job } from '../types'
import JobTable from './JobTable'
import './Dashboard.css'

function Dashboard() {
  const [jobs] = useState<Job[]>(sampleJobs)

  const inProgressJobs = jobs.filter((job) => job.status === 'in_progress')
  const queuedJobs = jobs.filter((job) => job.status === 'queued')
  const completedJobs = jobs.filter((job) => job.status === 'completed')
  const failedJobs = jobs.filter((job) => job.status === 'failed')

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Job Dashboard</h1>
        <div className="stats">
          <div className="stat in_progress">
            <span className="stat-value">{inProgressJobs.length}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat queued">
            <span className="stat-value">{queuedJobs.length}</span>
            <span className="stat-label">Queued</span>
          </div>
          <div className="stat completed">
            <span className="stat-value">{completedJobs.length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat failed">
            <span className="stat-value">{failedJobs.length}</span>
            <span className="stat-label">Failed</span>
          </div>
        </div>
      </header>

      <JobTable jobs={jobs} />
    </div>
  )
}

export default Dashboard
