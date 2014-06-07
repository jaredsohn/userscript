// ==UserScript==
// @name           Die Stämme - Gebäude Buttons
// @namespace      http://cocher.de.vu
// @description    Fügt dem Spiel "Die Stämme" Buttons für Gebäude hinzu
// @include        http://de*.die-staemme.de/*
// ==/UserScript==


var village = unsafeWindow.village;

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<tr><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=main">Hauptgebäude </a>|</td><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=stable"> Stall </a>|</td><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=barracks"> Kaserne </a>|</td><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=market"> Markt </a>|</td><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=garage"> Werkstatt </a>|</td><td><a href="http://de57.die-staemme.de/game.php?village='+village+'&screen=smith"> Schmiede</a></td></tr>';
document.getElementById('header_info').appendChild(LinkDiv);

// made by Cocher! Have Fun!
// http://cocher.de.vu