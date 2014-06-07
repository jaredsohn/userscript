// ==UserScript==
// @name           MU link wait bypass
// @namespace      By Kalphak
// @description    Based on LL42cd4
// @include        http://*endoftheinter.net/*
// @include        https://*endoftheinter.net/*
// ==/UserScript==

var link = document.getElementsByTagName('a');
for (i=0;i<link.length;i++){
  if(link[i].href.match('http://www.megaupload.com/?d=') != 'null')
  {
     link[i].href = link[i].href.replace('http://www.megaupload.com/?d=', 'http://www.megaupload.com/mgr_dl.php?d=');
  }
}