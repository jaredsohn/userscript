// ==UserScript==
// @name           KenuTyökalu
// @namespace      Jännä scripti
// @description    Jotain jännää
// @include        http://s*.fi.ikariam.com/index.php?view=embassyGeneralTroops*
// ==/UserScript==

GM_registerMenuCommand("Näytä tilastot koko liittoumasta",showStats);

function showStats()
	{
	var totalgen = totalGenerals();
	alert("Liittouman yhteiskenraalit: "+totalgen);
	}

var element = document.getElementById("embassyMenu");
var box = document.createElement('div');
var innerHTML = '<div class="dynamic" id="units">';
innerHTML += '<h3 class="header">Pelaajan joukot</h3>';
innerHTML += '<div class="content">';
innerHTML += '<br><center><div id="search"><br><input type="text" size="20" id="plrName"><br><a id="ircformat" class="button">Kopioitava muoto</a><a id="html_output" class="button">Näytä joukot</a></div><div id="datafield"></div></center><br></div><div class="footer"></div></div>';
box.innerHTML = innerHTML;
element.parentNode.insertBefore(box, element.nextSibling);

document.getElementById("ircformat").addEventListener("click",function(){
	var playerName = document.getElementById("plrName").value;
	var data = getUnitListByName(playerName.toLowerCase());
	alert(data);
	},true);
	

document.getElementById("html_output").addEventListener("click",function(){
	document.getElementById("datafield").style.display="block";
	var playerName = document.getElementById("plrName").value;
	var onclick = 'document.getElementById("datafield").style.display="none"; document.getElementById("html_output").style.display="block";';
	var data = "<a class='button' onclick='"+onclick+"'>Piilota joukot</a>"+getUnitHtmlByName(playerName.toLowerCase());
	document.getElementById("datafield").innerHTML=data;
	document.getElementById("html_output").style.display="none";
	},true);


// Funktio joka luo halutun pelaajan joukoista selkeän listan
function getUnitListByName(playerName)
	{
	var text = "Joukot:";
	if (getTroopsByName(playerName,"Hopliitti") != "0") { text += " " + getTroopsByName(playerName,"Hopliitti") + " hopliittia,"; }
	if (getTroopsByName(playerName,"Höyryjätti") != "0") { text += " " + getTroopsByName(playerName,"Höyryjätti") + " höyryjättiä,"; }
	if (getTroopsByName(playerName,"Keihäsmies") != "0") { text += " " + getTroopsByName(playerName,"Keihäsmies") + " keihäsmiestä,"; }
	if (getTroopsByName(playerName,"Miekkamies") != "0") { text += " " + getTroopsByName(playerName,"Miekkamies") + " miekkamiestä,"; }
	if (getTroopsByName(playerName,"Linkomies") != "0") { text += " " + getTroopsByName(playerName,"Linkomies") + " linkomiestä,"; }
	if (getTroopsByName(playerName,"Jousiampuja") != "0") { text += " " + getTroopsByName(playerName,"Jousiampuja") + " jousiampujaa,"; }
	if (getTroopsByName(playerName,"Kiväärimies") != "0") { text += " " + getTroopsByName(playerName,"Kiväärimies") + " kiväärimiestä,"; }
	if (getTroopsByName(playerName,"Murtaja") != "0") { text += " " + getTroopsByName(playerName,"Murtaja") + " murtajaa,"; }
	if (getTroopsByName(playerName,"Katapultti") != "0") { text += " " + getTroopsByName(playerName,"Katapultti") + " katapulttia,"; }
	if (getTroopsByName(playerName,"Heitin") != "0") { text += " " + getTroopsByName(playerName,"Heitin") + " heitintä,"; }
	if (getTroopsByName(playerName,"Gyrokopteri") != "0") { text += " " + getTroopsByName(playerName,"Gyrokopteri") + " gyrokopteria,"; }
	if (getTroopsByName(playerName,"Pommikone") != "0") { text += " " + getTroopsByName(playerName,"Pommikone") + " pommikonetta,"; }
	if (getTroopsByName(playerName,"Kokki") != "0") { text += " " + getTroopsByName(playerName,"Kokki") + " kokkia,"; }
	if (getTroopsByName(playerName,"Lääkäri") != "0") { text += " " + getTroopsByName(playerName,"Lääkäri") + " lääkäriä,"; }
	var troops = text.slice(0,text.length - 1);
	
	var text2 = "Laivasto:";
	if (getTroopsByName(playerName,"Murtajalaiva") != "0") { text2 += " " + getTroopsByName(playerName,"Murtajalaiva") + " murtajalaivaa,"; }
	if (getTroopsByName(playerName,"Liekinheitinalus") != "0") { text2 += " " + getTroopsByName(playerName,"Liekinheitinalus") + " liekinheitinalusta,"; }
	if (getTroopsByName(playerName,"Siipiratasmurtaja") != "0") { text2 += " " + getTroopsByName(playerName,"Siipiratasmurtaja") + " siipiratasmurtajaa,"; }
	if (getTroopsByName(playerName,"Tykkilaiva") != "0") { text2 += " " + getTroopsByName(playerName,"Tykkilaiva") + " tykkilaivaa,"; }
	if (getTroopsByName(playerName,"Katapulttilaiva") != "0") { text2 += " " + getTroopsByName(playerName,"Katapulttilaiva") + " katapulttilaivaa,"; }
	if (getTroopsByName(playerName,"Heitinalus") != "0") { text2 += " " + getTroopsByName(playerName,"Heitinalus") + " heitinalusta,"; }
	if (getTroopsByName(playerName,"Sukellusvene") != "0") { text2 += " " + getTroopsByName(playerName,"Sukellusvene") + " sukellusvenettä,"; }
	var fleets = text2.slice(0,text2.length - 1);
	
	var output = troops + " | " + fleets;
	
	return output;
	}

