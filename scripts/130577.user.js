// ==UserScript==
// @name			Kampfwert in der Modt
// @description		Fehler beim Premiummodus behoben.
// @namespace       http://userscripts.org/scripts/show/130577
// @author			- Pennereck.de - 
// @include			http://*pennergame.de/gang/
// @include			http://*pennergame.de/fight/
// @include			http://*pennergame.de/overview/
// @version         1.7

// ==/UserScript==


// ***********************************************************************************************
// Version 1.7 Malle eingefügt
// Version 1.6 Marken und Dex Anzeige für die neue Anzeige integriert. Zusätzlich wurde der Update Prozess geändert.
// Version 1.5 Anpassungen Reloaded für das neue Design, instalation notwending
// Version 1.5 Sylt integriert. Sollte mit Start alles laufen
// Version 1.4 Das alte Design wurde über den Haufen geschmissen. Es wird nun ein Textlink in der Menuleiste eingeblendet über den das Script geladen wird. Damit sollte die Ausgabe auch bei kommenden Designänderungen bei PG laufen. 

// Version 1.3 Weil das Anpassen solch einen Spaß macht! Erneut an neues Design angepasst.
// Version 1.3 Anpassung an Halloween Spezial
// Version 1.2 Fehler beim Namen behoben, überlange Namen wurden mit ... am Ende ausgelesen. Fehler beim senden behoben, es wurde bei aktivierter Homebase das senden blockiert. 
// Version 1.1 Anzeige der Booster wurde berichtigt. Es können nun auch die Werte des angelegten Booster übermittelt werden.
//             Anzeigefehler Wut auf der Startseite behoben. Buttongröße angepasst.
// Version 1.0 Design angepasst, kleinere Bugs behoben die den Button ausgebremst haben.
// Beta 0.02.6 Tempermonkey für Chrome nun möglich
// Beta 0.02.5 Erste Stufe zur Anzeige der Booster eingefügt
// Beta 0.02.4 München integriert
// Beta 0.02.3 Anzeige für Wut integriert
// Beta 0.02.2 manueller Eingabebereich inegriert
// Beta 0.02.1 referer gesperrt,HHR hinzugefügt
// Beta 0.02.0 angepasst
// Beta 0.01.5 kleinre anzeigebugs behoben
// Beta 0.01.5 Design angepasst, runden des Kampfwertes angepasst, ausgabe boost ist noch nicht aktiv. 
// Beta 0.01.4 Include Pennergame Koeln
// Beta 0.01.3 Speed Pennersturm

// 
// ***********************************************************************************************

// ***********************************************************************************************
// Überprüfe ob Update verfügbar
// ***********************************************************************************************
var version = "7"; // Updatecheck veriossangaben für prüfung
var updatestatus = "Prüfung nicht erfolgt";
var SUC_script_num = 130577; // userscript ID
var scriptende = ".user.js";
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000  <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('"'+script_name+'"Update verfügbar. \n\nFehler beim Premium behoben'))
								{
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+''+scriptende);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

					// Funktion in das DOM der Seite einbinden
function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

// Funktion zur Steuerung des DIV ( ein/ausblenden )
function KW_Anzeigen() {
  document.getElementById('heilung-container').style.display = 'inherit';
}
// Funktion zur Steuerung des DIV ( ein/ausblenden )
function KW_Verbergen() {
  document.getElementById('heilung-container').style.display = 'none';
}

// Textlink erzeugen und Linkadresse festlegen
function insertLink() {
	                var menu = document.getElementById('nav-2');

                var newLink = document.createElement('a');
newLink.onclick = KW_Anzeigen;
newLink.href = '#';
newLink.style.textDecoration = 'none';
 				  newLink.style.color = 'red';

var span1 = document.createElement('span');
span1.className = 'btn-left';
span1.appendChild(document.createTextNode('KW in der MotD'));
 
var span2 = document.createElement('span');
span2.className = 'btn-right';
span2.appendChild(span1);
 
newLink.appendChild(span2);
 
var item = document.createElement('li');
item.appendChild(newLink);
                menu.insertBefore(item, menu.firstChild);
            }


