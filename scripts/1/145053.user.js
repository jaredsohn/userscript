// ==UserScript==
//
// @name           Facepunch Oify Music Player
//
// @description    Brings the old music back
//
// @author         neokabuto
//
// @version        1.1
//
// @match http://*.facepunch.com/*
// @match http://facepunch.com/*
//
// @history        1.0 first version
// @history        1.1 uses new source for HTML5 compliant music that is actually all of the music and not just one song
//
// ==/UserScript==


var element = document.getElementById("header");

if (element.innerHTML.indexOf("OIFY: Hottest Place on the Web") != -1){

	findbody = document.getElementsByTagName('body')[0];
	
	newobj = document.createElement('table');
	newobj.innerHTML = '<tr><td>'+
'<audio loop="loop" autoplay="autoplay">'+
  '<source src="http://elexar.com/oify/music/musicOGG.php" type="audio/ogg" />'+
  '<source src="http://elexar.com/oify/music/musicWAV.php" type="audio/wav" />'+
'</audio>'+
'		</td></tr>';
	findbody.appendChild( newobj );
}