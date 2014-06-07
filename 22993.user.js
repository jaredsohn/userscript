// ==UserScript==
// @name           ImageBanana - BBCode to Lower-Case
// @namespace      http://userscripts.org/users/43176/scripts
// @description    Thumbnail for Boards (1) to lower-case due to incompatibility with some forums
// @include        http://www.imagebanana.com/code/*
// ==/UserScript==


var inputfield = document.getElementsByTagName('input')
var bbcode = inputfield[1].value

bbcode = bbcode.replace(/\[URL=(.+)\]\[IMG\](.+)\[\/IMG\]\[\/URL\]/g,"[url=$1][img]$2[/img][/url]");

inputfield[1].value = bbcode;