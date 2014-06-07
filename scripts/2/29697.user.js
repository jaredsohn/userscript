// ==UserScript==
// @name          DZone link redirector
// @description	  Automatically redirects the browser to the article itself when browsing DZone, skipping the annoying summary/comments preview page.
// @namespace      http://isnotworking.com/
// @include       http://dzone.com*
// @include       http://www.dzone.com*

// ==/UserScript==
// Copyright (c) 2008, Ricardo Niederberger Cabral (ricardo at isnotworking.com)
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php

function getElementsByStyleClass (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

function getVars () {	
	location.href = getElementsByStyleClass('ldTitle')[0].firstChild.href;
}

addEventListener('load',getVars,false);