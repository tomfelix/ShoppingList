import Expo from 'expo';
import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon, ListItem, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { deleteList, archiveList } from '../actions/index';


class CurrentLists extends React.Component {

  static navigationOptions = {
    title: 'Active Lists',
    headerStyle: {
      backgroundColor: '#2372fc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };


  render() {
    const currentLists = this.props.lists.filter(list => {
      return list.archived === false;
    });

    const sortedCurrentLists = currentLists.sort(function(a,b){
      return b.date - a.date;
    });


    return (
      <View style={{
        flex: 1,
        backgroundColor:'#6da5ff'
      }}>
      <Divider style={{ backgroundColor: 'white', height: 1 }} />
        {
        sortedCurrentLists.map(list => (
          <ListItem
            key={list.id}
            title={list.name}
            containerStyle={ {borderTopWidth: 0, borderBottomWidth: 1, borderBottomColor: 'black'} }
            rightIcon={
              <Icon
                name='keyboard-arrow-right'
                size={30}
              />
            }
            badge={{ value: list.items.length, textStyle: { color: 'black' }, containerStyle: {  backgroundColor: '#6da5ff'} }}
            onPress={() => this.props.navigation.navigate('list', { id: list.id, name: list.name })}
            onLongPress={() => {
              Alert.alert(
                'List options',
                'What do you want to do?',
                [
                  {text: 'Archive this list', onPress: () => this.props.archiveList(list.id)},
                  {text: 'Delete this list', onPress: () => this.props.deleteList(list.id)},
                  {text: 'Cancel', style: 'cancel'}
                ],
                { cancelable: true }
              )
            }
            }
          />
        ))
        }
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Icon
            name='playlist-add'
            reverseColor='white'
            backgroundColor='blue'
            size={30}
            onPress={() => this.props.navigation.navigate('newList')}
            reverse
            raised
          />
        </View>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteList, archiveList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentLists);
