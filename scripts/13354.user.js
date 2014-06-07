// ==UserScript==
// @name          Better Youtube embed code
// @description   Removes object, param, and all that crap and leaves just the embed src code. Also autostarts video.
// @namespace     donteatsoap7 - http://myspace.com/58798308
// @include       http://youtube.com/watch*
// ==/UserScript==


var pageTitle = document.title;
var videoTitle = pageTitle.replace('YouTube - ', '')
var id = location.href.match(/[\?&]v=(.*?)(?:&|$)/)[1];
var embedCode = '<br><center><embed src="http://www.youtube.com/v/'+id+'&autoplay=1" type="application/x-shockwave-flash" width="425" height="350"></embed></center><br>';
document.getElementsByName('embed_code')[0].value = embedCode;