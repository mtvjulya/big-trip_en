import Abstract from "./absctract-view";
import { MenuItem } from "../utils/const";
const createNewEventButtonTemplate= ()=>{
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" data-menu-item="${MenuItem.ADD_NEW_POINT}" type="button">New event</button>`;
}

export default class newEventButtonView extends Abstract{
constructor(){
  super();
  this._clickButtonListener = this._clickButtonListener.bind(this);
}
getTemplate(){
  return createNewEventButtonTemplate();
}

setButtonClickListener(callback){
  this._callback.clickButton = callback;
  this.getElement().addEventListener('click',this._clickButtonListener);
}
_clickButtonListener(evt){
  evt.preventDefault();
  this._callback.clickButton(evt.target.dataset.menuItem);
}
}