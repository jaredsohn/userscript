// ==UserScript==
// @name          Jared Leto Sitting on Your Tumblr Dashboard
// @description   See Jared leto Sitting on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @version       1
// ==/UserScript==

var jared = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place jared away from content edge
var jaredSeat = userWidth + 250;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define jared as an HTML element and give the HTML code
jared.innerHTML = '<div style="position:absolute; left:' + jaredSeat + 
    'px; z-index:1; top:10px;">'  +
    '<map id="videomap" name="videomap">' +
    '<area shape="rect" alt="Post a quote" title="" coords="1,89,45,178" href="http://www.tumblr.com/new/quote" target="_self" />' +
    '<img src="http://i52.tinypic.com/30rra8i.jpg" usemap=videomap />' +
    '</div></a>';

//insert jared before the first element in the body of the page
document.body.insertBefore(jared, document.body.firstChild);