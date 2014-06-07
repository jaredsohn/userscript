// ==UserScript==
// @name          DS: Zeige Rückkehr bei Angriffen
// @namespace     c1b1.de
// @include       http://*.die-staemme.de/*screen=info_command*
// @include       http://*.die-staemme.de/*screen=place*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

// ds.showReturnTimeOnCommands.user.js

// {$ dsScript $}
// version = 1.2
// author = (c) 
// clients = firefox
// areas = .de
// worlds = all
// premium = no
// description[de] = Zeigt im Versammlungsplatz und bei Befehlen die R�ckkehrzeit an. F�r die Anzeige im Versammlungsplatz muss der Befehl vorher besucht werden, damit die Daten eingelesen werden k�nnen.
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.showReturnTimeOnCommands_0.png
// screenshot[1] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.showReturnTimeOnCommands_1.png
// {$ /dsScript $}

var d = new html();

if(document.location.href.indexOf('screen=info_command') != -1)
  {
  if(d.tag('h2')[0].firstChild.data.indexOf('ckkehr von ') == -1)
    {

    // Get Arrival
    table_body = d.id('edit').parentNode.parentNode.parentNode;

    var arrival = d.findByInner(table_body,'Ankunft:')[0];
    arrival = arrival.parentNode.getElementsByTagName('td')[1].firstChild.data + arrival.parentNode.getElementsByTagName('td')[1].getElementsByTagName('span')[0].firstChild.data;

    // Get Duration
    var duration = d.findByInner(table_body,'Dauer:')[0];
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

    d.findByInner(table_body,'Ankunft:')[0].parentNode.parentNode.insertBefore(tr,d.findByInner(table_body,'Ankunft:')[0].parentNode.nextSibling.nextSibling.nextSibling);

    // ID
    var tmp_url = document.location.href;
    // http://de33.die-staemme.de/game.php?village=30228&screen=info_command&id=566044&type=own
    var id = tmp_url.split('&')[2].split('=')[1];
    // and world
    var world = tmp_url.split('.')[0].split('//')[1];

    GM_setValue(world+'_'+id,arrival_timestamp);
    }
  }

else if(document.location.href.indexOf('screen=place') != -1)
  {
  var table = d.findByInner(d.tag('body')[0],'Deine Truppen')[0].parentNode.parentNode;
  var elist = table.getElementsByTagName('tr');

  var th = d.n('th');
  th.width = 160;
  th.appendChild(d.text('R'+unescape('%FC')+'ckkehr:'));

  elist[0].insertBefore(th,elist[0].getElementsByTagName('th')[2]);


  for(var i = 1; i < elist.length; i++)
    {
    if(d.findByInner(d.tag('body')[0],'abbrechen'))
      {

      }

    var tmp_url = elist[i].getElementsByTagName('a')[0].href;
    // http://de33.die-staemme.de/game.php?village=30228&screen=info_command&id=491942&type=own
    var id = tmp_url.split('&')[2].split('=')[1];
    var world = tmp_url.split('.')[0].split('//')[1];
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


/*
Version 1.2:
 - Voranstehende Null bei einstelligem Datum
 - Kleine Codeverbesserung (schneller)

Version 1.1:
 - Auch Angriffe die �lter als 10 Minuten sind, werden eingelesen

*/