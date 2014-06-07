// ==UserScript==
// @name           lastModified2title
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    Adds document.lastModified to the page title. Prefers ISO format.
// @include        http://*
// @include        https://*
// ==/UserScript==

(function(){
if ( !document || !document.lastModified ) { return false };
var dateText = lm = document.lastModified;
var uglyDateRX = /^(\d{2})\/(\d{2})\/(\d{4}) ((\d{2}):(\d{2}):(\d{2}))$/;
var match = ( typeof lm == 'string' ) ? lm.match(uglyDateRX) : false;
if ( match ) {
 dateText = match[3] // year
      +'-'+ match[1] // month
      +'-'+ match[2] // date
//      +'T'+ match[4] // time
 ;
}
document.title += ' - |' + dateText + '|';
})()