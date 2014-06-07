// ==UserScript==
// @name           IMDb AKAS Redirector
// @description    Redirect all requests from *.imdb.com to akas.imdb.com to always view the original titles
// @include        http://*.imdb.com/*
// @include        http://imdb.com/*
// @include        https://*.imdb.com/*
// @include        https://imdb.com/*
// @exclude        http://akas.imdb.com/*
// @exclude        https://akas.imdb.com/*
// @version        1.01
// ==/UserScript==

(function() {

  // Redirect All SubDomains?
  var everyDomain = true;
  
  // Replace...
  var locOrig = window.location.toString();
  if(everyDomain) {
    loc = locOrig.replace(/(https?:\/\/).*?(imdb\.com.*)$/,'$1akas.$2');
  } else {
    loc = locOrig.replace(/(https?:\/\/)(www\.)?(imdb\.com.*)$/,'$1akas.$3');
  }
  
  // And redirect
  if(loc != locOrig) {  
    window.location = loc;
  }

})();