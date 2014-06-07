// ==UserScript==
// @name           Ikariam Graphics CDN
// @namespace      http://blog.bcse.info/ikariam-graphics-cdn
// @description    Load Ikariam UI images from Coral CDN, may speed up Ikariam.
// @version        0.3.0
// @include        http://s*.ikariam.*/*
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://bcse.myweb.hinet.net.nyud.net/ikariam/img.css';
cssNode.media = 'screen';
cssNode.title = 'Ikariam Graphics CDN';
document.getElementsByTagName("head")[0].appendChild(cssNode);