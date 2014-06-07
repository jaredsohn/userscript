// ==UserScript==
// @name           Politopia No Thanks
// @namespace      KarlSRuher
// @description    Removes the Thank's area below each post
// @include        http://www.politopia.de/*
// @match 		   http://*.politopia.de/*
// ==/UserScript==


// remove Thanks
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
{
   if (divs[i].id.indexOf("post_thanks_box_") === 0) // 
      divs[i].style.display = "none";
}