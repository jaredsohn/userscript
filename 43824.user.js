// ==UserScript==
// @name          DS Nachbardörfer Details
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/game.php*screen=place*mode=neighbor*
// ==/UserScript==

// ds.voisinVillageDetails.user.js

// Version 0.5

/*
DS Nachbardörfer Details

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

XML Daten von einem Dorf:
http://de[world].die-staemme.de/game.php?screen=overview&xml&village=[aim]&source=[start]
[world]       Welt
[aim]         ID des Zieldorfes (über dieses Dorf werden Infos gezeigt)
[start]       ID des Startdorfes (wegen Laufzeiten) {optional}

Gruppeninfo zusätzlich:
http://[world].die-staemme.de/groups.php?mode=village&village_id=[village]
[world]       Welt
[village]     ID des Dorfs dessen Gruppe angezeigt werden soll
*/

var world = document.location.href.split('.').shift().split('de').pop();
var village_page = document.location.href.split('&')[0].split('=').pop();

void addEvents2Villages();

function $(id) { return document.getElementById(id); };
function name(name) { return document.getElementsByName(name); };
function tag(name) { return document.getElementsByTagName(name); };
function class(name) { return document.getElementsByClassName(name); };
function d(id) { document.getElementById(id).parentNode.removeChild(document.getElementById(id)); };
function n(tag) { return document.createElement(tag); };
function t(str) { return document.createTextNode(str); };
function nimg(src) { var img = n('img'); img.setAttribute('src',src); return img; };
function stringInt(int) { if(!int) return 0; var string = parseInt(int).toString(10); var reo = new RegExp('(-?[0-9]+)([0-9]{3})'); while(reo.test(string)) string = string.replace(reo,'$1.$2'); return string; };


function addEvents2Villages()
  {
  var table = class('vis')[1];
  table.setAttribute('id','neighbor_villages_table')

  var villages = table.getElementsByTagName('tr');

  for(var i = 1; i < villages.length; i++)
    {
    var td = villages[i].getElementsByTagName('td')[0];
    var link = td.getElementsByTagName('a')[0];
    var village_id = link.getAttribute('href').split('=')[1].split('&').shift();
    td.setAttribute('title',village_id);
    td.addEventListener('mouseover',show_popUp,false);
    td.addEventListener('mouseout',hide_popUp,false);
    td.addEventListener('mousemove',move_popUp,false);
    }
  }

function show_popUp(e)
  {
  var village_id = this.getAttribute('title');

  if(!$('details_popup'))
    {
    var div = n('div');
    div.setAttribute('id','details_popup');
    div.setAttribute('style','position:absolute; background:url(../graphic/background/content.jpg); border:2px solid #804000;');
    div.style.left = 25+e.pageX + 'px';
    div.style.top = 25+e.pageY + 'px';

    var img = new Image();
    img.setAttribute('alt','Laden . . . . ');
    img.setAttribute('src','graphic/throbber.gif');
    div.appendChild(img);

    document.getElementsByTagName('body')[0].appendChild(div);
    }
  else if($('details_popup').getAttribute('title') == village_id)
    {
    var div = $('details_popup');
    div.style.left = 25+e.pageX + 'px';
    div.style.top = 25+e.pageY + 'px';
    div.style.display = 'block';
    return 0;
    }
  else
    {
    var div = $('details_popup');
    div.style.left = 25+e.pageX + 'px';
    div.style.top = 25+e.pageY + 'px';
    div.style.display = 'block';
    div.innerHTML = '';
    var img = new Image();
    img.setAttribute('alt','Laden . . . . ');
    img.setAttribute('src','graphic/throbber.gif');
    div.appendChild(img);
    }

  GM_xmlhttpRequest({
    method:"GET",
    url:"http://de"+world+".die-staemme.de/game.php?screen=overview&xml&village="+village_id+"&source="+village_page,
    onload:function(response) {
      var parserObj = new DOMParser();
      var obj = parserObj.parseFromString(response.responseText,"text/xml")
      div.setAttribute('title',village_id);
      parse_popUp(div,obj);
      }
    });

  }

function move_popUp(e)
  {
  var village_id = this.getAttribute('title');
  if($('details_popup').getAttribute('title') == village_id)
    {
    var div = $('details_popup');
    div.style.left = 25+e.pageX + 'px';
    div.style.top = 25+e.pageY + 'px';
    div.style.display = 'block';
    return 0;
    }
  }

