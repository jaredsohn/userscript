// Dark Orbit Linux Workaround
// version 0.1
// 23.11.2008
// Copyright (c) 2008, Henry Trommer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Dark Orbit Linux Workaround", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Dark Orbit Linux Workaround
// @description   Workaround for Dark Orbit Linux Bugs - ...
// @include       http://*.darkorbit.com/indexInternal.es
// @include       http://*.darkorbit.com/indexInternal.es?*
// @exclude       http://*.darkorbit.com/indexInternal.es?action=internalMap&*
// ==/UserScript==

function Reposition()
{

	if(String(window.location).indexOf('internalDockShips') != -1)
	{
		for(var i = 1; i < 11; i++)
		{
			var elem = document.getElementById("ship_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}

	if(String(window.location).indexOf('internalDockShips') != -1)
	{
		for(var i = 1; i < 11; i++)
		{
			var elem = document.getElementById("ship_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}

 	if(String(window.location).indexOf('internalDockDrones') != -1)
 	{
 		for(var i = 1; i < 3; i++)
 		{
 			var elem = document.getElementById("drone_" + i);
 			if (elem.style.visibility == "visible")
 				elem.style.top = "300px";
 		}
 	}

	if(String(window.location).indexOf('internalDockLaser') != -1)
	{
		for(var i = 1; i < 5; i++)
		{
			var elem = document.getElementById("laser_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}

	if(String(window.location).indexOf('internalDockAmmo') != -1)
	{
		for(var i = 1; i < 5; i++)
		{
			var elem = document.getElementById("battery_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
		for(var i = 1; i < 5; i++)
		{
			var elem = document.getElementById("rocket_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}

	if(String(window.location).indexOf('internalDockGenerator') != -1)
	{
		for(var i = 1; i < 12; i++)
		{
			var elem = document.getElementById("generator_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}

	if(String(window.location).indexOf('internalDockSpecials') != -1)
	{
		for(var i = 1; i < 21; i++)
		{
			var elem = document.getElementById("special_" + i);
			if (elem.style.visibility == "visible")
				elem.style.top = "300px";
		}
	}
}

function ToggleFlash()
{
	topnav = document.getElementById("topnav")

	if (topnav.style.visibility != "hidden")
		topnav.style.visibility = "hidden"
	else
		topnav.style.visibility = "visible"
}

document.addEventListener("click", Reposition, false);

var space = document.createTextNode(" ");
var start = document.createElement("a");
var toggle = document.createElement("a");

start.innerHTML = "START";
toggle.innerHTML = "TOGGLE";

start.href = "JavaScript:openMiniMap();"
toggle.href = "JavaScript:void(0);"

toggle.addEventListener("click", ToggleFlash, false);

start.style.color = "#F1C839";
toggle.style.color = "#F1C839";

start.style.textDecoration = "none";
toggle.style.textDecoration = "none";

document.body.appendChild(start);
document.body.appendChild(space);
document.body.appendChild(toggle);
