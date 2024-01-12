
import AbstractView from "../view/absctract-view";
const RenderPosition  = {
    BEFOREEND:"beforeend",
    AFTERBEGIN:"afterbegin",
}

const render =(container, element, position = RenderPosition.BEFOREEND) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Unknown render position: '${position}'`);
  }
}

const replace = (newElement, currentElement)=>{
  if(newElement instanceof AbstractView){
    newElement = newElement.getElement();
  }
  if(currentElement instanceof AbstractView){
    currentElement = currentElement.getElement();
  }

  const parentElement = currentElement.parentElement;

  if (parentElement === null || currentElement === null || newElement === null) {
    throw new Error('one of the replaced elements does not exist ');
  }
  parentElement.replaceChild(newElement,currentElement);
}

const pickElementDependOnValue = (value, elements, descriptionFlag) => {
  if (descriptionFlag) {
    return elements.find((element) => element.name === value);
  }
  return elements.find((element) => element.type === value).offers;
};

const createElement = (template)=>{
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
}

const isEsc = (evt)=>{
  return evt.key === ('Esc'||'Escape');
}

const remove = (component)=>{
  if(component === null){
    return;
  }
  if(!component instanceof AbstractView ){
    throw new Error ('Can remove only components')
  }
  component.getElement().remove();
  component.removeElement();
}

export {  render, createElement, replace, RenderPosition, isEsc, remove, pickElementDependOnValue};