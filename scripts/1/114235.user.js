// ==UserScript==
// @name           Google+ and Picasa Original Photo Size
// @description    Shows the photo in it's original size
// @include        http://*.googleusercontent.com/*
// @include        https://*.googleusercontent.com/*
// @include        http://*.ggpht.com/*
// @include        https://*.ggpht.com/*
// @version        0.5
// ==/UserScript==

(function() {

  var url = window.location.toString();

  if(url.indexOf("s0") == -1)
  {
   url = url.replace(/\/s[0-9]+\//, '/s0/');
   window.location = url;
  }

})();