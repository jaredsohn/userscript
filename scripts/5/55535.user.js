// ==UserScript==
// @name          Fluid boingboing.net
// @namespace     http://userscripts.org/users/103468
// @description   de-minimum-width and simplify boingboing.net
// @include       http://boingboing.net/*
// @include       http://*.boingboing.net/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/55535
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
	//Remove widths
	"div#content, div#adunit-leaderboard, div#wrap, div#navigation-site, div#navigation .divitis, div#footer .divitis, div.entry-footer, div.entry-footer-discuss, .entry-footer-discuss a, div.comment-header { width:100% }",

	//Remove padding
	"div.divitis, div#adunit-leaderboard, div#wrap, div#navigation-site, div.entry, h3, div.entry-meta, div.entry-body, div.entry-footer, div.entry-footer-discuss, .entry-footer-discuss a, .entry-body img { padding:0 }",

	//Remove margin
	"div#section-logo, h3, div.entry-metadata, div.entry-footer, p, form#comments-form, div.comment-content { margin:0 }",

	//Adds margin
	"h3.entry-header { margin-top:20px }",

	//Centers stuff
	"div#section-logo, div.entry-footer, h3.entry-header, div.entry-meta { text-align:center }",

	//Minimizes footer
	".entry-footer-discuss a { background-image:none }",

	//Remove heights
	"div.entry-footer-discuss { height:auto }",

	//Hide a bunch of stuff
	"div#adunit-leaderboard, div#sidebar, div#footer, div#search, div.entry-footer-tags, div.entry-footer-favorites, div.entry-footer-share, a.permalink, span.separator, div.content-nav-entry, h2.comments-open-header, div#comment-greeting, div#comments-open-text label, h3.comments-header, span.comment-moderate { display:none }",
].forEach(function(s) {GM_addStyle(s.makeImportant());}); // Adds the styles from the style array to the page, making them important
