// ==UserScript==
// @name           Fleet Screen Buttons
// @description    by Darth Brunus
// @version        Beta 0.11
// @include        http://uni2.playstarfleet.com/fleet*
// @include        http://playstarfleet.com/fleet*
// @include        http://*.playstarfleetextreme.com/fleet*
// @include       http://*stardrifte.com/fleet*
// @include       http://*stardrifteextreme.com/fleet*
// ==/UserScript==

var maxallbut = document.createElement("input");
maxallbut.setAttribute("type", "button");
maxallbut.setAttribute("value", "Max all");
maxallbut.setAttribute("onclick", "select_all_ships(); update_fleet_info(); select_max_cargo('hydrogen'); update_fleet_info(); select_max_cargo('crystal'); update_fleet_info(); select_max_cargo('ore');");

var hephhidebut = document.createElement("input");
hephhidebut.setAttribute("type", "button");
hephhidebut.setAttribute("value", "Heph Hide");
hephhidebut.setAttribute("onclick", "select_all_ships(); update_fleet_info(); select_max_cargo('hydrogen'); update_fleet_info(); select_max_cargo('crystal'); update_fleet_info(); select_max_cargo('ore'); document.getElementById('ship_quantity_950199677').value = '0'; document.getElementById('send_hydrogen').value = parseInt(document.getElementById('send_hydrogen').value) > 10000 ? document.getElementById('send_hydrogen').value - 10000 : 0;");

var ctrlsElem = document.getElementsByClassName("controls")[0];
if(ctrlsElem != null) {
	ctrlsElem.appendChild(hephhidebut);
	ctrlsElem.appendChild(maxallbut);
}
