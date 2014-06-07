// ==UserScript==
// @name          TribalWars Dorpen sorteren
// @namespace     Dit script laat je je je dorpen sorteren.
// @include       http://*.tribalwars.nl/game.php*
// @version       1.2
// ==/UserScript==

var Farmer = "/game.php?screen=am_farm&mode=farm";
var Accountmanager = "/game.php?screen=accountmanager";
var Copyrightlink = "http://userscripts.org/users/Hipio";
if (document.location.href.indexOf(".tribalwars.nl/game.php") != -1)
var classes = document.getElementsByClassName("manager_icon");
classes[0].style.display = "none";
classes[1].style.display = "none";
{

	{
		var footer = document.getElementById('footer_left');
		var Farm = document.createElement('span');
		Farm.innerHTML = " - <a target=\"_self\" href=\"" + Farmer + "\">Farm-Assistent</a>";
		footer.appendChild(Farm);

		var footer = document.getElementById('footer_left');
		var Account = document.createElement('span');
		Account.innerHTML = " - <a target=\"_self\" href=\"" + Accountmanager + "\">Account Manager</a>";
		footer.appendChild(Account);
        
        var footer = document.getElementById('footer_left');
		var Copyright = document.createElement('span');
		Copyright.innerHTML = " - <a target=\"_new\" href=\"" + Copyrightlink + "\">Made by Hipio</a>";
		footer.appendChild(Copyright);
	}
}

var dom = new html();

var bottom_up = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJAQMAAADeqkRuAAAA' +
'BlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAACdJREFU' +
'eF4FwDERACAMA8D3kQUfmMFHF3xgpj5qhhM2xfCWHGm54gM4' +
'JQR093/S3gAAAABJRU5ErkJggg==';

var alphabet = '!?.,-;:&/\{}[]()=+~*_<>|#0123456789aäbcdefghijklmnoöpqrsßtuüvwxyz';


var sortStatus = new Array();
// Table position:
// 0 = normal
// 1 = village pages
if(!dom.class('main')[0].getElementsByTagName('table')[1])
  {
  var table = dom.class('main')[0].getElementsByTagName('table')[0];
  }
else
  {
  if( dom.class('main')[0].getElementsByTagName('table')[1].getElementsByTagName('input')[1] )
    {
    if(dom.class('main')[0].getElementsByTagName('table')[1].getElementsByTagName('input')[1].type == 'submit')
      {
      var table = dom.class('main')[0].getElementsByTagName('table')[0];
      }
    else
      {
      var table = dom.class('main')[0].getElementsByTagName('table')[1];
      }
    }
  else
    {
    var table = dom.class('main')[0].getElementsByTagName('table')[0];
    }
  }


var elist = table.getElementsByTagName('tr');

// Column 0
sortStatus[0] = new Array('asc','asc');
var img = new Image();
img.src = bottom_up;
img.alt = 'Sorteren';
img.title = 'Sorteren';
dom.addEvent(img,'click',function() {
  var div = dom.n('div');
  div.setAttribute('style','position:absolute; background:#DED3B9; ');
  div.appendChild(dom.text('Sorteren op:'));
  div.appendChild(dom.n('br'));


  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[0][0] = sortE(elist,0,sortStatus[0][0]); } );
  a.appendChild(dom.text('Werelddeel'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[0][1] = sortE(elist,0,sortStatus[0][1],'ccords'); } );
  a.appendChild(dom.text('Coordinaten'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[0][2] = sortE(elist,0,sortStatus[0][2],'alpha'); } );
  a.appendChild(dom.text( 'Alphabetisch'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  elist[0].getElementsByTagName('th')[0].appendChild(div);
  } );

elist[0].getElementsByTagName('th')[0].appendChild(dom.text(' '));
elist[0].getElementsByTagName('th')[0].appendChild(img);

// Column 2
sortStatus[2] = new Array('asc','asc','asc','asc');
var img = new Image();
img.src = bottom_up;
img.alt = 'Sorteren';
img.title = 'Sorteren';
dom.addEvent(img,'click',function() {
  var div = dom.n('div');
  div.setAttribute('style','position:absolute; background:#DED3B9; ');
  div.appendChild(dom.text('Sorteren op:'));
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[2][0] = sortE(elist,2,sortStatus[2][0],'wood'); } );
  a.appendChild(dom.text('Hout'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[2][1] = sortE(elist,2,sortStatus[2][1],'clay'); } );
  a.appendChild(dom.text('Leem'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[2][2] = sortE(elist,2,sortStatus[2][2],'iron'); } );
  a.appendChild(dom.text('Ijzer'));
  div.appendChild(a);
  div.appendChild(dom.n('br'));

  var a = dom.n('a');
  a.href = '#';
  dom.addEvent(a,'click',function() { this.parentNode.parentNode.removeChild(this.parentNode); sortStatus[2][3] = sortE(elist,2,sortStatus[2][3],'total'); } );
  a.appendChild(dom.text('Totaal'));
  div.appendChild(a);

  elist[0].getElementsByTagName('th')[2].appendChild(div);
  } );
