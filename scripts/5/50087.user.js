// Copyright (C) 2009 Carsten Porth <info@studivz-designs.de>
// ==UserScript==
// @name           Youtubevideo
// @namespace      http://www.studiv-designs..de/
// @description    Fuegt auf der Startseite ein zufaelliges Youtubevideo ein
// @include        http://*schuelervz.net/Start*
// @include        http://*studivz.net/Start*
// @include        http://*meinvz.net/Start*
// @version        1.1
// @require			http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$("#Visitors").before('<div id="youtube"><h2>Youtubevideo</h2><div id="video"></div></div>');
GM_xmlhttpRequest({
  method: "GET",
  url: "http://studivz-designs.de/tool/youtube.php",
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/xml"
  },
  onload: function(response) {
	$("#video").html(response.responseText);
}
});
GM_addStyle("#youtube h2 {width:440px;} #video {margin:0 0 20px 15px;}");