// ==UserScript==

// @name           BoyAreYouAnIdiot

// @namespace      metafilter

// @description    replace mefi.us stylesheet with metafilter stylesheet

// @include        http://metafilter.com/*

// @include        http://*.metafilter.com/*

// ==/UserScript==



function addStyleSheet(){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.c­reateElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode)
  elementStyle.innerHTML = style;
  return elementStyle;
}


addStyleSheet('@import "http://styles.metafilter.com/metatalk/default060910.css";');