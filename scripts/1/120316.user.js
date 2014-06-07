// ==UserScript==
// @name          hemosu_Floating Menu Hidden
// @namespace     http://onedge.pe.kr
// @description	  visible hidden some site's floating menu
// @include       http://www.mydaily.co.kr/news/*
// ==/UserScript==


var s = document.getElementById('STATICMENU');
s.setAttribute('style','visibility: hidden');
