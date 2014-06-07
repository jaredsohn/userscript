// ==UserScript==
// @name           YoutubeRedirect
// @namespace      http://youtube.com/
// @include        http://youtube.com/watch?v=*
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==
var url = window.location.href;
var vId = url.substring(url.indexOf("=")+1,url.length);
window.location.href = "http://youtubecn.com/watch?v="+vId;