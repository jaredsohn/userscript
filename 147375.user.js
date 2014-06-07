// ==UserScript==
// @name			Homebase New Edition
// @description		Anzeige Restzeit streunen in alle städte eingefügt. 
// @namespace       http://userscripts.org/scripts/show/130577
// @author			- Pennereck.de - In Zusammenarbeit mit der  http://www.lima-city.de Crew!
// @include			http://*pennergame.de*
// @version          1.1.3
// ==/UserScript==


// ***********************************************************************************************
// ***********************************************************************************************
// Version 1.1.3  Anzeige Restzeit streunen in alle städte eingefügt.
// Version 1.1.2  Einige Anzeigefehler behoben bei Verletzung und Bandenboost
// Version 1.1.1  Fehler Anzeige Lebenspunkte Sylt behoben
// Version 1.1.0  Anzeigen für Booster, Bandenfähigkeit, bandenboost überarbeitet. Anzeige verletzugnen hinzugefügt, inklusive direktlink zum erste hilfe koffer. Für Sylt wurde die Anzeige der Lebenspunkte hinzugefügt.
// Version 1.0.9  Sylt, streunen Restzeit wird nun mit angezeigt.
// Version 1.0.8  Sylt integriert
// Version 1.0.7  Fehler Essen behoben, Fehler Updatefunktion behoben
// Version 1.0.6  Design vollständig überarbeitet
// Version 1.0.5  An Halloween Design angepasst
// Version 1.0.4  Wutanzeige hinzugefügt, Fehler beim Auslesen der HT-Weiterbildung behoben, einige neue Direktlings
// Version 1.0.3  Anzeigen erweitert. Banden, Sammelmarken, Angriffe, KW, angelegte Deffwaffe.Mouseover infos erweitert
// Version 1.0.1  Anzeigen erweitert. Wiwu laufzeit (Wut folgt), WB Laufzeiten, anktive Angriffe, angelegte Booster Plunder auslesen angepasst. Sollte nun in allen Städten laufen.
// Version 1.0.1 Stautsleiste erweitert, wut, wiwu. Direktlinks erweitern.
// Version 1.0.0 Erster Versuch der Homebase nachdem mir die Infozentrale einfach zu "voll" wurde. Erst mal nur in Köln.
// ***********************************************************************************************// 
// ***********************************************************************************************

