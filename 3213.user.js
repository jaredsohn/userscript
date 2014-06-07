// ==UserScript==
// @name          translate google video to unblock it for your country
// @namespace
// @description	  allows to see blocked google videos using google translation as proxy
// @include       http://video.google.com/*
// ==/UserScript==
// Author: woody (koezle@gmail.com)

(function() {
  var match ="videoplay?docid=";
  var hrefs = document.getElementsByTagName("a");
  for (var i=0; i< hrefs.length; i++) {
      var ref = hrefs[i].getAttribute("href");
      if (ref.substring(0, match.length) == "videoplay?docid=")
        hrefs[i].setAttribute("href", "http://translate.google.com/translate?u=http://video.google.com/"+ref);
  }

})()
