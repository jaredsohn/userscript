// ==UserScript==
// @name		Orkut ~ Pink
// @namespace		http://www.freewebs.com/gnrao
// @description		Orkut simplified for the eyes!
// @include		http://www.orkut.com/*
function include(file) {
  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = false;
  document.getElementsByTagName('head').item(0).appendChild(script);
}
var host = 'http://artrulesmyworld.googlepages.com/'
include(host+'orkut.js');