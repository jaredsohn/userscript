// ==UserScript==
// @name           Reset YouTube logo to home
// @version        0.1
// @author	   Jaimie van Santen
// @description    Resets the YouTube logo to the old layout
// @include        http://www.youtube.com
// @include        http://www.youtube.com/*
// ==/UserScript==

(function(){
  document.getElementById('logo-container').href = "http://www.youtube.com/home";
})();
