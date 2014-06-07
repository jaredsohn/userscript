// ==UserScript==
// @name           Oh god, the bees!
// @namespace      TechSmurfey@gmail.com
// @description    Bees. Bees everywhere! Augh!
// @include        *kingdomofloathing.com/desc_item.php*
// @include        *kingdomofloathing.com/showplayer.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/choice.php*
// @include        *kingdomofloathing.com/adventure.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/charsheet.php*
// @include        *kingdomofloathing.com/galaktik.php*
// @include        *kingdomofloathing.com/cafe.php*
// ==/UserScript==

//Version 1.0  Hacked apart the April 1, 2008 script and reassembled its corpse. With BEES.

																							Salad = window.location.pathname;

if (Salad == "/login.php" || Salad == "/maint.php" || Salad == "/logout.php") {
	salads = document.getElementsByTagName('img');
	for (var dressing=0;dressing<salads.length;dressing++) {
		if(salads[dressing].src.match(/\/leftswordguy\.gif/)) {
			salads[dressing].src = 'http://img121.imageshack.us/img121/457/beez.gif';
		}
		else if(salads[dressing].src.match(/\/rightswordguy\.gif/)) {
			salads[dressing].src = 'http://img121.imageshack.us/img121/457/beez.gif';
		}
	}
}
else {
	salads = document.getElementsByTagName('img');
	for (var lettuce=0;lettuce<salads.length;lettuce++) {
		if(lettuce==0 && (Salad == "/charpane.php" || Salad == "/showplayer.php" || Salad == "/charsheet.php")) {
			salads[lettuce].src = 'http://img121.imageshack.us/img121/457/beez.gif';
		}
		else if (salads[lettuce].src.match(/\/trophy\//) || salads[lettuce].src.match(/\/sigils\//)) {}
		else if ((Salad == "/store.php" || Salad=="/cafe.php" || Salad=="/galaktik.php") && lettuce==0) {}
		else {
			salads[lettuce].src = 'http://img121.imageshack.us/img121/457/beez.gif';
		}
	}
}

if (Salad == "/desc_item.php") {
	saladNodes = document.evaluate('//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	saladNode = saladNodes.snapshotItem(4);
	saladNode.data = saladizeText(saladNode.data);
}

if (Salad == "/fight.php") {
	radish = document.getElementById('monpic');
	radish.src = 'http://img121.imageshack.us/img121/457/beez.gif';
}

if (Salad == "/choice.php") {
	spinach = document.evaluate('//form[@action="choice.php"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	spinach.parentNode.parentNode.getElementsByTagName('p').textContent = saladizeText(spinach.parentNode.parentNode.getElementsByTagName('p').textContent);
}

if (Salad == "/adventure.php") {
	romaine = document.evaluate('//blockquote//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (radichio=0;radichio<romaine.snapshotLength;radichio++) {
		romaine.snapshotItem(radichio).data = saladizeText(romaine.snapshotItem(radichio).data);
	}
}