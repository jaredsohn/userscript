// ==UserScript==
// @name Travian Ad Remover
// @namespace T3
// @description Replaces travian ads with helpful links
// @include http://*.travian*.*/*.php*
// ==/UserScript==

var d = document.getElementById('dynamic_header');
d.style.setProperty('background','none',null);
d.style.setProperty('background-color','#747273',null);
d.innerHTML = 
	'<div style="color:#71D000;margin:0 0 0 5px">' + 
	'<a href="build.php?gid=16">Versammlungsplatz</a> | ' + 
	'<a href="build.php?gid=19">Kaserne</a> | ' + 
	'<a href="build.php?gid=20">Stall</a> | ' +
	'<a href="build.php?gid=21">Werkstatt</a><br/>' +
	'<a href="build.php?gid=15">Hauptgebäude</a> | ' +
	'<a href="build.php?gid=12">Waffenschmiede</a> | ' +
	'<a href="build.php?gid=13">Rüstungsschmiede</a> | ' +
	'<a href="build.php?gid=17">Marktplatz</a> | ' +
	'<a href="build.php?gid=24">Rathaus</a><br/>' +
	'<a href="allianz.php">Allianz</a> | ' +
	'<a href="http://4travian.org" target="_blank">Kampfberichtparser</a>' +
	'</div>';
	