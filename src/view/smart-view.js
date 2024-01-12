import AbstractView from "./absctract-view";
import { createElement } from "../utils/render";
import { replace } from "../utils/render";
export default class SmartView extends AbstractView{
  constructor(){
    super();
    this._data = {};
  }
  _updateElement(){
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
   
    this.removeElement();
    const newElement = this.getElement();
   
    if (parent === null || prevElement === null || newElement === null) {
      throw new Error('one of the replaced elements does not exist ');
    }
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }
  updateData(update) {
    if (!update) {
      return;
    }
    this._data = Object.assign({}, this._data, update);
    this._updateElement();
  }
  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}