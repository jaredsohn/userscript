/**
Copyright 2008 Jonathon Bedell

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author          Jonathon Bedell
// @email           jonathon.bedell@yahoo.com
// @namespace       http://userscripts.org/
// @name            Travian Uber Celebrations
// @description     Throw celebrations in all villages as possible
// @include         http://speed.travian.com/*
// @exclude         http://forum.travian.*
// @exclude         http://www.travian.*
// @version         0.0.2
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL               = 5;        // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery             = 10000;    // How often do we check for tasks to trigger in miliseconds.
                                        // Low value  = high accuracy in triggering tasks. To make your browser
                                        // unresponsive, set this to some ridiculously small number. Default is 10000
var sLang                   = "";       // Set this to override the automatic language detection. Available translations: see below.
var iPreloadTime            = 20;       // How many seconds ahead is the code for building and upgrading prefetched.
                                        // If the code is not available by the time the construction should start, the
                                        // construction will be cancelled. This value must be greater than iCheckEvery
                                        // in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames    = true;     // Display village names instead of numbers. May hit the performance.

var PHP_PROXY_IN_USE        = false;
var PHP_PROXY_TRAV_SERVER   = "";
var PHP_PROXY_DOMAIN        = "";
var PHP_PROXY_PREFIX        = "http://" + PHP_PROXY_DOMAIN + "/index.php?q="+escape("http://"+PHP_PROXY_TRAV_SERVER);

var DEFAULT_CHAIN_CELEBS_MSG_BEGIN = 'We have begun throwing Uber Celebrations.  Please wait for this to complete before clicking on any links.';
var DEFAULT_CHAIN_CELEBS_MSG_DONE  = 'Finished Throwing Uber Celebrations.';

/**********************
**** End of Settings ****
***********************/


/** GLOBALS - do not tamper! */

var currentVersion              = "0.0.3";  // Version number with which we need to run the update function
//var bUseServerTime            = getOption("USE_SERVER_TIME", false, "boolean");   //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
                                                                                    // Your local computer time MUST  still be correct (both time and date!).
var bLocked                     = false;        // for locking the TTQ_TASKS cookie
var bLockedCode                 = false;        // for locking the TTQ_CODE_0 and TTQ_CODE_0  cookies
var bLockedHistory              = false;
var oIntervalReference          = null;
var iSessionRefreshRate         = 60;           // Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
var iMaxPlaceNamesCookieLength  = 15;           // maximum number of names stored  in the cookie before it is cleared
//var iMyRace                     = getOption("RACE", 0, "integer");  // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
var iHistoryLength              = getOption("HISTORY_LENGTH", 10, "integer");
var aLangBuildings              = [];  //multilang support
var aLangTasks                  = [];  //multilang support
var aLangStrings                = [];  //multilang support
var aLangTroops                 = [];

// Images
var sCloseBtn   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var sDeleteBtn  = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";

//Styles
var cssStyle = "";
cssStyle += "#ttq_tasklist, #ttq_history {position:absolute; background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#ttq_history {background-color:#D4D4EC}";
cssStyle += ".ttq_history_row {padding:1px 5px;}";
cssStyle += ".ttq_village_name {font-weight:bold;}";
cssStyle += ".ttq_draghandle {font-size: 120%; font-weight:bold;}";
cssStyle += ".ttq_time_village_wrapper {font-style:italic; font-size:80%; display:block;}";
cssStyle += ".ttq_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#timerForm {padding:10px 20px; }";
cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#timerform_wrapper p {}";
cssStyle += "#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
cssStyle += ".handle {cursor: move;}";
cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
cssStyle += ".ttq_research_later {display:block;}";

GM_addStyle(cssStyle);

/** ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */

aLangBuildings  = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Townhall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
aLangTasks      = ["Build", "Upgrade", "Attack", "Research", "Train", "Throw" ];
aLangStrings    = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched."];
aLangTroops[0]  = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
aLangTroops[1]  = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
aLangTroops[2]  = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls

// Do not change the array below!
var aLangStringsMaster = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained.", "hold", "Town", "Hall"];

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;          // Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;     // Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;     // Constant that gives back a iterator of elements by XPath

/**
* Custom log function .
* @param {int} level
* @param:{int} msg Message to log.
*/
function _log(level, msg) { if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) { GM_log(msg); } }

/********************************************************************************/
function ProxifyUrl(url) {
    if (url.indexOf() <= 0) {
        return(PHP_PROXY_PREFIX + escape(url) );
    }else{
        return(url); // Already Proxified?!
    }
}

/********************************************************************************/
function dummy()                { /* Do Nothing */ }
function trim( stringToTrim)    { return( stringToTrim.replace(/^\s+|\s+$/g,"") ); }
function ltrim(stringToTrim)    { return( stringToTrim.replace(/^\s+/,"")       ); }
function rtrim(stringToTrim)    { return( stringToTrim.replace(/\s+$/,"")       ); }
function $(id)                  { return( document.getElementById(id)           ); }

