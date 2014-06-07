// ==UserScript==
// @name        For URB
// @namespace   URB
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://urbtix_msg.cityline.com.hk/serverBusy.html
// @include     http://ticket.urbtix.hk/internet/
// @include     http://msg.urbtix.hk/
// @grant       none
// @version     1
// ==/UserScript==

$(document).ready(function() {

var pathname = window.location.pathname;
if(pathname == "/")
	
window.location = "http://www.urbtix.hk/internet/zh_TW"

});