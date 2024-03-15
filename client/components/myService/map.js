import React, { useState, useEffect,useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'



//根據篩選出的分店產生 動態zoom level 和 動態center???
export default function Map({ geojsonData, storeDetail, setStoreDetail }) {
  const [zoom, setZoom] = useState(7);
  const [center, setCenter] = useState({ lat: 23.6978, lng: 120.9605 });
  const mapRef = useRef(null); // 用于存储 Google 地图实例的引用
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
  const handleMarkerClick = (storeDetail) => {
    setStoreDetail(storeDetail);
  };
  useEffect(() => {
    // 每次查询条件变更时，将缩放级别和中心点恢复为预设值
    setZoom(7);
    setCenter(defaultCenter);
    // 如果地图引用存在，手动更新地图的缩放级别
    if (mapRef.current) {
      const map = mapRef.current;
      map.panTo(defaultCenter); // 设置地图中心
      map.setZoom(7); // 设置缩放级别为 7
    }
  }, [geojsonData]); // 当查询条件变更时执行
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyD9RHsF4cQD4gMbJ34PM2-81OetxSoOFWY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoom}
        center={center}
        options={mapOptions}
        onLoad={(map) => mapRef.current = map} // 将加载的地图实例存储到 mapRef

      >
        {/* 在地圖上添加標記 */}
        {geojsonData && geojsonData.length > 0 &&
  geojsonData.map((data) => (
    <Marker
      key={data.id}
      position={{
        lat: parseFloat(data.lat), // 将字符串转换为浮点数
        lng: parseFloat(data.lng), // 将字符串转换为浮点数
      }}
      title={data.name}
      icon={{
        url: '/images/myService/ink-pen.png',
      }}
      onClick={() => handleMarkerClick(data)}///
    />
  ))}

      </GoogleMap>
    </LoadScript>
  )
}
