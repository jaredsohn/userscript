// ==UserScript==
// @name          Diwali Orkut Theme
// @author        Asrail
// @description   Diwali Orkut Theme
// @include       http://www.orkut.com/*
// @include       http://images.orkut.com/*
// @include       http://sandbox.orkut.com/*
// ==/UserScript==

skin = document.getElementsByTagName('head')[0].getElementsByTagName('link')[2];

if ( skin.href.indexOf('castroskin') != -1 ) {
  skin.href = "http://img4.orkut.com/skin/S33/diwali001.css"
}