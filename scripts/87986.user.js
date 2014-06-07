// ==UserScript==
// @name           	Bread Crumbs Repositioner
// @namespace           Bread Crumbs Repositioner
// @description    	Repositions the bread crumbs to the bottom of the page
// @include       	http://board.*.ikariam.*/*
// @exclude        	http://s*.ikariam.*/*
// ==/UserScript==
	var lversion = "0.0.0";
	var updatesite = "";

var e = document.body.childNode[0].innerHTML ;

function createSpan(idofspan)
{
	var spanTag = document.createElement("span");
	spanTag.id = idofspan;
	spanTag.className ="dynamicSpan";
	document.body.appendChild(spanTag);
}

window.addEventListener('load',  function() 
{
try
{ 
	createSpan("breadCrumbs") ;
}
catch(er)
{
   var debug_mode = GM_getValue('debug_mode','0');
				
				}
}