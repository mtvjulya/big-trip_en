import Observer from "../utils/observer";
import dayjs from "dayjs";
import { intervalConvert, getTimeInterval } from "../utils/common";
export default class PointsModel extends Observer {
  constructor(){
    super();
    this._points = [];
  }

  getPoints(){   
    return this._points;
  }

  setPoints(updateType, points){
  console.log(points);
    this._points = points.slice();
    this._notify(updateType);
  }

  updatePoint(updateType, update){
    const index = this._points.findIndex((point)=>point.id === update.id);
    if(index === -1){
      throw new Error('Can\'t update unexisting point')
    }
    this._points = [
      ...this._points.slice(0,index),
      update,
      ...this._points.slice(index + 1)
    ]
    this._notify(updateType, update);
  }
  addPoint(updateType, update){
    this._points = [update, ...this._points];
    this._notify(updateType,update);
  }
  deletePoint(updateType, update){
    const index = this._points.findIndex((point)=>point.id === update.id);
    if(index === -1){
      throw new Error ('Can\'t delete unexisted point');
    }

    this._points = [
      ...this._points.slice(0,index),
    ...this._points.slice(index +1)
    ];
    this._notify(updateType);
  }

  static adaptToClient(point){
    const adoptedPoint = Object.assign(
        {},
        point,
        {
        basePrice:point.base_price,
        dateFrom:dayjs(point.date_from).toDate(),
        dayTo:dayjs(point.date_to).toDate(),
        isFavorite:point.is_favorite,
        pointType:point.type,
        timeInterval: intervalConvert(getTimeInterval(dayjs(point.date_to).toDate(), dayjs(point.date_from).toDate()))
    });
    delete adoptedPoint.base_price;
    delete adoptedPoint.date_from;
    delete adoptedPoint.date_to;
    delete adoptedPoint.is_favorite;
    delete adoptedPoint.type;

    return adoptedPoint;
  }

  static adaptToServer(point){
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.basePrice,
        'date_from':point.dateFrom,
        'date_to':point.dayTo,
        'is_favorite':point.isFavorite!==undefined?point.isFavorite:false,
        'type':point.pointType,
      }
    );
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dayTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.pointType;
    delete adaptedPoint.timeInterval;

    return adaptedPoint;
  }
}