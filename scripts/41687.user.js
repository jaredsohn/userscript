// ==UserScript==
// @name           GIA Script (Modified)
// @author          Luke Bonaccorsi AKA SpeedySurfer
// @namespace       http://gears.speedysurfer.co.uk
// @description     Scouts for bases in the current region
// @license         Creative Commons Attribution License
// @include        http://*.astroempires.com/*
// @exclude        http://*.astroempires.com/login.aspx
// @exclude        http://*.astroempires.com/home.aspx
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

  //////////////////////////////////////////
 /// Variables ////////////////////////////
//////////////////////////////////////////
if (document.location.href.match(/(.+?)astroempires.com/)){
var server=document.location.href.match(/\/(.+?).astroempires.com/)[1]
server = server.replace(/\//, "")
var serverurl= "http://"+server+".astroempires.com/"
}

if(document.location.href.match(/astroempires.com/)){
var empireLinks = [];
 var ProductionGetCost = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];
 var numcredits = document.evaluate(
    "/html/body/table/tbody/tr/th/table/tbody/tr[2]/th[2]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    numcredits = numcredits.snapshotItem(0).innerHTML;

var FT_INDEX = 0;
var BO_INDEX = 1;
var HB_INDEX = 2;
var IB_INDEX = 3;
var CV_INDEX = 4;
var RC_INDEX = 5;
var DE_INDEX = 6;
var FR_INDEX = 7;
var IF_INDEX = 8;
var SS_INDEX = 9;
var OS_INDEX = 10;
var CR_INDEX = 11;
var CA_INDEX = 12;
var HC_INDEX = 13;
var BC_INDEX = 14;
var FC_INDEX = 15;
var DN_INDEX = 16;
var TI_INDEX = 17;
var LE_INDEX = 18;
var DS_INDEX = 19;
var BARRACKS_INDEX = 20;
var LASER_TURRETS_INDEX = 21;
var MISSLE_TURRETS_INDEX = 22;
var PLASMA_TURRENTS_INDEX = 23;
var ION_TURRETS_INDEX = 24;
var PHOTON_TURRETS_INDEX = 25;
var DISRUPTOR_TURRETS_INDEX = 26;
var DEFLECTION_SHIELDS_INDEX = 27;
var PLANETARY_SHIELD_INDEX = 28;
var PLANETARY_RING_INDEX = 29;
var fightingShips = "11111011100101101111";
var shipValues = new Array(5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000);
var shipHangarValues = new Array(0,0,0,0,0,0,0,4,4,0,0,4,60,8,40,400,200,1000,4000,10000);
}

  //////////////////////////////////////////
 /// Misc ////////////////////////////////
/////////////////////////////////////////

Array.prototype.inArray = function (value)
// Returns true if the passed value is found in the
// array. Returns false if it is not.
{
var i;
for (i=0; i < this.length; i++) {
// Matches identical (===), not just similar (==).
if (this[i] === value) {
return true;
}
}
return false;
};

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
		 tempdate = new Date();
		 tempdate.setDate(tempdate.getDate()+1)
		 if(now.toLocaleDateString() == d.toLocaleDateString() )
		 {
		    endTime="Today @ "+d.formatDate('H:i:s');
		 }
		 else if(tempdate.toLocaleDateString() == d.toLocaleDateString())
		 {
		    endTime="Tomorrow @ "+d.formatDate('H:i:s');
		 }
		 else
		 {
		    endTime=d.formatDate('D jS M @ H:i:s');
		 }
	       }
	       elem.innerHTML = "<b><span id='time"+n+"' title='"+ s +"'>-</span></b><br><nobr><span id='done"+n+"' style='font-size: xx-small; color: "+getAgeCol(s)+"'>" + endTime + "</span></nobr>"
	    }
	  }
};
  // formatDate :
// a PHP date like function, for formatting date strings
// authored by Svend Tofte <www.svendtofte.com>
// the code is in the public domain
//
// see http://www.svendtofte.com/javascript/javascript-date-string-formatting/
// and http://www.php.net/date
//
// thanks to
//  - Daniel Berlin <mail@daniel-berlin.de>,
//    major overhaul and improvements
//  - Matt Bannon,
//    correcting some stupid bugs in my days-in-the-months list!
//  - levon ghazaryan. pointing out an error in z switch.
//  - Andy Pemberton. pointing out error in c switch
//
// input : format string
// time : epoch time (seconds, and optional)
//
// if time is not passed, formatting is based on
// the current "this" date object's set time.
//
// supported switches are
// a, A, B, c, d, D, F, g, G, h, H, i, I (uppercase i), j, l (lowecase L),
// L, m, M, n, N, O, P, r, s, S, t, U, w, W, y, Y, z, Z
//
// unsupported (as compared to date in PHP 5.1.3)
// T, e, o

