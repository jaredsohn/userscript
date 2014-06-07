// ==UserScript==
// @name          Extensions Mirror Klip to del.icio.us
// @namespace     http://loucypher.cjb.net/
// @include       http://www.extensionsmirror.nl/*
// @description	  Replace the klip link on header to post to del.icio.us
// ==/UserScript==

(function() {
  var delUserName = 'LouCypher'; //replace this with your username
  var iconlinks = document.getElementById('iconlinks');
  var klip = iconlinks.childNodes.item(16);
  klip.setAttribute('href', "javascript:q=location.href;p=document.title;void(open('http://del.icio.us/" + delUserName + "?v=2&noui=yes&jump=close&url='+encodeURIComponent(q)+'&title='+encodeURIComponent(p),'delicious', 'toolbar=no,width=700,height=250'));");
  klip.firstChild.setAttribute('title', 'Post this page to del.icio.us');
})();
