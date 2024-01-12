import Observer from "../utils/observer";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers;
    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }
}