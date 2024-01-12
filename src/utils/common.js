import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const DAYS_COUNT = 10;
const TimeFormat = {
  HOUR_PER_DAY: 1440,
  MINUTE_PER_HOUR: 60,
  MILLISECOND_PER_MINUTE: 60000,
};
const getRandomFromMinToMax = (min = 0, max = 1) => {
  if (min > max) {
    [max, min] = [min, max];
  }

  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
};

const getRandomInteger = (arr = 1) => {
  let randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber > arr.length - 1) {
    randomNumber = arr.length - 1;
  }
  return randomNumber;
};

const getTimeInterval = (dateA, dateB) => {
  
  return dayjs(dateA).diff( dayjs(dateB), 'ms');
};

const dateConverter = {
  'D MMM': (date) => dayjs(date).format('D MMM'),
  'HH:mm': (date) => dayjs(date).format('HH:mm'),
  'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
  'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};
const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);

const intervalConvert = (n) => {
  const num = n;
  let hours = (num / 3600000);
  let rhours = Math.floor(hours);
  let days = 0;
  let rdays = 0;
  if (hours > 24) {
    days = (hours / 24);
    rdays = Math.floor(days);
    hours = (days - rdays) * 24;
    rhours = Math.floor(hours);
  }
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const duration = `${rdays>0?`0${rdays}D`:""} ${rhours>=10?`${rhours}H`:`0${rhours}H`} ${rminutes>=10?`${rminutes}M`: `0${rminutes}M`}`;
  return duration;
};

export const humanizeDateDuration = (tripTime) => {
  const duration = dayjs.duration(tripTime).$d;

  const day = duration.days < DAYS_COUNT ? `0${duration.days}D` : `${duration.days}D`;
  const hour = duration.hours < DAYS_COUNT ? `0${duration.hours}H` : `${duration.hours}H`;
  const minute = duration.minutes < DAYS_COUNT ? `0${duration.minutes}M` : `${duration.minutes}M`;
  const total = (tripTime / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.HOUR_PER_DAY ? `${day} ${hour} ${minute}` : (tripTime / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTE_PER_HOUR ? `${hour} ${minute}` : minute;
  return total;
};

const sortDate = (dateA, dateB)=>{
  return dayjs(dateA.dateFrom).diff(dateB.dateFrom);
};

const sortTime = (dateA, dateB)=>{
  return dayjs(dateA.dayTo).diff(dateA.dateFrom,'minutes')-dayjs(dateB.dayTo).diff(dateB.dateFrom,'minutes');
};
const sortPrice = (priceA, priceB)=>{
  if (priceA.basePrice < priceB.basePrice) {
    return -1;
  }
  if (priceA.basePrice> priceB.basePrice) {
    return 1;
  }
  return 0;
};
  
const isOnline = ()=>{
  return window.navigator.onLine;
}

export { getRandomFromMinToMax, getRandomInteger, getTimeInterval,  humanizeDate , intervalConvert, sortDate, sortTime, sortPrice, isOnline};