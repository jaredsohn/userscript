// ==UserScript==
// @name           Delinkifier
// @description    Removes linkification of URLs 
// @version        0.1
// ==/UserScript==

// Excerpt fom http://userscripts.org/scripts/show/158874

var allLinks = document.getElementsByTagName('a');
 

// For links with the form http://adf.ly/http://www.some.url,
// check if there exists an 'http:' at some offset greater 
// than 0, if so, remove the part of the string before that 
// substring.

for(var i=0; i < allLinks.length; i++) {
        var off = allLinks[i].href.substr(5).indexOf('http:');
        if (off >= 0) {
                var fragment;
                fragment = allLinks[i].href.substr(5).substr(off);
               	allLinks[i].href = fragment;
                allLinks[i].rel='noreferrer'}
        }