function getGeneralsByName(playerName)
	{
	var total = 0;
	
	var total = total + parseFloat(getTroopsByName(playerName,"Hopliitti")) * parseFloat("1.4");
	var total = total + parseFloat(getTroopsByName(playerName,"Höyryjätti")) * parseFloat("6.2");
	var total = total + parseFloat(getTroopsByName(playerName,"Miekkamies")) * parseFloat("1.2");
	var total = total + parseFloat(getTroopsByName(playerName,"Keihäsmies")) * parseFloat("0.4");
	var total = total + parseFloat(getTroopsByName(playerName,"Linkomies")) * parseFloat("0.4");
	var total = total + parseFloat(getTroopsByName(playerName,"Jousiampuja")) * parseFloat("1.1");
	var total = total + parseFloat(getTroopsByName(playerName,"Kiväärimies")) * parseFloat("4");
	var total = total + parseFloat(getTroopsByName(playerName,"Murtaja")) * parseFloat("4.4");
	var total = total + parseFloat(getTroopsByName(playerName,"Katapultti")) * parseFloat("11.2");
	var total = total + parseFloat(getTroopsByName(playerName,"Heitin")) * parseFloat("31");
	var total = total + parseFloat(getTroopsByName(playerName,"Gyrokopteri")) * parseFloat("2.5");
	var total = total + parseFloat(getTroopsByName(playerName,"Pommikone")) * parseFloat("5.8");
	var total = total + parseFloat(getTroopsByName(playerName,"Kokki")) * parseFloat("4");
	var total = total + parseFloat(getTroopsByName(playerName,"Lääkäri")) * parseFloat("10");
	var total_troops_generals = total;
	var total2 = 0;
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Murtajalaiva")) * parseFloat("5.4");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Liekinheitinalus")) * parseFloat("6.2");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Siipiratasmurtaja")) * parseFloat("36");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Heitinalus")) * parseFloat("22.4");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Katapulttilaiva")) * parseFloat("6.4");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Tykkilaiva")) * parseFloat("6.8");
	var total2 = total2 + parseFloat(getTroopsByName(playerName,"Sukellusvene")) * parseFloat("18.2");
	var total_fleets_generals = total2;
	
	var total_units_generals = total + total2;
	
	return "<fleets>"+total_fleets_generals+"</fleets><troops>"+total_troops_generals+"</troops><total>"+total_units_generals+"</total>";
	}


function totalGenerals()
	{
	var troopsTable1 = document.getElementsByTagName("table")[0].rows;
	var totalgen = 0;
	
	for (i = 1; i <= troopsTable1.length - 1; i++)
		{
		var rowPlayer = troopsTable1[i].innerHTML.split("<td>")[1].split("</td>")[0].toLowerCase();
		var rowPlayerGenerals = parseFloat(getGeneralsByName(rowPlayer).split("<total>")[1].split("</total>")[0]);
		var totalgen = totalgen + parseInt(rowPlayerGenerals);
		if (i == troopsTable1.length - 1) { return totalgen; }
		}
	}
	
