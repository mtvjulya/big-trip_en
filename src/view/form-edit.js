import SmartView from "./smart-view";
import AbstractView from "./absctract-view";
import dayjs from "dayjs";
import flatpickr from 'flatpickr';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {
  POINT_CITY,
  POINT_TYPES,
  OPTIONS
} from '../consts';
import {
  generatedDescriptions
} from "../mock/point-data";
import {
  pickElementDependOnValue
} from "../utils/render";

const BLANK_POINT = {
  basePrice: '200',
  dateFrom: dayjs(),
  dayTo: dayjs().add(1, 'day').add(40, 'm'),
  destination: {
    description: '',
    pictures: '',
    name: ''
  },
  isFavorite: false,
  offer: {
    "type": 'train',
    "offers": [{
        "title": "Upgrade to a business class",
        "price": 120
      },
      {
        "title": "Choose the radio station",
        "price": 60
      }
    ]
  },
  pointType: "train",
  timeInterval: "01D 19H 41M"
};

const createTypesTemplate = (types, pointType, isDisabled) => {
  return types.map((type) =>
    `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type} ${pointType === type ? 'checked' : ''}  ${isDisabled ? 'disabled' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
  ).join('');
};

// const createCitiesTemplate = (cities)=>{
//   return cities.map((city)=>
//      `<option value=${city}></option>`
//   ).join('');
// };
// const createDestinationOptionTemplate = (cities) => {
//   return cities.map((city) => `<option value="${city.name}"></option>`).join('');
// };
const createDestinationOptionTemplate = (cities) => {
  return cities.map((city) => `<option value="${city}"></option>`).join('');
};
const createOptionsTemplate = (offersArray, pointType='train',isDisabled) => { 

  const availableOffers = pickElementDependOnValue(pointType, offersArray);

    return availableOffers.map(({
      title,
      price
    }) => {
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointType}-1" type="checkbox" name="event-offer-${pointType}"  ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${pointType}-1">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
    </div>`
    }).join('');

}
  //  else {
  //   offers = [{
  //     "title": 'no options',
  //     "price": 0
  //   }]
  //   return offers.map(({
  //     title,
  //     price
  //   }) => {
  //     return `<div class="event__offer-selector">
  //       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" >
  //       <label class="event__offer-label" for="event-offer-${type}-1">
  //         <span class="event__offer-title">${title}</span>
  //         &plus;&euro;&nbsp;
  //         <span class="event__offer-price">${price}</span>
  //       </label>
  //   </div>`
  //   }).join('');
  // }

//}

const createPicturesTemplate = ({
  pictures
}) => {
  return pictures.map(({
    src,
    description
  }) => {
    return `<img class="event__photo" src="${src}" alt="${description}">`
  }).join('');
};

const createFormEdit = (event = BLANK_POINT, offersArray, cities, destinations) => {
   const {
      basePrice = '',
      pointType = 'bus',
      dateFrom = dayjs(),
      dayTo = dayjs().add(1, 'day').add(40, 'm'),
      offer = {
        "type": "bus",
        "offers": [{
          "title": "Upgrade to a business class",
          "price": 120
        }]
      },
      destination = {
        "description": '',
        'name': '',
        'pictures': '',
      },
      isDisabled,
      isSaving,
      isDeleting,

  } = event;
 
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"  ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${createTypesTemplate(POINT_TYPES, pointType, isDisabled)}
                                    
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${pointType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1">
          ${createDestinationOptionTemplate(cities)}
        </datalist>
      </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}"  ${isDisabled ? 'disabled' : ''}>          
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dayTo).format('DD/MM/YY HH:mm')}"  ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}"  ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit"  ${isDisabled ? 'disabled' : ''}>${isSaving?'Saving...':'Save'}</button>
        <button class="event__reset-btn" type="reset"  ${isDisabled ? 'disabled' : ''}>${isDeleting?'Deleting...':'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOptionsTemplate(offersArray,pointType,isDisabled)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${destination.pictures.length > 0 ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPicturesTemplate(destination)}
          </div>
        </div>`:''}
        </section>
      </section>
    </form>
   </li>`;
};



