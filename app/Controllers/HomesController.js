import { ProxyState } from "../AppState.js"
import { homesService } from "../Services/HomesService.js"
import { api } from "../Services/AxiosService.js"

function _drawHomes() {
  let homes = ProxyState.homes
  let template = ""

  homes.forEach(home => {
    template += home.Template
  })
  document.getElementById('homes').innerHTML = template
}

function _drawHomeButton() {
  document.getElementById('homeButton').innerHTML = `<div class="col text-right">
        <button type="button" class="btn btn-outline-danger" data-toggle="modal"
          data-target="#new-home-modal">+Home</button>
        <div class="modal fade" id="new-home-modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">NEW HOME FORM</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onsubmit="app.homesController.createHome()">
                  <input type="number" id="bedrooms" placeholder="bedrooms" required>
                  <input type="number" id="bathrooms" placeholder="bathrooms" required>
                  <input type="number" id="levels" placeholder="levels" required>
                  <input type="number" id="year" placeholder="year" required min="1885" value="2020">
                  <input type="number" id="price" placeholder="price" required min="1">
                  <input type="text" id="description" placeholder="description">
                  <input type="text" id="imgUrl" placeholder="Image Url">
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>`
}

export default class HomesController {
  constructor() {
    ProxyState.on("homes", _drawHomes)
    _drawHomes()
    _drawHomeButton()
    this.getHomes()
  }

  getHomes() {
    try {
      homesService.getHomes()
    } catch (error) {
      console.error(error)
    }
  }

  createHome() {
    window.event.preventDefault()
    let form = window.event.target
    let newHome = {
      bedrooms: form['bedrooms'].value,
      bathrooms: form['bathrooms'].value,
      imgUrl: form['imgUrl'].value,
      year: form['year'].value,
      price: form['price'].value,
      levels: form['levels'].value,
      description: form['description'].values
    }
    try {
      homesService.createHome(newHome)
    } catch (error) {
      console.error(error)
    }
  }

  deleteHome(id) {
    homesService.deleteHome(id)
  }

  bid(id, price) {
    try {
      homesService.bid(id, price)
    } catch (error) {
      console.error(error)
    }
  }
  editHome(id) {
    debugger
    event.preventDefault()
    let form = window.event.target
    let newValues = {
      bedrooms: form['bedrooms'].value,
      bathrooms: form['bathrooms'].value,
      imgUrl: form['imgUrl'].value,
      year: form['year'].value,
      price: form['price'].value,
      levels: form['levels'].value,
      description: form['description'].values
    }
    try {
      homesService.editHome(id, newValues)
    } catch (error) {
      console.error(error)
    }
    console.log(newValues)
  }
}
