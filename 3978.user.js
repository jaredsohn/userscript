// ==UserScript==
// @name fix phppatterns.com
// @namespace http://wainstead.info/
// @description Fix the low contrast hard to read styles of phppatterns.com
// @include http://*phppatterns.com/*
// @include https://*phppatterns.com/*
// ==/UserScript==

// Author: Steve Wainstead swain@panix.com
// Loop over all styles and set front and back colors to nothing, 
// which then gives you the browser defaults.

for (x=0; x < document.styleSheets.length; x++) {
    for (y=0; y < document.styleSheets[x].cssRules.length; y++) {
        csstext = document.styleSheets[x].cssRules[y].cssText;
        if (csstext.match(/color/)) {
            document.styleSheets[x].cssRules[y].style.color = '';
            document.styleSheets[x].cssRules[y].style.backgroundColor = '';
        }
    }
}