import React, {useReducer, useContext} from 'react';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../firebase';

import {OBTENER_PRODUCTOS_EXITO} from '../../types';

import _ from 'lodash';

const FirebaseState = props =>{

    //Crear state inicial
    const initialState = {
        menu:[]
    }

    //UseReducer con dispatch para ejecutar funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    //funcion para traer los productos
    const obtenerProductos = () =>{

         //consultar firebase
        firebase.db.collection('productos').where('existencia','==',true).onSnapshot(manejarSnapshot);
         
        function manejarSnapshot(snapshot){
            let platillos = snapshot.docs.map(doc=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });

            platillos = _.sortBy(platillos, 'categoria');

            console.log(platillos);

            dispatch({type: OBTENER_PRODUCTOS_EXITO, payload: platillos});

        }

        function onError(error) {
            console.error(error);
        }
        
    
    }

    return(
        <FirebaseContext.Provider
                value={{
                    menu: state.menu,
                    firebase, obtenerProductos}}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}
export default FirebaseState;