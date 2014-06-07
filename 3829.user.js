/*
 Google Calendar Feed View - GMAIL
 version 0.5 BETA
 04-13-2006
 Copyright (c) 2006, Chris McKeever
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 I try to monitor the Grease Monkey Mail List.
 http://www.mozdev.org/mailman/listinfo/greasemonkey
 Please post questions/comments and suggestions.


 This script grabs a GCAL feed URL, parses it, and display it in 
 a side nav.  

 Installation:

  1) Click the install icon for this user script in FireFox
  2) First get your Calendar Feed URL from calendar.google.com (XML)
  3) Add this to google/bookmarks with a non-space label (GMgcal recommended)
  4) When GMail is locaded/refreshed a new NAV box will appear indicating you neeed
	to run setup.
  5) To run setup Firefox:tools:user script commands:GMail Agenda Setup
  6) This will prompt you for the bookmark label and the events to display
  7) GMail _should_ refresh with your calendar loaded.

 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Add Calendar Feed - GMail", and click Uninstall.

 --------------------------------------------------------------------
*/

// ==UserScript==
// @name          Add Calendar Feed - GMail
// @namespace     http://www.r2unit.com/greasemonkey
// @description   Adds GCAL feed to GMAIL
// @include       http://mail.google.com/mail/*
// @include       https://mail.google.com/mail/*
// @exclude       http://mail.google.com/mail/help/*
// @exclude       https://mail.google.com/mail/help/*
// ==/UserScript==


GM_registerMenuCommand('GMail Agenda Setup  ',gcal_setup)

function gcal_setup(){

  var gcalLabel = GM_getValue('gcalLabel');
  if (!gcalLabel || gcalLabel == 'undefined') gcalLabel = 'GMgcal';
  gcalLabel=prompt('What is the Label for the XML Feed Bookmark',gcalLabel);
  GM_setValue('gcalLabel',gcalLabel);

  var gcalDisplay = GM_getValue('gcalDisplay');
  if (!gcalDisplay) gcalDisplay = 5;
  gcalDisplay=prompt('Display how many events',gcalDisplay);
  GM_setValue('gcalDisplay',gcalDisplay);
  top.location.href = "https://mail.google.com/mail";

}

