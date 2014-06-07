// Reformat the moronic design of the BBC Radio schedules
// ------------------------------------------------------
//
// Explanation
// -----------
// At the end of March 2009 the BBC launched a redesigned web site for Radio 4.
// And it is bloody awful.
// *  The top half of the screen is wasted on header info.
// *  A huge column is wasted on a calendar and vertical white space
// *  You have to scroll miles down because (a) hugh amounts of white space
//    are included in each entry (b) every bit of information is stacked vertically
//    instead of horizontally
// *  The subtitles merge with the titles...
//    ... and are often just today's date in big letters
//
// It has been quite obvious for some time that the R4 web pages are run
// by a bunch of incompetent first year media students who can't get
// their technology right let alone make use of it and have their heads
// stuck so far up their precious bottoms to understand that COMMUNICATION
// and UTILITY is the object of the exercise. Acres of white space
// symbolise the wasteland of their competency.
//
// This program takes the BBC data from their web pages and reformats it
// before your very eyes.  AND ALSO adds a facility to mark programmes
// of interest.  AND ALSO provides buttons to switch to other channels.
//
// More at http://vulpeculox.net
//
window.versionDate = '23 April 2009';
// Version history 
// ---------------
// 23 April 2009
// - Help,pins,settings framework introduced (still work to do)
// - All pins for all stations are together  
// - Added quick blue-pin for subtitle
// - Added ear cursor for LAG and LN
// -----------------------------------------------------------------
// First live version 21st April 2009 
//
// Todo
// ----
// Finish testing pins
// Show marked programmes together on their own in a special area and give a jump 
// Allow radio stations to be deselected
// Allow the user to add new radio stations of their choice
// 
//
// Origin
// ------
// Written by Peter Fox.  http://vulpeculox.net
//
// Terms of use
// ------------
// * Personal use only
// * Use at own risk
// * No support guaranteed
// * Copyright Peter Fox
//
// ==UserScript==
// @name           Better BBC radio schedule
// @namespace      http://vulpeculox.net/radio
// @description    Awful design fixed.  Channel switch added. Personal highlighting added.
// @include        http://www.bbc.co.uk/*/programmes/schedules*
// @include        http://www.bbc.co.uk/*/programmes/schedules/fm*
//   The exclude that follows is to make it easy for us to include a link to the
//   original page that doesn't get Greasemonkeyed.  ie. show as original.
// @exclude        http://www.bbc.co.uk/*?NOGM
// @exclude        http://www.bbc.co.uk/radi04/programmes/schedules/lw
// ==/UserScript==


// =============================================================
// How the script works
// --------------------
// 1  Scrape
//    .1  Fixed bits such as title and navigation
//    .2  List of programmes
// | Because of the potential for failing to pick up the data
// | due to uncontrolled changes by the BBC we'll stick to just
// | collecting the raw data at this stage without any attempt
// | to restructure it as we go.
// 2  Rebuild - logical
//    .1  Navigation
//    .2  List of programmes
// | Rebuilding the page in our own way to rejig the content
// | is an exercise that involves some fiddly logic and may
// | grow if we add genres
// 3  Rebuild - physical
//    .1 Kill off existing content and styles
//    .2 Substitute our new HTML and styles
//    .3 Add own click events
// =============================================================

// =============================================================
// Want to improve this script?
// ----------------------------
// That would be great.  Go ahead.
// Found a bug (and better how to fix it): Brilliant - let me know.
// You can see how to improve the program in general but don't have the skills: Fine add your 2-pennyworth
// You have expert programming and CSS skills but think the program is about OK as it stands: You could be very useful maintaining it and adding features.
// Report, co-ordinate and suggest at radio0409@PeterFox.ukfsn.org
// =============================================================

// =============================================================
// Original DOM for top buttons scraping
// =============================================================
// Although the BBC schedules conform to an approximate pattern
// there are different buttons and slightly different IDs for
// elements.
//----------------------------------------------------------------------------------------
// RADIO2                      | RADIO4                     | RADIO7                     |
//----------------------------------------------------------------------------------------
// DIV.blq-local-nav           | DIV.blq-local.nav          | DIV.blq-local-nav          |
// +-UL.service-nav            | +-UL.service-nav           | +-UL.navigation            |
//   +-LI:@                    |   +-LI.@                   |   +LI                      |
//     +-A(href=@,text=@)      |     +-A(href=@)            |     +-P.@                  |
//                             |       +SPAN(text=@)        |       +-A(href=@,text=@)   |
//                             |                            |                            |
//----------------------------------------------------------------------------------------
//-----------------------------------------------------------
// RADIO3                      | RADIO6                     |
//-----------------------------------------------------------
// DIV:nav_content cm          | DIV.navigation             | 
// +-etc...etc                 | +-UL.navigationlist        |
//      |                      |   +-LI.@                   |  
//      +-A((href=@,text=@)    |     etc A...               |  
//-----------------------------------------------------------
// So what we do is
//   (1) find DIV.blq-local-nav
//   (2) get all the As under it
//   (3) with the As get the pathname and textContent
//   (4) put these into an array called topButs each being Array(href,text)
// =============================================================


// =============================================================
// DOM for key row elements in reconstructed schedule
// =============================================================
// TR
// +-[0] pin                .className -> state
// +-[1] lag                .className -> state
// +-[2] start              .textContent -> start time
// +-[3] title,desc etc
//   +-[0] <a> title        .textContent -> title
//   +-[2] <span>           .textContent -> sub-title 
//
// Use FetchRowBits();
// =============================================================





//  ################################################################################################
//   ##  ##  ######  ######  ##      ######  ######  ##  ##          ######  ##  ##  ##  ##   ####   ######  ######   ####   ##  ##   ####  
//   ##  ##    ##      ##    ##        ##      ##     ####           ##      ##  ##  ### ##  ##  ##    ##      ##    ##  ##  ### ##  ##     
//   ##  ##    ##      ##    ##        ##      ##      ##            ####    ##  ##  ## ###  ##        ##      ##    ##  ##  ## ###   ####  
//   ##  ##    ##      ##    ##        ##      ##      ##            ##      ##  ##  ##  ##  ##  ##    ##      ##    ##  ##  ##  ##      ## 
//    ####     ##    ######  ######  ######    ##      ##            ##       ####   ##  ##   ####     ##    ######   ####   ##  ##   ####  
//  ################################################################################################


// --------------------------------------------------------
function GetFirstMatchingElement(TagAndClass,StartFrom){
// Encapsulates document.evaluate()...first element
// TagAndClass eg   "//td [@class='date focus today']"
// StartFrom is typically document but can be any element
// --------------------------------------------------------
  //LogElement('GFMA ('+TagAndClass+') ',StartFrom);
  var matchingElements = GetAllMatchingElements(TagAndClass,StartFrom);
  //GM_log('NUMBER FOUND : ' + matchingElements.snapshotLength);
  if (matchingElements.snapshotLength>0){
    for(var i = 0; i<matchingElements.snapshotLength;i++){
      //LogElement('ELMT('+i+') :',matchingElements.snapshotItem(i));
    }    
    return matchingElements.snapshotItem(0);  
  }else{
    return undefined;
  }
}

