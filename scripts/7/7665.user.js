// ==UserScript==
// @name           Facebook - Bearable Group Editor
// @namespace      http://www.facebook.com
// @description    Makes the Facebook group editor textboxes larger. 
// @author  Alan Kelly
// @version 1.0
// @include        *http://*.facebook.com/editgroup.php?*
// ==/UserScript==

// Based on the Bearable Facebook Wall Post script by Gavin Paul

document.getElementById("main_blurb").rows = 18;
document.getElementById("main_blurb").cols = 56;
document.getElementById("sec_blurb").rows = 18;
document.getElementById("sec_blurb").cols = 56;