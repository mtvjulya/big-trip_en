import AbstractView from "./absctract-view";


const createFilterItemTemplate = (filterData, currentFilterType) => {
  return filterData.map(({type, name, count}) => {
    return `<div class="trip-filters__filter">
     <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType? 'checked':''}>
     <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count === 0 ? '' : count}</label>
    </div>`;
  }).join('');
};


const createFilterTemplate = (filterData, currentFilterType) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(filterData, currentFilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends AbstractView {
  constructor(filterData, currentFilterType) {
    super();
    this._filterData = filterData;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filterData, this._currentFilterType);
  }
  _filterTypeChangeHandler(evt){
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
    console.log(evt.target.value) ;
  }
  setFilterTypeChangeHandler(callback){
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}