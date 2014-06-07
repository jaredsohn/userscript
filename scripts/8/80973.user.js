// ==UserScript==
// @name           TC-exit_Tutorial
// author:   	   umbrella
// @include        http://*.garathor.com/index2.php
// @description	   Blende das Tutorial aus und ersetze es durch eine neue Startseite
// ==/UserScript==


// Testen ob Bannerunterbrechung
if(document.getElementById('unverdaechtig') != null)
	return;

// Variablen deklarieren
var temp;
var system_nachricht_text = "";
var nachricht_text = "";

// Pruefen ob neue Systemmeldung
temp = document.getElementById('s1').getElementsByTagName('img');
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1.gif')
	system_nachricht_text = "<div></div>";
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_s.gif')
	system_nachricht_text = "<div style=\"color: #000000;\">Systemnachricht erhalten</div>";
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_w.gif')
	system_nachricht_text = "<div style=\"color: #008800;font-weight:bold\">Militärbericht erhalten</div>";
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_a.gif')
	system_nachricht_text = "<div style=\"color: #FF0000;\">Arbeiter sind tätigungslos</div>";
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_sw.gif')
	system_nachricht_text = "<div style=\"color:#000000; padding-bottom:10px;\">Systemnachricht erhalten</div><div style=\"color:#FF0000;\">Arbeiter sind tätigungslos</div>";

// Pruefen ob neue SpielerNachrichten
temp = document.getElementById('s2').getElementsByTagName('img');
if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s2_a.gif')
	var nachricht_text = "<div style=\"font-size:18px;padding-bottom:15px;color:blue;\">Neue Nachrichten im Postfach</div>";
else
	var nachricht_text = "<div style=\"font-size:16px;font-weight:bold;padding-bottom:10px;\">Keine Spielernachricht erhalten</div>";


// Schaut den isolierten Ranglistenbereich an
var anz_div = 0;
var thisElem = 0;
var alltds = document.getElementsByTagName('td');
for (var i = 0; i < alltds.length; i++) 
{
	thisElem = alltds[i];
	if (thisElem.className && thisElem.className == 'rin')
	{
		anz_div = thisElem.getElementsByTagName('div').length;
		i = alltds.length + 1;
	}
}

switch(anz_div)
{
	// Spieler ist in den Top 3
	case 4: 
			// Tutorialtext ausblenden
			var tut_spans = document.getElementsByTagName('span');
			tut_spans[22].innerHTML = "";

			// Tutorial-Links ausblenden und StatusNachrichten einblenden incl. GN-Link
			var tut_links = document.getElementsByTagName('div');
			tut_links[21].style.marginBottom = "110pt";
			tut_links[21].innerHTML = "<div style=\"margin-top:10px;margin-left:10px;padding:5px;font-size:15px;\">" + nachricht_text  + system_nachricht_text + "<div style = \"position: absolute; left:260px;top:110px;\"><a href = \"http://www.garathor.com/forum/forumdisplay.php?393-Garathor-News\"><img src = \"http://images.testrunde.garathor.com/img_game/index/bote.png\"></a></div></div>";
			break;

	// Spieler ist nicht in den Top 3
	case 5: 
			// Tutorialtext ausblenden
			var tut_spans = document.getElementsByTagName('span');
			tut_spans[30].innerHTML = "";

			// Tutorial-Links ausblenden und StatusNachrichten einblenden incl. GN-Link
			var tut_links = document.getElementsByTagName('div');
			tut_links[22].style.marginBottom = "130pt";
			tut_links[22].innerHTML = "<div style=\"margin-top:20px;margin-left:20px;padding:13px;font-size:15px;\">" + nachricht_text  + system_nachricht_text + "<div style = \"position: absolute; left:260px;top:180px;\"><a href = \"http://www.garathor.com/forum/forumdisplay.php?393-Garathor-News\"><img src = \"http://images.testrunde.garathor.com/img_game/index/bote.png\"></a></div></div>";
			break;
}

