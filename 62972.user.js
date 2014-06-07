// ==UserScript==
// @name           DistanceView
// @namespace      ds.my.ac.de
// @description    Shows the distance to the current town
// @include        http://*die-staemme.de*&screen=report
// ==/UserScript==
var d = new html();

var textfeld = d.tag("h2")[0];
function show(text) {
   textfeld.appendChild(d.text("|"+text ));
}

function Location(x,y) {
   this.X = x;
   this.Y = y;
   this.distance = function(x2,y2) {
      return Math.sqrt((eval(this.X)-x2)*(eval(this.X)-x2)+(eval(this.Y)-y2)*(eval(this.Y)-y2));
   }
   
   this.distance2 = function(x2,y2){
      return Math.round(this.distance(x2,y2)*100)/100;
   }
   
   this.distance2Loc = function(location){
      return this.distance2(location.X,location.Y);
   }
   
   this.dump=function() {
      return "("+this.X+"|"+this.Y+")";
   }
   
}

function locationFromString(input) {
   var matches = /\(([0-9]+)\|([0-9]+)\)/;
   matches.exec(input); 
   return new Location(RegExp.$1, RegExp.$2); 
}

function getCurrentLocation() {
   var td = d.id("menu_row2")
   if (!td) return null;
   td= td.cells[4];
   var b = td.getElementsByTagName("b")[0];
   var loc_str = b.firstChild.nodeValue;
   return locationFromString(loc_str);
}

// element contains a location discription
// index is ignored
// userdata is location of village
function addDistance(element, index, userdata) {
   var match=/\(([0-9]+)\|([0-9]+)\)/.exec(element.firstChild.data);
   var distance = (userdata.distance2(match[1],match[2]));
   //element.firstChild.insertData(match.index+match[0].length, " "+distance);
   element.firstChild.insertData(match.index, distance+" ");
}

var currentLocation = getCurrentLocation();
if (!currentLocation) return;

var orte = d.findByInnerRegexp(document,/\(([0-9]+)\|([0-9]+)\)/);
d.array_walk(orte, addDistance, currentLocation);

// element contains a location discription
// index is ignored
// userdata is location of village
function addDistanceNoParan(element, index, userdata) {
   var match=/([0-9]+)\|([0-9]+)/.exec(element.firstChild.data);
   var distance = (userdata.distance2(match[1],match[2]));
   //element.firstChild.insertData(match.index+match[0].length, " "+distance);
   element.firstChild.insertData(match.index, distance+" ");
}

orte = d.findByInnerRegexp(document,/^[0-9]+\|[0-9]+$/);
d.array_walk(orte, addDistanceNoParan, currentLocation);

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


