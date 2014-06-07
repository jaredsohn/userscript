// ==UserScript==
// @name           Hide Justin Bieber
// @namespace      http://twitter.com/chadsmith
// @description    Hides Justin Bieber from the trending topics sidebar.
// @include        http://twitter.com/*
// ==/UserScript==
window.addEventListener('load',function(a,b,c){if(a=document.getElementById('trends')){b=a.getElementsByTagName('ul')[0].getElementsByTagName('li'),c=b.length;while(c--)if(b[c].className.match(/\bJustin_Bieber_tab\b/))b[c].style.display='none'}},true);