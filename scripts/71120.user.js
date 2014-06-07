// ==UserScript==
// @name          tribalwars.ae-TurkiAnd plapl
// @namespace     c1b1.de
// @include       http://*.tribalwars.*/game.php?*screen=report*view=*
// @include       http://*.tribalwars.*/game.php?*screen=place*mode=command*insertU=*
// ==/UserScript==

// ds.spying2Form.user.js

// screenshot: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.spying2Form_0.png

// Translated by BeNnOo.

/*
DS aus Berichten farmen

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
var units = eval({
  'spear':[25,'graphic/unit/unit_spear.png','مقاتل الرمح'],
  'sword':[15,'graphic/unit/unit_sword.png','مقاتل السيف'],
  'axe':[10,'graphic/unit/unit_axe.png','مقاتل الفأس'],
  'archer':[10,'graphic/unit/unit_archer.png','رماة الأسهم'],
  'light':[80,'graphic/unit/unit_light.png','فارس خفيف'],
  'marcher':[50,'graphic/unit/unit_marcher.png','فارس قوس'],
  'heavy':[50,'graphic/unit/unit_heavy.png','فارس ثقيل']
  });

if(document.location.href.indexOf('screen=report') != -1)
  {
  var opera = window.opera?true:false;
  var spying = findByInner(document,'التجسس');
  var table = getNextElement(spying[0],'table');
  var ct = document.location.href.split('village')[1].split('&')[0].substr(1);

  var village = findByInner(table.parentNode,'القرية:')[1].nextSibling.firstChild.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');
  village[0] = village[0].substr(1);
  village[1] = village[1].substr(0,village[1].length - 1);

  // is spying report:
  if(table)
    {
    var res = grabText(table.getElementsByTagName('tr')[0].firstChild.nextSibling,1).split(' ');
    res = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]);
    requiredUs(show);
    };
  }
else
  {
  var parameter = document.location.href.split('=').pop().split(',');
  findByAttr(document,'name',parameter[3])[0].value = parameter[0];
  findByAttr(document,'name','x')[0].value = parameter[1];
  findByAttr(document,'name','y')[0].value = parameter[2];
  //findByAttr(document,'name','attack')[0].click();
  }


  function requiredUs(u)
    {
    var walks = Math.ceil(res / units[u][0]);

    var img = new Image();
    with(img) {
      src = units[u][1];
      alt = ''; }
    var span = document.createElement('span');
    with(span) {
      appendChild(document.createTextNode('مجموع الموارد('+Math.floor(res/1000) + '.' +  res.toString(10).substr(-3)+')العدد المطلوب من الجيش -->' + walks + ' '));
      appendChild(img);
      appendChild(document.createTextNode(''));
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

    var a = document.createElement('a');
    a.setAttribute('href','game.php?village='+ct+'&screen=place&mode=command&insertU='+walks+','+village[0]+','+village[1]+','+u);
    a.appendChild(document.createTextNode('الهجوم على القريه الان'));

    var close = new Image();
    with(close) {
      src = 'http://www.c1b1.de/close.png';
      alt = 'Close';
      title = 'اغلاق الصفحه';
      addEventListener('click',function() {document.getElementById('farm_script_table').parentNode.removeChild(document.getElementById('farm_script_table')); },false);
      }

    var ta = document.createElement('table');
    ta.setAttribute('id','farm_script_table');
    ta.setAttribute('style','border: 1px solid #DED3B9');
    ta.setAttribute('width','100%');

    var th = document.createElement('th');
    th.setAttribute('style','white-space:nowrap; vertical-align:middle; ');
    th.appendChild(document.createTextNode('المطلوب من القوات للنهب:'));
    th.appendChild(close);

    var td = document.createElement('td');
    td.setAttribute('colspan',3);
    td.appendChild(span);
    td.appendChild(a);
    td.appendChild(document.createElement('br'));
    td.appendChild(select);

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