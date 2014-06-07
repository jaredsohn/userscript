// ==UserScript==
// @name          DS Troop Position Reminder
// @include       http://de*.die-staemme.de/*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

// ds.tpr.user.js

// (c) by C1B1SE

var alarms_var_soundsrc = 'http://c1b1.de/stuff/alarm.mp3';


var alarm_switcher = true;

var command_types = eval({
  'attack' : 'Angriff',
  'support' : 'Unterstützung',
  'ressources' : 'Händler'
});


var world = document.location.href.split('.').shift().split('de').pop()+'_';

if(GM_getValue(world+'alarms') == undefined)
  {
  // First Start Fill Config
  var now = new Date();
  var test = new Array();
  test[0] = new Array();
  test[0][0] = '4589456';
  test[0][1] = '27.10.08 14:09:28:000';
  test[0][2] = 'attack';
  test[0][3] = '481|16';
  test[0][4] = '478|15';

  GM_setValue(world+'alarms',alarms_pack(test));

  alert('DS TroopPositionReminder ist jetzt initialisiert!');
  document.location.reload();

  }

var dom = new html();
if(dom.id('ds_body'))
  {
  // Get Alarms from GM
  var alarms_string = GM_getValue(world+'alarms');
  var alarms = alarms_parse(alarms_string);

  // Main Bar below all
  createBar();

  // Initialise Countdown for each alarm
  var countdowns = new Array();
  alarms_initialiseCountdowns();

  // Create Button to add an alarm (only on command-pages)
  createButton_setAlarm();

  // Show Attacks (only on village info)
  incomingTroopsVillageInfo();

  }



// Create Bar
function createBar()
  {
  var div = dom.n('div');
  div.setAttribute('id','tpr_bar');
  div.style.backgroundColor = 'rgb(243,237,223)';
  div.style.border = 'rgb(128,64,0) 2px solid';
  div.style.marginTop = '15px';
  div.style.padding = '5px';

  var leftfont = dom.n('span');
  leftfont.setAttribute('style','float:left; ');

  var a = dom.n('a');
  a.setAttribute('href','#');
  dom.addEvent(a,'click',function(){dialog_showAlarms();});
  a.appendChild(document.createTextNode('Alarme'));
  leftfont.appendChild(a);

  var delimiter = dom.n('span');
  delimiter.setAttribute('style','margin-left:5px; margin-right:5px; width:1px; border:1px #804000 solid; ')
  leftfont.appendChild(delimiter);


  var a = dom.n('a');
  a.setAttribute('href','#');
  a.appendChild(dom.text('About me'));
  dom.addEvent(a,'click',function(){ alert('DS TroopPositionReminder\n(Preliminary version)\n\n(c) by C1B1SE 2007-2008\n\n\tinfo@c1b1.de\n\thttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\n\nThis script may be forbidden in TribalWars or DieStämme.\nPlease look in the respective forum for further information!'); });
  leftfont.appendChild(a);

  div.appendChild(leftfont);

  var rightfont = dom.n('span');
  rightfont.setAttribute('style','float:right; font-size:smaller; opacity:0.7; ');
  rightfont.appendChild(dom.text('DS TroopPositionReminder'));
  div.appendChild(rightfont);

  var clearfont = dom.n('div');
  clearfont.setAttribute('style','clear:both; ');
  div.appendChild(clearfont);

  // HR
  var hr = dom.n('hr');
  hr.setAttribute('size','2');
  hr.setAttribute('width','1080');


  dom.id('ds_body').insertBefore(hr,dom.id('ds_body').lastChild);
  dom.id('ds_body').insertBefore(div,dom.id('ds_body').lastChild);

  }


