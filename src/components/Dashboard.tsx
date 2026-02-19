import { useState } from 'react';
import JobList from './JobList';
import { sampleJobs } from '../data/sampleJobs';
import { Job } from '../types';
import './Dashboard.css';

function Dashboard() {
  const [jobs] = useState<Job[]>(sampleJobs);

  const runningJobs = jobs.filter(job => job.status === 'running');
  const queuedJobs = jobs.filter(job => job.status === 'queued');
  const completedJobs = jobs.filter(job => job.status === 'completed');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Job Dashboard</h1>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{runningJobs.length}</span>
            <span className="stat-label">Running</span>
          </div>
          <div className="stat">
            <span className="stat-value">{queuedJobs.length}</span>
            <span className="stat-label">Queued</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completedJobs.length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </header>

      <div className="job-sections">
        <JobList title="Queued" jobs={queuedJobs} status="queued" />
        <JobList title="Running" jobs={runningJobs} status="running" />
        <JobList title="Completed" jobs={completedJobs} status="completed" />
      </div>
    </div>
  );
}

export default Dashboard;
