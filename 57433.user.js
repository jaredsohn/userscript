// ==UserScript==
// @name          Grammar Tidy
// @namespace     http://userscripts.org/users/103468
// @description   Fixes the grammar of the internet
// @include       http://www.head-fi.org/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/57433
// @license       Creative Commons Attribution 3.0 United States; http://creativecommons.org/licenses/by/3.0/us/
// @copyright     2009+, aoxyjvwdfkbs (http://userscripts.org/users/103468)
// @attribution   Jonathan Buchanan (http://userscripts.org/scripts/show/11275)
// @version       10 Sep 2009
// ==/UserScript==
// Uses some code from http://userscripts.org/scripts/show/11275
var ciReplacements, csReplacements, nonWordReplacements, xPathResult, textNode, key, regex, nodeData;
regex = {};

// Case Insensitive
ciReplacements = {
	"could[a-z]*[']*[a-z]* care less":"do not care",
	"case [a-z]* point":"",
	"oversight":"oversight",
	"ulterior":"ulterior",
	"the":"the",
	"sentence":"sentence",
	"sequel":"sequel",
	"definitely":"definitely",
	"arguments":"arguments",
	"ridiculous":"ridiculous",
	"grammar":"grammar",
	"would have":"would have",
	"could have":"could have",
	"should have":"should have",
	"must have":"must have",
	"a lot":"a lot",
	"in fact":"in fact",
	"(also|p.s.)[,]* hi[a-z]* [a-z]*":"",
	"[ ]*to a (t|tee)":""
};

for ( key in ciReplacements ) {
	regex[key] = new RegExp( "\\b" + key + "\\b", "i" );
}

// Case Sensitive
csReplacements = {
	"I'm":"I'm",
	"i'":"I'",
	"^i\\s":"I ",
	"\\si\\s":" I ",
	"\\si$":" I"
};

for ( key in csReplacements ) {
	regex[key] = new RegExp( "\\b" + key + "\\b" );
}

nonWordReplacements = {
	"!(?:[!]|one)+":"!" // Replaces ! style exclamations with a single !
};

for ( key in nonWordReplacements ) {
	regex[key] = new RegExp( key, "i" );
}

xPathResult = document.evaluate(
	'.//text()[normalize-space(.) != ""]',
	document.body,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for ( var i = 0, l = xPathResult.snapshotLength; i < l; i++ ) {
	textNode = xPathResult.snapshotItem(i);
	nodeData = textNode.data;
	for ( key in ciReplacements ) {
		nodeData = nodeData.replace( regex[key], ciReplacements[key] );
	}
	for ( key in csReplacements ) {
		nodeData = nodeData.replace( regex[key], csReplacements[key] );
	}
	for ( key in nonWordReplacements ) {
		nodeData = nodeData.replace( regex[key], nonWordReplacements[key] );
	}
	textNode.data = nodeData;
}
