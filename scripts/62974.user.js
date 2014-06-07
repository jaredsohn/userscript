// ==UserScript==
// @name           Rohstoffsumme
// @namespace      ds.my.ac.de
// @description    Summiert die erspähten Rohstoffe von ds
// @include        http://de49.die-staemme.de/staemme.php?screen=overview&intro
// ==/UserScript==
var d = new html();

var textfeld = d.tag("h2")[0];
function show(text) {
   textfeld.appendChild(d.text("|"+text ));
}

// Gain is the same for each of the three ressies.
var gainPerH = new Array(0,30,35,41,47,55,64,74,86,100,117,136,158,184,214,249,289,337,391,455,530,616,717,833,969,1127,1311,1525,1774,2063,2400);
var speicherCap = new Array(0,1000, 1229,1512,1859,2285,2810,3454,4247,5222,6420,7893,
   9705,11932,14670,18037,22177,27266,33523,41217,50675,62305,76604,94184,115798,142373,
   175047,215219,264611, 325337, 400000);


function ageOfReport() {
   // Time of report
   var time;
   var tds=d.tag("td");
   for (var i=0; i<tds.length; i++) {
      if (!tds[i].firstChild) continue;
      if (!tds[i].firstChild.data) continue;
      if (tds[i].firstChild.data.match(/Gesendet/)) {
         time = tds[i].nextSibling;
         break;
      }
   }
   if (!time) return 0;
   
   // Time is now the td element containing the time
   time = time.firstChild.data;
   // Bring time into parsable format MM DD, YYYY HH:MM:SS
   // Current format is DD.MM.YY HH:MM
   time = time.replace(/([0-9]+)\.([0-9]+)\.([0-9]+) ([0-9]+:[0-9]+)/,"$2 $1, 20$3 $4:00");
   time = new Date(time);
   // Time is now a date object that contains the time at which this report was created.
   //Get the servertime
   var serverTime = d.id("serverTime").firstChild.data;
   serverTime += " "+d.id("serverDate").firstChild.data;
   serverTime=serverTime.replace(/([0-9]+\:[0-9]+\:[0-9]+) ([0-9]+)\/([0-9]+)\/([0-9]+)/,"$3 $2, $4 $1");
   serverTime= new Date(serverTime);

   return serverTime-time;
}

// Age in hours.
var age = ageOfReport()/1000/60/60;

// Find all table headers
var ths= d.tag("th");
var cursor;
// Look for that containing "Erspähte Rohstoffe"
for (var i=0; i<ths.length; i++) {
   if (!ths[i].firstChild) continue;
   if (!ths[i].firstChild.data) continue;
   if (ths[i].firstChild.data.match(/spähte Rohst/)) {
      cursor = ths[i];
      break;
   }
}
if (!cursor) return;

// The td  element that contains all spied buildings.
var table=cursor.parentNode.parentNode;
var Gebaeude = table.rows[1].cells[1];
var nodes = Gebaeude.childNodes;
var lehmStufe=0;
var eisenStufe=0;
var holzStufe=0;
var speicherStufe=0;
for (var i = 0; i<nodes.length; i++) {
  if (!nodes[i].data) continue;
  if (nodes[i].data.match(/Lehmgrube/)) {
      //next element is B
      i++;
      nodes[i].firstChild.data.match(/Stufe ([0-9]+)/);
      lehmStufe=RegExp.$1;
   } else if (nodes[i].data.match(/Eisenmine/)) {
      //next element is B
      i++;
      nodes[i].firstChild.data.match(/Stufe ([0-9]+)/);
      eisenStufe=RegExp.$1;
   } else if (nodes[i].data.match(/Holzfäller/)) {
      //next element is B
      i++;
      nodes[i].firstChild.data.match(/Stufe ([0-9]+)/);
      holzStufe=RegExp.$1;
   }else if (nodes[i].data.match(/Speicher/)) {
      //next element is B
      i++;
      nodes[i].firstChild.data.match(/Stufe ([0-9]+)/);
      speicherStufe=RegExp.$1;
   }
}

var childs = cursor.nextSibling.childNodes;
// Now add up the following resources
// Unfortunately the resources are separated by dots and each dot is a span of its own.
// So, we collect the text first and then interpret it.
var text = "";
for (var i = 0
      ; i < childs.length
      ; i++) {
   var cursor = childs[i];
   if (!cursor.data) continue;
   text += cursor.data;
}
var holz, lehm, eisen;
{
   var numbers = text.split(" ");
   holz=eval(numbers[0]);
   lehm=eval(numbers[1]);
   eisen=eval(numbers[2]);
}

var holzForcast = Math.min(Math.floor(holz+gainPerH[holzStufe]*age),speicherCap[speicherStufe]);
var lehmForcast = Math.min(Math.floor(lehm+gainPerH[lehmStufe]*age),speicherCap[speicherStufe]);
var eisenForcast = Math.min(Math.floor(eisen+gainPerH[eisenStufe]*age),speicherCap[speicherStufe]);

childs[childs.length-1].appendData(" = "+dots(holz+lehm+eisen));

var newTr=table.rows[0].cloneNode(true);
newTr.cells[0].firstChild.data="Forecast ("+formatAge(age)+"):";
var images = newTr.cells[1].getElementsByTagName("img");
var td=d.n("td");
td.appendChild(images[0]);
td.appendChild(d.text(dots(holzForcast)+" "));
td.appendChild(images[0]);
td.appendChild(d.text(dots(lehmForcast)+" "));
td.appendChild(images[0]);
td.appendChild(d.text(dots(eisenForcast)+" = "+dots(holzForcast+lehmForcast+eisenForcast)));
newTr.replaceChild(td,newTr.cells[1]);

table.insertBefore(newTr,table.rows[1]);
//var tableRow = createTableRow(new Array("Forecast". String(holz+gain[holzStufe]*age 

function dots(text) {
   var result = String(text);
   while(/\d+\d{3}/.test(result)) {
      result = result.replace(/(\d+)(\d{3})/,"$1.$2");
   } 
   return result;
}

function formatAge(age) {
   var ageAsDate = new Date(age*60*60*1000);
   return Math.floor(age)+":"+ageAsDate.getMinutes();
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


