// ==UserScript==
// @name          DS Zeige Rückkehr bei Angriffen
// @version       1.8.1
// @author        Samuel Essig (http://c1b1.de)
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2008 - 2010, Samuel Essig (http://c1b1.de)
// @license       No Distribution!
// @description   Zeigt im Versammlungsplatz und bei Befehlen die Rückkehrzeit an. Für die Anzeige im Versammlungsplatz muss der Befehl vorher besucht werden, damit die Daten eingelesen werden können.
// @include       http://*.*staemme.*/*screen=info_command*
// @include       http://*.*staemme.*/*screen=place*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

// ds.showReturnTimeOnCommands.user.js

/*
Version 1.8.1

DS Zeige Rückkehr bei Angriffen

(c) 2008 - 2010 by  Samuel Essig
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

For further information on translations of scripts write me a mail:
info@c1b1.de
Or contact me via the "DS Forum" http://forum.die-staemme.de, username:
C1B1SE

Uploaded @ http://userscripts.org/scripts/show/40233
DS Forum Thread @ http://forum.die-staemme.de/showthread.php?t=89196


Description:
------------

Zeigt im Versammlungsplatz und bei Befehlen die Rückkehrzeit an.
Für die Anzeige im Versammlungsplatz muss der Befehl vorher besucht werden, damit die Daten eingelesen werden können.

screenshot[0]: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.showReturnTimeOnCommands_0.png
screenshot[1]: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.showReturnTimeOnCommands_1.png
screenshot[1]: http://s3.amazonaws.com/uso_ss/346/large.png?1244376597


History:
--------

Version 1.8.1:
 - Update für DS Version 6.0


Version 1.8:
 - Rückkehrzeit wird nur noch bei Angriffen angezeigt (die noch nicht zurücklaufen)
 - Angriffe, Unterstützungen und zurückkehrende Befehle können farbig hervorgehoben werden (siehe "Script"-Einstellungen)


Version 1.7.3:
 - Rückkehrzeit bei Abrruch hinzugefügt, bisher aber noch ungenau!


Version 1.7.2:
 - Besser Synchronisierung mit der DS Serverzeit und auch PA läuft die Zeit jetzt nach DS Serverzeit

Version 1.7.1:
 - Bei non-PA läuft die Zeit bei der Befehlbestätigung nach der
   DS Serverzeit (unten rechts) und fängt damit nicht bei :00 Sekunden
   an

Version 1.7:
 - Befehlbestätigung bei PA laufen korrekt

Version 1.6:
 - Exception bei non-PA entfernt

Version 1.5:
 - Anzeigen auf der Befehlbestätigung laufen mit der Uhr

Version 1.4:
 - Interface zum löschen des Speichers

Version 1.3:
 - Update für DS Version 5.0
 - Anzeige auch auf der Befehlbestätigung

Version 1.2:
 - Voranstehende Null bei einstelligem Datum
 - Kleine Codeverbesserung (schneller)

Version 1.1:
 - Auch Angriffe die älter als 10 Minuten sind, werden eingelesen

*/

const version = '1.8.1';


const world = document.location.href.split('.')[0].split(/\/\/(\D+)\d+/)[1] + document.location.href.split('.').shift().split('de').pop();

var d = new html();


var arrival = false;
var c_arrival = false;
var treturn = false;
var c_treturn = false;

var x = false;


var canceling = false;
var duration_secs = 0;

var stat_now_obj = new Date();

function countUpSecs()
  {
  c_arrival.setTime(c_arrival.getTime() + 1000);
  d.id('date_arrival').replaceChild( d.text(parseDateWW(c_arrival,true)) , d.id('date_arrival').firstChild);
  if(treturn)
    {
    c_treturn.setTime(c_treturn.getTime() + 1000);
    d.id('date_return').replaceChild( d.text(parseDateWW(c_treturn,true)) , d.id('date_return').firstChild);
    }
  }


function countCanceling()
  {
  if(canceling)
    {
    // Add one second
    duration_secs++;

    // No cancel after 600 seconds
    if(duration_secs > 600)
      {
      canceling = false;
      document.location.reload(true);
      }

    // Create Timestring
    var obj = new Date();
    obj.setTime(stat_now_obj.getTime()+(duration_secs*1000));
    var text = (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());

    // Remove old node
    var brokeUpReturn = document.getElementById('brokeUpReturn');
    brokeUpReturn.removeChild(brokeUpReturn.firstChild);

    // Add timestring to DOM
    brokeUpReturn.appendChild(d.text(text + ' Uhr (Beta! noch ungenau!)' ));

    }
  }



function init()
  {
  // Get Arrival
  arrival = d.id('date_arrival');
  var table_body = arrival.parentNode.parentNode;
  arrival = arrival.firstChild.data;

  var x  = new Date();

  // Create Date Object
  var now = new Date();

  var string = arrival;

  if(string.match(/(\d+):(\d+):(\d+) Uhr/) != null)      // PA
    {
    // Premium Account => 15:48:13 Uhr
    var time = string.match(/(\d+):(\d+):(\d+) Uhr/);    // Extract Time

    if(time[1][0] == '0')
      var hours = parseInt(time[1][1]);
    else
      var hours = parseInt(time[1]);

    if(time[2][0] == '0')
    var minutes = parseInt(time[2][1]);
    else
      var minutes = parseInt(time[2]);

    if(time[3][0] == '0')
    var seconds = parseInt(time[3][1]);
    else
      var seconds = parseInt(time[3]);
    }
  else    // Non-PA
    {
    // NOPremium Account => 15:48 Uhr
    var time = string.match(/(\d+):(\d+) Uhr/);    // Extract Time

    if(time[1][0] == '0')
      var hours = parseInt(time[1][1]);
    else
      var hours = parseInt(time[1]);

    if(time[2][0] == '0')
    var minutes = parseInt(time[2][1]);
    else
      var minutes = parseInt(time[2]);

    var seconds = 0;
    }

  if(string.indexOf('heute') != -1)
    {
    // today
    var days = now.getDate();
    var months = now.getMonth();
    }
  else if(string.indexOf('morgen') != -1)
    {
    // tomorrow
    var days = now.getDate()+1;
    var months = now.getMonth();
    }
  else
    {
    var date = string.match(/(\d+)\.(\d+)\./);    // Extract Date  09.06.
    if(date[1][0] == '0')
      var days = parseInt(date[1][1]);
    else
      var days = parseInt(date[1]);

    if(date[2][0] == '0')
      var months = parseInt(date[2][1]) -1;
    else
      var months = parseInt(date[2]) -1;
    }


  var servertime = d.id('serverTime').firstChild.nodeValue.split(':');
  var duration = d.id('date_arrival').parentNode.previousElementSibling.getElementsByTagName('td')[1].firstChild.nodeValue;
  arrival = new Date();
  arrival.setHours(servertime[0]);
  arrival.setMinutes(servertime[1]);
  arrival.setSeconds(servertime[2]);
  var arrival_timestamp = arrival.getTime();
  // Add duration
  var splinters = duration.split(':');
  d.array_walk(splinters,function (value,key) { splinters[key] = eval(value); } );
  arrival_timestamp += splinters[2]*1000;
  arrival_timestamp += (splinters[1]*60*1000);
  arrival_timestamp += (splinters[0]*60*60*1000);
  arrival.setTime(arrival_timestamp);


  c_arrival = arrival;


  //OLD 1.7.1: x = window.setInterval(countUpSecs, 1000);

  d.id('serverTime').addEventListener('DOMSubtreeModified',countUpSecs,false);
  }


if(document.location.href.indexOf('screen=info_command') != -1)
  {
  if(d.tag('h2')[0].firstChild.data.indexOf('ckkehr vo ') == -1)
    {
    // Get Arrival
    table_body = d.id('edit').parentNode.parentNode.parentNode;

    var arrival_node = d.findByInner(table_body,'Akunft:')[0];
    arrival = arrival_node.parentNode.getElementsByTagName('td')[1].firstChild.data
    if(arrival_node.parentNode.getElementsByTagName('td')[1].getElementsByTagName('span')[0])
      arrival += arrival_node.parentNode.getElementsByTagName('td')[1].getElementsByTagName('span')[0].firstChild.data;
    else
      arrival += ':000';

    // Get Duration
    var duration = d.findByInner(table_body,'Dur:')[0];
    duration = duration.parentNode.getElementsByTagName('td')[1].firstChild.data;

    // Create Date Object
    // Current format: 27.10.08 14:09:28:000
    var obj = new Date();

    var string = arrival;
    string = string.split(' ');
    date = string[0].split('.');
    time = string[1].split(':');

    obj.setMonth(date[1]-1);
    obj.setDate(date[0]);
    obj.setFullYear('20'+date[2]);

    obj.setHours(time[0]);
    obj.setMinutes(time[1]);
    obj.setSeconds(time[2]);
    obj.setMilliseconds(time[3]);

    arrival_timestamp = parseInt(obj.getTime() / 1000);

    // Add duration
    var splinters = duration.split(':');
    d.array_walk(splinters,function (value,key) { splinters[key] = eval(value); } );

    arrival_timestamp += splinters[2];
    arrival_timestamp += (splinters[1]*60);
    arrival_timestamp += (splinters[0]*60*60);

    //arrival_timestamp -= 60*60;  // Time lag?!

    obj.setTime(arrival_timestamp * 1000);

    // Create Table Row

    var tr = d.n('tr');

    var td1 = d.n('td');
    td1.setAttribute('colspan',2);
    td1.appendChild(d.text('R'+unescape('%FC')+'ckkehr:'));

    var td2 = d.n('td');

    td2.appendChild(d.text(  (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds()) ));

    d.appendChilds(tr,td1,td2);

    d.findByInner(table_body,'Akunft:')[0].parentNode.parentNode.insertBefore(tr,d.findByInner(table_body,'Akunft:')[0].parentNode.nextSibling.nextSibling.nextSibling);


    // ID
    var tmp_url = document.location.href;
    // http://de33.die-staemme.de/game.php?village=30228&screen=info_command&id=566044&type=own
    var id = tmp_url.split('&')[2].split('=')[1];

    GM_setValue(world+'_'+id,arrival_timestamp);

    if(document.location.href.indexOf('type=own') != -1)
      {

      if(d.findByInner(table_body,'abbräche')[0])
        {

        // Sent Date:
        // Ankunft - Dauer - Ankunft in

        var duration_seconds = 0;

        //  duration
        var splinters = duration.split(':');
        d.array_walk(splinters,function (value,key) { splinters[key] = eval(value); } );

        duration_seconds += splinters[2];
        duration_seconds += (splinters[1]*60);
        duration_seconds += (splinters[0]*60*60);


        var tr = d.n('tr');

        var td1 = d.n('td');
        td1.setAttribute('colspan',2);
        td1.appendChild(d.text('R'+unescape('%FC')+'ckkehr bei Abbruch:'));

        var td2 = d.n('td');

        td2.appendChild(d.text(' '));
        td2.setAttribute('id','brokeUpReturn');

        d.appendChilds(tr,td1,td2);

        d.findByInner(table_body,'Akunft:')[0].parentNode.parentNode.insertBefore(tr,d.findByInner(table_body,'Akunft:')[0].parentNode.nextSibling.nextSibling.nextSibling.nextSibling);

    //  - comein
    var comein = document.getElementsByClassName('timer')[0].firstChild.nodeValue;

    var splinters = comein.split(':');
    d.array_walk(splinters,function (value,key) { splinters[key] = eval(value); } );

    duration_seconds -= splinters[2];
    duration_seconds -= (splinters[1]*60);
    duration_seconds -= (splinters[0]*60*60);



        duration_secs = duration_seconds;
        canceling = true;
        document.getElementsByClassName('timer')[0].addEventListener('DOMSubtreeModified',countCanceling,false);
        }

      }
    }
  }

else if(document.location.href.indexOf('screen=place') != -1 && document.location.href.indexOf('try=confirm') != -1)
  {

  init();

  var table_body = d.id('date_arrival').parentNode.parentNode;

  var obj = new Date(arrival.getTime());

  arrival_timestamp = parseInt(obj.getTime() / 1000);


  // Get Duration
  var duration = d.findByInner(table_body,'Dur:')[0];
  duration = duration.parentNode.getElementsByTagName('td')[1].firstChild.data;

  // Add duration
  var splinters = duration.split(':');
  d.array_walk(splinters,function (value,key) { splinters[key] = eval(value); } );

  arrival_timestamp += splinters[2];
  arrival_timestamp += (splinters[1]*60);
  arrival_timestamp += (splinters[0]*60*60);

  obj.setTime(arrival_timestamp * 1000);

  treturn = new Date(obj.getTime());
  c_treturn = treturn;

  var tr = d.n('tr');

  var td1 = d.n('td');
  td1.appendChild(d.text('R'+unescape('%FC')+'ckkehr:'));

  var td2 = d.n('td');
  td2.setAttribute('id','date_return');
  td2.appendChild(d.text( parseDateWW(obj) ));

  d.appendChilds(tr,td1,td2);

  d.id('date_arrival').parentNode.parentNode.insertBefore(tr,d.id('date_arrival').parentNode.nextSibling);

  }

else if(document.location.href.indexOf('screen=place') != -1)
  {
  var coloring_active = GM_getValue(world+'_coloring_active',false);

  if(coloring_active)
    {
    GM_addStyle('\
      tr.attack_red_tr td { background:'+GM_getValue(world+'_attack_color','#FAD2D2')+'; }\
      tr.support_green_tr td { background:'+GM_getValue(world+'_support_color','#90EE90')+'; }\
      tr.returning_blue_tr td { background:'+GM_getValue(world+'_returning_color','#E0FFFF')+'; }\
      ');
    }


  var a1 = d.n('a');
  a1.setAttribute('href','#');
  d.addEvent(a1,'click',function(){ settings(); });
  a1.appendChild(d.text('Script'));

  createMenuEntry(a1);

  var pa = d.findByInner(d.tag('body')[0],'Usgehendi Truppe')[0];
  var nonpa = d.findByInner(d.tag('body')[0],'Dini Truppe')[0];

  if(pa || nonpa)
    {
    if(pa)
      var table = pa.parentNode.parentNode;
    else
      var table = nonpa.parentNode.parentNode;

    var elist = table.getElementsByTagName('tr');

    var th = d.n('th');
    th.width = 160;
    th.appendChild(d.text('R'+unescape('%FC')+'ckkehr:'));

    elist[0].insertBefore(th,elist[0].getElementsByTagName('th')[2]);


    for(var i = 1; i < elist.length; i++)
      {
      var a = elist[i].getElementsByTagName('a')[0];
      var tmp_url = a.href;
      var img = a.getElementsByTagName('img')[0];
      if(img && (img.src.indexOf('attack.png') != -1 || img.src.indexOf('support.png') != -1))
        {
        if(coloring_active)
          {
          if(img.src.indexOf('attack.png') != -1)
            {
            a.parentNode.parentNode.parentNode.setAttribute('class','attack_red_tr');
            }
          else if(img.src.indexOf('support.png') != -1)
            {
            a.parentNode.parentNode.parentNode.setAttribute('class','support_green_tr');
            }
          }


        // http://de33.die-staemme.de/game.php?village=30228&screen=info_command&id=491942&type=own
        var id = tmp_url.split('&')[2].split('=')[1];

        if(GM_getValue(world+'_'+id) != undefined)
          {
          var obj = new Date();
          var now= new Date();

          obj.setTime(GM_getValue(world+'_'+id) * 1000);
          if((obj.getDate() + '.' + obj.getMonth()) == (now.getDate() + '.' + now.getMonth()))
            var time_string = 'heute um ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds()) + ' Uhr';
          else
            var time_string =  (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' +  ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());

          var td = d.n('td');
          td.appendChild(d.text( time_string ));

          elist[i].insertBefore(td,elist[i].getElementsByTagName('td')[2]);
          }
        else
          {
          var td = d.n('td');
          td.appendChild(d.text('Nicht eingelesen'));
          elist[i].insertBefore(td,elist[i].getElementsByTagName('td')[2]);
          }
        }
      else
        {
        if(coloring_active)
          {
            a.parentNode.parentNode.parentNode.setAttribute('class','returning_blue_tr');
          }

        var td = d.n('td');
        td.appendChild(d.text(' '));
        elist[i].insertBefore(td,elist[i].getElementsByTagName('td')[2]);
        }
      }
    }
  }



function parseDateWW(obj,secs)
  {
  var now = new Date();
  if(!secs)
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());
    }
  else
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds() + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds()));
    }
  }


