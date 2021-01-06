import { ProxyState } from "../AppState.js"
import Home from "../Models/Home.js"
import { api } from "./AxiosService.js"

class HomesService {
  async deleteHome(id) {
    let res = await api.delete("houses/" + id)
    ProxyState.homes = ProxyState.homes.filter(home => home.id != id)
  }

  async createHome(newHome) {
    let home = await api.post("houses", newHome)
    ProxyState.homes = [...ProxyState.homes, newHome]
  }

  async getHomes() {
    let res = await api.get('houses')
    ProxyState.homes = res.data.map(h => new Home(h))
  }
  async bid(id, newPrice) {
    let homeData = { price: newPrice }
    let res = await api.put("houses/" + id, homeData)
    this.getHomes()
  }
  async editHome(id, editedHome) {
    let res = await api.post('houses/' + id, editedHome)
    let temp = ProxyState.homes
    let indextoRemove = temp.findIndex(h => h.id == id)
    temp.splice(indextoRemove, 1, new Home(editedHome))
    console.log(res.data)


  }
}

export const homesService = new HomesService