// ==UserScript==
// @name               Angrifswarner im NG Style PG 4.0 Berlin + Hamburg + Muenchen
// @namespace    by basti1012/pennerhack moded by niceguy0815 (visit: http://pennerhack.foren-city.de)
// @description    Angriffwarner mit online und Geld weg warner Pennergame 4,0 mit Auto Update Funktion. Jetzt auch für Muenchen
// @version           1.8.1 Neue Updatefunktion um Userscrit zu schonen. ACHTUNG BITTE DIE VORGEANGERVERSION IN GM MANUEL LÖSCHEN!!!
// @version           1.7.0 kleiner geschlechts Fix
// @include            http://*pennergame.de*
// @exclude           http://newboard.pennergame.de
// @exclude           http://change.pennergame.de/*
// @exclude           http://*pennergame.de/logout/*
// @exclude           http://*pennergame.de/redirect/?site=*
// ==/UserScript==


// ***********************************************************************************************
// ***********************************************************************************************
//--------------Update Funktion by Sageo----natuerlich mit seiner Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.8.1";
var THISSCRIPTNAME = "Angrifswarner im NG Style PG 4.0 Berlin + Hamburg + Muenchen";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/64908';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/64908.user.js'; // Skript-URL bei userscripts.org

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
// Funktion �berpr�ft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
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
//----Ende----Auto Update Funktion---Ende----------------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************



var statics = 'http://static.pennergame.de/img/pv4/';
var url = document.location.href;
if (url.indexOf('http://www.pennergame')>=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = 'http://www.pennergame.de'
var fightUrl = 'http://www.pennergame.de/fight/'
}
if (url.indexOf('http://pennergame')>=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = 'http://www.pennergame.de'
var fightUrl = 'http://www.pennergame.de/fight/'
}
if (url.indexOf('http://berlin.pennergame') >=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = 'http://berlin.pennergame.de'
var fightUrl = 'http://berlin.pennergame.de/fight/'
}
if (url.indexOf('http://www.berlin.pennergame') >=0) {
var staticsnra = 9;
var staticsnrb = 10;
var link = 'http://berlin.pennergame.de'
var fightUrl = 'http://berlin.pennergame.de/fight/'
}

