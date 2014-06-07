// ==UserScript==
// @name           PDF/PPT/TIF viewer with Google docs (with page init fix)
// @namespace      localhost
// @include        http://*
// @exclude        http://docs.google.com/*
// @version        1.0
// ==/UserScript==

window.addEventListener(
  'load', 
  function() 
  { 
    if (location.href.indexOf("http://docs.google.com/") == -1) 
    {
      var l = document.links;
      var i = l.length;
      while (i--) 
      {
        if (l[i].href.match(/^[^?]+\.(pdf|ppt|tif)$/)) 
        {
          l[i].href = 'http://docs.google.com/viewer?url=' + l[i].href;
        }
      }
    }
  },
  true
);