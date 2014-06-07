// ==UserScript==
// @name        ShowHideForSankakuComplex
// @namespace   tealeaf.net
// @description Show Some Hide Element
// @include     http://www.sankakucomplex.com/*
// @author      tealeaf
// @version     0.1
// ==/UserScript==

window.setTimeout(
  function(){
    document.getElementById("h").style.display="block";
  },
  1000
);
