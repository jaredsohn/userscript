// ==UserScript==
// @name           flickr All Sizes Unblocker
// @namespace      http://www.hannestrapp.de
// @description    removes the invisible image blocking images on 2010 flickr all sizes page.
// @version        0.2 (Jul-13-2012)
// @author	       Hannes Trapp - www.hannestrapp.de
// @include        http://www.flickr.com/photos/*/*/sizes
// @include        http://www.flickr.com/photos/*/*/sizes/*
// @include        https://secure.flickr.com/photos/*/*/sizes
// @include        https://secure.flickr.com/photos/*/*/sizes/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");

for (var i = 0; i < divs.length; i++)
	if (divs[i].className == 'spaceball')
		var photodiv = divs[i];

photodiv.style.width = '0';
photodiv.style.height = '0';
photodiv.className = 'spacecall';  //this line is for fun only
