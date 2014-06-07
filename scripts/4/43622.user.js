// ==UserScript==
// @name            GIA Script
// @author          Luke Bonaccorsi AKA SpeedySurfer
// @namespace       http://gears.speedysurfer.co.uk
// @contributor     Bhodi - Trades Enhancement
// @description     Scouts for bases in the current region
// @license         Creative Commons Attribution License
// @include			http://*.astroempires.com/*     
// @include			http://*.goonintelagency.com/* 
// @exclude     http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// @exclude            http://wiki.astroempires.com/*
// @exclude            http://support.astroempires.com/*
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
sourceUrl = "http://"+server+".goonintelagency.com/"
}
GIAVersion = "2_4_14"
GIAServers=["beta", "delta", "ceti", "epsilon", "fenix",]
if(document.location.href.match(/astroempires.com/)){
var empireLinks = [];
 var ProductionGetCost = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];
 var numcredits = document.evaluate(
    "/html/body/table/tbody/tr/th/table/tbody/tr[2]/th[2]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    if(numcredits.snapshotItem(0)){
    numcredits = numcredits.snapshotItem(0).innerHTML.replace(/(,| |\.)/g, "");
    }

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
 /// Links ////////////////////////////////
//////////////////////////////////////////

function insertTheSourceLink(){
	sourceDiv = document.createElement("div")
	sourceDiv.style['position'] = "fixed";
	sourceDiv.style['top'] = "0px";
	sourceDiv.style['left'] = "0px";
	sourceDiv.id="sourceLinks";
	sourceDiv.innerHTML = "<span style=\"text-decoration:underline; font-weight: bold\">GIA Menu</span>";
	document.body.appendChild(sourceDiv)
	if(GIAServers.inArray(server)){
	newBr = document.createElement("br")
	document.getElementById("sourceLinks").appendChild(newBr)
	sourceButton = document.createElement("a");
	sourceButton.href = sourceUrl;
	sourceButton.target="_blank";
	sourceButton.id= "sourceButton";
	sourceButton.innerHTML="GIA";
	document.getElementById("sourceLinks").appendChild(sourceButton)
	}
	baseReport=GM_getValue(server+"Base Report")
	fleetReport=GM_getValue(server+"Fleet Report")
	astroReport=GM_getValue(server+"Astro Report")
	debrisReport=GM_getValue(server+"Debris Report")
	status = GM_getValue(server+"Scout Status")
	if(status==0){
	if(baseReport!="" || fleetReport!="" || astroReport!="" || debrisReport!=""){
	newBr = document.createElement("br")
	document.getElementById("sourceLinks").appendChild(newBr)
	reportButton = document.createElement("a");
	reportButton.href = "javascript:void(1);";
	reportButton.id= "reportButton";
	reportButton.innerHTML="Latest Report";
	document.getElementById("sourceLinks").appendChild(reportButton)
	document.getElementById('reportButton').addEventListener("click", function() {if(document.getElementById('reportButton').name != "open"){ document.getElementById('reportButton').name = "open"; reportResults();}}, true);
	}
	}
}

function insertScoutLink() {
	if(document.location.href.match(/http:\/\/(.+?)\.astroempires\.com\/map.aspx\?cmp=[0-9]&loc=[A-Za-z][0-9]{2}:[0-9]{2}$/)){
		newBr = document.createElement("br")
		document.getElementById("sourceLinks").appendChild(newBr)
		scoutButton = document.createElement("a");
		scoutButton.href = "javascript:void(1);";
		scoutButton.id= "scoutButton";
		scoutButton.innerHTML="Scout";
		document.getElementById("sourceLinks").appendChild(scoutButton)
		document.getElementById('scoutButton').addEventListener("click", function() {getSystemLinks();}, true);
	}
}

function insertPauseStop() {
	status = GM_getValue(server+"Scout Status")
	if(status>0){
		newBr = document.createElement("br")
		document.getElementById("sourceLinks").appendChild(newBr)
		if(status==1){	
			scoutButton = document.createElement("a");
			scoutButton.href = "javascript:void(1);";
			scoutButton.id= "pauseButton";
			scoutButton.innerHTML="Pause Scouting";
			document.getElementById("sourceLinks").appendChild(scoutButton)
			document.getElementById('pauseButton').addEventListener("click", function() {pauseScouting();}, true);
		}else{
			scoutButton = document.createElement("a");
			scoutButton.href = "javascript:void(1);";
			scoutButton.id= "contButton";
			scoutButton.innerHTML="Cont. Scouting";
			document.getElementById("sourceLinks").appendChild(scoutButton)
			document.getElementById('contButton').addEventListener("click", function() {contScouting();}, true);
		}
		newBr = document.createElement("br")
		document.getElementById("sourceLinks").appendChild(newBr)
		scoutButton = document.createElement("a");
		scoutButton.href = "javascript:void(1);";
		scoutButton.id= "stopButton";
		scoutButton.innerHTML="Stop Scouting";
		document.getElementById("sourceLinks").appendChild(scoutButton)
		document.getElementById('stopButton').addEventListener("click", function() {stopScoutingButton();}, true);
		newBr = document.createElement("br")
		document.getElementById("sourceLinks").appendChild(newBr)
		scoutButton = document.createElement("span");
		scoutButton.innerHTML=Math.round(parseFloat(GM_getValue(server+"ExtraProgress"))+parseFloat(GM_getValue(server+"BaseProgress")))+"%";
		document.getElementById("sourceLinks").appendChild(scoutButton)
	}
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
	    var st = new Date();
	    var servertime = new Date();
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
		 st.setTime((document.getElementById("clock").title*1000)+(s*1000));
		 servertime.setTime((document.getElementById("clock").title*1000));
		 tempdate = new Date();
		 tempdate.setDate(tempdate.getDate()+1)
		 tempserverdate = new Date();
		 tempserverdate.setDate(tempserverdate.getDate()+1)
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
		 if(servertime.toLocaleDateString() == st.toLocaleDateString() )
		 {
		    endServerTime="Today @ "+st.formatDate('H:i:s');
		 }
		 else if(tempserverdate.toLocaleDateString() == st.toLocaleDateString())
		 {
		    endServerTime="Tomorrow @ "+st.formatDate('H:i:s');
		 }
		 else
		 {
		    endServerTime=st.formatDate('D jS M @ H:i:s');
		 }
	       }
	       elem.innerHTML = "<b><span id='time"+n+"' title='"+ s +"'>-</span></b><br><nobr><span id='done"+n+"' style='font-size: xx-small; color: "+getAgeCol(s)+"'>LT: " + endTime + "</span></nobr>"
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
		var col = '#999999';
		if (age <= 3600)
			col = '#00FF00';
		else if (age <=7200)
			col = '#44FF44';
		else if (age <=10800)
			col = '#88FF88';
		else if (age <=21600)
			col = '#BBFFBB';
		else if (age <=43200)
			col = '#FFFFFF';
		else if (age <=86400)
			col = '#DDDDDD';
		else if (age <=172800)
			col = '#BBBBBB';
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

