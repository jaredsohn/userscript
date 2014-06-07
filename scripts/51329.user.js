// ==UserScript==
// @name           RAW Nettby
// @namespace      RAW
// @include        *.nettby.no*
// @description    RAW for Nettby (0,1)
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://hustadblogg.x10hosting.com/master.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);