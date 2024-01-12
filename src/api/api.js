import PointsModel from "../model/points";
import { DataType } from "../utils/const";
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST:'POST',
  DELETE:'DELETE'
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints(dataType) {
    if (dataType === DataType.POINTS) {
      return this._load({ url: dataType })
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
    }
    return this._load({ url: dataType })
    .then(Api.toJSON);
  }

  updatePoint(point) {
    return this._load({
      url: `${DataType.POINTS}/${point.id}`,
      method: Method.PUT,
      // body:JSON.stringify(point),
      // headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  addPoint(point){
    return this._load({
      url:`${DataType.POINTS}`,
      method:Method.POST,
      body:JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type':'application/json'})    
    })
    .then(Api.toJSON)
    .then(PointsModel.adaptToClient);
  }

  deletePoint(point){
    return this._load({
      url:`${DataType.POINTS}/${point.id}`,
      method:Method.DELETE
    });
  }
  
  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
        `${this._endPoint}/${url}`, {
          method,
          headers,
          body
        },
      ).then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  sync(data) {
    return this._load({
      url: `${DataType.POINTS}/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(Api.toJSON);
  }
}