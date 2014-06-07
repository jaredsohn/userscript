// ==UserScript==

// @name           Newgrounds Fab Mods

// @namespace      thenewbiesNG

// @description    Gives all mods, except icon, fab auras. Forked from SnakeArsenic's "Demod" script.

// @include        *.newgrounds.com/*

// ==/UserScript==



stats = document.getElementsByClassName('userstats');
mods = document.getElementsByClassName('moderator');

var re=/[G].gif/; // set regexp





for (i=0; i<stats.length; i++) {

if (stats[i].getElementsByTagName('img')[0].src.match(re) != null){

	if (stats[i].innerHTML.match(/(LIGHT)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'F.gif');

	}else if (stats[i].innerHTML.match(/(DARK)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'F.gif');		

	}else if (stats[i].innerHTML.match(/(EVIL)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'F.gif');

	}else if (stats[i].innerHTML.match(/(FAB)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'F.gif');

	}else if (stats[i].innerHTML.match(/(NEUTRAL)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'F.gif');

	}

	}

}

if (document.getElementById('ulevel') != null){

	if (document.getElementById('ulevel').innerHTML.match(/(Light)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'L.gif');

	}else if (document.getElementById('ulevel').innerHTML.match(/(Dark)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'D.gif');

	}else if (document.getElementById('ulevel').innerHTML.match(/(Evil)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'E.gif');

	}else if (document.getElementById('ulevel').innerHTML.match(/(Fab)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'F.gif');

	}else if (document.getElementById('ulevel').innerHTML.match(/(Neutral)/) != null){

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'N.gif');

	}

}

var links = document.getElementsByTagName('a');
for (i=0; i<links.length; i++) {
	if (links[i].className.match("moderator") != null ){
		links[i].className = null;
	}
}

var match=document.location.href.match('www.newgrounds.com');
if(match==null){
document.getElementById('ulevel').style.backgroundImage=document.getElementById('ulevel').style.backgroundImage.replace(re, 'G.gif');
}