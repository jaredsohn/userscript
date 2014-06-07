// ==UserScript==
// @name           MyFreeFarm
// @namespace      http://userscripts.org/scripts/show/66964
// @description    Erweitert MyFreeFarm
// @date           04.05.2010
// @include        http://*myfreefarm.*
// @include        http://*wolnifarmerzy.pl*
// @include        http://*enkicsitanyam.hu*
// @exclude        http://*board.myfreefarm.*
// @exclude        http://*forum.myfreefarm.*
// @exclude        http://*farmpedia.myfreefarm.*
// @exclude        http://*forum.enkicsitanyam.hu*
// @exclude        http://*forum.wolnifarmerzy.pl*
// ==/UserScript==

window.addEventListener("load",function(){

name = new Array();
name_sort = new Array();
typ = new Array();
//c: Coins
//v: pflanze
//e: tier
//u: unkraut
//z: zier
id = new Object();
bestand = new Array();
block = new Array();
//Hofpreise
npc = [,0.5,1.1,1.34,2.75,3.95,8.05,17.8,18.5,,,,,,,,,0.16,0.52,1.02,1.44,1.96,2.28,3.8,3.69,,4.38,,,12.4,,3.49,5.19,8.75,6,15.63,16.88,37.5,3.9,52.44,51.75,60.25,58.13,66.19,70.7,,150,,1200,,1200,,,,,,,14400,1200,,,,,,4800,4200,,,,,,,,750,2100,,,,,,,,10800,12000,,1500,3300];
//Marktpreise
gut = new Array();
gutBeob = new Array();
valKauflimit=110;
valStatistik=false;

//Umlaute 
var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
var sz = "\u00DF";

//Multilingual
var texte = new Object();
function loadLanguage(lang){
switch (lang) {
case "de": {
texte["autologin1"] = "Ermittle aktive Sessions. Bitte 5 Sekunden warten<br>...";
texte["autologin2"] = "Alle Accounts eingeloggt.";
texte["markt1"] = "Aktuelle Angebote";
texte["markt2"] = "davor";
texte["markt3"] = ue+"ber NPC-Preis";
texte["markt4"] = ue+"ber";
texte["preis"] = "Preis";
texte["preise"] = "Preise";
texte["stueckpreis"] = "St"+ue+"ckpreis";
texte["sorte1"] = "Pflanzen";
texte["sorte2"] = "Zierprodukte";
texte["sorte3"] = "Fortgeschrittene Produkte";
texte["sorte4"] = "Alle";
texte["produkt"] = "Produkt";
texte["bestand"] = "Bestand";
texte["hofpreis"] = "NPC-Preis";
texte["beobachtet"] = "beobachtet";
texte["marktpreis"] = "Marktpreis";
texte["abzglGebuehr"] = "abzgl Geb"+ue+"hr";
texte["nimmPreise"] = "Nimm beobachtete Preise";
texte["lagerwert"] = "Lagerwert";
texte["optionen"] = "Optionen";
texte["set1"] = "Cache reset";
texte["set2"] = "Scripthomepage";
texte["set3"] = "Automatisch einloggen";
texte["set4"] = "Automatisch gie"+sz+"en";
texte["set5"] = "Automatisch ernten";
texte["set6"] = "Erntemeldung klicken";
texte["set6a"] = "Leere Felder";
texte["set7"] = "Obere Kaufgrenze";
texte["set7a"] = "Verkaufgrenzen";
texte["set8a"] = "Anzahl gemerkte Privatnachrichten";
texte["set8"] = "Anzahl gemerkte Marktnachrichten";
texte["set9"] = "Quicklinks am Markt anzeigen";
texte["set10"] = "Es werden die beobachteten Preise eingetragen. Die eigenen gehen dabei verloren ...";
texte["set11"] = "Alle Informationen "+ue+"ber deine Zonen werden gel"+oe+"scht ...";
texte["set12"] = "Sende Statistiken";
texte["set13"] = "Update";
texte["marktplatz"] = "Marktplatz";
texte["statistik"] = "Statistik";
texte["geheZuSeite"] = "gehe zu Seite";
texte["uebersicht"] = Ue+"bersicht";
texte["main1"] = "Feld leer!";
texte["heute"] = "heute";
texte["day1"] = "Morgen ";
texte["day2"] = Ue+"bermorgen ";
texte["um"] = "um";
texte["seit"] = "seit";
texte["uhr"] = "Uhr";
texte["level"] = "Level";
texte["fertig"] = "Fertig";
texte["vorlage"] = "als Vorlage speichern";
texte["zurNachricht"] = "zur Nachricht";
texte["vorigeNachricht"] = "vorige Nachricht";
texte["naechsteNachricht"] = "n"+ae+"chste Nachricht";
texte["vertragSchicken"] = "Vertrag schicken";
texte["erhalteneVertraege"] = "Erhaltene Vertr"+ae+"ge";
texte["gesendeteVertraege"] = "Gesendete Vertr"+ae+"ge";
texte["alte"] = "Alte";
texte["nachrichtSchreiben"] = "Nachricht schreiben";
texte["zeigeLog"] = "zeige Log";
texte["alleLesen"] = "alle lesen";
texte["menge"] = "Menge";
texte["umsatz"] = "Umsatz";
texte["gewinn"] = "Gewinn";
texte["filtern"] = "Nach xx filtern";
texte["summiereWaren"] = "summiere Waren";
texte["filterKaeufer"] = "Filter K"+ae+"ufer:";
texte["filterWare"] = "Filter Ware:";
texte["tag"] = "Tag";
texte["punkte"] = "Punkte";
texte["imLager"] = "im Lager";
texte["lagerFehlt"] = "Lagerbestand xx fehlt!!!";
texte["lagerNiedrig"] = "Lagerbestand xx niedrig";
texte["farmi"] = "Farmi";
texte["produkte"] = "Produkte";
texte["geld"] = "Geld";
texte["wert"] = "Wert";
texte["fehlt"] = "fehlt:";
texte["ertrag"] = "Ertrag:";
texte["produktion"] = "Produktion:";
texte["total"] = "Total";
texte["autoLogin"] = "Automatischer Login";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Passwort";
texte["speichern"] = "speichern";
texte["loeschen"] = "l"+oe+"schen";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "unbesch"+ae+"ftigt !!";
texte["profitTable"] = "Profit pro Zone pro Tag";
texte["dauer"] = "Dauer";
texte["updateinfo"] = "Es liegt eine neue Script-Version vor. Diese installieren?";
texte["zeigePasswoerter"] = "zeige Passw"+oe+"rter";
texte["ausbauenFuer"] = "ausbauen f"+ue+"r";
// thanks to STMX
texte["info3"] = "Sobald Nutzerdaten und Passwort eingegeben sind, werden die Accounts wieder eingeloggt. Somit kann wieder gef"+ue+"ttert, geerntet, gegossen und gepflanzt werden. Es m"+ue+"ssen Popups erlaubt werden bei mehreren Accounts.";
texte["info4"] = "Sagt ja der Name schon: Nach dem Pflanzen wird automatisch gegossen, wenn du den 'Alles gie"+sz+"en' besitzt (Premium).";
texte["info5"] = "Wie zuvor auch: Es wird beim "+Oe+"ffnen der Ackers geerntet, falls n"+oe+"tig.";
texte["info6"] = "Du magst die l"+ae+"stige Erntemeldung mit dem Schwein nicht? Hier wirst du sie los.";
texte["info6a"] = "Es werden unbepflanzte Felder auf deinem Acker erkannt. Sind dies mehr als hier angegeben, wird der Acker als unbenutzt gemeldet.";
texte["info7"] = "Du kannst am Markt nur Produkte kaufen die maximal der Prozentgrenze entsprechen. Dies sch"+ue+"tzt dich vor dem versehentlichen Kauf "+ue+"bertrieben teurer Waren.";
texte["info7a"] = "Auch dein Verkauf wird gesch"+ue+"tzt, so dass du weder zu billig noch zu teuer verkaufst.";
texte["info8a"] = "Deine letzten privaten Nachrichten werden gespeichert und somit kann ein Nachrichten-Verlauf mit einem Kontakt angezeigt werden.";
texte["info8"] = "Es bleiben auch alte System-Nachrichten in diesem Speicher, selbst wenn sie "+ae+"lter als die maximalen 7&nbsp;Tage sind.";
texte["info9"] = "Quicklinks am Markt anzeigen";
texte["info12"] = "Unterst"+ue+"tze den <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>. Es werden keine privaten Daten gesendet!";
texte["info13"] = "Es wird gepr"+ue+"ft, ob eine neuere Version dieses Scriptes verf"+ue+"gbar ist.";
texte["hilfe1"] = "Auf dem Schwein:<br>Farm(en)-"+Ue+"bersicht, n"+ae+"chste Ertr"+ae+"ge, Farmi-"+Ue+"bersicht (hier kam man z.B. auch auf Farm 1 Acker 2 klicken, um direkt dorthin zu gelangen)";
texte["hilfe2"] = "Blaue Leiste (Mouseover):<br> Level und Punkte "+Ue+"bersicht, Vertikale wei"+sz+"e Striche Tagesabschnitte,  Roter Strich Sonntag. Leiste anklicken bringt eine "+Ue+"bersicht des Punkteverlaufes.";
texte["hilfe3"] = "Proudukte im Regal (MouseOver):<br> Zus"+ae+"tzliche Info "+ue+"ber den aktuellen Marktpreis und den Wert des Bestandes.";
//Systemworte
texte["waehrung"] = "kT";
texte["coins"] = "Coins"
texte["zuteuer"] = "zu teuer!";
texte["msg1a"] = "Marktplatz";
texte["msg1b"] = " hat am Marktplatz ";
texte["msg1c"] = " von dir<br> f"+ue+"r ";
texte["msg1d"] = " kT gekauft.";
texte["msg2a"] = "Ein Vertrag wurde angenommen";
texte["msg2b"] = " hat einen Vertrag von dir unterzeichnet!<br><br> Folgende Produkte wurden verkauft:<br>";
texte["msg2c"] = "<br> <br> Die Vertragssumme von ";
texte["msg2d"] = " kT wurde deinem Konto gutgeschrieben.";
break;}
case "nl": { // translation thanks to DrNapoleon
texte["autologin1"] = "Bepaal actieve sessies. 5 seconden wchten A.U.B.<br>...";
texte["autologin2"] = "Alle accounts zijn ingelogd.";
texte["markt1"] = "Actuele aanbod";
texte["markt2"] = "voor";
texte["markt3"] = "boven de NPC-Prijs";
texte["markt4"] = "boven";
texte["preis"] = "Prijs";
texte["preise"] = "Prijzen";
texte["stueckpreis"] = "Unit price###";
texte["sorte1"] = "Planten";
texte["sorte2"] = "Decoraties";
texte["sorte3"] = "Dierlijke-, gefabriceerde producten";
texte["sorte4"] = "Alles tonen";
texte["produkt"] = "Product";
texte["bestand"] = "Voorraad";
texte["hofpreis"] = "NPC-Prijs";
texte["beobachtet"] = "Gevonden";
texte["marktpreis"] = "Marktprijs";
texte["abzglGebuehr"] = "minus kosten";
texte["nimmPreise"] = "Neem gevonden prijs over";
texte["lagerwert"] = "Waarde voorraad:";
texte["optionen"] = "Opties";
texte["set1"] = "Cache reset";
texte["set2"] = "Scripthomepage";
texte["set3"] = "Automatisch inloggen";
texte["set4"] = "Automatisch water geven";
texte["set5"] = "Automatisch oogsten";
texte["set6"] = "Oogstmelding klikken";
texte["set6a"] = "Lege velden";
texte["set7"] = "bovenste koopgrens";
texte["set7a"] = "###Verkaufgrenzen";
texte["set8a"] = "###Number privat messages kept";
texte["set8"] = "Aantal gemarkeerde marktberichten";
texte["set9"] = "Quicklinks op de markt tonen";
texte["set10"] = "De zelf ingevoerde prijzen gaan verloren";
texte["set11"] = "Alle informatie over je zones gaat verloren";
texte["set13"] = "Update###";
texte["marktplatz"] = "Marktplaats";
texte["statistik"] = "Statistieken";
texte["geheZuSeite"] = "gehe zu Seite###";
texte["uebersicht"] = "Overzicht";
texte["main1"] = "Lege akker!";
texte["heute"] = "vandaag";
texte["day1"] = "morgen ";
texte["day2"] = "overmorgen ";
texte["um"] = "om";
texte["seit"] = "sinds";
texte["uhr"] = "uur";
texte["level"] = "Level";
texte["fertig"] = "klaar";
texte["vorlage"] = "Opslaan als sjabloon";
texte["zurNachricht"] = "naar bericht";
texte["vorigeNachricht"] = "vorig bericht";
texte["naechsteNachricht"] = "volgend bericht";
texte["vertragSchicken"] = "Contract versturen";
texte["erhalteneVertraege"] = "Ontvangen contracten";
texte["gesendeteVertraege"] = "Verzonden contracten";
texte["alte"] = "Oude";
texte["nachrichtSchreiben"] = "Bericht schrijven";
texte["zeigeLog"] = "Toon Log";
texte["alleLesen"] = "Alles lezen";
texte["menge"] = "Aantal";
texte["umsatz"] = "Omzet";
texte["gewinn"] = "Winst";
texte["filtern"] = "op xx filteren";
texte["summiereWaren"] = "Geef totalen weer";
texte["filterKaeufer"] = "Filter op koper:";
texte["filterWare"] = "Filter op product:";
texte["tag"] = "dag";
texte["punkte"] = "punten ";
texte["imLager"] = "im Lager###";
texte["lagerFehlt"] = "Geen voorraad voor xx!!!!!";
texte["lagerNiedrig"] = "Te weinig voorraad van xx!!!!!";
texte["farmi"] = "Klanten";
texte["produkte"] = "Producten";
texte["geld"] = "Geld";
texte["wert"] = "Waarde";
texte["fehlt"] = "Mist:";
texte["ertrag"] = "opbrengst:";
texte["produktion"] = "Productie:";
texte["total"] = "Totaal";
texte["autoLogin"] = "Automatisch inloggen";
texte["server"] = "Server";
texte["name"] = "Naam";
texte["passwort"] = "Passwoord";
texte["speichern"] = "opslaan";
texte["loeschen"] = "verwijderen";
texte["farm"] = "Boerderij";
texte["unbeschaeftigt"] = "nutteloos !!";
texte["profitTable"] = "Winst per akker per dag";
texte["dauer"] = "Dauer###";
texte["updateinfo"] = "Es liegt eine neue Script-Version vor. Diese installieren?####";
texte["zeigePasswoerter"] = "zeige Passwoerter###";
texte["ausbauenFuer"] = "Upgraden kost:";
texte["info3"] = "Als de gebruikersnaam en paswoord ingevoerd zijn (zie onder), worden de accounts automatisch ingelogdSobald Nutzerdaten und Passwort eingegeben sind, werden die Accounts wieder eingeloggt. Zo kan er weer gevoerd, geplant en geoogst worden.";
texte["info4"] = "De naam zegt het al";
texte["info5"] = "Indien nodig wordt er meteen geoogst als de akker opgengeklikt wordt";
texte["info6"] = "De oogstemelding wordt automatisch weggeklikt";
texte["info6a"] = "Geeft aan hoeveel lege velden een akker mag hebben voordat deze als nutteloos wordt beschouwd";
texte["info7"] = "Koopbescherming voor de markt: Je kunt op de markt alleen zaken kopen waarvan de prijs maximaal het percentage van de huidige prijs is.";
texte["info7a"] = "###Auch dein Verkauf wird gesch"+ue+"tzt, sodass du weder zu billig noch zu teuer verkaufst.";
texte["info8"] = "Geef aan hoeveel berichten er standaard blijven bestaan. Deze worden dan niet gewist na 7 dagen";
texte["info8a"] = "###Your last private messages are kept so that a message history of one contact can be shown."
texte["info9"] = "quick-link blok tonen bij de markt";
texte["info13"] = "###Es wird geprueft, ob eine neuere Version dieses Scriptes verfuegbar ist.";
texte["hilfe1"] = "Als er op het varken bovenin wordt geklikt krijg je een overzicht met wat er geproduceerd wordt en welke klanten wat willen tegen welk percentage van de normale prijs";
texte["hilfe2"] = "Blauwe regel onderin (mouseover):<br> Level en punten. Overzicht:, Verticale witte strepen: dag-overgang, rode streep: zondag. Als de regel wordt aangeklikt krijg je een overzicht van het punten verloop.";
texte["hilfe3"] = "Producten in de schappen: als je met de muis boven een product hangt wordt er informatie getoond";
//Systemworte
texte["waehrung"] = "aD";
texte["coins"] = "Coins"
texte["zuteuer"] = "te duur!";
texte["msg1a"] = "###the term that is display at system-messages in case of sale at market";
texte["msg1b"] = " heeft op de marktplaats ";
texte["msg1c"] = "van jou<br> voor ";
texte["msg1d"] = " aD gekocht.";
texte["msg2a"] = "###the term that is display at system-messages in case of sale by contract";
texte["msg2b"] = " heeft een contract geaccepteerd!<br><br> De volgende producten zijn verkocht:<br>";
texte["msg2c"] = "<br> <br> Het bedrag ";
texte["msg2d"] = " aD is bijgeschreven op je rekening.";
break;}
case "pl": { // translation by robert197648 and bonizaur
var pl_a = "\u0105";
var pl_c = "\u0107";
var pl_e = "\u0119";
var pl_l = "\u0142";
var pl_n = "\u0144";
var pl_o = "\u00F3";
var pl_s = "\u015B";
var pl_S = "\u015A";
var pl_z = "\u017C";
texte["autologin1"] = "Sprawdzenie aktywnych sesji. Prosz"+pl_e+" odczeka"+pl_c+" 5 sekund<br>...";
texte["autologin2"] = "Wszystkie konta zalogowane.";
texte["markt1"] = "Nowe oferty";
texte["markt2"] = "przed";
texte["markt3"] = "wi"+pl_e+"cej ni"+pl_z+" NPC";
texte["markt4"] = "wi"+pl_e+"cej";
texte["preis"] = "Cena";
texte["preise"] = "Ceny";
texte["stueckpreis"] = "Cena jedn.";
texte["sorte1"] = "Ro"+pl_s+"liny";
texte["sorte2"] = "Prod. zwierz"+pl_e+"ce";
texte["sorte3"] = "Prod. przetworzone";
texte["sorte4"] = "Wszystko";
texte["produkt"] = "Produkt";
texte["bestand"] = "Ilość w Regale";
texte["hofpreis"] = "Cena&nbsp;NPC";
texte["beobachtet"] = "Średnie ceny";
texte["marktpreis"] = "Na&nbsp;targu&nbsp;po";
texte["abzglGebuehr"] = "-10%";
texte["nimmPreise"] = pl_s+"rednie ceny";
texte["lagerwert"] = "Warto"+pl_s+pl_c+"&nbsp;towaru";
texte["optionen"] = "Opcje";
// options panel
texte["set1"] = "Cache reset";
texte["set2"] = "Forum";
texte["set3"] = "Automatyczne logowanie";
texte["set4"] = "Automatyczne podlewanie";
texte["set5"] = "Automatyczne zbiory";
texte["set6"] = "Autozamykanie zbior"+pl_o+"w";
texte["set6a"] = "Puste miejsca";
texte["set7"] = "G"+pl_o+"rny limit zakupu";
texte["set7a"] = "Limity sprzeda"+pl_z+"y";
texte["set8"] = "Liczba zapisanych wiadomo"+pl_s+"ci";
texte["set8a"] = "Zachowane Umowy";
texte["set9"] = "Szybki przegl"+pl_a+"d rynku (ikony)";
texte["set10"] = "Uwaga zostaną skasowane twoje ustawienia cen!!";
texte["set11"] = "Wszystkie utracone wiadomości";
texte["set13"] = "Aktualizacja";
texte["marktplatz"] = "Rynek";
texte["statistik"] = "Statystyki";
texte["geheZuSeite"] = "Przejd"+pl_z+" do strony";
texte["uebersicht"] = "Przegl"+pl_a+"d";
texte["main1"] = "Puste!";
texte["heute"] = "dzisiaj";
texte["day1"] = "Jutro ";
texte["day2"] = "Pojutrze ";
texte["um"] = "o";
texte["seit"] = "od";
texte["uhr"] = "godzinie";
texte["level"] = "Poziom";
texte["fertig"] = "Gotowe";
texte["vorlage"] = "Zapisz jako szablon";
// messages
texte["zurNachricht"] = "do wiadomo"+pl_s+"ci";
texte["vorigeNachricht"] = "Poprzednia wiadomo"+pl_s+pl_c;
texte["naechsteNachricht"] = "Wszystkie wiadomo"+pl_s+"ci";
// contracts
texte["vertragSchicken"] = "Wys"+pl_l+"a"+pl_c+" umowe";
texte["erhalteneVertraege"] = "Otrzymane Umowy";
texte["gesendeteVertraege"] = "Umowy wys"+pl_l+"ane";
texte["alte"] = "Starsze umowy";
texte["nachrichtSchreiben"] = "Wy"+pl_s+"lij wiadomo"+pl_s+pl_c;
// system message log
texte["zeigeLog"] = "poka"+pl_z+" log";
texte["alleLesen"] = "przeczytaj";
texte["menge"] = "Ilo"+pl_s+pl_c;
texte["umsatz"] = "Obr"+pl_o+"t w handlu";
texte["gewinn"] = "Zysk";
texte["filtern"] = "Filtrowanie xx";
texte["summiereWaren"] = "Podsumowanie towar"+pl_o+"w";
texte["filterKaeufer"] = "Filtruj po kupuj"+pl_a+"cych:";
texte["filterWare"] = "Filtruj po produktach:";
// score history
texte["tag"] = "Dzie"+pl_n;
texte["punkte"] = "Punkt"+pl_o+"w";
texte["imLager"] = "w magazynie";
texte["lagerFehlt"] = "Brakuje produktu xx!!!";
texte["lagerNiedrig"] = "Ma"+pl_l+"o produktu xx";
texte["farmi"] = "Klient";
texte["produkte"] = "Produkty";
texte["geld"] = "Oferuje";
texte["wert"] = "Warto"+pl_s+pl_c;
texte["fehlt"] = "Brakuje:";
texte["ertrag"] = "Plon:";
texte["produktion"] = "Produkcja:";
texte["total"] = "Og"+pl_o+pl_l+"em";
// 
texte["autoLogin"] = "Automatyczne logowanie";
texte["server"] = "Serwer";
texte["name"] = "Login";
texte["passwort"] = "Has"+pl_l+"o";
texte["speichern"] = "Zapisz";
texte["loeschen"] = "Usu"+pl_n;
texte["farm"] = "Gospodarstwo";
texte["unbeschaeftigt"] = "Le"+pl_z+"y od"+pl_l+"ogiem!!";
texte["profitTable"] = "Kalkulacja zysk"+pl_o+"w";
texte["updateinfo"] = "Jest nowa wersja skryptu. Czy zainstalowa"+pl_c+"?";
texte["ausbauenFuer"] = "Aktualizacja dla";
texte["info3"] = "Po wprowadzeniu nazwy u"+pl_z+"ytkownika i has"+pl_l+"a nast"+pl_e+"puje automatyczne logowanie. Pozwala to zachowa"+pl_c+" ci"+pl_a+"g"+pl_l+"o"+pl_s+pl_c+" grania. Przy wielu kontach musi by"+pl_c+" dozwolone wyskakiwanie okienek.";
texte["info4"] = "Ro"+pl_s+"liny b"+pl_e+"d"+pl_a+" automatycznie podlewane (je"+pl_s+"li masz konto Premium).";
texte["info5"] = "Po wej"+pl_s+"ciu na pole wszystkie plony zostan"+pl_a+" automatycznie zebrane.";
texte["info6"] = "Zaznacz je"+pl_s+"li denerwuje ci"+pl_e+" wyskakuj"+pl_a+"ca plansza z ilo"+pl_s+"ci"+pl_a+" zebranych plon"+pl_o+"w.";
texte["info6a"] = "Je"+pl_s+"li ilo"+pl_s+pl_c+" pustych miejsc przekroczy t"+pl_a+" warto"+pl_s+pl_c+", to pole b"+pl_e+"dzie oznaczone jako puste.";
texte["info7"] = "Zaznaczasz do jakiej granicy chcesz kupowa"+pl_c+" na targu. To chroni przed zakupem zbyt drogich produkt"+pl_o+"w na targu.";
texte["info7a"] = "Zakres w jakim twoja sprzeda"+pl_z+" b"+pl_e+"dzie chroniona, aby"+pl_s+" nie sprzeda"+pl_l+" swoich plon"+pl_o+"w zbyt tanio lub za drogo..";
texte["info8"] = "Zaznacz ile wiadomo"+pl_s+"ci ma by"+pl_c+" przechowywanych, nawet je"+pl_s+"li s"+pl_a+" starsze ni"+pl_z+" maksymalnie 7 dni.";
texte["info8a"] = "Liczba prywatnych wiadomo"+pl_s+"ci, kt"+pl_o+"re zostan"+pl_a+" zachowane, aby umo"+pl_z+"liwi"+pl_c+" przegl"+pl_a+"d historii danej umowy";
texte["info9"] = "Pokazuje wysuwany pasek z ikonami dostępnych towar"+pl_o+"w (z prawej)";
texte["info13"] = "Automatycznie sprawdza czy jest nowsza wersja tego skryptu.";
texte["hilfe1"] = "Klikni"+pl_e+"cie na "+pl_s+"wince:<br> Przegl"+pl_a+"d produkcji w toku oraz towar"+pl_o+"w potrzebnych dla NPC wraz z przewidywanym zyskiem. Mo"+pl_z+"na z niego przej"+pl_s+pl_c+" bezpo"+pl_s+"rednio do wybranego pola lub klienta.";
texte["hilfe2"] = "Niebieski pasek (najechanie myszk"+pl_a+"): <br> Wizualizacja zdobytych punkt"+pl_o+"w. Bia"+pl_l+"e paski dziel"+pl_a+" dni (czerwony oznacza niedziel"+pl_e+"). Klikni"+pl_e+"cie wy"+pl_s+"wietla statystyki punktowe i braki towarowe";
texte["hilfe3"] = "Produkty na regale: <br> Dodatkowe informacje o cenach i warto"+pl_s+"ci towaru";
//Systemworte
texte["waehrung"] = "ft";
texte["coins"] = "Monety"
texte["zuteuer"] = "Za drogo!";
texte["msg1a"] = "Wiadomo"+pl_s+"ci z targu";
texte["msg1b"] = " zakupi"+pl_l+" od Ciebie na targu ";
texte["msg1c"] = " za kwot"+pl_e+"<br>";
texte["msg1d"] = " ft.";
texte["msg2a"] = "Realizacja umowy";
texte["msg2b"] = " podpisa"+pl_l+" wys"+pl_l+"an"+pl_a+" mu przez Ciebie umow"+pl_e+"!<br><br> Sprzeda"+pl_l+"e"+pl_s+" nast"+pl_e+"puj"+pl_a+"ce produkty: <br>";
texte["msg2c"] = "<br> <br> Nale"+pl_z+"no"+pl_s+pl_c+" za produkty w wysoko"+pl_s+"ci ";
texte["msg2d"] = " ft zosta"+pl_l+"a przelana na Twoje konto.";
break;}
case "co.uk": {// translation thanks to mym
texte["autologin1"] = "Checking active sessions.  Please wait 5 seconds<br>...";
texte["autologin2"] = "All accounts logged in.";
texte["markt1"] = "Current offers";
texte["markt2"] = "above";
texte["markt3"] = "over NPC-price";
texte["markt4"] = "over";
texte["preis"] = "Price";
texte["preise"] = "Prices";
texte["stueckpreis"] = "Unit price";
texte["sorte1"] = "Plants";
texte["sorte2"] = "Animal products";
texte["sorte3"] = "Manufactured products";
texte["sorte4"] = "All";
texte["produkt"] = "Product";
texte["bestand"] = "Inventory";
texte["hofpreis"] = "NPC-Price";
texte["beobachtet"] = "Observed";
texte["marktpreis"] = "Market&nbsp;Price";
texte["abzglGebuehr"] = "After Fee";
texte["nimmPreise"] = "Take observed prices";
texte["lagerwert"] = "Stock value";
texte["optionen"] = "Options";
// options panel
texte["set1"] = "Cache reset";
texte["set2"] = "Script Homepage";
texte["set3"] = "Automatic login";
texte["set4"] = "Automatic watering";
texte["set5"] = "Automatic harvesting";
texte["set6"] = "Close harvest dialog";
texte["set6a"] = "Empty areas";
texte["set7"] = "Top Buy limit";
texte["set7a"] = "Sell limits";
texte["set8a"] = "Number privat messages kept";
texte["set8"] = "Number market messages kept";
texte["set9"] = "Show market quicklinks";
texte["set10"] = "The observed prices will overwrite previously saved market prices ...";
texte["set11"] = "All information about your farms will be deleted ...";
texte["set12"] = "Send statistics";
texte["set13"] = "Update";
texte["marktplatz"] = "Market Place";
texte["statistik"] = "Statistics";
texte["geheZuSeite"] = "Go to page";
texte["uebersicht"] = "overview";
texte["main1"] = "Empty field!";
texte["heute"] = "today";
texte["day1"] = "Tomorrow ";
texte["day2"] = "Second day ";
texte["um"] = "at";
texte["seit"] = "since";
texte["uhr"] = "o'clock";
texte["level"] = "Level";
texte["fertig"] = "Finished";
texte["vorlage"] = "Save as template";
// messages
texte["zurNachricht"] = "to message";
texte["vorigeNachricht"] = "previous message";
texte["naechsteNachricht"] = "next message";
// contracts
texte["vertragSchicken"] = "send contract";
texte["erhalteneVertraege"] = "Contracts received"; 
texte["gesendeteVertraege"] = "Contracts sent";   
texte["alte"] = "Old";
texte["nachrichtSchreiben"] = "write message";
// system message log
texte["zeigeLog"] = "show log";
texte["alleLesen"] = "read all";
texte["menge"] = "Quantity";
texte["umsatz"] = "Turnover";
texte["gewinn"] = "Profit";
texte["filtern"] = "Filter for xx";
texte["summiereWaren"] = "Summarize goods";
texte["filterKaeufer"] = "Filter buyers:";
texte["filterWare"] = "Filter goods:";
// score history
texte["tag"] = "Day";
texte["punkte"] = "Points";
texte["imLager"] = "in stock";
texte["lagerFehlt"] = "Stock xx missing!!!";
texte["lagerNiedrig"] = "Stock xx low";
// pig's stock overview
texte["farmi"] = "Farmie";
texte["produkte"] = "Products";
texte["geld"] = "Offered";
texte["wert"] = "Value";
texte["fehlt"] = "Need:";
texte["ertrag"] = "Yield:";
texte["produktion"] = "Production:";
texte["total"] = "Total";
// 
texte["autoLogin"] = "Automatic Login";
texte["server"] = "Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["speichern"] = "save";
texte["loeschen"] = "erase";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "idle !!";
texte["profitTable"] = "Profit per Zone per Day";
texte["dauer"] = "duration";
texte["updateinfo"] = "There is a new script version. Install?";
texte["zeigePasswoerter"] = "show passwords";
texte["ausbauenFuer"] = "upgrade for";
// 
texte["info3"] = "Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts.";
texte["info4"] = "Plants will be watered after planting, if you have 'Water everything' (Premium).";
texte["info5"] = "After opening your field, crops will be harvested if necessary.";
texte["info6"] = "Don't like the annoying harvest notification with the pig?  Get rid of it here.";
texte["info6a"] = "If the number of unplanted areas in your field exceeds this number, the field will be shown as empty.";
texte["info7"] = "You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods.";
texte["info7a"] = "Your sales are also protected, so that you don't price your own goods too cheaply or too highly.";
texte["info8a"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info8"] = "Old messages remain in this archive, even if they are older than the maximum 7 days.";
texte["info9"] = "Show Quicklinks at Market Place";
texte["info12"] = "Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!";
texte["info13"] = "Checks whether an updated version of this Advisor script is available.";
texte["hilfe1"] = "Click on the pig:<br>Farm overview, next yield, farmie overview.  One can also navigate directly to a field by clicking on it.";
texte["hilfe2"] = "Blue bar (Mouseover):<br> Level und Points overview, vertical white stripes divide days (red stripe marks Sunday).  Click on the bar for a score history.";
texte["hilfe3"] = "Products on shelf (MouseOver):<br> Additional info about current market price and the value of inventory.";
//Systemworte
texte["waehrung"] = "pD";
texte["coins"] = "Coins"
texte["zuteuer"] = "Too expensive!";
texte["msg1a"] = "Marketplace";
texte["msg1b"] = " bought ";
texte["msg1c"] = " for<br> ";
texte["msg1d"] = " pD from you.";
texte["msg2a"] = "A contract has been accepted";
texte["msg2b"] = " has signed a contract of yours!<br><br> The following products have been sold:<br>";
texte["msg2c"] = "<br> <br> The amount of ";
texte["msg2d"] = " pD has been credited to your account.";
break;}
case "hu": { // translation thanks to EnKicsiTanyam
var hu_A = "\u00C1";
var hu_a = "\u00E1";
var hu_E = "\u00C9";
var hu_e = "\u00E9";
var hu_i = "\u00ED";
var hu_O_dots = "\u00D6";
var hu_o = "\u00F3";
var hu_o_double = "\u0151";
var hu_o_dots = "\u00F6";
var hu_U = "\u00DA";
var hu_U_dots = "\u00DC";
var hu_u = "\u00FA";
var hu_u_double = "\u0171";
var hu_u_dots = "\u00FC";
texte["autologin1"] = "Akt"+hu_i+"v folyamatok ellen"+hu_o_double+"rz"+hu_e+"se. V"+hu_a+"rj 5 p"+hu_a+"sodpercet<br>...";
texte["autologin2"] = "Felhaszn"+hu_a+"l"+hu_o+"k bejelentkezve.";
texte["markt1"] = "Jelenlegi aj"+hu_a+"nlatok";
texte["markt2"] = "el"+hu_o_dots+"tt";
texte["markt3"] = "az NPC-"+hu_A+"r";
texte["markt4"] = hu_a+"t";
texte["preis"] = hu_A+"r";
texte["preise"] = "Mentett "+hu_a+"r";
texte["sorte1"] = "N"+hu_o_dots+"v"+hu_e+"nyek megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte2"] = "D"+hu_i+"szt"+hu_a+"rgyak megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte3"] = hu_A+"lati term"+hu_e+"kek megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte4"] = "Sz"+hu_u_double+"k"+hu_i+"t"+hu_e+"s felold"+hu_a+"sa";
texte["produkt"] = "Term"+hu_e+"k";
texte["bestand"] = "Polc";
texte["hofpreis"] = "NPC-"+hu_A+"r";
texte["beobachtet"] = "Megfigyelt";
texte["marktpreis"] = "Piaci&nbsp;"+hu_A+"r";
texte["abzglGebuehr"] = "Ad"+hu_o+" ut"+hu_a+"n";
texte["nimmPreise"] = "Piaci "+hu_a+"rak tart"+hu_a+"sa";
texte["lagerwert"] = "Polcod "+hu_e+"rt"+hu_e+"ke xx kT";
texte["optionen"] = "Be"+hu_a+"ll"+hu_i+"t"+hu_a+"sok";
// options panel
texte["set1"] = "Adatok t"+hu_o_dots+"rl"+hu_e+"se";
texte["set2"] = "Szkript honlap";
texte["set3"] = "Auto bel"+hu_e+"p"+hu_e+"s";
texte["set4"] = "Auto "+hu_o_dots+"nt"+hu_o_dots+"z"+hu_e+"s";
texte["set5"] = "Auto betakar"+hu_i+"t"+hu_a+"s";
texte["set6"] = "Betakar"+hu_i+"t"+hu_a+"s "+hu_o_dots+"sszes"+hu_i+"t"+hu_o_double+" bez"+hu_a+"r"+hu_a+"sa";
texte["set6a"] = hu_U_dots+"res ter"+hu_u_dots+"letek";
texte["set7"] = "V"+hu_a+"s"+hu_a+"rl"+hu_a+"si hat"+hu_e+"r"+hu_e+"rt"+hu_e+"k";
texte["set7a"] = "Elad"+hu_a+"si hat"+hu_a+"r"+hu_e+"rt"+hu_e+"k";
texte["set8a"] = "###Number privat messages kept";
texte["set8"] = "Megtartand"+hu_o+" piaci "+hu_u_dots+"zenetek sz"+hu_a+"ma";
texte["set9"] = "Piac gyorslinkek mutat"+hu_a+"sa";
texte["set10"] = "A megfigyelt "+hu_a+"rak fel"+hu_u_dots+"l"+hu_i+"rj"+hu_a+"k a mentett piaci "+hu_a+"rakat ...";
texte["set11"] = "Minden farmoddal kapcsolatos adat "+hu_e+"s inform"+hu_a+"ci"+hu_o+" t"+hu_o_dots+"rl"+hu_e+"se";
texte["set12"] = "Statisztika k"+hu_u_dots+"ld"+hu_e+"se";
texte["set13"] = "Friss"+hu_i+"t"+hu_e+"s";
texte["marktplatz"] = "Piac";
texte["statistik"] = "Statisztika";
texte["geheZuSeite"] = "Ugr"+hu_a+"s a oldalra";
texte["uebersicht"] = hu_O_dots+"sszes"+hu_i+"t"+hu_e+"s";
texte["main1"] = hu_U_dots+"res mez"+hu_o_double+"!";
texte["heute"] = "ma";
texte["day1"] = "Holnap ";
texte["day2"] = "Holnaput"+hu_a+"n ";
texte["um"] = "kor";
texte["seit"] = hu_o+"ta";
texte["uhr"] = "-kor k"+hu_e+"sz"+hu_u_dots+"l el";
texte["level"] = "Szint";
texte["fertig"] = "Befejezve";
texte["vorlage"] = "Ment"+hu_e+"s sablonk"+hu_e+"nt";
// messages
texte["zurNachricht"] = hu_U_dots+"zenetekhez";
texte["vorigeNachricht"] = "El"+hu_o_double+"z"+hu_o_double+" "+hu_u_dots+"zenet";
texte["naechsteNachricht"] = "K"+hu_o_dots+"vetkez"+hu_o_double+" "+hu_u_dots+"zenet";
// contracts
texte["vertragSchicken"] = "Szerz"+hu_o_double+"d"+hu_e+"s k"+hu_u_dots+"ld"+hu_e+"se";
texte["erhalteneVertraege"] = "Be"+hu_e+"rkezett szerz"+hu_o_double+"d"+hu_e+"sek"; 
texte["gesendeteVertraege"] = "Elk"+hu_u_dots+"ld"+hu_o_dots+"tt szerz"+hu_o_double+"d"+hu_e+"sek";   
texte["alte"] = "R"+hu_e+"giek";
texte["nachrichtSchreiben"] = hu_U_dots+"zenet "+hu_i+"r"+hu_a+"sa";
// system message log
texte["zeigeLog"] = "Napl"+hu_o;
texte["alleLesen"] = hu_O_dots+"sszes olvas"+hu_a+"sa";
texte["menge"] = "Mennyis"+hu_e+"g";
texte["umsatz"] = "Forgalom";
texte["gewinn"] = "Profit";
texte["filtern"] = "Sz"+hu_u_double+"r"+hu_o_double+": xx";
texte["summiereWaren"] = "Kereskedelmi "+hu_o_dots+"sszefoglal"+hu_o;
texte["filterKaeufer"] = "Vev"+hu_o_double+": ";
texte["filterWare"] = "Term"+hu_e+"k: ";
// score history
texte["tag"] = "Nap";
texte["punkte"] = "Pontsz"+hu_a+"m";
texte["imLager"] = "szinten";
texte["lagerFehlt"] = "A(z) xx hi"+hu_a+"nycikk a gazdas"+hu_a+"godban!";
texte["lagerNiedrig"] = "A(z) xx mennyis"+hu_e+"ge alacsony";
// pig's stock overview
texte["farmi"] = "Vev"+hu_o_double+"k";
texte["produkte"] = "Bev"+hu_a+"s"+hu_a+"rl"+hu_o+"lista";
texte["geld"] = "Felk"+hu_i+"n"+hu_a+"lt "+hu_a+"r";
texte["wert"] = hu_O_dots+"ssz"+hu_e+"rt"+hu_e+"k";
texte["fehlt"] = "Sz"+hu_u_dots+"ks"+hu_e+"ges term"+hu_e+"kek:";
texte["ertrag"] = "Hozam:";
texte["produktion"] = "Term"+hu_e+"kenys"+hu_e+"g:";
texte["total"] = hu_O_dots+"sszesen termel"+hu_e+"s alatt:";
// 
texte["autoLogin"] = "Auto bel"+hu_e+"p"+hu_e+"s";
texte["server"] = "Szerver";
texte["name"] = "N"+hu_e+"v";
texte["passwort"] = "Jelsz"+hu_o;
texte["speichern"] = "ment";
texte["loeschen"] = "t"+hu_o_dots+"r"+hu_o_dots+"l";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "t"+hu_e+"tlen !";
texte["profitTable"] = "Nyeres"+hu_e+"g / z"+hu_o+"na / nap";
texte["dauer"] = "Id"+hu_o_double;
texte["updateinfo"] = hu_U+"j script verzi"+hu_o+" "+hu_e+"rhet"+hu_o_double+" el. Telep"+hu_i+"ted?";
texte["zeigePasswoerter"] = "jelszavak mutat"+hu_a+"sa";
// 
texte["info3"] = "Add meg egyszer a felhaszn"+hu_a+"l"+hu_o+"i neved "+hu_e+"s jelszavaid, "+hu_e+"s minden fi"+hu_o+"kodba bejelentkezik a script, teh"+hu_a+"t k"+hu_e+"pes lesz "+hu_u_dots+"ltetni, betermelni, "+hu_o_dots+"nt"+hu_o_dots+"zni, etetni. A felugr"+hu_o+" ablakok enged"+hu_e+"lyez"+hu_e+"se sz"+hu_u_dots+"ks"+hu_e+"ges a funkci"+hu_o+" haszn"+hu_a+"lat"+hu_a+"hoz.";
texte["info4"] = "Meg"+hu_o_dots+"nt"+hu_o_dots+"zi a n"+hu_o_dots+"v"+hu_e+"nyeid "+hu_u_dots+"ltet"+hu_e+"s ut"+hu_a+"n, ha van "+hu_o_dots+"nz"+hu_o_dots+"z"+hu_o_double+"seg"+hu_e+"ded (pr"+hu_e+"mium funkci"+hu_o+").";
texte["info5"] = "Miut"+hu_a+"n megnyitottad a sz"+hu_a+"nt"+hu_o+"d, betakar"+hu_i+"tja a term"+hu_e+"st ha sz"+hu_u_dots+"ks"+hu_e+"ges.";
texte["info6"] = "Nem szeretn"+hu_e+"d, hogy a betakar"+hu_i+"t"+hu_a+"sr"+hu_o+"l "+hu_o_dots+"sszes"+hu_i+"t"+hu_e+"s jelenjen meg? Jel"+hu_o_dots+"ld be a n"+hu_e+"gyzetet!";
texte["info6a"] = "Ha a bevezetlen ter"+hu_u_dots+"letek sz"+hu_a+"ma meghaladja ezt az "+hu_e+"rt"+hu_e+"ket, a sz"+hu_a+"nt"+hu_o+"d "+hu_u_dots+"resnek fogja mutatni.";
texte["info7"] = "Csak az itt megadott "+hu_e+"rt"+hu_e+"k erej"+hu_e+"ig v"+hu_a+"s"+hu_a+"rolhatsz a piaci aj"+hu_a+"nlatok k"+hu_o_dots+"z"+hu_u_dots+"l. A lehet"+hu_o_double+"s"+hu_e+"g megv"+hu_e+"d a t"+hu_u+"ls"+hu_a+"gosan magas piaci "+hu_a+"ron val"+hu_o+" v"+hu_a+"s"+hu_a+"rl"+hu_a+"st"+hu_o+"l.";
texte["info7a"] = "Ez szint"+hu_e+"n seg"+hu_i+"t, hogy ne j"+hu_a+"rj p"+hu_o+"rul: Csak az itt be"+hu_a+"ll"+hu_i+"tott hat"+hu_a+"r"+hu_e+"rt"+hu_e+"kek k"+hu_o_dots+"z"+hu_o_dots+"tt tehetsz ki "+hu_a+"rut a piacra, "+hu_i+"gy biztos nem pocs"+hu_e+"kolod el a term"+hu_e+"ked.";
texte["info8"] = "A J"+hu_a+"t"+hu_e+"k 7 nap ut"+hu_a+"n t"+hu_o_dots+"rli az "+hu_u_dots+"zeneteid. Itt megadhatod, hogy a r"+hu_e+"gebbi "+hu_u_dots+"zenetek k"+hu_u_dots+"z"+hu_u_dots+"l h"+hu_a+"nyat ments"+hu_u_dots+"nk el az arch"+hu_i+"vumba.";
texte["info8a"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info9"] = "Gyorslinkek mutat"+hu_a+"sa a piact"+hu_e+"ren";
texte["info12"] = "<a href='http://www.mff.i24.cc/' target='_blank'>Statisztikai szerver haszn"+hu_a+"lata</a>. Szem"+hu_e+"lyes adatokat nem k"+hu_u_dots+"ld"+hu_u_dots+"nk!";
texte["info13"] = "A szkript "+hu_u+"j verzi"+hu_o+"j"+hu_a+"nak keres"+hu_e+"se, "+hu_e+"s lehet"+hu_o_double+"s"+hu_e+"g a friss"+hu_i+"t"+hu_e+"sre";
texte["hilfe1"] = "Klikkelj a diszn"+hu_o+"ra:<br>A farmod "+hu_a+"ttekint"+hu_e+"se mellett az aktu"+hu_a+"lis term"+hu_e+"nyeidr"+hu_o_double+"l, "+hu_e+"s a v"+hu_a+"s"+hu_a+"rl"+hu_o+"idr"+hu_o+"l kaphatsz itt hasznos inform"+hu_a+"ci"+hu_o+"kat, "+hu_o_dots+"sszes"+hu_i+"t"+hu_e+"seket. Ha az adatra klikkelsz, egyb"+hu_o_double+"l a kapcsol"+hu_o+"d"+hu_o+" helyre visz.";
texte["hilfe2"] = "K"+hu_e+"k s"+hu_a+"v (Vidd fel"+hu_e+" az egeret):<br>Az aktu"+hu_a+"lis szinted el"+hu_o_double+"n"+hu_e+"zete, ponthat"+hu_a+"rok.A f"+hu_u_dots+"gg"+hu_o_double+"leges feh"+hu_e+"r cs"+hu_i+"kok a h"+hu_e+"tk"+hu_o_dots+"znapokat jelzik, pirossal van a vas"+hu_a+"rnap. Klikkelj bele az elm"+hu_u+"lt napok t"+hu_o_dots+"rt"+hu_e+"n"+hu_e+"seinek megtekint"+hu_e+"s"+hu_e+"hez.";
texte["hilfe3"] = "Term"+hu_e+"kek a polcon (vidd fel"+hu_e+" az egeret):<br>Kieg"+hu_e+"sz"+hu_i+"t"+hu_o_double+" adatok a pillanatnyi piaci "+hu_a+"rr"+hu_o+"l, "+hu_e+"s a k"+hu_e+"szleted "+hu_e+"rt"+hu_e+"k"+hu_e+"r"+hu_o_double+"l.";
texte["ausbauen"]="B"+hu_o_double+"v"+hu_i+"t"+hu_e+"s k"+hu_o_dots+"lts"+hu_e+"ge: ";
//Systemworte
texte["waehrung"] = "kT";
texte["coins"] = hu_E+"rme"
texte["zuteuer"] = "T"+hu_u+"l dr"+hu_a+"ga!";
texte["msg1a"] = "Piac";
texte["msg1b"] = " v"+hu_a+"s"+hu_a+"rolt ";
texte["msg1c"] = " <br> ";
texte["msg1d"] = " kT-"+hu_e+"rt t"+hu_o_double+"led.";
texte["msg2a"] = "Egy szerz"+hu_o_double+"d"+hu_e+"st elfogadtak"; //word in the system message overview
texte["msg2b"] = " elfogadott egy szerz"+hu_o_double+"d"+hu_e+"st!<br><br> A k"+hu_o_dots+"vetkez"+hu_o_double+" term"+hu_e+"keket adtuk el:<br>";
texte["msg2c"] = "<br> <br> A szerz"+hu_o_double+"d"+hu_e+"s teljes "+hu_o_dots+"sszege ";
texte["msg2d"] = " kT, j"+hu_o+"v"+hu_a+hu_i+"r"+hu_a+"sra ker"+hu_u_dots+"lt a sz"+hu_a+"ml"+hu_a+"don.";
break;}
}}

function $(ID) {return document.getElementById(ID)}
function removeElement(node){node.parentNode.removeChild(node)}
function kT_format(number){return number_format(number,2)+"&nbsp;"+texte["waehrung"];}
function kT_formatgr(number){return number_format(number,0)+"&nbsp;"+texte["waehrung"];}

function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}

