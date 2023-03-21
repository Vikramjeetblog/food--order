import React, { createContext, useContext, useReducer } from 'react';
  
const Cartstate = createContext();
const Cartdispatch = createContext();

const Reducer = (state,action)=>{
switch(action.type){
    case'ADD':
    return [...state,{id:action.id,name:action.name,size:action.size,quantity: action.quantity,price:action.price ,img:action.img}]
    case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    case "DROP":
        let empArray = []
        return empArray
        case "UPDATE":
            return state.map((food) => {
              if (food.id === action.id && food.size === action.size) {
                return { ...food, quantity: parseInt(action.quantity), price: action.price };
              } else {
                return food;
              }
            });
    default:
        console.log("error in reducer")
}

}

export const  CartProvider = ({children})=>{
    const [state,dispatch]= useReducer(Reducer,[]);
    return(
 <Cartdispatch.Provider value={dispatch}>
    <Cartstate.Provider value={state}>
        {children}
    </Cartstate.Provider>
 </Cartdispatch.Provider>
    )
}
export  const useCart =()=> useContext(Cartstate);
export const useDispatch = ()=> useContext(Cartdispatch);