/**
* @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
*/
function get(url, callback, options) {
    if (PHP_PROXY_IN_USE) { url = ProxifyUrl(url); }
    _log(5,'Page Request [' + url + ']');
    var httpRequest = new XMLHttpRequest();
    if(callback) {
        httpRequest.onreadystatechange = function() {
            callback(httpRequest, options);
        };
    }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
}

/********************************************************************************/
//function post(url, data, callback, options) {
//    var httpRequest = new XMLHttpRequest();
//    httpRequest.onreadystatechange = function() {
//        callback(httpRequest, options)
//    };
//    data = encodeURI(data);
//    httpRequest.open("POST", url, true);
//    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//    httpRequest.setRequestHeader("Content-length", data.length);
//    httpRequest.setRequestHeader("Connection", "close");
//    //httpRequest.overrideMimeType('text/html');
//    httpRequest.overrideMimeType("application/xhtml+xml");
//    httpRequest.send(data);
//}

/**
 * Search the XML DOM via Xpath
 *
 * Params:
 *  xpath   XPath Expresion to search
 *  xpres   type of search
 *
 * Returns:
 *  Reference to a XPath result element
 */
function find(xpath, xpres, searchNode) {
    if (typeof searchNode == 'undefined') { searchNode = document; }
    var ret = document.evaluate(xpath, searchNode, null, xpres, null);
    return( (xpres == XPFirst) ? ret.singleNodeValue : ret );
}

/*
 * The Village Object and associated methods
 *
 *
 *****************************************************************************/
var TRAVIAN_VILLAS       = new Array();
var TRAVIAN_VILLAS_BY_ID = new Array();

var CELEB_UNKNOWN   = 0;
var CELEB_SMALL     = 1;
var CELEB_GREAT     = 2;

/********************************************************************************/
function getVillage(index)                  { return(TRAVIAN_VILLAS[index]);              }
function setVillage(village,index)          { TRAVIAN_VILLAS[index] = village;            }

/********************************************************************************/
function getVillageByNewdid(newdid)         { return(TRAVIAN_VILLAS_BY_ID['_'+newdid]);   }
function setVillageByNewdid(village,newdid) { TRAVIAN_VILLAS_BY_ID['_'+newdid] = village; }


/********************************************************************************/
function TravianVillage(villaName,villaNewdid,villaIndex) {
  this.villaIndex               = villaIndex;
  this.villaName                = villaName;
  this.newdid                   = villaNewdid;
  this.toString                 = TV_ToString;
  this.dorf1                    = TV_GetDorf1;
  this.dorf2                    = TV_GetDorf2;
  this.dorf3                    = TV_GetDorf3;
  this.townHallUrl              = TV_GetTownHall;
  this.autoBuild                = true;
  this.townHallLevel            = -1;
  this.townHallId               = -1;
  this.lastCelebration          = CELEB_UNKNOWN;
  //this.throwCelebration       = TV_ThrowCelebration;
  this.chainCelebrations        = TV_ChainCelebrations;
  this.getSmallCelebrationURL   = TV_SmallCelebrationURL;
  this.getGreatCelebrationURL   = TV_GreatCelebrationURL;
}

/********************************************************************************/
function TV_ToString()              { return( this.villaName + ' (' + this.newdid + ')'  ); }
function TV_GetDorf1()              { return( '/dorf1.php?newdid='+this.newdid           ); }
function TV_GetDorf2()              { return( '/dorf2.php?newdid='+this.newdid           ); }
function TV_GetDorf3()              { return( '/dorf3.php?newdid='+this.newdid           ); }
function TV_GetTownHall()           { return( '/build.php?newdid='+this.newdid+'&gid=24' ); }
function TV_SmallCelebrationURL()   { return( '/build.php?id='+this.townHallId+'&a=1'    ); }
function TV_GreatCelebrationURL()   { return( '/build.php?id='+this.townHallId+'&a=2'    ); }

/********************************************************************************/
function TV_ChainCelebrations() {
    _log(3, 'Opening TownHall Page for ' + this.villaName );
    get(this.townHallUrl(), HandleTownHallNavigate, this);
}

/*
 * Called after the 'Navigate to TownHall, in order to throw Celebration
 *****************************************************************************/
