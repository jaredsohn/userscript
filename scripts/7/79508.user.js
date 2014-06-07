// indiegame.com-noise-filter.user.js
//
// ==UserScript==
// @name          IndieGames.com Noise Filter
// @namespace     http://userscripts.org/scripts/show/79508
// @description   Hides any blog comments by Anonymous or Guest
// @include       http://indiegames.com/*
// @include       http://www.indiegames.com/*
// ==/UserScript==
function shutupjerk() 
{
  var success = false;
  var elements = document.getElementsByTagName('li');
  for (var i=0; i<elements.length; i++) {
    if (elements[i].className.match(/dsq-comment/)) {
      success = true;
      if (elements[i].innerHTML.match(/\<span class=\"dsq-commenter-name\"\>Anon/i)) {
        if (elements[i].className.match(/dsq-comment-is-collapsed/)) continue;
        elements[i].className += ' dsq-comment-is-collapsed';
      }
      if (elements[i].innerHTML.match(/\<span class=\"dsq-commenter-name\"\>Guest/i)) {
        if (elements[i].className.match(/dsq-comment-is-collapsed/)) continue;
        elements[i].className += ' dsq-comment-is-collapsed';
      }
    }
  }
  if (!success) window.setTimeout(shutupjerk,1000);
}
window.setTimeout(shutupjerk,1000);