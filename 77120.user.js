// ==UserScript==
// @name           Remove visted links
// @namespace      http://userscripts.org/users/133989
// @description    Changes visited links' colors to none so sites can't glean history. More here: http://wtikay.com/docs/solutions.html
// @include        *
// @copyright      DIVID Technology
// ==/UserScript==

// removeVistedLinks

(function(){
    var css, head, style;
    css  = ':link, :visited, :link *, :visited * {background-image: none !important;list-style-image: none !important;border-image: none !important;border-corner-image: none !important;-moz-border-image: none !important;-webkit-border-image: none !important;';
    style = document.createElement('style'); 
    style.setAttribute('type','text/css'); 
    style.appendChild(document.createTextNode(css));
    head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
})();