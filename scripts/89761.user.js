// ==UserScript==
// @name           The Piratebay Ad Remover
// @version        0.19
// @namespace      http://denbuzze.com/
// @description    Removes ads from thepiratebay.org
// @match          http://*.thepiratebay.ac/*
// @match          https://*.thepiratebay.ac/*
// @match          http://*.thepiratebay.pe/*
// @match          https://*.thepiratebay.pe/*
// @match          http://*.thepiratebay.org/*
// @match          https://*.thepiratebay.org/*
// @match          http://*.thepiratebay.se/*
// @match          https://*.thepiratebay.se/*
// @match          http://*.thepiratebay.gl/*
// @match          https://*.thepiratebay.gl/*
// @match          http://*.thepiratebay.is/*
// @match          https://*.thepiratebay.is/*
// @match          http://*.thepiratebay.sx/*
// @match          https://*.thepiratebay.sx/*
// @match          http://*.depiraatbaai.be/*
// @match          https://*.depiraatbaai.be/*
// @include        http://*thepiratebay.ac/*
// @include        https://*thepiratebay.ac/*
// @include        http://*thepiratebay.pe/*
// @include        https://*thepiratebay.pe/*
// @include        http://*thepiratebay.org/*
// @include        https://*thepiratebay.org/*
// @include        http://*thepiratebay.se/*
// @include        https://*thepiratebay.se/*
// @include        http://*depiraatbaai.be/*
// @include        https://*depiraatbaai.be/*
// @include        http://*thepiratebay.gl/*
// @include        https://*thepiratebay.gl/*
// @include        http://*thepiratebay.is/*
// @include        https://*thepiratebay.is/*
// @include        http://*thepiratebay.sx/*
// @include        https://*thepiratebay.sx/*
// ==/UserScript==

(function(){

  /**
   * Hide all the elements within the supplied array
   * @param {Array} elements An array of html nodes you want to hide
   * @return void
   */
  var hideElements = function(elements) {
    for(var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }

  /**
   * Get the elements for a classname, only if the
   *   document.getElementsByClassName method exists
   * @param {String} classname The name of the class
   * @return {Array} The elements with the classname
   * @type String|Object|Array|Boolean|Number
   */
  var getElementsByClassName = function(classname) {
    if(document.getElementsByClassName) {
      return document.getElementsByClassName(classname);
    }
  }

  /**
   * Select elements defined with a specific pattern
   *   (This is only supported since firefox 3.5)
   * @param {String} selector The pattern you want the elements for
   * @returns The elements with the pattern
   */
  var querySelectorAll = function(selector){
    if(document.querySelectorAll){
      return document.querySelectorAll(selector);
    }
  }

  // Get all iframes and hide them
  var iframes = document.getElementsByTagName("iframe");
  hideElements(iframes);

  // Get all the ads and hide them
  var ads = getElementsByClassName("ads");
  hideElements(ads);

  // Get all the spons links and hide them
  ads = getElementsByClassName("spons-link");
  hideElements(ads);

  // Hide the up moving ads
  ads = document.getElementById("zzsldr");
  if(ads){
    ads.style.display = "none";
  }

  // Hide the sponsored links
  ads = document.getElementById("sponsoredLinks");
  if(ads){
    ads.style.display = "none";
  }

  // Hide the up moving ads
  var content = document.getElementById("content");
  if(content){
    content.style.maxWidth="100%"
  }

  // Define all the selectors that we want to hide and hide them
  var queryselectors = '';
  var selectors = 'div[id^="sky"], '
    + 'a[href*="http://cdn3.adexprts.com/"], '
    + 'a[href*="http://cdn2.adexprts.com/"], '
    + 'a[href*="http://cdn1.adexprts.com/"], '
    + 'a[href*="ibario.com"], a[href*="http://facemoods.com/"] , '
    + 'a[href*="http://download.premium.netdna-cdn.com/"], '
    + 'a[href*="http://soda.adserver-pro.net/pb"], '
    + 'a[href*="http://premiumdownloads.info"], '
    + 'a[href*="http://bflixdownload.info/"], '
    + '[href*="tubeplus.me"], '
    + 'div[style*="height: 35px"], '
    + 'div[id^="zzsldrzedoslider"]';

  setInterval(function() {
     queryselectors = querySelectorAll(selectors);
     hideElements(queryselectors);
  }, 1000);
  queryselectors = querySelectorAll(selectors);
  hideElements(queryselectors);

  // Set to full width
  document.getElementById("main-content").style.margin = 0;
})();