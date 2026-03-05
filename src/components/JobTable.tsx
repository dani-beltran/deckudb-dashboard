import { useState, useMemo } from 'react'
import type { Job, JobStatus } from '../types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import './JobTable.css'

interface JobTableProps {
  jobs: Job[]
}

type SortDirection = 'asc' | 'desc'

const STATUS_LABELS: Record<JobStatus, string> = {
  queued: 'Queued',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
}

const STATUS_ALL = 'all'
type FilterStatus = JobStatus | typeof STATUS_ALL

const formatDate = (iso: string | null): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const shortId = (id: string): string => id.split('-')[0]

function JobTable({ jobs }: JobTableProps) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(STATUS_ALL)
  const [sortDir, setSortDir] = useState<SortDirection>('desc')

  const filtered = useMemo(() => {
    let result = jobs

    if (filterStatus !== STATUS_ALL) {
      result = result.filter((j) => j.status === filterStatus)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((j) => j.game_name?.toLowerCase().includes(q))
    }

    result = [...result].sort((a, b) => {
      const diff =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      return sortDir === 'desc' ? -diff : diff
    })

    return result
  }, [jobs, search, filterStatus, sortDir])

  const toggleSort = () =>
    setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))

  const filterOptions: FilterStatus[] = [
    STATUS_ALL,
    'queued',
    'in_progress',
    'completed',
    'failed',
  ]

  return (
    <div className="job-table-container">
      <div className="job-table-toolbar">
        <input
          className="job-table-search"
          type="text"
          placeholder="Search by game name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="job-table-filters">
          {filterOptions.map((s) => (
            <button
              type="button"
              key={s}
              className={`filter-btn ${filterStatus === s ? 'active' : ''} ${s !== STATUS_ALL ? s : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s === STATUS_ALL ? 'All' : STATUS_LABELS[s as JobStatus]}
            </button>
          ))}
        </div>
      </div>

      <div className="job-table-wrapper">
        <table className="job-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Game</th>
              <th>Status</th>
              <th>Started At</th>
              <th>Completed At</th>
              <th
                className="sortable"
                onClick={toggleSort}
                title="Toggle sort direction"
              >
                Created At{' '}
                <span className="sort-icon">
                  {sortDir === 'desc' ? '↓' : '↑'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-row">
                  No jobs match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((job) => (
                <tr key={job.job_id} className={`job-row status-${job.status}`}>
                  <td className="col-id" title={job.job_id}>
                    {shortId(job.job_id)}
                  </td>
                  <td className="col-type">
                    <span className={`type-badge ${job.job_type}`}>
                      {job.job_type}
                    </span>
                  </td>
                  <td className="col-game">{job.game_name ?? '—'}</td>
                  <td className="col-status">
                    <span className={`status-badge ${job.status}`}>
                      {STATUS_LABELS[job.status]}
                    </span>
                    {job.status === 'failed' && job.error_message && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="error-tooltip">⚠</span>
                          </TooltipTrigger>
                          <TooltipContent>{job.error_message}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </td>
                  <td className="col-date">{formatDate(job.started_at)}</td>
                  <td className="col-date">{formatDate(job.completed_at)}</td>
                  <td className="col-date">{formatDate(job.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="job-table-count">
        Showing {filtered.length} of {jobs.length} jobs
      </p>
    </div>
  )
}

export default JobTable