if (url.indexOf('http://www.muenchen.pennergame') >=0) {
var staticsnra = 8;
var staticsnrb = 9;
var link = 'http://muenchen.pennergame.de'
var fightUrl = 'http://muenchen.pennergame.de/fight/'
}
if (url.indexOf('http://muenchen.pennergame') >=0) {
var staticsnra = 8;
var staticsnrb = 9;
var link = 'http://muenchen.pennergame.de'
var fightUrl = 'http://muenchen.pennergame.de/fight/'
}		
GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/bereits auf/)){
			try{
				var idausgang = content.split('bereits auf')[1].split("Angriff abbrechen")[0];
				var idaus = idausgang.split('<a href="/profil/id:')[1].split("/")[0];
				var TimeOfImpact2 = content.split(".2010")[1].split("<br />")[0];
   
					GM_xmlhttpRequest({
  						method: 'GET',
   						url: ''+link+'/dev/api/user.'+idaus+'.xml',
   							 onload: function(responseDetails,id2) {
      								var parser = new DOMParser();
      								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      								var name = dom.getElementsByTagName('name')[0].textContent;
      								var id2 = dom.getElementsByTagName('id')[0].textContent;
      									try {
      										var name1 = dom.getElementsByTagName('name')[1].textContent;
      										var id21 = dom.getElementsByTagName('id')[1].textContent;
      									}catch (e) {
      										var name1 =  '-';
      										var id21 = '-';
      									}
      									try {
      										var cash = dom.getElementsByTagName('cash')[0].textContent;
      									}catch (e) {
      										var cash = '0';
      									}

     				if (cash >= 1000) {
      			 	var color = "yellow";}
     				if (cash >= 15000){
      				var color = "orange";}
      				if (cash >= 20000){
      				var color = "#006400";}
      				if (cash >= 25000){
        			var color = "red";}
        			if (cash >= 30000){
        			var color = "blue";}
        			if (cash >= 40000){
        			var color = "black";}

					var penner = 'Penner:<font style=\"color:#006400;\"> </font> <a href="/profil/id:'+id2+'/"><font style=\"color:#006400;\"><b>'+name+'</b></font></a>'
					var bande = 'Bande: <font style=\"color:#006400;\"></font><a href="/profil/bande:'+id21+'/"><font style=\"color:#006400;\"><b>'+name1+'</b></font></a>'
					
					var sms ='<a title="Nachricht schreiben" href="'+link+'/messages/write/?to='+id2+'"><img src="'+statics+'icons/new_msg.gif" style=\"margin-bottom:2px;\"</a>';
					
					   GM_xmlhttpRequest({             
method: 'GET',
url: ''+link+'/profil/id:'+id2+'/',
onload: function(responseDetails){
var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");
try{
if (suche != -1) {
var onlinex = '<img src="'+statics+'icons/on.png" width="13" height="13" title="Online">';
var on = '1';
}
else {
var on = '2';
var onlinex = '<img src="http://i48.tinypic.com/n33d4w.png" width="13" height="13" title="Offline">';
};
}catch(e){
var on = '3';
var onlinex = '<font style=\"color:black; font-size:100%;\" title="Penner wurde gelöscht."><b>X</b></font>';
}






try {

var suche = content.search("Neue Nachricht!");
		try{
			if (suche != -1) {
				var geschlecht2 = content.split(''+statics+'')['' + staticsnrb + ''];
				var geschlecht  = geschlecht2.split('"')[0];
				} else {
				var geschlecht2 = content.split(''+statics+'')['' + staticsnra + ''];
				var geschlecht  = geschlecht2.split('"')[0];
			};
		}catch(e){
}



		if(geschlecht == 'icons/female.jpg'){var geschpic = "http://i45.tinypic.com/2ztiu5c.png";}
      else if(geschlecht == 'icons/male.jpg'){var geschpic = "http://i47.tinypic.com/2zz3n86.png";}
	   else if(geschlecht == 'plunder/nikolaus.png'){var geschpic = ""+statics+"plunder/nikolaus.png";}
	   else if(geschlecht == 'plunder/valday.png'){var geschpic = ""+statics+"plunder/valday.png";}
	   else if(geschlecht == 'premiummedia/img/js/swfobject.js'){var geschpic = "http://i48.tinypic.com/16m4w2p.png";}
	     else if(geschlecht == 'icons/new_msg.gif'){var geschpic = "http://i45.tinypic.com/2j64gwm.gif";}
		 if(geschpic == 'http://i45.tinypic.com/2j64gwm.gif'){var geschpictooltip = "Du hast eine neue Nachricht deshalb wurde das Geschlechtszeichen ausgeblendet! Es erscheint wieder wenn du die Nachricht gelesaen hast.";}
		 else if(geschpic == 'http://i48.tinypic.com/16m4w2p.png'){var geschpictooltip = "Premium Profil";}
		 else if(geschpic == ''+statics+'plunder/nikolaus.png'){var geschpictooltip = "Rote Schleife";}
		 else if(geschpic == ''+statics+'plunder/valday.png'){var geschpictooltip = "Be my Valentine!";}
		 else if(geschpic == 'http://i45.tinypic.com/2ztiu5c.png'){var geschpictooltip = "Frau";}
		 else if(geschpic == 'http://i47.tinypic.com/2zz3n86.png'){var geschpictooltip = "Mann";}
var geschlecht_imagex = '<div style="display:inline-block;"><img src="'+geschpic+'" height="17" width="17" title="'+geschpictooltip+'"></img></div>';

	} catch(err) {
var geschlecht_imagex = '<font style=\"color:green; font-size:17px;\"><b>P</b></font>';
var geschpic = "http://i48.tinypic.com/16m4w2p.png";
}   

// Gesch. Piclinks:
// Post icons/new_msg.gif
//  Nicolaus Plunder http://static.pennergame.de/img/pv4/plunder/nikolaus.png
// female http://i48.tinypic.com/2lk90lc.png  - http://i45.tinypic.com/2ztiu5c.png
// male http://i45.tinypic.com/17zojs.png   -  http://i47.tinypic.com/2zz3n86.png


					var cash6 = cash/100;
					var tbody = document.getElementsByClassName('zabsolute zleft')[0];
					tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-12px; margin-left:-14px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:106%;\"><u><b>Dein laufender Kampf:</b></u></font><p><div style=\"color:#000000; font-size:12px; margin-right:-55px;\">'+penner+' <div style=\"margin-left:187px; margin-top:-22px; margin-bottom:2px;\">'+onlinex+'&nbsp;'+sms+'&nbsp;'+geschlecht_imagex+'</div></div><div style=\"color:#000000; font-size:12px; margin-right:-55px;\">'+bande+'</div><div style=\"color:#000000; font-size:12px; margin-right:-35px;\">Geld:<font style=\"color:#006400; font-size:12px;\"> <b>'+cash6+'&euro; </b><font style=\"color:#000000; font-size:12px;\"> &nbsp; Ende:</font><b><font style=\"color:#006400; font-size:12px;\">'+TimeOfImpact2+'</b></font></font>Uhr</div></font></div></div>';
					

				}});
				}});

			}catch(e){}			
		}
	}
});

