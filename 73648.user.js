// ==UserScript==
// @name           Ladnok - Praca
// @author         Svira
// @version        0.1 = (06.04.2010)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://w1.ladnok.pl/*
// @include        http://w2.ladnok.pl/*
// @include        http://w2.ladnok.pl/characters/index/*
// @include        http://www.ladnok-pl.pl/*
// @description    Skrypt ulatwia gre ;)
// @description    Nie jest legalny
// ==/UserScript==

// Server
servFere = "10";    // 10 = 10 h Dienst, "" deaktiviert die Ausführung
servFerT = "gold";  // gold = Dienst für Gold, ep = Dienst für Ehrepunkte
servThur = "1";
servThuT = "gold";
servVenj = "10";
servVenT = "gold"; 

//////////////////////////////////////
// Ab hier bitte nichts mehr ändern //
//////////////////////////////////////

// Server ermitteln, dann Dauer und Typ des Dienstes in eine globale Variable einlesen
switch(document.location.hostname) {
  case "www.ladnok-pl.pl":
    var dauer = servThur;
    var typ   = servThuT;
    break;
  case "w1.ladnok.pl":
    var dauer = servFere;
    var typ   = servFerT;
    break;
  case "w2.ladnok.pl":
    var dauer = servVenj;
    var typ   = servVenT;
    break;
}

// Parameter prüfen, ep oder Gold, Dauer auf ihre numerische Gültigkeit
if(typ!="ep" && typ!="gold") typ = "";
if(dauer<1 && dauer>10) dauer = 1;

// Aktueller Seite erörtern
var pathname = window.location.pathname;
switch(pathname) {
    case "/services/index":
        // Service Startseite, automatisches weiterleiten auf die Dienstart-Seite      
        window.setTimeout("window.location.pathname = '/services/index/"+typ+"'",1000);
        break;
    case "/services/index/gold":
        // Service für Gold, Dauer übernehmen und weiter gehts
        document.getElementById('serviceGold').innerHTML = "<b>etwas Gold, aber es wird dauern</b>";
        document.getElementById('valueInput').value = dauer;
        document.getElementsByTagName("form")[0].submit();
        break;
    case "/services/index/ep":
        // Service für Ehre, Dauer übernehmen und weiter gehts
        document.getElementById('serviceEP').innerHTML = "<b>etwas Ehre, aberes wird dauern</b>";
        document.getElementById('valueInput').value = dauer;
        document.getElementsByTagName("form")[0].submit();
        break;
    case "/services/serve":
        // Reload der Seite im Intervall von 20 min, da die Session Cookies lediglich 20 min gültig sind
        window.setTimeout(
          function() {
            window.location.pathname = '/services/finish';  
          }        
        , 1200000);
        break;
    case "/services/finish":
        // Automatisches Weiterleiten zur Bank am Ende des Dienstes
        window.setTimeout("window.location.pathname = '/bank/deposit'",1000);
        break;
    case "/bank/deposit":
        // Sämtliches Gold sofort einzahlen
        document.getElementsByTagName("form")[0].submit();
        break;
    case "/bank/index":
        // Eingezahlt ist, nun gehts wieder zum Dienst ;)
        window.setTimeout("window.location.pathname = '/services/index'",1000);
        break;
    case "/tournament/index":
        // Redirect nach 10 min (wegen dieser Tournierfunktion)
        windows.setTimeout("window.location.pathname = '/services/index'",600000);
        break;
    case "/wartung/":
        // Redirect nach 10 min bei Wartungsarbeiten
        windows.setTimeout("window.location.pathname = '/services/index'",600000);
        break;
}