import React, { Component } from 'react'
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap,Marker ,DirectionsRenderer,InfoWindow  } from "react-google-maps";
const moment = require('moment');
const key = "AIzaSyASz1UkWHmuSBq5Obktwpapwunp3UI3OQo";

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

export class Restaurantlocationmap extends Component {

    render() {
        // console.log(this.props.startlocation,this.props.endlocation,"this.props.startlocation")
        return (
            <div>
                <GoogleMap
                  defaultZoom={18}
                  defaultCenter={{ lat: Number(this.props.latitude), lng: Number(this.props.longitude) }}
                >
                  <Marker
                     position={{ lat: Number(this.props.latitude)? Number(this.props.latitude):'', lng: Number(this.props.longitude)?Number(this.props.longitude):'' }}
                  >
                  </Marker>
                </GoogleMap>
            </div>
        )
    }
}

export default compose(
    withProps({
      googleMapURL: G_API_URL,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px`}} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(Restaurantlocationmap);
