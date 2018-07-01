import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { addListItem } from '../actions/index';
import { bindActionCreators } from 'redux';


class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static navigationOptions = {
    title: 'Add new Item',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  handleClick(){
    this.props.addListItem(this.props.navigation.state.params.id, this.state.text);
    this.setState({
      text: ''
    });
    this.props.navigation.navigate('list', { id: this.props.navigation.state.params.id});
  }


  render() {
    return (
      <View style={{
       flex:1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#72a8ff'
      }}>
        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Put item's name here"
          containerStyle={{
            backgroundColor: '#fff',
            borderColor: 'white',
            borderRadius: 50,
            marginBottom: 10
          }}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={{
              backgroundColor: "transparent",
              width: 100,
              height: 40,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 50
            }}
          />
          <Button
            title="Add item"
            disabled={!this.state.text}
            onPress={this.handleClick}
            buttonStyle={{
              backgroundColor: "#3ccc37",
              width: 100,
              height: 40,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 50
            }}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addListItem }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
