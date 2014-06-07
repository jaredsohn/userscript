// ==UserScript==
// @name          DS Standard Katapultziel
// @version       1.2
// @author        Samuel Essig (http://c1b1.de)
// @namespace     c1b1.de
// @copyright     2008-2009, Samuel Essig (http://c1b1.de)
// @description   Automatisches Ziel bei der Angriffsbestätigung für den Katapult. Das Standardziel kann in der Angriffsbestätigung über die Einstellungen-Leiste unter dem Formular eingestellt werden.
// @include       http://de*.die-staemme.de/game.php?*screen=place*try=confirm*
// ==/UserScript==

/*

DS Standard Katapultziel

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

For further information on translations of scripts write me a mail:
info@c1b1.de
Or contact me via the "DS Forum" http://forum.die-staemme.de, username:
C1B1SE

Uploaded @ http://userscripts.org/scripts/show/39601


Description:
------------

Automatisches Ziel bei der Angriffsbestätigung für den Katapult.
Das Standardziel kann in der Angriffsbestätigung über die Einstellungen-Leiste unter dem Formular eingestellt werden.


History:
--------

Version 1.2:
 - Bearbeiten Icon nach dem Auswahlfeld


Version 1.1:
 - Exception entfernt, wenn kein Katapult im Angriff

*/

var buildings = {
   ' ':'none',
   'Hauptgebäude':'main',
   'Kaserne':'barracks',
   'Stall':'stable',
   'Werkstatt':'garage',
   'Adelshof':'snob',
   'Schmiede':'smith',
   'Statue':'statue',
   'Versammlungsplatz':'place',
   'Martkplatz':'market',
   'Holzfäller':'wood',
   'Lehmgrube':'stone',
   'Eisenmine':'iron',
   'Bauernhof':'farm',
   'Speicher':'storage',
   'Wall':'wall' };

var world = document.location.href.split('.').shift().split('de').pop() + '_';

var a1 = document.createElement('a');
a1.setAttribute('href', '#');
a1.addEventListener('click', settings, false);
a1.appendChild(document.createTextNode('Einstellungen'));
var a2 = document.createElement('a');
a2.setAttribute('href', '#');
a2.addEventListener('click', function() {
   alert('DS Standard Katapultziel\n\n(c) by C1B1SE 2008\n\n\tinfo@c1b1.de\n\thttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\n\nThis script may be forbidden in TribalWars or DieStämme.\nPlease look in the respective forum for further information!'); }
, false);
a2.appendChild(document.createTextNode('About Me'));

bar(a1, a2);

if(document.getElementsByName('building')[0]) {
   if(GM_getValue(world + 'cat_aim') == undefined) var aim = buildings[' '];
   else {
      var aim = GM_getValue(world + 'cat_aim');
      if(aim != 'none') {
         document.getElementsByName('building')[0].value = aim;
         }
      var img = new Image();
      img.src = 'http://www.c1b1.de/smile/dsforum/edit.gif';
      img.alt = img.title = 'Standard bearbeiten';
      img.addEventListener('click', settings, false);
      document.getElementsByName('building')[0].parentNode.insertBefore(img, document.getElementsByName('building')[0].nextSibling);
      }
   }