function parse_popUp(div,data)
  {
  var content = n('div')

  var xml_village = data.getElementsByTagName('village')[0];

  var values = [
  'wood',
  'stone',
  'iron',
  'trader_current',
  'trader_total',
  'pop',
  'pop_max',
  'storage_max',
  'unit_spear',
  'unit_sword',
  'unit_axe',
  'unit_archer',
  'unit_spy',
  'unit_light',
  'unit_marcher',
  'unit_heavy',
  'unit_ram',
  'unit_catapult',
  'unit_knight',
  'unit_snob',
  'time_unit_spear',
  'time_unit_sword',
  'time_unit_axe',
  'time_unit_archer',
  'time_unit_spy',
  'time_unit_light',
  'time_unit_marcher',
  'time_unit_heavy',
  'time_unit_ram',
  'time_unit_catapult',
  'time_unit_knight',
  'time_unit_snob' ];

  var data = { };
  for(var i = 0; i < values.length; i++)
    {
    if(xml_village.getElementsByTagName(values[i])[0])
      data[values[i]] = xml_village.getElementsByTagName(values[i])[0].firstChild.nodeValue;
    }

  // Resources
  var table = n('table');
  var tr = n('tr');

  var td = n('td');
  td.appendChild(nimg('graphic/holz.png'));
  td.appendChild(t( stringInt(data.wood) ));
  tr.appendChild(td);

  var td = n('td');
  td.appendChild(nimg('graphic/lehm.png'));
  td.appendChild(t( stringInt(data.stone) ));
  tr.appendChild(td);

  var td = n('td');
  td.appendChild(nimg('graphic/eisen.png'));
  td.appendChild(t( stringInt(data.iron) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','border-left: 1px dotted;');
  td.appendChild(nimg('graphic/res.png'));
  td.appendChild(t( stringInt(data.storage_max) ));
  tr.appendChild(td);

  table.appendChild(tr);
  content.appendChild(table);

  // Merchants and Workers
  var table = n('table');
  var tr = n('tr');

  var td = n('td');
  td.appendChild(nimg('graphic/buildings/market.png'));
  td.appendChild(t( stringInt(data.trader_current) +'/'+ stringInt(data.trader_total) ));
  tr.appendChild(td);

  var td = n('td');
  td.appendChild(nimg('graphic/face.png'));
  td.appendChild(t( stringInt(data.pop) +'/'+ stringInt(data.pop_max) ));
  tr.appendChild(td);

  table.appendChild(tr);
  content.appendChild(table);

  // Units
  var table = n('table');
  var tr = n('tr');

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_spear.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_sword.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_axe.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_archer.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_spy.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_light.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_marcher.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_heavy.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_ram.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_catapult.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_knight.png'));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(nimg('graphic/unit/unit_snob.png'));
  tr.appendChild(td);

  table.appendChild(tr);

  var tr = n('tr');

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_spear) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_sword) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_axe) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_archer) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_spy) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_light) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_marcher) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_heavy) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_ram) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_catapult) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_knight) ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; ');
  td.appendChild(t( stringInt(data.unit_snob) ));
  tr.appendChild(td);

  table.appendChild(tr);

  var tr = n('tr');

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_spear ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_sword ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_axe ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_archer ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_spy ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_light ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_marcher ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_heavy ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_ram ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_catapult ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_knight ));
  tr.appendChild(td);

  var td = n('td');
  td.setAttribute('style','text-align:center; font-size:7pt; ');
  td.appendChild(t( data.time_unit_snob ));
  tr.appendChild(td);

  table.appendChild(tr);

  content.appendChild(table);

  // Group
  var table = n('table');
  var tr = n('tr');

  var td = n('td');
  td.setAttribute('id','details_popup_groupTD');
  if(!$('neighbor_villages_table_group_id_'+$('details_popup').getAttribute('title')))
    {
    getGroups($('details_popup').getAttribute('title'));
    td.appendChild(nimg('graphic/throbber.gif'));
    }
  else
    {
    td.appendChild( $('neighbor_villages_table_group_id_'+$('details_popup').getAttribute('title')).firstChild.cloneNode(true) );
    }
  tr.appendChild(td);

  table.appendChild(tr);
  content.appendChild(table);

  // (c)
  var copyr = String.fromCharCode('0169')+' c1b1.de  - You\'re cheating!';

  var c = n('din');
  c.setAttribute('style','font-size:smaller; float:right; ');
  c.setAttribute('title','DS Nachbardörfer Details - http://c1b1.de');
  c.appendChild(document.createTextNode(copyr));

  content.appendChild(c);

  div.innerHTML = '';
  div.appendChild(content);
  }


function hide_popUp()
  {
  if(document.getElementById('details_popup'))
    {
    var obj = document.getElementById('details_popup');
    obj.style.display = 'none';
    }
  }

function getGroups(id)
  {
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://de"+world+".die-staemme.de/groups.php?mode=village&village_id="+id,
    onload:function(response) {
      var obj = n('div');
      obj.setAttribute('style','display:none;');
      obj.innerHTML = response.responseText.split('<form method="post" action="/groups.php?action=village">').pop().split('</form>').shift();
      tag('body')[0].appendChild(obj);
      var groups = [ ];
      for(var i = 0,elist = obj.getElementsByTagName('input'); i < elist.length; i++)
        {
        if(elist[i].checked)
          {
          groups.push(elist[i].nextSibling.nodeValue);
          }
        }
      var text = t ( 'Gruppen: ' + groups.join(', ') );
      $('details_popup_groupTD').replaceChild(text,$('details_popup_groupTD').getElementsByTagName('img')[0]);

      // Add group to table:
      if(!$('neighbor_villages_table_group_id_'+id))
        {
        var table = $('neighbor_villages_table');
        var villages = table.getElementsByTagName('tr');

        for(var i = 1; i < villages.length; i++)
          {
          var td = villages[i].getElementsByTagName('td')[0];
          var link = td.getElementsByTagName('a')[0];
          var village_id = link.getAttribute('href').split('=')[1].split('&').shift();
          if(village_id == id)
            {
            var td = n('td');
            td.setAttribute('id','neighbor_villages_table_group_id_'+id)
            td.appendChild( t ( 'Gruppen: ' + groups.join(', ') ) );
            villages[i].appendChild(td);
            break;
            }
          }
        }
      }
    });
  }