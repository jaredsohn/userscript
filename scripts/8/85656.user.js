// ==UserScript==
// @name           Disable Google Fade-in Animation
// @description    Disable Google Fade-in Animation
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/#*
// @include        https://www.google.*/
// @include        https://www.google.*/webhp*
// @include        https://www.google.*/#*
// @include        https://encrypted.google.*/
// @include        https://encrypted.google.*/webhp*
// @include        https://encrypted.google.*/#*
// @version        0.31
// ==/UserScript==

(function () {
    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }';
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();