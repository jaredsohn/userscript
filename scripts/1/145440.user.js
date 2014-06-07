// ==UserScript==
// @name            Google Editor
// @namespace       http://itsestler.pl
// @author          Damian Dąbrowski [ MxFPEsTLeR ]
// @match           http://*.google.*
// @match           https://*.google.*
// ==/UserScript== 
var newimg = document.createElement('img');
newimg.src = 'http://helion.pl/img/logo162_35.gif';
var oldimg = document.getElementsByTagName('img')[0];
oldimg.parentNode.replaceChild(newimg, oldimg);