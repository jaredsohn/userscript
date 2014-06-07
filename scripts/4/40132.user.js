// ==UserScript==
// @name          DS Real Weltkartenlink(Stamm)
// @version       1.2
// @author        Samuel Essig (http://c1b1.de)
// @description   Fügt auf den Profilen von Stämmen einen Link zur Weltkarte von DS Real hinzu. Der Stamm, eigene Dörfer und der eigene Stamm werden direkt in die Karte eingetragen.
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009-2011, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/game.php?*screen=info_ally*id=*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


###################### Settings ######################

Diese Voreinstellungen können auch direkt - ingame - geändert werden
(über einen Bearbeiten-Button direkt nach dem Weltkartenlink in Stammesprofilen).

-----------------------------------------------------------------------
-- Es ist nicht mehr nötig die Einstellungen hier im Code zu ändern! --
-----------------------------------------------------------------------


*/

var zoom = 5;               // Zoom 1 - 15
var abandoned = true;       // Verlassene Dörfer an = true; Verlassene Dörfer aus = false
var tags = false;           // Stammestags an = true; Stammestags aus = false
var grid = true;            // Kontinentgrenzen an = true; Kontinentgrenzen aus = false
var own = 'C1B1SE';         // Eigener Name
var ownAlly = 'KuHa';       // Eigenes Stammestag

// ###################################################

const version = '1.1';

var world = document.location.href.split('.').shift().split('http://').pop();

zoom = GM_getValue(world+'_zoom',zoom);
abandoned = GM_getValue(world+'_abandoned',abandoned);
tags = GM_getValue(world+'_zoom',tags);
grid = GM_getValue(world+'_grid',grid);
own = GM_getValue(world+'_own',own);
ownAlly = GM_getValue(world+'_ownAlly',ownAlly);

function findByInner(obj,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      if(obj.getElementsByTagName('*')[i].firstChild)
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
    list['length'] = a;
    return list;
    }

function appendChilds()
  {
  for(var i = 1; i < arguments.length; i++)
    arguments[0].appendChild(arguments[i]);
  }

var title = document.title.match(/(\d{1,3})\|(\d{1,3})/g)[0].split('|')
var x = title[0];
var y = title[1];
var tmp_e = findByInner(document.getElementById('ds_body'),'Tag:')[0];
var tag = tmp_e.nextSibling.firstChild.data;
var table = tmp_e.parentNode.parentNode;

var tr = document.createElement('tr');

var td = document.createElement('td');
td.setAttribute('colspan','2');
td.setAttribute('style','text-align:center; ');

var a = document.createElement('a');
a.setAttribute('href','#');
a.setAttribute('id','DSMapiaWeltkarte_link');
a.addEventListener('click',go,false);
a.appendChild(document.createTextNode('DS Mapia Weltkarte'));

var img = document.createElement('img');
img.setAttribute('src','http://www.c1b1.de/smile/dsforum/edit.gif');
img.setAttribute('title','Einstellungen ändern');
img.setAttribute('alt','Bearbeiten');
img.addEventListener('click',settings,false);

td.appendChild(a);
td.appendChild(img);
tr.appendChild(td);
table.appendChild(tr);


