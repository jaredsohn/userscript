// ==UserScript==
// @name        giantbomb download links no-js
// @namespace   *.giantbomb.*
// @description premium member download links without bs js
// @include     *.giantbomb.*
// @version     1
// @grant       none
// ==/UserScript==

var addLinks = function(){
     var low = document.querySelectorAll('ul.dropdown-menu > li:nth-child(1) > a:nth-child(1)')[0];
     var med = document.querySelectorAll('ul.dropdown-menu > li:nth-child(2) > a:nth-child(1)')[0];
     var high = document.querySelectorAll('ul.dropdown-menu > li:nth-child(3) > a:nth-child(1)')[0];
     var hd = document.querySelectorAll('ul.dropdown-menu > li:nth-child(4) > a:nth-child(1)')[0];
     var toolbar = document.querySelectorAll('.btn-toolbar')[0];
     toolbar.appendChild(low);
     toolbar.appendChild(med);
     toolbar.appendChild(high);
     toolbar.appendChild(hd);
};

addLinks();


