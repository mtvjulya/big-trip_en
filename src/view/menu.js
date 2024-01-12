import AbstractView from "./absctract-view";
import { MenuItem } from "../utils/const";

const createMainMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
    <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATISTICS}" href="#">Stats</a>
  </nav>`;
};


export default class MainMenu extends AbstractView {
  constructor(){
    super();
    this._isActive = MenuItem.TABLE;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }
  getTemplate() {
    return createMainMenuTemplate();
  }

  _menuClickHandler(evt){
    evt.preventDefault();
    if(this._isActive === evt.target.dataset.menuItem){
      return;
    }
    this._isActive = evt.target.dataset.menuItem;
    this._callback.menuClick(evt.target.dataset.menuItem);
    console.log(evt.target.dataset.menuItem);
    this.seMenuItem(evt.target.dataset.menuItem);
  }

  setMenuItemHandler(callback){
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click',this._menuClickHandler);
    
  }
  seMenuItem(item){
    const tableElement = this.getElement().querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
    const statsElement = this.getElement().querySelector(`[data-menu-item="${MenuItem.STATISTICS}"]`);
    console.log(tableElement.dataset.menuItem);
    if(tableElement !==null && tableElement.dataset.menuItem == item){
      tableElement.classList.add('trip-tabs__btn--active');
      statsElement.classList.remove('trip-tabs__btn--active');
    }else{
      statsElement.classList.add('trip-tabs__btn--active');
      tableElement.classList.remove('trip-tabs__btn--active');
    }
  }
}
