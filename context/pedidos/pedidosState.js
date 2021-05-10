import React, {useReducer} from 'react';

import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';
import {SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO} from '../../types/index';

const PedidosState = props=>{

    //Crear state inicial
    const initialState = {
        pedido:[],
        platillo: null,
        total: 0,
        idpedido: ''
    }

    //UseReducer con dispatch para ejecutar funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState);

    //funcion para seleccionar que desea ordenar
    const seleccionarPlatillo = platillo =>{
        dispatch({type: SELECCIONAR_PRODUCTO,
        payload: platillo})
    }

    //cuando el usuario confirma un platillo
    const guardarPedido = pedido =>{
        dispatch({type: CONFIRMAR_ORDENAR_PLATILLO,
        payload: pedido})
    }

    //Muestra el total a pagar
    const mostrarResumen = total=>{
        dispatch({type: MOSTRAR_RESUMEN,
            payload: total})
    }

    //Elimina un articulo del carrito
    const eliminarProducto = id =>{
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado = id =>{
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return(
        <PedidosContext.Provider
        value={{pedido: state.pedido,
            platillo: state.platillo,
            total: state.total,
            idpedido: state.idpedido,
            seleccionarPlatillo, guardarPedido, mostrarResumen, eliminarProducto, pedidoRealizado
            }}>
            {props.children}
        </PedidosContext.Provider>
    );
}
export default PedidosState;