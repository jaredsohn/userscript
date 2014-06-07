// ==UserScript==
// @name          Fluid hardocp.com
// @namespace     http://userscripts.org/users/103468
// @description   de-minimum-width simplify hardocp.com
// @include       http://hardocp.com/*
// @include       http://*.hardocp.com/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/57281
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
	"div#outercontainer, div#contentbody, div#featured a { width:100% }",

	//Reset positioning
	"h1, div#sitenav, ul.mainnav { position:static }",

	//Remove padding
	"div#contentbody, div#featured li, div#featured a, div#hardnews h4, div.story { padding:0 }",

	//Remove margin
	"div#contentbody, div#featured, div#featured h2, div#featured li, div#featured img, div#featured strong, div#featured span, div#hardnews h2, div#hardnews h4, div.story p, div.story blockquote { margin:0 }",

	//Remove border
	"div#outercontainer, div#featured a { border:0 }",

	//Floats menu
	"div.mainmenu { float:left }",

	//Centers stuff
	"div#featured { text-align:center }",

	//Remove heights
	"div#header { height:auto }",

	//Hide a bunch of stuff
	"div.ad, div.poweredby, div#tagline, div.currentdate, div#sidebars, div#footer, div.ad5, div#announcements { display:none }",
].forEach(function(s) {GM_addStyle(s.makeImportant());}); // Adds the styles from the style array to the page, making them important
