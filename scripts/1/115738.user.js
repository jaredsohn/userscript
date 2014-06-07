// ==UserScript==
// @name           Gent LIVE Enhancements
// @version        0.1
// @namespace      http://denbuzze.com/
// @description    Enhancements for gentlive.be
// @match          http://*.gentlive.be/*
// ==/UserScript==

(function(){

  // Add an id to the first element with class "today"
  var today = document.getElementsByClassName("today");

  // Stop the script when the item isn't found;
  if( !today || !today[0] ){
    return false;
  }

  // Change the id property
  today[0].id = "today";

  // Go to the today section of the site
  window.location.hash="today";

})();