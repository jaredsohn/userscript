// ==UserScript==
// @name            Fakku Remove Header
// @author          GU
// @version         0.1
// @description    	remove header
// @include       	http://www.fakku.net/*/*/read
// ==/UserScript==

document.getElementsByTagName("header")[0].style.display = "none";
