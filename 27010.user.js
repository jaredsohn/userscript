// ==UserScript==
// @name           ImageBanana - BBCode to Lower-Case
// @namespace      http://userscripts.org/users/43176/scripts
// @description    Thumbnail for Boards (1) to lower-case due to incompatibility with some forums
// @include        http://www.imagebanana.com/code/*
// ==/UserScript==


var inputfield = document.getElementsByTagName('input')
var bbcode = inputfield[1].value
var bbcode_hotlink1 = inputfield[7].value
var bbcode_hotlink2 = inputfield[8].value


bbcode = bbcode.replace(/\[URL=(.+)\]\[IMG\](.+)\[\/IMG\]\[\/URL\]/g,"[url=$1][img]$2[\/img][\/url]");

inputfield[1].value = bbcode;


if (bbcode_hotlink1 !== undefined)
{
	bbcode_hotlink1 = bbcode_hotlink1.replace(/\[URL=.+\]\[IMG\](.+)\[\/IMG\]\[\/URL\]/g,"[img]$1[\/img]");
	inputfield[7].value = bbcode_hotlink1;
}

if (bbcode_hotlink2 !== undefined)
{
	bbcode_hotlink2 = bbcode_hotlink2.replace(/\[url=.+\]\[img=(.+)\]\[\/url\]/g,"[img=$1]");
	inputfield[8].value = bbcode_hotlink2;
}