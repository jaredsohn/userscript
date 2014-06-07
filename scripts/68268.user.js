// ==UserScript==
// @name           YouTube Automatic fmt=22 Adder
// @namespace      http://userscripts.org/users/23652
// @description    Adds &fmt=22 to the url for high quality but not if any &fmt=x already exist and adds &fmt=18 to all the links
// @include        http://*.youtube.com/*
// @copyright      JoeSimmons - modified by lolwuut
// ==/UserScript==

function makeHQ() {
var lhr = location.href;
if(/^https?:\/\/(\w+\.)?youtube\.com\/watch\?.*v=/.test(lhr)) {
  if(!/(\&|\?)fmt=(18|17|16|34|35|22)/.test(lhr)) {
    if(/((\&|\?)fmt=$)|((\&|\?)fmt=\&)|((\&|\?)fmt=\d+)/.test(lhr)) {
      location.replace(location.replace(/(\&|\?)fmt=(\d+)?/g, '&fmt=22'));
    }
    else if(!/(\&|\?)fmt=\d+/.test(lhr)) {
      location.replace(location+='&fmt=22');
    }
   }
  }
}

function makeLinks() {
  var i, ytlinks, l;
  ytlinks = document.evaluate("//a[contains(@href, 'watch?v=')]", document, null, 6, null);
  for(i=0; i<ytlinks.snapshotLength; i++) {
    l = ytlinks.snapshotItem(i);
    if(l.href.indexOf("&fmt=")==-1) {l.href+="&fmt=22";}
    else {l.href=l.href.replace(/(\&|\?)fmt=\d+/,"&fmt=22");}
  }
}

setTimeout(makeHQ, 0);
window.addEventListener('load', makeLinks, false);