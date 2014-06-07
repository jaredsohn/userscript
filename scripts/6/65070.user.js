// ==UserScript==
// @name         Bakschisch
// @namespace    http://www.pennergame.de
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Assistiert beim Einholen der Spenden (HH, B und M)
// @include      http://*.pennergame.de/overview/
// @version      1.0.4 Korrektur Freigabe des Buttons zum Posten der Bettelnachricht
// @version      1.0.3 Anpassungen für Pennergame München
// @version      1.0.2 Noch ein paar neue Sprüche :D
// @version      1.0.1 Ein paar neue Sprüche :D
// @version      1.0.0 Erste Version
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.0.4";
var THISSCRIPTNAME = "Bakschisch";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/65070';           // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/65070.user.js';  // Skript-URL bei userscripts.org

var SubmitButtonHTML = '<form name="Formular" action="" id="Bakschisch-Form"><input type="button" value="Bakschisch-Betteln" id="Bakschisch-Button"></form>';

// Namen der Spendenplundergrafiken
var ICON_FEINERANZUG = "feineranzug.gif";
var ICON_RAMPONIERTERANZUG = "ranzug.gif";
var ICON_STOFFTIER = "stofftier.gif";

// Farben für "gute" und "schlechte" Stati
var GoodColor = '<font color="#33cc00">';
var BadColor = '<font color="#ff0000">';

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var TOWNBASE_URL = 'http://berlin.pennergame.de/';
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1) {
	var TOWNBASE_URL = 'http://www.pennergame.de/';
	var TOWNEXTENSION = 'HH';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNBASE_URL = 'http://muenchen.pennergame.de/';
	var TOWNEXTENSION = 'MU';
}

