// ==UserScript==
// @name		Stammenforum vs dorpslinks
// @version		0.2.0
// @description		Wanneer je op een dorp in bb-codes klikt op je dorpsoverzicht blijf je in het huidige dorp
// @author		Furiosix
// @include		http://nl*.tribalwars.nl/forum.php*
// @include		http://nl*.tribalwars.nl/game.php*mode=forum*
// @include		http://nl*.tribalwars.nl/staemme.php*mode=forum*
// ==/UserScript==

Forum();

function Forum(){
	if(/mode=forum/.test(document.location.href)){
		FLinkForum();
	}
	else{
		VLinkForum();
	}
}

function FLinkForum(){
	var tForum = document.location.href.match(/t=\d+/);	
	if(tForum){
		var nodeForum = document.getElementsByTagName('a');
		for(var iForum = 0; iForum < nodeForum.length; iForum++){
			if(/forum/.test(nodeForum[iForum].getAttribute('href'))){
				nodeForum[iForum].setAttribute('href', nodeForum[iForum].getAttribute('href') + '?' + tForum[0]);
			}
		}
	}
}

function VLinkForum(){
	var villageForum = parent.location.href.match(/village=\d+/);
	villageForum = (villageForum) ? (villageForum[0] + '&') : '';
	var nodeForum = document.getElementsByTagName('a');
	for(var iForum = 0; iForum < nodeForum.length; iForum++){
		nodeForum[iForum].setAttribute('href', nodeForum[iForum].getAttribute('href').replace(/([?&])&/, '$1' + villageForum));
	}
}