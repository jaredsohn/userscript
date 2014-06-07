// ==UserScript==
// @name	TOD Clock
// @namespace	http://www.MegaCoder.com
// @description Show timestamp in lower right corner.
// @include http://*
// @include https://*
// @include file://*
// @include ftp://*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

if( top.location != location ) return;

Number.prototype.pad = function(size)	{
	if( typeof(size) !== "number" )   {
		size = 2;
	}
	var	s = String(this);
	while (s.length < size)   {
		s = "0" + s;
	}
	return s;
}

var tod = document.createElement("div");
tod.id = "todClock";

tod.setAttribute(
	"style",

	"bottom:2px;"			+
	"color:#ba3d00;"		+
	"font-family:droid sans mono;"	+
	"font-size:11pt;"		+
	"line-height:20px;"		+
	"position:fixed;"		+
	"right:4px;"			+
	"text-align:center;"		+
	"z-index:9999;"			+
	"-moz-user-select:none;"

);

var clicker = document.createAttribute( "onClick" );
clicker.nodeValue = "document.getElementById('todClock').style.display = 'none';";
tod.setAttributeNode(clicker)

function tick() {
	var	d = new Date();
	var Y = d.getFullYear();
	var M = (d.getMonth()+1).pad();
	var D = d.getDate().pad();
	var h = d.getHours().pad();
	var m = d.getMinutes().pad();
	var s = d.getSeconds().pad();
	tod.innerHTML = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

tick();
setInterval(tick, 500);

$('html body').append(tod);

// vim: noet sw=4 ts=4