function getUnitHtmlByName(playerName)
	{
	var text = "<b>Joukot:</b><br><br>";
	if (getTroopsByName(playerName,"Hopliitti") != "0") { text += getTroopsByName(playerName,"Hopliitti") + " hopliittia<br>"; }
	if (getTroopsByName(playerName,"Höyryjätti") != "0") { text += getTroopsByName(playerName,"Höyryjätti") + " höyryjättiä<br>"; }
	if (getTroopsByName(playerName,"Keihäsmies") != "0") { text += getTroopsByName(playerName,"Keihäsmies") + " keihäsmiestä<br>"; }
	if (getTroopsByName(playerName,"Miekkamies") != "0") { text += getTroopsByName(playerName,"Miekkamies") + " miekkamiestä<br>"; }
	if (getTroopsByName(playerName,"Linkomies") != "0") { text += getTroopsByName(playerName,"Linkomies") + " linkomiestä<br>"; }
	if (getTroopsByName(playerName,"Jousiampuja") != "0") { text += getTroopsByName(playerName,"Jousiampuja") + " jousiampujaa<br>"; }
	if (getTroopsByName(playerName,"Kiväärimies") != "0") { text += getTroopsByName(playerName,"Kiväärimies") + " kiväärimiestä<br>"; }
	if (getTroopsByName(playerName,"Murtaja") != "0") { text += getTroopsByName(playerName,"Murtaja") + " murtajaa<br>"; }
	if (getTroopsByName(playerName,"Katapultti") != "0") { text += getTroopsByName(playerName,"Katapultti") + " katapulttia<br>"; }
	if (getTroopsByName(playerName,"Heitin") != "0") { text += getTroopsByName(playerName,"Heitin") + " heitintä<br>"; }
	if (getTroopsByName(playerName,"Gyrokopteri") != "0") { text += getTroopsByName(playerName,"Gyrokopteri") + " gyrokopteria<br>"; }
	if (getTroopsByName(playerName,"Pommikone") != "0") { text += getTroopsByName(playerName,"Pommikone") + " pommikonetta<br>"; }
	if (getTroopsByName(playerName,"Kokki") != "0") { text += getTroopsByName(playerName,"Kokki") + " kokkia<br>"; }
	if (getTroopsByName(playerName,"Lääkäri") != "0") { text += getTroopsByName(playerName,"Lääkäri") + " lääkäriä<br><br>"; }
	var troops = text + "Joukko-Kenraalit: "+parseInt(getGeneralsByName(playerName).split("<troops>")[1].split("</troops>")[0])+"<br><br>";
	
	var text2 = "<b>Laivasto:</b><br><br>";
	if (getTroopsByName(playerName,"Murtajalaiva") != "0") { text2 += getTroopsByName(playerName,"Murtajalaiva") + " murtajalaivaa<br>"; }
	if (getTroopsByName(playerName,"Liekinheitinalus") != "0") { text2 += getTroopsByName(playerName,"Liekinheitinalus") + " liekinheitinalusta<br>"; }
	if (getTroopsByName(playerName,"Siipiratasmurtaja") != "0") { text2 += getTroopsByName(playerName,"Siipiratasmurtaja") + " siipiratasmurtajaa<br>"; }
	if (getTroopsByName(playerName,"Tykkilaiva") != "0") { text2 += getTroopsByName(playerName,"Tykkilaiva") + " tykkilaivaa<br>"; }
	if (getTroopsByName(playerName,"Katapulttilaiva") != "0") { text2 += getTroopsByName(playerName,"Katapulttilaiva") + " katapulttilaivaa<br>"; }
	if (getTroopsByName(playerName,"Heitinalus") != "0") { text2 += getTroopsByName(playerName,"Heitinalus") + " heitinalusta<br>"; }
	if (getTroopsByName(playerName,"Sukellusvene") != "0") { text2 += getTroopsByName(playerName,"Sukellusvene") + " sukellusvenettä<br><br>"; }
	var fleets = text2 + "Laiva-Kenraalit: "+parseInt(getGeneralsByName(playerName).split("<fleets>")[1].split("</fleets>")[0])+"<br><br><b>Kenraalipisteet:</b> "+parseInt(getGeneralsByName(playerName).split("<total>")[1].split("</total>")[0])+"<br>";
	
	
	
	var output = troops + fleets;
	
	return output;
	}

