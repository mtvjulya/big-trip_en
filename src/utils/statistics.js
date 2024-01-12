import { intervalConvert , getTimeInterval} from "./common";
import dayjs from "dayjs";
export const makeItemsUniq = (items) => [...new Set(items)];

export const countMoneyTotal = (points)=>{
  const moneyTotal = {};
  const types = new Set();
  points.forEach(element => {
    types.add(element.pointType);
  });
  const array = Array.from(types);
  array.forEach((item) => {
    moneyTotal[item] = 0;
  });
 
  points.forEach((point)=>{
    if(array.find(item=>item === point.pointType)){     
      moneyTotal[point.pointType]+=point.basePrice;      
    };
  });
  return moneyTotal;
};

export const countTypeTotal = (points)=>{
  const typesTotal = {};
  const types = new Set();
  points.forEach(element => {
    types.add(element.pointType);
  });
  const typesArray = Array.from(types);
  typesArray.forEach((item) => {
    typesTotal[item] = 0;
  });
  
  points.forEach((point)=>{
    if(typesArray.find(item=>item === point.pointType)){     
      typesTotal[point.pointType]++;      
    }
  });
  return typesTotal;
};

export const countTimeTotal = (points)=>{
  const timeTotal = {};
  const types = new Set();
  points.forEach(element => {
    types.add(element.pointType);
  });
  const typesArray = Array.from(types);
  typesArray.forEach((item) => {
    timeTotal[item] = 0;
  });
  
  points.forEach((point) => {
    if (typesArray.find((item) => item === point.pointType)) {
      let diffInMilliseconds = getTimeInterval(dayjs(point.dayTo),dayjs(point.dateFrom));
      timeTotal[point.pointType] += diffInMilliseconds;     
    }
  });
  return timeTotal;
};