function HandleThrowCelebration(xmlHttpRequest,village) {
    if       (xmlHttpRequest.readyState == 1) { _log(6, '1 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 2) { _log(6, '2 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 3) { _log(6, '3 Waiting for AJAX response');

    }else if (xmlHttpRequest.readyState == 4) {
        if (xmlHttpRequest.status == 200) {
            // ok, we have navigated
                var textResponse = xmlHttpRequest.responseText;
                if(!textResponse) {  // error retrieving the response
                    _log(3, 'Failed To Throw Celebration');
//                    addToHistory( getCelebrationTask(village,village.lastCelebration), false);
                    return;
                }
                _log(4, 'Celebration thrown in ' + village.villaName);
                addToHistory( getCelebrationTask(village,village.lastCelebration), true);

            // Chain the Next Celebration
                ChainNextCelebration(village);

        }else{ // failed
            _log(2, "HTTP request status: " + xmlHttpRequest.status);
        }
    }

}

/*
 * Called after the 'Navigate to TownHall, in order to throw Celebration
 *****************************************************************************/
function HandleTownHallNavigate(xmlHttpRequest,village) {
    if       (xmlHttpRequest.readyState == 1) { _log(6, '1 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 2) { _log(6, '2 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 3) { _log(6, '3 Waiting for AJAX response');

    }else if (xmlHttpRequest.readyState == 4) {
        if (xmlHttpRequest.status == 200) {
            // ok, we have navigated
                var textResponse = xmlHttpRequest.responseText;
                if(!textResponse) {  // error retrieving the response
                    _log(3, 'Failed To Navigate to TownHall');
                    return;
                }
                _log(4, 'Navigated to ' + village.villaName + ' - TowhHall: textResponse.length: ' + textResponse.length);
                var reMatch = null;

            // Search for the Town Hall Label
                var re = null;
                re = new RegExp("<h1>[ ]*<b>[ ]*" + t("Town") + "[ ]*" + t("Hall") + "[ ]*" + t("level") + "[ ]*([0-9]+)[ ]*<\/b><\/h1>","i");
                reMatch = textResponse.match(re);
                //reMatch = textResponse.match(/<h1>[ ]*<b>[ ]*Town[ ]*Hall[ ]*level[ ]*([0-9]+)[ ]*<\/b><\/h1>/i);
                if (reMatch == null) {
                    printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN+'<br/>&nbsp;<br/>Town Hall not found in<br/>'+village.villaName,false);
                    _log(3, village.villaName + " does not appear to have a Town Hall." );
                    ChainNextCelebration(village);
                    return;
                }
                village.townHallLevel = parseInt(reMatch[1]);
                //var townHallLabel = new String(reMatch[0]);
                //    townHallLabel = townHallLabel.substring(0, townHallLabel.indexOf('</b>'));
                //    townHallLabel = trim(townHallLabel.substring( townHallLabel.lastIndexOf(' ') ));
                //    village.townHallLevel = parseInt(townHallLabel);

            // Search for the Building Id
                reMatch = textResponse.match(/<input[ ]+type=["']hidden["'][ ]+name=["']id["'][ ]+value=["']([0-9]+)["']>/i);
                if (reMatch == null) { _log(3, " Unable to locate Building Id." );      ChainNextCelebration(village);      return; }
                village.townHallId = parseInt(reMatch[1]);
                //var inputBuildingId = new String(reMatch[0]);
                //    inputBuildingId = inputBuildingId.substring(0, inputBuildingId.indexOf('>')-1);
                //    inputBuildingId = trim(inputBuildingId.substring( 1+inputBuildingId.lastIndexOf('=') ));
                //    village.townHallId = parseInt(inputBuildingId);

            // Extract the current
            // Now Check to see what we can run
                re = new RegExp("href=['\"]([a-zA-A0-9?%=:/.&]+)[\"']>\s*" + t("hold") + "\s*<\/a>","gi");
                reMatch = textResponse.match(re);
                //reMatch = textResponse.match(/href=['"]([a-zA-A0-9?%=:/.&]+)["']>\s*hold\s*<\/a>/gi); // Global match all 'hold'
                if (reMatch == null) {
                    printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN+'<br/>&nbsp;<br/>Unable to throw celebration in<br/>'+village.villaName,false);
                    _log(3, " Unable to throw celebration." );
                    ChainNextCelebration(village);
                    return;
                }

            // Ok, so now, DO IT already!!!
                if (reMatch.length == 2) {
                    // Throw the GC
                        printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN+'<br/>&nbsp;<br/>Began throwing <b>Great</b> Celebration in<br/>'+village.villaName,false);
                       _log(3, "Begin throwing Great Celebration in " + village.villaName );
                       village.lastCelebration = CELEB_GREAT;
                       get(village.getGreatCelebrationURL(), HandleThrowCelebration, village);

                }else if (reMatch.length == 1) {
                    // Throw the SM
                        printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN+'<br/>&nbsp;<br/>Began throwing <b>Small</b> Celebration in<br/>'+village.villaName,false);
                       _log(3, "Begin throwing Small Celebration in " + village.villaName );
                       village.lastCelebration = CELEB_SMALL;
                       get(village.getSmallCelebrationURL(), HandleThrowCelebration, village);
                }

        }else{ // failed
            _log(2, "HTTP request status: " + xmlHttpRequest.status);
        }
    }

}

/*
 * Throw a celebration in the next village in the array, unless the last village has been reached.
 *****************************************************************************/
