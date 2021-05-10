import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import PedidosContext from '../context/pedidos/pedidosContext';

import globalStyles from '../styles/global';

import {useNavigation} from '@react-navigation/native';

import {Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab} from 'native-base';

import firebase from '../firebase';
import firebaseConfig from '../firebase/config';
const ResumenPedido = ()=>{
    const navigation = useNavigation();
    const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} = useContext(PedidosContext);

    useEffect(()=>{
        calcularTotal()
    },[pedido]);

    const calcularTotal = () =>{
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo)=> nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal);
    }

    //redirecciona a progreso pedido
    const progresoPedido = () =>{
        Alert.alert('Revisa tu pedido', 'Una vez que realizas tu pedido, no podrás cambiarlo',
        [{text: 'Confirmar',
            onPress: async()=>{
                const pedidoObj ={tiempoEntrega: 0, completado: false, total: Number(total), orden: pedido,
                creado: Date.now()};
                //escribir el pedido en firebase
                try {
                    const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                    pedidoRealizado(pedido.id);
                    navigation.navigate("ProgresoPedido");
                } catch (error) {
                    console.log(error);
                }
                
            } 
        }, 
        {text: 'Revisar', style: 'cancel'}]);
        
    }

    const confirmarEliminacion = id =>{
        Alert.alert('Seguro que desea eliminar?', 'Una vez eliminado no se puede recuperar',
        [{text: 'Confirmar' , onPress: eliminarProducto(id)}, {text: 'Cancelar', style: 'cancel'}])
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map( (platillo, i) =>{
                    const {cantidad, precio, nombre, id} = platillo;
                    return(<List key={id+i}>
                        <ListItem>
                            <Body>
                                <Text>{nombre}</Text>
                                <Text>Cantidad: {cantidad}</Text>
                                <Text>Precio: Gs.{precio}</Text>

                                <Button full danger style={{marginTop:20}} onPress={()=>confirmarEliminacion(id)}>
                                    <Text style={globalStyles.botonTexto}>Eliminar</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </List>)
                })}
                <Text style={globalStyles.cantidad}>Total a pagar: Gs.{total}</Text>
                <Button onPress={()=>navigation.navigate("Menu")} style={{marginTop: 30}} full dark>
                    <Text style={[globalStyles.botonTexto, {color:'#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                <Button onPress={()=>progresoPedido()} style={globalStyles.boton} full>
                    <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
export default ResumenPedido;