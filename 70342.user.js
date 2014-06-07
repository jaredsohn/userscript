// ==UserScript==
// @name           BvS Anti-Autocomplete
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://www.animecubed.com/billy/bvs/*
// @description    Turns off Firefox' automatic form completion for some inputs.
// @include        http://animecubed.com/billy/bvs/*
// @include        http://www.animecubed.com/billy/bvs/*
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson (http://userscripts.org/users/dtkarlsson)
// ==/UserScript==

var turnOff = [
	"bonusget", // Main page bonus code
	"numbertoapp", // Shop appraise
	"numbertobuy", // Shop buy
	"numbertosell", // Shop sell
	"post_cost", // Marketplace asking price
	"post_qty", // Marketplace quantity
	"baramount", // Juice bar
	"throw1", // Big board
	"throw2", // Big board
	"throw3", // Big board
	"throw4", // Big board
	"throw5", // Big board
	"loser_entry", // First loser
]

var inputs = document.evaluate("//input[@type='text']", document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < inputs.snapshotLength; i++) {
	var name = inputs.snapshotItem(i).getAttribute("name");
	if (turnOff.indexOf(name) >= 0)
		inputs.snapshotItem(i).setAttribute("autocomplete", "off");
}