function ChainNextCelebration(village) {
    var village = getVillage(village.villaIndex+1);
    if(village) { //getVillage(village.villaIndex+1)) {
        printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN+'<br/>&nbsp;<br/>Chaining next celebration in<br/>'+village.villaName,false);
        _log(3, "Chaining next Celebration in " + village.villaName);
        village.chainCelebrations();
    }else{
        _log(3, "The end of the chain has been reached.");

        // Show Message
            printMsg(DEFAULT_CHAIN_CELEBS_MSG_DONE,false);
    }
}

/*
 * Throw a celebration is each village as is possible to do so.
 *****************************************************************************/
function AutoThrowCelebration() {
    _log(3, 'Begin AutoThrowCelebration()');

    // Show Message
        printMsg(DEFAULT_CHAIN_CELEBS_MSG_BEGIN,false);

    // Get a list of all villages
        extractVillageList();

    // Throw a celebration in the first village, and let them chain
        getVillage(0).chainCelebrations();

    _log(3, 'Finished AutoThrowCelebration()');
}

/**
 *
 * @param: {TravianVillage} village       - The TravianVillage Object for which the celebration is thrown
 * @param: {int}            celebrationId - 1 = small; 2 = great
 *
 *************************************************************/
function getCelebrationTask(village,celebrationId) {
    var now = new Date();
    var celebType = ["", "Small","Great"];
    var taskCelebration = [6, now.getTime()/1000, village.townHallId, celebType[celebrationId], village.newdid, village ];
    return(taskCelebration);
}

/*
 * Extract the List of villages, and store them in the Village Array
 *
 *****************************************************************************/
