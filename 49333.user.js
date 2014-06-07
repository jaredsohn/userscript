// ==UserScript==
// @name           IMDb links > filmtipset.se
// @namespace      myenemy.se
// @include        *
// @exclude        http://*.filmtipset.se/*
// @exclude        http://*.imdb.com/*
// ==/UserScript==


var processIMDbLinks = function() {
  var link;
  link = document.body.getElementsByTagName("a")

  for (var i = 0; i < link.length; i++) {    
      link[i].href = link[i].href.replace(/http:\/\/[w]{0,3}[.]?imdb.com\/title\/(tt[0-9]+)[/]?/i, "http://www.filmtipset.se/imdb/$1");   
  }
}

processIMDbLinks();