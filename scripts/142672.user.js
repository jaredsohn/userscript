// ==UserScript==
// @name	  Asanusta Facebook Image Linker
// @namespace	  https://www.facebook.com/asanustan
// @description	  Links all unlinked profile images to their larger size auto asanusta
// @include	  http://*.thefacebook.com/*
// @include	  http://*.facebook.com/*
// ==/UserScript==
// Written by asanusta
// Direct all Questions/Comments/Bugs/Appreciation to // ==UserScript==
// @name	  Facebook Image Linker
// @namespace	  http://www.andrew.cmu.edu/user/bpilnick/greasemonkey/
// @description	  Links all unlinked profile images to their larger size
// @include	  http://*.thefacebook.com/*
// @include	  http://*.facebook.com/*
// ==/UserScript==
// Written by Brian Pilnick
// Direct all Questions/Comments/Bugs/Appreciation to https://www.facebook.com/asanustan

(function () {
	var newElement, allImages;
	allImages = document.getElementsByTagName('td');
	for (var i = 0; i < allImages.length; i++) {
		if(allImages[i].className == 'image')
		{
			if(allImages[i].firstChild.localName == 'IMG')
			{
				newElement = document.createElement('a');
				newElement.setAttribute("href", allImages[i].firstChild.src.replace('/s', '/n').replace('/t', '/n'));
				newElement.innerHTML="<img src='"+allImages[i].firstChild.src+"' border=0>";
				allImages[i].replaceChild(newElement, allImages[i].firstChild);
			}
		}
	}

})();

(function () {
	var newElement, allImages;
	allImages = document.getElementsByTagName('td');
	for (var i = 0; i < allImages.length; i++) {
		if(allImages[i].className == 'image')
		{
			if(allImages[i].firstChild.localName == 'IMG')
			{
				newElement = document.createElement('a');
				newElement.setAttribute("href", allImages[i].firstChild.src.replace('/s', '/n').replace('/t', '/n'));
				newElement.innerHTML="<img src='"+allImages[i].firstChild.src+"' border=0>";
				allImages[i].replaceChild(newElement, allImages[i].firstChild);
			}
		}
	}

})();