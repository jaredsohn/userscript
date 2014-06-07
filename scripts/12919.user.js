// ==UserScript==
// @name          Something Awful Forums - Uncensor
// @version       2012-08-07
// @namespace     none.m31.uncensor
// @updateURL     https://userscripts.org/scripts/source/12919.meta.js
// @description   Uncensor the Something Awful forums when not logged in.
// @include       http://forums.somethingawful.com/*
// ==/UserScript==

var sa_word_filter = {
	"rear end": "ass",
	"rear end in a top hat": "asshole",
	"gently caress": "fuck",
	"hosed": "fucked",
	"loving": "fucking",
	"poo poo": "shit",
//	"lovely": "shitty",
	"making GBS threads": "shitting",
	"stinkyhole": "cunt",
	"drat": "damn",
	"surprise sex": "rape",
	"enjoyable human being": "faggot",
	"friend of the family": "nigger"
};

var sa_uncensor_array = new Array();
for (word in sa_word_filter) {
	//sa_uncensor_array.push([new RegExp('(^|[A-Z] |[^\\w\\s][ ]?)'+word+'(?= [A-Z]|[^\\w\\s]|$)', 'g'), '$1' + sa_word_filter[word].toUpperCase()]);
	sa_uncensor_array.push([new RegExp('([A-Z]\s*[A-Z][^a-z.]+)' + word, 'g'), '$1' + sa_word_filter[word].toUpperCase()]);
	sa_uncensor_array.push([new RegExp(word + '(?=[^a-z.]+[A-Z]\s*[A-Z])', 'g'), sa_word_filter[word].toUpperCase()]);
	sa_uncensor_array.push([new RegExp(word, 'g'), sa_word_filter[word]]);
}

function sa_uncensor(evt) {
	var textnodes = document.evaluate(
		"//div[@id='content'][position()=last()]/descendant::td[@class='postbody']/descendant-or-self::text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		for (x in sa_uncensor_array) {
			node.data = node.data.replace(sa_uncensor_array[x][0], sa_uncensor_array[x][1]);
		}
	}
}

document.addEventListener("AutoPagerAfterInsert", sa_uncensor, true);
sa_uncensor();