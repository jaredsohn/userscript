// ==UserScript==
// @name       Google calendar refresh
// @namespace  http://ostermiller.org/
// @version    1.0
// @description  Refresh Google calendar when you click on it after it has been open since yesterday
// @match      https://www.google.com/calendar/render
// @copyright  2014, Stephen Ostermiller
// ==/UserScript==
var loaddate = new Date().toISOString().replace(/T.*/,"");
//console.log("Loaded: " + loaddate);
window.addEventListener("focus", function(event) { 
    var nowdate = new Date().toISOString().replace(/T.*/,"");
    //console.log("Google calendar has focus -- Loaded: " + loaddate + " Now: " + nowdate);
    if (loadDate != nowdate) {
        //console.log("Refreshing Google calendar");
        location.reload();
    }
}, false);

