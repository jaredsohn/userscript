// ==UserScript==
// @namespace 			http://sofanaranja.com
// @name 						Twitter Text Hack
// @description 		Replaces the fugly Lucida Grande from the new Twitter redesign with a more palatable Arial
// @author				 	bomberstudios
// @version 				1.1
// @include 				http://twitter.com/*
// ==/UserScript==

var content = document.getElementById('container');
content.style.fontFamily = "Arial";
content.style.fontSize = "11px";