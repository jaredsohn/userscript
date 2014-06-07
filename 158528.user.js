// ==UserScript==
// @name			Rescue Console
// @description		Rescues the console at website refresh to prevent overwriting by the website.
// @namespace		RescueConsole
// @author			Tobbe
// @version			1.0
//
// @include			*
// 
// @run-at			document-start
//
// @grant			none
// ==/UserScript==

// Store the console to debugConsole to prevent overwriting by the website.
window.debugConsole = window.console;