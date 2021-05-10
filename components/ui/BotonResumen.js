import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import globalStyles from '../../styles/global';

import {useNavigation} from '@react-navigation/native';
import PedidosContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () =>{
    const navigation = useNavigation();
    const {pedido} = useContext(PedidosContext);

    if(pedido.length === 0) return null;

    return(<Button style={globalStyles.boton} onPress={()=>navigation.navigate("ResumenPedido")}>
        <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
    </Button>);
}
export default BotonResumen;