function settings()
  {
  var arr = GM_listValues();
  var arrlen = arr.length;
  var len = 0;
  for(var i = 0; i < arrlen; i++)
    {
    if(arr[i])
      {
      if(arr[i].match(/_\d+/))
        {
        len++;
        }
      }
    }


  if(len > 500)
    {
    var color = '#FF3200';
    var px = 98;
    var message = 'Der Speicher sollte geleert werden';
    }
  else if(len > 250)
    {
    var color = '#FF8A00';
    var px = 50;
    var message = 'Der Speicher kann geleert werden, um eine bessere Performance zu erreichen';
    }
  else if(len == 0)
    {
    var color = '#33D629';
    var px = 0;
    var message = 'Der Speicher ist leer';
    }
  else
    {
    var color = '#33D629';
    var px = 10;
    var message = 'Der Speicher muss nicht geleert werden';
    }

  var div1 = d.n('div');
  div1.setAttribute('style','background-color:silver; width:100px; height:10px; ');

  var div2 = d.n('div');
  div2.setAttribute('style','background-color:'+color+'; width:'+px+'px; height:10px; ');
  div2.setAttribute('id','showReturnTimeOnCommands_clear_date_click_memory');
  div1.appendChild(div2);

  var messa = d.n('span');
  messa.setAttribute('style','font-weight:bold; '+(px==100?('color: '+color+';'):''));
  messa.setAttribute('id','showReturnTimeOnCommands_clear_date_click_messa');
  messa.appendChild(d.text(message));

  var entries = d.n('span');
  entries.setAttribute('id','showReturnTimeOnCommands_clear_date_click_entries');
  entries.appendChild(d.text(len));


  var text = d.n('div');

  text.appendChild(messa);
  text.appendChild(d.n('br'));
  text.appendChild(d.n('br'));
  text.appendChild(div1);
  text.appendChild(d.text('Eintr'+unescape('%E4')+'ge im Speicher: '));
  text.appendChild(entries);

  window.scrollTo(0, 0);
  if(d.id('showReturnTimeOnCommands_clear_date_click'))
    {
    d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click'));
    return false;
    }

  if(len == 0)
    {
    var input0 = d.n('input');
    input0.setAttribute('type','button');
    input0.setAttribute('value','Schlie'+unescape('%DF')+'en');
    input0.setAttribute('style','margin-left:5px; ')
    input0.addEventListener('click',function(){d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click'));},false);
    }
  else
    {
    var input0 = d.n('input');
    input0.setAttribute('type','button');
    input0.setAttribute('value','Leeren');
    input0.setAttribute('id','showReturnTimeOnCommands_clear_date_click_clear_button');
    input0.setAttribute('style','margin-left:5px; ')
    input0.addEventListener('click',clear_date,false);
    }

  var input1 = d.n('input');
  input1.setAttribute('type','button');
  input1.setAttribute('value','Abbrechen');
  input1.addEventListener('click',function(){d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click'));},false);


  var table = d.n('table');

  var tr = d.n('tr');
  var th = d.n('th');
  tr.appendChild(th);
  table.appendChild(tr);
  th.setAttribute('colspan',2);
  th.appendChild(d.text('Einstellungen:'));

  var tr = d.n('tr');
  var td1 = d.n('td');
  var td2 = d.n('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var input_checkbox_coloring = d.n('input');
  input_checkbox_coloring.setAttribute('type','checkbox');
  input_checkbox_coloring.setAttribute('value','true');
  input_checkbox_coloring.setAttribute('id','coloring_active');
  if(GM_getValue(world+'_coloring_active',false))
    input_checkbox_coloring.setAttribute('checked','checked');
  td1.appendChild(input_checkbox_coloring);
  td2.appendChild(d.text('Truppenbewegungen einfärben'));

  var tr = d.n('tr');
  var td1 = d.n('td');
  var td2 = d.n('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var attack_color = GM_getValue(world+'_attack_color','#FAD2D2');
  var input_color_attacks = d.n('input');
  input_color_attacks.setAttribute('type','text');
  input_color_attacks.setAttribute('value',attack_color);
  input_color_attacks.setAttribute('id','attack_color_input');
  input_color_attacks.setAttribute('style','background:'+attack_color+'; font-family:monospace; ');
  td1.appendChild(input_color_attacks);
  td2.appendChild(d.text('Angriffsfarbe'));

  var tr = d.n('tr');
  var td1 = d.n('td');
  var td2 = d.n('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var support_color = GM_getValue(world+'_support_color','#E0FFF0');
  var input_color_support = d.n('input');
  input_color_support.setAttribute('type','text');
  input_color_support.setAttribute('value',support_color);
  input_color_support.setAttribute('id','support_color_input');
  input_color_support.setAttribute('style','background:'+support_color+'; font-family:monospace; ');
  td1.appendChild(input_color_support);
  td2.appendChild(d.text('Unterstützungsfarbe'));

  var tr = d.n('tr');
  var td1 = d.n('td');
  var td2 = d.n('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  var returning_color = GM_getValue(world+'_returning_color','#90EE90');
  var input_color_returning = d.n('input');
  input_color_returning.setAttribute('type','text');
  input_color_returning.setAttribute('value',returning_color);
  input_color_returning.setAttribute('id','returning_color_input');
  input_color_returning.setAttribute('style','background:'+returning_color+'; font-family:monospace; ');
  td1.appendChild(input_color_returning);
  td2.appendChild(d.text('Rückkehrfarbe'));

  var tr = d.n('tr');
  var td1 = d.n('td');
  td1.setAttribute('colspan','2');
  tr.appendChild(td1);
  table.appendChild(tr);
  var input_cancel = d.n('input');
  input_cancel.setAttribute('type','button');
  input_cancel.setAttribute('value','Abrrechen');
  input_cancel.addEventListener('click',function(){d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click'));},false);
  var input_save_settings = d.n('input');
  input_save_settings.setAttribute('type','button');
  input_save_settings.setAttribute('value','Speichern');
  input_save_settings.addEventListener('click',save_settings,false);
  td1.appendChild(input_cancel);
  td1.appendChild(d.text(' '));
  td1.appendChild(input_save_settings);


  var copy = d.n('a');
  copy.setAttribute('href','#');
  copy.setAttribute('style','font-weight:normal; font-size:x-small; color:blue; text-decoration:underline; ');
  d.addEvent(copy,'click',function(){ alert('DS Zeige R'+unescape('%FC')+'ckkehr bei Angriffen\n\n(c) by C1B1SE 2008-2009\n\n\tinfo@c1b1.de\n\thttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\n\nThis script may be forbidden in TribalWars or DieSt'+unescape('%E4')+'mme.\nPlease look in the respective forum for further information!'); });
  copy.appendChild(d.text('About DS Zeige R'+unescape('%FC')+'ckkehr bei Angriffen (' + version+')'));

  var updates = d.n('a');
  updates.setAttribute('href','http://userscripts.org/scripts/show/40233');
  updates.setAttribute('title','Schau auf userscripts.org nach einem Update');
  updates.setAttribute('style','font-weight:normal; font-size:x-small; color:blue; text-decoration:underline; ');
  updates.appendChild(d.text('Updates?'));


  var allc = d.n('span');
  allc.setAttribute('style','font-size:x-small; color:silver; ');
  allc.appendChild(d.text('(c) 2008 - 2009 c1b1.de'));

  var close = d.n('img');
  close.setAttribute('src','http://www.c1b1.de/close.png');
  close.setAttribute('alt','Schließen');
  close.addEventListener('click',function() { d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click')); },false);
  close.setAttribute('style','position:absolute; top:1px; right:1px; ');

  var div =  d.n('div');
  div.setAttribute('id','showReturnTimeOnCommands_clear_date_click');
  div.setAttribute('style','position:absolute; top:20px; left:30px;background-color:#F7EED3; color:#804000; border:1px solid #804000; padding:15px; ');


  div.appendChild(text);
  div.appendChild(d.n('br'));
  div.appendChild(d.n('br'));
  div.appendChild(input1);
  div.appendChild(d.text(' '));
  div.appendChild(input0);
  div.appendChild(d.n('br'));
  div.appendChild(d.n('br'));
  div.appendChild(table);
  div.appendChild(d.n('br'));
  div.appendChild(d.n('br'));
  div.appendChild(copy);
  div.appendChild(d.n('br'));
  div.appendChild(d.n('br'));
  div.appendChild(updates);
  div.appendChild(d.n('br'));
  div.appendChild(d.n('br'));
  div.appendChild(allc);
  div.appendChild(close);
  document.getElementsByTagName('body')[0].appendChild(div);
  }

function save_settings()
  {
  var coloring_active = d.id('coloring_active').checked?true:false;

  var attack_color =  d.id('attack_color_input').value;
  attack_color = attack_color?attack_color:'#FAD2D2';

  var support_color =  d.id('support_color_input').value;
  support_color = support_color?support_color:'#E0FFF0';

  var returning_color =  d.id('returning_color_input').value;
  returning_color = returning_color?returning_color:'#90EE90';


  GM_setValue(world+'_coloring_active',coloring_active);
  GM_setValue(world+'_attack_color',attack_color);
  GM_setValue(world+'_support_color',support_color);
  GM_setValue(world+'_returning_color',returning_color);

  alert('Gespeichert');

  document.location.reload();
  }


function clear_date()
  {
  var arr = GM_listValues();
  var len = arr.length;

  for(var i = 0; i < len; i++)
    {
    if(arr[i])
      {
      if(arr[i].match(/_\d+/))
        {
        GM_deleteValue(arr[i]);
        }
      }
    }

  d.id('showReturnTimeOnCommands_clear_date_click_memory').style.width = '0px';
  d.id('showReturnTimeOnCommands_clear_date_click_entries').replaceChild(d.text('0'),d.id('showReturnTimeOnCommands_clear_date_click_entries').firstChild);
  d.id('showReturnTimeOnCommands_clear_date_click_messa').replaceChild(d.text('Der Speicher wurde geleert!'),d.id('showReturnTimeOnCommands_clear_date_click_messa').firstChild);


  var input = d.n('input');
  input.setAttribute('type','button');
  input.setAttribute('value','Schlie'+unescape('%DF')+'en');
  input.addEventListener('click',function(){d.id('showReturnTimeOnCommands_clear_date_click').parentNode.removeChild(d.id('showReturnTimeOnCommands_clear_date_click'));},false);

  d.id('showReturnTimeOnCommands_clear_date_click_clear_button').parentNode.replaceChild(input,d.id('showReturnTimeOnCommands_clear_date_click_clear_button'));

  alert('Speicher geleert!');
  }



function createMenuEntry(obj)
    {
    if(d.id('showReturnTimeOnCommands_bar'))
      return false;

    var tr = d.n('tr');
    tr.setAttribute('id','showReturnTimeOnCommands_bar');

    var td = d.n('td');
    td.setAttribute('widht','100');

    td.appendChild(obj);

    tr.appendChild(td);

    return document.getElementsByClassName('main')[0].getElementsByClassName('vis')[0].appendChild(tr);
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

  this.br = function() // Returns a new <br /> Element
    {
    return document.createElement('br');
    }

  // Search functions

  this.id = function(type)  // Returns the element with the id [type]
    {
    return document.getElementById(type);
    }

  this.tag = function(type) // Returns a list of elements with the tag given in [type]
    {
    return document.getElementsByTagName(type);
    }

  this.name = function(type) // Returns a list of elements with the name [type]
    {
    return document.getElementsByName(type);
    }

  this.class = function(type) // Returns a list of elements with the class given in [type]
    {
    return document.getElementsByClassName(type);
    }

  this.findByAttr = function(obj,attr,value) // Returns a list of elements that have an attribute [attr] with the value [value]
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

  this.findByInner = function(obj,value) // Returns a list of elements that contain the value [value]
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

  this.dumpObj = function(e,html)
    {
    if(html)
      n = '<br />\n';
    else
      n = '\n';
    var o = '( '+typeof(e)+' )'+e+n;
    for(var p in e)
      o+= p+' = '+'( '+typeof(e[p])+' ) '+e[p]+n;
    return o;
    }

  this.array_walk = function(array,func,userdata)
    {
    if(typeof array != 'object')
      return false;
    for(var index in array)
      func(array[index],index,userdata);
    return true;
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