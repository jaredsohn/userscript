// ==UserScript==
// @name           PlayStation Community Forums - Enable Native Spellcheck
// @description    This script will allow your browser or other client-side spellchecker to run normally when replying to a post or starting a new thread. 
// @namespace      http://localhost
// @include        http://community.us.playstation.com/*
// ==/UserScript==

var frame = document.getElementById('tinyMceEditor_ifr')

if(frame !== null)
{
	frame.contentDocument.getElementById('tinymce').setAttribute("spellcheck","true")
}