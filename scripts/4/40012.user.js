// ==UserScript==
// @name             OSM Banner Remover
// @author           Anoesj Sadraee
// @date             November 6, 2008
// @namespace        Nothing important
// @include          http://*.onlinesoccermanager.*/*
// @exclude          
// ==/UserScript==

(function()
{
if(window.location.href=="http://onlinesoccermanager.*/lineup.asp" || window.location.href=="http://*.onlinesoccermanager.*/lineup.asp"){
	var imgTag = document.getElementById("ADTABLE");
	imgTag.innerHTML="<br><br>"
	}

else{	var imgTag = document.getElementById("ADTABLE");
	imgTag.parentNode.removeChild(imgTag)
	}

	var imgTag = document.getElementById("divSideBar");
	imgTag.parentNode.removeChild(imgTag)

	var imgTag = document.getElementById("divAds");
	imgTag.parentNode.removeChild(imgTag)

}) ();