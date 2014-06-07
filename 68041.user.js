// ==UserScript==
// @name           Defeat SonicWALL (Anonymouse)
// @include        http://*
// ==/UserScript==
var href = document.location.href
if (document.title == 'SonicWALL - Web Site Blocked') {
  document.location.href="http://anonymouse.org/cgi-bin/anon-www.cgi/"+href;
}