// erzeugen und aussehen des overlay div
function insertDiv() {
  var aExit = document.createElement('a');
  aExit.style.position = 'absolute';
  aExit.style.right = '0px';
  aExit.style.top = '0px';
  aExit.innerHTML = 'X';
  aExit.style.border = '1px solid #000000';
  aExit.style.backgroundColor = 'red';
  aExit.style.padding = '3px';
  aExit.style.fontWeight = 'bold';
  aExit.href = "javascript:KW_Verbergen();";
  
  var dContent = document.createElement('div');
  dContent.id = 'heilung-content';
  var dLink = document.createElement('div');
  dLink.style.position = 'relative';
  dLink.style.width = '300px';
  dLink.style.margin = 'auto';
  dLink.style.marginTop = '40px';
  dLink.style.marginBottom = '40px';
  dLink.style.color = '#FFFFFF';
  dLink.style.padding = '10px';
  dLink.appendChild(dContent);
  dLink.appendChild(aExit);

  
  var dOp = document.createElement('div');
  dOp.style.position = 'absolute';
  dOp.style.left = '0px';
  dOp.style.top = '0px';
  dOp.style.width = '100%';
  dOp.style.height = '100%';
  dOp.style.backgroundColor = '#000000';
  dOp.style.opacity = '0.4';
  
  var dCon = document.createElement('div')
  dCon.id = 'heilung-container';;
  dCon.style.position = 'absolute';
  dCon.style.left = '0px';
  dCon.style.top = '0px';
  dCon.style.width = '100%';
  dCon.style.zIndex = '100';
  dCon.style.display = 'none';
  dCon.appendChild(dOp);
  dCon.appendChild(dLink);
  document.body.appendChild(dCon);
  

}


// Initialisierung und Ausgabe vorbereiten
function init() {
  embedFunction(KW_Anzeigen);
  embedFunction(KW_Verbergen);
  
  insertLink();
  insertDiv();
}
init();

 
// ***********************************************************************************************
// Überprüfe die Stadt
// ***********************************************************************************************
// ***********************************************************************************************
// Berlin
// ***********************************************************************************************
if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennergame.de") != -1) {
	var link = 'http://berlin.pennergame.de';
	var tabelle = 'http://www.pennereck.de/admin/berlin.php';
	var stadt = 'berlin';

