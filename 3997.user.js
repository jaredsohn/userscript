// ==UserScript==
// @name           Favicon for rafb.net/paste
// @namespace      http://henrik.nyh.se
// @description    Adds a favicon to rafb.net/paste, making those tabs easier to find.
// @include        http://rafb.net/paste*
// ==/UserScript==

// Feel free to replace this value with the URL or data:URI of another icon.
// data:URI kitchen: http://software.hixie.ch/utilities/cgi/data/data
var icon = "data:image/gif,GIF89a%10%00%10%00%A2%FF%00%00%00%80%C0%C0%C0%FF%FF%00%80%80%00%FF%FF%FF%80%80%80%00%00%00%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%10%00%10%00%40%03J%18%BA%DCj%A3%C4%01%88%B5%00%BCh%1C%2C%5D%F0MUf%12%9Ah%AC%86%20%B0%EB2J%F4%04nu%99%A1%99%13%98%C0%5E%03%E63%D0Z%AB%D7%24d%1C%C0%60%12f%AD%10%CCHm%95%0B%0A%25%9Af%B5%5C%15%EB%ABM%F9%7C%09%00%3B";

// Set as favicon

var link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', icon);

var head = document.getElementsByTagName('head')[0];
head.appendChild(link);