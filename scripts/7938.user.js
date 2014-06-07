// ==UserScript==
// @name           Yahoo Fantasy Sports focus player search box
// @description    Places the focus on the player search box in Yahoo Fantasy Sports
// @include        http://*.fantasysports.yahoo.com/*/players*
// ==/UserScript==

// startpoint of this script
var labels;
var i;

labels = document.getElementsByTagName('label');

// Find the label for the search box and add the access key.
for ( i=0; i < labels.length; i++ ) {
    if( labels[i].getAttribute('for') == 'playersearchtext' ) {
        labels[i].setAttribute("accessKey", "s");
    }
}

// Uncomment to always focus the search box (and comment the lines above)
//var userName;
//if ( userName = document.getElementById('playersearchtext') ) {
//	userName.focus();
//}
