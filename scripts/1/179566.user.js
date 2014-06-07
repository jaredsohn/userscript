// ==UserScript==
// @name        ClickGoldenCookie	
// @author      JH
// @namespace   *
// @description Clicks the golden cookie automatically.
// @include     http://orteil.dashnet.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var golden_active = true;

function ClickGoldenCookie(){
	if(golden_active){
		$("#goldenCookie").click();
	}
}

setInterval(ClickGoldenCookie,500);