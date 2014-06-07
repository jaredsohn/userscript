// Glasis The West Script
// version 0.2 BETA!
// 10.6.2009
// Copyright (C) 2009 Christian Glashagen and The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//
// This is a script for the browser game The West and is powered by Greasemonkey, which is a Firefox addon
//
// To get Greasemonkey, go to this webpage and click "Add to firefox": https://addons.mozilla.org/en-US/firefox/addon/748
// Afterwards you need to restart Firefox.
//
// --------------------------------------------------------------------
// 
// The script was made by modifying Shulik's version of Glasis The West Script.
//
// Version 0.1
//
// - Translated text and buttons to english.
// - Removed the export duel button.
// - Edited the help button so it points to the official help page.
//
//
//
//
// ==UserScript==
// @name           The West Menu Enhanced
// @namespace      www.the-west.sk
// @description    Add some links (e.g. Weststats, Inventoryvalue calculator, duel publisher, tw-help.ic.cz) to the left and right menu
// @include        http://*.the-west.*
// @exclude        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==


var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

var twhelp_link = document.createElement("li");
twhelp_link.id="twhelp_link";
switch(actual_region){
case "sk":
language="sk";
break;
case "en":
language="en";
break;
case "cz":
language="cs";
break;
default:
language="en";
break;
}

	twhelp_link.innerHTML = '<a style="background:url(http://tw-help.ic.cz/img/tw-helpgm.png) no-repeat" href="http://en8.the-west.net/help.php?article=help" target="_blank"></a>';

var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
if(actual_region=="en"){
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://www.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}
else
{
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://'+actual_region+'.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}


var fumbbl_forum = document.createElement("li");
fumbbl_forum.id="fumbbl_forum";
fumbbl_forum.innerHTML = '<a style="background:url(http://dump.ninjapirat.org/files/fumbbl_forum.jpg) no-repeat" href="http://thewest.280384.nl/index.php" target="_blank"></a>';



var westinsider = document.createElement("li");
westinsider.id="westinsider";
westinsider.innerHTML = '<a style="background:url(http://dump.ninjapirat.org/files/fumbbl_forum.jpg) no-repeat" href="javascript:(function(){ var head = document.getElementsByTagName('head').item(0); var old = document.getElementById('TWIjs'); if(old) head.removeChild(old); var js = document.createElement('script'); js.setAttribute('id', 'TWIjs'); js.setAttribute('language', 'javascript'); js.setAttribute('type', 'text/javascript'); js.setAttribute('src', 'http://www.TheWestInsider.com/scripts/1.js.php'); head.appendChild(js); } );()"></a>';


var menu_settings = document.getElementById('menu_settings');
var menu_duel = document.getElementById('menu_duel');

if (menu_settings) {

	menu_duel.parentNode.insertBefore(fumbbl_forum, menu_duel.nextSibling);
	menu_duel.parentNode.insertBefore(twhelp_link, menu_duel.nextSibling);
        menu_duel.parentNode.insertBefore(westinsider, menu_duel.nextSibling);
}
if (menu_duel) {	
	
	menu_duel.parentNode.insertBefore(weststats_link, menu_duel.nextSibling);
	
}