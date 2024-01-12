import PointView from "../view/point";
import FormEditView from "../view/form-edit";
import { render, replace, remove, isEsc} from "../utils/render";
import { UserAction, UPDATE_TYPE } from "../utils/const";
import { isOnline } from "../utils/common";
import { toast } from "../utils/toast";
const MODE = {
  DEFAULT:'DEFAULT',
  EDITING: 'EDITING', 
};

export const State = {
  SAVING:'SAVING',
  DELETING:'DELETING',
  ABORTING:'ABORTING'
}

export default class PointPresenter{
  constructor(container, changeData, changeMode, offers, destinations){
    this._mode = MODE.DEFAULT;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._tripPointsContainer = container;
    this._pointComponent = null;
    this._editComponent = null;
    this._offers = offers;
    console.log(this._offers);
    this._destinations = destinations;
    console.log(this._destinations);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._changeFavoriteStatus = this._changeFavoriteStatus.bind(this);
    this._replacePointToEditForm = this._replacePointToEditForm.bind(this);
    this._replaceEditFormToPoint = this._replaceEditFormToPoint.bind(this);
    this._onEditorPointEscKeyDown = this._onEditorPointEscKeyDown.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  init(tripPoint){
    this._tripPoint = tripPoint;
    const prevPointComponent = this._pointComponent;
    const prevEditComponent = this._editComponent;
    this._pointComponent = new PointView(tripPoint);
    this._editComponent = new FormEditView(this._destinations, this._offers, tripPoint );
    this._editComponent.checkNumber();
    this._pointComponent.setClickListener(this._replacePointToEditForm);
    this._pointComponent.setFavoriteClickHandler(this._changeFavoriteStatus);
    this._editComponent.setRollUpClickListener(this._replaceEditFormToPoint);
    this._editComponent.setSubmitListener(this._onFormSubmit);
    this._editComponent.setDeleteClickHandler(this._handleDeleteClick);

    if(prevPointComponent === null || prevEditComponent === null){
      render(this._tripPointsContainer,this._pointComponent);
      return;
    }

    if(this._mode === MODE.DEFAULT){   
      replace(this._pointComponent, prevPointComponent);
    }

    if(this._mode === MODE.EDITING){
      // replace(this._editComponent, prevEditComponent);
      replace(this._pointComponent, prevEditComponent);
      this._mode = MODE.DEFAULT;
    }
    remove(prevPointComponent);    
    remove(prevEditComponent);
  }

  setViewState(state){
    const resetFormState = ()=>{
      this._editComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    }

    switch(state){
      case State.SAVING:
        this._editComponent.updateData({
          isDisabled:true,
          isSaving:true,
        });
        break;
      case State.DELETING:
        this._editComponent.updateData({
          isDisabled:true,
          isDeleting:true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._editComponent.shake(resetFormState);
        break;
    }
  }

  _onFormSubmit(update) {
    ////////////////////
    if (!isOnline()) {
      toast();
      this.setViewFormState(State.SAVING);
      this.setViewFormState(State.ABORTING);
      return;
    }
    ///////////////////////
    const isMinorUpdate = this._tripPoint.isFavorite !== update.isFavorite;
    this._changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH,
      update);
    //this._replaceEditFormToPoint();
   
  }

  _handleDeleteClick(point){
    if (!isOnline()) {
      toast();
    }
    this._changeData(
      UserAction.DELETE_POINT,
      UPDATE_TYPE.MINOR,
      point);
  }

  _onEditorPointEscKeyDown(evt){
    if(isEsc(evt)){
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }

  resetView(){
    if(this._mode !== MODE.DEFAULT){
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm(){
    if (!isOnline()) {
      toast();
      return;
    }
    
    replace(this._editComponent, this._pointComponent) ;
    document.addEventListener('keydown', this._onEditorPointEscKeyDown);
    this._changeMode();
    this._mode = MODE.EDITING;
   
  };
  
  _replaceEditFormToPoint(){
    replace(this._pointComponent, this._editComponent);
    document.removeEventListener('keydown', this._onEditorPointEscKeyDown);
    this._mode = MODE.DEFAULT;
  };
  
  destroy(){    
    remove(this._pointComponent);
    remove(this._editComponent);
  }
 
  _changeFavoriteStatus() {
    this._changeData(UserAction.UPDATE_POINT, UPDATE_TYPE.MINOR,
      Object.assign({}, this._tripPoint, { isFavorite: !this._tripPoint.isFavorite }),
    );
  }
 
} 