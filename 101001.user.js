// ==UserScript==
// @name           The Pirate Bay Visited
// @version        0.7
// @namespace      http://denbuzze.com/
// @description    Make sure you can see the difference between visited links and non visited ones on the thepiratebay.org
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
   * Redefine GM_addGlobalStyle with a better routine
   * @param {String} css The CSS you want to load on the page
   */
  var GM_addGlobalStyle = function(css) {
    var sel = document.createElement('style');
    sel.setAttribute('type', 'text/css');
    sel.appendChild(document.createTextNode(css));
    var hel = document.documentElement.firstChild;
    while (hel && hel.nodeName != 'HEAD') {
        hel = hel.nextSibling;
    }
    if (hel && hel.nodeName == 'HEAD') {
        hel.appendChild(sel);
    } else {
        document.body.insertBefore(sel, document.body.firstChild);
    }
    return sel;
  };

  /**
   * Initialisation function
   */
  var init = function(){

    // Don't change the links on the homepage
    if(document.location != "http://thepiratebay.org/" && document.location != "https://thepiratebay.org/"
       && document.location != "http://depiraatbaai.be/" && document.location != "https://depiraatbaai.be/"
       && document.location != "http://thepiratebay.se/" && document.location != "https://thepiratebay.se/"){
      GM_addGlobalStyle('table tr td:nth-child(2) a:visited {color: #E1D1C6}');
    }

  };

  init();

})();