export default class FormEdit extends SmartView {
  constructor(destinations,offers, point = BLANK_POINT  ) {
    super();
    this._startdatepicker = null;
    this._enddatepicker = null;
    this._offers = offers;
    this._destinations = destinations;
    this._cities = this._getPossibleCities();
    console.log(this._destinations);
    this._rollUpClickListener = this._rollUpClickListener.bind(this);
    this._onPointEditorSubmit = this._onPointEditorSubmit.bind(this);
    this._data = FormEdit.parsePointToData(point);
   
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._setInnerHandlers();
    this._startDateHandler = this._startDateHandler.bind(this);
    this._endDateHandler = this._endDateHandler.bind(this);
    this._setEndDatePicker();
    this._setStartDatePicker();
    this._checkNumberListener = this._checkNumberListener.bind(this);
    console.log(this._data);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {isDisabled: false,
      isSaving: false,
      isDeleting: false,
      },
      );
  }

  static parseDataToPoint(data) {
    delete data.isDeleting;
    delete data.isDisabled;
    delete data.isSaving;
    return Object.assign({}, data);
  }

  getTemplate() {
    return createFormEdit(this._data, this._offers, this._cities,this._destinations);
  }

  _getPossibleCities() {
    return this._destinations.map((destination) => destination.name);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _rollUpClickListener(evt) {
    evt.preventDefault();
    this._callback.rollUpClickListener();
  }

  _onPointEditorSubmit(evt) {
    evt.preventDefault();
    this._callback.submitListener(FormEdit.parseDataToPoint(this._data));
  }

  setSubmitListener(callback) {
    this._callback.submitListener = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._onPointEditorSubmit);

  }

  setRollUpClickListener(callback) {
    this._callback.rollUpClickListener = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickListener);
  }
  _checkNumberListener(evt) {
    const keyCode = evt.which ? evt.which : evt.keyCode;
    // Проверяем, является ли нажатая клавиша числовой или необходимые клавиши (Backspace, Delete, Tab, Enter)
    const isNumeric = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    var isControlKey = [8, 9, 13, 46].indexOf(keyCode) !== -1;
    // Если нажатая клавиша не является числовой и не является необходимой клавишей, отменяем событие
    if (!isNumeric && !isControlKey) {
      evt.preventDefault();
    }
  }

  checkNumber() {
    this.getElement().querySelector(".event__input--price").addEventListener('keydown', this._checkNumberListener);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    //this._data.offers.type = evt.target.value;
    this._data.pointType = evt.target.value;
    this.updateData(this._data);
  }

  restoreHandlers() {
    this.setRollUpClickListener(this._callback.clickListener);
    this.setSubmitListener(this._callback.submitListener);
    this._setInnerHandlers();
    this._setEndDatePicker();
    this._setStartDatePicker();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._cityChangeHandler);
  }

  _cityChangeHandler(evt) {
    evt.preventDefault();
console.log(this._data);
    // if (!this._destinations.includes(evt.target.value)) {
    //   return;
    // }

    this._data.destination = pickElementDependOnValue(evt.target.value, this._destinations, true);
    this.updateData(this._data);
  }
  
  _setStartDatePicker() {
    if (this._startdatepicker) {
      this._startdatepicker.destroy();
      this._startdatepicker = null;
    }
    this._startdatepicker = flatpickr(this.getElement().querySelector('#event-start-time-1'), {
      dateFormat: 'd/m/y H:i',
      defaultDate: this._data.dateFrom,
      onChange: this._startDateHandler,
    }, );
  }
  _setEndDatePicker() {
    if (this._enddatepicker) {
      this._enddatepicker.destroy();
      this._enddatepicker = null;
    }
    this._enddatepicker = flatpickr(this.getElement().querySelector('#event-end-time-1'), {
      dateFormat: 'd/m/y H:i',
      defaultDate: this._data.dayTo,
      onChange: this._endDateHandler,
    }, );
  }
  _startDateHandler([userDate]) {

    this.updateData({
      dateFrom: userDate,
    })
  }
  _endDateHandler([userDate]) {
    this.updateData({
      dayTo: userDate,
    })
  }
  removeElement() {
    super.removeElement();
    if (this._startdatepicker || this._enddatepicker) {
      this._enddatepicker.destroy();
      this._enddatepicker = null;
      this._startdatepicker.destroy();
      this._startdatepicker = null;
    }
  }
}