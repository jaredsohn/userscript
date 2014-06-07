// ==UserScript==
// @name          حاسبة الجيوش في دفتر الملاحظات من تعريب أخوكم: محمد احمد 20
// @description   هذآ السيكربت يقوم بوضع آلة حاسبة للجيوش في دفتر الملاحظات
// @namespace     تعريب : محمد احمد 20
// @include       http://*ae.die-staemme.ae/game.php?*screen=memo*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==


// ds.DCinNotes.user.js

// {$ dsScript $}
// version = 1.4
// author = C1B1SE
// clients = firefox , opera
// areas = .de
// worlds = only:css-coords ,
// premium = works
// description[de] = Laufzeitenrechner in den Notizen. Version f&uuml;r das alte Koordinatensystem - Kontinent:Sektor:Kartenfeld
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.DCinNotes_CSS_0.png
// {$ /dsScript $}

// (c) by C1B1SE

// Do not republish, use in other scripts, change or reproduce this script or parts of this scripts without permission from author


// Version für das alte Koordinatensystem:
// Kontinent:Sektor:Kartenfeld

// Geschwindigkeit (variiert nach Servern)
// 6          Händler
// 9          Späher
// 10         LKav, BB, Paladin
// 11         SKav
// 18         Speere, Axt, Bogen
// 22         Schwert
// 30         Rammen, Katas
// 35         AG

var speed = 10;

/*
Beispielcode für die Notizen:
(laufzeiten)
[village](xxx|yyy)[/village]
[village](xxxx|yyy)[/village]
(/laufzeiten)
ODER:
(laufzeiten)
[village](xxx|yyy)[/village] 5 offs fehlen noch
[village](xxxx|yyy)[/village]
(/laufzeiten)


Der 'Codeblock' wird mit "(laufzeiten)" eingeleitet und mit "(/laufzeiten)" geschlossen (ähnlich BB-Codes).
"(laufzeiten)" und "(/laufzeiten)" muss jeweils in einer extra Zeile stehen.
Dazwischen muss jede Zeile mit einer Dorfangabe beginnen [village](xxx|yyy)[/village]
Text nach dieser Angabe wird beachtet, allerdings dürfen keine BB-Codes benutzt werden.

Mehrere 'Codeblöcke' sind möglich.

Nach dem einleitenden "(laufzeiten)" kann die Laufzeit pro Feld für den Codeblock stehen, z.B.:
(laufzeiten)30
[village](xxx|yyy)[/village] 5offs fehlen noch
[village](xxxx|yyy)[/village]
(/laufzeiten)
Dieses Beispiel würde für diesen Block die Laufzeiten mit 30 Minuten pro Feld errechnen, also für Rammen oder Katapulte.
Ist keine Angabe (oder eine falsche gemacht), so wird die in diesem Script definierte Zahl benutzt ("var speed",Z. 38).

Alternativ kann (lz)...(/lz) an Stelle von (laufzeiten)...(/laufzeiten) benutzt werden.

*/

var speeds = new Array(6,9,10,11,18,22,30,35);
var s_imgs = eval({
  6:['graphic/المباني/السوق.png'],
  9:['graphic/الوحدة/unit_spy.png'],
  10:['graphic/الوحدة/unit_light.png','graphic/unit/unit_marcher.png'],
  11:['graphic/الوحدة/unit_heavy.png'],
  18:['graphic/الوحدة/unit_spear.png','graphic/unit/unit_axe.png','graphic/unit/unit_archer.png'],
  22:['graphic/الوحدة/unit_sword.png'],
  30:['graphic/الوحدة/unit_ram.png','graphic/unit/unit_catapult.png'],
  35:['graphic/الوحدة/unit_snob.png']
  });


function convert_coords_from_s3(con, sec, sub)
  {
  x = (con % 10) * 50 + (sec % 10) * 5 + (sub % 5);
  y = Math.floor(con / 10) * 50 + Math.floor(sec / 10) * 5 + Math.floor(sub / 5);
  return '('+x+'|'+y+')';
  }

//alert(convert_coords_from_s3(5,2,3));

var dom = new html();

if(dom.class('menu nowrap quickbar')[0])
  var subtrahend = 2;
else
  var subtrahend = 1;

var elist = dom.id('menu_row2').getElementsByTagName('td');
var currentVillageE = elist[elist.length - subtrahend].getElementsByTagName('b')[0];
var currentVillage = currentVillageE.firstChild.data.match(/(\(\d{1,3}\:\d{1,3}\:\d{1,3}\))/g)[0];
currentVillage = currentVillage.split(':');
currentVillage = convert_coords_from_s3( currentVillage[0].substr(1) , currentVillage[1] , currentVillage[2].substr(0,currentVillage[2].length - 1) );

