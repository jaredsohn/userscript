// ==UserScript==
// @name         [PG] X-tra Weiterbildungsende Hamburg & Berlin NG Style mit Optionen
// @namespace    kingfr3sh & das_bazie ungestylet by niceguy0815
// @description  zeigt das Ende der 1. und 2. Weiterbildung in der Übersicht an.  Jetzt auch in Muenchen
// @version         2.7.5 Hamburg reloaded Support
// @version         2.7.4 Koeln Support
// @version         2.7.3 Halloween Support
// @version         2.7.2 Malle Support
// @version         2.7.0
// @include         http://*.pennergame.de/*
// @exclude         http://newboard.pennergame.de
// @exclude         http://change.pennergame.de/*
// @exclude         *.pennergame.de/redirect/?site=*
// @exclude         http://dontknow.me/*
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "2.7.5";
var THISSCRIPTNUMMER = "63320";
var THISSCRIPTNAME = "[PG] X-tra Weiterbildungsende Hamburg & Berlin NG Style mit Optionen";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/'+THISSCRIPTNUMMER+'.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ueberprueft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
	// Aktuelles Tagesdatum erzeugen und formatieren
	var today = new Date();
	var tagesdatum = FormatDate(today);

	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde	
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET', 
			url: THISSCRIPTINSTALL_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
								
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu erm&ouml;glichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgef&uuml;hrt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


var medialink = "http://static.pennergame.de/img/pv4/icons/"

// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer hamburg mit WWW
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer hamburg
if (url.indexOf("http://pennergame")>=0) {
var gamelink = "http://pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer muenchen mit WWW
if (url.indexOf("http://www.muenchen")>=0) {
var gamelink = "http://www.muenchen.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer halloween
if (url.indexOf("http://halloween")>=0) {
var gamelink = "http://halloween.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer halloween mit www
if (url.indexOf("http://www.halloween")>=0) {
var gamelink = "http://www.halloween.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/de_DE/schnorrplatz/arbeitsamt.jpg"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}
// Linkadressen fuer Berlin mit WWW
if (url.indexOf("http://www.berlin")>=0) {
var gamelink = "http://www.berlin.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}
// Linkadressen fuer koeln
if (url.indexOf("http://koeln")>=0) {
var gamelink = "http://koeln.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}
// Linkadressen fuer koeln mit WWW
if (url.indexOf("http://www.koeln")>=0) {
var gamelink = "http://www.koeln.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}
// Linkadressen fuer reloaded
if (url.indexOf("http://reloaded")>=0) {
var gamelink = "http://reloaded.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}
// Linkadressen fuer reloaded mit WWW
if (url.indexOf("http://www.reloaded")>=0) {
var gamelink = "http://www.reloaded.pennergame.de"
var amt = "http://static.pennergame.de/img/pv4/shop/bl_DE/schnorrplatz/amt.jpg"
}

			// alt http://media.pennergame.de/img/

			// neu http://static.pennergame.de/img/pv4/icons/





//______________________________________________

var BalkenIn1 = GM_getValue("BalkenIn1");
if (BalkenIn1 == null){
BalkenIn1 = "processbar.jpg";};

var BalkenIn2 = GM_getValue("BalkenIn2");
if (BalkenIn2 == null){
BalkenIn2 = "processbar_active.gif";};


var MenueTop2 = GM_getValue("MenueTop2");
if (MenueTop2 == null){
MenueTop2 = "95";};

var MenueLeft2 = GM_getValue("MenueLeft2");
if (MenueLeft2 == null){
MenueLeft2 = '43';};

var MenueFontColor2 = GM_getValue("MenueFontColorIn2");
if (MenueFontColor2 == null){
MenueFontColor2 = "black";};

var MenueFont2Color2 = GM_getValue("MenueFont2ColorIn2");
if (MenueFont2Color2 == null){
MenueFont2Color2 = "#006400";};


var ColorIn2 = GM_getValue("ColorIn2");
if (ColorIn2 == null){
ColorIn2 = "white";};


// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	

}

var prozent = '%'

// groesse und possition hauptcontainer
addGlobalStyle('div#main_container { position:absolute; z-index:1; top:'+MenueTop2+'px; left:'+MenueLeft2+prozent+'; width:326px;}')
// textkopf
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:'+MenueFontColor2+'; text-decoration:underline; margin-bottom:-5px; z-index:-1;}')
// container groesse und aussehen schriftausrichtung
addGlobalStyle('.inhalt_container { padding-top:15px; padding-bottom:8px; padding-left:4%; background: url(http://i49.tinypic.com/6z7lkz.png) ; font-weight:bold; color:'+MenueFontColor2+'; font-size:73%; text-align:left; } ')
// statusbalken und hintergrund
addGlobalStyle('div.prozentbalken_bg_1{ margin-top:2px; margin-left:64px; background:url('+medialink+'processbar_bg.jpg) repeat-x; border:1px solid #000;height:12px;width:200px;}')
addGlobalStyle('div.prozentbalken_1{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;}')
addGlobalStyle('div#active_prozent_1{color:'+ColorIn2+';background:url(http://static.pennergame.de/img/pv4/icons/'+BalkenIn1+') repeat-x;}')
addGlobalStyle("div#active_prozent_2{color:"+ColorIn2+";background:url(http://static.pennergame.de/img/pv4/icons/"+BalkenIn2+") repeat-x;}")

var smilie1 = "<img src='http://germanengott.ge.funpic.de/script_img/smiley902.gif ' width='16' height='16'>";
var smilie = "<img src='http://www.smiliemania.de/img/00008528.gif' width='25' height='16'>";

var waiting_for_complete = "Warten auf Fertigstellung...";
var vor_penner_training_1 = 'bereits eine Weiterbildung</div>';
var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
var vor_penner_training_wait = 'Eine weitere Bildung ist in der Warteschlange</div>';

GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/skills/",
		onload: function(response) {
			var content = response.responseText;
				try
				{

				var stufe1 = content.split('</span> [Stufe ')[1].split(']')[0];
				var stufe2 = content.split('</span> [Stufe ')[2].split(']')[0];
				var w_end_wait0 = content.split(vor_penner_training_wait)[1];
				var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
				
				if(w_end_wait == 'Angriff'){var skillpic = ""+medialink+"attack.jpg";}
      else if(w_end_wait == 'Verteidigung'){var skillpic = ""+medialink+"def.jpg";}
      else if(w_end_wait == 'Geschicklichkeit'){var skillpic = ""+medialink+"geschick.jpg";}
      else if(w_end_wait == 'Bildungsstufe'){var skillpic = ""+medialink+"bildungsstufe.jpg";}
      else if(w_end_wait == 'Musik'){var skillpic = ""+medialink+"musik_31.jpg";}
      else if(w_end_wait == 'Sozialkontakte'){var skillpic = ""+medialink+"sozkontakte.jpg";}
      else if(w_end_wait == 'Taschendiebstahl'){var skillpic  = ""+medialink+"taschendieb.jpg";}
      else if(w_end_wait == 'Sprechen'){var skillpic  = ""+medialink+"sprechen_31.jpg";}
      else if(w_end_wait == 'Konzentration'){var skillpic  = ""+medialink+"konzentration.jpg";}
				
				var date_wait = content.split('<span class="style_skill">')[4].split('</span></div>')[0];
				var container_2_zeile_1 = "<img src='"+skillpic+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\"><b>N&auml;chste Weiterbildung:</b></p><br/>";
				var container_2_zeile_2 = "<b>Warteschlange: </b><font color=\""+MenueFont2Color2+"\">"+w_end_wait+" </font> ["+stufe2+"]<br/>";

				var container_2_zeile_3 = "<b>Endet am:</b> <font color=\""+MenueFont2Color2+"\">"+date_wait+"</font> Uhr<br/>";
				var container_2_zeile_4 = '<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"100%";>Warte auf andere Weiterbildung...</div></div>';
				var inhalt_container_2 = "<div style=\"position:absolute;\" class=\"inhalt_container\">"+container_2_zeile_1+container_2_zeile_2+container_2_zeile_3+container_2_zeile_4+"</div>";
				
				var w_end0 = content.split(vor_penner_training_1)[1];
				var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
				var start_time = content.split('var start = ')[1].split(';')[0];
				var end_time = content.split('var end = ')[1].split(';')[0];
				var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];

				var end_date1 = new Date();
				end_date1.setTime(end_time * 1000);
				w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
				w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
				gesammt = end_time - start_time;
				bisher = timestamp_w - start_time;
				perc0 = (bisher / gesammt) * 100;
				if(perc0 > 0  && perc0 < 100) {
				width_balken0 = Math.round(perc0*10)/5;  
				percger0 = Math.round(perc0*10)/10; }
				if(perc0 < 0) {
				width_balken0 = 0;	
				percger0 = "-"; }
				if(perc0 > 100) {
				width_balken0 = 200; 
				percger0 = "100% "+waiting_for_complete; }
				if(timestamp_w > (end_time+120)) {
				window.document.location.reload(); }
				if (!width_balken0) {
				width_balken0 = 0; }
				
				
				var weiterbildung_0_1 = "Endet am: <font color=\""+MenueFont2Color2+"\">"+w_end_day+"</font> um <font color=\""+MenueFont2Color2+"\">"+w_end_time+" </font>Uhr";
				var weiterbildung_0_2 = "<div  class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_2\" style=\"width:"+width_balken0+"px;>"+percger0+"&#37;</div></div>";
				
				}
				catch(err)
				
					{
					try
					{
					
					var inhalt_container_2 = "";
					
					var w_end0 = content.split(vor_penner_training_1)[1];
					var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];

					var start_time = content.split('var start = ')[1].split(';')[0];
					var end_time = content.split('var end = ')[1].split(';')[0];
					var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
					
					var end_date1 = new Date();
					end_date1.setTime(end_time * 1000);
					w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
					w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
					gesammt = end_time - start_time;
					bisher = timestamp_w - start_time;
					perc = (bisher / gesammt) * 100;
					if(perc > 0  && perc < 100) {
					width_balken = Math.round(perc*10)/5;  
					percger = Math.round(perc*10)/10; }
					if(perc < 0) {
					width_balken = 0;	
					percger = "-"; }
					if(perc > 100) {
					width_balken = 200; 
					percger = "100% "+waiting_for_complete; }
					if(timestamp_w > (end_time+120)) {
					window.document.location.reload(); }
					if (!width_balken) {
					width_balken = 0; }
					

					var weiterbildung_0_1 = "Endet am: <font color=\""+MenueFont2Color2+"\">"+w_end_day+"</font> um <font color=\""+MenueFont2Color2+"\">"+w_end_time+" </font>Uhr";
					var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_2\" style=\"width:"+width_balken+"px;>"+percger+"&#37;</div></div>";
			
					}
					catch(err)
						{
						var w_type1 = "Keine";
						var stufe1 = "-0-";
						var stufe2 = "-0-";
						w_end_time = 0;
						w_end_day = 0;
						var width_balken = 200;
						var percger = 0;
						var weiterbildung_0_1 = "<font color=\""+MenueFont2Color2+"\"><b>Keine Weiterbildung!!! "+smilie+"</b></font>";
						var weiterbildung_0_2 = '<a href="'+gamelink+'/skills/"><font color=\"'+MenueFont2Color2+'\">Neue Weiterbildung starten.</font></a>';
						}
						}


GM_xmlhttpRequest({
  method: 'GET',
  url: ""+gamelink+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
		try {
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];

			if(w_type1 == 'Angriff'){var skillpic = ""+medialink+"attack.jpg";}
      else if(w_type1 == 'Verteidigung'){var skillpic = ""+medialink+"def.jpg";}
      else if(w_type1 == 'Geschicklichkeit'){var skillpic = ""+medialink+"geschick.jpg";}
      else if(w_type1 == 'Bildungsstufe'){var skillpic = ""+medialink+"bildungsstufe.jpg";}
      else if(w_type1 == 'Musik'){var skillpic = ""+medialink+"musik_31.jpg";}
      else if(w_type1 == 'Sozialkontakte'){var skillpic = ""+medialink+"sozkontakte.jpg";}
      else if(w_type1 == 'Taschendiebstahl'){var skillpic  = ""+medialink+"taschendieb.jpg";}
      else if(w_type1 == 'Sprechen'){var skillpic  = ""+medialink+"sprechen_31.jpg";}
      else if(w_type1 == 'Konzentration'){var skillpic  = ""+medialink+"konzentration.jpg";}
		else if(w_type1 == 'Keine'){var skillpic  = ""+amt+"";}
		 
		var einstelungen2 = '<div style="position:absolute; z-index:5; margin-top:-16px; margin-bottom:-17px; margin-left:275px;"><a id="einstell2" name="einstell2" class="tooltip"><img src="http://i46.tinypic.com/zvonc8.png"</img><span><li><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Einstellungen:</u></b><br/>Hier Kanst du verschiedene Anzeige Einstellungen vornehmen.</font></li></span></a></div>';

		//  style="margin-top:-3px; margin-bottom:-9px; margin-left:270px;" 
		// menue div erzeugen
		var Weiterbildung = document.createElement('div');
		Weiterbildung.setAttribute("style","z-index:-1;");
		document.body.appendChild(Weiterbildung);
		// menue bilden

		Weiterbildung.innerHTML = "<div id=\"main_container\" style=\"padding-bottom:21px \">"+inhalt_container_2+"<div class=\"inhalt_container\"><img src='"+skillpic+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\"><b>Aktuelle Weiterbildung:</b></p>&nbsp;"+einstelungen2+"<br/><b>Weiterbildung:</b> <span style=\"color:"+MenueFont2Color2+";\">"+w_type1+" </span>["+stufe1+"]<br/>"+weiterbildung_0_1+"<br/>"+weiterbildung_0_2+"</div></div>";
			
			
			}
		catch(err)
			{
			var Weiterbildung = document.createElement('div');
			Weiterbildung.setAttribute("style","z-index:-1;")
			document.body.appendChild(Weiterbildung);
			// menue bilden
			Weiterbildung.innerHTML = "";
			
			}

			//-------------------------------------------------------------
document.getElementById('einstell2').addEventListener('click', function einstell2 () {

var blauerfort = '<img src="http://static.pennergame.de/img/pv4/icons/processbar.jpg"  width="6" height="8">'
var gruenerfort = '<img src="http://static.pennergame.de/img/pv4/icons/processbar_active.gif" height="8">'

var OBalken1 = '<font style=\"color:#006400; font-weight:bold; font-size:14px;\"><u>Fortschrittbalken:</u></font><br><br><a><span align=\"center\" style=\"color:white;\"><b>Warten WB</b></span></a><center><select name=\"BalkenIn1\"><option value=\'processbar.jpg\'>1. Blau</option><option value=\'processbar_active.gif\'>2. Gr&uuml;n</option></select></center><br>';

var OBalken2 = '<a><span align=\"center\" style=\"color:white;\"><b>Laufende WB</b></span></a><center><select name=\"BalkenIn2\"><option value=\'processbar_active.gif\'>1. Gr&uuml;n</option><option value=\'processbar.jpg\'>2. Blau</option></select><br><br><font style=\"color:#FFFFFF; font-weight:bold; font-size:10px;\">Blau = '+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+'<br>Gr&uuml;n = '+gruenerfort+gruenerfort+gruenerfort+' </font></center><br>';

var OMenueFontColor2 = '<font style=\"color:#006400; font-weight:bold; font-size:14px;\"><u>Schriftfarben:</u></font><br><br><a><span align=\"center\" style=\"color:white;\"><b>Normal</b></span></a><center><select name=\"MenueFontColorIn2\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center><br>';

var OMenueFont2Color2 = '<a><span align=\"center\" style=\"color:white;\"><b>Hervorgeboben</b></span></a><center><select name=\"MenueFont2ColorIn2\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center><br>';

var Color2 = '<a><span align=\"center\" style=\"color:white;\"><b>Fortschrittbalken</b></span></a><center><select name=\"ColorIn2\">'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center><br>'
+'<font style=\"color:#006400; font-weight:bold; font-size:14px;\"><u>Script Position:</u></font><br><br><a><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span></a><center><input name="MenueTop2" size="10" type="text" value="'+MenueTop2+'"><br>'
+'<br><a><span align=\"center\" style=\"color:white;\"><b>Von Links ('+prozent+')</b></span></a><center><input name="MenueLeft2" type="text" size="10" value="'+MenueLeft2+'" ><br>';

var DSpeichern = "<br><div align=\"center\">&nbsp;&nbsp;<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue2\" value=\"Speichern\" />";
var DSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue2\" value=\"Schlie&szlig;en\" />&nbsp;&nbsp;<br>&nbsp;</div>";

var menue = OBalken1+OBalken2+OMenueFontColor2+OMenueFont2Color2+Color2+DSpeichern+DSchliessen;
var NewXtraMenueDiv = document.createElement('div');
NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute; top:'+MenueTop2+'px; left:'+MenueLeft2+'%; margin-top:2px; margin-left:-130px; font-size:x-small;-moz-border-radius:15px;-moz-opacity:1.7;opacity:1.7;border:3px solid red; background-color:black;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+menue+'</center></span></span>';
document.body.appendChild(NewXtraMenueDiv);

document.getElementsByName('SchliessenExtraMenue2')[0].addEventListener('click', function Schliessen () {
window.location.reload();
},false);

document.getElementsByName('SpeichernExtraMenue2')[0].addEventListener('click', function Schliessen () {
GM_setValue("BalkenIn1", document.getElementsByName('BalkenIn1')[0].value);
GM_setValue("BalkenIn2", document.getElementsByName('BalkenIn2')[0].value);
GM_setValue("MenueFontColorIn2", document.getElementsByName('MenueFontColorIn2')[0].value);
GM_setValue("MenueFont2ColorIn2", document.getElementsByName('MenueFont2ColorIn2')[0].value);
GM_setValue("ColorIn2", document.getElementsByName('ColorIn2')[0].value);
GM_setValue("MenueTop2", document.getElementsByName('MenueTop2')[0].value);
GM_setValue("MenueLeft2", document.getElementsByName('MenueLeft2')[0].value);
window.location.reload();
},false);
},false);



//--------------------------------------------------------------
// klammern userid
}})
// weiterbildung 1 auslesen
}})