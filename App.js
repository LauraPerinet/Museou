import React, { Component } from 'react';
import { Platform, ActivityIndicator, View, FlatList, Text, Slider, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import { Icon } from 'react-native-elements'

export default class App extends Component {


  render() {

    return(

      <NavigationExperimental.Navigator initialRoute = {{ id: 'PageAccueil' }}
     renderScene = {this.NavigatorRenderScene} />



    );

  }

  NavigatorRenderScene(route, navigator) {
  switch (route.id) {
    case 'Page2':
    return (<Page1 navigator = {navigator} /> );
    case 'Page1':
    return (<Page2 navigator = {navigator} item={route.item} /> );
    case 'PageAccueil':
    return (<PageAccueil navigator = {navigator} item={route.item} /> );
    case 'PageAbout':
    return (<PageAbout navigator = {navigator} item={route.item} /> );
  }
}

}

class PageAccueil extends Component {

  render() {
    return(
      <View style={styles.container}>
      <Image style={styles.bgContainer}
                // source={require('./img/logo.png')}
                 source={{ uri: 'http://laurapm-graphisme.fr/img/logoMuseou.png' }}
        />
        <TouchableHighlight style={styles.buttonAccueil} onPress={ () => this.props.navigator.push({id: 'Page2'})}>
        <Text style={styles.textAccueil}>Chercher un musée</Text>
         </TouchableHighlight>
         <TouchableHighlight style={styles.buttonAccueil} onPress={ () => this.props.navigator.push({id: 'PageAbout'})}>
        <Text style={styles.textAccueil}>A propos de nous</Text>
         </TouchableHighlight>
      </View>
    );

  }

}

class PageAbout extends Component {

  render() {
    return(
      <View style={styles.container}>
      <Image style={styles.bgContainer}
                  source={{ uri: 'http://laurapm-graphisme.fr/img/logoMuseou.png' }}
                 // source={require('./img/logo.png')}
        />

        <Text>A propos de nous</Text>
      </View>
    );

  }

}


class Page1 extends Component {


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
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    dataSource : [
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"b80fe8c209e1098ba7194482190e1226d6185197",
            "fields":{
                "periode_ouverture":"Ouvert lundi, mercredi au vendredi de 11h à 18h, samedi-dimanche de 11h à 19h",
                "nom_du_musee":"Musée National de la Marine",
                "adr":"17, Place du Trocadéro",
                "ville":"PARIS",
                "nomreg":"ILE-DE-FRANCE",
                "ferme":"NON",
                "fermeture_annuelle":"1er janvier, 1er mai, 25 décembre",
                "coordonnees_":[
                    48.874425,
                    2.28577
                ]
                ,
                "sitweb":"www.musee-marine.fr",
                "dist":"19219",
                "cp":75116,
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.28577,
                    48.874425
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
        ,
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"f8c4a70dfa81fa93495159f1384d9c65d13ae11d",
            "fields":{
                "periode_ouverture":"Ouvert les jeudis, samedis et dimanches après-midi uniquement en visite conférence, sur réservation",
                "nom_du_musee":"Musée d'Ennery",
                "adr":"59, Avenue Foch",
                "ville":"PARIS",
                "nomreg":"ILE-DE-FRANCE",
                "ferme":"NON",
                "fermeture_annuelle":"1er janvier, 1er mai, 25 décembre",
                "coordonnees_":[
                    48.871887,
                    2.282381
                ]
                ,
                "sitweb":"www.guimet.fr",
                "dist":"19236",
                "cp":75116,
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.282381,
                    48.871887
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
        ,
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"88ebab96826bcfa822c60fd0e0bc3f1b2ff4ac9b",
            "fields":{
                "periode_ouverture":"Ouvert du mercredi au lundi de 10h à 18h",
                "nom_du_musee":"Etablissement Public du Musée des Arts Asiatiques Guimet",
                "adr":"6, Place d'Iéna",
                "ville":"PARIS",
                "nomreg":"ILE-DE-FRANCE",
                "ferme":"NON",
                "fermeture_annuelle":"1er janvier, 1er mai, 25 décembre",
                "coordonnees_":[
                    48.865772,
                    2.279352
                ]
                ,
                "sitweb":"www.museeguimet.fr",
                "dist":"19565",
                "cp":75116,
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.279352,
                    48.865772
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
        ,
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"0f04e336dcadc3b2f79438ab6d3b8da51a674096",
            "fields":{
                "periode_ouverture":"Ouvert de 11h-18h du mercredi au lundi. Nocturne jusquà 21h le premier jeudi du mois",
                "nom_du_musee":"Musée Jean-Jacques Henner",
                "adr":"43, Avenue de Villiers",
                "ville":"PARIS",
                "nomreg":"ILE-DE-FRANCE",
                "sitweb":"www.musee-henner.fr ou www.henner-intime.fr",
                "fermeture_annuelle":"1er janvier, 1er mai, dimanche et lundi de Pentecôte, 14 juillet, 15 août, Noël",
                "coordonnees_":[
                    48.883045,
                    2.307689
                ]
                ,
                "ferme":"NON",
                "jours_nocturnes":"Premier jeudi du mois jusqu'à 21h",
                "cp":75017,
                "dist":"19807",
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.307689,
                    48.883045
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
        ,
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"d77f090821ac5dd662087bb6cdbf6c3fd4fad190",
            "fields":{
                "annreouv":"Transfert Roubaix",
                "ville":"PARIS",
                "nom_du_musee":"Musée Bouchard",
                "adr":"25, Rue de l'Yvette",
                "nomreg":"ILE-DE-FRANCE",
                "ferme":"OUI",
                "coordonnees_":[
                    48.853611,
                    2.265988
                ]
                ,
                "sitweb":"www.musee-bouchard.com",
                "dist":"19935",
                "cp":75016,
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.265988,
                    48.853611
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
        ,
        {
            "datasetid":"liste-musees-de-france-a-paris",
            "recordid":"b72756f61c6eb45f4ac1e0bec8f91d9cb8d04770",
            "fields":{
                "annreouv":"2014",
                "ville":"PARIS",
                "nom_du_musee":"Musée de l'Homme (Muséum National d'Histoire Naturelle)",
                "adr":"Place du Trocadéro",
                "nomreg":"ILE-DE-FRANCE",
                "ferme":"OUI",
                "coordonnees_":[
                    48.860413,
                    2.28072
                ]
                ,
                "sitweb":"www.mnhn.fr",
                "dist":"20067",
                "cp":75116,
                "nomdep":"PARIS"
            }
            ,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    2.28072,
                    48.860413
                ]
            }
            ,
            "record_timestamp":"2016-08-27T16:20:53+00:00"
        }
    ]
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

    return (
      <View style={{flex: 1}}>
        <Header />
        <View style={{flex: 5, paddingTop:20}}>
          <View style= {{margin:10}}>
              <Text  > Selectionnez votre distance </Text>
              <Slider
                maximumValue={ 100000 }
                value={this.state.distance}
                onValueChange={distance => this.setState({ distance })}
                step= { 1 }
              />
              <Text> Distance en mètre : { this.state.distance } </Text>
          </View>

          <MapView
          style={{ alignSelf: 'stretch', height: 200,flex:1 }}
          region={{ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
          showsUserLocation={true}
          />

          <FlatList
           style={{marginBottom:20, flex:2}}
           data={this.state.dataSource}

            renderItem={({ item }) => (
              <TouchableHighlight  style={styles.button } onPress={ () => this.props.navigator.push({ id: 'Page1' , item : {item}}) }>
                <Text>{item.fields.nom_du_musee}</Text>
              </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );

}
}
class Header extends Component {
  render(){
    return(
    <View style={{flex: 1, paddingTop:20}}>
      <Image
      // source={require('./img/logo.png')}
        source={{ uri: 'http://laurapm-graphisme.fr/img/logoMuseou.png' }}
        style={{ height: 100, width: 100 }}
      />
    </View>);
  }
}

class Page2 extends Component {
  render() {
    return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flex: 4, paddingTop:5}}>

        <Text style={{fontWeight: 'bold', fontSize : 20 }} onPress={ () => this.props.navigator.push({ id: 'Page2' }) }> Retour en arrière </Text>


      <Icon
      iconStyle ={{marginLeft:-250, paddingTop:20}}
      name='account-balance'
      type='action'
      color='#FBB03B'
      />

    <Text style={{fontWeight: 'bold', fontSize : 15, color:'#0173BF', marginLeft:30, paddingTop:5}}>Nom du musée :</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.nom_du_musee }</Text>


      <Icon
      iconStyle ={{marginLeft:-250, paddingTop:5}}
      name='room'
      type='action'
      color='#FBB03B'
      />

    <Text style={{fontWeight: 'bold', fontSize : 15, color:'#0173BF', marginLeft:30, paddingTop:5}}>Adresse :</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.adr }</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.cp }, {this.props.item.item.fields.ville }</Text>


      <Icon
      iconStyle ={{marginLeft:-250, paddingTop:5}}
      name='query-builder'
      type='action'
      color='#FBB03B'
      />

    <Text style={{fontWeight: 'bold', fontSize : 15, color:'#0173BF', marginLeft:30, paddingTop:5}} >Période d'ouverture :</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.periode_ouverture }</Text>
      <Icon
      iconStyle ={{marginLeft:-250, paddingTop:5}}
      name='blockr'
      type='action'
      color='#FBB03B'
      />
    <Text style={{fontWeight: 'bold', fontSize : 15, color:'#0173BF', marginLeft:30, paddingTop:5}}>Fermetures annuelles :</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.fermeture_annuelle }</Text>
      <Icon
      iconStyle ={{marginLeft:-250, paddingTop:5}}
      name='language'
      type='action'
      color='#FBB03B'
      />
    <Text style={{fontWeight: 'bold', fontSize : 15, color:'#0173BF', marginLeft:30, paddingTop:5}}>Site web :</Text>
    <Text style={{marginLeft:35}}>{this.props.item.item.fields.sitweb }</Text>
      </View>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    borderTopColor: '#FBB03B',
    borderWidth: 3,
    borderBottomColor: '#0071BC',
    borderLeftColor: '#ED1E79',
    borderRightColor: '#004E2B',
    padding: 10,
    marginHorizontal:20,
    marginTop:10
  },
   container: {
    flex: 1,
    backgroundColor: '#2E89FF',
    flexDirection:'column',
    justifyContent: 'center',
  },
  bgContainer: {
    flex: 1,
   width: null,
   height: null,
    justifyContent: 'flex-start',
    resizeMode: 'contain'
  },
    buttonAccueil: {
    borderRadius: 50,
    borderColor: '#F9B23F',
    borderWidth: 3,
    padding: 10,
    marginHorizontal:20,
    marginTop:10,
    alignItems: 'center',
    backgroundColor: '#F9B23F',
  },
     textAccueil: {
 color:'#014573',
  },
})