var notes_td = dom.id('show_row').getElementsByTagName('td')[0];

var text = notes_td.innerHTML;
var positions = getCodesPositions(text);
while(positions[0] != false)
  {
  var first = positions[0];
  var last = positions[1];
  var x = positions[2];
  var y = positions[3];
  var s = positions[4];

  var text = text.substr(first,last);
  var tmp_element = dom.n('div');
  tmp_element.innerHTML = text;


  var table = dom.n('table');

  var tr = dom.n('tr');
  var th = dom.n('th');
  th.appendChild(dom.text('Laufzeiten jeweils von ' + currentVillageE.firstChild.data + ' f'+unescape('%FC')+'r: '));
  th.setAttribute('colspan','3');
  th.setAttribute('style','text-align:center; ');

  // unit pix
  for(var i = 0, len = s_imgs[s].length; i < len; i++)
    {
    var img = new Image();
    img.src = s_imgs[s][i];
    img.alt = s+' Minuten pro Feld';
    img.title = s+' Minuten pro Feld';
    th.appendChild(img);
    }

  tr.appendChild(th);
  table.appendChild(tr);

  var tr = dom.n('tr');

  var th1 = dom.n('th');
  th1.appendChild(dom.text('Zieldorf'));

  var th2 = dom.n('th');
  th2.appendChild(dom.text('Dauer'));

  var th3 = dom.n('th');
  th3.appendChild(dom.text('Zeit'));

  dom.appendChilds(tr,th1,th2,th3);
  table.appendChild(tr);

  var now = new Date();
  now = now.getTime() / 1000;

  var tmp_time = new Date();

  for(var i = 0, elist = tmp_element.getElementsByTagName('a'), len = elist.length; i < len; i++)
    {
    var coords = elist[i].firstChild.data.match(/(\(\d{1,3}\:\d{1,3}\:\d{1,3}\))/g)[0]; // e.g. "(29:82:14)"
    coords = coords.split(':');
    coords = convert_coords_from_s3( coords[0].substr(1) , coords[1] , coords[2].substr(0,coords[2].length - 1) );

    var time = calculateDuration(currentVillage,coords,s);

    var arrival = now + time[0]*60*60 +time[2]*60;
    tmp_time.setTime(arrival * 1000);
    var month = tmp_time.getMonth() + 1;
    var day = tmp_time.getDate();
    var hours = tmp_time.getHours();
    var minutes = tmp_time.getMinutes()<10?'0'+tmp_time.getMinutes():tmp_time.getMinutes();

    var tr = dom.n('tr');

    var td = dom.n('td');
    var a = dom.n('a');
    a.href = elist[i].href;
    a.appendChild(elist[i].firstChild);
    td.appendChild(a);
    tr.appendChild(td);

    var td = dom.n('td');
    td.appendChild(dom.text( time[0]+':'+time[1] ));
    tr.appendChild(td);

    var td = dom.n('td');
    td.appendChild(dom.text( day + '.' + month + ' ' + hours + ':' + minutes ));
    if(hours < 8)
      td.setAttribute('style','color:red; ');
    tr.appendChild(td);

    // Text rider
    var etmp = elist[i].nextSibling;
    if(etmp)
      {
      if(etmp.tagName != 'BR')
        {
        var td = dom.n('td');
        while(etmp && etmp.tagName != 'BR')
          {
          td.appendChild(etmp);
          etmp = etmp.nextSibling;
          }
        tr.appendChild(td);
        }
      }


    table.appendChild(tr);
    };

  var before = notes_td.innerHTML.substr(0,first-x);
  var after = notes_td.innerHTML.substr(last+first+y);

  notes_td.innerHTML = before + '<table rules="all" border="0">'+table.innerHTML+ '</table>' + after;

  var text = notes_td.innerHTML;
  var positions = getCodesPositions(text);
  }


