import { generateId } from "../Utils/GenerateId.js"

export default class Home {
  constructor({ bedrooms, bathrooms, levels, year, price, description, imgUrl, id }) {
    this.bedrooms = bedrooms
    this.bathrooms = bathrooms
    this.levels = levels
    this.imgUrl = imgUrl
    this.year = year
    this.price = price
    this.description = description
    this.id = id
  }

  get Template() {

    return `
    <div class="col-md-4 col-6 mt-3">
        <div class="card">
          <img class="card-img-top" src="${this.imgUrl}" alt="">
        <div class="card-body">
            <h4 class="card-title"> Built in: ${this.year} ${this.bedrooms} bed  ${this.bathrooms} bath ${this.levels} stories</h4>
            <p class="card-text">${this.description}</p>
            <p class="card-text">$${this.price}</p>
            <div class="text-right">
            <button type="button" class="btn btn-success" onclick="app.homesController.bid('${this.id}', '${this.price += 500}')">Bid</button>
            <button type="button" class="btn btn-danger" onclick="app.homesController.deleteHome('${this.id}')">Delete</button>
            <button type="button" class="btn btn-outline-danger" data-toggle="modal"
            data-target="#edit-modal-${this.id}">Edit Home</button>
          </div>
        </div>
          <div class="modal fade" id="edit-modal-${this.id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form  id= "${this.id}"onsubmit="app.homesController.editHome('${this.id}')">
                  <input type="number" id="bedrooms" placeholder="${this.bedrooms}" >
                  <input type="number" id="bathrooms" placeholder="${this.bathrooms}" >
                  <input type="number" id="levels" placeholder="${this.levels}" >
                  <input type="number" id="year" placeholder="${this.year}"  min="1885" value="2020">
                  <input type="number" id="price" placeholder="${this.price}"  min="1">
                  <input type="text" id="description" placeholder="${this.description}">
                  <input type="text" id="imgUrl" placeholder="${this.imgUrl}">
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" form = "${this.id}" class="btn btn-primary">Save Changes</button>
                </form>
                 </div>
               </div>
            </div>
         </div>
       </div>
      </div>
    </div>`
  }

}