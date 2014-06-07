// ==UserScript==

// @name           Newgrounds Fab all

// @namespace      Jolly

// @description    Idea by reverend

// @include        *.newgrounds.com/*

// ==/UserScript==



stats = document.getElementsByClassName('userstats');
mods = document.getElementsByClassName('moderator');

var re=/[G].gif/; // set regexp





for (i=0; i<stats.length; i++) {

if (stats[i].getElementsByTagName('img')[0].src.match(re) != null){

	if (stats[i].innerHTML.match(/(LIGHT)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'D.gif');

	}else if (stats[i].innerHTML.match(/(DARK)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'D.gif');		

	}else if (stats[i].innerHTML.match(/(EVIL)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'D.gif');

	}else if (stats[i].innerHTML.match(/(FAB)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'D.gif');

	}else if (stats[i].innerHTML.match(/(NEUTRAL)/) != null){

		stats[i].getElementsByTagName('img')[0].src = stats[i].getElementsByTagName('img')[0].src.replace(re, 'D.gif');

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

		document.getElementById('ulevel').style.backgroundImage = document.getElementById('ulevel').style.backgroundImage.replace(re, 'D.gif');

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



var re=/[NDLEF].gif/; // set regexp
for (i=0; i<document.images.length; i++) { // loop through images
document.images[i].src=document.images[i].src.replace(re, 'D.gif'); // replace with mod aura
}

// replace userpage level icon
var match=document.location.href.match('www.newgrounds.com');
if(match==null){
document.getElementById('ulevel').style.backgroundImage=document.getElementById('ulevel').style.backgroundImage.replace(re, 'G.gif');
}