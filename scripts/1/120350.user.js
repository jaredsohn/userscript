// ==UserScript==
// @name           Google Play 50 App Pages Fix (updated Feb. 5 2013)
// @namespace      glentakahashi
// @description    Previously known as the Android Market Fix, this has been updated to fix the
//                 bug that if you have over 50 pages of apps in My Android Apps - Google Play,
//                 you cannot view all of them. Fixes it to add more buttons to page through,
//                 and fixes invisible pages.
// @include /^https?:\/\/play\.google\.com\/apps.*/
// ==/UserScript==
var strCSS = 'cssRules';
//hack for internet explorer
if( document.all ) { strCSS = 'rules'; }
for(var i = 0; i < document.styleSheets.length; i++) {
    var css = document.styleSheets[i][strCSS];
    var cssLen = document.styleSheets[i][strCSS].length;
    for(var j = 0; j < cssLen; j++) {
        //found!
        if( css[j].cssText.indexOf( ".carousel-pages-wrapper" ) >= 0 ) {
            css[j].style.width = "1000000px";
        }
    }
}
