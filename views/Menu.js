import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Separator, Content, List, ListItem, Thumbnail, Text, Left, Body} from 'native-base';

import globalStyles from '../styles/global';

import _ from 'lodash';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';

const Menu = ()=>{
    //Context de Firebase
    let {menu, obtenerProductos} = useContext(FirebaseContext);

    //Context del pedido
    const {seleccionarPlatillo} = useContext(PedidosContext);

    const navigation = useNavigation();

    /*menu = [{id:1,nombre:'Hamburguesa',descripcion:'Hamburguesa con queso', precio:'20000', categoria:'Comidas'},
    {id:2,nombre:'Gaseosa',descripcion:'Gaseosa mediana', precio:'10000', categoria:'Bebidas'},
    {id:3,nombre:'Lomito',descripcion:'Lomito con queso', precio:'20000', categoria:'Comidas'}];*/

    menu = _.sortBy(menu, 'categoria');
    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) =>{
        if(i > 0){
            const categoriaAnterior = menu[i-1].categoria;

            if(categoriaAnterior !== categoria){
                return(
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>
                            {categoria}
                        </Text>
                    </Separator>
                )
            }
        }else{
            return(
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>
                        {categoria}
                    </Text>
                </Separator>
            )
        }
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={{backgroundColor:'#FFF'}}>
                <List>
                    {menu.map((platillo, i)=>{
                        const {imagen, nombre, descripcion, categoria, precio, id} = platillo;
                        return(
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem onPress={()=>{
                                    seleccionarPlatillo(platillo);
                                    navigation.navigate('DetallePlatillo');
                                }}>
                                    <Left>
                                        <Thumbnail source={{uri: imagen}}/>
                                    </Left>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text note
                                        numberOfLines={2}>{descripcion}</Text>
                                        <Text>Precio: Gs.{precio}</Text>
                                    </Body>

                                </ListItem>
                            </Fragment>
                        );
                    })}
                </List>
            </Content>
        </Container>
    );
}
export default Menu;

const styles = StyleSheet.create({
    separador:{
        backgroundColor:'#000'
    },
    separadorTexto:{
        fontWeight: 'bold',
        color: '#FFDA00',
        textTransform: 'uppercase'
    }
})