function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
}

function keyup(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("keyup", true, true);
	A.dispatchEvent(B);
}

function number_format(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: number_format(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: number_format(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: number_format(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: number_format(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: number_format(1000);
	// *     returns 5: '1,000'
	// *     example 6: number_format(67.311, 2);
	// *     returns 6: '67.31'

	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
	var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	var abs = Math.abs(n).toFixed(prec);
	var _, i;

	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;

		_[0] = s.slice(0,i + (n < 0)) +
			  _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		s = _.join(dec);
	} else {
		s = s.replace('.', dec);
	}
	return s;
}

function time2str(time,mode){
	str="";
	if (!mode) {
		if (time%60>=10) str+=":"+Math.floor(time%60);
		else str+=":0"+Math.floor(time%60);
	}
	time=time/60;
	if (time>=1){
		if (time%60>=10) str=":"+Math.floor(time%60)+str;
		else str=":0"+Math.floor(time%60)+str;
	}
	else str=":00"+str;
	time=time/60;
	if (time>=1) str=Math.floor(time%24)+str;
	else str="0"+str;
	time=time/24;
	if (time>=1) str=Math.floor(time)+"d "+str;
	return str;
}

function uhrzeit(time,mode){
	var help = new Date(time*1000);
	if (help.getHours()<10) { var str = "0"+help.getHours(); }
	else { var str = help.getHours(); }
	if (help.getMinutes()<10) { str += ":0"+help.getMinutes(); }
	else { str += ":"+help.getMinutes(); }
	if (!mode) {
		if (help.getSeconds()<10) { str += ":0"+help.getSeconds(); }
		else { str += ":"+help.getSeconds(); }
	}
	return str;
}

function datum(time){
	var time2 = new Date(time*1000);
	str="";
	if (time2.getDate()<10) { str += "0"; }
	str += time2.getDate()+"."; 
	if (time2.getMonth()<9) { str += "0"; }
	str += (1+time2.getMonth())+"."+(1900+time2.getYear());
	return str;
}

function str2time(str){
	var keytime = /(\d+)\.(\d+)\.(\d+), (\d+):(\d+)/;
	help = keytime.exec(str);
	time = new Date(parseInt(help[3],10)+2000,parseInt(help[2],10)-1,help[1],help[4],help[5],0);
	return (time.getTime()/1000);
}

function bar(size,markvalue,maxvalue){
	size = Math.floor(size);
	var mark = Math.floor(size*markvalue/maxvalue);
	var cell=createElement("div",{style:"border:2px solid black; position:absolute; width:"+size+"px; height:12px;"});
     	createElement("div",{style:"position:absolute; width:"+mark+"px; height:12px; background-color:#5555FF;"},cell);
	return cell;
}

function igm(name,append,betreff){
	if (betreff) var ziel = "../nachrichten/new.php?to="+name+"&subject="+betreff;
	else var ziel = "../nachrichten/new.php?to="+name;
	link=createElement("span", {title:texte["nachrichtSchreiben"],style:"float:left;height:15px;margin-right:7px;", class:"link",align:"center",hspace:"4px"});
	createElement("img", {src:msgPicUrl, border:"0"},link);
	cover=createElement("div",{style:"position:relative;top:-12px;width:15px;height:11px;opacity:0.5;"},link);
	cover.addEventListener("mouseover",function(){this.style.backgroundColor = "blue";},false);
	cover.addEventListener("mouseout",function(){this.style.backgroundColor = "";},false);
	if(top.document.getElementById("multiframe")){
		link.addEventListener("click",function(){
			top.document.getElementById("multiframe").src = ziel;
			top.document.getElementById("multiframe").style.display = "block";
		},false);
	} else {
		link.addEventListener("click",function(){
			window.open(ziel);
		},false);
	}
	if (append) append.appendChild(link);
	return link;
}

function vertrag(name,append){
	var ziel = "http://s"+server+gamepage+"/vertraege/new.php?to_player="+name;
	link=createElement("span", {title:texte["vertragSchicken"],style:"float:left;height:15px;margin-right:5px;", class:"link",align:"center",hspace:"4px"});
	createElement("img", {src:vertragPicUrl, border:"0"},link);
	cover=createElement("div",{style:"position:relative;top:-15px;left:2px;width:11px;height:15px;opacity:0.5;"},link);
	cover.addEventListener("mouseover",function(){this.style.backgroundColor = "blue";},false);
	cover.addEventListener("mouseout",function(){this.style.backgroundColor = "";},false);
	if(top.document.getElementById("multiframe")){
		link.addEventListener("click",function(){
			top.document.getElementById("multiframe").src = ziel;
			top.document.getElementById("multiframe").style.display = "block";
		},false);
	} else {
		link.addEventListener("click",function(){
			window.open(ziel);
		},false);
	}
	if (append) append.appendChild(link);
	return link;
}

function stats(name,append){
	link=createElement("span", {title:texte["statistik"], style:"float:left;height:15px;margin-right:2px;", class:"link",hspace:"4px"});
	createElement("img", {src:statPicUrl, border:"0",style:"position:relative;top:5px;"},link);
	cover=createElement("div",{style:"position:relative;top:-4px;left:-1px;width:14px;height:11px;opacity:0.5;-moz-border-radius:5px;"},link);
	cover.addEventListener("mouseover",function(){this.style.backgroundColor = "blue";},false);
	cover.addEventListener("mouseout",function(){this.style.backgroundColor = "";},false);
	if(top.document.getElementById("shop")){
		link.addEventListener("click",function(){
			unsafeWindow.top.initCity(1);
			unsafeWindow.top.showDiv("transp3");
			top.document.getElementById("transp3").style.visibility = "visible";
			unsafeWindow.top.showDiv("shop");
			top.document.getElementById("shop").style.visibility = "visible";
			top.document.getElementById("shopframe").src="../stadt/stats.php?spielername="+name+"&stat=0";
		},false);
	} else {
		link.addEventListener("click",function(){document.location.href="../stadt/stats.php?spielername="+name+"&stat=0"},false);
	}
	if (append) append.appendChild(link);
	return link;
}

function show_page( page ) {
  unsafeWindow.gclr();
  unsafeWindow.clr();
  var i = 0;
  while( document.getElementById("kunde"+i) ) {
	document.getElementById("kunde"+i).style.display = "none";
	i++;
  }
  document.getElementById("einkaufszettel").style.display = "none";
  document.getElementById("multiframe").src = page;
  document.getElementById("popup_garden").style.display = "block";
  document.getElementById("multiframe").style.display = "block";
  document.getElementById("transp").style.display = "block";
}

function produktPic(name,append){
	if (isNaN(parseInt(name,10))) var prodNum = id[name];
	else var prodNum = parseInt(name,10);
	var cell=createElement("div",{style:"float: left; margin-right: 3px; border:none;"});
	if (prodNum>0) cell.setAttribute("class","kp"+prodNum);
	else createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/menu/coins.gif",height:"15",width:"15",border:"none"},cell);
	if (append) append.appendChild(cell);
	return cell;
}

function getData(){
	valKauflimit = parseInt(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valKauflimit"),10);
	if(isNaN(valKauflimit)) {valKauflimit=110;GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valKauflimit", valKauflimit);}
	valStatistik = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistik");
	if(valStatistik==undefined) {valStatistik=(lng=="de");GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistik", valStatistik);}

	name[0]=texte["coins"];
	typ[0] = "c";
	id["Coins"] = 0;
	block[0]=false;
	if(top.document.getElementById("coins")) bestand[id["Coins"]]=parseInt(top.document.getElementById("coins").innerHTML,10);

	try{ var arr = GM_getValue(lng+"_"+server+"_myFreeFarm_gut").split("|");
		for (var v=0;v<arr.length;v++){ gut[v] = parseFloat(arr[v]); }
	} catch(err) {}
	try{ var arr = GM_getValue(lng+"_"+server+"_myFreeFarm_gutBeob").split("|");
		for (var v=0;v<arr.length;v++){ gutBeob[v] = parseFloat(arr[v]); }
	} catch(err) {}
	
	try{
		levelnum=parseInt(top.document.getElementById("levelnum").innerHTML,10);
		for (var v=1;v<unsafeWindow.top.produkt_name.length;v++) {
			name[v]=unsafeWindow.top.produkt_name[v];
			typ[v]=unsafeWindow.top.produkt_category[v];
			id[name[v]]=v;
			if (!gut[v]){ gut[v] = 0; }
			c = unsafeWindow.top.rackElement[v].number;
			if (c) bestand[v]=parseInt(c,10);
			else bestand[v]=0;
			if (levelnum>=unsafeWindow.top.produkt_level[v]) block[v]=false;
			else block[v]=true;
		}
		//Club
		block[70]=true;
		block[72]=true;
		block[51]=true;
		block[87]=true;
		block[81]=true;
		block[84]=true;
		block[53]=true;
		block[54]=true;
		block[56]=true;
		block[89]=true;
		block[79]=true;
		block[49]=true;
		//unbenutzte
		block[66]=true; //Farmer
		block[67]=true; //Steinengel
		block[68]=true; //Kuerbis
		block[69]=true; //Brunnen
		block[71]=true; //Bank rot
		block[88]=true; //Minibauernhaus
		var help1 = new Array();
		var help2 = new Array();
		var help3 = new Array();		
		for (var v=1;v<name.length;v++) if (!block[v]) {
			switch (typ[v]) {
			case "v": help1.push(v); break;
			case "e": help2.push(v); break;
			case "z": help3.push(v); break;
			}
		}
		name_sort = ["0"].concat(help1,help2,help3);
	} catch(err) {
		try{ var arr = GM_getValue(lng+"_"+server+"_myFreeFarm_name").split("|");
			for (var v=0;v<arr.length;v++){
				name[v] = arr[v];
				id[name[v]] = v;
			}
		} catch(err) {}
		try{ name_sort = GM_getValue(lng+"_"+server+"_myFreeFarm_name_sort").split("|");
		} catch(err) {}	
		try{ var arr = GM_getValue(lng+"_"+server+"_myFreeFarm_typ").split("|");
			for (var v=0;v<arr.length;v++){	typ[v] = arr[v]; }
		} catch(err) {}	
		try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_bestand").split("|");
			for (var v=0;v<arr.length;v++){	bestand[v] = parseInt(arr[v],10); }
		} catch(err) {}
		try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_block").split("|");
			for (var v=0;v<arr.length;v++){	block[v] = (arr[v]=="true"); }
		} catch(err) {}
	}
}

function saveData(){
	GM_setValue(lng+"_"+server+"_myFreeFarm_name",name.join("|"));
	GM_setValue(lng+"_"+server+"_myFreeFarm_name_sort",name_sort.join("|"));
	GM_setValue(lng+"_"+server+"_myFreeFarm_typ",typ.join("|"));
	GM_setValue(lng+"_"+server+"_myFreeFarm_gut",gut.join("|"));
	GM_setValue(lng+"_"+server+"_myFreeFarm_gutBeob",gutBeob.join("|"));
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_block",block.join("|"));
}

//***********************************************************************************************************

function quicklinks () {

divquick=createElement("div",{style:"position:absolute; left:630px; top:40px; width:340px; background-color:white;z-index:10;"},all);
if(document.location!=top.location){
	divquick.addEventListener("mouseover",function(){this.style.left="320px"},false);
	divquick.addEventListener("mouseout",function(){this.style.left="630px"},false);
}

newtable=createElement("table",{border:"3px solid black;"},divquick);
newtr=createElement("tr","",newtable);
newtd=createElement("td","",newtr);

newdiv = createElement("div",{style:"float:right;height:30px;padding:2px;margin-right:20px;"},newtd);
//pic = createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/close.jpg", style:"width:25px;height:25px;position:relative;top:2px;left:2px;"},newdiv);
pic = createElement("div",{class:"v88"},newdiv);
newa = createElement("a",{class:"link2", href:"markt.php",style:"position:relative;top:-30px;"},newdiv);
newdiv.title=texte["markt1"];
newdiv = createElement("div",{style:"width:30px;height:30px;background-color:green;opacity:0;"},newa);
newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3"},false);
newdiv.addEventListener("mouseout",function(){this.style.opacity="0"},false);

var typOld = "c";
for (var w=0;w<name_sort.length;w++) {
	v = name_sort[w];
	if (typOld!=typ[v]) {
		newtr=createElement("tr","",newtable);
		newtd=createElement("td","",newtr);
		typOld = typ[v];
	}
	newdiv=createElement("div",{style:"float:left;height:30px;padding:2px;"},newtd);
	pic = createElement("div",{class:"v"+v},newdiv);
	newa = createElement("a",{class:"link2", href:"markt.php?order=p&id="+v,style:"position:relative;top:-30px;"},newdiv);
	newdiv.title=name[v].replace("&nbsp;"," ");
	newdiv = createElement("div",{style:"width:30px;height:30px;background-color:blue;opacity:0;"},newa);
	newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3"},false);
	newdiv.addEventListener("mouseout",function(){this.style.opacity="0"},false);
}
}

//***********************************************************************************************************

function buildPreise(modeStr){
	getData();
	if($("initsearchbutton")) removeElement($("initsearchbutton"));
	if($("marktstat")) removeElement($("marktstat"));
	if($("showMarktstat")) removeElement($("showMarktstat"));
	if($("setPreis")) removeElement($("setPreis"));
	if($("angebot_kaufen")) removeElement($("angebot_kaufen"));
	newtable=createElement("table",{width:"505px", border:"0", cellspacing:"0", style:"position:absolute;left:35px;top:45px;"});
	all.replaceChild(newtable,all.getElementsByTagName("table")[0]);
	newtablehead=createElement("thead","",newtable);
	newtablebody=createElement("tbody",{style:"overflow-y:auto; overflow-x:hidden"},newtable);
	newtablefoot=createElement("tfoot","",newtable);

	line=createElement("tr","",newtablehead);
	newtd=createElement("td",{colspan:"7", class:"tnormal", align:"center", style:"color:#f0ffef; font-weight:bold;"},line);
	cellPreise=createElement("div",{style:"float:left; width:380px;"},newtd,texte["preise"]);
	newdiv=createElement("div",{style:"float:right;"},newtd);
	cell = createElement("div",{title:texte["sorte1"],class:"link",style:"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
	cell.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
	cell.addEventListener("click",function(){buildPreise("v")},false);
	if (modeStr=="v") {cell.style.backgroundPosition="-10px -20px"; cellPreise.innerHTML += " "+texte["sorte1"]; }
	else cell.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false);
	cell = createElement("div",{title:texte["sorte2"],class:"link",style:"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
	cell.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
	if (modeStr=="z") {cell.style.backgroundPosition="-36px -20px";cellPreise.innerHTML += " "+texte["sorte2"]; }
	else cell.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false);
	cell.addEventListener("click",function(){buildPreise("z")},false);
	cell = createElement("div",{title:texte["sorte3"],class:"link",style:"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
	cell.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
	if (modeStr=="e") {cell.style.backgroundPosition="-62px -20px";cellPreise.innerHTML += " "+texte["sorte3"]; }
	else cell.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false);
	cell.addEventListener("click",function(){buildPreise("e")},false);
	cell = createElement("div",{title:texte["sorte4"],class:"link",style:"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -88px 0px transparent;"},newdiv);
	cell.addEventListener("mouseover",function(){this.style.backgroundPosition="-88px -20px";},false);
	if (modeStr=="cvez") cell.style.backgroundPosition="-88px -20px";
	else cell.addEventListener("mouseout",function(){this.style.backgroundPosition="-88px 0px";},false);
	cell.addEventListener("click",function(){buildPreise("cvez")},false);

	line=createElement("tr","",newtablehead);
	createElement("td",{colspan:"2", align:"center", class:"headercell"},line,texte["produkt"]);
	createElement("td",{align:"center", class:"headercell"},line,texte["bestand"]);
	createElement("td",{align:"center", class:"headercell"},line,texte["hofpreis"]);
	createElement("td",{align:"center", class:"headercell"},line,texte["beobachtet"]);
	createElement("td",{align:"center", class:"headercell"},line,texte["marktpreis"]);
	createElement("td",{align:"center", class:"headercell"},line,texte["abzglGebuehr"]);

	var sumwert=0;
	for(var w in name_sort){
		v = name_sort[w];
		if (modeStr.search(typ[v])!=-1) {
			if (typ[v]!="c") sumwert+=bestand[v]*gut[v];
			line = createElement("tr",{style:"color:white", title:"Wert: "+kT_formatgr(bestand[v]*gut[v]).replace("&nbsp;"," ")},newtablebody);
			line.addEventListener("mouseover",function(){this.style.backgroundColor='#084200'},false);
			line.addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
	
			cell = createElement("td","",line);
			produktPic(v,cell);
	
			cell = createElement("td","",line);
			createElement("a",{class:"link2", href:"markt.php?order=p&id="+v},cell,name[v]);
	
			cell = createElement("td",{align:"right"},line);
			if (bestand[v]) cell.innerHTML = number_format(bestand[v],0); else cell.innerHTML = "-";
	
			cell = createElement("td",{align:"right"},line);
			if (npc[v]) cell.innerHTML = number_format(npc[v],2); else cell.innerHTML = "";
	
			cell = createElement("td",{align:"right"},line);
			if (gutBeob[v]) cell.innerHTML = number_format(gutBeob[v],2); else cell.innerHTML = "";
	
			cell = createElement("td",{align:"right"},line);
			createElement("span",{style:"font-size:0px;"},cell,number_format(gut[v],2));
			inp = createElement("input",{id:"inp"+v, tabindex:parseInt(w,10)+1,value:number_format(gut[v],2), size:"10", maxlength:"10",style:"text-align:right; background-color:transparent; color:white;"},cell);
			inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
			inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
			inp.addEventListener("change",function(){
				var currId = this.id.replace("inp","");
				gut[currId]=parseFloat(this.value.replace(regDelimThou,"").replace(delimDeci,"."));
				this.parentNode.nextSibling.innerHTML =  number_format(0.9*gut[currId],2);
				saveData();
				this.style.backgroundColor="transparent";
			},false);
	
			createElement("td",{align:"right", style:"padding-right:20px"},line,number_format(0.9*gut[v],2));
		}
	}
	newtablebody.setAttribute("height",Math.min(361,19*newtablebody.childNodes.length)+"px");

	line=createElement("tr","",newtablefoot);
	cell=createElement("td",{id:"wert", colspan:"3", align:"center", style:"border-top:1px dashed #F0FFEF;"},line);
	newa=createElement("a",{class:"link2",style:"font-weight:bold;text-decoration:none"},cell,texte["nimmPreise"]);
	newa.addEventListener("click",function(){
		if (confirm(texte["set10"])) {
			GM_setValue(lng+"_"+server+"_myFreeFarm_gut",gutBeob.join("|"));
			buildPreise(modeStr);
		}
	},false);

	createElement("td",{id:"wert", colspan:"4", align:"center", style:"font-weight:bold;border-top:1px dashed #F0FFEF;"},line,texte["lagerwert"]+"&nbsp;"+kT_formatgr(sumwert));

	cell=createElement("div",{class:"link2",style:"position: absolute; top: 475px; left: 375px; width: 80px; height: 40px; background: url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},all);
	cell.addEventListener("click",function(){document.location.href="markt.php"},false);
	createElement("div",{style:"position: absolute; top: 7px; left: 7px; width: 67px; color: white; font-weight: bold;"},cell,texte["markt1"]);
}

//***********************************************************************************************************

function do_markt(){
getData();
candtr = candtable[0].getElementsByTagName("tr");

if (pageZusatz=="?show=overview") {
	canda = candtable[0].getElementsByTagName("a");
	for (var v in canda) produktPic(canda[v].innerHTML,canda[v].parentNode);
} else {
var keypage=/page=(\d*)/;
var keypageid=/order=p&id=(\d*)/;
var pageId = keypageid.exec(document.location);
var keyuserid=/order=v&id=(\d*)/;
var userId = keyuserid.exec(document.location);
var sumTotal = 0;
var gutBeobCount1 = 0;
var gutBeobCount2 = 0;

candtd = candtr[2].getElementsByTagName("td");
document.title=number_format(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_bargeld"),0);

for (var v=1;v<$("marketcontainer").childNodes.length;v=v+2) {
	var canddiv = $("marketcontainer").childNodes[v].getElementsByTagName("div");
	var menge = parseInt(canddiv[0].innerHTML,10);
	canddiv[0].setAttribute("title", texte["markt2"]+" "+number_format(sumTotal,0));
	sumTotal += menge;
	canddiv[0].innerHTML = number_format(menge,0);
	currId = keyinteger2.exec(canddiv[3].getElementsByTagName("a")[0].href)[1];
	canddiv[7].style.textAlign="right";
	preis = parseFloat(keyfloat.exec(canddiv[5].innerHTML.replace(regDelimThou,"").replace(delimDeci,"."))[1],10);
	if (v<8) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
	if (v<16) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
	if (v<24) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }

	canda = canddiv[7].getElementsByTagName("a");
	if (canda[0]){
		if (preis>=npc[currId]) {
			canddiv[7].innerHTML = canda[0].innerHTML; //zu teuer Link entfernen
			canddiv[7].setAttribute("title",texte["markt3"]+" ("+number_format(npc[currId],2)+")");
			canddiv[7].style.fontStyle="italic";
		}
		else {
			if (gut[currId]!=0 && 100*preis>valKauflimit*gut[currId]){
				canddiv[7].innerHTML = canda[0].innerHTML; //zu teuer Link entfernen
				canddiv[7].title=texte["markt4"]+" "+valKauflimit+"%";
			}
		}
	} else {
		if (canddiv[7].innerHTML==texte["zuteuer"]) {if (gut[currId]) canddiv[7].innerHTML=number_format(gut[currId],2); }
		else canddiv[7].innerHTML=""; //eigenes Angebot
	}

	// User highlighten
	var highlight = new Object();
	highlight[username]="104E8B";
	canda=canddiv[4].getElementsByTagName("a");
	if (highlight[canda[0].innerHTML]) canddiv[4].style.backgroundColor=highlight[canda[0].innerHTML];
}

if(pageId){
	var c=0;
	while ((c<name_sort.length)&&(name_sort[c]!=pageId[1])) c++;
	var pageIdVor = name_sort[(c-1+name_sort.length)%(name_sort.length)];
	var pageIdNach = name_sort[(c+1)%(name_sort.length)];

	candtr[1].firstChild.colSpan="4";
	newtd = createElement("td",{colspan:"2"},candtr[1]);
	candtr[1].insertBefore(newtd,candtr[1].firstChild);
	cell = createElement("div",{style:"float:left; padding-right:2px"},newtd);
	createElement("a",{id:"prevProduct",class:"link2",float:"left", href:"markt.php?order=p&id="+pageIdVor,title:name[pageIdVor]},cell,"<<");
	createElement("a",{id:"nextProduct",class:"link2",href:"markt.php?order=p&id="+pageIdNach,title:name[pageIdNach]},cell,">>");
	pic = produktPic(pageId[1],newtd);
	pic.title = name[pageId[1]];
	createElement("div",{title:texte["imLager"],style:"float:left;"},newtd,number_format(bestand[pageId[1]],0));

	newtd=createElement("td",{align:"right", style:"border-top:1px solid"});
	newtd.innerHTML = number_format(sumTotal,0);
	candtr[candtr.length-1].insertBefore(newtd,candtr[candtr.length-1].firstChild);

	newinp = createElement("input",{id:"setPreis", value:number_format(gut[pageId[1]],2), size:"10", maxlength:"10",title:texte["preis"], style:"position:absolute;top:515px;left:378px;text-align:right;background-color:#589456;"},all);
	newinp.addEventListener("focus",function(){this.style.backgroundColor="white";},false);
	newinp.addEventListener("blur",function(){this.style.backgroundColor="589456";},false);
	newinp.addEventListener("change",function(){gut[pageId[1]]=parseFloat(this.value.replace(regDelimThou,"").replace(delimDeci,"."));saveData();document.location=document.location;},false);

	if($("marketcontainer").childNodes.length==1){
		//keine Angebote
		newdivline = createElement("div",{class:"marketline"},$("marketcontainer"));
		createElement("div",{class:"c1"},newdivline,"0");
		newdiv = createElement("div",{class:"c2"},newdivline);
		createElement("div",{class:"c2_1 kp"+pageId[1]},newdiv);
		newdiv = createElement("div",{class:"c2_2"},newdiv,"&nbsp;");
		createElement("a",{href:"javascript:orderBy('p','"+pageId[1]+"')",class:"link2"},newdiv,name[pageId[1]]);
		createElement("div",{class:"c3"},newdivline,"---");
		createElement("div",{class:"c4"},newdivline,kT_format(npc[pageId[1]]));
		createElement("div",{class:"c5"},newdivline,kT_format(npc[pageId[1]]));
		createElement("div",{class:"c6"},newdivline,"---");
	} else {
		// Preisbeobachtung
		help = keypage.exec(pageZusatz);
		if (!help || (help[1]==1)) {
			gutBeob[pageId[1]] = Math.round(100*gutBeobCount1/gutBeobCount2,0)/100;
			minPreis = $("marketcontainer").childNodes[1].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(delimDeci,".").replace(" kT","");
			maxPreis = $("marketcontainer").childNodes[$("marketcontainer").childNodes.length-2].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(delimDeci,".").replace(" kT","");
			GM_setValue(lng+"_"+server+"_myFreeFarm_gutBeob",gutBeob.join("|"));
			if (valStatistik){
				var minBeob = new Array();
				var maxBeob = new Array();
				save = GM_getValue(lng+"_"+server+"_myFreeFarm_minBeob");
				if (save) minBeob = save.split("|");
				save = GM_getValue(lng+"_"+server+"_myFreeFarm_maxBeob");
				if (save) maxBeob = save.split("|");
				minBeob[pageId[1]] = minPreis;
				maxBeob[pageId[1]] = maxPreis;
				GM_setValue(lng+"_"+server+"_myFreeFarm_minBeob",minBeob.join("|"));
				GM_setValue(lng+"_"+server+"_myFreeFarm_maxBeob",maxBeob.join("|"));
			}
		}
	}

	// Produkt direkt verkaufen
	canddiv=document.getElementsByTagName("div");
	for (var v in canddiv) if((canddiv[v].style.top=="475px") && (canddiv[v].style.left=="200px")) {
		canddiv[v].addEventListener("click",function(){document.location.href="marktstand.php?produkt="+pageId[1]},false);
	}
	
	if (lng=="de") {
		newdiv=createElement("div",{id:"showMarktstat",class:"link2", style:"position: absolute; top: 475px; left: 545px; width: 80px; height: 40px; background: url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},all);
		createElement("div",{style:"position: absolute; top: 13px; width: 80px; color: white; font-weight: bold; text-align:center;"},newdiv,"Statistik");
		newdiv.addEventListener("click",function(){
			var time = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikTime");
			if (isNaN(time)) time=120;
			if (!!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikNpc")) { var valStatistikNpc = 1;}
			else { var valStatistikNpc = 0; }
			newdiv = createElement("div",{style:"position:absolute;top:0px;left:0px;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;background-color:white;color:black;z-index:99;"},all,"Lade...");
			var url = "http://www.mff.i24.cc/chart.php?w="+window.innerWidth+"&h="+window.innerHeight+"&t=h"+time+"&shownpc="+valStatistikNpc+"&clip=1&server1="+server+"&product1="+pageId[1]+"&color1=green";
			newobject = createElement("object",{data:url,type:type="image/svg+xml",style:"position:absolute;top:0px;left:0px;",width:window.innerWidth+"px",height:window.innerHeight+"px"},newdiv);
			createElement("param",{name:"src",value:url},newobject);
			newimg = createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/close.jpg",class:"link",style:"position:absolute;top:30px;right:10px;z-index:2;"},newdiv);
			newimg.addEventListener("click",function(){removeElement(this.parentNode);},false);
		},false);
	}
} else candtr[1].firstChild.colSpan="6";


if(userId){
	canda=candtr[3].getElementsByTagName("a");
	if(canda[1]){ var thisUser = canda[1].innerHTML; }
	newtr = createElement("tr","",candtable[0]);
	newtd = createElement("td","",newtr);
	if (thisUser){igm(thisUser,newtd);}
	stats(userId[1],newtd);
}

}

cell=createElement("div",{id:"showPreise",class:"link2", style:"position: absolute; top: 475px; left: 375px; width: 80px; height: 40px; background: url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},all);
if(pageId) cell.addEventListener("click",function(){buildPreise(typ[pageId[1]])},false);
else cell.addEventListener("click",function(){buildPreise("cvez")},false);
createElement("div",{style:"position: absolute; top: 13px;width: 80px; color: white; font-weight: bold;text-align:center;"},cell,texte["preise"]);

if (!!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valQuicklinks")) quicklinks();
}

//***********************************************************************************************************

function do_marktstand(){
getData();
document.title=number_format(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_bargeld"),0);
var valVerkaufLimitDown = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitDown");
if(isNaN(valVerkaufLimitDown)) {valVerkaufLimitDown=95;}
var valVerkaufLimitUp = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitUp");
if(isNaN(valVerkaufLimitUp)) {valVerkaufLimitUp=130;}

var keyprodukt=/produkt=(\d*)/;
var currProdukt=keyprodukt.exec(pageZusatz);
if (currProdukt) {
	if ($("p"+currProdukt[1])) {
		unsafeWindow.zeigePreisschild($("p"+currProdukt[1]));
		$("p"+currProdukt[1]).setAttribute("style","position: absolute; top: 380px; left: 515px; z-index: 0;");
	}
}

if (candtable[0]) {
	candtr = candtable[0].getElementsByTagName("tr");
	help = all.getElementsByTagName("span")[0];
	help.innerHTML = candtr.length+" "+help.innerHTML;
	for (var v=0;v<candtr.length;v++) {
		candtr[v].addEventListener("mouseover",function(){this.style.backgroundColor='#084200'},false);
		candtr[v].addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
		help=candtr[v].firstChild.innerHTML;
		help2=parseInt(help,10);
		help3=parseInt(help.replace(help2,"").replace(/\D/g,"").replace(delimDeci,"."),10)/100;
		candtr[v].firstChild.innerHTML = help.replace(help2,number_format(help2,0)).replace(" "+texte["waehrung"],"&nbsp;"+texte["waehrung"])+": "+kT_formatgr(help2*help3);
	}
}

newdiv = createElement("div",{style:"position:absolute;top:175px;width:150px"},$("preisschild"));
createElement("div",{id:"divBerInfo",style:"float:right;padding:3px;background-color:#003201;border:5px solid #594230;color:#f0ffef;font-weight:bold;"},newdiv);
newdiv = createElement("div",{style:"position:absolute;top:175px;left:180px"},$("preisschild"));
newdiv = createElement("div",{id:"divBerInfo2",style:"float:left;padding:0px;background-color:#003201;border:5px solid #594230;font-weight:bold;"},newdiv);
createElement("table","",newdiv);
var candinput = $("preisschild").getElementsByTagName("input");
function checkPreis() {
	var currId = id[$("preisschild").getElementsByTagName("span")[0].innerHTML];
	var currPreis = parseFloat(candinput[2].value+"."+candinput[3].value,10);
	$("divBerInfo").innerHTML = texte["wert"]+":&nbsp;"+kT_formatgr(currPreis*candinput[1].value);
	newtable = createElement("table");
	$("divBerInfo2").replaceChild(newtable,$("divBerInfo2").firstChild);
	if (gut[currId]) {
		if ((100*currPreis>valVerkaufLimitDown*gut[currId]) && (100*currPreis<valVerkaufLimitUp*gut[currId])) {candinput[6].style.display="";}
		else {candinput[6].style.display="none";}
		newtr = createElement("tr","",newtable);
		createElement("td",{style:"color:#f0ffef;font-weight:bold;"},newtr,texte["preis"]+": ");
		createElement("td",{style:"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(gut[currId]));
	}
	if (gutBeob[currId]) {
		newtr = createElement("tr","",newtable);
		createElement("td",{style:"color:#f0ffef;font-weight:bold;"},newtr,texte["beobachtet"]+": ");
		createElement("td",{style:"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(gutBeob[currId]));
	}
	if (npc[currId]) {
		newtr = createElement("tr","",newtable);
		createElement("td",{style:"color:#f0ffef;font-weight:bold;"},newtr,texte["hofpreis"]+": ");
		createElement("td",{style:"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(npc[currId]));
	}
}
$("preisschild").addEventListener("keyup",checkPreis,false);
candinput[1].addEventListener("focus",checkPreis,false);

if (!!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valQuicklinks")) quicklinks();
}

//***********************************************************************************************************

function do_stats(){
var keystat = /stat=(\d+)/;
var keythisuser=/(.*?)&nbsp/;

try{ var currStat = keystat.exec(pageZusatz)[1]; }
catch(err) { var currStat = "1"; }

switch (currStat){
case "0": // Einzelspieler
	try {
		thisUser=keythisuser.exec(candtable[1].getElementsByTagName("td")[1].firstChild.innerHTML+"&nbsp")[1];
		newtr=createElement("tr","",candtable[1]);
		newtd=createElement("td","",newtr);
		igm(thisUser,newtd);
		vertrag(thisUser,newtd)
	} catch(err) {}
	break;
// Spielerlisten
case "1": case "2": case "3": case "4": case "5": case "11": case "12": case "13": case "17": case "18":
	candtd = candtable[0].getElementsByTagName("td");
	for (var v=4;v<candtd.length;v=v+3) {
		thisUser=keythisuser.exec(candtd[v].firstChild.innerHTML+"&nbsp")[1];
		igm(thisUser,candtd[v]);
	}
	newspan = createElement("span",{class:"link"},candtd[candtd.length-1].childNodes[1],texte["geheZuSeite"]);
	newinput = createElement("input",{maxlength:"4",style:"width:40px;"},newspan);
	newinput.addEventListener("keyup",function(){$("page").value = parseInt(this.value,10);},false);
	break;
}

}

//***********************************************************************************************************

function do_wettbewerb(){
var keythisuser=/(.*?)&nbsp/;
candtd = candtable[1].getElementsByTagName("td");
for (var v=6;v<candtd.length;v=v+3) {
	thisUser=keythisuser.exec(candtd[v].firstChild.innerHTML+"&nbsp")[1];
	igm(thisUser,candtd[v]);
}


}

//***********************************************************************************************************

function do_kaufliste(){
var keyware = /(.+)x (.+) /;
var sum=0;
canddiv=top.document.getElementById("cartcontent").getElementsByTagName("div");
for(var v=0;v<canddiv.length;v++){
	if((canddiv[v].innerHTML!="")&&(canddiv[v].innerHTML.search("<div")==-1)){
	menge = keyware.exec(canddiv[v].innerHTML)[1];
	ware = keyware.exec(canddiv[v].innerHTML)[2];
	wert = menge*gut[id[ware]];
	sum += wert;
	canddiv[v].innerHTML += "<span style='font-size:14px;font-weight:normal;'>("+kT_formatgr(wert)+")</span>";
	}
}
canddiv=top.document.getElementById("cartsubmit").getElementsByTagName("div");
canddiv[1].innerHTML="";
preis=keyfloat.exec(canddiv[0].innerHTML.replace(regDelimThou,"").replace(delimDeci,"."))[1];
canddiv[0].innerHTML+= "<br><span style='font-size:15px;font-weight:normal;'>("+kT_formatgr(sum)+" / "+Math.round(100*preis/sum)+"%)</span>";
}

//***********************************************************************************************************

function do_farmis(){
	for (var v=0;v<$("customerline").childNodes.length;v++) if (!$("farmiInfo"+v)){
		createElement("div",{id:"farmiInfo"+v,style:"position:absolute;top:-30px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:5px;color: black;width:70px;font-size:0.8em;height:20px;"},$("blase"+v));
		$("kunde_"+v).addEventListener("mouseover",function(){
			farmiNr = this.id.replace("kunde_","");
			var picpos = 0;
			var cash = parseFloat(unsafeWindow.top.farmisinfo[0][farmiNr]["price"],10);
			arrFarmiWert[farmiNr]=0;
			for(var i = 1 ; i <= 7 ; i++) { // 7 = maxanzahl produkte pro farmi
				var pid = unsafeWindow.top.farmisinfo[0][farmiNr]["p"+i];
				var amount = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["a"+i],10);
				if((pid > 0) && (amount > 0)) {
					if ((!unsafeWindow.rackElement[pid].number) || (unsafeWindow.rackElement[pid].number<amount)) borderstr="1px red solid";
					else borderstr="";
					$("blase"+farmiNr).firstChild.childNodes[picpos].style.border=borderstr;
					arrFarmiWert[farmiNr] += amount*gut[pid];
				}
				picpos++;
				if (i==4) picpos++;
			}
			cell = $("farmiInfo"+farmiNr);
			if (cash<0.9*arrFarmiWert[farmiNr]) {
				cell.innerHTML = kT_format(cash)+"<br>"+number_format(100*cash/arrFarmiWert[farmiNr],1)+" %";
				cell.style.border="solid thin red";
				cell.style.backgroundColor="#FFDDDD";
			} else {
				cell.innerHTML = kT_format(cash)+"<br>"+number_format(100*cash/arrFarmiWert[farmiNr],1)+" %";
				cell.style.border="solid thin green";
				cell.style.backgroundColor="#DDFFDD";
			}
		},false);
	}
}

//***********************************************************************************************************

function do_main(){
getData();
saveData();
createElement("input",{id:"GMusername",value:username,type:"hidden"},all);
newinput = createElement("input",{id:"GMgetData",type:"hidden"},all);
newinput.addEventListener("click",function(){getData();},false);
newinput = createElement("input",{id:"GMdontcrop",type:"hidden"},all);
newinput.addEventListener("click",function(){
	valGiess = false;
	valErnte = false;
},false);
newinput = createElement("input",{id:"GMdocrop",type:"hidden"},all);
newinput.addEventListener("click",function(){
	valGiess = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valGiess");
	valErnte = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnte");
},false);
newinput = createElement("input",{id:"GMminBeob",type:"hidden"},all);
newinput = createElement("input",{id:"GMmaxBeob",type:"hidden"},all);
newinput = createElement("input",{id:"GMgutBeob",type:"hidden"},all);
newinput.addEventListener("click",function(){
	GM_setValue(lng+"_"+server+"_myFreeFarm_minBeob",$("GMminBeob").value);
	GM_setValue(lng+"_"+server+"_myFreeFarm_maxBeob",$("GMmaxBeob").value);
	GM_setValue(lng+"_"+server+"_myFreeFarm_gutBeob",$("GMgutBeob").value);
},false);
newinput = createElement("input",{id:"GMopenZone",type:"hidden"},all);
newinput.addEventListener("click",function(){
	unsafeWindow.top.showMain();
	var keycellid=/f(\d*)z(\d*)/;
	var help = keycellid.exec(this.value);
	if($("farmtooltip"+help[1])) click($("farmtooltip"+help[1]).parentNode)
	else {
		if ((help[1]=="2") && ($("farmpassage_r1").style.display!="none")) click($("farmpassage_r1").firstChild);
		if ((help[1]=="1") && ($("farmpassage_l2").style.display!="none")) click($("farmpassage_l2").firstChild);
	}
	window.setTimeout(function(){
		click($("zone"+help[2]).firstChild.firstChild);
	},500);
},false);

if (unsafeWindow.rid) {	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_session",unsafeWindow.rid); }
var keyzeit = /(..):(..):(..) h*/;
var keygarten = /parent.cache_me\((.*?),/;
var keypflanze = /_(..)\./;
var farmNr = -1;
var lastGiess = 0;
var lastErnte = 0;
var aktivAutomat = false;
try{ var zoneTyp = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneTyp").split("|"); }
catch(err) { var zoneTyp = new Array(); }
try{ var zoneNext = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneNext").split("|"); }
catch(err) { var zoneNext = new Array(); }
try{ var zoneMainprod = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneMainprod").split("|"); }
catch(err) { var zoneMainprod = new Array(); }
var zoneErnte = new Array();
for (var v=0;v<18;v++) {
	zoneErnte[v] = new Object;
	try{ help = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+v).split("|");
		for (var w=0;w<help.length;w++) {
			var help2 = help[w].split("~");
			zoneErnte[v][help2[0]] = parseInt(help2[1],10);
		}
	} catch(err) {}
}
var Now=Math.round((new Date()).getTime()/1000);
var nextTime = new Array();
for (var v=1;v<=18;v++){
	nextTime[v] = parseInt(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+v),10);
	if (isNaN(nextTime[v])){nextTime[v] = nie;};
}

// olle Werbung muss weg
werbediv = $("upsimtoolbar");
if (werbediv) {
	werbediv.style.display = "none";
	all.style.margin = "5px";
}
if ($("banner_right")) { $("banner_right").style.display = "none"; }
for (var v in unsafeWindow.welcomeblurb) { 
	GM_log(unsafeWindow.welcomeblurb[v]);
	delete unsafeWindow.welcomeblurb[v]; 
}
unsafeWindow.welcomeblurb[1] = "Willkommen bei <b>My Free Farm</b>.<br>";
$("notepad").style.zIndex = 101; // Notizen on top

//Ausbau-Kosten
ausbau = new Array();
ausbau[1]=[2000,21500,76000,192300]; //Acker
ausbau[2]=[2500,15200,32500,134500,350800]; //Huhn
ausbau[3]=[3400,16300,50200,159600,441000]; //Kuh
ausbau[4]=[6200,33500,76000,210500,482000];  //Schaf
ausbau[5]=[6800,44800,128200,230600,482000];  //Biene
ausbau[7]=[5200,33500,128200,230600,482000];  //Mayo
ausbau[8]=[6800,38000,128200,230600,482000];  //Kaese
ausbau[9]=[8100,63200,163200,303900];  //Wolle
ausbau[10]=[9700,81600,178100,330400]; //Bonbon

if (window.innerWidth<1180) candtable[1].style.paddingRight="176px";
if (window.innerHeight>830) all.style.overflowY = "hidden";
$("errorboxgarden").style.left="600px";
$("errorboxgarden").style.top="105px";

createElement("div",{id:"divStatistik",style:"display:none;",align:"center"},all);
divsetting = createElement("div",{style:"display:inline;"},all);
valGiess = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valGiess");
valErnte = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnte");
valErnteMsg = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnteMsg");
valLeereFelderLimit = parseInt(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valLeereFelderLimit"),10);
if(isNaN(valLeereFelderLimit)) {valLeereFelderLimit=3;GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valLeereFelderLimit", valLeereFelderLimit);}

link = createElement("button",{type:"button",class:"link2",style:"margin-left:3px;"},divsetting,texte["set2"]);
link.addEventListener("click",function(){window.open(scriptUrl)},false);
link.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
link.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

link = createElement("button",{type:"button",class:"link2",style:"margin-left:3px;"},divsetting,texte["optionen"]);
link.addEventListener("click",function(){show_page("hilfe.php?options");},false);
link.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
link.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

// andere ServerAccounts
var farmName = new Object();
try{ var help = GM_getValue(lng+"_"+server+"_myFreeFarm_farmName").split("|");
	for (var v=0;v<help.length;v++) {
		try{ help2 = help[v].split("~");
			farmName[help2[0]] = help2[1];
		} catch(err) {}
	}
} catch(err) {}
farmName[username] = $("username").innerHTML;
if (farmName[username]!=username) {
	newdiv = createElement("div",{class:"userinfositem link",style:"font-weight: bold;"});
	newdiv.innerHTML = "("+username+")";
	$("userinfoscontainer").insertBefore(newdiv,$("userinfoscontainer").childNodes[2]);
	
}
save = "";
for (var v in farmName) save += v+"~"+farmName[v]+"|";
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_farmName",save.slice(0,save.length-1));

var logindata = new Array();
try{ var help = GM_getValue("myFreeFarm_logindata").split("|");
	for (var v=0;v<help.length;v++) {
		try{ help2 = help[v].split("~");
			help2[3] = v;
			if ((help2[0]==lng) && (help2[1]==server) && (help2[2]!=username)) logindata.push(help2);
			if (!farmName[help2[2]]) farmName[help2[2]] = help2[2];
		} catch(err) {}
	}
} catch(err) {}

var gamepages = new Object();
gamepages["de"] = "http://www.myfreefarm.de";
gamepages["nl"] = "http://www.myfreefarm.nl";
gamepages["pl"] = "http://www.wolnifarmerzy.pl";
gamepages["co.uk"] = "http://www.myfreefarm.co.uk";
gamepages["hu"] = "enkicsitanyam.hu";

if (logindata.length>0) {
	newdiv = createElement("div",{id:"divAccounts",style:"position: absolute;top: 20px; right: 160px; border:2px solid black; padding:2px; background-color:#cc9; display:none;"},$("headercontainer"));
	newdiv.addEventListener("mouseout",function(){this.style.display = "none";},false);
	newdiv.addEventListener("mouseover",function(){this.style.display = "";},false);
	newdiv = createElement("div",{style:"position: absolute;top: 4px; right: 160px; font-size: 11px; color: rgb(247, 187, 135);",class:"link"},$("headercontainer"));
	createElement("div",{style:"float: left; margin-bottom: 2px; margin-right: 2px; text-decoration: underline;"},newdiv,"Umloggen");
	newdiv1 = createElement("div",{style:"float: left;"},newdiv);
	createElement("img",{border:"0",src:"http://dqt9wzym747n.cloudfront.net/pics/menu/logout.gif"},newdiv1);
	newdiv.addEventListener("mouseout",function(){$("divAccounts").style.display = "none";},false);
	newdiv.addEventListener("mouseover",function(){
		$("divAccounts").style.display = "";
		$("divAccounts").innerHTML = "";
		newtable = createElement("table","",$("divAccounts"));
		for (var v in logindata) {
			newtr = createElement("tr","",newtable);
			newtd = createElement("td","",newtr);
			createElement("a",{style:"text-decoration:none",class:"link",href:gamepages[logindata[v][0]]+"/login.php?start=1&ref=&wid=&dologin="+logindata[v][3]},newtd,farmName[logindata[v][2]]);
			var help = parseInt(GM_getValue(logindata[v][0]+"_"+logindata[v][1]+"_"+logindata[v][2]+"_myFreeFarm_nextTime_0"),10);
			if (help>Now) { createElement("td","",newtr,time2str(help-Now)); }
			else { createElement("td","",newtr,texte["fertig"].toLowerCase()+"!"); }
		}
	},false);
}

if (lng=="de") {
	link = createElement("button",{type:"button",class:"link2",style:"margin-left:3px;"},divsetting,"Statistik zeigen");
	link.addEventListener("click",function(){
		if (candtable[1].style.display=="") { 
			candtable[1].style.display = "none";
			$("divStatistik").style.display = "";
			this.innerHTML = "Spielfeld zeigen";
			buildStatistik("");
		}
		else { 
			candtable[1].style.display = "";
			$("divStatistik").style.display = "none";
			this.innerHTML = "Statistik zeigen";
		}
	},false);
	link.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	link.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
}

//Punkte
levelLog = new Object();
try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_levelLog").split("|");
	for (var v in arr){
		help = arr[v].split("~");
		levelLog[help[0]] = help[1];
	}
} catch(err) {}
var levelArr=new Array(0,0,58,2420,6620,15620,27900,58700,101700,163100,211900,276900,359000,467000,730000,1190000,1750000,2680000,3900000,5660000,7850000,10590000,15300000,20640000,26020000,37340000,50030000,65160000,85030000,108900000,139150000,175520000,222430000,276920000,345930000,429330000,535520000,667000000,667000001);
var levelpkt=parseInt($("pkt").innerHTML.replace(regDelimThou,""),10);
var today = new Date();
today = today.getDate()+"."+today.getMonth()+"."+today.getYear();
levelLog[today]=levelpkt;
var levelsum = levelArr[levelnum+1]-levelArr[levelnum-1];
var levelSize=959;
if(levelnum<levelArr.length) {
	divlevel=createElement("div",{class:"link",style:"float:left;width:'+levelSize+'px;position:relative;top:-2px;left:18px;"},candtable[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[0]);

	cell=bar(levelSize*(levelArr[levelnum]-levelArr[levelnum-1])/levelsum,1,1);
	cell.style.float = "left";
	cell.title = texte["level"]+" "+(levelnum-1)+": "+number_format(levelArr[levelnum-1],0)+"-"+number_format(levelArr[levelnum],0);
	divlevel.appendChild(cell);

	cell=bar(levelSize*(levelArr[levelnum+1]-levelArr[levelnum])/levelsum,levelpkt-levelArr[levelnum],levelArr[levelnum+1]-levelArr[levelnum]);
	cell.style.float = "left";
	cell.style.marginLeft=Math.ceil(2+levelSize*(levelArr[levelnum]-levelArr[levelnum-1])/levelsum)+"px";
	cell.title = texte["level"]+" "+(levelnum)+": "+number_format(levelArr[levelnum],0)+"-"+number_format(levelArr[levelnum+1],0);
	divlevel.appendChild(cell);

	for (var v in levelLog){
		if(levelArr[levelnum-1]<levelLog[v] && levelLog[v]<levelArr[levelnum+1]){
			cell=createElement("div",{style:"position:absolute;width:0px;margin-top:2px;height:12px;border-right:1px solid white;"},divlevel);
			if (levelLog[v]<levelArr[levelnum]) cell.style.marginLeft=Math.floor(2+levelSize*(levelLog[v]-levelArr[levelnum-1])/levelsum)+"px";
			else cell.style.marginLeft=Math.floor(4+levelSize*(levelLog[v]-levelArr[levelnum-1])/levelsum)+"px";
			help=v.split(".");
			if (new Date(1900+parseInt(help[2],10),help[1],help[0]).getDay()=="0") cell.style.borderColor="red";
		} else {
			delete levelLog[v];
		}
	}
	divlevel.addEventListener("click",function(){show_page("hilfe.php?level");},false);
}
save="";
for (var v in levelLog) save += v+"~"+levelLog[v]+"|";
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_levelLog",save.slice(0,save.length-1));

//Profit
newimg = createElement("img",{class:"link",src:"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png",style:"position:relative;top:610px;left:0px;"},$("buildingmain"));
newimg.addEventListener("mouseover",function(){this.src = "http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_on.png"},false);
newimg.addEventListener("mouseout",function(){this.src = "http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png"},false);
newimg.addEventListener("click",function(){show_page("hilfe.php?profit");},false);

//Uebersicht
$("titlepig").setAttribute("class","link");
$("titlepig").addEventListener("click",function(){show_page("hilfe.php?zonen");},false);
createElement("div",{id:"uebersichttooltip",class:"link",style:"background-color:#DE9008;border:1px solid #8F6803;color:#FFFFFF;display:none;font-size:11px;font-weight:normal;overflow:visible;padding:4px;position:absolute;text-align:left;top:23px;white-space:nowrap;z-index:105;"},$("titlepig"),texte["uebersicht"]);
$("titlepig").addEventListener("mouseover",function(){$("uebersichttooltip").style.display="";},false);
$("titlepig").addEventListener("mouseout",function(){$("uebersichttooltip").style.display="none";},false);

// Farmpedia
if (lng=="de"){
	newa = createElement("a",{href:"http://farmpedia.myfreefarm.de/",target:"_blank",style:"position:absolute;top:90px;left:110px;z-index:2;",class:"link"},$("rackBottom"));
	createElement("img",{style:"width:25px;height:25px;border:none;",src:"http://dqt9wzym747n.cloudfront.net/pics/points.gif"},newa);
	newa.addEventListener("mouseover",function(){$("ecardinfo").innerHTML="Zur FarmPedia";$("ecardinfo").style.display="";},false);
	newa.addEventListener("mouseout",function(){$("ecardinfo").innerHTML="E-Card versenden";$("ecardinfo").style.display="none";},false);
}

//Einkaufsliste bearbeiten
$("customerline").addEventListener("click",do_kaufliste,false);

//Sprechblase
var sprech = new Array();
for (var v=1;v<7;v++){
$("zone"+v).addEventListener("mouseout",function(){unsafeWindow.gclr()},false);
$("zone"+v).addEventListener("mouseover",function(){showBlase(this.id.replace("zone",""))},true);

function showBlase(zoneNr){
	var Heute = new Date().getDay();
	w = parseInt(zoneNr,10)+6*farmNr;
	$("sprcontent").firstChild.innerHTML = "";
	sprech[w]=createElement("div","",$("sprcontent").firstChild);
	createElement("div",{class:"tt"+zoneNext[w],style:"float:left;margin-top:5px;margin-right:5px;"},sprech[w]);
	newfont=createElement("font",{class:"tnormal",style:"font-weight:bold"},sprech[w]);
	if (name[zoneNext[w]]) newfont.innerHTML = name[zoneNext[w]]+"<br>";
	else newfont.innerHTML = texte["main1"];
	newfont=createElement("font",{class:"tnormal"},sprech[w]);
	if (nextTime[w]<=Now) {
		newfont.innerHTML = texte["fertig"]+"<br>"+texte["seit"]+" "+uhrzeit(nextTime[w])+"&nbsp;"+texte["uhr"];
	} else {if (nextTime[w]<nie) {
		var endDay = 3;
		if (nextTime[w]-Now<345000) endDay = (((new Date(1000*(nextTime[w])).getDay())-Heute+7)%7);
		if (endDay == 0) newfont.innerHTML = texte["fertig"]+"<br>"+texte["um"]+" "+uhrzeit(nextTime[w])+"&nbsp;"+texte["uhr"];
		else if (texte["day"+endDay]) newfont.innerHTML = texte["day"+endDay]+texte["fertig"].toLowerCase()+"<br>"+texte["um"]+" "+uhrzeit(nextTime[w])+"&nbsp;"+texte["uhr"];
		else newfont.innerHTML = new Date(1000*nextTime[w]).toLocaleString();
		}
	}
}
}

newspan = createElement("span",{style:"position:absolute; top: 50px; left: 58px;display:none;"},$("lager_info"));
createElement("img",{src:"http://board.myfreefarm.de/styles/wi/imageset/icon_topic_latest.gif", style:"width:20px; height:14px;"},newspan);
createElement("span",{id:"lager_zeit_ziel", class:"tnormal",style:"position:absolute; top: -1px; left: 20px;"},newspan);
$("lager").addEventListener("mouseover",function(){
	if ($("rackPopup")) {
		var currId = id[$("rackPopup").firstChild.firstChild.innerHTML];
		if (npc[currId]>0) { 
			newdiv = createElement("div",{class:"tmenu",style:"position:relative;height:13px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
			createElement("span",{style:"float:left;width:60px;"},newdiv,texte["hofpreis"]+": ");
			createElement("span",{style:"float:left;width:80px;text-align:right;"},newdiv,kT_format(npc[currId]));
		}
		newdiv = createElement("div",{class:"tmenu",style:"position:relative;height:13px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
		createElement("span",{style:"float:left;width:60px;"},newdiv,texte["marktpreis"]+": ");
		createElement("span",{style:"float:left;width:80px;text-align:right;"},newdiv,kT_format(gut[currId]));
		newdiv = createElement("div",{class:"tmenu",style:"position:relative;height:25px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
		createElement("span",{style:"float:left;width:60px;"},newdiv,texte["wert"]+": ");
		createElement("span",{style:"float:left;width:80px;text-align:right;"},newdiv,kT_formatgr(gut[currId]*unsafeWindow.rackElement[currId].number));
	}

},false);

window.setInterval(function () {
//Session testen
if (unsafeWindow.rid!=GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_session")) unsafeWindow.initLocation(1);
else GM_setValue(lng+"_"+server+"_myFreeFarm_sessionlost","false");

Now=Math.round((new Date()).getTime()/1000);
var zeitVerschiebung = parseInt(unsafeWindow.Zeit.Verschiebung,10);

if (unsafeWindow.userfarminfos[unsafeWindow.farm]) {
	//Farmwechsel
	if(farmNr != unsafeWindow.farm-1){
		farmNr = unsafeWindow.farm-1;
		for (var v=1;v<=6;v++){
			w = v+6*farmNr;
			zoneTyp[w]=unsafeWindow.userfarminfos[farmNr+1][v]["buildingid"];
			if (zoneTyp[w]=="6") zoneTyp[w]="0"; //Clubhaus

			//mehr Huehner
			if (zoneTyp[w]=="2") {
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:60px;left:30px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:30px;left:10px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:50px;left:70px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:100px;left:50px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:80px;left:30px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:30px;left:50px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
			}
			
			//mehr Schafe
			if (zoneTyp[w]=="4") {
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:60px;left:30px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/sheep_ani01.gif"},newdiv);
				newdiv = createElement("div",{class:"link",style:"position:absolute;top:30px;left:10px;",id:v},$("zone"+v).firstChild);
				newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
				newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
				createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/sheep_ani02.gif"},newdiv);
			}
		}
		lastGiess = 0;
		lastErnte = 0;
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneTyp",zoneTyp.join("|"));
	}

	//offener Acker
	cand = keygarten.exec($("gardenarea").innerHTML);
    if (cand && $("gardenmaincontainer").style.display=="block"){
		gartenNr = parseInt(cand[1],10);
		w = gartenNr+6*farmNr;
		zoneErnte[w] = new Object;
		if (!$("divErnteInfo")) createElement("div",{id:"divErnteInfo",style:"position:relative;float:left;top:120px;left:620px;padding:2px;border:2px inset white;background-color:#FFB876;display:none;"},$("gardenmaincontainer"));
		if ($("errorboxgarden").style.display == "block"){
			$("divErnteInfo").innerHTML = $("errorboxcontentgarden").innerHTML;
			$("divErnteInfo").style.display="";
			if (valErnteMsg) $("errorboxgarden").style.display="none";
		}
		if ( $("transp8").style.display=="block") {
			$("transp8").style.display="none";
			unsafeWindow.refreshGarden(gartenNr);
		}
		var bonus = 1-parseInt(unsafeWindow.userfarminfos[farmNr+1][gartenNr]["waterbonus"],10)/100;
		if ($("lager_zeit_ziel").parentNode.style.display == "none") $("lager_zeit_ziel").parentNode.style.display = "";
		if (typ[unsafeWindow.selected]=="v") {
			zielzeit = bonus*(unsafeWindow.rackElement[unsafeWindow.selected].duration/1000) + Now;
			$("lager_zeit_ziel").innerHTML = "=&nbsp;"+uhrzeit(zielzeit)+"&nbsp;Uhr";
		} else {
			$("lager_zeit_ziel").innerHTML = "=&nbsp;-";
		}

		nextTime[w] = nie-zeitVerschiebung;
		var gegossen = true;
		var ernten = false;
		var c=1;
		var leereFelder = 0;
		zoneMainprod[w]="";
		zoneNext[w]="";
		for(var v=1;v<=120;v++){
			if(unsafeWindow.garten_kategorie[v]=="v"){
				if (zoneMainprod[w]==unsafeWindow.garten_prod[v]) c++; else c--;
				if (c<1) zoneMainprod[w]=unsafeWindow.garten_prod[v];
				if (zoneErnte[w][unsafeWindow.garten_prod[v]]) zoneErnte[w][unsafeWindow.garten_prod[v]]++;
				else zoneErnte[w][unsafeWindow.garten_prod[v]] = 1;
				str=keypflanze.exec($("f"+v).style.background);
				if(str && str[1]=="04") {ernten=true;}
				z = unsafeWindow.garten_zeit[v];
				if(z!="0"){
					gegossen &= (unsafeWindow.garten_wasser[v]!=0);
					if (z < nextTime[w]) {
						nextTime[w] = parseInt(z,10);
						zoneNext[w] = unsafeWindow.garten_prod[v];
					}
					if ((unsafeWindow.garten_x[v]=="2")||(unsafeWindow.garten_y[v]!=unsafeWindow.garten_max_y[v])) {
						if ($("w"+v).style.display!="none") $("w"+v).style.display = "none";
					} else {
						if ($("w"+v).style.display!="") $("w"+v).style.display = "";
					}
				}
			} else {
				if ((unsafeWindow.garten_kategorie[v]!="z") && (unsafeWindow.garten_kategorie[v]!="u")) leereFelder++;
			}
		}
		if (leereFelder>valLeereFelderLimit){
			nextTime[w] = nie-zeitVerschiebung;
			zoneNext[w] = "";
		}
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneMainprod",zoneMainprod.join("|"));

		if(valGiess && !gegossen && (lastGiess!=gartenNr) && $("tooltipwaterall")) {
			unsafeWindow.waterGarden(gartenNr);
			lastGiess = gartenNr;
		}
		if(valErnte && ernten && (lastErnte!=gartenNr)) {
			unsafeWindow.cropGarden(gartenNr);
			lastErnte = gartenNr;
		}
		nextTime[w] += zeitVerschiebung;
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+(w),nextTime[w].toString());
		if (zoneErnte[w][0]) delete zoneErnte[w][0];
		save="";
		for (var v in zoneErnte[w]) save+=v+"~"+zoneErnte[w][v]+"|";
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+(w),save.slice(0,save.length-1));


		//Klon des Anpflanzautomaten
		if($("gardencancel").childNodes.length==1 && $("autoplantbutton"+gartenNr)){
			cell = $("autoplantbutton"+gartenNr).parentNode.cloneNode(true);
			cell.addEventListener("click",function(){$("gardenmaincontainer").setAttribute("style","display:none");},false);
			$("gardencancel").appendChild(cell);
		}
	} else {
		lastGiess=0;
		lastErnte=0;
		if ($("divErnteInfo")) removeElement($("divErnteInfo"));
		if ($("lager_zeit_ziel").parentNode.style.display == "") $("lager_zeit_ziel").parentNode.style.display = "none";
	}

	//Zonen
	for (var v=1;v<=6;v++){
		w = v+6*farmNr;
		if (zoneTyp[w]!="0") {
			if ($("updateinfo"+v)) $("updateinfo"+v).innerHTML=texte["ausbauenFuer"]+"&nbsp;"+kT_formatgr(ausbau[zoneTyp[w]][$("zone"+v).childNodes[1].childNodes.length]);
			if($("buildingdestructbutton"+v)) removeElement($("buildingdestructbutton"+v));
			if(!$("zonetime"+v)) {
				createElement("div",{id:"zonetime"+v, style:"z-index:3;position:absolute;left:0px;top:-16px;padding:2px;color:white;font-weight:bold;"},$("zone"+v));
				newdiv=createElement("div",{id:"zoneinfo"+v, style:"z-index:3;position:absolute;left:120px;top:20px;"},$("zone"+v));
				newdiv.addEventListener("mouseover",function(){
					var currId = parseInt(this.id.replace("zoneinfo",""),10);
					var divtimeevent = $("timeevent"+currId);
					divtimeevent.innerHTML="";
					newdiv=createElement("div","",divtimeevent,texte["ertrag"]);
					for (var k in zoneErnte[currId+6*farmNr]) {
						newdiv=createElement("div",{style:"height:15px"},divtimeevent);
						produktPic(k,newdiv);
						createElement("div",{style:"padding-left:18px;"},newdiv,(zoneErnte[currId+6*farmNr][k]*unsafeWindow.produkt_ernte[k])/(unsafeWindow.produkt_x[k]*unsafeWindow.produkt_y[k])+" "+name[k]);
					}
					divtimeevent.style.display="block";
				},false);
				newdiv.addEventListener("mouseout",function(){$(this.id.replace("zoneinfo","timeevent")).style.display="none";},false);
				newdiv=createElement("div",{id:"timeevent"+v,class:"blackbox"},$("zone"+v));
			}


			//Acker
			if (zoneTyp[w]=="1") {
				$("zoneinfo"+v).setAttribute("class","v"+zoneMainprod[w]);
				if (nextTime[w]<=Now) {
					if ($("zoneinfo"+v).childNodes.length==0) createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/incoming.gif", style:"position:absolute; top:30px;"},$("zoneinfo"+v));
				} else {
					if ($("zoneinfo"+v).childNodes.length!=0) removeElement($("zoneinfo"+v).firstChild);
				}
			} else {
			//Stall
				zoneNext[w] = unsafeWindow.userfarminfos[farmNr+1][v]["endproduct"];
				zoneErnte[w] = new Object;
				if (unsafeWindow.run[v]>0) {
					if (unsafeWindow.time[v]!="-1") nextTime[w] = Now+unsafeWindow.time[v];
					if (unsafeWindow.userfarminfos[farmNr+1][v]["animals"]>0) { zoneErnte[w][zoneNext[w]] = unsafeWindow.userfarminfos[farmNr+1][v]["animals"]; }
					else { zoneErnte[w][zoneNext[w]] = 1; }
					GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+w,zoneNext[w]+"~"+zoneErnte[w][zoneNext[w]]);
				} else {
					if (Now<nextTime[w]) nextTime[w]=nie;
					GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+w,"");
				}
				GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+w,nextTime[w].toString());
			}

			//Zeit
			if (nextTime[w]<=Now) {
				$("zonetime"+v).style.backgroundColor="red";
				$("zonetime"+v).innerHTML = texte["fertig"].toUpperCase()+"!";
			} else {if (nextTime[w]<nie) {
				$("zonetime"+v).style.backgroundColor="#DE9008";
				$("zonetime"+v).innerHTML = time2str(nextTime[w]-Now);
			} else {
				$("zonetime"+v).style.backgroundColor="#DE9008";
				$("zonetime"+v).innerHTML = "---";
			}}

		} else {
			nextTime[w] = nie;
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+(w),nextTime[w].toString());
		}
	}

	//Anpflanzautomat vordefinieren
	if (($("commitbox").style.display!="none") && ($("autoplantproduct"))) {
		if (!aktivAutomat && (unsafeWindow.kategorie=="v")) $("autoplantproduct").value=unsafeWindow.selected;
		aktivAutomat = true;
	} else { aktivAutomat = false; }

	//offener Stall
	if($("innermaincontainer").style.display == "block"){
		zoneNr = parseInt($("innermaincontainer").childNodes[1].firstChild.id.replace("button_cancel",""),10);
		showBlase(zoneNr);
		if (($("commitboxinner").style.display == "block") && (!$("feedMax"))){
			newa = createElement("a",{id:"feedMax",class:"link",style:"font-weight:bold;"});
			newa.innerHTML = "max";
			$("commitboxcontentinner").firstChild.insertBefore(newa,$("feedamount").nextSibling);
			newa.addEventListener("click",function(){$("feedamount").value=216;keyup($("feedamount"));},false);
		}
	}

	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneNext",zoneNext.join("|"));
}

//Gesamtzeit
nextTime[0] = nie;
for (var w=1;w<=6*unsafeWindow.farmamount;w++){
	if ((zoneTyp[w]!="0") && (nextTime[w] == nie)) { nextTime[0] = 0; }
	else { nextTime[0] = Math.min(nextTime[0],nextTime[w]); }
}
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_0",nextTime[0].toString());
if (nextTime[0]<=Now) document.title= texte["fertig"].toUpperCase()+" - My Free Farm";
else document.title=time2str(nextTime[0]-Now)+" - My Free Farm";

},500);

window.setInterval(function () {
	//Warenbestand speichern
	for (var v in name) {
		c = unsafeWindow.rackElement[v].number;
		if (c) bestand[v]=parseInt(c,10);
		else bestand[v]=0;
	}
	if($("coins")) bestand[id["Coins"]]=parseInt($("coins").innerHTML,10);
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_bestand",bestand.join("|"));

	bargeld=document.getElementById("bar").innerHTML.replace(" kT","").replace(regDelimThou,"").replace(delimDeci,".");
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_bargeld",bargeld);
	
	//aktuelle Preise holen
	try{ arr = GM_getValue(lng+"_"+server+"_myFreeFarm_gut").split("|");
		for (var v=0;v<arr.length;v++){
			gut[v] = parseFloat(arr[v],10);
		}
	} catch(err){}
	
	//andere Accounts fertig
	for (var v in logindata) {
		if (parseInt(GM_getValue(logindata[v][0]+"_"+logindata[v][1]+"_"+logindata[v][2]+"_myFreeFarm_nextTime_0"),10)<Now) {
			$("sprcontent").firstChild.innerHTML = "";
			createElement("a",{class:"link",href:gamepages[logindata[v][0]]+"/login.php?start=1&ref=&wid=&dologin="+logindata[v][3],style:"font-weight:bold;"},$("sprcontent").firstChild,farmName[logindata[v][2]]+" "+texte["fertig"].toLowerCase()+"!");
		}
	}
	
	do_farmis();
},5000);

window.setInterval(function () {
	unsafeWindow.updateRack(unsafeWindow._currRack,0);
	unsafeWindow.updateMenu();
},60000);

arrFarmiWert = new Array();
do_farmis();

if (valStatistik && (lng=="de")){
	sendStatData();
	window.setInterval(function () {
		sendStatData();
	},310000);
}

// Updatecheck
if (!!GM_getValue("myFreeFarm_valUpdate")) {
	valLastUpdate = GM_getValue("myFreeFarm_valLastUpdate");
	if(isNaN(valLastUpdate)) {valLastUpdate="0";}
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/66964.meta.js",
		onload: function(response) {
			keyusoversion = /uso:version\s+(\d+)/;
			serverversion = keyusoversion.exec(response.responseText)[1];
			if (valLastUpdate!=serverversion) {
				if(confirm(texte["updateinfo"])) {
					document.location="http://userscripts.org/scripts/source/76005.user.js";
				}
				GM_setValue("myFreeFarm_valLastUpdate",serverversion);
			}
		}
	});
}

}

//***********************************************************************************************************

function do_nachrichten_read(){
var keymsgid=/msg=(\d+)/
var keycurrpage = /page=(\d+)/;
var currMsgId=keymsgid.exec(pageZusatz)[1];
var candtr = candtable[1].getElementsByTagName("tr");
var absender="";
var betreff="";
var currPage = 1;
help = keycurrpage.exec(pageZusatz);
if (help) currPage = help[1];

if (pageZusatz.search("from=inbox")!=-1) {
	$("btn_inbox").bgColor="#cc9";
	absender=candtr[1].getElementsByTagName("a")[0].innerHTML;
	candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
	sendTime = candtr[2].getElementsByTagName("td")[1].innerHTML;
	betreff="Re: "+candtr[3].getElementsByTagName("td")[1].firstChild.innerHTML;

	valPrivNachr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valPrivNachr");
	if(isNaN(valPrivNachr)) {valPrivNachr=100;GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valPrivNachr", valPrivNachr);}
	var nachrichten = new Array();

	msgBox = candtr[4].getElementsByTagName("div")[0];
	removeElement(msgBox.getElementsByTagName("hr")[0]);
	removeElement(msgBox.getElementsByTagName("span")[0]);
	currMsg = msgBox.innerHTML;
	nachrichten[0] = new Array();
	nachrichten[0][0] = currMsgId;
	nachrichten[0][1] = absender;
	nachrichten[0][2] = "<u>->>&nbsp;"+sendTime+"</u><br>"+currMsg;
	
	try{ save = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten").split("&nbsp;|");
		for (var v=0;v<save.length;v++) {
			nachrichten[v+1] = save[v].split("&nbsp;~");
			if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)) {
				createElement("hr",{style:"height: 1px; width: 96%; border-right: 0px none; border-width: 1px 0px 0px; border-style: solid none none; border-color: rgb(170, 170, 170) -moz-use-text-color -moz-use-text-color;"},msgBox);
				createElement("span","",msgBox,nachrichten[v+1][2]);
			}
			if (v>valPrivNachr) break;
		}
	} catch(err) {}	
	
	function sortArr0Abst (a, b) {return parseInt(b[0],10) - parseInt(a[0],10);}
	nachrichten.sort(sortArr0Abst);
	if (nachrichten.length>1){
		for (var v=nachrichten.length-2;v>=0;v--) if (nachrichten[v][0]==nachrichten[v+1][0]) nachrichten.splice(v+1,1);
	}

	save="";
	for (var v=0;v<nachrichten.length;v++) save+=nachrichten[v].join("&nbsp;~")+"&nbsp;|";
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten",save.slice(0,save.length-7));
}

if (pageZusatz.search("from=outbox")!=-1) {
	$("btn_inbox").parentNode.childNodes[5].bgColor="#cc9";
	absender=candtr[1].getElementsByTagName("a")[0].innerHTML;
	candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
	betreff="Re: "+candtr[3].getElementsByTagName("td")[1].firstChild.innerHTML;

	var nachrichten = new Array();
	msgBox = candtr[4].getElementsByTagName("div")[0];
	try{ save = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten").split("&nbsp;|");
		for (var v=0;v<save.length;v++) {
			nachrichten[v+1] = save[v].split("&nbsp;~");
			if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)) {
				createElement("hr",{style:"height: 1px; width: 96%; border-right: 0px none; border-width: 1px 0px 0px; border-style: solid none none; border-color: rgb(170, 170, 170) -moz-use-text-color -moz-use-text-color;"},msgBox);
				createElement("span","",msgBox,nachrichten[v+1][2]);
			}
		}
	} catch(err) {}	
}

if (pageZusatz.search("from=system")!=-1) {
	$("btn_sysinbox").bgColor="#cc9";
	var kauf = new Array();
	var kaufids = new Object();

	valNachr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valNachr");
	if(isNaN(valNachr)) {valNachr=100;GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valNachr", valNachr);}
	var c=0;

	try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_kauf").split("|");
		for (var v in arr){
			help = arr[v].split("~");
			if (!kaufids[help[0]]){
				kauf[++c]= new Object();
				kaufids[help[0]]=c;
				kauf[c]["id"] = help[0];
				kauf[c]["kaeufer"] = help[1];
				kauf[c]["menge"] = help[2];
				kauf[c]["produkt"] = help[3];
				kauf[c]["preis"] = help[4];
				kauf[c]["typ"] = help[5];
				if (c>valNachr) break;
			}
		}
	} catch(err){}

	var help = candtable[1].getElementsByTagName("div")[1].innerHTML.replace(/\s+/,"").replace(/\s+/g," ");
	//Marktverkauf
	if ((help.search(texte["msg1b"])!=-1) && (help.search(texte["msg1c"])!=-1) && (help.search(texte["msg1d"])!=-1)){
		help = help.replace(texte["msg1b"],"##").replace(texte["msg1c"],"##").replace(texte["msg1d"],"##");
		help2 = help.split("##");
		help3 = help2[1].split("x ");
		kauf[0]= new Object();
		kauf[0]["id"]=currMsgId;
		kauf[0]["kaeufer"]=help2[0];
		absender=kauf[0]["kaeufer"];
		kauf[0]["menge"]=help3[0].replace(" ","");
		kauf[0]["produkt"]=help3[1];
		betreff=kauf[0]["produkt"];
		kauf[0]["preis"]=help2[2].replace(regDelimThou,"").replace(delimDeci,".");
		kauf[0]["typ"]="m";
	}
	//Vertragverkauf
	if ((help.search(texte["msg2b"])!=-1) && (help.search(texte["msg2c"])!=-1) && (help.search(texte["msg2d"])!=-1)){
		help = help.replace(texte["msg2b"],"##").replace(texte["msg2c"],"##").replace(texte["msg2d"],"##");
		help2 = help.split("##");
		help3 = help2[1].split("<br>");
		kauf[0]= new Object();
		kauf[0]["id"]=currMsgId;
		kauf[0]["kaeufer"]=help2[0];
		absender=kauf[0]["kaeufer"];
		if (help3.length==1) {
			help4 = help3[0].split("x ");
			kauf[0]["menge"]=help4[0].replace(" ","");
			kauf[0]["produkt"]=help4[1];
			betreff=kauf[0]["produkt"];
		} else {
			kauf[0]["menge"]="0";
			kauf[0]["produkt"]=help2[1];
		}
		kauf[0]["preis"]=help2[2].replace(regDelimThou,"").replace(delimDeci,".");
		kauf[0]["typ"]="v";
	}

	function sortIdAbst (a, b) {return b["id"] - a["id"];}
	kauf.sort(sortIdAbst);
	save="";
	for (var v in kauf) save += kauf[v]["id"]+"~"+kauf[v]["kaeufer"]+"~"+kauf[v]["menge"]+"~"+kauf[v]["produkt"]+"~"+kauf[v]["preis"]+"~"+kauf[v]["typ"]+"|";
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_kauf",save.slice(0,save.length-1));

	var msgId=GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_system").split("|");
	if (msgId.length>1) for(var d=0;d<msgId.length;d++) {if(msgId[d]==currMsgId) break;}
	else var d=0;
	cell=candtable[1].getElementsByTagName("tr")[5].getElementsByTagName("td")[0];
	cell.removeChild(cell.childNodes[1]);
	if(d>0){
		newinp=createElement("input",{type:"button", value:texte["vorigeNachricht"], class:"link2 msg_input"},cell);
		newinp.addEventListener("click",function(){document.location="read.php?from=system&page="+currPage+"&msg="+msgId[d-1]+"&mass=0"},false);
		newinp.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
		newinp.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
	}
	if (d<msgId.length-1) {
		newinp=createElement("input",{type:"button", value:texte["naechsteNachricht"], class:"link2 msg_input"},cell);
		newinp.addEventListener("click",function(){document.location="read.php?from=system&page="+currPage+"&msg="+msgId[d+1]+"&mass=0"},false);
		newinp.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
		newinp.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
	}

	if(absender) {
		candtr[1].getElementsByTagName("td")[1].childNodes[1].innerHTML=absender;
		candtr[1].getElementsByTagName("td")[1].childNodes[1].href="javascript:addContact('"+absender+"')";
		candtr[1].getElementsByTagName("td")[1].childNodes[3].addEventListener("click",function(){
			document.location.href="http://s"+server+gamepage+"/vertraege/new.php?to_player="+absender;
		},false);
		candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
	}
}

if(absender){
	//candtr[1].getElementsByTagName("td")[1].childNodes[3].align="center";
	removeElement(candtr[1].getElementsByTagName("td")[1].childNodes[3]);
	igm(absender,candtr[1].getElementsByTagName("td")[1],betreff);
	stats(absender,candtr[1].getElementsByTagName("td")[1]);
	vertrag(absender,candtr[1].getElementsByTagName("td")[1]);
}

// alle lesen
try{ var msgIdRead = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread").split("|");
	if (msgIdRead[msgIdRead.length-1]=="x") {
		help = msgIdRead.splice(0,1);
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread",msgIdRead.join("|"));
		if (help=="x") {document.location="http://s"+server+gamepage+"/nachrichten/system.php?page="+currPage;}
		else { document.location="read.php?from=system&page="+currPage+"&msg="+help+"&mass=0"; }
	}
} catch(err){}

}

//***********************************************************************************************************

function do_nachrichten_new(){
var Now=Math.round((new Date()).getTime()/1000);
$("btn_inbox").parentNode.childNodes[1].bgColor="#cc9";
if ($("msg_subject")) while($("msg_subject").value.search(/Re: Re: /)!=-1) $("msg_subject").value = $("msg_subject").value.replace(/Re: Re: /,"Re: ");
if ($("msg_to") && $("msg_to").value!="") {
	$("msg_to").style.width = "350px";
	stats($("msg_to").value,$("msg_to").parentNode);
}
if ($("msg_body")) {
	var help = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichtvorlage");
	if (help) $("msg_body").value = help;
	newa=createElement("a",{class:"link"},$("msg_body").parentNode,texte["vorlage"]);
	newa.addEventListener("click",function(){
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichtvorlage",$("msg_body").value);
	},false);

all.getElementsByTagName("input")[3].addEventListener("click",function(){
	save = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten");
	if (save) {
		save = (parseInt(save,10)+1)+"&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+datum(Now)+",&nbsp;"+uhrzeit(Now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>&nbsp;|"+save;
	} else {
		save = "1&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+datum(Now)+",&nbsp;"+uhrzeit(Now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>";
	}
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten",save);
},false);
}
}

//***********************************************************************************************************

function do_nachrichten_inbox(){
if($("btn_inbox").getAttribute("class").search("green")==-1) {
	$("btn_inbox").bgColor="#cc9";
	if ($("btn_sysinbox").getAttribute("class").search("green")!=-1) {
		window.location.href="http://s"+server+gamepage+"/nachrichten/system.php";
	}
}
}

//***********************************************************************************************************

function do_nachrichten_outbox(){
$("btn_inbox").parentNode.childNodes[5].bgColor="#cc9";
}

//***********************************************************************************************************

function do_nachrichten_contact(){
$("btn_inbox").parentNode.childNodes[6].bgColor="#cc9";
}

//***********************************************************************************************************

function do_nachrichten_system(){
getData();
var keynachrichtid=/javascript:showMessage\('(\d+)',(\d+)\)/;
var kauf=new Object();
var msgId=new Array();
var msgIdUnknown = new Array();
try{ help = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread").split("|");
	for (var v=0;v<help.length;v++)	msgIdUnknown[v] = parseInt(help[v],10);
} catch(err) {}

if($("btn_sysinbox").getAttribute("class").search("green")==-1) {
	$("btn_sysinbox").bgColor="#cc9";
}

try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_kauf").split("|");
	for (var v in arr){
		help = arr[v].split("~");
		kauf[help[0]]= new Object();
		kauf[help[0]]["kaeufer"] = help[1];
		kauf[help[0]]["menge"] = parseInt(help[2],10);
		kauf[help[0]]["produkt"] = help[3];
		kauf[help[0]]["preis"] = parseFloat(help[4],10);
		kauf[help[0]]["typ"] = help[5];
	}
} catch(err){}


candtr=candtable[1].getElementsByTagName("tr");
candtr[1].childNodes[1].innerHTML="";
colgroup=candtable[1].getElementsByTagName("col");
colgroup[0].width="20px";
colgroup[1].width="130px";
colgroup[2].width="380px";
colgroup[3].width="20px";

for(var v=0;v<candtr.length-4;v++) {
	canda=candtr[v+2].getElementsByTagName("a");
	help=keynachrichtid.exec(canda[0].href);
	if (help[2]=="0"){
		msgId[v] = help[1];
		if (kauf[msgId[v]]){
			canda[0].parentNode.style.width="380px";
			canda[0].innerHTML="";
			canda[0].setAttribute("style","text-decoration:none");
			if (kauf[msgId[v]]["menge"]!=0) igm(kauf[msgId[v]]["kaeufer"],canda[0].parentNode,kauf[msgId[v]]["produkt"]);
			else igm(kauf[msgId[v]]["kaeufer"],canda[0].parentNode);
			createElement("span",{style:"position:absolute; width:140px;"},canda[0],kauf[msgId[v]]["kaeufer"]);
			if(kauf[msgId[v]]["typ"]=="v") canda[0].style.fontStyle="italic";
			cell=createElement("span",{style:"position:absolute; left:140px; width:150px; text-align:right;"},canda[0]);
			if(kauf[msgId[v]]["menge"]!=0) {
				canda[0].title=texte["stueckpreis"]+": "+kT_format(kauf[msgId[v]]["preis"]/kauf[msgId[v]]["menge"]).replace("&nbsp;"," ");
				cell.innerHTML = number_format(kauf[msgId[v]]["menge"],0)+" "+kauf[msgId[v]]["produkt"];
				pic = produktPic(kauf[msgId[v]]["produkt"],cell);
				pic.setAttribute("style","float:right; margin-left:3px;");
			} else {
				cell.innerHTML = "...";
				canda[0].title=kauf[msgId[v]]["produkt"].replace(/<br>/g,",").replace(/x /g," ");
			}
			createElement("span",{style:"position:absolute; left:290px; width:90px; text-align:right;"},canda[0],kT_format(kauf[msgId[v]]["preis"]));
		} else {
			var help2 = canda[0].innerHTML.replace("<b>","").replace("</b>","");
			if ((help2==texte["msg1a"])||(help2==texte["msg2a"])) msgIdUnknown.push(msgId[v]);
		}
	} else { 
		canda[0].innerHTML = canda[0].innerHTML.replace(/<b>/g,""); }
}

try{ msgIdAll = msgId.concat(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_system").split("|")); } 
catch(err){ msgIdAll = msgId; }

function NumsortDesc (a, b) {return parseInt(b,10) - parseInt(a,10);}
msgIdAll.sort(NumsortDesc);
if (msgIdAll.length>1){
	for (var v=msgIdAll.length-2;v>-1;v--){
		if (msgIdAll[v]==msgIdAll[v+1]) msgIdAll.splice(v+1,1);
	}
}

msgIdUnknown.sort(NumsortDesc);
for (var v=msgIdUnknown.length-1;v>-1;v--){
	if (msgIdUnknown[v]==msgIdUnknown[v+1]) msgIdUnknown.splice(v+1,1);
	if (kauf[msgIdUnknown[v]] || isNaN(msgIdUnknown[v]) ) msgIdUnknown.splice(v,1);
}

GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_system",msgIdAll.join("|"));
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread",msgIdUnknown.join("|"));

cell=createElement("input",{type:"button",class:"link2 msg_input", value:texte["zeigeLog"]},candtable[3].getElementsByTagName("td")[1]);
cell.addEventListener("click",function(){build_log("","")},false);
cell.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
cell.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

if (msgIdUnknown.length>0) {
	cell=createElement("input",{type:"button",class:"link2 msg_input", value:texte["alleLesen"]},candtable[3].getElementsByTagName("td")[1]);
	//cell.title = msgIdUnknown.join("|");
	cell.addEventListener("click",function(){
		help = msgIdUnknown.splice(0,1);
		msgIdUnknown.push("x");
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread",msgIdUnknown.join("|"));
		unsafeWindow.showMessage(help,0);
	},false);
}
cell.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
cell.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

//*********************
function build_log(filter1,filter2){
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_system","");
	var umsatz=0;
	newtable=createElement("table",{style:"width:100%;"});
	candtable[2].parentNode.replaceChild(newtable,candtable[2]);
	newtablebody=createElement("tbody",{style:"overflow-y:auto; overflow-x:hidden; height: 228px;"},newtable);
	newtablefoot=createElement("tfoot","",newtable);
	for (var v in kauf) if ((kauf[v]["kaeufer"].search(filter1)!=-1) && (kauf[v]["produkt"].search(filter2)!=-1)){
		umsatz+=kauf[v]["preis"];
		newtr=createElement("tr",{class:"link2", id:v},newtablebody);
		if(kauf[v]["typ"]=="v") newtr.style.fontStyle="italic";
		newtd=createElement("td",{title:texte["filtern"].replace("xx",kauf[v]["kaeufer"])},newtr,kauf[v]["kaeufer"]);
		newtd.addEventListener("click",function(){build_log(kauf[this.parentNode.id]["kaeufer"],"");},false);
		newtd=createElement("td","",newtr);
		if (kauf[v]["menge"]!=0) {
			newtd.innerHTML = number_format(kauf[v]["menge"],0)+" "+kauf[v]["produkt"];
			newtd.title = texte["filtern"].replace("xx",kauf[v]["produkt"]);
			produktPic(kauf[v]["produkt"],newtd);
			newtd.addEventListener("click",function(){build_log("",kauf[this.parentNode.id]["produkt"]);},false);
		}
		else {
			var help=kauf[v]["produkt"].split("<br>");
			for (var i=0;i<help.length;i++){
				var help2= help[i].split("x ");
				newdiv=createElement("div",{style:"height:16px"},newtd,number_format(help2[0],0)+" "+help2[1]);
				produktPic(help2[1],newdiv);
			}
		}
		newtd=createElement("td",{align:"right", title:texte["zurNachricht"]},newtr,kT_format(kauf[v]["preis"]));
		newtd.addEventListener("click",function(){document.location.href="read.php?from=system&page=1&msg="+this.parentNode.id+"&mass=0"},false);
		newtd=createElement("td",{align:"right", title:texte["zurNachricht"],style:"padding-right:20px;"},newtr);
		if (kauf[v]["menge"]!=0) newtd.innerHTML = kT_format(kauf[v]["preis"]/kauf[v]["menge"]);
		newtd.addEventListener("click",function(){document.location.href="read.php?from=system&page=1&msg="+this.parentNode.id+"&mass=0"},false);
		newtr.addEventListener("mouseover",function(){this.style.backgroundColor="#AAAAAA"},false);
		newtr.addEventListener("mouseout",function(){this.style.background="none"},false);
	}
	newtr=createElement("tr","",newtablefoot);
	createElement("td","",newtr);
	createElement("td","",newtr);
	createElement("td",{align:"right", style:"border-top:1px solid"},newtr,kT_format(umsatz));

	newtable=createElement("table",{style:"width: 530px;"});
	candtable[3].parentNode.replaceChild(newtable,candtable[3]);
	newtr=createElement("tr","",newtable);
	newtd=createElement("td",{colspan:"4"},newtr);
	cell=createElement("input",{type:"button",class:"link2 msg_input", value:texte["summiereWaren"]},newtd);
	cell.addEventListener("click",function(){build_log_sum(filter1,filter2)},false);
	cell.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	cell.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

	createElement("span",{style:"padding-left:10px;"},newtd,texte["filterKaeufer"]);
	cell=createElement("input",{value:filter1,class:"link2",style:"width:100px",maxlength:"20"},newtd);
	cell.addEventListener("change",function(){
		filter1=this.value;
		build_log(filter1,filter2);
	},false);

	createElement("span",{style:"padding-left:10px;"},newtd,texte["filterWare"]);
	cell=createElement("select",{class:"link2"},newtd);
	createElement("option",{value:""},cell,"");
	for (var v in name_sort) { createElement("option",{value:name[name_sort[v]]},cell,name[name_sort[v]]);	}
	cell.value=filter2;
	cell.addEventListener("change",function(){
		filter2=this.value;
		build_log(filter1,filter2);
	},false);
}
//*********************
function build_log_sum(filter1,filter2){
	var kaufProdukt1 = new Object();
	kaufProdukt1_length=0;
	for (var v in kauf) if ((kauf[v]["menge"]!=0) && (kauf[v]["kaeufer"].search(filter1)!=-1) && (kauf[v]["produkt"].search(filter2)!=-1)) {
		if(kaufProdukt1[kauf[v]["produkt"]]){
			kaufProdukt1[kauf[v]["produkt"]]["menge"] += kauf[v]["menge"];
			kaufProdukt1[kauf[v]["produkt"]]["preis"] += kauf[v]["preis"];
			if (kauf[v]["typ"]=="v") kaufProdukt1[kauf[v]["produkt"]]["gewinn"] += kauf[v]["preis"];
			else kaufProdukt1[kauf[v]["produkt"]]["gewinn"] += 0.9*kauf[v]["preis"];
		} else {
			kaufProdukt1_length++;
			kaufProdukt1[kauf[v]["produkt"]]= new Object();
			kaufProdukt1[kauf[v]["produkt"]]["menge"] = kauf[v]["menge"];
			kaufProdukt1[kauf[v]["produkt"]]["preis"] = kauf[v]["preis"];
			kaufProdukt1[kauf[v]["produkt"]]["gewinn"] = kauf[v]["preis"];
		}
	}
	var kaufProdukt = new Array();
	for (var c=0;c<kaufProdukt1_length;c++){
		maxElemVal = 0;
		for (var v in kaufProdukt1) if (maxElemVal<kaufProdukt1[v]["preis"]) {
			maxElem = v;
			maxElemVal = kaufProdukt1[v]["preis"];
		}
		kaufProdukt[c] = kaufProdukt1[maxElem];
		kaufProdukt[c]["produkt"] = maxElem;
		delete kaufProdukt1[maxElem];
	}

	newtable=createElement("table",{style:"width: 100%;"});
	candtable[2].parentNode.replaceChild(newtable,candtable[2]);
	newtablehead=createElement("thead","",newtable);
	newtablebody=createElement("tbody",{style:"overflow-y:auto; overflow-x:hidden; height: 209px;"},newtable);
	newtablefoot=createElement("tfoot","",newtable);
	newtr=createElement("tr","",newtablehead);
	createElement("th","",newtr,texte["produkt"]);
	createElement("th","",newtr,texte["menge"]);
	createElement("th","",newtr,texte["umsatz"]);
	createElement("th","",newtr,"\u2205");
	createElement("th","",newtr,texte["gewinn"]);
	createElement("th","",newtr,"\u2205");
	var umsatz=0;
	var gewinn=0;
	for (var v in kaufProdukt) {
		umsatz+=kaufProdukt[v]["preis"];
		gewinn+=kaufProdukt[v]["gewinn"];
		newtr=createElement("tr",{id:v,class:"link",title:texte["filtern"].replace("xx",kaufProdukt[v]["produkt"])},newtablebody);
		newtd=createElement("td","",newtr,kaufProdukt[v]["produkt"]);
		produktPic(kaufProdukt[v]["produkt"],newtd);
		createElement("td",{align:"right",style:"border-right:1px solid black"},newtr,number_format(kaufProdukt[v]["menge"],0));
		createElement("td",{align:"right"},newtr,kT_format(kaufProdukt[v]["preis"]));
		createElement("td",{align:"right",style:"border-right:1px solid black"},newtr,kT_format(kaufProdukt[v]["preis"]/kaufProdukt[v]["menge"]));
		createElement("td",{align:"right"},newtr,kT_format(kaufProdukt[v]["gewinn"]));
		createElement("td",{align:"right",style:"padding-right:20px;"},newtr,kT_format(kaufProdukt[v]["gewinn"]/kaufProdukt[v]["menge"]));
		newtr.addEventListener("mouseover",function(){this.style.backgroundColor="#AAAAAA"},false);
		newtr.addEventListener("mouseout",function(){this.style.background="none"},false);
		newtr.addEventListener("click",function(){build_log("",kaufProdukt[this.id]["produkt"]);},false);
	}
	newtr=createElement("tr","",newtablefoot);
	createElement("td","",newtr);
	createElement("td","",newtr);
	createElement("td",{align:"right", style:"border-top:1px solid"},newtr,kT_format(umsatz));
	createElement("td","",newtr);
	createElement("td",{align:"right", style:"border-top:1px solid"},newtr,kT_format(gewinn));

	newtable=createElement("table",{style:"width: 530px;"});
	candtable[3].parentNode.replaceChild(newtable,candtable[3]);
	newtr=createElement("tr","",newtable);
	newtd=createElement("td",{colspan:"6"},newtr);
	cell=createElement("input",{type:"button",class:"link2 msg_input", value:texte["zeigeLog"]},newtd);
	cell.addEventListener("click",function(){build_log(filter1,filter2)},false);
	cell.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	cell.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

	createElement("span",{style:"padding-left:10px;"},newtd,texte["filterKaeufer"]);
	cell=createElement("input",{value:filter1,class:"link2",style:"width:100px",maxlength:"20"},newtd);
	cell.addEventListener("change",function(){
		filter1=this.value;
		build_log_sum(filter1,filter2);
	},false);

	createElement("span",{style:"padding-left:10px;"},newtd,texte["filterWare"]);
	cell=createElement("select",{class:"link2"},newtd);
	createElement("option",{value:""},cell,"");
	for (var v in name_sort) { createElement("option",{value:name[name_sort[v]]},cell,name[name_sort[v]]);	}
	cell.value=filter2;
	cell.addEventListener("change",function(){
		filter2=this.value;
		build_log_sum(filter1,filter2);
	},false);
}
//*********************

}

//***********************************************************************************************************

function do_vertraege_head(){
	candtr = candtable[0].getElementsByTagName("tr");
	newtd = createElement("td",{class:"bordered link2",align:"center"},candtr[0]);
	createElement("a",{style:"font-weight:bold;", href:"overview.php?old"},newtd,texte["alte"]);
}

//***********************************************************************************************************

function do_vertraege_new(){
getData();
candtable[0].childNodes[1].firstChild.childNodes[1].bgColor="#cc9";

candinput = candtable[1].getElementsByTagName("input");
if (candinput.length>0){
for (var v=0;v<candinput.length;v++) {
	if (candinput[v].name=="contract_to") { 
		neuvertrag = new Object();
		neuvertrag["zeit"] =  Math.round((new Date()).getTime()/1000);
		neuvertrag["kaeufer"] = candinput[v].value; 
		
		neuvertrag["menge"] = new Array();
		neuvertrag["produkt"] = new Array();
		neuvertrag["preis"] = new Array();
	}
	if (candinput[v].name.search("prod")!=-1) { neuvertrag["produkt"][keyinteger.exec(candinput[v].name)[1]] = name[candinput[v].value]; }
	if (candinput[v].name.search("anz")!=-1) { neuvertrag["menge"][keyinteger.exec(candinput[v].name)[1]] = candinput[v].value; }
	if (candinput[v].name.search("preis")!=-1) { neuvertrag["preis"][keyinteger.exec(candinput[v].name)[1]] = candinput[v].value; }
}

save = neuvertrag["zeit"]+"~"+neuvertrag["kaeufer"];
for (var w in neuvertrag["menge"]) save += "~"+neuvertrag["menge"][w]+"~"+neuvertrag["produkt"][w]+"~"+neuvertrag["preis"][w];
var help = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut");
if (help) save += "|"+help;
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut",save);
}
}

//***********************************************************************************************************

function do_vertraege_overview(){
getData();
var vertraegeIn = new Array();
var vertraegeOut = new Array();
var vertraegeInIds = new Object();
var keyvertrag = /'(\d+)',%20'(.*?)'%20/;

try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn").split("|");
	var c=-1;
	for (var v in arr) if (c<100){
		help = arr[v].split("~");
		if (!vertraegeInIds[help[0]]){
			vertraegeIn[++c]= new Object();
			vertraegeInIds[help[0]]=c+1;
			vertraegeIn[c]["id"] = help[0];
			vertraegeIn[c]["zeit"] = help[1];
			vertraegeIn[c]["verkaeufer"] = help[2];
			vertraegeIn[c]["menge"] = new Array();
			vertraegeIn[c]["produkt"] = new Array();
			vertraegeIn[c]["preis"] = new Array();
			for (var w=0;3*w+5<help.length;w++){
				vertraegeIn[c]["menge"][w] = parseInt(help[3*w+3],10);
				vertraegeIn[c]["produkt"][w] = help[3*w+4];
				vertraegeIn[c]["preis"][w] = parseFloat(help[3*w+5],10);
			}
		}
	}
} catch(err){}

try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut").split("|");
	var c=-1;
	for (var v in arr) if (c<100){
		help = arr[v].split("~");
		vertraegeOut[++c]= new Object();
		vertraegeOut[c]["id"] = c;
		vertraegeOut[c]["zeit"] = help[0];
		vertraegeOut[c]["kaeufer"] = help[1];
		vertraegeOut[c]["menge"] = new Array();
		vertraegeOut[c]["produkt"] = new Array();
		vertraegeOut[c]["preis"] = new Array();
		for (var w=0;3*w+4<help.length;w++){
			vertraegeOut[c]["menge"][w] = parseInt(help[3*w+2],10);
			vertraegeOut[c]["produkt"][w] = help[3*w+3];
			vertraegeOut[c]["preis"][w] = parseFloat(help[3*w+4],10);
		}
	}
} catch(err){}

function savevertraegeIn(){
	save="";
	for (var v in vertraegeIn) {
		save += vertraegeIn[v]["id"]+"~"+vertraegeIn[v]["zeit"]+"~"+vertraegeIn[v]["verkaeufer"];
		for (var w in vertraegeIn[v]["menge"]) save	+= "~"+vertraegeIn[v]["menge"][w]+"~"+vertraegeIn[v]["produkt"][w]+"~"+vertraegeIn[v]["preis"][w];
		save += "|";
	}
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn",save.slice(0,save.length-1));
}
function savevertraegeOut(){
	save="";
	for (var v in vertraegeOut) {
		save += vertraegeOut[v]["zeit"]+"~"+vertraegeOut[v]["kaeufer"];
		for (var w in vertraegeOut[v]["menge"]) save += "~"+vertraegeOut[v]["menge"][w]+"~"+vertraegeOut[v]["produkt"][w]+"~"+vertraegeOut[v]["preis"][w];
		save += "|";
	}
	GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut",save.slice(0,save.length-1));
}

candtd = candtable[0].getElementsByTagName("td");
if (pageZusatz=="?old"){ 
	candtd[2].bgColor="#cc9";
 	buildAlteVertraege(); 
} else { 
	candtd[1].bgColor="#cc9"; 
	candtr = candtable[1].getElementsByTagName("tr");
	for (var v in candtr) {
		candtd = candtr[v].getElementsByTagName("td");
		canda = candtr[v].getElementsByTagName("a");
		if (canda[0]) {
			help = keyvertrag.exec(canda[0].href);
			if (help[2] == "in") { 
				if (vertraegeInIds[help[1]]) {
					vertraegeIn[vertraegeInIds[help[1]]-1]["zeit"]=str2time(candtd[0].innerHTML);
				} else {
					c = vertraegeIn.length;
					vertraegeIn[c]= new Object();
					vertraegeInIds[help[1]]=c+1;
					vertraegeIn[c]["id"] = help[1];
					vertraegeIn[c]["zeit"] = str2time(candtd[0].innerHTML);
					vertraegeIn[c]["verkaeufer"] = "";
					vertraegeIn[c]["menge"] = new Array();
					vertraegeIn[c]["produkt"] = new Array();
					vertraegeIn[c]["preis"] = new Array();
					vertraegeIn[c]["menge"][0] = 1;
					vertraegeIn[c]["produkt"][0] = "Getreide";
					vertraegeIn[c]["preis"][0] = 1;
				}
			}
		}
	}
	savevertraegeIn();
}

function buildAlteVertraege() {
	canddiv = all.getElementsByTagName("div");
	newdiv = createElement("div",{style:"position: absolute; left: 15px; top: 66px; overflow: hidden;"});
	candtable[1].parentNode.parentNode.replaceChild(newdiv,candtable[1].parentNode);
	newtable = createElement("table",{style:"width:570px;"},newdiv);
	newtable2 = createElement("table",{style:"width:570px;"},newdiv);

	newtablehead = createElement("thead","",newtable);
	newtablebody = createElement("tbody",{style:"height:135px;overflow-x:hidden;overflow-y:scroll;"},newtable);
	newtr = createElement("tr","",newtablehead);
	createElement("td",{class:"tnormal",align:"center",colspan:"7",style:"color:black;font-weight:bold;"},newtr,texte["erhalteneVertraege"]);
	
	for (var v in vertraegeIn){
		newtr = createElement("tr","",newtablebody);
		newtr.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newtr.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

		newtd = createElement("td",{class:"borderTop"},newtr);
		if (vertraegeIn[v]["zeit"]!="0") newtd.innerHTML = datum(vertraegeIn[v]["zeit"])+",<br>"+uhrzeit(vertraegeIn[v]["zeit"],1)+"&nbsp;"+texte["uhr"];
		
		newtd = createElement("td",{class:"borderTop"},newtr,vertraegeIn[v]["verkaeufer"]);
		newdiv = createElement("div","",newtd);
		igm(vertraegeIn[v]["verkaeufer"],newdiv);
		stats(vertraegeIn[v]["verkaeufer"],newdiv);
		vertrag(vertraegeIn[v]["verkaeufer"],newdiv);

		newtd1 = createElement("td",{class:"borderTop"},newtr);
		newtd2 = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		newtd3 = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		var sum = 0
		for (var w in vertraegeIn[v]["menge"]) {
			newdiv = createElement("div",{style:"line-height:16px;"},newtd1,number_format(vertraegeIn[v]["menge"][w],0) +" "+ vertraegeIn[v]["produkt"][w]);
			produktPic(vertraegeIn[v]["produkt"][w],newdiv);
			createElement("div","",newtd2,kT_format(vertraegeIn[v]["preis"][w]));
			createElement("div","",newtd3,kT_formatgr(vertraegeIn[v]["menge"][w]*vertraegeIn[v]["preis"][w]));
			sum += vertraegeIn[v]["menge"][w]*vertraegeIn[v]["preis"][w];
		}
		newtd = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		if (vertraegeIn[v]["menge"].length>1) newtd.innerHTML = kT_formatgr(sum);
		newtd = createElement("td",{class:"borderTop",style:"text-align:right;padding-right:20px;"},newtr);
		newimg = createElement("img",{title:texte["loeschen"],id:v,src:"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif",class:"link2",style:"width:16px;height:16px;"},newtd);
		newimg.addEventListener("click",function(){
			if (confirm(texte["loeschen"]+"?")) { 
				vertraegeIn.splice(parseInt(this.id,10),1);
				savevertraegeIn();
				buildAlteVertraege();
			}
		},false);
	}
	
	newtablehead = createElement("thead","",newtable2);
	newtablebody = createElement("tbody",{style:"height:135px;overflow-x:hidden;overflow-y:scroll;"},newtable2);
	newtr = createElement("tr","",newtablehead);
	createElement("td",{class:"tnormal",align:"center",colspan:"7",style:"color:black;font-weight:bold;"},newtr,texte["gesendeteVertraege"]);
	
	for (var v in vertraegeOut){
		newtr = createElement("tr","",newtablebody);
		newtr.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newtr.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

		createElement("td",{class:"borderTop"},newtr,datum(vertraegeOut[v]["zeit"])+",<br>"+uhrzeit(vertraegeOut[v]["zeit"],1)+"&nbsp;"+texte["uhr"]);
		
		newtd = createElement("td",{class:"borderTop"},newtr,vertraegeOut[v]["kaeufer"]);
		newdiv = createElement("div","",newtd);
		igm(vertraegeOut[v]["kaeufer"],newdiv);
		stats(vertraegeOut[v]["kaeufer"],newdiv);
		vertrag(vertraegeOut[v]["kaeufer"],newdiv);

		newtd1 = createElement("td",{class:"borderTop"},newtr);
		newtd2 = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		newtd3 = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		var sum = 0
		for (var w in vertraegeOut[v]["menge"]) {
			newdiv = createElement("div",{style:"line-height:16px;"},newtd1,number_format(vertraegeOut[v]["menge"][w],0) +" "+ vertraegeOut[v]["produkt"][w]);
			produktPic(vertraegeOut[v]["produkt"][w],newdiv);
			createElement("div","",newtd2,kT_format(vertraegeOut[v]["preis"][w]));
			createElement("div","",newtd3,kT_formatgr(vertraegeOut[v]["menge"][w]*vertraegeOut[v]["preis"][w]));
			sum += vertraegeOut[v]["menge"][w]*vertraegeOut[v]["preis"][w];
		}
		newtd = createElement("td",{class:"borderTop",style:"text-align:right;"},newtr);
		if (vertraegeOut[v]["menge"].length>1) newtd.innerHTML = kT_formatgr(sum);
		newtd = createElement("td",{class:"borderTop",style:"text-align:right;padding-right:20px;"},newtr);
		newimg = createElement("img",{title:texte["loeschen"],id:v,src:"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif",class:"link2",style:"width:16px;height:16px;"},newtd);
		newimg.addEventListener("click",function(){
			if (confirm(texte["loeschen"]+"?")) { 
				vertraegeOut.splice(parseInt(this.id,10),1);
				savevertraegeOut();
				buildAlteVertraege();
			}
		},false);
	}
	
}
}

//***********************************************************************************************************

function do_vertraege_show(){
var keyvertragin = /v=(\d+)&typ=in/;
var keyname = /\s+(.*)&nbsp;/;
var vertraegeIn = new Array();
var vertraegeInIds = new Object();

spanError = all.getElementsByClassName("error");
if (spanError.length>0) {
	spanError[0].parentNode.style.height = "25px";
	spanError[0].parentNode.style.top = "262px";
}

if (keyvertragin.exec(pageZusatz)){

try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn").split("|");
var c=0;
	for (var v in arr){
		help = arr[v].split("~");
		if (!vertraegeInIds[help[0]]){
			vertraegeIn[++c]= new Object();
			vertraegeInIds[help[0]]=c;
			vertraegeIn[c]["id"] = help[0];
			vertraegeIn[c]["zeit"] = help[1];
			vertraegeIn[c]["verkaeufer"] = help[2];
			vertraegeIn[c]["menge"] = new Array();
			vertraegeIn[c]["produkt"] = new Array();
			vertraegeIn[c]["preis"] = new Array();
			for (var w=0;3*w+5<help.length;w++){
				vertraegeIn[c]["menge"][w] = parseInt(help[3*w+3],10);
				vertraegeIn[c]["produkt"][w] = help[3*w+4];
				vertraegeIn[c]["preis"][w] = parseFloat(help[3*w+5],10);
			}
			
		}
	}
} catch(err){}

canddiv = all.getElementsByTagName("div");
candtr = candtable[1].getElementsByTagName("tr");
vertraegeIn[0]= new Object();
vertraegeIn[0]["id"] = keyvertragin.exec(pageZusatz)[1];
vertraegeIn[0]["zeit"] = vertraegeIn[vertraegeInIds[vertraegeIn[0]["id"]]]["zeit"];
vertraegeIn[0]["verkaeufer"] = keyname.exec(canddiv[3].innerHTML)[1];
vertraegeIn[0]["menge"] = new Array();
vertraegeIn[0]["produkt"] = new Array();
vertraegeIn[0]["preis"] = new Array();
for (var w=0;w<candtr.length-2;w++){
	candtd = candtr[w].getElementsByTagName("td");
	vertraegeIn[0]["menge"][w] = parseInt(candtd[0].innerHTML,10);
	vertraegeIn[0]["produkt"][w] = candtd[2].innerHTML;
	vertraegeIn[0]["preis"][w] = parseFloat(candtd[4].innerHTML.replace(regDelimThou,"").replace(delimDeci,"."),10);
}

function sortIdAbst (a, b) {return b["id"] - a["id"];}
vertraegeIn.sort(sortIdAbst);
save="";
for (var v in vertraegeIn) {
	save += vertraegeIn[v]["id"]+"~"+vertraegeIn[v]["zeit"]+"~"+vertraegeIn[v]["verkaeufer"];
	for (var w in vertraegeIn[v]["menge"]) save	+= "~"+vertraegeIn[v]["menge"][w]+"~"+vertraegeIn[v]["produkt"][w]+"~"+vertraegeIn[v]["preis"][w];
	save += "|";
}
GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn",save.slice(0,save.length-1));
}
}

//***********************************************************************************************************

function do_hilfe(){
getData();
canddiv = all.getElementsByTagName("div");

// Levellog
if (pageZusatz=="?level"){
	for (var v=canddiv.length-1;v>0;v--) if (canddiv[v].style.height=="360px") removeElement(canddiv[v]);
	var divinfoTable=createElement("div",{style:"float:left;height:370px;margin-left:10px;margin-right:10px;padding-right:17px;overflow:auto;color:black;"},all);
	var divinfo=createElement("div",{style:"height:260px; margin:10px; overflow:auto; color:black;"},all);

	var Now=Math.round((new Date()).getTime()/1000);
	var levelnum=parseInt(top.document.getElementById("levelnum").innerHTML,10);
	var levelLog = new Object();
	try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_levelLog").split("|");
		for (var v in arr){
			help = arr[v].split("~");
			levelLog[help[0]] = help[1];
		}
	} catch(err){}
	var levelpkt=parseInt(top.document.getElementById("pkt").innerHTML.replace(regDelimThou,""),10);

	var today = new Date();
	today = today.getDate()+"."+today.getMonth()+"."+today.getYear();
	levelLog[today]=levelpkt;

	newtable=createElement("table",{border:"1"},divinfoTable);
	line=createElement("tr",{style:"color:black;"},newtable);
	createElement("th","",line,texte["tag"]);
	createElement("th","",line,texte["punkte"]);
	createElement("th","",line,"+");
	var c=0;
	var oldday=0;
	for (var v in levelLog){
		var day = v.split(".");
		newday = (new Date(1900+parseInt(day[2],10),day[1],day[0]).getDay()+6)%7;
		if (newday<oldday) {
			cell1.setAttribute("style","border-bottom:2px solid black;");
			cell2.setAttribute("style","border-bottom:2px solid black;");
			cell3.setAttribute("style","border-bottom:2px solid black;");
		}
		oldday=newday;
		line=createElement("tr",{align:"right"},newtable);
		line.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
		line.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

		if(++c==1) levelVor=levelLog[v];
		cell1=createElement("td","",line,day[0]+"."+(parseInt(day[1],10)+1)+"."+(parseInt(day[2],10)+1900));
		cell2=createElement("td","",line,number_format(levelLog[v],0));
		cell3=createElement("td","",line,number_format(levelLog[v]-levelVor,0));
		levelVor=levelLog[v];
	}

	for (var w in name_sort) {
		v = name_sort[w];
		c = unsafeWindow.top.rackElement[v].number;
		if (typ[v]=="v"){
			if(!c) {
				cell=createElement("div",{style:"line-height:16px;"},divinfo);
				produktPic(v,cell);
				createElement("span",{style:"font-weight:bold;"},cell,texte["lagerFehlt"].replace("xx",name[v]));
			}
			else if (c<200) {
				cell=createElement("div",{style:"line-height:16px;"},divinfo);
				produktPic(v,cell);
				createElement("span",{style:"font-weight:bold;"},cell,texte["lagerNiedrig"].replace("xx",name[v])+" ("+c+")");
			}
		}
		if (typ[v]=="e"){
			if(!c) {
				cell=createElement("div",{style:"line-height:16px;"},divinfo);
				produktPic(v,cell);
				createElement("span",{style:"font-weight:bold;"},cell,texte["lagerFehlt"].replace("xx",name[v]));
				}
			else if (c<50) {
				cell=createElement("div",{style:"line-height:16px;"},divinfo);
				produktPic(v,cell);
				createElement("span",{style:"font-weight:bold;"},cell,texte["lagerNiedrig"].replace("xx",name[v])+" ("+c+")");
				}
		}
	}
}

//Optionen
if (pageZusatz=="?options"){
	var accountzahl=10;
	for (var v=canddiv.length-1;v>0;v--) if (canddiv[v].style.height=="360px") removeElement(canddiv[v]);
	var divinfo=createElement("div",{style:"height:380px; width:500px; margin:10px; overflow:auto; color:black;"},all);

	createElement("div",{align:"center",style:"line-height:30px;font-weight:bold;"},divinfo,texte["optionen"]);
	
	newtable = createElement("table",{style:"width:100%"},divinfo);
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valAutoLogin = !!GM_getValue("myFreeFarm_valAutoLogin");
	inp = createElement("input",{id:"inputvalAutoLogin",type:"checkbox",class:"link",checked:valAutoLogin},newtd);
	inp.addEventListener("click",function(){valAutoLogin=this.checked;GM_setValue("myFreeFarm_valAutoLogin", valAutoLogin);},false);
	createElement("td","",newtr,texte["set3"]);	
	createElement("td","",newtr,texte["info3"]);	

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valGiess = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valGiess");
	inp = createElement("input",{id:"inputvalGiess",type:"checkbox",class:"link",checked:valGiess},newtd);
	inp.addEventListener("click",function(){
		valGiess=this.checked;
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valGiess", valGiess);
		click(top.document.getElementById("GMgetData"));
	},false);
	createElement("td","",newtr,texte["set4"]);	
	createElement("td","",newtr,texte["info4"]);
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valErnte = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnte");
	inp = createElement("input",{id:"inputvalErnte",type:"checkbox",class:"link",checked:valErnte},newtd);
	inp.addEventListener("click",function(){
		valErnte=this.checked;
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnte", valErnte);
		click(top.document.getElementById("GMgetData"));
	},false);
	createElement("td","",newtr,texte["set5"]);	
	createElement("td","",newtr,texte["info5"]);

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valErnteMsg = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnteMsg");
	inp = createElement("input",{id:"inputvalErnteMsg",type:"checkbox",class:"link",checked:valErnteMsg},newtd);
	inp.addEventListener("click",function(){
		valErnteMsg=this.checked;
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valErnteMsg", valErnteMsg);
		click(top.document.getElementById("GMgetData"));
	},false);
	createElement("td","",newtr,texte["set6"]);	
	createElement("td","",newtr,texte["info6"]);

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valLeereFelderLimit = parseInt(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valLeereFelderLimit"),10);
	if(isNaN(valLeereFelderLimit)) {valLeereFelderLimit=3;}
	inp = createElement("input",{id:"inputvalLeereFelderLimit",value:valLeereFelderLimit,maxlength:"2",size:"2px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valLeereFelderLimit=parseInt(this.value,10);
		if (!isNaN(valLeereFelderLimit)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valLeereFelderLimit", valLeereFelderLimit);
			this.value = valLeereFelderLimit;
			click(top.document.getElementById("GMgetData"));
		}
	},false);
	createElement("td","",newtr,texte["set6a"]);	
	createElement("td","",newtr,texte["info6a"]);
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputvalKauflimit",value:valKauflimit,maxlength:"3",size:"2px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valKauflimit=parseInt(this.value,10);
		if (!isNaN(valKauflimit)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valKauflimit", valKauflimit);
			this.value = valKauflimit;
		}
	},false);
	createElement("span","",newtd,"%");
	createElement("td","",newtr,texte["set7"]);	
	createElement("td","",newtr,texte["info7"]);
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valVerkaufLimitDown = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitDown");
	if(isNaN(valVerkaufLimitDown)) {valVerkaufLimitDown=95;}
	inp = createElement("input",{id:"inputvalVerkaufLimitDown",value:valVerkaufLimitDown,maxlength:"3",size:"2px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valVerkaufLimitDown=parseInt(this.value,10);
		if (!isNaN(valVerkaufLimitDown)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitDown", valVerkaufLimitDown);
			this.value = valVerkaufLimitDown;
		}
	},false);
	createElement("span","",newtd,"%");
	valVerkaufLimitUp = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitUp");
	if(isNaN(valVerkaufLimitUp)) {valVerkaufLimitUp=130;}
	inp = createElement("input",{id:"inputvalVerkaufLimitUp",value:valVerkaufLimitUp,maxlength:"3",size:"2px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valVerkaufLimitUp=parseInt(this.value,10);
		if (!isNaN(valVerkaufLimitUp)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valVerkaufLimitUp", valVerkaufLimitUp);
			this.value = valVerkaufLimitUp;
		}
	},false);
	createElement("span","",newtd,"%");
	createElement("td","",newtr,texte["set7a"]);	
	createElement("td","",newtr,texte["info7a"]);	

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valPrivNachr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valPrivNachr");
	if(isNaN(valPrivNachr)) {valPrivNachr=100;}
	inp = createElement("input",{id:"inputvalNachr",value:valPrivNachr,maxlength:"5",size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valPrivNachr=parseInt(this.value,10);
		if (!isNaN(valPrivNachr)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valPrivNachr", valPrivNachr);
			this.value = valPrivNachr;
		}
	},false);
	createElement("td","",newtr,texte["set8a"]);	
	createElement("td","",newtr,texte["info8a"]);
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valNachr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valNachr");
	if(isNaN(valNachr)) {valNachr=100;}
	inp = createElement("input",{id:"inputvalNachr",value:valNachr,maxlength:"5",size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
	inp.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
	inp.addEventListener("keyup",function(){
		valNachr=parseInt(this.value,10);
		if (!isNaN(valNachr)) {
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valNachr", valNachr);
			this.value = valNachr;
		}
	},false);
	createElement("td","",newtr,texte["set8"]);	
	createElement("td","",newtr,texte["info8"]);

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valQuicklinks = !!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valQuicklinks");
	inp = createElement("input",{id:"inputvalQuicklinks",type:"checkbox",class:"link",checked:valQuicklinks},newtd);
	inp.addEventListener("click",function(){valQuicklinks=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valQuicklinks", valQuicklinks);},false);
	createElement("td","",newtr,texte["set9"]);	
	createElement("td","",newtr,texte["info9"]);
	
	if (lng=="de") {
		newtr = createElement("tr","",newtable);
		newtd = createElement("td",{align:"center"},newtr);
		inp = createElement("input",{id:"inputvalStatistik",type:"checkbox",class:"link",checked:valStatistik},newtd);
		inp.addEventListener("click",function(){
			valStatistik=this.checked;
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistik", valStatistik);
			click(top.document.getElementById("GMgetData"));
		},false);
		createElement("td","",newtr,texte["set12"]);	
		createElement("td","",newtr,texte["info12"]);
	}
	
	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{align:"center"},newtr);
	valUpdate = !!GM_getValue("myFreeFarm_valUpdate");
	inp = createElement("input",{id:"inputvalUpdate",type:"checkbox",class:"link",checked:valUpdate},newtd);
	inp.addEventListener("click",function(){valUpdate=this.checked;GM_setValue("myFreeFarm_valUpdate", valUpdate);},false);
	createElement("td","",newtr,texte["set13"]);	
	createElement("td","",newtr,texte["info13"]);

	newtr = createElement("tr","",newtable);
	newtd = createElement("td",{colspan:"2",align:"center"},newtr);
	link = createElement("button",{type:"button",class:"link2"},newtd,texte["set1"]);
	link.addEventListener("click",function(){
		if(confirm(texte["set11"])) {
		for(var v=0;v<19;v++){
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+v,nie.toString());
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+v,"");
		}
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneTyp","");
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneNext","");
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneMainprod","");
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread","");
		top.document.location = top.document.location;
		}
	},false);
	link.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
	link.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
	createElement("td","",newtr,texte["set11"]);	

	
	//AutoLogin
	createElement("div",{align:"center",style:"line-height:30px;margin-top:20px;font-weight:bold;"},divinfo,texte["autoLogin"]);
	var logindata = new Array();
	try{ var help = GM_getValue("myFreeFarm_logindata").split("|");
		for (var v=0;v<accountzahl;v++) {
			if (help[v]) {logindata[v] = help[v].split("~");}
			else {
				logindata[v]=new Array();
				logindata[v][0]=lng;
				logindata[v][1]="0";
				logindata[v][2]="";
				logindata[v][3]="";
			} 
		}
	} catch(err) {
		for (var v=0;v<accountzahl;v++){
			logindata[v]=new Array();
			logindata[v][0]=lng;
			logindata[v][1]="0";
			logindata[v][2]="";
			logindata[v][3]="";
		}
	}


	function savelogin(){
		var help = new Array();
		for (var v=0;v<logindata.length;v++) help[v] = logindata[v].join("~");
		GM_setValue("myFreeFarm_logindata",help.join("|"));
	}
	newtable=createElement("table",{id:"tableAutologin",align:"center"},divinfo);
	newtr=createElement("tr",{},newtable);
	createElement("th",{},newtr,texte["server"]);
	createElement("th",{},newtr,texte["name"]);
	createElement("th",{},newtr,texte["passwort"]);
	for (var v=0;v<accountzahl;v++){
		newtr=createElement("tr",{},newtable);
		newtd=createElement("td",{},newtr);
		newinp=createElement("input",{style:"width:20px",maxlength:"2"},newtd);
		if (logindata[v][1]!="0") newinp.value = logindata[v][1];
		newinp.addEventListener("change",function(){
			var readin = parseInt(this.value,10);
			if (isNaN(readin) || (readin<1)) {alert("Ungueltiger Server"); this.value="";}
			else this.value=readin;
		},false);
		newselect=createElement("select","",newtd);
		createElement("option",{value:"de"},newselect,"de");
		createElement("option",{value:"nl"},newselect,"nl");
		createElement("option",{value:"pl"},newselect,"pl");
		newselect.value = logindata[v][0]; 
		newtd=createElement("td",{},newtr);
		createElement("input",{style:"width:150px",value:logindata[v][2],maxlength:"20"},newtd);
		newtd=createElement("td",{},newtr);
		createElement("input",{style:"width:150px",value:logindata[v][3],maxlength:"20",type:"password"},newtd);
		newtd=createElement("td",{title:texte["speichern"],class:"link2",id:"speicher"+v},newtr);
		createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/button_ok.png",style:"width: 16px; height: 16px;"},newtd);
		newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
		newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
		newtd.addEventListener("click",function(){
			currLine=this.id.replace("speicher","");
			if (this.parentNode.childNodes[0].firstChild.value!="") {
				logindata[currLine][0]=this.parentNode.childNodes[0].childNodes[1].value;
				logindata[currLine][1]=this.parentNode.childNodes[0].firstChild.value;
				logindata[currLine][2]=this.parentNode.childNodes[1].firstChild.value;
				logindata[currLine][3]=this.parentNode.childNodes[2].firstChild.value;
			}
			savelogin();
		},false);
		newtd=createElement("td",{title:texte["loeschen"],id:"loesch"+v},newtr);
		createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif",class:"link2",style:"width: 16px; height: 16px;"},newtd);
		newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
		newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
		newtd.addEventListener("click",function(){
			currLine=this.id.replace("loesch","");
			this.parentNode.childNodes[0].childNodes[1].value=lng;
			this.parentNode.childNodes[0].firstChild.value="";
			this.parentNode.childNodes[1].firstChild.value="";
			this.parentNode.childNodes[2].firstChild.value="";
			logindata[currLine][0]=lng;
			logindata[currLine][1]="0";
			logindata[currLine][2]="";
			logindata[currLine][3]="";
			savelogin();
		},false);
	}
	newdiv = createElement("div",{align:"center"},divinfo);
	newinput = createElement("input",{type:"checkbox",class:"link",checked:false},newdiv);
	newinput.addEventListener("click",function(){
		candinput = $("tableAutologin").getElementsByTagName("input");
		for (var v=2;v<candinput.length;v=v+3) {
			if (this.checked) { candinput[v].type = "" }
			else { candinput[v].type = "password" }
		}	
	},false);
	newspan = createElement("span","",newdiv,texte["zeigePasswoerter"]);
	
	for (var v=1;v<4;v++){
		createElement("div",{style:"margin-top:30px;"},divinfo,texte["hilfe"+v]);
	}

}

if (pageZusatz=="?zonen"){
	for (var v=canddiv.length-1;v>0;v--) if (canddiv[v].style.height=="360px") removeElement(canddiv[v]);
	var divinfo=createElement("div",{style:"height:380px; width:500px; margin:10px; overflow:auto; color:black;"},all);

	try{ var zoneTyp = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneTyp").split("|"); }
	catch(err){	var zoneTyp = new Array(19); }
	try{ var zoneNext = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneNext").split("|");	}
	catch(err){	var zoneNext = new Array(19); }
	var zoneErnte = new Array(19);
	var totalErnte = new Object;
	for (var v=1;v<19;v++) {
		zoneErnte[v] = new Object;
		try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+v).split("|");
			for (var w=0;w<arr.length;w++) if (arr[w]) {
				var help = arr[w].split("~");
				zoneErnte[v][help[0]] = parseInt(help[1],10);
				if (totalErnte[help[0]]) totalErnte[help[0]] += zoneErnte[v][help[0]];
				else totalErnte[help[0]] = zoneErnte[v][help[0]];
			}
		} catch(err){}
	}

	var Now=Math.round((new Date()).getTime()/1000);
	var Heute = new Date().getDay();
	var nextTime = new Array();
	for (var v=1;v<=18;v++){ nextTime[v] = parseInt(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nextTime_"+v),10); }

	newtable=createElement("table",{style:"width:100%" ,border:"1"},divinfo);
	for (var farms=0;farms<unsafeWindow.top.farmamount;farms++){
		newtr = createElement("tr","",newtable);
		newth=createElement("th",{colspan:6,class:"link"},newtr,texte["farm"]+" "+(farms+1));
		newth.addEventListener("mouseover",function(){this.style.backgroundColor='#cc9'},false);
		newth.addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
		newth.addEventListener("click",function(){unsafeWindow.top.initZones(this.innerHTML.replace(texte["farm"]+" ","")); unsafeWindow.top.showMain();},false);
		for (var z=1;z<7;z++){
			var zf = z+6*farms;
			if (z%3==1) newtr = createElement("tr","",newtable);
			newtd=createElement("td",{colspan:2,style:"width:33%;",class:"link",id:"f"+(farms+1)+"z"+z},newtr);
			if (zoneTyp[zf]!="0") {
				newtd.addEventListener("mouseover",function(){this.style.backgroundColor='#cc9'},false);
				newtd.addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
				newtd.addEventListener("click",function(){
					top.document.getElementById("GMopenZone").value=this.id;
					click(top.document.getElementById("GMopenZone"));
				},false); 
				newdiv=createElement("div",{style:"position:relative;top:0px;height:60px;overflow:hidden;"},newtd);
				createElement("div",{class:"bm"+zoneTyp[zf],style:"position:absolute;top:-20px;opacity:0.3;z-index:-1;"},newdiv);
				newdiv1 = createElement("div",{style:"position:absolute;top:0px;height:60px;width:100%;overflow:auto;"},newdiv);
				newdiv=createElement("div","",newdiv1);
				if (nextTime[zf]!=nie) {
					var endDay = 3;
					if (nextTime[zf]-Now<345000) endDay = (((new Date(1000*(nextTime[zf])).getDay())-Heute+7)%7);
					if (endDay == 0) newdiv.innerHTML = uhrzeit(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
					else if (texte["day"+endDay]) newdiv.innerHTML = texte["day"+endDay]+uhrzeit(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
					else newdiv.innerHTML = new Date(1000*nextTime[zf]).toLocaleString();
				} else { newdiv.innerHTML = texte["unbeschaeftigt"]}
				if (nextTime[zf]<Now) {
					newdiv.style.textDecoration="blink";
					newdiv.style.fontWeight="bold";
				}				
				for (var k in zoneErnte[zf]) {
					newdiv=createElement("div",{style:"line-height:16px;"},newdiv1);
					produktPic(k,newdiv);
					createElement("div",{style:"padding-left:18px;"},newdiv,(zoneErnte[zf][k]*unsafeWindow.top.produkt_ernte[k])/(unsafeWindow.top.produkt_x[k]*unsafeWindow.top.produkt_y[k])+" "+name[k]);
				}
			} else { newtd.innerHTML = "-"; }
		}

	}
	newtr = createElement("tr","",newtable);
	createElement("th",{colspan:3},newtr,texte["total"]);
	createElement("th",{colspan:3},newtr,texte["fehlt"]);
	newtr = createElement("tr","",newtable);
	newtd=createElement("td",{colspan:3},newtr);
	for (var k in totalErnte) {
		newdiv=createElement("div",{style:"height:16px"},newtd);
		produktPic(k,newdiv);
		createElement("div",{style:"padding-left:18px;"},newdiv,number_format((totalErnte[k]*unsafeWindow.top.produkt_ernte[k])/(unsafeWindow.top.produkt_x[k]*unsafeWindow.top.produkt_y[k]),0)+" "+name[k]);
	}

	newtdfehlt=createElement("td",{colspan:3},newtr);

	//Farmi-Uebersicht
	newtable=createElement("table",{style:"margin-top:10px;width:100%" ,border:"1"},divinfo);
	line=createElement("tr",{style:"color:black"},newtable);
	createElement("th","",line,texte["farmi"]);
	createElement("th","",line,texte["produkte"]);
	createElement("th","",line,texte["geld"]);
	createElement("th",{colspan:"2"},line,texte["wert"]);
	var farmiNr=-1;
	var farmi=1;
	var farmiSum = new Object;
	var farmiCash=0;
	while (unsafeWindow.top.farmisinfo[0][++farmiNr]) {
		if (!unsafeWindow.top.farmisaway[farmiNr]){
		farmi++;
		line=createElement("tr",{class:"link",name:farmiNr},newtable);
		line.addEventListener("mouseover",function(){this.style.backgroundColor='#cc9'},false);
		line.addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
		line.addEventListener("click",function(){unsafeWindow.top.close_page();unsafeWindow.top.showCart(this.getAttribute("name"));do_kaufliste();},false);
		cell1=createElement("td","",line);
		createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/verkauf/kunde_"+unsafeWindow.top.farmisinfo[0][farmiNr]["pic"]+"_still.gif", style:"relative: absolute; left: -1px; top: -5px; width: 40px; height: 60px;"},cell1);
		cell2=createElement("td","",line);
		var wert = 0;
		var cash = parseFloat(unsafeWindow.top.farmisinfo[0][farmiNr]["price"],10);
		farmiCash += cash;
		for(var i = 1 ; i <= 7 ; i++) { // 7 = maxanzahl produkte pro farmi
			var pid = unsafeWindow.top.farmisinfo[0][farmiNr]["p"+i];
			var amount = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["a"+i],10);
			if((pid > 0) && (amount > 0)) {
				produktPic(pid,cell2);
				newdiv=createElement("div",{style:"float:left;"},cell2,amount+" "+name[pid]);
				if ((!unsafeWindow.top.rackElement[pid].number) || (unsafeWindow.top.rackElement[pid].number<amount)) newdiv.style.color="red";
				createElement("div",{style:"clear:both;"},cell2);
				if (farmiSum[pid]) farmiSum[pid] += amount;
				else farmiSum[pid] = amount;
				wert += amount*gut[pid];
			}
		}
		cell3=createElement("td",{style:"text-align:right;"},line,kT_format(cash));
		cell4=createElement("td",{style:"text-align:right;"},line,kT_format(wert));
		cell5=createElement("td",{style:"text-align:right;"},line,number_format(100*cash/wert,1)+"%");
		}
	}
	if (farmi>1) {
		cell1.setAttribute("style","border-bottom:2px solid black;");
		cell2.setAttribute("style","border-bottom:2px solid black;");
		cell3.setAttribute("style","border-bottom:2px solid black;text-align:right;");
		cell4.setAttribute("style","border-bottom:2px solid black;text-align:right;");
		cell5.setAttribute("style","border-bottom:2px solid black;text-align:right;");
		line=createElement("tr","",newtable);
		line.addEventListener("mouseover",function(){this.style.backgroundColor='#cc9'},false);
		line.addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
		createElement("td",{style:"border-top:2px solid black;"},line);
		cell2=createElement("td",{style:"border-top:2px solid black;"},line);
		wert=0;
		for (var v in farmiSum) {
			produktPic(v,cell2);
			createElement("div",{style:"float:left;"},cell2,farmiSum[v]+" "+name[v]);
			createElement("div",{style:"clear:both;"},cell2);
			wert += farmiSum[v]*gut[v];
			if (unsafeWindow.top.rackElement[v].number) farmiSum[v] -= unsafeWindow.top.rackElement[v].number;
			if (farmiSum[v]<0) delete farmiSum[v];
		}
		cell3=createElement("td",{style:"border-top:2px solid black;text-align:right;"},line,kT_format(farmiCash));
		cell4=createElement("td",{style:"border-top:2px solid black;text-align:right;"},line,kT_format(wert));
		cell5=createElement("td",{style:"border-top:2px solid black;text-align:right;"},line,number_format(100*farmiCash/wert,1)+"%");
		for (var v in farmiSum) {
			produktPic(v,newtdfehlt);
			createElement("div",{style:"float:left;"},newtdfehlt,number_format(farmiSum[v],0)+" "+name[v]);
			createElement("div",{style:"clear:both;"},newtdfehlt);
		}
	}
}

// Profit
if (pageZusatz=="?profit"){
	for (var v=canddiv.length-1;v>0;v--) if (canddiv[v].style.height=="360px") removeElement(canddiv[v]);
	var divinfo=createElement("div",{style:"height:365px; margin:10px; overflow:auto; color:black;"},all);

	var Now=Math.round((new Date()).getTime()/1000);

	// Wachstumsdauer in min
	dauer = new Object();
	dauer[37] = 3000;
	dauer[39] = 4000;
	dauer[24] = 720;
	dauer[35] = 2000;
	dauer[20] = 480;
	dauer[5] = 120;
	dauer[1] = 20;
	dauer[18] = 90;
	dauer[32] = 720;
	dauer[33] = 1200;
	dauer[34] = 800;
	dauer[17] = 15;
	dauer[26] = 780;
	dauer[40] = 4800;
	dauer[3] = 45;
	dauer[8] = 960;
	dauer[6] = 240;
	dauer[38] = 960;
	dauer[2] = 45;
	dauer[36] = 880;
	dauer[43] = 6800;
	dauer[41] = 5500;
	dauer[19] = 240;
	dauer[4] = 90;
	dauer[44] = 7200;
	dauer[7] = 480;
	dauer[29] = 950;
	dauer[23] = 800;
	dauer[21] = 600;
	dauer[42] = 6200;
	dauer[31] = 1000;
	dauer[22] = 500;
	dauer[9] = 120;
	dauer[10] = 360;
	dauer[11] = 720;
	dauer[12] = 1440;
	dauer[25] = 1000;
	dauer[27] = 2000;
	dauer[28] = 3000;
	dauer[30] = 4000;

	// Punkte pro Pflanze
	punkte = new Object();
	punkte[37] = 2569;
	punkte[39] = 3611;
	punkte[24] = 92;
	punkte[35] = 405;
	punkte[20] = 42;
	punkte[5] = 64;
	punkte[1] = 3;
	punkte[18] = 7;
	punkte[32] = 133;
	punkte[33] = 229;
	punkte[34] = 157;
	punkte[17] = 1;
	punkte[26] = 108;
	punkte[40] = 4444;
	punkte[3] = 10;
	punkte[8] = 600;
	punkte[6] = 128;
	punkte[38] = 211;
	punkte[2] = 17;
	punkte[36] = 733;
	punkte[43] = 6799;
	punkte[41] = 5220;
	punkte[19] = 24;
	punkte[4] = 44;
	punkte[44] = 7333;
	punkte[7] = 267;
	punkte[29] = 319;
	punkte[23] = 88;
	punkte[21] = 63;
	punkte[42] = 6028;
	punkte[31] = 179;
	punkte[22] = 52;
	punkte[9] = 750;
	punkte[10] = 950;
	punkte[11] = 1540;
	punkte[12] = 2350;
	punkte[25] = 3100;
	punkte[27] = 4500;
	punkte[28] = 5000;
	punkte[30] = 5400;

	// Tiere Fabriken
	tiere = new Object();
	tiere[9] = [5,10,15,20,20];
	tiere[10] = [2,3,4,5,6];
	tiere[11] = [2,3,4,5,6];
	tiere[12] = [1,2,3,4,4];
	tiere[25] = [1,1,1,1,1];
	tiere[27] = [1,1,1,1,1];
	tiere[28] = [1,1,1,1,1];
	tiere[30] = [1,1,1,1,1];
	stallbonus = new Object();
	stallbonus[9] = [1,1,1,0.9,.8];
	stallbonus[10] = [1,1,1,0.9,.8];
	stallbonus[11] = [1,1,1,0.9,.8];
	stallbonus[12] = [1,1,1,0.9,.8];
	stallbonus[25] = [1,0.95,0.9,0.85,0.8];
	stallbonus[27] = [1,0.95,0.9,0.85,0.8];
	stallbonus[28] = [1,0.95,0.9,0.85];
	stallbonus[30] = [1,0.95,0.9,0.85];
	tierfutter = new Object();
	tierfutter[9] = [id["Getreide"],60,120,180,216,192];
	tierfutter[10] = [id["Klee"],48,72,96,108,115];
	tierfutter[11] = [id["Kr"+ae+"uter"],32,48,64,72,76];
	tierfutter[12] = [id["Kornblumen"],9,18,27,32,28];
	tierfutter[25] = [id["Eier"],30,30,30,30,30];
	tierfutter[27] = [id["Milch"],12,12,12,12,12];
	tierfutter[28] = [id["Wolle"],8,8,8,8];
	tierfutter[30] = [id["Honig"],5,5,5,5];
	sternid = new Object();
	sternid[9] = 1;
	sternid[10] = 2;
	sternid[11] = 3;
	sternid[12] = 4;
	sternid[25] = 5;
	sternid[27] = 6;
	sternid[28] = 7;
	sternid[30] = 8;
	
	createElement("div",{style:"font-weight:bold;text-align:center;width:500px;"},divinfo,texte["profitTable"]);
	createElement("table","",divinfo);
	function buildProfitTable(mode) {
		try{ var sterne = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_profittable").split("|"); }
		catch(err) { var sterne = [1,1,1,1,1,1,1,1,1]; }
		var profit = new Array();
		var c=-1;
		for (var v in name) {
			if ((typ[v]=="v") && (!block[v])) {
				profit[++c] = new Object();
				profit[c]["name"] = name[v];
				var bonus = (1-sterne[0]*0.05);
				profit[c]["dauer"] = 60*(1-sterne[0]*0.05)*dauer[v];
				profit[c]["punkte"] = Math.round(172800*punkte[v]/(bonus*dauer[v]*unsafeWindow.top.produkt_x[v]*unsafeWindow.top.produkt_y[v]));
				profit[c]["gut"] = 172800*gut[v]*(unsafeWindow.top.produkt_ernte[v]-1)/(bonus*dauer[v]*unsafeWindow.top.produkt_x[v]*unsafeWindow.top.produkt_y[v]);
				profit[c]["gutBeob"] = 172800*gutBeob[v]*(unsafeWindow.top.produkt_ernte[v]-1)/(bonus*dauer[v]*unsafeWindow.top.produkt_x[v]*unsafeWindow.top.produkt_y[v]);
			}
			if ((typ[v]=="e") && (!block[v])) {
				profit[++c] = new Object();
				profit[c]["name"] = name[v];
				profit[c]["level"] = sterne[sternid[v]];
				var bonus = stallbonus[v][profit[c]["level"]-1];
				profit[c]["dauer"] = 60*bonus*dauer[v];
				profit[c]["punkte"] = Math.round(1440*tiere[v][profit[c]["level"]-1]*punkte[v]*unsafeWindow.top.produkt_ernte[v]/(bonus*dauer[v]*unsafeWindow.top.produkt_x[v]*unsafeWindow.top.produkt_y[v]));
				profit[c]["gut"] = Math.round(1440*((tiere[v][profit[c]["level"]-1]*gut[v]*unsafeWindow.top.produkt_ernte[v])-(tierfutter[v][profit[c]["level"]]*gut[tierfutter[v][0]]))/(bonus*dauer[v]));
				profit[c]["gutBeob"] = Math.round(1440*((tiere[v][profit[c]["level"]-1]*gutBeob[v]*unsafeWindow.top.produkt_ernte[v])-(tierfutter[v][profit[c]["level"]]*gutBeob[tierfutter[v][0]]))/(bonus*dauer[v]));
			}
		}
	
		function sortProfit (a, b) {return b[mode] - a[mode];}
		profit.sort(sortProfit);
			
		newtable=createElement("table",{border:"1",width:"500px;"});
		divinfo.replaceChild(newtable,divinfo.childNodes[1]);
		newtablehead=createElement("thead","",newtable);
		newtablebody=createElement("tbody",{style:"overflow-y:auto;overflow-x:hidden;height:320px;"},newtable);
		
		newtr=createElement("tr",{style:"color:black;"},newtablehead);
		newth = createElement("th",{class:"link"},newtr,(5*sterne[0])+"%");
		newth.addEventListener("click",function(){
			sterne[0] = (sterne[0]%4)+1;
			GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_profittable",sterne.join("|"));
			buildProfitTable(mode);
		},false);
		for (var v=0;v<sterne[0];v++) createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/star.png"},newth);
		newth = createElement("th",{class:"link"},newtr,texte["dauer"]);
		newth.addEventListener("click",function(){buildProfitTable("dauer");},false);
		newth = createElement("th",{class:"link"},newtr);
		newth = createElement("th",{class:"link"},newtr,texte["punkte"]);
		newth.addEventListener("click",function(){buildProfitTable("punkte");},false);
		newth = createElement("th",{class:"link"},newtr,texte["preise"]);
		newth.addEventListener("click",function(){buildProfitTable("gut",sterne);},false);
		newth = createElement("th",{class:"link"},newtr,texte["beobachtet"]);
		newth.addEventListener("click",function(){buildProfitTable("gutBeob");},false);
		
		for (var v in profit) {
			newtr=createElement("tr",{style:"color:black;"},newtablebody);
			newtr.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
			newtr.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);
			newtd = createElement("td",{id:v},newtr,profit[v]["name"]);
			if (profit[v]["level"]) {
				newtd.setAttribute("class","link");
				for (var w=0;w<profit[v]["level"];w++) createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/star.png"},newtd);
				newtd.addEventListener("click",function(){
					currId = id[profit[this.id]["name"]];
					sterne[sternid[currId]] = (profit[this.id]["level"]%stallbonus[currId].length)+1;
					GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_profittable",sterne.join("|"));
					buildProfitTable(mode,sterne);
				},false);
			}
			createElement("td",{style:"text-align:right;"},newtr,time2str(profit[v]["dauer"],1));
			createElement("td",{style:"text-align:right;"},newtr,uhrzeit(Now+profit[v]["dauer"],1)+"&nbsp;"+texte["uhr"]);
			createElement("td",{style:"text-align:right;"},newtr,number_format(profit[v]["punkte"],0));
			createElement("td",{style:"text-align:right;",title:kT_format(gut[id[profit[v]["name"]]]).replace("&nbsp;"," ")},newtr,kT_formatgr(profit[v]["gut"]));
			createElement("td",{style:"padding-right:20px;text-align:right;",title:kT_format(gutBeob[id[profit[v]["name"]]]).replace("&nbsp;"," ")},newtr,kT_formatgr(profit[v]["gutBeob"]));
		}
	}
	buildProfitTable("gut",2);
}

}

//***********************************************************************************************************

function do_blende(){
canddiv = all.getElementsByTagName("div");
if (top.document.getElementById("transp")) {
	top.document.getElementById("transp").style.display="block";
	canddiv[0].addEventListener("click",function(){
		if ((top.document.getElementById("innermaincontainer").style.display!="block") &&
			(top.document.getElementById("gardenmaincontainer").style.display!="block") &&
			(top.document.getElementById("cart").style.display!="block")) top.document.getElementById("transp").style.display="none";
	},false);
}
}

//***********************************************************************************************************

function do_login(){
var accountzahl=10;
var loc = reg2.exec(document.location);
if (loc[1]=="www." || loc[1]==""){
if (loc[2].search("login")==-1) {
	//auf login-seite leiten
	window.setTimeout(function(){document.location="http://www"+gamepage+"/login.php?start=1&ref=&wid=";},1000);
} else {
var valAutoLogin = GM_getValue("myFreeFarm_valAutoLogin");
var Now=Math.round((new Date()).getTime()/1000);
var keydologin = /dologin=(\d*)/;

var logindata = new Array();
var servers = new Array();
try{ var help = GM_getValue("myFreeFarm_logindata").split("|");
	var c=0;
	for (var v=0;v<accountzahl;v++) {
		try{ logindata[v] = help[v].split("~");
			if (logindata[v][1]!="0") {c++;servers[logindata[v][1]]=v;}
		} catch(err) { 
			logindata[v]=new Array();
			logindata[v][0]=lng;
			logindata[v][1]="0";
			logindata[v][2]="";
			logindata[v][3]="";
		}
	}
} catch(err) {
	for (var v=0;v<accountzahl;v++){ 
		logindata[v]=new Array();
		logindata[v][0]=lng;
		logindata[v][1]="0";
		logindata[v][2]="";
		logindata[v][3]="";
	}
}

var gamepages = new Object();
gamepages["de"] = "http://www.myfreefarm.de";
gamepages["nl"] = "http://www.myfreefarm.nl";
gamepages["pl"] = "http://www.wolnifarmerzy.pl";
gamepages["co.uk"] = "http://www.myfreefarm.co.uk";
gamepages["hu"] = "enkicsitanyam.hu";
 
$("login_container").getElementsByTagName("input")[2].addEventListener("click",function(){
	currServer = $("login_container").getElementsByTagName("select")[0].value;
	currUser = $("login_container").getElementsByTagName("input")[0].value;
	GM_setValue(lng+"_"+currServer+"_myFreeFarm_username",currUser);
},false);
 
currDoLogin = keydologin.exec(document.location);
if (currDoLogin){
	$("login_container").getElementsByTagName("select")[0].value=logindata[currDoLogin[1]][1];
	$("login_container").getElementsByTagName("input")[0].value=logindata[currDoLogin[1]][2];
	$("login_container").getElementsByTagName("input")[1].value=logindata[currDoLogin[1]][3];
	$("login_container").getElementsByTagName("input")[2].click();
} else {
	newdiv=createElement("div",{style:"position:relative;top:-400px;left:300px;"},$("login_container"));
	for (var v=0;v<accountzahl;v++) if (logindata[v][1]!="0") {
		newbutton=createElement("button",{type:"button",class:"link",id:"autologin"+v,style:"width:200px;height:20px;margin:3px;"},newdiv,texte["server"]+" "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
		newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
		newbutton.addEventListener("mouseout",function(){this.style.backgroundColor="white"},false);
		newbutton.addEventListener("click",function(){
			var currLine=this.id.replace("autologin","");
			document.location = gamepages[logindata[currLine][0]]+"/login.php?start=1&ref=&wid=&dologin="+currLine;
		},false);
	}

	//Autologin
	var lastbusy = parseInt(GM_getValue("myFreeFarm_loginbusy"),10);
	if (isNaN(lastbusy) || Now<lastbusy) { lastbusy = 0; }
	if (valAutoLogin && (Now-lastbusy>15)){
		GM_setValue("myFreeFarm_loginbusy",Now);
		if (c==1) {
			//Soloaccount
			for (var v=0;v<accountzahl;v++) if (logindata[v][1]!="0") { document.location = gamepages[logindata[v][0]]+"/login.php?start=1&ref=&wid=&dologin="+v; }
		} else {
			//Multiaccount
			createElement("div",{id:"divInfo",style:"position:absolute;top:190px;left:455px;height:200px;width:280px;background-color:#842;border:4px solid black;z-index:99;"},$("main_container"));
			$("divInfo").innerHTML = "<h1>"+texte["autologin1"]+"</h1>";

			for (var v in servers) {
				GM_setValue(lng+"_"+v+"_myFreeFarm_sessionlost","true");
			}
			window.setTimeout(function(){
				var c = -1;
				for (var v in servers) {
					if (GM_getValue(lng+"_"+v+"_myFreeFarm_sessionlost")=="true") {
						if (c==-1) {c=servers[v];}
						else {window.open(gamepages[logindata[servers[v]][0]]+"/login.php?start=1&ref=&wid=&dologin="+servers[v]);}
					}
				}
				GM_setValue("myFreeFarm_loginbusy","false");
				if (c==-1) {
					//window.close(); <-- funzt nicht :(
					$("divInfo").innerHTML = "<h1>"+texte["autologin2"]+"</h1>";
					window.setTimeout(function(){document.location=document.location},5000);
				} else { document.location = gamepages[logindata[c][0]]+"/login.php?start=1&ref=&wid=&dologin="+c; }
			},5000);
		}
	}
}
}
}}

//***********************************************************************************************************

function buildStatistik(mode){
	getData();
	$("divStatistik").innerHTML = "";
	
	newtable = createElement("table",{style:"border: 2px solid black;background-color:#ccf;"},$("divStatistik"));
	newtablehead = createElement("thead","",newtable);
	newtablebody = createElement("tbody",{style:"height:"+(window.innerHeight-70)+"px;overflow-y:auto;overflow-x:hidden;"},newtable);
	newtr = createElement("tr","",newtablehead);
	newtd = createElement("td",{colspan:"3",style:"border-bottom: 2px solid black;"},newtr);
	
	newselect = createElement("select",{class:"link2"},newtd);
	createElement("option",{value:"24"},newselect,"1 Tag");
	createElement("option",{value:"72"},newselect,"3 Tage");
	createElement("option",{value:"120"},newselect,"5 Tage");
	createElement("option",{value:"168"},newselect,"7 Tage");
	time = GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikTime");
	if (isNaN(time)) time=120;
	newselect.value = time;
	newselect.addEventListener("change",function(){
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikTime",this.value);
		buildStatistik(mode);
	},false);

	if (!!GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikNpc")) {valStatistikNpc = 1;}
	else { valStatistikNpc = 0; }
	newinput=createElement("input",{type:"checkbox",checked:valStatistikNpc},newtd);
	newinput.addEventListener("click",function(){
		GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_valStatistikNpc",this.checked);
		buildStatistik(mode);
	},false);
	createElement("span",{style:"margin-right:20px"},newtd,"NPC");

	newbutton = createElement("button",{type:"button",class:"link2",style:"width:120px"},newtd,"Coins");
	newbutton.addEventListener("click",function(){buildStatistik("c");},false);
	if (mode=="c") { newbutton.style.backgroundColor="#cc9" }
	else {
		newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newbutton.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
	}
	newbutton = createElement("button",{type:"button",class:"link2",style:"width:120px"},newtd,"Obst und Gem"+ue+"se");
	newbutton.addEventListener("click",function(){buildStatistik("v");},false);
	if (mode=="v") { newbutton.style.backgroundColor="#cc9" }
	else {
		newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newbutton.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
	}
	newbutton = createElement("button",{type:"button",class:"link2",style:"width:120px"},newtd,"Tierische Produkte");
	newbutton.addEventListener("click",function(){buildStatistik("e");},false);
	if (mode=="e") { newbutton.style.backgroundColor="#cc9" }
	else {
		newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newbutton.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
	}
	newbutton = createElement("button",{type:"button",class:"link2",style:"width:120px"},newtd,"Ziergegenst"+ae+"nde");
	newbutton.addEventListener("click",function(){buildStatistik("z");},false);
	if (mode=="z") { newbutton.style.backgroundColor="#cc9" }
	else {
		newbutton.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
		newbutton.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);
	}

	newtr = createElement("tr","",newtablebody);
	newtd = createElement("td",{colspan:"3"},newtr);
	if (mode!="") {
		if (isNaN(mode)) {
			for (var v in name) {
				if ((typ[v]==mode) && (!block[v])) {
					newdiv = createElement("div",{id:"stat"+v,class:"link",style:"position:relative;float:left;height:210px;margin:5px;"},newtd);
					createElement("div",{style:"font-weight:bold"},newdiv,name[v]+", "+number_format(bestand[v],0)+", "+kT_format(gut[v])+", "+kT_format(gutBeob[v]));
					var url = "http://www.mff.i24.cc/chart.php?w=400&h=200&t=h"+time+"&shownpc="+valStatistikNpc+"&clip=1&server1="+server+"&product1="+v+"&color1=green";
					newobject = createElement("object",{data:url,type:type="image/svg+xml",width:"400px",height:"200px"},newdiv);
					createElement("param",{name:"src",value:url},newobject);
					createElement("div",{class:"v"+v,style:"position:absolute;top:170px;left:10px;z-index:2"},newdiv);
					newdiv.addEventListener("click",function(){
						//buildStatistik(this.id.replace("stat",""));
						newdiv = createElement("div",{style:"position:absolute;top:0px;left:0px;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;background-color:white;color:black;z-index:99;"},all,"Lade...");
						var url = "http://www.mff.i24.cc/chart.php?w="+window.innerWidth+"&h="+window.innerHeight+"&t=h"+time+"&shownpc="+valStatistikNpc+"&clip=1&server1="+server+"&product1="+this.id.replace("stat","")+"&color1=green";
						newobject = createElement("object",{data:url,type:type="image/svg+xml",style:"position:absolute;top:0px;left:0px;",width:window.innerWidth+"px",height:window.innerHeight+"px"},newdiv);
						createElement("param",{name:"src",value:url},newobject);
						newimg = createElement("img",{src:"http://dqt9wzym747n.cloudfront.net/pics/close.jpg",class:"link",style:"position:absolute;top:30px;right:10px;z-index:2;"},newdiv);
						newimg.addEventListener("click",function(){removeElement(this.parentNode);},false);
					},false);
					
				}
			}
		} else {
			newdiv = createElement("div",{style:"margin:5px;"},newtd);
			createElement("div",{style:"font-weight:bold"},newdiv,name[mode]+", "+number_format(bestand[mode],0)+", "+kT_format(gut[mode])+", "+kT_format(gutBeob[mode]));
			var breit = (window.innerWidth-60);
			var hoch = (window.innerHeight-130);
			var url = "http://www.mff.i24.cc/chart.php?w="+breit+"&h="+hoch+"&t=h"+time+"&shownpc="+valStatistikNpc+"&clip=1&server1="+server+"&product1="+mode+"&color1=green";
			newobject = createElement("object",{data:url,type:type="image/svg+xml",width:breit+"px",height:hoch+"px"},newdiv);
			createElement("param",{name:"src",value:url},newobject);
			createElement("div",{class:"v"+mode,style:"position:relative;top:-40px;left:10px;z-index:2"},newdiv);
		}
	}
}

//***********************************************************************************************************

function sendStatData () {
var minBeob = new Array();
var maxBeob = new Array();
var prodStr = "";

try{ help = GM_getValue(lng+"_"+server+"_myFreeFarm_minBeob").split("|");
	for (var v=0;v<help.length;v++) minBeob[v] = parseFloat(help[v],10);
} catch(err){}
try{ help = GM_getValue(lng+"_"+server+"_myFreeFarm_maxBeob").split("|");
	for (var v=0;v<help.length;v++) maxBeob[v] = parseFloat(help[v],10);
} catch(err){}
try{ help = GM_getValue(lng+"_"+server+"_myFreeFarm_gutBeob").split("|");
	for (var v=0;v<help.length;v++) gutBeob[v] = parseFloat(help[v],10);
} catch(err){}

var c=0;
for (var v=0;v<minBeob.length;v++){
	if ((minBeob[v]<=gutBeob[v]) && (gutBeob[v]<=maxBeob[v])) {
		prodStr += ',\"product'+(++c)+'\":{\"product_id\":'+v+',\"avg_price\":'+gutBeob[v]+',\"min_price\":'+minBeob[v]+',\"max_price\":'+maxBeob[v]+'}';
	}
}

if (prodStr) {
	//GM_log("sendStatData sendinng: " + 'json={\"server\":'+server+',\"productcount\":'+c+prodStr+'}')
	GM_xmlhttpRequest({
	method: "POST",
	url: "http://www.mff.i24.cc/add.php",
	data: 'json={\"server\":'+server+',\"productcount\":'+c+prodStr+'}',
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	onload: function(response) {
		GM_log("sendStatData: "+response.responseText);
	}
	});
}


GM_setValue(lng+"_"+server+"_myFreeFarm_minBeob","");
GM_setValue(lng+"_"+server+"_myFreeFarm_maxBeob","");		
}

//***********************************************************************************************************

if (document.location.href.search("myfreefarm.de")!=-1) {
	var lng = "de";
	var gamepage = ".myfreefarm.de";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.de\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.de\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
}
if (document.location.href.search("myfreefarm.nl")!=-1) {
	var lng = "nl";
	var gamepage = ".myfreefarm.nl";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.nl\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.nl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
}
if (document.location.href.search("wolnifarmerzy.pl")!=-1) {
	var lng = "pl";
	var gamepage = ".wolnifarmerzy.pl";
	var reg = /http:\/\/s(.*?)\.wolnifarmerzy\.pl\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)wolnifarmerzy\.pl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
}
if (document.location.href.search("myfreefarm.co.uk")!=-1) {
	var lng = "co.uk";
	var gamepage = ".myfreefarm.co.uk";
	var reg = /http:\/\/s(.*?)\.myfreefarm\.co\.uk\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.co\.uk\/(.*)/i;
	var delimThou = ",";
	var regDelimThou = /,/g;
	var delimDeci = ".";
}
if (document.location.href.search("enkicsitanyam.hu")!=-1) {
	var lng = "hu";
	var gamepage = ".enkicsitanyam.hu";
	var reg = /http:\/\/s(.*?)\.enkicsitanyam\.hu\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)enkicsitanyam\.hu\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var delimDeci = ",";
}
loadLanguage(lng);

//*************************************************+
// CACHE- FIX
try{GM_setValue("myFreeFarm_logindata",GM_getValue("myFreeFarm_logindata").replace(/\^/g,"~"))}catch(err){}
//*************************************************+

var loc = reg.exec(document.location);
if(loc){
var server = loc[1];
var page = loc[2];
var pageZusatz = loc[3];
all  = document.getElementsByTagName("body")[0];
candtable = document.getElementsByTagName("table");
var nie = 9999999999;
var produkteUrl = "http://dqt9wzym747n.cloudfront.net/pics/maps/etikett_map.5.png";
var scriptUrl = "http://userscripts.org/scripts/show/66964";
var msgPicUrl = "http://dqt9wzym747n.cloudfront.net/pics/guild/mail.gif";
var statPicUrl = "http://dqt9wzym747n.cloudfront.net/pics/stadt/stats_sf_black.gif";
var vertragPicUrl = "http://dqt9wzym747n.cloudfront.net/pics/guild/contract.gif";
var keyinteger = /(\d+)/;
var keyinteger2 = /'(\d+)'/;
var keyfloat = /(\d+\.\d+)/;
//Auge:http://dqt9wzym747n.cloudfront.net/pics/stadt/stats_sf.gif

var username = GM_getValue(lng+"_"+server+"_myFreeFarm_username");

//*************************************************+
// CACHE- FIX
try{
	save = GM_getValue(lng+"_"+server+"_myFreeFarm_gut");
	if (save.search(/\^/)!=-1) {
		try{ var arr = save.split("|");
			for (var v=0;v<arr.length;v++){
				help = arr[v].split(/\^/);
				gut[parseInt(help[0],10)] = parseFloat(help[1]);
			}
		} catch(err) {}
		GM_setValue(lng+"_"+server+"_myFreeFarm_gut",gut.join("|"));
	}
	if (GM_getValue(lng+"_"+server+"_myFreeFarm_gutBeob").search(/\^/)!=-1) GM_setValue(lng+"_"+server+"_myFreeFarm_gutBeob","");
} catch(err) {}
//alert(GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_nachrichten_doread"));

for (var v=1;v<19;v++) {
	try{ GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+v,GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_zoneErnte_"+v).replace(/\^/g,"~")) } 
	catch(err){}
}

try{ GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_levelLog",GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_levelLog").replace(/\^/g,"~"));}catch(err){}
try{ GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_kauf",GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_kauf").replace(/\^/g,"~"));}catch(err){}
try{ GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn",GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeIn").replace(/\^/g,"~"));}catch(err){}
try{ GM_setValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut",GM_getValue(lng+"_"+server+"_"+username+"_myFreeFarm_vertraegeOut").replace(/\^/g,"~"));}catch(err){}

//*************************************************+

switch (page) {
	case "stadt/markt":			do_markt();break;
	case "stadt/marktstand":	do_marktstand();break;
	case "stadt/stats":			do_stats();break;
	case "stadt/wettbewerb":	do_wettbewerb();break;
	case "main":				do_main();break;
	case "nachrichten/read":	do_blende();do_nachrichten_read();break;
	case "nachrichten/new":		do_blende();do_nachrichten_new();break;
	case "nachrichten/inbox":	do_blende();do_nachrichten_inbox();break;
	case "nachrichten/outbox":	do_blende();do_nachrichten_outbox();break;
	case "nachrichten/contact":	do_blende();do_nachrichten_contact();break;
	case "nachrichten/system":	do_blende();do_nachrichten_system();break;
	case "vertraege/new":		do_blende();do_vertraege_head();do_vertraege_new();break;
	case "vertraege/overview":	do_blende();do_vertraege_head();do_vertraege_overview();break;
	case "vertraege/show":		do_blende();do_vertraege_head();do_vertraege_show();break;
	case "nutzer/profil":		do_blende();break;
	case "nutzer/usecoins":		do_blende();break;
	case "payment":				do_blende();break;
	case "hilfe":				do_blende();do_hilfe();break;
}
} else do_login();

},false);
