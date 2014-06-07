// ==UserScript==
// @name        Freegate Ads Block
// @namespace   http://friendfeed.com/yoh4n
// @version     1
// ==/UserScript==

   var styleNode = document.createElement('style');
   styleNode.type = "text/css";
   if(!!(window.attachEvent && !window.opera)) {
        styleNode.styleSheet.cssText = 'ins { display: none!important; }';
   } else {
        var styleText = document.createTextNode('ins { display: none!important; } ');
        styleNode.appendChild(styleText);
   }
   document.getElementsByTagName('head')[0].appendChild(styleNode);
   if(!!(window.attachEvent && !window.opera)) {
        styleNode.styleSheet.cssText = '#a9dd1959 { display: none!important; }';
   } else {
        var styleText = document.createTextNode('#a9dd1959 { display: none!important; } ');
        styleNode.appendChild(styleText);
   }
   document.getElementsByTagName('head')[0].appendChild(styleNode);
