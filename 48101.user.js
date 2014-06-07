// Glasis The West Script
// version 0.11 BETA!  modified by Magili
// 19.04.2009
// Copyright (C) 2009 Christian Glashagen
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "The West Inventory Value", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Glasis The West Script
// @namespace     http://www.knights-of-light.de/tw1
// @description   Adds an various buttons to your The West interface
// @include       *.the-west.*/game.php*
// ==/UserScript==
var inv_val = document.createElement("li");
var twtool_link = document.createElement("li");
var tw_times_link = document.createElement("li");
var weststats_link = document.createElement("li");
var einstellungen = document.getElementById('menu_settings');
var duel_button = document.getElementById('menu_duel');
var nachrichten = document.getElementById('menu_messages');
var actual_url = window.location.host;
var actual_world = "";
var region = "";
var number_found = false;
for (var i = 0; i<actual_url.length; i++){
  if(actual_url.charCodeAt(i)>= 48 && actual_url.charCodeAt(i) <=57){
    actual_world = actual_world + actual_url.substr(i,1);
    number_found = true;
  }
  else if(!number_found){
         region = region + actual_url.substr(i,1);
       }
}
if(region=='de'){
  inv_val.innerHTML = '<a style="background:url(http://g.imagehost.org/0093/inv_berechnung.jpg) no-repeat" href="javascript:var sell_value_equipped = 0, equipped = Wear.wear, inventory_value = 0, inventory = Bag.getInstance().items; if($defined(equipped.animal)) sell_value_equipped += equipped.animal.get_sell_price(); if($defined(equipped.body)) sell_value_equipped += equipped.body.get_sell_price(); if($defined(equipped.foot)) sell_value_equipped += equipped.foot.get_sell_price(); if($defined(equipped.head)) sell_value_equipped += equipped.head.get_sell_price(); if($defined(equipped.neck)) sell_value_equipped += equipped.neck.get_sell_price(); if($defined(equipped.right_arm)) sell_value_equipped += equipped.right_arm.get_sell_price(); if($defined(equipped.yield)) sell_value_equipped += equipped.yield.get_sell_price(); for(var p in inventory) {inventory_value += inventory[p].get_sell_price() * inventory[p].get_count_value();} alert(&#34;Der Wert deiner im Inventar enthaltenen Items betr&#228gt: &#34; + inventory_value + &#34;$&#92nDer Wert deiner angelegten Items betr&#228gt: &#34; + sell_value_equipped + &#34;$&#92nDer Gesamtwert betr&#228gt: &#34; + (sell_value_equipped + inventory_value) + &#34;$&#34;); end();"></a>';
  twtool_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0224/twtool.jpg) no-repeat" href="http://twtool.ath.cx/w'+actual_world+'" target="_blank"></a>';
  weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0638/weststats.jpg) no-repeat" href="http://de.weststats.com/" target="_blank"></a>';
tw_times_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0445/twtimes.jpg) no-repeat" href="http://twtimes.tw.funpic.de/" target="_blank"></a>';
}
else{
  inv_val.innerHTML = 'a style="background:url(http://g.imagehost.org/0093/inv_berechnung.jpg) no-repeat" href="javascript:var sell_value_equipped = 0, equipped = Wear.wear, inventory_value = 0, inventory = Bag.getInstance().items; if($defined(equipped.animal)) sell_value_equipped += equipped.animal.get_sell_price(); if($defined(equipped.body)) sell_value_equipped += equipped.body.get_sell_price(); if($defined(equipped.foot)) sell_value_equipped += equipped.foot.get_sell_price(); if($defined(equipped.head)) sell_value_equipped += equipped.head.get_sell_price(); if($defined(equipped.neck)) sell_value_equipped += equipped.neck.get_sell_price(); if($defined(equipped.right_arm)) sell_value_equipped += equipped.right_arm.get_sell_price(); if($defined(equipped.yield)) sell_value_equipped += equipped.yield.get_sell_price(); for(var p in inventory) {inventory_value += inventory[p].get_sell_price() * inventory[p].get_count_value();} alert(&#34;Inventory items value: &#34; + inventory_value + &#34;$&#92nEquipped items value: &#34; + sell_value_equipped + &#34;$&#92nTotal value: &#34; + (sell_value_equipped + inventory_value) + &#34;$&#34;); end();"></a>';
  twtool_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0224/twtool.jpg) no-repeat" href="http://westtool.redio.de/w'+actual_world+'" target="_blank"></a>';
  weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0638/weststats.jpg) no-repeat" href="http://www.weststats.com/" target="_blank"></a>';
tw_times_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0445/twtimes.jpg) no-repeat" href="http://twtimes.tw.funpic.de/" target="_blank"></a>';
}
if (einstellungen) {
  einstellungen.parentNode.insertBefore(inv_val, einstellungen.nextSibling);
}
else{
  alert('There is an error. Please contact me at the_west_script@knights-of-light.de');
}
if (duel_button) {
  duel_button.parentNode.insertBefore(weststats_link, duel_button.nextSibling);
}
else{
  alert('There is an error. Please contact me at the_west_script@knights-of-light.de');
}
if (duel_button) {
  duel_button.parentNode.insertBefore(twtool_link, duel_button.nextSibling);
}
else{
  alert('There is an error. Please contact me at the_west_script@knights-of-light.de');
}
if (duel_button) {
  duel_button.parentNode.insertBefore(tw_times_link, duel_button.nextSibling);
}
else{
  alert('There is an error. Please contact me at the_west_script@knights-of-light.de');
}