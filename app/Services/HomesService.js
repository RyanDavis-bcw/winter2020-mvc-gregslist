import { ProxyState } from "../AppState.js"
import Home from "../Models/Home.js"

class HomesService {
  deleteHome(id) {
    ProxyState.homes = ProxyState.homes.filter(home => home.id != id)
  }
}

export const homesService = new HomesService