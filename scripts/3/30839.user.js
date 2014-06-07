// ==UserScript==
// @name          Travian Statistic Links
// @version       1.4
// @namespace     http://travian.de
// @description   Inserts links to travian.ws, travian.ping-timeout.de and travmap.shishnet.org
// @author        Toxon 
/////////////////////////////////////////////////////////////////////////////
// @include http://*.travian*.*
// @include http://*.travian*.*/*
// @exclude *.css
// @exclude *.js
// @exclude http://*.travian.*/plus*
// @exclude http://travian.*/plus*
/////////////////////////////////////////////////////////////////////////////
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////
// Functions // Common
///////////////////////////////////////////////////////////////////////////////

function contains(a, b) {
// liefert true, wenn b in a enthalten ist
// a und b koennen vom typ string sein, dann wird true geliefert, wenn b ein Teilstring von a ist
// falls a ein Array ist, wird true geliefert, wenn b ein Element von a ist
  switch (typeof(a)) {
    case 'string':  return (a.indexOf(b) != - 1);  break;
    case 'object':  for (var i in a) { if (a[i] == b) { return true; }  }  return false; break;     
    default:        return false; break;
  }
}

function splitL (s,ss) { return s.substr(0,s.indexOf(ss)) }
// liefert alles aus s, was links von ss liegt

function splitR (s,ss) { return s.substr(s.indexOf(ss)+ss.length) }
// liefert alles aus s, was rechts von ss liegt


///////////////////////////////////////////////////////////////////////////////
// Functions // Elements
///////////////////////////////////////////////////////////////////////////////

