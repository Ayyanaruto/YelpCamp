mapboxgl.accessToken = token;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: show.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(show.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${show.title}</h3><p>${show.location}</p>`
            )
    )
    .addTo(map)
    map.addControl(new mapboxgl.NavigationControl());
// mapboxgl.accessToken = token;
// const map = new mapboxgl.Map({
//     container:'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v11', // style URL
//     center:show.geometry.coordinates, // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });
// // Create a new marker.
//  new mapboxgl.Marker()
//     .setLngLat(show.geometry.coordinates)
//     .addTo(map);