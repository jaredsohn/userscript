// ==UserScript==
// @name          Up and Down Page
// @namespace     http://jeffpalm.com/upanddownpage
// @description   Allows you go up page and down page using alt+arrow -- so you can use on hand
// @include       *
// ==/UserScript==

window.addEventListener('keydown',function(e) {
    if      (e.keyCode == 38 && e.altKey) window.scrollByPages(-1);
    else if (e.keyCode == 40 && e.altKey) window.scrollByPages(+1);
  },true);
