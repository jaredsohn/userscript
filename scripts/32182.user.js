// ==UserScript==
// @name VZ.lt
// @description Removes ads and top block from VZ.lt website.
// @include        http://*vz.lt/*
// ==/UserScript==

window.addEventListener("load", function(e) {
  var styles = document.createElement('style');
  styles.innerHTML = '.bannerbox, .bannerboxart, #siteHeaderPanorama, #logodiv2, .investorTop, #logodiv br { display: none !important; } .siteContentPad { height: 20px !important; } ';
  document.getElementsByTagName("body")[0].appendChild(styles);
  }, false);