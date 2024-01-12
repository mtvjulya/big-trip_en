import FilterView from "../view/filters";
import { render, remove , replace, RenderPosition } from "../utils/render";
import { filter } from "../utils/filter";
import { FilterType, UPDATE_TYPE } from "../utils/const";

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel){
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._hadleModelEvent = this._hadleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._hadleModelEvent);
    this._filterModel.addObserver(this._hadleModelEvent);
  }

  init(){
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if(prevFilterComponent === null){
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
  _hadleModelEvent(){
    this.init();
  }

  _handleFilterTypeChange(filterType){
    // if(this._filterModel.getFilter() === filterType){
    // return;
    // } 

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  _getFilters(){
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length,
      },
    ]
  }
} 