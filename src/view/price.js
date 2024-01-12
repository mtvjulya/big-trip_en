import AbstractView from "./absctract-view";
const createPrice = (points) => {
  const price = points.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;
    <span class="trip-info__cost-value">${price}</span>
    </p>`;
};

export default class Price extends AbstractView{
  constructor(points) {
    super();
    this._price = points;
  }
  getTemplate(){
    return createPrice(this._price);
  }
}