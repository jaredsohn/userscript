// ==UserScript==
// @name           Caribic Islands Mericlink
// @namespace      Caribic Islands Mericlink
// @description    Erweitert das Spiel Caribic Islands um einem Direktlink zum meric Kampfrechner bei Spionageberichten und Angriffen
// @include        http://s*.caribicislands.*/s4/index.php?sid=*show_message=*
// ==/UserScript==

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~ S T A R T ~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~ F U N K T I O N E N ~~~~~~~~~~~~~~	
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// Suchen einer Textpassage zwischen 2 bestimmten Punkten
function str_search (from, to, subject) {	return subject.split(from)[1].split(to)[0];  }


// FormularElemente erstellen
function FormElement(Blocktype, Type, Name, Value, Style, Group, OtherAttr) {
	var Element = document.createElement(Blocktype);
			if (Name)		Element.setAttribute(Name.split(':')[0], Name.split(':')[1]);
			if (Type) {		Element.setAttribute('value', Value); Element.setAttribute('type', Type);	}
			else if (Value)	Element.innerHTML = Value;
			if (Style)		Element.setAttribute('style', Style);
			if (OtherAttr)	{
				var Attr = new Array();
					Attr = OtherAttr.split('@'); // Mehrere Attribute trennen durch ein @
				for(var i=0; i<Attr.length; i++) {
					Element.setAttribute(Attr[i].split('::')[0], Attr[i].split('::')[1]);
				}
			}
			if (Group && document.getElementById(Group))	document.getElementById(Group).appendChild(Element);
			else		document.body.appendChild(Element);
}


// Entfernen von Zeichen am Anfang und Ende eines String ähnlich der Funktion trim() von PHP
function trim(string, search_var) {
	if (string) {
		if (!search_var) var search_var = " ";
		var str_array = new Array();
		    str_array = string.split(search_var);
		for (var i=0; i<str_array.length; i++) {
			if (str_array[i]) {
				if (i==0 || !new_str)	var new_str = str_array[i];
				else					    new_str += search_var + str_array[i];
			}
		}
		return new_str;
	}
	else return 0;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~ E N D E ~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~ F U N K T I O N E N ~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



var messagetable = document.getElementsByTagName('table')[9];
var ReportType = messagetable.getElementsByTagName('i')[0].innerHTML;
if (ReportType == 'Angriffs Bericht' || (ReportType == 'Spionage Bericht' && str_search('mailicon/', '.gif', messagetable.getElementsByTagName('img')[0].src) == 'br_spio1')) {
  document.getElementsByTagName('table')[9].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].id = "spyTD";

//Tabellezeilen mit den eigentlichen Bericht!
  var reporttable = new Array();
      reporttable = document.getElementsByTagName('table')[10].getElementsByTagName('tr');

  var link = ''; //Späterer Link mit den Variablen zu Meric
  var Report = new Array();
  for (var i=0;i<reporttable.length;i++) {
// Tabellenzeile von Angreifer und Verteidiger
    if (reporttable[i].getElementsByTagName('td').length == 3) {
	  var Typ = reporttable[i].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML.substring(0, 1).toLowerCase(); // Erkennen Angreifen oder Verteidiger dann Nur den ersten Buchstaben wiedergeben und anschließend diesen klein schreiben
	  var Counter = 0;  // Zurücksetzen oder starten eines neuen Counters je Tabellenzeile
    }
// Schiffs-, Militär- und Waffentypen durch erkennen der Zeile anhand der Grafik für Hilfe in der 2. Spalte
	else if (reporttable[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0]) {
      var helpURL = str_search('type=','&', reporttable[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href);
	  if (eval(helpURL*1) > 2)         link += Typ+eval(Counter*1+1)+'='+trim(reporttable[i].getElementsByTagName('td')[2].getElementsByTagName('b')[0].innerHTML)+'&';
	  Counter++;
	}
  }
  FormElement('br', '', '', '', '', 'spyTD', '');
  document.getElementById('spyTD').innerHTML += '&gt; ';
  FormElement('a', '', 'id:Meric', 'Meric Kampfrechner', '', 'spyTD', 'href::http://meric.de/spiel/kampfrechner.php?'+trim(link,'&')+'@target::_blank');
}