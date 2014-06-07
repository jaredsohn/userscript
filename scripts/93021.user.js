// ==UserScript==
// @name           Ikariam Sound
// @namespace      Script by Mdna
// @description    Fügt in verschiedenen Bereichen Sound ein
// @include        http://s*.*.ikariam.*/index.php*
// @require        http://sizzlemctwizzle.com/updater.php?id=93021
// ==/UserScript==

var view = document.getElementsByTagName("body")[0].id;

/*
Meeresrauschen auf Weltkarte
Meeresrauschen auf Insel
Meeresrauschen in Stadt (mit Möwen)
Glocke im Kontor
Eulen-Sound im Diplomatieberater
Schwert-Kampf in der Kampfberichtansicht
Pferde ziehen Wagen bei Militärberater
Schwert-Kampf in der Kaserne
Griechische-Bar Sound in der Taverne
Museumssound
Tempel Glockengeläute
Schiffshorn im Hafen
*/

//Meeresrauschen auf Weltkarte
if (view === "worldmap_iso"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.buesum.de/flut.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Meeresrauschen auf Insel
else if (view === "island"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.buesum.de/meeresrauschen.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Meeresrauschen in Stadt (mit Möwen)
else if (view === "city"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.klemmys-schreibstube.de/assets/multimedia/Naturgeraeusche_Vol_1__Meeresrauschen__1_.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Glocke im Kontor
else if (view === "branchOffice"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.awdpro.com/Sound%20Effects/market.wav" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Eulen-Sound im Diplomatieberater
else if (view === "diplomacyAdvisor"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.tradebit.de/usr/sound-effekte/pub/9003/637/270-3877Preview.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Schwert-Kampf in der Kampfberichtansicht
else if (view === "militaryAdvisorCombatReports"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.ilovewavs.com/Effects/War/Sound%20Effect%20-%20Swords%20Clanking%20from%20sword%20fight.wav" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Pferde ziehen Wagen bei Militärberater
else if (view === "militaryAdvisorMilitaryMovements"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/previews/2723/mp3/459720_SOUNDDOGS__2_.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}


//Schwert-Kampf in der Kaserne
else if (view === "barracks"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.ilovewavs.com/Effects/War/Sound%20Effect%20-%20Swords%20Clanking%20from%20sword%20fight.wav" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Griechische-Bar Sound in der Taverne
else if (view === "tavern"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/previews/40/mp3/389640_SOUNDDOGS__gr.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Museumsound
else if (view === "museum"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/previews/17/mp3/701815_SOUNDDOGS__am.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Tempel Glockengeläute
else if (view === "temple"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/previews/2723/mp3/460223_SOUNDDOGS__pa.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Schiffshorn im Hafen
else if (view === "port"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/previews/2701/mp3/453849_SOUNDDOGS__sh.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}

//Klingen von Metallröhren in der Akademie
else if (view === "academy"){
var logo = document.createElement("embed");
logo.innerHTML = '<embed src="http://www.sounddogs.com/sound-effects/3998/mp3/170644_SOUNDDOGS__ah.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';
document.body.insertBefore(logo, document.body.lastChild);
}
