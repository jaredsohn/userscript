// ==UserScript==
// @name           Beutesack
// @namespace      ds.my.ac.de
// @description    Show the number of units the current army can carry.
// @include        http:///.die-staemme.de/staemme.php?*screen=place
// ==/UserScript==
var d = new html();

var textfeld = d.tag("h2")[0];
function show(text) {
   textfeld.appendChild(d.text("|"+text ));
}

var TroopData = new Object();
TroopData.spear    = new Object();
TroopData.sword    = new Object();
TroopData.axe      = new Object();
TroopData.archer   = new Object();
TroopData.spy      = new Object();
TroopData.light    = new Object();
TroopData.marcher  = new Object();
TroopData.heavy    = new Object();
TroopData.ram      = new Object();
TroopData.catapult = new Object();
TroopData.knight   = new Object();
TroopData.snob     = new Object();

TroopData.spear    .beute= 25;
TroopData.sword    .beute= 15;
TroopData.axe      .beute= 10;
TroopData.archer   .beute= 10;
TroopData.spy      .beute= 0;
TroopData.light    .beute= 80;
TroopData.marcher  .beute= 50;
TroopData.heavy    .beute= 50;
TroopData.ram      .beute= 0;
TroopData.catapult .beute= 0;
TroopData.knight   .beute= 100;
TroopData.snob     .beute= 0;

var PREFIX ="Tragkraft: ";

// Insert new Element for Capacity display
var capElement; 
{
   var table  = d.name("units")[0].getElementsByTagName("table")[0];
   var nextRow= table.getElementsByTagName("tr")[1];
   var tr = table.insertRow(1);
   var td = d.n("td");
   tr.appendChild(td);
   capElement = d.text(PREFIX+"0");
   td.appendChild(capElement);
}

function updateCapacity() {
   var cap=0;
   for (var i =0; i< inputs.length; i++) {
      var data =TroopData[inputs[i].name];
      if (!data) continue;
      cap += data.beute*inputs[i].value;
   }
   capElement.nodeValue=PREFIX+cap;
}

// dummies are ignored
function setAttribute(element, dummy, dummy2) {
   element.addEventListener("change", updateCapacity, true);
}
var inputs = document.forms[0];
d.array_walk(inputs, setAttribute, 0);

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

  this.findByInnerRegexp = function(obj,value) // Returns a list of elements that match the regexp [value]
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
          if(obj.getElementsByTagName('*')[i].firstChild.data.match(value))
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
    for(var index =0; index< array.length; index++) {
      func(array[index],index,userdata);
    }
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


