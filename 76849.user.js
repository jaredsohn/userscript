// ==UserScript==
// @name          Link Unanonymizer
// @namespace     Gerard Pechangco
// @description   Removes bullshit from links.
// @include       http://*
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  switch(0) {
    case linkx.href.indexOf("http://anonym.to/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 18));break;

    case linkx.href.indexOf("http://www.anonym.to/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://linkblur.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 21));break;

    case linkx.href.indexOf("http://www.linkblur.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 25));break;

    case linkx.href.indexOf("http://www.phphantom.com/anonymize.php?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 39));break;

    case linkx.href.indexOf("http://phphantom.com/anonymize.php?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 35));break;

    case linkx.href.indexOf("http://www.hidelinks.net/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://hidelinks.net/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://SavantTools.com/anon/") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 28));break;

    case linkx.href.indexOf("http://www.SavantTools.com/anon/") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 32));break;

    case linkx.href.indexOf("http://antirefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://www.antirefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://hidemyass.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://www.hidemyass.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://norefer.org/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));break;

    case linkx.href.indexOf("http://www.norefer.org/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));break;

    case linkx.href.indexOf("http://sjmp.eu/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 16));break;

    case linkx.href.indexOf("http://www.sjmp.eu/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));break;

    case linkx.href.indexOf("http://smartjump.eu/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 21));break;

    case linkx.href.indexOf("http://www.smartjump.eu/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 25));break;

    case linkx.href.indexOf("http://antirefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://www.antirefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://hiderefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://www.hiderefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://hiderefer.org/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));break;

    case linkx.href.indexOf("http://www.hiderefer.org/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 26));break;

    case linkx.href.indexOf("http://hideref.info/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 21));break;

    case linkx.href.indexOf("http://www.hideref.info/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 25));break;

    case linkx.href.indexOf("http://unrefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));break;

    case linkx.href.indexOf("http://www.unrefer.com/?") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));break;

    case linkx.href.indexOf("http://demonoid.com/redirect.php?url=") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 37));break;

    case linkx.href.indexOf("http://www.demonoid.com/redirect.php?url=") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 41));break;
  }
}