function extractVillageList() {
    var SEARCH_TEXT = '?newdid=';
    var VI_NEWDID   = 0;
    var VI_NAME     = 1;
    var nodeList    = find("//div[@id='lright1']//table//tr//td//a[@href]", XPList);
    var vIndex      = 0;

    _log(4, "Extracting Village List from Right Side Div.  Village Count is " + nodeList.snapshotLength);
    for (var i=0; i<nodeList.snapshotLength; i++) {
        var itemHTML      = new String(unescape(nodeList.snapshotItem(i).parentNode.innerHTML)).replace(' class="active_vl"','');
        _log(4, 'Node HTML: [' + itemHTML + ']');

        var reMatch = itemHTML.match(/\?newdid=([0-9]*)["'&].*>(.*)<\/a>/i); //"
        if (reMatch == null) {
            _log(0, '!!! VilageInfo Cannot be located !!!');
        }else if (reMatch.length < 3) {
            _log(0, '!!! VilageInfo located, but incorrecte RegEx Matches:' + reMatch.length);
        }else{
            var newdid    = reMatch[1];
            var villaName = reMatch[2];
            _log(4,'[' + i + '] villageInfo: [' + villaName + '],[' + newdid + ']');
            var village   = new TravianVillage(villaName,newdid,vIndex);
            setVillage(village,vIndex);
            setVillageByNewdid(village,newdid);
            vIndex++;
        }
    }
}

/********************************************************************************/
function createAnchorLink(href,innerHTML,id,class,title) {
  var link = document.createElement("a");
  link.id =id;
  link.className = class;
  link.innerHTML = innerHTML;
  link.title = title;
  link.href = href;
  //link.innerText = text;
  //link.setAttribute("itask", 3);
  //link.setAttribute("starget", iSiteId);
  //link.setAttribute("soptions", iTroopId);
  //link.setAttribute("rowCount", 1);
  //link.addEventListener('click',        displayTimerForm, false);
  return(link);
}

/********************************************************************************/
function createINPUT(type,name,id,value,class) {
  var input = document.createElement('INPUT');
  if (type == 'button') {
    input.id        = id;
    input.type      = 'button';
    input.name      = name;
    input.value     = value;
    input.className = class;
  }
  return(input);
}

/********************************************************************************/
function SpacerTR(colspan) {
  var tr = createTR('');
  tr.setAttribute('colspan', colspan);
  tr.innerHTML = '<td>&nbsp;</td>';
  return(tr);
}

/********************************************************************************/
function createTR(class) {
  var tr = document.createElement('TR');
  tr.className = class;
  return(tr);
}

/********************************************************************************/
function createTD(align,class) {
  var td = document.createElement('TD');
  td.setAttribute('align', align);
  td.className = class;
  return(td);
}

/********************************************************************************/
function createTABLE(border,width,cellspacing,cellpadding,class) {
  //if (typeof id          = 'undefined') { id          = '';  }
  //if (typeof border      = 'undefined') { border      = '0'; }
  //if (typeof cellspacing = 'undefined') { cellspacing = '0'; }
  //if (typeof cellpadding = 'undefined') { cellpadding = '0'; }
  //if (typeof class       = 'undefined') { class       = '';  }

    var table = document.createElement('TABLE');
  //table.setAttribute('id'         , id          );
    table.setAttribute('border'     , border      );
    table.setAttribute('width'      , width       );
    table.setAttribute('cellspacing', cellspacing );
    table.setAttribute('cellpadding', cellpadding );
    table.className = class;
    return(table);
}

//function createIFRAME(source,id,name) {
//  var iframe = document.createElement("iframe");
//  iframe.src=source;
//  iframe.name=name;
//  iframe.id=id;
//  return(iframe);
//}

/********************************************************************************/
//function ShowAutoBuildForm() {
//    // Find the DIV '<div id="lmid2">'
//        var divNode = find("//div[@id='lmid2']", XPFirst);
//        if (!divNode) { _log(3, "div[@id='lmid2'] not found.  Aborting AutoBuild"); return; }
//
//    // Get a list of all villages
//        extractVillageList();
//
//    // Add the Auto Build Content
//        var COLSPAN = 4;
//        var tableMain   = createTABLE(1,'100%',0,0,'');
//
//        tableMain.appendChild( SpacerTR(COLSPAN) );
//        tableMain.appendChild( SpacerTR(COLSPAN) );
//        tableMain.appendChild( SpacerTR(COLSPAN) );
//
//        var trAutoBtns     = createTR();                     tableMain.appendChild(trAutoBtns);
//        var tdAutoBtns     = createTD('left','');            trAutoBtns.appendChild(tdAutoBtns);
//        var btnAutoCelebs = createINPUT('button','cmdAutoCelebs','cmdAutoCelebs','Throw All Celebrations');
//        btnAutoCelebs.addEventListener('click', AutoThrowCelebration, true);
//        tdAutoBtns.appendChild(btnAutoCelebs);
//
//        tableMain.appendChild( SpacerTR(COLSPAN) );
//
//        var trVillas    = createTR();                     tableMain.appendChild(trVillas);
//        var tdVillas    = createTD('left','');            trVillas.appendChild(tdVillas);
//        var tableVillas = createTABLE(1,'100%',0,0,'');   tdVillas.appendChild(tableVillas);
//
//        for(var rows=0; rows<TRAVIAN_VILLAS.length; rows++) {
//            var tr = createTR('');              tableVillas.appendChild(tr);
//
//            var td1 = createTD('left','s7');    tr.appendChild(td1);
//            var td2 = createTD('left','s7');    tr.appendChild(td2);
//            var td3 = createTD('left','s7');    tr.appendChild(td3);
//            var td4 = createTD('left','s7');    tr.appendChild(td4);
//
//            var linkDorf1 = createAnchorLink(TRAVIAN_VILLAS[rows].dorf1(),TRAVIAN_VILLAS[rows].villaName,'','','Village Overview');
//            var linkDorf2 = createAnchorLink(TRAVIAN_VILLAS[rows].dorf2(),'C','','','Village Overview');
//
//            td1.appendChild(linkDorf1);
//            td2.appendChild(linkDorf2);
//            td3.innerHTML= '3'; //appendChild(linkCeleb);
//            td4.innerHTML= '4';
//        }
//
//    // Add an iframe
//        //var url         = 'dorf1.php';
//        //var trIframe    = createTR();                         tableMain.appendChild(trIframe);
//        //var tdIframe    = createTD('left','');                trVillas.appendChild(tdIframe);
//        //var iframe      = createIFRAME(url,'AB_IF','AB_IF');  tdVillas.appendChild(iframe);
//        //iframe.setAttribute('width','100%');
//
//    // Replace the content with the AutoBuild content
//        divNode.innerHTML = '';
//        divNode.appendChild(tableMain);
//
//    // Hide the TravianBeyond stuff, as they don't adjust their 'what can you build' stuff
//        if ($('resumen')) {$('resumen').style.visibility = 'hidden'; }
//}

/**
 * Addes the AutoBuilder Quick Links
 *
 ********************************************************************************/
function AddAutoBuilderQuickLink(){
    var menu = find("//td[@class='menu']", XPFirst);
    //for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);

    menu.appendChild(document.createElement('HR'));
    //var a = createAnchorLink('#','AutoBuilder','AutoBuilderLink','','Click Here to Load the Auto Builder.')
    //a.addEventListener('click', function() { ShowAutoBuildForm(); }, false);

    //(href,innerHTML,id,class,title)
    var a = createAnchorLink('#','Uber Celebs','UberCelebrationLink','','Click Here to Throw Celebrations in all villages as possible.')
    a.addEventListener('click', AutoThrowCelebration, true);
    menu.appendChild(a);

    //menu.appendChild(document.createElement('HR'));
    //var a = createAnchorLink('#','Test','AutoBuildTestLink','','Runt he AutoBuildTest.')
    //a.addEventListener('click', RunAutoBuildTest, true);
    //menu.appendChild(a);

}

/********************************************************************************/
//function RunAutoBuildTest() {
//    _log(3, '-> RunAutoBuildTest()');
//
//    extractVillageList();
//
//    var village             = getVillage(1);
//    village.lastCelebration = CELEB_SMALL;
//    village.newdid          = 79617;
//    village.townHallId      = 25;
//
//    _log(3, 'Village: ' + village.villaName);
//
//    var task = getCelebrationTask(village,village.lastCelebration);
//    _log(3, 'task: ' + task);
//
//    addToHistory( task, true);
//
//
//    _log(3, '<- RunAutoBuildTest()');
//}



/********************************************************************************/
/****
/**** Begin Taks Queue Stuff
/****

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
    return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
    object.onmousedown = function(){
        dragObject = this;
    }
}

function getMouseOffset(target, ev){
    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
    var left = 0;
    var top  = 0;
    while (e.offsetParent){
        left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
        top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
        e     = e.offsetParent;
    }
    left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
    top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
    return {x:left, y:top};
}

function mouseMove(ev){
    var target   = ev.target;
    var mousePos = mouseCoords(ev);

    if(dragObject){
        dragObject.style.position = 'absolute';
        dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
        dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
    }
    lMouseState = iMouseDown;
    return false;
}

function mouseUp(ev){
    if(dragObject) {
        switch(dragObject.id) {
            case "ttq_message":
                var key = "MSG_POSITION";
                break;
            case "timerform_wrapper":
                var key = "FORM_POSITION";
                break;
            case "ttq_history":
                var key = "HISTORY_POSITION";
                break;
            case "ttq_tasklist":
            default:
                var key = "LIST_POSITION";
                break;
        }
        setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
    }
    dragObject = null;
    iMouseDown = false;
}

function mouseDown(ev){
var mousePos = mouseCoords(ev);
    var target = ev.target;
    iMouseDown = true;
    if(target.getAttribute('DragObj')){
        return false;
    }
}

function makeDraggable(item){
    if(!item) return;
    item.addEventListener("mousedown",function(ev){
        dragObject  = this.parentNode;
        mouseOffset = getMouseOffset(this.parentNode, ev);
        return false;
    }, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/
function printMsg(sMsg,bError) {
    _log(4, "-> printMsg()");
    var oDate = new Date();
    var sWhen = oDate.toLocaleString() + "\n";
    _log(1, sWhen + sMsg);
    //alert(sMsg);

    // delete old message
    var oOldMessage = $("ttq_message");
    if(oOldMessage) {
        _log(4, "Removing the old message." +oOldMessage);
        oOldMessage.parentNode.removeChild(oOldMessage);
    }

    // here we generate a link which closes the message
    var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

    var sBgColor = (bError) ? "#FFB89F" : "#90FF8F";
    var oMsgBox = document.createElement("div");
    //oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
    oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
    oMsgBox.style.backgroundColor = sBgColor;
    var msgCoords = getOption("MSG_POSITION", "215px_215px");
    msgCoords = msgCoords.split("_");
    oMsgBox.style.top = msgCoords[0];
    oMsgBox.style.left = msgCoords[1];
    oMsgBox.id = "ttq_message";
    document.body.appendChild(oMsgBox);
    makeDraggable($('ttq_draghandle_msg'));
    _log(4, "<- printMsg()");
}

/********************************************************************************/
function hideMsg() {
    _log(4, "-> hideMsg()");
    var oMsgBox = $("ttq_message");
    document.body.removeChild(oMsgBox);
    _log(4, "<- hideMsg()");
}

/********************************************************************************/
function refreshHistory(aTasks) {
    _log(3, "-> refreshHistory()");

    // Remove old history
        var oldHistory = $("ttq_history");
        if(oldHistory) {document.body.removeChild(oldHistory)};

    // If there are no tasks in the history, return
        if(!aTasks || aTasks.length < 1) { return; }

        var sTime = "";

    // Create new tasklist
        var history = document.createElement('div');
        history.id = "ttq_history";
        history.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >" + t("Task History") + "</div>";

    // Position the list
        var listCoords = "200px_687px"; //getOption("HISTORY_POSITION", "200px_687px");
        listCoords = listCoords.split("_");
        history.style.top = listCoords[0];
        history.style.left = listCoords[1];

        document.body.appendChild(history);

        makeDraggable($('ttq_history_draghandle'));

//        //get the server time offset once
//        if(bUseServerTime) {
//                var iServerTimeOffset = getServerTimeOffset();
//        } else {
                var iServerTimeOffset = false;
//        }

        for(var i = 0; i < aTasks.length; i++) {
                var aThisTask = aTasks[i].split(",");
                history.appendChild( makeHistoryRow(aThisTask, i, iServerTimeOffset) );
                //var oTaskTimeSpan = $("ttq_history_tasktime_" +i);
                //if(oTaskTimeSpan) { oTaskTimeSpan.addEventListener("click", editTime, false); }
        }

        orderList(1, "ttq_history_row");

    // flush link
        var oFlushLink = document.createElement('a');
        oFlushLink.id = 'ttq_flush_history';
        oFlushLink.innerHTML = t('flush history');
        oFlushLink.href = '#';
        history.appendChild(oFlushLink);
        oFlushLink.addEventListener('click', flushHistory, false);
}

/********************************************************************************/
function makeHistoryRow(aTask, index, iServerTimeOffset) {
    _log(4, "-> makeHistoryRow()");
    var village = getVillageByNewdid(aTask[4]);
    if (!village) {
        extractVillageList();
        village = getVillageByNewdid(aTask[4]);
    }

//                if(bUseServerTime && iServerTimeOffset != false) {
//                        //create timestamp for the tasktime offset to server time
//                        var iTaskServerTimestamp = ( parseInt(aTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
//                        var oDate = new Date(iTaskServerTimestamp);
//                        var sTime = oDate.toGMTString();
//                        sTime = sTime.substring(0, sTime.length - 4);
//                        sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is the server time.' ttq_taskid='" +index+ "' >" + sTime + "</span>";
//                } else {  //local time
                        var oDate = new Date( parseInt(aTask[1]) * 1000 );
                        var sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is your local time.' ttq_taskid='" +index+ "' >" + oDate.toLocaleString() + "</span>";
//                }

                var historyRow = document.createElement("div");
                historyRow.id        = "ttq_history_row_" +index;
                historyRow.className = "ttq_history_row";
                historyRow.setAttribute( "tasktype"   , aTask[0] );
                historyRow.setAttribute( "timestamp"  , aTask[1] );
                historyRow.setAttribute( "tasktarget" , aTask[2] );
                historyRow.setAttribute( "taskoptions", aTask[3] );
                historyRow.setAttribute( "villagedid" , aTask[4] );

                var sTaskSubject = "";
                var sTask = "";
                var sTaskMoreInfo = "";
                switch(aTask[0]) {
                    case "0":  //build
                    case "1":  //upgrade
                        sTaskSubject = aLangBuildings[aTask[3]];
                        sTask = aLangTasks[aTask[0]];
                        sTaskMoreInfo = t("at site no.") + " " +aTask[2];
                        break;

                    case "2":  //attack
                        sTaskSubject = '<span id="ttq_placename_history_' +aTask[2]+ '">' + getPlaceName(aTask[2]) + '</span>';
                        if(sTaskSubject == '') {sTaskSubject = aTask[2]};
                        var aTroops = aTask[3].split("_");
                        if(onlySpies(aTroops)) {
                                sTask = t("Spy");
                        } else {
                                var iIndex = parseInt(aTroops[0]) + 18;
                                if(iIndex == 20) sTask = t('Support');
                                if(iIndex == 21) sTask = t('Attack');
                                if(iIndex == 22) sTask = t('Raid');
                        }
                        sTaskMoreInfo = getTroopsInfo(aTroops);
                        break;

                    case "3":  //research
                        sTaskSubject = aLangTroops[iMyRace][aTask[3]-1];
                        sTask = aLangTasks[aTask[0]];
                        break;

                    case "4":
                        sTaskSubject = getTroopsInfo(aTask[3].split("_"));
                        sTask = aLangTasks[4];

                    case "6":
                        sTask = "Throw ";
                        sTaskSubject = aTask[3] + ' Celebration';

                        break;
                    default:
                        break;
                }

                var sBgColor = (aTask[5] == "true") ? "#90FF8F" : "#FFB89F";
                historyRow.style.backgroundColor = sBgColor;

                //var sVillageName = '';
                //if(aTask[4] != 'null') {
                //    sVillageName = " &mdash; " + village.villaName; // getVillageName(aTask[4]);
                //    //sVillageName = " &mdash; " + aTask[5].villaName // getVillageName(aTask[4]);
                //}

                historyRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'> &mdash; " +village.villaName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";

                oDate = null;

    _log(4, "<- makeHistoryRow()");
    return(historyRow);
}

/*
 * @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
 *******************************************************************************/
function orderList (iOrderBy, sRowId) {
    //var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
    var rows = find('//div[contains(@id, "' +sRowId+ '")]',XPList);
    if(rows.snapshotLength > 0) {
        switch(iOrderBy) {
            case 0:
                var sortKey = "tasktype";
                break;
            case 2:
                var sortKey = "target";
                break;
            case 3:
                var sortKey = "options";
                break;
            case 4:
                var sortKey = "villagedid";
                break;
            case 1:
            default:
                var sortKey = "timestamp";
                break;
        }
        var keyValue = "";
        var aRows = [];
        for(var i = 0; i < rows.snapshotLength; i++) {
            keyValue = rows.snapshotItem(i).getAttribute(sortKey);
            aRows.push([keyValue, rows.snapshotItem(i)]);
        }
        aRows.sort(sortArray);
        switch(sRowId) {
            case "ttq_history_row":
                aRows.forEach(processSortedHistory);
                break;
            case "ttq_task_row":
            default:
                aRows.forEach(processSortedTaskList);
                break;
        }

        return false;
    } else {
        return;
    }

}

/**
 * Adds task to the log DIV.
 * @param bSuccess: true if the task was successfully performed.
 ********************************************************************************/
function addToHistory(aTask, bSuccess) {
    _log(3, "Adding to history... [iHistoryLength|" + iHistoryLength);
    if(iHistoryLength < 1) { return; }

    bLockedHistory = true;
    var data = readCookie("TAB_HISTORY");

    if(data != '' && data.length > 0) {
        var oldValue = trimHistory(data, iHistoryLength-1) + "|";
    }else{
        var oldValue = '';
    }

    var newValue = oldValue + aTask[0] + ',' + aTask[1] + ',' + aTask[2] + ',' + aTask[3];
    if(aTask[4]) {
        newValue += ',' + aTask[4];
    } else {
        newValue += ',' + 'null';
    }

    newValue += ',' + bSuccess;
    _log(3, "Writing cookie TAB_HISTORY: "+newValue);
    if(!createCookie("TAB_HISTORY", newValue, 365)) {
        _log(3, "Failed logging to history.")
    }
    bLockedHistory = false;
    aTasks = newValue.split("|");
    refreshHistory(aTasks);
    return;
}

/**
 * This only trims the value read from cookie. Cookie itself is trimmed when new event is entered into history.
 * It trimms the value down to maxlength.
 ********************************************************************************/
function trimHistory(data, maxlength) {
    if(data != '' && data.length > 0) {
        //trim history as needed
        data = data.split("|");
        var excessTasks = data.length - maxlength;
        if(excessTasks >  0) {
            data.splice(0, excessTasks);
        }
        return data.join("|");
    }
    return data;
}

/********************************************************************************/
function flushHistory() {
    createCookie("TAB_HISTORY", "");
    refreshHistory();
}

/********************************************************************************/
//function editTime(ev) {
//    var oTaskRow    = ev.target.parentNode.parentNode;
//    var type        = parseInt(oTaskRow.getAttribute("tasktype"));
//    var timestamp   = oTaskRow.getAttribute("timestamp");
//    var target      = oTaskRow.getAttribute("tasktarget");
//    var options     = oTaskRow.getAttribute("taskoptions").split("_");;
//    var villagedid  = oTaskRow.getAttribute("villagedid");  //not supported yet. The new task will have did of currently active village.
//
//    displayTimerForm(type, target, options, timestamp);
//}

/********************************************************************************/
function sortArray(arr1,arr2)           { return arr1[0] - arr2[0];                  }
function processSortedTaskList(element) { $("ttq_tasklist").appendChild(element[1]); }
function processSortedHistory( element) { $("ttq_history" ).appendChild(element[1]); }


/**
 * @param key: name of the parameter in the cookie.
 * @param defaultValue: this is returned if the parameter is not found in the cookie.
 * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
 ********************************************************************************/
function getOption(key, defaultValue, type) {
    var options = readCookie('TAB_OPTIONS');
        options = options.split(",");
    var myOption = options.indexOf(key);
    if (myOption < 0) {return defaultValue;}
    switch(type) {
        case "boolean":
            var myOption = ( options[myOption + 1] == "true") ? true:false;
            break;
        case "integer":
            var myOption = parseInt(options[myOption + 1]);
            break;
        case "string":
        default:
            var myOption = options[myOption + 1];
            break;
    }
    return myOption;
}

/********************************************************************************/
function setOption(key, value) {
    var options = readCookie("TAB_OPTIONS");
    if(options != '') options = options.split(",");
    else options = [];
    var myOption = options.indexOf(key);
    if(myOption < 0) {
        options.push(key);
        options.push(value);
    } else {
        options[myOption + 1] = value;
    }
    options.join(",");
    createCookie("TAB_OPTIONS", options, 365);
}

/********************************************************************************/
function readCookie(name) {
    _log(4, "-> readCookie()");
    if(!name) { return(''); } //{var name = "TAB_TASKS";}
    var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
    var data = reg.exec(document.cookie);
    if (data == null || data.length <= 1) {
        return '';
    }
    return data[1];
    _log(4, "<- readCookie()");
}

/********************************************************************************/
function createCookie(name,value,days) {
    _log(4, "-> createCookie()");
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";

    document.cookie = name+"="+value+expires+"; path=/";

    _log(4, "<- createCookie()");
    return true;
}

/********************************************************************************/
function t(str) {
    var index = aLangStringsMaster.indexOf(str);
    var sTranslatedStr =  aLangStrings[index];
    if(sTranslatedStr) {
        return sTranslatedStr;
    } else {
        return str;
    }
}

/****
/**** End Taks Queue Stuff
/****
/********************************************************************************/

/********************************************************************************/
function onLoad() {
    _log(3, "-> onLoad()");

    // Add the Auto Build Link
    AddAutoBuilderQuickLink();

    // Show the history form, if any
        data = readCookie("TAB_HISTORY");
        if(iHistoryLength > 0 && data != '') {
            var aTasks = trimHistory(data, iHistoryLength).split("|");
            refreshHistory(aTasks);
        }

    _log(3, "<- onLoad()");
}

// --- Main Code Block ---
_log(0, "AutoBuild loaded");
window.addEventListener( 'load', onLoad, false);