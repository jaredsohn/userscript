// ==UserScript==
// @name           Alice's Army Card Rarity
// @namespace      none
// @description    Put rarity on Alice's Army Cards
// @include        http://www*.kingdomofloathing.com/mallstore.php
// @include	   http://www*.kingdomofloathing.com/searchmall.php
// @include	   http://www*.kingdomofloathing.com/inventory.php
// @include	   http://www*.kingdomofloathing.com/*.php
// ==/UserScript==


(function() {
    if(document.getElementsByTagName("body")[0].innerHTML.indexOf("Alice's Army") == -1) {
	return;
    }
    if(document.location.pathname.indexOf("*.php") == -1) {
	// inventory
	var elems = document.getElementsByTagName("b");
	var elem;
	for(elem in elems) {
	    if(elems[elem].innerHTML.indexOf("Alice's Army") != -1) {
		var pageText = elems[elem].innerHTML;
		pageText = pageText.replace("Alice's Army Alchemist", "Alice's Army Alchemist (Common)");
		pageText = pageText.replace("Alice's Army Foil Alchemist", "Alice's Army Foil Alchemist (Common)");
		pageText = pageText.replace("Alice's Army Guard", "Alice's Army Guard (Common)");
		pageText = pageText.replace("Alice's Army Halberder", "Alice's Army Halberder (Common)");
		pageText = pageText.replace("Alice's Army Mad Bomber", "Alice's Army Mad Bomber (Common)");
		pageText = pageText.replace("Alice's Army Ninja", "Alice's Army Ninja (Common)");
		pageText = pageText.replace("Alice's Army Nurse", "Alice's Army Nurse (Common)");
		pageText = pageText.replace("Alice's Army Page", "Alice's Army Page (Common)");
		pageText = pageText.replace("Alice's Army Shieldman", "Alice's Army Shieldman (Common)");
		pageText = pageText.replace("Alice's Army Shieldmaiden", "Alice's Army Shieldmaiden (Common)");
		pageText = pageText.replace("Alice's Army Spearsman", "Alice's Army Spearsman (Common)");
		pageText = pageText.replace("Alice's Army Swordsman", "Alice's Army Swordsman (Common)");
		pageText = pageText.replace("Alice's Army Wallman", "Alice's Army Wallman (Common)");
		pageText = pageText.replace("Alice's Army Bowman", "Alice's Army Bowman (Uncommon)");
		pageText = pageText.replace("Alice's Army Cleric", "Alice's Army Cleric (Uncommon)");
		pageText = pageText.replace("Alice's Army Coward", "Alice's Army coward (Uncommon)");
		pageText = pageText.replace("Alice's Army Hammerman", "Alice's Army Hammerman (Uncommon)");
		pageText = pageText.replace("Alice's Army Horseman", "Alice's Army Horseman (Uncommon)");
		pageText = pageText.replace("Alice's Army Lanceman", "Alice's Army Lanceman (Uncommon)");
		pageText = pageText.replace("Alice's Army Dervish", "Alice's Army Dervish (Rare)");
		pageText = pageText.replace("Alice's Army Martyr", "Alice's Army Martyr (Rare)");
		pageText = pageText.replace("Alice's Army Sniper", "Alice's Army Sniper (Rare)");
		pageText = pageText.replace("Alice's Army Foil Guard", "Alice's Army Foil Guard (Common)");
		pageText = pageText.replace("Alice's Army Foil Halberder", "Alice's Army Foil Halberder (Common)");
		pageText = pageText.replace("Alice's Army Foil Mad Bomber", "Alice's Army Foil Mad Bomber (Common)");
		pageText = pageText.replace("Alice's Army Foil Ninja", "Alice's Army Foil Ninja (Common)");
		pageText = pageText.replace("Alice's Army Foil Nurse", "Alice's Army Foil Nurse (Common)");
		pageText = pageText.replace("Alice's Army Foil Page", "Alice's Army Foil Page (Common)");
		pageText = pageText.replace("Alice's Army Foil Shieldman", "Alice's Army Foil Shieldman (Common)");
		pageText = pageText.replace("Alice's Army Foil Shieldmaiden", "Alice's Army Foil Shieldmaiden (Common)");
		pageText = pageText.replace("Alice's Army Foil Spearsman", "Alice's Army Foil Spearsman (Common)");
		pageText = pageText.replace("Alice's Army Foil Swordsman", "Alice's Army Foil Swordsman (Common)");
		pageText = pageText.replace("Alice's Army Foil Wallman", "Alice's Army Foil Wallman (Common)");
		pageText = pageText.replace("Alice's Army Foil Bowman", "Alice's Army Foil Bowman (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Cleric", "Alice's Army Foil Cleric (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Coward", "Alice's Army Foil coward (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Hammerman", "Alice's Army Foil Hammerman (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Horseman", "Alice's Army Foil Horseman (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Lanceman", "Alice's Army Foil Lanceman (Uncommon)");
		pageText = pageText.replace("Alice's Army Foil Dervish", "Alice's Army Foil Dervish (Rare)");
		pageText = pageText.replace("Alice's Army Foil Martyr", "Alice's Army Foil Martyr (Rare)");
		pageText = pageText.replace("Alice's Army Foil Sniper", "Alice's Army Foil Sniper (Rare)");
		elems[elem].innerHTML = pageText;
	    }
	}
    } 
}) ();