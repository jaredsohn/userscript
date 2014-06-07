// ==UserScript==
// @name           Apigee for SimpleGeo
// @namespace      http://apigee.com
// @description    Enabling the Apigee API Test Console for SimpleGeo
// @include        http://simplegeo.com/docs/*
// ==/UserScript==


var script=document.createElement('script');
script.setAttribute("type","text/javascript");
script.setAttribute("src", "http://apigee.com/javascripts/anywhere.js");

document.body.appendChild(script);

script.addEventListener('load', function(){
	unsafeWindow.ApigeeEverywhere.console("api.simplegeo.com");
}, false);