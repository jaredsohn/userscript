// ==UserScript==
// @name          Luhan Sitting on Your Tumblr Dashboard
// @description   See Luhan Sitting on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @version       1
// ==/UserScript==

var luhan = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place luhan away from content edge
var luhanSeat = userWidth + -85;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define luhan as an HTML element and give the HTML code
luhan.innerHTML = '<div style="position:absolute; left:' + luhanSeat + 
    'px; z-index:1; top:50px;">'  +
    '<map id="videomap" name="videomap">' +
    '<area shape="rect" alt="Post a quote" title="" coords="1,89,45,178" href="http://www.tumblr.com/new/quote" target="_self" />' +
    '<img src="https://31.media.tumblr.com/6df5831847f7b60cf5e2229065130ee6/tumblr_inline_n4bhpeVT9y1qc8r65.png" usemap=videomap />' +
    '</div></a>';

//insert luhan before the first element in the body of the page
document.body.insertBefore(luhan, document.body.firstChild);