function insertEmpireMenu(){
    var tables = document.evaluate(
    "//table[@class='top']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0)
    return;
    var topTable = tables.snapshotItem(0);
    var empireMenu = document.createElement('table');
    empireMenu.width=topTable.getAttribute("width");
    empireMenu.align='center';
    empireMenu.setAttribute("class","header");
	empireMenu.id="empireMenu"
  var empireMenu1 = document.createElement('a');
  empireMenu1.href = "empire.aspx?view=bases_events"
  empireMenu1.innerHTML = "Events"
  
  var empireMenu2 = document.createElement('a');
  empireMenu2.href = "empire.aspx?view=bases_capacities"
  empireMenu2.innerHTML = "Capacities"
  
    var empireMenu3 = document.createElement('a');
  empireMenu3.href = "empire.aspx?view=economy"
  empireMenu3.innerHTML = "Economy"
   
  var empireMenu4 = document.createElement('a');
  empireMenu4.href = "empire.aspx?view=trade"
  empireMenu4.innerHTML = "Trade"
  
    var empireMenu5 = document.createElement('a');
  empireMenu5.href = "empire.aspx?view=structures"
  empireMenu5.innerHTML = "Structures"
     
  var empireMenu6 = document.createElement('a');
  empireMenu6.href = "empire.aspx?view=fleets"
  empireMenu6.innerHTML = "Fleets"
  
    var empireMenu7 = document.createElement('a');
  empireMenu7.href = "empire.aspx?view=units"
  empireMenu7.innerHTML = "Units"
  
  var empireMenu8 = document.createElement('a');
  empireMenu8.href = "empire.aspx?view=technologies"
  empireMenu8.innerHTML = "Technologies"
  
    var empireMenu9 = document.createElement('a');
  empireMenu9.href = "empire.aspx?view=scanners"
  empireMenu9.innerHTML = "Scanners"
   
    
    if(topTable)
    {
        topTable.parentNode.insertBefore(empireMenu,topTable.nextSibling);
        var lineBreak = document.createElement('br');
        topTable.parentNode.insertBefore(lineBreak,empireMenu);
        document.getElementById("empireMenu").insertRow(0)
        for(i=0; i<9; i++){
        document.getElementById("empireMenu").rows[0].insertCell(i)
        document.getElementById("empireMenu").rows[0].cells[i].width = "11%"
        document.getElementById("empireMenu").rows[0].cells[i].align = "center"
        document.getElementById("empireMenu").rows[0].cells[i].style['fontWeight']="bold"
        document.getElementById("empireMenu").rows[0].cells[i].style['fontSize']="12px"
        }
        document.getElementById("empireMenu").rows[0].cells[0].appendChild(empireMenu1)
        document.getElementById("empireMenu").rows[0].cells[1].appendChild(empireMenu2)
        document.getElementById("empireMenu").rows[0].cells[2].appendChild(empireMenu3)
        document.getElementById("empireMenu").rows[0].cells[3].appendChild(empireMenu4)
        document.getElementById("empireMenu").rows[0].cells[4].appendChild(empireMenu5)
        document.getElementById("empireMenu").rows[0].cells[5].appendChild(empireMenu6)
        document.getElementById("empireMenu").rows[0].cells[6].appendChild(empireMenu7)
        document.getElementById("empireMenu").rows[0].cells[7].appendChild(empireMenu8)
        document.getElementById("empireMenu").rows[0].cells[8].appendChild(empireMenu9)
        
    }
}

function sumCreditsPage()
{
    /* Code runs on credits.aspx and sums up values.
    * The main usefulness is to figure how much debris you picked up. */
    var regex = /<td>(.+?)<\/td><td>(.(\d|,| |\.)+?)<\/td>/ig;
    var source = document.body.innerHTML, result, debris = 0, income = 0, otherIncome = 0, pillage = 0, loss = 0, production = 0, construction = 0,research = 0; tradeRoutes = 0, plunderedRoutes = 0, goodsSale = 0;
    do
    {
        result = regex.exec(source);
		//console.log(result);
        if(result)
        {
            //console.log(result[1]+": "+parseInt(result[2]));
            if(result[1].indexOf('Pillage of') !== -1)
				pillage += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(result[1].indexOf('Empire Income') !== -1)
				income += parseInt(result[2].replace(/(,| |\.)/g, ""));
			else if(result[1].indexOf('Debris Collect') !== -1)
				debris += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(result[1].indexOf('Production') !== -1)
				production += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(result[1].indexOf('Construction') !== -1)
				construction += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(result[1].indexOf('Research of') !== -1)
				research += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(result[1].indexOf('New Trade Route') !== -1)
				tradeRoutes += parseInt(result[2].replace(/(,| |\.)/g, ""));
			else if(result[1].indexOf('Plunder of Trade Route') !== -1)
				plunderedRoutes += parseInt(result[2].replace(/(,| |\.)/g, ""));
			else if(result[1].indexOf('Sale of') !== -1)
				goodsSale += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else if(parseInt(result[2].replace(/(,| |\.)/g, "")) > 0)
				otherIncome += parseInt(result[2].replace(/(,| |\.)/g, ""));
            else
				loss += parseInt(result[2].replace(/(,| |\.)/g, ""));
        }
    }
    while(result)
    //alert("Debris: " + debris + "\nPillage: " + pillage + "\nIncome: " + income + "\nSpendings: " + loss + "\n\nNet Income: " + (debris + pillage + income));
    var html = "<table width='300'>"+
	    "<tr><th align='center' colspan='2'>Credit Summary</th></tr>"+
	    "<tr><td>Income:</td><td align='center'>"+income+"</td></tr>"+
		"<tr><td>Debris Collect:</td><td align='center'>"+debris+"</td></tr>"+
	    "<tr><td>Pillage:</td><td align='center'>"+pillage+"</td></tr>"+
		"<tr><td>Sale of goods:</td><td align='center'>"+goodsSale+"</td></tr>"+
	    "<tr><td>Production:</td><td align='center'>"+production+"</td></tr>"+
	    "<tr><td>Construction:</td><td align='center'>"+construction+"</td></tr>"+
	    "<tr><td>Research:</td><td align='center'>"+research+"</td></tr>"+
	    "<tr><td>New Trade Routes:</td><td align='center'>"+tradeRoutes+"</td></tr>"+
		"<tr><td>Plundered Trade Routes:</td><td align='center'>"+plunderedRoutes+"</td></tr>"+
	    "<tr><td>Other Income:</td><td align='center'>"+otherIncome+"</td></tr>"+
		"<tr><td>Other Expenditures:</td><td align='center'>"+loss+"</td></tr>"+
	    "<tr><td>Total In/Out:</td><td align='center'>"+(income+debris+pillage+goodsSale+production+construction+research+tradeRoutes+plunderedRoutes+otherIncome+loss)+"</td></tr>"+
	    "</table>";
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.setAttribute("align","center");
    newCell.innerHTML = html;
    newRow.appendChild(newCell);
    var tbody = document.evaluate(
	    "//th[text()='Description']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    //console.log(tbody.firstChild);
    tbody.insertBefore(newRow,tbody.childNodes[1]);
}

function getPlayerName(name){
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else
    return name;
}

function getGuild(name){
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    //console.log(result);
    if(result)
    return result[0];
    else return name;
}

//From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount){
	var delimiter = unescape(",");
    amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
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
        var value = valueText;
        //console.log(valueText+" new value:" +value.toString());
        //console.log(debrisElement.textContent + " -< " + debrisElement.textContent.replace(valueText,value.toString()));
        debrisElement.textContent = debrisElement.textContent.replace(valueText,value.toString());
    }
}

function getShipIndex (shipName){
    switch(shipName)
    {
        case "Fighters": {
            return FT_INDEX;
        }
        case "Bombers": {
            return BO_INDEX;
        }
        case "Heavy Bombers": {
            return HB_INDEX;
        }
        case "Ion Bombers": {
            return IB_INDEX;
        }
        case "Corvette": {
            return CV_INDEX;
        }
        case "Recycler": {
            return RC_INDEX;
        }
        case "Destroyer": {
            return DE_INDEX;
        }
        case "Frigate": {
            return FR_INDEX;
        }
        case "Ion Frigate": {
            return IF_INDEX;
        }
        case "Scout Ship": {
            return SS_INDEX;
        }
        case "Outpost Ship": {
            return OS_INDEX;
        }
        case "Cruiser": {
            return CR_INDEX;
        }
        case "Carrier": {
            return CA_INDEX;
        }
        case "Heavy Cruiser": {
            return HC_INDEX;
        }
        case "Battleship": {
            return BC_INDEX;
        }
        case "Fleet Carrier": {
            return FC_INDEX;
        }
        case "Dreadnought": {
            return DN_INDEX;
        }
        case "Titan": {
            return TI_INDEX;
        }
        case "Leviathan": {
            return LE_INDEX;
        }
        case "Death Star": {
            return DS_INDEX;
        }
        case "Barracks": {
            return BARRACKS_INDEX;
        }
        case "Laser Turrets": {
            return LASER_TURRETS_INDEX;
        }
        case "Missle Turrets": {
            return MISSLE_TURRETS_INDEX;
        }
        case "Plasma Turrets": {
            return PLASMA_TURRENTS_INDEX;
        }
        case "Ion Turrets": {
            return ION_TURRETS_INDEX;
        }
        case "Photon Turrets": {
            return PHOTON_TURRETS_INDEX;
        }
        case "Disruptor Turrets": {
            return DISRUPTOR_TURRETS_INDEX;
        }
        case "Deflection Shields": {
            return DEFLECTION_SHIELDS_INDEX;
        }
        case "Planetary Shield": {
            return PLANETARY_SHIELD_INDEX;
        }
        case "Planetary Ring": {
            return PLANETARY_RING_INDEX;
        }
    }
}

function isFightingShip(shipIndex){
    return fightingShips.charAt(shipIndex)=="1";
}

