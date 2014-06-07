// ==UserScript==
// @name           Drudge Report Ad Remover
// @namespace      DrudgeReport
// @description    Removes Top Banner Ad
// @include        *drudgereport.com/*
// @author         Tim Harding
// ==/UserScript==

(function() {

var widget = document.getElementsByTagName( 'center' );

var num = widget.length;

widget[0].parentNode.removeChild( widget[0] );

})();
