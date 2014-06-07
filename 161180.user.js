// ==UserScript==
// @name Google Plus Profile Picture Circle Crop Removal
// @version 1.3
// @description Remove the circular border around profile pictures on Google Plus
// @include https://plus.google.com/*
// @run-at document-end
// ==/UserScript==

var css = document.createElement('style');
css.type = 'text/css';

var styles = "img.Gw2Dlb, img.umj1F, img.mrTXp, img.Rf {-webkit-border-radius: 0 !important; -moz-border-radius: 0 !important; border-radius: 0 !important;}\n";

if (css.styleSheet) css.styleSheet.cssText = styles;
else css.appendChild(document.createTextNode(styles));
document.head.appendChild(css);
