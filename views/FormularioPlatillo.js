import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import PedidosContext from '../context/pedidos/pedidosContext';
import {Container, Content, Form, 
    Icon, Input, Grid, Button, Col,Body, Text, Footer, FooterTab} from 'native-base';
import globalStyles from '../styles/global';

import {useNavigation} from '@react-navigation/native';

const FormularioPlatillo = ()=>{
    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);

    const {platillo, guardarPedido} = useContext(PedidosContext);
    const {precio} = platillo;

    const calcularTotal = ()=>{
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    const navigation = useNavigation();

    useEffect(()=>{
        calcularTotal();
    },[cantidad])

    const confirmarOrden = ()=>{
        Alert.alert('Deseas confirmar tu pedido?','Un pedido confirmado ya no se podrá modificar',
        [{text: 'Confirmar',
        onPress: ()=>{//Almacenar
                        const pedido = {...platillo, cantidad, total};
                        guardarPedido(pedido);
                        navigation.navigate('ResumenPedido');
                    },
        },
        {
            text: 'Cancelar',
            style:'cancel'
        }]
        )
    }
    return (<Container>
        <Content>
            <Form>
                <Text style={globalStyles.titulo}>
                    Cantidad
                </Text>
                <Grid>
                    <Col>
                        <Button props dark style={{height:80}} onPress={()=>guardarCantidad(cantidad > 1 ? Number(cantidad)-1 : 1)}>
                            <Icon style={{fontSize:40}} name='remove'/>
                        </Button>
                    </Col>
                    <Col>
                        <Input value={cantidad.toString()} style={{fontSize:20, textAlign:'center'}}
                        keyboardType="numeric"
                        onChangeText={(cantidad)=> guardarCantidad(cantidad)}/>
                    </Col>
                    <Col>
                        <Button props dark style={{height:80, alignSelf:'flex-end'}} onPress={()=>guardarCantidad(Number(cantidad)+1)}>
                            <Icon style={{fontSize:40}} name='add'/>
                        </Button>
                    </Col>
                </Grid>
                <Text style={globalStyles.cantidad}>
                    SubTotal: Gs.{total}
                </Text>
            </Form>
        </Content>
        <Footer>
                <FooterTab>
                    <Button style={globalStyles.boton} onPress={()=>confirmarOrden()}>
                        <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
    </Container>);
}
export default FormularioPlatillo;