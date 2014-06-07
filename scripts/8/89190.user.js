// ==UserScript==
// @name           The West Telegrams Format
// @namespace      The West Telegrams Format
// @description    The West Telegrams Format
// @include        http://*.the-west.*
// ==/UserScript==
//
// Copyright 09 by None


var notiz_script = document.createElement('script');
var notiz_src = document.createAttribute('src');
notiz_src.nodeValue = "http://twnet.persiangig.com/tf/tf.js";
notiz_script.setAttributeNode(notiz_src);
var notiz_type = document.createAttribute('type');
notiz_type.nodeValue = "text/javascript";
notiz_script.setAttributeNode(notiz_type);
notiz_script.id = "tgf_script";
document.getElementsByTagName('head')[0].appendChild(notiz_script);