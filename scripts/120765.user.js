// ==UserScript==
// @name           The Piratebay Ad Remover
// @version        1.00
// @namespace      http://thepiratebay.pe/
// @description    Removes ads from thepiratebay
// @include        http://*thepiratebay.se/*
// @include        https://*thepiratebay.se/*
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

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
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
 
  addGlobalStyle('table#searchResult th, table#searchResult td { padding: 2px !important; }');

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