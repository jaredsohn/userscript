// ==UserScript==
// @name       AdSense refresh
// @namespace  http://ostermiller.org/
// @version    1.0
// @description  Refresh the Google AdSense console when you click on it after a period of inactivity
// @match      https://www.google.com/adsense/*
// @copyright  2014, Stephen Ostermiller
// ==/UserScript==
var lastrefresh = new Date().getTime();
window.addEventListener("focus", function(event) { 
    // console.log("AdSense Window has focus");
    var age = new Date().getTime() - lastrefresh;
    // console.log("Age: " + age);
    if (age > 1000 * 60 * 20) {
    	// more than twenty minutes old
        // console.log("Refreshing AdSense console");
        location.reload();
    }
}, false);
