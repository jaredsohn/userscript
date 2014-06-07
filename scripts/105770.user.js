// ==UserScript==

// @name           Newgrounds De-modder

// @namespace      demodder@snakehole.net

// @description    Demods All the Mods on Newgrounds by giving them their regular level icons

// @include        *.newgrounds.com/*

// ==/UserScript==



stats = document.getElementsByClassName('userstats');
mods = document.getElementsByClassName('moderator');

var re=/[F].gif/; // set regexp





for (i=0; i<stats.length; i++) {

if (stats[i].getElementsByTagName('img')[0].src.match(re) != null){

	if (stats[i].innerHTML.match(/(FAB)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'N.gif');

	}

	}

}

if (document.getElementById('ulevel') != null){


	if (document.getElementById('ulevel').innerHTML.match(/(Fab)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'N.gif');

	}

}