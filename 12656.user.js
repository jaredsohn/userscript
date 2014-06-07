// ==UserScript==
// @name           Fullscreen Facebook Scrabulous 
// @namespace      http://perldog.com/userscripts
// @description    Makes Scrabulous app on facebook the full size of your browser.
// @include        http://apps.facebook.com/scrabulous/*
// ==/UserScript==

(function() {
  var embeds = document.getElementsByTagName("embed");
  for (var i = 0; i < embeds.length; i++) {
    var embed = embeds[i];
    if (embed.src.match(/Scrabulous/)) {
      var a = document.createElement('a');
      a.href = embed.src + '?' + embed.attributes.getNamedItem('flashvars').value;
      a.innerHTML = "[bigger]";
      embed.parentNode.insertBefore(a, embed);      
    }
  }
 })();
