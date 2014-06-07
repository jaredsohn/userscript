// ==UserScript==
// @name           GoogleCacheBack
// @namespace      http://dan.shearmur.co.uk
// @description    Puts cached links back in google underneath the description
// @include        http://www.google.com/*
// @include        http://www.google.co.uk/*
// ==/UserScript==
(function() {

  var list = document.querySelectorAll('a[href^="http://webcache.googleusercontent.com/"]'); 
  for (var i = 0, link; link = list[i]; i++) { 
    link.parentElement.parentElement.parentElement.parentElement
      .querySelector('h3.r').parentElement.insertBefore(link);
  }

})();