function go() {

document.getElementById('DSMapiaWeltkarte_link').innerHTML = 'Daten werden gesammelt . . .';

GM_xmlhttpRequest({
  method:"GET",
  url:'http://www.dsreal.de/index.php?screen=map&world='+world,
  headers:{
    "User-Agent":"Mozilla/5.0",
    "Accept":"text/xml"
  },
  onload:function(response) {

var form = document.createElement('form');
form.setAttribute('action',response.finalUrl);

form.setAttribute('method','post');
form.setAttribute('target','_blank');
form.setAttribute('id','dsmapia');

var ds_zoom = document.createElement('input');
ds_zoom.setAttribute('type','hidden');
ds_zoom.setAttribute('name','map[zoom]');
ds_zoom.setAttribute('value',zoom);

var dsmapia_x = document.createElement('input');
dsmapia_x.setAttribute('type','hidden');
dsmapia_x.setAttribute('name','map[x]');
dsmapia_x.setAttribute('value',x);

var dsmapia_y = document.createElement('input');
dsmapia_y.setAttribute('type','hidden');
dsmapia_y.setAttribute('name','map[y]');
dsmapia_y.setAttribute('value',y);

var dsmapia_verlassen = document.createElement('input');
dsmapia_verlassen.setAttribute('type','hidden');
dsmapia_verlassen.setAttribute('name','map[noPlayer]');
dsmapia_verlassen.setAttribute('value',abandoned?1:0);

var dsmapia_continent_lines = document.createElement('input');
dsmapia_continent_lines.setAttribute('type','hidden');
dsmapia_continent_lines.setAttribute('name','map[lines]');
dsmapia_continent_lines.setAttribute('value',grid?1:0);

var dsmapia_stammestags = document.createElement('input');
dsmapia_stammestags.setAttribute('type','hidden');
dsmapia_stammestags.setAttribute('name','map[description]');
dsmapia_stammestags.setAttribute('value',tags?1:0);

var dsmapia_showOnly = document.createElement('input');
dsmapia_showOnly.setAttribute('type','hidden');
dsmapia_showOnly.setAttribute('name','map[showOnly]');
dsmapia_showOnly.setAttribute('value',0);


var a1text = document.createElement('input');
a1text.setAttribute('type','hidden');
a1text.setAttribute('name','ally[]');
a1text.setAttribute('value',tag);

var a2text = document.createElement('input');
a2text.setAttribute('type','hidden');
a2text.setAttribute('name','ally[]');
a2text.setAttribute('value',ownAlly);

var a1color = document.createElement('input');
a1color.setAttribute('type','hidden');
a1color.setAttribute('name','allyC[]');
a1color.setAttribute('value','255,218,196');

var a2color = document.createElement('input');
a2color.setAttribute('type','hidden');
a2color.setAttribute('name','allyC[]');
a2color.setAttribute('value','30,54,166');

var p1text = document.createElement('input');
p1text.setAttribute('type','hidden');
p1text.setAttribute('name','player[]');
p1text.setAttribute('value',own);

var p1color = document.createElement('input');
p1color.setAttribute('type','hidden');
p1color.setAttribute('name','playerC[]');
p1color.setAttribute('value','241,255,036');

var ds_map = document.createElement('input');
ds_map.setAttribute('type','submit');
ds_map.setAttribute('name','map[submit]');
ds_map.setAttribute('value','Anzeigen');
ds_map.setAttribute('id','sendForm');

appendChilds(form,ds_zoom,dsmapia_x,dsmapia_y,dsmapia_verlassen,dsmapia_continent_lines,dsmapia_showOnly,dsmapia_stammestags,a1text,a1color,a2text,a2color,p1text,p1color,ds_map);

document.getElementById('DSMapiaWeltkarte_link').parentNode.appendChild(form);

document.getElementById('DSMapiaWeltkarte_link').innerHTML = 'Karte erstellt:';

document.getElementById('sendForm').click();

  }
});

}

