import CarsController from "./Controllers/CarsController.js";
import HomesController from "./Controllers/HomesController.js"
import JobsController from "./Controllers/JobsController.js";
class App {
  //valuesController = new ValuesController();
  carsController = new CarsController()

  homesController = new HomesController()

  jobsController = new JobsController()
}

window["app"] = new App();
