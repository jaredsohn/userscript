// ==UserScript==
// @name           FH Grade Calculator
// @namespace      http://52g.de/
// @description    this script will calculate the current grade on qis.fh-stralsund.de
// @include        https://qis.fh-stralsund.de/qisserver/rds?state=notenspiegelStudent&next=list.vm&nextdir=qispos/notenspiegel/student*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)


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
				case "Mathematik I": point = 5.00; break;
				case "Mathematik II": point = 5.00; break;
				case "Elektrotechnik I": point = 3.00; break;
				case "Theoretische Informatik I": point = 3.00; break;
				case "Theoretische Informatik II": point = 3.00; break;
				case "Programmierungstechnik I": point = 3.00; break;
				case "Programmierungstechnik II": point = 3.00; break;
				case "Algorithmen und Datenstrukturen": point = 3.00; break;
				case "Systemunabhängige Programmierung": point = 3.00; break;
				case "Betriebssysteme": point = 3.00; break;
				case "Datenbanken I": point = 3.00; break;
				case "Datenbanken II": point = 3.00; break;
				case "Rechnernetze": point = 3.00; break;
				case "Digitale Schaltungen": point = 3.00; break;
				case "Mikroprozessoren": point = 3.00; break;
				case "Laborpraktikum Software": point = 3.00; break;
				case "Software Engineering I": point = 3.00; break;
				case "Projekt Software Engineering": point = 1.50; break;
				case "Seminar Software Engineering": point = 1.50; break;
				case "Graphische Datenverarbeitung": point = 3.00; break;
				case "Wissensverarbeitung": point = 3.00; break;
				case "Grundlagen Betriebswirtschaftslehre": point = 3.00; break;
				case "Technisches Berichtswesen": point = 3.00; break;
				case "Marketing": point = 3.00; break;
				case "Technisches Englisch": point = 3.00; break;
				case "Projektarbeit": point = 3.00; break;
				case "Bachelor-Arbeit": point = 7.78; break;
				case "Kolloquium zur Bachelor-Arbeit": point = 3.33; break;
				case "Elektrotechnik II": point = 3.50; break;
				case "Signale und Systeme": point = 3.50; break;
				case "Elektronik - Design": point = 3.50; break;
				case "Hardware-Entwicklungsmethoden": point = 3.50; break;
				case "Automatisierungs- und Prozessleitsysteme": point = 3.50; break;
				case "Mess- und Regelungstechnik": point = 3.50; break;
				case "Übertragungssysteme I": point = 3.50; break;
				case "Übertragungssysteme II": point = 3.50; break;
				case "Laborpraktikum Betriebssysteme und Rechnernetze": point = 3.50; break;
				case "Kommunikationsnetze": point = 3.50; break;
				case "Digitale Bildverarbeitung": point = 3.50; break;
				case "Multimediale Techniken und Dienste I / Autorensysteme": point = 3.50; break;
				case "Laborpraktikum Audio / Video": point = 3.50; break;
				case "Multimediale Techniken und Dienste II / Studiotechnik": point = 3.50; break;
				case "Software-Projektorganisation": point = 5.25; break;
				case "Software-Qualitätssicherung": point = 1.75; break;
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