function settings()
  {
  window.scrollTo(0, 0);

  var table = document.createElement('table');

  var tr = document.createElement('tr');
  var th = document.createElement('th');
  tr.appendChild(th);
  table.appendChild(tr);
  th.setAttribute('colspan',2);
  th.appendChild(document.createTextNode('Einstellungen:'));

  // Name
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','text');
  input.setAttribute('value',own);
  input.setAttribute('id','script40132_own_name');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Eigener Name'));

  // Ally
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','text');
  input.setAttribute('value',ownAlly);
  input.setAttribute('id','script40132_own_ally');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Eigener Stammestag'));

  // Zooom
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','text');
  input.setAttribute('value',zoom);
  input.setAttribute('id','script40132_zoom');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Zoom (0-7)'));

  // Abandoned
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.setAttribute('value','true');
  input.setAttribute('id','script40132_abandoned');
  if(abandoned)
    input.setAttribute('checked','checked');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Verlassene Dörfer anzeigen'));

  // Tags
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.setAttribute('value','true');
  input.setAttribute('id','script40132_tags');
  if(tags)
    input.setAttribute('checked','checked');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Stammestags anzeigen'));

  // Grid
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.setAttribute('value','true');
  input.setAttribute('id','script40132_grid');
  if(grid)
    input.setAttribute('checked','checked');
  td1.appendChild(input);
  td2.appendChild(document.createTextNode('Raster anzeigen'));


  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.setAttribute('colspan','2');
  tr.appendChild(td1);
  table.appendChild(tr);
  var input_cancel = document.createElement('input');
  input_cancel.setAttribute('type','button');
  input_cancel.setAttribute('value','Abrrechen');
  input_cancel.addEventListener('click',function(){document.getElementById('script40132_settings').parentNode.removeChild(d.id('script40132_settings'));},false);
  var input_save_settings = document.createElement('input');
  input_save_settings.setAttribute('type','button');
  input_save_settings.setAttribute('value','Speichern');
  input_save_settings.addEventListener('click',save_settings,false);
  td1.appendChild(input_cancel);
  td1.appendChild(document.createTextNode(' '));
  td1.appendChild(input_save_settings);


  var copy = document.createElement('a');
  copy.setAttribute('href','#');
  copy.setAttribute('style','font-weight:normal; font-size:x-small; color:blue; text-decoration:underline; ');
  copy.addEventListener('click',function(){ alert('DS Mapia Weltkartenlink(Stamm)\n\nFügt auf den Profilen von Stämmen einen Link zur Weltkarte von DS Mapia hinzu.\nDer Stamm, eigene Dörfer und der eigene Stamm werden direkt in die Karte eingetragen.\n\n(c) by C1B1SE 2009\n\n\tinfo@c1b1.de\n\thttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\n\nThis script may be forbidden in TribalWars or DieSt'+unescape('%E4')+'mme.\nPlease look in the respective forum for further information!'); },false);
  copy.appendChild(document.createTextNode('About DS Mapia Weltkartenlink(Stamm) (' + version+')'));

  var updates = document.createElement('a');
  updates.setAttribute('href','http://userscripts.org/scripts/show/40132');
  updates.setAttribute('title','Schau auf userscripts.org nach einem Update');
  updates.setAttribute('style','font-weight:normal; font-size:x-small; color:blue; text-decoration:underline; ');
  updates.appendChild(document.createTextNode('Updates?'));


  var allc = document.createElement('span');
  allc.setAttribute('style','font-size:x-small; color:silver; ');
  allc.appendChild(document.createTextNode('Copyright 2009 by c1b1.de'));

  var close = document.createElement('img');
  close.setAttribute('src','http://www.c1b1.de/close.png');
  close.setAttribute('alt','Schließen');
  close.addEventListener('click',function() { document.getElementById('script40132_settings').parentNode.removeChild(document.getElementById('script40132_settings')); },false);
  close.setAttribute('style','position:absolute; top:1px; right:1px; ');

  var div =  document.createElement('div');
  div.setAttribute('id','script40132_settings');
  div.setAttribute('style','position:absolute; top:20px; left:30px;background-color:#F7EED3; color:#804000; border:1px solid #804000; padding:15px; ');

  div.appendChild(table);
  div.appendChild(document.createElement('br'));
  div.appendChild(document.createElement('br'));
  div.appendChild(copy);
  div.appendChild(document.createElement('br'));
  div.appendChild(document.createElement('br'));
  div.appendChild(updates);
  div.appendChild(document.createElement('br'));
  div.appendChild(document.createElement('br'));
  div.appendChild(allc);
  div.appendChild(close);
  document.getElementsByTagName('body')[0].appendChild(div);
  }

function save_settings()
  {
  var n_ownname = document.getElementById('script40132_own_name').value;
  var n_ownally = document.getElementById('script40132_own_ally').value;
  var n_zoom = parseInt(document.getElementById('script40132_zoom').value);
  var n_tags = document.getElementById('script40132_tags').checked?true:false;
  var n_abandoned = document.getElementById('script40132_abandoned').checked?true:false;
  var n_grid = document.getElementById('script40132_grid').checked?true:false;


  GM_setValue(world+'_own',n_ownname);
  GM_setValue(world+'_ownAlly',n_ownally);
  GM_setValue(world+'_zoom',n_zoom);
  GM_setValue(world+'_tags',n_tags);
  GM_setValue(world+'_abandoned',n_abandoned);
  GM_setValue(world+'_grid',n_grid);


  alert('Gespeichert');

  document.location.reload();
  }