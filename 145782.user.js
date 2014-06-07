// ==UserScript==
// @name Ads remover for nCore ads
// @namespace created by gala 
// @description Ez eltünteti az idegesítő árukeresős reklámokat a torrent adatlapokról
// @include http://ncore.cc/*
// @include http://ncore.nu/*
// ==/UserScript==
var divs = document.getElementsByTagName('div');
var div;
var i = divs.length;
while (i--) {
  div = divs[i];
  if (div.getAttribute('style') == 'width: 200px; height: 225px; margin: 10px; padding: 0px; float: none; display: block; position: relative; background: transparent;') {
    div.parentNode.removeChild(div);
  }
}