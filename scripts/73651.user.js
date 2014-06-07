// ==UserScript==
// @name           Ladnok - Walki
// @author         Svira
// @version        0.2 - 06.04 2010
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://w1.ladnok.pl/*
// @include        http://w2.ladnok.pl/*
// @include        http://www.ladnok-pl.pl/*
// @description    Skrypt zajmuje sie Auto Fight
// @description    Do gry ladnok 
// ==/UserScript==


// Anzugreifender Gegner
var GegnerFerono = "bossdevil"; 
var GegnerThur   = "konan barbarzynca";
var GegnerVenja  = "Running Wild";
var LastEmperorW1  = "Running Wild";
var LastEmperorW2  = "";


//////////////////////////////////////
// Ab hier bitte nichts mehr ändern //
//////////////////////////////////////

// Wähle Gegner
function SelectGegner(gegner) {
  if (gegner.indexOf(";") != -1)
  {
    var GegnerArray = gegner.split(";");
    //length - 1 da array 0-basierend
    var gegnerArrayPos = Randomize(0, GegnerArray.length -1);
    return GegnerArray[gegnerArrayPos];
  } else {
    return gegner;
  }
}

// Zeitrandomisierungsfunktion
function Randomize( from, to) {
  // Zeitrückgabe .. in Millisekunden
  return( from + parseInt( Math.random() * (to - from + 1)));
}

// Weiterleitung auf die nächste Seite
function SeitenRedirect(redir_to) {
  window.setTimeout('window.location.pathname = "' + redir_to + '"', Randomize(1000,5000));
}

// Weiterleiten auf die Gegenersuche, wenn ladnoksweiterleitung nicht funktioniert oder stecken bleibt
function KampfRedirect(time) {
  window.setTimeout('window.location.pathname = "/fights/start"',time);
}

// Differenzieren bei result
if(window.location.pathname.split("/")[2] == "results") {
  var pathname = "/fights/results";
} else {
  var pathname = window.location.pathname;
}

// Unterschiedliche Handlungen bei unterschiedlichen Seiten 
switch(pathname) {
  case "/fights/start":
    //alert ("Hier Suche ich den Gegner");
    var Gegner = document.getElementsByName("data[Character][name]")[0].value;
    if(Gegner!="") {
        // Ziel gegner auslesen
        var gegnerZiel = document.getElementsByName("data[Character][name]")[0].value;
        // Schleife ueber ergebnisliste
        for(var x = 0;x<35;x++) {
          var gegnerName = document.getElementById("search").getElementsByTagName("a")[x].innerHTML;
          if(gegnerZiel==gegnerName) {
            // nur wenn der Zielgegen dem Eintrag entspricht angreifen!
            x++;      
            var Gegnerlink = document.getElementById("search").getElementsByTagName("a")[x].pathname;
            SeitenRedirect(Gegnerlink);
          }         
          x++;
        } 
    } else {   
      switch(document.location.hostname) {
        case "www.ladnok-pl.pl":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerThur) ;
          break;
        case "w1.ladnok.pl":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerFerono);
          break;
        case "w2.ladnok.pl":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerVenja) ;
          break;
        case "www.lastemperor.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(LastEmperorW1) ; 
          break;
        case "w2.last-emperor.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(LastEmperorW2) ; 
          break;
      } 
      if(document.getElementsByName("data[Character][name]")[0].value!="") {
        window.setTimeout('document.getElementsByTagName("form")[1].submit()',Randomize(3000,5000));
      } 
    }
    break;
  // Seite: Character Gefunden
  case "/fights/searchCharacter":
    SeitenRedirect(document.getElementsByTagName("a")[1].pathname);
    break;
  // Seite des Kampfes
  case "/fights/fight":
    SeitenRedirect(document.getElementById("fighttostats").innerHTML.split('"')[1]);
    break;
  // Seite des Ergebnisses
  case "/fights/results":  
    SeitenRedirect("/fights/start");
    break;
  // Seite auf nächsten Kampf warten
  case "/fights/waitFight":
    //start_timer('remaining', 200, 'location.href = "/fights/start";', 0, 1);
    // Quelltext einlesen in dem 'Wartezeit zum Kampf steht ..'
    var dsrc = document.getElementById("wrapper").innerHTML;
    // String 'remaining' suchen, position bestimmen, "," nach der Wartezeit (in sek) suchen,
    // auslesen, und auf die Seite /fights/start weiterleiten, + 2 sek, sobald die Wartezeit vorbei ist
    // Diese Routine dient lediglich dazu, sollte mal das weiterleiten seitens ladnok.pl stecken, was vorkommen kann.
    var posStart = dsrc.indexOf("'remaining'") + 13;
    var posEnd = dsrc.indexOf(",",posStart)
    var tmleft = dsrc.substr(posStart, posEnd - posStart);
    tmleft = parseInt(tmleft) * 1000 + 2000;
    KampfRedirect(tmleft);
    break;
}