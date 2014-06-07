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
// Tohle je GreaseMonkey uživatelský script
//
// Pro jeho instalaci potřebujete Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Potom restartujte Firefox.
// Nakonec znovu klikněte na odkaz na tento script, nabídne se vám možnost nainstalovat ho do GreaseMonkey a pak už jen následujte defaultní nastavení.
//
// Pro vypnutí klikněte pravým tlačítkem na ikonku opice na dolním Toolbaru Mozilly
// vyberte "Glasis The West Script - CZ&SK version" a klikněte na to. Takové odškrtávátko 
// zmizí a script tím vypnete
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           The West Menu Shortcut Icons
// @namespace      www.the-west.hu
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
case "hu":
language="hu";
break;
default:
language="en";
break;
}

twhelp_link.innerHTML = '<div style="height:20px;padding-top:2px;background-color:#34201F; border: 1px solid #726151; color: white;"><a style="color: white;" href="http://tw-help.ic.cz?lang='+language+'" target="_blank">TW-HELP</a></div>';

var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
if(actual_region=="en"){
  weststats_link.innerHTML = '<div style="height:20px;padding-top:2px;background-color:#34201F; border: 1px solid #726151; color: white;"><a style="color:white;" href="http://www.weststats.com/?change_world='+actual_world+'" target="_blank">WestStats</a></div>';
}
else
{
weststats_link.innerHTML = '<div style="height:20px;padding-top:2px;background-color:#34201F; border: 1px solid #726151; color: white;"><a style="color:white;" href="http://'+actual_region+'.weststats.com/?change_world='+actual_world+'" target="_blank">WestStats</a></div>';
}
var publish_duel = document.createElement("li");
publish_duel.id="publish_duel";
publish_duel.innerHTML='<div style="padding-left:40px; height:20px;padding-top:2px;background-color:#34201F; border: 1px solid #726151; color: white;"><a style="color:white;" href="javascript: var remoteScript=new Element(\'script\', {\'type\': \'text/javascript\', \'src\': \'http://tw-help.ic.cz/vytah.js\'});document.body.appendChild(remoteScript);void(0);">Párbalylog</a></div>';

var inv_val = document.createElement("li");
inv_val.id="inv_val";
inv_val.innerHTML = '<div style="padding-left:40px; height:20px;padding-top:2px;background-color:#34201F; border: 1px solid #726151; color: white;"><a style="color:white;" href="javascript:var sell_value_equipped = 0, equipped = Wear.wear, inventory_value = 0, inventory = Bag.getInstance().items; if($defined(equipped.animal)) sell_value_equipped += equipped.animal.get_sell_price(); if($defined(equipped.body)) sell_value_equipped += equipped.body.get_sell_price(); if($defined(equipped.foot)) sell_value_equipped += equipped.foot.get_sell_price(); if($defined(equipped.head)) sell_value_equipped += equipped.head.get_sell_price(); if($defined(equipped.neck)) sell_value_equipped += equipped.neck.get_sell_price(); if($defined(equipped.right_arm)) sell_value_equipped += equipped.right_arm.get_sell_price(); if($defined(equipped.yield)) sell_value_equipped += equipped.yield.get_sell_price(); for(var p in inventory) {inventory_value += inventory[p].get_sell_price() * inventory[p].get_count_value();} alert(&#34;A hátizsákod értéke: &#34; + inventory_value + &#34;$&#92nA felszerelés értéke: &#34; + sell_value_equipped + &#34;$&#92nMinden cuccod értéke: &#34; + (sell_value_equipped + inventory_value) + &#34;$&#34;); end();">Gazdagság</a></div>';

var menu_settings = document.getElementById('menu_settings');
var menu_duel = document.getElementById('menu_duel');

if (menu_settings) {
	menu_settings.parentNode.insertBefore(inv_val, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(publish_duel, menu_settings.nextSibling);
}
if (menu_duel) {
	menu_duel.parentNode.insertBefore(weststats_link, menu_duel.nextSibling);
	menu_duel.parentNode.insertBefore(twhelp_link, menu_duel.nextSibling);
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_64', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_64', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=64&version=0.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();