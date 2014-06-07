// ==UserScript==
// @name          ToodleDo Beautified
// @namespace     http://userstyles.org
// @description	  Toodledo, beautified
// @author        Beau West 
// @include       http://www.toodledo.com*
// @include       http://*.toodledo.com*
// @include       https://*.toodledo.com*
// @run-at        document-start
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://static.beaudesigns.net/toodledo/toodledo.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName('head')[0].appendChild(cssNode);