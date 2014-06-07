// ==UserScript==
// @name           IBM Wiki
// @namespace      http://blah
// @include        http://www-10.lotus.com/ldd/*wiki.nsf/*
// ==/UserScript==

/* 
User screen resolution 1024x768

Overriding style:

div#wikiDoc.wikiDoc {  
        width: 7500px;
        }
*/

var div = document.getElementById('wikiDoc');
div.style.width = '680px';
div.style.fontSize = '12pt'; 