function sumSingleFleet(){
	var regex = /<td><b>(.*?)<\/b><\/td><td align=.*?>((\d|,| |\.)*?)<\/td>/ig;
	var source = document.body.innerHTML, result;
	var fightingSize = 0, totalSize = 0;
	do
	{
		result = regex.exec(source);
		
		if(result)
        {
			console.log(result);
			var shipName = result[1];
			var shipIndex = getShipIndex(shipName);
			var shipSize =  shipValues[shipIndex] * parseInt(result[2].replace(/(,| |\.)/g, ""));
			console.log(parseInt(result[2]) + " "+ shipName +"(s) ("+shipSize+") is fighting ship: "+isFightingShip(shipIndex));
			
			totalSize += shipSize;
			if(isFightingShip(shipIndex))
				fightingSize += shipSize;
		}
	}
	while(result)
	
	console.log("Fighting Size: "+fightingSize);
	console.log("Total Size: "+totalSize);
	
	var table = document.evaluate(
	    "//th[@colspan='3' and @class='th_header2']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
	    //console.log(rows);
    console.log(table);
	if(!table)
		return;
    table = table.parentNode.parentNode;
	console.log(table);
	
	table.innerHTML = table.innerHTML + "<tr><td><b>Fighting Size</b></td><td align='center'>"+fightingSize+"</td></tr>"+
										"<tr><td><b>Total Size</b></td><td align='center'>"+totalSize+"</td></tr>";

}

var fleetData = new Array(); //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function sumFleets()
{
    var rows = document.evaluate(
	    "//th[@colspan='4' and text()='Fleets']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
	    //console.log(rows);
    if(!rows)
		return;
    rows = rows.parentNode.parentNode.childNodes;
    var now = new Date(), future = new Date();
    for(var i=2;i<rows.length;i++)
    {
        //console.log(rows[i]);
        var row = rows[i];
        var size = parseInt(row.childNodes[3].firstChild.textContent.replace(/(,| |\.)/g, ""));
        row.childNodes[3].firstChild.textContent = commaFormat(size);
            var player = row.childNodes[1].firstChild.textContent;
            var arrivalTimeCell = row.childNodes[2];
            var guild = getGuild(player);
            var incoming = (arrivalTimeCell.childNodes.length > 0);
            var incomingToday = false;
            //console.log(arrivalTimeCell);
            //console.log(arrivalTimeCell.id.indexOf('time') +": "+ parseInt(arrivalTimeCell.title)+"-<"+((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) <= 0)));
            row.setAttribute("guild",guild);
            if((arrivalTimeCell.id.indexOf('blah') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) >= 0) )
            {
                var time = arrivalTimeCell.title;
                   var d = new Date();
	    var now = new Date()
		 d.setTime(d.getTime()+(time*1000));
		 if(now.toLocaleDateString() == d.toLocaleDateString()){
                incomingToday = true;
                //console.log("date diff: "+ (future.getDate() - now.getDate()));
                //if(incomingToday)
                //console.log("Incoming today");
            }
            }
            //console.log(player +": "+size);
            var incomingSize = incoming? size:0;
            var incomingTodaySize = incomingToday? size:0;
            addFleetSize(guild,size,incomingSize,incomingTodaySize);
    }
        if(guildSummed)
        insertFleetSummary();
    //console.log(fleetData);
}

function addFleetSize(guild,size,incomingSize,incomingTodaySize)
{
    //console.log("adding fleet size " +guild +" size: "+size+" incomingSize: "+incomingSize+" incomingToday: "+incomingTodaySize);
    for(var i=0;i<fleetData.length;i++)
    {
        //console.log("Searching... "+fleetData[i][0]);
        if(fleetData[i][0]==guild)
        {
            //console.log("Found "+fleetData[i][0]);
            if(incomingSize==0)
            fleetData[i][1] = (fleetData[i][1] + size);
            fleetData[i][2] = (fleetData[i][2] + incomingSize);
            fleetData[i][3] = (fleetData[i][3] + incomingTodaySize);
            guildSummed = true;
            return;
        }
    }
    //console.log("adding guild "+guild+" at index "+fleetData.length);
    if(incomingSize==0)
    fleetData[fleetData.length] = new Array(guild,size,0,0);
    else
    fleetData[fleetData.length] = new Array(guild,0,incomingSize,incomingTodaySize);
}

function insertFleetSummary()
{
    var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
    var style="";
    var incoming,arrived,incomingToday,total;
    for(var i=0;i<fleetData.length;i++)
    {
        incoming = fleetData[i][2];
        arrived = fleetData[i][1];
        total = fleetData[i][1] + fleetData[i][2];
        incomingToday = fleetData[i][3];
            incoming = commaFormat(incoming);
            arrived = commaFormat(arrived);
            incomingToday = commaFormat(incomingToday);
            total = commaFormat(total);
        html = html+"<tr align='center'><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+"</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript: void(0)'>Hide</a></td></tr>";
        //href='#showHide"+fleetData[i][0]+"'
    }
    var newTable = document.createElement("table");
    newTable.setAttribute("width","600");
    newTable.setAttribute("align","center");
    newTable.innerHTML = html;
    var table = document.evaluate(
    "//th[@colspan='4' and text()='Fleets']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode.parentNode.parentNode;
    //console.log(table);
    //table.setAttribute("name","fleetTable");
    document.body.insertBefore(newTable,table);
    var br = document.createElement("br");
    document.body.insertBefore(br,table);
    //console.log("registering events");
    for(var i=0;i<fleetData.length;i++)
    {
        var link = document.getElementById("showHide"+fleetData[i][0]);
        link.addEventListener('click',getShowHideFleetClosure(fleetData[i][0]),true);
        //console.log(link);
        //console.log(getShowHideFleetClosure(fleetData[i][0]));
    }
}

function getShowHideFleetClosure(guild)
{
    function func(){
        toggleFleetVisibility(guild);
    }
    ;
    return func;
}
function toggleFleetVisibility(guild)
{
    //console.log("Toggle visibility for :" +guild);
    var guildRows = document.evaluate(
    "//tr[@guild='"+guild+"']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Found " + guildRows.snapshotLength + " fleet(s)");
    for (var i = 0; i < guildRows.snapshotLength; i++)
    {
        var row = guildRows.snapshotItem(i);
        row.style.display = (row.style.display=="none")? "":"none";
        row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
    }
    var link = document.getElementById("showHide"+guild);
    link.textContent= (link.textContent=="Show")? "Hide":"Show";
    //document.body.scrollTop += 200;
}

function scannerFormat(){
	baseArray=document.getElementsByTagName("a")	
	bases = GM_getValue(server+"Bases")
	for(i=0; i<baseArray.length; i++){
		if(baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
			basecoord=baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)
			if(bases.match(basecoord)){
			baseArray[i].setAttribute("style", "color: red; font-weight: bold;")
			} else if(bases.match(String(basecoord).replace(/:[0-9]{2}$/,""))){
      baseArray[i].setAttribute("style", "color: IndianRed; font-weight: bold;")
			}
		}
	}
}

function storeBases(){
	baseArray=document.body.innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/g)
	bases = ""
	for(i=0; i<baseArray.length; i=i+2){
	bases= bases+baseArray[i]+","
	}
GM_setValue(server+"Bases", bases)
}

function sumShips(rows){

	var tables = document.evaluate(
	    "//table",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    var rows = document.evaluate(
	    ".//tr",
	    tables.snapshotItem(3),
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    
	if(rows.snapshotLength == 1)
		return;

    var sums = new Array(20);
    var totalMobileSums = new Array(20);
	//var galaxyFleets = new Array();
	
    for(var i = 0; i < 20;i++)
    {
        sums[i] = 0;
        totalMobileSums[i] = 0;
    }
		rows.snapshotItem(0).lastChild.innerHTML = "<a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a>";
    var cells;
    var mobileFleetCount = 0,currentFleetTotal,overallFleetTotal = 0,overallFightingFleetTotal = 0, overallMobileFleetTotal = 0,overallMobileFightingFleetTotal = 0;;
    var fleetUrl;
    for (var i = 1; i < rows.snapshotLength; i++) {
        var row = rows.snapshotItem(i);
        currentFleetTotal = parseInt(rows.snapshotItem(i).lastChild.textContent.replace(/(,| |\.)/g, ""));
        overallFleetTotal += currentFleetTotal;
        //console.log('Summing fleet '+i);
        cells = document.evaluate(
		        ".//td[@style]",
		        row,
		        null,
		        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		        null);
        //console.log('Found '+cells.snapshotLength+' cells');
        var location = row.childNodes[1].innerHTML.match(/[A-Z][0-9]{1,}:[0-9]{1,}:[0-9]{1,}:[0-9]{1,}/);
		var galaxy = row.childNodes[1].firstChild.firstChild.href.split("=")[1].match(/[A-Z]((\d|,| |\.)(\d|,| |\.))/)[2];
		//console.log(galaxy);
		var galaxyInfoArray = getGalaxyInfoArray(galaxy);
        //console.log('FT: '+cells.snapshotItem(FT_INDEX).textContent);
        var currentFightingFleetTotal = 0,shipTotal;
        
		//Iterate over all ship amounts in this row and add value to all sums that apply (total,fighting,galaxymobile,mobile)
		for (var j = 0; j < cells.snapshotLength; j++)
        {
            //console.log(cells.snapshotItem(j).textContent);
            if(cells.snapshotItem(j).textContent.length > 0){
                //console.log(sums[j]+' + '+parseInt(cells.snapshotItem(j).textContent));
                shipTotal = parseInt(cells.snapshotItem(j).textContent.replace(/(,| |\.)/g, ""));
                sums[j] = sums[j]+shipTotal;
                if(isFightingShip(j))
					currentFightingFleetTotal += shipValues[j] * shipTotal;
                if(!isBase(location))
				{
					//increment galaxy info numbers
					galaxyInfoArray[2][j] = galaxyInfoArray[2][j]+shipTotal;
					
					//increment total mobile numbers
					totalMobileSums[j] = totalMobileSums[j]+shipTotal;
				}
            }
        }
		
		//Add total row fleet size to overall total count
        overallFightingFleetTotal += currentFightingFleetTotal;
        
		//if fleet is mobile add total row fleet size to overall total mobile count
		if(!isBase(location))
        {
			//increment galaxy info numbers
			galaxyInfoArray[4] += currentFleetTotal;
			galaxyInfoArray[3] += currentFightingFleetTotal;
			galaxyInfoArray[1] += 1;
            //console.log(location + ": "+isBase(location));
            overallMobileFleetTotal += currentFleetTotal;
            overallMobileFightingFleetTotal += currentFightingFleetTotal;
            mobileFleetCount+= 1;
        }
        //console.log(rows.snapshotItem(i).lastChild.textContent);
        rows.snapshotItem(i).lastChild.textContent =currentFightingFleetTotal  +" / "+ rows.snapshotItem(i).lastChild.textContent;
        fleetUrl = rows.snapshotItem(i).firstChild.firstChild.firstChild.href;
        //console.log(fleetUrl);
            if(rows.snapshotItem(i).firstChild.nextSibling.firstChild.textContent.charAt(0)!="*")
            {
                var moveLink = document.createElement("a");
                moveLink.setAttribute("href",fleetUrl+"&view=move");
                moveLink.textContent = rows.snapshotItem(i).lastChild.textContent;
                rows.snapshotItem(i).lastChild.textContent = "";
                rows.snapshotItem(i).lastChild.appendChild(moveLink);
			}
    }
    //console.log('Ship Sums: '+sums);
    //console.log('Mobile ship Sums: '+mobileSums);
    //console.log("Mobile fleet "+overallMobileFleetTotal);
    //console.log("Mobile attack fleet "+overallMobileFightingFleetTotal);
        insertTotalsRow(rows.snapshotItem(0).parentNode,sums,totalMobileSums,rows.snapshotLength - 1,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal);
    //console.log(prepareTotalsRow(sums));
	
	
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
  if(tableArray[i].childNodes[0].childNodes[a].innerHTML.match(/Crystals Mines/))
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
					        if (cname == "Jump Gate"){
        makeAdjustments(nrow, jgAdjust)
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
  btn_details.push([10,'+10 ']);
  btn_details.push([100,'+100 ']);
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
    for(c=0; c<4; c++) {
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

function scannerGrab(){
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
fleetArrive[a-1]=parseInt(table.rows[a].childNodes[3].title)
fleetSize[a-1]=table.rows[a].childNodes[4].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=[0-9]{1,}">/, "")
fleetSize[a-1]=fleetSize[a-1].replace(/<\/a>(.*?)/, "");
fleetSize[a-1]=fleetSize[a-1].replace(/(,| |\.)/g, "");
}
sendData = "&fleetId="+fleetId+"&fleetName="+fleetName+"&fleetOwner="+fleetOwner+"&ownerId="+ownerId+"&fleetDest="+fleetDest+"&fleetArrive="+fleetArrive+"&fleetSize="+fleetSize
if(GIAServers.inArray(server)){
sendtoserver(sendData, "scanners.php")
}
}
}
}

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
if(linkArray[i].href.match(/map.aspx\?(.*?)loc=[A-Z0-9:]+$/)){
linkArray[i].addEventListener("mouseover", function(e) {location = this.href; tim=setTimeout(function(){showBaseInfo(location.replace(/http:\/\/(.+?)\.astroempires\.com\/map.aspx\?(.*?)loc=/, ""), tempX, tempY)}, 1000)}, true);
linkArray[i].addEventListener("mouseout", function() {hideBaseInfo(this.href.replace(/http:\/\/(.+?)\.astroempires\.com\/map.aspx\?(.*?)loc=/, ""))}, true);
}
}
}
}
function showBaseInfo(coords, mouseX, mouseY){
if(GIAServers.inArray(server)){
infoarray = document.getElementsByName("infoDiv")
for(i=0; i<infoarray.length; i++){
if(infoarray[i].style['display']!="none"){
infoarray[i].style['display']!="none"
}
}
if(document.getElementById("info_"+coords)){
document.getElementById("info_"+coords).style['display']=""
if((mouseY-window.pageYOffset)>(window.innerHeight/2)){
document.getElementById("info_"+coords).style['bottom'] = (document.body.clientHeight-mouseY)+"px";
document.getElementById("info_"+coords).style['top'] = "";
}else{
	document.getElementById("info_"+coords).style['top'] = (mouseY)+"px";
	document.getElementById("info_"+coords).style['bottom'] = "";
	}
	document.getElementById("info_"+coords).style['left'] = (mouseX+15)+"px";
	if(document.getElementById("info_"+coords).innerHTML.match(/undefined/)){
	document.getElementById("info_"+coords).style['display']="";
	getfromserver("data.php?coords="+coords, "info_"+coords)
	}
}else{
sourceDiv = document.createElement("div")
	sourceDiv.style['position'] = "absolute";
	if((mouseY-window.pageYOffset)>(window.innerHeight/2)){
sourceDiv.style['bottom'] = (document.body.clientHeight-mouseY)+"px";
}else{
	sourceDiv.style['top'] = (mouseY)+"px";
	}
	sourceDiv.style['left'] = (mouseX+15)+"px";
	sourceDiv.style['border']="2px solid #272727"
	sourceDiv.style['padding']="3px"
	sourceDiv.style.backgroundImage="url(http://graphics2.astroempires.com/skins/darkAstros/images/grad.jpg)"
	sourceDiv.style.backgroundColor="#1D1D1D"
	sourceDiv.style.backgroundRepeat="repeat-x"
	sourceDiv.style['display']="none";
	sourceDiv.id="info_"+coords;
	sourceDiv.name="infoDiv";
	document.body.appendChild(sourceDiv)
	document.getElementById("info_"+coords).style['display']="";
	getfromserver("data.php?coords="+coords, "info_"+coords);
	document.getElementById("info_"+coords).addEventListener("mouseover", function() {clearTimeout(hidetim)}, true);
	document.getElementById("info_"+coords).addEventListener("mouseout", function() {hideBaseInfo(coords)}, true);
	}
}
}
function hideBaseInfo(coords){
if(GIAServers.inArray(server)){
clearTimeout(tim)
hidetim = setTimeout(function(){if(document.getElementById("info_"+coords)){document.getElementById("info_"+coords).style['display']="none"; }}, 200)
}
}
function serverTimeAdjust(){
now = (new Date).getTime();
        elem=document.getElementById('clock');

        m=0;h=0;
		var diff = (now - start_date) / 1000; 
		s = parseInt(elem.title) + diff;
		
var myDate = new Date(s*1000);
			elem.innerHTML = "Server Time: "+ myDate.formatDate("d-m-Y H:i:s")
			
			if(document.location.href.match(/fleet.aspx\?fleet=[0-9]{1,}&view=move/)){
			if(travelRow.innerHTML != ""){
			var arriveDate = new Date(s*1000)
			arriveDate.setTime(arriveDate.getTime()+(getSeconds(travelRow.innerHTML)*1000))
			document.getElementById("arrivaltime").innerHTML = "Arrival Time: " + arriveDate.formatDate("d-m-Y H:i:s")
			}
			if(document.getElementById("launchButton").value == "Disable Auto-launch"){
			if(document.getElementById("radioLaunch").checked == true){
        if(document.getElementById("clock").innerHTML.replace(/Server Time: /, "") == document.getElementById("departTime").value){
        document.getElementsByTagName('form')[1].submit();
        }
       }else{
       if(document.getElementById("arrivaltime").innerHTML.replace(/Arrival Time: /, "") == document.getElementById("departTime").value){
        document.getElementsByTagName('form')[1].submit();
        }
      }
      }
      }
}

