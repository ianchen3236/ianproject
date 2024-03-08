import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'



//根據篩選出的分店產生 動態zoom level 和 動態center???
export default function Map({ geojsonData }) {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  }

  const defaultCenter = {
    lat: 23.6978,
    lng: 120.9605,
  }

  const mapOptions = {
    disableDefaultUI: true, // 去除默認介面
    zoomControl: true,
    clickableIcons: false, // 禁用可點擊圖示
    styles: [
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"saturation":0}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#cee3e8"},{"visibility":"on"},{"saturation":0}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#a0f3bd"},{"visibility":"on"},{"saturation":0}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"saturation":0}]},{"featureType":"water","elementType":"","stylers":[{"color":"#8aadf5"},{"visibility":"on"},{"saturation":0}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"color":"#000000"},{"visibility":"on"},{"saturation":0}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]}
    ],
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyD9RHsF4cQD4gMbJ34PM2-81OetxSoOFWY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={7}
        center={defaultCenter}
        options={mapOptions}
      >
        {/* 在地圖上添加標記 */}
        {geojsonData &&
          geojsonData.features.map((feature) => (
            <Marker
              key={feature.properties.id}
              position={{
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
              }}
              title={feature.properties.name}
              icon={{
                url:'/images/myService/ink-pen.png'
              }}
            />

          ))}
      </GoogleMap>
    </LoadScript>
  )
}
