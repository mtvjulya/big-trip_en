import FormEditView from "../view/form-edit";
import { nanoid } from "nanoid";
import { remove,render,RenderPosition } from "../utils/render";
import { UserAction, UPDATE_TYPE } from "../utils/const";

export default class PointNew {
  constructor (pointContainer, changeData){
    this._pointContainer = pointContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._handleDisabledState = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDelete = this._handleFormDelete.bind(this);
    this._rollUpHandler = this._rollUpHandler.bind(this);
  }

  init(cb,destinations,offers){
    this._cb = cb;
    this._handleDisabledState = null;
    if(this._pointEditComponent!==null){
      remove(this._pointEditComponent);
      this._pointEditComponent = null;
      // return;
    }
    this._pointEditComponent = new FormEditView(destinations,offers);
    this._pointEditComponent.setSubmitListener(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleFormDelete)
    this._pointEditComponent.setRollUpClickListener(this._rollUpHandler);

    render(this._pointContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    
    if(this._handleDisabledState!==null){
      //this._handleDisabledState();
    }
  }
  destroy(){
    if(this._pointEditComponent ===null){
      return;
    }
    remove(this._pointEditComponent);
    this._pointEditComponent = null;

  }

  setSaving(){
    this._pointEditComponent.updateData({
      isDisabled:true,
      isSaving:true,
    });
  }

  setAborting(){
    const resetFormState = ()=>{
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      })
    }
    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point){
    console.log(point);
    this._changeData(
      UserAction.ADD_POINT,
      UPDATE_TYPE.MINOR,
      // Object.assign({id:nanoid},point)
      point,
    );
    //this.destroy();    
  }
  
  _handleFormDelete(){
    this.destroy();
  }
  _rollUpHandler(){
    this.destroy();
  }
}