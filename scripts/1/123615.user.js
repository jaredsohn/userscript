// ==UserScript==
// @name          Nightly-Imgfix
// @description	  Makes background white again and stops centering images
// @author        Not David Yang
// @include       *.jpg
// @include       *.png
// @include       *.gif
// @run-at        document-start
// ==/UserScript==

(function() {
    var css = "body{ background-color: #fff !important; } img{ margin: 5 !important; }";
    GM_addStyle(css);

}).call(this);