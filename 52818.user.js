// ==UserScript==
// @name          DS PA Rohstoffvergleich bei Produktionsübersicht
// @description   -
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/game.php*village=*screen=overview_villages*mode=prod*
// ==/UserScript==

// (c) C1B1SE,c1b1.de

// Version 1.1

var dom = new html();

var ton = new Array('Holz','Lehm','Eisen','zu viel','Ausgewogen','Ergebnis',
'Name','Rohstoffstatus','Rohstoffe vergleichen','Total','Einstellungen',
'Speichern','Abbrechen','Schnellleiste','Bild','Titel',
'Toleranz','Ja','Nein','Fenster','abstand links');
var world = document.location.href.split('.').shift().split('de').pop()+'_';

if(GM_getValue(world+'quickbar') == undefined)
  {
  // First Start Fill Config

  GM_setValue(world+'quickbar',true);
  GM_setValue(world+'quickbar_name',ton[8]);
  GM_setValue(world+'quickbar_img','graphic/res.png');
  GM_setValue(world+'result_loc','window');
  GM_setValue(world+'window_left','500px');
  GM_setValue(world+'margin',20000);

  alert('DS Rohstoffvergleich bei Produktionsübersicht ist jetzt initialisiert!');
  document.location.reload();
  }


var toleranz = GM_getValue(world+'margin');
if(GM_getValue(world+'quickbar'))
  quickbar();
else
  {
  var a = document.createElement('a');
  a.setAttribute('href','#');
  a.appendChild(document.createTextNode(ton[8]));
  document.getElementById('ds_body').appendChild(document.createElement('br'));
  document.getElementById('ds_body').appendChild(a);
  a.addEventListener('click',compare,true);
  }


function compare() {

function getBad(arr,margin)
  {
  var max = 0;
  for(var i = 1; arr.length > i; i++)
    {
    if(arr[i] > arr[max])
      max = i;
    }
  if(max == 0)
    var average = (arr[1]+arr[2])/2;
  else if(max == 1)
    var average = (arr[0]+arr[2])/2;
  else if(max == 2)
    var average = (arr[0]+arr[1])/2;
  var dif = arr[max] - average;
  return new Array(dif>margin?dif:-1,max);
  }
var table = document.getElementsByClassName('main')[0].getElementsByTagName('table')[2];
var elist = table.getElementsByTagName('tr');
var result = new Array();
var total = new Array(0,0,0);
for(var i = 1, len = elist.length; len > i; i++)
  {
  var link = elist[i].cells[0].cloneNode(true);
  link.getElementsByTagName('a')[0].href = link.getElementsByTagName('a')[0].href.replace(/overview/,'market');
  var strString = typeof(elist[i].cells[2].innerText)=='undefined'?elist[i].cells[2].textContent:elist[i].cells[2].innerText;
  var arrResources = strString.match(/\b(\d+\.?\d*)\b/gim).map(function(varValue,idx1,arrParam){return parseInt( varValue.replace(/\./,''));});
  var bad = getBad(arrResources,toleranz);
  if(bad[0] != -1)
    {
    total[bad[1]]+=bad[0];
    result.push(new Array(link,'red',( Math.round(Math.round(bad[0])/1000) )+ 'k' + ' '+ton[bad[1]]+' '+ton[3]));
    }
  else
    result.push(new Array(link,'green',ton[4]));
  }

var div = document.createElement('div');
div.id = 'results_dialog';
div.style.zIndex = 21;
div.style.position = 'absolute';
div.style.top = '20px';
div.style.left = GM_getValue(world+'window_left');
div.style.minHeight = '50px';
div.style.minWidth = '150px';
div.style.background = 'url(graphic/background/main.jpg) #F1EBDD';
div.style.border = '3px outset #804000';
div.style.borderTopColor = '#A0A0A0';


// Titlebar
var title = dom.n('div');
title.id = 'dialog_statusbar';
title.style.color = 'white';
title.style.background = '#A0A0A0';
title.style.zIndex = 22;
title.style.textAlign = 'center';
title.style.fontFamily = 'Verdana,sans-serif';

title.appendChild(dom.text(ton[5]));

var img = new Image();
img.src = 'http://www.c1b1.de/close.png';
img.alt = ton[12];
img.title = ton[12];
img.style.position = 'absolute';
img.style.left = '0px';
img.style.top = '0px';
dom.addEvent(img,'click',function() { dom.id('results_dialog').parentNode.removeChild(dom.id('results_dialog')); });
title.appendChild(img);

// Content
var cont = document.createElement('table');

var tr = document.createElement('tr');

var th = document.createElement('th');
th.appendChild(document.createTextNode(ton[6]));
tr.appendChild(th);

var th = document.createElement('th');
th.appendChild(document.createTextNode(ton[7]));
tr.appendChild(th);
cont.appendChild(tr);

for(var i = 0, len = result.length; len > i; i++)
  {
  var tr = document.createElement('tr');

  var td = document.createElement('td');
  td.appendChild(result[i][0]);
  tr.appendChild(td);

  var td = document.createElement('td');
  td.appendChild(document.createTextNode(result[i][2]));
  td.setAttribute('style','color:'+result[i][1]+';');
  tr.appendChild(td);

  cont.appendChild(tr);
  }

var tr = document.createElement('tr');
var td = document.createElement('td');
td.appendChild(document.createTextNode(ton[9]+' '+ton[0]));
tr.appendChild(td);
var td = document.createElement('td');
td.appendChild(document.createTextNode(Math.round(total[0]/1000)+'k'));
tr.appendChild(td);
cont.appendChild(tr);

var tr = document.createElement('tr');
var td = document.createElement('td');
td.appendChild(document.createTextNode(ton[9]+' '+ton[1]));
tr.appendChild(td);
var td = document.createElement('td');
td.appendChild(document.createTextNode(Math.round(total[1]/1000)+'k'));
tr.appendChild(td);
cont.appendChild(tr);

var tr = document.createElement('tr');
var td = document.createElement('td');
td.appendChild(document.createTextNode(ton[9]+' '+ton[2]));
tr.appendChild(td);
var td = document.createElement('td');
td.appendChild(document.createTextNode(Math.round(total[2]/1000)+'k'));
tr.appendChild(td);
cont.appendChild(tr);

// Settings Button
var setB = dom.n('input');
setB.setAttribute('value',ton[10]);
setB.setAttribute('type','button');
dom.addEvent(setB,'click',function() { settings(); });

div.appendChild(title);
div.appendChild(cont);
div.appendChild(setB);
document.getElementById('ds_body').appendChild(div);
}