function serverTimeSetup(){
start_date = (new Date).getTime();
smallArray = document.getElementsByTagName("small")
for(i=0; i<smallArray.length; i++){
if(smallArray[i].innerHTML.match(/Server time:/i)){
serverTime =smallArray[i].innerHTML.replace(/Server time: /i,"")
serverTime = serverTime.split(/-/)
var myDate = new Date(serverTime[1]+"/"+serverTime[0]+"/"+serverTime[2]); // Your timezone!
smallArray[i].id = "clock"
smallArray[i].title = myDate/1000;
serverTime = myDate.formatDate("d-m-Y H:i:s")
document.getElementById("clock").innerHTML = "Server Time: "+myDate.formatDate("d-m-Y H:i:s")
setInterval(function(){serverTimeAdjust()}, 200); 
}
}
}

// #######
// MOVE WINDOW ENHANCEMENTS
// #######
var supportShips = new Array("Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier");
var attackShips = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Destroyer","Frigates","Ion Frigate","Cruiser","Heavy Cruiser","Battleship","Dreadnought","Titan","Leviathan","Death Star");
var availableShips = new Array();
function setAvailableShips()
{
    var ships = document.evaluate(
        "//td/b",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    //console.log("Found "+ships.snapshotLength+" ships types.");
    for(var i=0;i<ships.snapshotLength;i++)
    {
        //console.log(ships.snapshotItem(i));
        availableShips[i] = ships.snapshotItem(i).textContent;
    }
    //console.log(availableShips);
}

function isAvailableShip(ship)
{
    for(var i=0;i<availableShips.length;i++)
    {
        //console.log(ship+" = "+availableShips[i]);
        if(ship == availableShips[i])
        {
            //console.log(ship+" = "+availableShips[i]);
            return true;
        }
    }
    return false;
}

function createSupportMovementHref()
{
    var href = "";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:maxquant('"+supportShips[i]+"');";
    }
    for(var i=0;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:zero('"+attackShips[i]+"');";
    }
    //console.log("support href: "+href);
    return href;
}

function createAttackMovementHref(includeFighters)
{
    var href = "";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:zero('"+supportShips[i]+"');";
    }
    var i=0;
    if(!includeFighters)
    {
        href = href+"javascript:zero('Fighters');";
        i = 1;
    }
    for(i;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]) && attackShips[i] != "Fighters")
        href = href + "javascript:maxquant('"+attackShips[i]+"');";
    }
    if(includeFighters)
    {
        href = href + "javascript:fill_hangar('Fighters');";
    }
    //console.log("attack href ("+includeFighters+"): "+href);
    return href;
}

function createAllMovementNoFTHref()
{
    var href = "";
    href = href+"javascript:zero('Fighters');";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:maxquant('"+supportShips[i]+"');";
    }
    for(var i=1;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:maxquant('"+attackShips[i]+"');";
    }
    return href;
}




