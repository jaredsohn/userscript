// ==UserScript==
// @name		FTO Travelers
// @namespace		http://userscripts.org/tags/faerytaleonline
// @include		*faerytaleonline.com/main.php
// @version		1.0
// @description		FTO tweak that blinks arrow icons of travel "menu" if there is someone traveling that way.
// @icon		http://faerytaleonline.com/favicon.ico
// ==/UserScript==

function blink(what)
{
	window.setInterval(function()
		{
			if (what.style.opacity == "0") 
				what.style.opacity = "1.0";
			else
				what.style.opacity = "0";
		},1000);
}

function traveler(where)
{
	for(var i=0;i<where.childNodes.length;i++)
		if(where.childNodes[i].nodeName=="#text" && where.childNodes[i].nodeValue.indexOf("traveling") != -1)
			return true;
	return false;
}

var	n=document.getElementById("north_pop").firstChild,
	s=document.getElementById("south_pop").firstChild,
	w=document.getElementById("west_pop").firstChild,
	e=document.getElementById("east_pop").firstChild,
	nw=document.getElementById("northwest_pop").firstChild,
	ne=document.getElementById("northeast_pop").firstChild,
	sw=document.getElementById("southwest_pop").firstChild,
	se=document.getElementById("southeast_pop").firstChild;
var travel;


for(var i=0;i<document.forms.length;i++)
	if(document.forms[i].name == "travelfrm")
		travel=document.forms[i].parentNode.getElementsByTagName("TR")[5].cells[1].childNodes[7].lastChild;

if(traveler(n))
	blink(travel.childNodes[0].childNodes[1]);
if(traveler(s))
	blink(travel.childNodes[4].childNodes[1]);
if(traveler(w))
	blink(travel.childNodes[2].childNodes[0]);
if(traveler(e))
	blink(travel.childNodes[2].childNodes[2]);
if(traveler(nw))
	blink(travel.childNodes[0].childNodes[0]);
if(traveler(ne))
	blink(travel.childNodes[0].childNodes[2]);
if(traveler(sw))
	blink(travel.childNodes[4].childNodes[0]);
if(traveler(se))
	blink(travel.childNodes[4].childNodes[2]);