var ausweich = 'Ausweichen';

GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
            var part = content.split("warning")[1].split("<td>")[1];
            var TimeOfImpact = part.split("</td>")[0];				
try{
   var incoming1 = content.split(''+ausweich+'</strong></td>')[1];
}catch(e){
}				
  var allincoming = incoming1.split('</table>')[0];
  var anzahl = allincoming.split('<tr').length-1;	
  var id1 = allincoming.split('<a href="/profil/id:')[1]							
  var id2 = id1.split('/')[0];

gegnersuuchen(id2,anzahl,TimeOfImpact);

   }
}});



function gegnersuuchen(id2,anzahl,TimeOfImpact){

GM_xmlhttpRequest({
  method: 'GET',
   url: ''+link+'/dev/api/user.' + id2 + '.xml',
    onload: function(responseDetails,id2) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      var name = dom.getElementsByTagName('name')[0].textContent;
      var id2 = dom.getElementsByTagName('id')[0].textContent;
      try {
      var name1 = dom.getElementsByTagName('name')[1].textContent;
      var id21 = dom.getElementsByTagName('id')[1].textContent;
      }catch (e) {
      var name1 =  '-';
      var id21 = '-';
      }

      try {
      var cash = dom.getElementsByTagName('cash')[0].textContent;
      }catch (e) {
      var cash = '0';
      }

      if (cash >= 1000) {
        var color = "yellow";
      }
     
      if (cash >= 15000){
        var color = "orange";

      }
      if (cash >= 20000){
        var color = "#006400";

      }
      if (cash >= 25000){
        var color = "red";

      }
      if (cash >= 30000){
        var color = "blue";

      }
      if (cash >= 40000){
        var color = "black";
      }



geld(cash);
GM_setValue('cash',cash);


function geld(cash){
var cash1 = GM_getValue('cash');
if(cash == Number(cash1)){
}else{
var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:12px;\"><u><b>Achtung:</b></u></font><p>Dein Ziel hat soeben Geld ausgegeben oder dazuverdient bitte checke ob der angriff sich noch lohnt. Aktuelles Geld des Gegners<font style=\"color:'+color+'; font-size:11px;\"><b> '+cash3+'</b></font>.</div></div>';
}
}

var sms2 ='<a title="Nachricht schreiben" href="'+link+'/messages/write/?to='+id2+'"><img src="'+statics+'icons/new_msg.gif" width="15" height="11"</a>';

GM_xmlhttpRequest({             
method: 'GET',
url: ''+link+'/profil/id:'+id2+'/',
onload: function(responseDetails){
var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");

try{
if (suche != -1) {
var online = '<img src="'+statics+'icons/on.png" width="11" height="11" title="Online">';
var on = '1';
}
else {
var on = '2';
var online = '<img src="http://i48.tinypic.com/n33d4w.png" width="11" height="11" title="Offline">';
};
}catch(e){
var on = '3';
var online = '<font style=\"color:black; font-size:100%;\" title="Penner wurde gelöscht."><b>X</b></font>';
}
try {
		var suche = content.search("Neue Nachricht!");
		try{
			if (suche != -1) {
				var geschlecht3 = content.split(''+statics+'')['' + staticsnrb + ''];
				var geschlechty  = geschlecht3.split('"')[0];
				} else {
				var geschlecht3 = content.split(''+statics+'')['' + staticsnra + ''];
				var geschlechty  = geschlecht3.split('"')[0];
			};
		}catch(e){
}

		if(geschlechty == 'icons/female.jpg'){var geschpic2 = "http://i45.tinypic.com/2ztiu5c.png";}
      else if(geschlechty == 'icons/male.jpg'){var geschpic2 = "http://i47.tinypic.com/2zz3n86.png";}
	    else if(geschlechty == 'plunder/nikolaus.png'){var geschpic2 = ""+statics+"plunder/nikolaus.png";}
		 else if(geschlechty == 'plunder/valday.png'){var geschpic = ""+statics+"plunder/valday.png";}
		else if(geschlechty == 'premiummedia/img/js/swfobject.js'){var geschpic2 = "http://i48.tinypic.com/16m4w2p.png";}
		else if(geschlechty == 'icons/new_msg.gif'){var geschpic2 = "http://i45.tinypic.com/2j64gwm.gif";}
		 if(geschpic2 == 'http://i45.tinypic.com/2j64gwm.gif'){var geschpictooltip2 = "Du hast eine neue Nachricht deshalb wurde das Geschlechtszeichen ausgeblendet! Es erscheint wieder wenn du die Nachricht gelesaen hast.";}
		 else if(geschpic2 == 'http://i48.tinypic.com/16m4w2p.png'){var geschpictooltip2 = "Premium Profil";}
		 else if(geschpic2 == ''+statics+'plunder/nikolaus.png'){var geschpictooltip2 = "Rote Schleife";}
		 else if(geschpic2 == ''+statics+'plunder/valday.png'){var geschpictooltip = "Be my Valentine!";}
		 else if(geschpic2 == 'http://i45.tinypic.com/2ztiu5c.png'){var geschpictooltip2 = "Frau";}
		 else if(geschpic2 == 'http://i47.tinypic.com/2zz3n86.png'){var geschpictooltip2 = "Mann";}
var geschlecht_imagex2 = '<div style="display:inline-block;"><img src="'+geschpic2+'" height="17" width="17" title="'+geschpictooltip2+'"></img></div>';
	} catch(err) {
var geschlecht_imagex2 = '<font style=\"color:green; font-size:17px;\"><b>P</b></font>';
var geschpic2 = "http://i48.tinypic.com/16m4w2p.png";

}   
//  http://static.pennergame.de/img/pv4/plunder/nikolaus.png
// Gesch. Piclinks:
// female http://i48.tinypic.com/2lk90lc.png  - http://i45.tinypic.com/2ztiu5c.png
// male http://i45.tinypic.com/17zojs.png   -  http://i47.tinypic.com/2zz3n86.png



GM_setValue('on',on);
gegneron(on);

var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML +='<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon fight zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext">'
+'<font style=\"color:#000000; font-size:106%;\"><u><b>Eingehende K&auml;mpfe  '+anzahl+'</b></u></font><p>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-55px;\">Name: <a href="/profil/id:'+id2+'/"><font style=\"color:#006400; font-size:12px;\"><b>'+name+'</b></font></a><div style=\"margin-left:187px; margin-top:-22px; margin-bottom:2px;\">'+online+'&nbsp;'+sms2+'&nbsp;'+geschlecht_imagex2+'</div></div>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-55px;\">Bande: <a href="/profil/bande:'+id21+'/"><font style=\"color:#006400; font-size:12px;\"><b>'+name1+'</b></font></a></div>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-25px;\">Geld: <font style=\"color:#006400; font-size:12px;\"><b>'+cash3+'&euro; </b></font>'
+'<b></b> &nbsp;&nbsp;Ende: <font style=\"color:#006400; font-size:12px;\"> <b>'+TimeOfImpact+'</b></font> Uhr</div></div></div>';



function gegneron(on){
var online1 = GM_getValue('on');
if(on == Number(online1)){
}else
if(on == 1){
var wasistlos = 'Deiner gegner ist onliene';
}else 
if(on == 2){
var wasistlos = 'Deiner gegner ist offline';
}else
if(on == 3){
var wasistlos = 'Deiner gegner wurde von Pennergame geloescht. Bitte breche den Kampf ab!';
}
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:12px;\"><u><b>Achtung</b></u></font><p>Dein Ziel hat sich gerade ein oder ausgelogt aktueller Status deines Gegners  '+wasistlos+'.</div></div>';
}
}});
}});
}
// copyright by basti1012 