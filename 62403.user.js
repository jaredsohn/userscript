// ==UserScript==
// @name		Jetpack Gallery View Source Link
// @author		Erik Vergobbi Vold
// @datecreated	2009-11-19
// @lastupdated	2010-05-16
// @namespace	jetpackGalleryViewSourceLink
// @updateURL   http://userscripts.org/scripts/source/62403.user.js
// @include		http://jetpackgallery.mozillalabs.com/jetpacks/*
// @version		0.1.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	You now see the 'View Source' link whether or not you are logged in, and it goes to view-source:%javascript-url%
// ==/UserScript==

(function(){
	var src=window.location.href.match(/\/jetpacks\/(\d+)/);
	if(!src) return;
	src="view-source:http://jetpackgallery.mozillalabs.com/js/jetpacks/0/" + src[1] + ".js";

	var actions=document.getElementById("actions");

	var forDev=document.evaluate(".//ul[contains(@class,'for-developers')]",actions,null,9,null).singleNodeValue;
	if (forDev) {
		var link = document.evaluate(".//li[contains(@class,'view-source-code')]/a",forDev,null,9,null).singleNodeValue;
		if (link) return link.href = src;
	}

	var ul = document.createElement("ul");
	ul.className="for-developers";
	var h4=document.createElement("h4");
	h4.innerHTML="For Developers";
	ul.appendChild(h4);
	var li=document.createElement("li");
	li.className="view-source-code";
	ul.appendChild(li);
	var a=document.createElement("a");
	a.href=src;
	a.innerHTML="View Source Code";
	li.appendChild(a);

	actions.appendChild(ul);
})();