function incomingTroopsVillageInfo()
   {
   if(document.location.href.indexOf('screen=info_village') != -1 && document.location.href.indexOf('id') != -1)
     {

     // Read village coordinates:
     var village_coords = dom.findByInner(dom.id('ds_body'),'Koordinaten')[0].nextSibling.firstChild.data;
     var foundthings = new Array();
     for(attr in alarms)
       {
       if(alarms[attr][3] == village_coords || alarms[attr][4] == village_coords)
         void foundthings.push(alarms[attr]);
       }

     if(foundthings[0])
       {

       var table = dom.n('table');
       table.setAttribute('class','vis');

       var tr = dom.n('tr');
       var th1 = dom.n('th');
       th1.setAttribute('width','250');
       th1.appendChild(dom.text('Truppen'));
       var th2 = dom.n('th');
       th2.setAttribute('width','300');
       th2.appendChild(dom.text('Zeit'));
       dom.appendChilds(tr,th1,th2);
       table.appendChild(tr);


       for(attr in foundthings)
         {
         var tr = dom.n('tr');

         if(foundthings[attr][3] == village_coords)
           {
           if(foundthings[attr][2] == 'attack')
             {
             var a = dom.n('a');
             a.appendChild(dom.text(command_types[ foundthings[attr][2] ] + ' nach '+ foundthings[attr][4]));
             a.href = 'game.php?screen=info_command&id='+foundthings[attr][0];
             }
           else
             {
             var a = dom.text(command_types[ alarms[i][2] ]);
             }
           }
         else
           {
           if(foundthings[attr][2] == 'attack')
             {
             var a = dom.n('a');
             a.appendChild(dom.text(command_types[ foundthings[attr][2] ] + ' von '+ foundthings[attr][3]));
             a.href = 'game.php?screen=info_command&id='+foundthings[attr][0];
             }
           else
             {
             var a = dom.text(command_types[ alarms[i][2] ]);
             }
           }
         var td1 = dom.n('td');
         td1.appendChild(a);
         var td2 = dom.n('td');
         td2.appendChild(dom.text( foundthings[attr][1] ));
         dom.appendChilds(tr,td1,td2);
         table.appendChild(tr);
         }
       dom.findByInner(dom.id('ds_body'),'Koordinaten')[0].parentNode.parentNode.parentNode.parentNode.appendChild(table);
       }
     }
   }



// Dialog: shows Alarms
function dialog_showAlarms()
  {
  if(document.getElementById('tpr_dialog_content'))
    {
    var div = document.getElementById('tpr_dialog_content');
    dom.removeChilds(div);
    div.style.display = 'block';
    }
  else
    {
    // Create Div
    var div = dom.n('div');
    div.id = 'tpr_dialog_content';
    div.style.zIndex = 21;
    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '200px';
    div.style.background = 'url(graphic/background/main.jpg) #F1EBDD';
    div.style.border = '3px outset #804000';
    div.style.borderTopColor = '#A0A0A0';
    }

  // Statusbar
  var statusbar = dialog_createStatusBar('Alarme');

  // Create content
  var table = dom.n('table');

  var tr1 = dom.n('tr');

  var th1 = dom.n('th');
  th1.innerHTML = 'Zeit';

  var th2 = dom.n('th');
  th2.innerHTML = 'Art';

  var th3 = dom.n('th');
  th3.innerHTML = 'Von';

  var th4 = dom.n('th');
  th4.innerHTML = 'Nach';

  var th5 = dom.n('th');
  th5.innerHTML = 'Aktion';

  dom.appendChilds(tr1,th1,th2,th3,th4,th5);
  table.appendChild(tr1);

  for(var i = 0; i < alarms.length; i++)
    {
    var tr = dom.n('tr');

    var td1 = dom.n('td');
    td1.appendChild(dom.text(alarms[i][1]));

    var td2 = dom.n('td');
    if(alarms[i][2] == 'attack')
      {
      var a = dom.n('a');
      a.appendChild(dom.text(command_types[ alarms[i][2] ]));
      a.href = 'game.php?screen=info_command&id='+alarms[i][0];
      }
    else
      {
      var a = dom.text(command_types[ alarms[i][2] ]);
      }
    td2.appendChild(a);

    var td3 = dom.n('td');
    td3.appendChild(dom.text(alarms[i][3]));

    var td4 = dom.n('td');
    td4.appendChild(dom.text(alarms[i][4]));

    var td5 = dom.n('td');
    var a = dom.n('a');
    a.href = '#';
    var id = alarms[i][0];
    dom.addEvent(a,'click',function() { alarms_delete(id); } );
    a.appendChild(dom.text('Löschen'));
    td5.appendChild(a);

    dom.appendChilds(tr,td1,td2,td3,td4,td5);
    table.appendChild(tr);
    }


  // Append Status Bar
  div.appendChild(statusbar);

  // Append Content
  div.appendChild(table);

  // Append Div
  if(!document.getElementById('tpr_dialog_content'))
    dom.tag('body')[0].appendChild(div);
  }


function dialog_hide()
  {
  if(document.getElementById('tpr_dialog_content'))
    document.getElementById('tpr_dialog_content').style.display = 'none';
  }


// Dialog: creates a statusbar with a title for the dialog
function dialog_createStatusBar(title)
  {
  var div = dom.n('div');
  div.id = 'tpr_dialog_statusbar';
  div.style.color = 'white';
  div.style.background = '#A0A0A0';
  div.style.zIndex = 22;
  div.style.textAlign = 'center';
  div.style.fontFamily = 'Verdana,sans-serif';

  div.appendChild(dom.text(title));

  var img = new Image();
  img.src = 'http://www.c1b1.de/close.png';
  img.alt = 'Schließen';
  img.title = 'Schließen';
  img.style.position = 'absolute';
  img.style.left = '0px';
  img.style.top = '0px';
  dom.addEvent(img,'click',dialog_hide);
  div.appendChild(img);

  return div;
  }


