// ==UserScript==
// @name           Easily enable and disable this script
// @namespace      http://userscripts.org/users/23652
// @description    Provides a link on the page or userscript command to enable/disable this script easily
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

if(typeof GM_getValue !== 'function' || !document || !window || top.location != window.location) {return;}

var enabled = GM_getValue("script_36067_enabled", true);

alert("The script is "  + (enabled ? "enabled" : "disabled") + ".");

function enable() {
	GM_setValue("script_36067_enabled", true); return true;
}

function disable() {
	GM_setValue("script_36067_enabled", false); return true;
}

function toggleScript() {
	var enabled = GM_getValue("script_36067_enabled", true);
	enabled ? disable() : enable();
	alert("The script is now "  + (enabled ? "disabled" : "enabled") + ".");
}

// Add enable/disable link
var a = document.createElement("a");
a.setAttribute('href', 'javascript:void(0);');
a.textContent = "Enable/Disable Script";
a.addEventListener("click", toggleScript, false);
a.setAttribute("style", "position:fixed; bottom:0; left:45%; color:#00f; background:#fff; border:1px solid #ccc; -moz-border-radius:3px; padding:2px 8px 2px 8px;");
document.body.appendChild(a);

// Add userscript command
GM_registerMenuCommand("Enable/Disable Script", toggleScript);