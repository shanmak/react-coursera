import * as ActionType from './ActionTypes';

const initialState ={
    isLoading:true,
    errMes:null,
    dishes:[]}


export const dishes = (state=initialState,action)=>{

    switch(action.type){
       case  ActionType.ADD_DISHES :
            return {...state,isLoading:false,errMes:null,dishes:action.payload};
      case  ActionType.DISHES_LOADING :
            return {...state,isLoading:true,errMes:null,dishes:[]};
     case  ActionType.DISHES_FAILED :
            return {...state,isLoading:false,errMes:action.payload};
    default :
    return state;
        }

};