function settings() {
   if(document.getElementById('dialog_settings')) {
      document.getElementById('dialog_settings').parentNode.removeChild(document.getElementById('dialog_settings'));
      return;
      }
   var div = document.createElement('div');
   div.id = 'dialog_settings';
   div.style.zIndex = 21;
   div.style.position = 'absolute';
   div.style.top = '100px';
   div.style.left = '200px';
   div.style.minHeight = '50px';
   div.style.minWidth = '150px';
   div.style.background = 'url(graphic/background/main.jpg) #F1EBDD';
   div.style.border = '3px outset #804000';
   div.style.borderTopColor = '#A0A0A0';
   var content = document.createElement('table');
   var tr = document.createElement('tr');
   var th = document.createElement('th');
   th.setAttribute('colspan', 2);
   th.appendChild(document.createTextNode('Einstellungen'));
   tr.appendChild(th);
   content.appendChild(tr);
   var tr = document.createElement('tr');
   var td = document.createElement('td');
   td.appendChild(document.createTextNode('Katapultziel'));
   tr.appendChild(td);
   var select = document.createElement('select');
   select.setAttribute('size', '1');
   select.setAttribute('id', 'cat_aim');
   for(var attr in buildings) {
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(attr));
      option.setAttribute('value', buildings[attr]);
      if(aim == buildings[attr]) option.setAttribute('selected', 'selected');
      select.appendChild(option);
      }
   var td = document.createElement('td');
   td.appendChild(select);
   tr.appendChild(td);
   content.appendChild(tr);
   // Save Button
   var saveB = document.createElement('input');
   saveB.setAttribute('value', 'Übernehmen');
   saveB.setAttribute('type', 'button');
   saveB.addEventListener('click', function() {
      save_settings(); }
   , false);
   // Cancel Button
   var cancelB = document.createElement('input');
   cancelB.setAttribute('value', 'Abbrechen');
   cancelB.setAttribute('type', 'button');
   cancelB.addEventListener('click', function() {
      if(confirm('Alle ungespeicherten Änderungen gehen verloren\nWirklich abbrechen?')) {
         document.getElementById('dialog_settings').parentNode.removeChild(document.getElementById('dialog_settings')); }
      }
   , false);
   // Titlebar
   var title = document.createElement('div');
   title.id = 'dialog_statusbar';
   title.style.color = 'white';
   title.style.background = '#A0A0A0';
   title.style.zIndex = 22;
   title.style.textAlign = 'center';
   title.style.fontFamily = 'Verdana,sans-serif';
   title.appendChild(document.createTextNode('Einstellungen'));
   var img = new Image();
   img.src = 'http://www.c1b1.de/close.png';
   img.alt = 'Schließen';
   img.title = 'Schließen';
   img.style.position = 'absolute';
   img.style.left = '0px';
   img.style.top = '0px';
   img.addEventListener('click', function() {
      document.getElementById('dialog_settings').parentNode.removeChild(document.getElementById('dialog_settings')); }
   , false);
   title.appendChild(img);
   div.appendChild(title);
   div.appendChild(content);
   div.appendChild(saveB);
   div.appendChild(cancelB);
   document.getElementById('ds_body').appendChild(div);
   }

function save_settings() {
   var new_aim = document.getElementById('cat_aim').options[document.getElementById('cat_aim').selectedIndex].value;
   GM_setValue(world + 'cat_aim', new_aim);
   alert('Gespeichert!');
   document.getElementById('dialog_settings').parentNode.removeChild(document.getElementById('dialog_settings'));
   if(new_aim != 'none') {
      document.getElementsByName('building')[0].value = new_aim;
      }
   }

function bar() {
   if(document.getElementById('standardCatBar')) {
      return false };
   var div = document.createElement('div');
   div.setAttribute('id', 'standardCatBar');
   div.style.backgroundColor = 'rgb(243,237,223)';
   div.style.border = 'rgb(128,64,0) 2px solid';
   div.style.marginTop = '15px';
   div.style.padding = '5px';
   var leftfont = document.createElement('span');
   leftfont.setAttribute('style', 'float:left; ');
   for(var i = 0, len = arguments.length; len > i; i++) {
      leftfont.appendChild(arguments[i]);
      if(len - 1 != i) {
         var delimiter = document.createElement('span');
         delimiter.setAttribute('style', 'margin-left:5px; margin-right:5px; width:1px; border:1px #804000 solid; ');
         leftfont.appendChild(delimiter);
         }
      }
   div.appendChild(leftfont);
   var rightfont = document.createElement('span');
   rightfont.setAttribute('style', 'float:right; font-size:smaller; opacity:0.7; ');
   rightfont.appendChild(document.createTextNode('DS Standard Katapultziel'));
   div.appendChild(rightfont);
   var clearfont = document.createElement('div');
   clearfont.setAttribute('style', 'clear:both; ');
   div.appendChild(clearfont);
   document.getElementById('ds_body').appendChild(div);
   }