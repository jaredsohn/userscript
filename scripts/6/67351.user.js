// ==UserScript==
// @name           The West Arbeitsberichteformatierer
// @namespace      The West Arbeitsberichteformatierer
// @description    The West Arbeitsberichteformatierer
// @include        http://de*.the-west.de*
// ==/UserScript==
//
// Copyright 09 by Tonda Modified 09/10 by dermorpheus
// Fuer Verbesserungsvorschläge bin ich gern zu haben.


var notiz_script = document.createElement('script');
var notiz_src = document.createAttribute('src');
notiz_src.nodeValue = "http://www.thewestonline.de/abf/abf.js";
notiz_script.setAttributeNode(notiz_src);
var notiz_type = document.createAttribute('type');
notiz_type.nodeValue = "text/javascript";
notiz_script.setAttributeNode(notiz_type);
notiz_script.id = "abf_script";
document.getElementsByTagName('head')[0].appendChild(notiz_script);