function getCodesPositions(text)
  {
  var text = text;
  var patterns = new Array('(laufzeiten)...(/laufzeiten)','(lz)...(/lz)');
  for(var i = 0, len = patterns.length, pattern; i < len; i++)
    {
    pattern = patterns[i].split('...');
    var first = text.indexOf(pattern[0]);
    var last = text.indexOf(pattern[1]);
    var s = speed;
    if(first != -1 && last != -1)
      {
      first = first + pattern[0].length;
      last = last - first;
      var x = pattern[0].length;
      var y = pattern[1].length;
      // Speed hint
      var tmp = text.substr(first,2);

      if(tmp != '<b')
        {
        if(tmp[1] == '<')
          tmp = tmp[0];
        tmp = parseInt(tmp);
        for(var p = 0, len = speeds.length; p < len; p++)
          {
          if(speeds[p] == tmp)
            {
            s = tmp;
            }
          }
        }

      return new Array(first,last,x,y,s);
      }
    };
  return new Array(false);
  }


function calculateDuration(start,aim,speed)
  {
  var start = start.split('|');
  var sx = start[0].substr(1);
  var sy = start[1].substr(0,start[1].length - 1);

  var aim = aim.split('|');
  var tx = aim[0].substr(1);
  var ty = aim[1].substr(0,aim[1].length - 1);


  var xdif = parseInt(sx) - parseInt(tx);
  var ydif = parseInt(sy) - parseInt(ty);

  var xdiff = Math.pow(xdif, '2');
  var ydiff = Math.pow(ydif, '2');

  var xysum = parseInt(xdiff) + parseInt(ydiff);

  var xysumsqrt = Math.sqrt(xysum);

  var wholetime = xysumsqrt * parseInt(speed);

  var hours = parseInt(wholetime) * parseInt(60);
  hours = parseInt(hours) / parseInt(3600);
  hours = Math.floor(hours);

  var minutesone = Math.floor(wholetime);
  var minutestwo = parseInt(hours) * parseInt(60);
  var minutes = parseInt(minutesone) - parseInt(minutestwo);

  return new Array( hours, minutes<10?'0'+minutes:minutes , minutes);
  }

function html()
  {
  this.n = function(type) // Returns a new element of the type [type]
    {
    return document.createElement(type);
    }

  this.text = function(c) // Returns a new textnode with the content [c]
    {
    return document.createTextNode(c);
    }

  this.img = function(c) // Returns a new textnode with the content [c]
    {
    if(c)
      {
      var img = new Image();
      img.src = c;
      return img;
      }
    return new Image();
    }

  // Search functions

  this.id = function(type)  // Returns the element with the id [type]
    {
    return document.getElementById(type);
    }

  this.tag = function(type) // Returns the list ob elements with the tag given in [type]
    {
    return document.getElementsByTagName(type);
    }

  this.name = function(type) // Returns the list ob elements with the tag name given in [type]
    {
    return document.getElementsByName(type);
    }

  this.class = function(type) // Returns the list ob elements with the class given in [type]
    {
    return document.getElementsByClassName(type);
    }

  this.findByAttr = function(obj,attr,value) // Returns a list ob elements that have an attribute [attr] with the value [value]
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

  this.findByInner = function(obj,value) // Returns a list ob elements that contain the value [value]
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }

  this.appendChilds = function(obj)
    {
    for(var i = 1; i < arguments.length; i++)
      arguments[0].appendChild(arguments[i]);
    }

  this.removeChilds = function(obj)
    {
    while(obj.firstChild)
      {
      obj.removeChild(obj.firstChild);
      }
    }

  this.dumpObj = function(e,html,count)
    {
    if(!count)
      count = 0;
    var spaces = '  ';
    for(var i = 0; i < count; i++)
      spaces += '  ';
    if(html)
      n = '<br />\n';
    else
      n = '\n';
    var o = '( '+typeof(e)+' )'+n;
    for(var p in e)
      o+= spaces+p+' = '+'( '+typeof(e[p])+' ) '+(typeof(e[p]) == 'object'?(this.dumpObj(e[p],html,(count+2))):e[p])+n;
    return o;
    }



  // Gets the element (target) of a DOM Mouse Event Object
  // Returns false if there's no element
  this.mouseEventTarget = function(e)
    {
    if(e.target) // Mozilla, Opera, Safari
      return e.target;
    else if (e.srcElement) // IE
      return e.srcElement;
    else // No Target
      return false;
    }



  // Flexible Javascript Events by John Resig (ejohn.org)
  // http://ejohn.org/projects/flexible-javascript-events/
  this.addEvent = function( obj, type, fn )
    {
    if(obj.attachEvent)
      {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn](window.event);}
      obj.attachEvent( 'on'+type, obj[type+fn] );
      }
    else
      obj.addEventListener( type, fn, false );
    }

  this.removeEvent = function( obj, type, fn )
    {
    if(obj.detachEvent)
      {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
      }
    else
      obj.removeEventListener( type, fn, false );
    }

  return true;
  }