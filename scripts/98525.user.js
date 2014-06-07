// ==UserScript==
// @name           Google Translate Helper
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Adds Tooltips to Images so you can view their translated description / alt-text easily
// @include        http://translate.google.*
// @include        https://translate.google.*
// @include        http://translate.googleusercontent.*
// @include        https://translate.googleusercontent.*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var images = document.getElementsByTagName('img');

for (var i=0; i<images.length; i++) {
  var newTitle = images[i].getAttribute("title") ? 
                 images[i].getAttribute("title") + " | " + images[i].getAttribute("alt") : 
				 images[i].getAttribute("alt");
  images[i].setAttribute("title", newTitle);
}