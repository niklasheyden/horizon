// Initialize Mapbox map
function initMap(project_lat, project_lon) {
    // Create a project location array with the longitude and latitude of the project
    const project_location = [project_lon, project_lat];

    // Log latitude and longitude to the console
    console.log("Latitude:", project_lat);
    console.log("Longitude:", project_lon);

    // Set the Mapbox access token
    mapboxgl.accessToken = "pk.eyJ1IjoibmlrbGFzaGV5ZGVuIiwiYSI6ImNsZ3h1Z3g3MzAzNjAzbXBtNHhkdmpxeWEifQ.mM3ECp37l_gWTXPbE7MkAA";
    
    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
        container: "map", // HTML element with the "map" ID to render the map
        style: "mapbox://styles/mapbox/streets-v11", // Map style to use
        center: project_location, // Center the map on the project location
        zoom: 15 // Set the initial zoom level
    });

    // Create a new Mapbox marker
    const marker = new mapboxgl.Marker()
        .setLngLat(project_location) // Set the marker position to the project location
        .addTo(map); // Add the marker to the map
}
