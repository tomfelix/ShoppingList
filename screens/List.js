import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import listsReducer from '../reducers/lists-reducer';
import { ListItem, Icon, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { deleteListItem } from '../actions/index';


class List extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    };
  };

  render() {
    const currentList = this.props.lists.filter(list => {
      return list.id === this.props.navigation.state.params.id
    });

    const itemsList = currentList[0].items;


    if(!currentList[0].archived) {
      if(itemsList.length === 0) {
        return(
          <View style={{
            flex: 1,
            backgroundColor:'white'
          }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
              <Text>List is empty</Text>
            </View>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Icon
                name='add'
                reverseColor='white'
                backgroundColor='blue'
                size={30}
                onPress={() => this.props.navigation.navigate('newItem', { id: currentList[0].id })}
                reverse
              />
            </View>
          </View>
        )
      }
      return (
        <View style={{
          flex: 1,
          backgroundColor:'white'
        }}>
          <Divider style={{ backgroundColor: 'black', height: 1 }} />
          {
          itemsList.map((item, index) => (
            <ListItem
              key={index}
              title={item}
              containerStyle={{ borderTopWidth: 0, borderBottomWidth: 1, borderBottomColor: 'black' }}
              rightIcon={
                <Icon
                  name='close'
                  color='red'
                  onPress={() => this.props.deleteListItem(currentList[0].id, index)}
                />
              }
            />
          ))
          }
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Icon
              name='add'
              reverseColor='white'
              backgroundColor='blue'
              size={30}
              onPress={() => this.props.navigation.navigate('newItem', { id: currentList[0].id })}
              reverse
            />
          </View>
        </View>
      );
    }
    if(itemsList.length === 0) {
      return(
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#9e9e9e'
        }}>
          <Divider style={{ backgroundColor: 'black', height: 1 }} />
          <Text>List is empty</Text>
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        backgroundColor:'#9e9e9e'
      }}>
        <Divider style={{ backgroundColor: 'black', height: 1 }} />
        {
        itemsList.map((item, index) => (
          <ListItem
            key={index}
            title={item}
            containerStyle={ {borderTopWidth: 0, borderBottomWidth: 1, borderBottomColor: 'black'} }
          />
        ))
        }
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
  return bindActionCreators({ deleteListItem }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(List);
