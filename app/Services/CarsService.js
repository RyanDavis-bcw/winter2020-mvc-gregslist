import { ProxyState } from "../AppState.js"
import Car from "../Models/Car.js"
import { api } from "../Services/AxiosService.js"

class CarsService {
  async deleteCar(id) {
    let res = await api.delete("cars/" + id)
    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  }
  async createCar(newCar) {
    let car = await api.post("cars", newCar)
    console.log(car)
    ProxyState.cars = [...ProxyState.cars, new Car(car.data)]
  }
  async getCars() {
    let res = await api.get("cars")
    console.log(res.data)
    ProxyState.cars = res.data.map(c => new Car(c))

  }
  async bid(id, newPrice) {
    let carData = { price: newPrice }
    let res = await api.put("cars/" + id, carData)
    console.log(res);
    this.getCars()

  }

}
// Singleton Pattern
export const carsService = new CarsService()