function fleetLaunch(){
    // This adds all the "all/all(no FT)/support/attack/attack(no FT)/none" bits
    setAvailableShips();
    //"javascript:zero('Fighters');javascript:zero('Bombers');javascript:zero('Heavy Bombers');javascript:zero('Corvette');javascript:zero('Recycler');javascript:zero('Destroyer');javascript:zero('Scout Ship');javascript:zero('Cruiser');javascript:zero('Carrier');javascript:zero('Heavy Cruiser');javascript:zero('Battleship');javascript:zero('Fleet Carrier');javascript:zero('Dreadnought');"
    //"javascript:maxquant('Fighters');javascript:maxquant('Bombers');javascript:maxquant('Heavy Bombers');javascript:maxquant('Corvette');javascript:maxquant('Recycler');javascript:maxquant('Destroyer');javascript:maxquant('Scout Ship');javascript:maxquant('Cruiser');javascript:maxquant('Carrier');javascript:maxquant('Heavy Cruiser');javascript:maxquant('Battleship');javascript:maxquant('Fleet Carrier');javascript:maxquant('Dreadnought');"
    var allNoFTHref = createAllMovementNoFTHref();
    var supportHref = createSupportMovementHref();
    var attackHref = createAttackMovementHref(true);
    var attackNoFTHref = createAttackMovementHref(false);
    var cell = document.evaluate(
    "//a[text()='All']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode;
    var noneLink = cell.childNodes[2];
    cell.removeChild(noneLink);
    cell.innerHTML = cell.innerHTML+' <a href="'+allNoFTHref+'">All(no FT)</a> - <a href="'+supportHref+'">Support</a> - <a href="'+attackHref+'">Attack</a> - <a href="'+attackNoFTHref+'">Attack(no FT)</a> - ';
    cell.setAttribute("colspan","3");
    cell.parentNode.removeChild(cell.nextSibling);
    cell.parentNode.removeChild(cell.previousSibling);
    cell.appendChild(noneLink);



var moveButton = document.evaluate(
    "//input[@value='Move']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
 
 
  travelRow = moveButton.parentNode.parentNode.parentNode.rows[3].lastChild;
 
  var arriveRow = moveButton.parentNode.parentNode.parentNode.rows[4];
  arriveRow.cells[0].colSpan = "1"
  arriveRow.insertCell(1)
  arriveRow.insertCell(2)
  arriveRow.insertCell(3)
  arriveRow.insertCell(4)
 
  arriveRow.cells[4].colSpan = "3"
    arriveRow.cells[4].style.textAlign = "right"
    arriveRow.cells[4].innerHTML = '<span id="arrivaltime" style="font-size: 10px;"></span><br /><br />'
   
    var th = moveButton.parentNode.parentNode.nextSibling.firstChild;
    //console.log(th);
   
    var textBox = document.createElement("input");
    textBox.setAttribute("class","quant");
    textBox.setAttribute("type","text");
    textBox.setAttribute("style","width:200px;margin-top:5px;margin-bottom:5px;");
    textBox.setAttribute("id","departTime");
    textBox.value = serverTime
    th.appendChild(textBox);
    newBR = document.createElement("br");
    th.appendChild(newBR);
   
  var radio1Button = document.createElement("input");
    radio1Button.setAttribute("value","Launch Time");
    radio1Button.setAttribute("type","radio");
    radio1Button.setAttribute("id","radioLaunch");
    radio1Button.setAttribute("name","radioSelect");
    radio1Button.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
    radio1Button.setAttribute("checked","checked");
    th.appendChild(radio1Button);
radio1Text = document.createTextNode("Launch Time");
th.appendChild(radio1Text);
   
    var radio2Button = document.createElement("input");
    radio2Button.setAttribute("value","Arrive Time");
    radio2Button.setAttribute("type","radio");
    radio2Button.setAttribute("id","radioArrive");
    radio2Button.setAttribute("name","radioSelect");
    radio2Button.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
    th.appendChild(radio2Button);
    radio2Text = document.createTextNode("Arrival Time");
th.appendChild(radio2Text);
newBR = document.createElement("br");
    th.appendChild(newBR);
   
    var calculateButton = document.createElement("input");
    calculateButton.setAttribute("value","Enable Auto-launch");
    calculateButton.setAttribute("type","submit");
    calculateButton.setAttribute("id","launchButton");
    calculateButton.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
    th.appendChild(calculateButton);
   
    newBR = document.createElement("br");
    th.appendChild(newBR);
   
    instructionText = document.createTextNode("To use the auto-launch, enter the server time you wish for your fleet to be sent into the box above, in the format \"DD-MM-YY HH:MM:SS\" with HH being the hours in 24 hour format with leading zeros. Then click the button next to it. For the auto-launch to work, you must leave the tab/window open with the destination and units filled in. You can have more than one fleet being sent, just use another tab/window.")
   
    th.appendChild(instructionText);
   
   
    document.getElementById("launchButton").addEventListener("click",function(){if(document.getElementById("launchButton").value == "Enable Auto-launch"){document.getElementById("launchButton").value = "Disable Auto-launch";}else{document.getElementById("launchButton").value = "Enable Auto-launch";}},true);
   
    }
   
    function checkUpdates(){
   
    lastChecked=GM_getValue("LastChecked", 0)
    if((Math.round(start_date/1000)-lastChecked)>7200 || GM_getValue("NeedsUpdate")==1){
    GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.goonintelagency.com/GIAVersion.php",
    onload: function(response) {
        if(response.responseText != GIAVersion){
    GM_setValue("NeedsUpdate", "1")
        }else{
        GM_setValue("NeedsUpdate", "0")
        }
    }}
);
newLastChecked = Math.round(start_date/1000)
GM_setValue("LastChecked", newLastChecked)
    }
    if(GM_getValue("NeedsUpdate", 0)==1){
            sourceDiv = document.createElement("div")
    sourceDiv.style['position'] = "fixed";
    sourceDiv.style['top'] = "0px";
    sourceDiv.style['left'] = "0px";
    sourceDiv.style['width'] = "100%";
    sourceDiv.style['border']="2px solid #272727"
    sourceDiv.style.backgroundImage="url(http://graphics2.astroempires.com/skins/darkAstros/images/grad.jpg)"
    sourceDiv.style.backgroundColor="#1D1D1D"
    sourceDiv.style.backgroundRepeat="repeat-x"
    sourceDiv.style.textAlign = "center"
    sourceDiv.class="helppage"
    sourceDiv.id="sourceLinks";
    sourceDiv.innerHTML = "<br /><br />Looks like you don't have the latest version of the GIA script. No worries, just <a href=\"http://www.goonintelagency.com/basescouter.user.js\">Click Here</a> to update.<br /><br /><br />";
    document.body.appendChild(sourceDiv)
    }
}


