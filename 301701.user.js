// ==UserScript==
// @name          NT24k disable validation
// @namespace     http://redlion.net/flspafford
// @description	  Disable the JavaScript validation that occurs when changes are made
// @include       /^https?://192.168.2.210$/
// @grant         none
// ==/UserScript==
//Change Log:
// January 31, 2014: Created.

if (unsafeWindow.Nt_g_bTestDV == undefined) {
	// Define the variable that, when defined, causes JavaScript validation to be bypassed.
	// This allows verification of validation checks in the switch firmware, which should be
	// similar or identical to the JavaScript validation checks.
   unsafeWindow.Nt_g_bTestDV = true;
}