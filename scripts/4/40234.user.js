// ==UserScript==
// @name          DS Dörfer Favoriten
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/game.php*screen=info_village*
// @include       http://de*.die-staemme.de/game.php*screen=map*
// ==/UserScript==

// ds.favourVillages.user.js

// Version 1.0

/*
DS Dörfer Favoriten
(TW Favour Villages)

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/

var dom = new html();

var url = document.location.href;
var world = document.location.href.split('.').shift().split('de').pop()+'_';
var table = dom.findByInner(document.getElementsByTagName('body')[0],'generiert in')[0].parentNode.parentNode.parentNode;

if(url.indexOf('screen=info_village') != -1)
  {
  showFavourLink();
  }
else if(url.indexOf('screen=map') != -1)
  {
  showFavouritesLink();
  }


function showFavourLink()
  {
  var coords = dom.findByInner(table,'Koordinaten:')[0].nextSibling.firstChild.data.split('|');

  var favouriteVillages = unpack(GM_getValue(world+'favoriteVillage'));

  var exists = false;
  for(var i = 0, len = favouriteVillages.length; len > i; i++ )
    if(favouriteVillages[i][0] == coords[0] && favouriteVillages[i][1] == coords[1])
      exists = true;

  if(exists)
    {
    var a = dom.n('a');
    a.setAttribute('href','#');
    a.appendChild(dom.text( String.fromCharCode('0187') + ' aus Favoriten entfernen' ));
    dom.addEvent(a,'click',function() { deleteFavourite(coords[0],coords[1]); } );

    var tr = dom.n('tr');
    var td = dom.n('td');
    td.setAttribute('colspan','2');
    td.appendChild(a);
    tr.appendChild(td);

    table.getElementsByTagName('table')[0].appendChild(tr)
    }
  else
    {
    var a = dom.n('a');
    a.setAttribute('href','#');
    a.appendChild(dom.text( String.fromCharCode('0187') + ' zu Favoriten hinzuf'+String.fromCharCode('0252')+'gen' ));
    dom.addEvent(a,'click',function() { showNoteInput(this); return false; });

    var tr = dom.n('tr');
    var td = dom.n('td');
    td.setAttribute('colspan','2');
    td.appendChild(a);
    tr.appendChild(td);

    table.getElementsByTagName('table')[0].appendChild(tr)
    }
  }

function showNoteInput(link)
  {
  var e = link;
  var yPosition = function (){
    var y = 0;
    while(e)
      {
      y += e.offsetTop + e.clientTop;
      e = e.offsetParent;
      }
    return y;
    };
  yPosition = yPosition();
  var e = link;
  var xPosition = function (){
    var x = 0;
    while(e)
      {
      x += e.offsetLeft + e.clientLeft;
      e = e.offsetParent;
      }
    return x;
    };
  xPosition = xPosition();


  var div = dom.n('div');
  div.setAttribute('style','background:url(http://www.die-staemme.de/graphic/background/content.jpg); border:2px solid rgb(128,64,0); position:absolute; max-width:600px; max-height:400px; overflow:auto; top:'+yPosition+'px; left:'+xPosition+'px; ');
  div.setAttribute('id','NoteInput');

  var title = dom.n('div');
  title.setAttribute('style','background:#DED3B9; text-align:right; font-size:10px;');

  var close = dom.n('a');
  close.appendChild(dom.text('Schlie'+String.fromCharCode('0223')+'en'));
  close.setAttribute('href','#');
  dom.addEvent(close,'click',function() { dom.id('NoteInput').parentNode.removeChild(dom.id('NoteInput')); });

  title.appendChild(close);

  div.appendChild(title);

  div.appendChild(dom.text('Notizen:'));

  div.appendChild(dom.n('br'));

  var textarea = dom.n('textarea');
  textarea.setAttribute('style','font-size:12px; background:white no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right;');
  textarea.setAttribute('cols','50');
  textarea.setAttribute('rows','4');
  textarea.setAttribute('id','village_notes');
  dom.addEvent(textarea,'click',function() {if(this.value == 'Notizen')this.value='';});
  textarea.value = 'Notizen';
  div.appendChild(textarea);

  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.setAttribute('href','#');
  a.appendChild(dom.text( 'Speichern' ));
  dom.addEvent(a,'click',function() { setFavourite(); return false; });
  div.appendChild(a);

  table.appendChild(div);
  }


function setFavourite()
  {
  var coords = dom.findByInner(table,'Koordinaten:')[0].nextSibling.firstChild.data.split('|');
  var player = escape(dom.findByInner(table,'Spieler:')[0].nextSibling.firstChild.firstChild.data)+';'+dom.findByInner(table,'Spieler:')[0].nextSibling.firstChild.href.split('=').pop();
  var tribe = escape(dom.findByInner(table,'Stamm:')[0].nextSibling.firstChild.firstChild.data)+';'+dom.findByInner(table,'Stamm:')[0].nextSibling.firstChild.href.split('=').pop();
  var name = escape(table.getElementsByTagName('h2')[0].firstChild.data.substr(4))+';'+document.location.href.split('=').pop();

  var favouriteVillages = unpack(GM_getValue(world+'favoriteVillage'));

  var exists = false;
  for(var i = 0, len = favouriteVillages.length; len > i; i++ )
    if(favouriteVillages[i][0] == coords[0] && favouriteVillages[i][1] == coords[1])
      exists = true;

  if(exists)
    {
    alert('Dieses Dorf ist schon gespeichert!');
    }
  else
    {
    var notes = dom.id('village_notes').value.split('\n');
    notes = notes.join('<nl>');
    notes = escape(notes);

    var nVillage = new Array(coords[0],coords[1],name,player,tribe,notes);
    favouriteVillages.push(nVillage);

    GM_setValue(world+'favoriteVillage',pack(favouriteVillages));
    alert('Gespeichert!');
    document.location.reload();
    }

  }


function showFavouritesLink()
  {
  var formtable = table.getElementsByTagName('form')[1].getElementsByTagName('table')[0]

  var a = dom.n('a');
  a.setAttribute('href','#');
  a.appendChild(dom.text( 'Favoriten' ));
  dom.addEvent(a,'click',function() { showFavouriteBox(this); return false; });

  var tr = dom.n('tr');
  var td = dom.n('td');
  td.setAttribute('colspan','2');
  td.appendChild(a);
  tr.appendChild(td);

  formtable.appendChild(tr)

  }

function showFavouriteBox(link)
  {
  var formtable = table.getElementsByTagName('form')[1].getElementsByTagName('table')[0]

  var current_village = url.split('=')[1].split('&').shift();

  var e = link;
  var yPosition = function (){
    var y = 0;
    while(e)
      {
      y += e.offsetTop + e.clientTop;
      e = e.offsetParent;
      }
    return y;
    };
  yPosition = yPosition();
  var e = link;
  var xPosition = function (){
    var x = 0;
    while(e)
      {
      x += e.offsetLeft + e.clientLeft;
      e = e.offsetParent;
      }
    return x;
    };
  xPosition = xPosition();

  var div = dom.n('div');
  div.setAttribute('style','z-index: 100; background:url(http://www.die-staemme.de/graphic/background/content.jpg); border:2px solid rgb(128,64,0); position:absolute; max-width:600px; max-height:400px; overflow:auto; top:'+yPosition+'px; left:'+xPosition+'px; font-size:10px; ');
  div.setAttribute('id','FavouriteBox');

  var title = dom.n('div');
  title.setAttribute('style','background:#DED3B9; text-align:right; ');

  var close = dom.n('a');
  close.appendChild(dom.text('Schlie'+String.fromCharCode('0223')+'en'));
  close.setAttribute('href','#');
  dom.addEvent(close,'click',function() { dom.id('FavouriteBox').parentNode.removeChild(dom.id('FavouriteBox')); });

  title.appendChild(close);

  div.appendChild(title);

  // List
  var favouriteVillages = unpack(GM_getValue(world+'favoriteVillage'));

  var table1 = dom.n('table');
  var tr = dom.n('tr');
  var th0 = dom.n('th');
  th0.appendChild(dom.text(' '));
  var th1 = dom.n('th');
  th1.appendChild(dom.text('Koordinaten'));
  var th2 = dom.n('th');
  th2.appendChild(dom.text('Name'));
  var th3 = dom.n('th');
  th3.appendChild(dom.text('Spieler'));
  var th4 = dom.n('th');
  th4.appendChild(dom.text('Stamm'));
  var th5 = dom.n('th');
  th5.appendChild(dom.text('Notizen'));
  dom.appendChilds(tr,th0,th1,th2,th3,th4,th5);

  table1.appendChild(tr);

  for(var i = 0,len = favouriteVillages.length; len > i; i++)
    {
    if(!favouriteVillages[i][0])
      break;
    var tr = dom.n('tr');

    var td0 = dom.n('td');
    var img = new Image();
    img.src = 'http://www.c1b1.de/smile/dsforum/trash.gif';
    img.alt = 'Entfernen';
    var a = dom.n('a');
    a.setAttribute('href','#');
    a.appendChild(img);
    a.title = favouriteVillages[i][0]+'|'+favouriteVillages[i][1];
    dom.addEvent(a,'click',function() {
      var coords = this.title.split('|');
      deleteFavourite(coords[0],coords[1]);
      return false; });
    td0.appendChild(a);

    var td1 = dom.n('td');
    var a = dom.n('a');
    a.setAttribute('href','#');
    a.appendChild(dom.text(favouriteVillages[i][0]+'|'+favouriteVillages[i][1]));
    dom.addEvent(a,'click',function() {
      var coords = this.firstChild.data.split('|');
      dom.id('inputx').value = coords[0];
      dom.id('inputy').value = coords[1];
      formtable.getElementsByTagName('input')[2].click();
      return false; });
    td1.appendChild(a);

    var td2 = dom.n('td');
    var name = favouriteVillages[i][2].split(';');
    var a = dom.n('a');
    a.setAttribute('href','game.php?village='+current_village+'&screen=info_village&id='+name.pop());
    a.appendChild(dom.text(unescape(name.join(';'))));
    td2.appendChild(a);

    var td3 = dom.n('td');
    var player = favouriteVillages[i][3].split(';');
    var a = dom.n('a');
    a.setAttribute('href','game.php?village='+current_village+'&screen=info_player&id='+player.pop());
    a.appendChild(dom.text(unescape(player.join(';'))));
    td3.appendChild(a);

    var td4 = dom.n('td');
    var tribe = favouriteVillages[i][4].split(';');
    var a = dom.n('a');
    a.setAttribute('href','game.php?village='+current_village+'&screen=info_ally&id='+tribe.pop());
    a.appendChild(dom.text(unescape(tribe.join(';'))));
    td4.appendChild(a);

    var td5 = dom.n('td');
    var notes = favouriteVillages[i][5].split(escape('<nl>'));
    for(var a = 0; a < notes.length; a++)
      {
      td5.appendChild(dom.text(unescape(notes[a])));
      td5.appendChild(dom.n('br'));
      }

    dom.appendChilds(tr,td0,td1,td2,td3,td4,td5);
    table1.appendChild(tr);
    }


  div.appendChild(table1);
  document.getElementsByTagName('body')[0].appendChild(div);
  div.style.top = (yPosition-(div.clientHeight / 2)>10?yPosition-(div.clientHeight / 2):10) + 'px';
  }

function deleteFavourite(x,y)
  {
  var cf = confirm('Soll dieses Dorf wirklich aus den Favoriten entfernt werden?');
  if(cf)
    {
    var favouriteVillages = unpack(GM_getValue(world+'favoriteVillage'));

    var new_arr = new Array();
    for(var i = 0, len = favouriteVillages.length; len > i; i++ )
      if(favouriteVillages[i][0] != x && favouriteVillages[i][1] != y)
        new_arr.push(favouriteVillages[i]);

    GM_setValue(world+'favoriteVillage',pack(new_arr));
    alert('Entfernt!');
    document.location.reload();
    }
  }



function unpack(string)
  {
  if(string  == undefined)
    return new Array();
  if(!string)
    return new Array();
  var arr = string.split('?-?');
  var result = new Array();
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i])
      result.push(arr[i].split('?.?'));
    }
  return result;
  }

function pack(arr)
  {
  var result = new Array();
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i])
      result.push(arr[i].join('?.?'));
    }
  return result.join('?-?');
  }


function valuePosition(arr,value)
  {
  for(var i = 0, len = arr.length; i < len; i++)
    {
    if(arr[i] == value)
      return i;
    }
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
  return '' ;
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

  this.trim = function(str)
    {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
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