// ==UserScript==
// @name           OGame Redesign: Simulator Retreat Ratio
// @namespace      vulca
// @author         vulca, Vesselin Bontchev
// @date           2012-11-01
// @include        http://websim.speedsim.net/*
// @include        http://drago-sim.com*
// ==/UserScript==

function addPoints (nombre)
{
	if (isNaN (nombre))
		return "0";
	nombre += "";
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test (nombre))
		nombre = nombre.replace (rgx, "$1.$2");
	return nombre;
}
		
var cout  = new Array (   4,   12, 4, 10, 29, 60,   40,   18, 1, 90, 2.5, 125, 10000, 85, 2, 2, 6, 37, 6, 130, 20, 100);
var ratio = new Array (0.25, 0.25, 1,  1,  1,  1, 0.25, 0.25, 0,  1,   0,   1,     1,  1, 0, 0, 0,  0, 0,   0,  0,   0);
	
function speedsim3 ()
{
	var coutDef = 0;
	var coutAtt = 0;
	var nb = 0;
	for (var i = 0; i < 21; i++)
	{
		nb = document.getElementsByName ('ship_d_' + i + '_b') [0].value;
		nb = (nb == '') ? 0 : parseInt (nb);
		coutDef += nb * cout [i] * ratio [i];
		if (document.getElementsByName ('ship_a_' + i + '_b') [0])
		{
			nb = document.getElementsByName ('ship_a_' + i + '_b') [0].value;
			nb = (nb == '') ? 0 : parseInt (nb) ;
			coutAtt += nb * cout [i] * ratio [i];
		}
		var taux;
		if (coutDef == 0)
			if (coutAtt == 0)
				taux = 1;
			else
				taux = coutAtt * 1000;
		else if (coutAtt == 0)
			taux = coutDef * 1000;
		else if (coutAtt > coutDef)
			taux = Math.round (coutAtt / coutDef * 100) / 100;
		else
			taux = Math.round (coutDef / coutAtt * 100) / 100;
		var couleur = "lime";
		if (coutAtt > coutDef)
		{
			if (taux >= 5)
				couleur = "red";
			else if (taux >= 3)
				couleur = "orange";
		}
	}
	document.getElementById ('shiptable').getElementsByTagName ('th') [0].innerHTML = '<span style="float: left; color: ' + couleur + ';">A: ' + addPoints (coutAtt * 1000) + "<br>D: " + addPoints (coutDef * 1000) + "<br>=> 1:" + addPoints (taux) + "</span>";
}

function dragoSim3 ()
{
	var coutDef = 0;
	var coutAtt = 0;
	var nb = 0;
	var n = 0;
	var input=document.getElementsByClassName ('maintable') [0].getElementsByClassName ('number')
	var attaquant = true;
	for (var i = 6; i < 41; i++)
	{
		nb = input [i].value;
		nb = (nb == '') ? 0 : parseInt (nb);
		if (i < 26)
			attaquant = (i % 2 == 0)
		else if (i < 33)
			attaquant = (i % 2 == 1)
		else
			attaquant = false;
		if (attaquant)
			coutAtt += nb * cout [n] * ratio [n];
		else
		{	
			coutDef += nb * cout [n] * ratio [n];
			n++;
		}
	}
	var taux;
	if (coutDef == 0)
		if (coutAtt == 0)
			taux = 1;
		else
			taux = coutAtt * 1000;
	else if (coutAtt == 0)
		taux = coutDef * 1000;
	else if (coutAtt > coutDef)
		taux = Math.round (coutAtt / coutDef * 100) / 100;
	else
		taux = Math.round (coutDef / coutAtt * 100) / 100;
	var couleur = "green";
	if (coutAtt > coutDef)
	{
		if (taux >= 5)
			couleur = "red";
		else if (taux >= 3)
			couleur = "darkgoldenrod";
	}
	var myTd, mySpan;
	var myTr = document.getElementById ("retreatRatio");
	if (myTr == null)
	{
		var myTr = document.createElement ("tr");
		myTr.setAttribute ("id", "retreatRatio");
		myTd = document.createElement ("td");
		myTd.setAttribute ("align", "center");
		myTd.setAttribute ("id", "ratio");
		myTr.appendChild (myTd);
		myTd = document.createElement ("td");
		myTd.setAttribute ("align", "center");
		myTd.setAttribute ("id", "attPoints");
		myTr.appendChild (myTd);
		myTd = document.createElement ("td");
		myTd.setAttribute ("align", "center");
		myTd.setAttribute ("id", "defPoints");
		myTr.appendChild (myTd);
		myTd = document.createElement ("td");
		myTd.setAttribute ("colspan", "2");
		myTr.appendChild (myTd);
		var fleetID = document.getElementById ("fleet_td").parentNode;
		fleetID.parentNode.insertBefore (myTr, fleetID.nextSibling);
	}
	myTd = document.getElementById ("ratio");
	myTd.style.color = couleur;
	myTd.textContent = "1:" + addPoints (taux);
	myTd = document.getElementById ("attPoints");
	myTd.textContent = addPoints (coutAtt * 1000);
	myTd = document.getElementById ("defPoints");
	myTd.textContent = addPoints (coutDef * 1000);
}

if (/drago-sim/.test (location.href))
	setInterval (dragoSim3, 500);
if (/speedsim/.test (location.href))
	setInterval (speedsim3, 500);
