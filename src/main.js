import  MenuView from "./view/menu.js";
import { render, RenderPosition, remove} from "./utils/render.js";
import {generatePoint} from "./mock/point-data.js";
import TripPresenter from "./presenters/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenters/filter.js";
import { MenuItem , UPDATE_TYPE, FilterType, DataType} from "./utils/const.js";
import StatsView from "./view/stats.js";
import newEventButtonView from "./view/new-event-button.js";
import Api from "./api/api.js";
import DestinationsModel from "./model/destination.js";
import OffersModel from "./model/offers.js";

import { isOnline } from "./utils/common.js";
import { toast, toastPermanent, toastRemove } from "./utils/toast.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

// const num = 5;
// const array  = Array.from({ length: num }, () => generatePoint());
// const array = new Array(num).fill().map(generatePoint);
// console.log(array);

//pointsModel.setPoints(UPDATE_TYPE.INIT, array); 

const AUTHORIZATION = 'Basic eo0wsdfdssdf29889h';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const STORE_VERSION = 'v1';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;
const STORE_OFFER_PREFIX = 'bigtrip-offer-localstorage';
const STORE_OFFER_NAME = `${STORE_OFFER_PREFIX}-${STORE_VERSION}`;
const STORE_DESTINATION_PREFIX = 'bigtrip-destination-localstorage';
const STORE_DESTINATION_NAME = `${STORE_DESTINATION_PREFIX}-${STORE_VERSION}`;


const api = new Api(END_POINT, AUTHORIZATION);
// api.getPoints().then((points)=>{
//   console.log(points);
// })
///////////////////////////////////
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const storeOffer = new Store(STORE_OFFER_NAME, window.localStorage);
const apiWithProviderOffer = new Provider(api, storeOffer);
const storeDestination = new Store(STORE_DESTINATION_NAME, window.localStorage);
const apiWithProviderDestination = new Provider(api, storeDestination);
///////////////////////////////
const siteBodyElement = document.querySelector('.page-body');
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
const tripEventsElement = siteBodyElement.querySelector(".trip-events");

const filtersModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
let statsComponent = null;


const tripPresenter = new TripPresenter(tripDetailsElement, tripEventsElement, pointsModel, filtersModel, offersModel, destinationsModel, apiWithProvider);

const handleSiteMenuClick = (menuItem)=>{
  switch (menuItem){
    case MenuItem.TABLE:
      newEventButtonElement.getElement().removeAttribute('disabled'); 
      tripPresenter.destroy();     
      tripPresenter.init();
      filtersModel.setFilter(UPDATE_TYPE.MAJOR, FilterType.EVERYTHING);
     
      remove(statsComponent);
      break;
    case MenuItem.STATISTICS:
      newEventButtonElement.getElement().removeAttribute('disabled');
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(tripEventsElement, statsComponent, RenderPosition.AFTERBEGIN);
      break;
    case MenuItem.ADD_NEW_POINT:
      if (!isOnline()) {
        toast();
        break;
      }
      newEventButtonElement.getElement().setAttribute('disabled', 'disabled');
      remove(statsComponent);
      tripPresenter.destroy();
      tripPresenter.init();
      filtersModel.setFilter(UPDATE_TYPE.MAJOR, FilterType.EVERYTHING);
     
      
      
      tripPresenter.createPoint();
      break;
    default:'There is no such option';
  }
}

const menuComponent = new MenuView();
// render(menuElement, menuComponent, RenderPosition.AFTERBEGIN);
//   menuComponent.setMenuItemHandler(handleSiteMenuClick);


const newEventButtonElement = new newEventButtonView();
newEventButtonElement.setButtonClickListener(handleSiteMenuClick);
render(tripDetailsElement, newEventButtonElement);

const filterPresenter = new FilterPresenter(menuElement, filtersModel, pointsModel);
filterPresenter.init();
tripPresenter.init();

apiWithProviderDestination.getPoints(DataType.DESTINATIONS).then((points)=>{
  console.log(points);
  destinationsModel.setDestinations(UPDATE_TYPE.INIT_DESTINATIONS, points);
})
.catch(() => {
  'error'
});

apiWithProviderOffer.getPoints(DataType.OFFERS).then((points)=>{
  console.log(points);
  offersModel.setOffers(UPDATE_TYPE.INIT_OFFERS, points);
})
.catch(() => {
   'error'
 });

 apiWithProvider.getPoints(DataType.POINTS).then((points)=>{
  console.log('HELLO');
  console.log(points);
  pointsModel.setPoints(UPDATE_TYPE.INIT_POINTS, points);
  render(menuElement, menuComponent, RenderPosition.AFTERBEGIN);
  menuComponent.setMenuItemHandler(handleSiteMenuClick);
})
.catch(()=> {
   pointsModel.setPoints(UPDATE_TYPE.INIT_POINTS, []); 
   render(menuElement, menuComponent, RenderPosition.AFTERBEGIN);
   menuComponent.setMenuItemHandler(handleSiteMenuClick);
 });

 window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
  if (!isOnline()) {
    toastPermanent();
  }
});
window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
  toastRemove();
});


window.addEventListener('offline', () => {
  document.title += ' [offline]';
  toastPermanent();
});