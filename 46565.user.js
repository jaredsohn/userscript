// ==UserScript==
// @name           BurnURL Killer
// @namespace      http://www.shaungrady.com/
// @description    Burn, BurnURL, burn! Never see it again.
// @include        http://burnurl.com/*
// ==/UserScript==

var bar = document.getElementById('bar');
if (!!bar){
  bar.parentNode.removeChild(bar);
  var burn = document.getElementById('burn');
  if (typeof(burn.src) === 'string'){
    location.replace(burn.src);
  }
}