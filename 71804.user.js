// ==UserScript==
// @name           Simple Translation Script for Feuerwache.net
// @description    Translates feuerwache.net from german to dutch
// @include        http://www.feuerwache.net/*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @author         Alex Calsbeek
// @version        1.0.2
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
// Lange zinnen altijd eerst!
"In deinem Feuerwehrverband Verstärkung anfordern" : "In jou brandweerregio versterking aanvragen",
"Zum abstreuen benötigen wir den GW-Öl!" : "Om de olie beter op te ruimen hebben we de GW-Öl nodig",
"Derzeit fahren deine Feuerwehrleute zum Fahrzeug." : "De brandweerlieden zijn onderweg naar de wagen.",
"Aufgrund der Voortgang wird ein ELW 1 benötigt." : "Voor verdere werkzaamheden is een ELW 1 nodig!",
"Die Lage wird zu unübersichtlich! Wir brauchen einen ELW 1." : "De situatie is te onoverzichtelijk, we hebben de ELW 1 nodig.",
"Uns gehen die Atemschutzgeräte aus! Wir benötigen einen GW-A." : "Onze zuurstof raakt op! We hebben de GW-A nodig.",
"Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "De brand is groter geworden en onze middelen zijn niet toe rijkend. We hebben de GW-L2-Wasser nodig voor extra slangen",
"Schaue bitte in die Funksprüche der Fahrzeuge!" : "Graag in het commentaar van uw voertuigen kijken!",
"Wir ben�tigen Material vom Rüstwagen (RW)!" : "We hebben materiaal nodig van de RW!",
"Hier wird es zu unübersichtlich! Wir benötigen einen ELW 1" : "Het is te onoverzichtelijk. We hebben de ELW 1 nodig!",
"Unbekannte Stoffe sind ausgetreten. Wir benötigen zum Messen einen GW-Messtechnik" : "Er is een onbekende stof vrijgekomen. Om te kunnen bepalen welke stof het is hebben we de GW-Messtechnik nodig",
"Unbekannte Stoffe sind ausgetreten. Wir benötigen einen GW-Gefahrgut." : "Er is een onbekende stof vrijgekomen. We hebben de GW-Gefahrgut nodig!",
"Beim Verkehrsunfall sind große Mengen Öl ausgelaufen! Wir brauchen den GW-Öl!" : "Bij het verkeersongeval zijn grote hoeveelheden olie op de weg gekomen. We hebben de GW-Öl nodig!",
"Es treten unbekannte Gase aus. Wir brauchen zur Abklärung einen GW-Messtechnik" : "Er komt een onbekende stof vrij. Voor analyze hebben wij een GW-Messtechnik nodig",
"Für Dachlöscharbeiten wird eine DLA (K) 23/12 benötigt." : "Om bij het dak te kunnen hebben wij een DLA (K) 23/12 nodig.",
"Fahrzeuge mit der höchsten Laufleistung" : "Voertuigen met de hoogste KM-stand",
"Wir benötigen die Ausrüstung vom GW-Gefahrgut." : "We hebben de uitrusting van de GW-Gefahrgut nodig.",
"Wir benötigen für weitere Löscharbeiten dringend eine Drehleiter (DLA (K) 23/12)." : "Verdere werkzaamheden zijn op hoogte! Hiervoor hebben wij een Hoogwerker ( DLA (K) 23/12 ) nodig!",
////////////////////////////////////////////////// Korte woorden komen hier
"Neue Feuerwache gründen" : "Nieuwe kazerne bouwen",
"Frei (Dienstfahrt)" : "Vrij (Inzetbaar)",
"Fahrzeuge die unterwegs sind" : "Voertuigen die onderweg zijn",
"Nicht einsatzbereit" : "Niet inzetbaar",
"Gesamt Laufleistung" : "Totale KM-Stand",
"Durchschnittliche Laufleistung" : "Gemiddelde Km-Stand",
"Anzahl Fahrzeuge" : "Aantal voertuigen",
"Einsatzbereit auf Wache" : "Inzetbaar vanaf kazerne",
"Laufleistung" : "KM-Stand",
"Nachrichten" : "Berichten",
"Zustand" : "Conditie",
"Werbeaktion" : "Wervingsactie",
"Ausflug" : "Vakantie",
"Fahrzeugmarkt" : "Voertuigdealer",
"Vom Einsatz abziehen" : "Van melding vrij maken",
"Einsätze deines Verbandes" : "Meldingen in de omgeving",
"Verstärkung" : "Versterking",
"feuerwachen" : "Kazernes",
"Startseite" : "Hoofdpagina",
"Einsätze" : "Meldingen",
"Neues Gebäude bauen" : "Nieuw gebouw bouwen",
"Gebäude" : "Gebouwen",
"Meldung des Anrufers" : "Melding",
"Aktuelle Meldingen" : "Actuele Meldingen",
"Meldingen in deiner Stadt" : "Meldingen in jou regio",
"Ausbreitung" : "Voortgang",
"Restdauer" : "Rest. duur",
"Std." : "uur,",
"Zurück alarmiert" : "Terug gealarmeerd",
"Alarmiert" : "Gealarmeerd",
"Auf dem Weg zum Einsatz" : "Onderweg naar de melding",
"Freie Fahrzeuge" : "Beschikbare voertuigen",
"Funkrufname" : "Voertuignaam",
"Typ" : "Type",
"Fahrzeugtype" : "Voertuigtype",
"Feuerwache" : "Kazerne",
"Rückmeldungen und Fakten" : "Melding en Feiten",
"Deine Fahrzeuge" : "Jou voertuigen",
"Fahrzeuge" : "Voertuigen",
"Verband" : "Groep",
"Position" : "Positie",
"Ankunft am Einsatzort" : "Aangekomen bij de melding",
"Einstellungen" : "Instellingen",
"Hinweis" : "Opmerking",
"Übersicht" : "Overzicht",
"Benutzer:" : "Speler:",
"Optionen" : "Opties",
"Fahrzeit" : "Reistijd",
"unterwegs" : "onderweg",
"Rufname" : "Roepnaam",
"Dauer" : "Duur",
"Rückmeldungen" : "Commentaren",
"Rückmeldung" : "Commentaar",
"Leitstellensicht" : "Meldkamer overzicht",
//////////////////////////////////////////////// Hier komen de meldingen zelf
"Auffahrunfall" : "Kop-staart aanrijding",
"Baum auf Auto" : "Boom op auto",
"Baum auf Dach" : "Boom op dak",
"Baum auf Straße" : "Boom op straat",
"Brand in Autohaus" : "Brand bij Auto-dealer",
"Brand in Briefkasten" : "Brievenbus in brand",
"Brand in Druckerei" : "Brand in Drukkerij",
"Brand in KFZ-Werkstatt" : "Brand in autogarage",
"Brand in Lackfabrik" : "Brand in verf-fabriek",
"Brand in Schule" : "Brand in een school",
"Brand in Spedition" : "Brand bij transport-bedrijf",
"Brand in Sporthalle" : "Brand in een sporthal",
"Brand in Zugdepot" : "Brand in trein depot",
"Brand im Baumarkt" : "Brand in een Bouwmarkt",
"Brand im Sägewerk" : "Brand in zagerij",
"Brand im Supermarkt" : "Brand in de supermarkt",
"Brennende Bäume" : "Brandende bomen",
"Brennende S-Bahn" : "Brandende metro",
"Brennende Telefonzelle" : "Brandende Telefooncel",
"Brennender LKW" : "Vrachtwagen in brand",
"Brennender Müllwagen" : "Vuilniswagen in brand",
"Brennender PKW" : "Autobrand",
"Brennender Sicherungskasten" : "Brandende zekeringkast",
"Brennendes Gras" : "Gras in brand",
"Chemieunfall (an Schule)" : "Chemisch ongeval ( bij een school )",
"Chlorgas Alarm (Schwimmbad)" : "Chloorgas alarm (zwembad)",
"Container Brand" : "Container Brand",
"Dachstuhlbrand" : "Dakpannen-brand",
"Fahrstuhl - Türöffnung" : "Liftstoring",
"Feldbrand" : "Veldbrand",
"Fettbrand in Pommesbude" : "Vetbrand in een Mobiele Patatzaak",
"Feuer im Altenheim" : "Brand in verzorgingstehuis",
"Feuer im Laubhaufen" : "Brand in bladeren",
"Gartenlaubenbrand" : "Tuinhuisje in brand",
"Gastronomiebrand" : "Restaurantbrand",
"Gewerbebrand" : "Winkelbrand",
"Kellerbrand" : "Kelderbrand",
"Keller unter Wasser" : "Kelder onder water",
"Kinobrand" : "Bioscoopbrand",
"Kleiner Waldbrand" : "Kleine bos brand",
"Motorrad-Brand" : "Motor in brand",
"Mülleimer Brand" : "Prullenbak brand",
"Ölspur" : "Oliespoor",
"Person im Fluss" : "Persoon te water",
"Scheunenbrand" : "Schuurbrand",
"Schornsteinbrand" : "Schoorsteen brand",
"Schuppenbrand" : "Loodsbrand",
"Silobrand" : "Silobrand",
"SperrmÜllbrand" : "Grofvuil brand",
"Strohballen Brand" : "Hooibalen in brand",
"Traktorbrand" : "Traktor in brand",
"Verkehrsunfall" : "Verkeersongeval",
"Wohnblockbrand" : "Woningblok in brand",
"Wohnungsbrand" : "Woningbrand",
"Wohnwagenbrand" : "Woonwagenbrand",



///////////////////////////////////////////////////////
"":""};


//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) if(regexs[x].test(text)) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}