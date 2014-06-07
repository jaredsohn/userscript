// ==UserScript==
// @name           DS DSREAL Weltkartenlink(Stamm)
// @namespace      c1b1.de
// @include        http://de*.die-staemme.de/game.php?*screen=info_ally*id=*
// ==/UserScript==

var zoom = 4;               // Zoom 1 - 6
var abandoned = true;       // Verlassene Dörfer an = true; Verlassene Dörfer aus = false
var tags = false;           // Stammestags an = true; Stammestags aus = false
var grid = true;            // Kontinentgrenzen an = true; Kontinentgrenzen aus = false
var own = 'C1B1SE';         // Eigener Name

// #############################################################################################################

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

var world = document.location.href.split('.').shift().split('de').pop();
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
a.addEventListener('click',go,false);
a.appendChild(document.createTextNode('DS Real Weltkarte'));

td.appendChild(a);
tr.appendChild(td);
table.appendChild(tr);


function go() {
var form = document.createElement('form');
form.setAttribute('action','http://www.dsreal.de/index.php?tool=weltkarte&mode=show&world=de'+world);
form.setAttribute('method','post');
form.setAttribute('target','_blank');
form.setAttribute('id','dsreal');

var ds_zoom = document.createElement('input');
ds_zoom.setAttribute('type','hidden');
ds_zoom.setAttribute('name','ds_zoom');
ds_zoom.setAttribute('value',zoom);

var dsreal_x = document.createElement('input');
dsreal_x.setAttribute('type','hidden');
dsreal_x.setAttribute('name','dsreal_x');
dsreal_x.setAttribute('value',x);

var dsreal_y = document.createElement('input');
dsreal_y.setAttribute('type','hidden');
dsreal_y.setAttribute('name','dsreal_y');
dsreal_y.setAttribute('value',y);

var dsreal_verlassen = document.createElement('input');
dsreal_verlassen.setAttribute('type','hidden');
dsreal_verlassen.setAttribute('name','dsreal_verlassen');
dsreal_verlassen.setAttribute('value',abandoned?'Ja':'Nein');

var dsreal_continent_lines = document.createElement('input');
dsreal_continent_lines.setAttribute('type','hidden');
dsreal_continent_lines.setAttribute('name','dsreal_continent_lines');
dsreal_continent_lines.setAttribute('value',grid?'Ja':'Nein');

var dsreal_stammestags = document.createElement('input');
dsreal_stammestags.setAttribute('type','hidden');
dsreal_stammestags.setAttribute('name','dsreal_stammestags');
dsreal_stammestags.setAttribute('value',tags?'Ja':'Nein');

var a1text = document.createElement('input');
a1text.setAttribute('type','hidden');
a1text.setAttribute('name','a1text');
a1text.setAttribute('value',tag);

var a1color = document.createElement('input');
a1color.setAttribute('type','hidden');
a1color.setAttribute('name','a1color');
a1color.setAttribute('value','021,025,254');

var p1text = document.createElement('input');
p1text.setAttribute('type','hidden');
p1text.setAttribute('name','p1text');
p1text.setAttribute('value',own);

var p1color = document.createElement('input');
p1color.setAttribute('type','hidden');
p1color.setAttribute('name','p1color');
p1color.setAttribute('value','241,255,036');

var ds_map = document.createElement('input');
ds_map.setAttribute('type','hidden');
ds_map.setAttribute('name','ds_map');
ds_map.setAttribute('value','Erstellen');

appendChilds(form,ds_zoom,dsreal_x,dsreal_y,dsreal_verlassen,dsreal_continent_lines,dsreal_stammestags,a1text,a1color,p1text,p1color,ds_map);

document.getElementById('ds_body').appendChild(form);
document.getElementById('dsreal').submit(); }











