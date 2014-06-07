// ==UserScript==
// @name         SPAM Killer
// @namespace    http://userscripts.org/scripts/show/101003
// @author       abwasch
// @description  Dieses Script stellt einen SPAM Filter fuer den Posteingang zur Verfuegung. Die Keywords koennen selbst devieniert werden (HH, B, M, K, New York, Paris, Marseille, Warschau, Krakau, Madrid, Buenos Aires, Rio de Janeiro, Sao Paolo, St. Petersburg, London) This Script Is an Inbox Spam Killer and you can give it your owne Spam Keywords
// @include      http://*.pennergame.de/*
// @include      http://*.koeln.pennergame.de/*
// @include      http://*.muenchen.pennergame.de/*
// @include      http://*.berlin.pennergame.de/*
// @include      http://*.menelgame.pl/*
// @include      http://*.bumrise.com/*
// @include      http://*.clodogame.fr/*
// @include      http://*.mendigogame.es/*
// @include      http://*.mendigogame.com/*
// @include      http://*.faveladogame.com.br/*
// @include      http://*.bomzhuj.ru/*
// @include      http://*.dossergame.co.uk/*
// @exclude      http://board.*
// @exclude      http://dontknow.me/*
// @exclude      */redirect/*
// @version      1.0.4 Now works in All Games and Firefox 4
// @version      1.0.2 Grundversion von Abwasch
// ==/UserScript==



if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


//--------------Update Funktion by Sageo----------
var THISSCRIPTVERSION = "1.0.4";
var THISSCRIPTNUMMER = "101003";
var THISSCRIPTNAME = "SPAM Killer";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL für Hauptseite bei userscripts.org
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
// Funktion überprüft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
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
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nThere is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

//--------Auto Update Funktion---Ende----------------



	
	
var spam_link = 'http://'+document.URL.split('/')[2];
var spam_filter = GM_getValue('spam_rules', 'Kronkorken');

setTimeout(function (){msg_auslesen();}, 2000);



if (document.URL == spam_link+'/messages/'){
	var btn = document.getElementsByClassName('submenu')[0].getElementsByTagName('li').length+1;
	
	
var url = document.location.href;
if (url.indexOf("koeln.pennergame")>=0) {
	document.getElementsByClassName('submenu')[0].innerHTML += '<li><a id=\"spam_rules\" style=\"cursor:pointer; padding-top:10px\" class=\"btn'+btn+'\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spam-Rules</a></li>';}
	else if (url.indexOf("http://")>=0) {
	document.getElementsByClassName('submenu')[0].innerHTML += '<li><a id=\"spam_rules\" style=\"cursor:pointer\" class=\"btn'+btn+'\">Spam-Rules</a></li>';}
	document.getElementById('spam_rules').addEventListener('click', function (){
		if (!document.getElementById('spam_save')){
			var spam_div = '<div style=\"position:absolute; top:5px; right:300px; width:320px; background-color:#fcfcdf; color:#000000; padding:4px; z-index:50; '
				+'border:1px solid #000000; -moz-border-radius:3px\"><b>Spam Blacklist</b> <i>(Wortliste, durch Komma getrennt)</i><br>'
				+'<input style=\"width:260px; height:16px; background-color:#ffffff; color:#000000; bottom:4px; right:4px\" name=\"spam_rules\" type=\"text\" size=\"50\" maxlength=\"200\">'
				+'<div id=\"spam_save\" style=\"position:absolute; bottom:4px; right:4px; width:40px; background-color:#901010; color:#e4e4e4; cursor:pointer; '
				+'font-size:12px; font-weight:bold; text-align:center; padding:2px; border:1px solid #000000; -moz-border-radius:3px\">save</div></div>';
			var spam_setup = document.getElementById('messageslist').appendChild(document.createElement('div'));
		
			spam_setup.innerHTML = spam_div;
			document.getElementsByName('spam_rules')[0].value = spam_filter;
			
			document.getElementById('spam_save').addEventListener('click', function(){
				spam_filter = document.getElementsByName('spam_rules')[0].value;
				GM_setValue('spam_rules', spam_filter);
				document.getElementById('messageslist').removeChild(spam_setup);
				msg_abfrage()
			},false);
		}
	},false);
}

function msg_auslesen(){
	if (document.getElementById('ntext').getElementsByTagName('h2')[0].innerHTML = 'Neue Nachricht') msg_abfrage();
	else if (document.body.innerHTML.match(/new_msg.gif/)) msg_abfrage();
	else if (document.getElementsByClassName('trash')) msg_abfrage();
}

function msg_abfrage(){
	var spam_msg = 0;
	GM_xmlhttpRequest({
		method: 'GET',
		url: spam_link+'/messages/',
		onload: function(content){
			var msg_list = html2dom(content.responseText).getElementsByClassName('msglist');
			var filter = spam_filter.split(',');
			for (i in filter){
				for (a in msg_list){
				if (typeof msg_list[a] != 'object')
				break;
					if (msg_list[a].getElementsByTagName('strong')[0].innerHTML.match(trim(filter[i])) && filter[i] != ''){
						msg_loeschen(msg_list[a].getElementsByClassName('trash')[0])
						spam_msg++;
					}
				}
			}
			if (spam_msg > 0) showMsg('Success!', spam_msg+' Spam-'+(spam_msg > 1 ? 'Nachrichten' : 'Nachricht')+' beseitigt.', 'ok');
		}
	});
}

function msg_loeschen(del_link){
	GM_xmlhttpRequest({
		method: 'GET',
		url: del_link,
	});
}

function showMsg(title, text, pic){		//meldung - ueberschrift, hinweistext, bild
	window.setTimeout("PgFunction.showMsg($('notifyme'), '"+title+"', '<b>"+text+"</b>', '"+pic+"')", 100);
}

function html2dom(content){		//make a valid DOM-document
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = content;
	doc.appendChild(html);
	return doc;
}

function trim(s){
	while (s.substring(0,1) == ' ') s = s.substring(1,s.length);
	while (s.substring(s.length-1,s.length) == ' ') s = s.substring(0,s.length-1);
	return s;
}
