// ==UserScript==
// @name           TW - The Button
// @namespace      The-West
// @description    Fügt einen individuell anpassbaren Button is's Interface von The-West hinzu.
// @include        http://*.the-west.*
// @author         Big Luli
// ==/UserScript==

var Rangliste = "javascript:AjaxWindow.show('ranking');";
var Berichte = "javascript:AjaxWindow.show('reports');";
var Arbeiten = "javascript:AjaxWindow.show('work');";
var Einstellungen = "javascript:AjaxWindow.show('settings');";
var Telegramme = "javascript:AjaxWindow.show('messages');";
var Premium = "javascript:AjaxWindow.show('premium');";
var Fortübersicht = "javascript:AjaxWindow.show('fort_overview');";
var Charakter = "javascript:AjaxWindow.show('character');";
var Fertigkeiten = "javascript:AjaxWindow.show('skill');";
var Quests = "javascript:AjaxWindow.show('building_quest');";
var Stadt = "javascript:AjaxWindow.show('town',null,Character.get_home_town()?Character.get_home_town().x+'_'+Character.get_home_town().y:null);";
var Duell = "javascript:AjaxWindow.show('duel');";
var Stadtforum = "javascript:AjaxWindow.show('forum');";
var Einladungen = "javascript:AjaxWindow.show('invitations');";

var Charakterauswahl = "javascript:AjaxWindow.show('class_choose');";
var Serverinfo = "javascript:AjaxWindow.show('serverinfo');";
var Saloon = "javascript:AjaxWindow.show('building_saloon',{town_id:Character.home_town.town_id},Character.home_town.town_id);";

var Büchsenmacher = "javascript:AjaxWindow.show('building_gunsmith',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Hotel = "javascript:AjaxWindow.show('building_hotel',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Bank = "javascript:AjaxWindow.show('building_bank',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Gemischtwarenhändler = "javascript:AjaxWindow.show('building_general',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Schneider = "javascript:AjaxWindow.show('building_tailor',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Stadthalle = "javascript:AjaxWindow.show('building_cityhall',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Kirche = "javascript:AjaxWindow.show('building_church',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Profil = "javascript:AjaxWindow.show('profile',{player_id:Character.playerId},Character.playerId);";
var Spiele = "javascript:AjaxWindow.show ('games');";

var Stadtausbau = "javascript:AjaxWindow.show ('cityhall_build',{town_id:Character.home_town.town_id},Character.home_town.town_id);";
var Tutorials = "javascript:AjaxWindow.show ('tutorials');";
var Fort = "javascript:AjaxWindow.show ('fort');"

var button = document.createElement('a');
button.innerHTML = '<img id="button_unten" alt="" src="http://img5.imagebanana.com/img/06rzwhto/button.png" />';
document.getElementById('footer_menu_right').insertBefore(button, document.getElementById('footer_menu_right').firstChild);
button.href = HIER LINK ODER BEZEICHNUNG ANGEBEN!