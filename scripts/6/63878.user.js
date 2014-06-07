// ==UserScript==
// @name           Google Unminimalism
// @namespace      mavrev.com
// @version        0.1.0
// @description    Disables the Google homepage fade-in, for the regular minimalism of Google, and not the extreme.
// @include         http://*google*
// @include         https://*google*
// ==/UserScript==

(function () {

        var css =  "#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }";
 if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else {
    var style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}
})();