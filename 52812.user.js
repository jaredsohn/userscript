// ==UserScript==
// @name          Nachtbonus bei Angriffsbestaetigung hervorgehoben
// @include       http://de*.die-staemme.de/game.php?*screen=place*try=confirm*
// ==/UserScript==

// version = 1.0

// (c) by C1B1SE

var td = findByInner(document,'Ankunft:')[0].nextSibling;
if(td.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.firstChild.firstChild)
  {
  var time = td.firstChild.data.match(/(\d{1,2}\:\d{1,2})/g)[0].split(':');
  if( parseInt(time[0]) < 8 || (parseInt(time[0]) == 8 && parseInt(time[1]) == 0) )
    {
    td.setAttribute('style','white-space: nowrap; border: red 1px solid');
    var text = document.createElement('span');
    text.setAttribute('style','font-weight:bolder; color:darkred; ');
    text.appendChild(document.createTextNode(' <- Nachtbonus!'));
    td.appendChild(text);
    }
  }

function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }