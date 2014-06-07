// ==UserScript==
// @name       LPF: Höhe von Signaturen festlegen
// @namespace  LPF
// @version    0.1.1
// @copyright  2012, DerET
// @include    *letsplayforum.de/index.php?page=Thread*
// ==/UserScript==

//----------------------------------------------------------------------------\\
//                           Einstellungen auslesen                           \\
//----------------------------------------------------------------------------\\
// Gespeicherte Höhe auslesen
var hoehe = GM_getValue('hoehe', null);
if (!hoehe) {
  alert('Es konnte kein Wert für die Höhe gefunden werden! Der Wert wurde auf 200 Pixel gesetzt.');
  GM_setValue('hoehe', 200);
  hoehe = 200;
}


//----------------------------------------------------------------------------\\
//                         CSS Eigenschaften einfügen                         \\
//----------------------------------------------------------------------------\\
// Element anlegen
var cssel = document.createElement('style');
cssel.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(cssel);

// Höhe definieren
function hoehecss() {
  var regeln = document.createTextNode('.signature { max-height: ' + hoehe + 'px !important; overflow-y: hidden !important; }');
  
  if (cssel.styleSheet) {
    cssel.styleSheet.cssText = regeln.nodeValue;
  }
  else {
    cssel.appendChild(regeln);
  }
}

//Funktion für erste Verwendung anstoßen
hoehecss();


//----------------------------------------------------------------------------\\
//                           Elemente der Optionen                            \\
//----------------------------------------------------------------------------\\
// Hintergrund abdunkeln
var schwarz = document.createElement('div');
schwarz.style.width = '100%';
schwarz.style.height = '100%';
schwarz.style.position = 'fixed';
schwarz.style.top = '0px';
schwarz.style.left = '0px';
schwarz.style.zIndex = '9998';
schwarz.style.backgroundColor = 'rgba(30, 30, 30, 0.7)';
  
// Optionsfenster anzeigen
var fenster = document.createElement('div');
fenster.style.width = '300px';
fenster.style.height = '100px';
fenster.style.position = 'fixed';
fenster.style.top = '50%';
fenster.style.left = '50%';
fenster.style.textAlign = 'center';
fenster.style.margin = '-50px 0px 0px -150px';
fenster.style.padding = '20px 0px 0px 0px';
fenster.style.backgroundColor = '#ffffff';
fenster.style.borderRadius = '5px';
fenster.innerHTML = 'Maximale Höhe der Signaturen in Pixeln:';
schwarz.appendChild(fenster);

// Zeilenumbruch
fenster.appendChild(document.createElement('br'));
  
// Input-Feld
var input = document.createElement('input');
input.type = 'text';
input.style.width = '250px';
input.style.textAlign = 'center';
input.style.marginBottom = '7px';
fenster.appendChild(input);

// Zeilenumbruch
fenster.appendChild(document.createElement('br'));

// Bestätigen-Button
var bbutton = document.createElement('button');
bbutton.innerHTML = 'Bestätigen';
bbutton.onclick = obestaetige;
fenster.appendChild(bbutton);

// Schließen-Button
var sbutton = document.createElement('button');
sbutton.innerHTML = 'Schließen';
sbutton.onclick = overstecke;
fenster.appendChild(sbutton);


//----------------------------------------------------------------------------\\
//                          Funktionen der Optionen                           \\
//----------------------------------------------------------------------------\\
// Dunkle Hintergrund ab und zeige Optionen
function ozeige() {
  document.getElementsByTagName('body')[0].appendChild(schwarz);
  input.value = hoehe;
}

// Verstecke Optionen
function overstecke() {
  schwarz.parentNode.removeChild(schwarz);
}

// Bestätige gewählte Optionen
function obestaetige() {
  hoehe = input.value;
  GM_setValue('hoehe', hoehe);
  
  hoehecss();
}


//----------------------------------------------------------------------------\\
//                  Link zu den Optionen im Footer einfügen                   \\
//----------------------------------------------------------------------------\\
// Listenelement erzeugen
var listel = document.createElement('li');
document.getElementById('footerOptions').getElementsByTagName('ul')[0].insertBefore(listel, document.getElementById('footerOptions').getElementsByTagName('li')[0]);

// Link zum Aufruf der Optionen einfügen
var optionslink = document.createElement('a');
optionslink.onclick = ozeige;
optionslink.innerHTML = 'Signatur Optionen';
listel.appendChild(optionslink);