// --------------------------------------------------------
function GetAllMatchingElements(TagAndClass,StartFrom){
// Encapsulates document.evaluate() in original order
// TagAndClass eg   "//td [@class='date focus today']"
// StartFrom is typically document but can be any element
// --------------------------------------------------------
  return document.evaluate(TagAndClass,StartFrom,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// --------------------------------------------------------
function ApplyToMatchingElements(TagAndClass,StartFrom,Callback){
// apply some function to the discovered elements
// --------------------------------------------------------
  var xpr = GetAllMatchingElements(TagAndClass,StartFrom);
  if(xpr.snapshotLength<1){return};
  for (var i = 0; i < xpr.snapshotLength; i++){
    Callback(xpr.snapshotItem(i));
  }
}

// --------------------------------------------------------
function AddStyle(Css) {
// Convenience function to add style
// Css is the text
// --------------------------------------------------------
  var head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = Css;
  head.appendChild(style);
}

// --------------------------------------------------------
function LogElement(Text,Element){ 
// --------------------------------------------------------
  if(Element == undefined){
    GM_log(Text + ': Element is undefined');
  }else{  
    GM_log(Text + ': '+ Element.localName + ':' + Element.className + '{'+ Element.id+'}');
  }  
}

// --------------------------------------------------------
window.LogArray = function(Label,AnArray){
// Display an array in the log messages
// --------------------------------------------------------
  var s = AnArray.join('|');
  GM_log(Label + ' Array of ('+AnArray.length+') items: '+s);
}  

// --------------------------------------------------------
window.LogArray2 = function(Label,AnArray){
// Display a 2-dimensional array in the log messages
// --------------------------------------------------------
  var lines = new Array(AnArray.length);
  for(var i=0 ; i < AnArray.length ; i++){
    lines[i] = AnArray[i].join('|');
  }
  var s = lines.join('\n');
  GM_log(Label + ' Array of ('+AnArray.length+') rows:\n'+s);
}  



// -------------------------------------------------
window.SaveTwoDimArray = function(Key,AnArray){
// Generic 2 dim array to GM_setValue()
// -------------------------------------------------
  var lines = new Array(AnArray.length);
  for(var i=0 ; i < AnArray.length ; i++){
    lines[i] = AnArray[i].join('¬');
  }
  var s = lines.join('\n');
  //GM_log('S2DA:('+AnArray.length+')('+s+')');
  GM_setValue(Key,s);
}

// -------------------------------------------------
window.LoadTwoDimArray = function(Key,DefaultStr){
// Generic load a two dimensional array using GM_getValue()
// -------------------------------------------------
  var s = GM_getValue(Key,DefaultStr);
  //GM_log('Sis('+s+')');
  if(s==''){
    //GM_log('L2D ('+Key+')is blank');
    return new Array();
  }else{
    var lines = s.split('\n');
    var noLines = lines.length;
    //GM_log('L2D : '+noLines+' lines');
    var a = new Array(noLines);
    for(var i=0 ; i < noLines ; i++){
      // GM_log('[206] L2D Line : '+i+' = ('+lines[i]+')');
      a[i] = lines[i].split('¬');
    }
    return a;
  }  
}

//  ################################################################################################
//    #####   ######  ##  ##   ####  
//    ##  ##    ##    ### ##  ##     
//    #####     ##    ## ###   ####  
//    ##        ##    ##  ##      ## 
//    ##      ######  ##  ##   ####  
//  ################################################################################################
//
// We define three active pins to flag wanted progs
// RED     Serial at a certain time any day
//         Eg the Archers at 7pm 
// BLUE    Serial at any time any day...
//         ... but if we have a sub-title restrict to this.
//         eg. Book of the week+Alice in Wonderland
// YELLOW  A one-shot for specific date and time (and title)
// ------------------------------------------------------------
//
// LOCAL STORAGE
// ************************************************************
// All program pinning is done by storing a single string keyed
// by the GM_setValue('PINS+station',...)  eg 'PINSradio4'
// The format of this string is
// Record seperator = new line (\n)
// Field seperator = "¬"
// Fields are Title ¬ Subtitle ¬ Date ¬ Time ¬ Pin-colour ¬ Date-last-seen ¬ StationIx
//            0       1          2      3      4            5                6
// Dates are in days since 1 Jan 1970
// Time is a string eg 13:30
// Pin-colour is 'red','blue' or 'yellow'
// We keep records until a month after we last used them
// StationIX is an integer pointer to stations[]
// ************************************************************
// 
// See below for how window.arrayOfPins keeps array of data in core
//
// ************************************************************
// Use of WINDOW to persist functions and variables after load
// ************************************************************
// Generically window.foo = function(..){...}; makes function foo available
// even after the script has finished. (Script dissapears after finishing.)
// The functions we need to preserve are related to pins and clicking.
// Variables:
//   dayBeingDisplayed   ... integer day count
//   arrayOfPins         ... working data 
//   station             ... short name of curent station 
//   stationIndex        ... index to stations array
//   displayedPins       ... indexes of pins on display today
// ************************************************************


// -------------------------------------------------
window.ToDays = function(SomeDate){
// Return a rounded date in days since 1 Jan 1970
// -------------------------------------------------
   return Math.round(SomeDate.valueOf()/86400000);
}

// -------------------------------------------------
window.ComparePins = function(P1,P2){
// Used to sort the array of pins
// -------------------------------------------------
  return P1[0] > P2[0];  // [T] does this work for all strings?
}  

// -------------------------------------------------
window.SavePins = function(){
// Pack the array of pins back into local storage
// -------------------------------------------------
  SaveTwoDimArray('PINS',window.arrayOfPins);
  //LogArray2('SavePins',window.arrayOfPins);
}
  
// -------------------------------------------------
window.WeedOldPins = function(){
// Remove pins we haven't used for a month
// -------------------------------------------------
  var recArray;
  var weededCount = 0;
  var oneMonthAgo = ToDays(new Date())-31;
  for(var i=window.arrayOfPins.length-1;i>=0;i--){
    if(window.arrayOfPins[i][5] < oneMonthAgo){
      window.arrayOfPins.splice(i,1);
      weededCount++;
    }
  }
  return weededCount;
}


// -------------------------------------------------
window.ClearAllPins=function(){
// Blunt instrument!
// NB Use AFTER LoadPins()
// -------------------------------------------------
  window.arrayOfPins = new Array();
  SavePins();
}  

  
// -------------------------------------------------
window.LoadPins = function(Station){
// Get the list of pins from local storage
// return two-dimensional array
// -------------------------------------------------
  window.station = Station;
  window.arrayOfPins = LoadTwoDimArray('PINS','');
  //GM_log('Sort @ 373');
  //window.arrayOfPins.sort(window.ComparePins);   // double check - should never be needed
  
  //GM_log('COMPARE 0,1'+ComparePins(window.arrayOfPins[0],window.arrayOfPins[1]));
  //GM_log('COMPARE 1,0'+ComparePins(window.arrayOfPins[1],window.arrayOfPins[0]));
  
  
  
}
  
// --------------------------------------------------------
window.GetPinIndex = function(Title,SubTitle,Day,Time,Station){
// Look through array of pins to see if we can find a matching programme
// Return index or -1 if not found
// Station must always match
// --------------------------------------------------------
// Match procedure
// 1. Find title - not found = quit
// 2. Get the pin colour...
//    R : Time must match
//    B : If subtitle is specified in pin record then it must match
//        with the test value
//    Y : The date and time must match
// --------------------------------------------------------
  //GM_log('[327] '+ Title +' '+SubTitle+' '+Day+' '+Time);
   
  var pTitle,pColour,pai;
  var index = -1;  // return value (-1...not found)
  for(var i=0;i<window.arrayOfPins.length;i++){
    pTitle = window.arrayOfPins[i][0];
    //GM_log('[362] ['+i+']('+ Title +')('+pTitle+')');
    if(Title < pTitle){break;}  // 'cos array is sorted we must be past any match
    if((Title == pTitle)&&(Station==window.arrayOfPins[i][6])){
      
      pColour = window.arrayOfPins[i][4];
      //GM_log('****** Title match '+ window.arrayOfPins[i][0]+ '(Colour='+pColour+')');
      if((pColour=='red')&&(Time==window.arrayOfPins[i][3])){
        index=i;
        break;
      }
      if(pColour=='blue'){
        if((SubTitle=='')||(SubTitle==window.arrayOfPins[i][1])){
          index=i;
          break;
        }
      }
      if(pColour=='yellow'){
        //LogArray('YELLOW', new Array(Day,window.arrayOfPins[i][2],Time,window.arrayOfPins[i][3]));
      
        if((Day==window.arrayOfPins[i][2])&&(Time==window.arrayOfPins[i][3])){
          index=i;
          break;
        }
      }
    }    
  }
  return index;  
}


// --------------------------------------------------------
window.AddPin = function(Title,SubTitle,Day,Time,Colour,Station){
// Add (then sort) pin into array.  Automatically save.
// --------------------------------------------------------
  // possibly get rid of existing
  var pix = GetPinIndex(Title,SubTitle,Day,Time,Station);
  if(pix>=0){DeletePin(pix);}
  if(Colour != 'none'){
    // Now do the add-in
    // hacking the subtitle to remove "...Episode X" which seems to follow a comma
    var s = SubTitle;
    if(s.length>2){
      var sa=s.split(',');
      s = sa[0];
    }      
    var i = window.arrayOfPins.length;
    var d = ToDays(new Date());
    var a = new Array(Title,s,Day,Time,Colour,d,Station);
    window.arrayOfPins[i] = a;
    GM_log('Sort @ 439');
    window.arrayOfPins.sort(ComparePins);   // double check - should never be needed
  }  
  SavePins();
}

// --------------------------------------------------------
window.DeletePin = function(Index){
// Remove the indexed pin. 
// Leave saving to caller.  ie do not automatically save.
// --------------------------------------------------------
  window.arrayOfPins.splice(Index,1);
  //SavePins();
}  

// --------------------------------------------------------
window.UsePin = function(Index){
// Mark this item as being used today
// --------------------------------------------------------
  window.arrayOfPins[Index][5] = ToDays(new Date());
}  

// --------------------------------------------------------
window.GetRowBits = function(RowElement){
// Get data from the row into an array
// [0] pin class  [1] start time  [2] title   [3] sub-title
// --------------------------------------------------------
  var pinState = RowElement.childNodes[0].className;
  var start    = RowElement.childNodes[2].textContent;
  var c3       = RowElement.childNodes[3];
  var title    = c3.childNodes[0].textContent;
  var subTitle = c3.childNodes[2].textContent;
  return Array(pinState,start,title,subTitle);
}

// ----------------------------------------
window.NextPinColour = function(ColourOrStyle){
// Cycle pin colour red->blue-yellow->none
// ColourOrStyle can be "pin-foo" or just "foo"
// Always returns just the colour
// ----------------------------------------
  var rv = 'red';
  var s = ColourOrStyle.slice(ColourOrStyle.length-3);
  switch(s){
  case 'one' : rv = 'red';break;
  case 'red' : rv = 'blue';break;
  case 'lue' : rv = 'yellow';break;
  case 'low' : rv = 'none';break;
  }  
  return rv;
}  



// ============================================================
// INITIALISATION
// ============================================================
var dayNamesStr = 'Sun.Mon.Tue.Wed.Thu.Fri.Sat';
var dayNamesArray = dayNamesStr.split('.');
var elmts,elmt,el,e;   // general purpose element placeholders
var children, child;

// Array of basic station settings
// ------------------------------------
//  0 button label
//  1 visible         1/0
//  2 location url
//  3 name
//  4 colour1(head)   hex
//  5 color2(stripe)  hex
var defaultStationsStr=''
defaultStationsStr += 'R1¬1¬www.bbc.co.uk/radio1/programmes/schedules¬BBC radio 1¬#f307ae¬#ffaaff\n';
defaultStationsStr += '1X¬1¬www.bbc.co.uk/1xtra/programmes/schedules¬BBC 1 extra¬#000000¬#c0c0c0\n';
defaultStationsStr += 'R2¬1¬www.bbc.co.uk/radio2/programmes/schedules¬BBC radio 2¬#e86704¬#ffdea9\n';
defaultStationsStr += 'R3¬1¬www.bbc.co.uk/radio3/programmes/schedules¬BBC radio 3¬#cf1f2c¬#ffc2cf\n';
defaultStationsStr += 'R4¬1¬www.bbc.co.uk/radio4/programmes/schedules/fm¬BBC radio 4 FM¬#032f88¬#a6d2ff\n';
defaultStationsStr += '5L¬1¬www.bbc.co.uk/fivelive/programmes/schedules¬BBC 5 live¬#00b6de¬#a3ffff\n';
defaultStationsStr += '5S¬1¬www.bbc.co.uk/5livesportsextra/schedule¬BBC 5 live sports extra¬#528e20¬#c9ff97\n';
defaultStationsStr += '6M¬1¬www.bbc.co.uk/6music/programmes/schedules¬BBC 6 music¬#498084¬#ace3e7\n';
defaultStationsStr += 'R7¬1¬www.bbc.co.uk/radio7/programmes/schedules¬BBC radio 7¬#ffb700¬#ffffa3\n';
defaultStationsStr += 'AN¬1¬www.bbc.co.uk/asiannetwork/programmes/schedules¬BBC asian network¬#e2007a¬#fff6ff\n';
defaultStationsStr += 'WS¬1¬www.bbc.co.uk/worldservice/programmes/schedules¬BBC world service¬#528e20¬#c9ff97';

//   SaveTwoDimArray('STATIONS',new Array());  //ENABLE THIS LINE TO RESET STATIONS TO DEFAULT
var stations = LoadTwoDimArray('STATIONS',defaultStationsStr);
//GM_log('station count: '+stations.length);
// What station are we looking at?
// -------------------------------
var stationName = '';   // What's the pretty name of the station?  eg "Radio 4"
var station;            // What is it in the URL                   eg "radio4"
var isR4=false;
var isR7=false;
var a = window.location.href.split('/');
var station = a[3];
var slashStationSlash = '/'+station+'/';
slashStationSlash = slashStationSlash.toLowerCase();
window.stationIndex = -1;    // pointer to stations[]
//GM_log('station: '+slashStationSlash);
for(var i=0;i<stations.length;i++){
  var s = stations[i][2].toLowerCase();
  //  GM_log('s:('+s+')');
  if(s.indexOf(slashStationSlash)>0){
    window.stationIndex=i;
    break;
  }
}  
//if(window.stationIndex<0)...err
stationName = stations[window.stationIndex][3];
//GM_log('stationIndex: '+stationIndex+'  Name: '+stationName);
// some useful flags
isR4 = (window.stationIndex==4);
isR7 = (window.stationIndex==8);


//LoadPins(station);  // get pins data from local storage
//window.arrayOfPins=new Array();
//SavePins();
LoadPins(station);  // get pins data from local storage
LogArray2('Pins',window.arrayOfPins);

 

//  ################################################################################################
//    ####    ####   #####    ####   #####   ######          ######   ####   #####  
//   ##      ##  ##  ##  ##  ##  ##  ##  ##  ##                ##    ##  ##  ##  ## 
//    ####   ##      #####   ######  #####   ####              ##    ##  ##  #####  
//       ##  ##  ##  ##  ##  ##  ##  ##      ##                ##    ##  ##  ##     
//    ####    ####   ##  ##  ##  ##  ##      ######            ##     ####   ##     
//  ################################################################################################



// --- full date as title ---
elmt = document.getElementById('blq-content');  // div
el = GetFirstMatchingElement("//span[@class='date']",elmt);
//LogElement('EL 1 :',el);
// if(!el)...
var mainDateStr = el.textContent;                       // string
var mainDateDate = new Date(mainDateStr);               // date obj
window.dayBeingDisplayed = ToDays(mainDateDate);           // day count

var topButsArray = new Array(10);   // each (href,text)
var noTopButs = 0;
elmts = document.evaluate("//div[@id='blq-local-nav']/ul//a|//div[@class='nav_content cm']//ul//a|//div[@id='navigation']/ul//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < elmts.snapshotLength; i++){
  el = elmts.snapshotItem(i);
  topButsArray[i] = new Array(el.pathname,el.textContent);  
  //GM_log('TBA: '+topButsArray[i][1]+'='+topButsArray[i][0]);
  noTopButs = i;
}  

// --- R4 weekly schedule ---
// --- R4 Long wave schedule ---
var pathWeekScheduleStr;
if(isR4==true){
  elmt = document.getElementById('sch');  // div
  el = elmt.childNodes[1]; // p
  e = el.childNodes[1]; // a
  pathWeekScheduleStr = e.pathname;
  //GM_log('WEEK SCHED: '+pathWeekScheduleStr);
  elmt = document.getElementById('variations');
  var pathLongWaveStr = elmt.childNodes[1].pathname;
  //GM_log('LW: '+pathLongWaveStr);
}


// --- i-player listen live ---
var listenLiveStr = '';
var el = GetFirstMatchingElement("//a [@class='iplayer-console']",document);
if(el != undefined){
  listenLiveStr = el.pathname;
}  
//GM_log('IPLAYER: '+listenLiveStr);

// --- time of current programme start ---
var currentStartTimeStr;
if(isR4==true){
  elmt = document.getElementById('now-service-details');  // div
  var currentStartTimeStr = elmt.childNodes[3].firstChild.textContent;
}  
if(isR7==true){
  elmt = document.getElementById('on-air-now');  // div
  s  = elmt.childNodes[1].childNodes[5].firstChild.textContent;
  currentStartTimeStr = s.slice(0,5);
}  
//GM_log('CURRENT START: '+currentStartTimeStr);


//  ################################################################################################
//    ####    ####   #####    ####   #####   ######           ####    ####   ##  ##  ######  #####   ##  ##  ##      ###### 
//   ##      ##  ##  ##  ##  ##  ##  ##  ##  ##              ##      ##  ##  ##  ##  ##      ##  ##  ##  ##  ##      ##     
//    ####   ##      #####   ######  #####   ####             ####   ##      ######  ####    ##  ##  ##  ##  ##      ####   
//       ##  ##  ##  ##  ##  ##  ##  ##      ##                  ##  ##  ##  ##  ##  ##      ##  ##  ##  ##  ##      ##     
//    ####    ####   ##  ##  ##  ##  ##      ######           ####    ####   ##  ##  ######  #####    ####   ######  ###### 
//  ################################################################################################
// --- programme episodes ---
//  OL.episodes
//     LI.clearfix
//     1  DIV.position
//        1  DIV.time
//           1 SPAN.starttime     (.textContent -> progStartTime)
//     3  DIV.episode
//        1  DIV.summary
//           1  A.url             (.pathname -> progWebPageStr)
//              1  SPAN.title     (.textContent -> progTitleStr)
//              4  SPAN.subtitle  (.textContent -> progSubTitleStr)
//        3  DIV.availability                                        NB Availability may be missing (description->childNode[3])
//           1  A.aod-link        (.pathname -> progListAgainStr)    
//              0  SPAN.time-remaining
//                 0  SPAN.tn     (.textContent -> daysLeft )
//        5  DIV.description      (.textContent -> progDescStr)      

var progStartTimeStr,progWebPageStr,progTitleStr,progSubTitleStr,progListAgainStr,progDescStr;
// Find the OL
el = GetFirstMatchingElement("//ol [@class='episodes']",document);
// if (el)...
// Get all the appropriate LIs
elmts = GetAllMatchingElements("//li [@class='clearfix']",el);
//if(elmts)...
var progCount = elmts.snapshotLength;
//GM_log('PROGCOUNT: '+progCount);
var starts = new Array(progCount);             
var webs = new Array(progCount);
var titles = new Array(progCount);
var subTitles = new Array(progCount);
var listenAgains = new Array(progCount);
var timeLefts = new Array(progCount);
var descriptions = new Array(progCount);
for (var i = 0; i < elmts.snapshotLength; i++){
  elmt = elmts.snapshotItem(i);
  
  //             li   position       time          starttime 
  starts[i] = elmt.childNodes[1].childNodes[1].childNodes[1].textContent;
  //GM_log('START TIME: '+startTimeStr);
  
  el = elmt.childNodes[3];  // DIV.episode
  //GM_log('EPISODE: '+ el.localName + '.' + el.className);
  
  e  = el.childNodes[1].childNodes[1];    // a.url
  //GM_log('URL: '+ e.localName + '.' + e.className);
  webs[i]   = e.pathname;
  titles[i] = e.childNodes[1].textContent;
  // we may be missing sub title
  if(e.childNodes.length>4){
    subTitles[i]  = e.childNodes[4].textContent;
  }else{
    subTitles[i]  = '';
  }    
  // we may be missing listen again
  if(el.childNodes.length>5){
    listenAgains[i] = el.childNodes[3].childNodes[1].pathname;
    timeLefts[i]     = el.childNodes[3].childNodes[1].firstChild.firstChild.textContent;
    descriptions[i] = el.childNodes[5].textContent;
  }else{
    listenAgains[i] = '';
    timeLefts[i]  = 0;      // n/a
    descriptions[i] = el.childNodes[3].textContent;
  }
  //GM_log('PROG: '+titles[i]+' LAG:'+listenAgains[i]);
}  

// (a) TODO Check we were able to read it all.  If not message and quit.




//  ################################################################################################
//   #####   ######  #####   ##  ##  ######  ##      #####           ######   ####   #####  
//   ##  ##  ##      ##  ##  ##  ##    ##    ##      ##  ##            ##    ##  ##  ##  ## 
//   #####   ####    #####   ##  ##    ##    ##      ##  ##            ##    ##  ##  #####  
//   ##  ##  ##      ##  ##  ##  ##    ##    ##      ##  ##            ##    ##  ##  ##     
//   ##  ##  ######  #####    ####   ######  ######  #####             ##     ####   ##     
//  ################################################################################################


// Basic navigation
// ----------------
var topButtons = '<a class="navBut2" href="/">BBC</a>';
var originalBut = '';
var t,h;
for(var i=0;i<=noTopButs;i++){
  //GM_log('TBA: '+topButsArray[i][1]+'='+topButsArray[i][0]);
  t = topButsArray[i][1];   // caption
  h = topButsArray[i][0];   // href
  if(t == 'Schedule'){
    originalBut = '\n<a class="navBut2" href="'+h+'?NOGM">Original format</a>';
  }else{  
    topButtons += '\n<a class="navBut2" href="'+h+'">'+t+'</a>';
  }  
}
if(originalBut != ''){ topButtons += originalBut;}

// Title
// -----
var title1 ='<span class="title-end">'+stationName+'</span>'+
            '<span class="title">'+mainDateStr+'</span>';
if(isR4==true){
  title1 += '<a class="navBut2" href="'+ pathLongWaveStr + '">Long wave</a>';
}  
var wsb    ='<a class="navBut2" href="'+ pathWeekScheduleStr + '">Whole week</a>';

// earlier/later navigation
// ------------------------
// R1 R2 R3 R|4 R5 R7   -7 ... -1 TODAY +1 +2 +3


// ====== Make a button to switch radio station =====
// ThisOne is true to show the current
function MakeRadioButton(Label,URL,ThisOne,Title){
  var cl = 'radio-but';
  var ti = ' title="'+Title+'"';
  if(ThisOne==true){cl='live-radio-but';ti='';} 
  return '<td><a class="'+cl+'"'+ti+' href="http://'+URL+'">'+Label+'</a></td>';
}

var radioButs = '<table class="stations" border="0"><tr>';
for(var i=0;i<stations.length;i++){
  radioButs += MakeRadioButton(stations[i][0],stations[i][2],(i==window.stationIndex),stations[i][3]);
  if((i % 6)==5){radioButs += '\n</tr><tr>\n';}
}
radioButs = radioButs + '</tr></table>';

// earlier and later days
var otherDays = '<table class="other-days" border="0"><tr>';
var cl,d,dow,isToday,URL,caption,dy;
var todayDate = new Date();
for(var i=-7;i<8;i++){
  d = new Date();
  d.setDate(mainDateDate.getDate()+i);  
  dow = dayNamesArray[d.getDay()];
  isToday=false; 
  if(d.getDate()==todayDate.getDate()){
    if(d.getMonth()==todayDate.getMonth()){
      isToday=true;
    }
  }  
  cl = 'other-day';
  if(isToday==true){cl='today';}
  if(i==0){cl = 'zero';}
  dy = d.getDate();
  if(dy<10){dy = '0'+dy;}
  URL = 'http://'+stations[window.stationIndex][2]+'/'+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+dy;
  caption = d.getDate();
  if(isToday==true){caption='Today';}
  otherDays = otherDays + '<td class="'+cl+'"><a class="'+cl+'" href="'+URL+'">'+dow+'<br>'+caption+'</a></td>';
}
otherDays = otherDays + '</tr></table>';  




//  CREATE SETTINGS MENU
var settingsMenu = '<table class="stations" border="0" id="settingsMenu">\n';
settingsMenu += '<tr><td><a href="javascript: ;" id="pinsButton" class="navBut2" title="Display all pins" >Pins</a></td></tr>\n';
settingsMenu += '<tr><td><a href="javascript: ;" id="setsButton" class="navBut2" title="Customise your personal preferences" >Settings</a></td></tr>\n';
settingsMenu += '<tr><td><a href="javascript: ;" id="helpButton" class="navBut2" title="Information" >Help</a></td></tr>\n';
settingsMenu += '</table>\n';

// put all the other navigations together
var otherNavigation = '<table class="other-navigation" border="0"><tr><td class="radio-buts">'+radioButs +'</td><td class="prev-next">'+ otherDays+'</td><td>'+settingsMenu+'</td></tr></table>';


//  ################################################################################################
//   #####   ######  #####   ##  ##  ######  ##      #####            ####    ####   ##  ##  ######  #####   ##  ##  ##      ###### 
//   ##  ##  ##      ##  ##  ##  ##    ##    ##      ##  ##          ##      ##  ##  ##  ##  ##      ##  ##  ##  ##  ##      ##     
//   #####   ####    #####   ##  ##    ##    ##      ##  ##           ####   ##      ######  ####    ##  ##  ##  ##  ##      ####   
//   ##  ##  ##      ##  ##  ##  ##    ##    ##      ##  ##              ##  ##  ##  ##  ##  ##      ##  ##  ##  ##  ##      ##     
//   ##  ##  ######  #####    ####   ######  ######  #####            ####    ####   ##  ##  ######  #####    ####   ######  ###### 
//  ################################################################################################
// PIN | LISTEN-AGAIN | START | TITLE+SUBTITLE+(nl)DESC
var tblTop = '\n<table class="schedule" border=0>';
var tblRows = '';
var tblBot = '</table>\n';
var pinTd,pinColour,pix,lag,start,titleAnchor,subTitle,subTitleSpan,description,startStyle;;
var inThePast = true; // TODO true for future DAYS
for (var i = 0; i < progCount; i++){
  // Insert a break line at 09:00,13:00,18:00 and 00:00
  // --------------------------------------------------
  if(i>3){  // don't put a midnight break at the top
    s = "_09:00_13:00_18:00_00:00_";
    if(s.indexOf(starts[i])>0){
      tblRows = tblRows + '\n<tr class="breakRow"><td colspan="4"> </td></tr>\n';
    }
  }    
 
  // Pin   - Done at the end of the row
  
  
  // What's the listening status of this?
  // ---------------------------------------------
  // TODO Make the icon smaller when less time left to lag
  lag = '<td> </td>';// we may be live, have l-a-g or nothing
  if(listenAgains[i] != ''){
    lag = '<td class="listenAgain"><a class="listenAgain" href="'+listenAgains[i]+'" title="'+timeLefts[i]+' days left" target="_blank">A</a></td>';
  }
  if(starts[i]==currentStartTimeStr){
    lag = '<td class="listenNow" ><a class="listenNow" title="NOW PLAYING" href="'+listenLiveStr+'" target="_blank">N</a></td>';
    inThePast = false;  // TODO Disable for past DAYS
  }  
  
  
  // ---------------------------------------------
  // Change colour for starts in the past
  if(inThePast==true){startStyle = 'start-past';}else{startStyle = 'start-future';}
  start = '<td class="'+startStyle+'">'+starts[i]+'</td>'; 
    
  // Title
  // ---------------------------------------------
  title = titles[i];
  titleAnchor = '<a class="progTitle" href="'+webs[i]+'">'+title+'</a>';
  
  // Sub-title
  // ---------------------------------------------
  // The subtitle is often just a date which is confusing and serves no purpose
  // So weed it out
  subTitle = subTitles[i];
  //if(subTitle==undefined){subTitle='';}
  if(subTitle.indexOf('/20')>0){subTitle = '';}
  subTitleSpan = '<span class="progSubTitle">'+ subTitle +'</span>';
  
  // Description
  // ---------------------------------------------
  description = '<span class="progDesc">'+descriptions[i]+'</span>';
  
  
  
  // Pin   - Do we want to flag this programme? 
  // ---------------------------------------------
  pix = GetPinIndex(title,subTitle,window.dayBeingDisplayed,starts[i],window.stationIndex);
  if(pix<0){
    pinColour = 'none';
  }else{
    pinColour = window.arrayOfPins[pix][4];
  }    
  pinTd = '<td class="pin-'+pinColour+'" id="pix-'+pix+'"> </td>';
  
  // put whole row together
  tblRows = tblRows +
    '\n<tr class="progRow">'+
    pinTd + lag + start  + '<td>' + titleAnchor + ' ' + subTitleSpan + description + '</td>' +
    '</tr>\n';
}


//  ################################################################################################
// HIDDEN DIVS of PINS,SETTINGS and HELP
//  ################################################################################################

// get started
window.pinsDiv = '<div class="setP" id="pinsDiv">\n<div class="setT">\n';
window.setsDiv = '<div class="setS" id="setsDiv">\n<div class="setT">\n';
window.helpDiv = '<div class="setH" id="helpDiv">\n<div class="setT">\n';
// title
window.pinsDiv += 'Pins</div>\n'
window.setsDiv += 'Personal preferences</div>\n'
window.helpDiv += 'Information</div>\n'
// bodies

// pins body
window.pinsDiv += 'Not sure what goes here yet.  Probably todays pins in a compact row with an option to show all pins';

// settings body
window.setsDiv += 'Not sure what goes here yet.  Probably a list of radio stations with opportunity to remove them from the buttons and to add others';


// help body
window.helpDiv += '<ul>'+
                  '<li>This version was released on '+window.versionDate + '<a class="navBut2" target="_blank" href="http://vulpeculox.net/radio">Check for later versions</a>' +
                  '<li><table border=1><tr><th colspan=4>Coloured pins</th></tr>\n'+
                  '<tr><td> </td><td>Meaning</td><td>example use</td><td>Quick click</td></tr>\n'+
                  '<tr><td>RED</td><td>Series at a specified time</td><td>The archers at 19:00</td><td>Left margin</td></tr>\n'+
                  '<tr><td>BLUE</td><td>Series at any time.  Must match sub-title if one is given.</td><td>Book of the week picks just one book.</td><td>Sub-title</td></tr>\n'+
                  '<tr><td>YELLOW</td><td>Selected programme only.</td><td>A specific play</td><td>Start time</td></tr>\n'+
                  '<tr><td colspan=4>Clicking on a pin changes its colour or removes it</td></tr>\n'+
                  '</table>\n'+
                  '<li>Pins are automatically deleted if they are not used for a month.\n'+
                  '<li>All pins and settings are stored on your computer.  Nothing is sent away.\n'+
                  '<li>Please send feedback to <a class="navBut2" href="mailto:radio@PeterFox.ukfsn.org">radio@PeterFox.ukfsn.org</a>\n'+
                  '</ul>\n'+                  
                  'The program was written by Peter Fox of Witham, England who is often looking for interesting programming jobs and has a <a class="navBut2" target="_blank" href="http://vulpeculox.net">website</a> packed with miscellany.\n';

// finish

window.pinsDiv += '<p><span>Click on the Pins button again to close this panel</span></div>\n';
window.setsDiv += '<p><span>Click on the Settings button again to close this panel</span></div>\n';
window.helpDiv += '<p><span>Click on the Help button again to close this panel</span></div>\n';

var allHidingDivs = '<div class="hidingDiv" id="hiding" style="visibility:hidden;height:1px">\nNOT VISIBLE\n</div>\n';

// ----------------------------------------
window.HandleSettingsClick = function(event){
// Persistent click capture for settings menu button click
// Drops down the appropriate hidden panel
// ----------------------------------------
  var bu = event.target;
  var id = bu.id;
  var buFunction = id.slice(0,4);   // "pins", "sets" or "help"     
  var hidingDiv  = document.getElementById('hiding');
  var visibility = hidingDiv.style.visibility;
  var isVisible = (visibility == 'visible');
  if(isVisible && (buFunction==window.showingSetting)){
    HideElement(hidingDiv);
    window.showingSetting = 'none';
  }else{
    switch(buFunction){
    case 'pins' : hidingDiv.innerHTML = window.pinsDiv;break; 
    case 'sets' : hidingDiv.innerHTML = window.setsDiv;break; 
    case 'help' : hidingDiv.innerHTML = window.helpDiv;break; 
    }    
    hidingDiv.style.visibility='visible';
    hidingDiv.style.height = "";
    window.showingSetting = buFunction;
  }  
}

window.HideElement = function(Element){
  Element.style.visibility='hidden';
  Element.innerHTML = '';
  Element.style.height = "1px";
}

  
 
//  ################################################################################################
//    ####   ##      ######   ####   #####            ####   #####   ######   ####   ######  ##  ##   ####   ##     
//   ##  ##  ##      ##      ##  ##  ##  ##          ##  ##  ##  ##    ##    ##        ##    ### ##  ##  ##  ##     
//   ##      ##      ####    ######  #####           ##  ##  #####     ##    ## ###    ##    ## ###  ######  ##     
//   ##  ##  ##      ##      ##  ##  ##  ##          ##  ##  ##  ##    ##    ##  ##    ##    ##  ##  ##  ##  ##     
//    ####   ######  ######  ##  ##  ##  ##           ####   ##  ##  ######   ####   ######  ##  ##  ##  ##  ###### 
//  ################################################################################################

// Replace all the original text
document.body.innerHTML = '<body>'+
  '\n<div id="top-nav" class="top-nav">TOP NAVIGATION\n</div>'+
  '\n<div id="title" class="title">TITLE\n</div>'+
  '\n<div id="prev-next-nav" class="prev-next-nav">PREVIOUS AND NEXT NAVIGATION\n</div>'+
  '\n' + allHidingDivs +
  '\n<div id="programmes" class="programmes">PROGRAMMES\n</div>'+
  '\n</body>';

// Remove all the existing styles and scripts
var head = document.getElementsByTagName('head')[0];
head.innerHTML = '<title>BBC Radio 4 schedule</title>';

//  #################################################
//    ####   ##  ##  ######  #####   ##  ##  ######
//   ##  ##  ##  ##    ##    ##  ##  ##  ##    ##  
//   ##  ##  ##  ##    ##    #####   ##  ##    ##  
//   ##  ##  ##  ##    ##    ##      ##  ##    ##  
//    ####    ####     ##    ##       ####     ##  
//  #################################################
  
// rebuild the components
// ----------------------
document.getElementById('top-nav').innerHTML = topButtons;
document.getElementById('title').innerHTML = title1;
document.getElementById('prev-next-nav').innerHTML = otherNavigation;
document.getElementById('programmes').innerHTML = tblTop + tblRows + tblBot;


//  ################################################################################################
//   ##       ####    ####   #####           ######  ##   ##   ####    ####   ######   ####  
//   ##      ##  ##  ##  ##  ##  ##            ##    ### ###  ##  ##  ##      ##      ##     
//   ##      ##  ##  ######  ##  ##            ##    ## # ##  ######  ## ###  ####     ####  
//   ##      ##  ##  ##  ##  ##  ##            ##    ##   ##  ##  ##  ##  ##  ##          ## 
//   ######   ####   ##  ##  #####           ######  ##   ##  ##  ##   ####   ######   ####  
//  ################################################################################################
pinNoneImg    = "data:image/gif,GIF89a%0C%00%1A%00%F7%00%00!%08%08!!!1%08%081))1119%08%089))911999BBBJ%10%10J%18%18J))JJJR%10%10RJJRRRZ%10%10ZBBZZZc%10%10cJBcZZccckkks%10%10s%18%18%7B%18%18%7BJ9%7BR9%7B%7B%7B%84%18%18%84%84%84%8C%18%18%8C%84%84%8C%8C%8C%94%94%94%9C!!%A5!!%A5%A5%A5%AD!!%AD%AD%AD%B5!!%B5%B5%B5%BD))%BD%BD%BD%C6%C6%C6%CE))%CEJB%CE%CE%CE%D6%D6%D6%E7))%E7cR%E7%E7%E7%EF11%EF%EF%EF%F711%F7%F7%F7%FF11%FF99%FFB9%FFRB%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%3E%00%2C%00%00%00%00%0C%00%1A%00%00%08%1F%00%7D%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%18%19%06%04%00%3B";
pinRedImg     = "data:image/gif,GIF89a%0C%00%1A%00%F7%00%00!%08%08!!!1%08%081))1119%08%089))911999BBBJ%10%10J%18%18J))JJJR%10%10RJJRRRZ%10%10ZBBZZZc%10%10cJBcZZccckkks%10%10s%18%18%7B%18%18%7BJ9%7BR9%7B%7B%7B%84%18%18%84%84%84%8C%18%18%8C%84%84%8C%8C%8C%94%94%94%9C!!%A5!!%A5%A5%A5%AD!!%AD%AD%AD%B5!!%B5%B5%B5%BD))%BD%BD%BD%C6%C6%C6%CE))%CEJB%CE%CE%CE%D6%D6%D6%E7))%E7cR%E7%E7%E7%EF11%EF%EF%EF%F711%F7%F7%F7%FF11%FF99%FFB9%FFRB%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%3E%00%2C%00%00%00%00%0C%00%1A%00%00%08%B4%00%7D%08%1CH%B0%A0%C1%83%08%0B%D6%B8%91PB%87%0E%15%3C%C8(%D8B%80%0D%1E%3Dhp%B0%C0P%E0%09%0A%0EL%D8%D0%C1%03%C6%03%82%06(l%88%10!%C4%87%03%03khx%A1%C1%C1%86%0D%05F%0C%04%F1B%87%0E%1C*%0C%B4%18%B8%82%C1%0E%9F%3AP%90%18(BC%08%A4%3A%1Ct%F41%81%05%85%91%3Af%C0%1C%18cA%09%05%1FPDp0%94(%80%10%25B%98%88%10%83%E0%09%10%24%024%C0Pv%E0%85%14)%12%20L%D0bB%8A%832%FC%EA%3DHb%84_%84%13N%0C6%98%23%C1%E1%83.%26%2C6%08%22%C1_%84%10%26%1B%24P%F7%60%40%00%00%3B";
pinBlueImg    = "data:image/gif,GIF89a%0C%00%1A%00%F7%00%00%08%18!%08)1%08)9%109J%10BR%10JZ%10Jc%10Rc%10Zs%18BJ%18BR%18Zs%18c%7B%18k%8C%18s%8C!!!!%7B%9C!%84%A5!%84%AD!%8C%AD!%8C%B5)11)19)9B)BJ)%94%BD)%A5%CE)%B5%E71111191c%7B1%BD%EF1%BD%F71%C6%FF1%CE%FF9999c%7B9%C6%FF9%CE%FFBBBBRZBRcB%9C%CEB%C6%FFJJJJRRRRRR%B5%E7ZZZZccccckkk%7B%7B%7B%84%84%84%84%8C%8C%8C%8C%8C%94%94%94%A5%A5%A5%AD%AD%AD%B5%B5%B5%BD%BD%BD%C6%C6%C6%CE%CE%CE%D6%D6%D6%E7%E7%E7%EF%EF%EF%F7%F7%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00C%00%2C%00%00%00%00%0C%00%1A%00%00%08%B4%00%87%08%1CH%B0%A0%C1%83%08%0B%02%09%92%10%05%09%12)h%FC(%C8%23%C0%87%12%2B%5E%90%88%C1P%60%8E%03%04%22%7C%08QBE%0B%82%16%0E0(P%A0A%83%0B%03%81%2C%D0%B0%80%00%03%06%02n%0C%AC%A1!D%08%10%14%2C%F0%18%B8%03C%09%9F!%24%E0%18hcA%03%A4!%14t%1C%02%23%83%81%91!6t%20%E8%23%01%84%01%0D%24%14%200%94(%80%06%10%1CD(%E0%83%60%8E%1A8%1E%B0%98Qv%A0%0C%1D%3AN%20%3C%C1%03%86%8E%83%3F%FC%EA%3D%88%E3%86_%840r%0C6(%E4%C4%E1%83%3D%60%2C6X%E3%C4_%84.%26%1B%E4P%F7%60%40%00%00%3B";
pinYellowImg  = "data:image/gif,GIF89a%0C%00%1A%00%F7%00%00!!%08!!!)1%0811)11119%0899)991999BBBJJ%10JJ%18JJ)JJJJR%10RR%10RR%18RRJRRRRZBZZ%10ZZZZc%10cZBcc%10ccZccckkkks%10ks%18s%7B%18%7Bk9%7Bs9%7B%7B%7B%84%84%18%84%84%84%84%8C%18%8C%8C%18%8C%8C%84%8C%8C%8C%94%94%94%94%9C!%9C%A5!%A5%A5%A5%A5%AD!%AD%AD%AD%AD%B5!%B5%B5%B5%B5%BD)%BD%BD%BD%C6%C6B%C6%C6%C6%C6%CE)%CE%CE%CE%D6%D6%D6%D6%E7)%DE%D6R%E7%E7%E7%E7%EF1%E7%F71%EF%EF%EF%EF%FF1%F7%F7B%F7%F7%F7%F7%FF1%F7%FF9%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00B%00%2C%00%00%00%00%0C%00%1A%00%00%08%B2%00%85%08%1CH%B0%A0%C1%83%08%0B%E6%E0%91p%C2%87%0F%17B%D8(%18C%80%8E%20%3Ep%80%C8%C0P%E0%0A%0B%0ET%E8%E8%11DF%04%82%060x%A0%40%81%84%88%03%03st%A0%D1%E1%81%07%0F%05N%0C%1CA%A3G%8F%1D.%0C%C4%18%F8%82%81O%9F%2CP%0C4%D1%81%C4%D1%1E%10%3A%0A%A9%00%C3%C2%C8%1E7%60%0E%AC%B1%20%85%02%11%2C(%3C%18J%14%00%89%14%25TP%A8Ap%C5%08%14%01%1Al%20%3BPC%8B%16%09%10%26%88Q%A1%C5A%1B%7D%F3%1EDq%A2%2F%C2%0A%2B%04%1B%FC%91%C0%F0%C1%19%15%14%1B%1C%91%C0%2FB%09%92%0D%12%A0%7B0%20%00%3B";
headphonesImg =  "data:image/gif,GIF89a%1E%00%1A%00%F7%00%00%00c%AD%00c%B5%00k%B5%00k%C6%00s%C6%08s%C6%101J%109R%10s%C6%10%7B%C6%181B%181J%189J%18%7B%C6%18%7B%CE%18%84%CE!9J!9R!BR!%84%CE)BR)BZ)%84%CE)%84%D6)%8C%D61JZ1%8C%CE1%94%D69Jc9Rc9%94%CEBRcBZkB%94%D6B%9C%DEJcsJ%94%D6J%9C%E7J%A5%E7RcsRk%7BR%A5%E7R%AD%EFZk%7BZ%A5%D6Z%AD%E7Z%AD%EFc%A5%DEc%AD%EFc%B5%EFk%7B%8Ck%8C%A5k%AD%DEk%B5%F7s%84%8Cs%9C%B5s%AD%DEs%BD%F7%7B%B5%DE%84%8C%9C%84%94%9C%84%BD%E7%8C%94%A5%8C%9C%A5%8C%BD%E7%94%9C%AD%94%A5%AD%94%C6%E7%9C%A5%AD%9C%AD%B5%9C%C6%E7%A5%AD%B5%A5%C6%E7%AD%B5%BD%B5%BD%C6%B5%D6%EF%BD%C6%C6%BD%C6%CE%BD%D6%EF%C6%CE%CE%C6%CE%D6%C6%DE%F7%CE%CE%D6%CE%D6%D6%CE%E7%F7%D6%D6%DE%D6%DE%DE%D6%E7%F7%DE%DE%E7%DE%E7%E7%DE%EF%F7%E7%E7%E7%E7%E7%EF%E7%EF%EF%E7%EF%FF%EF%EF%F7%EF%F7%F7%EF%F7%FF%F7%F7%F7%F7%F7%FF%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00e%00%2C%00%00%00%00%1E%00%1A%00%00%08%FE%00%CB%08%1CHP%A0%18%2CO%9AX%11S%B0%A1%C3%81%60%8E%AC%80%B0%40%C1%82%05%10N%10%F9%F2%F0%A1%98%20%14%14d%90AD%09%13%2262%60%E4%C1%B0%E3%40%2B%20%14%8CP%E2%90L%93%15%0A%3AHqY%06%0A%85%08Gx%96QB%01%02%93%8EV(T%B0%22T%60%16%0E%10%A08%14%D3%81B%95%A6%03%B7T%C8%D0%A5!%8F%05I%B0%12%7C%B2%C0F%C1.%11V%88-(CA%16%82D%14%3CYK%D0%CA%02%1E%04Od%A0%5B%10D%87%81d%20%C8%E0Kp%87%02%8Ee%B6%2C%F8Q%06L%94(X%A98%01S%A6%88%82%ABe%EC%CE%20!%60%80%06%AC%9C%07x%B8!%D7%E9%02%00%13R%A4%F8%DC%94%84%89%16%16%020%D8YfI%80%109r%C0%C6%EA!E%EE%12%02%90%08%B4%A0!%B7n%0B%BCK%18%F7%D0%60L%14%011%8C%B7h%80U%83%EF%DC5%04%2C1R%C0%B8n%04X-e%88%F0%DE%A0%07%10%04%DE%5B%14%C0%DA%E0z%EE%06%3A%96%08H%BF%BEi%7B%EF%05%8C%80)0%3E%B7z%F6%EE%A5%20%80%16e%E8P%40t%BAQ%D7%94%05%EE!%F0%82%40c%84%80%80o0((%94%05-%7C%A7%01e%06%BD%20%40%02%13X%C8%93%06%0D40%00%0B%88%11%A4%05%10%2C%E0%80%95%0E%2C%E8p%05A%01%01%00%3B";
animAerialImg = "data:image/gif,GIF89a(%00%26%00%D5%3E%00%00%00%00!T%7B%1Es%B4*%5C%82%2F%60%86%3Bj%8F%20s%B2%1D%95%F1%20%96%F1%24%98%F1%2B%9B%F12%9F%F24%A0%F2%3A%A2%F2f%8D%ABs%97%B2B%A6%F3F%A8%F3K%AA%F3S%AE%F4%5B%B2%F4b%B5%F5k%B9%F5s%BD%F6%7C%C1%F6%90%AC%C2%96%B2%C6%8E%C3%EB%82%C4%F7%88%C7%F7%8B%C8%F7%8D%C9%F8%94%CC%F8%98%CE%F8%9D%D1%F8%AF%C5%D6%B5%C9%D8%A3%D4%F9%A9%D6%F9%AD%D8%F9%B3%DB%FA%B9%DE%FA%BD%E0%FA%D3%DD%E5%D4%DE%E5%C3%E2%FB%C9%E5%FB%CE%E8%FB%D8%E2%E8%D8%E4%EE%D2%EA%FC%DB%ED%FC%DF%F0%FD%E3%F1%FD%EB%F5%FD%F1%F7%FB%F1%F8%FD%F7%F9%FA%F5%FA%FD%F8%FB%FE%F9%FC%FE%FE%FE%FE%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%052%00%3E%00%2C%00%00%00%00(%00%26%00%00%08%FE%00%7D%F8%E8A%B0%A0%C1%83%08%13*%14(P%A1%C3%87%0E%19%0E%84H%91%A2%C4%8A%18%232%CC%C8%F1%E0%C5%8E%20%3F%82%E4(r%24%C6%92%26-nLyr%25K%95%0D%2B%DA%00A%01%82%84%0B.2%A2TXB%C1%81%9F%40%2B%D8%A8%B8%13!%88%9F%08(p%B8%C0%E0'%04%1C0'%3At%81%E0%80%04%1A%05y%7C%F8i!*%C4%09%07%1A%40%EDq%83%07A%0F%3Fg%40%2CZ%D0%C6O%13%3Dr8%08%40%80D%8F%1D%0B%0ExX%EB2%A1%8A%9FC5%04%18%3C%E0F%0F%0B%07(%F0%8D%A9%10%C5%01%04%04%1F%0C%1E%1C%A3%07%86%03%13%16KM%D8%E2g%8D%1E%23%26%170%5B%E1%40%05%CD%0FqT%05A0%C3%60%18%3Dl%248%10%02%F5C%C4%0A%D4%C2%18L%B0t%82%A1%0F%D9%16%AC%E1SA%8B%DD%01pP%F8%F9%C1%2BD%15%B3%8F%0F%E6%D1%E0%40W%E7%10e%60%E8%81%BC%87%09%D6D%FB%40R%ECNR%3CD%F2%3A%CD%3FD%DF%92qE%F6%E1%DD%8F%E7%5D%5E%FEy%FA%E9%ED%AF%C7%DF~%F3%FC%00%1D%09%97%10%7C%D8%BD%C7_%7C%FE%DD%07%60%7D%09%3E%94%C3%0A%2C%04%A8%DEK%08%09%14%10%00%00!%F9%04%052%00%3E%00%2C%08%00%07%00%17%00%16%00%00%08%FE%00%7D%08%1C(%F0%05%08%0B%14*%600a%83%A0C%82)%22%1C%98%98%00%01%C5%0B5%1E%0E%C4Q%E1%40%02%0C.p%08%ACab%C2%01%05(4%E2%90p%C0BC%8D)%16%1C(%F1%90%C2%81%0F%02%7B%E8%DC%D9c%24%04%04*%08%8A8p!'%CF%A3%3Ej(X%20%D2%87%8E%05%0Dt%F88J%B5%A7%89%03%1E%04%96%989%95%E7%40%A4%3E%20%2C%E0%E1%A3B%02%A9%5E%1Dz%05q%C0%85%8F%05%13%BA%EA%D4%E8%F5%C5%01%10%3A%88%CA%EDIw.%8E%03%18%FEb%90%AB%D1h%CF%1DDw%20(%9A%F6%E1N%1F6%0Ep%F0%D1%40%C2%DE%BEs%5B%1C%10%E1%C3%02%82%86%8D%BF%3E%E6p%40%86%8F%147%F7%F2U%EDt%01%84%81%10%14dl%9C%D6%03W%81*%0EL%D8%D1U-%DF%16%08%22%90%1DH%9AB%D3%C2-%14(%98%F1%F0%C2%81%06%2FTr%40%A0%C0%ADF%11%0AL%3F%B4%91%40%02%F3%C2%3E%8E%05%3F%8C%EE0%20%00!%F9%04%052%00%3E%00%2C%05%00%04%00%1D%00%1C%00%00%08%FE%00%7D%08%1CH%D0E%07%0A%10%12J%B8p%02%07%C1%87%10%7D%F0(%01%C1%C2%09%1A%3C%04%DAh%D1%01%C2%85%1A%11!%CA%90%C0%C1FH%81(%22%808)%F0D%04%19%03%7B%C8%9C)S%E0%0E%0C%15t%84%3C1%C1%A1%0F%9A%40g%0A%2CAa%07D%17%12%1C%06%ED!0%A8%C0%10%17%1E%E2%88%40%E3'%CD%90W%7DX%40A%D0C%88%A65Y%5E%B5%01A%A7%0F%1C%10%8C%0Ae%09%B6%E6%07%11C%3FX%0D%CBv%AE%0F%1B%12%04R%98a%B7n%CC%9A%14%AABh%EB%F7%2FS%10%26jP%00%5B%D8%B0%0F%15%1C%5ED%5D%DBX%A8%0C%0B.0%F4%AD%5Cs%86%05%19%93%E9%16%16*%D9%C6%04%C6%8D%ED%A2%F0%E0c%F0f%BFB%3Bp%B5%F0%E25%DB%B5%12L%A6%D0l%FB%A4%D0%19%8B%25B0%99U%AC%D0%0B)%06%9A%E0%5D%3C%E2U%19%A7%09Nh%D1%96)D%A0%3EvH%80I%B0%06%04%BE%BD%E7(Z%B7%F0U%24%04%EE%D6%9D%0B%E4q%81%C3%C9%19%11J%F8%A51a%25K%1C%17%E4%B24%11%C1Ej%966d%04Q%40%00%00!%F9%04%052%00%3E%00%2C%02%00%01%00%23%00!%00%00%08%FE%00%7D%08%1CHP%A0%8D%13%25%12*L%D8%82G%C1%87%10%07%BA%10%81%02GD%1A%25D%D4%88%C8%B1F%88%17%1C%09%F2%40QbGH%82)N%10%EC%C1%B2%A5%CB%818B%D08%E9%C3%84%0C%81.%5B%E2%CC9%D0%04H%8E%25f%ECd%19R%A7%40%147!%A6Hj%F4%E4K%1F%25l%3C%AC%A1%D2GS%9AV%89%FA%00%F10%C4P%AC%05%B5%D6%40A%D0%C5%CD%AB%60w%0A%14%E1p%AD%DA%B4a%89%DA%20%EB%A3F%8A%AC%3D%E0%3E%D4*B%A0%09%93Z%F5%AE%CC%EB%23%85%D4%12o%05%0F%F6%81%83%2Cb%AB4-%3A%25%5C%82%87%89%AC!wT8%A0%80nD%ADQ%EF%06%86%08%E2%80%E9%04%92!%82%B6%A1%023%C7%0B%A6M%0B%FDL%B9%B1%EB%88'b7(J%19%EA%ED%88%1B%04%18%98M%5B%20%E2%C7%84%15%2F%F6%8D%3C%B9r%CC5Z%A3%90%3AZ%B1%D6%13%3A%18_F%AB%97%EF%C0%BE%BF%BBP%13%9E%D1b%20%8D%BB%E1%C1%1A%05%FF%3D%3Bw%9AZ%5D%B8(%A8%03%FC%7B%DA%84q%B0'(%83%EE%FD%B8%C9%81%60%12D-%B4%86%D7d%C9%85%20%15G-T%85%95V%3A%80%B0%60H3%84%90%1AV2%84%90%1DV%96%B5u%92%0E!%94%07Q%40%00%00%3B";
curY = "data:text/html;charset=utf-8,%00%00%02%00%01%00%0C%17%00%00%00%00%00%00%D4%04%00%00%16%00%00%00(%00%00%00%0C%00%00%00.%00%00%00%01%00%20%00%00%00%00%00%AC%04%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00111%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00RRR%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FFBBB%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C6%C6%C6%FFZZZ%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF%A5%A5%A5%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%94%94%94%FF%8C%8C%8C%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D6%D6%D6%FFZZZ%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FF%BD%BD%BD%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ccc%FF%AD%AD%AD%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FF%84%84%84%FF%94%94%94%FF!!!%FFJJJ%FFkkk%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FF%08!!%FF%18%8C%84%FF!%9C%94%FF%18%8C%8C%FF!%A5%9C%FF%10ZZ%FF%CE%CE%CE%FF%00%00%00%00%00%00%00%00%00%00%00%00%CE%CE%CE%FF%18JJ%FF!%9C%94%FF%10JJ%FF%18%84%84%FF!%AD%A5%FF%10ZZ%FF%10RR%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF)%BD%B5%FF%10cZ%FF1%EF%E7%FF1%FF%EF%FF1%FF%EF%FF)%E7%D6%FF199%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%8C%8C%FF%18sk%FF%18%8C%84%FF1%FF%EF%FF1%FF%EF%FF1%FF%EF%FF1%FF%EF%FF%18RR%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FF)JJ%FF1%FF%EF%FF1%FF%EF%FF1%FF%EF%FF1%FF%EF%FF!%AD%A5%FF%94%94%94%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FF)%CE%C6%FF1%FF%EF%FF1%FF%EF%FF1%F7%E7%FF!%B5%AD%FF)99%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%18sk%FF)%CE%C6%FF%18sk%FF%10RR%FF%18%7Bs%FF%18%7Bs%FF%0891%FF%8C%8C%8C%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00)99%FF%10cc%FF%18%7Bs%FF%10ZZ%FF%10ZZ%FF%18%8C%84%FF%18%84%84%FF199%FF%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FF%10cZ%FF%10RJ%FF!%A5%9C%FF1%EF%E7%FF1%FF%EF%FF9%FF%F7%FFB%C6%C6%FFJRR%FF%00%00%00%00%00%00%00%00%00%00%00%00%BD%BD%BD%FF%081)%FF1%EF%E7%FF9%FF%F7%FFB%F7%F7%FFR%D6%DE%FF9s%7B%FFZcc%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BZR%FF9k%7B%FF9k%7B%FFBZc%FF%7B%7B%7B%FF%D6%D6%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%3F%FF%FF%FF%3F%FF%FF%FF%1F%FF%FF%FF%1F%FF%FF%FF%8F%FF%FF%FF%8F%FF%FF%FF%87%FF%FF%FF%87%FF%FF%FF%C3%FF%FF%FF%C3%FF%FF%FF%C0%7F%FF%FF%C0%3F%FF%FF%80%3F%FF%FF%80%7F%FF%FF%80%7F%FF%FF%C0%3F%FF%FF%E0%1F%FF%FF%F0%0F%FF%FF%F0%0F%FF%FF%E0%0F%FF%FF%E0%1F%FF%FF%F0%3F%FF%FF%FF%FF%FF%FF";
curR = "data:text/html;charset=utf-8,%00%00%02%00%01%00%0C%17%00%00%00%00%00%00%D4%04%00%00%16%00%00%00(%00%00%00%0C%00%00%00.%00%00%00%01%00%20%00%00%00%00%00%AC%04%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00111%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00RRR%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FFBBB%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C6%C6%C6%FFZZZ%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF%A5%A5%A5%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%94%94%94%FF%8C%8C%8C%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D6%D6%D6%FFZZZ%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FF%BD%BD%BD%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ccc%FF%AD%AD%AD%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FF%84%84%84%FF%94%94%94%FF!!!%FFJJJ%FFkkk%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FF%08%08!%FF%18%18%8C%FF!!%9C%FF%18%18%8C%FF!!%A5%FF%10%10Z%FF%CE%CE%CE%FF%00%00%00%00%00%00%00%00%00%00%00%00%CE%CE%CE%FF%18%18J%FF!!%9C%FF%10%10J%FF%18%18%84%FF!!%AD%FF%10%10Z%FF%10%10R%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF))%BD%FF%10%10c%FF11%EF%FF11%FF%FF11%FF%FF))%E7%FF119%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%8C%FF%18%18s%FF%18%18%8C%FF11%FF%FF11%FF%FF11%FF%FF11%FF%FF%10%10R%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FF))J%FF99%FF%FF11%FF%FF11%FF%FF11%FF%FF!!%AD%FF%94%94%94%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FF))%CE%FF11%FF%FF11%FF%FF11%F7%FF!!%B5%FF))9%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%18%18s%FF))%CE%FF%18%18s%FF%10%10R%FF%18%18%7B%FF%18%18%7B%FF%08%089%FF%8C%8C%8C%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00))9%FF%10%10c%FF%18%18%7B%FF%10%10Z%FF%10%10Z%FF%18%18%8C%FF%18%18%84%FF119%FF%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FF%10%10c%FF%10%10R%FF!!%A5%FF11%EF%FF11%FF%FF9B%FF%FFBJ%CE%FFJJR%FF%00%00%00%00%00%00%00%00%00%00%00%00%BD%BD%BD%FF%08%081%FF11%EF%FF9B%FF%FFBR%FF%FFRc%E7%FF9J%7B%FFZZc%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBZ%FF9R%7B%FF9R%7B%FFBJc%FF%7B%7B%7B%FF%D6%D6%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E7%E7%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%3F%FF%FF%FF%3F%FF%FF%FF%1F%FF%FF%FF%1F%FF%FF%FF%8F%FF%FF%FF%8F%FF%FF%FF%87%FF%FF%FF%87%FF%FF%FF%C3%FF%FF%FF%C3%FF%FF%FF%C0%7F%FF%FF%C0%3F%FF%FF%80%3F%FF%FF%80%7F%FF%FF%80%7F%FF%FF%C0%3F%FF%FF%E0%1F%FF%FF%F0%0F%FF%FF%F0%0F%FF%FF%E0%0F%FF%FF%E0%1F%FF%FF%F0%3F%FF%FF%FB%FF%FF%FF";
curB = "data:text/html;charset=utf-8,%00%00%02%00%01%00%0C%17%00%00%00%00%00%00%D4%04%00%00%16%00%00%00(%00%00%00%0C%00%00%00.%00%00%00%01%00%20%00%00%00%00%00%AC%04%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00111%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00RRR%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FFBBB%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C6%C6%C6%FFZZZ%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF%A5%A5%A5%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%94%94%94%FF%8C%8C%8C%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D6%D6%D6%FFZZZ%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FF%BD%BD%BD%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ccc%FF%AD%AD%AD%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FF%84%84%84%FF%94%94%94%FF!!!%FFJJJ%FFkkk%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FF!%18%08%FF%8Ck%18%FF%9C%7B!%FF%8Cs%18%FF%A5%84!%FFZJ%10%FF%CE%CE%CE%FF%00%00%00%00%00%00%00%00%00%00%00%00%CE%CE%CE%FFJB%18%FF%9C%7B!%FFJ9%10%FF%8Ck%18%FF%AD%84!%FFZJ%10%FFRB%10%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF%BD%94)%FFcJ%10%FF%EF%BD1%FF%FF%C61%FF%FF%C61%FF%E7%B5)%FF911%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%8C%8C%84%FFsZ%18%FF%8Ck%18%FF%FF%C61%FF%FF%C61%FF%FF%C61%FF%FF%C61%FFRB%18%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B5%B5%B5%FFJB)%FF%FF%C69%FF%FF%C61%FF%FF%C61%FF%FF%C61%FF%AD%84!%FF%94%94%94%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FF%CE%A5)%FF%FF%C61%FF%FF%C61%FF%F7%BD1%FF%B5%8C!%FF91)%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00sZ%18%FF%CE%A5)%FFsZ%18%FFRB%10%FF%7Bc%18%FF%7Bc%18%FF9)%08%FF%8C%8C%8C%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0091)%FFcR%10%FF%7Bc%18%FFZJ%10%FFZJ%10%FF%8Ck%18%FF%8Ck%18%FFB9)%FF%00%00%00%00%00%00%00%00%00%00%00%00%A5%A5%A5%FFcR%10%FFRB%10%FF%A5%84!%FF%EF%BD1%FF%FF%C61%FF%FF%C69%FF%CE%9CB%FFRRJ%FF%00%00%00%00%00%00%00%00%00%00%00%00%BD%BD%BD%FF1)%08%FF%EF%BD1%FF%FF%C69%FF%FF%C6B%FF%E7%B5R%FF%7Bc9%FFccZ%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZRB%FF%7Bc9%FF%7Bc9%FFcRB%FF%7B%7B%7B%FF%D6%D6%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%3F%FF%FF%FF%3F%FF%FF%FF%1F%FF%FF%FF%1F%FF%FF%FF%8F%FF%FF%FF%8F%FF%FF%FF%87%FF%FF%FF%87%FF%FF%FF%C3%FF%FF%FF%C3%FF%FF%FF%C0%7F%FF%FF%C0%3F%FF%FF%80%3F%FF%FF%80%7F%FF%FF%80%7F%FF%FF%C0%3F%FF%FF%E0%1F%FF%FF%F0%0F%FF%FF%F0%0F%FF%FF%E0%0F%FF%FF%E0%1F%FF%FF%F0%3F%FF%FF%FF%FF%FF%FF";
curX = "data:text/html;charset=utf-8,%00%00%02%00%01%00%14%17%00%00%00%00%00%00%B4%07%00%00%16%00%00%00(%00%00%00%14%00%00%00.%00%00%00%01%00%20%00%00%00%00%00%8C%07%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00111%FF%BD%BD%BD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00RRR%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%84%84%FFBBB%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C6%C6%C6%FFZZZ%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00BBB%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FF%A5%A5%A5%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%94%94%94%FF%8C%8C%8C%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D6%D6%D6%FFZZZ%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%B3%B3%FF%FF%DB%DB%FF%FF%00%00%00%00%00%00%00%00BBB%FF%BD%BD%BD%FFZZZ%FF%AD%AD%AD%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C9%C9%FF%FF%BD%BD%FF%FF%00%00%00%00%A8%A8%FF%FF%07%07%FF%FF%1A%1A%FF%FFQQ%FF%FF%A8%A8%FF%FF%5C%5Cm%FF%AD%AD%AD%FF%AD%AD%AD%FFBBB%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D4%D4%FF%FF%8A%8A%FF%FF%3C%3C%FF%FF%0D%0D%FF%FF%24%24%FF%FF%E2%E2%FF%FF%BC%BC%FF%FF%40%40%FF%FF%0A%0A%FF%FF%00%00%FF%FF%06%06%FF%FF%23%23%EC%FFWW%AD%FF%91%91%97%FF!!!%FFJJJ%FFkkk%FF%BD%BD%BD%FF%DD%DD%FF%FFgg%FF%FF%18%18%FF%FF%00%00%FF%FF%01%01%FF%FF%1A%1A%FF%FFOO%FF%FF%CD%CD%FF%FF%00%00%00%00%00%00%00%00%BF%BF%FF%FFll%FF%FF%11%11%FF%FF%00%00%FF%FF%01%01%F6%FF%22%22%BB%FFVVx%FFZZZ%FFggm%FF%26%26%7C%FF%24%24%F6%FF%00%00%FF%FF%06%06%FF%FFKK%FF%FF%9D%9D%FF%FF%DB%DB%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%9B%9B%DA%FF%0F%0F%C7%FF%02%02%FB%FF%00%00%FF%FF%0F%0F%E1%FF%3D%3D%AA%FF%16%16%B2%FF%02%02%F7%FF%00%00%FF%FF--%FF%FF%A5%A5%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00ZZZ%FFqq%7F%FF%23%23%89%FF%13%13%F2%FF%00%00%FF%FF%01%01%FE%FF%00%00%FF%FF%03%03%F3%FFpp%FF%FF%DD%DD%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%89%89%89%FFHHI%FFEEt%FF--%E4%FF%02%02%FE%FF%00%00%FF%FF%00%00%FF%FF%05%05%EB%FF%8E%8E%F5%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00aa%D7%FF%06%06%EA%FF%00%00%FF%FF%0F%0F%F6%FF88%DD%FF%1B%1B%EE%FF%00%00%FE%FF%03%03%FC%FFGG%FF%FF%C6%C6%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E2%E2%FF%FF%91%91%FF%FF%3C%3C%FF%FF%03%03%FF%FF%01%01%FF%FF%1E%1E%E4%FFww%B7%FF%9E%9E%9F%FF%89%89%A4%FF44%BD%FF%03%03%F1%FF%00%00%FF%FF%15%15%FF%FFQQ%FF%FF%A8%A8%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%D9%D9%FF%FFqq%FF%FF%24%24%FF%FF%01%01%FF%FF%00%00%FF%FF%1B%1B%FF%FFmm%F4%FFAAY%FF%84%84%84%FFHHH%FF444%FFNNQ%FF99%80%FF%09%09%C4%FF%08%08%F9%FF%00%00%FF%FF%06%06%FF%FF22%FF%FF%8E%8E%FF%FF%00%00%00%00%98%98%FF%FF%01%01%FF%FF%04%04%FF%FF%2B%2B%FF%FF%87%87%FF%FF%D4%D4%FF%FF%FE%FE%FF%FF%2F%2F%2F%FF%40%40%40%FFOOO%FF%3A%3A%3A%FF%3A%3A%3A%FFUUU%FFRR%5C%FF))e%FFnn%FF%FF%1D%1D%FF%FF%01%01%FF%FF%10%10%FF%FF%C8%C8%FF%FF%E4%E4%FF%FF%60%60%FF%FF%A6%A6%FF%FF%E7%E7%FF%FF%00%00%00%00%00%00%00%00%A5%A5%A5%FF%40%40%40%FF444%FFiii%FF%98%98%98%FF%9F%9F%9F%FF%A1%A1%A1%FF%86%86%86%FFOOO%FF%00%00%00%00%DB%DB%FF%FF%91%91%FF%FF%7C%7C%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%BD%BD%BD%FF%1F%1F%1F%FF%98%98%98%FF%A1%A1%A1%FF%A4%A4%A4%FF%9C%9C%9C%FFYYY%FF%60%60%60%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00NNN%FFYYY%FFYYY%FFOOO%FF%7B%7B%7B%FF%D6%D6%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E7%FF%FF%FF%E7%FF%FF%FF%E3%FF%FF%FF%E3%FF%FF%FF%F1%FF%FF%FF%F1%FF%FF%FF%F0%FF%FF%FF%F0%FF%FF%FF%98%7F%9F%FF%00%7C%0F%FF%00%00%0F%FF%C0%00%3F%FF%F0%01%FF%FF%F0%03%FF%FF%F0%07%FF%FF%F8%01%FF%FF%C0%00%7F%FF%00%00%1F%FF%00%00%0F%FF%0C%01%1F%FF%FC%03%FF%FF%FE%07%FF%FF%FF%FF%FF%FF";
curE = "data:text/html;charset=utf-8,%00%00%02%00%01%00%0F%17%00%00%00%00%00%00%E8%05%00%00%16%00%00%00(%00%00%00%0F%00%00%00.%00%00%00%01%00%20%00%00%00%00%00%C0%05%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%BD%CE%EF%FF%D6%DE%EF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%7B%9C%D6%FFc%84%CE%FFZ%7B%CE%FFk%8C%D6%FF%DE%E7%F7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A5%B5%E7%FFs%94%D6%FF%7B%9C%D6%FFc%84%D6%FFc%84%D6%FF%7B%9C%D6%FF%E7%EF%F7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E7%EF%F7%FFc%84%CE%FF%8C%AD%D6%FFk%8C%D6%FFRs%CE%FFk%8C%D6%FF%8C%AD%D6%FF%B5%CE%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%7B%9C%D6%FF%8C%AD%D6%FF%7B%9C%D6%FFk%8C%D6%FFZ%7B%CE%FFZ%7B%CE%FFk%8C%D6%FF%9C%B5%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%9C%B5%DE%FF%7B%9C%D6%FF%A5%C6%DE%FF%8C%AD%D6%FF%84%A5%D6%FF%84%A5%D6%FFc%84%D6%FFZ%7B%CE%FF%94%B5%D6%FF%D6%DE%EF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D6%DE%EF%FFk%8C%CE%FF%94%B5%D6%FF%7B%9C%D6%FF%94%B5%D6%FF%A5%C6%DE%FF%B5%CE%D6%FF%7B%A5%D6%FFBZ%BD%FFs%94%D6%FF%BD%D6%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%7B%94%D6%FF%84%A5%D6%FFk%8C%D6%FF%94%B5%D6%FF%9C%BD%D6%FF%B5%CE%D6%FF%B5%CE%D6%FFc%84%CE%FFs%94%CE%FF%8C%AD%D6%FF%B5%C6%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%E7%EF%F7%FFc%84%CE%FFZ%7B%CE%FF%7B%9C%D6%FF%84%A5%D6%FF%94%B5%D6%FF%8C%AD%D6%FF%7B%9C%D6%FF%8C%AD%D6%FF%C6%D6%DE%FF%8C%AD%D6%FF%D6%E7%EF%FF%00%00%00%00%00%00%00%00%00%00%00%00%A5%B5%E7%FFk%8C%D6%FFZ%7B%CE%FF%8C%AD%D6%FFJk%C6%FFRs%CE%FFk%8C%D6%FF%B5%CE%D6%FF%C6%D6%DE%FF%C6%D6%DE%FF%9C%B5%D6%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%7B%94%D6%FFRs%C6%FF%7B%9C%D6%FFRs%C6%FFJk%C6%FFs%9C%D6%FFk%8C%D6%FF%7B%9C%D6%FF%94%B5%D6%FF%A5%C6%DE%FF%84%A5%D6%FF%E7%EF%F7%FF%00%00%00%00%00%00%00%00%00%00%00%00Z%7B%CE%FFBc%C6%FF%8C%AD%D6%FF9Z%B5%FFRs%C6%FF%8C%AD%D6%FF%A5%C6%DE%FF%94%B5%D6%FF%7B%9C%D6%FFc%84%CE%FFZ%7B%CE%FF%D6%DE%EF%FF%00%00%00%00%00%00%00%00%D6%DE%EF%FFRs%C6%FFJk%C6%FF%9C%BD%D6%FFZ%7B%CE%FF!9%A5%FF%84%A5%D6%FF%AD%C6%DE%FF%B5%CE%D6%FF%A5%BD%DE%FF%94%B5%D6%FF%94%B5%D6%FF%CE%DE%E7%FF%00%00%00%00%00%00%00%00%AD%BD%E7%FFRs%C6%FFJk%C6%FF%9C%BD%D6%FF%9C%BD%D6%FF9R%B5%FF!9%A5%FF9Z%B5%FF%84%A5%D6%FF%94%B5%D6%FF%84%A5%D6%FF%9C%BD%D6%FF%A5%C6%DE%FF%00%00%00%00%00%00%00%00%B5%C6%E7%FFRs%C6%FFZ%7B%CE%FFk%8C%CE%FF%C6%D6%DE%FF%8C%AD%D6%FFZ%7B%CE%FFJk%C6%FF)J%B5%FFBc%BD%FF%8C%A5%CE%FF%94%B5%D6%FF%9C%BD%D6%FF%B5%CE%DE%FF%00%00%00%00%E7%EF%F7%FFJk%C6%FF%84%A5%D6%FF9R%B5%FF%AD%C6%DE%FF%BD%D6%D6%FF%8C%AD%D6%FFk%94%D6%FFc%8C%D6%FF%84%A5%D6%FFs%94%CE%FFk%8C%CE%FF%94%B5%D6%FF%9C%BD%D6%FF%D6%E7%EF%FF%00%00%00%00k%84%CE%FF%7B%9C%D6%FF9Z%BD%FFs%94%CE%FF%BD%D6%D6%FF%A5%C6%DE%FFk%8C%D6%FFRs%C6%FF%7B%A5%D6%FF%BD%D6%D6%FF%B5%CE%D6%FF%84%A5%D6%FF%84%A5%D6%FF%A5%BD%DE%FF%00%00%00%00%C6%D6%EF%FFRs%C6%FF%7B%9C%D6%FF)J%B5%FF%B5%CE%D6%FF%BD%D6%D6%FFs%9C%D6%FFJk%C6%FFZ%7B%CE%FF%B5%CE%D6%FF%BD%D6%D6%FFs%94%D6%FFRs%CE%FF%9C%B5%DE%FF%00%00%00%00%00%00%00%00%7B%94%D6%FFs%94%D6%FFBZ%BD%FFs%8C%C6%FF%C6%D6%DE%FF%9C%B5%D6%FFs%9C%D6%FFZ%7B%CE%FFZ%7B%CE%FFk%94%D6%FFk%8C%D6%FFJk%C6%FF%E7%EF%F7%FF%00%00%00%00%00%00%00%00%00%00%00%00c%84%CE%FF%8C%AD%D6%FF9R%B5%FFZs%BD%FF%B5%CE%D6%FF%94%B5%D6%FF%7B%9C%D6%FFc%84%D6%FFk%94%D6%FFZ%7B%CE%FF%BD%CE%EF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00c%84%CE%FF%7B%9C%D6%FFk%84%CE%FFBZ%BD%FFJc%BD%FFRs%C6%FFk%8C%CE%FFc%84%CE%FF%9C%B5%DE%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%A5%D6%FFc%84%CE%FF%84%A5%D6%FF%84%A5%D6%FFc%84%CE%FFRs%C6%FF%B5%C6%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%E7%EF%F7%FF%9C%B5%DE%FF%94%AD%DE%FF%B5%C6%E7%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FE%7F%FF%FF%FC%1F%FF%FF%F8%0F%FF%FF%F0%0F%FF%FF%F0%0F%FF%FF%E0%07%FF%FF%C0%07%FF%FF%C0%07%FF%FF%80%07%FF%FF%80%0F%FF%FF%80%07%FF%FF%80%07%FF%FF%00%07%FF%FF%00%07%FF%FF%00%03%FF%FF%00%01%FF%FF%80%01%FF%FF%80%01%FF%FF%C0%01%FF%FF%E0%03%FF%FF%F0%07%FF%FF%F8%0F%FF%FF%FC%3F%FF%FF";



//  ################################################################################################
//    ####   ##  ##  ######  #####   ##  ##  ######           ####   ######  ##  ##  ##      ###### 
//   ##  ##  ##  ##    ##    ##  ##  ##  ##    ##            ##        ##     ####   ##      ##     
//   ##  ##  ##  ##    ##    #####   ##  ##    ##             ####     ##      ##    ##      ####   
//   ##  ##  ##  ##    ##    ##      ##  ##    ##                ##    ##      ##    ##      ##     
//    ####    ####     ##    ##       ####     ##             ####     ##      ##    ######  ###### 
//  ################################################################################################


var css = 'body       {font-size:90%;font-weight:normal;font-family:Arial,Helvetica,sans-serif;\n'+
                      'background-color:white;margin:0px}\n'+
  'a                  {color : #50555C;text-decoration:none;}\n'+
  'a.navBut1          {font-size:1.7em;margin-left:1em;margin-right:1em;background-color:#eee;-moz-border-radius:4px;border: 2px outset #577FB0;padding:0px .5em 0px .5em;}\n'+
  'a.navBut1:link     {}\n'+
  'a.navBut1:visited  {}\n'+
  'a.navBut1:hover    {color:#577FB0}\n'+
  'a.navBut1:active   {border: 2px inset #577FB0;}\n'+
  'a.navBut2          {font-size:1em;margin-left:1em;margin-right:1em;background-color:#eee;-moz-border-radius:4px;border: 1px outset #577FB0;padding:0px .5em 0px .5em;}\n'+
  'a.navBut2:link     {}\n'+
  'a.navBut2:visited  {}\n'+
  'a.navBut2:hover    {color:#577FB0}\n'+
  'a.navBut2:active   {border: 2px inset #577FB0;}\n'+
  //'td.listenAgain     {background-color:'+stations[window.stationIndex][5]+';}\n'+
  'a.listenAgain      {height:40px;width:40px;background-position:center center;cursor:url("'+curE+'") 4 4,auto}\n'+
  'a.listenNow        {height:40px;width:40px;background-position:center center;cursor:url("'+curE+'") 4 4,auto;}\n'+
  'a.progTitle        {font-size:1.4em;color:#032F87;text-decoration:underline;}\n'+
  'a.radio-but        {line-height:200%;margin:0px 1px 4px 0px;background-color:#eee;-moz-border-radius:7px;border: 3px outset #577FB0;padding:0px 1px 1px 1px;}\n'+
  'a.live-radio-but   {margin:0px 2px 2px 0px;background-color:#ccc;-moz-border-radius:7px;border: 3px inset #577FB0;padding:0px 1px 0px 1px;}\n'+
  'div.top-nav        {padding-top:4px;height:1.6em;background-color:'+stations[window.stationIndex][4]+'}\n'+
  'div.title          {background-color:#eee;border-bottom : 4px solid #ccc;padding-left:3em;}\n'+
  'div.prev-next-nav  {background-color:'+stations[window.stationIndex][5]+'}\n'+
  'div.programmes     {}\n'+
  'div.setP {border-bottom:8px dotted '+stations[window.stationIndex][4]+'}\n'+
  'div.setS {border-bottom:8px dotted '+stations[window.stationIndex][4]+'}\n'+
  'div.setH {border-bottom:8px dotted '+stations[window.stationIndex][4]+'}\n'+
  'div.setT {background-color:'+stations[window.stationIndex][4]+';color:white;font-size:150%;font-weight:bold;padding-left:5em}\n'+
  'span.progSubTitle  {color:#8a00ff;font-size:1.3em;cursor:url("'+curB+'") 4 22,auto;}\n'+
  'span.progDesc      {font-size:100%;color:#50555C;}\n'+
  //'td.pin-none        {border : 1px solid #ddd;width:20px;background-repeat:no-repeat;background-position:center center;background-image:url("'+pinNoneImg+'");cursor:url("'+curR+'") 4 22,auto;}\n'+
  'td.pin-none        {background-color:'+stations[window.stationIndex][5]+';width:20px;background-repeat:no-repeat;background-position:center center;background-image:url("'+pinNoneImg+'");cursor:url("'+curR+'") 4 22,auto;}\n'+
  'td.pin-red         {overflow:hidden;width:20px;background-repeat:no-repeat;background-position:center center;background-image:url("'+pinRedImg+'");cursor:url("'+curB+'") 4 22,auto;}\n'+
  'td.pin-blue        {overflow:hidden;width:20px;background-repeat:no-repeat;background-position:center center;background-image:url("'+pinBlueImg+'");cursor:url("'+curY+'") 4 22,auto;}\n'+
  'td.pin-yellow      {overflow:hidden;width:20px;background-repeat:no-repeat;background-position:center center;background-image:url("'+pinYellowImg+'");cursor:url("'+curX+'") 4 22,auto;}\n'+
  'td.start-past      {font-size:1.2em;text-align:right;color:#50555C;cursor:url("'+curY+'") 4 22,auto;}\n'+
  'td.start-future    {font-size:1.2em;text-align:right;color:#50555C;font-weight:bold;;cursor:url("'+curY+'") 4 22,auto;}\n'+
  'span.navBut2       {font-size:1em;margin-left:1em;margin-right:1em;background-color:#eee;-moz-border-radius:4px;border: 1px outset #577FB0;padding:0px .5em 0px .5em;}\n'+
  'span.title         {color:#476FA0;font-size:2.5em;margin:10px;}\n'+
  'span.title-end     {color:#577FB0;font-size:2em;}\n'+
  'table.other-days   {}\n'+
  'table.stations     {font-size:1em;}\n'+
  'table.schedule     {font-size:100%;margin-top:5px;}\n'+
  'td.radio-buts      {padding:4px;background-color:#eee;border-style:solid;border-color:#ccc;border-width: 0 4px 4px 0;}\n'+
  'td.prev-next       {padding-left:1em;}\n'+
  'td.zero            {padding: 0px 1em 0px 1em;background-color:white;-moz-border-radius:4px;}\n'+
  'td.other-day       {font-size:1em;margin:5px 2px 0px 2px;background-color:#eee;-moz-border-radius:4px;border: 1px outset #577FB0;padding:0px .5em 0px .5em;}\n'+   
  'td.today           {font-weight:bold;font-size:1em;margin:5px 2px 0px 2px;background-color:#eee;-moz-border-radius:4px;border: 3px outset #577FB0;padding:0px .5em 0px .5em;}\n'+   
  'tr.progRow         {font-size:100%;line-height:200%;min-height:30px;max-height:30px;}\n'+
  'tr.breakRow        {background-color:#50555C;}';
AddStyle(css);


// Couldn't implement style for <td> and click passed on to <a> so put headphones image directly into <a>
var h;
elmts = document.evaluate("//a[@class='listenAgain']|//a[@class='listenNow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < elmts.snapshotLength; i++){
  el = elmts.snapshotItem(i);
  h = document.createElement('img');
  if(el.className=='listenAgain'){h.src = headphonesImg;}else{h.src = animAerialImg;}
  h.border = "0";
  el.replaceChild(h,el.firstChild);
}


//  ################################################################################################
//    ####    ####   ######   ####   ##  ##          ######  ##  ##  ######  ##  ##  ######   ####  
//   ##  ##  ##  ##    ##    ##  ##  ##  ##          ##      ##  ##  ##      ### ##    ##    ##     
//   ##      ######    ##    ##      ######          ####    ##  ##  ####    ## ###    ##     ####  
//   ##  ##  ##  ##    ##    ##  ##  ##  ##          ##       ####   ##      ##  ##    ##        ## 
//    ####   ##  ##    ##     ####   ##  ##          ######    ##    ######  ##  ##    ##     ####  
//  ################################################################################################

// ----------------------------------------
window.HandleStartClick = function(event){
// Persistent click capture for start times
// This reacts to clicking on the time
// We use this to flag the title as one
// we want to mark with a yellow (one-shot) pin
// ----------------------------------------
  var tr = event.target.parentNode;
  var rowData = GetRowBits(tr); // [0] pin class  [1] start time  [2] title   [3] sub-title
  var pinTd = tr.childNodes[0];
  pinTd.className = 'pin-yellow';
  AddPin(rowData[2],rowData[3],window.dayBeingDisplayed,rowData[1],'yellow',window.stationIndex);
  event.stopPropagation();
  alert('Yellow pin = This single programme.\n(Click on pin to change colour)');
}

// ----------------------------------------
window.HandleSubtitleClick = function(event){
// Persistent click capture for subtitles
// We use this to flag the sub-title as one
// we want to mark with a blue (short series) pin
// ----------------------------------------
  var span = event.target;
  var tr = span.parentNode.parentNode;
  var rowData = GetRowBits(tr); // [0] pin class  [1] start time  [2] title   [3] sub-title
  var pinTd = tr.childNodes[0];
  pinTd.className = 'pin-blue';
  AddPin(rowData[2],rowData[3],window.dayBeingDisplayed,rowData[1],'blue',window.stationIndex);
  event.stopPropagation();
  alert('Blue pin = Sub-series.\n(Click on pin to change colour)');
}

// ----------------------------------------
window.HandlePinClick = function(event){
// Persistent click capture for pins
// This reacts to clicking on the pin
// We use this to change pin colour
// ----------------------------------------
  var td = event.target;
  var tr = td.parentNode;
  var rowData = GetRowBits(tr);
  var newColour = NextPinColour(td.className);
  td.className = 'pin-'+newColour;
  AddPin(rowData[2],rowData[3],window.dayBeingDisplayed,rowData[1],newColour,window.stationIndex);
  event.stopPropagation();
}



// Set up clicking on start time elements.
// ---------------------------------------
elmts = document.evaluate("//td[@class='start-past']|//td[@class='start-future']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < elmts.snapshotLength; i++){
  elmts.snapshotItem(i).addEventListener('click',function(event){window.HandleStartClick(event);},true);
}

// Set up clicking on sub-title elements.
// --------------------------------------
elmts = document.evaluate("//span[@class='progSubTitle']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < elmts.snapshotLength; i++){
  elmts.snapshotItem(i).addEventListener('click',function(event){window.HandleSubtitleClick(event);},true);
}


// Set up clicking on all pin elements.
// -----------------------------------
function AddPinClick(Element){
  Element.addEventListener('click',function(event){window.HandlePinClick(event);},true);
}
ApplyToMatchingElements("//td[@class='pin-none']|//td[@class='pin-red']|//td[@class='pin-blue']|//td[@class='pin-yellow']",document,AddPinClick);  //[T]


// Set up clicking on settings menu elements.
// -----------------------------------------
el = document.getElementById('settingsMenu');
elmts = document.evaluate("//a",el,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < elmts.snapshotLength; i++){
  elmts.snapshotItem(i).addEventListener('click',function(event){window.HandleSettingsClick(event);},true);
}



