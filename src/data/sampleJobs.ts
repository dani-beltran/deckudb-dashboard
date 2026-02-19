import { Job } from '../types';

export const sampleJobs: Job[] = [
  {
    id: 1,
    name: 'Scrape Game',
    type: 'scrape_game',
    status: 'running',
    gameName: 'Elden Ring',
    startedAt: new Date().toISOString(),
    progress: 45
  },
  {
    id: 2,
    name: 'Generate Game',
    type: 'generate_game',
    status: 'queued',
    gameName: 'Cyberpunk 2077',
    queuedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Scrape Game',
    type: 'scrape_game',
    status: 'completed',
    gameName: 'Portal 2',
    completedAt: new Date().toISOString(),
    duration: '2m 34s'
  },
  {
    id: 4,
    name: 'Generate Game',
    type: 'generate_game',
    status: 'completed',
    gameName: 'Half-Life 2',
    completedAt: new Date().toISOString(),
    duration: '1m 12s'
  },
  {
    id: 5,
    name: 'Scrape Game',
    type: 'scrape_game',
    status: 'queued',
    gameName: 'The Witcher 3',
    queuedAt: new Date().toISOString()
  }
];
