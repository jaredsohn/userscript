// ==UserScript==
// @name          XKCD Forum Link
// @description   Adds a link to the forum back to the main page.
// @include http://*.xkcd.com/*
// @match http://*.xkcd.com/*
// ==/UserScript==

(function(){
   var unorderedList = document.getElementById('topLeft').getElementsByTagName('ul')[0];

   var listItem = document.createElement("li");
   listItem.innerHTML= '<a href="http://forums.xkcd.com">Forums</a>';
   unorderedList.appendChild(listItem);
})();