elist[0].getElementsByTagName('th')[2].appendChild(dom.text(' '));
elist[0].getElementsByTagName('th')[2].appendChild(img);

function sortE(elist,tdN,direction,special)
  {
  this.special = special?special:false;
  this.o = direction=='desc'?1:-1;
  this.n = tdN;
  this.f = function(a,b)
    {
    if(this.n == 0 && this.special == 'ccords')
      {
      var a = dom.trim(dom.trim(grabText(a.getElementsByTagName('td')[0],4)).split('(').pop().split(')').shift()).split('|');
      a[0] = parseInt(a[0]);
      a[1] = parseInt(a[1]);
      var b = dom.trim(dom.trim(grabText(b.getElementsByTagName('td')[0],4)).split('(').pop().split(')').shift()).split('|');
      b[0] = parseInt(b[0]);
      b[1] = parseInt(b[1]);
      }
    else if(this.n == 0 && this.special == 'alpha')
      {
      var at = dom.trim(grabText(a.getElementsByTagName('td')[0],4));
      a = valuePosition(alphabet,at[0]);
      var bt = dom.trim(grabText(b.getElementsByTagName('td')[0],4));
      b = valuePosition(alphabet,bt[0]);
      var i = 1;
      while(a == b && at[i] && bt[i])
        {
        a = valuePosition(alphabet,at[i]);
        b = valuePosition(alphabet,bt[i]);
        i++;
        }
      }
    else if(this.n == 0 && typeof(this.special) == typeof('string') && this.special.substr(0,7) == 'search:')
      {
      var a1 = dom.trim(grabText(a,5));
      var b1 = dom.trim(grabText(b,5));
      }
    else if(this.n == 0 && !this.special)
      {
      var a = parseInt(dom.trim(dom.trim(grabText(a.getElementsByTagName('td')[0],4)).split('K').pop()));
      var b = parseInt(dom.trim(dom.trim(grabText(b.getElementsByTagName('td')[0],4)).split('K').pop()));
      }
    else if(this.n == 1)
      {
      var a = parseInt(grabText(a.getElementsByTagName('td')[1],1));
      var b = parseInt(grabText(b.getElementsByTagName('td')[1],1));
      }
    else if(this.n == 2 && this.special == 'wood')
      {
      var a = parseInt(dom.trim(grabText(a.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[0]);
      var b = parseInt(dom.trim(grabText(b.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[0]);
      }
    else if(this.n == 2 && this.special == 'clay')
      {
      var a = parseInt(dom.trim(grabText(a.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[1]);
      var b = parseInt(dom.trim(grabText(b.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[1]);
      }
    else if(this.n == 2 && this.special == 'iron')
      {
      var a = parseInt(dom.trim(grabText(a.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[2]);
      var b = parseInt(dom.trim(grabText(b.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ')[2]);
      }
    else if(this.n == 2 && this.special == 'total')
      {
      var a = dom.trim(grabText(a.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ');
      a = parseInt(a[0]) + parseInt(a[1]) + parseInt(a[2]);
      var b = dom.trim(grabText(b.getElementsByTagName('td')[2],2)).replace(/\./g,'').split(' ');
      b = parseInt(b[0]) + parseInt(b[1]) + parseInt(b[2]);
      }
    else if(this.n == 3)
      {
      var a = parseInt(a.getElementsByTagName('td')[3].firstChild.data);
      var b = parseInt(b.getElementsByTagName('td')[3].firstChild.data);
      }
    else if(this.n == 4)
      {
      var a = parseInt(a.getElementsByTagName('td')[4].firstChild.data.split('/')[0]);
      var b = parseInt(b.getElementsByTagName('td')[4].firstChild.data.split('/')[0]);
      }
    else if(this.n == 4.5)
      {
      var a = parseInt(a.getElementsByTagName('td')[4].firstChild.data.split('/')[1]);
      var b = parseInt(b.getElementsByTagName('td')[4].firstChild.data.split('/')[1]);
      }
    if(this.special == 'ccords')
      {
      if(a[0] > b[0])
        return this.o * -1;
      else if(a[0] < b[0])
        return this.o * 1;
      else
        {
        if(a[1] > b[1])
          return this.o * -1;
        else if(a[1] < b[1])
          return this.o * 1;
        else
          return 0;
        }
      }
    else if(typeof(this.special) == typeof('string') && this.special.substr(0,7) == 'search:')
      {
      var key = this.special.substr(7).toLowerCase();
      if(a1.toLowerCase().indexOf(key) != -1)
        return -1;
      if(b1.toLowerCase().indexOf(key) != -1)
        return 1;
      else
        return 1;
      }
    else
      {
      if(a > b)
        return this.o * -1;
      else if(a < b)
        return this.o * 1;
      else
        return 0;
      }
    };

  // Create Array
  var elements = new Array();
  for(var i = 1; i < elist.length; i++)
    {
    elements.push(elist[i]);
    elist[i].parentNode.removeChild(elist[i]);
    i--;
    }

  // Sort the Array
  elements.sort(this.f);

  for(var i = 0; i < elements.length; i++)
    {
    elist[0].parentNode.appendChild(elements[i]);
    }
  return direction=='desc'?'asc':'desc';
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