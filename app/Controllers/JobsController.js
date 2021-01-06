import { ProxyState } from "../AppState.js"
import { jobService } from "../Services/JobsService.js"

function _drawJobs() {
  let jobs = ProxyState.jobs
  let template = ''
  jobs.forEach(job => {
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}

function _drawJobButton() {
  document.getElementById('jobButton').innerHTML = `<div class="col text-right">
        <button type="button" class="btn btn-outline-secondary" data-toggle="modal"
          data-target="#new-job-modal">+Job</button>
        <div class="modal fade" id="new-job-modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">NEW JOB FORM</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onsubmit="app.jobsController.createJob()">
                  <input type="text" id="company" placeholder="Company" required>
                  <input type="text" id="jobTitle" placeholder="Job Title" required>
                  <input type="number" id="hours" placeholder="Expected Hours" required>
                  <input type="number" id="rate" placeholder="Rate of Pay" required min="10" >
                  <input type="text" id="description" placeholder="description">
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>`
}

export default class JobsController {
  constructor() {
    ProxyState.on("jobs", _drawJobs)
    _drawJobs()
    _drawJobButton()
    this.getJob()
  }

  getJob() {
    try {
      jobService.getJob()
    } catch (error) {
      console.error(error)
    }
  }

  createJob() {
    window.event.preventDefault()
    let form = window.event.target
    let newJob = {
      company: form['company'].value,
      jobTitle: form['jobTitle'].value,
      hours: form['hours'].value,
      rate: form['rate'].value,
      description: form['description'].value
    }
    try {
      jobService.createJob(newJob)
    } catch (error) {
      console.error(error)
    }
    //@ts-ignore
    form.reset()
    //@ts-ignore
    document.getElementById("new-job-modal").modal('hide')
  }

  deleteJob(id) {
    jobService.deleteJob(id)
  }
}
