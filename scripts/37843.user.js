// ==UserScript==
// @name           AE Addons
// @namespace      http://spectre3ooo.homeip.net
// @description    Changes the title of the page to make tabbed browsing easier and shows the actual end times of construction/production/research/travel/etc.
// @include        http://*.astroempires.com/*
// ==/UserScript==

//================================================================
//====================FUNCTION DECLARATIONS=======================
//================================================================
function replaceTime()
{
  for(n=1;n<=500;n++)
  {
        elem=document.getElementById('time'+n);
    if (!elem)
    {
       break;
    }
    elem.id = 'blah'+n;

    s=elem.title;
    var newElement, endTime;
    var d = new Date();
    var now = new Date();
    if (elem)
    {
       if(s<=0)
       {
         endTime="-"
       }
       else
       {
         d.setTime(d.getTime()+(s*1000));
         if(now.getDate() == d.getDate())
         {
            endTime="Today @ "+d.format(' g:ia');
         }
         else if(now.getDate()+1 == d.getDate())
         {
            endTime="Tomorrow @ "+d.format(' g:ia');
         }
         else
         {
            endTime=d.format('D, jS @ g:ia');
         }
       }
       elem.innerHTML = "<b><span id='time"+n+"' title='"+ s +"'>-</span></b><br><nobr><span id='done"+n+"' style='font-size: xx-small'>" + endTime + "</span></nobr>"
    }
  }
};
  // Simulates PHP's date function
Date.prototype.format = function(format) {
  var returnStr = '';
  var replace = Date.replaceChars;
  for (var i = 0; i < format.length; i++) {
    var curChar = format.charAt(i);
    if (replace[curChar])
      returnStr += replace[curChar].call(this);
    else
      returnStr += curChar;
   }
   return returnStr;
};
Date.replaceChars = {
shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

// Day
d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
j: function() { return this.getDate(); },
l: function() { return Date.replaceChars.longDays[this.getDay()]; },
N: function() { return this.getDay() + 1; },
S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
w: function() { return this.getDay(); },
z: function() { return "Not Yet Supported"; },
// Week
W: function() { return "Not Yet Supported"; },
// Month
F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
m: function() { return (this.getMonth() < 11 ? '0' : '') + (this.getMonth() + 1); },
M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
n: function() { return this.getMonth() + 1; },
t: function() { return "Not Yet Supported"; },
// Year
L: function() { return "Not Yet Supported"; },
o: function() { return "Not Supported"; },
Y: function() { return this.getFullYear(); },
y: function() { return ('' + this.getFullYear()).substr(2); },
// Time
a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
B: function() { return "Not Yet Supported"; },
g: function() { return this.getHours() == 0 ? 12 : (this.getHours() > 12 ? this.getHours() - 12 : this.getHours()); },
G: function() { return this.getHours(); },
h: function() { return (this.getHours() < 10 || (12 < this.getHours() < 22) ? '0' : '') + (this.getHours() < 10 ? this.getHours() + 1 : this.getHours() - 12); },
H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
// Timezone
e: function() { return "Not Yet Supported"; },
I: function() { return "Not Supported"; },
O: function() { return (this.getTimezoneOffset() < 0 ? '-' : '+') + (this.getTimezoneOffset() / 60 < 10 ? '0' : '') + (this.getTimezoneOffset() / 60) + '00'; },
T: function() { return "Not Yet Supported"; },
Z: function() { return this.getTimezoneOffset() * 60; },
// Full Date/Time
c: function() { return "Not Yet Supported"; },
r: function() { return this.toString(); },
U: function() { return this.getTime() / 1000; }
}
// proper case function (JScript 5.5+)
function toProperCase(s)
{
  return s.toLowerCase().replace(/^(.)|\s(.)/g,
          function($1) { return $1.toUpperCase(); });
}

function script_paste(doc, where, what) {
    //var new_node = what.cloneNode(false);
    //new_node.style.display = "";
    where.parentNode.insertBefore(what, where);
};

function GetPageName()
{
  var pagestart = document.URL.indexOf("astroempires.com/") + 17;
  var pageend = document.URL.indexOf(".aspx", pagestart);
  return document.URL.substring(pagestart, pageend);
}

function GetView()
{
   var view = "";
   var start = document.URL.indexOf("view=") + 5;
   if(start > -1)
   {
     var end = document.URL.indexOf("&", start);
     if (end == -1)
     {
        view = document.URL.substring(start);
     }
     else
     {
        view = document.URL.substring(start, end);
     }
   }
   return view;
}
//================================================================
//==================END FUNCTION DECLARATIONS=====================
//================================================================

//================================================================
//=======================SHOW DONE TIME===========================
//================================================================
replaceTime();
//================================================================
//=====================END SHOW DONE TIME=========================
//================================================================


