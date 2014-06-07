// ==UserScript==
// @name       		PopSci Australian Fix
// @namespace  		http://hruhf.in/
// @version    		1
// @description  	Converts Popsci links, images and urls to proxy'd ones.
// @match      		http://*/*
// ==/UserScript==

//Convert Links
var tags = document.getElementsByTagName('a');
for (var i = 0; i < tags.length; i++) 
{
    tags[i].href = tags[i].href.replace('http://www.popsci.com', 'http://www.popsci.com.nyud.net');
}

//Convert Images
var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) 
{
    tags[i].src = tags[i].src.replace('http://www.popsci.com', 'http://www.popsci.com.nyud.net');
}

//Convert URLs
if (/popsci.com.au/i.test(window.location.href))
{
    window.location.href = window.location.href.replace('http://www.popsci.com.au', "http://www.popsci.com.nyud.net");
}