function enhanceTradePage() {
    var tradeNames = new Array(); //string names of all trade partners
    var tradeNodes = new Array(); //element object of all trade partners
    var allNames, thisName, lastName, selfName;

    //Find all trade name elements
    allNames = document.evaluate(
    "//small[@class='gray']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

    //You are special.
    selfName = allNames.snapshotItem(0);

    //Iterate through all and add only odd ones to name and node arrays.
    for (var i = 0; i < allNames.snapshotLength; i++)
    {
        if(i%2==1)
        {
            thisName = allNames.snapshotItem(i);
            tradeNames.push(thisName.innerHTML);
            tradeNodes.push(thisName);
        }
    }
    tradeNames.sort();

    //Iterate through sorted names and compare each to the one before it.
    //If a duplicate is found pass the name to the highlight method to find
    // all element objects and apply highlight.
    for (var i = 1; i < tradeNames.length; i++)
    {
        thisName = tradeNames[i];
        lastName = tradeNames[i-1];
        if(thisName == lastName)
        {
        var item;
        for (var i2 = 0; i2 < tradeNodes.length; i2++) {
            item = tradeNodes[i2];

            if(item.innerHTML == thisName)
            {
            if (item.innerHTML == selfName.innerHTML) {
                item.style.color = 'orange';
            } else {
                    item.style.color = 'red';
                    item.innerHTML = item.innerHTML + ' (Duplicate)';
            }
            }
        }
        }
    }

    var rows = document.evaluate(
    "//table[4]//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    var upperThreshold = 10;
    var lowerThreshold = 10;
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var eco1Cell = document.evaluate(
        "td[3]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
        var eco2Cell = document.evaluate(
        "td[4]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
        var eco1 = parseInt(eco1Cell.innerHTML);
        var eco2 = parseInt(eco2Cell.innerHTML);

        var tradediff = eco2 - eco1;
        if (eco2 - eco1 > upperThreshold) {
            eco2Cell.innerHTML = eco2Cell.innerHTML + '<small class="orange"> &nbsp (+' + tradediff + ')</small>';
        } else if (eco2 - eco1 < -1*lowerThreshold) {
            eco2Cell.innerHTML = eco2Cell.innerHTML + '<small class="red"> &nbsp (' + tradediff + ')</small>';
        } else {
            eco2Cell.innerHTML = eco2Cell.innerHTML + '<small class="gray"> &nbsp (' + tradediff + ')</small>';
        }
      }
}

  //////////////////////////////////////////
 /// Server ///////////////////////////////
//////////////////////////////////////////

function sendtoserver(sendData, Page){
if(GIAServers.inArray(server)){
GM_xmlhttpRequest({
    method: 'POST',
    url: sourceUrl+"Scouter/"+Page,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
	data: "ScriptVersion=4&"+sendData,
	onload: function(response) {
    //alert(sendData)
    //alert(response.responseText)
	}}
);
}
}

function getfromserver(Page, divID){
if(GIAServers.inArray(server)){
GM_xmlhttpRequest({
    method: 'GET',
    url: sourceUrl+"DataGrab/"+Page,
	onload: function(response) {
		document.getElementById(divID).innerHTML=response.responseText
	}}
);
}
}

  //////////////////////////////////////////
 /// Report ///////////////////////////////
//////////////////////////////////////////

function reportResults(){
	baseReport=GM_getValue(server+"Base Report")
	fleetReport=GM_getValue(server+"Fleet Report")
	astroReport=GM_getValue(server+"Astro Report")
	debrisReport=GM_getValue(server+"Debris Report")
	status = GM_getValue(server+"Scout Status")
	if(status==0){
	if(baseReport!="" || fleetReport!="" || astroReport!="" || debrisReport!=""){
	myHeight=window.innerHeight-50
	reportHeight=myHeight-42
	reportDiv = document.createElement("div")
	reportDiv.style['position'] = "fixed";
	reportDiv.style['top'] = "20px";
	reportDiv.style['left'] = "100px";
	reportDiv.style['height'] = myHeight;
	reportDiv.style['width'] = "350px";
	reportDiv.style['border']="2px solid #272727"
	reportDiv.style['padding']="3px"
	reportDiv.style.backgroundImage="url(http://graphics2.astroempires.com/skins/darkAstros/images/grad.jpg)"
	reportDiv.style.backgroundColor="#1D1D1D"
	reportDiv.style.backgroundRepeat="repeat-x"
	reportDiv.class="helppage"
	reportDiv.id="reportDiv";
	document.body.appendChild(reportDiv)
	region=GM_getValue(server+"Scouting Region")
	regioncoords=region.replace(/http:\/\/(.+?).astroempires.com\/map\.aspx\?cmp=[0-9]{1,}&loc=/, "")
	reportDiv = document.createElement("div")
	reportDiv.style['position'] = "absolute";
	reportDiv.style['width']="350px"
	reportDiv.class="helppage"
	reportDiv.innerHTML="Results of last scan. (<a href=\""+region+"\">"+regioncoords+"</a>)<br />\
  <a href=\"javascript:void(1)\" onClick=\"document.getElementById('reportBases').style.display='block'; document.getElementById('reportFleets').style.display='none'; document.getElementById('reportAstros').style.display='none'; document.getElementById('reportDebris').style.display='none';\">Bases</a>\
  | <a href=\"javascript:void(1)\" onClick=\"document.getElementById('reportBases').style.display='none'; document.getElementById('reportFleets').style.display='block'; document.getElementById('reportAstros').style.display='none'; document.getElementById('reportDebris').style.display='none';\">Fleets</a>\
  | <a href=\"javascript:void(1)\" onClick=\"document.getElementById('reportBases').style.display='none'; document.getElementById('reportFleets').style.display='none'; document.getElementById('reportAstros').style.display='block'; document.getElementById('reportDebris').style.display='none';\">Astros</a>\
  | <a href=\"javascript:void(1)\" onClick=\"document.getElementById('reportBases').style.display='none'; document.getElementById('reportFleets').style.display='none'; document.getElementById('reportAstros').style.display='none'; document.getElementById('reportDebris').style.display='block';\">Debris</a>\
  <hr style=\"padding:0px\">"
	reportDiv.id="reportDivText"
	document.getElementById("reportDiv").appendChild(reportDiv)
	reportClose = document.createElement("div")
	reportClose.style['left'] = "329px";
	reportClose.style['position'] = "absolute";
	reportClose.id="reportCloseDiv"
	document.getElementById("reportDiv").appendChild(reportClose)
	reportClose = document.createElement("a")
	reportClose.href="javascript:void(1)"
	reportClose.style['color'] = "#FF0000";
	reportClose.style['font-weight'] = "bold";
	reportClose.style['text-decoration'] = "none"
	reportClose.style['top']="0px"
	reportClose.innerHTML="[x]";
	reportClose.id="reportCloseLink"
	document.getElementById("reportCloseDiv").appendChild(reportClose)
	reportData = document.createElement("div")
	reportData.style['height'] = reportHeight;
	reportData.style['width'] = "100%";
	reportData.style['top'] = "42px";
	reportData.style['overflow'] = "auto";
	reportData.style['position'] = "absolute";
	reportData.id = "reportBases";
	reportData.innerHTML="Base Report<br />"
	document.getElementById("reportDiv").appendChild(reportData)
	reportData = document.createElement("div")
	reportData.style['height'] = reportHeight;
	reportData.style['width'] = "346px";
	reportData.style['top'] = "42px";
	reportData.style['overflow'] = "auto";
	reportData.style['position'] = "absolute";
	reportData.style['display'] = "none";
	reportData.id = "reportFleets";
	reportData.innerHTML="Fleet Report<br />"
	document.getElementById("reportDiv").appendChild(reportData)
	reportData = document.createElement("div")
	reportData.style['height'] = reportHeight;
	reportData.style['width'] = "346px";
	reportData.style['top'] = "42px";
	reportData.style['overflow'] = "auto";
	reportData.style['position'] = "absolute";
	reportData.style['display'] = "none";
	reportData.id = "reportAstros";
	reportData.innerHTML="Astro Report<br />"
	document.getElementById("reportDiv").appendChild(reportData)
	reportData = document.createElement("div")
	reportData.style['height'] = reportHeight;
	reportData.style['width'] = "346px";
	reportData.style['top'] = "42px";
	reportData.style['overflow'] = "auto";
	reportData.style['position'] = "absolute";
	reportData.style['display'] = "none";
	reportData.id = "reportDebris";
	reportData.innerHTML="Debris Report<br />"
	document.getElementById("reportDiv").appendChild(reportData)
	reportFill();
	document.getElementById('reportCloseLink').addEventListener("click", function() {closeReport(); document.getElementById('reportButton').name=""}, true);
	}
	}else{
		alert("You are currently doing a scan, results cannot be shown until the scan has finished.")
	}
}

function closeReport(){
	reportDiv=document.getElementById('reportDiv');
	document.body.removeChild(reportDiv)
}

function reportFill(){
	debrisReport=GM_getValue(server+"Debris Report")
	debrisReport=debrisReport.split("&new=")
for (var j = 0; j<debrisReport.length-1; j++){
	debrisReport[j]=debrisReport[j].split("&=")
	reportText = "<a href=\""+serverurl+"map.aspx?loc="+debrisReport[j][0]+"\">"+debrisReport[j][0]+" - " +debrisReport[j][1]+" Credits in debris</a><br>"
	document.getElementById('reportDebris').innerHTML = document.getElementById('reportDebris').innerHTML + reportText
}
	astroReport=GM_getValue(server+"Astro Report")
	astroReport=astroReport.split("&new=")
for (var j = 0; j<astroReport.length-1; j++){
	astroReport[j]=astroReport[j].split("&=")
	reportText = "<a href=\""+serverurl+"map.aspx?loc="+astroReport[j][0]+"\">"+astroReport[j][0]+" - Position " +astroReport[j][1]+"</a><br>"
	document.getElementById('reportAstros').innerHTML = document.getElementById('reportAstros').innerHTML + reportText
}
	baseReport=GM_getValue(server+"Base Report")
	baseReport=baseReport.split("&new=")
for (var j = 0; j<baseReport.length-1; j++){
	baseReport[j]=baseReport[j].split("&=")
	reportText = "<a href=\""+serverurl+"map.aspx?loc="+baseReport[j][0]+"\">"+baseReport[j][0]+" - " +baseReport[j][1]+"</a><br>"
	document.getElementById('reportBases').innerHTML = document.getElementById('reportBases').innerHTML + reportText
}
fleetReport=GM_getValue(server+"Fleet Report")
	fleetReport=fleetReport.split("&new=")
for (var j = 0; j<fleetReport.length-1; j++){
	fleetReport[j]=fleetReport[j].split("&=")
	if(fleetReport[j].length==4){
	reportText = "<a href=\""+serverurl+"map.aspx?loc="+fleetReport[j][0]+"\">"+fleetReport[j][0]+" - " +fleetReport[j][1]+" - " +fleetReport[j][2]+" - " +fleetReport[j][3]+"</a><br>"
}else{
	reportText = "<a href=\""+serverurl+"map.aspx?loc="+fleetReport[j][0]+"\">"+fleetReport[j][0]+" - " +fleetReport[j][1]+" - " +fleetReport[j][2]+"</a><br>"
}
	document.getElementById('reportFleets').innerHTML = document.getElementById('reportFleets').innerHTML + reportText
}
}

  //////////////////////////////////////////
 /// Scouting /////////////////////////////
//////////////////////////////////////////

function getSystemLinks() {
scoutStatus=GM_getValue(server+"Scout Status")
if(scoutStatus != 1){
regionDiv = document.getElementsByClassName("region")[0].parentNode
if(regionDiv.innerHTML.match(/color: rgb(255, 255, 255)/) || regionDiv.innerHTML.match(/text-decoration: underline/)){
	 GM_setValue(server+"Scout Queue", "")
	 GM_setValue(server+"Scout Status", "1")
	GM_setValue(server+"Debris Report", "")
	GM_setValue(server+"Astro Report", "")
	GM_setValue(server+"Base Report", "")
	GM_setValue(server+"Fleet Report", "")
	cmp=document.location.href.match(/cmp=[0-9]{1,}&/)[0]
	cmp=cmp.replace("cmp=", "")
	cmp=cmp.replace("&", "")
	GM_setValue(server+"CMP", cmp)
allLinks = document.evaluate(
    "/html/body/div[2]/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
pageLink=document.location.href.replace("#Results", "")
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	
    if (pageLink.length < thisLink.href.length) {
		ScoutQueue = GM_getValue(server+"Scout Queue")
		ScoutQueue = ScoutQueue + thisLink.href+","
		GM_setValue(server+"Scout Queue", ScoutQueue)
  }
}
GM_setValue(server+"Scouting Region", pageLink)
ScoutQueue = GM_getValue(server+"Scout Queue")
ScoutQueue=ScoutQueue.split(",")
GM_setValue(server+"BaseProgress", "0")
GM_setValue(server+"ExtraProgress", "0")
GM_setValue(server+"SystemPercent", ((Math.round(100*(100/(ScoutQueue.length-1))))/100)+"")
randomnumber=Math.floor(Math.random()*(ScoutQueue.length-2))
	time=1500+Math.floor(Math.random()*2501)
	t=setTimeout(function(){insertIframe(); document.getElementById('iframe1').src=ScoutQueue[randomnumber]},time)
}else{
	alert("You do not have a base or fleet in this region.")
}
}else{
	alert("You are already doing a scan.")
}
}

function insideSystem() {
	status = GM_getValue(server+"Scout Status")
	if(status==1){
	document.body.innerHTML = document.body.innerHTML.replace(/<!--(.+?)-->/g, "")
	document.body.innerHTML = document.body.innerHTML.replace(/\<div style=.display:(.*?)none;(.+?)\>(.+?)<.div><.div>/g, "")
var divArray = document.getElementsByTagName('div')
for (var i=0; i<divArray.length; i++){
	if (divArray[i].innerHTML.match("<table class=\"system\"")) {
var allPlanets = divArray[i].innerHTML.match(/href=.map.aspx\?loc=[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}.>(.+?)(<\/span>|<\/a>)(<\/div><a|<a|<\/div>)/g);
		if (allPlanets) {
			GM_setValue(server+"System Scout Queue", "")
			for (var a = 0; a < allPlanets.length; a++) {
				if (allPlanets[a].match(/- empty -/)){
					coords=allPlanets[a].match(/title=.(.+?) \([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}\)./)[0]
					coords=coords.replace(/title=.(.+?) \(/, "")
					coords=coords.replace(/\)./, "")
					ScoutQueue = GM_getValue(server+"System Scout Queue")
		ScoutQueue = ScoutQueue + ""+serverurl+"map.aspx?loc="+ coords+","
		GM_setValue(server+"System Scout Queue", ScoutQueue)
				}else if(allPlanets[a].match(/Gas Giant/)){
				}else if(allPlanets[a].match(/Asteroid Belt/)){
				}else if(allPlanets[a].match(/base=[0-9]/)){
				coords=allPlanets[a].match(/href=.base\.aspx\?base=(.+?).>/)[0]
					coords=coords.replace(/href=./, "")
					coords=coords.replace(/.>/, "")
					ScoutQueue = GM_getValue(server+"System Scout Queue")
		ScoutQueue = ScoutQueue + ""+serverurl+""+ coords + ","
		GM_setValue(server+"System Scout Queue", ScoutQueue)
				}
			}
		}
	}
}
ScoutQueue = GM_getValue(server+"System Scout Queue")
time=1500+Math.floor(Math.random()*1751)
if(ScoutQueue == ""){
t=setTimeout(function(){window.top.document.getElementById('iframe1').name="next"},time)
}else{
ScoutQueue=ScoutQueue.split(",")
AstroPercent = ((Math.round(100*(GM_getValue(server+"SystemPercent")/(ScoutQueue.length-1))))/100)+""
GM_setValue(server+"AstroPercent", AstroPercent)
GM_setValue(server+"ExtraProgress", "0")
randomnumber=Math.floor(Math.random()*(ScoutQueue.length-2))
	GM_setValue(server+"ExtraProgress", parseFloat(GM_getValue(server+"ExtraProgress"))+parseFloat(GM_getValue(server+"AstroPercent"))+"");
	t=setTimeout(function(){insertIframe(); document.getElementById('iframe2').src=ScoutQueue[randomnumber]},time)
	}
}
}

function emptyDetails(){

	if(document.body.innerHTML.match(/(<a href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)){
	coords=document.body.innerHTML.match(/(<a href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)[2];
	}else{
	coords=document.body.innerHTML.match(/[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/);
	}
	type=document.body.innerHTML.match(/<b>Astro Type: &nbsp;<\/b>(.+?)<br>/)[1]
	terrain=document.body.innerHTML.match(/<b>Terrain: &nbsp;<\/b>(.+?)<br>/)[1]
	pos=coords[0].split(":")[3][0]
			status = GM_getValue(server+"Scout Status")
	if(status==1){
		astroReport=GM_getValue(server+"Astro Report")
	if(type!=terrain){
	astroReport = astroReport + coords +"&="+pos+" "+terrain+" "+type+"&new="
	}else{
	astroReport = astroReport + coords +"&="+pos+" "+terrain+"&new="
	}
	GM_setValue(server+"Astro Report", astroReport)
	}
	getDebris()
	if(type!=terrain){
	sendData = "Co-ords=" + coords + "&Type=" + "Position "+ pos + " " + terrain+ " "+ type
	}else{
	sendData = "Co-ords=" + coords + "&Type=" + "Position "+ pos + " " + terrain
	}
     	if(GIAServers.inArray(server)){
     	sendtoserver(sendData, "empty.php");
     	}
		if(window.parent.document.location.href != document.location.href){
	status = GM_getValue(server+"Scout Status")
	if(status==1){
	ScoutQueue = GM_getValue(server+"System Scout Queue")
	ScoutQueue = ScoutQueue.replace(document.location.href + "," ,"")
	GM_setValue(server+"System Scout Queue", ScoutQueue)
	nextAstro();
	}
		}
	}


function baseDetails(){
	getBaseDetails();
	getFleet();
			if(window.parent.document.location.href != document.location.href){
	status = GM_getValue(server+"Scout Status")
	if(status==1){
	ScoutQueue = GM_getValue(server+"System Scout Queue")
	ScoutQueue = ScoutQueue.replace(document.location.href + "," ,"")
	GM_setValue(server+"System Scout Queue", ScoutQueue)
	getDebris();
	nextAstro();
	}
			}

}

function getBaseDetails(coords){
		var base = document.body.innerHTML;
	coords=document.body.innerHTML.match(/(<a.*?href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)[2];
	ID=base.match(/Base Owner<\/td><td colspan="2"><a(.+?)href="(.*?)profile.aspx\?player=(.+?)">(.+?)<\/a>/);
	player=ID[0].match(/profile.aspx\?player=(.+?)"(.*?)>(.+?)</)[0];
	ID=ID[0].match(/profile.aspx\?player=(.+?)">/)[0];
	player=player.match(/>(.+?)</);
	ID=ID.replace("profile.aspx\?player=", "");
	ID=ID.replace("\">", "");
	player=player[0].replace(">", "");
	player=player.replace("<", "")
	occID=base.match(/Occupied by<\/td><td colspan="2">(<a(.*?)href="(.*?)profile.aspx\?player=0"(.*?)>|<a(.*?)href="(.*?)profile.aspx\?player=(.+?)"(.*?)>(.+?)<\/a>)/);
	if(occID[1].match(/<a(.*?)href="(.*?)profile.aspx\?player=0"(.*?)>/)){
	occID = "0"
	occ = ""
	}else{
	occ=occID[0].match(/profile.aspx\?player=(.+?)"(.*?)>(.+?)</)[0];
	occID=occID[0].match(/profile.aspx\?player=(.+?)">/)[0];
	occ=occ.match(/>(.+?)</);
	occID=occID.replace("profile.aspx\?player=", "");
	occID=occID.replace("\">", "");
	occ=occ[0].replace(">", "");
	occ=occ.replace("<", "")
	}

	coords=base.match(/(<a.*?href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)[2];
	eco=base.match(/<td>Economy<\/td><td>(.+?)<\/td><td>cred\.\/h<\/td>/)[1]
	stuff=base.match(/<tr><th>(.+?)<tr align="center"><td>(.+?)<\/table>/)[2]
	stuffsplit=stuff.split("</td><td>")
						
structures=stuffsplit[2].split("<br>")
structuresquant=stuffsplit[3].split("<br>")
structuresnum=structures.length - 1
i=0
cc=0
jg=0
cpt=0
while (i<=structuresnum){
if (structures[i] == "<b>Command Centers</b>"){
cc = structuresquant[i]
i++
}else if (structures[i] == "Jump Gate"){
jg = structuresquant[i]
i++
}else if (structures[i] == "Capital"){
cpt = structuresquant[i]
i++
}else{
	i++
}
}
defences=stuffsplit[4].split("<br>")
defencesquant=stuffsplit[5].split("<br>")
defencesnum=defences.length - 1
i = 0;
ba = 0;
lt = 0;
mt = 0;
pt = 0;
it = 0;
pht = 0;
dt = 0;
ds = 0;
ps = 0;
pr = 0;
while (i <= defencesnum ){
if (defences[i] == "Barracks"){
		
ba = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Laser Turrets"){
		
lt = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Missile Turrets"){
		
mt = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Plasma Turrets"){
		
pt = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Ion Turrets"){
		
it = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Photon Turrets"){
		
pht = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Disruptor Turrets"){
		
dt = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Deflection Shields"){
	
ds = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Planetary Shield"){
		
ps = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else if (defences[i] == "Planetary Ring"){
		
pr = defencesquant[i].replace(/[0-9]{1,}(.[0-9]{1,}|) \/ /, "");
i++;
}else{
i++;
}
} 

sendData = "Co-Ordinates=" + coords + "&Player=" + player + "&Link=" + ID + "&OccPlayer=" + occ + "&OccLink=" + occID + "&Eco=" + eco + "&cc=" + cc + "&ba=" + ba + "&lt=" + lt + "&mt=" + mt + "&pt=" + pt + "&it=" + it + "&pht=" + pht + "&dt=" + dt + "&ds=" + ds + "&ps=" + ps + "&pr=" + pr + "&jg=" + jg + "&cpt=" + cpt
			//alert(sendData)
			if(GIAServers.inArray(server)){
			sendtoserver(sendData, "scout.php");
}
		if(window.parent.document.location.href != document.location.href){
	status = GM_getValue(server+"Scout Status")
	if(status==1){
baseReport = GM_getValue(server+"Base Report")
baseReport = baseReport + coords + "&=" + player + "&new="
GM_setValue(server+"Base Report", baseReport)
	}
		}
}

function getDebris(){
		if(document.body.innerHTML.match(/(<a href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)){
	coords=document.body.innerHTML.match(/(<a href=.map.aspx\?.+?>)([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})(<\/a>)/)[2];
	}else{
	coords=document.body.innerHTML.match(/[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/);
	}
	debris=document.body.innerHTML.match(/<center>[0-9]{1,} credits in space Debris\.<\/center>/)
	if(debris==null){
	}else{
	debris=debris[0]
	debris=debris.replace(/<center>/,"")
	debris=debris.replace(/ credits in space Debris.<\/center>/,"")
	debrisReport=GM_getValue(server+"Debris Report")
	debrisReport=debrisReport+coords+"&="+debris+"&new="
	GM_setValue(server+"Debris Report", debrisReport)
	}
}

function getFleet(){
coords=document.body.innerHTML.match(/([A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})/)[1];
tableArray = document.getElementsByTagName("table")
for(i=0; i<tableArray.length; i++){
if(tableArray[i].innerHTML.match(/<th colspan="4">Fleets<\/th>/)){
table = tableArray[i]
fleetId = []
fleetName = []
fleetOwner = []
ownerId = []
fleetDest = []
fleetArrive = []
fleetSize = []
for(a=2; a<table.rows.length; a++){
fleetId[a-2] = table.rows[a].childNodes[0].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=/, "") 
fleetId[a-2] = fleetId[a-2].replace(/">(.+?)<\/a>(.*?)/, "")
fleetName[a-2]=table.rows[a].childNodes[0].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=[0-9]{1,}">/, "")
fleetName[a-2]=fleetName[a-2].replace(/<\/a>/, "");
fleetOwner[a-2]=table.rows[a].childNodes[1].innerHTML.replace(/<a(.*?) href="profile.aspx\?player=[0-9]{1,}">/, "")
fleetOwner[a-2]=fleetOwner[a-2].replace(/<\/a>/, "");
ownerId[a-2] =table.rows[a].childNodes[1].innerHTML.replace(/<a(.*?) href="profile.aspx\?player=/, "")
ownerId[a-2] = ownerId[a-2].replace(/">(.+?)<\/a>(.*?)/, "")
if(!table.rows[a].childNodes[2].title){
table.rows[a].childNodes[2].title="0"
}
fleetArrive[a-2]=parseInt(table.rows[a].childNodes[2].title)
fleetSize[a-2]=table.rows[a].childNodes[3].innerHTML.replace(/<a(.*?) href="fleet.aspx\?fleet=[0-9]{1,}">/, "")
fleetSize[a-2]=fleetSize[a-2].replace(/<\/a>(.*?)/, "");
fleetSize[a-2]=fleetSize[a-2].replace(/(,| |\.)/g, "");
fleetReport=GM_getValue(server+"Fleet Report")
if(window.parent.document.location.href != document.location.href){
	status = GM_getValue(server+"Scout Status")
	if(status==1){
	extraShit=""
if(fleetArrive[a-2] != Math.round(new Date().getTime()/1000)){
d = new Date((fleetArrive[a-2]*1000))
now = tempdate = new Date();
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
extraShit = "&="+ endTime
}
	fleetReport=fleetReport+coords+"&="+fleetOwner[a-2]+extraShit+"&="+commaFormat(fleetSize[a-2])+"&new="
	GM_setValue(server+"Fleet Report", fleetReport)
}
}
}
sendData = "&fleetId="+fleetId+"&fleetName="+fleetName+"&fleetOwner="+fleetOwner+"&ownerId="+ownerId+"&coords="+coords+"&fleetArrive="+fleetArrive+"&fleetSize="+fleetSize
if(GIAServers.inArray(server)){
sendtoserver(sendData, "fleet.php")
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

function insertIframe(){
	if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/map.aspx?(.+?)&loc=[A-Za-z][0-9]{2}:[0-9]{2}$/)){
		sourceDiv = document.createElement("div")
	sourceDiv.style['position'] = "fixed";
	sourceDiv.style['top'] = "0px";
	sourceDiv.style['left'] = "0px";
	sourceDiv.style['height'] = "100%";
	sourceDiv.style['width'] = "100%";
	sourceDiv.id="iframe1div"
	sourceDiv.innerHTML="<iframe id=\"iframe1\" width=\"100%\" height=\"100%\" src=\"http://www.google.com\" style=\"border:none\"></iframe>"
	document.body.appendChild(sourceDiv)
	document.getElementById('iframe1').addEventListener("DOMAttrModified", function() {if(document.getElementById('iframe1').name == "next"){
	document.getElementById('iframe1').name = "";
	ScoutQueue = GM_getValue(server+"Scout Queue");
	ScoutQueue=ScoutQueue.split(",");
	randomnumber=Math.floor(Math.random()*(ScoutQueue.length-2))
	time=1500+Math.floor(Math.random()*2501);
	t=setTimeout(function(){document.getElementById('iframe1').src=ScoutQueue[randomnumber]},time)
	}else if(document.getElementById('iframe1').name == "stop"){stopScouting();}}, true);
	}else if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/map.aspx?(.+?)&loc=[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}$/)){
				sourceDiv = document.createElement("div")
	sourceDiv.style['position'] = "fixed";
	sourceDiv.style['top'] = "0px";
	sourceDiv.style['left'] = "0px";
	sourceDiv.style['height'] = "100%";
	sourceDiv.style['width'] = "100%";
	sourceDiv.innerHTML="<iframe id=\"iframe2\" width=\"100%\" height=\"100%\" src=\"http://www.google.com\" style=\"border:none\"></iframe>"
	sourceDiv.id="iframe2div"
	document.body.appendChild(sourceDiv)
	document.getElementById('iframe2').addEventListener("DOMAttrModified", function() {if(document.getElementById('iframe2').name == "next"){
	document.getElementById('iframe2').name = "";
	ScoutQueue = GM_getValue(server+"System Scout Queue");
	ScoutQueue=ScoutQueue.split(",");

	randomnumber=Math.floor(Math.random()*(ScoutQueue.length-2))
	time=1500+Math.floor(Math.random()*2501);
	t=setTimeout(function(){document.getElementById('iframe2').src=ScoutQueue[randomnumber]},time)
	}}, true);
	}
}
	
function nextAstro(){
	SystemScoutQueue = GM_getValue(server+"System Scout Queue");
	ScoutQueue = GM_getValue(server+"Scout Queue");
	time=1500+Math.floor(Math.random()*1751)
	if(SystemScoutQueue==""){
	if(ScoutQueue==""){
	t=setTimeout(function(){window.top.document.getElementById('iframe1').name = "stop"},time)
		}else{
		time=1500+Math.floor(Math.random()*2501)
	t=setTimeout(function(){window.top.document.getElementById('iframe1').name="next"},time)
	GM_setValue(server+"BaseProgress", parseFloat(GM_getValue(server+"BaseProgress"))+parseFloat(GM_getValue(server+"SystemPercent"))+"");
	GM_setValue(server+"ExtraProgress","0");
	}
	}else{
	t=setTimeout(function(){window.parent.document.getElementById('iframe2').name="next"},time)
	GM_setValue(server+"ExtraProgress", parseFloat(GM_getValue(server+"ExtraProgress"))+parseFloat(GM_getValue(server+"AstroPercent"))+"");	
	}
}

function pauseScouting(){
	GM_setValue(server+"Scout Status", "2")
	document.getElementById("pauseButton").innerHTML = "Cont. Scouting"
	document.getElementById("pauseButton").id = "contButton"
	document.getElementById('contButton').addEventListener("click", function() {contScouting();}, true);
}

function contScouting(){
	GM_setValue(server+"Scout Status", "1")
	document.getElementById("contButton").innerHTML = "Pause Scouting"
	document.getElementById("contButton").id = "pauseButton"
	document.getElementById('pauseButton').addEventListener("click", function() {pauseScouting();}, true);
	document.location.reload()
}

function stopScoutingButton(){
if(typeof(t) != "undefined"){
clearTimeout(t)
}
if(window.top.document.getElementById('iframe1')){
window.top.document.getElementById('iframe1').name = "stop"
}else{
GM_setValue(server+"Scout Status", "0")
window.location.reload();
}
}

function stopScouting(){
	GM_setValue(server+"Scout Status", "0")
	if(document.getElementById('iframe1div')){
	document.body.removeChild(document.getElementById('iframe1div'));
	}
		alert("Scouting Finished")
	GM_setValue(server+"BaseProgress", "100");
	reportResults()
}

  //////////////////////////////////////////
 /// Execution ////////////////////////////
//////////////////////////////////////////

if(document.location.href.match(/astroempires.com/)){
serverTimeSetup();
replaceTime();
insertTheSourceLink();
insertScoutLink();
insertPauseStop();
linkEventListeners();
checkUpdates();
if(document.location.href.match(/loc=[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
	sumFleets();
	getFleet();
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
	}else{
	if(window.parent.document.location.href != document.location.href){
	linkChange();
	emptyDetails();
	}else if(document.body.innerHTML.match("<b>Terrain: &nbsp;</b>unknown")){
	}else if(document.body.innerHTML.match("<b>Terrain: &nbsp;</b>Asteroid") && !document.body.innerHTML.match(/<th colspan=.4.>Fleets<\/th>/)){
	}else{
	if(GIAServers.inArray(server)){
	emptyDetails();
	}
	}
	}
	
}else if(document.location.href.match(/[A-Z][0-9]{2}:[0-9]{2}:[0-9]{2}/)){
	status = GM_getValue(server+"Scout Status")
	if(status==1){
	ScoutQueue = GM_getValue(server+"Scout Queue")
	ScoutQueue = ScoutQueue.replace(document.location.href + "," ,"")
	GM_setValue(server+"Scout Queue", ScoutQueue)
	insideSystem();
	linkChange();
	}
	debrisShow()
}else if(document.location.href.match(/http:\/\/(.+?).astroempires\.com\/credits.aspx/)){
	sumCreditsPage();
}else if(document.location.href.match(/http:\/\/(.+?)\.astroempires\.com\/base\.aspx\?base=[0-9]{1,}$/)){
	sumFleets();
	if(window.parent.document.location.href != document.location.href){
	linkChange();
	baseDetails();
	}else{
	if(GIAServers.inArray(server)){
	baseDetails();
	}
	}
}else if(document.location.href.match(/empire.aspx$/) || document.location.href.match(/empire.aspx\?view=bases_events$/)){
	storeBases();
	productionHelperButton();
}else if(document.location.href.match(/view=scanners/)){
	scannerFormat();
	if(GIAServers.inArray(server)){
	scannerGrab();
	}
}else if(window.location.href.match(/empire.aspx\?view=fleets/)){
        sumShips();
}else if(document.location.href.match(/fleet.aspx\?fleet=[0-9]{1,}&view=move/)){
fleetLaunch();
sumSingleFleet();
}else if(window.location.href.indexOf("fleet.aspx?fleet=")!=-1 && window.location.href.indexOf('view=attack') == -1){
		sumSingleFleet();
}else if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=structures/) || document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=defenses/) || document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=research/)){
	if(!document.location.href.match(/&info=/)){
enhanceConstructionPage();
}
}else if(document.location.href.match(/http:\/\/(.+?)\.astroempires\.com\/empire\.aspx\?view=technologies/)){
saveTechData();
}else if(document.location.href.match(/http:\/\/(.+?)\.astroempires\.com\/empire\.aspx\?view=trade/)){
enhanceTradePage();
}else if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=production/)){
insertTimeTextBoxes()
}
if(!document.location.href.match(/empire.aspx/)){
	insertEmpireMenu();
}
if(window.location.href.indexOf('view=move')==-1 && window.location.href.indexOf('view=fleets')==-1 && 
		window.location.href.indexOf('view=production')==-1 && window.location.href.indexOf('view=structures')==-1 &&
		window.location.href.indexOf('view=trade')==-1 && window.location.href.indexOf('view=research')==-1){
		formatVariousNumbers();
	}
	}else	if(document.location.href.match(/goonintelagency.com/)){
	document.getElementById("gia_"+GIAVersion).style['display']="none"
	}