// ==UserScript==
// @name           oldschool bender v2
// @namespace      http://userscripts.org/users/33073/scripts
// @description    Neue Bender -> Alte bender (mit schnell!)
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==


// bender

const bender_snow = "avatare/oldb/snow.gif";
const bender_female = "avatare/oldb/biggy.gif";
const bender_leet = "avatare/oldb/terror.gif";
const bender_ct = "http://www.cstrike.de/content/general/benderarchiv/archiv/zeichner/bender/cimbernbender/ct.gif";


// xpath

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}


// array aus bendern -> return expr

function bender(bender) {
	var expr = "//img[";
	for (var i=0; i<bender.length; i++) {
		expr += "contains(@src, '"+bender[i]+".gif') or ";
	}
	return $x(expr.replace(/\s*or\s*$/, "")+"]");
}


// urls anpassen

var snows = bender(["arctic", "arctic-xmas", "russe", "nasemarine"]);
snows.forEach(function(snow) {
	snow.src = bender_snow;
});

var females = bender(["female_medic", "leetf2", "female3", "female_gue", "female_leet", "arcticf", "phoenixf", "leetf"]);
females.forEach(function(female) {
	female.src = bender_female;
});

var leets = bender(["german", "guerilla", "japanese", "nasemarine2", "phoenix", "sniper", "modsgorge", "nasegorge", "arctic_xmas", "leet_xmas", "leet", "gordon4", "mr_crow", "ut_malcom"]);
leets.forEach(function(leet) {
	leet.src = bender_leet;
});

var cts = bender(["gign_xmas", "modgign", "modgsg9", "modusa", "modsniperbf"]);
cts.forEach(function(ct) {
	ct.src = bender_ct;
});