import React, { Component } from 'react';
import { Platform, View, ActivityIndicator, FlatList, Text, Slider, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  state = {
    markers: [{
    title: 'Moi',
    coordinates: {
      latitude: null,//48.849679,
      longitude: null//2.331783
    
    
    },
    
    
  }],
    location: null,
    errorMessage: null,
    distance:0,
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }



  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    let longitude = 'Waiting..';
    let latitude = 'Waiting..';
    let distance = 'Waiting..';

 if (this.state.location) {

      longitude = this.state.location.coords.longitude;
      latitude = this.state.location.coords.latitude;
      distance = this.state.distance;
     
      this.setState();      
    }
    


     if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
  fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=liste-musees-de-france-a-paris&rows=1295&facet=cp&geofilter.distance='+latitude+','+longitude+','+distance)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.records,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    return(
     
      
      <View style={{flex: 1, paddingTop:20}}>
        <Text> Selectionnez votre distance</Text>
        <Slider 
          maximumValue={ 3000 }
          value={this.state.distance}
          onValueChange={distance => this.setState({ distance })}
          step= { 1 }
        />
        <Text> Distance en mètre : { this.state.distance } </Text>
        

        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
          
        >
      
        </MapView>
      
      
      
      <FlatList
       data={this.state.dataSource}
       
        renderItem={({ item }) => (
          <Text style={styles.red}>{item.fields.nom_du_musee}</Text>
      )}
      keyExtractor={(item, index) => index}
      />
      
      </View>
      

        

    );
    

  }
}

const styles = StyleSheet.create({
  /*bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },*/
  red: {
    margin: 5,
    color: 'white',
    borderRadius: 4,
    paddingVertical: 10,
    backgroundColor: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    
    
  },
});