// ***********************************************************************************************
// Überprüfe ob Update verfügbar
// ***********************************************************************************************
var SUC_script_num_homebase = 147375; // userscript ID
var scriptende_homebase = ".user.js";
try
{
	function updateCheck(homebase)
	{
		if ((homebase) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000  <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num_homebase+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(h_base)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=h_base.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm(''+script_name+' Update Infos:\n\nAnzeige Restzeit streunen in alle städte eingefügt."'+script_name+'"\nUpdate jetzt installieren?'))
								{
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num_homebase+''+scriptende_homebase);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (homebase)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (homebase)
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

// ***********************************************************************************************
// Ende Updateprüfung
// ***********************************************************************************************


// Funktion in das DOM der Seite einbinden
function embedFunction(s) {
			    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
			  }
// Funktion zur Steuerung des DIV ( ein/ausblenden )
function hb_Anzeigen() {
				document.getElementById('hb-container').style.display = 'inherit';
			  }
// Funktion zur Steuerung des DIV ( ein/ausblenden )
function hb_Verbergen() {
				document.getElementById('hb-container').style.display = 'none';
			  }
			  // Funktion zur Steuerung des DIV ( ein/ausblenden )
function pl_Anzeigen() {
				document.getElementById('pl-container').style.display = 'inherit';
			  }
// Funktion zur Steuerung des DIV ( ein/ausblenden )
function pl_Verbergen() {
				document.getElementById('pl-container').style.display = 'none';
			  }
			  

//*****************************************************
// Textlink Waschen erzeugen und Linkadresse festlegen
//*****************************************************

function insertLink_waschen() {
				var menu = document.getElementById('nav-2');
				var newLink_hb = document.createElement('a');
				newLink_hb.onclick = hb_Anzeigen;
				newLink_hb.href = '#';
				newLink_hb.style.textDecoration = 'none';
				
				var span1_hb = document.createElement('span');
				span1_hb.className = 'btn-left';
				span1_hb.appendChild(document.createTextNode('Waschen'));
				 
				var span2_hb = document.createElement('span');
				span2_hb.className = 'btn-right';
				span2_hb.appendChild(span1_hb);
				 
				newLink_hb.appendChild(span2_hb);
				 
				var item = document.createElement('li');
				item.appendChild(newLink_hb);
				menu.insertBefore(item, menu.firstChild);
							}
				
//*****************************************************
// Textlink Plunder erzeugen und Linkadresse festlegen
//*****************************************************

function insertLink_plunder() {
	            var menu = document.getElementById('nav-2');
                var newLink_pl = document.createElement('a');
				newLink_pl.onclick = pl_Anzeigen;
				newLink_pl.href = '#';
				newLink_pl.style.textDecoration = 'none';

				var span1_pl = document.createElement('span');
				span1_pl.className = 'btn-left';
				span1_pl.appendChild(document.createTextNode('Shortlinks'));
 
				var span2_pl = document.createElement('span');
				span2_pl.className = 'btn-right';
				span2_pl.appendChild(span1_pl);
 
				newLink_pl.appendChild(span2_pl);
 
				var item = document.createElement('li');
				item.appendChild(newLink_pl);
                menu.insertBefore(item, menu.firstChild);
        	    }


// erzeugen und aussehen des overlay div Waschen
function insertDiv_waschen() {
				var aExit_hb = document.createElement('a');
				aExit_hb.style.position = 'absolute';
				aExit_hb.style.right = '0px';
				aExit_hb.style.top = '0px';
				aExit_hb.innerHTML = 'X';
				aExit_hb.style.border = '1px solid #000000';
				aExit_hb.style.backgroundColor = 'red';
				aExit_hb.style.padding = '3px';
				aExit_hb.style.fontWeight = 'bold';
				aExit_hb.href = "javascript:hb_Verbergen();";
	
				var dContent_hb = document.createElement('div');
				dContent_hb.id = 'waschen-content';
				var dLink_hb = document.createElement('div');
				dLink_hb.style.position = 'relative';
				dLink_hb.style.width = '600px';
				dLink_hb.style.margin = 'auto';
				dLink_hb.style.marginTop = '40px';
				dLink_hb.style.marginBottom = '40px';
				dLink_hb.style.color = '#FFFFFF';
			  
				dLink_hb.style.padding = '10px';
				dLink_hb.appendChild(dContent_hb);
				dLink_hb.appendChild(aExit_hb);
			  
				
				var dOp_hb = document.createElement('div');
				dOp_hb.style.position = 'absolute';
				dOp_hb.style.left = '0px';
				dOp_hb.style.top = '0px';
				dOp_hb.style.width = '100%';
				dOp_hb.style.height = '100%';
				dOp_hb.style.backgroundColor = '#000000';
				dOp_hb.style.opacity = '0.4';
				
				var dCon_hb = document.createElement('div')
				dCon_hb.id = 'hb-container';;
				dCon_hb.style.position = 'absolute';
				dCon_hb.style.left = '0px';
				dCon_hb.style.top = '0px';
				dCon_hb.style.width = '100%';
				dCon_hb.style.zIndex = '100';
				dCon_hb.style.display = 'none';
				dCon_hb.appendChild(dOp_hb);
				dCon_hb.appendChild(dLink_hb);
				document.body.appendChild(dCon_hb);
			    }
				
				
// erzeugen und aussehen des overlay div Plunder
function insertDiv_plunder() {
				var aExit_pl = document.createElement('a');
				aExit_pl.style.position = 'absolute';
				aExit_pl.style.right = '0px';
				aExit_pl.style.top = '0px';
				aExit_pl.innerHTML = 'X';
				aExit_pl.style.border = '1px solid #000000';
				aExit_pl.style.backgroundColor = 'red';
				aExit_pl.style.padding = '3px';
				aExit_pl.style.fontWeight = 'bold';
				aExit_pl.href = "javascript:pl_Verbergen();";
	
				var dContent_pl = document.createElement('div');
				dContent_pl.id = 'plunder-content';
				var dLink_pl = document.createElement('div');
				dLink_pl.style.position = 'relative';
				dLink_pl.style.width = '500px';
				dLink_pl.style.margin = 'auto';
				dLink_pl.style.marginTop = '40px';
				dLink_pl.style.marginBottom = '40px';
				dLink_pl.style.color = '#FFFFFF';
			  
				dLink_pl.style.padding = '10px';
				dLink_pl.appendChild(dContent_pl);
				dLink_pl.appendChild(aExit_pl);
			  
				
				var dOp_pl = document.createElement('div');
				dOp_pl.style.position = 'absolute';
				dOp_pl.style.left = '0px';
				dOp_pl.style.top = '0px';
				dOp_pl.style.width = '100%';
				dOp_pl.style.height = '100%';
				dOp_pl.style.backgroundColor = '#000000';
				dOp_pl.style.opacity = '0.4';
				
				var dCon_pl = document.createElement('div')
				dCon_pl.id = 'pl-container';;
				dCon_pl.style.position = 'absolute';
				dCon_pl.style.left = '0px';
				dCon_pl.style.top = '0px';
				dCon_pl.style.width = '100%';
				dCon_pl.style.zIndex = '100';
				dCon_pl.style.display = 'none';
				dCon_pl.appendChild(dOp_pl);
				dCon_pl.appendChild(dLink_pl);
				document.body.appendChild(dCon_pl);
			    }
// Platzhalter Ladebereich
				function insertLink_platzhalter() {
	            var menu = document.getElementById('provocation_area');
                var newLink_platzhalter = document.createElement('div');
				newLink_platzhalter.style.textDecoration = 'none';
				newLink_platzhalter.style.height = '143px';
 				newLink_platzhalter.style.color = 'green';
				var span1_platzhalter = document.createElement('span');
				span1_platzhalter.className = 'btn-left';
				span1_platzhalter.appendChild(document.createTextNode('Homebase wird geladen...'));
 
 
				newLink_platzhalter.appendChild(span1_platzhalter);
 
				var item = document.createElement('b');
				item.appendChild(newLink_platzhalter);
                menu.insertBefore(item, menu.firstChild);
        	    }



// ***********************************************************************************************
// Überprüfe die Stadt
// ***********************************************************************************************
// ***********************************************************************************************
// Berlin
// ***********************************************************************************************

if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennergame.de") != -1) {
	var link = 'http://berlin.pennergame.de';
	var stadt = 'Berlin';
	var info_lebenspunkte = '';
// ***********************************************************************************************
// Koeln
// ***********************************************************************************************
} else if (location.toString().indexOf("koeln") != -1 || location.toString().indexOf("koeln.pennergame.de") != -1) {
	var link = 'http://koeln.pennergame.de';
	var stadt = 'Koeln';
	var info_lebenspunkte = '';

// ***********************************************************************************************
// HHR
// ***********************************************************************************************
} else if (location.toString().indexOf("reloaded") != -1 || location.toString().indexOf("reloaded.pennergame.de") != -1) {
	var link = 'http://reloaded.pennergame.de';
	var stadt = 'reloaded';
	var info_lebenspunkte = '';

// ***********************************************************************************************
// Muenchen
// ***********************************************************************************************
} else if (location.toString().indexOf("muenchen") != -1|| location.toString().indexOf("muenchen.pennergame.de") != -1) {
	var link = 'http://muenchen.pennergame.de';
	var stadt = 'Muenchen';
	var info_lebenspunkte = '';

// ***********************************************************************************************
// Hamburg
// ***********************************************************************************************
} else if (location.toString().indexOf("www.pennergame.de") != -1 || location.toString().indexOf("hamburg.pennergame.de") != -1) {
	var link = 'http://www.pennergame.de';
	var stadt = 'Hamburg';
	var info_lebenspunkte = '';

}
// ***********************************************************************************************
// sylt
// ***********************************************************************************************
 else if (location.toString().indexOf("sylt") != -1 || location.toString().indexOf("sylt.pennergame.de") != -1) {
	var link = 'http://www.sylt.pennergame.de';
	var stadt = 'sylt';
		var info_lebenspunkte = '';

}


function init1() {
				embedFunction(hb_Anzeigen);
				embedFunction(hb_Verbergen);
				embedFunction(pl_Anzeigen);
				embedFunction(pl_Verbergen);
			  
				insertLink_plunder();
				insertLink_waschen();
				insertLink_platzhalter();

				insertDiv_waschen();
				insertDiv_plunder();
}
init1();
// ***********************************************************************************************
// Angelegter Plunder wird ermittelt
// ***********************************************************************************************

	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/stock/plunder/',
	onload: function(plunder) {
	var content_plunder = plunder.responseText;
	var plunder_on = content_plunder.split('<div class="bottom">')[1];// Kampfplunder wird ermittelt
	var plunder_off = (plunder_on != undefined) ? plunder_on.split('</style>')[0].trim() : '';// Kampfplunder wird ermittelt
	var kampf_on = content_plunder.split('href="javascript:unarmPlunder(0)"><strong style="font-size:13px;">')[1];// Kampfplunder wird ermittelt
	var kampf_off = (kampf_on != undefined) ? kampf_on.split('</strong>')[0].trim() : '';// Kampfplunder wird ermittelt
	var nuetzlich_on = content_plunder.split('href="javascript:unarmPlunder(2)"><strong style="font-size:13px;">')[1];// Nützlicher Plunder wird ermittelt
	var nuetzlich_off = (nuetzlich_on != undefined) ? nuetzlich_on.split('</strong>')[0].trim() : '';// Nützlicher Plunder wird ermittelt
	var bildung_on = content_plunder.split('href="javascript:unarmPlunder(1)"><strong style="font-size:13px;">')[1];// Blidungsplunder wird ermittelt
	var bildung_off = (bildung_on != undefined) ? bildung_on.split('</strong>')[0].trim() : '';// Bildungsplunder wird ermittelt
	var schmuck_on = content_plunder.split('ref="javascript:unarmPlunder(3)"><strong style="font-size:13px;">')[1];// Schmuckplunder wird ermittelt
	var schmuck_off = (schmuck_on != undefined) ? schmuck_on.split('</strong>')[0].trim() : '';// Schmuckplunder wird ermittelt
	var _on = content_plunder.split('Boost:<br/>')[1];// Booster wird ausgelesen
	var _off = (_on != undefined) ? _on.split('</strong>')[0].trim() : '';// Booster wird ausgelesen

//Hintergrund Plunder Boost festlegen
        var contentstring = plunder.responseText;
        var _suche = /(Boost:)/g;
        var suchergebnis = _suche.test(contentstring);
        if(suchergebnis != false) {// wenn  angelegt
			
		   bg_ = 'style="background-color: #0C0;cursor: help;" title="Deine angelegten Plunder-Boost"'; // 

		}
		if (suchergebnis != true) // wenn kein 
		   {
		   bg_ = 'style="background-color: #3a3a3a;cursor: help;" title="Kein Plunder-Boost aktiv"'; // 
		   _off = 'Kein Plunder-Boost';
		   }
// ***********************************************************************************************
// ermitteln ob Banden
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/gang/missions/',
	onload: function(banden) {
	var bg_banden = '';
	var content = banden.responseText;
	var banden_name_on = content.split('<span class="item_name">')[1];//  wird ermittelt
	var banden_name_off = (banden_name_on != undefined) ? banden_name_on.split('</span>')[0].trim() : '';//  wird ermittelt
	var banden_on = content.split('<span  style="margin-left: 20px">')[1];//  wird ermittelt
	var banden_off = (banden_on != undefined) ? banden_on.split('</span>')[0].trim() : '';//  wird ermittelt
	var banden_count_on = content.split('<span><script language=\'javascript\'>counter(')[1];// Counter wird ermittelt
	var banden_count_off = (banden_count_on != undefined) ? banden_count_on.split(')</script>')[0].trim() : '';// Counter wird ermittelt


				if (banden_count_off >0) //wenn counter aktiv und größer >0
		   {

					stunden_banden = Math.floor( banden_count_off / 3600 );
					minuten_banden = Math.floor( (banden_count_off%3600) / 60 )+'m';
					sekunden_banden = Math.floor( banden_count_off%60 ); // 
					tage_banden = Math.floor( stunden_banden / 24 )+'Tag(e)'; 
					reststunden_banden = Math.floor( stunden_banden % 24 )+'h'; 

		   }

				if (banden_count_off <=0) //wenn counter <0
		   {

					stunden_banden = '';
					minuten_banden = '';
					sekunden_banden = ''; 
					tage_banden = '';
					reststunden_banden = ''; 

		   }

				if (banden_off != false) //prüfen ob Bandeb
		   {
			   reststunden_banden = 'Kein Banden-Boost'; 
			bg_banden = 'style="background-color: #3a3a3a;cursor: help;" title="Kein Banden-Boost aktiv"';
		   }
				else
				{
					
			bg_banden = 'style="background-color: #0C0;cursor: help;" title="Banden-Boost aktiv"'; // 
				}
// ***********************************************************************************************
// ENDE ermitteln ob Banden
// ***********************************************************************************************


// ***********************************************************************************************
// Start Abfrage Tagesaufgabe
// ***********************************************************************************************

GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/daily/',
    onload: function(tagesaufgabe) {
	var daily_off = '';
	var content = tagesaufgabe.responseText;
	var daily_on = content.split('<div style="text-align:center; width:98%; padding:3px; border: 1px solid #999; background:#222;">')[1];
	var daily_off = daily_on.split('</div>')[0];
    var contentstring = tagesaufgabe.responseText;
    var suchstring = /(Du hast diese Aufgabe schon erledigt.)/g;
    var suchergebnis = suchstring.test( contentstring );
				if (suchergebnis != false) //prüfen ob TA erledigt und Hintergrundfarbe setzen
		   {
			bg_ta = 'style="background-color: #3a3a3a"'; // 
		   }
		   				if (suchergebnis != true) //prüfen ob TA erledigt und Hintergrundfarbe setzen
		   {
			bg_ta = 'style="background-color: #F00"'; // 
		   }
// ***********************************************************************************************
// Ende Tagesaufgabe
// ***********************************************************************************************
// ***********************************************************************************************
// Sammelmarken werden ermittelt
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/daily/rewards/',
	onload: function(sammelmarke) {
	var sammelmarken_off = '';
	var content = sammelmarke.responseText;
	var sammelmarken_on = content.split('<span style="font-size:18px; color:#FFF; font-weight:bold">')[1];// beschneiden für ausgabe
	var sammelmarken_off = (sammelmarken_on != undefined) ? sammelmarken_on.split('</span>')[0].trim() : '';// beschneiden für ausgabe
    var marken = sammelmarken_off.charAt(0) + sammelmarken_off.substring(1); // beschneiden für ausgabe

// ***********************************************************************************************
// ermitteln ob WB´s laufen
// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/skills/',
    onload: function(wb) {
	var stunden_wb1 = '';
	var minuten_wb1 = '';
	var sekunden_wb1 = ''; // 
	var tage_wb1 = ''; 
	var reststunden_wb1 = ''; 
    var contentstring = wb.responseText;
    var suchstring1 = /(Es läuft bereits eine Weiterbildung)/g;// durchsucht den Quelltext 
    var suchergebnis1 = suchstring1.test( contentstring );	
	var suchstring = /(Eine weitere Bildung ist in der Warteschlange)/g;// durchsucht den Quelltext 
    var suchergebnis = suchstring.test( contentstring );
	var content = wb.responseText;
	var wb_on = content.split('<script language="javascript">counter(')[1];// Counter für WB wird ermittelt
	var wb_off = (wb_on != undefined) ? wb_on.split(')</script>')[0].trim() : '';// Counter für WB wird ermittelt
// ***********************************************************************************************
// ab hier wird die restlaufzeit der ersten WB  in sekunden ermittelt und umgerechnet
// ***********************************************************************************************
				if (wb_off >0) //wenn counter aktiv und  >0
		   {

					stunden_wb1 = Math.floor( wb_off / 3600 );
					minuten_wb1 = Math.floor( (wb_off%3600) / 60 );
					sekunden_wb1 = Math.floor( wb_off%60 ); // 
					tage_wb1 = Math.floor( stunden_wb1 / 24 ); 
					reststunden_wb1 = Math.floor( stunden_wb1 % 24 ); 

		   }

				if (stunden_wb1 < 1) //wenn counter aktiv und <1
		   {
			   bg_wb1 = 'style="background-color: #FF6600;cursor: pointer;" title="WB endet in weniger als 1 Stunde"'; // 
		   }

		
				if (suchergebnis != false) //prüfen ob 2 WB läuft
		   {
			bg_wb2 = 'style="background-color: #0C0;cursor: pointer;" title="Eine weitere Bildung ist in der Warteschlange"'; //
						wb2_text = 'Bildung eingereiht!';
 
		   }
		   				if (suchergebnis != true) //wenn 2te wb fehlt
		   {
			bg_wb2 = 'style="background-color: #F00;cursor: pointer;" title="Du kannst eine weitere Weiterbildung einreihen."'; // 
						wb2_text = 'Bitte weitere Bildung einreihen!';

		   }

				if (suchergebnis1 != false) //prüfen ob 1te WB läuft
		   {
			bg_wb1 = 'style="background-color: #0C0;cursor: pointer;" title="Es läuft bereits eine Weiterbildung"'; // 
		   }
		   				if (suchergebnis1 != true) //wenn 1te wb fehlt
		   {
			bg_wb1 = 'style="background-color: #F00;cursor: pointer;" title="Deiner Bildung hilft dieser Zustand nicht wirklich, starte eine Weiterbildung."'; // 
		   }
// ***********************************************************************************************
// Ende ermittteln ob WB´s laufen
// ***********************************************************************************************
// ***********************************************************************************************
// Start Sylt streunen
// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+/overview/,
    onload: function(ht_streunen) {
	var content = ht_streunen.responseText;
	var ht_streuner_on = content.split('<script language=\'javascript\'>counter(')[1];// Counter wird ermittelt
	var ht_streuner_off = (ht_streuner_on != undefined) ? ht_streuner_on.split(')</script>')[0].trim() : '';// Counter wird ermittelt
	var lebenspunkte_on = content.split('Lebenspunkte: <b>')[1];// Counter wird ermittelt
	var lebenspunkte_off = (lebenspunkte_on != undefined) ? lebenspunkte_on.split('</b>')[0].trim() : '';// Counter wird ermittelt

		   				if (stadt == 'sylt', 'koeln', 'berlin', 'hamburg', 'reloaded', 'muenchen') //prüfen ob sylt gespielt wird
						{
						info_lebenspunkte = '<a class="tooltip" href="#">[?]<span><b>Lebenspunkte</b><br>Deine Lebenspunkte sind wichtig für deinen DEF-Wert. Hast du wenig Lebenspunkte, wird dein DEF-Wert reduziert.<br>Du verlierst bei jedem Kampf Lebenspunkte und kannst diese z.B. durch ein Erste Hilfe Paket in der Apotheke wieder auffüllen.</span>';
		   				if (ht_streuner_off >0) //wenn counter aktiv und größer >0
				   	   {
						var	minuten_streunen = '<a href="http://'+stadt+'.pennergame.de/pet/" target="_self">Noch '+ Math.floor( (ht_streuner_off%3600) / 60 ) +' min streunen<\/a>';
						bg_streuner = 'style="background-color: #0C0;cursor: pointer;" title="Dein Haustier ist unterwegs."'; // 
					   }
		   				if (ht_streuner_off <1) //wenn counter kleiner als 1
					   {
						var	minuten_streunen = '<a href="http://'+stadt+'.pennergame.de/pet/" target="_self">HT hat Langeweile!!</a>';
						bg_streuner = 'style="background-color: #F00;cursor: pointer;" title="Du kannst dein Haustier wieder streunen schicken"';
					   }

					   }
						 else
					   {
						var	minuten_streunen = ''; 
						bg_streuner = '';
					   }

// ***********************************************************************************************
// ende Sylt streunen
// ***********************************************************************************************


// ***********************************************************************************************
// ermitteln ob  WB´s laufen
// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/skills/pet/',
    onload: function(ht_wb) {
	var stunden = '00';
	var minuten = '00';
	var sekunden = '00'; 
	var tage = '00';
	var reststunden = '00'; 
    var contentstring = ht_wb.responseText;
    var suchstring = /(Es läuft bereits eine Weiterbildung)/g;// durchsucht den Quelltext 
    var suchergebnis = suchstring.test( contentstring );	
	var content = ht_wb.responseText;
	var wb_ht_on = content.split('<script language="javascript">counter(')[1];// Counter wird ermittelt
	var wb_ht_off = (wb_ht_on != undefined) ? wb_ht_on.split(')</script>')[0].trim() : '';// Counter wird ermittelt

// ***********************************************************************************************
// ab hier wird die restlaufzeit der weiterbildung in sekunden ermittelt und umgerechnet
// ***********************************************************************************************
if (suchergebnis != false) //prüfen ob 1 Haustier WB läuft
		   {
			bg_ht_wb = 'style="background-color: #0C0;cursor: pointer;" title="Es läuft eine Haustierweiterbildung"'; // 
		   }
		   				if (suchergebnis != true) //wenn Haustier wb fehlt
		   {
			bg_ht_wb = 'style="background-color: #F00;cursor: pointer;" title="Bei Zeit und Lust könnte eine neue Haustierweiterbildung eingereiht werden."';
		   }
		   				if (wb_ht_off >0) //wenn counter aktiv und größer >0
		   {

				var	stunden = Math.floor( wb_ht_off / 3600 );
				var	minuten = Math.floor( (wb_ht_off%3600) / 60 )+' min';
				var	sekunden = Math.floor( wb_ht_off%60 ); // 
				var	tage = Math.floor( stunden / 24 )+' Tage '; 
				var	reststunden = Math.floor( stunden % 24 )+' Std'; 
		   }

				if (wb_ht_off <=0) //wenn counter aktiv und größer <=0
		   {

					var stunden = '00';
					var minuten = '00';
					var sekunden = '00'; 
					var tage = '00';
					var reststunden = '00'; 
		   }
		   				if (stadt == 'sylt') //prüfen ob sylt gespielt wird
		   {

					var stunden = '';
					var minuten = '';
					var sekunden = ''; 
					var tage = '';
					var reststunden = ''; 
					var	bg_ht_wb = '';
		   }
		   
		 

// ***********************************************************************************************
// Ende ermitteln ob  WB´s laufen
// ***********************************************************************************************



// ***********************************************************************************************
// Ermittteln ob Wut aktiv ist.
// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/gang/',
    onload: function(wut) {
    var contentstring = wut.responseText;
    var suchstring = /(Wutentfachung ist aktiv)/g;
    var suchergebnis = suchstring.test( contentstring );
if (suchergebnis != false) //prüfen ob wut 
		   {
			status_wut = 'on';

		   }
		   				if (suchergebnis != true) // wenn keine wut

		   {
			bg_wut = '';
			status_wut = 'off';
 // 
		   }
//ab hier wird die Restlaufzeit der WUT ermittelt
	var content = wut.responseText;//übernimmt den content von wiwu da gleich
	var wut_on = content.split('<strong>Wutentfachung ist aktiv!</strong> (<script language=\'javascript\'>counter(')[1];// Counter wird ermittelt
	var wut_off = (wut_on != undefined) ? wut_on.split(')</script>')[0].trim() : '';// Counter wird ermittelt

				if (wut_off >0) //wenn counter aktiv und größer >0
		   {
				var	stunden_wut = Math.floor( wut_off / 3600 );
				var	minuten_wut = Math.floor( (wut_off%3600) / 60 )+'m';
				var	reststunden_wut = 'Wut: '+Math.floor( stunden_wut % 24 )+'h'; 

		   }


				if (wut_off <1) //counter verhalten bei <1
		   {
				var	stunden_wut = '';
				var	minuten_wut = '';
				var	reststunden_wut = ''; 
		   }

// ***********************************************************************************************
// Ermittteln ob WiWu aktiv ist.
// ***********************************************************************************************

// ***********************************************************************************************
GM_xmlhttpRequest({
    method: 'GET',
    url: link+'/gang/',
    onload: function(wiwu) {
    var contentstring = wiwu.responseText;
    var suchstring_wiwu = /(Wirtschaftswunder ist aktiv)/g;
    var suchergebnis = suchstring_wiwu.test( contentstring );
	var content = wiwu.responseText;

				if (suchergebnis != false) //prüfen wiwu
		   {
			bg_wiwu = 'style="background-color: #0C0;cursor: help;" title="Wirtschaftswunder aktiv"';
			status_ww = 'on';
 // 
		   }
		   				if (suchergebnis != true) //wenn kein wiwu
		   {
			bg_wiwu = 'style="cursor: help;" title="Keine Bandenfähigkeit aktiv ( Wiwu, Wut )"'; // 
			status_ww = 'off';
			

		   }
	var content = wiwu.responseText;
	var wiwu_on = content.split('<strong>Wirtschaftswunder ist aktiv!</strong> (<script language=\'javascript\'>counter(')[1];// Counter wird ermittelt
	var wiwu_off = (wiwu_on != undefined) ? wiwu_on.split(')</script>')[0].trim() : '';// Counter wird ermittelt

				if (wiwu_off >0) //wenn counter aktiv und größer >0
		   {

				var	stunden_wiwu = Math.floor( wiwu_off / 3600 );
				var	minuten_wiwu = Math.floor( (wiwu_off%3600) / 60 )+'m';
				var	reststunden_wiwu = 'Wiwu: '+Math.floor( stunden_wiwu % 24 )+'h'; 

		   }


				if (wiwu_off <1) //counter verhalten bei <1
		   {
				var	stunden_wiwu = '';
				var	minuten_wiwu = '';
				var	reststunden_wiwu = ''; 
		   }
		   
// ***********************************************************************************************
// Ende ermittteln ob WiWu aktiv ist.
// ***********************************************************************************************

// ***********************************************************************************************
// Start ermitteln ob eine Bandenfähigkeit aktiv ist und Textfeld belegen
// ***********************************************************************************************
if (status_wut == status_ww)
{
var text_bande = 'Keine Bandenfähigkeit';
}
else
{
var text_bande = '';
}
// ***********************************************************************************************
// Ende ermitteln ob eine Bandenfähigkeit aktiv ist und Textfeld belegen
// ***********************************************************************************************

// ***********************************************************************************************
// Start  ermittteln ob Verletzung vorliegt.
// ***********************************************************************************************

	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/fight/',
	onload: function(verletzung) {
    var contentstring = verletzung.responseText;
    var suchstring_verletzung = /(Du bist verletzt)/g;
    var suchergebnis = suchstring_verletzung.test( contentstring );
	var content = verletzung.responseText;
	
					if (suchergebnis != false) //Wenn eine Verletzung vorliegt
		   {
			bg_verletzung = 'style="background-color: #F00;cursor: help;"'; // 
			text_verletzung = 'ACHTUNG! Verletzt!';
		   }
		   				if (suchergebnis != true) // Wenn keine Verletzung vorliegt
		   {
			bg_verletzung = 'style="cursor: help;"'; // 	
			text_verletzung = 'Keine Verletzung';

		   }

// ***********************************************************************************************
// Ende  ermittteln ob Verletzung vorliegt.
// ***********************************************************************************************


// div einbetten
function getSign(){
var code = '<table><tr><td><table width="565px" style="background-color: #3a3a3a;border: thin solid #2f2f2f;"><tr><td valign="top"><table width="160px" bgcolor="#252525" style="border: thin solid #2f2f2f;"><tr><td><a href="http://'+stadt+'.pennergame.de/stock/plunder/" target="_self" title="Zur Plunderübersicht"><b>Angelegter Plunder</b></a><hr></td></tr><tr><td>'+kampf_off+'</td></tr><tr><td>'+bildung_off+'</td></tr><tr><td>'+nuetzlich_off+'</td></tr><tr><td>'+schmuck_off+'</td></tr></table></td><td valign="top"><table width="120"  style="border: thin solid #2f2f2f;"><tr><td '+bg_ta+'><a href="http://'+stadt+'.pennergame.de/daily/" target="_self" title="Zur Tagesaufgabe"><b>Tagesaufgabe</b></a> (<a href="http://'+stadt+'.pennergame.de/daily/rewards/" target="_self" style="cursor: pointer"><b title="Deine Sammelmarken, klicke hier um zur Belohnungseite zu gelangen.">'+marken+'</b></a>)<hr></td></tr><tr><td>'+daily_off+'</td></tr></table></td><td valign="top"><table width="140" bgcolor="#252525" style="border: thin solid #2f2f2f;"><tr><td><a href="http://'+stadt+'.pennergame.de/skills/" target="_self" title="Zu den Weiterbildungen"><b>Weiterbildungen</b></a><hr></td></tr><tr><td '+bg_wb1+'>'+tage_wb1+'Tag(e) '+reststunden_wb1+'h '+minuten_wb1+'min<hr /></td></tr><tr><td '+bg_wb2+'>'+wb2_text+'<hr /></td></tr><tr><td '+bg_ht_wb+'>'+tage+''+reststunden+' '+minuten+'<hr /></td></tr><tr><td '+bg_streuner+'>'+minuten_streunen+'<hr /></td></tr></table></td><td valign="top"><table width="140" ><tr><td '+bg_+'><hr>'+_off+'</td><td><a class="tooltip" href="#">[?]<span><b>Angelegte Plunder-Booster</b><br>Hast Du einen Plunder-Boost angelegt wird der Hintergrund Grün und Dir wird der Name des Boosters angezeigt.</span></a></td></tr><tr><td></td><td></td></tr><tr><td><hr>'+banden_name_off+''+tage_banden+' '+reststunden_banden+' '+minuten_banden+'</td><td><a class="tooltip" href="#">[?]<span><b>Banden-Booster</b><br>Hat Eure Bande einen Booster freigeschalten wird der Hintergrund Grün und Dir wird der Name des Boosters angezeigt. Wird der Banden-Booster aktiviert wird Dir zusätzlich die Restlaufzeit angezeigt.</span></a></td></tr><tr><td></td><td></td></tr><tr><td '+bg_wiwu+'><hr />'+reststunden_wiwu+' '+minuten_wiwu+' '+reststunden_wut+' '+minuten_wut+''+text_bande+'</td><td><a class="tooltip" href="#">[?]<span><b>Bandenfähigkeiten</b><br>Hat Eure Bande eine Bandenfähigkeit aktiviert ( Wut / Wiwu ) wird der Hintergrund Grün und Dir wird die Restlaufzeit angezeigt.</span></a></td></tr><tr><td '+bg_verletzung+'><hr />'+text_verletzung+'&nbsp;&nbsp;<a href="http://'+stadt+'.pennergame.de/stock/newplunder/execboost/?pid=68" target="_self"><img src="http://www.pennereck.de/images/erstehilfe_koffer.png" width="15" height="13" /></a></td><td><a class="tooltip" href="#">[?]<span><b>Verletzungen</b><br>Liegt eine Verletzung vor wird der Hintergrund Rot, Du kannst mit einem Klick auf den Erste Hilfe Kasten direkt eine Heilung durchführen.Es wird keine laufende Prüfung durchgeführt, es wird lediglich bei jedem Klick im Spiel auf Verletzungen geprüft.</span></a></td></tr><tr><td><hr>Lebenspunkte: '+lebenspunkte_off+'</td><td>'+info_lebenspunkte+'</td></tr></table></td></tr><tr><td rowspan="2">&nbsp;</td><td rowspan="2">&nbsp;</td><td rowspan="2"></td><td></td></tr><tr><td></td></tr><tr><td><hr /><form id="essen_form" method="post" action="/stock/foodstuffs/use/" target="popup"><input id="drink_Brot" type="submit" value="Essen" title="Achte darauf dass Du genügend Essen im Inventar hast. Es wird kein automatischer Einkauf vorgenommen! Benötigt wird in: HHR und Hamburg=Brot, Köln= Röggelchen, Berlin=Stullen, München= Leberkas( Wird im neuen Tab ausgeführt )"/><input type="hidden" name="item" value="Brot"><input id="Brot" type="hidden" value="-0.35" /><input type="hidden" name="promille" value="-35" /><input type="hidden" name="id" value="2" />&nbsp;<input id="menge_Brot" type="text" size="2" name="menge" value="8" onKeyUp="generateWirkung(3);" /></form></td><td><hr /><form method="post" action="/stock/foodstuffs/use/" target="popup"><input id="drink_Bier" type="submit" value="Trinken" title="Achte darauf dass Du genügend Getränke im Inventar hast. Es wird kein automatischer Einkauf vorgenommen! Benötigt wird Limo/Bier.( !! Nur ein mal Kicken, wird im neuen Tab ausgeführt, lieber Seitenreload als Koma)"/><input type="hidden" name="item" value="Bier"><input type="hidden" name="promille" value="35" /><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="id" value="1" />&nbsp;<input id="menge_Bier" type="text" size="2" name="menge" value="8" onKeyUp="generateWirkung(1);" /></form></td><td colspan="2"><table><tr><td width="140px"><hr /></td><td width="140x"><hr /></td></tr></table></td></tr></table></td></tr><tr><td>&nbsp;</td></tr></table>';
document.getElementById("provocation_area").innerHTML = code;
};




// Initialisierung und Ausgabe des DIV vorbereiten
function init() {
				
			    getSign();
			  }
init();
// ***********************************************************************************************
//  Waschen wird eingelesen
// ***********************************************************************************************

	GM_xmlhttpRequest({
	method: 'GET',
	url: link+'/city/washhouse/',
	onload: function(waschen) {
	var content = waschen.responseText;
	var waschen_on = content.split('<div class="listshop" style="float: left;">')[1];// Wasdhen Status
	var waschen_off = (waschen_on != undefined) ? waschen_on.split('</div>')[0].trim() : '';// Waschen Status


 

document.getElementById('waschen-content').innerHTML='<div style="background-color: #292929;border: thin solid white;-moz-border-radius: 5px;border-radius: 5px " width="500px">'+waschen_off+'<div>';
document.getElementById('plunder-content').innerHTML='<table style="background-color: #292929;border: thin solid white;-moz-border-radius: 5px;border-radius: 5px " width="500px"><tr><td colspan="3" align="left">Homebase Shortlinks</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/gang/credit/" target="_self">Bandenkasse</a> | <a href="http://'+stadt+'.pennergame.de/gang/stuff/" target="_self">Plunderbank</a></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/skills/pet/" target="_self"> WB</a> | <a href="http://'+stadt+'.pennergame.de/fight/pet/" target="_self">kampf</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/city/games/" target="_self">Lose kaufen</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/stock/plunder/craftlist/" target="_self">Plunder basteln</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/city/district/" target="_self">Stadtteil wechseln</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/city/supermarket/" target="_self">Supermarkt</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/city/weapon_store/" target="_self">Waffe kaufen</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://'+stadt+'.pennergame.de/stock/armoury/" target="_self">Waffe verkaufen</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://www.pennereck.de/u_seiten/spenden.php" target="_blank">Spendenseiten</a></td><td align="left"></td><td>&nbsp;</td></tr><tr><td align="left"><a href="http://board.pennergame.de/" target="_blank">PG-Forum</a></td><td align="left">&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td><a href="http://www.pennereck.de/board/viewforum.php?f=76" target="_blank"><small>Homebase Ideen / Vorschläge</small></a></td><td>&nbsp;</td></tr></table>';

	

	}});
	}});
	}});
	}});
	}});
	}});
	}});
	}});
	}});
	}});
	}});
