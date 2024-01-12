import { FilterType } from "./const";
import dayjs from "dayjs";
// const filterData = {
//   [FilterType.EVERYTHING]: (points)=>points.length,
//   [FilterType.FUTURE]: (points)=>points.filter((point)=>dayjs().isBefore(point.dateFrom, 'm')).length,
//   [FilterType.PAST]: (points)=>points.filter((point)=>dayjs().isAfter(point.dayTo, 'm')).length
// }

// export const generateFilter = (points)=>{
//   return Object.entries(filterData).map(([filterName, countPoints])=>{
    
//     return {
//       name: filterName,
//       count: countPoints(points),
//     };
//   });
// }
export const filter = {
  [FilterType.EVERYTHING]: (points)=>points,
  [FilterType.FUTURE]: (points)=>points.filter((point)=>dayjs().isBefore(point.dateFrom, 'm')),
  [FilterType.PAST]: (points)=>points.filter((point)=>dayjs().isAfter(point.dayTo, 'm'))
}