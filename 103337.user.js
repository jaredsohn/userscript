// ==UserScript==
// @name           DS Schnelleiste
// @namespace      staemme
// @include        http://de*.die-staemme.de/game.php*
// ==/UserScript==

var tr = document.createElement("tr");
tr.setAttribute("id", "shortcut_row");

document.getElementById("header_info").firstChild.nextSibling.nextSibling.nextSibling.appendChild(tr);

var td = document.createElement("td");
td.innerHTML = "<center><a href='/game.php?screen=main' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/main.png' alt='Hauptgebäude' />Hauptgebäude</a><a href='/game.php?screen=barracks' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/barracks.png' alt='Kaserne' />Kaserne</a><a href='/game.php?screen=stable' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/stable.png' alt='Stall' />Stall</a><a href='/game.php?screen=snob' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/snob.png' alt='Adelshof' />Adelshof</a><a href='/game.php?screen=smith' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/smith.png' alt='Schmiede' />Schmiede</a><a href='/game.php?screen=place' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/place.png' alt='Platz' />Platz</a><a href='/game.php?screen=market' style='margin-left: 10px; margin-right: 10px;' ><img src='graphic/buildings/market.png' alt='Markt' />Markt</a></center>";

td.style.padding = "5px";
td.style.backgroundImage = "url(http://de71.die-staemme.de/graphic/index/iconbar-mc.png)";
td.style.border = "2px solid #D4B172";

document.getElementById("contentContainer").style.marginTop = "20px";

td.setAttribute("colspan", "5");

tr.appendChild(td);

var mi = document.getElementsByClassName("menu-item");

mi[1].innerHTML = mi[1].innerHTML + "<table cellspacing='0' class='menu_column'><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=all'>Alle Berichte</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=attack'>Angriffe</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=defense'>Verteidigung</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=support'>Unterstützung</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=trade'>Handel</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=other'>Sonstiges</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=forwarded'>Weitergeleitet</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=filter'>Filter</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=block'>Absender blockieren</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=report&mode=public'>Öffentliche Berichte</a></td></tr><tr><td class='bottom'><div class='corner'></div><div class='decoration'></div></td></tr></table>";

mi[2].innerHTML = mi[2].innerHTML + "<table cellspacing='0' class='menu_column'><tr><td class='menu-column-item'><a href='/game.php?screen=mail&mode=in'>Nachrichten</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=mail&mode=mass_out'>Rundschreiben</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=mail&mode=new'>Nachricht schreiben</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=mail&mode=block'>Absender blockieren</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=mail&mode=address'>Adressbuch</a></td></tr><tr><td class='bottom'><div class='corner'></div><div class='decoration'></div></td></tr></table>";

mi[3].innerHTML = mi[3].innerHTML + "<table cellspacing='0' class='menu_column'><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=overview'>Übersicht</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=profile'>Profil</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=members'>Mitglieder</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=contracts'>Diplomatie</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=tribalwars'>Stammeskriege</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=reservations'>Adelsplaner</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=invite'>Einladungen</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=intro_igm'>Begrüßung</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=properties'>Eigenschaften</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ally&mode=forum&check_external='>Stammesforum</a></td></tr><tr><td class='bottom'><div class='corner'></div><div class='decoration'></div></td></tr></table>";

mi[5].innerHTML = mi[5].innerHTML + "<table cellspacing='0' class='menu_column'><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=ally'>Stämme</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=player'>Spieler</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=con_ally'>Kontinent Stämme</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=con_player'>Kontinent Spieler</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=kill_ally'>Besiegte Gegner Stämme</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=kill_player'>Besiegte Gegner</a></td></tr><tr><td class='menu-column-item'><a href='/game.php?screen=ranking&mode=awards'>Awards</a></td></tr><tr><td class='bottom'><div class='corner'></div><div class='decoration'></div></td></tr></table>";