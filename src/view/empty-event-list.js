
import AbstractView from "./absctract-view.js";
const createEmptyEventList = ()=>{
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}

export default class EmptyEventList extends AbstractView{

  getTemplate(){
    return createEmptyEventList();
  }
  
}