// ==UserScript==
// @name           Ikariam: Parempi taisteluraportti
// @namespace      IPT
// @description    Lisää muutamia ominaisuuksia taisteluraportteihin
// @include        http://s*.fi.ikariam.com/index.php?view=militaryAdvisorReportView&combatId=*
// ==/UserScript==


// Nopeampi match funktio
function find(str,source)
	{
	var search = source.match(str);
	if (search != null) { return true; }
	else { return false; }
	}
// ----------------------

// Erän näyttäminen
var troopsReportHTML = document.getElementById("troopsReport").innerHTML;

if (find("<h5>Taistelu yhä käynnissä</h5>",troopsReportHTML) == true)
	{
	var round = troopsReportHTML.split('combatRound=')[1].split("&")[0];
	var troopsReportHTML = troopsReportHTML.replace('<h5>Taistelu yhä käynnissä</h5>','<h5>Taistelu yhä käynnissä (erä '+round+')</h5>');
	document.getElementById("troopsReport").innerHTML = troopsReportHTML;
	}
// ----------------

// Hyökkääjien ja puolustajien määrä

var att = troopsReportHTML.split('<label>Hyökkääjä:</label>')[1].split('</span>')[0];
var def = troopsReportHTML.split('<label>Puolustaja:</label>')[1].split('</span>')[0];

if (find('receiverId=',att) == true)
	{
	var attCountRE = new RegExp('receiverId=',"g");
	var attCount = parseInt(att.match(attCountRE).length);
	if (find('<div class="attacker textgreen">',troopsReportHTML) == true)
		{
		attCount = attCount + 1;
		}
	}
else { attCount = 1; }

if (find('receiverId=',def) == true)
	{
	var defCountRE = new RegExp('receiverId=',"g");
	var defCount = parseInt(def.match(defCountRE).length);
	if (find('<div class="defender textgreen">',troopsReportHTML) == true)
		{
		defCount = defCount + 1;
		}
	}
else { defCount = 1; }

if (attCount > 1)
	{
	var troopsReportHTML = troopsReportHTML.replace('<label>Hyökkääjä:</label>','<label><b title="Yhteensä '+attCount+'">Hyökkääjät:</b></label>');
	document.getElementById("troopsReport").innerHTML = troopsReportHTML;
	}
else { var troopsReportHTML = troopsReportHTML.replace('<label>Hyökkääjä:</label>','<label><b>Hyökkääjä:</b></label>'); document.getElementById("troopsReport").innerHTML = troopsReportHTML; }
	
if (defCount > 1)
	{
	var troopsReportHTML = troopsReportHTML.replace('<label>Puolustaja:</label>','<label><b title="Yhteensä '+defCount+'">Puolustajat:</b></label>');
	document.getElementById("troopsReport").innerHTML = troopsReportHTML;
	}
else { var troopsReportHTML = troopsReportHTML.replace('<label>Puolustaja:</label>','<label><b>Puolustaja:</b></label>'); document.getElementById("troopsReport").innerHTML = troopsReportHTML; }

// -------------------------------

// RESOURCE COUNTER

if (find('<ul class="resources">',troopsReportHTML) == true)
	{
	var countPillages = new RegExp('<ul class="resources">',"g");
	var pillageCount = parseInt(troopsReportHTML.match(countPillages).length);
	for (i = 1; i <= pillageCount; i++)
		{
		var pillage = troopsReportHTML.split('<ul class="resources">')[i].split('</ul>')[0];
		var totalPillage = 0;
		var amountti = 0;
		
		if (pillage.match("Viini") != null)
		{
		var viini_pillage = parseInt(pillage.split("Viini: </span>")[1].split("</li>")[0]);
		var totalPillage = totalPillage + viini_pillage;
		var amountti = amountti + 1;
		}
		else
		{
		var viini_pillage = 0;
		}
		if (pillage.match("Marmori") != null)
		{
		var marmori_pillage = parseInt(pillage.split("Marmori: </span>")[1].split("</li>")[0]);
		var totalPillage = totalPillage + marmori_pillage;
		var amountti = amountti + 1;
		}
		else
		{
		var marmori_pillage = 0;
		}
		if (pillage.match("Rikki") != null)
		{
		var rikki_pillage = parseInt(pillage.split("Rikki: </span>")[1].split("</li>")[0]);
		var totalPillage = totalPillage + rikki_pillage;
		var amountti = amountti + 1;
		}
		else
		{
		var rikki_pillage = 0;
		}
		if (pillage.match("Rakennusmateriaali") != null)
		{
		var puu_pillage = parseInt(pillage.split("Rakennusmateriaali: </span>")[1].split("</li>")[0]);
		var totalPillage = totalPillage + puu_pillage;
		var amountti = amountti + 1;
		}
		else
		{
		var puu_pillage = 0;
		}
		if (pillage.match("Kristallilasi") != null)
		{
		var krisu_pillage = parseInt(pillage.split("Kristallilasi: </span>")[1].split("</li>")[0]);
		var totalPillage = totalPillage + krisu_pillage;
		var amountti = amountti + 1;
		}
		else
		{
		var krisu_pillage = 0;
		}
		
		var totalPillage2 = totalPillage + amountti - 1;
		
		var shipsAmount = totalPillage2 / 500;
		
		troopsReportHTML = troopsReportHTML.replace(pillage,'<div title="Yhteensä '+totalPillage+' resurssia.">'+pillage+'<li style="width:100px;height:26px;padding-left:32px;line-height:26px;background-repeat:no-repeat;background-image:url(http://servut.us/Muppetti/balls/ship_transport_r_40x40.gif);background-position:4px 2px;">'+shipsAmount.toFixed()+'</li></div>');
		document.getElementById("troopsReport").innerHTML = troopsReportHTML;
		}
	}