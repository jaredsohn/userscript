// ==UserScript==
// @name           Hentai Foundry higher pages Real image links
// @namespace      www.
// @description    Changes Hentai Foundry gallery HTML links to direct image links re-edit by bubbadamaged
// @include     http://www.hentai-foundry.com/user_pictures-*
// ==/UserScript==

var longuser = location.pathname.match(/user_pictures-([a-zA-Z0-9]+).page-([a-zA-Z0-9]+)/);
var user = longuser[1];
var firstletter = user.charAt(0);
firstletter = firstletter.toLowerCase();
for ( var j=0; firstletter>j; firstletter--){}

  for (var i=0; i<document.links.length; i++) {
    link = document.links[i];
	   if (document.links[i].pathname.indexOf("pic-") > -1) {
	     var number = document.links[i].pathname.match(/\d+/);
	     document.links[i].pathname = "piccies/" + firstletter + "/" + user + "/" + number + ".jpg";
    }
  }