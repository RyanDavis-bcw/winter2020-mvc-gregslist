import { generateId } from "../Utils/GenerateId.js"

export default class Home {
  constructor(bedrooms, bathrooms, levels, year, price, description, imgUrl) {
    this.id = generateId()
    this.bedrooms = bedrooms
    this.bathrooms = bathrooms
    this.levels = levels
    this.imgUrl = imgUrl
    this.year = year
    this.price = price
    this.description = description
  }

  get Template() {
    return `<div class="col-md-4 col-6 mt-3">
        <div class="card">
          <img class="card-img-top" src="${this.imgUrl}" alt="">
          <div class="card-body">
            <h4 class="card-title"> Built in: ${this.year} ${this.bedrooms} bed  ${this.bathrooms} bath ${this.levels} stories</h4>
            <p class="card-text">${this.description}</p>
            <p class="card-text">$${this.price}</p>
            <div class="text-right">
              <button type="button" class="btn btn-danger" onclick="app.homesController.deleteHome('${this.id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>`
  }

}