// Funktio jolla haetaan tietyn pelaajan tiettyjen yksiköiden määrä
function getTroopsByName(playerName,troops)
	{
	var troopsTable1 = document.getElementsByTagName("table")[0].rows;
	//alert(troopsTable1[1].innerHTML);
	var troopsTable2 = document.getElementsByTagName("table")[1].rows;
	//alert(troopsTable2[1].innerHTML);
	var fleetsTable1 = document.getElementsByTagName("table")[2].rows;
	//alert(fleetsTable1[1].innerHTML);
	var fleetsTable2 = document.getElementsByTagName("table")[3].rows;
	//alert(fleetsTable2[1].innerHTML);

	for (i = 1; i <= troopsTable1.length; i++)
		{
		var rowPlayer = troopsTable1[i].innerHTML.split("<td>")[1].split("</td>")[0].toLowerCase();
		if (rowPlayer == playerName)
			{
			var troopsAmount = parseTroops(troopsTable1[i].innerHTML,troops,"1");
			if (troopsAmount != "null") { return troopsAmount; }
			else
				{
				for (e = 1; e <= troopsTable2.length; e++)
					{
					var rowPlayer = troopsTable2[e].innerHTML.split("<td>")[1].split("</td>")[0].toLowerCase();
					if (rowPlayer == playerName)
						{
						var troopsAmount = parseTroops(troopsTable2[e].innerHTML,troops,"2");
						if (troopsAmount != "null") { return troopsAmount; }
						else
							{
							for (d = 1; d <= fleetsTable1.length; d++)
								{
								var rowPlayer = fleetsTable1[d].innerHTML.split("<td>")[1].split("</td>")[0].toLowerCase();
								if (rowPlayer == playerName)
									{
									var fleetsAmount = parseFleets(fleetsTable1[d].innerHTML,troops,"1");
									if (fleetsAmount != "null") { return fleetsAmount; }
									else
										{
										for (p = 1; p <= fleetsTable2.length; p++)
											{
											var rowPlayer = fleetsTable2[p].innerHTML.split("<td>")[1].split("</td>")[0].toLowerCase();
											if (rowPlayer == playerName)
												{
												var fleetsAmount = parseFleets(fleetsTable2[p].innerHTML,troops,"2");
												if (fleetsAmount != "null") { return fleetsAmount; }
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

// Funktio joka tarkastaa taulun rivin lähdekoodista haluttujen yksiköiden määrän
function parseTroops(html,troops,table)
	{
	if (table == "1")
		{
		if (troops == "Hopliitti") { return html.split("<td>")[2].split("</td>")[0]; }
		else if (troops == "Höyryjätti") { return html.split("<td>")[3].split("</td>")[0]; }
		else if (troops == "Keihäsmies") { return html.split("<td>")[4].split("</td>")[0]; }
		else if (troops == "Miekkamies") { return html.split("<td>")[5].split("</td>")[0]; }
		else if (troops == "Linkomies") { return html.split("<td>")[6].split("</td>")[0]; }
		else if (troops == "Jousiampuja") { return html.split("<td>")[7].split("</td>")[0]; }
		else if (troops == "Kiväärimies") { return html.split("<td>")[8].split("</td>")[0]; }
		else { return "null"; }
		}
	if (table == "2")
		{
		if (troops == "Murtaja") { return html.split("<td>")[2].split("</td>")[0]; }
		else if (troops == "Katapultti") { return html.split("<td>")[3].split("</td>")[0]; }
		else if (troops == "Heitin") { return html.split("<td>")[4].split("</td>")[0]; }
		else if (troops == "Gyrokopteri") { return html.split("<td>")[5].split("</td>")[0]; }
		else if (troops == "Pommikone") { return html.split("<td>")[6].split("</td>")[0]; }
		else if (troops == "Kokki") { return html.split("<td>")[7].split("</td>")[0]; }
		else if (troops == "Lääkäri") { return html.split("<td>")[8].split("</td>")[0]; }
		else { return "null"; }
		}
	}

// Funktio joka tarkastaa taulun rivin lähdekoodista haluttujen laivojen määrän
function parseFleets(html,fleets,table)
	{
	if (table == "1")
		{
		if (fleets == "Murtajalaiva") { return html.split("<td>")[2].split("</td>")[0]; }
		else if (fleets == "Liekinheitinalus") { return html.split("<td>")[3].split("</td>")[0]; }
		else if (fleets == "Siipiratasmurtaja") { return html.split("<td>")[4].split("</td>")[0]; }
		else if (fleets == "Tykkilaiva") { return html.split("<td>")[5].split("</td>")[0]; }
		else if (fleets == "Katapulttilaiva") { return html.split("<td>")[6].split("</td>")[0]; }
		else { return "null"; }
		}
	if (table == "2")
		{
		if (fleets == "Heitinalus") { return html.split("<td>")[2].split("</td>")[0]; }
		else if (fleets == "Sukellusvene") { return html.split("<td>")[3].split("</td>")[0]; }
		else { return "null"; }
		}
	}
	