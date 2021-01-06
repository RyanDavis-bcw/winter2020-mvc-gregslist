import { ProxyState } from "../AppState.js"
import Job from "../Models/Job.js"
import { api } from "../Services/AxiosService.js"
class JobService {
  async getJob(newJob) {
    let res = await api.get('jobs')
    console.log(res.data)
    ProxyState.jobs = res.data.map(j => new Job(j))
  }
  async createJob(newJob) {
    let job = await api.post("jobs", newJob)
    console.log(job)
    ProxyState.jobs = [...ProxyState.jobs, new Job(job.data)]
  }
  async deleteJob(id) {
    let res = await api.delete("jobs/" + id)
    console.log(res.data)
    ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
  }
  async getOne(id) {
    let res = api.get("jobs/" + id)
    console.log(res.data)
  }


}



export const jobService = new JobService