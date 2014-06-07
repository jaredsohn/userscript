// ==UserScript==
// @name           hagah plus
// @namespace      hagah plus
// @description    hagah no ads
// @include        http://*.hagah.com.br/*
// ==/UserScript==
var stylesheet = ''+
'.publicidade{display:none;}';
var newstyle = document.createElement("style")
newstyle.type = "text/css"
var css = document.createTextNode(stylesheet)
newstyle.appendChild(css)
document.getElementsByTagName('body')[0].appendChild(newstyle);