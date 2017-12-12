import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { Container, Content, Header, View, Button, Text, Icon, Card, CardItem, Right } from 'native-base';
import Polyline from '@mapbox/polyline';
import {Actions} from 'react-native-router-flux';
// import Main from './../Dashboard/main';


const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class MyApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: false,
      initialPosition : {
        latitude:0,
        longitude:0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      myLocation : {
        latitude:null,
        longitude:null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
      end: {
        latitude:null,
        longitude:null,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      coords: [],
      searchByPlaces : false,
      searchType: "",
      // details: '',
    }
  }

  componentWillReceiveProps(props){
    var end;
   setTimeout(()=>{ if(props.searchMarker.fetchDetails){
      console.log(props.searchMarker);
      
      end = {
        latitude:  props.searchMarker.l[0].geometry.location.lat,
        longitude:  props.searchMarker.l[0].geometry.location.lng,
      //////////////
        latitudeDelta: 0,
        longitudeDelta: 0,
      }
    this.setState({
      end: end,
      initialPosition : end,
      // end: 
      places: props.searchMarker.l,
      marker: props.searchMarker.fetchDetails,
      data: {},
    })
  }}, 6000)
  // else{
  //   this.setState({
  //     initialPosition : {
  //       latitude:  props.end.geometry.location.lat,
  //       longitude:  props.end.geometry.location.lng,
  //     //////////////
  //       latitudeDelta: 0,
  //       longitudeDelta: 0,
  //     },
  //     // end: 
  //     places: [props.end],
  //     marker: true,
  //     data: {},
  //   })
  // }
  }

  // watchID: (null: ?number),
  watchID = null 

  componentDidMount(){
    if(this.props.detail){
     var data = this.props.detail.geometry.location;
  var lastRegion = {
        latitude : data.lat,
        longitude : data.lng,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA
      }
    this.setState({
      end: lastRegion,
      initialPosition : lastRegion,
        data: data,
      })

    }
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude : lat,
        longitude : long,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA
      }
      this.setState({
        initialPosition : initialRegion,
        // myLocation: lastRegion,
        
      })
    } ,(error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout : 20000, maximumAge: 1000})

      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var lastRegion = {
          latitude : lat,
          longitude : long,
          latitudeDelta : LATITUDE_DELTA,
          longitudeDelta : LONGITUDE_DELTA
        }
        this.setState({
          initialPosition : lastRegion,
          myLocation: lastRegion,
        })
      }, (error)=>alert(JSON.stringify(error)), 
      {enableHighAccuracy: false, timeout : 20000, maximumAge: 1000})
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.state.watchID)
  }

  async getDirections(startLoc, destinationLoc) {
    try {
        let key = 'AIzaSyDyurz-X5eVkubiv4kmQC0i3fVvmOIqoqc'
        //console.log(key)
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyDyurz-X5eVkubiv4kmQC0i3fVvmOIqoqc`)
        console.log(resp)
        let respJson = await resp.json();
        console.log(respJson)
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        console.log(points)
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1]
            }
        })
        console.log(coords)
        this.setState({
           coords: coords
          })
        return coords
    } catch (error) {
        return (error) => { console.log(error.message,); alert(error.message) }
    }
}

directionGet(){
  var startLoc = this.state.myLocation.latitude + "," + this.state.myLocation.longitude;
  // console.log(startLoc)
  //if(this.state.end){
  var destinationLoc = this.state.end.latitude + "," + this.state.end.longitude;
//}
  // console.log(destinationLoc)
 this.getDirections(startLoc, destinationLoc)
}

nearByPlaces(searchType) {
  this.setState({
      searchType: searchType,
      searchByPlaces: false,

  })
  const placeSearch = this.state.myLocation.latitude + "," + this.state.myLocation.longitude;
  // console.log(placeSearch)
  this.getNearByPlaces(placeSearch, searchType)
}

async getNearByPlaces(placeSearch, searchType) {
  // console.log(searchType, "searchType searchType")
  // console.log(placeSearch, " in the getNearByPlaces")
  try {
      let location = placeSearch
      let key = 'AIzaSyDyurz-X5eVkubiv4kmQC0i3fVvmOIqoqc'
      let resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=${searchType}&key=AIzaSyDyurz-X5eVkubiv4kmQC0i3fVvmOIqoqc`)
      console.log(resp)
      let respJson = await resp.json();
      let respJson1 = respJson.results
      // Actions.PlaceList({ searchType, respJsonn });
      console.log(respJson, "respJson of getNearByPlaces")
      // this.setState({ NearByPlacesData: respJson.results })
      // Actions.nearplaces({place: respJson1});
      this.setState({
        initialPosition : {
          latitude:  respJson1[0].geometry.location.lat,
          longitude:  respJson1[0].geometry.location.lng,
        //////////////
          latitudeDelta: 0.05,
          longitudeDelta: 0.012,
        
        },
        places: respJson1,
        marker: true,
      })


  } catch (error) {
      return (error) => { console.log(error, 'error error error') }
  }
}
place(data){
  Actions.nearplaces({place: data})
}
  render() {
    const { region } = this.props;
    return (
      <View style={styles.container}>
    {this.state.initialPosition.latitude ?
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
          showsUserLocation
          showsTraffic
          showsBuildings
          showsCompass
          showsIndoors
          showsMyLocationButton
        >
           {/* {this.state.data &&     
           <MapView.Marker
             coordinate={{
                latitude: this.state.data.lat,
                longitude: this.state.data.lng,
        }}
         />} */}
        {/* {this.props.searchMarker&& */}
          {this.state.marker &&
          this.state.places.map((data, i)=>{
           var location = data.geometry.location;
          return(
        <MapView.Marker key={i} //onCalloutPress={Actions.nearplaces({location: location, place: data})}
        coordinate={{
            latitude: location.lat,//this.props.searchMarker.latitude,
            longitude: location.lng,//this.props.searchMarker.longitude,
        }}>
         <MapView.Callout onPress={this.place.bind(this, data)//()=>Actions.nearplaces({location: location, place: data})
         }
         >
          <Text>{data.name}</Text><Text style={{color: 'blue', fontSize: 12}}>Tap to get more info</Text>
         </MapView.Callout>
         
         </MapView.Marker>)
        })
        }
 
        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={6}
            strokeColor="#6495ED" />
      
        </MapView> : null}
        {this.state.end.latitude &&
        <Button style={styles.go} onPress={this.directionGet.bind(this)}>
              <Icon //name='ios-arrow-dropright' //backgroundColor="#3b5998" color="white" size={15}
              />
              <Text>GO</Text>
              
        </Button>}
        {this.state.searchByPlaces ? <Container>
          {/* <Header>
            Near By Places
          </Header> */}
          <Content>
            <Card>
              <CardItem>
                <Text onPress={this.nearByPlaces.bind(this, 'restaurant')}>
                    Restaurant
                </Text>
                <Right>
                    <Icon active name="restaurant" />
                </Right>
              </CardItem> 
              <CardItem>
                <Text onPress={this.nearByPlaces.bind(this, 'bank')}>
                    Banks
                </Text>
                <Right>
                    <Icon active name="ios-cash" />
                </Right>
              </CardItem>
              <CardItem>
                <Text onPress={this.nearByPlaces.bind(this, 'gas_station')}>
                    Gas Station
                </Text>
                <Right>
                <Icon active name="car" />
                </Right>
              </CardItem>
              <CardItem>
                <Text onPress={this.nearByPlaces.bind(this, 'hospital')}>
                    Hospitals
                </Text>
                <Right>
                <Icon active name="md-medkit" />
                </Right>
              </CardItem>
            </Card>
          </Content>
          </Container> : <View></View>}

          <View style={styles.footer}>
          <Button style={styles.bottomButtons} 
            onPress={() => { this.setState({ searchByPlaces: this.state.searchByPlaces ? false : true }) }} >
            <Text style={styles.footerText}>Places</Text>
          </Button>
          </View>
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
  container : {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/1 -70,
    justifyContent : 'flex-end',
    alignItems : 'center',
  },

  map : {
    ...StyleSheet.absoluteFillObject,    
  },
  go: {
    backgroundColor: "#3b5998",
    justifyContent: 'center',
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  footer: {
    flex: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2980b6',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    zIndex: 1,
  },
  bottomButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footerText: {
    color: 'white',
    alignItems: 'center',
    fontSize: 16,
  },
})