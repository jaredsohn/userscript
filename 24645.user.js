// ==UserScript==
// @name           All Salad, All the Time
// @namespace      hunsley@gmail.com
// @description    Lets you salad the April 1, 2008 salad.
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

//Version 1.1  Repaired broken saladization on fight.php and adventure.php
//Version 1.2  Repaired idiotic mistake from 1.1
																							Salad = window.location.pathname;

if (Salad == "/login.php" || Salad == "/maint.php" || Salad == "/logout.php") {
	salads = document.getElementsByTagName('img');
	for (var dressing=0;dressing<salads.length;dressing++) {
		if(salads[dressing].src.match(/\/leftswordguy\.gif/)) {
			salads[dressing].src = 'http://images.kingdomofloathing.com/otherimages/leftsaladguy.gif';
		}
		else if(salads[dressing].src.match(/\/rightswordguy\.gif/)) {
			salads[dressing].src = 'http://images.kingdomofloathing.com/otherimages/rightsaladguy.gif';
		}
	}
}
else {
	salads = document.getElementsByTagName('img');
	for (var lettuce=0;lettuce<salads.length;lettuce++) {
		if(lettuce==0 && (Salad == "/charpane.php" || Salad == "/showplayer.php" || Salad == "/charsheet.php")) {
			salads[lettuce].src = 'http://images.kingdomofloathing.com/otherimages/saladvatar.gif';
		}
		else if (salads[lettuce].src.match(/\/trophy\//) || salads[lettuce].src.match(/\/sigils\//)) {}
		else if ((Salad == "/store.php" || Salad=="/cafe.php" || Salad=="/galaktik.php") && lettuce==0) {}
		else {
			salads[lettuce].src = 'http://images.kingdomofloathing.com/itemimages/salad.gif';
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
	radish.src = 'http://images.kingdomofloathing.com/adventureimages/bigsalad.gif';

	carrots = document.evaluate('//blockquote//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (olive=0;olive<carrots.snapshotLength;olive++) {
		carrots.snapshotItem(olive).data = saladizeText(carrots.snapshotItem(olive).data);
	}

	feta = document.evaluate('//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (iceberg=0;iceberg<feta.snapshotLength;iceberg++) {
		feta.snapshotItem(iceberg).data.replace(/ankle|arm|arse/,'grated cheese');
		feta.snapshotItem(iceberg).data.replace(/bung|calf|ear|elbow/,'cherry tomato');
		feta.snapshotItem(iceberg).data.replace(/eye|face|foot|forehead/,'fresh ground pepper');
		feta.snapshotItem(iceberg).data.replace(/giblets|groin|head/,'Romaine lettuce');
		feta.snapshotItem(iceberg).data.replace(/kidney|knee|leg/,'sliced tomato');
		feta.snapshotItem(iceberg).data.replace(/lower back|neck|nipple/,'Ranch dressing');
		feta.snapshotItem(iceberg).data.replace(/shins|shoulder|skull/,'raspberry vinaigrette');
		feta.snapshotItem(iceberg).data.replace(/solar plexus|thigh|throat/,'garlic crouton');
	}
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

function saladizeText(txt) {
	var saladArray = txt.split(' ');
	var saladTxt = '';
	var celery = rand(4) + 6;
	for (tomato=0;tomato<saladArray.length;tomato++) {
		if(rand(celery)==1) {
			saladTxt += saladizeWord(saladArray[tomato]);
		}
		else {
			saladTxt += (saladArray[tomato] + ' ');
		}
	}

	return saladTxt;
}

function saladizeWord(word) {
	if(word.match(/^[A-Z]/)) {
		return word.replace(/[a-zA-Z']*/,'Salad') + ' ';
	}
	else {
		return word.replace(/[a-zA-Z']*/,'salad') + ' ';
	}
}

function rand ( n )
{
  return ( Math.floor ( Math.random ( ) * n + 1 ) );
}
