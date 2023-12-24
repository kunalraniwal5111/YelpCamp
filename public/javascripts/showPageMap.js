// mapboxgl.accessToken = 'pk.eyJ1Ijoia3VuYWw1MTExIiwiYSI6ImNscTZubWFoZjBqbjcya3A3bzViYnBnc2EifQ._stiXkfe-MyaOE_AJ30sIA';
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    // center: [-74.5, 40], // starting position [lng, lat]
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
    // zoom: 4, // starting zoom
});


map.addControl(new mapboxgl.NavigationControl());




new mapboxgl.Marker()
    // .setLngLat([-74.5, 40])
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}`
        )
    )
    .addTo(map);