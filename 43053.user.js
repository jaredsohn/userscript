// Lent Filter
// version 0.1
// Will West (Based off the excellent Invisibility Cloak by Gina Trapani)
// 2009-02-24
// Released to the public domain.
//
// ==UserScript==
// @name           Lent Filter
// @description    Blocks certain web pages during Lent (except on Sundays of course).
// @include        http://digg.com/*
// @include        http://www.reddit.com/*
// @include        http://www.fark.com/*
// @include        http://*.4chan.org/*
// @include        http://www.facebook.com/*
// @include        http://www.myspace.com/*
// @include        http://*.myspace.com/*
// @include        http://www.deviantart.com/*
// @include        http://boingboing.net/*
// @include        http://www.youtube.com/*
// ==/UserScript==

(function () {

	var d = new Date();
	var dMonth = d.getMonth()+1
	var dDate = d.getDate()

	if ((d.getDay() != 0) && (((dMonth == 2) && (dDate >= 25)) || (dMonth == 3) || ((dMonth == 4) && (dDate <= 11))))
	{
		var b = (document.getElementsByTagName("body")[0]);
		b.setAttribute('style', 'display:none!important');
		alert("Lent Filter activated! Either wait for a Sunday or for Easter.");
	}


})();