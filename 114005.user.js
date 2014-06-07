// ==UserScript==
// @name           Downarchive
// @namespace      downarchive
// @include        http://*.downarchive.com/*
// @require        http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==

shortcut.add("left", navigate("left"));
shortcut.add("right", navigate("right"));

function navigate(direction)
{
    return (function(){
		  var location = document.getElementById(direction).querySelector("a");
		  if(location != null)
			document.location = location;
		  else 
		    alert("No Further pages");
	})
}