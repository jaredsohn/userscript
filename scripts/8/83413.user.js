// ==UserScript==
// @name           Apigee for Twitter
// @namespace      http://apigee.com
// @description    Makes all example calls testable in the Apigee Test Console
// @include        http://dev.twitter.com/
// @include        http://groups.google.com/group/twitter-development-talk/
// ==/UserScript==

var script=document.createElement('script');
script.setAttribute("type","text/javascript");
script.setAttribute("src", "http://apigee.com/javascripts/anywhere.js");

document.body.appendChild(script);

script.addEventListener('load', function(){
	unsafeWindow.ApigeeEverywhere.console("api.twitter.com");
}, false);