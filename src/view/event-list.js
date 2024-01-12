import AbstractView from "./absctract-view";

const createListEvent = ()=>{
return `<ul class="trip-events__list">

  </ul>`;
};

export default class EventList extends AbstractView{
  
  getTemplate(){
    return createListEvent();
  }
  
} 