// ***********************************************************************************************
// Koeln
// ***********************************************************************************************
} else if (location.toString().indexOf("koeln") != -1 || location.toString().indexOf("koeln.pennergame.de") != -1) {
	var link = 'http://koeln.pennergame.de';
	var stadt = 'k&ouml;ln';
	var tabelle = 'http://www.pennereck.de/admin/koeln.php';


// ***********************************************************************************************
// HHR
// ***********************************************************************************************
} else if (location.toString().indexOf("reloaded") != -1 || location.toString().indexOf("reloaded.pennergame.de") != -1) {
	var link = 'http://reloaded.pennergame.de';
	var stadt = 'reloaded';
	var tabelle = 'http://www.pennereck.de/admin/hhr.php';


// ***********************************************************************************************
// Muenchen
// ***********************************************************************************************
} else if (location.toString().indexOf("muenchen") != -1|| location.toString().indexOf("muenchen.pennergame.de") != -1) {
	var link = 'http://muenchen.pennergame.de';
	var stadt = 'm&uuml;nchen';
	var tabelle = 'http://www.pennereck.de/admin/muenchen.php';
// ***********************************************************************************************
// Hamburg
// ***********************************************************************************************
} else if (location.toString().indexOf("www.pennergame.de") != -1 || location.toString().indexOf("hamburg.pennergame.de") != -1) {
	var link = 'http://www.pennergame.de';
	var stadt = 'hamburg';
	var tabelle = 'http://www.pennereck.de/admin/hamburg.php';


}
// ***********************************************************************************************
// Sylt
// ***********************************************************************************************
 else if (location.toString().indexOf("sylt") != -1 || location.toString().indexOf("sylt.pennergame.de") != -1) {
	var link = 'http://www.sylt.pennergame.de';
	var stadt = 'sylt';
	var tabelle = 'http://www.pennereck.de/admin/sylt.php';


}
// ***********************************************************************************************
// Malle
// ***********************************************************************************************
 else if (location.toString().indexOf("malle") != -1 || location.toString().indexOf("malle.pennergame.de") != -1) {
	var link = 'http://www.malle.pennergame.de';
	var stadt = 'malle';
	var tabelle = 'http://www.pennereck.de/admin/malle.php';


}
// ***********************************************************************************************
// Att Deff Wert ermitteln
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/overview/',
	onload: function(att_def) {
	var content = att_def.responseText;
	var atton = content.split('<span class="att">')[1];
	var attoff = atton.split('</span>')[0];
	var defon = content.split('<span class="def">')[1];
	var defoff = defon.split('</span>')[0];
// ***********************************************************************************************
// Namen ermitteln
// ***********************************************************************************************
	var nameon = content.split('\'CrackhousefranceRegular\'; font-size: 48px;">')[1];
	var nameoff = nameon.split('</span>')[0];

// ***********************************************************************************************
// Ermittteln ob Wut aktiv ist.
// ***********************************************************************************************

// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/fight/',
    onload: function(wut) {
    var contentstring_wut = wut.responseText;// wut wird überprüft
    var suchstring_wut = /(Wutentfachung)/g;// wut wird überprüft
    var suchergebnis = suchstring_wut.test( contentstring_wut );// wut wird überprüft
	
	// ##WUT## Verarbeitung der Prüfung und Belegung der passenden Variablen für ##WUT##
         if (suchergebnis != false){
	
        var wut = 'J';
        var wutstatus = '<img src="http://www.pennereck.de/kw_button/ja.gif" name="keine Wut" width="12" height="12" class="image" title="Eure Bande hat Wutentfachung aktiviert!" />';
                     }

         else
      {
        var wut = 'N';
        var wutstatus = '<img src="http://www.pennereck.de/kw_button/nein.png" width="12" height="12" class="image" title="Eure Bande hat keine Wutentfachung aktiviert!"/>';
       }
     

//

// ***********************************************************************************************
//  ##BOOST## Verarbeitung der Prüfung und Belegung der passenden Variablen für ##BOOST##
// ***********************************************************************************************


GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/fight/',
    onload: function(responseDetails) {
        var contentstring = responseDetails.responseText;
        var suchstring = /(Stärkung)/g;
  
        var boost = '--';
        var boost2 = 'No';
        var booston = '';
        var boostoff = '<img src="http://www.pennereck.de/kw_button/nein.png" width="12" height="12" class="image" title="Du hast keinen Booster aktiviert!"/>';
  
        var suchergebnis = suchstring.test(contentstring);
        if(suchergebnis != false) {
            var content = responseDetails.responseText;
            booston = content.split('<span><b>Stärkung:</b><br />')[1];
            boostoff = booston.split('<br />')[0].trim(); // der 1. Boost
            boost2 = booston.split('<br />')[1].trim(); // der 2. Boost
            boost = boostoff.charAt(0) + boostoff.substring(5); // beschneiden auf 2 Zeichen Boost 1
            boost2 = boost2.charAt(0) + boost2.substring(5); // beschneiden auf 2 Zeichen Boost 2

        }
		
		if (boost2 == 'D3') //prüfen ob boost A2+D3 angelegt
		   {
			boost = 'X5'; // wenn A2+D3 dann Variable belegen für DB
		    boostoff = 'A2 + D3' // Ausgabe Button
		    }
			
		if (boostoff == 'ATT: 10') //prüfen ob Berserker benutzt wird
		   {
			boost = '10'; // wenn Berserker benutzt dann Variable belegen für DB
		    boostoff = 'Du Tier ;)' // Ausgabe Button
		    }
// ***********************************************************************************************
// KW berechnen
// ***********************************************************************************************
var kampfwert = attoff*1.1;
var kampfwert3 = Number(kampfwert)+Number(defoff);
var kampfwert2 = (Math.round(kampfwert3 * 10000) / 10000);
var name = nameoff;
GM_xmlhttpRequest({
method: 'GET',
url: link+'/gang/',
onload: function(gangid) {
var content = gangid.responseText;
var gidon = content.split('<a href="/profil/bande:')[1];
var gidoff = (gidon != undefined) ? gidon.split('/')[0].trim() : '';
var right = '550px';
var top = '92px';
// ***********************************************************************************************
// Anpassung neue Halloween Design
// ***********************************************************************************************

	GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/overview/',
    onload: function(halloween) {
    var contentstring = halloween.responseText;
    var suchstring_halloween = /(http:\/\/static.pennergame.de\/styles\/pv4\/weather\/halloween.css)/g;
 
    var suchergebnis_halloween = suchstring_halloween.test( contentstring );
    if (suchergebnis != true){
	var right = '0px';
    var top = '92px';
                    }
					
// ***********************************************************************************************
// Marken ermitteln
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/daily/rewards/',
	onload: function(marken) {
	var content = marken.responseText;
	var markenon = content.split('<span style="font-size:18px; color:#FFF; font-weight:bold">')[1];
	var markenoff = (markenon != undefined) ? markenon.split('<')[0].trim() : '';

// ***********************************************************************************************
// DEX ermitteln
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/activities/',
	onload: function(dex) {
	var content = dex.responseText;
	var dexon = content.split('Deine Geschicklichkeit:')[1];
	var dexoff = (dexon != undefined) ? dexon.split('<')[0].trim() : '';
// ***********************************************************************************************
// Update ermitteln
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennereck.de/update.php',
	onload: function(update) {
	var content = update.responseText;
	var updateon = content.split('<div id="kw_in_der_modt_update">')[1];
	var updateoff = (updateon != undefined) ? updateon.split('<')[0].trim() : '';

if (updateoff > version)
{
	var updatestatus = "<span style=\"font-size:12px; color:red;\">Update verfügbar! <a href=\"http://www.pennereck.de/gm_scripte/kampfwert.user.js\" target=\"_new\" title=\"Scipt installieren\"> Update installieren</a></span>";
}
else
{
	var updatestatus = "<span style=\"font-size:12px; color:green;\">Version aktuell!</span>";
}

// ***********************************************************************************************
// Ausgabe in der Modt
// ***********************************************************************************************
document.getElementById('heilung-content').innerHTML='<table style="background-color: #292929;border: thin solid white;-moz-border-radius: 5px;border-radius: 5px " width="300px"><tr><td colspan="3" align="left">GM-Script &quot;Kampfwert&nbsp;in der MotD" (Version:1.7) </td></tr><tr><td width="150">&nbsp;</td><td>&nbsp;</td><td></td></tr><tr><td colspan="2" align="left">Folgende Werte werden übertragen:</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Name:</td><td align="left">'+name+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Stadt:</td><td align="left">'+stadt+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Kampfwert:</td><td align="left">'+kampfwert2+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Att:</td><td align="left">'+attoff+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Def:</td><td align="left">'+defoff+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Wutstatus:</td><td align="left">'+wutstatus+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Booststatus:</td><td align="left">'+boostoff+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Sammelmarken:</td><td align="left">'+markenoff+'</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;Dex:</td><td align="left">'+dexoff+'</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left">&nbsp;<input target="_self" style="cursor: pointer;" name="kw_senden" type="button" id="kw_senden" value="KW übertragen"/></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td></td><td>'+updatestatus+'</td><td>&nbsp;</td></tr></table>';
// -----------------------------------------------------
+'</div>'

// ***********************************************************************************************
// Übermitteln der Daten
// ***********************************************************************************************

document.getElementById('kw_senden').addEventListener('click', function kampfwert_senden(){


GM_xmlhttpRequest({
		method: 'POST',
		url: tabelle,
		headers: {
		'Content-type': 'application/x-www-form-urlencoded'
		},
		data: encodeURI('kw_name='+nameoff+'&kw_wert='+kampfwert2+'&kw_att='+attoff+'&kw_def='+defoff+'&kw_gangid='+gidoff+'&kw_stadt='+stadt+'&wut='+wut+'&boost='+boost+'&marken='+markenoff+'&dex='+dexoff),
		onload: function(responseDetails) {location.reload();
			
}});


},false);
	}});

	}});
	}});
		}});
		}});

	}});
		}});

	}});
// **************************************************************************************
// Das bitterböse  ENDE
// **************************************************************************************

// copyright 2012 4D-ESIGN - Pennereck.de***********************************************
// Scriptidee und Schnippselspender by JAVAN - Danke für die Freigabe********************
// **************************************************************************************
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absprache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.
// JavaScript Document