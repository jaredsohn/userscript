// ==UserScript==

// @name           Clean Folha de Sao Paulo

// @description    Cleans Folha de Sao Paulo site

// @include        http://*.folha.*/*

// ==/UserScript==



// Remove the annoying ad frames

//$('iframe, object[id*="webmotors"], div[id*="ad-"], div[id^="shopping"], div[id^="fourth_column"], div[id^="barrauol"] ').remove();



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



  // Define all the selectors that we want to hide and hide them

  var queryselectors = querySelectorAll('object[id*="webmotors"], div[id*="ad-"], div[id^="shopping"], div[id^="fourth_column"], div[id^="barrauol"]');

  hideElements(queryselectors);




})();