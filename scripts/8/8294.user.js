// ==UserScript==
// @name Facebook to Google Calendar
// @namespace http://userscripts.org/scripts/show/8294
// @description Add your facebook events to currently logged in Google Calendar.
// @include http*://*.facebook.com/event.php?eid=*
//
//Version 1.9.0
//
//Known issues:
// - Doesn't support names with quotation marks in them
//
//Thanks to:
//Michael Seiler, Richard Lainchbury, Andrew Lowe, Jarett
// ==/UserScript==
var version_timestamp = 1215883520128; 

 // Add jQuery  
     var GM_JQ = document.createElement('script');  
     GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';  
     GM_JQ.type = 'text/javascript';  
     document.getElementsByTagName('head')[0].appendChild(GM_JQ);  


// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

function letsJQuery() {
//Auto-update Script, by Jarett (http://userscripts.org/users/38602)
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/8294" + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

	
timezoneoffset=0;
timetype="00";

var host, type, loc1, loc2, loc3, name, tagline, desc1, start, end, FBdate, FBdate2, replacements, regex, key, namenodes, namenode, times, mintime, maxtime;
var endtr, timetr, FBdatetr;

  monthchanges = { 
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12",
    };

//add troublesome characters as they're discovered
  unicode = { 
    //'!': "%21",
    '#': "%23",
   // ' ': "%20",
   '&': "%26",'<': "%3C",'>': "%3E",'%': "%25",'{': "%7B",'}': "%7D",'/': "%2F",':': "%3A",'=': "%3D",};

regex = {}; 
for (key in monthchanges) { regex[key] = new RegExp(key, 'g'); } 
for (key in unicode) { regex[key] = new RegExp(key, 'g'); } 
	
//works
$('td.label').filter(':contains("Host:")').next().each(function(el) {
		host = "Hosted by: " + $(this).text();
	});
$('td.label').filter(':contains("Date:")').next().each(function(el) {
		FBdate=$(this).text();
	});
$('td.label').filter(':contains("Type:")').next().each(function(el) {
		type=$(this).text();
	});	
$('td.label').filter(':contains("City/Town:")').next().each(function(el) {
		loc3=$(this).text();
	});	
$('td.label').filter(':contains("Street:")').next().each(function(el) {
		loc2=$(this).text();
	});	
$('td.label').filter(':contains("Location:")').next().each(function(el) {
		loc1=$(this).text();
	});	
$('div.left_side h2').each(function(el) {
	name=$(this).text();
	});	
$('div.left_side p').each(function(el) {
	tagline="Tagline: " + $(this).text();
	});	
$('div.description').each(function(el) {
		desc1='Description:' + ($(this).text());
	});		
$('td.label').filter(':contains("Time:")').next().each(function(el) {
		time=$(this).text();
		times = time.split(" - ");
		mintime = times[0];
		maxtime = times[1];
	});	
$('td.label').filter(':contains("Start Time:")').next().each(function(el) {
		var StartL=$(this).text();
		start = StartL.split(" at ");
		if (start) {
		FBdate = start[0];
		mintime = start[1];
		}
	});	
$('td.label').filter(':contains("End Time:")').next().each(function(el) {
		var endL=$(this).text();
		end = endL.split(" at ");	
		if (end) {
			FBdate2 = end[0];
			maxtime = end[1];
		}
	});	

	var FBdates = FBdate.split(", ");
	var weekday = FBdates[0];
	var year = FBdates[2];
	var monthday = FBdates[1].split(" ");
	var month = monthday[0];
	var day = monthday[1];
	if (day<10) {
		day = "0" + day; 
	}
	for (key in monthchanges) { 
	        month = month.replace(regex[key], monthchanges[key]); 
	    }
		
	if (FBdate2) {
		var FBdates2 = FBdate2.split(", ");
		var weekday2 = FBdates2[0];
		var year2 = FBdates2[2];
		var monthday2 = FBdates2[1].split(" ");
		var month2 = monthday2[0];
		var day2 = monthday2[1];
		if (day2<10) {day2 = "0" + day2; }
		for (key in monthchanges) { month2 = month2.replace(regex[key], monthchanges[key]);}
	}
	
	mintime = mintime.replace ("am",":am").replace ("pm",":pm");
	starttime = mintime.split(":");
	if (starttime[0]==12) {starttime[0] = starttime[0] - 12;
	}
	if (starttime[2]=="pm") {starttime = starttime[0]*100 - timezoneoffset*100 + starttime[1]*1 + 1200;
	} else {starttime = starttime[0]*100 - timezoneoffset*100 + starttime[1]*1;
		}
	if (starttime<10){starttime = "000" + starttime;
		} else if (starttime<100) {	starttime = "00" + starttime;
		} else if (starttime<1000) {starttime = "0" + starttime;
	}
	maxtime = maxtime.replace ("am",":am").replace ("pm",":pm");
	endtime = maxtime.split(":");
	if (endtime[0]==12) {endtime[0] = endtime[0] - 12;}
	if (endtime[2]=="pm") {endtime = endtime[0]*100 - timezoneoffset*100 + endtime[1]*1 + 1200;
	} else { endtime = endtime[0]*100 - timezoneoffset*100 + endtime[1]*1;
		}
	if (endtime<10){endtime = "000" + endtime;
	} else if (endtime<100) {endtime = "00" + endtime;
	} else if (endtime<1000) {endtime = "0" + endtime;
	}

if (!tagline){tagline="";}
if (!loc2){loc2="";}

escape (desc1);
escape (loc1);
escape (tagline);
escape (host);
description = host + '\n' + loc1 + '\n' + desc1;
//for (key in unicode) { description = description.replace(regex[key], unicode[key]); name = name.replace(regex[key], unicode[key]); }
	
loc = loc2 + ", " + loc3;
startFBdate=year+ month + day;
if (FBdate2) {	endFBdate=year2+ month2 + day2;	} else { endFBdate=startFBdate;	}

finalFBdate = startFBdate + "T" + starttime + timetype + "/" + endFBdate + "T" + endtime + timetype;

$('div.ical_section_event').append('<div class="ical_section" style="margin-bottom:1em;float:left;clear:left;"><div class="ical_text"> <a class="ical" target="_fbtogcal" href="http://www.google.com/calendar/event' + '?action=TEMPLATE&text=' + name + '&dates=' + finalFBdate + '&details=' + description +  '&location=' + loc + '&trp=true' + '&sprop=www.facebook.com&sprop=name:" class="tools">Add to GCal</a></div></div>');	

}