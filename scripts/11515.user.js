// ==UserScript==
// @name           Auto Play Tagger
// @namespace      http://del.icio.us/playtagger
// @description    Apply the del.icio.us Play Tagger to every link.
// @include        http://*
// ==/UserScript==//

var t = setTimeout(function() {
  window.location.href = 'javascript:(function(){var o=document.createElement("script");o.type="text/javascript";o.src="http://images.del.icio.us/static/js/playtagger.js";o.onload=function(){Delicious.Mp3.go()};document.body.appendChild(o)})()';
}, 500)