// Button: Create Alarm
function createButton_setAlarm()
  {
  if(!dom.id('labelText'))
    return;
  if(dom.id('labelText').firstChild.data == 'Befehl')   // in English Version: "Command"
    {
    var table_body = dom.id('labelText').parentNode.parentNode.parentNode.parentNode;

    var elist = table_body.childNodes;
    var tr_rally_point = elist[elist.length-3];

    var a = dom.n('a');
    a.setAttribute('href','#');
    dom.addEvent(a,'click',function(){setAlarm(this)});
    a.appendChild(document.createTextNode(unescape('%BB')+' Alarm erstellen'));

    var tr = dom.n('tr');

    var td = dom.n('td');
    td.setAttribute('colspan','3');

    td.appendChild(a);
    tr.appendChild(td);

    tr_rally_point.parentNode.insertBefore(tr,tr_rally_point.nextSibling);
    }
  }

// From "Button: Create Alarm  "
function setAlarm(element)
  {
  if(element.innerHTML == 'Alarm erstellt!')
    return false;
  element.innerHTML = 'Alarm erstellt!';
  element.style.color = 'green';

  // Time
  var arrival = dom.findByInner(element.parentNode.parentNode.parentNode,'Ankunft:')[0];  // In English Version: "Arrival:"
  var whole_time = arrival.parentNode.getElementsByTagName('td')[1].firstChild.data + arrival.parentNode.getElementsByTagName('td')[1].getElementsByTagName('span')[0].firstChild.data;

  // Origin
  var tmp = arrival.parentNode.parentNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.data;
  tmp = tmp.split('(');
  tmp = tmp[tmp.length - 1];
  var origin = tmp.split(')')[0];

  // Destination
  var tmp = arrival.parentNode.parentNode.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.data;
  tmp = tmp.split('(');
  tmp = tmp[tmp.length - 1];
  var destination = tmp.split(')')[0];

  // Type
  var type = 'attack';

  // ID
  var tmp_url = document.location.href;
  // http://de23.die-staemme.de/game.php?village=118192&screen=info_command&id=16845261&type=own#
  var id = tmp_url.split('&')[2].split('=')[1];

  /*
  var tmp_url = dom.findByInner(arrival.parentNode.parentNode,'cancel')[0].href;
  //http://en5.tribalwars.net/game.php?village=224762&&screen=place&action=cancel&id=32708866&h=b00d
  var id = tmp_url.split('&')[4].split('=')[1];
  */

  var len = alarms.length;
  alarms[len] = new Array();
  alarms[len][0] = id;
  alarms[len][1] = whole_time;
  alarms[len][2] = type;
  alarms[len][3] = origin;
  alarms[len][4] = destination;

  GM_setValue(world+'alarms',alarms_pack(alarms));

  return false;
  }


function orderByIncs()
  {
  if(document.location.href.indexOf('screen=overview_villages') != -1)
    {
    var elist = document.getElementsByTagName('table')[7].getElementsByTagName('a');
    for(var i = 0; i < elist.length; i++)
      {
      if(elist[i].getElementsByTagName('img')[0])
        {
        elist[i].parentNode.parentNode.parentNode.parentNode.insertBefore(elist[i].parentNode.parentNode.parentNode,elist[0].parentNode.parentNode.parentNode);
        }
      }
    }
  }

function alarms_countdown()
  {
  var now = new Date();
  now = parseInt(now.getTime() / 1000);
  for(var index in countdowns)
    {
    if(countdowns[index])
      {
      //alert(now +'>'+ countdowns[index]);
      if(now > countdowns[index])
        {
        alarms_callUp(index);
        }
      }
    }
  }


// Initialise Countdown for each alarm
var intervalID;
function alarms_initialiseCountdowns()
  {
  var obj,string,time,date;
  for(var i = 0; i < alarms.length; i++)
    {
    obj = new Date();
    // Format: 27.10.08 14:09:28:000
    string = alarms[i][1];
    string = string.split(' ');
    date = string[0].split('.');
    time = string[1].split(':');

    obj.setMonth(date[1]-1);
    obj.setDate(date[0]);
    obj.setFullYear('20'+date[2]);

    //obj.setHours(time[0] - (obj.getTimezoneOffset()/60));  // time lag?!
    obj.setHours(time[0]);
    obj.setMinutes(time[1]);
    obj.setSeconds(time[2]);
    obj.setMilliseconds(time[3]);

    countdowns[i] = parseInt(obj.getTime() / 1000);
    }

  // Start loop
  intervalID = window.setInterval(alarms_countdown, 2000);
  }

