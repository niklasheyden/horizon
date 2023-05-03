// The script listens for the DOMContentLoaded event which fires when the HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
    // Get the HTML element with the ID "address"
    const input = document.getElementById("address");
    // Initialize Google Maps Places Autocomplete widget if input is being provided
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
    }
});
