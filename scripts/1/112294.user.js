// ==UserScript==
// @name	Hentai Foundry Downloader
// @namespace	http://vinnietesla.com/amusements
// @description	Changes Hentai Foundry gallery HTML links to direct image links
// @include	http://www.hentai-foundry.com/user-*
// ==/UserScript==

var longuser = location.pathname.match(/user-([-a-zA-Z0-9]+)/);
var user = longuser[1];
var firstletter = user.charAt(0);
firstletter = firstletter.toLowerCase();

  for (var i=0; i<document.links.length; i++) {
    link = document.links[i];
	   if (document.links[i].pathname.indexOf("pic-") > -1) {
	     var number = document.links[i].pathname.match(/\d+/);
	     document.links[i].pathname = firstletter + "/" + user + "/" + number + ".jpg";
	     document.links[i].host = "pictures.hentai-foundry.com";
    }
  }

