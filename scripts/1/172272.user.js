// ==UserScript==
// @name        riemurasia 1px kuvat
// @namespace   riemurasiaa
// @description Suurennetaan niitä kuvia..
// @include     http://www.riemurasia.net/kuva/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementsByClassName('alaosa_tiedot')[0].getElementsByTagName('img')[1].style.width='297px';
