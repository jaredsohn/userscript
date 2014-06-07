// ==UserScript==
// @name           Anti-Klartext
// @namespace      Anti-Klartext
// @description    Anti-Klartext
// @include        http://www.schuelervz.net/*
// @include        http://www.meinvz.net/*
// @include        http://www.studivz.net/*
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

addGlobalStyle('#LeftsideBox { display: none !important;}');