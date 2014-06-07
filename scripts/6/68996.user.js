// ==UserScript==
// @name        Compact Feverº
// @author      Dan Bedford
// @namespace   http://blog.danbedford.com/2010/02/compact-feverº/
// @description Give your feeds a bit more space in Fever.
// @include     http://*/fever/*
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://media.danbedford.com/compact-fever.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);