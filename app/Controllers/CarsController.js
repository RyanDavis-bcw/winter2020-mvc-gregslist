import { ProxyState } from "../AppState.js"
import { carsService } from "../Services/CarsService.js"

function _drawCars() {
  console.log(5)
  let cars = ProxyState.cars
  let template = ''
  cars.forEach(car => {
    // NOTE Getters FAKE properties as methods
    template += car.Template
  })
  document.getElementById('cars').innerHTML = template
}

function _drawCarButton() {
  document.getElementById('carButton').innerHTML = `<div class="col text-right">
        <button type="button" class="btn btn-outline-warning" data-toggle="modal"
          data-target="#new-car-modal">+Car</button>
        <div class="modal fade" id="new-car-modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">NEW CAR FORM</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onsubmit="app.carsController.createCar()">
                  <input type="text" id="make" placeholder="make" required>
                  <input type="text" id="model" placeholder="model" required>
                  <input type="number" id="year" placeholder="year" required min="1885" value="2020">
                  <input type="number" id="price" placeholder="price" required min="1">
                  <input type="text" id="description" placeholder="description">
                  <input type="text" id="imgUrl" placeholder="Image Url">
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>`
}

export default class CarsController {
  constructor() {
    ProxyState.on("cars", _drawCars)
    _drawCars()
    _drawCarButton()
    this.getCars()
  }

  getCars() {
    try {
      carsService.getCars()
    } catch (error) {
      console.error(error)
    }

  }

  createCar() {
    window.event.preventDefault()
    console.log("creating car", 1)
    let form = window.event.target
    let newCar = {
      make: form['make'].value,
      model: form['model'].value,
      year: form['year'].value,
      price: form['price'].value,
      description: form['description'].value,
      imgUrl: form['imgUrl'].value
    }
    try {
      carsService.createCar(newCar)
    } catch (error) {
      console.error(error)
    }
    console.log(7)
    // @ts-ignore
    form.reset()
    // @ts-ignore
    document.getElementById("new-car-modal").modal('hide');
  }


  deleteCar(id) {
    console.log(id)
    try {
      carsService.deleteCar(id)
    } catch (error) {
      console.error(error)
    }
  }
  bid(id, price) {
    try {
      carsService.bid(id, price)
    } catch (error) {
      console.error(error)
    }
  }
}