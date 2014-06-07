// ==UserScript==
// @name           FH Grade Calculator
// @namespace      http://strubbl.de/
// @description    this script will calculate the current grade on qis.fh-stralsund.de
// @include        https://qis.fh-stralsund.de/qisserver/rds?state=notenspiegelStudent&next=list.vm&nextdir=qispos/notenspiegel/student*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de), adjusted for WINF-M by Strubbl


function xpath(query)
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function trim(str)
{
	// no str?!
	if(!str)
		return "";
	return str.replace( /^\s*/, '').replace( /\s*$/, '' );
}

function round(x, n)
{
	if (n < 1 || n > 14)
		return false;
	var e = Math.pow(10, n);
	var k = (Math.round(x * e) / e).toString();
	if (k.indexOf('.') == -1)
		k += '.';
	k += e.toString().substring(1);
	return k.substring(0, k.indexOf('.') + n+1);
}

function parseFloatGer(str)
{
	return parseFloat(str.replace(',', '.'));
}

function sortSemester(a, b)
{
	var aa = trim(a.cells[3].innerHTML).split(" ");
	aa = aa[1] + " " + aa[0];
	var bb = trim(b.cells[3].innerHTML).split(" ");
	bb = bb[1] + " " + bb[0];
	GM_log(aa + " vs " + bb);
	if (aa == bb) return 0;
	if (aa < bb) return -1;
	return 1;
}


var ects = 0;
var grades_all = 0;
var grades_count = 0;

//var table = xpath("//div[@class='abstand_pruefinfo']").snapshotItem(1).nextElementSibling.firstElementChild;
var table = xpath("//div[@class='abstand_pruefinfo']").snapshotItem(1).nextSibling.nextSibling.firstChild.nextSibling;

var rows = table.childNodes;
for(var i=0; i < rows.length; i++)
{
	if(i == 0) continue;

	var row = rows.item(i);
	if(row.nodeName == "#text") continue;
	var cells = row.cells;

	var grade = parseFloatGer(trim(cells.item(4).innerHTML));
	var course = trim(cells.item(1).innerHTML);
	if(grade == 5 || trim(cells.item(0).innerHTML) == "")
	{
		table.removeChild(row);
		i--;
	}
	else
	{
		ects += parseFloatGer(trim(cells.item(9).innerHTML));

		var point = 0;
		if(grade > 0)
		{
			switch(course)
			{
				case "Rechnernetze": point = 0.3*12.00; break;
				case "Datenbanken": point = 0.7*12.00; break;

				case "Softwarearchitektur": point = 0.3*12.00; break;
				case "Projektmanagement I": point = 0.3*12.00; break;
				case "Projektmanagement II": point = 0.4*12.00; break;

				case "Projektstudium I": point = 0.5*12.00; break;
				case "Projektstudium II": point = 0.5*12.00; break;

				// Vertiefung 1
				case "Business Intelligence": point = 0.4*20.00; break;
				case "Enterprise Resource Planning": point = 0.4*20.00; break;

				// Vertiefung 2
				case "Medieninformatik I": point = 0.2*20.00; break;
				case "Medieninformatik II": point = 0.2*20.00; break;
				case "Algorithmik I": point = 0.2*20.00; break;
				case "Algorithmik II": point = 0.2*20.00; break;

				// Wahlpflicht für Vertiefungen
				case "Analytical Intelligence": point = 0.1*20.00; break;
				case "Collective Intelligence": point = 0.1*20.00; break;
				case "Aktuelle Entwicklung der Informatik": point = 0.1*20.00; break;

				case "Quantitative Methoden I": point = 0.6*8.00; break;
				case "Quantitative Methoden II": point = 0.4*8.00; break;

				case "Volkswirtschaftslehre": point = 0.4*17.00; break;
				case "DV-Recht": point = 0.2*17.00; break;

				// Wahlpflicht für Allgemeinwirtschaftswissenschaftliche Anteile
				case "Karriereplanung": point = 0.2*17.00; break;
				case "Advanced Writing Practice": point = 0.2*17.00; break;
				case "Business Mapping": point = 0.2*17.00; break;

				case "Entrepreneurship": point = 0.4*18.00; break;
				case "Informationsmanagement": point = 0.2*18.00; break;
				case "IT-Governance": point = 0.2*18.00; break;
				case "E-Business": point = 0.2*18.00; break;

				case "Master-Thesis": point = 0.75*30*100/70; break;
				case "Master-Thesis Kolloquium": point = 0.25*30*100/70; break;

			}

			if(point > 0)
			{
				grades_all += point * grade;
				grades_count += point;
				cells.item(4).innerHTML += " &#x2714;";
			}
		}
	}
}

// table sort //

var newRows = new Array();
for (j=1; j<table.rows.length; j++) { newRows[j-1] = table.rows[j]; }
newRows.sort(sortSemester);
for (i=0;i<newRows.length;i++) { table.appendChild(newRows[i]); }

// end //

var row = document.createElement("tr");
for(var i=0; i <= 9; i++)
{
	var cell = document.createElement("td");
	switch(i)
	{
		case 1:
			cell.className = "tabelle1_alignleft";
			cell.innerHTML = "bisherige Durchschnittsnote";
			break;
		case 4:
			cell.className = "tabelle1_alignright";
			cell.innerHTML = round(grades_all / grades_count, 4);
			break;
		case 9:
			cell.className = "tabelle1_alignright";
			cell.innerHTML = ects;
			break;
	}
	row.appendChild(cell);
}
table.appendChild(row);
