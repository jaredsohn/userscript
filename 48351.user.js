// ==UserScript==
// @name           Anti-Buschfunk
// @namespace      Anti-Buschfunk
// @include        http://www.studivz.net/*
// @include        http://www.schuelervz.net/*
// @include        http://www.meinvz.net/*
// ==/UserScript==

addGlobalStyle = function(css)
{
  var head = document.getElementsByTagName('head')[0];
  if (!head)
    return;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

addGlobalStyle('#Mod-Feeds-Snipplet { display: none !important;}');