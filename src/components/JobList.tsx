import type { Job, JobStatus } from '../types'
import JobCard from './JobCard'
import './JobList.css'

interface JobListProps {
  title: string
  jobs: Job[]
  status: JobStatus
}

function JobList({ title, jobs, status }: JobListProps) {
  return (
    <div className="job-list">
      <h2 className={`job-list-title ${status}`}>
        {title} ({jobs.length})
      </h2>
      <div className="job-cards">
        {jobs.length === 0 ? (
          <p className="empty-message">No {title.toLowerCase()} jobs</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  )
}

export default JobList