var PLUNDER_URL = TOWNBASE_URL + 'stock/plunder/';
var SBADD_URL = TOWNBASE_URL + 'gang/chat/add/';

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
// Funktion entfernt white Space aus dem übergebenen String
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
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."

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

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die aktuelle Sauberkeit
// ***********************************************************************************************
// ***********************************************************************************************
function getCleanliness() {
	var cleanlinessdiv = document.getElementsByClassName("processbar_clean")[0];
	
	return cleanlinessdiv.style.width;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den aktuell angelegten Plunder
// ***********************************************************************************************
// ***********************************************************************************************
function getCurrentPlunder(doc) {
	var currentplunder = doc.getElementsByClassName("box special")[0];

	return currentplunder = currentplunder.getElementsByTagName("img")[0].getAttribute("src");
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Restzahl der noch zu erhaltenden Spenden
// ***********************************************************************************************
// ***********************************************************************************************
function getNrOfDonations(donationul) {
	var NrOfDonations = donationul.innerHTML.split("kannst heute also noch ")[1];

	return Number(NrOfDonations.split(" Spenden bekommen.")[0]);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den Spendenlink
// ***********************************************************************************************
// ***********************************************************************************************
function getDonationsLink() {
	return document.getElementsByClassName("link")[0].value;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion schreibt die aktuelle Anzahl eintreffender Kämpfe in die Zeilenüberschrift
// ***********************************************************************************************
// ***********************************************************************************************
function InsertSubmitButton(content, donationul) {
	
	// **********************************************************************************
	// Abrufen der Plunderseite
	// **********************************************************************************
	GM_xmlhttpRequest({
		method: 'GET', 
		url: PLUNDER_URL, 
		onload: function(responseDetails) {
			var content = responseDetails.responseText;

			var doc = HTML2DOM(content);
			
			// **********************************************************************************
			// Ermitteln relevanter Informationen
			// **********************************************************************************
			// Aktuelle Sauberkeit ermitteln
			var Cleanliness = getCleanliness();
			// Anzahl der noch beziebaren Spenden ermitteln
			var NrOfDonations = getNrOfDonations(donationul);
			// Aktuell angelegten Plunder ermitteln (Grafik-URL)
			var CurrentPlunder = getCurrentPlunder(doc);
			// Spendenlink ermitteln
			var DonationsLink = getDonationsLink();

			// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG 
			// NrOfDonations = 1;

			// **********************************************************************************
			// Überprüfung Spendenanzahl
			// **********************************************************************************
			// Wenn noch Spenden erhalten werden können
			if (NrOfDonations > 0) {
				DonationsFlag = true;
			// sonst: Es können keine Spenden mehr erhalten werden
			} else {
				DonationsFlag = false;
			}

			// **********************************************************************************
			// Überprüfung Plunder
			// **********************************************************************************
			// Wenn der Spieler noch keinen spendenfördernden Plunder hat
			if (content.indexOf(ICON_FEINERANZUG) == -1 && content.indexOf(ICON_RAMPONIERTERANZUG) == -1  && content.indexOf(ICON_STOFFTIER) == -1) {
				var NoDonationsPlunderFlag = true;
				var PlunderFlag = true;
			// sonst: Der Spieler hat mindestens einen spendenfördernden Plunder
			} else {
				var NoDonationsPlunderFlag = false;
				// Wenn Spieler den feinen Anzug besitzt
				if (content.indexOf(ICON_FEINERANZUG) != -1) {
					var BestPlunder = "Der feine Anzug ";
					// Wenn der feine Anzug angelegt ist
					if (CurrentPlunder.indexOf(ICON_FEINERANZUG) != -1) {
						var PlunderFlag = true;
					// sonst: Der feine Anzug ist NICHT angelegt
					} else {
						var PlunderFlag = false;
					}
				// Wenn Spieler den ramponierten Anzug besitzt
				} else if (content.indexOf(ICON_RAMPONIERTERANZUG) != -1) {
					var BestPlunder = "Der ramponierte Anzug ";
					// Wenn der ramponierte Anzug angelegt ist
					if (CurrentPlunder.indexOf(ICON_RAMPONIERTERANZUG) != -1) {
						var PlunderFlag = true;
					// sonst: Der ramponierte Anzug ist NICHT angelegt
					} else {
						var PlunderFlag = false;
					}
				// Wenn Spieler das Stofftier besitzt
				} else if (content.indexOf(ICON_STOFFTIER) != -1) {
					var BestPlunder = "Das Stofftier ";
					// Wenn das Stofftier angelegt ist
					if (CurrentPlunder.indexOf(ICON_STOFFTIER) != -1) {
						var PlunderFlag = true;
					// sonst: Das Stofftier ist NICHT angelegt
					} else {
						var PlunderFlag = false;
					}
				}
			}


			// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG 
			// var PlunderFlag = true;

			// **********************************************************************************
			// Überprüfung Sauberkeit
			// **********************************************************************************
			// Wenn die Sauberkeit 100% beträgt
			if (Cleanliness == "100%") {
				var CleanFlag = true;
			// sonst: Sauberkeit beträgt weniger als 100%
			} else {
				var CleanFlag = false;
			}

			// **********************************************************************************
			// Ausgabe Spendenanzahl
			// **********************************************************************************
			// Wenn noch Spenden erhalten werden können
			if (DonationsFlag) {
				if (NrOfDonations == 1) {
					donationstext = GoodColor + 'Du kannst noch <b>1 Spende</b> erhalten.</font>';
				} else {
					donationstext = GoodColor + 'Du kannst noch <b>' + NrOfDonations + ' Spenden</b> erhalten.</font>';
				}
			// sonst: Es können keine Spenden mehr erhalten werden
			} else {
				donationstext = BadColor + 'Du kannst leider <b>keine Spenden</b> mehr erhalten.</font>';
			}

			// **********************************************************************************
			// Ausgabe Plundersituation
			// **********************************************************************************
			// Wenn der Spieler noch keinen spendenfördernden Plunder hat
			if (NoDonationsPlunderFlag) {
				plundertext = GoodColor + 'Derzeit hast du leider noch keinen Spendenplunder.</font>';
			// sonst: Der Spieler hat mindestens einen spendenfördernden Plunder
			} else {
				// Wenn der Plunder OK ist
				if (PlunderFlag) {
					plundertext = GoodColor + '<b>Plunder:</b> ' + BestPlunder + 'ist angelegt.</font>';
				// sonst: Plunder ist NICHT OK
				} else {
					plundertext = BadColor + '<b>Plunder:</b> ' + BestPlunder + 'ist <b>NICHT</b> angelegt.</font>';
				}
			}

			// **********************************************************************************
			// Ausgabe Sauberkeitssituation
			// **********************************************************************************
			// Wenn die Sauberkeit OK ist
			if (CleanFlag) {
				cleantext = GoodColor + '<b>Sauberkeit:</b> Du bist komplett sauber.</font>';
			// sonst: Sauberkeit ist NICHT OK
			} else {
				cleantext = BadColor + '<b>Sauberkeit:</b> Deine Sauberkeit beträgt derzeit <b>' + Cleanliness + '</b>.</font>';
			}

			// Neues Absatzelement erzeugen
			var newp = document.createElement("p");
			newp.innerHTML = '<br /><b><font color="white">SPENDENCHECK</font></b><br /><br />' + donationstext + '<br />' + plundertext + '<br />' + cleantext;			
			// Neues Aufzählungselement erzeugen
			var newli = document.createElement("li");
			// Aufzählungselement mit Text und Button füllen und anhängen
			newli.appendChild(newp);
			newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br />";
			donationul.appendChild(newli);
			
			// Wenn alle Voraussetzungen fürs Spenden erfüllt sind
			if (DonationsFlag && PlunderFlag && CleanFlag) {
				// Button enablen
				document.getElementById("Bakschisch-Button").disabled = false;
				// Spendenschrift grün
				document.getElementsByClassName("link")[0].setAttribute("style", "color:#33cc00");
			// sonst: Mindestens eine Voraussetzung fürs Spenden ist NICHT erfüllt
			} else {
				// Button disablen
				document.getElementById("Bakschisch-Button").disabled = true;
				// Spendenschrift rot
				document.getElementsByClassName("link")[0].setAttribute("style", "color:#ff0000");
			}
			
			// ***********************************************************************************************
			// Click-Event Button
			// ***********************************************************************************************
			document.getElementById("Bakschisch-Form").addEventListener("click", function(event) 
			{ 
				function getRandomText(NrOfDonations) {
					var DonationInsertText = (NrOfDonations == 1) ? "1 Spende" : NrOfDonations + " Spenden"
	
					var bakschischad = "\n\n[small](Bettelspam erzeugt von [url=http://userscripts.org/scripts/show/65070]Bakschisch[/url])[/small]";

					// Textauswahl für Shoutbox
					var BETTELTEXT = new Array();
						BETTELTEXT[0] = "Mein Becherchen kann noch " + DonationInsertText + " vertragen:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[1] = "Ich könnte noch " + DonationInsertText + " gebrauchen:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[2] = DonationInsertText + ", das wär echt nicht schlecht jetzt:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[3] = DonationInsertText + " her oder Leben! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[4] = DonationInsertText + ", ein Königreich für " + DonationInsertText + "! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[5] = "In meinem Becher ist noch Luft für " + DonationInsertText + ":\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[6] = "Brauche Geld:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[7] = "Was würde ich jetzt nicht alles für " + DonationInsertText + " tun... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[8] = DonationInsertText + " oder keine " + DonationInsertText + ", das ist die Frage...\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[9] = "Das ist ein Überfall! Her mit der Knete! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[10] = "Klick mich, ich brauche noch " + DonationInsertText + " :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[11] = "Ich war jung und brauchte noch " + DonationInsertText + "...\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[12] = "Eine milde Gabe, für mich und meine Frau, für 99 Kinder und eine dicke Sau! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[13] = "Niemand mag Geizhälse und ich brauche noch " + DonationInsertText + "...\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[14] = "Im Pott ist noch Platz für " + DonationInsertText + ":\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[15] = DonationInsertText + " her, oder ich fall um...\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[16] = "KLICK - MICH - AN! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[17] = "Ich bin der Gerichtsvollzieher und soll hier " + DonationInsertText + " kassieren:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[18] = "Ich weiß genau, was Du letzten Sommer getan hast! " + DonationInsertText + " und die Sache ist vergessen... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[19] = DonationInsertText + ", bitte:\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[20] = "Das rote Kabel oder das blaue Kabel? Egal, erst mal " + DonationInsertText + ", bitte: :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[21] = "Schau mir in den Becher, Kleines... Platz für " + DonationInsertText + "... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[22] = DonationInsertText + ", bitte, geschüttelt, nicht gerührt: :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[23] = "Houston, wir haben keine " + DonationInsertText + "... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[24] = "Guten Tag, die Penner der Nacht brauchen Taschenlampen, damit sie nicht immer im Dunklen über den Plunder stolpern, und dafür brauche ich noch " + DonationInsertText + "... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[25] = "Komisch, heute Morgen hab ich unterm Brandenburger Tor bei der Quadriga ein Briefmarkenalbum mit Fliegen drin gefunden. " + DonationInsertText + " und es gehört Euch! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[26] = "Manche Dinge sind priceless, aber ich habe meinen Preis: " + DonationInsertText + "! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[27] = "Ich brauche noch " + DonationInsertText + " zur Finanzierung eines indischen Gast-Debuggers für ein aufstrebendes Hamburger Internet-Startup. Es ist ein bißchen dringend... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[28] = "Chuck Norris geht manchmal Blut spenden. Nur nie sein eigenes. A propos: " + DonationInsertText + " bräuchte ich noch, ansonsten muss ich Chuck holen... :)\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[29] = "MoleculeMan hat bis Unendlich gezählt... 2 Mal! So weit müsst Ihr nicht zählen, " + DonationInsertText + " und ich bin glücklich... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[30] = "Ich wurde beim Nacktbaden mit den Flamingos im Tierpark erwischt und brauche " + DonationInsertText + " für die Kaution... :(\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[31] = "So ein Bundeskanzleramt ist schnell abgebrannt... " + DonationInsertText + ", und die [i][b]Familie[/b][/i] passt darauf auf... :P\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[32] = "Ihr meint auch, Bayern müsste mal wieder dringend gegen Greuter Fürth im DFB-Pokal verlieren? " + DonationInsertText + ", und mein Freund Robert Hoyzer macht das klar... :P\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[33] = "Alder, Du hast noch kein tiefergelegtes iWin? " + DonationInsertText + " und ich tune Dir das Teil... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[34] = "Ich entsorge preisgünstig doppelt belegte Stadtteile für nur " + DonationInsertText + "... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[35] = "Du willst mit dem Geld runter, ich rauf! " + DonationInsertText + " und jeder ist glücklich... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[36] = "Du suchst Sofortkontakte zu Pennern in Deiner Gegend? Wähl' die 7353.315 für nur " + DonationInsertText + "/Min. [small](aus dem deutschen Festnetz. Mobilfunkgebühren können abweichen. Das gewählte Produkt ist Bestandteil des TopPenner-Abos. Mindestalter 16 Jahre. Diese Website und die Angebote auf dieser Website richten sich nicht an Nutzer in Großbritannien, Australien oder den USA. Nutzer aus Großbritannien, Australien und den USA können und dürfen die auf dieser Website angebotenen Services nicht nutzen und nicht bestellen. Zu Risiken und Nebenwirkungen fressen Sie die Packungsbeilage und schlagen Sie Ihren Arzt oder Apotheker. Wer das liest, ist zu nahe!)[/small]... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[37] = "Ich tausche mein fast sauberes bleichrotes Herzchen von [url]downfight.de[/url] gegen " + DonationInsertText + "... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D";
						BETTELTEXT[38] = "Hier könnte Dein Spruch stehen. Für " + DonationInsertText + " verrate ich Dir, dass Du ihn an [url=http://berlin.pennergame.de/profil/id:1146285/]sageo[/url] schicken musst... :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;
						BETTELTEXT[39] = "Für " + DonationInsertText + " rülpse ich 'Old McDonald had a farm'. 3 Strophen! :D\n\n" + "[url]" + DonationsLink + "[/url]\n\n" + "Danke! :D" + bakschischad;

					return BETTELTEXT[Math.floor(Math.random() * BETTELTEXT.length)];
				}

				// alert(getRandomText(NrOfDonations));

				// ***********************************************************************************************
				// Posten des Spendenlinks in die SB
				// ***********************************************************************************************
				GM_xmlhttpRequest({
					method: 'POST',
					url: SBADD_URL,
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('f_text=' + getRandomText(NrOfDonations) + '&Submit=Abschicken'),
					onload: function(responseDetails)
						{
							alert("Die Bettelnachricht wurde in die Shoutbox gepostet!");
						}
					});

			}, false);
		}
	});


}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************

	var content = document.getElementsByTagName("body")[0].innerHTML;

	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate();

	var donationul = document.getElementsByClassName("first")[1];

	// Submit-Button für Daten einfügen
	InsertSubmitButton(content, donationul);
	