Date.prototype.formatDate = function (input,time) {

    var daysLong =    ["Sunday", "Monday", "Tuesday", "Wednesday",
                       "Thursday", "Friday", "Saturday"];
    var daysShort =   ["Sun", "Mon", "Tue", "Wed",
                       "Thu", "Fri", "Sat"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr",
                       "May", "Jun", "Jul", "Aug", "Sep",
                       "Oct", "Nov", "Dec"];
    var monthsLong =  ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"];

    var switches = { // switches object

        a : function () {
            // Lowercase Ante meridiem and Post meridiem
            return date.getHours() > 11? "pm" : "am";
        },

        A : function () {
            // Uppercase Ante meridiem and Post meridiem
            return (this.a().toUpperCase ());
        },

        B : function (){
            // Swatch internet time. code simply grabbed from ppk,
            // since I was feeling lazy:
            // http://www.xs4all.nl/~ppk/js/beat.html
            var off = (date.getTimezoneOffset() + 60)*60;
            var theSeconds = (date.getHours() * 3600) +
                             (date.getMinutes() * 60) +
                              date.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },

        c : function () {
            // ISO 8601 date (e.g.: "2004-02-12T15:19:21+00:00"), as per
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html
            return (this.Y() + "-" + this.m() + "-" + this.d() + "T" +
                    this.H() + ":" + this.i() + ":" + this.s() + this.P());
        },

        d : function () {
            // Day of the month, 2 digits with leading zeros
            var j = String(this.j());
            return (j.length == 1 ? "0"+j : j);
        },

        D : function () {
            // A textual representation of a day, three letters
            return daysShort[date.getDay()];
        },

        F : function () {
            // A full textual representation of a month
            return monthsLong[date.getMonth()];
        },

        g : function () {
           // 12-hour format of an hour without leading zeros, 1 through 12!
           if (date.getHours() == 0) {
               return 12;
           } else {
               return date.getHours()>12 ? date.getHours()-12 : date.getHours();
           }
       },

        G : function () {
            // 24-hour format of an hour without leading zeros
            return date.getHours();
        },

        h : function () {
            // 12-hour format of an hour with leading zeros
            var g = String(this.g());
            return (g.length == 1 ? "0"+g : g);
        },

        H : function () {
            // 24-hour format of an hour with leading zeros
            var G = String(this.G());
            return (G.length == 1 ? "0"+G : G);
        },

        i : function () {
            // Minutes with leading zeros
            var min = String (date.getMinutes ());
            return (min.length == 1 ? "0" + min : min);
        },

        I : function () {
            // Whether or not the date is in daylight saving time (DST)
            // note that this has no bearing in actual DST mechanics,
            // and is just a pure guess. buyer beware.
            var noDST = new Date ("January 1 " + this.Y() + " 00:00:00");
            return (noDST.getTimezoneOffset () ==
                    date.getTimezoneOffset () ? 0 : 1);
        },

        j : function () {
            // Day of the month without leading zeros
            return date.getDate();
        },

        l : function () {
            // A full textual representation of the day of the week
            return daysLong[date.getDay()];
        },

        L : function () {
            // leap year or not. 1 if leap year, 0 if not.
            // the logic should match iso's 8601 standard.
            // http://www.uic.edu/depts/accc/software/isodates/leapyear.html
            var Y = this.Y();
            if (
                (Y % 4 == 0 && Y % 100 != 0) ||
                (Y % 4 == 0 && Y % 100 == 0 && Y % 400 == 0)
                ) {
                return 1;
            } else {
                return 0;
            }
        },

        m : function () {
            // Numeric representation of a month, with leading zeros
            var n = String(this.n());
            return (n.length == 1 ? "0"+n : n);
        },

        M : function () {
            // A short textual representation of a month, three letters
            return monthsShort[date.getMonth()];
        },

        n : function () {
            // Numeric representation of a month, without leading zeros
            return date.getMonth()+1;
        },

        N : function () {
            // ISO-8601 numeric representation of the day of the week
            var w = this.w();
            return (w == 0 ? 7 : w);
        },

        O : function () {
            // Difference to Greenwich time (GMT) in hours
            var os = Math.abs(date.getTimezoneOffset());
            var h = String(Math.floor(os/60));
            var m = String(os%60);
            h.length == 1? h = "0"+h:1;
            m.length == 1? m = "0"+m:1;
            return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
        },

        P : function () {
            // Difference to GMT, with colon between hours and minutes
            var O = this.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },

        r : function () {
            // RFC 822 formatted date
            var r; // result
            //  Thu         ,     21               Dec              2000
            r = this.D() + ", " + this.d() + " " + this.M() + " " + this.Y() +
            //    16          :    01          :    07               0200
            " " + this.H() + ":" + this.i() + ":" + this.s() + " " + this.O();
            return r;
        },

        s : function () {
            // Seconds, with leading zeros
            var sec = String (date.getSeconds ());
            return (sec.length == 1 ? "0" + sec : sec);
        },

        S : function () {
            // English ordinal suffix for the day of the month, 2 characters
            switch (date.getDate ()) {
                case  1: return ("st");
                case  2: return ("nd");
                case  3: return ("rd");
                case 21: return ("st");
                case 22: return ("nd");
                case 23: return ("rd");
                case 31: return ("st");
                default: return ("th");
            }
        },

        t : function () {
            // thanks to Matt Bannon for some much needed code-fixes here!
            var daysinmonths = [null,31,28,31,30,31,30,31,31,30,31,30,31];
            if (this.L()==1 && this.n()==2) return 29; // ~leap day
            return daysinmonths[this.n()];
        },

        U : function () {
            // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
            return Math.round(date.getTime()/1000);
        },

        w : function () {
            // Numeric representation of the day of the week
            return date.getDay();
        },

        W : function () {
            // Weeknumber, as per ISO specification:
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html

            var DoW = this.N ();
            var DoY = this.z ();

            // If the day is 3 days before New Year's Eve and is Thursday or earlier,
            // it's week 1 of next year.
            var daysToNY = 364 + this.L () - DoY;
            if (daysToNY <= 2 && DoW <= (3 - daysToNY)) {
                return 1;
            }

            // If the day is within 3 days after New Year's Eve and is Friday or later,
            // it belongs to the old year.
            if (DoY <= 2 && DoW >= 5) {
                return new Date (this.Y () - 1, 11, 31).formatDate ("W");
            }

            var nyDoW = new Date (this.Y (), 0, 1).getDay ();
            nyDoW = nyDoW != 0 ? nyDoW - 1 : 6;

            if (nyDoW <= 3) { // First day of the year is a Thursday or earlier
                return (1 + Math.floor ((DoY + nyDoW) / 7));
            } else {  // First day of the year is a Friday or later
                return (1 + Math.floor ((DoY - (7 - nyDoW)) / 7));
            }
        },

        y : function () {
            // A two-digit representation of a year
            var y = String(this.Y());
            return y.substring(y.length-2,y.length);
        },

        Y : function () {
            // A full numeric representation of a year, 4 digits

            // we first check, if getFullYear is supported. if it
            // is, we just use that. ppks code is nice, but wont
            // work with dates outside 1900-2038, or something like that
            if (date.getFullYear) {
                var newDate = new Date("January 1 2001 00:00:00 +0000");
                var x = newDate .getFullYear();
                if (x == 2001) {
                    // i trust the method now
                    return date.getFullYear();
                }
            }
            // else, do this:
            // codes thanks to ppk:
            // http://www.xs4all.nl/~ppk/js/introdate.html
            var x = date.getYear();
            var y = x % 100;
            y += (y < 38) ? 2000 : 1900;
            return y;
        },


        z : function () {
            // The day of the year, zero indexed! 0 through 366
            var s = "January 1 " + this.Y() + " 00:00:00 GMT" + this.O();
            var t = new Date(s);
            var diff = date.getTime() - t.getTime();
            return Math.floor(diff/1000/60/60/24);
        },

        Z : function () {
            // Timezone offset in seconds
            return (date.getTimezoneOffset () * -60);
        }

    }

    function getSwitch(str) {
        if (switches[str] != undefined) {
            return switches[str]();
        } else {
            return str;
        }
    }

    var date;
    if (time) {
        var date = new Date (time);
    } else {
        var date = this;
    }

    var formatString = input.split("");
    var i = 0;
    while (i < formatString.length) {
        if (formatString[i] == "%") {
            // this is our way of allowing users to escape stuff
            formatString.splice(i,1);
        } else {
            formatString[i] = getSwitch(formatString[i]);
        }
        i++;
    }

    return formatString.join("");
}


// Some (not all) predefined format strings from PHP 5.1.1, which
// offer standard date representations.
// See: http://www.php.net/manual/en/ref.datetime.php#datetime.constants
//

// Atom      "2005-08-15T15:52:01+00:00"
Date.DATE_ATOM    = "Y-m-d%TH:i:sP";
// ISO-8601  "2005-08-15T15:52:01+0000"
Date.DATE_ISO8601 = "Y-m-d%TH:i:sO";
// RFC 2822  "Mon, 15 Aug 2005 15:52:01 +0000"
Date.DATE_RFC2822 = "D, d M Y H:i:s O";
// W3C       "2005-08-15 15:52:01+00:00"
Date.DATE_W3C     = "Y-m-d%TH:i:sP";


function getAgeCol(age) {
		var col = '#461B7E'; // 72 hours +
		if (age <= 3600)
			col = '#FFFFFF'; // 1 hour
		else if (age <=10800)
			col = '#FFFFFF'; // 3 hours
		else if (age <=21600)
			col = '#9E7BFF'; // 6 hours
		else if (age <=43200)
			col = '#9172EC'; // 12 hours
		else if (age <=86400)
			col = '#8467D7'; // 24 hours
		else if (age <=172800)
			col = '#7A5DC7'; // 48 hours
		else if (age <=259200)
			col = '#461B7E'; // 72 hours
		return col;
}

function debrisShow(){
	spanArray = document.getElementsByTagName("span")
	for(i=0; i<spanArray.length; i++){
		if(spanArray[i].getAttribute("class") == "gray"){
		spanArray[i].innerHTML = spanArray[i].title
		}
	}
}

