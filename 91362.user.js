// ==UserScript==
// @name                 سيكريبت نقاط الهجوم والدفاع
// @version              1.3.8
// @author               تعريب:محمد احمد 20
// @namespace            c1b1.de
// @homepage             http://c1b1.de
// @copyright            2008 - 2010, Samuel Essig (http://c1b1.de)
// @license              No Distribution!
// @description          هذا السيكربت يقوم بإظهار نقاط الهجوم والدفاع , من تعريب : محمد احمد 20
// @include              http://ae*.Tribalwars.de/game.php*screen=report*mode=all*view=*
// @include              http://ch*.die-staemme.ch/game.php*screen=report*mode=all*view=*
// @include              http://en*.tribalwars.net/game.php*screen=report*mode=all*view=*
// @include              http://zz*.tribalwars.net/game.php*screen=report*mode=all*view=*
// @include              http://nl*.tribalwars.nl/game.php*screen=report*mode=all*view=*
// @include              http://pl*.plemiona.pl/game.php*screen=report*mode=all*view=*
// @include              http://ba*.plemena.net/game.php*screen=report*mode=all*view=*
// @include              http://sv*.tribalwars.se/game.php*screen=report*mode=all*view=*
// @include              http://br*.tribalwars.com.br/game.php*screen=report*mode=all*view=*
// @include              http://ru*.voyna-plemyon.ru/game.php*screen=report*mode=all*view=*
// @include              http://tr*.klanlar.org/game.php*screen=report*mode=all*view=*
// @include              http://dk*.tribalwars.dk/game.php*screen=report*mode=all*view=*
// @include              http://it*.tribals.it/game.php*screen=report*mode=all*view=*
// ==/UserScript==

/*
DS/TW Bashpoints in Berichten

(c) 2008 - 2010 by Samuel Essig
         info@c1b1.de
         skype:c1b1_se
         http://c1b1.de
         http://twitter.com/c1b1se
         http://www.facebook.com/samuelessig

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

Screenshot: http://img231.imageshack.us/my.php?image=unbenanntpn3.png

Diskussionsthread: http://forum.die-staemme.de/showthread.php?t=98464

*/

const url = document.location.href;
const lang = url.split('.')[0].split(/\/\/(\D+)\d+/)[1];
const world = parseInt(url.split('.').shift().split(lang).pop());

function GTFW (type)
  {
  if( (lang == 'de' && (world < 20 || world == 40 || world == 42)) || (lang == 'ch' && world < 2) ||  (lang == 'en' && world < 14)  ||  (lang == 'nl' && world < 6))
    return 2;
  else
    if(type == 'att')
      return 1;
  return 0;
  }

// Bashpoints
const unit_points =
  {            //  def   att   w19
  'spear'     :  [   4,    1,    1],
  'sword'     :  [   5,    2,    1],
  'axe'       :  [   1,    4,    1],
  'archer'    :  [   5,    2,    1],
  'spy'       :  [   1,    2,    2],
  'light'     :  [   5,   13,    4],
  'marcher'   :  [   6,   12,    5],
  'heavy'     :  [  23,   15,    6],
  'ram'       :  [   4,    8,    5],
  'catapult'  :  [  12,   10,    8],
  'knight'    :  [  40,   20,   10],
  'priest'    :  [   0,    0,  100],
  'snob'      :  [ 200,  200,  100]
  };

var attacker_table = $('#attack_info_att_units');
var defender_table = $('#attack_info_def_units');

// Get Units
var units = new Array('empty');
var elist = attacker_table.getElementsByTagName('tr')[0].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  // graphic/unit/unit_spear.png?1
  var unit = elist[i].getElementsByTagName('img')[0].getAttribute('src').match(/_(.+).png/)[1];
  void units.push( unit );
  };

// Get Attacker's Lost Units
var index = GTFW('att');
var attackers_points = 0;
var elist = attacker_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  var unit_att_lost = parseInt(elist[i].firstChild.data);
  attackers_points += unit_att_lost * unit_points[units[i]][index];
  };

// Get Defender's Lost Units
if(defender_table)
  {
  var index = GTFW('def');
  var defender_points = 0;
  var elist = defender_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
  for(var i = 1; i < elist.length; i++)
    {
    var unit_def_lost = parseInt(elist[i].firstChild.data);
    defender_points += unit_def_lost * unit_points[units[i]][index];
    };

  // Insert Defender Points
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.setAttribute('colspan','2');
  td.appendChild(document.createTextNode('نقاط الدفاع: '+stringInt(defender_points)));
  tr.appendChild(td);
  defender_table.$('tbody')[0].appendChild(tr);
  }

if($('#attack_info_def').$('th')[1].firstChild.nodeValue != '---') // If village not empty
  {
  // Insert Attacker Points
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.setAttribute('colspan','2');
  td.appendChild(document.createTextNode('نقاط الهجوم: '+stringInt(attackers_points)));
  tr.appendChild(td);
  attacker_table.$('tbody')[0].appendChild(tr);
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
function $(x) {
  var y = this.alert?this.document:this;
  var add = function(l) { for(var i = 0; i < l.length; i++){ l[i].$ = $;} return l;};
  if(x[0] == '#') {
    var r = y.getElementById(x.substring(1));
    if(r)
      r.$ = $;
    return r;
    }
  else if(x[0] == '.') {
    var r = y.getElementsByClassName(x.substring(1))
    return add(r);
    }
  else if(x[0] == '-') {
    var r = y.getElementsByName(x.substring(1))
    return add(r);
    }
  else {
    var r = y.getElementsByTagName(x)
    return add(r);
    }
  }
function stringInt(int) {
  var string = parseInt(int).toString(10);
  var reo = new RegExp('(-?[0-9]+)([0-9]{3})');
  while(reo.test(string))
    string = string.replace(reo,'$1.$2');
  return string;
  }