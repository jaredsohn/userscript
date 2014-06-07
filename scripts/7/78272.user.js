// ==UserScript==
// @name           Tagesaufgabe auf der Uebersichtsseite Pennergame 4.0 Hamburg + Berlin + Muenchen
// @namespace      Script by niceguy0815 and thanks to boggler 
// @description    Zeigt die Tagesaufgabe direkt auf der Uebersichtsseite das Alte TA Feld wird ausgeblendet und das E-Mail an Freunde versenden (zu PG einladen) wird auch ausgeblendet.
// @include        http://reloaded.pennergame.de/overview/
// @include        http://www.pennergame.de/overview/
// @include        http://*berlin.pennergame.de/overview/
// @include        http://*muenchen.pennergame.de/overview/
// @include        http://*koeln.pennergame.de/overview/
// @version        1.1.8 Firefox 5 Update
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion -------------------
// ***********************************************************************************************
// ***********************************************************************************************

var ScriptID = '78272';
var THISSCRIPTINSTALL_URLQ = 'http://userscripts.org/scripts/show/'+ScriptID+'';
var THISSCRIPTSOURCE_URLQ = 'http://userscripts.org/scripts/source/'+ScriptID+'.user.js';
var version = '1.1.8';
update()

//============Changlog============================================//
// @version        1.1.7  Re. added
// @version        1.1.6  Bug Fix
// @version        1.1.5  Anzeige solte wieder in allen de games gehen
// @version        1.1.4 kleiner Bugfix und änderung der Updatefunktion
// @version        1.1.3  Koeln Update
// @version        1.1.2  WM Aktion rausgeworfen!!!
// @version        1.1.1  WM Update 
// @version        1.0.9  WeiteresTagesaufgaben update, weitere TA Links hinzugefügt
// @version        1.0.8  WeiteresTagesaufgaben update, weitere TA Links hinzugefügt
// @version        1.0.7  WM Special Sammel Trikots werden ueber den Zeitraum der WM auch in der Uebersicht direkt angezeigt. Plus weitere TA Links hinzugefügt
// @version        1.0.6  WeiteresTagesaufgaben update, weitere TA Links hinzugefügt
// @version        1.0.5  WeiteresTagesaufgaben update, weitere TA Links hinzugefügt
// @version        1.0.4 Tagesaufgaben update die dritte weitere TA Links hinzugefügt
// @version        1.0.3 Kleiner Fix für zwischendurch. Das E-Mail an Freunde senden Feld wird jetzt auch mit ausgeblendet. solltet ihr dafür schon ein Script installiert haben, dann tut dieses bitte deinstalieren in GM.
// @version        1.0.2 Tagesaufgaben update die zweite weitere TA Links hinzugefügt
// @version        1.0.1 Tagesaufgaben update die erste
// @version        1.0.0 Brand new Shit es fehlen noch ein paar Tagesaufgaben die werden in den nächsten Tagen nachgereicht.
//=================================================================================//

//updatefunktion 
function update(){		
	var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+ScriptID+'.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1].substr(0, 5);
				if (newversion != version){
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n '+THISSCRIPTINSTALL_URLQ+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')){
						window.location.href = ''+THISSCRIPTSOURCE_URLQ+'';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}


// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


//---------------------------------------------------------------------------------------------------
//  			Ermitteln der PG Seite
//---------------------------------------------------------------------------------------------------

var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("berlin.pennergame.de")>=0) {
var link = "http://berlin.pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("www.berlin.pennergame.de")>=0) {
var link = "http://www.berlin.pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("muenchen.pennergame.de")>=0) {
var link = "http://muenchen.pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("www.muenchen.pennergame.de")>=0) {
var link = "http://www.muenchen.pennergame.de"
var strongnr_val = '11';
}
if (url.indexOf("koeln.pennergame.de")>=0) {
var link = "http://koeln.pennergame.de"
var strongnr_val = '12';
}
if (url.indexOf("www.koeln.pennergame.de")>=0) {
var link = "http://www.koeln.pennergame.de"
var strongnr_val = '12';
}
if (url.indexOf("reloaded.pennergame.de")>=0) {
var link = "http://reloaded.pennergame.de"
var strongnr_val = '12';
}
if (url.indexOf("www.reloaded.pennergame.de")>=0) {
var link = "http://www.reloaded.pennergame.de"
var strongnr_val = '12';
}

//---------------------------------------------------------------------------------------------------
//  			Marken auslesen
//---------------------------------------------------------------------------------------------------


	  GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/daily/rewards/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
		 
		 var marken = content.split('Deine Sammelkarten: ')[1];
         var marken2 = marken.split('&nbsp;')[0];
		  