function formatVariousNumbers()
{

	var debrisElement = document.evaluate(
    "//center[contains(text(),'Debris')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(debrisElement !=null)
    {
        var debrisMessage = debrisElement.textContent;
        console.log(debrisMessage);
        var indexOfText = debrisMessage.indexOf(" credits");
        var valueText = debrisMessage.substring(0,indexOfText);
        var value = commaFormat(parseInt(valueText));
        //console.log(valueText+" new value:" +value.toString());
        //console.log(debrisElement.textContent + " -< " + debrisElement.textContent.replace(valueText,value.toString()));
        debrisElement.textContent = debrisElement.textContent.replace(valueText,value.toString());
    }
}

function scannerFormat(){
	baseArray=document.getElementsByTagName("a")
	bases = GM_getValue(server+"Bases")
	for(i=0; i<baseArray.length; i++){
		if(baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
			basecoord=baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)
			if(bases.match(basecoord)){
			baseArray[i].setAttribute("style", "color: red; font-weight: normal;")
			}
		}
	}
}

var galaxyInfoArrays = new Array();
function getGalaxyInfoArray(galaxy){
	if(galaxyInfoArrays[galaxy]==undefined)
	{
		var newArray = new Array(20);
		for(var i = 0; i < 20;i++)
		{
			newArray[i] = 0;
		}
		galaxyInfoArrays[galaxy] = new Array(galaxy,0,newArray,0,0);//[galaxy number],[mobile fleet count],[mobilefleetarray],[total fighting fleet],[total fleet],
	}
	return galaxyInfoArrays[galaxy];
}

function isBase(base)
{
	bases = GM_getValue(server+"Bases")
    if(bases==null)
    return false;
    if(bases.match(base)){
        return true;
    }else{
    return false;
	}
}

function insertTotalsRow(node,sums,mobileSums,fleetCount,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal){
    
	//GALAXY ROWS
	for(var i = 0;i<galaxyInfoArrays.length;i++)
	{
		var galaxyInfoArray = galaxyInfoArrays[i];
		if(galaxyInfoArray==undefined || galaxyInfoArray[1] == 0)
			continue;
		
		var sumRow = document.createElement("tr");
	    sumRow.setAttribute('align','center');
	    
	    var element = sumRow.insertCell(0);
	    element.textContent = "Mobile Fleets ("+i+")";
	    element = sumRow.insertCell(1);
	    element.textContent = galaxyInfoArray[1];
	    
		var galaxyFleetSums = galaxyInfoArray[2];
		for(var k = 0; k < 20; k++)
	    {
	        //console.log(sums[k]);
	        var cell = document.createElement("td");
	        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	        if(galaxyFleetSums[k] > 0)
				cell.innerHTML = "<small>"+galaxyFleetSums[k]+"</small>";
	        //console.log(element);
	        sumRow.insertBefore(cell,null);
	    }
	    //Add totals cell
	    var cell = document.createElement("td");
	    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	    cell.innerHTML =galaxyInfoArray[3] +" / "+ galaxyInfoArray[4];
	    //console.log(element);
	    sumRow.insertBefore(cell,null);
	    node.insertBefore(sumRow,null);
	}
	//MOBILE ROW
	var sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    var element = sumRow.insertCell(0);
    element.textContent = "Total Mobile Fleets";
    element = sumRow.insertCell(1);
    element.textContent = mobileFleetCount;
    for(var k = 0; k < 20; k++)
    {
        //console.log(sums[k]);
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(mobileSums[k] > 0)
			cell.innerHTML = "<small>"+mobileSums[k]+"</small>";
        //console.log(element);
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallMobileFightingFleetTotal +" / "+ overallMobileFleetTotal;
    //console.log(element);
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
    //TOTAL ROW
    sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    element = sumRow.insertCell(0);
    element.textContent = "Total Fleets";
    element = sumRow.insertCell(1);
    element.textContent = fleetCount;
    for(var k = 0; k < 20; k++)
    {
        //console.log(sums[k]);
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(sums[k] > 0)
			cell.innerHTML = "<small>"+sums[k]+"</small>";
        //console.log(element);
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallFightingFleetTotal +" / "+ overallFleetTotal;
    //console.log(element);
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
}

function node(opt) {
  function attr(name) {
    var value = opt[name];
    delete opt[name];
    return value;
  }
  var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };
  var id = opt.id;
  var n = document.getElementById(id);
  if (!n) {
    var tag = attr("tag") || "div";
    if ("string" == typeof tag)
      n = document.createElement(tag);
    else {
      var t = document.createElement("div");
      t.innerHTML = tag.toXMLString();

      var ids = {};
      for each (var n in $x('.//*[@id]', t))
        ids[n.id] = 1;
      if (!n) ids = null;

      var r = document.createRange();
      r.selectNodeContents(t);
      n = r.extractContents();
      if (n.childNodes.length == 1)
        n = n.firstChild;
    }
    var after = attr("after");
    var before = opt.prepend ? opt.prepend.firstChild : attr("before");
    var parent = attr("prepend") || attr("append") ||
                   (before || after || {}).parentNode;
    if (parent) {
      if (before)
        parent.insertBefore(n, before);
      else if (after)
        parent.insertBefore(n, after.nextSibling);
      else
        parent.appendChild(n);
    }
    if (id) n.id = id;
  }
  var html = attr("html");
  if ("undefined" != typeof html) n.innerHTML = html;
  var text = attr("text");
  if ("undefined" != typeof text) n.textContent = text;
  var style = attr("style");
  if (style)
    for (var prop in style)
      n.style[prop] = style[prop];
  for (prop in opt)
    if (expandos[prop])
      n[prop] = opt[prop];
    else
      n.setAttribute(prop, opt[prop]+"");
  if (ids)
    for (var id in ids)
      ids[id] = document.getElementById(id);
  return ids || n;
}


function enhanceConstructionPage() {
  urbanAdjust = 0;
  solarAdjust = 0;
  gasAdjust = 0;
  fusionAdjust = 0;
  antimatterAdjust = 0;
  researchAdjust = 0;
  metalAdjust = 0;
  crystalAdjust = 0;
  roboticsAdjust = 0;
  shipyardsAdjust = 0;
  osAdjust = 0;
  spaceportsAdjust = 0;
  ccAdjust = 0;
  naniteAdjust = 0;
  androidAdjust = 0;
  economicAdjust = 0;
  terraformAdjust = 0;
  mlpAdjust = 0;
  orbitalbaseAdjust = 0;
  jgAdjust = 0;
  biosphereAdjust = 0;
  capitalAdjust = 0;
  barrackAdjust = 0;
  laserAdjust = 0;
  missileAdjust = 0;
  plasmabaseAdjust = 0;
  ionAdjust = 0;
  photonAdjust = 0;
  disruptorAdjust = 0;
  deflectionAdjust = 0;
  pshieldAdjust = 0;
  pringAdjust = 0;
  tableArray = document.getElementsByTagName("table")
  for(i=0; i<tableArray.length; i++){
  if(tableArray[i].innerHTML.match(/<th colspan=.2.>Construction Queue<.th>/)){
  for(a=1; a<tableArray[i].childNodes[0].childNodes.length; a++){
  if(!tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/<select name=.add_stack.>/)){
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Urban Structures/))
  urbanAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Solar Plants/))
  solarAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Gas Plants/))
  gasAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Fusion Plants/))
  fusionAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Antimatter Plants/))
  antimatterAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Research Labs/))
  researchAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Metal Refineries/))
  metalAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Crystal Mines/))
  crystalAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Robotic Factories/))
  roboticsAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Shipyards/) && !tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Orbital Shipyards/))
  shipyardsAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Orbital Shipyards/))
  osAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Spaceports/))
  spaceportsAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Command Centers/))
  ccAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Nanite Factories/))
  naniteAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Androids Factories/))
  androidAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Economic Centers/))
  economicAdjust++;
