import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponents'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'

const {persistor,store} = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate 
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
