// ==UserScript==
// @name           Love Song Spoilers
// @namespace      http://caigawalker.plus.com
// @include        http://127.0.0.1:*/fight.php*
// @include        http://127.0.0.1:*/inventory.php*
// @include        http://127.0.0.1:*/skills.php*
// @include        *.kingdomofloathing.com/fight.php*
// @include        *.kingdomofloathing.com/inventory.php*
// @include        *.kingdomofloathing.com/skills.php*
// @description    Version 1.1 - Adds spoilers to love songs in inventory and combat.
// ==/UserScript==

// Love Song Spoilers v1.1 by JiK4eva (#1044239)

// == Change Log: ==
// 1.1 - Removed legacy testing code. Made displayed names more consistent (e.g. myst/mys).
//       Now fires as new love songs are summoned.

(function() {
    if(document.getElementsByTagName("body")[0].innerHTML.indexOf("love song of") == -1) {
	return;
    }
    if(document.location.pathname.indexOf("fight.php") == -1) {
	// inventory
	var elems = document.getElementsByTagName("b");
	var elem;
	for(elem in elems) {
	    if(elems[elem].innerHTML.indexOf("love song") != -1) {
		var pageText = elems[elem].innerHTML;
		pageText = pageText.replace("love song of vague ambiguity", "love song of vague ambiguity (HP restore, mus)");
		pageText = pageText.replace("love song of smoldering passion", "love song of smoldering passion (MP restore, mys)");
		pageText = pageText.replace("love song of icy revenge", "love song of icy revenge (familiar weight, mox)");
		pageText = pageText.replace("love song of sugary cuteness", "love song of sugary cuteness (+meat, mus)");
		pageText = pageText.replace("love song of disturbing obsession", "love song of disturbing obsession (+items, mys)");
		pageText = pageText.replace("love song of naughty innuendo", "love song of naughty innuendo (+init, mox)");
		elems[elem].innerHTML = pageText;
	    }
	}
    } else {
	// combat
	function t(tagName) {
	    var elems = document.getElementsByTagName(tagName);
	    var elem;
	    for(elem in elems) {
		if(elems[elem].innerHTML.indexOf("love song") != -1) {
		    var pageText = elems[elem].innerHTML;
		    pageText = pageText.replace("love song of vague ambiguity", "love song of vague ambiguity (physical, HP, mus)");
		    pageText = pageText.replace("love song of smoldering passion", "love song of smoldering passion (hot, MP, mys)");
		    pageText = pageText.replace("love song of icy revenge", "love song of icy revenge (cold, fam exp, mox)");
		    pageText = pageText.replace("love song of sugary cuteness", "love song of sugary cuteness (stench, substat, mus)");
		    pageText = pageText.replace("love song of disturbing obsession", "love song of disturbing obsession (spooky, substat, mys)");
		    pageText = pageText.replace("love song of naughty innuendo", "love song of naughty innuendo (sleaze, substat, mox)");
		    elems[elem].innerHTML = pageText;
		}
	    }
	}
	t("span");   // CAB dropdown
	t("option"); // old form
    }
}) ();