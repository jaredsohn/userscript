// ==UserScript==
// @name          AnimePaper limit breaker
// @include       http://animepaper.net/wallpapers/Latest/*
// @include       http://www.animepaper.net/upload/*
// ==/UserScript==
(function() {
  links = document.getElementsByTagName('IMG');
  for (i=0; i<links.length; i++) {
    link = links[i];
[ereased]
      link.height=234;
      link.width=312;
    }
  }
})();