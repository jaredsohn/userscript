// ==UserScript==
// @name           Re-Time
// @description    Truppen die noch nicht wieder da sind Vortragen 
// @author         Marc(DsMaster2008) und Markus(Lippfux)
// @version        1.0
// @include        http://de*.die-staemme.de/game.php?*&screen=place&try=confirm*
// ==/UserScript==

// -----------------------------------------------------------------------------
//              Copyright (c) Marc Avila und Markus
// ENG:  You are not allowed to modify or redistribute this script without 
//       permission of the author
// GER:  Modifikationen und Weiterverbreitung dieses Scripts benötigen die
//       Zustimmung des Autors.
// -----------------------------------------------------------------------------


// Alle Elemente mit ClassName("vis")
	var el = document.getElementsByClassName("vis"); 
		el = el[el.length-2]; 
// Link hinten dran hängen
	var lnk = el.parentNode.appendChild(document.createElement("a")); 
		lnk.innerHTML = "» Re-Time";
// EventHandler => Wenn geklickt Function retime aufrufen
		lnk.addEventListener("click",reTime, false); 
function reTime() {
	var table = document.getElementsByClassName("vis")[1];
	var	cells = table.getElementsByTagName("td");
	for (var Index = 0; Index < cells.length; Index++)
{
	var cellValue = cells[Index].textContent;
		cells[Index].innerHTML = "";
	var input = cells[Index].appendChild(document.createElement("input"));
		input.value = cellValue;
};}