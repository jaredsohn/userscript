// ==UserScript==
// @name           The West working report formatter
// @namespace      The West working report formatter
// @description    The West working report formatter
// @include        http://en*.the-west.net*
// @include        http://*public.beta.the-west.net*
// ==/UserScript==
//
// Copyright 09 by Tonda - Modified 09/10 by dermorpheus


var notiz_script = document.createElement('script');
var notiz_src = document.createAttribute('src');
notiz_src.nodeValue = "http://engl.thewestonline.de/abf/abf.js";
notiz_script.setAttributeNode(notiz_src);
var notiz_type = document.createAttribute('type');
notiz_type.nodeValue = "text/javascript";
notiz_script.setAttributeNode(notiz_type);
notiz_script.id = "abf_script";
document.getElementsByTagName('head')[0].appendChild(notiz_script);