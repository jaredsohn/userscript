// ==UserScript==
// @name           Pokec.sk - odstranenie slov a smajlikov
// @namespace      http://
// @description    Odstranenie nezelanych slov a smajlikov zo skla pokecu
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2013-05-05
// @author         Marvin-HOG (MaxSVK)
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var oldStrings = new Array(
	'<img src="http://s.aimg.sk/chat/css/smileys/113.gif">',
	'qwertyuiop',
	'asdfghjkl',
	'zxcvbnm'
	);

var newStrings = new Array(
	'(blikajuci-smajlik)<img>',
	'(removed)',
	'(removed)'
	);

var newStringDefault = "((removed))";

/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var sklo = document.getElementById("sklo");
sklo.addEventListener('DOMNodeInserted', function(event) {

	var prispevok;
	var textPrispevku;
	var replacingString;

	var prispevky = event.relatedNode.getElementsByClassName("prispevok");

	for(var num=0; num < prispevky.length; num++) {

		prispevok = prispevky[num];
		textPrispevku = prispevok.innerHTML;
		
		for(var numb=0; numb < oldStrings.length; numb++) {
			if(textPrispevku.indexOf(oldStrings[numb]) > -1) {

				if(!newStrings[numb]) {
					replacingString = newStringDefault;
				} else {
					replacingString = newStrings[numb];
				}

				prispevok.innerHTML = textPrispevku.replace(oldStrings[numb], replacingString);
			}
		}

	}

}, true);