(function() {


var _gel = getObjMethodClosure(document, "getElementById");
// wait till screen is drawn
if(!_gel('nav')) return;

var newNode = getObjMethodClosure(document, "createElement");
var newText = getObjMethodClosure(document, "createTextNode");

const gcalRule = new Array(
        // Block in sidebar
        ".gcalDIV {-moz-border-radius: 5px; background: #ff6666; margin: 20px 7px 0 0; padding: 3px;}",
        ".gcalListDIV {background: white; display:none; padding: 0px 3px 0px 2;}",
        ".gcalStatusDIV {background: #ffffcc; padding: 2px 0px 5px 2px; font-size: 8pt;}",
        ".gcalItem {color: #CC3333; font-size: 8pt;}",
        ".HgcalItem {color: #CC3333; font-size: 8pt;background-color:#FFFFCC}",
        ".GgcalItem {color: #CC3333; font-size: 8pt;background-color:#EBFFCE}",
        ".gcalEditDIV {text-align: right; padding: 2px 0px 5px 0; display:none; background: white;}",
        ".gcalEditLink {color: #CC3333;}"
        );

styleInject(gcalRule);

var gcalLabel = GM_getValue('gcalLabel');
if (!gcalLabel || gcalLabel == 'undefined') gcalLabel = 'GMgcal';

var gcalDisplay = GM_getValue('gcalDisplay');
if (!gcalDisplay  || gcalDisplay == 'undefined') gcalDisplay = 5;

XMLURL = "http://www.google.com/bookmarks/lookup?q=label:" + gcalLabel + "&sort=title";

// define the NAV area
var gcalDIV = newNode("div");
gcalDIV.id = "nb_gcal_1";
gcalDIV.className = "gcalDIV";

// header
var gcalTitleDIV = newNode("div");
gcalTitleDIV.className = "s h";
gcalTitleDIV.addEventListener("click", toggleGcalDIV, true);
gcalDIV.appendChild(gcalTitleDIV);

var gcalTriangleImage = newNode("img");
gcalTriangleImage.src = "/mail/images/opentriangle.gif";
gcalTriangleImage.width = 11;
gcalTriangleImage.height = 11;
gcalTitleDIV.appendChild(gcalTriangleImage);

var gcalTitle = newNode("span");
gcalTitle.innerHTML = "&nbsp;Agenda";
gcalTitleDIV.appendChild(gcalTitle);

// container
var gcalContDIV = newNode("div");
gcalContDIV.style.display = 'block';
gcalDIV.appendChild(gcalContDIV)

// loading message
var gcalStatusDIV = newNode("div");
gcalStatusDIV.className = "gcalStatusDiv";
gcalStatusDIV.appendChild(newText('Loading ' + gcalLabel + "..."));
gcalContDIV.appendChild(gcalStatusDIV);

// link list
var gcalListDIV = newNode("div");
gcalListDIV.className = "gcalListDIV";
gcalContDIV.appendChild(gcalListDIV);

// DIV and A for editing
var gcalEditDIV = newNode("div");
gcalEditDIV.className = "gcalEditDIV";
gcalContDIV.appendChild(gcalEditDIV);

var gEditA = newNode('a');
gEditA.href = "http://calendar.google.com";
gEditA.target = "_blank";
gEditA.className = "lk cs gcalEditLink";
gEditA.appendChild(newText("Edit Gcal"));
gcalEditDIV.appendChild(gEditA);

_gel('nav').insertBefore(gcalDIV, _gel('nb_0'));

initialize();

function initialize(){
   
  // define global
  deflen = 15; // default length of text units
  EventList = new Array;  // Array of events
  XmlErrorOccurred = false;  // tinydom parser

  // user preferences 
  feed_bmk = gcalLabel;
  ShowDecline = false; 
  dayForward = 120;

  // Short Day array
  dayA = new Array;
  dayA[0] = 'Sun';
  dayA[1] = 'Mon';
  dayA[2] = 'Tue';
  dayA[3] = 'Wed';
  dayA[4] = 'Thu';
  dayA[5] = 'Fri';
  dayA[6] = 'Sat';

  // Month array
  monthA = new Array;
  monthA[1] = 'January';
  monthA[2] = 'February';
  monthA[3] = 'March';
  monthA[4] = 'April';
  monthA[5] = 'May';
  monthA[6] = 'June';
  monthA[7] = 'July';
  monthA[8] = 'August';
  monthA[9] = 'September';
  monthA[10] = 'October';
  monthA[11] = 'November';
  monthA[12] = 'December';

  // current date info
  nowParse = parseDate(new Date(),false);
  nowDate = new Date(monthA[nowParse['month']] + " " + nowParse['date'] + " " + nowParse['year']);
  nowTS = nowDate.getTime();
  // feed parameters

  start_maxTS = nowTS + (1000 * 60 * 60 * 24) * dayForward;
  start_max = parseDate(start_maxTS);
  if (start_max['month'].toString().length == 1) start_max['month'] = "0" + start_max['month'];
  if (start_max['date'].toString().length == 1) start_max['date'] = "0" + start_max['date'];
  start_max = start_max['year'] + "-" + start_max['month'] + "-" + start_max['date']

  start_minTS = nowTS - (45 * 24 * 60 * 60 * 1000) // look back days
  start_min = parseDate(start_minTS);
  if (start_min['month'].toString().length == 1) start_min['month'] = "0" + start_min['month'];
  if (start_min['date'].toString().length == 1) start_min['date'] = "0" + start_min['date'];
  start_min = start_min['year'] + "-" + start_min['month'] + "-" + start_min['date']

  // end global declarations 

  gcalStatusDIV.innerHTML = 'Retrieving Bookmarks...';

  GM_xmlhttpRequest({
    method: 'GET',
    url: XMLURL,
    onload: function(responseDetails) {
      bmkURL = responseDetails.responseText.match(/\.\/url[^ \n\r"]+(?=.*id=bkmk_href)/);
      if (!bmkURL){
        gcalStatusDIV.innerHTML = "Calendar URL not found.  Please run Setup under Tools -> User Script Commands.";
      }else{
        XMLURL = bmkURL[0].replace('./url?url=', '');
        XMLURL = XMLURL.match(/(.+)(basic|full)/);
        XMLURL = XMLURL[0];
        if (XMLURL.match(/.*basic$/)) XMLURL = XMLURL.replace(/basic$/,'full');
        getFeed(XMLURL);
      }
    },
    onerror: function(responseDetails) {
      gcalStatusDIV.innerHTML = "Error Loading Agenda";
    }
  });
}

function getFeed(gcalURL){
  if (gcalURL == 'undefined' || !gcalURL) {
    gcalStatusDIV.innerHTML = "Calendar URL not found.  Please run Setup under Tools -> User Script Commands.";	
    return;
  }

  var gcalURL = gcalURL + "?start-max=" + start_max + "&start-min=" +  start_min;
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: gcalURL,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
      'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) { parseCalendarXML(responseDetails.responseText); },
    onerror: function(responseDetails) { gcalStatusDIV.innerHTML = "Error Loading Agenda"; }
  });
}

function parseCalendarXML(feedXML){
  var responseDOM = new XMLDoc(feedXML, function(error){if(XmlErrorOccurred == false) XmlErrorOccurred = true;});

  if ( responseDOM == null || responseDOM.docNode == null){
    gcalStatusDIV.innerHTML =  "<FONT style='color:red;font-size:.8em;'>The response from Google contained invalid XML.</FONT>";
    return;
  }
  
  var calTitle = shrink(responseDOM.docNode.getElements("title")[0].getText(),20,'');
  gcalTitle.innerHTML = "&nbsp;" + calTitle;

  gcalStatusDIV.innerHTML = "Loading " + calTitle  + "...";

  var feedAuthor = responseDOM.docNode.getElements("author")[0];
  if (feedAuthor.length != 0) {
    feedAuthor = feedAuthor.getElements("email")[0];
    if (feedAuthor) feedAuthor = feedAuthor.getText();
  }

  var eventNodes = responseDOM.docNode.getElements("entry");
  var whenNodes;
  var originalID;
  var statusNodes;  
  var whoNodes;
  var attd;
  var evCancelled;
  var aParent = new Array;
  var aEvent = new Array;
  
  var evId;
  var evAuthor;
  var evTitle;
  var evStartTS;
  var evEndTs;
  var evURL;
  var evLocation;
  var evRepeatTS;
  var evRepeatInt;
  var evRepeatType;
  var evRepeatByDay;

  var idRE = /[^\/]*$/;
  EventList = new Array();
  for (var eventNode = 0; eventNode < eventNodes.length; ++eventNode){
    aEvent = new Array;
    evId = idRE.exec(eventNodes[eventNode].getElements("id")[0].getText());
    evTitle = shrink(eventNodes[eventNode].getElements("title")[0].getText(),deflen,"...");
    evURL = eventNodes[eventNode].getElements("link")[0].getAttribute('href');

    summaryNode = eventNodes[eventNode].getElements('summary')[0];
    recurrenceNode = eventNodes[eventNode].getElements('gd:recurrence')[0];  
    whenNodes = eventNodes[eventNode].getElements("gd:when"); 
 
    originalID = eventNodes[eventNode].getElements("gd:originalEvent");
    if (originalID[0]){
      originalID = originalID[0].getAttribute('id');
      aParent[originalID] = true;
    }

    statusNodes = eventNodes[eventNode].getElements("gd:eventStatus");

    evCancelled = false;
    for (var statusI = 0; statusI < statusNodes.length; ++statusI){
      if(statusNodes[statusI].getAttribute('value').match(/.canceled/)) evCancelled = true;
    }
 
    evAuthor = eventNodes[eventNode].getElements("author")[0];
    if (evAuthor.length != 0){
      evAuthor = evAuthor.getElements("email")[0];
      if (evAuthor) evAuthor = evAuthor.getText(); 
    }

    whoNodes = eventNodes[eventNode].getElements("gd:who");  
    for (var whoI = 0; whoI < whoNodes.length; ++whoI){
      attd = whoNodes[whoI].getAttribute('valueString');
      if (whoNodes[whoI].getElements("gd:attendeeStatus")[0].getAttribute('value').match(/.declined/)
         && attd == feedAuthor && evAuthor != feedAuthor && !ShowDecline) evCancelled = true;
    }

    // left over code
    evRepeatTS = "";
    evRepeatInt = "";
    evRepeatType = "";
    evRepeatByDay = "";

    if (whenNodes.length > 0){  
      // normal event node
      aEvent = new Array;
      evLocation = shrink(eventNodes[eventNode].getElements('gd:where')[0].getAttribute('valueString'),deflen,"...");

      for (var whenNode = 0; whenNode < whenNodes.length; ++whenNode){

        aEvent[whenNode] = new Array;
        aEvent[whenNode]['evStartTS'] = TSfromISO(whenNodes[whenNode].getAttribute('startTime'),0,false);
        aEvent[whenNode]['evEndTS'] = TSfromISO(whenNodes[whenNode].getAttribute('endTime'),0,true);

      }
    }

    if(!evCancelled && !aParent[evId]){ 
      // loop the when node results and add
      for (var aWheni = 0; aWheni < aEvent.length; aWheni++){ 
        if (new Date(aEvent[aWheni]['evEndTS']).getTime() != aEvent[aWheni]['evEndTS']) aEvent[aWheni]['evEndTS'] = aEvent[aWheni]['evstartTS'];
          addEvent(new CalendarEvent(evId,evTitle,aEvent[aWheni]['evStartTS'],aEvent[aWheni]['evEndTS'],evURL,evLocation,evRepeatTS,evRepeatType,evRepeatInt,evRepeatByDay));
      }
    } 

  } // event loops  

  EventList = EventList.sort(function(a,b){return cmp(a.startTS,b.startTS);});
  renderCalendar(EventList); 

  var blockdisp = getCookie('GMgcal');
  gcalStatusDIV.style.display = 'none';
  gcalListDIV.style.display = 'block';
  gcalEditDIV.style.display = 'block';
  
  if (blockdisp == 0) toggleGcalDIV();

}


function renderCalendar(eventA){
  var max_display = gcalDisplay;
  var Dmonth = true;
  var Ddate = true;
  var Dday_of_week = true;
  var Dyear = true;
  var Dtime = true;
  var Dlocation = true;
  var Dsingle = true;
  var Uhighlight = true;

  var evHTML = "";
  var event; var summary; var tT; var std; var etd;

  var now = monthA[nowParse['month']] + " " + nowParse['date'] + " " + nowParse['year']; 
  var highlight;

  var eCount = eventA.length;  
  if (eCount > parseInt(max_display)) eCount = parseInt(max_display); // set max display

  evHTML = "<TABLE cellspacing=0 cellpadding=0 border=0 width='99%'>";
  for (var eI = 0; eI < eCount; eI++){
    event = eventA[eI];
   
    std = parseDate(event.startTS);
    etd = parseDate(event.endTS);

    std['d'] = monthA[std['month']] + " " + std['date'] + " " + std['year'];
    etd['d'] = monthA[etd['month']] + " " + etd['date'] + " " + etd['year'];

    if (nowDate > new Date(std['d']) && Uhighlight){
      highlight = "GgcalItem"; 
    } else if (now == std['d'] && Uhighlight){
      highlight = "HgcalItem"; 
    } else highlight = "gcalItem";

    var style = "valign=top class='" + highlight + "'";

    // try to remove some of the dead space in the table
    std['month'] = monthA[std['month']].substring(0,3) + "&nbsp;";
    std['day'] = dayA[std['day']] + "&nbsp;";
    std['year'] = "&nbsp;" + std['year'];
    std['remainDate'] = "";

    etd['month'] = monthA[etd['month']].substring(0,3) + "&nbsp;";
    etd['day'] = dayA[etd['day']] + "&nbsp;";
    etd['year'] = "&nbsp;" + etd['year'];

    if (!Dday_of_week){
      std['day'] = "";
      etd['day'] = "";
    }

    if (!Dmonth){
      std['month'] = "";
      etd['month'] = "";
    }

    if (!Ddate){
      std['date'] = "";
      etd['date'] = "";
      std['month'] = std['month'].replace(/&nbsp;/,'');
      etd['month'] = etd['month'].replace(/&nbsp;/,'');
    }

    if (!Dyear) {
      std['year'] = "";
      etd['year'] = "";
    }

    std['t'] = "";
    etd['t'] = "";
    if (Dtime){
      var AMPM = "a";
      
      if(std['hour'] > 12){
        AMPM = "p";
        std['hour'] = std['hour'] - 12;
      } else if (std['hour'] == 0){
        AMPM = "a";
        std['hour'] = "12";
      } else if (std['hour'] == 12){
        AMPM = "p";
      } else if (std['hour'].toString().substring(0,1) == "0"){
        std['hour'] = std['hour'].toString().substring(1,2);
      }

      std['t'] = std['hour'] + ":" + std['minute'] + AMPM;

      if(etd['hour'] > 12){
        AMPM = "p";
        etd['hour'] = etd['hour'] - 12;
      } else if (etd['hour'] == 0){
        AMPM = "a";
        etd['hour'] = "12";
      } else if (etd['hour'] == 12){
        AMPM = "p";
      } else if (etd['hour'].toString().substring(0,1) == "0"){
         etd['hour'] = etd['hour'].toString().substring(1,2);
      }

      etd['t'] = etd['hour'] + ":" + etd['minute'] + AMPM;
      
    }

    if (std['d'] != etd['d']){
      if (std['t'] == "12:00a" && etd['t'] == "11:59p"){
        std['t'] = "";
        etd['t'] = "";
      }

      if(Dsingle){
        // force single line format
        if (std['date'] == ""){
          if (std['month'] != etd['month']) std['month'] = std['month'] + "~" + etd['month'];
        } else {
          if (std['month'] == etd['month']){
            std['remainDate'] = "~" + etd['date'] + etd['year'];
          } else {
            std['remainDate'] = "~" + etd['month'] + etd['date'] + etd['year'];
          }          
        }

        if (etd['t'] != ""){
          std['t'] = std['t'] + "~" + etd['t'];
        }
        colspan = 4;
      }else colspan = 5;

      summary = event.title;
      evHTML += "<TR><TD colspan=" + colspan + "><A class='gcalItem' href='" + event.URL  + "' target='_blank'>" + summary + "</A></TD></TR>";
      if (Dlocation && event.location != '') evHTML += "<TR><TD " +  style + " colspan=" + colspan + ">&nbsp;" + event.location + "</TD></TR>";

      evHTML += "<TR>" 
             + "<TD " +  style + ">&nbsp;" + std['day'] + "</TD>" 
             + "<TD " +  style + ">" + std['month'] + "</TD>" 
             + "<TD " +  style + ">" + std['date'] + "</TD>";

      if (!Dsingle){
        evHTML += "<TD " +  style + ">" + std['year'] + "</TD>";
        evHTML += "<TD " +  style + " width='100%'>&nbsp;" + std['t'] + "</TD></TR>";
      } else {
        evHTML += "<TD " +  style + " width='100%'>" + std['remainDate'] + "</TD></TR>";
        if (std['t'] != '') evHTML += "<TR><TD " +  style + " colspan=" + colspan + ">&nbsp;" + std['t'] + "</TD></TR>";
      }

      if (!Dsingle){
        evHTML += "<TR>" 
               + "<TD " +  style + ">&nbsp;" + etd['day'] + "</TD>" 
               + "<TD " +  style + ">" + etd['month'] + "</TD>" 
               + "<TD " +  style + ">" + etd['date'] + "</TD>" 
               + "<TD " +  style + ">" + etd['year'] + "</TD>"
               + "<TD " +  style + " width='100%'>&nbsp;" + etd['t'] + "</TD></TR>";
      }

    }else{
      if (std['t'] != etd['t'] && std['t'] != '12:00a' && etd['t'] != '11:59p') std['t'] = std['t'] + "~" + etd['t'];
      if (std['t'] == "12:00a") std['t'] = "";

      colspan = (!Dsingle) ? 5 : 6;
      summary = event.title;
      evHTML += "<TR><TD colspan=" + colspan + "><A class='gcalItem' href='" + event.URL  + "' target='_blank'>" + summary + "</A></TD></TR>";
      if (Dlocation && event.location != '') evHTML += "<TR><TD " +  style + " colspan=" + colspan + ">&nbsp;" + event.location + "</TD></TR>";

      evHTML += "<TR>" 
             + "<TD " +  style + ">&nbsp;" + std['day'] + "</TD>" 
             + "<TD " +  style + ">" + std['month'] + "</TD>" 
             + "<TD " +  style + ">" + std['date'] + "</TD>";

      if (!Dsingle){
        evHTML += "<TD " +  style + ">" + etd['year'] + "</TD>";
        evHTML += "<TD " +  style + "  width='100%'>&nbsp;" + std['t'] + "</TD></TR>";
      } else {
        evHTML += "<TD " +  style + ">" + std['year'] + "</TD></TR>";
        if (std['t'] != '') evHTML += "<TR><TD " +  style + " colspan=" + colspan + ">&nbsp;" + std['t'] + "</TD></TR>";
      }
       
    }
  
    // style = "valign=top class='" + highlight + "' style='font-size:2pt'";
    // evHTML += "<TR><TD " +  style + " colspan=" + colspan  + ">&nbsp;</TD></TR>";

  }

  evHTML += "</TABLE>";

  if (eCount == 0){
    gcalListDIV.innerHTML = "<B>No Events Found.</B>";
  } else {
    gcalListDIV.innerHTML = evHTML;
  } 
 

}

// --------------------- GMscript functions

function toggleGcalDIV() {
  if (gcalContDIV.style.display != "block"){ 
    setCookie('GMgcal', 1);
    gcalContDIV.style.display = "block";
    gcalTriangleImage.src = "/mail/images/opentriangle.gif";
  } else {
    setCookie('GMgcal', 0);
    gcalContDIV.style.display = "none";
    gcalTriangleImage.src = "/mail/images/triangle.gif";
  }
  return false;
}

function parseDate(TS,debug){
  var parsed = new Array;
  var date = new Date(TS);

  parsed['day'] = date.getDay();
  parsed['month'] = date.getMonth() + 1;
  parsed['date'] = date.getDate();
  parsed['year'] = date.getFullYear();
  parsed['hour'] = date.getHours();
  parsed['minute'] = date.getMinutes();
  parsed['second'] = date.getSeconds();
  if (parsed['hour'].toString().length == 1) parsed['hour'] = '0' + parsed['hour'];
  if (parsed['minute'].toString().length == 1) parsed['minute'] = '0' + parsed['minute'];
  if (parsed['second'].toString().length == 1) parsed['second'] = '0' + parsed['second'];

  parsed['gmtOffset'] = date.getTimezoneOffset();
  parsed['gmtPosition'] = (parsed['gmtOffset'] > 0) ? "-" : "+";

  if (debug) alert(parsed['day'] + "\n" + parsed['month'] + "\n" + parsed['date'] + "\n" + parsed['year'] + "\n" + parsed['hour'] + "\n" + parsed['minute']);
  return parsed;
}

function TSfromISO(ISO,offset,isEnd){
  // converts date in the format 2006-04-15T20:00:00.000Z to milliseconds since EPOCH
  // works with 2006-04-15 20:00
  var tRE = /(\s|T)([0-9]{2}:[0-9]{2})/;
  var dRE = /([0-9]+)-([0-9]+)-([0-9]+)/;
  var oRE = /(\+|-){1}(.){5}$/;

  var TS;
  var date  = dRE.exec(ISO);
  var time  = tRE.exec(ISO);
  var gmtPosition = nowParse['gmtPosition'];
  var gmtOffset = oRE.exec(ISO);
/*
  var gmtPosition = "+";
  var gmtOffset = oRE.exec(ISO);
  if (gmtOffset && ISO.length > 10) var gmtPosition = gmtOffset[1];
*/

  var timeAdjust = 0;

  if (date){
    if (time){
      time = time[2];
    } else {
      gmtOffset = false;
      offset = 0;
      if (gmtPosition == "+"){
         if (isEnd) {
           timeAdjust = -1;
           time =  "23:59";
         } else time =  "00:00";
      } else {
         if (!isEnd) {
           timeAdjust = 1;
           time =  "00:00";
         } else time =  "23:59";
      }  
    }

    if (gmtOffset){
      gmtOffset = gmtOffset[0];
      offset = 1;
    } else gmtOffset = 0; 
  
    if(date[2].substring(0,1) == "0") date[2] = date[2].substring(1,2);
//    if(date[3].substring(0,1) == "0") date[3] = date[3].substring(1,2);

    TS = new Date(monthA[parseInt(date[2])] + " " + date[3] + " " + date[1] + " " + time);
 
    if (timeAdjust != 0){
      var TTS = TS;
      TS = new Date(TS.getTime() + 24 * 60 * 60 * 1000 * timeAdjust); // add a day based on gmtPosition
      var DSToffset = (TS.getTimezoneOffset() - TTS.getTimezoneOffset()) * 1000 * 60;
      TS = new Date(TS.getTime() - DSToffset);
    }

    TS = (offset == 0) ? TS.getTime() : TS.getTime() - (TS.getTimezoneOffset() * 60 * 1000) - (parseInt(gmtOffset) * 60 * 60 * 1000);

  } else TS = "";

  return TS;
}

// -----------------------------  Resource

function getObjMethodClosure(object, method) {
  // shorthand object reference
  return function(arg) {
    return object[method](arg); 
  }
}

function styleInject(styRule) {
  // injects style elements into head
  var styleNode = newNode("style");
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];
  for (var i=0; i < styRule.length; i++) { styleSheet.insertRule(styRule[i], 0); }
}

function xpath(pattern){
  // simple xpath parser
  var a_emt = new Array();
  var sshot = document.evaluate(pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if( sshot.snapshotLength > 0){
    for (i=0; i< sshot.snapshotLength; i++){
      a_emt[i] = sshot.snapshotItem(i);
    } 
    return a_emt;
  }
   return null;
}

function setCookie(name, value) {
  var today = new Date();
  var expiry = new Date(today.getTime() + 24 * 60  * 60 * 1000);
                                                                                
  document.cookie = name + "=" + escape(value) 
    + "; expires=" + expiry.toGMTString() 
    + "; path=/";
}

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");;
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function cmp(a,b) {
 return (a < b) ? -1 :( a > b) ? 1 : 0;
}

function shrink(text,length,append){
  // shrinks text to length and makes undefined = ''
  // appends append to the end
  if (text){
    // fix IE &apos; issue
    text = text.replace("&apos;","'");
    if (text.length > length) text = text.substring(0,length) + append; 
  } else text = "";

  return text;
}

// ------------------------------ Calendar Object

function CalendarEvent(id,title,startTS,endTS,URL,location,repeatTS,repeatType,repeatInt,repeatByDay){
  this.id = id;
  this.title = title;
  this.URL = URL;
  this.location = location;
    
  this.startTS = startTS;
  this.endTS = endTS;
  this.duration = parseInt(endTS) - parseInt(startTS);
 
  this.repeatTS = repeatTS;  
  this.repeatType = repeatType;
  this.repeatInt = repeatInt;
  this.repeatByDay = repeatByDay;
}

function addEvent(event){
  // add event if it is in the future
  if (event.endTS >= nowTS) {
	EventList.push(event);
  }
}


// ------------------------------ End Calendar Object


// ----------------- TINYDOM
// =========================================================================
//
// tinyxmldom.js - an XML DOM parser in JavaScript compressed for downloading
//
//  This is the classic DOM that has shipped with XML for <SCRIPT>
//  since the beginning. For a more standards-compliant DOM, you may
//  wish to use the standards-compliant W3C DOM that is included
//  with XML for <SCRIPT> versions 3.0 and above
//
//
// version 3.1
//
// =========================================================================
//
// Copyright (C) 2000 - 2002, 2003 Michael Houghton (mike@idle.org), Raymond Irving and David Joham (djoham@yahoo.com)
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//
// Visit the XML for <SCRIPT> home page at http://xmljs.sourceforge.net


var whitespace = "\n\r\t "; var quotes = "\"'"; function convertEscapes(str) { var gt; gt = -1; while (str.indexOf("&lt;", gt + 1) > -1) { var gt = str.indexOf("&lt;", gt + 1); var newStr = str.substr(0, gt); newStr += "<"; newStr = newStr + str.substr(gt + 4, str.length); str = newStr;}
gt = -1; while (str.indexOf("&gt;", gt + 1) > -1) { var gt = str.indexOf("&gt;", gt + 1); var newStr = str.substr(0, gt); newStr += ">"; newStr = newStr + str.substr(gt + 4, str.length); str = newStr;}
gt = -1; while (str.indexOf("&amp;", gt + 1) > -1) { var gt = str.indexOf("&amp;", gt + 1); var newStr = str.substr(0, gt); newStr += "&"; newStr = newStr + str.substr(gt + 5, str.length); str = newStr;}
return str;}
function convertToEscapes(str) { var gt = -1; while (str.indexOf("&", gt + 1) > -1) { gt = str.indexOf("&", gt + 1); var newStr = str.substr(0, gt); newStr += "&amp;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
gt = -1; while (str.indexOf("<", gt + 1) > -1) { var gt = str.indexOf("<", gt + 1); var newStr = str.substr(0, gt); newStr += "&lt;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
gt = -1; while (str.indexOf(">", gt + 1) > -1) { var gt = str.indexOf(">", gt + 1); var newStr = str.substr(0, gt); newStr += "&gt;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
return str;}
function _displayElement(domElement, strRet) { if(domElement==null) { return;}
if(!(domElement.nodeType=='ELEMENT')) { return;}
var tagName = domElement.tagName; var tagInfo = ""; tagInfo = "<" + tagName; var attributeList = domElement.getAttributeNames(); for(var intLoop = 0; intLoop < attributeList.length; intLoop++) { var attribute = attributeList[intLoop]; tagInfo = tagInfo + " " + attribute + "="; tagInfo = tagInfo + "\"" + domElement.getAttribute(attribute) + "\"";}
tagInfo = tagInfo + ">"; strRet=strRet+tagInfo; if(domElement.children!=null) { var domElements = domElement.children; for(var intLoop = 0; intLoop < domElements.length; intLoop++) { var childNode = domElements[intLoop]; if(childNode.nodeType=='COMMENT') { strRet = strRet + "<!--" + childNode.content + "-->";}
else if(childNode.nodeType=='TEXT') { var cont = trim(childNode.content,true,true); strRet = strRet + childNode.content;}
else if (childNode.nodeType=='CDATA') { var cont = trim(childNode.content,true,true); strRet = strRet + "&lt;![CDATA[" + cont + "]]&gt;";}
else { strRet = _displayElement(childNode, strRet);}
}
}
strRet = strRet + "</" + tagName + ">"; return strRet;}
function firstWhiteChar(str,pos) { if (isEmpty(str)) { return -1;}
while(pos < str.length) { if (whitespace.indexOf(str.charAt(pos))!=-1) { return pos;}
else { pos++;}
}
return str.length;}
function isEmpty(str) { return (str==null) || (str.length==0);}
function trim(trimString, leftTrim, rightTrim) { if (isEmpty(trimString)) { return "";}
if (leftTrim == null) { leftTrim = true;}
if (rightTrim == null) { rightTrim = true;}
var left=0; var right=0; var i=0; var k=0; if (leftTrim == true) { while ((i<trimString.length) && (whitespace.indexOf(trimString.charAt(i++))!=-1)) { left++;}
}
if (rightTrim == true) { k=trimString.length-1; while((k>=left) && (whitespace.indexOf(trimString.charAt(k--))!=-1)) { right++;}
}
return trimString.substring(left, trimString.length - right);}
function XMLDoc(source, errFn) { this.topNode=null; this.errFn = errFn; this.createXMLNode = _XMLDoc_createXMLNode; this.error = _XMLDoc_error; this.getUnderlyingXMLText = _XMLDoc_getUnderlyingXMLText; this.handleNode = _XMLDoc_handleNode; this.hasErrors = false; this.insertNodeAfter = _XMLDoc_insertNodeAfter; this.insertNodeInto = _XMLDoc_insertNodeInto; this.loadXML = _XMLDoc_loadXML; this.parse = _XMLDoc_parse; this.parseAttribute = _XMLDoc_parseAttribute; this.parseDTD = _XMLDoc_parseDTD; this.parsePI = _XMLDoc_parsePI; this.parseTag = _XMLDoc_parseTag; this.removeNodeFromTree = _XMLDoc_removeNodeFromTree; this.replaceNodeContents = _XMLDoc_replaceNodeContents; this.selectNode = _XMLDoc_selectNode; this.selectNodeText = _XMLDoc_selectNodeText; this.source = source; if (this.parse()) { if (this.topNode!=null) { return this.error("expected close " + this.topNode.tagName);}
else { return true;}
}
}
function _XMLDoc_createXMLNode(strXML) { return new XMLDoc(strXML, this.errFn).docNode;}
function _XMLDoc_error(str) { this.hasErrors=true; if(this.errFn){ this.errFn("ERROR: " + str);}else if(this.onerror){ this.onerror("ERROR: " + str);}
return 0;}
function _XMLDoc_getTagNameParams(tag,obj){ var elm=-1,e,s=tag.indexOf('['); var attr=[]; if(s>=0){ e=tag.indexOf(']'); if(e>=0)elm=tag.substr(s+1,(e-s)-1); else obj.error('expected ] near '+tag); tag=tag.substr(0,s); if(isNaN(elm) && elm!='*'){ attr=elm.substr(1,elm.length-1); attr=attr.split('='); if(attr[1]) { s=attr[1].indexOf('"'); attr[1]=attr[1].substr(s+1,attr[1].length-1); e=attr[1].indexOf('"'); if(e>=0) attr[1]=attr[1].substr(0,e); else obj.error('expected " near '+tag)
};elm=-1;}else if(elm=='*') elm=-1;}
return [tag,elm,attr[0],attr[1]]
}
function _XMLDoc_getUnderlyingXMLText() { var strRet = ""; strRet = strRet + "<?xml version=\"1.0\"?>"; if (this.docNode==null) { return;}
strRet = _displayElement(this.docNode, strRet); return strRet;}
function _XMLDoc_handleNode(current) { if ((current.nodeType=='COMMENT') && (this.topNode!=null)) { return this.topNode.addElement(current);}
else if ((current.nodeType=='TEXT') || (current.nodeType=='CDATA')) { if(this.topNode==null) { if (trim(current.content,true,false)=="") { return true;}
else { return this.error("expected document node, found: " + current);}
}
else { return this.topNode.addElement(current);}
}
else if ((current.nodeType=='OPEN') || (current.nodeType=='SINGLE')) { var success = false; if(this.topNode==null) { this.docNode = current; current.parent = null; success = true;}
else { success = this.topNode.addElement(current);}
if (success && (current.nodeType!='SINGLE')) { this.topNode = current;}
current.nodeType = "ELEMENT"; return success;}
else if (current.nodeType=='CLOSE') { if (this.topNode==null) { return this.error("close tag without open: " + current.toString());}
else { if (current.tagName!=this.topNode.tagName) { return this.error("expected closing " + this.topNode.tagName + ", found closing " + current.tagName);}
else { this.topNode = this.topNode.getParent();}
}
}
return true;}
function _XMLDoc_insertNodeAfter (referenceNode, newNode) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = referenceNode.getUnderlyingXMLText(); var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText) + selectedNodeXMLText.length; var newXML = parentXMLText.substr(0,originalNodePos); newXML += newNode.getUnderlyingXMLText(); newXML += parentXMLText.substr(originalNodePos); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_insertNodeInto (referenceNode, insertNode) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = referenceNode.getUnderlyingXMLText(); var endFirstTag = selectedNodeXMLText.indexOf(">") + 1; var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText) + endFirstTag; var newXML = parentXMLText.substr(0,originalNodePos); newXML += insertNode.getUnderlyingXMLText(); newXML += parentXMLText.substr(originalNodePos); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_loadXML(source){ this.topNode=null; this.hasErrors = false; this.source=source; return this.parse();}
function _XMLDoc_parse() { var pos = 0; err = false; while(!err) { var closing_tag_prefix = ''; var chpos = this.source.indexOf('<',pos); var open_length = 1; var open; var close; if (chpos ==-1) { break;}
open = chpos; var str = this.source.substring(pos, open); if (str.length!=0) { err = !this.handleNode(new XMLNode('TEXT',this, str));}
if (chpos == this.source.indexOf("<?",pos)) { pos = this.parsePI(this.source, pos + 2); if (pos==0) { err=true;}
continue;}
if (chpos == this.source.indexOf("<!DOCTYPE",pos)) { pos = this.parseDTD(this.source, chpos+ 9); if (pos==0) { err=true;}
continue;}
if(chpos == this.source.indexOf('<!--',pos)) { open_length = 4; closing_tag_prefix = '--';}
if (chpos == this.source.indexOf('&lt;![CDATA[',pos)) { open_length = 9; closing_tag_prefix = ']]';}
chpos = this.source.indexOf(closing_tag_prefix + '>',chpos); if (chpos ==-1) { return this.error("expected closing tag sequence: " + closing_tag_prefix + '>');}
close = chpos + closing_tag_prefix.length; str = this.source.substring(open+1, close); var n = this.parseTag(str); if (n) { err = !this.handleNode(n);}
pos = close +1;}
return !err;}
function _XMLDoc_parseAttribute(src,pos,node) { while ((pos<src.length) && (whitespace.indexOf(src.charAt(pos))!=-1)) { pos++;}
if (pos >= src.length) { return pos;}
var p1 = pos; while ((pos < src.length) && (src.charAt(pos)!='=')) { pos++;}
var msg = "attributes must have values"; if(pos >= src.length) { return this.error(msg);}
var paramname = trim(src.substring(p1,pos++),false,true); while ((pos < src.length) && (whitespace.indexOf(src.charAt(pos))!=-1)) { pos++;}
if (pos >= src.length) { return this.error(msg);}
msg = "attribute values must be in quotes"; var quote = src.charAt(pos++); if (quotes.indexOf(quote)==-1) { return this.error(msg);}
p1 = pos; while ((pos < src.length) && (src.charAt(pos)!=quote)) { pos++;}
if (pos >= src.length) { return this.error(msg);}
if (!node.addAttribute(paramname,trim(src.substring(p1,pos++),false,true))) { return 0;}
return pos;}
function _XMLDoc_parseDTD(str,pos) { var firstClose = str.indexOf('>',pos); if (firstClose==-1) { return this.error("error in DTD: expected '>'");}
var closing_tag_prefix = ''; var firstOpenSquare = str.indexOf('[',pos); if ((firstOpenSquare!=-1) && (firstOpenSquare < firstClose)) { closing_tag_prefix = ']';}
while(true) { var closepos = str.indexOf(closing_tag_prefix + '>',pos); if (closepos ==-1) { return this.error("expected closing tag sequence: " + closing_tag_prefix + '>');}
pos = closepos + closing_tag_prefix.length +1; if (str.substring(closepos-1,closepos+2) != ']]&gt;') { break;}
}
return pos;}
function _XMLDoc_parsePI(str,pos) { var closepos = str.indexOf('?>',pos); return closepos + 2;}
function _XMLDoc_parseTag(src) { if (src.indexOf('!--')==0) { return new XMLNode('COMMENT', this, src.substring(3,src.length-2));}
if (src.indexOf('![CDATA[')==0) { return new XMLNode('CDATA', this, src.substring(8,src.length-2));}
var n = new XMLNode(); n.doc = this; if (src.charAt(0)=='/') { n.nodeType = 'CLOSE'; src = src.substring(1);}
else { n.nodeType = 'OPEN';}
if (src.charAt(src.length-1)=='/') { if (n.nodeType=='CLOSE') { return this.error("singleton close tag");}
else { n.nodeType = 'SINGLE';}
src = src.substring(0,src.length-1);}
if (n.nodeType!='CLOSE') { n.attributes = new Array();}
if (n.nodeType=='OPEN') { n.children = new Array();}
src = trim(src,true,true); if (src.length==0) { return this.error("empty tag");}
var endOfName = firstWhiteChar(src,0); if (endOfName==-1) { n.tagName = src; return n;}
n.tagName = src.substring(0,endOfName); var pos = endOfName; while(pos< src.length) { pos = this.parseAttribute(src, pos, n); if (this.pos==0) { return null;}
}
return n;}
function _XMLDoc_removeNodeFromTree(node) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = node.getUnderlyingXMLText(); var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText); var newXML = parentXMLText.substr(0,originalNodePos); newXML += parentXMLText.substr(originalNodePos + selectedNodeXMLText.length); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_replaceNodeContents(referenceNode, newContents) { var newNode = this.createXMLNode("<X>" + newContents + "</X>"); referenceNode.children = newNode.children; return this;}
function _XMLDoc_selectNode(tagpath){ tagpath = trim(tagpath, true, true); var srcnode,node,tag,params,elm,rg; var tags,attrName,attrValue,ok; srcnode=node=((this.source)?this.docNode:this); if (!tagpath) return node; if(tagpath.indexOf('/')==0)tagpath=tagpath.substr(1); tagpath=tagpath.replace(tag,''); tags=tagpath.split('/'); tag=tags[0]; if(tag){ if(tagpath.indexOf('/')==0)tagpath=tagpath.substr(1); tagpath=tagpath.replace(tag,''); params=_XMLDoc_getTagNameParams(tag,this); tag=params[0];elm=params[1]; attrName=params[2];attrValue=params[3]; node=(tag=='*')? node.getElements():node.getElements(tag); if (node.length) { if(elm<0){ srcnode=node;var i=0; while(i<srcnode.length){ if(attrName){ if (srcnode[i].getAttribute(attrName)!=attrValue) ok=false; else ok=true;}else ok=true; if(ok){ node=srcnode[i].selectNode(tagpath); if(node) return node;}
i++;}
}else if (elm<node.length){ node=node[elm].selectNode(tagpath); if(node) return node;}
}
}
}
function _XMLDoc_selectNodeText(tagpath){ var node=this.selectNode(tagpath); if (node != null) { return node.getText();}
else { return null;}
}
function XMLNode(nodeType,doc, str) { if (nodeType=='TEXT' || nodeType=='CDATA' || nodeType=='COMMENT' ) { this.content = str;}
else { this.content = null;}
this.attributes = null; this.children = null; this.doc = doc; this.nodeType = nodeType; this.parent = ""; this.tagName = ""; this.addAttribute = _XMLNode_addAttribute; this.addElement = _XMLNode_addElement; this.getAttribute = _XMLNode_getAttribute; this.getAttributeNames = _XMLNode_getAttributeNames; this.getElementById = _XMLNode_getElementById; this.getElements = _XMLNode_getElements; this.getText = _XMLNode_getText; this.getParent = _XMLNode_getParent; this.getUnderlyingXMLText = _XMLNode_getUnderlyingXMLText; this.removeAttribute = _XMLNode_removeAttribute; this.selectNode = _XMLDoc_selectNode; this.selectNodeText = _XMLDoc_selectNodeText; this.toString = _XMLNode_toString;}
function _XMLNode_addAttribute(attributeName,attributeValue) { this.attributes['_' + attributeName] = attributeValue; return true;}
function _XMLNode_addElement(node) { node.parent = this; this.children[this.children.length] = node; return true;}
function _XMLNode_getAttribute(name) { if (this.attributes == null) { return null;}
return this.attributes['_' + name];}
function _XMLNode_getAttributeNames() { if (this.attributes == null) { var ret = new Array(); return ret;}
var attlist = new Array(); for (var a in this.attributes) { attlist[attlist.length] = a.substring(1);}
return attlist;}
function _XMLNode_getElementById(id) { var node = this; var ret; if (node.getAttribute("id") == id) { return node;}
else{ var elements = node.getElements(); var intLoop = 0; while (intLoop < elements.length) { var element = elements[intLoop]; ret = element.getElementById(id); if (ret != null) { break;}
intLoop++;}
}
return ret;}
function _XMLNode_getElements(byName) { if (this.children==null) { var ret = new Array(); return ret;}
var elements = new Array(); for (var i=0; i<this.children.length; i++) { if ((this.children[i].nodeType=='ELEMENT') && ((byName==null) || (this.children[i].tagName == byName))) { elements[elements.length] = this.children[i];}
}
return elements;}
function _XMLNode_getText() { if (this.nodeType=='ELEMENT') { if (this.children==null) { return null;}
var str = ""; for (var i=0; i < this.children.length; i++) { var t = this.children[i].getText(); str += (t == null ? "" : t);}
return str;}
else if (this.nodeType=='TEXT') { return convertEscapes(this.content);}
else { return this.content;}
}
function _XMLNode_getParent() { return this.parent;}
function _XMLNode_getUnderlyingXMLText() { var strRet = ""; strRet = _displayElement(this, strRet); return strRet;}
function _XMLNode_removeAttribute(attributeName) { if(attributeName == null) { return this.doc.error("You must pass an attribute name into the removeAttribute function");}
var attributes = this.getAttributeNames(); var intCount = attributes.length; var tmpAttributeValues = new Array(); for ( intLoop = 0; intLoop < intCount; intLoop++) { tmpAttributeValues[intLoop] = this.getAttribute(attributes[intLoop]);}
this.attributes = new Array(); for (intLoop = 0; intLoop < intCount; intLoop++) { if ( attributes[intLoop] != attributeName) { this.addAttribute(attributes[intLoop], tmpAttributeValues[intLoop]);}
}
return true;}
function _XMLNode_toString() { return "" + this.nodeType + ":" + (this.nodeType=='TEXT' || this.nodeType=='CDATA' || this.nodeType=='COMMENT' ? this.content : this.tagName);}
}) (); // end function enclosure

