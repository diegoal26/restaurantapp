import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ProgresoPedido from './views/ProgresoPedido';
import ResumenPedido from './views/ResumenPedido';

import FirebaseState from './context/firebase/firebaseState';

import PedidosState from './context/pedidos/pedidosState';

//components
import BotonResumen from './components/ui/BotonResumen';

const Stack = createStackNavigator();
//const App: () => React$Node = () => {
const App = () => {
  return (
    <>
      <FirebaseState>
      <PedidosState>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="NuevaOrden"
        screenOptions={{
          headerStyle:{backgroundColor:'#FFDA00'},
          headerTitleStyle:{fontWeight:'bold'}
        }}>
          <Stack.Screen
            name="NuevaOrden"
            component={NuevaOrden}
            options={{title: 'Nueva Orden'}}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{title: 'Nuestro Menú', headerRight: props=><BotonResumen/>}}
          />
          <Stack.Screen
            name="DetallePlatillo"
            component={DetallePlatillo}
            options={{title: 'Detalle Platillo'}}
          />
          <Stack.Screen
            name="FormularioPlatillo"
            component={FormularioPlatillo}
            options={{title: 'Formulario'}}
          />
          <Stack.Screen
            name="ResumenPedido"
            component={ResumenPedido}
            options={{title: 'Resumen'}}
          />
          <Stack.Screen
            name="ProgresoPedido"
            component={ProgresoPedido}
            options={{title: 'Progreso de Pedido'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PedidosState>
      </FirebaseState>
    </>
  );
};

export default App;
