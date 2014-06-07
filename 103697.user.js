// ==UserScript==
// @name           spritmonitor meine tankstellen
// @namespace      spritmonitor
// @include        http://www.spritmonitor.de/de/betankungen/*/hinzufuegen.html
// ==/UserScript==


var formular = document.getElementById('fueling');

var savebutton1 = document.getElementById('save');
var savebutton2 = document.getElementById('nextfueling');

savebutton1.style.marginTop = "20px";


var meineUeberschrift = document.createElement('h3');
meineUeberschrift.textContent = "Meine Tankstellen";

var link0 = document.createElement('a');
link0.textContent = 'AGIP Wiesing';
link0.style.display = "block";
link0.style.cursor = "pointer";
link0.onclick = function(){
  document.getElementById('station-company').selectedIndex = 1;
  document.getElementById('station-country').selectedIndex = 1;
  document.getElementById('station-area').selectedIndex = 65;
  document.getElementById('station-location').value = 'Wiesing';
};

var link1 = document.createElement('a');
link1.textContent = 'AVIA Jenbach';
link1.style.display = "block";
link1.style.cursor = "pointer";
link1.onclick = function(){
  document.getElementById('station-company').selectedIndex = 6;
  document.getElementById('station-country').selectedIndex = 1;
  document.getElementById('station-area').selectedIndex = 65;
  document.getElementById('station-location').value = 'Jenbach';
};

var link2 = document.createElement('a');
link2.textContent = 'AVIA Strass';
link2.style.display = "block";
link2.style.cursor = "pointer";
link2.onclick = function(){
  document.getElementById('station-company').selectedIndex = 6;
  document.getElementById('station-country').selectedIndex = 1;
  document.getElementById('station-area').selectedIndex = 65;
  document.getElementById('station-location').value = 'Strass';
};

var link3 = document.createElement('a');
link3.textContent = 'JET Schwaz';
link3.style.display = "block";
link3.style.cursor = "pointer";
link3.onclick = function(){
  document.getElementById('station-company').selectedIndex = 20;
  document.getElementById('station-country').selectedIndex = 1;
  document.getElementById('station-area').selectedIndex = 65;
  document.getElementById('station-location').value = 'Schwaz';
};

var link4 = document.createElement('a');
link4.textContent = 'JET Maurach';
link4.style.display = "block";
link4.style.cursor = "pointer";
link4.onclick = function(){
  document.getElementById('station-company').selectedIndex = 20;
  document.getElementById('station-country').selectedIndex = 1;
  document.getElementById('station-area').selectedIndex = 65;
  document.getElementById('station-location').value = 'Maurach a. Achensee';
};



formular.removeChild(savebutton1);
formular.removeChild(savebutton2);

formular.appendChild(meineUeberschrift);

formular.appendChild(link0);
formular.appendChild(link1);
formular.appendChild(link2);
formular.appendChild(link3);
formular.appendChild(link4);

formular.appendChild(savebutton1);
formular.appendChild(savebutton2);