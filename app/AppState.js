import Car from "./Models/Car.js"
import Home from "./Models/Home.js"
import Job from "./Models/Job.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Car[]} */
  cars = [new Car({ make: "Benz", model: "1", year: 1985, price: 10000000, description: "Its old", imgUrl: "https://d1vl6ykwv1m2rb.cloudfront.net/blog/wp-content/uploads/2018/03/20142414/auto-11.jpg" })]

  /** @type {Home[]} */
  homes = [new Home(4, 3.5, 2, 1800, 5, "AHHHHHHHHHHHHHHHHH", "https://i.pinimg.com/736x/39/7f/c9/397fc9de0c7f723f6f024cffa4c3669f.jpg")]

  /**@type {Job[]} */
  jobs = [new Job("Umbrella Corp.", "Waste Disposal", 80, 10, "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.")]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
