// ==UserScript==
// @name           flickr all sizes link
// @version        0.4 (13-Jun-2012)
// @author	       Hannes Trapp - www.hannestrapp.de
// @namespace      http://www.hannestrapp.de
// @description    Adds a "All Sizes"-Link to every photo page
// @include        http://www.flickr.com/photos/*/*
// @include        http://www.flickr.com/photos/*/*/
// @include        http://www.flickr.com/photos/*/*/*
// @include        http://www.flickr.com/photos/*/*/*/
// @include        http://www.flickr.com/photos/*/*/*/*
// @include        http://www.flickr.com/photos/*/*/*/*/
// @include        http://www.flickr.com/photos/*/*/*/*/*
// @include        http://www.flickr.com/photos/*/*/*/*/*/
// @include        http://www.flickr.com/photos/*/*/*/*/*/*
// @include        http://flickr.com/photos/*/*
// @include        http://flickr.com/photos/*/*/
// @include        http://flickr.com/photos/*/*/*
// @include        http://flickr.com/photos/*/*/*/
// @include        http://flickr.com/photos/*/*/*/*
// @include        http://flickr.com/photos/*/*/*/*/
// @include        http://flickr.com/photos/*/*/*/*/*
// @include        http://flickr.com/photos/*/*/*/*/*/
// @include        http://flickr.com/photos/*/*/*/*/*/*
// @include        https://secure.flickr.com/photos/*/*
// @include        https://secure.flickr.com/photos/*/*/
// @include        https://secure.flickr.com/photos/*/*/*
// @include        https://secure.flickr.com/photos/*/*/*/
// @include        https://secure.flickr.com/photos/*/*/*/*
// @include        https://secure.flickr.com/photos/*/*/*/*/
// @include        https://secure.flickr.com/photos/*/*/*/*/*
// @include        https://secure.flickr.com/photos/*/*/*/*/*/
// @include        https://secure.flickr.com/photos/*/*/*/*/*/*


// ==/UserScript==


var AlleParagraphen = document.getElementsByTagName("p");

for (var i = 0; i < AlleParagraphen.length; i++)
	if (AlleParagraphen[i].id == 'photo-story-story')
		var DerParagraph = AlleParagraphen[i];

// var LinkMitText = 'Show <a href="' + window.location.href + 'sizes/">All Sizes</a>';

var VollLink = window.location.href ;
var KurzLink = '';
var SlashZahl = 0;

for (var i = 0; i < VollLink.length; i++)
	{
	if (SlashZahl < 6)
		KurzLink += VollLink.charAt(i);
	if (VollLink.charAt(i) == '/') 
		SlashZahl += 1;
	}

var LinkMitText = 'Show <a href="' + KurzLink + 'sizes/">All Sizes</a>';
DerParagraph.innerHTML += LinkMitText;