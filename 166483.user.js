// ==UserScript==
// @name      	 Google Analytics Realtime Show Visitor Count in Title and Tab
// @namespace  	 http://pixagonal.com
// @version   	 1.0
// @description  Changes title tab value when you get a new user
// @match	     https://www.google.com/analytics/web/?hl=en#realtime*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

 

setInterval(getActiveUsers, 1);
 
function getActiveUsers(){
    var count = document.getElementById("ID-overviewCounterValue").innerHTML;
    //change title
    document.title = count+" visitors";
}