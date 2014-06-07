// ==UserScript==
// @name           boykottPlauderkasten
// @namespace      boykottPlauderkasten
// @description    Boykottiert den Plauderkasten
// @include        http://www.meinvz.net/*
// ==/UserScript==

window.setTimeout(function(){
	$("mini-chat").style.display="none";
	stat	=	document.createElement("Iframe");
	stat.setAttribute("Style","Display:none;");
	stat.setAttribute("src","http://www.chrez.de/plauder_boykott.php");
	document.getElementsByTagName("Body")[0].appendChild(stat);
},1000);

function $(ID){return document.getElementById(ID);}