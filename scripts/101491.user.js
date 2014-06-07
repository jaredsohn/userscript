// ==UserScript==
// @name          Shannon Leto Chillin on Your Tumblr Dashboard
// @description   See Shannon Leto Chillin on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @version       1
// ==/UserScript==

var shannon = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place shannon away from content edge
var shannonSeat = userWidth + 400;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define shannon as an HTML element and give the HTML code
shannon.innerHTML = '<div style="position:absolute; left:' + shannonSeat + 
    'px; z-index:1; top:10px;">'  +
    '<map id="videomap" name="videomap">' +
    '<area shape="rect" alt="Post a chat" title="" coords="1,89,65,178" href="http://www.tumblr.com/new/chat" target="_self" />' +
    '<img src="http://i53.tinypic.com/2nq741z.png" usemap=videomap />' +
    '</div></a>';

//insert Shannon before the first element in the body of the page
document.body.insertBefore(shannon, document.body.firstChild);