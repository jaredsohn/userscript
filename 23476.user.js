// ==UserScript==
// @name           Class checker
// @namespace      hunsley@gmail.com
// @description    Shows a player's class on their profile page, even if they have a custom title
// @include        *kingdomofloathing.com/showplayer.php*
// ==/UserScript==

//Version 1.0	3/2/2008	First release (and only, unless there's some huge bug I don't know about)
//Version 1.1     3/5/2008    There was a huge bug I didn't know about :(

textNodes = document.evaluate('//table//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
playerName = textNodes.snapshotItem(1).textContent;
levelOrTitle = textNodes.snapshotItem(3).textContent;
var title,titleNode,level;
if(levelOrTitle.match(/^Level \d+$/)) {
	titleNode = textNodes.snapshotItem(4);
	level = parseInt(levelOrTitle.replace(/[^\d]/g,''));
}
else {
	titleNode = textNodes.snapshotItem(3);

	//Check for (Level X) after title
	fourthNode = textNodes.snapshotItem(4).textContent;
	if(fourthNode.match(/^\(Level \d+\)$/)) {
		level = parseInt(fourthNode.replace(/[^\d]/g,''));
	}
	else {
		level = parseInt(titleNode.textContent.replace(/[^\d]/g,''));
	}
}
title = titleNode.textContent;

if (playerName == "JHunz") {
	classTextNode = document.createTextNode('Lord of All He Surveys');
	brNode = document.createElement('br');
	titleNode.parentNode.insertBefore(classTextNode,titleNode.nextSibling);
	titleNode.parentNode.insertBefore(brNode,titleNode.nextSibling);
	return false;
}

if(title.match(/^Lemming Trampler|Tern Slapper|Puffin Intimidator|Ermine Thumper|Penguin Frightener|Malamute Basher|Narwhal Pummeler|Otter Crusher|Caribou Smacker|Moose Harasser|Reindeer Threatener|Ox Wrestler|Walrus Bludgeoner|Whale Boxer|Seal Clubber|Toad Coach|Skink Trainer|Frog Director|Gecko Supervisor|Newt Herder|Frog Boss|Iguana Driver|Salamander Subduer|Bullfrog Overseer|Rattlesnake Chief|Crocodile Lord|Cobra Commander|Alligator Subjugator|Asp Master|Turtle Tamer|Dough Acolyte|Yeast Scholar|Noodle Neophyte|Starch Savant|Carbohydrate Cognoscenti|Spaghetti Sage|Macaroni Magician|Vermicelli Enchanter|Linguini Thaumaturge|Ravioli Sorcerer|Manicotti Magus|Spaghetti Spellbinder|Cannelloni Conjurer|Angel-Hair Archmage|Pastamancer|Allspice Acolyte|Cilantro Seer|Parsley Enchanter|Sage Sage|Rosemary Diviner|Thyme Wizard|Tarragon Thaumaturge|Oreganoccultist|Basillusionist|Coriander Conjurer|Bay Leaf Brujo|Sesame Soothsayer|Marinara Mage|Alfredo Archmage|Sauceror|Funk Footpad|Rhythm Rogue|Chill Crook|Jiggy Grifter|Beat Snatcher|Sample Swindler|Move Buster|Jam Horker|Groove Filcher|Vibe Robber|Boogie Brigand|Flow Purloiner|Jive Pillager|Rhymer And Stealer|Disco Bandit|Polka Criminal|Mariachi Larcenist|Zydeco Rogue|Chord Horker|Chromatic Crook|Squeezebox Scoundrel|Concertina Con Artist|Button Box Burglar|Hurdy-Gurdy Hooligan|Sub-Sub-Apprentice Accordion Thief|Sub-Apprentice Accordion Thief|Pseudo-Apprentice Accordion Thief|Hemi-Apprentice Accordion Thief|Apprentice Accordion Thief|Accordion Thief$/i)) {
	//standard title, exiting
	return false;
}

tmp = GM_getValue('classCache','UNDEFINED');
if (tmp == 'UNDEFINED') {
	tmp = '{"JHunz":{"class":"Lord of All He Surveys","level":11}}';
	GM_setValue('classCache',tmp);
}
classes = eval('('+tmp+')');
var inserted = 'false',classTextNode;
if(classes[playerName] && level >= classes[playerName].level) {
	//alert("cached class is "+classes[playerName].class+"\ncached level is "+classes[playerName].level);
	classTextNode = document.createTextNode(classes[playerName].class + '?');
	brNode = document.createElement('br');
	titleNode.parentNode.insertBefore(classTextNode,titleNode.nextSibling);
	titleNode.parentNode.insertBefore(brNode,titleNode.nextSibling);
	inserted = 'true';
}
else {
	classTextNode = document.createTextNode('');
	brNode = document.createElement('br');
}

url = 'http://' + document.domain + '/searchplayer.php?';
dataString = 'searching=Yep.&searchstring='+playerName;
GM_xmlhttpRequest({
	method:'POST',
	url:url,
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data:encodeURI(dataString),
	onload:addClass
});

function addClass(response) {
	responseText = response.responseText;
	className = readClass(responseText);
	classTextNode.textContent = className;
	if (inserted == 'false') {
		titleNode.parentNode.insertBefore(classTextNode,titleNode.nextSibling);
		titleNode.parentNode.insertBefore(brNode,titleNode.nextSibling);
	}
	if(!classes[playerName]) {
		//adding to cache
		tmp = tmp.replace(/}}/,'},"'+playerName+'":{"class":"'+className+'","level":'+level+'}}');
	}
	else {
		//replacing in cache
		tempArray = eval('({"class":"'+className+'","level":'+level+'})');
		classes[playerName] = tempArray;
		tmp = classesToString();
	}
	GM_setValue('classCache',tmp);
}

function readClass(txt) {
	var holder=document.createElement('html');
	holder.innerHTML=txt;
//	var textResults = document.evaluate('.//u[.="PlayerID"]/ancestor::table[1]//text()',holder, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var textResults = document.evaluate('.//a[.="'+playerName+'"]/ancestor::tr[1]//text()',holder, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(textResults.snapshotLength > 0) {
		className = textResults.snapshotItem(textResults.snapshotLength-1).textContent;
		return className;
	}
	return 'unknown class';
}
		
function classesToString () {
	str = '{';
	for (key in classes) {
		str += '"'+key+'":{"class":"'+classes[key].class+'","level":'+classes[key].level+'},';
	}
	str = str.replace(/,$/,'}');
	return str;
}