// ==UserScript==
// @name         War of Ninja - In-Game Leaving Confirmation
// @namespace    for WarofNinja.com
// @version		 1.0
// @include  	 http://s1.warofninja.com
// @include  	 s1.warofninja.com
// @include 	 http://s1.warofninja.com/*
// @include 	 s1.warofninja.com/*
// @author       Sand_Spirit
// @description  Requests the user confirm to close the in-game window.
// @history		 1.0 - First release.
// ==/UserScript==

// Adds jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// Cookie Read/Write Plugin

var plugin = document.createElement('script');
plugin.src = 'http://sandspirit.netii.net/warofninja/userscripts/CookieReadWrite.js';
plugin.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(plugin);

function setTitle(title) {
document.title = title;
}
window.onbeforeunload = confirmExit;
function confirmExit()
{
return "You are leaving War of Ninja!";
}

// Defines window vars
var useragent = navigator.userAgent;
var pageurl = window.location;
var pagetitle = document.title;