// ==UserScript==
// @name               Botão para as 50 doações
// @namespace          Script Edit by James Maxwel
// @description        Botão para realizar as 50 doações em 60 segundos
// @include            *faveladogame.com/overview/
// @version            1.0.6 now also runs on Halloween
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss--------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.0.6";
var THISSCRIPTNUMMER = "82133";
var THISSCRIPTNAME = "Spendenbutton - PG4.0 - All Games";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/'+THISSCRIPTNUMMER+'.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = DateToFormat.getFullYear();
	var month = DateToFormat.getMonth() + 101 + "";
	var day = DateToFormat.getDate() + 100 + "";

	return year + "-" + month.slice(1) + "-" + day.slice(1);
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
function CheckForUpdate(german) {
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
					if (german)
						var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."
					else
						var alerttext = "There is a new version of the script '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."

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

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
	var newtable = document.createElement("table");
               	newtable.style.width = "500px";
	newtable.style.border = "#000000 2px solid";
	var newtr = document.createElement("tr");
	
	newtable.appendChild(newtr);

	for (var i = 1; i <= columnr; i++) {
		var newtd = document.createElement("td");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
	}

	return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
	for (var i = 0; i < columnnr; i++) {
		var currenttd = currenttable.getElementsByTagName("td")[i];
		currenttd.style.backgroundColor = "#006600";
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;

	return dummyDiv;
}

//---------------------------------------------------------------------------------------------------
//  			Ermitteln der PG Seite
//---------------------------------------------------------------------------------------------------

var url = document.location.href;
var link = url.split('/overview')[0];
var german = (link.substr(link.length-2,2) == "de");

CheckForUpdate(german);

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


//---------------------------------------------------------------------------------------------------
//  			Spendenlink auslesen
//---------------------------------------------------------------------------------------------------
var donationlink = document.getElementsByTagName('html')[0].innerHTML.split('name="reflink" value="')[1];
var donationlink2 = donationlink.split('"')[0];
 
 
//---------------------------------------------------------------------------------------------------
//  			Ausgabe auf der Overviewseite
//---------------------------------------------------------------------------------------------------
		 
		var div_tieritemA2 = document.getElementsByClassName('tieritemA');
		for (var i = 0; i < div_tieritemA2.length; i++)
			if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
				var donPos = i;
				break;
				}
		var lis = div_tieritemA2[donPos].getElementsByTagName('li');
		var donText = lis[3].innerHTML.replace(/[,.]/g, '').split(' ');
		var j = 0;
		for (var i = 0; i < donText.length; i++) {
			if (!isNaN(donText[i]))
				if (j++)
					var remDon = Number(donText[i]); // remaining donations
				else
					var recDon = Number(donText[i]); // received donations
		}

		var div_settingpoint2 = document.getElementsByClassName('settingpoint');

		var new2div = document.createElement('div');
		    new2div.setAttribute('class', 'tieritemA');
		    new2div.style.width = "500px";
			if (german)
				new2div.innerHTML = '<h4><div style="padding-top:9px;">Spenden holen via: <a href="http://www.menelgame.com.pl/" title="Link zu http://www.menelgame.com.pl/" target="_blank">http://www.menelgame.com.pl/</a></div><div style="text-align: right; margin-top:-20px;">Spenden &uuml;brig:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Informações:</b></u></span><br>Hier kannst du mit einem Klick deine Spenden <br>innerhalb von ca. 60 Sek. abholen!<br><br>1. Wasche deinen Penner.<br>2. Lege einen Spendenplunder an.<br>3. Klicke den <b>"Spenden holen"</b> Button.<br> &nbsp;&nbsp;&nbsp; Warte auf die Best&auml;tigung... FERTIG!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="Spenden holen" title="Klicke hier um deine Spenden f&uuml;r heute abzuholen!!!" id="holespenden"></form></div></td></tr></table>';
			else
				new2div.innerHTML = '<h4><div style="padding-top:9px;">Site das doações: <a href="http://www.menelgame.com.pl/" title="Link to http://www.menelgame.com.pl/" target="_blank">http://www.menelgame.com.pl/</a></div><div style="text-align: right; margin-top:-20px;">Doações à Receber:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Informações:</b></u></span><br>Aqui você pode receber a sua doação com um clique<br>em apenas 60seg.!<br><br>1. Limpe o seu Favelado.<br>2. Equipe um treco que aumente as doações.<br>3. Clique no botão<b>"Iniciar Doações"</b>.<br> &nbsp;&nbsp;&nbsp; Aguarde a confirmação ... PRONTO!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="Iniciar Doações" title="Clique aqui para iniciar as doações!!!" id="holespenden"></form></div></td></tr></table>';
		    div_settingpoint2[0].insertBefore(new2div, div_tieritemA2[donPos]);

		// ***********************************************************************************************
		// Fortschrittsbalken einfügen
		// ***********************************************************************************************
		var newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		if (german)
			newtd.innerHTML = 'Spendenanzahl:';
		else
			newtd.innerHTML = 'Numero de Doações';
		new2div.appendChild(newtd);
	
		var ProgressTable = CreateProgressTable(recDon+remDon);
		newtd.appendChild(ProgressTable);
		FillProgressTable(ProgressTable, recDon);
		if (remDon == 0)
			// Button disablen
			document.getElementById("holespenden").disabled = true;

		document.getElementById("holespenden").addEventListener("click", function(event) { 
			function updateDonCount(newdiv, link, lis, recDonOld, lstCnt) {
			   GM_xmlhttpRequest({
				  method: 'GET',
				  url: ''+link+'/overview/',
				  onload: function(responseDetails) {
					if (responseDetails.status == 200) {
						var content = responseDetails.responseText;
						if (content.indexOf('change_please') != -1) {
							var doc = HTML2DOM(content);

							var div_tieritemA2 = doc.getElementsByClassName('tieritemA');
							for (var i = 0; i < div_tieritemA2.length; i++)
								if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
									var donPos = i;
									break;
									}
							var lis2 = div_tieritemA2[donPos].getElementsByTagName('li');

							lis[0].innerHTML = lis2[0].innerHTML;
							lis[1].innerHTML = lis2[1].innerHTML;
							lis[2].innerHTML = lis2[2].innerHTML;
							lis[3].innerHTML = lis2[3].innerHTML;
							var money = document.getElementsByClassName("icon money");
							var money2 = doc.getElementsByClassName("icon money");
							money[0].innerHTML = money2[0].innerHTML;
							var donText = lis2[3].innerHTML.replace(/[,.]/g, '').split(' ');
							var j = 0;
							for (var i = 0; i < donText.length; i++) {
								if (!isNaN(donText[i]))
									if (j++)
										var remDon = Number(donText[i]); // remaining donations
									else
										var recDon = Number(donText[i]); // received donations
							}
							var donrem = newdiv.getElementsByTagName('div')[1];
							donrem.innerHTML = donrem.innerHTML.replace(/> [0-9]*</, '> '+remDon+'<');
							var ProgressTable = newdiv.getElementsByTagName('table')[1];
							FillProgressTable(ProgressTable, recDon);
							if (recDon == recDonOld) {
								if (lstCnt < 50)
									updateDonCount(newdiv, link, lis, recDon, lstCnt+1);
								else {
									if (german)
										alert ("Não existem mais doações!!");
									else
										alert ("Atenção!!! Compre um recepiente Maior.");
									document.location.reload();
									}
								return;
							}
							if (remDon > 0)
								updateDonCount(newdiv, link, lis, recDon, 0);
							else	
								document.location.reload();
							return;
						}
					}
					updateDonCount(newdiv, link, lis, recDon, lstCnt);
				}
			   });
			}

		  document.getElementById("holespenden").disabled = true;

		  GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://www.menelgame.com.pl/',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: encodeURI('url='+donationlink2+'&submit=Donate'),
				onload: function(responseDetails) { 

				if (german)

						alert ("Créditos pela edição: James Maxwel - Brasil");

					else
						alert ("Créditos pela edição: James Maxwel - Brasil");

					document.location.reload();
				}
				
			});
			updateDonCount(new2div, link, lis, recDon, 0);
		}, false);