//---------------------------------------------------------------------------------------------------
//  			Tagesaufgabe auslesen
//---------------------------------------------------------------------------------------------------


		  
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/daily/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
		 
		 var suche = content.search("Du hast diese Aufgabe schon erledigt.");
		try{
			if (suche != -1) {
				  var strongwas = '<strong style="color:#0C3">';
				   var strongnr = '1';
				   var aufgabeerledigt = 'promille_grun';
				   var kronkpng = 'http://static.pennergame.de/img/pv4/daily_jobs/korkenhaken.png';
				} else {
				 var strongwas = '<strong>';
				 var strongnr = ''+strongnr_val+'';
				 var aufgabeerledigt = 'promille_rot';			
				 var kronkpng = 'http://static.pennergame.de/img/pv4/daily_jobs/korken.png';				 
			};}catch(e){}
		 
         var taufgabe = content.split(''+strongwas+'')[''+strongnr+''];
         var taufgabe2 = taufgabe.split('</strong>')[0];
		 
//---------------------------------------------------------------------------------------------------
//  			Tagesaufabe Link zuweisen
//---------------------------------------------------------------------------------------------------
		 
		 if(taufgabe2 == 'Du hast diese Aufgabe schon erledigt.'){var taufgabelink  = "/daily/rewards/";}
		 else if(taufgabe2 == 'Jetzt einen Haustierkampf starten'){var taufgabelink  = "/fight/pet/";}
		 else if(taufgabe2 == 'Jetzt einmal 100% sauber werden'){var taufgabelink  = "/city/washhouse/";}
		 else if(taufgabe2 == 'Erstelle einen eigenen Plunder'){var taufgabelink  = "/stock/ug_plunder/create/";}
		 else if(taufgabe2 == 'Ein Verbrechen begehen'){var taufgabelink  = "/activities/crime/";}
		 else if(taufgabe2 == 'Geld in deine Bandenkasse einzahlen'){var taufgabelink  = "/gang/credit/";}
		 else if(taufgabe2 == 'Einen Kampf gewinnen'){var taufgabelink  = "/fight/";}
		 else if(taufgabe2 == 'Eine Haustierweiterbildung starten'){var taufgabelink  = "/skills/pet/";}
		 else if(taufgabe2 == 'Einen Plunder basteln'){var taufgabelink  = "/stock/plunder/craft/";}
		 else if(taufgabe2 == 'Jetzt einen kleinen Snack essen'){var taufgabelink  = "/stock/foodstuffs/food/";}			
		 else if(taufgabe2 == 'Plunder in die Plunderbank deiner Bande einzahlen'){var taufgabelink  = "/gang/stuff/";}						
		 else if(taufgabe2 == 'Promillepegel über 2‰'){var taufgabelink  = "/stock/";}
		 else if(taufgabe2 == 'Jetzt in der SB posten'){var taufgabelink  = "/gang/";}	
		 else if(taufgabe2 == 'Einmal Flaschensammeln starten'){var taufgabelink  = "/activities/";}	
		 else if(taufgabe2 == 'Jetzt Lose kaufen'){var taufgabelink  = "/city/games/";}
		 else if(taufgabe2 == 'Jetzt Flaschen verkaufen'){var taufgabelink  = "/stock/bottle/";}	
		 else if(taufgabe2 == 'Jetzt Plunder verkaufen'){var taufgabelink  = "/stock/plunder/";}		
		 else if(taufgabe2 == 'Jetzt eine PN an einen Freund versenden'){var taufgabelink  = "/messages/write/";}		
		 else if(taufgabe2 == 'Jetzt im Supermarkt Getränke kaufen.'){var taufgabelink  = "/city/supermarket/";}	
		 
		 else {var taufgabelink = '/daily/';}
		 
		 if(taufgabe2 == 'Du hast diese Aufgabe schon erledigt.'){var taufgabet_tip  = "Zu den Belohnungen";}
		 else {var taufgabet_tip = ''+taufgabe2+'';}

		var aufgabehtml = '<a href="'+taufgabelink+'"><div style="float: left; width: 25px;"><img src="'+kronkpng+'" title="'+taufgabet_tip+'"></div><div class="'+aufgabeerledigt+'" style="float: right; width: 460px; padding-top:7px; font-size:12px;" title="'+taufgabet_tip+'">'+taufgabe2+'</div></a>';

//---------------------------------------------------------------------------------------------------
//  			Ausgabe auf der Overviewseite
//---------------------------------------------------------------------------------------------------
		 
		var div_tieritemA = document.getElementsByClassName('tieritemA');
		var div_settingpoint = document.getElementsByClassName('settingpoint');

		   newdiv = document.createElement('div');
		   newdiv.setAttribute('class', 'tieritemA');
		   newdiv.style.width = "500px";
		   newdiv.style.backgroundColor="rgb(42, 42, 42)";
		   newdiv.innerHTML = '<h4><div style="padding-top:7px;">Tägliche Aufgabe:</div><div style="text-align: right;  margin-top:-21px;">Deine Sammelkarten: <a href="/daily/rewards/" title="Zu den Belohnungen">'+marken2+'</a></div></h4><center>'+aufgabehtml+'</center>';

		   if (url.indexOf("http://www.pennergame")>=0) {
		   div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 7]);
}
else if  (url.indexOf("http://berlin")>=0){
		   div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 7]);
}
else if  (url.indexOf("http://muenchen")>=0){
		   div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 7]);
}
else if  (url.indexOf("http://koeln")>=0){
		   div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 7]);
}
else if  (url.indexOf("http://reloaded")>=0){
		   div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 7]);
}
}});
}});
