// ==UserScript==
// @name           gondal.service
// @author         PP2000
// @version        0.4i (19.02.2011)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://w1.gondal.de/*
// @include        http://w2.gondal.de/*
// @include        http://w3.gondal.de/*
// @include        http://www.gondal-de.de/*
// @include        http://gondalworld.com/*
// @description    Dieses Skript ist in der Lage die Service bei Gondal vollständig zu übernehmen, insofern gewünscht.
// @description    Für eventuelle negative Folgen der Nutzung dieses Skripts übernehme ich keinerlei Verantwortung. 
// ==/UserScript==

// Server
servFerT = "gold";  // gold = Dienst für Gold, ep = Dienst für Ehrepunkte
servThuT = "gold";
servVenT = "gold"; 
servSahT = "gold";
servGwor = "10";    // Gondalworld - Die Schueler Welt ;) 
servGwoT = "gold";

//////////////////////////////////////
// Ab hier bitte nichts mehr ändern //
//////////////////////////////////////

// Server ermitteln, dann Dauer und Typ des Dienstes in eine globale Variable einlesen
switch(document.location.hostname) {
  case "www.gondal-de.de":
    var server = "Thur";
    var typ   = servThuT;
    var pupil = false;
    break;
  case "w1.gondal.de":
    var server = "Ferono"
    var typ   = servFerT;
    var pupil = false;
    break;
  case "w2.gondal.de":
    var server = "Venja";
    var typ   = servVenT;
    var pupil = false;
    break;
  case "w3.gondal.de":
    var server = "Sahscria";
    var typ   = servSahT;
    var pupil = false;
    break;
  case "gondalworld.com":
    var dauer = servGwor;
    var typ   = servGwoT;
    var pupil = true;
    break;
}

// Parameter prüfen, ep oder Gold, Dauer auf ihre numerische Gültigkeit
if(typ!="ep" && typ!="gold") typ = "gold";
if(dauer<1 && dauer>10) dauer = 1;

// Aktueller Seite erörtern
var pathname = window.location.pathname;
switch(pathname) {
    case "/services/index":
        // Service Startseite, automatisches weiterleiten auf die Dienstart-Seite      
        if(pupil==true) {
          window.setTimeout("window.location.pathname = '/services/start/"+typ+"/"+dauer+"'",1000);
        } else {
          window.setTimeout("window.location.pathname = '/services/index/"+typ+"'",1000);
        }
        break;
    case "/services/index/gold":
        if(typ=="gold") {
          window.setTimeout("window.location.pathname = '/services/start/gold'",1000);
        } else {
          window.setTimeout("window.location.pathname = '/services/start/ep'",1000);  
        }                                                                                  
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
        if(pupil==true) {
          window.setTimeout("window.location.pathname = '/services/start/"+typ+"/"+dauer+"'",1000);
        } else {
          GM_setValue(server + "_Script","gondal.service");
          window.setTimeout("window.location.pathname = '/bank/deposit'",1000);
        }
        break;
    case "/bank/deposit":
        // Sämtliches Gold sofort einzahlen
        if(pupil==true) {
          //document.getElementById('bankinform').submit();
          $('#bankinform').submit();
        } else {
          document.getElementsByTagName("form")[0].submit();
        }
        break;
    case "/bank/index":
        // Eingezahlt ist, nun gehts wieder zum Dienst ;)
        if(pupil==true) {
          //window.setTimeout("window.location.pathname = '/services/start/"+typ+"/"+dauer+"'",1000);
        } else {
          if(GM_getValue(server + "_Script")=="gondal.service") {
            GM_deleteValue(server + "_Script");
            window.setTimeout("window.location.pathname = '/services/index/"+typ+"'",1000);
          }
        }
        break;
    case "/tournament/index":
        // Redirect nach 10 min (wegen dieser Tournierfunktion)
        if(pupil==true) {
          window.setTimeout("window.location.pathname = '/services/start/"+typ+"/"+dauer+"'",1000);
        } else {
          window.setTimeout("window.location.pathname = '/services/index/"+typ+"'",60000);
        }
        break;
    case "/wartung/":
        // Redirect nach 10 min bei Wartungsarbeiten
        if(pupil==true) {
          window.setTimeout("window.location.pathname = '/services/start/"+typ+"/"+dauer+"'",1000);
        } else {
          window.setTimeout("window.location.pathname = '/services/index/"+typ+"'",60000);
        }
        break;
}

