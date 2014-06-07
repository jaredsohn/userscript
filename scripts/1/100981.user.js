// ==UserScript==
// @name          Frank Iero Riding Your Tumblr Dashboard
// @description   See Frank Iero riding on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @version       1
// ==/UserScript==

var frank = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place frank away from content edge
var frankSeat = userWidth + 580;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define frank as an HTML element and give the HTML code
frank.innerHTML = '<div style="position:absolute; left:' + frankSeat + 
    'px; z-index:1; top:10px;">'  +
    '<map id="videomap" name="videomap">' +
    '<area shape="rect" alt="Post a video" title="" coords="1,89,65,178" href="http://www.tumblr.com/new/video" target="_self" />' +
    '<img src="http://30.media.tumblr.com/tumblr_ljhy5hmYxg1qfswqxo1_r6_100.png" usemap=videomap />' +
    '</div></a>';

//insert Frank before the first element in the body of the page
document.body.insertBefore(frank, document.body.firstChild);