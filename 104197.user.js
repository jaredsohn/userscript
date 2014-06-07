// ==UserScript==
// @name                 AE/TW Bashpoints in Reports by TAKI007 C.Z
// @version              1.5
// @author               2010 - 2011 by TAKI007 C.Z
// @copyright            2010 - 2011 by TAKI007 C.Z
// @license              No Distribution!
// @description          Adds a line with bashpoints to reports; Fügt eine Zeile mit Bashpunkten in Berichten hinzu
// @include              http://de*.die-staemme.de/game.php*screen=report*mode=all*view=*
// @include              http://ch*.die-staemme.ch/game.php*screen=report*mode=all*view=*
// @include              http://en*.tribalwars.net/game.php*screen=report*mode=all*view=*
// @include              http://ae*.tribalwars.ae/game.php*screen=report*mode=all*view=*
// @include              http://ae*.tribalwars.ae/game.php?village=*screen=report*mode=all*view=*
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

(c) 2010 - 2011 by TAKI007 C.Z
        

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
    if(type == 'هجوم')
      return 1;
  return 0;
  }

// Bashpoints
const unit_points =
  {            //  دفاع   هجوم   الوزن
  'مقاتل رمح'     :  [   4,    1,    1],
  'مقاتل سيف'     :  [   5,    2,    1],
  'مقاتل فاس'       :  [   1,    4,    1],
  'رامي اسهم'    :  [   5,    2,    1],
  'كشافة'       :  [   1,    2,    2],
  'فارس سهام'     :  [   5,   13,    4],
  'فارس سهام'   :  [   6,   12,    5],
  'فارس ثقيل'     :  [  23,   15,    6],
  'محطمة ابواب'       :  [   4,    8,    5],
  'مقلاع'  :  [  12,   10,    8],
  'قائد الفرسان'    :  [  40,   20,   10],
  'نبيل'    :  [   0,    0,  100],
  'snob'      :  [ 200,  200,  100],
  'ميليشيا'   :  [   4,    0,    0],  
  };

var هجومacker_table = $('#هجومack_info_هجوم_units');
var دفاعender_table = $('#هجومack_info_دفاع_units');

// Get Units
var units = new Array('فارغ');
var elist = دفاعender_table.getElementsByTagName('tr')[0].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  // graphic/unit/unit_مقاتل رمح.png?1
  var unit = elist[i].getElementsByTagName('img')[0].getهجومribute('src').match(/_(.+).png/)[1];
  units.push(unit);
  };
  
 
// Get هجومacker's Lost Units
var index = GTFW('هجوم');
var هجومackers_points = 0;
var elist = هجومacker_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  var unit_هجوم_lost = parseInt(elist[i].firstChild.data);
  هجومackers_points += unit_هجوم_lost * unit_points[units[i]][index];
  };

// Get دفاعender's Lost Units
if(دفاعender_table)
  {
  var index = GTFW('دفاع');
  var دفاعender_points = 0;
  var elist = دفاعender_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
  for(var i = 1; i < elist.length; i++)
    {
    var unit_دفاع_lost = parseInt(elist[i].firstChild.data);
    دفاعender_points += unit_دفاع_lost * unit_points[units[i]][index];
    };

  // Insert دفاعender Points
  var tr0 = document.createElement('tr');
  var td0 = document.createElement('td');
  td0.setهجومribute('colspan','2');
  td0.appendChild(document.createTextNode('نقاط المدافع: '+stringInt(دفاعender_points)));
  tr0.appendChild(td0);
  دفاعender_table.$('tbody')[0].appendChild(tr0);
  }
if($('#هجومack_info_دفاع').$('th')[1].firstChild.nodeValue != '---') // If village not فارغ
  {
  // Insert هجومacker Points
  var tr1 = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.setهجومribute('colspan','2');
  td1.appendChild(document.createTextNode('نقاط المهاجم: '+stringInt(هجومackers_points)));
  tr1.appendChild(td1);
  هجومacker_table.$('tbody')[0].appendChild(tr1);
  }
  
var div0,div1;
var id = window.setInterval(fixPosition,500);
  
function fixPosition() {  
 
if(tr0) {
  دفاعender_table.$('tbody')[0].appendChild(tr0);

  var tr0_pos = [rel_left(tr0),rel_top(tr0)];  
  
  $('#هجومack_info_دفاع_units').style.marginBottom = '18px';
  
  if(!div0)
  div0 = $('$div',{
    styles:{
      position : 'absolute',
	  left : tr0_pos[0]+'px',
	  top : tr0_pos[1]+'px'
	  },
    html : td0.innerHTML,
	append : document.body
	});
	
  $('$d:',tr0);
  }
if(tr1) {
  هجومacker_table.$('tbody')[0].appendChild(tr1);

  var tr1_pos = [rel_left(tr1),rel_top(tr1)]; 
  
  $('#هجومack_info_هجوم_units').style.marginBottom = '18px'; 
  
  if(!div1)	
  div1 = $('$n:div',{
    styles:{
      position : 'absolute',
	  left : tr1_pos[0]+'px',
	  top : tr1_pos[1]+'px'
	  },
    html : td1.innerHTML,
	append : document.body
	}); 
		
  $('$d:',tr1);
  }  
}  
  
function rel_top(e)
  {
  var y = 0;
  while(e)
    y += e.offsetTop + e.clientTop,e = e.offsetParent;
  return y;
  }
function rel_left(e)
  {
  var x = 0;
  while(e)
    x += e.offsetLeft + e.clientLeft,e = e.offsetParent;
  return x;
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
function $(x,data) {
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
  else if(x == '$d:') {
    var r = data;
	r.parentNode.removeChild(r);
	r.$ = $;
    return r;
    }	
  else if(x[0] == '$' || x.substring(0,3) == '$n:') {
    if(x.substring(0,3) == '$n:')
	  x = x.substring(2);

    var r = document.createElement(x.substring(1));
	if(data && typeof(data) == 'object') {
	  for (var هجومr in data) {
	    if(هجومr == 'styles') {
		  if(!r.style)
		    r.setهجومribute('style','');
		  for (var key in data[هجومr]) {
		    r.style[key] = data[هجومr][key];		    		  
		    }	      
		  }	
	    else if(هجومr == 'html') {
		  r.innerHTML = data[هجومr];	      
		  }	
	    else if(هجومr == 'append') {
		  data[هجومr].appendChild(r);	      
		  }			  
		else {
		  r.setهجومribute(هجومr,data[هجومr]) 
          }			 
        }
	  }
    r.$ = $;
    return r;
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