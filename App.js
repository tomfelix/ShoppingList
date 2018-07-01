import Expo from 'expo';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';

import List from './screens/List';
import NewList from './screens/NewList';
import NewItem from './screens/NewItem';
import rootReducer from './reducers/index';
import Loading from './components/Loading';
import CurrentLists from './screens/CurrentLists';
import ArchivedLists from './screens/ArchivedLists';


const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2
};
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);


export default class App extends React.Component {

  render() {
    //persistor.purge(); -> useful to clean data
    const CurrentStack = createStackNavigator({
    active: CurrentLists,
    list: List,
    newList: NewList,
    newItem: NewItem
    });

    const ArchivedStack = createStackNavigator({
    archived: ArchivedLists,
    list: List,
    });

    const MainNavigator = createBottomTabNavigator({
      active: CurrentStack,
      archived: ArchivedStack,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'active') {
            iconName = `ios-albums${focused ? '' : '-outline'}`;
          } else if (routeName === 'archived') {
            iconName = `ios-archive${focused ? '' : '-outline'}`;
          }
          return <Ionicons name={iconName} size={30} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      },
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
});