function settings()
  {
  var div = dom.id('results_dialog');
  dom.removeChilds(div);

  // Titlebar
  var title = dom.n('div');
  title.id = 'dialog_statusbar';
  title.style.color = 'white';
  title.style.background = '#A0A0A0';
  title.style.zIndex = 22;
  title.style.textAlign = 'center';
  title.style.fontFamily = 'Verdana,sans-serif';

  title.appendChild(dom.text(ton[10]));

  var img = new Image();
  img.src = 'http://www.c1b1.de/close.png';
  img.alt = ton[12];
  img.title = ton[12];
  img.style.position = 'absolute';
  img.style.left = '0px';
  img.style.top = '0px';
  dom.addEvent(img,'click',function() { dom.id('results_dialog').parentNode.removeChild(dom.id('results_dialog')); });
  title.appendChild(img);


  // Save Button
  var saveB = dom.n('input');
  saveB.setAttribute('value',ton[11]);
  saveB.setAttribute('type','button');
  dom.addEvent(saveB,'click',save_settings);

  // Cancel Button
  var cancelB = dom.n('input');
  cancelB.setAttribute('value',ton[12]);
  cancelB.setAttribute('type','button');
  dom.addEvent(cancelB,'click',function() { dom.id('results_dialog').parentNode.removeChild(dom.id('results_dialog')); });

  // Content
  var cont = dom.n('table');


  // Begin:Result
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[5] + ' ' + ton[19]));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_result_loc');
  if(GM_getValue(world+'result_loc') == 'window')
    input.setAttribute('checked','checked');
  input.setAttribute('disabled','disabled');

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);

  cont.appendChild(tr);
  // End:Result

  // Begin:Window left
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[19]+ton[20]));
  tr.appendChild(td);

  var input = dom.n('input');
  input.type = 'text';
  input.id = 'i_window_left';
  input.value = GM_getValue(world+'window_left');

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);

  cont.appendChild(tr);
  // End:Window left


  // Begin:Margin
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[16]));
  tr.appendChild(td);

  var input = dom.n('input');
  input.type = 'text';
  input.id = 'i_margin';
  input.value = GM_getValue(world+'margin');

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);

  cont.appendChild(tr);
  // End:Margin

  // Begin:Quickbar
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[13]));
  tr.appendChild(td);


  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('id','i_quickbar');
  if(GM_getValue(world+'quickbar'))
    input.setAttribute('checked','checked');
  dom.addEvent(input,'click',function()
    {
    if(this.checked)
      {
      dom.id('i_quickbar_name').removeAttribute('disabled',1);
      dom.id('i_quickbar_img').removeAttribute('disabled',1);
      }
    else
      {
      dom.id('i_quickbar_name').setAttribute('disabled','disabled');
      dom.id('i_quickbar_img').setAttribute('disabled','disabled');
      }
    });

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);
  cont.appendChild(tr);
  // End:Quickbar

  // Begin:Quickbar Name
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[15] + ' ('+ton[13]+')'));
  tr.appendChild(td);

  var input = dom.n('input');
  input.type = 'text';
  input.id = 'i_quickbar_name';
  input.value = GM_getValue(world+'quickbar_name');
  if(!GM_getValue(world+'quickbar'))
    input.setAttribute('disabled','disabled');


  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);

  cont.appendChild(tr);
  // End:Quickbar Name

  // Begin:Quickbar Image
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text(ton[14] + ' ('+ton[13]+')'));
  tr.appendChild(td);

  var input = dom.n('input');
  input.type = 'text';
  input.id = 'i_quickbar_img';
  input.value = GM_getValue(world+'quickbar_img');
  if(!GM_getValue(world+'quickbar'))
    input.setAttribute('disabled','disabled');

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);

  cont.appendChild(tr);
  // End:Quickbar Image


  var tr = dom.n('tr');
  var td = dom.n('td');
  var a = dom.n('a');
  a.href = '#';
  a.appendChild(dom.text('About me'));
  dom.addEvent(a,'click',function()
    {
    alert('DS PA Rohstoffvergleich bei Produktionsübersicht\n\n(c) by C1B1SE 2008\n\n\tinfo@c1b1.de\n\thttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\n\nThis script may be forbidden in TribalWars or DieStämme.\nPlease look in the respective forum for further information!\n\nThread: http://forum.die-staemme.de/showthread.php?t=93904'); });
  td.appendChild(a);
  tr.appendChild(td);
  cont.appendChild(tr);


  div.appendChild(title);
  div.appendChild(cont);
  div.appendChild(saveB);
  div.appendChild(cancelB);
  }

