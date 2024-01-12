import AbstractView from "./absctract-view";
import dayjs from "dayjs";
import {
  getTimeInterval,
  intervalConvert
} from "../utils/common.js";

const createPointElement = (point) => {
  const {
    dateFrom,
    basePrice,
    pointType,
    destination,
    isFavorite,
    dayTo,
    offers
  } = point;

  const eventDuration = intervalConvert(getTimeInterval(dayTo, dateFrom));

  const isFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  const offer = offers;

  const createOffers = () => {
    return offer.length ? offer.map(({
      title,
      price
    }) => {
      return `<li class="event__offer">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
                </li>`
    }).join('') : "no offers"

  };

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm') }>${dayjs(dateFrom).format("MMM D")}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dayjs(dateFrom).toISOString()}>${dayjs(dateFrom).format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime=${dayjs(dayTo).toISOString()}>${dayjs(dayTo).format('HH:mm')}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffers()}
        </ul>
        <button class="event__favorite-btn ${isFavoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class Point extends AbstractView {
  constructor(point, offers, destinations) {
    super();
    this._point = point;
    this._offers = offers;
    this._destinations = destinations;
    this._onPointClick = this._onPointClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
  }
  getTemplate() {
    return createPointElement(this._point);
  }
  _onPointClick() {
    this._callback.clickPoint();
  }
  _onFavoriteButtonClick() {
    this._callback.clickFavoriteButton();

  }
  setClickListener(callback) {
    this._callback.clickPoint = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._onPointClick);

  }
  setFavoriteClickHandler(callback) {
    this._callback.clickFavoriteButton = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._onFavoriteButtonClick);

  }
}