// ==UserScript==
// @name          DS aus Berichten farmen 2 (regelkonform)
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/game.php?*screen=report*view=*
// @include       http://de*.die-staemme.de/game.php?*screen=place*mode=command*insertU=*
// ==/UserScript==

// ds.spying2FormCensored.user.js

// {$ dsScript $}
// version = 1.9.2
// author = (c) C1B1SE
// clients = firefox , opera
// areas = .de
// worlds = only:xy-coords
// premium = works
// description[de] = An Regeln angepasste Version<br />Schnittstelle zum <a href="http://ds.basti-web.net/speicherrechner.php">0DS Speicherrechner</a> von eufarius<br />Rechnet in Berichten aus wie viele Einheiten zum Leerfarmen des gesamten Speichers benötigt werden.
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.spying2Form_0.png
// {$ /dsScript $}


/*
DS aus Berichten farmen 2

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/


// Standardeinheit:
var show = 'light';

var new_Page_or_Tab = false;

var units = eval({
  'spear':[25,'graphic/unit/unit_spear.png','Speertr'+unescape('%E4')+'ger'],
  'sword':[15,'graphic/unit/unit_sword.png','Schwertk'+unescape('%E4')+'mpfer'],
  'axe':[10,'graphic/unit/unit_axe.png','Axtk'+unescape('%E4')+'mpfer'],
  'archer':[10,'graphic/unit/unit_archer.png','Bogensch'+unescape('%FC')+'tze'],
  'light':[80,'graphic/unit/unit_light.png','Leichte Kavallerie'],
  'marcher':[50,'graphic/unit/unit_marcher.png','Berittener Bogensch'+unescape('%FC')+'tze'],
  'heavy':[50,'graphic/unit/unit_heavy.png','Schwere Kavallerie']
  });


var resPhourPlevel = new Array(0, 30, 35, 41, 47, 55, 64, 74, 86, 100, 117, 136, 158, 184, 214, 249, 289, 337, 391, 455, 530, 616, 717, 833, 969, 1127, 1311, 1525, 1774, 2063, 2400);

var resPlevel = new Array(0, 1000, 1229, 1512, 1859, 2285, 2810, 3454, 4247, 5222, 6420, 7893, 9705, 11932, 14670, 18037, 22177, 27266, 33523, 41217, 50675, 62305, 76604, 94184, 115798, 142373, 175047, 215219, 264611, 325337, 400000);




if(document.location.href.indexOf('screen=report') != -1)
  {

  var opera = window.opera?true:false;
  var spying = findByInner(document,'Spionage');
  var table = getNextElement(spying[0],'table');
  var ct = document.location.href.split('village')[1].split('&')[0].substr(1);

  var own_village = findByInner(table.parentNode,'Dorf:')[0].nextSibling.firstChild.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');
  own_village[0] = own_village[0].substr(1);
  own_village[1] = own_village[1].substr(0,own_village[1].length - 1);

  var village = findByInner(table.parentNode,'Dorf:')[1].nextSibling.firstChild.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');
  village[0] = village[0].substr(1);
  village[1] = village[1].substr(0,village[1].length - 1);


  // is spying report:
  if(table)
    {

    var levels = grabText(table.getElementsByTagName('tr')[1].getElementsByTagName('td')[0],2).split('\n');
    void levels.shift();
    void levels.pop();

    for(var i = 0, len = levels.length; i < len; i++)
      {
      if(levels[i].indexOf('Holzf'+unescape('%E4')+'ller') != -1)
        {
        var wood = levels[i].split('Stufe ')[1];
        wood = parseInt(wood.substr(0,wood.length - 1));
        }
      else if(levels[i].indexOf('Lehmgrube') != -1)
        {
        var clay = levels[i].split('Stufe ')[1];
        clay = parseInt(clay.substr(0,clay.length - 1));
        }
      else if(levels[i].indexOf('Eisenmine') != -1)
        {
        var iron = levels[i].split('Stufe ')[1];
        iron = parseInt(iron.substr(0,iron.length - 1));
        }
      else if(levels[i].indexOf('Speicher') != -1)
        {
        var storage = levels[i].split('Stufe ')[1];
        storage = strorage = parseInt(storage.substr(0,storage.length - 1));
        break;
        }
      }

    var time = findByInner(document,'Gesendet')[0].nextSibling.firstChild.data.split(' ');
    var date = time[0].split('.');
    var time = time[1].split(':');
    if(date[2][0] == '0')
      date[2] = date[2][1];
    var sent = new Date();
    with(sent) {
      setDate(parseInt(date[0]));
      setMonth(-1+parseInt(date[1]));
      setFullYear(2000+parseInt(date[2]));
      setHours(parseInt(time[0]));
      setMinutes(parseInt(time[1]));
      setSeconds(0);
      setMilliseconds(0); }

    var now = new Date();
    var diff = (now.getTime() - sent.getTime())/1000;
    var minutes = diff / 60;

    var res = grabText(table.getElementsByTagName('tr')[0].firstChild.nextSibling,1).split(' ');

    var wood_stock = Math.ceil((resPhourPlevel[wood]/60)*minutes) + parseInt(res[0]);
    var clay_stock = Math.ceil((resPhourPlevel[clay]/60)*minutes) + parseInt(res[1]);
    var iron_stock = Math.ceil((resPhourPlevel[iron]/60)*minutes) + parseInt(res[2]);

    var report_resources = new Array(parseInt(res[0]),parseInt(res[1]),parseInt(res[2]));

    res = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]);
    var res2 = wood_stock + clay_stock + iron_stock;
    res2 = res2>resPlevel[storage]*3?resPlevel[storage]*3:res2;

    requiredUs(show);
    };
  }
else
  {

  }


  function requiredUs(u)
    {
    var walks = Math.ceil(res / units[u][0]);
    var walks2 = Math.ceil(res2 / units[u][0]);
    var walks3 = Math.ceil((resPlevel[storage]*3) / units[u][0]);

    var img = new Image();
    with(img) {
      src = units[u][1];
      alt = ''; }
    var span = document.createElement('span');
    with(span) {
      appendChild(document.createTextNode('Insg. '+Math.floor(res/1000) + '.' +  res.toString(10).substr(-3)+' Rohstoffe, mind. ' + walks + ' '));
      appendChild(img);
      appendChild(document.createTextNode(' ben'+unescape('%F6')+'tigt '));
      }

    var img = new Image();
    with(img) {
      src = units[u][1];
      alt = ''; }
    var span2 = document.createElement('span');
    with(span2) {
      appendChild(document.createTextNode('Mit hypothetischer Erh�hung '+Math.floor(res2/1000) + '.' +  res2.toString(10).substr(-3)+' Rohstoffe, mind. ' + walks2 + ' '));
      appendChild(img);
      appendChild(document.createTextNode(' ben'+unescape('%F6')+'tigt '));
      }

    var select = document.createElement('select');
    if(!opera)
      select.setAttribute('size',2);
    else
      select.setAttribute('size',1);
    select.setAttribute('style','vertical-align:middle; ');
    select.addEventListener('change',function() {requiredUs(this.options[this.selectedIndex].value)},false);

    for(var attr in units)
      {
      var option = document.createElement('option');
      option.setAttribute('value',attr);
      if(attr == u)
        option.setAttribute('selected','selected');

      if(!opera)
        {
        var img = new Image();
        img.src = units[attr][1];
        img.alt = units[attr][2];
        option.appendChild(img);
        }
      else
        {
        option.appendChild(document.createTextNode(units[attr][2]));
        }

      select.appendChild(option);
      }


    var span3 = document.createElement('span');
    if(wood_stock >= resPlevel[storage] || clay_stock >= resPlevel[storage] || iron_stock >= resPlevel[storage])
      {
      time = 'schon';
      }
    else
      {
      wood_time = (resPlevel[storage] - wood_stock) / resPhourPlevel[wood];
      clay_time = (resPlevel[storage] - clay_stock) / resPhourPlevel[clay];
      iron_time = (resPlevel[storage] - iron_stock) / resPhourPlevel[iron];

      var time = minValue(false,wood_time,clay_time,iron_time)

      var hours = Math.floor(time);
      var minutes = Math.round((time - hours)*60);

      time = 'fr'+String.fromCharCode('0252')+'hestens in '+hours+':'+minutes+' Stunden';
      }


    with(span3) {
      appendChild(document.createTextNode('Der Speicher w'+String.fromCharCode('0228')+'re '+time+' voll'));
      }

    var img = new Image();
    with(img) {
      src = units[u][1];
      alt = ''; }

    var span4 = document.createElement('span');
    with(span4) {
      appendChild(document.createTextNode('Mit vollem Speicher max. '+(resPlevel[storage]*3)+' Rohstoffe, mind. ' + walks3 + ' '));
      appendChild(img);
      appendChild(document.createTextNode(' ben'+unescape('%F6')+'tigt '));
      }

    // Begin: Rechner Teil
    // System Of A Down's Old School Hollywood rocks^^

    var pseudo_units = eval({
    'spear':'speer',
    'sword':'schwert',
    'axe':'axt',
    'archer':'bogen',
    'light':'lkav',
    'marcher':'beritten',
    'heavy':'skav'
    });

    var rechner_url = 'http://ds.basti-web.net/speicherrechner.php?mode=rechnen&';

    var rechner_vars = new Array();
    rechner_vars.push('holzstufe='+wood);
    rechner_vars.push('lehmstufe='+clay);
    rechner_vars.push('eisenstufe='+iron);
    rechner_vars.push('speicherstufe='+storage);

    rechner_vars.push('holzvorrat='+report_resources[0]);
    rechner_vars.push('lehmvorrat='+report_resources[1]);
    rechner_vars.push('eisenvorrat='+report_resources[2]);

    rechner_vars.push('x1='+own_village[0]);
    rechner_vars.push('y1='+own_village[1]);

    rechner_vars.push('x2='+village[0]);
    rechner_vars.push('y2='+village[1]);

    rechner_vars.push('sent='+Math.round(sent.getTime()/1000));

    rechner_vars.push(pseudo_units[u]+'=ok');


    var button = document.createElement('a');
    if(new_Page_or_Tab)
      button.target = '_blank';
    with(button) {
      href = rechner_url+rechner_vars.join('&');
      title = 'Daten an DS-Speicherrechner senden (by eufarius)';
      appendChild(document.createTextNode('An Rechner senden'));
      }

    /*
    holzstufe
    lehmstufe
    eisenstufe
    speicherstufe
    holzvorrat
    lehmvorrat
    eisenvorrat
    x1 --> eigene x-Koordinate
    y1 --> eigene y-Koord.
    x2 --> gegnerische x-Koord.
    y2 --> geg. y-Koord.
    speer
    schwert
    axt
    bogen
    spaeher
    lkav
    beritten
    skav
    ramme
    katapult
    paladin
    ag
    sent --> timestamp beim Senden
    */

    // End: Rechner Teil

    var close = new Image();
    with(close) {
      src = 'http://www.c1b1.de/close.png';
      alt = 'Close';
      title = 'Close';
      addEventListener('click',function() {document.getElementById('farm_script_table').parentNode.removeChild(document.getElementById('farm_script_table')); },false);
      }

    var ta = document.createElement('table');
    ta.setAttribute('id','farm_script_table');
    ta.setAttribute('style','border: 1px solid #DED3B9');
    ta.setAttribute('width','100%');

    var th = document.createElement('th');
    th.setAttribute('style','white-space:nowrap; vertical-align:middle; ');
    th.appendChild(document.createTextNode('Farmen:'));
    th.appendChild(close);

    var td = document.createElement('td');
    td.setAttribute('colspan',3);
    td.setAttribute('style','white-space: nowrap;');

    td.appendChild(button);
    td.appendChild(document.createElement('br'));
    td.appendChild(span);
    td.appendChild(document.createElement('br'));
    td.appendChild(span2);
    //td.appendChild(a);
    td.appendChild(document.createElement('br'));
    td.appendChild(select);
    td.appendChild(document.createElement('br'));
    td.appendChild(span3);
    td.appendChild(document.createElement('br'));
    td.appendChild(span4);

    var tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(td);
    ta.appendChild(tr);

    if(document.getElementById('farm_script_table'))
      {
      document.getElementById('farm_script_table').parentNode.replaceChild(ta,document.getElementById('farm_script_table'));
      }
    else
      {
      table.parentNode.insertBefore(ta,table.nextSibling);
      table.parentNode.insertBefore(document.createElement('br'),table.nextSibling);
      }
    }