if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Terraform/))
  terraformAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Multi-Level Platforms/))
  mlpAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Orbital Base/))
  orbitalbaseAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Jump Gate/))
  jgAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Biosphere Modification/))
  biosphereAdjust++;
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Capital/))
  capitalAdjust++;
}
  }
  }
  }
	table = document.evaluate( "//th[@class='th_header2']/../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var i_lastcolumn = 5;
	var forms = document.getElementsByTagName('form');
	if (!table.innerHTML.match(/The research of this base is linked to/)){
	if (table && table.childNodes.length > 4) {
		table.childNodes[0].style.display='none';
		table.childNodes[2].style.display='none';
		for (var nrow=3; nrow<table.childNodes.length; nrow+=2) {
			if(!table.childNodes[nrow].innerHTML.match(/Research Labs linked to this base research./)){
			table.childNodes[nrow+1].style.display='none';
			}
		}
	}
	techmultipliers=GM_getValue(server+"techData", "0").split(",")
	var energytechmultiplier = (techmultipliers[0]*0.05)+1;
	var averageroute = GM_getValue(server+"averageRoute", "31");
	var fertility = 0;
	var uspopcost = 0;
	var obpopcost = 0;
	var obcostparentnode = 0;
	var popcost = 0;
	var areacost = 0;
	var energycost = 0;
	var econcost = 0;
	var prodcost = 0;
	var constcost = 0;
	var flag = 0;
	var bestAreaSignifier = node({tag: 'span', html: ' <br /> (Best Area)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestEconSignifier = node({tag: 'span', html: ' <br /> (Best Econ)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestProdSignifier = node({tag: 'span', html: ' <br /> (Best Prod)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestConstSignifier = node({tag: 'span', html: ' <br /> (Best Const)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestPopSignifier = node({tag: 'span', html: ' <br /> (Best Pop)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestEnergySignifier = node({tag: 'span', html: ' <br /> (Best Energy)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	for (var nrow=3; nrow<table.childNodes.length; nrow+=2) {
		if(!table.childNodes[nrow].innerHTML.match(/linked to this base research./)){
		var cname = table.childNodes[nrow].childNodes[1].firstChild.firstChild.firstChild.firstChild.nodeValue + table.childNodes[nrow].childNodes[1].firstChild.firstChild.childNodes[1].nodeValue;
		if (location.search.indexOf('view=structures')!=-1) {
			table.childNodes[nrow].title = cname;
			var td1help_res = table.childNodes[nrow+1].innerHTML.match(/(fertility|metal resource|crystals resource).\((.+?)\)/)
			if (td1help_res) {
			if (flag == 0){
				if(td1help_res[1]=="fertility"){
				var td1help = "&nbsp;(Fert "+td1help_res[2]+")"
				}else if(td1help_res[1]=="metal resource"){
				var td1help = "&nbsp;(Metal "+td1help_res[2]+")"
				}else if(td1help_res[1]=="crystals resource"){
				var td1help = "&nbsp;(Crystal "+td1help_res[2]+")"
				}
				var d = table.childNodes[nrow].childNodes[1].innerHTML + td1help;
				table.childNodes[nrow].childNodes[1].innerHTML = d
				}
			}
				if (cname=='Terraform') {
				makeAdjustments(nrow, terraformAdjust)
				terracost = parseInt(itemcost) / 5;
					if(areacost == 0 || areacost > terracost){
					areacost = terracost
					table.childNodes[nrow].childNodes[2].appendChild(bestAreaSignifier);
					}
				}
				if (cname=='Multi-Level Platforms') {
				adjust = mlpAdjust
				makeAdjustments(nrow, mlpAdjust)
					var cost = parseInt(itemcost) / 10;
					if (cost < areacost) {
						areacost = cost;
						bestAreaSignifier.parentNode.removeChild(bestAreaSignifier);
						table.childNodes[nrow].childNodes[2].appendChild(bestAreaSignifier);
					}
				}
				if (cname=='Urban Structures') {
				makeAdjustments(nrow, urbanAdjust)
          USLevel = table.childNodes[nrow].childNodes[1].innerHTML.match(/\(Level [0-9]{1,}/);
          USLevel = parseInt(USLevel[0].replace(/\(Level /, ""));
					fertility = parseInt(td1help_res[2]);
					uspopcost = parseInt(itemcost);
					uspopcost = (uspopcost+areacost) / fertility;
					if (popcost == 0 || popcost > uspopcost){
					popcost = uspopcost;
					table.childNodes[nrow].childNodes[2].appendChild(bestPopSignifier);
					}
				}
				if (cname=='Orbital Base') {
				makeAdjustments(nrow, orbitalbaseAdjust)
					obpopcost = parseInt(itemcost) / 10;
					obcostparentnode = table.childNodes[nrow].childNodes[2];
					if (obpopcost && obpopcost < popcost) {
						popcost = obpopcost;
						bestPopSignifier.parentNode.removeChild(bestPopSignifier);
						table.childNodes[nrow].childNodes[2].appendChild(bestPopSignifier);			
					}
				}				
				if (cname=='Solar Plants' || cname=='Gas Plants' || cname=='Fusion Plants' || cname=='Antimatter Plants') {
				if(cname=='Solar Plants'){
				adjust = solarAdjust
				}else if(cname=='Gas Plants'){
				adjust = gasAdjust
				}else if(cname=='Fusion Plants'){
				adjust = fusionAdjust
				}else if(cname=='Antimatter Plants'){
				adjust = antimatterAdjust
				}
makeAdjustments(nrow, adjust)
					var c = parseInt(itemcost);
					var e = parseInt(table.childNodes[nrow].childNodes[3].firstChild.nodeValue.slice(1));
					c = (c + popcost + areacost) / (energytechmultiplier*e);
					if (e>2){
					if (!energycost)
						energycost = c;
					if (c <= energycost) {
						energycost = c;
						if (bestEnergySignifier.parentNode)
							bestEnergySignifier.parentNode.removeChild(bestEnergySignifier);
							table.childNodes[nrow].childNodes[2].appendChild(bestEnergySignifier);
					}
					}
				}
				if (cname == "Biosphere Modification"){
makeAdjustments(nrow, biosphereAdjust)
          var biopopcost = parseInt(itemcost);
					biopopcost = (biopopcost+(24*energycost)+areacost)/USLevel
					
					if (biopopcost < popcost) {
						popcost = biopopcost;
						bestPopSignifier.parentNode.removeChild(bestPopSignifier);
						table.childNodes[nrow].childNodes[2].appendChild(bestPopSignifier);
						
						
					}
				}
				if (cname == "Metal Refineries"){
				makeAdjustments(nrow, metalAdjust)
				var metal = parseInt(td1help_res[2]);
				var metalcost = parseInt(itemcost);
				metalprodcost = (metalcost + energycost + areacost + popcost)/ metal
				metalconstcost = (metalcost + energycost + areacost + popcost)/ metal
				metaleconcost = (metalcost + energycost + areacost + popcost)
          	if(econcost == 0 || econcost > metaleconcost){
          	econcost = metaleconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost == 0 || prodcost > metalprodcost){
          	prodcost = metalprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}			
						if(constcost == 0 || constcost > metalconstcost){
          	constcost = metalconstcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestConstSignifier);
						}			
					
				}
				if (cname == "Crystals Mines"){
				makeAdjustments(nrow, crystalAdjust)
				var crystals = parseInt(td1help_res[2]);
				var crystalcost = parseInt(itemcost);
				crystalcost = (crystalcost + energycost + areacost)/ crystals
          	if(econcost > crystalcost){
          	econcost = crystalcost;
						
							table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
							}
					
				}
			}
				if (cname == "Robotic Factories"){
				makeAdjustments(nrow, roboticsAdjust)
				var robscost = parseInt(itemcost);
				robsprodcost = (robscost + energycost + areacost + popcost)/ 2
				robsconstcost = (robscost + energycost + areacost + popcost)/ 2
				robseconcost = (robscost + energycost + areacost + popcost)
          	if(econcost > robseconcost){
          	econcost = robseconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost > robsprodcost){
          	prodcost = robsprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}			
						if(constcost > robsconstcost){
          	constcost = robsconstcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestConstSignifier);
						}			
					
				}
				if (cname == "Shipyards"){
				makeAdjustments(nrow, shipyardsAdjust)
				var shipscost = parseInt(itemcost);
				shipsprodcost = (shipscost + energycost + areacost + popcost)/ 2
        shipseconcost = (shipscost + energycost + areacost + popcost)
          	if(econcost > shipseconcost){
          	econcost = shipseconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost > shipsprodcost){
          	prodcost = shipsprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}					
				}
				if (cname == "Orbital Shipyards"){
				makeAdjustments(nrow, osAdjust)
				var oscost = parseInt(itemcost);
				osprodcost = (oscost + (energycost*12) + popcost)/8
        oseconcost = (oscost + (energycost*12) + popcost)/2
          	if(econcost > oseconcost){
          	econcost = oseconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost > osprodcost){
          	prodcost = osprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}					
				}
				if (cname == "Spaceports"){
				makeAdjustments(nrow, spaceportsAdjust)
				var Spcost = parseInt(itemcost);
				Spcost = (Spcost + energycost + areacost)/ 2
          	if(econcost > Spcost){
          	econcost = Spcost;
							table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
							}
					
				}
				if (cname == "Nanite Factories"){
				makeAdjustments(nrow, naniteAdjust)
				var nanicost = parseInt(itemcost);
				naniprodcost = (nanicost + (energycost*2) + areacost + popcost)/ 4
				naniconstcost = (nanicost + (energycost*2) + areacost + popcost)/ 4
				nanieconcost = (nanicost + (energycost*2) + areacost + popcost) /2
          	if(econcost > nanieconcost){
          	econcost = nanieconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost > naniprodcost){
          	prodcost = naniprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}			
						if(constcost > naniconstcost){
          	constcost = naniconstcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestConstSignifier);
						}			
					
				}
				if (cname == "Androids Factories"){
				makeAdjustments(nrow, androidAdjust)
				var andrcost = parseInt(itemcost);
				andrprodcost = (andrcost + (energycost*4) + areacost + popcost)/ 6
				andrconstcost = (andrcost + (energycost*4) + areacost + popcost)/ 6
				andreconcost = (andrcost + (energycost*4) + areacost + popcost) /2
          	if(econcost > andreconcost){
          	econcost = andreconcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}
						if(prodcost > andrprodcost){
          	prodcost = andrprodcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestProdSignifier);
						}			
						if(constcost > andrconstcost){
          	constcost = andrconstcost;
						table.childNodes[nrow].childNodes[2].appendChild(bestConstSignifier);
						}			
					
				}
				
				if (cname == "Economic Centers"){
				makeAdjustments(nrow, economicAdjust)
				var eccost = parseInt(itemcost)
				eccost = (eccost + (energycost*2) + areacost + popcost) /3
          	if(econcost > eccost){
          	econcost = eccost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}					
				}
        if (cname == "Capital"){
        makeAdjustments(nrow, capitalAdjust)
				basesArray = GM_getValue(server+"Bases")
				var eccost = parseInt(itemcost)
				eccost = (eccost + (energycost*12) + areacost + popcost) / (10+basesArray.length)
          	if(econcost > eccost){
          	econcost = eccost;
						table.childNodes[nrow].childNodes[2].appendChild(bestEconSignifier);
						}					
				}
				        if (cname == "Research Labs"){
        makeAdjustments(nrow, researchAdjust)
				}
					        if (cname == "Command Centers"){
        makeAdjustments(nrow, ccAdjust)
				}
		if (flag == 0){		
		    	getOptionValue(cname);
	
	if (v==1) {
		buttontext=document.createElement("a")
		buttontext.href="javascript:document.getElementsByName('add_stack')[0].selectedIndex="+a+"; document.getElementsByTagName('form')[1].submit()"
		buttontext.innerHTML = "Queue"
			if (buttontext) {
			if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=research/)){
			colnum=3
			}else{
			colnum=5
			}
				table.childNodes[nrow].childNodes[colnum].style.whiteSpace='nowrap';
				table.childNodes[nrow].childNodes[colnum].appendChild(buttontext);
			}
	}
	if (flag == 0 && nrow==table.childNodes.length-1){
						flag =1;
						nrow = 1;
						}		
}
}
}
}
}
function buttonToSelect(option, text, fallback_text) {

}

function makeAdjustments(nrow, adjustvar){
adjust = adjustvar
				if(table.childNodes[nrow].childNodes[6].innerHTML.match(/<span id="time/)){
				adjust++ 
				}
				if(adjust>0){
				basecost = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue.replace(/(,| |\.)/g, ""))
				time = getSeconds(table.childNodes[nrow].childNodes[5].firstChild.nodeValue)/basecost
				time = secsToHMS(time*(Math.round(basecost*Math.pow(1.5, adjust))))
				table.childNodes[nrow].childNodes[5].innerHTML = table.childNodes[nrow].childNodes[5].innerHTML + "<br />("+time+") "
        table.childNodes[nrow].childNodes[1].innerHTML = table.childNodes[nrow].childNodes[1].innerHTML + " (+"+adjust+")"
        table.childNodes[nrow].childNodes[2].firstChild.nodeValue = table.childNodes[nrow].childNodes[2].firstChild.nodeValue + " ("+Math.round((basecost*Math.pow(1.5, adjust)))+")"
        itemcost = table.childNodes[nrow].childNodes[2].firstChild.nodeValue.replace(/(,| |\.)/g, "")
        itemcost = itemcost.replace(/[0-9]+\(/,"")
        itemcost = itemcost.replace(/\)/, "")
        }else{
        itemcost = table.childNodes[nrow].childNodes[2].firstChild.nodeValue.replace(/(,| |\.)/g, "")
        }
        }

function secsToHMS(seconds){
        secVar0 = Math.round(seconds);                            // The initial data, in seconds
        minVar = Math.floor(secVar0/60);  // The minutes   
        hourVar = Math.floor(minVar/60);  // The minutes
        minVar = minVar % 60;
        secVar = secVar0 % 60;              // The balance of seconds
        if(hourVar != 0){
        return hourVar+"h "+(minVar<10?'0'+minVar:minVar)+"m "+(secVar<10?'0'+secVar:secVar)+"s"
        }else if(minVar != 0){
        return (minVar<10?'0'+minVar:minVar)+"m "+(secVar<10?'0'+secVar:secVar)+"s"
        }else{
        return (secVar<10?'0'+secVar:secVar)+"s"
        }
        
        }

function getOptionValue(obj)
{
v=0
x = document.getElementsByName("add_stack")
if(x[0]){
x = x[0]
for (i=0;i<x.length;i++)
    {
    if(x.options[i].text == obj){
    v=1;
	a=i
    i = x.length
    }
    }
    }
    }
/*
function insertTimeTextBoxes(){
    var inputs = document.forms[1].elements;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].className == 'quant')
        {
            var row = inputs[i].parentNode.parentNode;
            //console.log(row);
            var cell = document.createElement("td");
            cell.setAttribute("align","center");
            cell.innerHTML = '<input type="text" value="" maxlength="5" size="5" name="'+inputs[i].name+' - Time" id="'+inputs[i].name+' - Time" class="quant" onchange="update(\''+inputs[i].name+'\')"/>';
            row.appendChild(cell);
            cell.addEventListener('keyup',getConvertTimeToQuantityClosure(row),true);
			//cell.addEventListener('blur',onProductionTextBoxChanged,true);
        }
    }
        var tbody = inputs[0].parentNode.parentNode.parentNode;
    //console.log(tbody.childNodes[0].firstChild);
    //Adjust colspan for top row and third row
    tbody.childNodes[0].firstChild.setAttribute("colspan",7);
    tbody.childNodes[2].firstChild.setAttribute("colspan",7);
    //console.log(tbody.childNodes[1].firstChild);
    //Insert column title
    var titleCell = document.createElement("th");
    titleCell.setAttribute("width","10%");
    titleCell.textContent = "Time (h)"
    tbody.childNodes[1].appendChild(titleCell);
	
	titleCell.previousSibling.setAttribute("width","10%");
    //adjust colspan for all help rows
    var helpCells = document.evaluate(
    "//td[@class='help']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(helpCells.snapshotLength);
    for(var i=0;i<helpCells.snapshotLength;i++)
    {
        helpCells.snapshotItem(i).setAttribute("colspan",6);
    }
    //adjust colspan for all red rows
    var redCells = document.evaluate(
    "//td[@class='red']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<redCells.snapshotLength;i++)
    {
        redCells.snapshotItem(i).setAttribute("colspan",2);
    }
    //adjust colspan for last two rows
    document.getElementById("fast").addEventListener("click", function(){var inputs = document.forms[1].elements; for(var i = 0; i < inputs.length; i++){if(inputs[i].className == 'quant'){if(inputs[i].value == ""){}else{var row = inputs[i].parentNode.parentNode; convertTimeToQuantity(row); unsafeWindow.update(inputs[i].name);}}}}, false)
    tbody.childNodes[tbody.childNodes.length-1].firstChild.setAttribute("colspan",7);
}
*/
function getConvertTimeToQuantityClosure(row){
    function func(){
        convertTimeToQuantity(row);
    }
    ;
    return func;
}

function convertTimeToQuantity(row){
	//console.log(row);
    var credits = row.childNodes[2].textContent;
    var time = row.childNodes[4].textContent;
    var qtyInput = row.childNodes[5].firstChild;
    var enteredTime;
    try{
        enteredTime = parseFloat(row.childNodes[6].firstChild.value);

    }
    catch(Exception)
    {
        return;
    }
    if(isNaN(enteredTime)){
    enteredTime = 0
    }else{
    //console.log("Credits: "+credits+" Time: "+time+" qtyInput: "+ qtyInput.value);
    //console.log("entered time: "+isNaN(enteredTime));
    var totalSeconds = getSeconds(time);
    if(totalSeconds != -1)
    {
        //console.log("Time " +getTimeDisplay(totalSeconds));
        var enteredTimeInSeconds = enteredTime*60*60;
        //console.log(enteredTimeInSeconds+" / " +totalSeconds);
        if(enteredTimeInSeconds < totalSeconds){
			qtyInput.value = "";
		}else{
			if(document.getElementById("fast").checked == true){
			qtyInput.value = Math.round(enteredTimeInSeconds / totalSeconds)*2
			}else{
				qtyInput.value = Math.round(enteredTimeInSeconds / totalSeconds)
			}
		}
    }
    onProductionTextBoxKeyUp();
    }
}

function getSeconds(timeString){
    var regex = /((\d|,| |\.)*h)?\W?((\d|,| |\.)*m)?\W?((\d|,| |\.)*s)?/;
    var result = regex.exec(timeString);
    if(result)
    {
        //console.log(result);
        var h = 0;var m=0;var s=0;
        if(result[1] != null)
        h = result[1].substring(0,result[1].indexOf("h"));
        if(result[3] != null)
        m = result[3].substring(0,result[3].indexOf("m"));
        if(result[5] != null)
        s = result[5].substring(0,result[5].indexOf("s"));
        return h*60*60 + m*60 + s*1;
    }
    else return -1;
}

function getTimeDisplay(seconds){
    var h = Math.floor(seconds/3600);
    var m = Math.floor((seconds % 3600)/60);
    var s = Math.floor((seconds % 3600) % 60);
    var string = s+"s";
    if(m>0 || h>0)
		string = m+"m "+string;
    if(h>0)
		string = h+"h "+string;
    return string;
}
var PRESET_KEYS = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods");

function onProductionTextBoxKeyUp(){
    var shipName;
    var count=0,cost=0;
    var productionCost = 0;
    var totalTime = 0;
    for(var i = 0;i <PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];
        textBox = document.evaluate(
        "//input[@name='" + shipName + "']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(textBox);
        if(textBox == null)
        {
            //console.log("Failed to find textBox for "+shipName+".");
            continue;
        }
		
		if(textBox.value != "")
        {
            var row = textBox.parentNode.parentNode;
            var time = row.childNodes[4].textContent;
            //console.log(textBox.value);
            count = parseInt(textBox.value);
            cost = parseInt(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML.replace(/(,| |\.)/g, ""));
            totalTime+= getSeconds(time) * count;
            //console.log(count + " " + shipName + "s @ " + cost);
            productionCost += (cost * count);
			//textBox.parentNode.nextSibling.value = "";
        }
    }
    //console.log("total Time: "+getTimeDisplay(totalTime));
    var fastProduction = document.evaluate("//input[@class='check' and @name='fast']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.checked;
    //console.info(fastProduction);
    if(fastProduction)
	{
		productionCost *= 2;
		totalTime /= 2;
	}
    //console.log("Text changed. Total production cost: " +productionCost);
    var submitButton = document.evaluate(
	    "//input[@type='submit']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
    if(productionCost > 0)
		submitButton.value = "Submit";
    else
		submitButton.value = "Submit";
}

function registerTextBoxEventListeners(){
    for(var i = 0;i < PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];
        textBox = document.evaluate(
        "//input[@name='" + shipName + "']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(textBox);
        if(textBox == null)
        {
            //console.info("Failed to find textBox for "+shipName+".");
            continue;
        }
        textBox.addEventListener('keyup',onProductionTextBoxKeyUp,false);
		//textBox.addEventListener('blur',onProductionTextBoxChanged,true);
    }
    document.evaluate("//input[@class='check' and @name='fast']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('change',onProductionTextBoxKeyUp,false);
    //document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxKeyUp,true);
    document.evaluate("//form[@method='post']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('reset',onProductionTextBoxKeyUp,false);
}

function productionHelperOnClick(num, box) {
	num=num.replace("+", "")
	num=num.replace(" ","")
	num=num.replace("k","000")
		document.getElementById(box).value = parseInt(document.getElementById(box).value) + parseInt(num); 
    calculateTotals();
}
function prodHelperEvent(e) {
  if (e.shiftKey && (e.name == 'fast')) {
    for (i=0; i<empireLinks.length; i++) {
    document.getElementById("fast_"+empireLinks[i]).checked = e.checked;
    }
  } else if (e.shiftKey && (e.name == 'unit')) {
    e.blur();
    for (i=0; i<empireLinks.length; i++) {
      document.getElementById("unit_"+empireLinks[i]).selectedIndex = e.selectedIndex;
    }
  } else if (e.shiftKey && (e.name == 'quant')) {
    e.blur();
    for (i=0; i<empireLinks.length; i++) {
      document.getElementById("quant_"+empireLinks[i]).value = e.value;
    }
  }
  if ((e.name == 'fast')||(e.name == 'unit')||(e.name == 'quant'))
    calculateTotals();
}
function calculateTotals() {
	var pcost = 0;
  for (i=0; i<empireLinks.length; i++) {
    n = (document.getElementById("fast_"+empireLinks[i]).checked) ? 2 : 1;
    pcost += parseInt(ProductionGetCost[document.getElementById("unit_"+empireLinks[i]).selectedIndex] * document.getElementById("quant_"+empireLinks[i]).value * n);
	}
	document.getElementById('cost_all').innerHTML = pcost+' credits';
	var credits_left = parseInt(numcredits) - pcost;
	document.getElementById('cost_all').style.color = (credits_left < 0) ? 'red' : '';
}
function resetForm() {
  for (i=0; i<empireLinks.length; i++) {
    document.getElementById("unit_"+empireLinks[i]).selectedIndex = 0;
    document.getElementById("fast_"+empireLinks[i]).checked = false;
    document.getElementById("quant_"+empireLinks[i]).value = 0;
    returnto = i
    calculateTotals();
    i=returnto;
  }
}
function startSubmitQueue() {
  submitQueue(0);
}
function submitQueue(i) {
    if (document.getElementById("quant_"+empireLinks[i]).value != 0) {
      var postData = document.getElementById("unit_"+empireLinks[i]).value+"="+document.getElementById("quant_"+empireLinks[i]).value+"&post_back=true";
      if (document.getElementById("fast_"+empireLinks[i]).checked)
        postData += "&fast=true";
      document.getElementById("quant_"+empireLinks[i]).value = 'ok';
      document.getElementById("quant_"+empireLinks[i]).style.backgroundColor = 'red';
      GM_xmlhttpRequest({
        method: "POST",
        url: serverurl+"base.aspx?base="+empireLinks[i]+"&view=production",
        data: encodeURI(postData),
        headers:{'Content-type':'application/x-www-form-urlencoded'},
     		onreadystatechange: function(xhr) {if (xhr.readyState == "4") {endSubmitQueue(i, "1");}}
      });
    } else {
      endSubmitQueue(i, "0");
    }
}
function endSubmitQueue(i, value) {
time=1000+Math.floor(Math.random()*1001)
  if (i == empireLinks.length-1)
    window.setTimeout(function(){ location.reload(true)}, time);
  else
  if(value == 0){
  submitQueue(i+1)
  }else{
    window.setTimeout(function(){ submitQueue(i+1)}, time);
    }
}



function productionHelper() {
  var btn_details = [];
  btn_details.push([1,'+1 ']);
  btn_details.push([5,'+5 ']);
  btn_details.push([10,'+10 ']);
  btn_details.push([25,'+25 ']);
  btn_details.push([100,'+100 ']);
  btn_details.push([250,'+250 ']);
  btn_details.push([1000,'+1k ']);
  table.rows[1].childNodes[4].innerHTML = 'Fast Prod';
  table.rows[1].childNodes[5].innerHTML = 'Unit Type';
  table.rows[1].childNodes[6].innerHTML = 'Quantity';
  table.rows[1].childNodes[3].innerHTML = 'Current Queue';
  a=0;
  table.firstChild.style.display='none';
  for (i=2; i<table.rows.length; i=i+2) {
    var currentRow = table.rows[i];
		var res = /\?base=((\d|,| |\.)+)/.exec(table.rows[i].childNodes[0].firstChild.href);
	  table.rows[i+1].style.display = 'none';
	  empireLinks[a] = res[1];
	  a++;
	  currentRow.childNodes[3].innerHTML = currentRow.childNodes[5].innerHTML + "<br />" + table.rows[i+1].childNodes[3].innerHTML
    currentRow.childNodes[4].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+res[1]+"' onfocus=\"selectedBox='fast_"+res[1]+"'\" />";
    currentRow.childNodes[6].innerHTML = "<input type='text' name='quant' class='quant' id='quant_"+res[1]+"' size='5' maxlength='5' value='0' onfocus=\"selectedBox='quant_"+res[1]+"'\" />";
    var html = "<select name='unit' id='unit_"+res[1]+"' onfocus=\"selectedBox='unit_"+res[1]+"'\"><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option>";
    html += "<option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option>";
    html += "<option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option>"
    html += "<option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option>";
    html += "<option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option>";
    html += "<option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option>";
    html += "<option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option></select>";
    currentRow.childNodes[5].innerHTML = html;
    document.getElementById("unit_"+res[1]).addEventListener('change', function(){ prodHelperEvent(document.getElementById(unsafeWindow.selectedBox));}, true);
    document.getElementById("quant_"+res[1]).addEventListener('change', function(){ prodHelperEvent(document.getElementById(unsafeWindow.selectedBox));}, true);
    document.getElementById("fast_"+res[1]).addEventListener('change', function(){ prodHelperEvent(document.getElementById(unsafeWindow.selectedBox));}, true);
    for(c=0; c<7; c++) {
      var num = btn_details[c][0];
      l = document.createElement("a");
		l.href = "javascript:void(1);";
		l.id= i + btn_details[c][1];
		l.innerHTML = btn_details[c][1];      
      l.name = "quant_"+res[1];
      currentRow.childNodes[6].appendChild(l);
      document.getElementById(i + btn_details[c][1]).addEventListener('click', function(){ productionHelperOnClick(this.innerHTML, this.name );}, true);
    }
  }
  l = document.createElement("tr");
  l.id="extrarow1";
  table.appendChild(l);
  l = document.createElement("td");
		l.innerHTML = "0 credits";
      l.className = 'help';
      l.align = "right";
      l.id="cost_all"
      document.getElementById("extrarow1").appendChild(l);
      document.getElementById("cost_all").colSpan="7";
      l = document.createElement("tr");
      l.id="extrarow2";
      table.appendChild(l);
      l = document.createElement("td");
      l.className = 'help';
      l.align = "right";
          l.id="prodHelperButtons"
      document.getElementById("extrarow2").appendChild(l);
      document.getElementById("prodHelperButtons").colSpan="7";
      l = document.createElement("input");
      l.type = "reset";
      l.id = "resetButton";
      l.value = "Reset";
      document.getElementById("prodHelperButtons").appendChild(l);
      l = document.createElement("input");
      l.type = "submit";
      l.id = "submitButton";
      l.value = "submit";
      document.getElementById("prodHelperButtons").appendChild(l);
   document.getElementById("submitButton").addEventListener('click', function(){ startSubmitQueue();}, true);
  document.getElementById("resetButton").addEventListener('click', function(){ resetForm();}, true);
}
function productionHelperButton() {
		table = document.evaluate( "//th[@class='th_header2']/../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var prodTitle = table.childNodes[1].childNodes[5];
		scoutButton = document.createElement("a");
		scoutButton.href = "javascript:void(1);";
		scoutButton.id= "prodHelperButton";
		scoutButton.innerHTML=" [&#177;]";
		scoutButton.title = "Production Helper"
		prodTitle.appendChild(scoutButton)
		document.getElementById('prodHelperButton').addEventListener('click', function() {productionHelper();}, true);
	}

function saveTechData(){
    //console.log("Saving tech data");
    var techData = new Array();
    var rows = document.evaluate(
    "//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Tech rows: "+ rows.snapshotLength);
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var techNameCell = document.evaluate(
        "th[1]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        var techValueCell = document.evaluate(
        "td[4]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        if(techNameCell.snapshotLength > 0)
        {
            var techValue = parseInt(techValueCell.snapshotItem(0).innerHTML.replace(/(,| |\.)/g, ""));
            var techName = techNameCell.snapshotItem(0).innerHTML;
            //console.log(techName +": "+techValue);
            techData[i] = techValue;
        }
    }
    GM_setValue(server+"techData",techData.join());
}

/* function scannerGrab(){
tableArray = document.getElementsByTagName("table")
for(i=0; i<tableArray.length; i++){
if(tableArray[i].innerHTML.match(/<th width="10%"><a href="empire.aspx\?view=scanners&amp;order=fleet">Fleet<\/a><\/th><th width="30%"><a href="empire.aspx\?view=scanners&amp;order=player">Player<\/a><\/th><th width="30%"><a href="empire.aspx\?view=scanners&amp;order=destination">Destination<\/a><\/th><th width="20%"><a href="empire.aspx\?view=scanners&amp;order=arrival">Arrival<\/a><\/th><th width="10%"><a href="empire.aspx\?view=scanners&amp;order=size">Size<\/a><\/th>/)){
table = tableArray[i]
fleetId = []
fleetName = []
fleetOwner = []
ownerId = []
fleetDest = []
fleetArrive = []
fleetSize = []
for(a=1; a<table.rows.length; a++){
fleetId[a-1] = table.rows[a].childNodes[0].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=/, "") 
fleetId[a-1] = fleetId[a-1].replace(/">(.+?)<\/a>(.*?)/, "")
fleetName[a-1]=table.rows[a].childNodes[0].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=[0-9]{1,}">/, "")
fleetName[a-1]=fleetName[a-1].replace(/<\/a>/, "");
fleetOwner[a-1]=table.rows[a].childNodes[1].innerHTML.replace(/<a(.*?) href="profile.aspx\?player=[0-9]{1,}">/, "")
fleetOwner[a-1]=fleetOwner[a-1].replace(/<\/a>/, "");
ownerId[a-1] =table.rows[a].childNodes[1].innerHTML.replace(/<a(.*?) href="profile.aspx\?player=/, "")
ownerId[a-1] = ownerId[a-1].replace(/">(.+?)<\/a>(.*?)/, "")
fleetDest[a-1]=table.rows[a].childNodes[2].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)
fleetArrive[a-1]=parseInt(table.rows[a].childNodes[3].title)+Math.round(new Date().getTime()/1000.0)
fleetSize[a-1]=table.rows[a].childNodes[4].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=[0-9]{1,}">/, "")
fleetSize[a-1]=fleetSize[a-1].replace(/<\/a>(.*?)/, "");
fleetSize[a-1]=fleetSize[a-1].replace(/(,| |.)/, "");
}
sendData = "&fleetId="+fleetId+"&fleetName="+fleetName+"&fleetOwner="+fleetOwner+"&ownerId="+ownerId+"&fleetDest="+fleetDest+"&fleetArrive="+fleetArrive+"&fleetSize="+fleetSize+"&seenBy="+document.getElementById('account').parentNode.childNodes[1].innerHTML.replace(/[A-Za-z]./, '')
if(GIAServers.inArray(server)){
sendtoserver(sendData, "scanners.php")
}
}
}
}
*/

// If NS -- that is, !IE -- then set up for mouse capture
document.captureEvents(Event.MOUSEMOVE)

// Set-up to use getMouseXY function onMouseMove
document.addEventListener("mousemove", function(e) {getMouseXY(e)}, true);

// Temporary variables to hold mouse x-y pos.s
var tempX = 0
var tempY = 0

// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
// grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  return true
}

function linkEventListeners(){
if(GIAServers.inArray(server)){
linkArray=document.getElementsByTagName("a")
for(i=0; i<linkArray.length; i++){
if(linkArray[i].href.match(/map.aspx\?(.*?)loc=E[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
linkArray[i].addEventListener("mouseover", function(e) {showBaseInfo(this.href.replace(/http:\/\/(.+?)\.astroempires\.com\/map.aspx\?(.*?)loc=/, ""), tempX, tempY)}, true);
linkArray[i].addEventListener("mouseout", function() {hideBaseInfo(this.href.replace(/http:\/\/(.+?)\.astroempires\.com\/map.aspx\?(.*?)loc=/, ""))}, true);
}
}
}
}

function linkChange(){
	linkArray=document.getElementsByTagName('a')
	for(i=0; i < linkArray.length; i++){
		linkArray[i].target = "_blank"
	}
}

  //////////////////////////////////////////
 /// Execution ////////////////////////////
//////////////////////////////////////////

if(document.location.href.match(/astroempires.com/)){
replaceTime();
if(document.location.href.match(/loc=[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
	if(document.body.innerHTML.match(/<th colspan=.4.>Base<\/th>/)){
	if(GIAServers.inArray(server)){
	centerArray=document.getElementsByTagName('center')
	for(i=0; i<centerArray.length; i++){
	if(centerArray[i].innerHTML.match(/Astro Type:/)){
	baseLink = document.body.innerHTML.match(/base.aspx\?base=[0-9]{1,}/)[0]
	sourceDiv = document.createElement("div")
	sourceDiv.id="baseDiv";
	sourceDiv.innerHTML="Visit the <a href=\""+baseLink+"\">base page</a> to add this base to GIA.<br /><br />";
	centerArray[i].appendChild(sourceDiv)
	}
	}
	}
	}
}else if(document.location.href.match(/[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}/)){
	debrisShow()
}else if(document.location.href.match(/http:\/\/(.+?)\.astroempires\.com\/base\.aspx\?base=[0-9]{1,}$/)){
	if(window.parent.document.location.href != document.location.href){
	baseDetails();
	}
}else if(document.location.href.match(/empire.aspx$/) || document.location.href.match(/empire.aspx\?view=bases_events$/)){
	productionHelperButton();
}else if(document.location.href.match(/view=scanners/)){
	scannerFormat();
}else if(window.location.href.match(/empire.aspx\?view=fleets/)){
        sumShips();
}else if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=structures/) || document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=defenses/) || document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=research/)){
	if(!document.location.href.match(/&info=/)){
enhanceConstructionPage();
}
}else if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=production/)){
insertTimeTextBoxes()
}
if(window.location.href.indexOf('view=move')==-1 && window.location.href.indexOf('view=fleets')==-1 &&
		window.location.href.indexOf('view=production')==-1 && window.location.href.indexOf('view=structures')==-1 &&
		window.location.href.indexOf('view=trade')==-1 && window.location.href.indexOf('view=research')==-1){
		formatVariousNumbers();
	}
	}