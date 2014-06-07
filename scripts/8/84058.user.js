// Google Images Panel Hider
// by Adit Saxena

// history:
// 1.3          improved google domain 'ads by google' table removal, all old code replaced
// 1.2		bug fixes for old code, removed inline div ads from searches
//		optimised and replaced most old code, disabled 'toolbar/desktop' code (unneeded?)
// 1.1 		new code for google search
// 1.0 		base code fork

// ==UserScript==
// @name           googleImagesPanelHider
// @namespace      googleimagespanelhider
// @include        http://*.google.*/imgres?*
// ==/UserScript==

// get frame, duplicate the close button, move it on the right (margin-left:0px), onclick hide the whole modal window thing
document.getElementById('il_ic').innerHTML+="<a title=\"Hide this panel\" onclick=\"document.getElementById('il_fic').style.display = 'none';\" style=\"margin-left: 0px;\" class=\"close_lk\"><i class=\"close_btn\" ></i></a>";

// google disables scrolling by default
document.getElementById('il_f').scrolling = "yes";