function alarms_callUp(n)
  {
  if(!alarm_switcher)
    return false;

  countdowns[n] = false;
  var i = n;

  if(document.getElementById('tpr_dialog_content'))
    {
    var div = document.getElementById('tpr_dialog_content');
    dom.removeChilds(div);
    div.style.display = 'block';
    }
  else
    {
    // Create Div
    var div = dom.n('div');
    div.id = 'tpr_dialog_content';
    div.style.zIndex = 21;
    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '200px';
    div.style.background = 'url(graphic/background/main.jpg) #F1EBDD';
    div.style.border = '3px outset #804000';
    div.style.borderTopColor = '#A0A0A0';
    }

  // Statusbar
  var statusbar = dialog_createStatusBar('Achtung!');

  var content = dom.n('div');

  var table = dom.n('table');

  var tr1 = dom.n('tr');

  var th1 = dom.n('th');
  th1.innerHTML = 'Zeit';

  var th2 = dom.n('th');
  th2.innerHTML = 'Art';

  var th3 = dom.n('th');
  th3.innerHTML = 'Von';

  var th4 = dom.n('th');
  th4.innerHTML = 'Nach';

  dom.appendChilds(tr1,th1,th2,th3,th4);
  table.appendChild(tr1);

  var tr = dom.n('tr');

  var td1 = dom.n('td');
  td1.appendChild(dom.text(alarms[i][1]));

  var td2 = dom.n('td');
  td2.appendChild(dom.text( command_types[ alarms[i][2] ] ));

  var td3 = dom.n('td');
  td3.appendChild(dom.text(alarms[i][3]));

  var td4 = dom.n('td');
  td4.appendChild(dom.text(alarms[i][4]));


  dom.appendChilds(tr,td1,td2,td3,td4);
  table.appendChild(tr);

  content.appendChild(table);


  // Sound
  var sound = document.createElement('embed');
  sound.type = 'audio/mpeg';
  sound.src = alarms_var_soundsrc;
  sound.width = '250';
  sound.height = '20';
  sound.autostart = 'true';
  sound.loop = 'true';

  content.appendChild(sound);

  // Delete Button
  var button = dom.n('a');
  button.setAttribute('href','#');
  dom.addEvent(button,'click',function() { alarms_delete(alarms[i][0]); } );
  button.appendChild(document.createTextNode(unescape('%BB')+' Alarm löschen'));

  content.appendChild(dom.br());
  content.appendChild(button);

  // Append Status Bar
  div.appendChild(statusbar);

  // Append Content
  div.appendChild(content);

  // Append Div
  if(!document.getElementById('tpr_dialog_content'))
    dom.tag('body')[0].appendChild(div);
  }


function alarms_delete(id)
  {
  for(var i = 0; i < alarms.length; i++)
    {
    if(alarms[i][0] == id)
      {
      var c = confirm('Soll der Alarm wirklich gelöscht werden?\n\nUhrzeit:'+alarms[i][1]+'\nVon '+alarms[i][3]+' nach '+alarms[i][4]);
      if(c)
        {
        delete(alarms[i]);
        GM_setValue(world+'alarms',alarms_pack(alarms));
        dialog_hide();
        }
      }
    }
  }



function alarms_parse(string)
  {
  if(string == '')
    return new Array();
  else if(string == undefined)
    return new Array();
  else if(!string)
    return new Array();

  var output = new Array();

  var splitted = string.split('*');
  for(var i = 0; i < splitted.length; i++)
    {
    var sub_splitted = splitted[i].split(';');


    var id = sub_splitted[0].substr(1);
    var time = sub_splitted[1];
    var type = sub_splitted[2];
    var village1 = sub_splitted[3];
    var village2 = sub_splitted[4].substr(0,sub_splitted[4].length-1);

    output[i] = new Array();
    output[i][0] = id;
    output[i][1] = time;
    output[i][2] = type;
    output[i][3] = village1;
    output[i][4] = village2;
    }

  return output;
  }

function alarms_pack(obj)
  {
  var ar = new Object();

  if(typeof(obj) != typeof(ar))
    return '';

  var output = '';

  for(var i = 0,len = obj.length; i < len; i++)
    {
    if(typeof(obj[i]) != typeof(ar))
      {
      while(i < len)
        {
        if(typeof(obj[i]) == typeof(ar))
          break;
        else
          i++;
        }
      if(typeof(obj[i]) != typeof(ar))
        return '';
      }


    var tmp = '{'+obj[i][0]+';'+obj[i][1]+';'+obj[i][2]+';'+obj[i][3]+';'+obj[i][4]+'}';
    if(i == (obj.length - 1))
      output += tmp;
    else
      output += tmp+'*';
    }
  return output;
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