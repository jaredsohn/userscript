// ==UserScript==
// @name           Rageit
// @namespace      http://jgardner.info/
// @description    Enable rage mode reddit-wide
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

addStyleSheet('@import "http://www.reddit.com/r/fffffffuuuuuuuuuuuu/stylesheet.css?v=36054bd1bd99cde89fa2377006d592a5";');
