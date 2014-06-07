// ==UserScript==
// @name         Faviconize Google (nested icons)
// @namespace    http://userscripts.ru/js/faviconize-google/
// @description  Adds favicons to each link offered by Google search results.
// @include      http://www.google.*/search?*
// @include      http://www.google.*/webhp*
// @include      http://www.google.*/#*
// @version      1.1
// @licence      MIT
// ==/UserScript==


(function(){

  var links = document.querySelectorAll('#res li.g h3 a.l');

  /**
   * Add favicons to links
   * @param links NodeList or Array of Elements
   */
  function add_favicons_to(links) {
    for (var i=0; i<links.length; i++) {
      if (links[i].firstChild.tagName != 'IMG') {
        var host = links[i].href.replace(/^https?:\/\//,'').replace(/\/.*$/,'');
        var img = document.createElement('IMG');
        img.src = 'http://www.google.com/s2/favicons?domain=' + host;
        img.width = '16';
        img.height = '16';
        img.className = 'favicon';
        links[i].insertBefore(img, links[i].firstChild);
      }
    }
  }

  add_favicons_to(links);

  if (typeof GM_addStyle == 'undefined') {
    /**
     * @param css String like '* {color:red}'
     */
    function GM_addStyle(css) {
      var head = document.getElementsByTagName('head')[0];
      if (head) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    }
  }

  GM_addStyle(
    ".favicon {padding-left:0px; vertical-align:left; border:none; opacity:0.5;filter:alpha(opacity=50)}\
     li.w0 {position:relative;}\
     .l .favicon {left:-6px; position:absolute; top:2px;}\
     li.g {position:relative; padding-left:16px}"
  );

  /**
   * Google's fancy new js ui need this stuff
   */
  if (/google.\w+\/(webhp.*)?(#.*)?$/.test(location.href)) {
    document.body.addEventListener('DOMNodeInserted', function(event){
      if (event.relatedNode.id == 'rso') {
        links = document.querySelectorAll('#res li.g h3 a.l');
        add_favicons_to(links);
      }
    }, false);
  }
  
})();