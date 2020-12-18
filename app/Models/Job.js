import { generateId } from "../Utils/GenerateId.js"

export default class Job {
  constructor(company, jobTitle, hours, rate, description) {
    this.id = generateId()
    this.company = company
    this.jobTitle = jobTitle
    this.hours = hours
    this.rate = rate
    this.description = description
  }

  get Template() {
    return `<div class="col-md-4 col-6 my-3">
        <div class="card">
          <div class="card-body">
            <h4>${this.company}</h4>
            <h5>${this.jobTitle}</h5>
            <h6>${this.hours}hours/wk - $${this.rate}/hr</h6>
            <p class="card-text">${this.description}</p>
            <div class="text-right">
              <button class="btn btn-danger" onclick="dostuff">DELETE</button>
            </div>
          </div>
        </div>
      </div>`
  }
}