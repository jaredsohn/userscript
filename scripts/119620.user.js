// ==UserScript==
// @name          Ikaworld link anonymizer
// @namespace     Ikaworld link anonymizer
// @description   Adds anonymizer redirects
// @version       0.1
// @include       *ika-world.com*
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  switch(0) {
    case linkx.href.indexOf("http://s") : linkx.href = linkx.href.replace(/^http:\/\/s/, "http://anonym.to/?http://s");
  }
}