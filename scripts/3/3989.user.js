// ==UserScript==
// @name          detik.com - No frames and redirect links
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.detik.com/*
// @include       http://*.detik.com/*
// @include       http://*.detiknews.com/*
// @description	  Skip frames and removes redirect links
// ==/UserScript==

var frameset = document.getElementsByTagName('frameset')[0];
if(frameset) {
  bottomFrame = document.getElementsByTagName('frame')[1];
  document.location.href = bottomFrame.src;
}

var redir = 'http://www.detiknews.com/indexfr.php?url=';
var XPath = '//a[starts-with(@href, "' + redir + '")]'

var redirLinks = document.evaluate(XPath, document, null, 6, null);
if(!redirLinks.snapshotLength) return;

for(var i = 0; i < redirLinks.snapshotLength; i++) {
  redirLinks.snapshotItem(i).href = redirLinks.snapshotItem(i).href.replace(redir, '');
}