function insertElAfter(node, referenceNode) {
// node nach referenceNode einfuegen
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

///////////////////////////////////////////////////////////////////////////////
// Functions // URL
///////////////////////////////////////////////////////////////////////////////

function URLextension() {
// liefert von www.adresse.XXX -> XXX  bsp. www.google.de -> de
  var s = window.location.hostname.split('.');
  return s[s.length-1];
}

///////////////////////////////////////////////////////////////////////////////
// Functions // Travian
///////////////////////////////////////////////////////////////////////////////

function server () {
// liefert die travian server bezeichnung
  var dl = '?chatname=';
  var allAs = document.getElementsByTagName('a'); 
  for (var i = 0; (i < allAs.length); i ++ ) {
    var s = allAs[i].href;
    if (allAs[i].parentNode.className == 'menu') {
      if (contains (s,dl)) {
        return decodeURIComponent(splitL(splitR(s,dl),'|')); 
      } 
    }  
  }
}

function player () {
// liefert den spielernamen
  var p = '';
  var dl = '?chatname';
  var allAs = document.getElementsByTagName('a') 
  for (var i = 0; ((i < allAs.length) && (p == '')); i ++ ) {
    var s = allAs[i].href;
    if (contains (s,dl)) {
      p = decodeURIComponent(splitR(splitR(s,dl),'|')); 
      return p;
    } 
  }
}

///////////////////////////////////////////////////////////////////////////////
// Functions // travian.ping-timeout.de
///////////////////////////////////////////////////////////////////////////////

function ermittleWelt() {
  var tmpwelt = URLextension();
  var rest = splitL(window.location.hostname,'.travian');                             // XXX.travian
  if (tmpwelt == 'de') {
    if (contains(window.location.hostname,'speed')) { tmpwelt = 'speed'; }            // speed.travian.de
    else {tmpwelt = rest; }                                                           // weltX.travian.*
  } else {
    if (contains(window.location.hostname,'speed')) { tmpwelt = tmpwelt + 'speed'; }  // speed.travian.*
    else if (!contains(window.location.hostname,'www.travian.'))                      // www.travian.at www.travian.org
      { tmpwelt = tmpwelt + splitR(rest,'s'); }                                       // sX.travian.*
  }    
  return tmpwelt;
}

///////////////////////////////////////////////////////////////////////////////
// Images
///////////////////////////////////////////////////////////////////////////////

// travian.ping-timeout.de
img_stat = 'data:image/gif;base64,R0lGODlhDAAIAPcAAKH3f6vcmK/Znqzcmazcmq7cnLPZn7DcnrPNqrXVq7HbobjW'+
           'pb/Uq6L2gKL2gaX1g6X9gKT8ga/yja32j6j7gq75h6j4ib7unLr1k7nymLXrosDIuMTSs8XSv8rpqsLpssrxqc'+
           '/xrNTouNvwvsjMx83UxtHWz9TY09ba1Nba1tPny9bpxdzpydzo2OLyy+vy2Ony3ev03ent5urv6ezw7O/x7/D0'+
           '5fDy7/L27PP37fT37vHz8fH08fX38/b48/f59fb49vj69/j6+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAIAAAIYABJpBhIsCCJEzd4KOSxY0cNGjNMpAAipGLFHjJa'+
           'qOgwsWIQHzlgrPigIcFEID90vBgBIsMECwpQ4LARw0UIDBUoQIhwoAQLER4uSHjQAAAABwI2cGCwwECBAQGiEk'+
           'AQEAA7';
           
// travian.ws
img_twa  = 'data:image/gif;base64,R0lGODlhDAAIAPcAAGZacHRpf3VqgX1xh4N4jYR6jYV5kYt/loqAk42El4+Cm5KG'+
           'nZOLm5iRn5SJoZaMoqCZqKOarKWYsKaZs6edsaqftamlraqlr6ynsbGmurCkvbCqtrKvt7Opu7OovLWqvrevv7'+
           'q2vrq2v7qvw7y4wb+5xcC5x8K/x8fEysnHzMnC0NHO1NLQ1NfU2tnW293a4OPe5uXf6/Py8/T09Pf2+Pv7+///'+
           '/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAIAAAIUQBt2KDRggQDCCde1BAocMUGGB1UmEjggqENEiA+'+
           'ZPBQIQIGiyViUBgh4QAHFhYFKHCgYUEBiwIBBDAwYcAFmDZmhHiAgEADnDZkiEiBwoLFgAA7';
           
// travmap.shishnet.org           
img_map  = 'data:image/gif;base64,R0lGODlhDAAIAPcAACZ/AAAm//8AAMjMx9ba1v///wAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
           'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAIAAAIMAAHEBhIsKBAAQIIFFDIcCEBhAUjDlxIkQAAAA4l'+
           'WgRQsECAAA0ZEvyoUaDGgQMCAgA7';

///////////////////////////////////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////////////////////////////////

var image, newA, allA, a, welt, thisUID, thisAID;

welt = ermittleWelt();                           // Bezeichnung der Welt fuer travian.ping-timeout.de
a = 0;

allA = document.getElementsByTagName('a');       // alle Links,
while (a < allA.length) { 
  thisA = allA[a];
  if (( contains(thisA.href,'uid=')) &&          // in denen uid= vorkommt, aber...
      (!contains(thisA.href,'#'))&&              // nicht der Link mit uid=xxxx# - z.b. Anleitung
      (!contains(thisA.href,'newdid=')) &&       // nicht die Links auf Doerfer
      (thisA.parentNode.className != 'menu')){   // nicht der Menu-eintrag
    thisUID = splitR(thisA.href, 'uid=');
    if (splitL(window.location.pathname.substr(1), '.')=='spieler') { thisPlayer = player(); } else {thisPlayer = thisA.innerHTML;}
      

    newA = document.createElement('a'); 
    newA.href= 'http://travian.ping-timeout.de/index.php?m=spielersuche&uid='+thisUID+'&welt='+ welt;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_stat; 
    newA.appendChild(image);
    a += 1;

    newA = document.createElement('a'); 
    newA.href= 'http://travian.ws/analyser.pl?s='+server()+'&uid='+thisUID;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_twa; 
    newA.appendChild(image);
    a += 1;
    
    newA = document.createElement('a'); 
    newA.href= 'http://travmap.shishnet.org/map.php?server='+window.location.hostname+'&player='+thisPlayer+'&format=png&casen=on&azoom=on&caption='+thisPlayer;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_map; 
    newA.appendChild(image);
    a += 1;
    
  }

  if ( contains(thisA.href,'aid=')) {            // in denen aid= vorkommt
    thisAID = splitR(thisA.href, 'aid=');
    thisAlliance = thisA.innerHTML;
    
    newA = document.createElement('a'); 
    newA.href= 'http://travian.ping-timeout.de/index.php?m=allianzsuche&aid='+thisAID+'&welt='+ welt;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_stat; 
    newA.appendChild(image);
    a += 1;

    newA = document.createElement('a'); 
    newA.href= 'http://travian.ws/analyser.pl?s='+server()+'&aid='+thisAID;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_twa; 
    newA.appendChild(image);
    a += 1;

    newA = document.createElement('a'); 
    newA.href= 'http://travmap.shishnet.org/map.php?server='+window.location.hostname+'&alliance='+thisAlliance+'&casen=on&azoom=on&format=png&caption='+thisAlliance;
    newA.target = '_blank';
    newA.innerHTML = ' ';
    insertElAfter(newA,thisA);
    image = document.createElement('img'); 
    image.src = img_map; 
    newA.appendChild(image);
    a += 1;
  }

  a +=1;
}