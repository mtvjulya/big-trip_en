import dayjs from "dayjs";
const filterData = {
  Everything: (points)=>points.length,
  Future: (points)=>points.filter((point)=>dayjs().isBefore(point.dateFrom, 'm')).length,
  Past: (points)=>points.filter((point)=>dayjs().isAfter(point.dayTo, 'm')).length
}

export const generateFilter = (points)=>{
  return Object.entries(filterData).map(([filterName, countPoints])=>{
    console.log(filterData);
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
}