// ==UserScript==
// @name          Fluid hardforum.com
// @namespace     http://userscripts.org/users/103468
// @description   simplify and compact hardforum.com
// @include       http://hardforum.com/*
// @include       http://*.hardforum.com/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/57283
// @license       Creative Commons Attribution 3.0 United States; http://creativecommons.org/licenses/by/3.0/us/
// @copyright     2009+, aoxyjvwdfkbs (http://userscripts.org/users/103468)
// @attribution   Mindeye (http://userscripts.org/scripts/show/13333)
// @version       07 Sep 2009
// ==/UserScript==
// =====================================================================================================
// BEGIN HELPER FUNCTIONS copied from YousableTubeFix by Mindeye
String.prototype.makeImportant = function() { // Adds !important to CSS rules of any type
	var Selector, DeclarationBlock, CssArray = this.match(/([^{]+)({[^{}]+})/);
	if (CssArray === null) { // Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display = "none")
		Selector = "";
		DeclarationBlock = this; }
	else { // Complete CSS rule (e.g. ".nd {display: none}")
		Selector = CssArray[1];
		DeclarationBlock = CssArray[2]; }
	if (DeclarationBlock.indexOf(":") != -1) {	// Adds !important to each rule
		DeclarationBlock = DeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g, "$& !important"); }
	else { // No estructure could be recognized, so we'll just add !important
		DeclarationBlock += " !important"; }
	// Remove any !important duplicates
	DeclarationBlock = DeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi, " !important");
	return Selector + DeclarationBlock; };
// END HELPER FUNCTIONS copied from YousableTubeFix by Mindeye
// =====================================================================================================
[ // Initiates an array with CSS styles for the script
	//Remove padding
	"div { padding:0 }",

	//Remove margin
	"body { margin:0 }",

	//Hide a bunch of stuff
	"div#google_ads_div_HF-728x90-Leaderboard, div.page br, div.smallfont, body form, td#threadtools, td#threadsearch, td.smallfont, td.tcat, span.nointelliTXT { display:none }",
].forEach(function(s) {GM_addStyle(s.makeImportant());}); // Adds the styles from the style array to the page, making them important
