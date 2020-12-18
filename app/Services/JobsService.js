import { ProxyState } from "../AppState.js"
import Job from "../Models/Job.js"

class JobService {
  deleteJob(id) {
    ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
  }
}



export const jobService = new JobService