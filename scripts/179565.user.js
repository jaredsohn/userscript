// ==UserScript==
// @name        ClickBigCookie
// @author      JH
// @namespace   *
// @description Clicks the big cookie automatically.
// @include     http://orteil.dashnet.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var big_active = true;

function ClickBigCookie(){
	if(big_active){
		$("#bigCookie").click();
	}
}

setInterval(ClickBigCookie,4);