function save_settings()
  {

  var margin = parseInt(dom.id('i_margin').value);
  GM_setValue(world+'margin',margin);

  var window_left = dom.id('i_window_left').value;
  GM_setValue(world+'window_left',window_left);


  var quickbar = dom.id('i_quickbar');
  if(quickbar.checked)
    {
    GM_setValue(world+'quickbar',true);
    GM_setValue(world+'quickbar_name',dom.id('i_quickbar_name').value);
    GM_setValue(world+'quickbar_img',dom.id('i_quickbar_img').value);
    }
  else
    {
    GM_setValue(world+'quickbar',false);
    }

  alert('Gespeichert!');
  dom.id('results_dialog').parentNode.removeChild(dom.id('results_dialog'));
  document.location.reload();

  }


function quickbar()
  {
  var li = dom.n('li');

  var a = dom.n('a');
  a.setAttribute('href','#');
  dom.addEvent(a,'click',compare);

  var img = new Image();
  img.setAttribute('src',GM_getValue(world+'quickbar_img'));
  img.setAttribute('alt',GM_getValue(world+'quickbar_name'));

  a.appendChild(img);
  a.appendChild(dom.text(GM_getValue(world+'quickbar_name')));
  li.appendChild(a);

  dom.class('menu nowrap quickbar')[0].appendChild(li);
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



