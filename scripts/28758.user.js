// ==UserScript==
// @name          Embedded YouTube
// @author        Jan Gruncl
// @namespace     http://userscripts.org/scripts/show/28758
// @description	  Turns YouTube address into embedded player
// @include *
// @exclude http://*google*search*
// @exclude http://*youtube.com*
// ==/UserScript==

// inspiration: http://krajta.com/?p=71156#71156
// inspiration: 

var re = new RegExp(
  '(?:(?:<a.*?href\s*=\s*")?(?:http://)?(?:www\.)?(?:uk\.)?youtube.com/watch(?:\.php)?[?]v=([0-9a-z-_]+)(?:.*?</a>?))'
  +
  '|'
  +
  '(?:(?:http://)?(?:www\.)?(?:uk\.)?youtube.com/watch(?:\.php)?[?]v=([0-9A-Za-z-_]+)[\s^0-9a-z-_]?)'
, 'igm');

var bodyElement = document.getElementsByTagName('body')[0];
bodyElement.innerHTML = bodyElement.innerHTML.replace(re, '<div class="embeddedPlayer"><object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/$1$2"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/$1$2" type="application/x-shockwave-flash" width="425" height="350"></embed></object></div>');