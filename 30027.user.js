// ==UserScript==
// @name           SI - More message links
// @namespace      *.spaceinvasion.*/indexInternal.es?action=internal*
// @description   This script adds links to overview page of spaceinvasion (russian)
// @version      1
// @date          2008-14-08
// @include        *.spaceinvasion.*/indexInternal.es?action=internal*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalMenu*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalMessages*
// @exclude        *.spaceinvasion.*/indexInternal.es?action=internalPlanets*
// ==/UserScript==

var mess=document.getElementsByTagName("a").item(2);
if(mess.href.indexOf("Messages")+1)
{
	var br=document.createElement("br");
	mess.parentNode.appendChild(br);
	
	var messNorm=document.createElement("a");
	var messAl=document.createElement("a");
	var messSpy=document.createElement("a");
	var messBattle=document.createElement("a");
	var messFleet=document.createElement("a");
	var messAdmin=document.createElement("a");

	var messNormText=document.createTextNode("  Игроки  ");
	var messAlText=document.createTextNode("  Альянсы  ");
	var messSpyText=document.createTextNode("  Шпионаж  ");
	var messBattleText=document.createTextNode("  Бой  ");
	var messFleetText=document.createTextNode("  Флот  ");
	var messAdminText=document.createTextNode("  Администратор  ");
	
	messNorm.setAttribute("href",mess.href+"&type=normal");
	messNorm.appendChild(messNormText);
	messAl.setAttribute("href",mess.href+"&type=alliance");
	messAl.appendChild(messAlText);
	messSpy.setAttribute("href",mess.href+"&type=spio");
	messSpy.appendChild(messSpyText);
	messBattle.setAttribute("href",mess.href+"&type=battle");
	messBattle.appendChild(messBattleText);
	messFleet.setAttribute("href",mess.href+"&type=fleet");
	messFleet.appendChild(messFleetText);
	messAdmin.setAttribute("href",mess.href+"&type=admin");
	messAdmin.appendChild(messAdminText);
	
	mess.parentNode.appendChild(messNorm);
	mess.parentNode.appendChild(messAl);
	mess.parentNode.appendChild(messSpy);
	mess.parentNode.appendChild(messBattle);
	mess.parentNode.appendChild(messFleet);
	mess.parentNode.appendChild(messAdmin);
}