function maxValue()
  {
  for(var i = 1, x = new Array(false,false), len = arguments.length; i < len;i++)
    {
    x[0] = x[0]?(x[0]<arguments[i]?arguments[i]:x[0]):arguments[i];
    x[1] = x[1]?(x[0]<arguments[i]?i:x[1]):i;
    }
  return arguments[0]?x:x[0];
  }

function minValue()
  {
  for(var i = 1, x = new Array(false,false), len = arguments.length; i < len;i++)
    {
    x[0] = x[0]?(x[0]>arguments[i]?arguments[i]:x[0]):arguments[i];
    x[1] = x[1]?(x[0]>arguments[i]?i:x[1]):i;
    }
  return arguments[0]?x:x[0];
  }

function getNextElement(obj,tname) {
    var tname = tname.toLowerCase();
    var obj = obj.nextSibling;
    while(true)
      {
      if(!obj)
        return false;
      if(!obj.tagName)
        obj = obj.nextSibling;
      else if(obj.tagName.toLowerCase() == tname)
        return obj;
      else
        obj = obj.nextSibling;
      }
    return list; }


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

function findByAttr(obj,attr,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

function grabText ( node , maxDepth )
  {
  if ( 3 == node . nodeType )
    {
    return node . nodeValue ;
    }
  else if( ( 1 == node . nodeType ) && ( 0 < maxDepth ))
    {
    var result = '' ;
    for(var i = 0 ;i < node . childNodes . length ;i ++)
      {
      result += grabText(node . childNodes [ i ] , maxDepth - 1) ;
      }
    return result ;
    }
  return '';
  }