// ==UserScript==
// @name			Starfish Macro Summary
// @description		By NatNit
// @include			*kingdomofloathing.com/fight.php
// @include			*127.0.0.1:*/fight.php
// @exclude			*forums.kingdomofloathing.com*
// ==/UserScript==

var imgs = document.getElementsByTagName('img');

var meat = 0;
var hp = 0;
var mp = 0;

var imgSrc = 'http://images.kingdomofloathing.com/itemimages/';
var meatSrc = imgSrc + 'meat.gif';
var hpSrc = imgSrc + 'hp.gif';
var mpSrc = imgSrc + 'mp.gif';

function imgToValue(img) {
	// Contains info about gain/lose and how much
	var txt = img.parentNode.nextSibling.innerHTML;
	
	var number = new RegExp('[0-9]+');
	var losegain = new RegExp('lose|gain','i');
	
	var value = number.exec(txt);
	if (!value) {
		return 0;
	}
	
	// Negate if it has been lost
	value = Number(value);
	if (losegain.exec(txt) == 'lose') {
		value = -value;
	}
	
	// Don't count meat gained at end of combat
	var winner = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML
	if (winner.indexOf('You win the fight!<!--WINWINWIN-->') == 0) {
		value = 0;
	}
	return value;
}

for (i = 0; i < imgs.length; i++) {
	img = imgs[i];
	
	if (!img.getAttribute('src')) {
		continue;
	}
	
	src = img.getAttribute('src');
	
	if (src == meatSrc) {
		meat += imgToValue(img);
	}
	else if (src == hpSrc) {
		hp += imgToValue(img);
	}
	else if (src == mpSrc) {
		mp += imgToValue(img);
	}
}

var centerTags = document.getElementsByTagName('center');
var replace = null;

for (i = 0; i < centerTags.length; i++) {
	if (centerTags[i].innerHTML.indexOf('You win the fight!<!--WINWINWIN-->') == 0) {
		replace = centerTags[i];
		break;
	}
}

if (replace) {
	replace.innerHTML =
		'<table frame=\'border\'>' + 
			'<tr>' +
				'<th colspan=\'3\'>Macro Summary</th>' +
			'</tr>' +
			'<tr>' +
				'<td>' + meat + '<img src=\"' + meatSrc + '\" height=20 width=20 alt=\"Meat\"></img></td>' +
				'<td>' + hp + '<img src=\"' + hpSrc + '\" height=20 width=20></img></td>' +
				'<td>' + mp + '<img src=\"' + mpSrc + '\" height=20 width=20></img></td>' +
			'</tr>' +
		'</table>' + 
		'<br>' + 
		replace.innerHTML;
}