// ==UserScript==
// @name           jQuery Everywhere
// @author         Awesumness
// @Notes          Enjoy.
// @include        *
// ==/UserScript==

if (document.addEventListener){
  document.addEventListener("DOMContentLoaded", durf(), false);
}

function durf() {
    if(typeof unsafeWindow.jQuery == 'undefined'){
      var jayQuery = document.createElement('script');
      jayQuery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
      document.getElementsByTagName("head")[0].appendChild(jayQuery);
    }
}