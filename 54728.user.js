// ==UserScript==
// @name           Facebook Profile Styler
// @namespace      By Chris Tony Hustad
// @description    Facebook Script
// @include        *.facebook.*
// @version 	   v1
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://hustadblogg.110mb.com/faceblack.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);