// ==UserScript==
// @name StillWorkingOnIT
// @namespace http://jcs.org/
// @description WorkingOut
// @include http://www.swoopo.co.uk/auction/*
// ==/UserScript==


var wrapper = document.createElement("div");
wrapper.style.position = "absolute";
wrapper.style.backgroundColor = "skyblue";
wrapper.style.top = 0;
wrapper.style.right = 0;
wrapper.style.width = "400px";
wrapper.style.border = "1px solid red";
wrapper.style.padding = "3px";
wrapper.style.fontSize = "9pt";
document.body.appendChild(wrapper);

var do_log = document.createElement("input");
do_log.type = "checkbox";
do_log.id = "do_log";
do_log.checked = true;
wrapper.appendChild(do_log);
 
/* add a toggle whether to place bids */
var do_bid = document.createElement("input");
do_bid.type = "checkbox";
do_bid.id = "do_bid";
do_bid.style.marginLeft = "300px";
do_bid.style.backgroundColor = "red";
wrapper.appendChild(do_bid);

var l = document.createElement("div");
l.id = "logger";
l.style.height = "130px";
l.style.overflowY = "auto";
wrapper.appendChild(l);
 
/* find the function that the bid button calls */
var bidfunc;
as = document.getElementsByTagName("a");
for (x = 0; x < as.length; x++)
if (as[x].href.match(/javascript:place_bid/))
bidfunc = unescape(as[x].href.replace(/^javascript:/, ""));
 
var auction_id;
var broked = false;
if (bidfunc) {
m = bidfunc.match(/^place_bid\('(\d+)'/);
auction_id = m[1];
alert("AUCTION ID : "+auction_id);
}
else 
{
alert("AUCTION ID NOT FOUND");
broked = true;
do_log.disabled = true;
}






