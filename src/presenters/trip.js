import TripInfo from "../view/trip-info";
import PriceView from "../view/price";
import EmptyEventList from "../view/empty-event-list";
import PointNew from "./point-new";
import SortView from "../view/sort";
import EventListView from "../view/event-list";
import PointPresenter,{State as PointPresenterViewState} from "./point";
import LoadingView from "../view/loading";
import {  remove,  render,  RenderPosition} from "../utils/render";
import {  updateItem,  sortDate,  sortPrice,  sortTime} from "../utils/common";
import {  FilterType,  SortType, UPDATE_TYPE, UserAction} from "../utils/const";
import {  filter} from "../utils/filter";

export default class TripPresenter {
  constructor(tripContainer, tripEventsContainer, pointsModel, filtersModel, offersModel, destinationsModel, api) {
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._filtersModel = filtersModel;
    this._tripEventsContainer = tripEventsContainer;
    this._pointsModel = pointsModel;
    this._currentSortType = SortType.DEFAULT;
    this._pointListComponent = new EventListView();
    this._emptyList = new EmptyEventList();
    this._tripSort = null;
    this._pointPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._tripInfoComponent = null;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointNewPresenter = new PointNew(this._pointListComponent, this._handleViewAction);
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._api = api;
    this._offers = null;
    this._destinations = null;
    
  }

  init() {

    render(this._tripEventsContainer, this._pointListComponent);
    //const points = this._getPoints();
    ///console.log(points.length);
    // if (points.length === 0) {
    //   this._renderEmptyList();
    //   // return;
    // }

    this._pointsModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);

    //this._renderTripSort();
    this._renderEventList();

  }

  createPoint(handleNewEventDisabled) {
    // this._currentSortType = SortType.DEFAULT;
    // this._filtersModel.setFilter(UPDATE_TYPE.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(handleNewEventDisabled, this._destinations, this._offers);
  }

  _handleViewAction(actionType, updateType, update) { //вот тут надо смотреть что передаешь!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT: //вот тут надо смотреть что передаешь!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //this._pointsModel.updatePoint(updateType, update);
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update).then((response)=>{
          this._pointsModel.updatePoint(updateType,response);
        })
        .catch(()=>{
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        })
        break;
      // case UserAction.ADD_POINT:
      //   this._pointsModel.addPoint(updateType, update);
      //   break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update).then((response)=>{
          this._pointsModel.addPoint(updateType, response);
        })
        .catch(()=>{
          this._pointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update).
        then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING)
        });
      break;

    }
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearPointList();
        //this._renderTripSort();
        this._renderEventList();
        break;
      case UPDATE_TYPE.MAJOR:

        this._clearPointList({
          resetSortType: true
        });
        //this._renderTripSort();
        this._renderEventList();
        break;
      case UPDATE_TYPE.INIT_POINTS:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderEventList();
        break;
      case UPDATE_TYPE.INIT:
        this._renderEventList();
        break;
      case UPDATE_TYPE.INIT_DESTINATIONS:
        this._isLoading = false;
        //remove(this._loadingComponent);
        this._destinations = this._destinationsModel.getDestinations();
        console.log(this._destinations);
        // this._renderMainTripInfo();
        this._renderEventList();
        break;
      case UPDATE_TYPE.INIT_OFFERS:
        this._isLoading = false;
        //remove(this._loadingComponent);
        this._offers = this._offersModel.getOffers();

        this._renderEventList();
        break;
    }
  }

  _getPoints() {
    const filterType = this._filtersModel.getFilter();
    //const filterType = FilterType.PAST;

    const points = this._pointsModel.getPoints();

    const filteredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortDate);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }

  _renderMainTripInfo(points) {
    this._tripInfoComponent = new TripInfo(points);
    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    const tripCostComponent = new PriceView(this._getPoints());

    render(this._tripInfoComponent, tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {    
    render(this._tripEventsContainer, this._emptyList);
  }

  _renderLoadingComponent() {
    render(this._tripEventsContainer, this._loadingComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList();
    this._renderEventList();
  }

  _renderTripSort() {
    if (this._tripSort !== null) {
      this._tripSort = null;
    }
    this._tripSort = new SortView(this._currentSortType);
    this._tripSort.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripEventsContainer, this._tripSort, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    if (this._isLoading || this._isLoadingOffers || this._isLoadingDestinations) {
      this._renderLoadingComponent();
      return;
    }
    remove(this._loadingComponent);

    const points = this._getPoints();
    if (points.length === 0) {
     this._renderEmptyList();
      return;
    }
    remove(this._emptyList);
    this._renderTripSort();
    this._renderPoints(points.slice());
    if (this._tripInfoComponent === null) {
      this._renderMainTripInfo(points);
    }
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => {

      this._renderPoint(tripPoint)
    });

  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => {
      presenter.resetView()
    });
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange, this._offers, this._destinations);
    pointPresenter.init(tripPoint);
    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _clearPointList({
    resetSortType = false
  } = {}) {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    remove(this._tripSort);
    
    remove(this._emptyList);
    remove(this._loadingComponent);
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  destroy() {
    this._clearPointList({
      resetSortType: true
    });
    remove(this._tripSort);
    remove(this._pointListComponent);
    // if (this._emptyList != null) {
    //   remove(this._emptyList);
    // }

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
    this._filtersModel.removeObserver(this._handleModelEvent);
  }
}