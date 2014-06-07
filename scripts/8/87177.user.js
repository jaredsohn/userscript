// ==UserScript==
// @name           Tweakers restyled
// @description    Restyles the (new) Tweakers website
// @version        1.1
// @namespace      https://sillevis.net/
// @include        http://tweakers.net/*
// @copyright      
// @contributor    Chase Sillevis
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'https://sillevis.net/tweakers.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);