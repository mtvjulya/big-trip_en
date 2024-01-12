import {
  getRandomFromMinToMax,
  getRandomInteger,
  getTimeInterval,
  humanizeDate,
  intervalConvert
} from '../utils/common.js';
import { POINT_CITY, POINT_TYPES, OPTIONS } from '../consts';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';


const PICTURE_URL = 'http://picsum.photos/248/152?r=';

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];



const Period = {
  START_DATE_MIN: -7,
  START_DATE_MAX: -4,
  DATE_FROM_MIN: 60,
  DATE_FROM_MAX: 120,
  DATE_TO_MIN: 180,
  DATE_TO_MAX: 2880,
  BASE_PRICE_MIN: 20,
  BASE_PRICE_MAX: 1500,
};


const getOptions = ( type) => {
 
  for ( let i= 0; i< OPTIONS.length; i++){
    if(OPTIONS[i].type === type){
     return OPTIONS[i];
  }else{
    continue;
   }
  }

  return {
    "type": "none",
    "offers": [{
      "title": 'no options',
      "price": 0
    }]
  };
}
;

const getDescription = (description,city) => {
  let destinationDescription = {};
  let descriptionArr = [];
  let destinationPictures = [];

  for (let i = 0; i < getRandomFromMinToMax(1, 5); i++) {
    descriptionArr.push(description[i]);
  };

  for (let i = 0; i < getRandomFromMinToMax(1, 5); i++) {
    let picture = {
      "src": PICTURE_URL + getRandomFromMinToMax(0, 100),
      "description": description[i]
    };
    destinationPictures.push(picture);
  };

  destinationDescription.description = descriptionArr.join(" ");
  destinationDescription.pictures = destinationPictures;
  destinationDescription.name = city;
  return destinationDescription;
};
const generatedDescriptions = POINT_CITY.map((city) => getDescription(DESCRIPTION,city));

const getDate = () => {
  let startDate = dayjs().add(getRandomFromMinToMax(Period.START_DATE_MIN, Period.START_DATE_MAX), 'd');
  return () => {
    const dateFrom = dayjs(startDate).add(getRandomFromMinToMax(Period.DATE_FROM_MIN, Period.DATE_FROM_MAX), 'm').toDate();
    const dateTo = dayjs(dateFrom).add(getRandomFromMinToMax(Period.DATE_TO_MIN, Period.DATE_TO_MAX), 'm').toDate();
    startDate = dateTo;
    return {
      dateFrom,
      dateTo,
    };
  };
};

const generateFavoriteFlag = (flag = 0) => {
  flag = Boolean(getRandomFromMinToMax());
  return flag;
};

const generateDate = getDate();

const generatePoint = () => {
let pointType = POINT_TYPES[getRandomInteger(POINT_TYPES)];
  const dateInterval = generateDate();
  return {
    id: nanoid(),
    basePrice: getRandomFromMinToMax(20,100),
    pointType ,
    dateFrom: dateInterval.dateFrom,
    dayTo: dateInterval.dateTo,
    offer: getOptions(pointType),
    destination: generatedDescriptions[getRandomFromMinToMax(0, generatedDescriptions.length -1)],
    isFavorite: generateFavoriteFlag(),
    timeInterval: intervalConvert(getTimeInterval(dateInterval.dateTo, dateInterval.dateFrom))
  }
};


export {
  generatePoint, generatedDescriptions
};