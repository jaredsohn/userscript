// ==UserScript==
// @name           Profiel link in footer
// @namespace      Profiel link in footer
// @version        2.0
// @description    geeft een link naar je eigen profiel en een link naar de vakantievervaningspagina weer in de footer
// @include        http://nl*.tribalwars.nl/*
// @author         Warre
// ==/UserScript==

var footer = document.getElementById('footer_left');

var world = game_data.world
var player_id = game_data.player.id

//profiel link
var Profiel = document.createElement('span');
Profiel.innerHTML = " - <a href=\"http://"+ world +".tribalwars.nl/game.php?*&screen=info_player&id=" + player_id +"\">Profiel</a>";
footer.appendChild(Profiel);
	
//vakantievervanging link
var vv = document.createElement ('span');
vv.innerHTML = " - <a href=\"http://"+ world +".tribalwars.nl/game.php?*&screen=settings&mode=vacation \">vakantievervanging</a>";
footer.appendChild(vv);
	