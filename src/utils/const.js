export const SortType = {
  DEFAULT: 'Day',
  TIME:'Time',
  PRICE:'Price'
};

export const FilterType = {
EVERYTHING: 'Everything',
FUTURE:'Future',
PAST:'Past',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT:'ADD_POINT',
  DELETE_POINT:'DELETE_POINT',
}

export const UPDATE_TYPE = {
  PATCH:'PATCH',
  MINOR:'MINOR',
  MAJOR:'MAJOR',
  INIT:'INIT',
  INIT_DESTINATIONS: 'init_destinations',
  INIT_POINTS: 'init_points',
  INIT_OFFERS: 'init_offers',
}
export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  TABLE: 'TABLE',
  STATISTICS: 'STATISTICS',
};

export const POINT_TYPES={
  'taxi':'taxi',
  'bus':'bus',
  'train':'train',
  'ship':'ship',
  'transport':'transport',
  'drive':'drive',
  'flight':'flight',
  'check-in':'check-in',
  'sightseeing':'sightseeing',
  'restaurant':'restaurant'
};
export const DataType = {
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  POINTS: 'points',
};