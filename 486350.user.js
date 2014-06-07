// ==UserScript==

// @name          Hawks Cay Map

// @description   reload map every 2 minutes

// @include       *

// ==/UserScript==

var targetPage = "http://www.hawkscay.com/map/";  // web page you want to navigate to.
var currentPage = ""; // initialize var to hold current page url.
var timeInterval = 120000; // time in milliseconds (2 minutes)
var timer = setInterval(function() {CheckPage(currentPage, targetPage)}, timeInterval); // set timer to call CheckPage function at every interval defined as timeInterval.


// Get the URL of the current page in the window.
// If the current page does not match the URL of the target page,
// Set the windows to the target URL.
function CheckPage (currentPage, targetPage) {
    currentPage = window.location.href;
    if (currentPage != targetPage) {
       window.location.assign(targetPage);
    }
}