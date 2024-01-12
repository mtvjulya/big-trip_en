import dayjs from "dayjs";
import AbstractView from "./absctract-view";

const LIMIT_POINT_NUMBER = 3;

const createCitiesList = (points)=>{
  const destinationNames = new Set(points.map((point)=>point.destination.name));
  const citiesList = Array.from(destinationNames);
  if(destinationNames.size >LIMIT_POINT_NUMBER){
    return [citiesList.shift(),citiesList.pop()].join(" &mdash; ... &mdash; ");
  }else{
    return citiesList.join(" &mdash; ");
  }   
};
const createDatesList = (points)=>{
  const startDate = points.map(({dateFrom})=>dateFrom).sort((a,b)=>dayjs(a).diff(b)).shift();
  const endDate = points.map(({dayTo})=>dayTo).sort((dateA, dateB)=>dayjs(dateB).diff(dateA)).shift();
  return `${dayjs(startDate).format('D MMM')} &mdash; ${dayjs(endDate).format('D MMM')}`;
};

const createTripInfo = (points) => {
  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createCitiesList(points)}</h1>
        <p class="trip-info__dates">${createDatesList(points)}</p>
      </div>
    </section>`;
}

export default class TripInfo extends AbstractView {
  constructor(points){
    super();
    this._cities = points;
  }
  getTemplate(){
    console.log(this._cities);
    return createTripInfo(this._cities);
  }
}