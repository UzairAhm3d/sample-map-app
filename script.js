const ACCESS_TOKEN = 'pk.eyJ1IjoidXphaXItYWhtZWQiLCJhIjoiY2xxdjN2azYzNWx1NzJqdGtieGFvaGhjdSJ9.QPv44ad3PhO08t_HOTR7Aw';
mapboxgl.accessToken = ACCESS_TOKEN;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    // You can handle errors and Define Default Location as well..!!
}

function setupMap(center) {
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: center, // starting position [lng, lat]
        zoom: 15 // starting zoom
    });
    
    // Add NavigationControls
    addControl(map);

    // Current Location with Marker and Popup
    addMarkerToCurrentLocation(map, center);

    // Add Direction Plugin
    addDirection(map);

    // Add Search Box
    searchBox(map);

}

function addControl(map) {
    const nav = new mapboxgl.NavigationControl();
    
    map.addControl(nav, 'bottom-right');
}

function addDirection(map) {
    const direction = new MapboxDirections({
        accessToken: ACCESS_TOKEN
    });

    map.addControl(direction, 'top-left');
}

function addMarkerToCurrentLocation(map, center) {

    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    
    const popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };
    
    const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
        .setLngLat(center)
        .setHTML("<h1>Hello World!</h1>")
        .setMaxWidth("500px")
        .addTo(map);

    const marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat(center)
    .setPopup(popup)
    .addTo(map);
}

function searchBox(map) {
    
    const searchBox = new MapboxSearchBox();
    searchBox.accessToken = ACCESS_TOKEN;
    map.addControl(searchBox);

}
        
