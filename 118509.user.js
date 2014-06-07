// ==UserScript==
// @name           KodieFiles Image Redirect
// @namespace      http://userscripts.org/users/130612
// @description    Links from a KodieFiles.nl gallery page directly to images.
// @match          http://www.kodiefiles.nl/*
// @version        0.3
// ==/UserScript==

// collect all links
var allLinks = document.getElementsByTagName('a')

// walk through the array

for(var i=0; i < allLinks.length; i++) {
if (allLinks[i].href.indexOf('images.kodiefiles.nl') > 0){
        allLinks[i].href = allLinks[i].href.replace('www.kodiefiles.nl','images.kodiefiles.nl');
	allLinks[i].href = allLinks[i].href.substr(0, allLinks[i].href.lastIndexOf('/') +1) + 'full' + allLinks[i].href.substr(allLinks[i].href.lastIndexOf('/'));
        allLinks[i].href = allLinks[i].href.replace('.html','.jpg');}
}

// that's it!