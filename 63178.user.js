// ==UserScript==
// @name           ISDS downloader
// @namespace      https://www.czebox.cz
// @description    bla bla
// @include        https://www.czebox.cz/*
// ==/UserScript==

// pro produkcni prostredi je @include https://www.mojedatovaschranka.cz/* a 
// serviceURL je https://www.mojedatovaschranka.cz/any/DS/dd?'

var strip = 'nav=detail&';
// var serviceURL = 'https://www.mojedatovaschranka.cz/any/DS/dd?'; // produkcni prostredi
var serviceURL = 'https://www.czebox.cz/any/DS/dd?'; // testovaci prostredi
var link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
  if (link[i].href != null) {
    if (link[i].href.indexOf('SignedMessage')!=-1
       || link[i].href.indexOf('SignedSentMessage')!=-1) {
      var foo = link[i].href.substr(link[i].href.indexOf(strip)+strip.length)
      link[i].href=serviceURL + foo;
    }
  }
}
