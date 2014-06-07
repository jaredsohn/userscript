// ==UserScript==
// @name           Make Apple Trailers work with Mplayer plugin on Unix
// @namespace      *
// @include        http://www.apple.com/trailers/*
// ==/UserScript==

var script_code = "$$('.trailer-content li a').each(function(button) {Event.stopObserving(button, 'click', button.onclick)});";
var text_node = document.createTextNode(script_code);
var script_node = document.createElement('script');
script_node.appendChild(text_node);
document.getElementsByTagName('head')[0].appendChild(script_node);

