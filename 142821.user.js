// ==UserScript==
// @name        YouTube: Abonnenten Status
// @namespace   YouTube
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

// Nicht in iFrames ausfuehren
if (window.top != window.self) return;

// Gespeicherte Werte pruefen
if (!localStorage.getItem('oldsubs')) localStorage.setItem('oldsubs', '');
if (!localStorage.getItem('lastchecked')) localStorage.setItem('lastchecked', 'Nie');

// Aktuelle Abonnenten abfragen
function getsubscribers() {
  var namearray = new Array;
  var k = 0;
  
  for (i = 0; true; i++) {
    var request = new XMLHttpRequest();
    request.open('GET', location.protocol + '//www.youtube.com/user/' + document.getElementById('masthead-user-button').getElementsByTagName('span')[5].innerHTML + '/subscribers?page=' + (i +1), false);
    request.send(null);
    
    var requestnames = request.responseText.split('<ul class="channel-summary-list subscribers-listing">')[1].split('</ul>')[0].split('<h3 class="channel-summary-title">');
    
    if (i != 0 && unescape(escape(requestnames[1]).replace('%0A%20%20%20%20%20%20%20%20%20%20', '').replace('%0A%20%20%20%20%20%20', '')).split('</h3>')[0] == namearray[0]) break;
    
    else {
      for (j = 1; j < requestnames.length; j++) {
        namearray[k] = unescape(escape(requestnames[j]).replace('%0A%20%20%20%20%20%20%20%20%20%20', '').replace('%0A%20%20%20%20%20%20', '')).split('</h3>')[0];
        k++;
      }
    }
  }
  
  return namearray;
}

// Abos finden
function nesub(cursubs, oldsubs) {
  shinfdiv.innerHTML += '<br>Seitdem als Abonnenten gewonnen:<br>';
  
  if (cursubs.length != oldsubs.length) {
    for (i = 0; i < cursubs.length; i++) {
      var sin = false;
      
      for (j = 0; j < oldsubs.length; j++) {
        if (cursubs[i] == oldsubs[j]) var sin = true;
      }
      
      if (!sin) shinfdiv.innerHTML += cursubs[i] + '<br>';
    }
  }
  
  else shinfdiv.innerHTML += 'Niemanden<br>';
}

// Deabos finden
function desub(cursubs, oldsubs) {
  shinfdiv.innerHTML += '<br>Seitdem als Abonnenten verloren:<br>';
  
  if (cursubs.length != oldsubs.length) {
    for (i = 0; i < oldsubs.length; i++) {
      var sin = false;
      
      for (j = 0; j < cursubs.length; j++) {
        if (oldsubs[i] == cursubs[j]) var sin = true;
      }
      
      if (!sin) shinfdiv.innerHTML += oldsubs[i] + '<br>';
    }
  }
  
  else shinfdiv.innerHTML += 'Niemanden<br>';
}

// Neue Abonnenten speichern
function stooldsubs(newsubs) {
  var newsubsstring = '';
  
  for (i = 0; i < newsubs.length; i++) {
    newsubsstring += newsubs[i];
    
    if (i < newsubs.length -1) newsubsstring += '<<||>>';
  }
  
  localStorage.setItem('oldsubs', newsubsstring);
}

// Abonnenten vergleichen
function compsubs() {
  shinfdiv.innerHTML = '';
  
  shbutton.setAttribute('disabled', 'disabled');
  
  var savedsubs = localStorage.getItem('oldsubs').split('<<||>>');
  
  var curresubs = getsubscribers();
  stooldsubs(curresubs);
  
  shinfdiv.innerHTML += 'Letzter Check: ' + localStorage.getItem('lastchecked') + '<br>';
  localStorage.setItem('lastchecked', new Date());
  
  nesub(curresubs, savedsubs);
  desub(curresubs, savedsubs);
  
  shinfdiv.appendChild(shshowall);
  shinfdiv.appendChild(shshowallcont);
  
  shinfdiv.style.display = 'block';
  
  shbutton.onclick = hidesubs;
  shbutton.innerHTML = unescape('Abonnenten Ver%E4nderungen ausblenden');
  shbutton.removeAttribute('disabled');
}

// Anzeige verstecken
function hidesubs() {
  shinfdiv.style.display = 'none';
  shbutton.onclick = compsubs;
  shbutton.innerHTML = unescape('Abonnenten Ver%E4nderungen anzeigen');
}

// Alle Abonnenten zeigen
function showallsubs() {
  shshowallcont.innerHTML = '';
  
  var savedsubs = localStorage.getItem('oldsubs').split('<<||>>');
  for (i = 0; i < savedsubs.length; i++) {
    shshowallcont.innerHTML += savedsubs[i];
    
    if (i < savedsubs.length -1) shshowallcont.innerHTML += '<br>';
  }
  
  shshowallcont.style.display = 'block';
  
  shshowall.innerHTML = 'Alle Abonnenten ausblenden';
  
  shshowall.onclick = hideallsubs;
}

// Alle Abonnenten ausblenden
function hideallsubs() {
  shshowallcont.style.display = 'none';
  
  shshowall.innerHTML = 'Alle Abonnenten einblenden';
  
  shshowall.onclick = showallsubs;

}

// HTML Elemente
var shcontdiv = document.createElement('div');
shcontdiv.style.width = '970px';
shcontdiv.style.margin = '5px auto 5px auto';
document.getElementById('content').insertBefore(shcontdiv, document.getElementById('content').firstChild);

var shbutton = document.createElement('button');
shbutton.innerHTML = unescape('Abonnenten Ver%E4nderungen anzeigen');
shbutton.setAttribute('class', 'yt-uix-button yt-uix-button-dark');
shbutton.onclick = compsubs;
shcontdiv.appendChild(shbutton);

var shinfdiv = document.createElement('div');
shinfdiv.style.display = 'none';
shinfdiv.style.marginTop = '5px';
shinfdiv.style.padding = '5px';
shinfdiv.style.border = '1px solid #343434';
shcontdiv.appendChild(shinfdiv);

var shshowall = document.createElement('button');
shshowall.innerHTML = 'Alle Abonnenten anzeigen';
shshowall.setAttribute('class', 'yt-uix-button yt-uix-button-dark');
shshowall.style.marginTop = '5px';
shshowall.onclick = showallsubs;

var shshowallcont = document.createElement('div');
shshowallcont.style.padding = '5px';
shshowallcont.style.marginTop = '5px';
shshowallcont.style.display = 'none';
shshowallcont.style.border = '1px solid #343434';
