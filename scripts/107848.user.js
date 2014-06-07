// ==UserScript==
// @name           The West Notizen
// @namespace      The West Notizen
// @description    The West Notizen
// @include        http://*.the-west.*/game.php*
// ==/UserScript==
//
// Copyright 09 by Tonda edit by Sam008


var notiz_script = document.createElement('script');
var notiz_src = document.createAttribute('src');
notiz_src.nodeValue = "http://zeldaner.ze.funpic.de/anderes/notiz.js";
notiz_script.setAttributeNode(notiz_src);
var notiz_type = document.createAttribute('type');
notiz_type.nodeValue = "text/javascript";
notiz_script.setAttributeNode(notiz_type);
document.getElementsByTagName('head')[0].appendChild(notiz_script);