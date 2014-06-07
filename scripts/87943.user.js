// ==UserScript==
// @name           Southpark unblocked
// @namespace      Mats
// @description    no copyright block.
// @include        *southparkstudios.com*
// ==/UserScript==
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://dump.no/files/396f5fb41cbf/Southany.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
