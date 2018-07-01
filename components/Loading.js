import React from 'react';
import { View, Text, FlatList } from 'react-native';


class Loading extends React.Component {

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Loading...</Text>
      </View>
    );
  }
}


export default Loading;
