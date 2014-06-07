// ==UserScript==
// @name                WOLF AE Extras
// @namespace          http://www.wrathofgods.net/
// @description         Various user interface enhancements for the Astro Empires MMOG (www.astroempires.com)
// @include             http://*.astroempires.com/*
// @include             http://www.wrathofgods.net/*
// @exclude             http://*.astroempires.com/
// @exclude             http://*.astroempires.com/home.aspx*
// @exclude             http://*.astroempires.com/login.aspx*
// @exclude             http://*.astroempires.com/profile.aspx?action=*
// @exclude             http://forum.astroempires.com/*
// @exclude             http://support.astroempires.com/*
// @exclude             http://wiki.astroempires.com/*
// @exclude             http://wiki.astroempires.com/*/*
// @exclude             http://*.astroempires.com/upgrade.aspx*
// @exclude             http://*.astroempires.com/tables.aspx*
// @exclude		   http://*.astroempires.com/smilies.aspx*
// ==/UserScript==
/*
AE Extras Creator -- knubile (May 2008)
AE Extras Coder -- Cold-Phoenix (Sep 6, 2008)
AE Extras WoG Edit -- Mapleson (Apr 10, 2009)
AE Extras WoG Edit(After Sever Layout Change) -- Vig (May 23, 2009)

----------------------
Task list
-----------------------

-Add a link to JG list, or a JG liist to the movemnet screen of JG's in the area. For faster fleet movment.
-Erics number math issue due to his OS language (Portuguese,) Perhaps its a time issue?
-If there is announcments, Flash them accross the screen of the user to make sure they read it.
- More color Options (color each type of commander, to being able to individually recolor the title and coordinates of each of my bases)
-Option to set Arrival/Leaving time for auto launch as local time instead of server time.
-Option ot hide/show TR's that meet the +/- requirments (mke the screen less cluttered
-Broken Stuff on the new Style
	

----------------------
Completed Tasks By Vig
-----------------------
------May 24th------
-Fixed The fleet summary
-Added the IRC/Forum links to the top
-Fixed Individual fleet summaries (attacking/total)
-Added the auto launch feature
------May 26th------
-Added setting to enable/disable the autolaunch code
-Removed the Timer Helper and Coundown options and script because it has been replaced with the auto launch
-Fixed disbanning of fleet
-Fixed the Capacities setting that is used by the enhanced production script (doesn't work for free accounts since you have to go to the capacities page)
-Fixed Enhanced Production time presets to work correctly
-Added Player Name feild in settings below the guild feild, this is auto detected when you visit your profile and is used as you nick when you click on the IRC link
-Fixed a bug with highlighting trading partners (was only logging every other trade partner due to layout change)
-Fixed a bug with the empier fleet page (wasn't displaying the extras due to layout change)
-Added setting to turn DB auto uploading on and off (recomended to be on at all times)
-Fix the Auto Launcher to properly use arrive time(Please Note this only work for times on the same day ie. if it is June 30th server time you must enter a time that is still on june 30th for the arrival time. I will be looking into fixing this for multiple days).
-Fixed the Battlecalculator (the one that shows you the results before you confirm you attack)
-Made support ships names appear in red when you try to attack with them.
-Fixed the Replacingg of the Asterix and shows the Amount
------June 8th------
-Added to fleet summary a total of the players personal fleet. It does not affect the total fleet count for that guild! (Also allows you to hide everyone else fleet and just see yours)
-Added check so that you can only upload data to the woG DB in the fenix galaxy.(no more trying to uplaod gamma data to WoGs DB :P)
-Fixed the Pillage for each base to calcualte and show properly (AE Layout changes broke it).
-Added Profit/loss calculation for all attacks (after you make an attack, in your messages and on the guild combat board) The Profit FOR THE ATTACKER is shown at the bottom and highlights profits in green, losses in red. (Formating can change if people hate it :P)
-Some Layout changes on the Settings page for the script.
- Fixed the Advanced Structors page goal editing (layout change broke it)
-General Script Cleaning (you wont notice this :P)
-Added estimated losses and estimated debris to the Attack confirmation screen. Which will allso show you the estimated profit/losses. I cant add the Estimated pillage to this calculation because that information is not available on that page.
-Fixed a bug with the moving of Galaxy Links to the bottom of the page after a fleet was moved.
------June 13th------
-Fixed a Layout issue for the DB upload. Uploads Data correctly now.
------June 19th------
-Fixed a bug with the Estimated losses and estimated debris. Happend when attacking a base where you destroyed the turrets, would miscalculate the values.
-Fixed the built in battle calculator to be as accurate as the battle calculator on wogs site.
-Bug Fix for showing derbis pile amounts in Gamma
-Added an aditional timer to the top of the page that shows your current local time. Aslo added settings to turn this on and off. Note that it will use what ever your computer clock is set to, so if its off then that counter will be to :P It also shows the difference you are from the server time. '-' for behind '+' for ahead.
-Did some manual garbage collection in the hopes of making the timers more accurate. (seems to have worked i left my counter running for 18 hours and it was only 8 min off)
-Added the smile pop up page to the excluded list. (quick bookmarks were showing up there and covering the smilies >.<)
-Fixed a bug with battle report profit calculations where if the attacker lost level protection it would fail to calculate the profit/losses as well as a bug when a UC attacked you, it would break.
------July 4th------
-Fixed Fleet count, counting doulbe for player if they are unguilded.
-Added functionality that will check the users current script version against the latest version posted on the site. If there is a newer version, the script will promt the user to visit the forums and get the latest version. It checks this once every 24 hours. ( Thanks to Rhom for testing alternate ways of doing this)
-Also added a button on the settings called "Check For Updates" When clicked it will check for a newer version and prompt the user if there is one. 
-Added the ability to color the different commander types. In settings there is an option to Highlight commanders, then a list of the different types of commanders and a box to put in a color. When enabled it will highlight the commanders name with the approproate color for his job. Thanks to Empathy for helping with the colors (since i suck at picking them)
-Fix a production preset bug that would not update the time and cost correctly.
- Fixed a bug on the sum credits page for Trad rouets. (Thanks Rhom!)
-Fixed a bug so that when you click on the Forum link, Chat link and battle calc link so they dont load in the same tab.
-Tweaked the quick production page by adding 2 more values to the quantity selcector (500 and 12 hours) as well as replaced the bases econ with its production capacity raw and in brackets its production capacity with commander.
- Fixed a bug that wouldn't let you queue research with the advanced construction setting enabled, if that research base could be linked to another (Fucking odd bug lol)
-Fixed a bug that would exclude Capitals from having the quick queue link in the advanced construction screen.
------July 18th------
-Rhom Added to the Advanced Structures page a new color setting that will highlight completed tasks in a user specified color. As well he added the ability to hover over tasks that are progressing and it will show your progress.
-Added Attacker/Defender Tech Levels to the "Confirm Attack" screen. Before  you attack, below the Defensive Force table, another table will appear that will list the known Attackers Tech and the known defenders tech (If they dont have a unit that ses that tech it wont be in the table).
-Fixed a bug with the adcanced structurs page where saving the description of each button would fail and result in saving a 0.
-More Manual garbage collection in an attempt to improve the accuracy of the timers.
-Fixed several bugs due to the new Language release (theses bugs were only present if you used the new language!)  The bugs were Timers at the top, Commander Highlighting, Base Pillage Adding, Enhanced queue display
	Everything else seems to be working but if you use the new language and find bugs please let me know :)
-Added Something for Free accounts!!!!!!!!! I added a way for free accounts to have a capacities page on their empier menu. It looks identicle to that of the upgraded page but the way you populate it is vastly different.You MUST go to the overview page of each base in order for them to show up on the capacities page.  And to update the information about a base you MUST visit the overview page for that base. I will be looking at addind a button on the capacities page to do this for you but for now you need to do it manually, and hey its better than having no capacities page ;)
-Fixed a bug where the stucture/research quick qeue links were not showing (due to AE page layout change) 
-Fixed a bug with Production page presets(sue to AE pate layout change)]
------July 25th------
-SirPsycho changed the script for uploading data to the WoG DB. Now you will not have to hit back twice after uploading data to our DB. :D
-SirPsycho added a pop up that will display the units that are in a fleet (so you dont have to click on the fleet to see them). A box pops up beside your mouse position that displayed the units in that fleet.
-Added to the fleet info pop up by making it look nicer and adding a timer to remove all poped up items after x amount of time. I Also added a setting to disable/enable this as well as specify how long a popup remains before it dissapears.
-Fixed some rounding issues with the built in battle calc and tech finder.
-Added. When viewing a astro from the map (not the details) replaced the location text with a text box with the location in it for easy copying. Note: When you click on the text box it automatically selects the entier location. You dont need to :D Example: http://img406.imageshack.us/img406/6374/textboxexamplec.jpg

-Fixed several things for the new layout:
	-Fixed the timers at the top to display and animate correctly
	-Fixed Trade Route Highlighting
	-Fixed the forum,chat,settings links at the top to show correctly
	(Lots more to fix)
------August 1st------
-Made it so the fleet info pop up also works on the scanners page.
-Added an option to turn the fleet popup's fading on and off.
-Added better fleet info placement, It will now never appear "off screen".
-Fixed a bug with the Tech table that is shown before you attack. Was not calculating disruptor tech properly
-Re added the Update button for db uploading (it got accidently removed with the last change)
-Increased the amount of time you need to hover over a fleet name to get the pop up to show  to 400 miliseconds(this is because i noticed they would some times pop up when you were just moving you mouse accross the screen and hovered over a few in passing)
-Fixed several things for the new layout:
	-Fixed the bases page if you had the "Move Galaxy List to bottom" option selected. It would remove the base list.
	-Fixed the base/fleet link panel that shows up beside the map to show properly.
	-Individual fleet summary
	-Estimated pilalge
	-Fixed the Layout for the structures,defenses,production and research pages so that the images on the new style no longer make it look wierd
	-Fixed the Enhanced queue display so that it no longer covers up parts of building/porduction/research tables
	-Fixed the production presets.
	-Commander Highlighting
	-Free account capacities setting
	-Fixed the notify function to display messages properly in the center of the screen.
----------------------
Disclaimer
----------------------
Certain parts of this script are taken from other similer projects, all rights
 on those sections are owned by their respective creators.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
For a full copy of the GNU General Public License, see
http://www.gnu.org/licenses/.

*/

var DEBUGNEWCODE = 0;

var scriptName='WOLF AE Extras';
var scriptId='33239';
var scriptVersion=1.14;
var chatlink='http://widget.mibbit.com/?server=webirc.gamesurge.net:6007&channel=%23astroempires&noServerTab=false&autoConnect=true&settings=a36161039325081878395953ba30902c&newnick=';
//==========================================
//Debug Setup
//==========================================
var DEBUG_KEY = "config_debug";
var LOG_LEVEL_KEY = "config_logLevel";

var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_INFO = 2;
var LOG_LEVEL_WARN = 3;
var LOG_LEVEL_ERROR = 4;

var location = window.location.href;
var _site = getSite();
var _page = getPageType();
var LOG_LEVEL = parseNum(getSetting(LOG_LEVEL_KEY,0));

if(!getSetting(DEBUG_KEY,false)) LOG_LEVEL = 0;
if(DEBUGNEWCODE) LOG_LEVEL = 4;
// console = ff, unsafewindow.console = firebug, else custom

try{
    var debugwith;
    if((console && console.log) || (unsafeWindow.console && unsafeWindow.console.log)) debugwith = "firefox";
    if(unsafeWindow.console && unsafeWindow.console.firebug) debugwith = "firebug";
    var console = {
        log: function () // Basic logging function for loading etc
        {
            if( LOG_LEVEL >= 1 && debugwith == "firebug" ) {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 1 && debugwith == "firefox" )
            {
                unsafeWindow.console.log( "Location: "+location+" \nLog: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 1 && !debugwith ) { notify( "\nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        info: function () // Show data relevent to any functions being worked on
        {
            if( LOG_LEVEL >= 2 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 2 && debugwith == "firefox" )
            {
                console.log( "Location: "+location+" \nInfo: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 2 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        warn: function () // Show any non-fatal errors
        {
            if( LOG_LEVEL >= 3 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 3 && debugwith == "firefox" ) { console.log( "Location: "+location+" \nWarning: "+arguments ); return; }
            if( LOG_LEVEL >= 3 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        error: function () // If error is breaking entire script
        {
            if( LOG_LEVEL == 4 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL == 4 && debugwith == "firefox" ) { console.log( "Location: "+location+" \nError: "+arguments ); return; }
            if( LOG_LEVEL == 4 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
/*        },
        "assert": function () // Tests a var and errors
        {
            return;
        },
        debug: function ()
        {
            return;
        },
        dir: function ()
        {
            return;
        },
        dirxml: function ()
        {
            return;
        },
        trace: function ()
        {
            return;
        },
        group: function ()
        {
            return;
        },
        groupEnd: function ()
        {
            return;
        },
        time: function ()
        {
            return;
        },
        timeEnd: function ()
        {
            return;
        },
        profile: function ()
        {
            return;
        },
        profileEnd: function ()
        {
            return;
        },
        count: function ()
        {
            return;*/
        }
    };

} catch (e) {notify("Console exception: "+e,MESSAGE_CLASS_ERROR);}

if(document.title.indexOf("Error")!= -1) return; // try to break out if connections down to avoid messing up error page

if (DEBUGNEWCODE) console.log("Log level: "+LOG_LEVEL+" Server: "+ getServer());

if (DEBUGNEWCODE) // Test save to check if functional
{
    setSetting("test","working");
    var val = getSetting("test","BROKEN");
    if (val !="working") console.log("Debug Test Save "+val);
}

//==========================================
//-----------Preset Definitions-------------
//==========================================

//NOTE: These are simpy defaults. There's no need to edit these here in the script.
//All names and values are configurable from the production page.


var PRESET_KEYS = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate",
"Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods");
var DEFAULT_PRESET_1 = "500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_2 = "50,0,0,0,20,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_3 = "60,0,0,0,0,0,0,0,0,0,0,8,0,4,0,0,0,0,0,0,0";
var DEFAULT_PRESET_4 = "120,0,0,0,0,0,0,0,0,0,0,16,0,8,0,0,0,0,0,0,0";
var DEFAULT_PRESET_NAME_1 = "Fighters";
var DEFAULT_PRESET_NAME_2 = "Light Fleet";
var DEFAULT_PRESET_NAME_3 = "Heavy Fleet";
var DEFAULT_PRESET_NAME_4 = "Double Heavy Fleet";
var PRESET_1_NAME_KEY = "PRESET_1_NAME";
var PRESET_2_NAME_KEY = "PRESET_2_NAME";
var PRESET_3_NAME_KEY = "PRESET_3_NAME";
var PRESET_4_NAME_KEY = "PRESET_4_NAME";
var PRESET_1_VALUE_KEY = "PRESET_1_VALUE";
var PRESET_2_VALUE_KEY = "PRESET_2_VALUE";
var PRESET_3_VALUE_KEY = "PRESET_3_VALUE";
var PRESET_4_VALUE_KEY = "PRESET_4_VALUE";

var BASE_LIST_KEY = "BaseList";
var MESSAGE_CLASS = "notifier";
var MESSAGE_CLASS_ERROR = "notifierError";
GM_addStyle('.notifier {'
        +'  background-color: Black;'
        +'  border: solid 1px;'
        +'  padding: 10px 10px 10px 10px;'
        +'}'
    +'.notifierError {'
        +'  background-color: Black;'
        +'  border: solid 2px;'
        +'  color: red;'
        +'  padding: 10px 10px 10px 10px;'
        +'}'
    +'hr.cphr {'
        +'  color: orange;'
        +'  width: 400px;'
        +'}'
    +'.cpscripttimes {'
        +'  text-align: center;'
        +'  margin:0 auto;'
        +'  width:200px;'
        +'  background-color: #191919;'
        +'  border: #333333 solid 1px;'
        +'  padding-bottom: 10px;'
        +'  color: white;'
        +'  margin-top: 10px;'
        +'  font-size: 8px;'
        +'  opacity: 0.82;'
        +'  z-index: 0;'
        +'}'
    +'#gm_update_alert {'
        +'  position: relative;'
        +'  top: 0px;'
        +'  left: 0px;'
        +'  margin:0 auto;'
        +'  width:'+getTableWidth()+'px;'
        +'  background-color: #191919;'
        +'  text-align: center;'
        +'  font-size: 11px;'
        +'  font-family: Tahoma;'
        +'  border: #333333 solid 1px;'
        +'  margin-bottom: 10px;'
        +'  padding-left: 0px;'
        +'  padding-right: 0px;'
        +'  padding-top: 10px;'
        +'  padding-bottom: 10px;'
        +'  opacity: 0.82;'
        +'}'
    +'.gm_update_alert_buttons {'
        +'  position: relative;'
        +'  top: -5px;'
        +'  margin: 5px;'
        +'}'
    +'#gm_update_alert_button_close {'
        +'  position: absolute;'
        +'  right: 20px;'
        +'  top: 20px;'
        +'  padding: 3px 5px 3px 5px;'
        +'  border-style: outset;'
        +'  border-width: thin;'
        +'  z-index: 11;'
        +'  background-color: orange;'
        +'  color: #FFFFFF;'
        +'  cursor:pointer;'
        +'}'
    +'.gm_update_alert_buttons span, .gm_update_alert_buttons span a  {'
        +'  text-decoration:underline;'
        +'  color: #003399;'
        +'  font-weight: bold;'
        +'  cursor:pointer;'
        +'}'
    +'.gm_update_alert_buttons span a:hover  {'
        +'  text-decoration:underline;'
        +'  color: #990033;'
        +'  font-weight: bold;'
        +'  cursor:pointer;'
        +'}'
    +'#gm_update_title {'
        +'  font-weight:bold;'
        +'  color:orange;'
        +'}'
    +'#queueFooter {'
        +'  z-index:4;'
        +'  position: fixed;'
        +'  clear: both;'
        +'  width: 100%;'
        +'  bottom: 0px;'
        +'  left: 0px;'
        +'  align: center;'
        +'}');
var totalStart = new Date();
var startTime = totalStart;
var endTime;
var timerMessage = "";

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
var shipDefaultArmour = new Array(2,2,4,4,4,2,8,12,12,2,4,24,24,48,128,96,512,2048,6600,13500,4,8,16,24,32,64,256,512,2048,1024);
var shipDefaultPower = new Array(2,4,10,10,4,2,8,12,12,1,2,24,12,48,168,64,756,3402,10000,25500,4,8,16,24,32,64,256,2,4,2048);
var shipDefaultShield = new Array(0,0,0,1,0,0,0,0,1,0,0,2,2,4,10,8,20,30,40,60,0,0,0,0,2,6,8,16,20,12);

//Tech in order, Laser, Missile, Plasma, Ion, Photon, Disruptor, Armour, Shielding
var shipWeaponTechIndex = new Array(0,1,2,3,0,0,2,1,3,0,0,2,1,2,3,3,4,5,4,5,0,0,1,2,3,4,5,3,3,4);
//==========================================
// Check if new install
//==========================================
function installCheck(){
    try{
       var OldVersion = parseFloat(GM_getValue("scriptVersion",0+""));
       var NewVersion = parseFloat(scriptVersion);
	   var LatestVersion = 0.0;
	   var lastCheck = parseInt(GM_getValue("updateCheckTime",0+""));
	   var currTime = (new Date).getTime();
	   //console.log("LastChecked: " + lastCheck);
	   //console.log("Current Time: " + currTime);
	   //console.log("Difference: " + (currTime - lastCheck));
	   //console.log(scriptVersion);
	   if(lastCheck == 0 || Math.abs(currTime - lastCheck) > 86400000 )
	   {
			GM_setValue("updateCheckTime",currTime+"");
			console.log("ping");
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://www.wrathofgods.net/Sources/tools/WoGAEBitsScriptInfo.txt',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/scriptVersion+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
					console.log(responseDetails.responseText);
					LatestVersion = parseFloat(responseDetails.responseText.substring(responseDetails.responseText.indexOf(":")+1));
			        console.log(LatestVersion);
					if(OldVersion < LatestVersion)
					{
						insertNotification("There is a new version of WoG AE Bits available!<br/> Please go <a target='_blank' href='http://www.wrathofgods.net/index.php?board=6.0'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+"<br/> Your Version: "+OldVersion+"<br/>");
						
					}
			    }
			});		
	   }       
       if (OldVersion==null || OldVersion==""){	   
           GM_setValue("scriptVersion",NewVersion+"");		   
           if(GM_listValues() == null || GM_listValues() == "") resetConfig("newInstall");
           insertNotification("You have sucessfully installed "+scriptName+" Version: "+NewVersion+" to your web browser.<br />");
           return;
       } else if (NewVersion>OldVersion){
           //console.log(NewVersion);
           GM_setValue("scriptVersion",NewVersion+"");
           insertNotification("You have sucessfully upgraded "+scriptName+" From ("+OldVersion+") To ("+NewVersion+").<br />");
       }
	   delete OldVersion;
	   delete NewVersion;
	   delete LatestVersion;
	   delete lastCheck;
	   delete currTime;
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\ninstallCheck(): "+e); }
}
//==========================================
//---------Common Functions-----------
//==========================================

function getPlayerName(name){
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else return name;
}
function getGuild(name){
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    //console.log(result);
    if(result)
    return result[0];
    else return name;
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

//From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount){
    var delimiter = unescape(getSetting(NUMBER_DELIMETER_KEY,","));
    //console.log("Delimeter:" +delimiter);
    amount = ""+amount;
    var a = amount.split('.',2)
    var d = a[1];
    var i = parseNum(a[0]);
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

function getSite(){
    if(location.indexOf('astroempires.com')!=-1) {
        return "ae";
    }
    else
    {
        return "battlecalc";
    }
}

// new since 2.4 - thanks to BishopGumby
function parseNum(s) {
    try{
        s += '';
        return parseInt(s.replace(/,/g,''))
    } catch (e) { console.log ('parseNum('+s+') error '+e); return s }
}

function isNewStyle()
{
	
	if(document.getElementById('background-container') || document.getElementById('background-content'))
	{
		return true;
	}
	else
	{
		return false;
	}
}

//==========================================
//Get/Set Functions
//Prefixes server name to settings
//==========================================
function getSetting(key,value){
    try
    {
        if (typeof value == "float") value+="";
        return GM_getValue(getServer()+"_"+key,value);
    } catch (e) { console.warn ("Line Number: "+e.lineNumber+"\n getSetting error: "+e); console.info("\nKey: "+key+"\nValue: "+value); }
}

function setSetting(key,value){
    try
    {
        if (typeof value == "float") value+="";
        return GM_setValue(getServer()+"_"+key,value);
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n setSetting error: "+e); console.log("\nKey: "+key+"\nValue: "+value); }
}
function getSettingUri(key,value){
        return decodeURI(GM_getValue(getServer()+"_"+key,encodeURI(value)));
}

function setSettingUri(key,value){
        return GM_setValue(getServer()+"_"+key,encodeURI(value));
}
function onFeatureComplete(name){
    if(getSetting(SHOW_EXECUTION_TIME_KEY,false)) {
        var startMilliseconds = startTime.getTime();
        var endMilliseconds = new Date().getTime();
        var difference = endMilliseconds - startMilliseconds;
        //console.log("Execution time: "+ difference +" milliseconds");
        if(difference > 0)
            timerMessage = timerMessage + "<br />"+name+": "+difference;
        startTime = new Date();
    }
}

function displayTimes(){
    var startMilliseconds = totalStart.getTime();
    var endMilliseconds = new Date().getTime();
    var difference = endMilliseconds - startMilliseconds;
    timerMessage = timerMessage + "<br />Total Time: &cong; "+difference;
    //console.info(timerMessage);
    var center = document.createElement("div");
    center.id = "loadtimers";
    center.setAttribute("class","cpscripttimes");
    center.innerHTML = timerMessage;
    document.body.appendChild(center);
	delete cetnter;
	delete startMilliseconds;
	delete endMilliseconds;
	delete difference;
}

//==========================================
//Returns the full server name
//==========================================

var _server = null;
function getServer(){
    //console.log("retreiving server. Server: "+_server);
    if(_server == null && _site == "ae")
    {
        //console.log("setting server. Location: "+window.location);
        var regex = /http:\/\/([a-z]+)\.astroempires\.com/;
        var result = regex.exec(document.referrer);
        //console.log("Result: "+result);
        if(result == null)
        {
            //console.log(document.referrer);
            var regex = /http:\/\/([a-z]+)\.astroempires\.com/;
            result = regex.exec(document.URL);
        }
        if (result != null)
        {
            _server = result[1];
        }
//        else console.log ("Referrer error");
    }
    else if (location.indexOf("free.fr")!=-1)
    {
    _server = "Battlecalc";
    }
    //console.log("Server: "+_server);
    return _server;
}
function getGalaxy(){
    if (_server == null) var _server = getServer();
     return _server.charAt(0).toUpperCase();
}
function getView(){
    var view = location.split("view=",2);
    if(view.length<=1)
        return "";
    view = view[1].split("&")[0];
    view = view.substring(0,1).toUpperCase() + view.substring(1);
    //console.log(view);
    return view;
}
function getPageType()
{
//  console.log("getPageType()");
    if(location.indexOf('empire.aspx')!=-1)
    {
        if(location.indexOf('bases_capacities')!=-1) return 'bases_capacities';
        if(location.indexOf('scanners')!=-1) return 'scanners';
        return 'empire';
    }
    else if(location.indexOf('map.aspx')!=-1)
    {
        switch(window.location.search.length)
        {
            case 17:if(location.indexOf('cmp=')!=-1)return'mapRegion';
            else return'mapAstro';
            case 20:return'mapSystem'
        }
    }
    else if(location.indexOf('base.aspx')!=-1)
    {
        if(location.indexOf('structures')==-1 && location.indexOf('defenses')==-1 && location.indexOf('production')==-1 &&
            location.indexOf('research')==-1 && location.indexOf('trade')==-1 && location.indexOf('base=')!=-1)
        {
            return'baseOverview';
        }
        else return 'other';
    }
    else if(location.indexOf('messages.aspx')!=-1)return'messages';
    else if(location.indexOf('guild.aspx')!=-1)return'guild';
    else if(location.indexOf('profile.aspx')!=-1 && location.indexOf('?player=')==-1)return'profile';
    else return'other'
}
// Find how deep into map we are
function getCurrentLoc()
{
    if (!pagetype) var pagetype = _page;
//  console.log("getCurrentLoc()");
    if(pagetype=='mapGalaxy'||pagetype=='mapRegion'||pagetype=='mapSystem'||pagetype=='mapAstro'||pagetype=='reportSearch')
    {
        var a=loc_re.exec(location);
        if(a)return a[1]
    }
    else if(pagetype=='baseOverview'&&validastrolinks.length)
    {
        return validastrolinks[0][1]
    }
}
// Simple replacement of getelementbyid with $ to save typing
function $(variable)
{
    if(!variable) return;
//  console.log("$("+variable+")");
    if (document.getElementById(variable)) return document.getElementById(variable);
}
//==========================================
//---------Display Functions----------------
//==========================================
//Notifier Utility Code
//http://javascript.nwbox.com/asyncAlert/
//-----------------------------------
var notifycount = 1;

function notify(m,c){
    if($('Message'))
    {
//        console.log("Removing old notify: "+document.body.firstChild.innerHTML);
        document.body.removeChild($('Message'));
    }
//    var msg = "New notify: "+m
//    if(c != null) msg = msg+" Type: "+c;
//    console.log(msg);
//  create a block element
    var b=document.createElement('div');
    b.id='Message';
    b.className=c||'';
//  b.style.cssText='top:-9999px;left:-9999px;position:absolute;white-space:nowrap;';
    b.style.cssText='position:absolute;white-space:nowrap;z-index:10;';
//  classname not passed, set default classname
    if(b.className.length==0){
        b.className = "notifier";
    }
//  insert block in to body
    b=document.body.insertBefore(b,document.body.firstChild);
//  write HTML fragment to it
    b.innerHTML=m;
//  save width/height before hiding
    var bw=b.offsetWidth;
    var bh=b.offsetHeight;
//  hide, move and then show
    b.style.display='none';

    b.style.top = (document.body.clientHeight/2 + window.pageYOffset - bh/2)+"px";
    b.style.left = (document.body.clientWidth/2 + window.pageXOffset - bw/2)+"px";
	
	//console.log( b.style.top);
    //console.log("window height: "+document.body.clientHeight);
    //console.log("window width: "+document.body.clientWidth);
    //console.log("window scroll x: "+window.pageXOffset);
    //console.log("window scroll y: "+window.pageYOffset);

    b.style.display='block';
    var duration = 2000;
    var endOpacity = 0;
    if(c==MESSAGE_CLASS_ERROR)
    {
        b.className = "notifierError";
        b.id='errorMessage';
        var pos = notifycount * 40;
        b.style.top = (document.body.clientHeight/2 + window.pageYOffset - bh/2) - (400 - pos);
        duration = 4000;
        if(DEBUGNEWCODE) duration = 8000;
        endOpacity = 50;
    }
    notifycount++;
    // fadeout block if supported
    setFading(b,100,endOpacity,duration,function(){document.body.removeChild(b);});
}

// apply a fading effect to an object
// by applying changes to its style
// @o = object style
// @b = begin opacity
// @e = end opacity
// @d = duration (millisec)
// @f = function (optional)
function setFading(o,b,e,d,f){
    var t=setInterval(
        function(){
            b=stepFX(b,e,2);
            setOpacity(o,b/100);
            if(b==e){
                if(t){clearInterval(t);t=null;}
                if(typeof f=='function'){f();}
            }
        },d/20
    );
}

// set opacity for element
// @e element
// @o opacity
function setOpacity(e,o){
    // for IE
     e.style.filter='alpha(opacity='+o*100+')';
    // for others
     e.style.opacity=o;
}

// increment/decrement value in steps
// checking for begin and end limits
//@b begin
//@e end
//@s step
function stepFX(b,e,s){
     return b>e?b-s>e?b-s:e:b<e?b+s<e?b+s:e:b;
}
function getTableWidth(){
    var tables = document.evaluate(
    "//table[@class='top']",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0) return 900;
    var topTable = tables.snapshotItem(0);
    return topTable.getAttribute("width");
}
function insertNotification(message){
    if (message != null)
    {
        var notification = document.createElement("div");
        notification.setAttribute('id', 'gm_update_alert');
        var close = document.createElement("div");
        close.setAttribute('id', 'gm_update_alert_button_close');
        close.innerHTML = "Click to hide";
        close.addEventListener('click', function(event) {
                         document.body.removeChild($('gm_update_alert'));
                         document.body.removeChild($('gm_update_alert_button_close'));
                    }, true);
        notification.innerHTML = ''
        +'  <div id="gm_update_title">AE Extras CP Notification</div>'
        +'  <hr class="cphr" /><p>' + message
        +'</p>';
        notification.appendChild(close);
        document.body.insertBefore(notification, document.body.firstChild);
    }
}
function getElementPosition(a)
{
    var x=0;
    var y=0;
    while(1)
    {
        x+=a.offsetLeft;
        y+=a.offsetTop;
        if(!a.offsetParent)break;
        a=a.offsetParent
    }
    return[x,y]
}

//==========================================
//---------Fleet Screen Utilities-----------
//==========================================
//Sums values and modifies fleet table
//------------------------------------------
function sumShips(rows)
{
    try{
    var rows = document.evaluate(
        "//table[@class='layout listing1']/tbody/tr",
         document,
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
    if(getSetting(SHOW_ATTACK_SIZE_KEY,true))
         rows.snapshotItem(0).lastChild.innerHTML = "<a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a>";
    var cells;
    var mobileFleetCount = 0,currentFleetTotal,overallFleetTotal = 0,overallFightingFleetTotal = 0, overallMobileFleetTotal = 0,overallMobileFightingFleetTotal = 0;;
    var fleetUrl;
    for (var i = 1; i < rows.snapshotLength; i++) {
        var row = rows.snapshotItem(i);
        currentFleetTotal = parseNum(rows.snapshotItem(i).lastChild.textContent);
        overallFleetTotal += currentFleetTotal;
        //console.log('Summing fleet '+i);
        cells = document.evaluate(
                ".//td[@style]",
                row,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
        //console.log('Found '+cells.snapshotLength+' cells');
        var shiplocation = row.childNodes[1].textContent;
        var galaxy = row.childNodes[1].firstChild.firstChild.href.split("=")[1].match(/([A-Z])(\d\d)/)[2];
        //console.log(galaxy);
        var galaxyInfoArray = getGalaxyInfoArray(galaxy);
        //console.log('FT: '+cells.snapshotItem(FT_INDEX).textContent);
        var currentFightingFleetTotal = 0,shipTotal;

        //Iterate over all ship amounts in this row and add value to all sums that apply (total,fighting,galaxymobile,mobile)
        for (var j = 0; j < cells.snapshotLength; j++)
        {
            //console.log(cells.snapshotItem(j).textContent);
            if(cells.snapshotItem(j).textContent.length > 0){
                //console.log(sums[j]+' + '+parseNum(cells.snapshotItem(j).textContent));
                shipTotal = parseNum(cells.snapshotItem(j).textContent);
                sums[j] = sums[j]+shipTotal;
                if(isFightingShip(j))
                    currentFightingFleetTotal += shipValues[j] * shipTotal;
                if(!isBase(shiplocation))
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
         if(!isBase(shiplocation))
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
        if(getSetting(SHOW_ATTACK_SIZE_KEY,true))
        rows.snapshotItem(i).lastChild.textContent =currentFightingFleetTotal  +" / "+ rows.snapshotItem(i).lastChild.textContent;
        fleetUrl = rows.snapshotItem(i).firstChild.firstChild.firstChild.href;
        //console.log("fleeturl "+fleetUrl);
        if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
        {
            if(rows.snapshotItem(i).firstChild.nextSibling.firstChild.textContent.charAt(0)!="*")
            {
                var cell = document.createElement("td");
                var content = document.createElement("small");
                content.setAttribute("style","white-space:nowrap;");
                var moveLink = document.createElement("a");
                moveLink.setAttribute("href",fleetUrl+"&view=move");
                moveLink.textContent = "Move";
                content.appendChild(moveLink);
                var seperator = document.createTextNode(" / ");
                content.appendChild(seperator);
                var atkLink = document.createElement("a");
                atkLink.setAttribute("href",fleetUrl+"&view=attack");
                atkLink.textContent = "Attack";
                content.appendChild(atkLink);
                cell.appendChild(content);
                cell.setAttribute("align","center");
//                cell.setAttribute("width","75px");
                row.insertBefore(cell,row.firstChild.nextSibling);
            }
            else
            {
                cell = rows.snapshotItem(i).insertCell(1);
                var content = document.createElement("small");
                content.textContent = "In transit";
                cell.appendChild(content);
                rows.snapshotItem(i).setAttribute("style","background:#664444;");
            }
        }
    }
    if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
    {
        rows.snapshotItem(0).firstChild.setAttribute("colspan","2");
    }
    //console.log('Ship Sums: '+sums);
    //console.log('Mobile ship Sums: '+mobileSums);
    //console.log("Mobile fleet "+overallMobileFleetTotal);
    //console.log("Mobile attack fleet "+overallMobileFightingFleetTotal);
    if(getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true))
    {
        insertTotalsRow(rows.snapshotItem(0).parentNode,sums,totalMobileSums,rows.snapshotLength - 1,
        mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal);
    }
    //console.log(prepareTotalsRow(sums));
	delete sums;
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n sumships error: "+e);  }
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

//==========================================
//Determines if supplied ship type is a fighting ship
//==========================================

function isFightingShip(shipIndex){
     return fightingShips.charAt(shipIndex)=="1";
}

//==========================================
//Inserts totals row in fleet table
//==========================================

function insertTotalsRow(nodeloc,sums,mobileSums,fleetCount,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal){

    //GALAXY ROWS
    for(var i = 0;i<galaxyInfoArrays.length;i++)
    {
        var galaxyInfoArray = galaxyInfoArrays[i];
        if(galaxyInfoArray==undefined || galaxyInfoArray[1] == 0)
            continue;
        var sumRow = document.createElement("tr");
        sumRow.setAttribute('align','center');
        var element = sumRow.insertCell(0);
        if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
        element.textContent = "Mobile Fleets ("+getGalaxy()+i+")";
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
        nodeloc.insertBefore(sumRow,null);
    }
    //MOBILE ROW
    var sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    var element = sumRow.insertCell(0);
    if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
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
    nodeloc.insertBefore(sumRow,null);
    //TOTAL ROW
    sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    element = sumRow.insertCell(0);
    if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
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
    if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) cell.setAttribute("colspan","2");
    sumRow.insertBefore(cell,null);
    nodeloc.insertBefore(sumRow,null);
}
//==========================================
//---------Trade Utilities-----------
//==========================================
//This function finds all nodes for the supplied player name and
//highlights it and appends '(Duplicate)' to the name
//------------------------------------------
var tradeNames = new Array(); //string names of all trade partners
var tradeNodes = new Array(); //element object of all trade partners
function highlightTrade(nameToFind){
    var item;
    //console.log('Searching ' + tradeNodes.length + ' routes');
    for (var i = 0; i < tradeNodes.length; i++) {
        item = tradeNodes[i];
        //console.log(item.innerHTML + " " + nameToFind);
        if(item.innerHTML == nameToFind)
        {
            //console.log('Found node: ' + item.innerHTML);
            item.style.color = 'red';
            item.innerHTML = item.innerHTML + ' (Duplicate)';
        }
    }
}
//==========================================
//Finds all 'small' elements with 'gray' style and determines if
//there are any duplicates. If any are found they are highlighted.
//Two arrays are used. One to hold string names of trade partners in order
//to be sortable. The second holds the actual element objects.
//==========================================
function checkTradePage(){
    //console.log('Checking trade page');
    var allNames, thisName, lastName;
    //Find all trade name elements
    allNames = document.evaluate(
    "//small[@class='gray']",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //Iterate through all and add only odd ones to name and node arrays.
    //console.log ("Allnames: "+allNames);
    for (var i = 0; i < allNames.snapshotLength; i++)
    {
            thisName = allNames.snapshotItem(i);
            if (!tradeNames) var tradeNames = new Array();
            tradeNames.push(thisName.innerHTML);
            tradeNodes.push(thisName);
            //console.log("Individual name: "+thisName.innerHTML);
    }
    //console.log("tn length: "+tradeNames.length);
    tradeNames.sort();
    saveTradePartners(tradeNodes,tradeNames);
    //console.log('Found ' + tradeNodes.length + ' trades.');
    //Iterate through sorted names and compare each to the one before it.
    //If a duplicate is found pass the name to the highlight method to find
    // all element objects and apply highlight.
    for (var i = 1; i < tradeNames.length; i++)
    {
        thisName = tradeNames[i];
        lastName = tradeNames[i-1];
        //console.log(thisName + " " + lastName);
        if(thisName == lastName)
        {
            //console.log('Found duplicate: ' + thisName + " == " + lastName);
            highlightTrade(thisName);
        }
    }
}
//==========================================
//Persist Trade Partners
//==========================================
function saveTradePartners(tradeNodes,tradeNames){
        var saveData = tradeNames[0];
        for (var i = 1; i < tradeNames.length; i++)
        {
            saveData +=";"+tradeNames[i];
        }
        if (saveData == null) saveData = "cpnotrades";
        setSetting('tradePartners',escape(saveData));
        //console.log("Saved Data: "+escape(saveData));
        //console.log("Check saved Data: "+unescape(getSetting('tradePartners')));
        var d = new Date();
        var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
        setSetting('lastTradeCheck', currentTime);
        //console.log ('lastTradeCheck: '+currentTime)
}
//==========================================
//Load Trade Partners
//==========================================
function getTradePartners(){
    var saveData = getSetting('tradePartners');
    if (saveData == "cpnotrades") return null;
    var tradePartners = null;
    if(saveData != null)
    {
        saveData = unescape(saveData);
        //console.log("Check saved Data: "+saveData);
        tradePartners = saveData.split(";");
    }
//  console.log('Loaded ' + tradePartners.length + ' trade partners');
    tradeNames = tradePartners;
    return tradePartners;
}
//==========================================
//Check Trade Partners Data Age
//==========================================
function checkTradeDataAge(){
    if(getSetting('tradePartners') == null)
    {
        insertNotification('Trade partner data has not been set for highlighting.<br />'
        +'   Visit the <a href="empire.aspx?view=trade">trade page</a> to set the information.');
         return;
    }
    //console.log('Trade data check.');
    var lastTradeCheck = parseNum(getSetting('lastTradeCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastTradeCheck: '+lastTradeCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime > (lastTradeCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastTradeCheck + (86400*3)))
    {
        insertNotification('Trade partner data has not been updated in over three days.<br />'
        +'   Visit the <a href="empire.aspx?view=trade">trade page</a> to refresh the information.');
    }
}

//==========================================
//Check Tech Data Age
//==========================================
function checkTechDataAge(){
    //console.log("Checking tech data age.");
    if(getSetting('techData') == null)
    {
        insertNotification('Technology data has not been set.<br />'
        +'   Visit the <a href="empire.aspx?view=technologies">technologies page</a> to set the information.');
        return;
    }
    //console.log('Trade data check.');
    var lastTechCheck = parseNum(getSetting('lastTechCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastTechCheck: '+lastTechCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh tech data: ' + (currentTime > (lastTechCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastTechCheck + (86400*3)))
    {
        insertNotification('Technology data has not been updated in over three days.<br />'
        +'   Visit the <a href="empire.aspx?view=technologies">technologies page</a> to refresh the information.');
    }
}

function getHighlightColorForGuild(guild){
    var myGuildColor = getSetting(MY_GUILD_COLOUR_KEY,null);
    var myGuild = getSetting(MY_GUILD_KEY,null);
    if(myGuild != null && myGuildColor != null)
    {
        myGuild = unescape(myGuild);
        myGuildColor = unescape(myGuildColor);
    }
    //console.log("myguild: "+myGuild+" colour:"+ myGuildColor);
    if(myGuild != null && myGuildColor != null)
    {
        if(myGuild == guild)
        return myGuildColor;
    }
    var guilds = getSetting(ALLIED_GUILDS_KEY,null);
    var guildColor = getSetting(ALLIED_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null)
    {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++)
        {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    var guilds = getSetting(NAPPED_GUILDS_KEY,null);
    var guildColor = getSetting(NAPPED_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null)
    {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++)
        {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    guilds = getSetting(ENEMY_GUILDS_KEY,null);
    guildColor = getSetting(ENEMY_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null)
    {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++)
        {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    return null;
}

//Input is player name without guild name
function getHighlightColorForPlayer(player){
    var playerColors = getSetting(PLAYER_COLORS_KEY,null);
    if(playerColors == null) return;
    playerColors = unescape(playerColors);
    //console.log("colors: "+playerColors);
    var playerArray = playerColors.split(",");
    //console.log("playerArray: "+playerArray);
    for(var i = 0; i < playerArray.length;i++)
    {
        //console.log(playerArray[i].split("=")[0] +" = "+ player);
        if(playerArray[i].split("=")[0] == player)
        {
            //console.log(playerArray[i].split("=")[0] +" = "+ player);
            return playerArray[i].split("=")[1];
        }
    }
    return null;
}
//==========================================
//Checks if supplied name is a trade partner
//==========================================
function isTradePartner(name){
    //console.log("Checking trade partner "+ name);
    if(tradeNames && tradeNames.length == 0)
    {
        tradeNames = getTradePartners();
        //console.log('Searching through ' + tradeNames.length + ' trade partners');
    }
    if(tradeNames == null)
         return false;
    //console.log('Searching through ' + tradeNames.length + ' trade partners');
    for (var i = 0; i < tradeNames.length; i++)
    {
        //document.body.appendChild('Name: '+name + ' + loaded name: '+getPlayerName(tradeNames[i]));
        var strippedName = getPlayerName(tradeNames[i]);
        //console.log('Name: ' +name  + 'loaded name: '+ strippedName);
        if(name.indexOf(strippedName)!=-1)
        {
            //console.log("MATCH");
            return true;
        }
    }
    return false;
}

//==========================================
// Check if guild is not set, give option to hide if unguilded.
//==========================================
function checkGuildDataAge(){
    if(getSetting(AUTOSET_GUILD_KEY,true) != true) return;
    if(getSetting(AUTOSET_GUILD_NOTIFY_KEY,true) != true) return;
    if(location.indexOf("profile.aspx") != -1) return;
    var lastGuildCheck = parseNum(getSetting('lastGuildCheck', "0"));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000);
    if(lastGuildCheck == 0)
    {
        insertNotification('Your guild has not been set for highlighting.<br />'
            +'   Visit the <a href="profile.aspx">profile page</a> to set the information.'
            +'  <div class="gm_update_alert_buttons">'
            +'      <span id="gm_update_alert_button_unguilded"><a href="#">Don&#39;t remind me again</a>'
            +'  </span><span id="gm_update_alert_button_disable"><a href="#">Disable autoset</a>'
            +'  </span> </div>'
            +'</div>');
        $('gm_update_alert_button_disable').addEventListener('click', function(event) {
            setSetting(AUTOSET_GUILD_KEY,false);
            alert("You will not be reminded again. You can re-enable autoset guild in options.");
            document.body.removeChild($('gm_update_alert'));
            }
            , true);
        $('gm_update_alert_button_unguilded').addEventListener('click', function(event) {
            setSetting(AUTOSET_GUILD_NOTIFY_KEY,false);
            alert("You will not be reminded again. You can re-enable autoset guild notify in options.");
            document.body.removeChild($('gm_update_alert'));
            }
            , true);
		delete d;
        return;
    }
 // Unix time in seconds
//    console.log('lastTradeCheck: '+lastGuildCheck);
//    console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime > (lastTradeCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastGuildCheck + (86400*3*7)))
    {
        insertNotification('Guild highlighting data has not been updated in over three weeks.<br />'
        +'   Visit the <a href="profile.aspx">profile page</a> to refresh the information.'
          +'  <div class="gm_update_alert_buttons">'
          +'      <span id="gm_update_alert_button_unguilded"><a href="#">Don&#39;t remind me again'
          +'  / I am not guilded</a></span> </div>'
          +'</div>');
          $('gm_update_alert_button_unguilded').addEventListener('click', function(event) {
          setSetting(AUTOSET_GUILD_KEY,false);
          alert("You will not be reminded again. You can re-enable autoset guild in options.");
          document.body.removeChild($('gm_update_alert'));
          }
          , true);
          return;
    }
}
//==========================================
// Get players guild
//==========================================
function setGuildHighlight()
{
    if(_page=='profile')
    {
        // Get cell from table
        var c=document.evaluate(
        "//table[contains(@id,'profile')]",
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		if(isNewStyle())
			c= c.firstChild.firstChild.textContent;
		else
			c= c.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.textContent;
		//console.log(c);		
        var d=c.indexOf(' ',0); // check for space to show guild tag split
        if(d==-1) guild='';
        else guild=trim(c.substring(0,d));
        name=c.substring(d+1,c.length); // split string into guild/tag
        notify("Setting players guild: "+guild);
        setSetting(MY_GUILD_KEY,escape(guild)); // set tag
		setSetting(MY_NAME_KEY,escape(name));
        var d = new Date();
        var currentTime = Math.round(d.getTime() / 1000); // set date for notifications
        setSetting('lastGuildCheck', currentTime);
        //console.log (getSetting('lastGuildCheck'));
		var acc = document.evaluate(
        "//b[text() = 'Account:']",
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentNode;
		acc = acc.innerHTML.substr(acc.innerHTML.indexOf('Account:'));
		acc = acc.substring(acc.indexOf('</b>')+5, acc.indexOf('<br'));
		if(acc.indexOf("Upgraded") != -1)
		{
			setSetting('upgradedAccount',true);
		}
		else
		{
			setSetting('upgradedAccount',false);
		}
		//console.log (getSetting('upgradedAccount'));
		delete d;
    }
}
//==========================================
//Inserts Empire sub menu on all pages
//==========================================
function cleanEmpireMenus()
{
    //Clear out additional menus cause i'm tired of having multiple ones loading if you run seperate scripts
    var cleanmenus = document.evaluate("//table[@class='header']",
    document, null, XPathResult.UNORDERED_NODE_TYPE, null);
    if (cleanmenus.snapshotLength>1)
    {
        for (var i = 0; i < cleanmenus.snapshotLength; i++){
            cleanmenus.parentNode.removeChild(cleanmenus.previousSibling);
        }
    }
}
function insertEmpireMenu(){
    var html = '<tbody><tr><th width="11%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="11%" id="bases_capacities"><a href="empire.aspx?view=bases_capacities">'+
    'Capacities</a></th><th width="11%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="11%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="11%" id="structures">'+
    '<a href="empire.aspx?view=structures">Structures</a></th><th width="11%" id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="11%" id="unitsmenu"><a href="empire.aspx?view=units">Units</a>'+
    '</th><th width="12%" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th width="11%" id="scanners"><a href="empire.aspx?ch=1&view=scanners">Scanners</a></th></tr></tbody>';
    var tables = document.evaluate(
    "//table[@class='top']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0) return;
    var topTable = tables.snapshotItem(0);
    var empireMenu = document.createElement('table');
    empireMenu.setAttribute('width',topTable.getAttribute("width"));
    empireMenu.setAttribute('align','center');
    empireMenu.setAttribute('class','header');
    empireMenu.innerHTML = html;
    if(topTable)
    {
        topTable.parentNode.insertBefore(empireMenu,topTable.nextSibling);
        var lineBreak = document.createElement('br');
        topTable.parentNode.insertBefore(lineBreak,empireMenu);
    }
}

function moveEmpireMenu()
{
    var empiremenu = document.evaluate(
    "//table[@class='header']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var header = document.evaluate(
    "//table[@class='top']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    empiremenu.parentNode.removeChild(empiremenu.previousSibling);
    header.parentNode.insertBefore(empiremenu,header.nextSibling);
    empiremenu.parentNode.insertBefore(document.createElement("br"),empiremenu);
}
//==========================================
//Highlight Poor Trade Values
//==========================================
function findPoorTrades(){
    // Filter tr tags out
    var rows = document.evaluate(
	"//tr[@align='center']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 //console.log('Found '+ rows.snapshotLength + 'rows.');

    var upperThreshold = getSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,10);
    var lowerThreshold = getSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,10);
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
        if(eco1Cell) var eco1 = parseNum(eco1Cell.innerHTML);
        if(eco2Cell) var eco2 = parseNum(eco2Cell.innerHTML);
//      console.log(eco1 + ' / ' + eco2);
        if (eco1Cell && eco2Cell)
        {
            if(eco2 - eco1 > upperThreshold)
            {
                eco2Cell.style.color = "orange";
                rows.snapshotItem(i).setAttribute("style","background: #444400; opacity: 0.82;");
            }
            if(eco2 - eco1 < -1*lowerThreshold)
            {
                eco2Cell.style.color = "red";
                rows.snapshotItem(i).setAttribute("style","background: #440000; opacity: 0.82;");
            }
        }
    }
}

//==========================================
//Handle Trade Board Page
//==========================================

function highlightTradePartners(){
    //console.log('Checking trade page');

    //if on the main empire page, only check links in the marquee
    //this saves time checking all the other links on the page that are useless
    var query = "//a[contains(@href,'profile.aspx') or contains(@href,'base.aspx') and not(contains(@class,'header'))]";
    if(location.indexOf("empire.aspx")!=-1 && (getView()=="" || getView()=="Structures"))
        query = "//marquee"+query;
    if(location.indexOf("bases_events")!= -1) query = "//marquee"+query;
    //console.log(query);

    var allLinks,item;
        allLinks = document.evaluate(
        query,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    //Iterate through all and add only odd ones to name and node arrays.
    var highlightPlayers = (getSetting(PLAYER_COLORS_KEY,null) != null) && getSetting(HIGHLIGHT_PLAYERS_KEY,true);
    //console.log("highlight players: "+highlightPlayers);
    for (var i = 0; i < allLinks.snapshotLength; i++)
    {
        //console.log(allLinks.snapshotItem(i).href);
        item = allLinks.snapshotItem(i);
        if( getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) && isTradePartner(item.innerHTML))
        {
            item.style.color = unescape(getSetting(HIGHLIGHT_TRADE_COLOUR_KEY));
            //console.log(item.innerHTML+" (trade)");
        }
        if(highlightPlayers)
        {
            var guild = getGuild(item.innerHTML);
            //Highlight by guild
            var color = getHighlightColorForGuild(guild);
            //console.log(guild+": "+color);
            if(color != null)
            {
                item.style.color = color;
            }
            //Apply overrides
            var color = getHighlightColorForPlayer(getPlayerName(item.innerHTML));
            if(color != null)
            {
                //console.log(getPlayerName(item.innerHTML)+": "+color);
                item.style.color = color;
            }
        }
    }
}
//==========================================
//Insert Production Presets
//==========================================
function insertProductionPresetsButtons()
{
    var preset1Name = getSetting(PRESET_1_NAME_KEY,DEFAULT_PRESET_NAME_1);
    var preset2Name = getSetting(PRESET_2_NAME_KEY,DEFAULT_PRESET_NAME_2);
    var preset3Name = getSetting(PRESET_3_NAME_KEY,DEFAULT_PRESET_NAME_3);
    var preset4Name = getSetting(PRESET_4_NAME_KEY,DEFAULT_PRESET_NAME_4);
//  Insert Preset Buttons
    var buttons = '<div class="gm_update_alert_buttons">'
    +'      <a href="javascript:void(0)" id="presetButton1">'+preset1Name+'</a></span> - '
    +'      <a href="javascript:void(0)" id="presetButton2">'+preset2Name+'</a></span> - '
    +'      <a href="javascript:void(0)" id="presetButton3">'+preset3Name+'</a></span> - '
    +'      <a href="javascript:void(0)" id="presetButton4">'+preset4Name+'</a></span>'
    +'      <div><a href="javascript:void(0)" id="fillHangars">Fill hangar space</a></div>'
    +'</div>';

    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = buttons;
    buttonElement.setAttribute("align","center");
    //buttonElement.setAttribute("width",getTableWidth());

    var table = document.evaluate( "//table[@id='base_production']/tbody/tr", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.firstChild;
	if(table.childNodes.length > 1)
		table = table.firstChild;
    table.appendChild(buttonElement, table);
    $('presetButton1').addEventListener('click', function(event) {
        applyProductionPreset(1);
    }, true);
    $('presetButton2').addEventListener('click', function(event) {
        applyProductionPreset(2);
    }, true);
    $('presetButton3').addEventListener('click', function(event) {
        applyProductionPreset(3);
    }, true);
    $('presetButton4').addEventListener('click', function(event) {
        applyProductionPreset(4);
    }, true);
    $('fillHangars').addEventListener('click', function(event) {
        queueFullHangarSpace();
    }, true);
    //Insert Set Preset Buttons
    buttons = ' <div class="gm_update_alert_buttons">'
    +'      <a href="javascript:void(0)" id="setButton1">Set Preset 1</a>&nbsp;&nbsp;'
    +'      <a href="javascript:void(0)" id="setButton2">Set Preset 2</a>&nbsp;&nbsp;'
    +'      <a href="javascript:void(0)" id="setButton3">Set Preset 3</a>&nbsp;&nbsp;'
    +'      <a href="javascript:void(0)" id="setButton4">Set Preset 4</a>&nbsp;&nbsp;'
    +'</div>';
    //console.log(table);
    buttonElement = document.createElement("div");
    buttonElement.innerHTML = buttons;
    buttonElement.setAttribute("align","center");

    //table.parentNode.insertBefore(buttonElement,table);
    //console.log(submitButton.parentNode.parentNode.parentNode.parentNode);
    var Button = document.evaluate("//input[@type='reset']",
    document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    Button.parentNode.insertBefore(buttonElement, Button);
    $('setButton1').addEventListener('click', function(event) {
        saveProductionPreset(1);
    }, true);
    $('setButton2').addEventListener('click', function(event) {
        saveProductionPreset(2);
    }, true);
    $('setButton3').addEventListener('click', function(event) {
        saveProductionPreset(3);
    }, true);
    $('setButton4').addEventListener('click', function(event) {
        saveProductionPreset(4);
    }, true);
}
//==========================================
//Apply Production Presets
//==========================================
function applyProductionPreset(preset){
    var presetArray;
    switch(preset)
    {
        case 1:{
            presetArray = getSetting(PRESET_1_VALUE_KEY,DEFAULT_PRESET_1).split(",");break;
        }
        case 2:{
            presetArray = getSetting(PRESET_2_VALUE_KEY,DEFAULT_PRESET_2).split(",");break;
        }
        case 3:{
            presetArray = getSetting(PRESET_3_VALUE_KEY,DEFAULT_PRESET_3).split(",");break;
        }
        case 4:{
            presetArray = getSetting(PRESET_4_VALUE_KEY,DEFAULT_PRESET_4).split(",");break;
        }
    }
    //console.log("Preset: "+presetArray);
    var countTextBox, timeTextBox;
    var shipName;
    var value, presetText, textBoxName;

    for(var i = 0;i < presetArray.length;i++)
    {
        var count = 0;
        var time = 0;
        shipName = PRESET_KEYS[i];
        presetText = presetArray[i];
        //console.log(presetArray[i]);

        if(presetText.charAt(0) == "t")
        {
            time = parseNum(presetText.substring(1));
            //console.log(parseNum(presetText.substring(1)));
        }
        else
        {
            count = parseNum(presetText);
        }

        countTextBox = document.evaluate(
                "//input[@name='" + shipName + "']",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            //console.log(textBox);

        timeTextBox = document.evaluate(
                "//input[@name='" + shipName + " - Time']",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            //console.log(textBox);

        if(timeTextBox != null)
        {
            if(time>0)
                value = time;
            else
                value = null;
            timeTextBox.value = value;
        }
        if(countTextBox != null)
        {
            if(count>0)
                value = count;
            else
                value = null;
            countTextBox.value = value;
        }

        //console.log("Preset Text: "+presetText+" Time: "+time+" Count: "+count+" Value: "+value);


        //console.log("Setting production count for "+shipName+" to "+value+".");

        if(countTextBox != null)
        {
            var row = countTextBox.parentNode.parentNode;
            convertTimeToQuantity(row);
        }
    }
    onProductionTextBoxKeyUp();
}
//==========================================
//Save Production Preset
//==========================================
function saveProductionPreset(preset){
    //console.log("Saving preset " + preset);
    var shipName;
    var count;
    var presetArray = new Array();
    for(var i = 0;i < PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];

        //Check time textbox
        textBox = document.evaluate(
            "//input[@name='" + shipName + " - Time']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;

        //If time is not set, check quantity
        if(textBox == null || textBox.value == "" || textBox.value == "0")
        {

            textBox = document.evaluate(
                "//input[@name='" + shipName + "']",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;

                if(textBox == null || textBox.value == "")
                {
                    //console.log("Failed to find textBox for "+shipName+".");
                    count = 0;
                }
                else
                {
                    //console.log(textBox.value);
                    //console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
                    count = parseNum(textBox.value);
                }
                //console.log(count + " " + shipName);
                presetArray[i] = count;
        }
        else
        {
            //console.log(textBox.value);
            //console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
            time = parseNum(textBox.value);
            //console.log(time + " (time) " + shipName);
            presetArray[i] = "t"+time;
        }
    }
    var name = prompt("Enter preset name.");
    if(name == null) return;
    //console.log(name +": "+presetArray);
    switch(preset)
    {
        case 1:{
            setSetting(PRESET_1_VALUE_KEY,presetArray.join());setSetting(PRESET_1_NAME_KEY,name);$('presetButton1').firstChild.innerHTML = name;break;
        }
        case 2:{
            setSetting(PRESET_2_VALUE_KEY,presetArray.join());setSetting(PRESET_2_NAME_KEY,name);$('presetButton2').firstChild.innerHTML = name;break;
        }
        case 3:{
            setSetting(PRESET_3_VALUE_KEY,presetArray.join());setSetting(PRESET_3_NAME_KEY,name);$('presetButton3').firstChild.innerHTML = name;break;
        }
        case 4:{
            setSetting(PRESET_4_VALUE_KEY,presetArray.join());setSetting(PRESET_4_NAME_KEY,name);$('presetButton4').firstChild.innerHTML = name;break;
        }
    }

    notify("'"+name +"' preset saved.");
	delete presetArray;
}

//=========================================
//Queues fighters to fill queued ships hangar space
//==========================================
function queueFullHangarSpace(){
    //shipHangarValues
    var totalHangarSpace = 0;
    for(var i = 0;i < PRESET_KEYS.length;i++)
    {
        var shipName = PRESET_KEYS[i];
        var textBox = document.evaluate(
            "//input[@name='" + shipName + "']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
        //console.log(textBox);
        if(textBox != null && textBox.value != "")
        {
            //console.log(textBox.value);
            //console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
            totalHangarSpace += parseNum(textBox.value) * shipHangarValues[i];
        }
    }
    //console.log("Total hangar space: "+totalHangarSpace);

    var textBox = document.evaluate(
            "//input[@name='" + PRESET_KEYS[FT_INDEX] + "']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
        //console.log(textBox);
        if(textBox != null)
        {
            //console.log(textBox.value);
            //console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
            textBox.value = totalHangarSpace;
        }
    onProductionTextBoxKeyUp();
}

//==========================================
//Calculates total cost of production and sets Submit button label with amount
//==========================================
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
            count = parseNum(textBox.value);
            cost = parseNum(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
            totalTime+= getSeconds(time) * count;
            //console.log(count + " " + shipName + "s @ " + cost);
            productionCost += (cost * count);
            //textBox.parentNode.nextSibling.value = "";
        }
    }
    //console.log("total Time: "+getTimeDisplay(totalTime));
    var fastProduction = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.checked;
    //console.log(fastProduction);
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
        submitButton.value = "Submit ("+productionCost+") - "+getTimeDisplay(totalTime);
    else
        submitButton.value = "Submit";		
	document.getElementById('total_cred').innerHTML = productionCost;
	document.getElementById('total_time').innerHTML = getTimeDisplay(totalTime);
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
            //console.log("Failed to find textBox for "+shipName+".");
            continue;
        }
        textBox.addEventListener('keyup',onProductionTextBoxKeyUp,false);
        //textBox.addEventListener('blur',onProductionTextBoxChanged,true);
    }
    document.evaluate("//input[@type='checkbox']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('change',onProductionTextBoxKeyUp,false);
    //document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxKeyUp,true);
    document.evaluate("//form[@method='post']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('reset',onProductionTextBoxKeyUp,false);
}
//==========================================
//Production Quantities by Time
//==========================================

function insertTimeTextBoxes(){
    var inputs = document.forms[1].elements;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].value == 0 && inputs[i].className == 'input-numeric quant')
        {
            var row = inputs[i].parentNode.parentNode;
            //console.log(row);
			if (getSetting(HIDE_HELP_TEXT_KEY,true) == true) row.firstChild.setAttribute('rowspan','1');
            var cell = document.createElement("td");
            cell.setAttribute("align","center");
            cell.innerHTML = '<input type="text" value="" maxlength="5" size="5" name="'+inputs[i].name+' - Time" class="input-numeric quant" id="'+inputs[i].name+' - Time" />';
            row.appendChild(cell);
            cell.addEventListener('keyup',getConvertTimeToQuantityClosure(row),true);
            //cell.addEventListener('blur',onProductionTextBoxChanged,true);
        }
    }
    var tbody = inputs[0].parentNode.parentNode.parentNode;
    //console.log(tbody.childNodes[0].firstChild);
    //Adjust colspan for top row and third row
//    tbody.childNodes[0].firstChild.setAttribute("colspan",7);
//    tbody.childNodes[2].firstChild.setAttribute("colspan",7);
    //console.log(tbody.childNodes[1].firstChild);
    //Insert column title
    var titleCell = document.createElement("th");
    titleCell.setAttribute("width","10%");
    titleCell.textContent = "Time (h)"
    tbody.childNodes[0].appendChild(titleCell);

    titleCell.previousSibling.setAttribute("width","10%");
    //adjust colspan for all help rows
    var helpCells = document.evaluate(
    "//td[@class='help comment']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(helpCells.snapshotLength);
    for(var i=0;i<helpCells.snapshotLength;i++)
    {
        helpCells.snapshotItem(i).setAttribute("colspan",7);
        if (getSetting(HIDE_HELP_TEXT_KEY,true) == true) helpCells.snapshotItem(i).parentNode.parentNode.removeChild(helpCells.snapshotItem(i).parentNode);
    }
    //adjust colspan for all red rows
    var redCells = document.evaluate(
    "//td[@class='red']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<redCells.snapshotLength;i++)
    {
        redCells.snapshotItem(i).setAttribute("colspan",5);
    }
    //adjust colspan for last 3 rows
    var num = tbody.childNodes.length;
    tbody.childNodes[num-1].firstChild.setAttribute("colspan","7");
    tbody.childNodes[num-2].firstChild.setAttribute("colspan","2");
    tbody.childNodes[num-3].firstChild.setAttribute("colspan","7");
    $('fast').parentNode.setAttribute("colspan","7");
    $('base_prod').setAttribute("colspan","7");
/*
        var inputs = document.forms[1].elements;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].className == 'input-numeric quant')
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
    //tbody.childNodes[0].firstChild.setAttribute("colspan",7);
    //tbody.childNodes[2].firstChild.setAttribute("colspan",7);
    //console.log(tbody.childNodes[1].firstChild);
    //Insert column title
    var titleCell = document.createElement("th");
    titleCell.setAttribute("width","10%");
    titleCell.textContent = "Time (h)"
    tbody.childNodes[0].appendChild(titleCell);

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
    $("fast").addEventListener("click", function(){var inputs = document.forms[1].elements; for(var i = 0; i < inputs.length; i++){if(inputs[i].className == 'quant'){if(inputs[i].value == ""){}else{var row = inputs[i].parentNode.parentNode; convertTimeToQuantity(row); unsafeWindow.update(inputs[i].name);}}}}, false)
    tbody.childNodes[tbody.childNodes.length-1].firstChild.setAttribute("colspan",7);*/
}

function getConvertTimeToQuantityClosure(row){
    function func(){
        convertTimeToQuantity(row);
    };
    return func;
}

function convertTimeToQuantity(row){
    //console.log(row);
    var production=0;
    var cmd_level=0;
    production = parseNum($('base_prod').title);
    cmd_level = parseNum($('cmd_level').title);
    var credits = parseNum(row.childNodes[2].textContent);
    var time = Math.round(credits*3600/production);
    // Now we have the time work out 1 percent for each cmd_level
    if (cmd_level>0) time=Math.round(time*(1-0.01*cmd_level));
    var qtyInput = row.childNodes[5].firstChild;
    var enteredTime;
    try{
        enteredTime = parseNum(row.childNodes[6].firstChild.value);
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Converttimetoquantity error: "+e); return; }
    if(isNaN(enteredTime)) return;
    //console.log("Credits: "+credits+" Time: "+time+" qtyInput: "+ qtyInput.value);
    //console.log("entered time: "+isNaN(enteredTime));
    if(time != -1)
    {
        //console.log("Time " +getTimeDisplay(totalSeconds));
        var enteredTimeInSeconds = enteredTime*60*60;
        //console.log(enteredTimeInSeconds+" / " +totalSeconds);
        if(enteredTimeInSeconds < time)
            qtyInput.value = "";
        else
            qtyInput.value = Math.round(enteredTimeInSeconds / time)+"";
    }
    onProductionTextBoxKeyUp();
}

function getSeconds(timeString){
    var regex = /(\d*h)?\W?(\d*m)?\W?(\d*s)?/;
    var result = regex.exec(timeString);
    if(result)
    {
        //console.log(result);
        var h = 0;var m=0;var s=0;
        if(result[1] != null)
        h = result[1].substring(0,result[1].indexOf("h"));
        if(result[2] != null)
        m = result[2].substring(0,result[2].indexOf("m"));
        if(result[3] != null)
        s = result[3].substring(0,result[3].indexOf("s"));
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
	delete h;
	delete m;
	delete s;
    return string;
}

//==========================================
// Minor func for config page
//==========================================
function poorTradesChanged(){
    var isChecked = $('config_highlightPoorTrades').checked;
    //console.log("Poor trades changed." + isChecked);
    $('config_poorTradeUpperThreshold').disabled = !isChecked;
    $('config_poorTradeLowerThreshold').disabled = !isChecked;
}

//==========================================
//Shorten Page Titles
//Uses code from FlxGrey on AE Forums. Thanks!
//==========================================
function adjustTitles(){
    //console.log("Adjust titles");
    var view = getView();
    var server = getServer();

    if(view != "")
        document.title = server + " - " + getView();
    else
        document.title = document.title.replace("Astro Empires - ",server+" - ");
}

//==========================================
//Enhanced Queue Display
//==========================================
function fixQueues(){
    if(document.evaluate('//a[text()="remove"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength > getSetting(MAX_QUEUES_KEY,5))
        return;
    var queueTitle = getView();
    //console.log("Fixing queues :" +queueTitle);
    if(queueTitle == "Structures" || queueTitle == "Defenses" || queueTitle == "Research")
    queueTitle = "base_queue";
	if(queueTitle == "Production")
    queueTitle = "base_events-production";
    var queues = document.evaluate('//table[@id = "'+queueTitle+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   if(queues)
   {
		queues = queues.firstChild.firstChild.firstChild;
        queues.parentNode.parentNode.setAttribute("width",getTableWidth());
        queues = queues.parentNode.parentNode.parentNode;
        var fixedDiv = document.createElement("div");
        fixedDiv.setAttribute("id","queueFooter");
        //console.log(queues);
        fixedDiv.appendChild(queues);
        document.body.appendChild(fixedDiv);
        var spacer = document.createElement('div');
		spacer.setAttribute("id","spacer");
        spacer.style.position="relative";
        spacer.innerHTML = "&nbsp;";
		spacer.style.height = queues.offsetHeight+"px";
        document.body.appendChild(spacer);
    }
}

function productionSubmit(){
//  console.log("Click!");
    document.forms[1].submit();
}
//==========================================
// Insert Logo Section
//==========================================
function insertCpLogo(){
    try{
//      Get Node
		var sString =  "//table[@class='top']/tbody/tr[1]";
		if(isNewStyle())
		{
			sString = "//table[@id='main-header']/tbody/tr";
		}
        var logo = document.evaluate(
		sString,
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if (!logo) return;
//      Insert new cell to stick it all in
        var cell = logo.insertCell(1);
		if(isNewStyle())
		{
			cell.parentNode.parentNode.childNodes[1].firstChild.setAttribute("colspan","4");
			cell.parentNode.parentNode.childNodes[2].firstChild.setAttribute("colspan","4");
		}
//      Make new tag to hold
        var span = document.createElement("small");
        span.id = "cpmenu";
        span.textContent = "WOLF AE Bits";
        var br = document.createElement("br");
        span.appendChild(br);
    //  console.log('Found '+ logo.parentNode.firstChild + ' tables.');
//      Add links to next line
		var link = document.createElement("a");
        link.textContent = "Forums";
        link.href = "http://www.wrathofgods.net/index.php";
        link.setAttribute("target","_blank");
        span.appendChild(link,null);
        span.appendChild(document.createElement("br"));
        var link = document.createElement("a");
        link.textContent = "Chat";
        link.href = chatlink+getSetting(MY_NAME_KEY,"Newb");
        link.setAttribute("target","_blank");
        span.appendChild(link,null);
        span.appendChild(document.createElement("br"));

        var configLink = document.createElement("a");
        configLink.setAttribute("href","javascript:void(0)");
        configLink.innerHTML = "Settings";
        configLink.id = "CP_Settings_Link";
        configLink.addEventListener("click", function(){ showConfig(null); }, true);
        span.appendChild(configLink,null);
        cell.appendChild(span);
        cell.id = "cpmenucell";
        cell.setAttribute("align","center");
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Config link insert error: "+e);  }
}

//==========================================
//Inserts Battle Calculator Link
//==========================================
function insertBattleCalcLink(){
    var bookmarkLink = $("bookmarks");
    if(!bookmarkLink)return;
    var th = document.createElement("th");
    th.setAttribute("width","11%");
    th.setAttribute("id","battlecalc");
    th.innerHTML = "<a href='http://www.wrathofgods.net/index.php?action=attackcalc' target='_new'>Battle Calc</a>";
    bookmarkLink.parentNode.insertBefore(th,bookmarkLink);
    $("base").setAttribute("width","11%");
    $("map").setAttribute("width","11%");
    $("fleet").setAttribute("width","11%");
    $("empire").setAttribute("width","11%");
    $("commander").setAttribute("width","12%");
    $("guild").setAttribute("width","11%");
    $("notes").setAttribute("width","11%");
    $("bookmarks").setAttribute("width","11%");
//    var otherRows = document.evaluate("/html/body/table/tbody/tr/td",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
//    otherRows.setAttribute("colspan",5);
}

//==========================================
//Battle Calculator Functions
//==========================================
function insertAttackBattleCalcLink(){
//  console.log("inserting battle calc link on attack page");
    var button = '  <div class="gm_update_alert_buttons">'
    +'      <span id="openCalc"><a href="http://www.wrathofgods.net/index.php?action=attackcalc" target="_blank">Open in battle calculator</a></span>&nbsp;&nbsp;'
    +'</div>';
    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = button;
    buttonElement.setAttribute("align","center");
    var cancelLink = document.evaluate(
    "//a[text()='Cancel Attack']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(cancelLink);
    document.body.insertBefore(buttonElement, null);
    $('openCalc').addEventListener('click',function(event) {
        saveBattleData();setSetting("attacking",true);
    }, true);
}

function saveBattleData(){
    saveFleetQuantities(2);
    saveFleetQuantities(3);
    saveDefensivePlayerName();
    saveFleetTech();
}

function saveTechData(){
    //console.log("Saving tech data");
    var techData = new Array();
    var rows = document.evaluate(
    "//tr[@align='center']",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
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
            var techValue = parseNum(techValueCell.snapshotItem(0).innerHTML);
            var techName = techNameCell.snapshotItem(0).innerHTML;
            //console.log(techName +": "+techValue);
            techData[i] = techValue;
        }
    }
    setSetting("techData",techData.join());

    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    setSetting('lastTechCheck', currentTime);
}
function saveFleetQuantities(tableIndex){
    //console.log("Saving fleet quantities");
    var rows = document.evaluate(
    "//table["+tableIndex+"]//tr[@align='center']",
    document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log("Attack fleet: "+rows.snapshotLength);
    var fleetArray = new Array();
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        //console.log(row);
        var ship = row.childNodes[0].innerHTML;
        var quantity = row.childNodes[1].innerHTML;
        //console.log(ship +": "+quantity +": "+getShipIndex(ship));
        fleetArray[getShipIndex(ship)] = quantity;
    }
    if(tableIndex == 2) setSetting("attackFleet",fleetArray.join());
    if(tableIndex == 3) setSetting("defenseFleet",fleetArray.join());
}
function insertFleetToBattleCalcLink() {
    if(document.evaluate(
    "//select"
    ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) return;
    if(document.evaluate(
    "//map"
    ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) return;
    //console.log("inserting battle calc link on fleet page");
    var button = '  <div class="gm_update_alert_buttons">'
    +'      <span id="openCalc"><a href="http://www.wrathofgods.net/index.php?action=attackcalc" target="_new">Open in battle calculator</a></span>&nbsp;&nbsp;'
    +'</div>';
    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = button;
    buttonElement.setAttribute("align","center");
    //console.log(cancelLink);
    document.body.insertBefore(buttonElement, null);
    $('openCalc').addEventListener('click', function(event) {
        saveFleetQuantitiesFromFleetScreen();saveDefensivePlayerName();setSetting("previewing",true);
    }, true);
}
function saveFleetQuantitiesFromFleetScreen(){
//  console.log("Saving fleet quantities");
    var rows = document.evaluate(
    "//body/table[last()]//tr",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//  console.log("Attack fleet: "+(rows.snapshotLength));
    var fleetArray = new Array();
    for (var i = 2; i < (rows.snapshotLength); i++)
    {
        var row = rows.snapshotItem(i);
//      console.log(row.childNodes.length);
        if(row.childNodes.length==1) break;
//      console.log(row);
        var ship = row.childNodes[0].firstChild.innerHTML;
        var quantity = row.childNodes[1].innerHTML;
//      console.log(ship +": "+quantity +": "+getShipIndex(ship));
        fleetArray[getShipIndex(ship)] = quantity;
    }
    setSetting("fleetToAddToCalculator",fleetArray.join());
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
function saveDefensivePlayerName(){
    //console.log("saving player name");
    var playerName = "N/A";
    if(location.indexOf("attack")!=-1)
    {
        var playerLink = document.evaluate("//a",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(2);
        //console.log("link: "+playerLink);
        playerName = playerLink.innerHTML;
    }
    else
    {
        var playerLink = document.evaluate("//th[text()='Player']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log("link: "+playerLink.parentNode.nextSibling.firstChild.textContent);
        playerName = playerLink.parentNode.nextSibling.firstChild.textContent;
    }
    setSetting("defendPlayer",escape(playerName));
}
function saveCommandCenterAndCommanderCount(){
    //console.log("Saving command centers and commanders");
     var rows = document.evaluate(
    "//table[1]//tr",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);
    //console.log("Rows: "+rows.snapshotLength);
     var defenseFound = false;
     var attackCommandCenters = 0;
     var attackCommanders = "";
     var defendCommandCenters = 0;
     var defendCommanders = "";
     for (var i = 0; i < rows.snapshotLength; i++)
    {
         var row = rows.snapshotItem(i);
        //console.log(row.firstChild.nodeName);
         if(row.firstChild.nodeName == "TH")
        {
             if(row.firstChild.textContent == "Defense Force")
             defenseFound == true;
        }
         else
        {
             if(row.firstChild.textContent == "Command Centers")
            {
                 if(defenseFound)
                 defendCommandCenters = row.childNodes[1].textContent;
                 else
                 attackCommandCenters = row.childNodes[1].textContent;
            }
             else if(row.firstChild.textContent == "Commander")
            {
                 if(defenseFound)
                 defendCommanders = row.childNodes[1].textContent;
                 else
                 attackCommanders = row.childNodes[1].textContent;
            }
        }
    }
    //console.log("Defend Commander: " + defendCommanders);
    //console.log("Attack Commander: " + attackCommanders);
    //console.log("Defend Command centers: " + defendCommandCenters);
    //console.log("Attack Command centers: " + attackCommandCenters);
    if(attackCommanders != "")
    {
         getCommanderLevel(attackCommanders);
    }
     if(defendCommanders != "")
    {
    }
     setSetting("CommandValues","1,2,3,4");
}
function getCommanderLevel(commanderString)
{
     var space = attackCommanders.lastIndexOf(" ");
    //console.log(space);
     attackCommanders = attackCommanders.substring(space,attackCommanders.length-1);
    //console.log("Attack Commander: " + attackCommanders);
}
function saveFleetTech(){
    //console.log("Saving fleet tech");
    var rows = document.evaluate(
    "//table[3]//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Defense fleet: "+rows.snapshotLength);
    var fleetPowerArray = new Array();
    var fleetArmourArray = new Array();
    var fleetShieldArray = new Array();
    for (var i = 0; i < rows.snapshotLength; i++)
    {
         var row = rows.snapshotItem(i);
        //console.log(row);
         var ship = row.childNodes[0].innerHTML;
         var power = row.childNodes[3].innerHTML;
         var armour = row.childNodes[4].innerHTML;
         var shield = row.childNodes[5].innerHTML;
        //console.log(ship +": "+quantity +": "+getShipIndex(ship));
         fleetPowerArray[getShipIndex(ship)] = power;
         fleetArmourArray[getShipIndex(ship)] = armour;
         fleetShieldArray[getShipIndex(ship)] = shield;
    }
     setSetting("defenseFleetPower",fleetPowerArray.join());
     setSetting("defenseFleetArmour",fleetArmourArray.join());
     setSetting("defenseFleetShield",fleetShieldArray.join());
}
function fillEnemyFleetBattleCalc(attacking){
    if(attacking)
    {
         var fleet = getSetting("defenseFleet","");
         var fleetPower = getSetting("defenseFleetPower","");
         var fleetArmour = getSetting("defenseFleetArmour","");
         var fleetShield = getSetting("defenseFleetShield","");
         fleet = fleet.split(",");
         fleetPower = fleetPower.split(",");
         fleetArmour = fleetArmour.split(",");
         fleetShield = fleetShield.split(",");
    }
     else
    {
         var fleet = getSetting("fleetToAddToCalculator","");
         fleet = fleet.split(",");
    }
    //console.log(fleetPower);
     var rows = document.evaluate(
    "//body[1]//table[1]//tr[3]//td[2]//table//tr[@align='center']",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);
    //console.log("enemy fleet rows: "+ rows.snapshotLength);
     for (var i = 0; i < rows.snapshotLength; i++) {
        var row = rows.snapshotItem(i);
        row.style.color = "red";
        //console.log(row);
        var ship = row.childNodes[0].firstChild.firstChild.innerHTML;
        var quantityTextBox = document.evaluate(".//input[@name='qt']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        var quantity = fleet[i];
        if(quantity)
        {
             quantityTextBox.value = quantity;
        }
        if(attacking)
        {
             var powerTextBox = document.evaluate(".//input[@name='pw']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
             var power = fleetPower[i];
             if(power)
            {
                //console.log(powerTextBox.name +": "+power);
                 powerTextBox.value = power;
                //powerTextBox.style.color = "red";
            }
             var armourTextBox = document.evaluate(".//input[@name='ar']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
             var armour = fleetArmour[i];
             if(armour)
            {
                //console.log(armourTextBox.name +": "+armour);
                 armourTextBox.value = armour;
                //armourTextBox.style.color = "red";
            }
             var shieldTextBox = document.evaluate(".//input[@name='sh']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
             var shield = fleetShield[i];
             if(shield && shieldTextBox)
            {
                //console.log(armourTextBox.name +": "+armour);
                 shieldTextBox.value = shield;
                //shieldTextBox.style.color = "red";
            }
        }
        //console.log(ship +": "+quantity +": "+power);
    }
    unsafeWindow.calc(this,1,2);
    var title = document.evaluate(
    "//html/body/table/tbody/tr[3]/td[2]/table/tbody/tr/th",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(title.innerHTML);
    title.innerHTML = title.innerHTML + "( "+unescape(getSetting("defendPlayer",""))+" )";
}
function fillAttackFleetBattleCalc(){
    var fleet = getSetting("attackFleet","");
    if(!fleet)return;
    fleet = fleet.split(",");
    var cells = document.evaluate(
    "//input starts-with(@name,'qt')",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log("fillAttackFleetBattleCalc() cells: "+cells);
    for (var i = 0; i < cells.snapshotLength; i++)
    {
        var quantityTextBox = cells.snapshotItem(i);
        //console.log(quantityTextBox);
        var quantity = fleet[i];
        if(quantity)
        {
            quantityTextBox.value = quantity;
            quantityTextBox.style.color = "red";
        }
    }
}
function fillTechDataOnBattleCalc(){
    //setSetting("techData","");
    //console.log("filling tech data");
    var techData = getSetting("techData","");
    //console.log("techData:" +techData);
    if(techData == "" || !techData)
    {
        return;
    }
    techData = techData.split(",");
    //console.log(techData);
    var cells = document.evaluate(
    "//input[not(@readonly='true') and @type='text' and @class='tech_1']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("tech cells: "+ cells.snapshotLength);
    for (var i = 0; i < cells.snapshotLength; i++) {
        //console.log("fillTechDataOnBattleCalc() techData: "+techData[i]);
        var textBox = cells.snapshotItem(i);
        textBox.style.color = "red";
        //console.log(textBox.name);
        if(textBox.name == "0") textBox.value = techData[2];
        else if(textBox.name == "1") textBox.value = techData[3];
        else if(textBox.name == "2") textBox.value = techData[4];
        else if(textBox.name == "3") textBox.value = techData[6];
        else if(textBox.name == "4") textBox.value = techData[8];
        else if(textBox.name == "5") textBox.value = techData[9];
        else if(textBox.name == "6") textBox.value = techData[10];
        else if(textBox.name == "7") textBox.value = techData[12];
    }
}

//==========================================
//Highlight bases on scanner
//==========================================
function scannerFormat(){
    try {
        var baseArray=document.getElementsByTagName("a");
        var bases = getSetting("baseCoords")+"";
        var custbases = unescape(getSetting(HIGHLIGHT_CUS_SCANNER_KEY))+"";
//        console.log (custbases);
//        console.log (bases);
        for(i=0; i<baseArray.length; i++){
            if(baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}/)){
                var basecoord=baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}/)
                if(bases.match(basecoord)){
                    baseArray[i].setAttribute("style", "font-weight: bold;");
                    baseArray[i].style.color = getSetting(HIGHLIGHT_SYSTEM_COLOUR_KEY,'orange');
                }
                if(custbases && custbases.match(basecoord)){
                    baseArray[i].setAttribute("style", "font-weight: bold;");
                    baseArray[i].style.color = getSetting(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY,'blue');
                }
            }
            if(baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)){
                var basecoord=baseArray[i].innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/)
                if(bases.match(basecoord)){
                    baseArray[i].setAttribute("style", "font-weight: bold;");
                    baseArray[i].style.color = getSetting(HIGHLIGHT_BASE_COLOUR_KEY,'red');
                }
                if(custbases && custbases.match(basecoord)){
                    baseArray[i].setAttribute("style", "font-weight: bold;");
                    baseArray[i].style.color = getSetting(HIGHLIGHT_CUSBASE_COLOUR_KEY,'purple');
                }
            }
        }
    } catch (e) { console.log("Line Number: "+e.lineNumber+"\n scannerFormat() exception: "+ e) }
}
//==========================================
//Sum Fleets
//==========================================

var fleetData = new Array(); //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function sumFleets()
{
    try{
        var rows = document.evaluate(
           "//th[contains(text(),'LEETS')]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;           
        if(!rows)
            return;
        rows = rows.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes;	
        var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
        var addFleets = getSetting(SUM_FLEETS_KEY,true);
        var now = new Date(), future = new Date();		
        for(var i=1;i<rows.length;i++)
       {
           //console.log(rows[i]);
            var row = rows[i];
            var size = parseNum(row.childNodes[3].firstChild.textContent);
            if(formatNumbers)
            row.childNodes[3].firstChild.textContent = commaFormat(size);
            if(addFleets)
           {
                var player = row.childNodes[1].firstChild.textContent;				
                var arrivalTimeCell = row.childNodes[2];
                var guild = getGuild(player);
				var p = getPlayerName(player);
                var incoming = (arrivalTimeCell.childNodes.length > 0);
                var incomingToday = false;
               //console.log(arrivalTimeCell);
               //console.log(arrivalTimeCell.id.indexOf('time') +": "+ parseNum(arrivalTimeCell.title)+"-<"+((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) &&
               //(parseNum(arrivalTimeCell.title) <= 0)));	
			   if(getSetting(MY_NAME_KEY,"Newb") == p)
			   {
				    row.setAttribute("guild",p);
			   }
			   else
			   {
					row.setAttribute("guild",guild);
				}
                if((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseNum(arrivalTimeCell.title) >= 0) )
               {
                    var time = arrivalTimeCell.title;
                    future.setTime(now.getTime() + (time * 1000));
                    incomingToday = (future.getDate() - now.getDate() == 0);
                   //console.log("date diff: "+ (future.getDate() - now.getDate()));
                   //if(incomingToday)
                   //console.log("Incoming today");
               }
               //console.log(player +": "+size);
                var incomingSize = incoming? size:0;
                var incomingTodaySize = incomingToday? size:0;
                addFleetSize(guild,size,incomingSize,incomingTodaySize);
				if(getSetting(MY_NAME_KEY,"Newb") == p && guild != "")
			    {
					addFleetSize(p,size,incomingSize,incomingTodaySize);
				}
           }
       }
       if(addFleets)
       {
            if(guildSummed)
            insertFleetSummary();
       }
    }catch (e) {console.log("sumfleets error: "+e);}
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
    var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th>"+
    "<th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
    var style="";
    var incoming,arrived,incomingToday,total;
    var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
    for(var i=0;i<fleetData.length;i++)
    {
        incoming = fleetData[i][2];
        arrived = fleetData[i][1];
        total = fleetData[i][1] + fleetData[i][2];
        incomingToday = fleetData[i][3];
		//console.log(incoming);
        var color = getHighlightColorForPlayer(getPlayerName(fleetData[i][0]));
        if(color==null)
        color = getHighlightColorForGuild(fleetData[i][0]);
        if(getSetting(HIGHLIGHT_PLAYERS_KEY,true))
        style = "style='color:"+color+"'";
        if(formatNumbers)
        {
             incoming = commaFormat(incoming);
             arrived = commaFormat(arrived);
             incomingToday = commaFormat(incomingToday);
             total = commaFormat(total);
        }
        html = html+"<tr align='center' "+style+"><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+
        "</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript: void(0)'>Hide</a></td></tr>";
        //href='#showHide"+fleetData[i][0]+"'
    }
     var newTable = document.createElement("table");
     newTable.setAttribute("width","600");
     newTable.setAttribute("align","center");
     newTable.innerHTML = html;
     var table = document.evaluate(
    "//th[contains(text(),'LEETS')]",
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
         var link = $("showHide"+fleetData[i][0]);
         link.addEventListener('click',getShowHideFleetClosure(fleetData[i][0]),true);
        //console.log(link);
        //console.log(getShowHideFleetClosure(fleetData[i][0]));
    }
}

function getShowHideFleetClosure(guild)
{
    function func(){
        toggleFleetVisibility(guild);
    };
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
     var link = $("showHide"+guild);
     link.textContent= (link.textContent=="Show")? "Hide":"Show";
    //document.body.scrollTop += 200;
}
//==========================================
//Map Enhancements
//==========================================
function moveGalaxyList()
{
    var centerElement = document.evaluate(
    "//center",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);   
	for (var i = 0; i < centerElement.snapshotLength; i++)
    {
		var cE = centerElement.snapshotItem(i);
		if(cE.firstChild.nodeName == "SMALL")
		{
			cE.parentNode.appendChild(cE);
			cE.parentNode.insertBefore(document.createElement("br"),cE);
			var linksElement = $("linksClones");
			if(linksElement) cE.setAttribute("style","position: relative; bottom: "+linksElement.offsetHeight);
		}
	}
}
function copyBaseLinks()
{
	var sString = "//div[@id='myCanvas']";
	if(isNewStyle())
	{
		sString = "//div[@id='map-galaxy_canvas']";
	}
    var canvasElement = document.evaluate(
    sString,
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!canvasElement) return;
    var baseLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'base')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("Found "+baseLinks.snapshotLength+" base(s).");
    if(baseLinks.snapshotLength ==0) return;
    var divElement = document.createElement("div");
	if(isNewStyle())
		divElement.setAttribute("style","position: absolute; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
    else
		divElement.setAttribute("style","position: relative; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
	divElement.setAttribute("id","linksClones");
    var titleElement = document.createElement("center");
    titleElement.textContent = "Bases";
    //titleElement.setAttribute("text-align","center");
    divElement.appendChild(titleElement);
    for (var i = 0; i < baseLinks.snapshotLength; i++) {
        //console.log(baseLinks.snapshotItem(i));
        var clone = baseLinks.snapshotItem(i).cloneNode(true);
        divElement.appendChild(clone);
        divElement.appendChild(document.createElement("br"));
    }
    canvasElement.parentNode.insertBefore(divElement,canvasElement);
    canvasElement.setAttribute("style",canvasElement.getAttribute("style")+"bottom: "+divElement.offsetHeight);
    divElement.setAttribute("style",divElement.getAttribute("style")+"top: "+canvasElement.offsetHeight/4);
}
function copyFleetLinks()
{
	var sString = "//div[@id='myCanvas']";
	if(isNewStyle())
	{
		sString = "//div[@id='map-galaxy_canvas']";
	}
    var canvasElement = document.evaluate(
    sString,
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!canvasElement) return;
    var fleetLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'fleet')][not(contains(@href,'edit'))]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("Found "+fleetLinks.snapshotLength+" fleet(s).");
    if(fleetLinks.snapshotLength ==0) return;
    var divElement = document.createElement("div");
    if(isNewStyle())
		divElement.setAttribute("style","position: absolute; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
    else
		divElement.setAttribute("style","position: relative; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
	divElement.setAttribute("id","linksClones");
    var titleElement = document.createElement("center");
    titleElement.textContent = "Fleets";
    //titleElement.setAttribute("text-align","center");
    divElement.appendChild(titleElement);
    for (var i = 0; i < fleetLinks.snapshotLength; i++) {
        //console.log(baseLinks.snapshotItem(i));
        var clone = fleetLinks.snapshotItem(i).cloneNode(true);
        divElement.appendChild(clone);
        divElement.appendChild(document.createElement("br"));
    }
    canvasElement.parentNode.insertBefore(divElement,canvasElement);
    canvasElement.setAttribute("style",canvasElement.getAttribute("style")+"bottom: "+divElement.offsetHeight);
    divElement.setAttribute("style",divElement.getAttribute("style")+"top: "+canvasElement.offsetHeight/4);
}
//==========================================
//Base Default Presets
//==========================================
var DEFAULT_BASE_PRESET_1 = "0,0,0,0,0,0,25,20,20,16,0,20,10,15,10,15,0,0,0,0,0,0,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_2 = "0,0,0,0,0,0,25,0,20,24,5,20,10,15,10,5,0,0,0,0,0,0,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_3 = "0,0,0,0,0,0,25,0,20,16,0,20,10,15,10,5,0,0,0,0,0,0,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_4 = "0,0,0,0,0,0,25,0,20,16,0,20,10,15,10,5,0,0,0,5,0,0,,0,0,0,0,5,0,5,0,5,5";
var DEFAULT_BASE_PRESET_5 = "0,0,0,0,0,0,25,0,20,16,0,20,20,15,10,5,0,0,0,0,0,0,,0,0,0,0,5,0,5,0,5,5";
var DEFAULT_BASE_PRESET_6 = "0,0,0,0,0,0,25,0,20,16,0,20,10,15,10,5,0,0,0,0,0,0,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_7 = "0,0,0,0,0,0,25,0,20,0,0,0,0,15,10,0,0,0,0,0,0,0,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_8 = "0,0,0,0,0,0,25,0,20,16,0,20,10,15,10,5,0,0,0,0,0,5,,0,0,0,0,2,0,2,0,2,2";
var DEFAULT_BASE_PRESET_NAME_1 = "E";
var DEFAULT_BASE_PRESET_NAME_2 = "P";
var DEFAULT_BASE_PRESET_NAME_3 = "R";
var DEFAULT_BASE_PRESET_NAME_4 = "JG";
var DEFAULT_BASE_PRESET_NAME_5 = "D";
var DEFAULT_BASE_PRESET_NAME_6 = "M";
var DEFAULT_BASE_PRESET_NAME_7 = "B";
var DEFAULT_BASE_PRESET_NAME_8 = "C";
var DEFAULT_BASE_PRESET_TITLE_1 = "Economy";
var DEFAULT_BASE_PRESET_TITLE_2 = "Production";
var DEFAULT_BASE_PRESET_TITLE_3 = "Research";
var DEFAULT_BASE_PRESET_TITLE_4 = "JumpGate";
var DEFAULT_BASE_PRESET_TITLE_5 = "Defense";
var DEFAULT_BASE_PRESET_TITLE_6 = "Mixed";
var DEFAULT_BASE_PRESET_TITLE_7 = "Basic";
var DEFAULT_BASE_PRESET_TITLE_8 = "Capital";
var BASE_PRESET_1_NAME_KEY = "BASE_PRESET_1_NAME";
var BASE_PRESET_2_NAME_KEY = "BASE_PRESET_2_NAME";
var BASE_PRESET_3_NAME_KEY = "BASE_PRESET_3_NAME";
var BASE_PRESET_4_NAME_KEY = "BASE_PRESET_4_NAME";
var BASE_PRESET_5_NAME_KEY = "BASE_PRESET_5_NAME";
var BASE_PRESET_6_NAME_KEY = "BASE_PRESET_6_NAME";
var BASE_PRESET_7_NAME_KEY = "BASE_PRESET_7_NAME";
var BASE_PRESET_8_NAME_KEY = "BASE_PRESET_8_NAME";
var BASE_PRESET_1_TITLE_KEY = "BASE_PRESET_1_TITLE";
var BASE_PRESET_2_TITLE_KEY = "BASE_PRESET_2_TITLE";
var BASE_PRESET_3_TITLE_KEY = "BASE_PRESET_3_TITLE";
var BASE_PRESET_4_TITLE_KEY = "BASE_PRESET_4_TITLE";
var BASE_PRESET_5_TITLE_KEY = "BASE_PRESET_5_TITLE";
var BASE_PRESET_6_TITLE_KEY = "BASE_PRESET_6_TITLE";
var BASE_PRESET_7_TITLE_KEY = "BASE_PRESET_7_TITLE";
var BASE_PRESET_8_TITLE_KEY = "BASE_PRESET_8_TITLE";
var BASE_PRESET_1_VALUE_KEY = "BASE_PRESET_1_VALUE";
var BASE_PRESET_2_VALUE_KEY = "BASE_PRESET_2_VALUE";
var BASE_PRESET_3_VALUE_KEY = "BASE_PRESET_3_VALUE";
var BASE_PRESET_4_VALUE_KEY = "BASE_PRESET_4_VALUE";
var BASE_PRESET_5_VALUE_KEY = "BASE_PRESET_5_VALUE";
var BASE_PRESET_6_VALUE_KEY = "BASE_PRESET_6_VALUE";
var BASE_PRESET_7_VALUE_KEY = "BASE_PRESET_7_VALUE";
var BASE_PRESET_8_VALUE_KEY = "BASE_PRESET_8_VALUE";
//==========================================
//Advanced Structures Page
//5 and 6 settings added by Cold-Phoenix, 7 and 8 added by hightower
//Settings buttons fixed by hightower (only first 4 were working before)
//==========================================
function insertBaseSettingLinks()
{
     loadBaseTypes();
     GM_addStyle('.settingsLink {'

        +'   color: yellow;'
        +'   font-weight: bold;'
        +'   font-size: x-small;'
        +'   background-color: #333399;'
        +'   border: solid 1px none;'
        +'  padding-left: 2px;'
        +'  padding-right: 2px;'
        +'  margin-left: 2px;'
        +'  margin-right: 2px;'
        +'}'
    +' .settingsLinkSelected {'
        +'   color: black;'
        +'   font-weight: bold;'
        +'   font-size: x-small;'
        +'   background-color: navy;'
        +'   border: solid 1px none;'
        +'  padding-left: 2px;'
        +'  padding-right: 2px;'
        +'  margin-left: 2px;'
        +'  margin-right: 2px;'
        +'}'
    );

     var baseLinks = document.evaluate(
            "//a[contains(@href,'base.aspx?base=')]",
             document,
             null,
             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
             null);
    //console.log("Found "+baseLinks.snapshotLength +" base(s).");
    var fillerTd = document.createElement("td");
    fillerTd.setAttribute("align","center");
    // Fix location for link if refreashed after clicking a setting
    var href = location.split("#")[0];
    fillerTd.innerHTML = "<a href='"+href+"&mode=edit' id='editLink'>Edit Goals</a>";
    //fillerTd.setAttribute("width","*");
    //fillerTd.setAttribute("colspan","3");
    var styleColour1 = unescape(getSetting(STRUCT_COLOUR1_KEY,"aqua"));
    var styleColour2 = unescape(getSetting(STRUCT_COLOUR2_KEY,"orange"));
	var styleColour3 = unescape(getSetting(STRUCT_COLOUR3_KEY,"green"));
	
    var topRow = baseLinks.snapshotItem(0).parentNode.parentNode.previousSibling;

    var instructionTd = document.createElement("td");
    instructionTd.setAttribute("width",18);
    instructionTd.setAttribute("align","center");
    instructionTd.setAttribute("style","border-style: solid; border-color: rgb(0, 0, 102); border-width: 0pt 1px 1px; font-family: verdana,arial;"+
    " font-style: normal; font-variant: normal; font-weight: normal; font-size: 10px; line-height: normal; font-size-adjust: none; font-stretch: normal;padding-bottom:12px");
    instructionTd.innerHTML = "<span style='color:"+styleColour2+";font-size: large;'>&#x25CF;</span><br /> <br />N<br />O<br />T<br /> <br />S<br />T<br />A<br />R<br />T<br />E<br />D";
    topRow.replaceChild(instructionTd,topRow.firstChild);
    instructionTd = document.createElement("td");
    instructionTd.setAttribute("width",18);
    instructionTd.setAttribute("align","center");
    instructionTd.setAttribute("style","border-style: solid; border-color: rgb(0, 0, 102); border-width: 0pt 1px 1px; font-family: verdana,arial;"+
    " font-style: normal; font-variant: normal; font-weight: normal; font-size: 10px; line-height: normal; font-size-adjust: none; font-stretch: normal;padding-bottom:12px");
    instructionTd.innerHTML = "<span style='color:"+styleColour1+";font-size: large;'>&#x25CF;</span><br /> <br />P<br />R<br />O<br />G<br />R<br />E<br />S<br />S<br />I<br />N<br />G";
    topRow.insertBefore(instructionTd,topRow.firstChild);
	instructionTd = document.createElement("td");
    instructionTd.setAttribute("width",18);
    instructionTd.setAttribute("align","center");
    instructionTd.setAttribute("style","border-style: solid; border-color: rgb(0, 0, 102); border-width: 0pt 1px 1px; font-family: verdana,arial;"+
    " font-style: normal; font-variant: normal; font-weight: normal; font-size: 10px; line-height: normal; font-size-adjust: none; font-stretch: normal;padding-bottom:12px");
    instructionTd.innerHTML = "<span style='color:"+styleColour3+";font-size: large;'>&#x25CF;</span><br /> <br />C<br />O<br />M<br />P<br />L<br />E<br />T<br />E<br />D<br /> <br />&nbsp;";
    topRow.insertBefore(instructionTd,topRow.firstChild);
    topRow.insertBefore(fillerTd,topRow.firstChild);

    var preset1Name = getSetting(BASE_PRESET_1_NAME_KEY,DEFAULT_BASE_PRESET_NAME_1);
    var preset2Name = getSetting(BASE_PRESET_2_NAME_KEY,DEFAULT_BASE_PRESET_NAME_2);
    var preset3Name = getSetting(BASE_PRESET_3_NAME_KEY,DEFAULT_BASE_PRESET_NAME_3);
    var preset4Name = getSetting(BASE_PRESET_4_NAME_KEY,DEFAULT_BASE_PRESET_NAME_4);
    var preset5Name = getSetting(BASE_PRESET_5_NAME_KEY,DEFAULT_BASE_PRESET_NAME_5);
    var preset6Name = getSetting(BASE_PRESET_6_NAME_KEY,DEFAULT_BASE_PRESET_NAME_6);
    var preset7Name = getSetting(BASE_PRESET_7_NAME_KEY,DEFAULT_BASE_PRESET_NAME_7);
    var preset8Name = getSetting(BASE_PRESET_8_NAME_KEY,DEFAULT_BASE_PRESET_NAME_8);

    var preset1Title = getSetting(BASE_PRESET_1_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_1);
    var preset2Title = getSetting(BASE_PRESET_2_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_2);
    var preset3Title = getSetting(BASE_PRESET_3_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_3);
    var preset4Title = getSetting(BASE_PRESET_4_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_4);
    var preset5Title = getSetting(BASE_PRESET_5_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_5);
    var preset6Title = getSetting(BASE_PRESET_6_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_6);
    var preset7Title = getSetting(BASE_PRESET_7_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_7);
    var preset8Title = getSetting(BASE_PRESET_8_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_8);
    //console.log("key: "+BASE_PRESET_8_TITLE_KEY+" title: "+DEFAULT_BASE_PRESET_TITLE_8+" output: "+preset8Title);
    //var lastElement;

    for(var i = 0;i<baseLinks.snapshotLength;i++)
    {
        var link = baseLinks.snapshotItem(i);
        row = link.parentNode.parentNode;
        row.firstChild.setAttribute("colspan","3");

        var baseId = link.href.substring(link.href.indexOf("=")+1);
        var settingsTd = document.createElement("td");
        var html = "<a class='settingsLink' href='#"+baseId+"' id='1-"+baseId+"' title='"+preset1Title+"'>"+preset1Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='2-"+baseId+"' title='"+preset2Title+"'>"+preset2Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='3-"+baseId+"' title='"+preset3Title+"'>"+preset3Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='4-"+baseId+"' title='"+preset4Title+"'>"+preset4Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='5-"+baseId+"' title='"+preset5Title+"'>"+preset5Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='6-"+baseId+"' title='"+preset6Title+"'>"+preset6Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='7-"+baseId+"' title='"+preset7Title+"'>"+preset7Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='8-"+baseId+"' title='"+preset8Title+"'>"+preset8Name+"</a>";
        settingsTd.innerHTML = html;
        row.insertBefore(settingsTd,row.firstChild);
        //console.log($("E"+baseId));
        var baseType = getBaseType(baseId);
        //console.log("Base Type: "+baseType);

        //Modify base link to go directly to structures page
        link.href = link.href + "&view=structures";

        if(baseType)
            onBaseTypeSet(baseId,baseType);

        $("1-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"1"),true);
        $("2-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"2"),true);
        $("3-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"3"),true);
        $("4-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"4"),true);
        $("5-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"5"),true);
        $("6-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"6"),true);
        $("7-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"7"),true);
        $("8-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"8"),true);
    }
}

function getSetBaseClosure(baseId,type)
{
    function func(){setBase(baseId,type);};
    return func;
}
var bases;
var baseTypes = new Array();
function setBase(baseId,type)
{
    //console.log(baseId +": "+type);
    for(var i=0;i<baseTypes.length;i++)
    {
        //console.log("Searching... "+fleetData[i][0]);
        if(baseTypes[i].split("=")[0]==baseId)
        {
            //console.log("Found "+fleetData[i][0]);
            baseTypes[i] = baseId+"="+type;
            saveBaseTypes();
            onBaseTypeSet(baseId,type);
            return;
        }
    }
    baseTypes[baseTypes.length] = baseId+"="+type;
    saveBaseTypes();
    onBaseTypeSet(baseId,type);
}

function getBaseType(baseId)
{
    for(var i=0;i<baseTypes.length;i++)
    {
        //console.log("Searching... "+baseTypes[i][0]);
        if(baseTypes[i].split("=")[0]==baseId)
        {
            //console.log("Found base type: "+baseTypes[i].split("=")[1]);
            return baseTypes[i].split("=")[1];
        }
    }
    return null;
}

function getBaseTypeValues(type)
{
    //console.log("Finding array for "+type);
     var array;
     switch(type)
    {
         case "1":{
             array = getSetting(BASE_PRESET_1_VALUE_KEY,DEFAULT_BASE_PRESET_1);break;
        }
         case "2":{
             array = getSetting(BASE_PRESET_2_VALUE_KEY,DEFAULT_BASE_PRESET_2);break;
        }
         case "3":{
             array = getSetting(BASE_PRESET_3_VALUE_KEY,DEFAULT_BASE_PRESET_3);break;
        }
         case "4":{
             array = getSetting(BASE_PRESET_4_VALUE_KEY,DEFAULT_BASE_PRESET_4);break;
        }
         case "5":{
             array = getSetting(BASE_PRESET_5_VALUE_KEY,DEFAULT_BASE_PRESET_5);break;
        }
         case "6":{
             array = getSetting(BASE_PRESET_6_VALUE_KEY,DEFAULT_BASE_PRESET_6);break;
        }
         case "7":{
             array = getSetting(BASE_PRESET_7_VALUE_KEY,DEFAULT_BASE_PRESET_7);break;
        }
         case "8":{
             array = getSetting(BASE_PRESET_8_VALUE_KEY,DEFAULT_BASE_PRESET_8);break;
        }
         default:{
             return null;
        }
        ;
    }
     array = array.split(",");
     return array;
}

function saveBaseTypeValues(array,type)
{
     switch(type)
    {
         case "1":{
             setSetting(BASE_PRESET_1_VALUE_KEY,array.join(","));break;
        }
         case "2":{
             setSetting(BASE_PRESET_2_VALUE_KEY,array.join(","));break;
        }
         case "3":{
             setSetting(BASE_PRESET_3_VALUE_KEY,array.join(","));break;
        }
         case "4":{
             setSetting(BASE_PRESET_4_VALUE_KEY,array.join(","));break;
        }
         case "5":{
             setSetting(BASE_PRESET_5_VALUE_KEY,array.join(","));break;
        }
         case "6":{
             setSetting(BASE_PRESET_6_VALUE_KEY,array.join(","));break;
        }
         case "7":{
             setSetting(BASE_PRESET_7_VALUE_KEY,array.join(","));break;
        }
         case "8":{
             setSetting(BASE_PRESET_8_VALUE_KEY,array.join(","));break;
        }
    }
}

function onBaseTypeSet(baseId,type)
{
    //console.log(type+"-"+baseId);
     if($(type+"-"+baseId).getAttribute("class") =="settingsLinkSelected")
    {
        //Clear
         $(type+"-"+baseId).setAttribute("class","settingsLink");
         fillCells(baseId,"clear");
    }
     else
    {
        //apply
        $(type+"-"+baseId).setAttribute("class","settingsLinkSelected");
        for (i=1;i<=8;i++)
        {
            if (i!=type) $(i+"-"+baseId).setAttribute("class","settingsLink");
        }
        //console.log(baseId);
        fillCells(baseId,type);
    }
}

function fillCells(baseId,type)
{
    var targetValues = getBaseTypeValues(type);
    //console.log("//a[contains(@href,'base.aspx?base="+baseId+"')]");
    var baseLink = document.evaluate(
    "//a[contains(@href,'base.aspx?base="+baseId+"')]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //console.log("Found "+baseLink.singleNodeValue +" base.");
    var row = baseLink.parentNode.parentNode;
    //console.log(row);
    var styleColour1 = unescape(getSetting(STRUCT_COLOUR1_KEY,"aqua"));
    var styleColour2 = unescape(getSetting(STRUCT_COLOUR2_KEY,"orange"));
	var styleColour3 = unescape(getSetting(STRUCT_COLOUR3_KEY,"green"));
	var styleColour4 = "";
    for(var i=2;i<row.childNodes.length;i++)
    {
        var cell = row.childNodes[i];
        //Reset
        if(cell.childNodes.length ==1)
        {
            var small = cell.childNodes[0];
            if(small.style.color == styleColour1) small.style.color="white";
            if(small.style.color == styleColour2) cell.removeChild(small);
        }
        if(type=="clear")
        {
            //console.log("resetting cell");
            continue;
        }
        var targetValue = targetValues[i-2];
        if(targetValue == "-1") continue;
        //console.log(cell);
        //console.log(i+": "+targetValue);
        if(cell.childNodes.length ==1)
        {
            var count = parseNum(small.textContent);
            if(count < targetValue)
			{
				small.style.color = styleColour1;
				small.style.background="";
                small.title = "Goal: " + targetValue + ", " + (targetValue-count) + " left to go.";
			}
			if(count >= targetValue && targetValue != 0) {
                small.style.background = styleColour4;
                small.style.color = styleColour3;
            }
        }
        else
        {
            if(targetValue > 0)
            {
                var small = document.createElement("small");
                small.style.color = styleColour2;
                small.textContent = targetValue;
                cell.appendChild(small);
            }
        }
    }
}

function insertEditRows()
{
    var table = document.evaluate(
    "//table[@class='layout listing1']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(table);
    var typeArray = new Array("1","2","3","4","5","6","7","8");
    var typeNameArray = new Array(getSetting(BASE_PRESET_1_NAME_KEY,DEFAULT_BASE_PRESET_NAME_1),
    getSetting(BASE_PRESET_2_NAME_KEY,DEFAULT_BASE_PRESET_NAME_2),
    getSetting(BASE_PRESET_3_NAME_KEY,DEFAULT_BASE_PRESET_NAME_3),
    getSetting(BASE_PRESET_4_NAME_KEY,DEFAULT_BASE_PRESET_NAME_4),
    getSetting(BASE_PRESET_5_NAME_KEY,DEFAULT_BASE_PRESET_NAME_5),
    getSetting(BASE_PRESET_6_NAME_KEY,DEFAULT_BASE_PRESET_NAME_6),
    getSetting(BASE_PRESET_7_NAME_KEY,DEFAULT_BASE_PRESET_NAME_7),
    getSetting(BASE_PRESET_8_NAME_KEY,DEFAULT_BASE_PRESET_NAME_8));

    var typeTitleArray = new Array(getSetting(BASE_PRESET_1_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_1),
    getSetting(BASE_PRESET_2_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_2),
    getSetting(BASE_PRESET_3_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_3),
    getSetting(BASE_PRESET_4_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_4),
    getSetting(BASE_PRESET_5_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_5),
    getSetting(BASE_PRESET_6_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_6),
    getSetting(BASE_PRESET_7_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_7),
    getSetting(BASE_PRESET_8_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_8));
    for(var j = 0;j<typeArray.length;j++)
    {
        var newRow = document.createElement("tr");
        newRow.setAttribute("align","center");
        newRow.setAttribute("id",typeArray[j]);
        var newCell = document.createElement("td");
        newCell.setAttribute("align","right");
        newCell.setAttribute("style","padding-right:5px");
        newCell.colspan = 2;
        newCell.innerHTML = "<input type='text' size='1.5' value='"+typeNameArray[j]+"' /><br /><input type='text' size='4' value='"+typeTitleArray[j]+"' />";
        newRow.appendChild(newCell);
        var typeValues = getBaseTypeValues(typeArray[j]);
        //console.log(typeValues);
        for(var i = 0;i<=32;i++)
        {
            newCell = document.createElement("td");
            if(i!=22)
            {
                //console.log(typeValues[i]);
                newCell.innerHTML ="<input type='text' size='1.5' value='"+typeValues[i]+"' />";
            }
            newRow.appendChild(newCell);
        }
        table.firstChild.appendChild(newRow);
    }

    var center = document.createElement("center");
    center.setAttribute("style","margin-top: 5px;");
    var button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Save");
    button.setAttribute("id","save");
    center.appendChild(button);
    document.body.appendChild(center);
    var href = location.replace("&mode=edit","");
    button.addEventListener('click',function(event){
       saveNewBaseTypeValues();     window.location = href;
    }
    ,true);
    button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Cancel");
    button.setAttribute("id","Cancel");
    button.setAttribute("style","margin-left: 5px;");
    center.appendChild(button);
    button.addEventListener('click',function(event){
        window.location = href;
    }
    ,true);
}

function saveNewBaseTypeValues()
{
    //console.log("Saving new base type values");
     var rows = document.evaluate(
    "//tr[@id='1' or @id='2' or @id='3' or @id='4' or @id='5' or @id='6' or @id='7' or @id='8']",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);
    //console.log(rows.snapshotItem(0).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_1_NAME_KEY,rows.snapshotItem(0).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_2_NAME_KEY,rows.snapshotItem(1).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_3_NAME_KEY,rows.snapshotItem(2).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_4_NAME_KEY,rows.snapshotItem(3).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_5_NAME_KEY,rows.snapshotItem(4).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_6_NAME_KEY,rows.snapshotItem(5).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_7_NAME_KEY,rows.snapshotItem(6).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_8_NAME_KEY,rows.snapshotItem(7).childNodes[0].firstChild.value);

     setSetting(BASE_PRESET_1_TITLE_KEY,rows.snapshotItem(0).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_2_TITLE_KEY,rows.snapshotItem(1).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_3_TITLE_KEY,rows.snapshotItem(2).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_4_TITLE_KEY,rows.snapshotItem(3).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_5_TITLE_KEY,rows.snapshotItem(4).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_6_TITLE_KEY,rows.snapshotItem(5).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_7_TITLE_KEY,rows.snapshotItem(6).childNodes[0].childNodes[2].value);
     setSetting(BASE_PRESET_8_TITLE_KEY,rows.snapshotItem(7).childNodes[0].childNodes[2].value);
    //console.log(rows[0].childNodes[0].firstChild.value);
     for(var j=0;j<rows.snapshotLength;j++)
    {
         var array = new Array();
         var row = rows.snapshotItem(j);
         var type = row.getAttribute("id");
        //console.log(row);
         for(var i=1;i<row.childNodes.length;i++)
        {
             var structureId = (i-1);
             if(i!=23)
            {
                //console.log(row.childNodes[i].firstChild.value);
                 array[structureId]=row.childNodes[i].firstChild.value;
            }
             else
             array[structureId]="-1";
        }
         saveBaseTypeValues(array,type);
    }
}
function saveBaseCoords(){
    baseCoordArray=document.body.innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/g);
    baseCoords = "";
    for(i=0; i<baseCoordArray.length; i=i+2){
        baseCoords= baseCoords+baseCoordArray[i]+","
    }
    setSetting("baseCoords", baseCoords)
}
function saveBases()
{
    //console.log("Saving bases");
    var links = document.evaluate(
    "//a[contains(@href,'base.aspx?base=')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(links.snapshotLength);
    bases = new Array();
    for(var i=0;i<links.snapshotLength;i++)
    {
        var link = links.snapshotItem(i);
        //console.log(link);
        bases[i] = link.textContent+ "=" +link.href.split("=")[1];
    }
    //console.log(bases);
    setSetting("bases",escape(bases.join(",")));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    setSetting('lastBaseCheck', currentTime);
}

function loadBases()
{
    var loaded = getSetting("bases",null);
    if(!loaded) return;
    loaded = unescape(loaded);
    bases = loaded.split(",");
    //console.log(bases);
    return bases;
}

function isBase(base)
{
    if(bases==null) var bases = loadBases();
    if(bases==null) return false;
    for(var i=0;i<bases.length;i++)
    {
//      console.log("Base: "+base+" Compared: "+bases[i].split("=")[0])
        if(base == bases[i].split("=")[0])
        return true;
    }
    return false;
}


function checkBaseDataAge()
{
    if(getSetting('bases',null) == null) return;
    //console.log('Base data check.');
    var lastBaseCheck = parseNum(getSetting('lastBaseCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastBaseCheck: '+lastBaseCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime < (lastBaseCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastBaseCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastBaseCheck + (864000*3)))
    {
         insertNotification('Base data has not been updated in over three days.<br />'
        +'   Visit the empire structures page to refresh the information.<br /><br /><br />');
    }
}

function saveBaseTypes()
{
    //console.log(baseTypes);
     setSetting("newBaseTypes",escape(baseTypes.join(",")));
}

function loadBaseTypes()
{
     var loaded = getSetting("newBaseTypes",null);
     if(!loaded)
     return;
     loaded = unescape(loaded);
     baseTypes = loaded.split(",");
    //console.log(baseTypes);
}

//==========================================
//Fleet movement links
//==========================================
var supportShips = new Array("Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier");
var attackShips = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Destroyer","Frigate","Ion Frigate",
"Cruiser","Heavy Cruiser","Battleship","Dreadnought","Titan","Leviathan","Death Star");
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
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:maxquant('"+attackShips[i]+"');";
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

function insertMoveFleetLinks()
{
    setAvailableShips();
    var allNoFTHref = createAllMovementNoFTHref();
    var supportHref = createSupportMovementHref();
    var attackHref = createAttackMovementHref(true);
    var attackNoFTHref = createAttackMovementHref(false);
    try {
    var cell = document.evaluate(
    "//a[text()='All']",
    document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    } catch (e) { return; }
    if(!cell) return;
    cell = cell.parentNode;
    var noneLink = cell.childNodes[2];
    cell.removeChild(noneLink);
    cell.innerHTML = cell.innerHTML+' <a href="'+allNoFTHref+'">All(no FT)</a> - <a href="'+supportHref+
    '">Support</a> - <a href="'+attackHref+'">Attack</a> - <a href="'+attackNoFTHref+'">Attack(no FT)</a> - ';
    cell.setAttribute("colspan","3");
    cell.parentNode.removeChild(cell.nextSibling);
    cell.parentNode.removeChild(cell.previousSibling);
    cell.appendChild(noneLink);
}

//==========================================
//Format Numbers
//==========================================
function formatVariousNumbers()
{
    try {
        var debrisElement = document.evaluate(
        "//center[contains(text(),'Debris')]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(debrisElement !=null)
        {
            var debrisMessage = debrisElement.textContent;
//          console.log(debrisMessage);
            var indexOfText = debrisMessage.indexOf(" credits");
            var valueText = debrisMessage.substring(0,indexOfText);
            var value = commaFormat(parseNum(valueText));
        //console.log(valueText+" new value:" +value.toString());
        //console.log(debrisElement.textContent + " -< " + debrisElement.textContent.replace(valueText,value.toString()));
            debrisElement.textContent = debrisElement.textContent.replace(valueText,value.toString());
        }
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n "+e) }
}

function sumSingleFleet()
{
    var regex = /<td><b>(.*?)<\/b><\/td><td align=.*?>([0-9\.,]+?)<\/td>/ig;
    var source = document.body.innerHTML, result;
    var fightingSize = 0, totalSize = 0;
    do
    {
        result = regex.exec(source);
        if(result)
        {
            //console.log(result[2]);
            var shipName = result[1];
            var shipIndex = getShipIndex(shipName);
            var shipCount = parseFloat(result[2].replace(/,?/g,""));
            var shipSize =  shipValues[shipIndex] * shipCount;
            //console.log("Shipcount: '"+shipCount +"' Shipname: '"+ shipName +"'(s) ("+shipSize+") is fighting ship: "+isFightingShip(shipIndex));
            totalSize += shipSize;
            if(isFightingShip(shipIndex)) fightingSize += shipSize;
        }
    }
    while(result)
    var table = document.evaluate(
        "//table[ @class='layout listing']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(rows);
    if(!table)
        return;
	table = table.firstChild;
    //console.log(table);

    table.innerHTML = table.innerHTML + "<tr><td><b>Fighting Size</b></td><td align='center'>"+fightingSize+"</td></tr>"+
                                        "<tr><td><b>Total Size</b></td><td align='center'>"+totalSize+"</td></tr>";

}

//==========================================
//Sum Credits Page
//==========================================
function sumCreditsPage()
{
    // Code runs on credits.aspx and sums up values.
    // The main usefulness is to figure how much debris you picked up.
    var regex = /<td>(.+?)<\/td><td>(.[,\.\d]+?)<\/td>/ig;
    var source = document.body.innerHTML, result, debris = 0, income = 0, otherIncome = 0, pillage = 0, loss = 0, production = 0, construction = 0,research = 0; tradeRoutes = 0, plunderedRoutes = 0, goodsSale = 0;
    do
    {
        result = regex.exec(source);
        //console.log(result);
        if(result)
        {
            //console.log(result[1]+": "+parseNum(result[2]));
            if(result[1].indexOf('Pillage of') !== -1) pillage += parseNum(result[2]);
            else if(result[1].indexOf('Empire Income') !== -1) income += parseNum(result[2]);
            else if(result[1].indexOf('Debris Collect') !== -1) debris += parseNum(result[2]);
            else if(result[1].indexOf('Production') !== -1) production += parseNum(result[2]);
            else if(result[1].indexOf('Construction') !== -1) construction += parseNum(result[2]);
            else if(result[1].indexOf('Research of') !== -1) research += parseNum(result[2]);
            else if(result[1].indexOf('New trade route') !== -1) tradeRoutes += parseNum(result[2]);
            else if(result[1].indexOf('Plunder of trade route') !== -1) plunderedRoutes += parseNum(result[2]);
            else if(result[1].indexOf('Sale of') !== -1) goodsSale += parseNum(result[2]);
            else if(parseNum(result[2]) > 0) otherIncome += parseNum(result[2]);
            else loss += parseNum(result[2]);
        }
    }
    while(result)
    //alert("Debris: " + debris + "\nPillage: " + pillage + "\nIncome: " + income + "\nSpendings: " + loss + "\n\nNet Income: " + (debris + pillage + income));
    var html = "<tr><th align='center' colspan='2'>Credit Summary</th></tr>"+
        "<tr><td>Income:</td><td align='center'>"+commaFormat(income)+"</td></tr>"+
        "<tr><td>Debris Collect:</td><td align='center'>"+commaFormat(debris)+"</td></tr>"+
        "<tr><td>Pillage:</td><td align='center'>"+commaFormat(pillage)+"</td></tr>"+
        "<tr><td>Sale of goods:</td><td align='center'>"+commaFormat(goodsSale)+"</td></tr>"+
        "<tr><td>Production:</td><td align='center'>"+commaFormat(production)+"</td></tr>"+
        "<tr><td>Construction:</td><td align='center'>"+commaFormat(construction)+"</td></tr>"+
        "<tr><td>Research:</td><td align='center'>"+commaFormat(research)+"</td></tr>"+
        "<tr><td>New Trade Routes:</td><td align='center'>"+commaFormat(tradeRoutes)+"</td></tr>"+
        "<tr><td>Plundered Trade Routes:</td><td align='center'>"+commaFormat(plunderedRoutes)+"</td></tr>"+
        "<tr><td>Other Income:</td><td align='center'>"
        +commaFormat(otherIncome)+"</td></tr>"+
        "<tr><td>Other Expenditures:</td><td align='center'>"
        +commaFormat(loss)+"</td></tr>"+
        "<tr><td>Total In/Out:</td><td align='center'>"
    +commaFormat((income + debris + pillage + goodsSale + production + construction+
    research + tradeRoutes + plunderedRoutes  + otherIncome + loss))
    +"</td></tr>";
    var newCell = document.createElement("table");
    newCell.width = 300;
    newCell.innerHTML = html;
    $("credits_table").insertRow(1)
    $("credits_table_inside").parentNode.insertBefore(newCell,$("credits_table_inside"));
   $("credits_table_inside").parentNode.insertBefore(document.createElement("br"),$("credits_table_inside"));
   $("credits_table_inside").parentNode.setAttribute("align","center");
}

//==========================================
//Swap Location Names
//==========================================

function replaceLocationNames(){
    if(getSetting(LOCATION_NAMES_KEY,null) == null)
        return;

    //select all links without img child nodes
    var links = document.evaluate(
            "//a[contains(@href,'loc=') and (count(img) = 0)]",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);

    //console.log("Links: "+links.snapshotLength);

    for(var i=0;i<links.snapshotLength;i++)
    {
        //console.log(links.snapshotItem(i));
        links.snapshotItem(i).textContent = getLocationName(links.snapshotItem(i).textContent);
    }
}

var names = null;
function getLocationName(location){
    if(names == null)
        var names = getSetting(LOCATION_NAMES_KEY,null);
    if(names == null)
        return;
    names = unescape(names);
    //console.log("names: "+names);
    var namesArray = names.split(",");
    for(var i = 0;i<namesArray.length;i++)
    {
        var def = namesArray[i].split("=");
        //console.log(def);
        if(def[0] == location)
            return def[1];
    }
    return location;
}

//==========================================
//Calculate Depart Time
//==========================================

function insertArriveTimeTextBox(){
    //console.log("arrival time");
    var moveButton = document.evaluate(
    "//input[@value='Move']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!moveButton) return;
    var th = moveButton.parentNode.parentNode.nextSibling.firstChild;
	
    //console.log(th);
    var textBox = document.createElement("input");
    textBox.setAttribute("class","input-numeric quant");
    textBox.setAttribute("type","text");
    textBox.setAttribute("style","width:200px;margin-top:5px;margin-bottom:5px;");
    textBox.setAttribute("id","arrivalTime");
    textBox.value = getCurrentServerTime();
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
      
   
    document.getElementById("launchButton").addEventListener("click",function(){if(document.getElementById("launchButton").value == "Enable Auto-launch"){document.getElementById("launchButton").value = "Disable Auto-launch";}else{document.getElementById("launchButton").value = "Enable Auto-launch";}},true);
   
	
    
}

function getLaunchTime(){
    try{
        var departDate = calculateLaunchTime();
        //console.log(departDate.getYear());
        resultString = (zeroPad(departDate.getDate()) +"-"+ zeroPad(departDate.getMonth()) +"-"+ departDate.getFullYear() +" "+ zeroPad(departDate.getHours()) +
        ":"+ zeroPad(departDate.getMinutes()) +":"+ zeroPad(departDate.getSeconds()));
        var departDateSpan = $("departDateSpan");
            departDateSpan.innerHTML = "<br/>Depart Time: "+resultString;
        //var launchTime = arrivalTime - (travelSeconds * 1000)
            var reminderButton = $("setReminder");
            if(reminderButton == null)
            {
                reminderButton = document.createElement("input");
                reminderButton.setAttribute("id","setReminder");
                reminderButton.setAttribute("type","button");
                reminderButton.setAttribute("value","Set Reminder");
                reminderButton.setAttribute("style","margin-left:5px;");
                departDateSpan.parentNode.appendChild(reminderButton);
                $("setReminder").addEventListener("click",function(event){saveReminder();},true);
            }
    } catch(e) { console.log ("Line Number: "+e.lineNumber+"\n "+e)}
}

function calculateLaunchTime(){
    try {
        var currentTime = getCurrentServerTime();
        var durationString = $('duration').textContent;
        var arrivalString = $('arrivalTime').value;
        //console.log(currentTime +" + "+durationString+" = "+arrivalString);
        if(durationString =="")
        {
            throw "No duration. Set fleet and destination.";
        }
        var durationSeconds = getSeconds(durationString);
        var arrivalDate = getDateObject(arrivalString);
        var departDate = new Date();
        departDate.setTime(arrivalDate.getTime() - (durationSeconds * 1000));
        //console.log(departDate);
    } catch(e) { console.log ("Line Number: "+e.lineNumber+"\n "+e)}
    return departDate;
}

function saveReminder(){
    //console.log("Save remindeR");
    try{
        var departDate = calculateLaunchTime();
        //console.log("Saving depart date: "+departDate+ " -> "+departDate.getTime());
        setSetting("FleetReminders",""+departDate.getTime());
        notify("Launch reminder set");
    } catch(e) { console.log ("Line Number: "+e.lineNumber+"\n "+e)}
}

function insertFleetReminderCountdowns(){
    try
    {
         var departDateString = getSetting("FleetReminders","-");
         if(departDateString == "-")
             return;
        var id = 0;
//        for (id=0;id!=null;id++){
         //console.log(parseNum(departDateString));
         var departDate = new Date();
         departDate.setTime(parseNum(departDateString));

         //console.log(departDate);

         var currentTime = getDateObject(getCurrentServerTime());
         var timeRemaining = (departDate.getTime() - currentTime.getTime())/1000;

         //console.log("inserting fleet reminder countdowns");
         if(timeRemaining > 0)
         {
             //var id = unsafeWindow.q ==undefined? 1:unsafeWindow.q+1;
             var countDownDiv = document.createElement("div");

     //      countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='fleettime"+(id)+"'>-</span>";
             countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='fleettime"+id+"'>-</span>";
             //console.log(countDownDiv.innerHTML);
             document.body.firstChild.appendChild(countDownDiv);
         }
         else
         {
             setSetting("FleetReminders","-");
             //console.log("Reminder expired. Cleared.");
         }
         localTFunction(""+id);
//         }
     //  if(unsafeWindow.t == undefined)
     //  {
     //        console.log(localTFunction);
     //      localTFunction();
     //    }
     } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n insertFleetReminderCountdowns(): "+e); }
}

//15-05-2008 4:37:00
function getDateObject(dateString){
    var regex = /(\d+)-(\d+)-(\d+)+\W(\d+):(\d+):(\d+)/;
    var result = regex.exec(dateString);
    if(result)
    {
        //year,month,day,hr,min,sec
        //console.log(result[3]+" "+result[2]+" "+result[1]+" "+result[4]+" "+result[5]+" "+result[6]);
        return new Date(result[3],(result[2]-1),result[1],result[4],result[5],result[6]);
    }
    else if (dateString)
    {
        notify ("Invalid arrival input "+dateString+". Ensure arrival time is in the following format. MM-DD-YYYY HH:MM:SS");
        setSetting("FleetReminders","-");
    }
}

function getCurrentServerTime(){
    try{
      var regex = /<small>Server time: ((\d+)-(\d+)-(\d)+\W(\d+):(\d+):(\d+))<\/small>/;
      var source = document.body.innerHTML;
      var result = regex.exec(source);
      if(result)
      {
          //console.log(result[1]);
          return result[1];
      }
      else
      {
          if (!$('pageDate')) return;
          var pageDate = $('pageDate');
          var timerDateObject = new Date();
          var time = parseNum(pageDate.title);
          if (!time) return;
          time += 1000;
          pageDate.title = time;
          timerDateObject.setTime(time);
          return '' + zeroPad(timerDateObject.getDate()) + '-' + zeroPad(parseNum(timerDateObject.getMonth()) + 1) + '-' + timerDateObject.getFullYear() + ' '
                          + timerDateObject.getHours() + ':' + zeroPad(timerDateObject.getMinutes()) + ':' + zeroPad(timerDateObject.getSeconds());
      }
    } catch (e) {console.log ("getCurrentServerTime error: "+e)}
}

var animateTimer = function animateTimer() {
    try{
		var timerID = 'pageDate';
		if(isNewStyle())
		{
			timerID = 'top-header_server-time';
		}
      if (!$(timerID)) return;
      var pageDate = $(timerID);
      var timerDateObject = new Date();
      var time = parseNum(pageDate.title);
      if (!time) return;
      time += 1000;

      pageDate.title = time;
      timerDateObject.setTime(time);
	  var localDate = null;
      if(getSetting(LOCAL_TIME_SHOW_KEY,true))
	  {
		  localDate = $('localDate');
		  time = parseNum(localDate.title);
		  time += 1000;
	      localDate.title = time;
		  var lTimerDateObject = new Date();
	      lTimerDateObject.setTime(time);
		  localDate.innerHTML = 'Local time: &nbsp;' + zeroPad(lTimerDateObject.getDate()) + '-' + zeroPad(parseNum(lTimerDateObject.getMonth() + 1)) + '-' + lTimerDateObject.getFullYear() + ' '
	                          + lTimerDateObject.getHours() + ':' + zeroPad(lTimerDateObject.getMinutes()) + ':' + zeroPad(lTimerDateObject.getSeconds());
			   var diff = secsToHMS(Math.abs(parseNum(parseNum(pageDate.title) - parseNum(localDate.title))/1000));
			   var sign = "+";
			   if(parseNum(pageDate.title) > parseNum(localDate.title))
			   {
					sign = "-";
			   }
		  localDate.innerHTML += "<br/> Difference( "+sign+""+diff+" )";
	  }
	  pageDate.innerHTML = 'Server time: ' + zeroPad(timerDateObject.getDate()) + '-' + zeroPad(parseNum(timerDateObject.getMonth() + 1)) + '-' + timerDateObject.getFullYear() + ' '
                          + timerDateObject.getHours() + ':' + zeroPad(timerDateObject.getMinutes()) + ':' + zeroPad(timerDateObject.getSeconds());
	  delete timerDateObject;
	  delete time;
	  delete pageDate;
	  delete lTimerDateObject;
	  setTimeout(animateTimer, 1000);
    } catch (e) {console.log ("animatetimer error: "+e)}
}
setupTimer = function() {
    try{
		var timeContainer = "//small";
		var splitValue = ": ";
		var timerID = "pageDate";
		var style = "";
		if(isNewStyle())
		{
			timeContainer = "//div[@id='top-header_server-time']";
			splitValue = "time ";
			timerID = "top-header_server-time";
			style = "style='color:#FFF;'";
		}
       if (getSetting(ANIMATE_SERVER_TIME_KEY,true) && getSetting(STATIC_SERVER_TIME_KEY,true))
       {
       var timerHtmlElement = document.evaluate(timeContainer, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
       var timerText = timerHtmlElement.innerHTML.split(splitValue);
       var pageDate = AEDateToTime(timerText[1]);
       timerHtmlElement.id = 'staticPageDate';
       var copy = timerHtmlElement.cloneNode(true);
       var staticTimerHtmlElement = $('staticPageDate');
       staticTimerHtmlElement.textContents = "Page loaded at: "+pageDate;
       var br = document.createElement("br");
       var br = staticTimerHtmlElement.parentNode.appendChild(br,staticTimerHtmlElement);
       var animtimerHtmlElement=staticTimerHtmlElement.parentNode.appendChild(copy,br);
       animtimerHtmlElement.title = pageDate.getTime();
       animtimerHtmlElement.id = timerID;
	   if(getSetting(LOCAL_TIME_SHOW_KEY,true))
	   {
		   var now = new Date();
		   var diff = secsToHMS(Math.abs(parseNum((pageDate.getTime() - now.getTime())/1000)));
		   var localTime ="<div align='center'><small "+style+" id='localDate' title='"+now.getTime()+"'> Local time:  &nbsp;" + zeroPad(now.getDate()) + "-" + zeroPad(now.getMonth()+1)+ "-"+now.getFullYear() +" "+ zeroPad(now.getHours()) + ":"+zeroPad(now.getMinutes())+":"+zeroPad(now.getSeconds());
	       localTime += "<br/> Difference( "+diff+" )</small></div>";
		   AddLocalTime(localTime);
		   delete now;
	   }
	   delete pageDate;
       animateTimer();
          return;
       }
       else if (getSetting(ANIMATE_SERVER_TIME_KEY,true))
       {
           var animtimerHtmlElement = document.evaluate(timeContainer, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
           var timerText = animtimerHtmlElement.innerHTML.split(splitValue);
           var pageDate = AEDateToTime(timerText[1]);
		   animtimerHtmlElement.title = pageDate.getTime();
           animtimerHtmlElement.id = timerID;
		   if(getSetting(LOCAL_TIME_SHOW_KEY,true))
		   {
			   var now = new Date();
			   var diff = secsToHMS(Math.abs(parseNum((pageDate.getTime() - now.getTime())/1000)));
			   var localTime ="<div align='center'><small "+style+" id='localDate' title='"+now.getTime()+"'> Local time:  &nbsp;" + zeroPad(now.getDate()) + "-" + zeroPad(now.getMonth()+1)+ "-"+now.getFullYear() +" "+ zeroPad(now.getHours()) + ":"+zeroPad(now.getMinutes())+":"+zeroPad(now.getSeconds());
				localTime += "<br/> Difference( "+diff+" )</small></div>";
			   AddLocalTime(localTime);
			   delete now;
		   }
		   
		   delete pageDate;
           animateTimer();
           return;
       }
       else
       {
           var timerHtmlElement = document.evaluate(timeContainer, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
           var timerText = timerHtmlElement.innerHTML.split(splitValue);
           var pageDate = AEDateToTime(timerText[1]);
           timerHtmlElement.title = pageDate.getTime();
           timerHtmlElement.id = timerID;
		   if(getSetting(LOCAL_TIME_SHOW_KEY,true))
		   {
			   var now = new Date();
			   var diff = secsToHMS(Math.abs(parseNum((pageDate.getTime() - now.getTime())/1000)));
			   var sign = "+";
			   if(pageDate.getTime() > now.getTime())
			   {
					sign = "-";
			   }
			   var localTime ="<div align='center'><small "+style+" id='localDate' title='"+now.getTime()+"'> Local time:  &nbsp;" + zeroPad(now.getDate()) + "-" + zeroPad(now.getMonth()+1)+ "-"+now.getFullYear() +" "+ zeroPad(now.getHours()) + ":"+zeroPad(now.getMinutes())+":"+zeroPad(now.getSeconds());
			   localTime += "<br/> Difference( "+sign+""+diff+" )</small></div>";
			   AddLocalTime(localTime);
			   delete now;
		   }
		   delete pageDate
           return;
       }
    } catch (e) {console.log ("setuptimer error: "+e)}
}
function AddLocalTime(localTime)
{
	var evalString = '//small[@id="pageDate"]';
	if(isNewStyle())
	{
		evalString = "//div[@id='top-header_server-time']";
	}
	var head = document.evaluate( evalString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode;
	head.innerHTML += localTime;
}
// Nab a date in DD-MM-YYYY HH:II:SS format and convert it to an object.
AEDateToTime = function(timerText)
{
    timerText = timerText.split(' ');
    var date = timerText[0].split('-');
    var time = timerText[1].split(':');

    var pageDate = new Date();
    pageDate.setFullYear(date[2]);
    pageDate.setMonth(parseNum(date[1] - 1));
    pageDate.setDate(date[0]);

    pageDate.setHours(time[0]);
    pageDate.setMinutes(time[1]);
    pageDate.setSeconds(time[2]);
	
	delete date;
	delete time;
	
    return pageDate;
}
//15-05-2008 4:37:00
function getDateString(date){

    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+zeroPad(date.getHours())+":"+zeroPad(date.getMinutes())+":"+zeroPad(date.getSeconds());
}

//==========================================
//Add finishing times
//Based on code from FlxGrey on AE Forums. Thanks!
//"Mostly based off the code from spectre3ooo, but edited to be a little more sturdy." - FlxGrey
//Month part added by hightower, 24 hours clock/ single line fix by BishopGumby
//==========================================
function zeroPad(num){
     if(num <= 9)
     return "0" + num;
     return num;
}

function getAgeCol(age) {
    var col = getSetting(HIGHLIGHT_TIMER8_CSS_KEY,"color:#BBBBBB;font-size:8pt;"); // Longer than 48 hours
    if (age <= 3600) // 1 hour
        col = getSetting(HIGHLIGHT_TIMER1_CSS_KEY,'color:#FFAA00;font-size:8pt;');
    else if (age <=7200) // 2 hours
        col = getSetting(HIGHLIGHT_TIMER2_CSS_KEY,'color:#2222FF;font-size:8pt;');
    else if (age <=10800) // 3 hours
        col = getSetting(HIGHLIGHT_TIMER3_CSS_KEY,'color:#4444FF;font-size:8pt;');
    else if (age <=21600) // 6 hours
        col = getSetting(HIGHLIGHT_TIMER4_CSS_KEY,'color:#8888FF;font-size:8pt;');
    else if (age <=43200) // 12 hours
        col = getSetting(HIGHLIGHT_TIMER5_CSS_KEY,'color:#BBBBFF;font-size:8pt;');
    else if (age <=86400) // 24 hours
        col = getSetting(HIGHLIGHT_TIMER6_CSS_KEY,'color:#FFFFFF;font-size:8pt;');
    else if (age <=172800) // 48 hours
        col = getSetting(HIGHLIGHT_TIMER7_CSS_KEY,'color:#DDDDDD;font-size:8pt;');
    return unescape(col);
}
function addFinishTimes(singleLine){
    try {
    var id, time, date, day = new Array("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat");
    var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec");

    if (getSetting(USE_SERVER_TIME,false) && getCurrentServerTime()) {
           var now = getDateObject(getCurrentServerTime());
           var future = getDateObject(getCurrentServerTime());
    } else {
           var now = new Date(); var future = new Date();
    }
    var separator = singleLine? " ":"<br />";
    var td_list = document.getElementsByTagName('td');
    for(var i = 0; i < td_list.length; i++)
    {
        if(td_list[i].id.indexOf('time') !== -1 && parseNum(td_list[i].title) > 0)
        {
            id = td_list[i].id;
            time = td_list[i].title;
            future.setTime(now.getTime() + (time * 1000));
            var style = ""+getAgeCol(time);
            if(future.getDate() == now.getDate() && future.getMonth() == now.getMonth() && future.getYear() == now.getYear())
            {
                date = "Today @ ";
//                style = style+";color:"+getAgeCol(time);
           }
            else if(future.getDate() - now.getDate() == 1 && !singleLine)
            {
                date = "Tomorrow @ ";
//                style = style+";color:"+getAgeCol(time);
            }
            else if(future.getMonth() == now.getMonth())
            {
                date = day[future.getDay()] + " " + future.getDate() + " @ ";
//                style = style+";color:"+getAgeCol(time);
            }
            else
            {
                date = day[future.getDay()] + " " + future.getDate() + " " + month[future.getMonth()] + " " + " @ ";
//                style = style+";color:"+getAgeCol(time);
            }
            if(getSetting(HOUR_24_DISPLAY_KEY,false))
            {
                date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds());
            }
            else
            {
                if(future.getHours() >= 12)
                {
                    if(future.getHours() > 12)
                        future.setHours(future.getHours()-12);
                    date += (future.getHours()) + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " pm";
                }
                else
                {
                    if(future.getHours() ==0)
                        future.setHours(12);
                    date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " am";
                }
            }
            td_list[i].id = "checked";
            td_list[i].innerHTML = '<span id="' + id + '" title="' + time +'" style="'+unescape(getSetting(HIGHLIGHT_TIMER_CSS_KEY,'font-size:8pt;'))+
            // color: '+getAgeCol(time)+
            '">-</span>'+separator+'<span id="date' + id + '" style="'+style+'">' + date + '</span>';
        }
    }
	delete now;
	delete future;
    if(location.indexOf("fleet.aspx")!=-1)
    {
        var links = document.evaluate("//td[@id='checked']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < links.snapshotLength; i++) {
            links.snapshotItem(i).width="9%"
            //console.log(links.snapshotItem(i).innerHTML);
        }
    }
    } catch (e) {console.log(e);}
}

//==========================================
// Function loads alters time then sets itself to load in 0.2 second
//==========================================
// Original t() for reference
/*
var start_date = (new Date).getTime();
var q = 0;
function t()
{
    for(n=1;n<=q;n++)
    {
        now = (new Date).getTime();
        elem=$('time'+n);

        m=0;h=0;
        var diff = (now - start_date) / 1000;
        s = elem.title - diff;

        if (s >= 1)
        {
            h = Math.floor(s/3600);
            m = Math.floor( (s % 3600)/60 );
            s = Math.floor( (s %60) );
            elem.innerHTML = h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
        }
        else
        {
            elem.innerHTML = '-';
        }
    }
}
setInterval(function(){t();}, 200);
*/
var start_date = (new Date).getTime();

var tFunction = function cpt()
{
try{
    if (unsafeWindow.cpt != typeof func){
        for(var n=1;n<=unsafeWindow.q;n++)
        {
           var now = (new Date).getTime();
           var elem = null;
           if ($('time'+n))
           {
              elem=$('time'+n);
              var m=0; var h=0; var s=0;
              var diff = (now - start_date) / 1000;
              var s = elem.title - diff;
              if (s <= 0)
              {
                elem.innerHTML = '-';
                if ($("datetime"+n)) $("datetime"+n).innerHTML = '';
              }
              else
              {
                  h = Math.floor(s/3600);
                  m = Math.floor( (s % 3600)/60 );
                  s = Math.floor( (s %60) );
                  //            if(s>59){ m=Math.floor(s/60); s=s-m*60 }
                  //            if(m>59){ h=Math.floor(m/60); m=m-h*60 }
                  elem.innerHTML=h+":"+zeroPad(m)+":"+zeroPad(s);
              }
			  delete diff;
			  delete h;
			  delete m;
			  delete s;
           }
		   delete now;
        }
    }
    window.setTimeout(function() { cpt(); }, 1000);

    } catch (e) { console.log (e);}
};
//==========================================
// Updates the date section of timers
//==========================================

// This function is an adaptation of the t() func, clears out the date element and closes out the timer

var updateFunction = function dateupdate(){
    try
    {
    var start = new Date();
    var starttime = start.getTime();
    var q = unsafeWindow.q;
    for(var n=1;n<=unsafeWindow.q;n++)
    {
        var elem = null;
        if ($('time'+n))elem=$('time'+n);
        var s=elem.title;
        if(s<=0)
        {
            elem.innerHTML="-";
            elem.id="ended";
            $('datetime'+n).innerHTML = "";
        }
    }
	delete start;
	delete starttime;
	delete q;
    } catch (e) { console.log (e);}
};

//==========================================
// Refreshs fleet timer
//==========================================
function localTFunction(id){
    try{
        elem=$('fleettime'+id);
        if (!elem) return;
//        console.log("elem: "+elem);
        s=elem.title;
        m=0; h=0;
        if(s<=0)
        {
            elem.innerHTML="-";
        }
        else
        {
            if(s>59){ m=Math.floor(s/60); s=s-m*60 }
            if(m>59){ h=Math.floor(m/60); m=m-h*60 }
            if(s<10){ s="0"+s }
            if(m<10){ m="0"+m }
            elem.innerHTML=h+":"+m+":"+s;
            elem.title -= 1;
            window.setTimeout(function() { localTFunction(id); },1000);
        }
    } catch (e) { console.log (e);}
}

//==========================================
//Replaces the Asterix and shows the Amount
//of Debris on each astro (if any)
//==========================================

function debrisShow()
{
    spanArray = document.getElementsByTagName("span")
    for(i=0; i<spanArray.length; i++)
    {
        if(spanArray[i].getAttribute("class") == "gray comment")
        {
//          Attempt to move debris to a better location commented out due to bug with occ bases
//          spanArray[i].style.cssText='position:relative;top:10px;';
            spanArray[i].innerHTML = spanArray[i].title;
            spanArray[i].parentNode.setAttribute('align','center');
//          var br = document.createElement("br");
//          var tag = spanArray[i];
         
//          spanArray[i].parentNode.insertBefore(br,tag);
        }
    }

}

//==========================================
//Pillage viewer
//==========================================
//Minimum Pillage (at full economy) = [(0.3 * max income) ^2] * 6
//
//At a players base: (number of hours since last pillage; max 100)% * (Base Economy/Total Bases Economy) * Base Owner Credits
//At a NPC base: Pillage = (number of hours since last pillage  max 100)% * Base Economy * 25
//Additional Pillage bonus: 0.5 * ('base actual income'-'new income') * ('base actual income'-'new income')/2 * 24

function checkPillageAmount(){
//  //td/a[text()='"+name+"']/../..
//  var table = document.evaluate("//th[contains(.,'Processing capacity')]",
    var d= document.evaluate("//table[@class = 'layout listing3']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
	var t = d.firstChild;
    var temp = [];
    temp[0] = t.childNodes[4].childNodes[1].textContent;
    temp[1] = t.childNodes[5].childNodes[1].textContent;
    return temp;
}
function attachPillage(){
	try
    {
    var table = document.evaluate("//table[@class = 'layout listing3']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
	table = table.firstChild.insertRow(9);
	if (!table) return;
    var econ = checkPillageAmount();		
    minpillage = Math.floor(6 * Math.pow(econ[1] - (econ[0] * .7),2));
    table.setAttribute('align','center');
    var element = table.insertCell(0);
    element.textContent = "Pillage";
    element = table.insertCell(1);
    element.textContent = minpillage;
    element.setAttribute("colspan","2");
//  console.log("Minimum Pillage: " + minpillage+ " Econ: " + econ[0] + " Income: " + econ[1]);
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\nattachPillage(): "+e); }
}
//==========================================
// Remove board redirects from links
//==========================================
function removeRedirects()
{
    try
    {
       var command = "//body/table";
       if(location.indexOf('guild.aspx')!=-1) command = command+"[last()-1]";
       else command = command+"[last()]";
       var table=document.evaluate(command, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
       if (!table) return;
       var links = table.getElementsByTagName('a');
       for (i=0; i<links.length; i++)
       {
            var tlink = links[i].getAttribute("href");
            //console.log ("\nlink: "+tlink+"\nFixed link: "+tlink.replace(/redirect\.aspx\?/g,''));
            links[i].setAttribute("href",tlink.replace(/redirect\.aspx\?/g,'')+"");
       }
    } catch (e) { console.log ("\nremoveRedirects(): "+e+" Line Number: "+e.lineNumber); }
}
//-----------------------------------
//Clear hidden iframes on battlcalc
//-----------------------------------
function cleanAdverts(tag)
{
   var adverts = document.getElementsByTagName(tag);
   if(adverts.length) {
       for(var i=adverts.length; i>0;) {
           var ref = adverts[--i];
           ref.setAttribute('src','javascript: void(0)');
           ref.parentNode.removeChild(ref);
       }
   }
}

//==========================================
//Config Page
//==========================================

var WoG_DB_CONFIRM_KEY = "config_wogDBconfirm";
var WOG_DB_KEY = "config_wogDB";
var PROFIT_SUM_KEY = "config_profitsum";
var LOCAL_TIME_SHOW_KEY = "config_localTime";
var HIGHLIGHT_COMMANDERS_KEY = "config_commanderHighlight";
var HIGHLIGHT_COMMANDER_CONSTRUCTION = "config_highlightConstuctionCom";
var HIGHLIGHT_COMMANDER_RESEARCH = "config_highlightResearchCom";
var HIGHLIGHT_COMMANDER_PRODUCTION = "config_highlightProductionCom";
var HIGHLIGHT_COMMANDER_DEFENSE = "config_highlightDefenseCom";
var HIGHLIGHT_COMMANDER_TACTICAL = "config_highlightTacticalCom";
var HIGHLIGHT_COMMANDER_LOGISTICS = "config_highlightLogisticsCom";

var HIGHLIGHT_TRADE_PARTNERS_KEY = "config_highlightTradePartners";
var HIGHLIGHT_POOR_TRADES_KEY = "config_highlightPoorTrades";
var POOR_TRADE_UPPER_THRESHOLD_KEY = "config_poorTradeUpperThreshold";
var POOR_TRADE_LOWER_THRESHOLD_KEY = "config_poorTradeLowerThreshold";
var HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY = "config_highlightDuplicateTradePartners";
var SHOW_TOTAL_FLEET_ROW_KEY = "config_showTotalFleetRow";
var SHOW_ATTACK_SIZE_KEY = "config_showFleetAttackSize";
var ENABLE_PRODUCTION_PRESETS_KEY = "config_enableProductionPresets";
var ADD_EMPIRE_SUBMENU_KEY = "config_addEmpireSubmenu";
var MOVE_EMPIRE_SUBMENU_KEY = "config_moveEmpireSubmenu";
var INSERT_BATTLECALC_LINK_KEY = "config_insertBattleCalcLink";
var ADD_FINISH_TIMES_KEY = "config_addFinishTimes";
var ADD_FINISH_TIMES_EMPIRE_KEY = "config_addFinishTimesEmpire";
var FINISH_TIMES_SINGLE_LINE_KEY = "config_finishTimesSingleLine";
var ADJUST_TITLES_KEY = "config_adjustTitles";
var FIX_QUEUES_KEY = "config_fixQueues";
var HOUR_24_DISPLAY_KEY = "config_24hourDisplay";
var HIGHLIGHT_PLAYERS_KEY = "config_highlightPlayers";
var PLAYER_COLORS_KEY = "config_playerColors";
var MY_GUILD_KEY = "config_myGuild";
var MY_NAME_KEY = "config_myName";
var MY_GUILD_COLOUR_KEY = "config_myGuildColour";
var ENEMY_GUILDS_KEY = "config_enemyGuilds";
var NAPPED_GUILDS_KEY = "config_nappedGuilds";
var ALLIED_GUILDS_KEY = "config_alliedGuilds";
var ENEMY_GUILDS_COLOUR_KEY = "config_enemyGuildColour";
var NAPPED_GUILDS_COLOUR_KEY = "config_nappedGuildColour";
var ALLIED_GUILDS_COLOUR_KEY = "config_alliedGuildColour";
var HIGHLIGHT_TRADE_COLOUR_KEY = "config_highlightPlayerColor";
var HIGHLIGHT_TIMER_CSS_KEY = "config_highlightTimerCss";
var HIGHLIGHT_TIMER1_CSS_KEY = "config_highlightTimer1Css";
var HIGHLIGHT_TIMER2_CSS_KEY = "config_highlightTimer2Css";
var HIGHLIGHT_TIMER3_CSS_KEY = "config_highlightTimer3Css";
var HIGHLIGHT_TIMER4_CSS_KEY = "config_highlightTimer4Css";
var HIGHLIGHT_TIMER5_CSS_KEY = "config_highlightTimer5Css";
var HIGHLIGHT_TIMER6_CSS_KEY = "config_highlightTimer6Css";
var HIGHLIGHT_TIMER7_CSS_KEY = "config_highlightTimer7Css";
var HIGHLIGHT_TIMER8_CSS_KEY = "config_highlightTimer8Css";
var HIGHLIGHT_BASE_COLOUR_KEY = "config_highlightBaseColor";
var HIGHLIGHT_SYSTEM_COLOUR_KEY = "config_highlightSystemColor";
var HIGHLIGHT_CUS_SCANNER_KEY = "config_customScannerCoord";
var HIGHLIGHT_CUSBASE_COLOUR_KEY = "config_highlightCustomBaseColor";
var HIGHLIGHT_CUSSYSTEM_COLOUR_KEY = "config_highlightCustomSystemColor";
var STRUCT_COLOUR1_KEY = "config_structColour1";
var STRUCT_COLOUR2_KEY = "config_structColour2";
var STRUCT_COLOUR3_KEY = "config_structColour3";
var ADD_FLEET_MOVE_LINK_KEY = "config_addFleetMoveLink";
var AUTOSET_GUILD_KEY = "config_autosetGuild";
var AUTOSET_GUILD_NOTIFY_KEY = "config_autosetGuildNotify";
var SUM_FLEETS_KEY = "config_sumFleets";
var FLEET_AUTO_LAUNCH_KEY = "config_fleetAutoLanuch";
var FLEET_INFO_POPUP = "config_fleetInfoPopUp";
var FLEET_INFO_POPUP_TIMER = "config_fleetInfoPopUpTime";
var FLEET_INFO_POPUP_FADE = "config_fleetInfoPopUpFade";
var SUM_CREDITS_KEY = "config_sumCredits";
var FORMAT_NUMBERS_KEY = "config_formatNumbers";
var NUMBER_DELIMETER_KEY = "config_numberDelimeter";
var CLONE_BASE_LINKS_KEY = "config_cloneBaseLinks";
var CLONE_FLEET_LINKS_KEY = "config_cloneFleetLinks";
var MOVE_GALAXY_LINKS_KEY = "config_moveGalaxyLinks";
var STRUCTURES_GOALS_KEY = "config_structuresGoals";
var INSERT_MOVE_PRESETS_KEY = "config_insertMovePresets";
var MAX_QUEUES_KEY = "config_maxQueues";
var SHOW_EXECUTION_TIME_KEY = "config_showExecutionTime";
var ENTER_PRODUCTION_TIME_KEY = "config_enterProductionTime";
var NAME_LOCATIONS_KEY = "config_nameLocations";
var LOCATION_NAMES_KEY = "config_locationNames";
var USE_SERVER_TIME = "config_useServerTime";
var SHOW_PILLAGE_KEY = "config_showPillage";
var FORMAT_SCANNER_KEY = "config_formatScanner";
var ANIMATE_SERVER_TIME_KEY = "config_animateServerTime";
var REMOVE_REDIRECT_KEY = "config_removeRedirect";
var PRODUCTION_ENHANCE_KEY = "config_enhanceProd";
var CONSTRUCT_ENHANCE_KEY = "config_enhanceCons";
var SCRIPT_BATTLECALC_KEY = "config_battlecalcScript";
var STATIC_SERVER_TIME_KEY = "config_staticServerTime";
var HIDE_HELP_TEXT_KEY = "config_hideHelpText";

function configBody(tab)
{
    var url = location;
    GM_addStyle('.configHeading {'
        +'   color: gold;'
        +'   font-weight: bold;'
        +'}'
    +'.featureName {'
        +'   color: #EEDC82;'
        +'}'
    +'.subFeatureName {'
        +'   color: #8B814C;'
        +'   padding-left:20'
        +'}'
    +'.footnote {'
        +'   color: gold;'
        +'   font-weight: bold;'
        +'}');
    var width = getTableWidth();
    if (width<900) width = 900;
    var newbody = "<div align='center'>"+
    "<h2>WoG AE Bits - Settings</h2>"+
	"<small>Script Version: "+scriptVersion+"<span id='pageDate'></span></small> <br/><input type='button' value='Check For Updates' id='updateCheckButton' onClick='if(document.getElementById(\"updateCheckButton\").value == \"Check For Updates\"){document.getElementById(\"updateCheckButton\").value = \"Checking For Updates..\";}else{document.getElementById(\"updateCheckButton\").value = \"Check For Updates\";}' />"+
    "<p><div>Direct updates, feedback, and request to <a href='http://www.wrathofgods.net/index.php' target='_new'>WOLF forums</a>.</p>"+
    "<table width='"+width+"'>"+
    "<tr><td></td><th width='230'>Feature</th><th>Description</th><th>Applied to page(s)</th></tr>"+
    "<tr><td colspan='5'></td></tr>";

    //if (!tab)
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>General</td></tr>"+

         "<tr><td><input type='checkbox' id='config_adjustTitles' /></td><td class='featureName'>Adjust Page Titles</td>"+
         "<td style='padding-left:20'>Shortens page titles for better viewing with multiple tabs. Prefixes page titles with server.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td><input type='checkbox' id='config_addEmpireSubmenu' /></td><td class='featureName'>Add empire sub-menu</td>"+
         "<td style='padding-left:20'>Inserts the empire sub menu.</td><td style='padding-left:20'>All except fleet movement</td></tr>"+

         "<tr><td><input type='checkbox' id='config_moveEmpireSubmenu' /></td><td class='featureName'>Move empire sub-menu</td>"+
         "<td style='padding-left:20'>Moves the empire sub menu above adverts in free accounts.</td><td style='padding-left:20'>Empire pages</td></tr>"+

         "<tr><td><input type='checkbox' id='config_insertBattleCalcLink' /></td><td class='featureName'>Add battle calc link</td>"+
         "<td style='padding-left:20'>Inserts a link to the WoG Battle Calculator.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td colspan='2' style='padding-left:10' class='featureName'>Enhanced count down timers.</td>"+
         "<td style='padding-left:20'>Shows dates and times for completion of work in progress. Highlights work to be completed today.</td><td style='padding-left:20'></td></tr>"+

         "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimesEmpire' /> Empire Page</td>"+
         "<td style='padding-left:20'>Enable this feature for empire events pages.</td><td style='padding-left:20'>Empire events</td></tr>"+

         "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimes' /> Other Pages</td>"+
         "<td style='padding-left:20'>Enable this feature for construction and production pages.</td><td style='padding-left:20'>All pages except empire</td></tr>"+

         "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_finishTimesSingleLine' /> Single line</td>"+
         "<td style='padding-left:20'>Display times on a single line.</td><td style='padding-left:20'>Empire</td></tr>"+

         "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_24hourDisplay' /> 24 Hour Clock</td><td style='padding-left:20'>Display times in 24 hour format.</td><td></td></tr>"+

         "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_useServerTime' /> Clocks use sever time</td><td style='padding-left:20'>Display times matched to server time.</td><td></td></tr>"+

         "<tr><td colspan='2' class='featureName'>Main timer css: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimerCss'style='width:200;'/></td><td></td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Less than 1 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer1Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 2 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer2Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 3 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer3Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 6 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer4Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 12 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer5Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 24 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer6Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Less than 48 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer7Css'style='width:200;'/></td><td></td></tr>"+
         "<tr><td colspan='2' class='subfeatureName'>Longer than 48 hours: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimer8Css'style='width:200;'/></td><td></td></tr>"+

         "<tr><td><input type='checkbox' id='config_animateServerTime' /></td><td class='featureName'>Animate Time</td>"+
         "<td style='padding-left:20'>Display constantly updated server time.</td><td style='padding-left:20'>All pages</td></tr>"+

		"<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_staticServerTime' /> Static time</td>"+
         "<td style='padding-left:20'>Shows additional static timer to show when page was loaded.</td><td style='padding-left:20'>All pages</td></tr>"+

		 "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_localTime' /> Local time</td>"+
         "<td style='padding-left:20'>Shows additional timer to show your current local time.</td><td style='padding-left:20'>All pages</td></tr>"+
		 
         "<tr><td><input type='checkbox' id='config_formatNumbers' /></td><td class='featureName'>Format numbers</td>"+
         "<td style='padding-left:20'>Formats fleet size numbers for better readability.</td><td style='padding-left:20'>Base pages</td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Delimeter: <input type='text' id='config_numberDelimeter' style='width:25;' /></td><td style='padding-left:20'></td><td></td></tr>"+


    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Highlights")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Player Highlights</td></tr>"+

         "<tr><td><input type='checkbox' id='config_highlightPlayers' /></td><td class='featureName'>Highlight players</td>"+
         "<td style='padding-left:20'>Highlights players according to guild.<br /><b>Note:</b>This overrides colour from the player highlight feature.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td class='featureName' colspan='2'><input type='checkbox' id='config_autosetGuild' /> Find guild</td>"+
         "<td style='padding-left:20'>Attempt to autoset guild when on profile page.</td><td style='padding-left:20'>Profile</td></tr>"+

         "<tr><td colspan='3' class='subfeatureName'>My Guild Tag<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_myGuild' style='width:100;' /></td>"+
         "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_myGuildColour' style='width:100;' /></td></tr>"+

		 "<tr><td colspan='4' class='subfeatureName'>My Name</a>: <input type='text' id='config_myName' style='width:100;' /></td>"+
		 
         "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_autosetGuildNotify' /> Show reminder</td>"+
         "<td style='padding-left:20'>Notifies you every 3 weeks to view your profile page.</td><td style='padding-left:20'>All pages</td></tr>"+

         "<tr><td colspan='3' class='subfeatureName'>Allied/Pact Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_alliedGuilds' style='width:90%;' /></td>"+
         "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_alliedGuildColour' style='width:100;' /></td></tr>"+

         "<tr><td colspan='3' class='subfeatureName'>NAP Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_nappedGuilds' style='width:90%;' /></td>"+

         "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_nappedGuildColour' style='width:100;' /></td></tr>"+

         "<tr><td colspan='3' class='subfeatureName'>Enemy Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_enemyGuilds' style='width:90%;' /></td>"+
         "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_enemyGuildColour' style='width:100;' /></td></tr>"+

         "<tr><td colspan='4' class='subfeatureName'>Individual Player Colour Overrides<a href='#foot2'><sup class='footnote'>3</sup></a>: <input type='text' id='config_playerColors' style='width:90%;' /></td></tr>"+

         "<tr><td><input type='checkbox' id='config_nameLocations' /></td><td class='featureName'>Name Locations</td><td style='padding-left:20'>Replaces location link text with location names.</td>"+
         "<td style='padding-left:20'>All Except bookmarks</td></tr>"+

         "<tr><td colspan='4' class='subfeatureName'>Base Names<a href='#foot2'><sup class='footnote'>4</sup></a>:<br />"+
         "<input type='text' id='config_locationNames' style='width:90%;' /></td></td></tr>"+

    "<tr><td colspan='5'></td></tr>";
    //if (tab == "Map")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Map Enhancements</td></tr>"+

        "<tr><td><input type='checkbox' id='config_cloneBaseLinks' /></td><td class='featureName'>Insert base links by map</td>"+
        "<td style='padding-left:20'>Displays base links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Bases</td></tr>"+

        "<tr><td><input type='checkbox' id='config_cloneFleetLinks' /></td><td class='featureName'>Insert fleet links by map</td>"+
        "<td style='padding-left:20'>Displays fleet links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Fleets</td></tr>"+

        "<tr><td><input type='checkbox' id='config_moveGalaxyLinks' /></td><td class='featureName'>Move galaxy links</td>"+
        "<td style='padding-left:20'>Moves the galaxy links above the galaxy maps to the bottom of the page.</td><td style='padding-left:20'>Fleets & Bases</td></tr>"+

    "<tr><td colspan='5'></td></tr>";
    //if (tab == "Trade")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Trade</td></tr>"+

        "<tr><td><input type='checkbox' id='config_highlightTradePartners' /></td><td class='featureName'>Highlight trade partners</td>"+
        "<td style='padding-left:20'>Highights all links to trade partners in blue.</td><td style='padding-left:20'>All</td></tr>"+

        "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightPlayerColor'style='width:100;' /></td><td></td></tr>"+

        "<tr><td><input type='checkbox' id='config_highlightDuplicateTradePartners' /></td><td class='featureName'>Highlight duplicate trade partners</td>"+
        "<td style='padding-left:20'>Highlights duplicate trade partners.</td><td style='padding-left:20'>Empire trade</td></tr>"+

        "<tr><td><input type='checkbox' id='config_highlightPoorTrades' /></td><td class='featureName'>Highlight unbalanced trades</td>"+
        "<td style='padding-left:20'>Highlights eco values that are outside of the set thresholds.</td><td style='padding-left:20'>Empire trade</td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Upper threshold: <input type='text' id='config_poorTradeUpperThreshold'style='width:25;' /></td>"+
        "<td style='padding-left:20'>Trades with eco bases greater than this amount above your own are highlighted in orange.</td><td></td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Lower threshold: <input type='text' id='config_poorTradeLowerThreshold' style='width:25;' /></td>"+
        "<td style='padding-left:20'>Trades with eco bases lower than this amount below your own are highlighted in red.</td><td></td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Structures")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Structures / Bases</td></tr>"+

        "<tr><td><input type='checkbox' id='config_structuresGoals' /></td><td class='featureName'>Advanced structures page</td><td style='padding-left:20'>Colour codes structure values based on progress.</td>"+
        "<td style='padding-left:20'>Empire structures</td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Colour of started:</td>"+
         "<td class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_structColour1' style='width:100;' /></td><td></td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Colour of not started:</td>"+
         "<td class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_structColour2' style='width:100;' /></td><td></td></tr>"+

		 "<tr><td colspan='2' class='subfeatureName'>Colour of completed:</td>"+
         "<td class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_structColour3' style='width:100;' /></td><td></td></tr>"+
		 
        "<tr><td><input type='checkbox' id='config_showPillage' /></td><td class='featureName'>Insert estimated pillage on bases</td>"+
        "<td style='padding-left:20'>Displays rough guide to amount pillage would be worth per econ.</td><td style='padding-left:20'>Bases</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Misc")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Credits History</td></tr>"+

          "<tr><td><input type='checkbox' id='config_sumCredits' /></td><td class='featureName'>Credits Summary</td><td style='padding-left:20'>Displays a summary of credits.</td>"+
          "<td style='padding-left:20'>Credits History</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Fleet")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Fleet</td></tr>"+

         "<tr><td><input type='checkbox' id='config_insertMovePresets' /></td><td class='featureName'>Extra movement presets</td><td style='padding-left:20'>Adds extra presets to existing 'all' and "+
         "'none'.</td><td style='padding-left:20'>Fleet move</td></tr>"+

         "<tr><td><input type='checkbox' id='config_showTotalFleetRow' /></td><td class='featureName'>Show total fleet row</td><td style='padding-left:20'>Adds a row totalling quantities of each "+
         "ship.</td><td style='padding-left:20'>Empire fleet</td></tr>"+

         "<tr><td><input type='checkbox' id='config_showFleetAttackSize' /></td><td class='featureName'>Show fleet attack size</td><td style='padding-left:20'>Attack fleet size exludes carriers, fleet "+
         "carriers, recyclers, outpost ships, and scout ships.</td><td style='padding-left:20'>Empire fleet</td></tr>"+

         "<tr><td><input type='checkbox' id='config_addFleetMoveLink' /></td><td class='featureName'>Insert fleet move link</td><td style='padding-left:20'>Makes fleet size(s) a link directly "+
         "to the fleet movement screen.</td><td style='padding-left:20'>Empire fleet</td></tr>"+

         "<tr><td><input type='checkbox' id='config_sumFleets' /></td><td class='featureName'>Sum guild fleets</td><td style='padding-left:20'>Inserts a table with fleet totals by guild.</td>"+
         "<td style='padding-left:20'>Base pages</td></tr>"+
		 
		 "<tr><td><input type='checkbox' id='config_fleetAutoLanuch' /></td><td class='featureName'>Fleet Auto Launch</td><td style='padding-left:20'>To use the auto-launch, enter the server time you wish for your fleet to be sent into the box above, in the format \"DD-MM-YY HH:MM:SS\" with HH being the hours in 24 hour format with leading zeros. Then click the button next to it. For the auto-launch to work, you must leave the tab/window open with the destination and units filled in. You can have more than one fleet being sent, just use another tab/window.</td><td style='padding-left:20'>Fleet Movement page</td></tr>"+

		 "<tr><td><input type='checkbox' id='config_fleetInfoPopUp' /></td><td class='featureName'>Fleet Info Popup</td><td style='padding-left:20'>To add a popup next to the fleet name when you hover over a fleets name. This popup contains what units are in that fleet</td><td style='padding-left:20'>Fleet, Map and Base pages</td></tr>"+
		 
		 "<tr><td colspan='2' class='subfeatureName'>Popup Display Time: <input type='text' id='config_fleetInfoPopUpTime' style='width:25;' /></td>"+
         "<td style='padding-left:20'>This sets how long the popup will show before it dissapears.</td><td></td></tr>"+
		 
		 "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_fleetInfoPopUpFade' />Fade Popup In/Out</td>"+
         "<td style='padding-left:20'>This sets if the pop up will fade in and out or just appear/dissapear.</td><td></td></tr>"+
		 
    "<tr><td colspan='5'></td></tr>";

    //if (tab == "ConsProd")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Construction / Production</td></tr>"+

        "<tr><td><input type='checkbox' id='config_enableProductionPresets' /></td><td class='featureName'>Production presets</td>"+
        "<td style='padding-left:20'>This feature allows production values to be filled with customizable preset values. Time values override quantity values.</td><td style='padding-left:20'>Production</td></tr>"+

        "<tr><td><input type='checkbox' id='config_enterProductionTime' /></td><td class='featureName'>Enter production times</td>"+
        "<td style='padding-left:20'>Allows entry of productiontime. Quantities are then calculated and filled in.</td><td style='padding-left:20'>Production</td></tr>"+

        "<tr><td><input type='checkbox' id='config_fixQueues' /></td><td class='featureName'>Enhanced queue display</td><td style='padding-left:20'>Fixes queues footer of screen so it is "+
        "always visible.</td><td style='padding-left:20'>Structures, Defenses, Production, and Research</td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Max queue size: <input type='text' id='config_maxQueues' style='width:25;' />"+
        "</td><td style='padding-left:20'>Queue list will not be fixed when queues size is greater than this number.</td><td></td></tr>"+
    
		"<tr><td><input type='checkbox' id='config_enhanceProd' /></td><td class='featureName'>Production enhancer script.</td>"+
        "<td style='padding-left:20'>A page that shows every base and what each base can build. It allows you to set each base to build something, hit submit and each base will begin producing what you told it to. **Presets and What each base can build are set on the Capacities page. Does not work for free accounts**</td><td style='padding-left:20'>All</td></tr>"+
		
		"<tr><td><input type='checkbox' id='config_enhanceCons' /></td><td class='featureName'>Construction enhancer script.</td>"+
         "<td style='padding-left:20'>Removes building descriptions as well as shows you which building is the best to build for areas you wish to improve(Energy, Production, Construction etc).</td><td style='padding-left:20'>All</td></tr>"+
		 
	"<tr><td colspan='5'></td></tr>";

    //if (tab == "Scanners")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Scanners</b></td></tr>"+

        "<tr><td><input type='checkbox' id='config_formatScanner' /></td><td class='featureName'>Format scanner</td><td style='padding-left:20'>Highlights your own bases on the scanner page."+
        "</td><td style='padding-left:20'>Scanner</td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Base highlighting colour: </td><td style='padding-left:20' class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup>"+
        "</a>: <input type='text' id='config_highlightBaseColor'style='width:100;'/></td><td style='padding-left:20'>Scanner</td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>System highlighting colour: </td><td style='padding-left:20' class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup>"+
        "</a>: <input type='text' id='config_highlightSystemColor'style='width:100;'/></td><td style='padding-left:20'>Scanner</td></tr>"+

         "<tr><td colspan='4' class='subfeatureName'>Custom Coords to highlight<a href='#foot2'><sup class='footnote'>4</sup></a>:<br />"+
         "<input type='text' id='config_customScannerCoord' style='width:90%;' /></td></td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Custom Coords highlighting colour: </td><td style='padding-left:20' class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup>"+
        "</a>: <input type='text' id='config_highlightCustomBaseColor'style='width:100;'/></td><td style='padding-left:20'>Scanner</td></tr>"+

        "<tr><td colspan='2' class='subfeatureName'>Custom Coords System highlighting colour: </td><td style='padding-left:20' class='subFeatureName'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup>"+
        "</a>: <input type='text' id='config_highlightCustomSystemColor'style='width:100;'/></td><td style='padding-left:20'>Scanner</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Misc")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Misc</b></td></tr>"+

         "<tr><td><input type='checkbox' id='config_removeRedirect' /></td><td class='featureName' colspan='2'>Disable redirection on board links.</td>"+
         "<td style='padding-left:20'>Board/Guild pages only</td></tr>"+			 
		 
    "<tr><td colspan='5'></td></tr>";

	//DB uploading
	newbody = newbody +"<tr><td colspan='5' class='configHeading'>WOLF Database</b></td></tr>"+
	
		"<tr><td><input type='checkbox' id='config_wogDB' /></td><td class='featureName'>Enable DB Auto-upload.</td>"+
         "<td style='padding-left:20'>Select this to automatically upload data to the database.</td><td style='padding-left:20'>All</td></tr>"+
		 
		 "<tr><td><input type='checkbox' id='config_wogDBconfirm' /></td><td class='featureName'>Disable DB upload confirmation.</td>"+
         "<td style='padding-left:20'>Select this to turn off confirmation page.</td><td style='padding-left:20'>All</td></tr>"+
	 
	"<tr><td colspan='5'></td></tr>";
    //if (tab == "Experimental")
    newbody = newbody +"<tr><td colspan='5'></td></tr>"+
        "<tr><td colspan='5' class='configHeading'>Battle Enhancements</td></tr>"+

		"<tr><td><input type='checkbox' id='config_battlecalcScript' /></td><td class='featureName'>Battlecalc on attack pages.</td>"+
         "<td style='padding-left:20'>Shows the results of a battle before you make the attack.</td><td style='padding-left:20'>All</td></tr>"+
		 
		 "<tr><td><input type='checkbox' id='config_profitsum' /></td><td class='featureName'>Display Profit/Loss calculations</td>"+
         "<td style='padding-left:20'>Select this to add a profit/loss calcualtion to the bottom of battle reports. It shows how much money the attacker gained or lost in the attack.</td><td style='padding-left:20'>Battle Reports</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

	//if (tab == "Commanders")
    newbody = newbody +"<tr><td colspan='5'></td></tr>"+
		"<tr><td colspan='5' class='configHeading'>Commander Options</td></tr>"+
		
		"<tr><td><input type='checkbox' id='config_commanderHighlight' /></td><td class='featureName'>Highlight Commander Types</td>"+
         "<td style='padding-left:20'>Shows names of commanders of a certain task in a specified color.</td><td style='padding-left:20'>Commander, Bases</td></tr>"+
		
		"<tr><td colspan='2' class='subfeatureName'>Construction Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightConstuctionCom'style='width:100;'/></td><td></td></tr>"+         
		 "<tr><td colspan='2' class='subfeatureName'>Research Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightResearchCom'style='width:100;'/></td><td></td></tr>"+
		 "<tr><td colspan='2' class='subfeatureName'>Production Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightProductionCom'style='width:100;'/></td><td></td></tr>"+
		 "<tr><td colspan='2' class='subfeatureName'>Defense Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightDefenseCom'style='width:100;'/></td><td></td></tr>"+
		 "<tr><td colspan='2' class='subfeatureName'>Tactical Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTacticalCom'style='width:100;'/></td><td></td></tr>"+
		 "<tr><td colspan='2' class='subfeatureName'>Logistics Commander: </td><td style='padding-left:20' class='subFeatureName'>Highlight Css<a href='#foot2'>"+
         "<sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightLogisticsCom'style='width:100;'/></td><td></td></tr>"+
		"<tr><td colspan='5'></td></tr>";
		
    //if (tab == "Debug")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Debug</td></tr>"+

         "<tr><td><input type='checkbox' id='config_debug' /></td><td class='featureName'>Console log</td><td style='padding-left:20'>Logs to FireBug console. Must have Firebug extension installed.</td>"+
         "<td style='padding-left:20'>All</td></tr>"+

         "<tr><td colspan='5' class='subfeatureName'>"+
         "<Input type = radio Name ='logLevel' Value = '1'>Log</input><br />"+
         "<Input type = radio Name ='logLevel' Value = '2'>Info</input><br />"+
         "<Input type = radio Name ='logLevel' Value = '3'>Warn</input><br />"+
         "<Input type = radio Name ='logLevel' Value = '4'>Error</input><br />"+
    "</tr></td>"+
/*
    "<tr><td><input type='checkbox' id='config_notification' /></td><td class='featureName'>Notifications</td><td style='padding-left:20'>Allows you to adjust display of information.</td>"+
    "<td style='padding-left:20'>All</td></tr>"+

    "<tr><td colspan='5' class='subfeatureName'>"+
    "<Input type = radio Name ='notificationLevel' Value = '1'>Show all (default).</input><br />"+
    "<Input type = radio Name ='notificationLevel' Value = '2'>Hide full size notifications after a few seconds.</input><br />"+
    "<Input type = radio Name ='notificationLevel' Value = '3'>Hide full size notifications.</input><br />"+
    "<Input type = radio Name ='notificationLevel' Value = '4'>Hide all notifications </input><br />"+
    "</tr></td>"+
*/
    "<tr><td><input type='checkbox' id='config_showExecutionTime' /></td><td class='featureName'>Show Execution Time</td><td style='padding-left:20'>Shows script execution time at bottom of page.</td>"+
    "<td style='padding-left:20'>All</td></tr>"+

    "<tr height='15px'><td colspan='4' /></tr>";

    newbody = newbody +"<tr><td colspan='4' align='center'><input id='saveButton' type=submit name='Save' value='Save' /> - <input id='resetButton' type=submit name='Reset to defaults' value='Reset to defaults' /></td></tr>"+
    "</table>"+
    "<small>This configuration screen is for the Astro Empires Extras Greasemonkey script.</small><br /><br />"+
    "<table>"+
    "<tr><td><a name='foot1'>1.</a> Colour definitions must be in valid css colour formats. See CSS colour samples <a href='http://www.somacon.com/p142.php' target='_new'>here</a>.</td></tr>"+
    "<tr><td><a name='foot2'>2.</a> Guild definitions must be in the following format: <b>[Guildname],[Guildname2],...</b><br>Include the square brackets</td></tr>"+
    "<tr><td><a name='foot2'>3.</a> Colour definitions must be in the following format: <b>player1=csscolour,player2=csscolour2</b><br>"+
         "Do NOT include player's guild tag and DO include the '#' with css hex values.</td></tr>"+
    "<tr><td><a name='foot2'>4.</a> Location name definitions must be in the following format: <b>location=name,location2=name2</b></td></tr>"+
    "</table>"+
    "<br /><br /><a id='backLink' href='"+url+"'>Return to Astro Empires</a>"+
    "</div>";
    return newbody;
}
function showConfig(page)
{
    console.log("Loading config for "+getServer());
    if (DEBUGNEWCODE)
    {
        if($('Config'))
        {
    //        console.log("Removing old notify: "+document.body.firstChild.innerHTML);
            document.body.removeChild($('Config'));
        }
    //  create a block element
        var b=document.createElement('div');
        b.id='Config';
    //  b.style.cssText='top:-9999px;left:-9999px;position:absolute;white-space:nowrap;';
        // Get width of normal table and extend a border around
        var width = getTableWidth();
        if (width<900) width = 900;
        width += 40;
        //
        b.style.cssText='position:absolute;white-space:nowrap;z-index:5;background:black;width:'+width+'px;';
        b.className = "config";
    //  insert block in to body
        b=document.body.insertBefore(b,document.body.firstChild);
    //  write HTML fragment to it
        b.innerHTML=configBody(page);
    //  save width/height before hiding
        var bw=b.offsetWidth;
        var bh=b.offsetHeight;
    //  hide, move and then show
        b.style.display='none';

        b.style.top = "20";
        b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - bw/2;

        //console.log("window height: "+document.body.clientHeight);
        //console.log("window width: "+document.body.clientWidth);
        //console.log("window scroll x: "+document.body.scrollLeft);
        //console.log("window scroll y: "+document.body.scrollTop);

        b.style.display='block';
    } else {
        document.body.innerHTML = "<html><body>"+configBody(page)+"</body></html>";
    }
    loadConfig();
    $('saveButton').addEventListener('click', function(event) {
        saveConfig();
    }
    , true);
    $('resetButton').addEventListener('click', function(event) {
        resetConfig();
    }
    , true);
    $('config_highlightPoorTrades').addEventListener('change', function(event) {
        poorTradesChanged();
    }
    , true);

}

//==========================================
//Save/Load Config
//==========================================

function saveConfig()
{
    //console.log("Saving config");
    try{
	
	setSetting(WoG_DB_CONFIRM_KEY,document.getElementById(WoG_DB_CONFIRM_KEY).checked);
	setSetting(WOG_DB_KEY,document.getElementById(WOG_DB_KEY).checked);
	setSetting(PROFIT_SUM_KEY,document.getElementById(PROFIT_SUM_KEY).checked);
	setSetting(LOCAL_TIME_SHOW_KEY,document.getElementById(LOCAL_TIME_SHOW_KEY).checked);
	setSetting(HIGHLIGHT_COMMANDERS_KEY,document.getElementById(HIGHLIGHT_COMMANDERS_KEY).checked);	
	setSetting(HIGHLIGHT_COMMANDER_CONSTRUCTION,document.getElementById(HIGHLIGHT_COMMANDER_CONSTRUCTION).value);
	setSetting(HIGHLIGHT_COMMANDER_RESEARCH,document.getElementById(HIGHLIGHT_COMMANDER_RESEARCH).value);
	setSetting(HIGHLIGHT_COMMANDER_PRODUCTION,document.getElementById(HIGHLIGHT_COMMANDER_PRODUCTION).value);
	setSetting(HIGHLIGHT_COMMANDER_DEFENSE,document.getElementById(HIGHLIGHT_COMMANDER_DEFENSE).value);
	setSetting(HIGHLIGHT_COMMANDER_TACTICAL,document.getElementById(HIGHLIGHT_COMMANDER_TACTICAL).value);
	setSetting(HIGHLIGHT_COMMANDER_LOGISTICS,document.getElementById(HIGHLIGHT_COMMANDER_LOGISTICS).value);
	
    setSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,$(HIGHLIGHT_TRADE_PARTNERS_KEY).checked);
    setSetting(HIGHLIGHT_POOR_TRADES_KEY,$(HIGHLIGHT_POOR_TRADES_KEY).checked);
    setSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,$(POOR_TRADE_UPPER_THRESHOLD_KEY).value);
    setSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,$(POOR_TRADE_LOWER_THRESHOLD_KEY).value);
    setSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,$(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY).checked);
    setSetting(SHOW_TOTAL_FLEET_ROW_KEY,$(SHOW_TOTAL_FLEET_ROW_KEY).checked);
    setSetting(SHOW_ATTACK_SIZE_KEY,$(SHOW_ATTACK_SIZE_KEY).checked);
    setSetting(ADD_FLEET_MOVE_LINK_KEY,$(ADD_FLEET_MOVE_LINK_KEY).checked);
    setSetting(ENABLE_PRODUCTION_PRESETS_KEY,$(ENABLE_PRODUCTION_PRESETS_KEY).checked);
    setSetting(ADD_EMPIRE_SUBMENU_KEY,$(ADD_EMPIRE_SUBMENU_KEY).checked);
    setSetting(MOVE_EMPIRE_SUBMENU_KEY,$(MOVE_EMPIRE_SUBMENU_KEY).checked);
    setSetting(INSERT_BATTLECALC_LINK_KEY,$(INSERT_BATTLECALC_LINK_KEY).checked);
    setSetting(ADD_FINISH_TIMES_KEY,$(ADD_FINISH_TIMES_KEY).checked);
    setSetting(ADD_FINISH_TIMES_EMPIRE_KEY,$(ADD_FINISH_TIMES_EMPIRE_KEY).checked);
    setSetting(FINISH_TIMES_SINGLE_LINE_KEY,$(FINISH_TIMES_SINGLE_LINE_KEY).checked);
    setSetting(ANIMATE_SERVER_TIME_KEY,$(ANIMATE_SERVER_TIME_KEY).checked);
    setSetting(ADJUST_TITLES_KEY,$(ADJUST_TITLES_KEY).checked);
    setSetting(FIX_QUEUES_KEY,$(FIX_QUEUES_KEY).checked);
    setSetting(MAX_QUEUES_KEY,$(MAX_QUEUES_KEY).value);
    setSetting(HOUR_24_DISPLAY_KEY,$(HOUR_24_DISPLAY_KEY).checked);
    setSetting(HIGHLIGHT_PLAYERS_KEY,$(HIGHLIGHT_PLAYERS_KEY).checked);
    setSetting(PLAYER_COLORS_KEY,escape($(PLAYER_COLORS_KEY).value));
    setSetting(MY_GUILD_KEY,escape($(MY_GUILD_KEY).value));
	setSetting(MY_NAME_KEY,escape(document.getElementById(MY_NAME_KEY).value));
    setSetting(ALLIED_GUILDS_KEY,escape($(ALLIED_GUILDS_KEY).value));
    setSetting(NAPPED_GUILDS_KEY,escape($(NAPPED_GUILDS_KEY).value));
    setSetting(ENEMY_GUILDS_KEY,escape($(ENEMY_GUILDS_KEY).value));
    setSetting(MY_GUILD_COLOUR_KEY,escape($(MY_GUILD_COLOUR_KEY).value));
    setSetting(ENEMY_GUILDS_COLOUR_KEY,escape($(ENEMY_GUILDS_COLOUR_KEY).value));
    setSetting(NAPPED_GUILDS_COLOUR_KEY,escape($(NAPPED_GUILDS_COLOUR_KEY).value));
    setSetting(ALLIED_GUILDS_COLOUR_KEY,escape($(ALLIED_GUILDS_COLOUR_KEY).value));
    setSetting(HIGHLIGHT_TRADE_COLOUR_KEY,escape($(HIGHLIGHT_TRADE_COLOUR_KEY).value));
    setSetting(HIGHLIGHT_TIMER_CSS_KEY,escape($(HIGHLIGHT_TIMER_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER1_CSS_KEY,escape($(HIGHLIGHT_TIMER1_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER2_CSS_KEY,escape($(HIGHLIGHT_TIMER2_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER3_CSS_KEY,escape($(HIGHLIGHT_TIMER3_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER4_CSS_KEY,escape($(HIGHLIGHT_TIMER4_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER5_CSS_KEY,escape($(HIGHLIGHT_TIMER5_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER6_CSS_KEY,escape($(HIGHLIGHT_TIMER6_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER7_CSS_KEY,escape($(HIGHLIGHT_TIMER7_CSS_KEY).value));
    setSetting(HIGHLIGHT_TIMER8_CSS_KEY,escape($(HIGHLIGHT_TIMER8_CSS_KEY).value));
    setSetting(HIGHLIGHT_BASE_COLOUR_KEY,escape($(HIGHLIGHT_BASE_COLOUR_KEY).value));
    setSetting(HIGHLIGHT_SYSTEM_COLOUR_KEY,escape($(HIGHLIGHT_SYSTEM_COLOUR_KEY).value));
    setSetting(HIGHLIGHT_CUS_SCANNER_KEY,escape($(HIGHLIGHT_CUS_SCANNER_KEY).value));
    setSetting(HIGHLIGHT_CUSBASE_COLOUR_KEY,escape($(HIGHLIGHT_CUSBASE_COLOUR_KEY).value));
    setSetting(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY,escape($(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY).value));
    setSetting(STRUCT_COLOUR1_KEY,escape($(STRUCT_COLOUR1_KEY).value));
    setSetting(STRUCT_COLOUR2_KEY,escape($(STRUCT_COLOUR2_KEY).value));
	setSetting(STRUCT_COLOUR3_KEY,escape($(STRUCT_COLOUR3_KEY).value));
    setSetting(SUM_FLEETS_KEY,$(SUM_FLEETS_KEY).checked);
	setSetting(FLEET_AUTO_LAUNCH_KEY,$(FLEET_AUTO_LAUNCH_KEY).checked);	
	setSetting(FLEET_INFO_POPUP,$(FLEET_INFO_POPUP).checked);
	setSetting(FLEET_INFO_POPUP_TIMER,$(FLEET_INFO_POPUP_TIMER).value);
	setSetting(FLEET_INFO_POPUP_FADE,$(FLEET_INFO_POPUP_FADE).checked);	
    setSetting(SUM_CREDITS_KEY,$(SUM_CREDITS_KEY).checked);
    setSetting(FORMAT_NUMBERS_KEY,$(FORMAT_NUMBERS_KEY).checked);
    setSetting(NUMBER_DELIMETER_KEY,escape($(NUMBER_DELIMETER_KEY).value));
    setSetting(CLONE_BASE_LINKS_KEY,$(CLONE_BASE_LINKS_KEY).checked);
    setSetting(CLONE_FLEET_LINKS_KEY,$(CLONE_FLEET_LINKS_KEY).checked);
    setSetting(MOVE_GALAXY_LINKS_KEY,$(MOVE_GALAXY_LINKS_KEY).checked);
    setSetting(STRUCTURES_GOALS_KEY,$(STRUCTURES_GOALS_KEY).checked);
    setSetting(INSERT_MOVE_PRESETS_KEY,$(INSERT_MOVE_PRESETS_KEY).checked);
    setSetting(SHOW_EXECUTION_TIME_KEY,$(SHOW_EXECUTION_TIME_KEY).checked);
    setSetting(ENTER_PRODUCTION_TIME_KEY,$(ENTER_PRODUCTION_TIME_KEY).checked);
    setSetting(USE_SERVER_TIME,$(USE_SERVER_TIME).checked);
    setSetting(AUTOSET_GUILD_KEY,$(AUTOSET_GUILD_KEY).checked);
    setSetting(PRODUCTION_ENHANCE_KEY,$(PRODUCTION_ENHANCE_KEY).checked);
    setSetting(CONSTRUCT_ENHANCE_KEY,$(CONSTRUCT_ENHANCE_KEY).checked);
    setSetting(SCRIPT_BATTLECALC_KEY,$(SCRIPT_BATTLECALC_KEY).checked);
    setSetting(STATIC_SERVER_TIME_KEY,$(STATIC_SERVER_TIME_KEY).checked);
    setSetting(AUTOSET_GUILD_NOTIFY_KEY,$(AUTOSET_GUILD_NOTIFY_KEY).checked);

    setSetting(NAME_LOCATIONS_KEY,$(NAME_LOCATIONS_KEY).checked);
    setSetting(LOCATION_NAMES_KEY,escape($(LOCATION_NAMES_KEY).value));

    setSetting(SHOW_PILLAGE_KEY,$(SHOW_PILLAGE_KEY).checked);
    setSetting(FORMAT_SCANNER_KEY,$(FORMAT_SCANNER_KEY).checked);
    setSetting(REMOVE_REDIRECT_KEY,$(REMOVE_REDIRECT_KEY).checked);
    setSetting(DEBUG_KEY,$(DEBUG_KEY).checked);

     var logLevel = LOG_LEVEL_WARN;
     var radioButtons = document.evaluate(
        "//input[@type='radio']",
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<radioButtons.snapshotLength;i++)
    {
        //console.log(radioButtons.snapshotItem(i));
         if (radioButtons.snapshotItem(i).checked==true) {
             logLevel = radioButtons.snapshotItem(i).value;
        }

    }
     setSetting(LOG_LEVEL_KEY,logLevel);
    } catch (e) {console.log("Save settings on "+getServer()+": "+e);}
     notify("Settings successfully saved.");
}
function loadConfig()
{
    try{
	
	document.getElementById(WoG_DB_CONFIRM_KEY).checked = getSetting(WoG_DB_CONFIRM_KEY,false);
	document.getElementById(WOG_DB_KEY).checked = getSetting(WOG_DB_KEY,true);
	document.getElementById(PROFIT_SUM_KEY).checked = getSetting(PROFIT_SUM_KEY,true);
	document.getElementById(LOCAL_TIME_SHOW_KEY).checked = getSetting(LOCAL_TIME_SHOW_KEY,true);
	document.getElementById(HIGHLIGHT_COMMANDERS_KEY).checked = getSetting(HIGHLIGHT_COMMANDERS_KEY,false);	
	document.getElementById(HIGHLIGHT_COMMANDER_CONSTRUCTION).value = getSetting(HIGHLIGHT_COMMANDER_CONSTRUCTION, "#FF7F00");
	document.getElementById(HIGHLIGHT_COMMANDER_RESEARCH).value = getSetting(HIGHLIGHT_COMMANDER_RESEARCH, "#7EC0EE");
	document.getElementById(HIGHLIGHT_COMMANDER_PRODUCTION).value = getSetting(HIGHLIGHT_COMMANDER_PRODUCTION, "#FFD700");
	document.getElementById(HIGHLIGHT_COMMANDER_DEFENSE).value = getSetting(HIGHLIGHT_COMMANDER_DEFENSE, "#EE00EE");
	document.getElementById(HIGHLIGHT_COMMANDER_TACTICAL).value = getSetting(HIGHLIGHT_COMMANDER_TACTICAL, "#CD0000");
	document.getElementById(HIGHLIGHT_COMMANDER_LOGISTICS).value = getSetting(HIGHLIGHT_COMMANDER_LOGISTICS, "#71C671");

    //console.log("Loading config");
    if ($(HIGHLIGHT_TRADE_PARTNERS_KEY)) $(HIGHLIGHT_TRADE_PARTNERS_KEY).checked = getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true);
    if ($(HIGHLIGHT_POOR_TRADES_KEY)) $(HIGHLIGHT_POOR_TRADES_KEY).checked = getSetting(HIGHLIGHT_POOR_TRADES_KEY,true);
    if ($(POOR_TRADE_UPPER_THRESHOLD_KEY)) $(POOR_TRADE_UPPER_THRESHOLD_KEY).value = getSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,10);
    if ($(POOR_TRADE_LOWER_THRESHOLD_KEY)) $(POOR_TRADE_LOWER_THRESHOLD_KEY).value = getSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,10);
    if ($(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY)) $(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY).checked = getSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,true);
    if ($(SHOW_TOTAL_FLEET_ROW_KEY)) $(SHOW_TOTAL_FLEET_ROW_KEY).checked = getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true);
    if ($(SHOW_ATTACK_SIZE_KEY)) $(SHOW_ATTACK_SIZE_KEY).checked = getSetting(SHOW_ATTACK_SIZE_KEY,true);
    if ($(ADD_FLEET_MOVE_LINK_KEY)) $(ADD_FLEET_MOVE_LINK_KEY).checked = getSetting(ADD_FLEET_MOVE_LINK_KEY,true);
    if ($(ENABLE_PRODUCTION_PRESETS_KEY)) $(ENABLE_PRODUCTION_PRESETS_KEY).checked = getSetting(ENABLE_PRODUCTION_PRESETS_KEY,true);
    if ($(ADD_EMPIRE_SUBMENU_KEY)) $(ADD_EMPIRE_SUBMENU_KEY).checked = getSetting(ADD_EMPIRE_SUBMENU_KEY,true);
    if ($(MOVE_EMPIRE_SUBMENU_KEY)) $(MOVE_EMPIRE_SUBMENU_KEY).checked = getSetting(MOVE_EMPIRE_SUBMENU_KEY,true);
    if ($(INSERT_BATTLECALC_LINK_KEY)) $(INSERT_BATTLECALC_LINK_KEY).checked = getSetting(INSERT_BATTLECALC_LINK_KEY,true);
    if ($(ADD_FINISH_TIMES_KEY)) $(ADD_FINISH_TIMES_KEY).checked = getSetting(ADD_FINISH_TIMES_KEY,true);
    if ($(ADD_FINISH_TIMES_EMPIRE_KEY)) $(ADD_FINISH_TIMES_EMPIRE_KEY).checked = getSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true);
    if ($(FINISH_TIMES_SINGLE_LINE_KEY)) $(FINISH_TIMES_SINGLE_LINE_KEY).checked = getSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
    if ($(ADJUST_TITLES_KEY)) $(ADJUST_TITLES_KEY).checked = getSetting(ADJUST_TITLES_KEY,true);
    if ($(FIX_QUEUES_KEY)) $(FIX_QUEUES_KEY).checked = getSetting(FIX_QUEUES_KEY,true);
    if ($(MAX_QUEUES_KEY)) $(MAX_QUEUES_KEY).value = getSetting(MAX_QUEUES_KEY,5);
    if ($(HOUR_24_DISPLAY_KEY)) $(HOUR_24_DISPLAY_KEY).checked = getSetting(HOUR_24_DISPLAY_KEY,false);
    if ($(ANIMATE_SERVER_TIME_KEY)) $(ANIMATE_SERVER_TIME_KEY).checked = getSetting(ANIMATE_SERVER_TIME_KEY,true);
    if ($(HIGHLIGHT_PLAYERS_KEY)) $(HIGHLIGHT_PLAYERS_KEY).checked = getSetting(HIGHLIGHT_PLAYERS_KEY,true);
    if ($(PLAYER_COLORS_KEY)) $(PLAYER_COLORS_KEY).value = unescape(getSetting(PLAYER_COLORS_KEY,"Drekons=#FF82AB,United Colonies=#7FFF00"));
    if ($(MY_GUILD_KEY)) $(MY_GUILD_KEY).value = unescape(getSetting(MY_GUILD_KEY,"[MyGuild]"));
    if ($(MY_GUILD_COLOUR_KEY)) $(MY_GUILD_COLOUR_KEY).value = unescape(getSetting(MY_GUILD_COLOUR_KEY,"#9999FF"));
    document.getElementById(MY_NAME_KEY).value = unescape(getSetting(MY_NAME_KEY,""));
	if ($(ENEMY_GUILDS_KEY)) $(ENEMY_GUILDS_KEY).value = unescape(getSetting(ENEMY_GUILDS_KEY,"[Enemy1],[Enemy2]"));
    if ($(NAPPED_GUILDS_KEY)) $(NAPPED_GUILDS_KEY).value = unescape(getSetting(NAPPED_GUILDS_KEY,"[Nap1],[Nap2]"));
    if ($(ALLIED_GUILDS_KEY)) $(ALLIED_GUILDS_KEY).value = unescape(getSetting(ALLIED_GUILDS_KEY,"[Ally1],[Ally2]"));
    if ($(ENEMY_GUILDS_COLOUR_KEY)) $(ENEMY_GUILDS_COLOUR_KEY).value = unescape(getSetting(ENEMY_GUILDS_COLOUR_KEY,"red"));
    if ($(NAPPED_GUILDS_COLOUR_KEY)) $(NAPPED_GUILDS_COLOUR_KEY).value = unescape(getSetting(NAPPED_GUILDS_COLOUR_KEY,"#CCCC00"));
    if ($(ALLIED_GUILDS_COLOUR_KEY)) $(ALLIED_GUILDS_COLOUR_KEY).value = unescape(getSetting(ALLIED_GUILDS_COLOUR_KEY,"#9999FF"));
    if ($(HIGHLIGHT_TRADE_COLOUR_KEY)) $(HIGHLIGHT_TRADE_COLOUR_KEY).value = unescape(getSetting(HIGHLIGHT_TRADE_COLOUR_KEY,"#8B0000"));
    if ($(HIGHLIGHT_TIMER_CSS_KEY)) $(HIGHLIGHT_TIMER_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER_CSS_KEY,"font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER1_CSS_KEY)) $(HIGHLIGHT_TIMER1_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER1_CSS_KEY,"color:#FFAA00;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER2_CSS_KEY)) $(HIGHLIGHT_TIMER2_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER2_CSS_KEY,"color:#2222FF;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER3_CSS_KEY)) $(HIGHLIGHT_TIMER3_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER3_CSS_KEY,"color:#4444FF;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER4_CSS_KEY)) $(HIGHLIGHT_TIMER4_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER4_CSS_KEY,"color:#8888FF;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER5_CSS_KEY)) $(HIGHLIGHT_TIMER5_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER5_CSS_KEY,"color:#BBBBFF;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER6_CSS_KEY)) $(HIGHLIGHT_TIMER6_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER6_CSS_KEY,"color:#FFFFFF;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER7_CSS_KEY)) $(HIGHLIGHT_TIMER7_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER7_CSS_KEY,"color:#DDDDDD;font-size:8pt;"));
    if ($(HIGHLIGHT_TIMER8_CSS_KEY)) $(HIGHLIGHT_TIMER8_CSS_KEY).value = unescape(getSetting(HIGHLIGHT_TIMER8_CSS_KEY,"color:#BBBBBB;font-size:8pt;"));
    if ($(HIGHLIGHT_BASE_COLOUR_KEY)) $(HIGHLIGHT_BASE_COLOUR_KEY).value = unescape(getSetting(HIGHLIGHT_BASE_COLOUR_KEY,"red"));
    if ($(HIGHLIGHT_SYSTEM_COLOUR_KEY)) $(HIGHLIGHT_SYSTEM_COLOUR_KEY).value = unescape(getSetting(HIGHLIGHT_SYSTEM_COLOUR_KEY,"orange"));
    if ($(HIGHLIGHT_CUS_SCANNER_KEY)) $(HIGHLIGHT_CUS_SCANNER_KEY).value = unescape(getSetting(HIGHLIGHT_CUS_SCANNER_KEY,"A99:99:99:99,B99:99:99:99"));
    if ($(HIGHLIGHT_CUSBASE_COLOUR_KEY)) $(HIGHLIGHT_CUSBASE_COLOUR_KEY).value = unescape(getSetting(HIGHLIGHT_CUSBASE_COLOUR_KEY,"purple"));
    if ($(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY)) $(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY).value = unescape(getSetting(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY,"blue"));
    if ($(STRUCT_COLOUR1_KEY)) $(STRUCT_COLOUR1_KEY).value = unescape(getSetting(STRUCT_COLOUR1_KEY,"aqua"));
    if ($(STRUCT_COLOUR2_KEY)) $(STRUCT_COLOUR2_KEY).value = unescape(getSetting(STRUCT_COLOUR2_KEY,"orange"));
	if ($(STRUCT_COLOUR3_KEY)) $(STRUCT_COLOUR3_KEY).value = unescape(getSetting(STRUCT_COLOUR3_KEY,"green"));
    if ($(SUM_FLEETS_KEY)) $(SUM_FLEETS_KEY).checked = getSetting(SUM_FLEETS_KEY,true);
	if($(FLEET_AUTO_LAUNCH_KEY)) $(FLEET_AUTO_LAUNCH_KEY).checked = getSetting(FLEET_AUTO_LAUNCH_KEY,true);	
	if($(FLEET_INFO_POPUP)) $(FLEET_INFO_POPUP).checked = getSetting(FLEET_INFO_POPUP,true);
	if($(FLEET_INFO_POPUP_TIMER)) $(FLEET_INFO_POPUP_TIMER).value = getSetting(FLEET_INFO_POPUP_TIMER,20);
	if($(FLEET_INFO_POPUP_FADE)) $(FLEET_INFO_POPUP_FADE).checked = getSetting(FLEET_INFO_POPUP_FADE,true);	
    if ($(SUM_CREDITS_KEY)) $(SUM_CREDITS_KEY).checked = getSetting(SUM_CREDITS_KEY,true);
    if ($(FORMAT_NUMBERS_KEY)) $(FORMAT_NUMBERS_KEY).checked = getSetting(FORMAT_NUMBERS_KEY,true);
    if ($(NUMBER_DELIMETER_KEY)) $(NUMBER_DELIMETER_KEY).value = unescape(getSetting(NUMBER_DELIMETER_KEY,","));
    if ($(CLONE_BASE_LINKS_KEY)) $(CLONE_BASE_LINKS_KEY).checked = getSetting(CLONE_BASE_LINKS_KEY,true);
    if ($(CLONE_FLEET_LINKS_KEY)) $(CLONE_FLEET_LINKS_KEY).checked = getSetting(CLONE_FLEET_LINKS_KEY,true);
    if ($(MOVE_GALAXY_LINKS_KEY)) $(MOVE_GALAXY_LINKS_KEY).checked = getSetting(MOVE_GALAXY_LINKS_KEY,false);
    if ($(STRUCTURES_GOALS_KEY)) $(STRUCTURES_GOALS_KEY).checked = getSetting(STRUCTURES_GOALS_KEY,true);
    if ($(AUTOSET_GUILD_KEY)) $(AUTOSET_GUILD_KEY).checked = getSetting(AUTOSET_GUILD_KEY,true);
    if ($(PRODUCTION_ENHANCE_KEY)) $(PRODUCTION_ENHANCE_KEY).checked = getSetting(PRODUCTION_ENHANCE_KEY,false);
    if ($(CONSTRUCT_ENHANCE_KEY)) $(CONSTRUCT_ENHANCE_KEY).checked = getSetting(CONSTRUCT_ENHANCE_KEY,false);
    if ($(SCRIPT_BATTLECALC_KEY)) $(SCRIPT_BATTLECALC_KEY).checked = getSetting(SCRIPT_BATTLECALC_KEY,true);
    if ($(STATIC_SERVER_TIME_KEY)) $(STATIC_SERVER_TIME_KEY).checked = getSetting(STATIC_SERVER_TIME_KEY,true);
    if ($(AUTOSET_GUILD_NOTIFY_KEY)) $(AUTOSET_GUILD_NOTIFY_KEY).checked = getSetting(AUTOSET_GUILD_NOTIFY_KEY,true);
    if ($(INSERT_MOVE_PRESETS_KEY)) $(INSERT_MOVE_PRESETS_KEY).checked = getSetting(INSERT_MOVE_PRESETS_KEY,true);
    if ($(SHOW_EXECUTION_TIME_KEY)) $(SHOW_EXECUTION_TIME_KEY).checked = getSetting(SHOW_EXECUTION_TIME_KEY,false);
    if ($(ENTER_PRODUCTION_TIME_KEY)) $(ENTER_PRODUCTION_TIME_KEY).checked = getSetting(ENTER_PRODUCTION_TIME_KEY,true);
    if ($(USE_SERVER_TIME)) $(USE_SERVER_TIME).checked = getSetting(USE_SERVER_TIME,true);


    if ($(NAME_LOCATIONS_KEY)) $(NAME_LOCATIONS_KEY).checked = getSetting(NAME_LOCATIONS_KEY,false);
    if ($(LOCATION_NAMES_KEY)) $(LOCATION_NAMES_KEY).value = unescape(getSetting(LOCATION_NAMES_KEY,"A12:12:12:12=my home base,A13:13:13:13=my other base"));

    if ($(SHOW_PILLAGE_KEY)) $(SHOW_PILLAGE_KEY).checked = getSetting(SHOW_PILLAGE_KEY,true);
    if ($(FORMAT_SCANNER_KEY)) $(FORMAT_SCANNER_KEY).checked = getSetting(FORMAT_SCANNER_KEY,true);
    if ($(REMOVE_REDIRECT_KEY)) $(REMOVE_REDIRECT_KEY).checked = getSetting(REMOVE_REDIRECT_KEY,true);
    if ($(DEBUG_KEY)) $(DEBUG_KEY).checked = getSetting(DEBUG_KEY,false);
     var logLevel = getSetting(LOG_LEVEL_KEY,LOG_LEVEL_WARN);
        //console.log("Log level: "+logLevel);
     var radioButtons = document.evaluate(
        "//input[@type='radio']",
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null);
    //console.log(redCells.snapshotLength);
     for(var i=0;i<radioButtons.snapshotLength;i++)
    {
        //console.log(radioButtons.snapshotItem(i));
         if (radioButtons.snapshotItem(i).value==logLevel) {
             radioButtons.snapshotItem(i).checked = true;
        }

    }

    } catch (e) { console.log("Config loaded: "+e); return; }
}
function resetConfig(install)
{
    try{
	
	setSetting(WoG_DB_CONFIRM_KEY,false);
	setSetting(WOG_DB_KEY,true);
	setSetting(PROFIT_SUM_KEY,true);
	setSetting(LOCAL_TIME_SHOW_KEY,true);
	
	setSetting(HIGHLIGHT_COMMANDERS_KEY,false);	
	setSetting(HIGHLIGHT_COMMANDER_CONSTRUCTION, "#FF7F00");
	setSetting(HIGHLIGHT_COMMANDER_RESEARCH, "#7EC0EE");
	setSetting(HIGHLIGHT_COMMANDER_PRODUCTION, "#FFD700");
	setSetting(HIGHLIGHT_COMMANDER_DEFENSE, "#EE00EE");
	setSetting(HIGHLIGHT_COMMANDER_TACTICAL, "#CD0000");
	setSetting(HIGHLIGHT_COMMANDER_LOGISTICS, "#71C671");
	
    setSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true);
    setSetting(HIGHLIGHT_POOR_TRADES_KEY,true);
    setSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,10);
    setSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,10);
    setSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,true);
    setSetting(SHOW_TOTAL_FLEET_ROW_KEY,true);
    setSetting(SHOW_ATTACK_SIZE_KEY,true);
    setSetting(ADD_FLEET_MOVE_LINK_KEY,true);
    setSetting(ENABLE_PRODUCTION_PRESETS_KEY,true);
    setSetting(ADD_EMPIRE_SUBMENU_KEY,true);
    setSetting(MOVE_EMPIRE_SUBMENU_KEY,true);
    setSetting(INSERT_BATTLECALC_LINK_KEY,true);
    setSetting(ADD_FINISH_TIMES_KEY,true);
    setSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true);
    setSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
    setSetting(ANIMATE_SERVER_TIME_KEY,true);
    setSetting(ADJUST_TITLES_KEY,true);
    setSetting(FIX_QUEUES_KEY,true);
    setSetting(MAX_QUEUES_KEY,5);
    setSetting(HOUR_24_DISPLAY_KEY,false);
    setSetting(AUTOSET_GUILD_KEY,true);
    setSetting(PRODUCTION_ENHANCE_KEY,false);
    setSetting(CONSTRUCT_ENHANCE_KEY,false);
    setSetting(SCRIPT_BATTLECALC_KEY,true);
    setSetting(STATIC_SERVER_TIME_KEY,true);
    setSetting(AUTOSET_GUILD_NOTIFY_KEY,true);
    setSetting(HIGHLIGHT_PLAYERS_KEY,true);
    setSetting(PLAYER_COLORS_KEY,"Drekons=#FF82AB,United Colonies=#7FFF00");
    setSetting(MY_GUILD_KEY,"[WoG]");
	setSetting(MY_NAME_KEY,"Newb");
    setSetting(MY_GUILD_COLOUR_KEY,"#9999FF");
    setSetting(ENEMY_GUILDS_KEY,"[Enemy1],[Enemy2]");
    setSetting(NAPPED_GUILDS_KEY,"[Nap1],[Nap2]");
    setSetting(ALLIED_GUILDS_KEY,"[Ally1],[Ally2]");
    setSetting(ENEMY_GUILDS_COLOUR_KEY,"red");
    setSetting(NAPPED_GUILDS_COLOUR_KEY,"#CCCC00");
    setSetting(ALLIED_GUILDS_COLOUR_KEY,"#9999FF");
    setSetting(HIGHLIGHT_TRADE_COLOUR_KEY,"#8B0000");
    setSetting(HIGHLIGHT_TIMER_CSS_KEY,"font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER1_CSS_KEY,"color:#FFAA00;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER2_CSS_KEY,"color:#2222FF;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER3_CSS_KEY,"color:#4444FF;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER4_CSS_KEY,"color:#8888FF;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER5_CSS_KEY,"color:#BBBBFF;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER6_CSS_KEY,"color:#FFFFFF;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER7_CSS_KEY,"color:#DDDDDD;font-size:8pt;");
    setSetting(HIGHLIGHT_TIMER8_CSS_KEY,"color:#BBBBBB;font-size:8pt;");
    setSetting(HIGHLIGHT_BASE_COLOUR_KEY,"red");
    setSetting(HIGHLIGHT_SYSTEM_COLOUR_KEY,"orange");
    setSetting(HIGHLIGHT_CUS_SCANNER_KEY,"A99:99:99:99,B99:99:99:99");
    setSetting(HIGHLIGHT_CUSBASE_COLOUR_KEY,"purple");
    setSetting(HIGHLIGHT_CUSSYSTEM_COLOUR_KEY,"blue");
    setSetting(STRUCT_COLOUR1_KEY,"aqua");
    setSetting(STRUCT_COLOUR2_KEY,"orange");
	setSetting(STRUCT_COLOUR3_KEY,"green");
    setSetting(SUM_FLEETS_KEY,true);
	setSetting(FLEET_AUTO_LAUNCH_KEY,true);	
	setSetting(FLEET_INFO_POPUP,true);
	setSetting(FLEET_INFO_POPUP_TIMER,20);	
	setSetting(FLEET_INFO_POPUP_FADE,true);
    setSetting(SUM_CREDITS_KEY,true);
    setSetting(FORMAT_NUMBERS_KEY,true);
    setSetting(NUMBER_DELIMETER_KEY,",");
    setSetting(CLONE_BASE_LINKS_KEY,true);
    setSetting(CLONE_FLEET_LINKS_KEY,true);
    setSetting(MOVE_GALAXY_LINKS_KEY,false);
    setSetting(STRUCTURES_GOALS_KEY,true);
    setSetting(INSERT_MOVE_PRESETS_KEY,true);
    setSetting(SHOW_EXECUTION_TIME_KEY,false);
    setSetting(ENTER_PRODUCTION_TIME_KEY,true);
    setSetting(NAME_LOCATIONS_KEY,false);
    setSetting(LOCATION_NAMES_KEY,"A12:12:12:12=my home base,A13:13:13:13=my other base");
    setSetting(REMOVE_REDIRECT_KEY,true);
    setSetting(DEBUG_KEY,false);

    setSetting(SHOW_PILLAGE_KEY,true);
    setSetting(FORMAT_SCANNER_KEY,true);
    if(install == "newInstall") { notify ("Settings set to default for new install."); return; }
    } catch (e) { console.log("Config reset: "+e); return; }
    notify("Settings successfully reset reloading page to update.");

    window.location.reload();
}

//==========================================
//Start aeproject code

//Yes i'm butchering this into the code, mainly because i want options to enable/disable sections of the code but also because i don't trust someone elses work without looking at it totally.
//==========================================
// Check returned message

function node(opt)
    {
    if (!opt) return;
//  console.log("node("+c+")");
    function attr(name)
    {
        var value = opt[name];
        delete opt[name];
        return value;
    }
    var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };
    var id = opt.id;
    var n = $(id);
    if(!n)
    {
        var tag = attr("tag") || "div";
        if ("string" == typeof tag) n = document.createElement(tag);
        else
        {
            var t=document.createElement("div");
            t.innerHTML = tag.toXMLString();
            var ids = {};
            for each( var n in $x('.//*[@id]', t) ) ids[n.id]=1;
            if (!n) ids = null;
            var r = document.createRange();
            r.selectNodeContents(t);
            n = r.extractContents();
            if (n.childNodes.length == 1) n = n.firstChild;
        }
        var after = attr("after");
        var before = opt.prepend ? opt.prepend.firstChild : attr("before");
        var parent = attr("prepend") || attr("append") || (before || after || {}).parentNode;
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
    for (var prop in style) n.style[prop] = style[prop];
    for (prop in opt)
        if (expandos[prop]) n[prop] = opt[prop];
        else n.setAttribute(prop, opt[prop]+"");
    if (ids)
        for (var id in ids)
            ids[id] = $(id);
    return ids || n;
}
var EventManager=
{
    _registry:null,Initialise:
    function()
    {
        if(this._registry==null)
        {
            this._registry=[];
            EventManager.Add(window,"unload",this.CleanUp)
        }
    }
    ,Add:
    function(a,b,c,d)
    {
//      console.log("EventManager.function("+a+","+b+","+c+","+d+")");
        this.Initialise();
        if(typeof a=="string")
        {
            if (!a) return false;
            a=$(a)
        }
        if(a==null||c==null)
        {
            return false
        }
        if(a.addEventListener)
        {
            a.addEventListener(b,c,d);
            this._registry.push({obj:a,type:b,fn:c,useCapture:d});
            return true
        }
        return false
    }
    ,CleanUp:
    function()
    {
        for(var i=0;i<EventManager._registry.length;i++)
        {
            with(EventManager._registry[i])
            {
                obj.removeEventListener(type,fn,useCapture)
            }
        }
        EventManager._registry=null
    }
};

//==========================================
//End aeproject code
//==========================================

//==========================================
// Prod/cons helper script
//==========================================
// name            AE Extender Script


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
 var ProductionGetCost = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000,20];
 var numcredits = document.evaluate(
    "/html/body/table/tbody/tr/th/table/tbody/tr[2]/th[2]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    if(numcredits.snapshotItem(0)){
    numcredits = parseNum(numcredits.snapshotItem(0).innerHTML);
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
 /// Options //////////////////////////////
//////////////////////////////////////////

function getOptionDefaults() {
   return [
   'Global Options',
      ['o_EnableQuickLinks',    1,'checkbox',   'Enable Quicklinks',    'Shows quicklinks bar on the right hand side and buttons beside locations'],
      ['o_ShowPopups',      1,'checkbox',   'Show Popups',  'Retrieves information from the database on mouseover of a location'],
      ['o_SortTrades',      1,'hide',   'Sort Trades',  'Intelligently sorts trades, showing poor trades first.'],
      ['o_SortScanner',     1,'hide',   'Sort Scanner', 'Intelligently sorts the scanner, showing incoming fleets first.'],
      ['o_nothing',     1,'hide',   'Nothing',  'Nothing'],
   ];
}

function popupOptions() {
   if (!$("optionDiv")) {
    optionDiv = document.createElement("div");
    optionDiv.style['position'] = "fixed";
    optionDiv.style['top'] = "20px";
    optionDiv.style['right'] = "100px";
    optionDiv.style['height'] = 200;
    optionDiv.style['width'] = "350px";
    optionDiv.style['border']="2px solid #272727";
    optionDiv.style['padding']="3px";
    optionDiv.style.backgroundImage="url(http://graphics2.astroempires.com/skins/darkAstros/images/grad.jpg)";
    optionDiv.style.backgroundColor="#1D1D1D";
    optionDiv.style.backgroundRepeat="repeat-x";
    optionDiv.class="helppage";
    optionDiv.id="optionDiv";
    document.body.appendChild(optionDiv)

    var tr, td, table;
    var div = document.createElement('div');
    for each(o in getOptionDefaults()) {
        if (String(o).match("function")) {
            // WEIRD error - the last entry is a function array prototype.
            // Look here and see
            // console.log(o);
            continue;
        }
        if (typeof(o)=='string') {
            var table = node({ tag: "table", style: {cssFloat: "left", margin: "5px"}, append: div });
            tr = node({tag: 'tr', append: table});
            var td = node({tag: "th", style: {color: "white"}, text: o, append: tr});
        } else if (o[2]!='hide') {
            tr = node({tag: 'tr', append: table});
            td = node({tag: 'td', html: '<label style="display:block;" title="'+o[4]+'" for="'+o[0]+'">'+o[3]+'</label>', append: tr});
            td = node({tag: 'td', append: tr});
            if (o[2]=='checkbox') {
                var i = node({tag: "input", type: "checkbox", id: o[0], title: o[4], checked: getState(o[0],0) ? 'checked' : '', append: td});
                EventManager.Add(i, 'change', setOptionFromCheckbox);
                EventManager.Add(i, 'click', setOptionFromCheckbox);
            }
        }
    }

    $("optionDiv").appendChild(div);

    optionClose = document.createElement("a");
    optionClose.style['left'] = "329px";
    optionClose.style['top']="0px";
    optionClose.style['position'] = "absolute";
    optionClose.style['color'] = "#FF0000";
    optionClose.style['font-weight'] = "bold";
    optionClose.style['text-decoration'] = "none";
    optionClose.href="javascript:void(1)";
    optionClose.innerHTML="[x]";
    optionClose.id="optionCloseDiv";
    $("optionDiv").appendChild(optionClose);
    EventManager.Add(optionClose, 'click', reloadPage);
   }

}

function setDefaultOptions() {
    for each(o in getOptionDefaults()) {
        if (typeof(o)!='string')
            setState(o[0], getState(o[0], o[1]));
    }
}

function setOptionFromCheckbox(evt) {
  setState(this.id, this.checked ? 1 : 0);
}

function setState(id, value) {
  GM_setValue(id, value);
  return value;
}

function getState(id, def) {
  return GM_getValue(id, def);
}

function reloadPage() {
    location.href=location.href;
}
  //////////////////////////////////////////
 /// Right Menu ///////////////////////////
//////////////////////////////////////////


function initRightMenu() {
    rmenu = node({className: 'helperMenu', style: {position: 'absolute'}});
    rmenu.style.right = '2px';
    rmenu.style.top = '0px';
    rmenu.style.position = "fixed";
    document.body.appendChild(rmenu);
//  rmenu.appendChild(createMenuLink(0,'Options',popupOptions));
    rmenu.appendChild(node({className: 'helperMenu', html: 'Quick Bookmarks', style: {textDecoration: 'underline'}}));
    addMarkLocations();
    displayQuickMarks();
}

function displayQuickMarks() {
    var markslist = $("QuickMarkList");
    if (!markslist) {
        markslist = document.createElement('div');
        markslist.id = "QuickMarkList";
        rmenu.appendChild(markslist);
    }
    if (markslist.hasChildNodes()) {
        while (markslist.childNodes.length >= 1) {
            markslist.removeChild(markslist.firstChild);
        }
    }

    var marks = listMarks();

    for (var i = 1; i < marks.length; i++) {
        url = marks[i][0];
        display = marks[i][1];
        data = marks[i][2];

        var e = document.createElement('div');
        if(((document.location.href.match(/fleet.aspx\?fleet=[0-9]{1,}&view=move/) && (url.match(/[\w]\d{2}:\d{2}:\d{2}:\d{2}$/)))) ||
           ((document.location.href.match(/view=trade\&action=new/))) && (url.match(/[\w]\d{2}:\d{2}:\d{2}:\d{2}$/))) {
            var striploc = url.match(/([\w]\d{2}:\d{2}:\d{2}:\d{2})$/)
            var l = createLink("javascript:fastloc\('"+striploc[1]+"'\)",'* ');
            l.style.color = 'Red';
            l.className='PasteMark';
            l.name=marks[i];
            l.title['Paste Bookmark into Field'];
        } else {
            var l = createLink(0,'- ');
            l.className='RemoveMark';
            l.name=marks[i];
            l.title['Remove Bookmark'];
            EventManager.Add(l,'click',(function(mark){return function(){delMark(mark)}})(url));
        }
        e.appendChild(l);
        u = createLink(url,display);
        u.name='markurl';
        e.appendChild(u);
        markslist.appendChild(e);

        var d = node({className: 'MarkData', html: data, style: { textIndent: '15', verticalAlign: '3', fontSize: 'x-small', color: 'Grey' }})
        markslist.appendChild(d);
        EventManager.Add(d,'dblclick',(function(url,data){return function(){promptRename(url,data)}})(url,d));
    }
}

function createLink(url, text, onclick) {
    var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text});
    if (onclick)
        EventManager.Add(link, 'click', onclick);
    return link;
}

function createMenuLink(url, text, onclick) {
    var wrap = document.createElement('div');
    var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text, append: wrap});
    if (onclick)
        EventManager.Add(link, 'click', onclick);
    node({tag: 'br', append: wrap});
    wrap.link = link;
    return wrap;
}

function createImageLink(url, imagesrc, size, onclick) {
    var link = createLink(url, '', onclick);
    node({tag: 'img', src: imagesrc, append: link, width: size, height: size});
    return link;
}

function promptRename(url,data) {
    var input = prompt('Please enter desired text:',data.innerHTML);
    if (input) {
        data.innerHTML = input;
        var bmarklist = getState(server+'_QuickMarks','').split('###');
        console.log(bmarklist);
        for (var i = 0; i < bmarklist.length; i++) {
            var bmark = bmarklist[i].split('##');       
            if (url == bmark[0]) { 
                bmark[2] = input;
            }
            bmarklist[i] = bmark.join('##');
        }
        setState(server+'_QuickMarks',bmarklist.join('###'));
    }
}

function addMark(url) {
    console.log("Add: "+url);
    // JUST to make sure it's a real location. Probably not needed.
    if (!String(url).match(/[A-Z0-9:]+$/)) {
        return;
    }
//  console.log("Add2: "+url.innerHTML);
//  console.log("Add3: "+url.parentNode.innerHTML);
//  console.log("Add4: "+url.parentNode.parentNode.innerHTML);
//  console.log("Add5: "+url.parentNode.parentNode.parentNode.innerHTML);
    
    if ((String(url).match(/loc=/)) || (String(url).match(/astro=/))) {
        var display = String(url).match(/[A-Z0-9:]+$/);
        // Try and deduce data
        var tempregexp = url.innerHTML+'.+(\\s+\\d+\\s*\\/\\s*\\d+\\s+\\d+\\s*\\/\\s*\\d+)';
        var data =  url.innerHTML.match(/(.*?) \([A-Z0-9:]+\)$/) ||             // fleets, viewing base page
                url.parentNode.parentNode.innerHTML.match(/<td><a href=.+?>(.+?)</) ||  // bases page, economy page
                url.parentNode.innerHTML.match(tempregexp) ||  // trade page, add "123/123 1/2" econ/open trades
                "notfound";
//      console.log("Data: "+data);
    } else if (String(url).match(/base=/)) {
        var display = url.innerHTML;
        // Try and deduce base owner
        var data =  url.parentNode.parentNode.innerHTML.match(/player=\d+\">(\[.*?\] .*?)</) || // location page
                url.parentNode.parentNode.innerHTML.match(/loc=.+?>(.+?)</) ||          // bases page, economy page
                "notfound";     
//      console.log("Data: "+data);
    }
    if (data && data[1] && (data[1] != 'o')) {
        data = data[1];
    } else {
        data = "[Add Note]";
    }
    
    // convert the 'bookmark' button into a normal LOC
    if (String(url).match(/astro=/)) {
        console.log("BEFORE:"+url);
        url = String(url).replace(/bookmarks\.aspx\?action=add&astro=/,"map.aspx?loc=");
        console.log("AFTER:"+url);
    }
    
    var bmarklist = getState(server+'_QuickMarks','').split('###');

    var dup = 0;
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');
        if (url == bmark[0]) {
            dup = 1;
        }
    }
    if (dup == 0) {
        var add = [url,display,data];
        console.log("AddData: URL: "+url+" Display: "+display+" Data: "+data);
        bmarklist.push(add.join('##'));     
        setState(server+'_QuickMarks',bmarklist.join('###'));
        displayQuickMarks();
    } else {
        var h = document.getElementsByName('markurl');
        for(i=0; i<h.length; i++){
            if (h[i].innerHTML == display) {
                h[i].style.color = 'Red'
            }
        }
        // Javascript fucking sucks. This is retarded.
        window.setTimeout(function() {
                var h = document.getElementsByName('markurl');
                    for(i=0; i<h.length; i++){
                        h[i].style.color = '';
                    }
            },500);
    }
}
    
function delMark(url) {
    console.log("Delete: "+url);
    var bmarklist = getState(server+'_QuickMarks','').split('###');
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');       
        if (url == bmark[0]) {
            bmarklist.splice(i,1);
        }
    }
    setState(server+'_QuickMarks',bmarklist.join('###'));
    displayQuickMarks();
}

function listMarks() {
//  console.log("Listing Marks");
    var bmarklist = getState(server+'_QuickMarks','').split('###');
    var returnlist = new Array();
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');
        returnlist.push(bmark);
    }
    return returnlist;
}

function addMarkLocations() {
    // skip the map window. Images inserted onto map are ugly and useless.
    if ((document.location.href.match(/map\.aspx$/)) || (document.location.href.match(/loc=[A-Z]\d{2}:\d{2}?:?\d{2}?$/))) {
        return 0
    }
    allLinks = document.evaluate("//a",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (i=0; i<allLinks.snapshotLength; i++) {
        if (allLinks.snapshotItem(i).textContent == "Bookmark") {
            var l = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Red Giant.jpg','15px');
            allLinks.snapshotItem(i).parentNode.insertBefore(l, allLinks.snapshotItem(i));
            EventManager.Add(l,'click',(function(mark){return function(){addMark(mark)}})(allLinks.snapshotItem(i)));
			
			//var l = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Blue%20Giant.jpg','15px');
           // allLinks.snapshotItem(i).parentNode.insertBefore(l, allLinks.snapshotItem(i));
        } else if (allLinks.snapshotItem(i).textContent.match(/\w\d{2}:\d{2}:\d{2}:\d{2}/)) {
            //var l2 = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Blue%20Giant.jpg','10px');
           // allLinks.snapshotItem(i).parentNode.insertBefore(l2, allLinks.snapshotItem(i).nextSibling);
			
			var l = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Red Giant.jpg','10px');
            allLinks.snapshotItem(i).parentNode.insertBefore(l, allLinks.snapshotItem(i).nextSibling);
            EventManager.Add(l,'click',(function(mark){return function(){addMark(mark)}})(allLinks.snapshotItem(i)));
				
		}
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

function enhanceConstructionPage() 
{
	var urbanAdjust = 0, solarAdjust = 0, gasAdjust = 0, fusionAdjust = 0, antimatterAdjust = 0, researchAdjust = 0, metalAdjust = 0, crystalAdjust = 0,
    roboticsAdjust = 0, shipyardsAdjust = 0, osAdjust = 0, spaceportsAdjust = 0, ccAdjust = 0, naniteAdjust = 0, androidAdjust = 0, economicAdjust = 0,
    terraformAdjust = 0, mlpAdjust = 0, orbitalbaseAdjust = 0, jgAdjust = 0, biosphereAdjust = 0, capitalAdjust = 0, barrackAdjust = 0, laserAdjust = 0,
    missileAdjust = 0, plasmabaseAdjust = 0, ionAdjust = 0, photonAdjust = 0, disruptorAdjust = 0, deflectionAdjust = 0, pshieldAdjust = 0, pringAdjust = 0;
	table = document.getElementById("base_queue").getElementsByClassName("layout listing")[0]
	for(a=0; a<table.rows.length; a++)
	{
		if(!table.rows[a].innerHTML.match(/name=.add_stack./))
		{
			if(table.rows[a].innerHTML.match(/Urban Structures/))
				urbanAdjust++;
			if(table.rows[a].innerHTML.match(/Solar Plants/))
				solarAdjust++;
			if(table.rows[a].innerHTML.match(/Gas Plants/))
				gasAdjust++;
			if(table.rows[a].innerHTML.match(/Fusion Plants/))
				fusionAdjust++;
			if(table.rows[a].innerHTML.match(/Antimatter Plants/))
				antimatterAdjust++;
			if(table.rows[a].innerHTML.match(/Research Labs/))
				researchAdjust++;
			if(table.rows[a].innerHTML.match(/Metal Refineries/))
				metalAdjust++;
			if(table.rows[a].innerHTML.match(/Crystals Mines/))
				crystalAdjust++;
			if(table.rows[a].innerHTML.match(/Robotic Factories/))
				roboticsAdjust++;
			if(table.rows[a].innerHTML.match(/Shipyards/) && !table.rows[a].innerHTML.match(/Orbital Shipyards/))
				shipyardsAdjust++;
			if(table.rows[a].innerHTML.match(/Orbital Shipyards/))
				osAdjust++;
			if(table.rows[a].innerHTML.match(/Spaceports/))
				spaceportsAdjust++;
			if(table.rows[a].innerHTML.match(/Command Centers/))
				ccAdjust++;
			if(table.rows[a].innerHTML.match(/Nanite Factories/))
				naniteAdjust++;
			if(table.rows[a].innerHTML.match(/Android Factories/))
				androidAdjust++;
			if(table.rows[a].innerHTML.match(/Economic Centers/))
				economicAdjust++;
			if(table.rows[a].innerHTML.match(/Terraform/))
				terraformAdjust++;
			if(table.rows[a].innerHTML.match(/Multi-Level Platforms/))
				mlpAdjust++;
			if(table.rows[a].innerHTML.match(/Orbital Base/))
				orbitalbaseAdjust++;
			if(table.rows[a].innerHTML.match(/Jump Gate/))
				jgAdjust++;
			if(table.rows[a].innerHTML.match(/Biosphere Modification/))
				biosphereAdjust++;
			if(table.rows[a].innerHTML.match(/Capital/))
				capitalAdjust++;
		}
	}
    table = document.getElementsByClassName("layout listing")[0]
    var i_lastcolumn = 5;
    var forms = document.getElementsByTagName('form');
    if (!table.innerHTML.match(/The research of this base is linked to/))
	{
    
	    if (table.rows.length > 4) 
		{
	        for (var nrow=1; nrow<table.rows.length; nrow+=2) {
	            if(!table.rows[nrow].innerHTML.match(/Research Labs linked to this base research./) && table.rows[nrow+1]){
					table.rows[nrow+1].style.display='none';
	            }
	        }
			for (var nrow=1; nrow<table.rows.length; nrow+=2) {
	            if(!table.rows[nrow].innerHTML.match(/Research Labs linked to this base research./) && table.rows[nrow]){
					table.rows[nrow].firstChild.setAttribute('rowspan', '1');
	            }
	        }
	    }
	    techmultipliers=GM_getValue(server+"techData", "0").split(",")
	    var energytechmultiplier = (techmultipliers[0]*0.05)+1;
	    var averageroute = GM_getValue(server+"averageRoute", "31");
	    var fertility = 0, uspopcost = 0, obpopcost = 0, obcostparentnode = 0, popcost = 0;
	    var areacost = 0, energycost = 0, econcost = 0, prodcost = 0, constcost = 0, flag = 0;
	    var bestAreaSignifier = node({tag: 'span', html: ' <br /> (Best Area)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    var bestEconSignifier = node({tag: 'span', html: ' <br /> (Best Econ)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    var bestProdSignifier = node({tag: 'span', html: ' <br /> (Best Prod)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    var bestConstSignifier = node({tag: 'span', html: ' <br /> (Best Const)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    var bestPopSignifier = node({tag: 'span', html: ' <br /> (Best Pop)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    var bestEnergySignifier = node({tag: 'span', html: ' <br /> (Best Energy)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
	    for (var nrow=1; nrow<table.rows.length; nrow+=2)
		{
	        if(!table.rows[nrow].innerHTML.match(/linked to this base research./))
			{
		        var cname = table.rows[nrow].childNodes[1].firstChild.firstChild.textContent;
		        if (location.indexOf('view=structures')!=-1) 
				{
		            table.rows[nrow].title = cname;
					if(table.rows[nrow+1])
					{
						var td1help_res = table.rows[nrow+1].innerHTML.match(/(fertility|metal resource|crystals resource).\((.+?)\)/)
						if (td1help_res) 
						{
							if (flag == 0)
							{
				                if(td1help_res[1]=="fertility")
				                {
				                    var td1help = "&nbsp;(Fert "+td1help_res[2]+")"
				                } else if(td1help_res[1]=="metal resource") {
				                    var td1help = "&nbsp;(Metal "+td1help_res[2]+")"
				                } else if(td1help_res[1]=="crystals resource") {
				                    var td1help = "&nbsp;(Crystals "+td1help_res[2]+")"
				                }
				                var d = table.rows[nrow].childNodes[1].innerHTML + td1help;
				                table.rows[nrow].childNodes[1].innerHTML = d
							}
						}
					}
		            if (cname=='Terraform') 
					{
		                makeAdjustments(nrow, terraformAdjust)
		                terracost = parseNum(itemcost) / 5;
		                if(areacost == 0 || areacost > terracost)
						{
		                    areacost = terracost
		                    table.rows[nrow].childNodes[2].appendChild(bestAreaSignifier);
		                }
					}
		            if (cname=='Multi-Level Platforms') 
					{
		                adjust = mlpAdjust
		                makeAdjustments(nrow, mlpAdjust)
		                var cost = parseNum(itemcost) / 10;
		                if (cost < areacost) 
						{
							areacost = cost;
		                    bestAreaSignifier.parentNode.removeChild(bestAreaSignifier);
		                    table.rows[nrow].childNodes[2].appendChild(bestAreaSignifier);
						}
					}
					if (cname=='Urban Structures') 
					{
						makeAdjustments(nrow, urbanAdjust);
						USLevel = table.rows[nrow].childNodes[1].innerHTML.match(/\(Level [0-9]{1,}/);
						USLevel = parseNum(USLevel[0].replace(/\(Level /, ""));
		                fertility = parseNum(td1help_res[2]);
		                uspopcost = parseNum(itemcost);
		                uspopcost = (uspopcost+areacost) / fertility;
		                if (popcost == 0 || popcost > uspopcost)
						{
		                    popcost = uspopcost;
		                    table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);
		                }
					}
		            if (cname=='Orbital Base') 
					{
						makeAdjustments(nrow, orbitalbaseAdjust);
		                obpopcost = parseNum(itemcost) / 10;
		                obcostparentnode = table.rows[nrow].childNodes[2];
		                if (obpopcost && obpopcost < popcost) 
						{
							popcost = obpopcost;
		                    bestPopSignifier.parentNode.removeChild(bestPopSignifier);
		                    table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);           
						}
					}
		            if (cname=='Solar Plants' || cname=='Gas Plants' || cname=='Fusion Plants' || cname=='Antimatter Plants') 
					{
		                if(cname=='Solar Plants')
						{
							adjust = solarAdjust
		                }
						else if(cname=='Gas Plants')
						{
							adjust = gasAdjust
		                }
						else if(cname=='Fusion Plants')
						{
							adjust = fusionAdjust
		                }
						else if(cname=='Antimatter Plants')
						{
							adjust = antimatterAdjust
		                }
						makeAdjustments(nrow, adjust);
		                var c = parseNum(itemcost);
		                var e = parseNum(table.rows[nrow].childNodes[3].firstChild.nodeValue.slice(1));
		                c = (c + popcost + areacost) / (energytechmultiplier*e);
		                if (e>2)
						{
		                    if (!energycost)
		                        energycost = c;
		                    if (c <= energycost) 
							{
		                        energycost = c;
		                        if (bestEnergySignifier.parentNode)
		                            bestEnergySignifier.parentNode.removeChild(bestEnergySignifier);
		                        table.rows[nrow].childNodes[2].appendChild(bestEnergySignifier);
		                    }
						}
					}
		            if (cname == "Biosphere Modification")
					{
						makeAdjustments(nrow, biosphereAdjust);
						var biopopcost = parseNum(itemcost);
		                biopopcost = (biopopcost+(24*energycost)+areacost)/USLevel;	                    
		                if (biopopcost < popcost) 
						{
							popcost = biopopcost;
		                    bestPopSignifier.parentNode.removeChild(bestPopSignifier);
		                    table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);  
						}
					}
		            if (cname == "Metal Refineries")
					{
						makeAdjustments(nrow, metalAdjust);
		                var metal = parseNum(td1help_res[2]);
		                var metalcost = parseNum(itemcost);
		                metalprodcost = (metalcost + energycost + areacost + popcost)/ metal;
		                metalconstcost = (metalcost + energycost + areacost + popcost)/ metal;
		                metaleconcost = (metalcost + energycost + areacost + popcost);
						if(econcost == 0 || econcost > metaleconcost)
						{
							econcost = metaleconcost;
		                    table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		                }
		                if(prodcost == 0 || prodcost > metalprodcost)
						{
							prodcost = metalprodcost;
		                    table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		                }           
		                if(constcost == 0 || constcost > metalconstcost)
						{
							constcost = metalconstcost;
		                    table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
		                }

					}
		            if (cname == "Crystal Mines")
					{
						makeAdjustments(nrow, crystalAdjust);
		                var crystal = parseNum(td1help_res[2]);
		                var crystalcost = parseNum(itemcost);
		                crystalcost = (crystalcost + energycost + areacost)/ crystal;
						if(econcost > crystalcost)
						{
							econcost = crystalcost;
	                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
	                    }
		                    
		            }
				}
		        if (cname == "Robotic Factories")
				{
					makeAdjustments(nrow, roboticsAdjust);
		            var robscost = parseNum(itemcost);
		            robsprodcost = (robscost + energycost + areacost + popcost)/ 2;
		            robsconstcost = (robscost + energycost + areacost + popcost)/ 2;
		            robseconcost = (robscost + energycost + areacost + popcost);
		            if(econcost > robseconcost)
					{
						econcost = robseconcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		            if(prodcost > robsprodcost)
					{
						prodcost = robsprodcost;
		                table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		            }           
		            if(constcost > robsconstcost)
					{
						constcost = robsconstcost;
		                table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
		            }                    
		        }
		        if (cname == "Shipyards")
				{
					makeAdjustments(nrow, shipyardsAdjust);
		            var shipscost = parseNum(itemcost);
		            shipsprodcost = (shipscost + energycost + areacost + popcost)/ 2;
					shipseconcost = (shipscost + energycost + areacost + popcost);
		            if(econcost > shipseconcost)
					{
						econcost = shipseconcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		            if(prodcost > shipsprodcost)
					{
						prodcost = shipsprodcost;
		                table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		            }                   
		        }
		        if (cname == "Orbital Shipyards")
				{
					makeAdjustments(nrow, osAdjust);
		            var oscost = parseNum(itemcost);
		            osprodcost = (oscost + (energycost*12) + popcost)/8;
					oseconcost = (oscost + (energycost*12) + popcost)/2;
		            if(econcost > oseconcost)
					{
						econcost = oseconcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		            if(prodcost > osprodcost)
					{
						prodcost = osprodcost;
		                table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		            }                   
		        }
		        if (cname == "Spaceports")
				{
					makeAdjustments(nrow, spaceportsAdjust);
		            var Spcost = parseNum(itemcost);
		            Spcost = (Spcost + energycost + areacost)/ 2;
		            if(econcost > Spcost)
					{
						econcost = Spcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }                    
		        }
		        if (cname == "Nanite Factories")
				{
					makeAdjustments(nrow, naniteAdjust);
		            var nanicost = parseNum(itemcost);
		            naniprodcost = (nanicost + (energycost*2) + areacost + popcost)/ 4;
		            naniconstcost = (nanicost + (energycost*2) + areacost + popcost)/ 4;
		            nanieconcost = (nanicost + (energycost*2) + areacost + popcost) /2;
		            if(econcost > nanieconcost)
					{
						econcost = nanieconcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		            if(prodcost > naniprodcost)
					{
						prodcost = naniprodcost;
		                table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		            }           
		            if(constcost > naniconstcost)
					{
						constcost = naniconstcost;
		                table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
		            }	                    
		        }
		        if (cname == "Android Factories")
				{
					makeAdjustments(nrow, androidAdjust);
		            var andrcost = parseNum(itemcost);
		            andrprodcost = (andrcost + (energycost*4) + areacost + popcost)/ 6;
		            andrconstcost = (andrcost + (energycost*4) + areacost + popcost)/ 6;
		            andreconcost = (andrcost + (energycost*4) + areacost + popcost) /2;
		            if(econcost > andreconcost)
					{
						econcost = andreconcost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		            if(prodcost > andrprodcost)
					{
						prodcost = andrprodcost;
		                table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
		            }           
		            if(constcost > andrconstcost)
					{
						constcost = andrconstcost;
		                table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
		            }
		        }
				if (cname == "Economic Centers")
				{
					makeAdjustments(nrow, economicAdjust);
		            var eccost = parseNum(itemcost)
		            eccost = (eccost + (energycost*2) + areacost + popcost) /3;
		            if(econcost > eccost)
					{
						econcost = eccost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		        }
		        if (cname == "Capital")
				{
					makeAdjustments(nrow, capitalAdjust);
		            var eccost = parseNum(itemcost);
		            eccost = (eccost + (energycost*12) + areacost + popcost);
		            if(econcost > eccost)
					{
						econcost = eccost;
		                table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
		            }
		        }
		        if (cname == "Research Labs")
				{
					makeAdjustments(nrow, researchAdjust)
		        }
		        if (cname == "Command Centers")
				{
					makeAdjustments(nrow, ccAdjust)
		        }
		        if (cname == "Jump Gate")
				{
					makeAdjustments(nrow, jgAdjust)
		        }
		        if (flag == 0)
				{
					getOptionValue(cname);
					if (v==1) 
					{
						buttontext=document.createElement("a")
						buttontext.href="javascript:document.getElementsByName('add_stack')[0].selectedIndex="+a+"; document.getElementsByTagName('form')[1].submit()"
						buttontext.innerHTML = "Queue"
						if (buttontext) 
						{
							if(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=research/))
							{
								colnum=3
							}
							else
							{
								colnum=5
							}
							table.rows[nrow].childNodes[colnum].style.whiteSpace='nowrap';
							table.rows[nrow].childNodes[colnum].appendChild(buttontext);
						}
					}
					if (flag == 0 && nrow==table.childNodes.length-1)
					{
						flag =1;
		                nrow = 1;
		            }
				}
			}
		}
	}
}

function grabCaps(){
    capArray=$("empire_capacities").getElementsByClassName("layout listing")[0]
    cons = ""
    prod = ""
    res = ""
    shipyards=""
    os=""
    cmdr=""
        for(x=2; x<capArray.rows.length-1; x=x+2){
    if((capArray.rows[x].innerHTML.match("Base Commander:")) && (capArray.rows[x].innerHTML.match("Production"))){
    prodcmdr=1+(capArray.rows[x].innerHTML.match(/Production ([0-9]+)/)[1]/100)
    }else{
    prodcmdr=1
    }

//alert(capArray.rows.length)
    cons=cons+capArray.rows[x-1].cells[4].innerHTML+","
    prod = prod+capArray.rows[x-1].cells[5].innerHTML.match(/[0-9]+/)+","
    res = res+capArray.rows[x-1].cells[6].innerHTML.match(/[0-9]+/)+","
    shipyards = shipyards+capArray.rows[x-1].cells[5].innerHTML.match(/([0-9]+)\//)[1]+","
    os=os+capArray.rows[x-1].cells[5].innerHTML.match(/\/([0-9]+)/)[1]+","
    cmdr=cmdr+prodcmdr+","
    }

    setSetting("Construction Cap", cons)
    setSetting("Production Cap", prod)
    setSetting("Research Cap", res)
    setSetting("Shipyards", shipyards)
    setSetting("Orbital Shipyards", os)
    setSetting("Production Commanders", cmdr)
}

function buttonToSelect(option, text, fallback_text) {

}

function makeAdjustments(nrow, adjustvar){
try{
adjust = adjustvar
                if(table.rows[nrow].childNodes[6].innerHTML.match(/<span id="time/)){
                adjust++
                }
                if(adjust>0){
                basecost = parseNum(table.rows[nrow].childNodes[2].firstChild.nodeValue)
                time = getSeconds(table.rows[nrow].childNodes[5].firstChild.nodeValue)/basecost
                time = secsToHMS(time*(Math.round(basecost*Math.pow(1.5, adjust))))
                table.rows[nrow].childNodes[5].innerHTML = table.rows[nrow].childNodes[5].innerHTML + "<br />("+time+") "
        table.rows[nrow].childNodes[1].innerHTML = table.rows[nrow].childNodes[1].innerHTML + " (+"+adjust+")"
        table.rows[nrow].childNodes[2].firstChild.nodeValue = table.rows[nrow].childNodes[2].firstChild.nodeValue + " ("+Math.round((basecost*Math.pow(1.5, adjust)))+")"
        itemcost = table.rows[nrow].childNodes[2].firstChild.nodeValue.replace(/[,\.\ ]/g,'');
        itemcost = itemcost.replace(/[0-9]+\(/,"")
        itemcost = itemcost.replace(/\)/, "")
        }else{
        itemcost = parseNum(table.rows[nrow].childNodes[2].firstChild.nodeValue)
        }
    } catch (e) {console.error(e+"")}
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

function stripProductionDescriptions() {
    var helpCells = document.evaluate(
    "//td[@class='help comment']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(helpCells.snapshotLength);
    for(var i=0;i<helpCells.snapshotLength;i++)
    {
        helpCells.snapshotItem(i).innerHTML = "";
    }
}

function productionHelperOnClick(num, box) {
    num=num.replace("+", "")
    num=num.replace(" ","")
    num=num.replace("k","000")
    if (num.match(/hr/)) {
        num=num.replace("hr", "")
        // SPEEDYSURFER - REPLACE THIS NUMBER WITH THE REAL CONSTRUCTION
        var astroConst = parseNum($(box+"_cap").value)
        var ref = box.replace(/[^0-9]/g, '');
        var fast = ($("fast_"+ref).checked) ? 2 : 1;
        var num = Math.round((num * 60 * 60) / (ProductionGetCost[$("unit_"+ref).selectedIndex] / ((astroConst / 60 / 60) * fast )))
    }
	var bNum = parseNum($(box).value)	
	if(isNaN(bNum))
	{
		bNum = 0;
	}
    $(box).value = bNum + parseNum(num);
    calculateTotals();
}
function prodHelperEvent(e) {
  if (e.shiftKey && (e.name == 'fast')) {
    for (i=0; i<empireLinks.length; i++) {
    $("fast_"+empireLinks[i]).checked = e.checked;
    }
  } else if (e.shiftKey && (e.name == 'unit')) {
    e.blur();
    for (i=0; i<empireLinks.length; i++) {
      $("unit_"+empireLinks[i]).selectedIndex = e.selectedIndex;
    }
  } else if (e.shiftKey && (e.name == 'quant')) {
    e.blur();
    for (i=0; i<empireLinks.length; i++) {
      $("quant_"+empireLinks[i]).value = e.value;
    }
  }
  if ((e.name == 'fast')||(e.name == 'unit')||(e.name == 'quant'))
    calculateTotals();
}
function calculateTotals() {
    var pcost = 0;
  for (i=0; i<empireLinks.length; i++) {
    n = ($("fast_"+empireLinks[i]).checked) ? 2 : 1;
    pcost += parseNum(ProductionGetCost[$("unit_"+empireLinks[i]).selectedIndex] * $("quant_"+empireLinks[i]).value * n);
    }
    $('cost_all').innerHTML = pcost+' credits';
    var credits_left = parseNum(numcredits) - pcost;
    $('cost_all').style.color = (credits_left < 0) ? 'red' : '';
}
function resetForm() {
  for (i=0; i<empireLinks.length; i++) {
    $("unit_"+empireLinks[i]).selectedIndex = 0;
    $("fast_"+empireLinks[i]).checked = false;
    $("quant_"+empireLinks[i]).value = 0;
    returnto = i
    calculateTotals();
    i=returnto;
  }
}
function startSubmitQueue() {
  submitQueue(0);
}
function submitQueue(i) {
    if ($("quant_"+empireLinks[i]).value != 0) {
      var postData = $("unit_"+empireLinks[i]).value+"="+$("quant_"+empireLinks[i]).value+"&post_back=true";
      if ($("fast_"+empireLinks[i]).checked)
        postData += "&fast=true";
      $("quant_"+empireLinks[i]).value = 'ok';
      $("quant_"+empireLinks[i]).style.backgroundColor = 'red';
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
    try{
    if(!getSetting("Production Cap")){
        notify("Capacities not set, go to the capacities page to set.")
    }
    var btn_details = [];
    btn_details.push([1,'+1 ']);
    btn_details.push([10,'+10 ']);
    btn_details.push([100,'+100 ']);
	btn_details.push([500,'+500 ']);
    btn_details.push([1000,'+1k ']);
    btn_details.push([1,'+1hr ']);
    btn_details.push([1,'+8hr ']);
	btn_details.push([1,'+12hr ']);
    btn_details.push([1,'+24hr ']);
    table.rows[0].childNodes[4].innerHTML = 'Fast Prod';
    table.rows[0].childNodes[5].innerHTML = 'Unit Type';
    table.rows[0].childNodes[6].innerHTML = 'Quantity';
    table.rows[0].childNodes[3].innerHTML = 'Current Queue';
	table.rows[0].childNodes[2].innerHTML = 'Production Capacity';
    a=0;
    var Prodcaps = [];
    var Shipyards = [];
    var OS = [];
    var Comm = [];
    var hidden;
    try{
        Prodcaps = getSetting("Production Cap").split(",")
        Shipyards = getSetting("Shipyards").split(",")
        OS = getSetting("Orbital Shipyards").split(",")
        Comm = getSetting("Production Commanders").split(",")
    } catch (e) {console.log("prod helper info collection: "+e)}
    for (i=1; i<table.rows.length; i=i+2) {
        var currentRow = table.rows[i];
        var res = /\?base=((\d|,| |\.)+)/.exec(table.rows[i].childNodes[0].firstChild.href);
        table.rows[i+1].style.display = 'none';
        empireLinks[a] = res[1];
		currentRow.childNodes[2].innerHTML = Prodcaps[a] + "("+Math.round(Prodcaps[a]*Comm[a])+")";
        currentRow.childNodes[3].innerHTML = currentRow.childNodes[5].innerHTML + "<br />" + table.rows[i+1].childNodes[3].innerHTML
        currentRow.childNodes[4].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+res[1]+"' onfocus=\"selectedBox='fast_"+res[1]+"'\" />";
        if (typeof Prodcaps[a] != "undefined") hidden = "<input type='hidden' id='quant_"+res[1]+"_cap' value='"+Math.round(Prodcaps[a]*Comm[a])+"'>";
        currentRow.childNodes[6].innerHTML = "<input type='text' name='quant' class='quant' id='quant_"+res[1]+"' size='5' maxlength='5' value='0' onfocus=\"selectedBox='quant_"+res[1]+"'\" /><br/>";
        console.log("Size: "+ currentRow.childNodes[6].width);
		var html = "<select name='unit' id='unit_"+res[1]+"' onfocus=\"selectedBox='unit_"+res[1]+"'\">"
        if(Shipyards[a] >= 1) html += "<option value='Fighters'>Fighters</option>";
     if(Shipyards[a] >= 2) html += "<option value='Bombers'>Bombers</option>";
     if(Shipyards[a] >= 3) html += "<option value='Heavy Bombers'>Heavy Bombers</option>";
     if(Shipyards[a] >= 3) html += "<option value='Ion Bombers'>Ion Bombers</option>";
     if(Shipyards[a] >= 4) html += "<option value='Corvette'>Corvette</option>";
     if(Shipyards[a] >= 5) html += "<option value='Recycler'>Recycler</option>";
     if(Shipyards[a] >= 6) html += "<option value='Destroyer'>Destroyer</option>";
     if(Shipyards[a] >= 8) html += "<option value='Frigate'>Frigate</option>"
     if(Shipyards[a] >= 8) html += "<option value='Ion Frigate'>Ion Frigate</option>";
     if(Shipyards[a] >= 4) html += "<option value='Scout Ship'>Scout Ship</option>";
     if(Shipyards[a] >= 8) html += "<option value='Outpost Ship'>Outpost Ship</option>";
     if(Shipyards[a] >= 10) html += "<option value='Cruiser'>Cruiser</option>";
     if(Shipyards[a] >= 12) html += "<option value='Carrier'>Carrier</option>";
     if(Shipyards[a] >= 12) html += "<option value='Heavy Cruiser'>Heavy Cruiser</option>";
     if(Shipyards[a] >= 16) html += "<option value='Battleship'>Battleship</option>";
     if(Shipyards[a] >= 16) html += "<option value='Fleet Carrier'>Fleet Carrier</option>";
     if(Shipyards[a] >= 20 && OS[a]>=1) html += "<option value='Dreadnought'>Dreadnought</option>";
     if(Shipyards[a] >= 22 && OS[a]>=3) html += "<option value='Titan'>Titan</option>";
     if(Shipyards[a] >= 24 && OS[a]>=5) html += "<option value='Leviathan'>Leviathan</option>";
     if(Shipyards[a] >= 26 && OS[a]>=7) html += "<option value='Death Star'>Death Star</option>";
    if(!Shipyards[a])
    {
        html += "<option value='Fighters'>Fighters</option>"
    html += "<option value='Bombers'>Bombers</option>";
    html += "<option value='Heavy Bombers'>Heavy Bombers</option>";
    html += "<option value='Ion Bombers'>Ion Bombers</option>";
    html += "<option value='Corvette'>Corvette</option>";
    html += "<option value='Recycler'>Recycler</option>";
    html += "<option value='Destroyer'>Destroyer</option>";
    html += "<option value='Frigate'>Frigate</option>"
    html += "<option value='Ion Frigate'>Ion Frigate</option>";
    html += "<option value='Scout Ship'>Scout Ship</option>";
    html += "<option value='Outpost Ship'>Outpost Ship</option>";
    html += "<option value='Cruiser'>Cruiser</option>";
    html += "<option value='Carrier'>Carrier</option>";
    html += "<option value='Heavy Cruiser'>Heavy Cruiser</option>";
    html += "<option value='Battleship'>Battleship</option>";
    html += "<option value='Fleet Carrier'>Fleet Carrier</option>";
    html += "<option value='Dreadnought'>Dreadnought</option>";
    html += "<option value='Titan'>Titan</option>";
    html += "<option value='Leviathan'>Leviathan</option>";
    html += "<option value='Death Star'>Death Star</option>";
    }
    html += "<option value='Goods'>Goods</option>";
    html += "</select>";
        currentRow.childNodes[5].innerHTML = html + hidden;
        $("unit_"+res[1]).addEventListener('change', function(){ prodHelperEvent($(unsafeWindow.selectedBox));}, true);
        $("quant_"+res[1]).addEventListener('change', function(){ prodHelperEvent($(unsafeWindow.selectedBox));}, true);
        $("fast_"+res[1]).addEventListener('change', function(){ prodHelperEvent($(unsafeWindow.selectedBox));}, true);
        for(c=0; c<btn_details.length; c++) {
        var num = btn_details[c][0];
        l = document.createElement("a");
        l.href = "javascript:void(1);";
        l.id= i + btn_details[c][1];
        l.innerHTML = btn_details[c][1];
        l.name = "quant_"+res[1];
        currentRow.childNodes[6].appendChild(l);

        $(i + btn_details[c][1]).addEventListener('click', function(){ productionHelperOnClick(this.innerHTML, this.name );}, true);
        }
    
    a++;
        }
        l = document.createElement("tr");
        l.id="extrarow1";
        table.appendChild(l);
        l = document.createElement("td");
        l.innerHTML = "0 credits";
        l.className = 'help';
        l.align = "right";
        l.id="cost_all"
        $("extrarow1").appendChild(l);
        $("cost_all").colSpan="7";
        l = document.createElement("tr");
        l.id="extrarow2";
        table.appendChild(l);
        l = document.createElement("td");
        l.className = 'help';
        l.align = "right";
        l.id="prodHelperButtons"
        $("extrarow2").appendChild(l);
        $("prodHelperButtons").colSpan="7";
        l = document.createElement("input");
        l.type = "reset";
        l.id = "resetButton";
        l.value = "Reset";
        $("prodHelperButtons").appendChild(l);
        l = document.createElement("input");
        l.type = "submit";
        l.id = "submitButton";
        l.value = "submit";
        $("prodHelperButtons").appendChild(l);
        $("submitButton").addEventListener('click', function(){ startSubmitQueue();}, true);
        $("resetButton").addEventListener('click', function(){ resetForm();}, true);
    } catch (e) { console.log("Line Number: "+e.lineNumber+"\n prodhelper: "+e); }

}
function productionHelperButton() {
        table = $("empire_events").getElementsByClassName("layout listing")[0]
        var prodTitle = table.rows[0].cells[5];
        scoutButton = document.createElement("a");
        scoutButton.href = "javascript:void(1);";
        scoutButton.id= "prodHelperButton";
        scoutButton.innerHTML=" [&#177;]";
        scoutButton.title = "Production Helper"
        prodTitle.appendChild(scoutButton)
        $('prodHelperButton').addEventListener('click', function() {productionHelper();}, true);
    }


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
//==========================================
// End of Prod/cons helper
//==========================================

//==========================================
// Battle Calculator script
//==========================================
// AstroEmipres Battle Calc - battle calculator script for astroempires.com
//
// Copyright (C) 2008  dave@mindkeep.org
// http://userscripts.org/scripts/show/39043


var NAME_INDEX = 0;
var START_QUANT_INDEX = 1;
var END_QUANT_INDEX = 2;
var POWER_INDEX = 3;
var ARMOR_INDEX = 4;
var SHIELD_INDEX = 5;

var DEBUG_OFF = 0;
var DEBUG_TIMING = 1;
var DEBUG_VERBOSE = 2;

var bc_debug_level = DEBUG_TIMING;

//Tech in order, Laser, Missile, Plasma, Ion, Photon, Disruptor, Armour, Shielding
var attackerTech = new Array(0,0,0,0,0,0,0,0);
var defenderTech = new Array(0,0,0,0,0,0,0,0);

function isConfirmPage()
{
    var temp = false;
    var confirmTitle = document.evaluate(
    "//b[text() ='Confirm Attack']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	//console.log(confirmTitle.snapshotItem(0));
    if (confirmTitle.snapshotLength >= 1)
    {
        temp = true;
    }
    //console.log("isConfirmPage() returned "+temp+", complete.");
    return temp;
}

function initEndQuants(rows)
{
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
//console.log(row);
        // end quant = start quant
		//console.log(row.childNodes[END_QUANT_INDEX].firstChild.nodeValue);
        row.childNodes[END_QUANT_INDEX].firstChild.textContent =
            row.childNodes[START_QUANT_INDEX].firstChild.textContent;
			//console.log(row.childNodes[END_QUANT_INDEX].firstChild.nodeValue);
    }
    //console.log("initEndQuants("+rows+") complete.");
}

function calcDamagePerUnit(power, shield, over)
{
    var damagePerUnit = 0;
    if (power > shield)
    {
        damagePerUnit = (power - shield) + (shield * over);
    }
    else
    {
        damagePerUnit = (power * over);
    }
    //console.log("calcDamagePerUnit("+power+", "+shield+", "+over+") returned "+damagePerUnit+", complete.");
    return damagePerUnit;
}

function attackOneWay(aRows, dRows, attacker)
{
	var totalLosses = new Array();
	totalLosses[0] = 0;
	totalLosses[1] = 0;
	var cCenters = document.evaluate(
				    "//td[text() ='Command Centers']",
				    document,
				    null,
				    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				    null).snapshotItem(0);
	if( cCenters){ cCenters = parseInt(cCenters.parentNode.childNodes[1].textContent);}
	else{cCenters = 0;}
	
	var commander = document.evaluate(
				    "//td[text() ='Commander']",
				    document,
				    null,
				    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				    null).snapshotItem(0);	
	var commanderLevel = 0;
	if(commander)
	{ 
		commander = commander.parentNode.childNodes[1].textContent;
		commander = commander.substring(commander.indexOf('(')+1, commander.indexOf(')'));
		commanderLevel = parseInt(commander.substring(commander.indexOf(" ")+1));
		commander = commander.substring(0,commander.indexOf(" "))
	}
	else{ commander = ""; }
	
	var levi = document.evaluate(
				    "//td[text() ='Leviathan']",
				    document,
				    null,
				    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				    null).snapshotItem(0);
	var attackLevi = false, defenseLevi = false;
	if(levi)
	{
		if(levi.parentNode.parentNode.firstChild.innerHTML.indexOf("Defensive") != -1)
		{
			defenseLevi = true;
		}
		else
		{
			attackLevi = true;
		}
	}
	
	var ds = document.evaluate(
				    "//td[text() ='Death Star']",
				    document,
				    null,
				    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				    null).snapshotItem(0);
	var attackDS = false, defenseDS = false;
	if(ds)
	{
		if(ds.parentNode.parentNode.firstChild.innerHTML.indexOf("Defensive") != -1)
		{
			defenseDS = true;
		}
		else
		{
			attackDS = true;
		}
	}
	
    for (var i = 0; i < aRows.snapshotLength; i++)
    {
        var aRow = aRows.snapshotItem(i);
        var aUnits = parseFloat(aRow.childNodes[START_QUANT_INDEX].firstChild.textContent );
        var aPower = parseFloat(aRow.childNodes[POWER_INDEX].firstChild.textContent);
        var aName = aRow.childNodes[NAME_INDEX].firstChild.nodeValue;
		
		
		// is this a turret structure?
        // this means use not so intelligent damage distribution, interesting...
        var aIsTurret = false;
        if (aName == "Barracks" ||
                aName == "Laser Turrets" ||
                aName == "Missle Turrets" ||
                aName == "Plasma Turrets" ||
                aName == "Ion Turrets" ||
                aName == "Photon Turrets" ||
                aName == "Disruptor Turrets" ||
                aName == "Deflection Shields" ||
                aName == "Planetary Shield" ||
                aName == "Planetary Ring")
        {
            aIsTurret = true;
        }
		
        //find power over shields
        var aOverShields = 0.01;
        if (aName == "Ion Bombers" || aName == "Ion Frigates")
        {
            aOverShields = 0.50;
        }
		var pLevel = Math.round((((aPower/shipDefaultPower[getShipIndex(aName)])* 100) - 100)/5);
		if(attacker)
		{
			var offensivePercentBonus = 0;
			if(attackLevi && !attackDS)
			{
				offensivePercentBonus += 0.05;
			}
			if(attackDS)
			{
				offensivePercentBonus += 0.1;
			}
			if(offensivePercentBonus != 0)
			{
				offensivePercentBonus += 1;
				var newAPower = Math.round((aPower/offensivePercentBonus)*100)/100;
				//console.log(aName+" "+newAPower+" ~ " );
				pLevel = Math.round((((newAPower/shipDefaultPower[getShipIndex(aName)])* 100) - 100)/5);
			}	
			if(attackerTech[shipWeaponTechIndex[getShipIndex(aName)]] < pLevel )
			{
				//console.log("Attacker Power: " + pLevel + " Tech Index: " + shipWeaponTechIndex[getShipIndex(aName)]);
				attackerTech[shipWeaponTechIndex[getShipIndex(aName)]] = pLevel;
			}
		}
		else
		{
			//var newAPower = 0;
			var offensivePercentBonus = 0;
			if(cCenters > 0 && !aIsTurret)
			{
				offensivePercentBonus += (cCenters * 0.05);
			}
			if(commander == "Tactical" && !aIsTurret)
			{
				offensivePercentBonus += (commanderLevel * 0.01);
			}
			if(commander == "Defense" && aIsTurret)
			{
				offensivePercentBonus += (commanderLevel * 0.01);
			}
			if(defenseLevi && !defenseDS && !aIsTurret)
			{
				offensivePercentBonus += 0.05;
			}
			if(defenseDS && !aIsTurret)
			{
				offensivePercentBonus += 0.1;
			}
			if(offensivePercentBonus != 0)
			{
				offensivePercentBonus += 1;
				var newAPower = Math.round((aPower/offensivePercentBonus)*100)/100;
				//console.log(aName+" "+newAPower+" ~ ");
				pLevel = Math.round((((newAPower/shipDefaultPower[getShipIndex(aName)])* 100) - 100)/5);
			}			
			if( defenderTech[shipWeaponTechIndex[getShipIndex(aName)]] < pLevel )
			{
				//Scouts tech ony changes every few laser levels and so it throw the calculation off, ignore if there are other units.
				if( (defenderTech[shipWeaponTechIndex[getShipIndex(aName)]] == 0 && aName == "Scout Ship") || aName != "Scout Ship")
				{
					//console.log("Defender Power: " + pLevel + " Tech Index: " + shipWeaponTechIndex[getShipIndex(aName)]);
					defenderTech[shipWeaponTechIndex[getShipIndex(aName)]] = pLevel;
				}
			}
			//console.log(aName+" "+pLevel+" ~ " + shipDefaultPower[getShipIndex(aName)]);
		} 

        //console.log("aRow = aRows.snapshotItem("+i+")\n"+
        //        "\taName = "+aName+"\n"+
        //        "\taUnits = "+aUnits+"\n"+
        //        "\taPower = "+aPower+"\n"+
        //        "\taOverShields = "+aOverShields+"\n"+
        //        "\taIsTurret = "+aIsTurret);
		
        while (aUnits > 0.0001) // prevent spinning
        {
            //find total defense size
            var dFleetTypeCount = 0;
            var totalDamagePerUnit = 0;
            for (var j = 0; j < dRows.snapshotLength; j++)
            {
                var dRow = dRows.snapshotItem(j);
                var dUnits = parseFloat(dRow.childNodes[END_QUANT_INDEX].firstChild.textContent) ;
                var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;
                if (dUnits > 0)
                {
                    totalDamagePerUnit = totalDamagePerUnit +
                        calcDamagePerUnit(aPower, dShield, aOverShields);
                    dFleetTypeCount++;
                }
            }

            //console.log("dFleetTypeCount = "+dFleetTypeCount);
            if (dFleetTypeCount <= 0)
            {
                //console.log("All Fleet Destroyed!");
                break;
            }
            //console.log("totalDamagePerUnit = "+totalDamagePerUnit);

            var aUnitsUsed = 0;
            for (var j = 0; j < dRows.snapshotLength; j++)
            {
                var dRow = dRows.snapshotItem(j);
                var dName = dRow.childNodes[NAME_INDEX].firstChild.nodeValue;
                var dUnits = parseFloat(dRow.childNodes[END_QUANT_INDEX].firstChild.textContent);
				
                if (dUnits == 0)
                {
                    //console.log(dName+" group is destroyed, skipping.");
                    continue;
                }
				var dIsTurret = false;
		        if (dName == "Barracks" ||
		                dName == "Laser Turrets" ||
		                dName == "Missle Turrets" ||
		                dName == "Plasma Turrets" ||
		                dName == "Ion Turrets" ||
		                dName == "Photon Turrets" ||
		                dName == "Disruptor Turrets" ||
		                dName == "Deflection Shields" ||
		                dName == "Planetary Shield" ||
		                dName == "Planetary Ring")
		        {
		            dIsTurret = true;
		        }
                var dArmor = dRow.childNodes[ARMOR_INDEX].firstChild.nodeValue - 0;
                var dHp = dUnits * dArmor;
                var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;
				var aLevel = Math.round((((dArmor/shipDefaultArmour[getShipIndex(dName)])* 100) - 100)/5);
				
								
				var sLevel = 0;
				if(dShield != 0)
				{
					sLevel= (((dShield/shipDefaultShield[getShipIndex(dName)])* 100) - 100)/5;
				}
				
				if(!attacker)
				{			
					var defensivePercentBonus = 0;				
					if(commander == "Defense" && dIsTurret)
					{
						defensivePercentBonus += (commanderLevel * 0.01);
					}
					if(attackLevi && !attackDS)
					{
						defensivePercentBonus += 0.05;
					}
					if(attackDS)
					{
						defensivePercentBonus += 0.1;
					}
					if(defensivePercentBonus !=0)
					{
						defensivePercentBonus += 1;
						var newdArmour = Math.round((dArmor/defensivePercentBonus)*100)/100;
						//console.log(dName+" "+newdArmour+" ~ " );
						aLevel = (((newdArmour/shipDefaultArmour[getShipIndex(dName)])* 100) - 100)/5;
					}	
					if( attackerTech[6] < aLevel )
					{
						attackerTech[6] = aLevel;
						//console.log("Attacker Armour: " + aLevel );
					}
					if( attackerTech[7] < sLevel )
					{
						attackerTech[7] = sLevel;
						//console.log("Attacker Shield: " + sLevel );
					}
				}
				else
				{
					var defensivePercentBonus = 0;				
					if(commander == "Defense" && dIsTurret)
					{
						defensivePercentBonus += (commanderLevel * 0.01);
					}
					if(defenseLevi && !defenseDS)
					{
						defensivePercentBonus += 0.05;
					}
					if(defenseDS)
					{
						defensivePercentBonus += 0.1;
					}
					if(defensivePercentBonus !=0)
					{
						defensivePercentBonus += 1;
						var newdArmour = Math.round((dArmor/defensivePercentBonus)*100)/100;
						//console.log(dName+" "+newdArmour+" ~ " );
						aLevel = (((newdArmour/shipDefaultArmour[getShipIndex(dName)])* 100) - 100)/5;
					}	
					if( defenderTech[6] < aLevel )
					{
						defenderTech[6] = aLevel;
						//console.log("Defender Armour: " + aLevel );
					}
					if( defenderTech[7] < sLevel )
					{
						defenderTech[7] = sLevel;
						//console.log("Defender Shield: " + sLevel );
					}
				}		
				
				
               // console.log("dRow = dRows.snapshotItem("+j+")\n"+
               //         "\tdName = "+dName+"\n"+
               //         "\tdUnits = "+dUnits+"\n"+
               //         "\tdArmor = "+dArmor+"\n"+
                //        "\tdHp = "+dHp+"\n"+
                //        "\tdShield = "+dShield);

                var damagePerUnit = calcDamagePerUnit(aPower, dShield, aOverShields);
                //attackers for this defender group
                var attackingUnits = aUnits * damagePerUnit / totalDamagePerUnit;
                if (aIsTurret)
                {
                    attackingUnits = aUnits / dFleetTypeCount;
                }
                var damage = attackingUnits * damagePerUnit; //max damage
                //console.log(aName+" attackingUnits("+attackingUnits+") * damagePerUnit("+damagePerUnit+") = damage("+damage+")");
				var remaining = Math.round(Math.round((((dHp - damage) / dArmor)*100))/100);//(dHp - damage) / dArmor;
				//console.log(dName + " Remaining: " + remaining);
                if (damage >= dHp)
                {
                    dRow.childNodes[END_QUANT_INDEX].firstChild.textContent = 0;
                    aUnitsUsed = aUnitsUsed + dHp / damagePerUnit;
					remaining = 0;
                    //console.log(dName+" units destroyed!\n"+
                    //        "\tdHp / damagePerUnit = "+(dHp/damagePerUnit)+"\n"+
                    //        "\taUnitsUsed = "+aUnitsUsed);
                }
                else
                {					
					//var remaining = Math.round((((dHp - damage) / dArmor)*100)/100);
					//var remaining = (dHp - damage) / dArmor;
					//if( s > 0)
					//{
                    dRow.childNodes[END_QUANT_INDEX].firstChild.textContent =
                        remaining;
					//}
					//else
					//{
					//	dRow.childNodes[END_QUANT_INDEX].firstChild.textContent =
                    //    Math.round((dHp - damage) / dArmor);
					//}
                    aUnitsUsed = aUnitsUsed + attackingUnits;
                    //console.log(dName+" units remaining = "+((dHp - damage) / dArmor)+"\n"+
                    //        "\taUnitsUsed = "+aUnitsUsed);
                }				
				if(!dIsTurret)
				{
					var s = shipValues[getShipIndex(dName)];
					if (!s)
	                {
						s = 1;
					}
					var lost = roundUp(dUnits - Math.ceil(remaining),findScale(dName));
					totalLosses[0] += lost*s;
					//derbs =((2*armour lvl * unit cost)/100)
					if(lost > 0 )
					{
						//console.log(dName + " Lost: " + lost);					
						totalLosses[1] += Math.floor(lost * Math.floor((2*aLevel*s)/100));
					}
				}
				//console.log(dName + " Start = " + dUnits+" remaining = "+remaining + " Losses="+totalLosses);
            }
            aUnits = aUnits - aUnitsUsed;
            //console.log("aUnits remaining = "+aUnits);		
        }
		
    }
	//console.log("totalLosses = "+totalLosses);	
    //console.log("attackOneWay("+aRows+", "+dRows+") complete.");
	return totalLosses;
}

function findScale(name)
{
    var scale;

    if (name == "Fighters" ||
            name == "Bombers" ||
            name == "Heavy Bombers" ||
            name == "Ion Bombers" ||
            name == "Corvette" ||
            name == "Recycler" ||
            name == "Destroyer" ||
            name == "Frigate" ||
            name == "Ion Frigate" ||
            name == "Scout Ship" ||
            name == "Outpost Ship")
    {
        scale = 0;
    }
    else if (name == "Cruiser" ||
            name == "Carrier" ||
            name == "Heavy Cruiser")
    {
        scale = 1;
    }
    else
    {
        scale = 2;
    }

    //console.log("findScale("+name+") returned "+scale+", complete.");
    return scale;
}

function roundUp(value, scale)
{
    var mult = Math.pow(10,scale);
    var rounded = Math.ceil(value*mult) / mult;
    //console.log("roundUp("+value+", "+scale+") returned "+rounded+", complete.");
    return rounded;
}

function roundEndQuants(rows)
{
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        var scale = findScale(row.childNodes[NAME_INDEX].firstChild.nodeValue);
        var roundedValue = roundUp(parseFloat(row.childNodes[END_QUANT_INDEX].firstChild.textContent), scale);
        row.childNodes[END_QUANT_INDEX].firstChild.textContent = roundedValue;

        if (row.childNodes[END_QUANT_INDEX].firstChild.textContent !=
                row.childNodes[START_QUANT_INDEX].firstChild.textContent)
        {
            row.childNodes[END_QUANT_INDEX].style.color = "magenta";
        }
        else
        {
            row.childNodes[END_QUANT_INDEX].style.color = "lime";
        }

    }
    //console.log("roundEndQuants("+rows+") complete.");
}

function estimateLosses(attackLosses, defendLosses)
{
	var bres = document.evaluate(
		"//div[@class ='battle-report']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < bres.snapshotLength; i++)
	{
		var br = bres.snapshotItem(i);
		insertTechInformation(br);
		var TotalLosses = attackLosses[0]+defendLosses[0]
		
		var derbsMade = attackLosses[1]+defendLosses[1];
		var newHtml = "<center> Estimated total cost of units destroyed: " + TotalLosses +"<small>( Attacker: "+attackLosses[0]+" ; Defender: "+defendLosses[0]+" )</small></center>";
		newHtml += "<center>Estimated debris in space: "+derbsMade+"</center>";
		br.innerHTML += newHtml;
	}
}

function runBattleCalc()
{
    var startTime = new Date();
    var attackerRows = document.evaluate(
            "//table//th[contains(text(),'Attack Force') and @colspan='6']/../..//tr[@align='center']",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
    var defenderRows = document.evaluate(
            "//table//th[contains(text(),'Defensive Force') and @colspan='6']/../..//tr[@align='center']",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
    //console.log(attackerRows);
    //console.log(defenderRows);
    initEndQuants(attackerRows);
    initEndQuants(defenderRows);

    var defendLosses = attackOneWay(attackerRows, defenderRows, true);
    var attackLosses = attackOneWay(defenderRows, attackerRows, false);	
	
    roundEndQuants(attackerRows);
    roundEndQuants(defenderRows);
	
	estimateLosses(attackLosses, defendLosses);
	
    var endTime = new Date();
    var runSeconds = endTime.getTime() - startTime.getTime();

//    console.log("AE Battle Calc Completed Successfully!\n\tCalc Duration: " + runSeconds / 1000 + " seconds\n\tEnd Time: " + endTime.toString());
    //console.log("runBattleCalc() complete.");
}

function insertTechInformation( battleReport)
{
	var aA = "-", da = "-", 
		aL = "-", dL = "-", 
		aM = "-", dM = "-", 
		aP = "-", dP = "-", 
		aS = "-", dS = "-",
		aI = "-", dI = "-",
		aPh = "-", dPh = "-",
		aD = "-", dD = "-";
	if(attackerTech[6] != 0)
		aA = attackerTech[6]+"";
	if(attackerTech[0] != 0)
		aL = attackerTech[0]+"";
	if(attackerTech[1] != 0)
		aM = attackerTech[1]+"";
	if(attackerTech[2] != 0)
		aP = attackerTech[2]+"";
	if(attackerTech[7] != 0)
		aS = attackerTech[7]+"";
	if(attackerTech[3] != 0)
		aI = attackerTech[3]+"";
	if(attackerTech[4] != 0)
		aPh = attackerTech[4]+"";
	if(attackerTech[5] != 0)
		aD = attackerTech[5]+"";
	if(defenderTech[6] != 0)
		dA = defenderTech[6]+"";
	if(defenderTech[0] != 0)
		dL = defenderTech[0]+"";
	if(defenderTech[1] != 0)
		dM = defenderTech[1]+"";
	if(defenderTech[2] != 0)
		dP = defenderTech[2]+"";
	if(defenderTech[7] != 0)
		dS = defenderTech[7]+"";
	if(defenderTech[3] != 0)
		dI = defenderTech[3]+"";
	if(defenderTech[4] != 0)
		dPh = defenderTech[4]+"";
	if(defenderTech[5] != 0)
		dD = defenderTech[5]+"";
	var techTable = "<table id='techInfo' class='battle-report_attack' ><tbody><tr><th colspan='2'>Attackers Tech</th><th colspan='2'>Defenders Tech</th></tr>"+
		"<tr><th>Technology</th><th>Level</th><th>Technology</th><th>Level</th></tr>"+
		"<tr><td align='center'>Armour</td><td align='center'>"+aA+"</td><td align='center'>Armour</td><td align='center'>"+dA+"</td></tr>"+
		"<tr><td align='center'>Laser</td><td align='center'>"+aL+"</td><td align='center'>Laser</td><td align='center'>"+dL+"</td></tr>"+
		"<tr><td align='center'>Missiles</td><td align='center'>"+aM+"</td><td align='center'>Missiles</td><td align='center'>"+dM+"</td></tr>"+
		"<tr><td align='center'>Plasma</td><td align='center'>"+aP+"</td><td align='center'>Plasma</td><td align='center'>"+dP+"</td></tr>"+
		"<tr><td align='center'>Shielding</td><td align='center'>"+aS+"</td><td align='center'>Shielding</td><td align='center'>"+dS+"</td></tr>"+
		"<tr><td align='center'>Ion</td><td align='center'>"+aI+"</td><td align='center'>Ion</td><td align='center'>"+dI+"</td></tr>"+
		"<tr><td align='center'>Photon</td><td align='center'>"+aPh+"</td><td align='center'>Photon</td><td align='center'>"+dPh+"</td></tr>"+
		"<tr><td align='center'>Disruptor</td><td align='center'>"+aD+"</td><td align='center'>Disruptor</td><td align='center'>"+dD+"</td></tr>"+
		
		"</tbody></table><br/>";
	battleReport.innerHTML += techTable;	
}


//==========================================
// End of Battlecalc code
//==========================================
//==========================================
// Free Account Capacity Setting Script
//==========================================
var baseIDs = new Array();

function Contains(list, obj)
{
	var i = list.length;
	while(i--)
	{
		if(list[i] == obj)
		{
			return true;
		}
	}
	return false;
}

function setBaseCapInfo()
{
	var baseID = parseInt(location.substring(location.indexOf("base=")+5));
		//var baseInfo = document.evaluate("//table[@id='base_processing-capacities']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.firstChild.childNodes[1].firstChild.firstChild.firstChild;
		var baseInfo = document.evaluate("//table[@class = 'layout listing3']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).firstChild;
		//console.log(baseInfo);
		var playerName = getPlayerName(baseInfo.childNodes[7].childNodes[1].textContent)
		//	console.log(playerName);
		if(playerName == getSetting(MY_NAME_KEY,"Newb"))
		{		
			var bNameS = "@class = 'base'";
			if(isNewStyle())
			{
				bNameS = "@id = 'astro-details'";
			}
			var baseName = document.evaluate("//table["+bNameS+"]/tbody/tr",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			if(isNewStyle())
			{
				baseName = baseName.firstChild.textContent;
				if(baseName.indexOf("Astro Type:") != -1)
				{
					baseName = baseName.substring(0,baseName.indexOf("Astro Type:"));
				}
			}
			else
				baseName = baseName.childNodes[1].textContent;
			//console.log(baseName);
			var baseLoc = document.evaluate("//a[contains(@href,'map.aspx?loc=')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.textContent;
			//console.log(baseLoc);
			var construct = "Construction:" + baseInfo.childNodes[0].childNodes[1].textContent;
			var prod = "Production:" + baseInfo.childNodes[1].childNodes[1].textContent;
			var res = "Research:" + baseInfo.childNodes[2].childNodes[1].textContent;
			var econ = "Economy:" + baseInfo.childNodes[4].childNodes[1].textContent;
			var ownerEcon = "Owner Income:" + baseInfo.childNodes[5].childNodes[1].textContent;
			//	console.log(construct);
			//	console.log(prod);
			//	console.log(res);
			//	console.log(econ);
			//	console.log(ownerEcon);  box_content astro-details_content
			
			var structureInfo = document.evaluate("//table[@id='base_resume-structures']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			structureInfo = structureInfo.getElementsByClassName('layout')[0].firstChild.childNodes[1];
			var stucts = structureInfo.childNodes[0].innerHTML.split("<br>");
			var amounts = structureInfo.childNodes[1].innerHTML.split("<br>");
			var sIdex = stucts.indexOf("Shipyards");
			var osIdex = stucts.indexOf("Orbital Shipayrds");
			var rIdex = stucts.indexOf("Research Labs");
			var syards = 0;
			var osyards = 0;
			var rLabs = 0;
			if(sIdex != -1)
			{
				syards = amounts[sIdex];
			}
			if(osIdex != -1)
			{
				osyards = amounts[osIdex];
			}
			if(rIdex != -1)
			{
				rLabs = amounts[rIdex];
			}
			syards = "Shipyards: "+syards;
			osyards = "OrbitalShipyards: "+osyards;
			rLabs = "ResearchLabs: "+rLabs;
			//console.log(syards+" "+osyards+" "+rLabs);
			var commanderInfo = document.evaluate("//a[contains(@href,'commander.aspx?commander')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(commanderInfo)
				commanderInfo = commanderInfo.parentNode.textContent;
			else
				commanderInfo = "";
			var rSide = document.evaluate("//b[text() = 'Astro Type:']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentNode.innerHTML;
			var aType = "Type:"+rSide.substring(rSide.indexOf("Terrain:</b>")+13, rSide.indexOf("<b>Area:")) +" "+ rSide.substring(rSide.indexOf("</b>")+5, rSide.indexOf("<b>Terrain"));
			//console.log(aType);
			while(aType.indexOf("<br>") != -1)
				aType = aType.replace("<br>","");
			var saveBaseDataString = baseName+"<"+baseLoc+"<"+aType+"<"+econ+"<"+ownerEcon+"<"+construct+"<"+prod+"<"+res+"<"+commanderInfo+"<"+syards+"<"+osyards+"<"+rLabs;
			var oldBaseData = getSetting(baseID+"", "");
			//console.log(saveBaseDataString);
			setSetting(baseID+"", saveBaseDataString);
			var ids = getSetting(BASE_LIST_KEY, "");
			if(!Contains(ids.split(','), baseID+"") )
			{				
				if(ids == "")
					ids = baseID+"";
				else
					ids += "," + baseID;
				console.log(ids);
				setSetting(BASE_LIST_KEY, ids);
			}
		}
}

function displayCapPage()
{
	var ids = getSetting(BASE_LIST_KEY, "");
	if(ids == "")
	{
		 notify("Capacities not set! Please visit your bases Overview pages.")
	}
	else
	{
		var econTotal = 0;
		var ownerEconTotal = 0;
		var constTotal = 0;
		var prodTotal = 0;
		var resTotal = 0;
		var doc = document.evaluate("//table[@id='empire_upgraded-only']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.firstChild;
		doc.innerHTML = "<tr><th class='th_header2' style='border: 0px none ;'><font size='+1'>B</font>ASES PROCESSING CAPACITIES</th></tr>";
		var innerTable = "<tr><td class='content' style='padding: 0px;'>"+
						"<table class='layout listing'><tbody><tr class='listing-header'>"+
						"<th>Name</th><th>Location</th><th>Type</th><th>Economy</th><th>Construction</th><th>Production <small>(Shipyards)</small></th><th>Research <small>(Labs)</small></th></tr>";
		var idList = ids.split(',');
		for( var i = 0; i < idList.length; i++)
		{
			var baseData = getSetting(idList[i],"").split('<');
			if(baseData != "")
			{
				//console.log(baseData);
				var color = "";
				var bName = baseData[0];
				var bLoc = baseData[1];
				var bType = baseData[2].substring(baseData[2].indexOf(':')+1).split(' ');
				var bOEcon = parseInt(baseData[3].substring(baseData[3].indexOf(':')+1));
				var bEcon = parseInt(baseData[4].substring(baseData[4].indexOf(':')+1));
				ownerEconTotal += bOEcon;
				econTotal += bEcon;
				var bConst = parseInt(baseData[5].substring(baseData[5].indexOf(':')+1));
				constTotal += bConst;
				var bProd = parseInt(baseData[6].substring(baseData[6].indexOf(':')+1));
				prodTotal += bProd;
				var bRes = parseInt(baseData[7].substring(baseData[7].indexOf(':')+1));
				resTotal += bRes;
				var sYards = baseData[9].substring(baseData[9].indexOf(':')+2);
				var osYards = baseData[10].substring(baseData[10].indexOf(':')+2);
				var rLabs = baseData[11].substring(baseData[11].indexOf(':')+2);
				if(bOEcon < bEcon)
					color = "red";
				
				innerTable += "<tr align='center' style='color:"+color+"'><td><a href='base.aspx?base="+idList[i]+"'>"+bName+"</a></td>"+
							"<td><a href='map.aspx?loc="+bLoc+"'>"+bLoc+"</a></td>"+
							"<td>"+bType[0]+"<small> "+bType[1]+"</small></td>"+
							"<td>"+bOEcon+" / "+bEcon+"</td>"+
							"<td>"+bConst+"</td>"+
							"<td>"+bProd+" ("+sYards+"/"+osYards+")</td>"+
							"<td>"+bRes+" ("+rLabs+")</td>"+
							"</tr>";
				innerTable += "<tr><td class='help comment' colspan='7'>"+baseData[8]+"</td></tr>";
			}
		}
		innerTable +="<tr align='center'><td/><th>Sum</th><td/><td><b>"+ownerEconTotal+"/"+econTotal+"</b></td><td><b>"+constTotal+"</b></td><td><b>"+prodTotal+"</b></td><td><b>"+resTotal+"</b></td></tr>"+
						"</tbody></table></td></tr>";
		doc.innerHTML += innerTable;
		doc.innerHTML += "<tr><td align='center'><small>Occupied bases have capacities reduced and are shown in red.</small></td></tr>";
		
	}
}
//==========================================
// End of Free Account Capacity Setting Script
//==========================================

function uploadDataEvent()
{
	var tmp = "html=" + (isBase?"-ba2":"-ma2");
	tmp += escape(document.documentElement.innerHTML);
	uploadData(tmp);
}

function uploadData(upDat)
{
	if(typeof GM_xmlhttpRequest != "function")
    {
		alert("Please update your copy of GreaseMonkey.  Yours does not support GM_xmlhttpRequest.");
    }
    else
    {
	   GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.wrathofgods.net/index.php?action=gmuploader',
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: upDat,
		onload: function(responseDetails) {}
       });
	}
}

//==========================================
// Main Script (execution)
//==========================================
	  
       // ==========================================================
       // New switching page loader function, should reduce codesize
       // ==========================================================
       function cp_ae_main()
       {
           try {
		   serverTimeSetup();
               // ==========================================================
		       // Upload Data to the WoG Web Page
		       // ==========================================================

				   // Upload Astro or Base to WoG Site (ClayQ Script)				   
				   var serv = getServer();
					if(serv == "fenix")
					{
					   var dbUpload = false;
					   if (getPageType()=='mapSystem') 
					   { 
					      isBase=false;
					      dbUpload=true;
					   }
					   else if (getPageType()=='baseOverview') 
					   { 
					      isBase=true; 
					      dbUpload=true; 
					   }
					   else { dbUpload==false; }
					   
					   if (dbUpload==true)
					   {
							var playerName = getSetting(MY_NAME_KEY,"Newb");
							var gn = getSetting(MY_GUILD_KEY,"[WOLF]");
							var guildName = "["+gn.substring(3, gn.length - 3)+"]";
							//if (getSetting(WoG_DB_CONFIRM_KEY,false)==true) {  tmp += "<iframe src=about:blank name=updatewindow></iframe>"; } // old version
							var tmp = "html=" + (isBase?"-ba2":"-ma2");
							var pName = document.evaluate(
							"//a[contains(text(),'"+guildName + " " + playerName+"')]",
							document,
							null,
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
							null);
							for (var i = 0; i < pName.snapshotLength; i++)
							{
							   var br = pName.snapshotItem(i).title;
							   br += " (100% of your level)";
							   pName.snapshotItem(i).title = br;
							}
							tmp += escape(document.documentElement.innerHTML);
							if(getSetting(WOG_DB_KEY,true))
							{
								uploadData(tmp);
							}
							document.body.innerHTML += "<input type='button' value='Update'  id='updateButton' style='position: fixed; left: 5px; top: 5px;'/>";
							$('updateButton').addEventListener('click',uploadDataEvent,false);
					   }

					}
				if (!pagetype) var pagetype = _page;

               //     Switch to run functions per pagetype
               switch(pagetype)
               {
                   case ("scanners"):
                   {
                   //
                   };
               }

		//-----------------------------------
		// Set Capacities
		//-----------------------------------
			if(location.indexOf('view=bases_capacities')!=-1)
            {
				if(getSetting('upgradedAccount',true))
				{
					grabCaps();
				}
				else
				{
					displayCapPage();
				}
			}
        //-----------------------------------
        //Insert Empire Menu
        //-----------------------------------

            if(location.indexOf('empire.aspx')==-1)
            {
                if(getSetting(ADD_EMPIRE_SUBMENU_KEY,true))
                {
                    try
                    {
                        insertEmpireMenu();
                        document.addEventListener('load',function() { window.setTimeout( function() { cleanEmpireMenus(); } ,300) },false);
                    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Failed to insert empire menu: "+e);  }
                }
                onFeatureComplete("Insert Empire Menu");
            } else {
                if(getSetting(MOVE_EMPIRE_SUBMENU_KEY,true))
                {
                    try
                    {
                        moveEmpireMenu();
                    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Failed to move empire menu: "+e);  }
                }
                onFeatureComplete("Move Empire Menu");
            }

        //-----------------------------------
        //Insert config link
        //-----------------------------------
            try
            {
                insertCpLogo();
            } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Failed to insert config link: "+e);  }
            onFeatureComplete("Insert config link");

        //-----------------------------------
        //Insert Battle Calc Link
        //-----------------------------------
		if(getSetting(INSERT_BATTLECALC_LINK_KEY,true))
        {
            try
            {
                if(location.indexOf("attack=")!=-1)
                    insertAttackBattleCalcLink();
                else if(location.indexOf("fleet.aspx")!=-1)
                    insertFleetToBattleCalcLink();
                if(_site == "ae" && location.indexOf("attack=")==-1) insertBattleCalcLink();
            }
            catch(e)
            {
                console.log("Failed to insert battle calc link. "+e);
            }
            onFeatureComplete("Insert Battle Calc Link");
        }

        //-----------------------------------
        //Finish Times
        //-----------------------------------
        if(location.indexOf("empire.aspx")==-1 && location.indexOf("attack=")==-1)
        {
            if(getSetting(ADD_FINISH_TIMES_KEY,true))
                addFinishTimes(false);
        }
        else
        {
            if(getSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true) && location.indexOf("attack=")==-1)
            {
                var singleLine = getSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
                addFinishTimes(singleLine);
            }
            onFeatureComplete("Add Finish Times");
        }
          try
          {
            setupTimer();
          } catch (e) {console.log("setupTimer error: "+e);}
        //-----------------------------------
        //Adjust Page Titles
        //-----------------------------------
        if(getSetting(ADJUST_TITLES_KEY,true))
        {
            adjustTitles();
            onFeatureComplete("Adjust Page Titles");
        }
        //-----------------------------------
        //Show debris on astros
        //-----------------------------------
        if(document.location.href.match(/[A-G]\d+:\d+:\d+/))
        {
            debrisShow();
            onFeatureComplete("Show debris");
        }
		//-----------------------------------
        //Place Location in Text Box for easier copying
        //-----------------------------------
        if(document.location.href.match(/[A-G]\d+:\d+:\d+:\d+/))
        {
			textBoxLocation();
			onFeatureComplete("Location In TextBox");
		}
        //-----------------------------------
        //Advanced Production Features
        //-----------------------------------
        if(location.indexOf("base.aspx")!=-1 &&
        (getView()=="Production" || getView()=="Structures" || getView()=="Defenses" || getView()=="Research"))
        {
            if(getSetting(FIX_QUEUES_KEY,true))
            {
                fixQueues();
                onFeatureComplete("Fix Queues");
            }
            if(getView()=="Production")
            {
                if(getSetting(ENABLE_PRODUCTION_PRESETS_KEY,true))
                {
                    registerTextBoxEventListeners();
                    insertProductionPresetsButtons();
                    onFeatureComplete("Production Presets");
                }
                if(getSetting(ENTER_PRODUCTION_TIME_KEY,true))
                {
                    insertTimeTextBoxes();
                    onFeatureComplete("Production Time Feature");
                }
            }
        }

        //-----------------------------------
        //Fleet Summary
        //-----------------------------------
        if(location.indexOf("base.aspx?base=")!=-1 || location.indexOf("map.aspx?loc=")!=-1)
        {
            if(getSetting(SUM_FLEETS_KEY,true))
            {
                sumFleets();
                onFeatureComplete("Fleet Summary");
            }
        }

        //-----------------------------------
        //Calculate Pillage
		//Set Base Capacity Info if Free account
        //-----------------------------------
        if(location.indexOf("base.aspx?base=")!=-1 && location.indexOf("view=structures")==-1 &&
        location.indexOf("view=defenses")==-1 && location.indexOf("view=production")==-1 &&
        location.indexOf("view=trade")==-1 && location.indexOf("view=research")==-1)
        {
            if(getSetting(SHOW_PILLAGE_KEY,true))
            {
                attachPillage();
                onFeatureComplete("Pillage Summary");
            }
			if(!getSetting('upgradedAccount',true))
			{
				setBaseCapInfo();
				onFeatureComplete("Free Account Base Capacity Grab");
			}
        }
        //-----------------------------------
        //Show total fleet on individual summery
        //-----------------------------------

        if(location.indexOf("fleet.aspx?fleet=")!=-1 && location.indexOf('view=attack') == -1 && location.indexOf('view=move') == -1 && location.indexOf('view=build_base') == -1 && location.indexOf('view=disband') == -1 && location.indexOf('view=piracy') == -1)
        {
            if(getSetting(SUM_FLEETS_KEY,true))
            {
                sumSingleFleet();
                onFeatureComplete("Single Fleet Summary");
            }
			//getJGList();
        }


        //-----------------------------------
        //Fleet/Base Page Features
        //-----------------------------------
        if(location.indexOf("base.aspx")!=-1 && getView() == "" && getSetting(CLONE_BASE_LINKS_KEY,true))
        {
            copyBaseLinks();
            onFeatureComplete("Copy Base Links");
        }
        if(location.indexOf("fleet.aspx")!=-1 && getView() == "" && getSetting(CLONE_FLEET_LINKS_KEY,true))
        {
            copyFleetLinks();
            onFeatureComplete("Copy Fleet Links");
        }
        if((location.indexOf("base.aspx")!=-1 || location.indexOf("fleet.aspx")!=-1) &&
        getView() == "" && location.indexOf("?base=")==-1 && location.indexOf("?fleet=")==-1 &&
        getSetting(MOVE_GALAXY_LINKS_KEY,false))
        {
            moveGalaxyList();
            onFeatureComplete("Move Galaxy Links");
        }
        if(document.location.href.match(/empire.aspx$/) || document.location.href.match(/empire.aspx\?view=bases_events$/))
        {
            saveBaseCoords();
            onFeatureComplete("Save base coords");
        }
        //-----------------------------------
        //Advanced Structures Page
        //-----------------------------------
        if(location.indexOf('empire.aspx?view=structures')!=-1)
        {
            saveBases();
            onFeatureComplete("Save Base Data");
            if(getSetting(STRUCTURES_GOALS_KEY,true))
            {
                if(location.indexOf("mode=edit")!=-1) insertEditRows();
                else insertBaseSettingLinks();
                onFeatureComplete("Advanced Structures Page");
            }
        }
        //-----------------------------------
        // Enhanced Production Page (dodgy)
        //-----------------------------------
        if(location.match(/empire\.aspx$/) != null || location.indexOf('empire.aspx?view=bases_events') != -1)
        {
            if(getSetting(PRODUCTION_ENHANCE_KEY,false))
            {
                try{
                    productionHelperButton();
                    onFeatureComplete("Enhanced Production");
                } catch (e) { console.log("Enhanced Production error: "+e) }
            }
        }
        //-----------------------------------
        // Enhanced construction Page
        //-----------------------------------
        if(document.location.href.match(/base.aspx\?base=[0-9]{1,}&view=structures/)
        || document.location.href.match(/base.aspx\?base=[0-9]{1,}&view=defenses/)
        || document.location.href.match(/base.aspx\?base=[0-9]{1,}&view=research/))
        {
            if(!document.location.href.match(/&info=/) && getSetting(CONSTRUCT_ENHANCE_KEY,false))
            {
                try{
                enhanceConstructionPage();
                onFeatureComplete("Enhanced Construction Page");
                } catch (e) { console.log("Enhanced Construction error: "+e) }
            }
        }
        //-----------------------------------
        //Sum Credits
        //-----------------------------------
        if(location.indexOf('credits.aspx')!=-1 && getSetting(SUM_CREDITS_KEY,true))
        {
            sumCreditsPage();
            onFeatureComplete("Credits Summary");
        }


        //-----------------------------------
        //Advanced Fleet Page
        //-----------------------------------
            if(location.indexOf('empire.aspx?view=fleets')!=-1)
            {
                if(getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true) || getSetting(SHOW_ATTACK_SIZE_KEY,true) || getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
                {
                    sumShips();
                }
                onFeatureComplete("Advanced Fleet Page");
            }
        //-----------------------------------
        //Advanced Trade Page
        //-----------------------------------
            if(location.indexOf('empire.aspx?view=trade')!=-1)
            {
                if(getSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,true))
                    checkTradePage();
                if(getSetting(HIGHLIGHT_POOR_TRADES_KEY,true))
                    findPoorTrades();
                onFeatureComplete("Advanced Trade Page");
            }

        //-----------------------------------
        //Save Tech Data
        //-----------------------------------
            if(location.indexOf('view=technologies')!=-1)
            {
                saveTechData();
                onFeatureComplete("Save tech data");
            }
        //-----------------------------------
        //Fleet Movement Reminder
        //-----------------------------------
           if(getSetting(FLEET_AUTO_LAUNCH_KEY,true) && location.indexOf('view=move')!=-1)
            {
                insertArriveTimeTextBox();
            }
		//-----------------------------------
        // Run new battlecalc simulation
        //-----------------------------------
        if (getSetting(SCRIPT_BATTLECALC_KEY,true) && location.indexOf('combat.aspx')!=-1  && isConfirmPage())
        {
            try{
                runBattleCalc();
                onFeatureComplete("Built in Battlecalc");
            } catch (e) { console.log("battlecalc error: "+ e)}
			highlightSupportShips();
        }
		//-----------------------------------
		// Attach Profit/Losses foot note.
		//-----------------------------------
		if( getSetting(PROFIT_SUM_KEY,true) && (location.indexOf('combat.aspx')!=-1 || location.indexOf('messages.aspx')!=-1 || location.indexOf('board.aspx')!=-1))
		{
			try{
                calcAttackProfit();
                onFeatureComplete("Attack Profit");
            } catch (e) { console.log("Profit/loss error: "+ e)}
		}
		//-----------------------------------
		// Fleet Info Popup
		//-----------------------------------
		if( getSetting(FLEET_INFO_POPUP,true) && ( location.indexOf("fleet.aspx")!=-1 || location.indexOf("map.aspx?loc=") != -1 || location.indexOf("view=scanners") != -1  || location.indexOf("base.aspx?base=") != -1 ) )
		{
			try{
				fleetInfoPopUp();
			} catch (e) { console.log("Fleet Info Popup error: "+ e)}
		}
		
        //-----------------------------------
        //Format Numbers
        //-----------------------------------
        if(getSetting(FORMAT_NUMBERS_KEY,true))
        {
            if(location.indexOf('view=move')==-1 && location.indexOf('view=fleets')==-1 &&
                location.indexOf('view=production')==-1 && location.indexOf('view=structures')==-1 &&
                location.indexOf('view=trade')==-1 && location.indexOf('view=research')==-1)
            {
                formatVariousNumbers();
                onFeatureComplete("Format Numbers");
            }
        }
               //-----------------------------------
               //Add highlights on scanner page
               //-----------------------------------
               if(getSetting(FORMAT_SCANNER_KEY,true))
               {
                   if(location.indexOf('view=scanners')!=-1)
                   {
                       scannerFormat();
                       onFeatureComplete("Scanner highlights");
                   }
               }
               //-----------------------------------
               //Autoset player guild
               //-----------------------------------
               if(_page=='profile' && getSetting(AUTOSET_GUILD_KEY,true)){
                   setGuildHighlight();
                   onFeatureComplete("Set Guild Highlight");
               }
               //-----------------------------------
               // Highlight player links
               //-----------------------------------
               if(location.indexOf('view=move')==-1)
               {
                   if(getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) || getSetting(HIGHLIGHT_PLAYERS_KEY,true))
                   {
                       highlightTradePartners();
                       onFeatureComplete("Highlight Links");
                   }
               }
			   //-----------------------------------
               // Highlight commanders
               //-----------------------------------
			   if(location.indexOf('commander.aspx') != -1 || location.indexOf('base.aspx') != -1  || location.indexOf('view=bases_capacities') != -1 ) 
			   {
					if(getSetting(HIGHLIGHT_COMMANDERS_KEY,false))
                    {
						highlightCommanders();
						onFeatureComplete("Highlight Commanders");
				    }
			   }	
			   //-----------------------------------
               //Remove redirections
			   //-----------------------------------
               if((location.indexOf('board.aspx')!=-1 || location.indexOf('guild.aspx')!=-1 || location.indexOf('profile.aspx')!=-1) && _site == "ae")
               {
                   if(getSetting(REMOVE_REDIRECT_KEY,true))
                   {
                       removeRedirects();
                       onFeatureComplete("Remove Redirects");
                   }
               }

               if (DEBUGNEWCODE && location.indexOf('guild.aspx')!=-1) discoverPacts();
          } catch (e) {
              console.log ("General exception raised cp_ae_main: "+e);
          }
    }
	
	function textBoxLocation()
	{
		var locationElm = document.evaluate("//a[text()='Bookmark']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		var locationText  = locationElm.parentNode.textContent.substring(locationElm.parentNode.textContent.indexOf('(')+1,locationElm.parentNode.textContent.indexOf(')'));
		//console.log(locationText);
		var newHTML =locationElm.parentNode.innerHTML.substring(0, locationElm.parentNode.innerHTML.indexOf('(')) + "<input type='textbox' size='12' readonly='true' value='"+locationText+"' onclick='this.select();'/>" +locationElm.parentNode.innerHTML.substring(locationElm.parentNode.innerHTML.indexOf(')') + 1);
		locationElm.parentNode.innerHTML = newHTML;
	}

	function isBattleResultPage()
	{
		var result = false;
		if(location.indexOf('combat.aspx')!=-1)
		{
			var br = document.evaluate(
			"//th[text() ='Battle Report']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
			if (br.snapshotLength >= 1)
			{
				result = true;
			}
		}
		else if( location.indexOf('messages.aspx')!=-1 )
		{
			var br = document.evaluate(
			"//th[text() ='Battle Report']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
			if (br.snapshotLength >= 1)
			{
				result = true;
			}

		}
		else if( location.indexOf('board.aspx')!=-1 )
		{		
			var br = document.evaluate(
			"//th[text() ='Battle Report']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
			if (br.snapshotLength >= 1)
			{
				result = true;
			}

		}
		return result;
	}
	
	
	function calcAttackProfit()
	{
		if( isBattleResultPage() )
		{
			var bres = document.evaluate(
			"//div[@class ='battle-report']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
			for (var i = 0; i < bres.snapshotLength; i++)
			{
				var br = bres.snapshotItem(i);				
				var reportIndex = 1;
				if(br.childNodes[reportIndex].firstChild == null)
				{
					for(var x = 0; x < br.childNodes.length; x++)
					{					
						if(br.childNodes[x].nextSibling.name = "battle-report_info")
						{
							console.log(br.childNodes[x].nextSibling);
							reportIndex = x;
							break;
						}
						//console.log(br.childNodes[3]);
					}
				}
				var attackPlayer = br.childNodes[reportIndex].firstChild.childNodes[4].childNodes[1].firstChild.textContent;
				if(attackPlayer.indexOf("]") != -1)
				{
					attackPlayer = attackPlayer.substring(attackPlayer.indexOf("]") +2);
				}		
				var attack_deff = null;
				var derbs = null;
				var pillageAmount = null;
				
				for(var x = 0; x < br.childNodes.length; x++)
				{
					if(br.childNodes[x].textContent.indexOf("units destroyed:") != -1)
					{
						attack_deff = br.childNodes[x];
					}
					else if(br.childNodes[x].textContent.indexOf("debris in space:") != -1)
					{
						derbs = br.childNodes[x];
					}
					else if(br.childNodes[x].textContent.indexOf("pillaging defender's base") != -1)
					{
						pillageAmount = br.childNodes[x];
					}
				}
//				console.log(attack_deff);
//				console.log(derbs);
//				console.log(pillageAmount);
//				console.log("----------");
				var pn = getSetting(MY_NAME_KEY,"Newb")
				var losses = parseInt(attack_deff.textContent.substring(attack_deff.textContent.indexOf("Attacker:") + 10, attack_deff.textContent.indexOf(";") - 1));

				//console.log(losses);
				
				var derbGains = parseInt(derbs.textContent.substring(derbs.textContent.indexOf(":") +2));
				
				//console.log(derbGains);
				var pillGains = 0;
				if(pillageAmount)
				{
					pillGains = parseInt(pillageAmount.textContent.substring(pillageAmount.textContent.indexOf("got") + 4, pillageAmount.textContent.indexOf("credits") -1));
				}
				//console.log(pillGains);
				
				var totalProfit = (derbGains + pillGains) - losses;
				//console.log(totalProfit);				
				var attPlayerLink = br.childNodes[reportIndex].firstChild.childNodes[4].childNodes[1].innerHTML;
				attPlayerLink = attPlayerLink.substring(0,attPlayerLink.indexOf("<small>")-1);
				if(attPlayerLink == "")
				{								
					if(br.childNodes[reportIndex].firstChild.childNodes[3].childNodes[1] == null)
					{
						attPlayerLink = br.childNodes[reportIndex].firstChild.childNodes[4].childNodes[1].innerHTML;
						attPlayerLink += "&nbsp;&nbsp;";
					}
					else
					{
						attPlayerLink = br.childNodes[reportIndex].firstChild.childNodes[3].childNodes[1].innerHTML;
						attPlayerLink = attPlayerLink.substring(0,attPlayerLink.indexOf("<small>")-1);
					}
				}				
				var profitHTML = "<br/><center><u>";
				if(isConfirmPage())
				{
					profitHTML += "Estimated ";
				}
				profitHTML += "Profit/Losses Calculation:</u></center>";
				profitHTML += "<center> " + attPlayerLink;
				if(totalProfit > 0)
				{
					profitHTML += "<b><font size='2' color='green'>Gained &nbsp;</font></b> ";
				}
				else
				{
					profitHTML += "<b><font size='2' color='red'>Lost &nbsp;</font></b> ";
				}
				profitHTML += Math.abs(totalProfit) + " credits in this battle!</center><br/><br/>";
				br.innerHTML += profitHTML;
			}
		}
	}
		
	function highlightSupportShips()
	{
		var attackerRows = document.evaluate(
            "//table//th[contains(text(),'Attack Force') and @colspan='6']/../..//tr[@align='center']",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
			var badShip = false;
			for (var i = 0; i < attackerRows.snapshotLength; i++)
			{
				var row = attackerRows.snapshotItem(i);
				var aName = row.childNodes[NAME_INDEX].firstChild.nodeValue
				if(supportShips.indexOf(aName) != -1)
				{
					row.childNodes[NAME_INDEX].style.color = "red";
					badShip = true;
				}
			}	
			if(badShip)
			{
				notify("You have Support Ships in Your Attacking Fleet!");			
			}
	}
	
	function GetCommanderColor( comType )
	{
		var color = "";
		switch(comType)
		{
			case "Defesa":
			case "Defense":
					color = getSetting(HIGHLIGHT_COMMANDER_DEFENSE, "#EE00EE");
					break;
			case "Constru��o":
			case "Construction":
					color = getSetting(HIGHLIGHT_COMMANDER_CONSTRUCTION, "#FF7F00");
					break;
			case "Pesquisa":
			case "Research":
					color = getSetting(HIGHLIGHT_COMMANDER_RESEARCH, "#7EC0EE");
					break;
			case "Produ��o":
			case "Production":
					color = getSetting(HIGHLIGHT_COMMANDER_PRODUCTION, "#FFD700");
					break;
			case "T�ctico":
			case "Tactical":
					color = getSetting(HIGHLIGHT_COMMANDER_TACTICAL, "#CD0000");
					break;
			case "Logistica":
			case "Logistics":
					color = getSetting(HIGHLIGHT_COMMANDER_LOGISTICS, "#71C671");
					break;
		}
		return color;
	}
	
	function highlightCommanders()
	{
		if(location.indexOf('commander.aspx') != -1 && location.indexOf('commander=') == -1)
		{
			var commanders = document.evaluate(
            "//table[@id = 'commanders']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue.firstChild;
			var commanders = commanders.getElementsByClassName('layout listing')[0].firstChild;
			for(var i = 1; i < commanders.childNodes.length; i++)
			{
				var commander = commanders.childNodes[i];				
				var comType = commander.childNodes[1].textContent.substring(0, commander.childNodes[1].textContent.indexOf(" "));
				var color = GetCommanderColor(comType);
				//console.log(comType +": "+color);
				commander.firstChild.firstChild.style.color = color;
			}
		}
		else if( location.indexOf('view=bases_capacities') != -1 )
		{
			var commanders = document.evaluate(
            "//td[@class='help comment']",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
			//console.log(commanders.snapshotLength);
			for(var i = 0; i < commanders.snapshotLength; i++)
			{
				var commander = commanders.snapshotItem(i);
				var comType = commander.textContent.substring(commander.textContent.indexOf("(")+1, commander.textContent.indexOf(")"));
				comType = comType.substring(0, comType.indexOf(" "));
				var commanderName = commander.textContent.substring(commander.textContent.indexOf(":")+2, commander.textContent.indexOf("("));
				var color = GetCommanderColor(comType);
				//console.log(comType +": "+color);
				commanderName = "<font color='"+color+"'>" + commanderName + "</font>";
				commander.innerHTML = commander.textContent.substring(0,commander.textContent.indexOf(":")+2) + commanderName + commander.textContent.substring(commander.textContent.indexOf("("));
			}
		}
		else if ( location.indexOf('base.aspx') != -1 && location.indexOf('base=') != -1 && (location.substring(location.indexOf("&view=")) == "&view=" || location.indexOf("&view=") == -1 )) 
		{
			var commanders = document.evaluate(
            "//a[contains(@href,'commander.aspx?commander')]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
			//console.log(commanders);
			if(commanders)
			{	
				var comType = commanders.parentNode.childNodes[3].textContent.substring(1, commanders.parentNode.childNodes[3].textContent.indexOf(" "));
				commanders.style.color = GetCommanderColor(comType);
			}
		}
	}
	// Ensure everythings loading in the proper order, stuff thats priority loads first while bulk of script can be disabled easily

    function cp_ae_initalisation()
    {

        var pagetype=_page;
        if (_site == "ae")
        {
        //  Global site functions
        //  Header
           onFeatureComplete("Initialization");
           installCheck();
           // INDENTING TWICE TO SHOW THIS WHOLE SECTION IS CAPTURED FOR ERRORS

           //-----------------------------------
           //Site-wide Features
           //-----------------------------------
           if(location.indexOf('view=move')==-1)
           {
              if(getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) && getSetting(HIGHLIGHT_PLAYERS_KEY,true))
              {
                  if(getView()!="Trade")
                  {
                      checkTradeDataAge();
                      onFeatureComplete("Check Trade Data Age");
                  }
              }
              checkBaseDataAge();
              onFeatureComplete("Check Base Data Age");
              checkGuildDataAge();
              onFeatureComplete("Check Guild Data Age");
             //            if (getView()!="Technologies")
             //            {
             //                checkTechDataAge();
             //                onFeatureComplete("Check Tech Data Age");
             //            }
              if(location.indexOf('bookmarks.aspx')==-1 && location.indexOf('empire.aspx')==-1 && getSetting(NAME_LOCATIONS_KEY,false))
              {
                  replaceLocationNames();
                  onFeatureComplete("Named Locations");
              }
           }
           else
           {
              if(getSetting(INSERT_MOVE_PRESETS_KEY,true))
              {
                 insertMoveFleetLinks();
                 onFeatureComplete("Insert Move Fleet Presets");
              }
           }
        //  Main
            cp_ae_main();

        //  Footer
// gia additions
if(location.match(/astroempires.com/)){initRightMenu();}

if(location.match(/view=scanners/)) {displayQuickMarks();}
            //Show Execution Times
            if(getSetting(SHOW_EXECUTION_TIME_KEY,false)) displayTimes();

        }
    }
try { cp_ae_initalisation() } catch (e) {
    console.error ("\n General error: "+e+"\nLine Number: "+e.lineNumber);
}

//notify("test error","notifierError");
//notify("test","notifier");

//-----------------------------------
//Auto Launch count down script
//-----------------------------------
function serverTimeSetup(){
setInterval(function(){serverTimeAdjust()}, 200); 
}

function serverTimeAdjust()
{
	now = (new Date).getTime();
    elem=document.getElementById('pageDate');
    m=0;h=0;
	var diff = (now - start_date) / 1000; 
	s = parseInt(elem.title) + diff;		
	if(document.location.href.match(/fleet.aspx\?fleet=[0-9]{1,}&view=move/))
	{	
		if(document.getElementById("launchButton").value == "Disable Auto-launch")
		{
			var serverTimeVal = document.getElementById("pageDate").innerHTML.replace(/Server time: /, "");
			if(document.getElementById("radioLaunch").checked == true)
			{
				if(serverTimeVal == document.getElementById("arrivalTime").value)
				{
					document.getElementsByTagName('form')[1].submit();
				}
			}
			else
			{
				var aDay = document.getElementById("arrivalTime").value.substring(0,document.getElementById("arrivalTime").value.indexOf(" "));
				var aTime = document.getElementById("arrivalTime").value.substring(document.getElementById("arrivalTime").value.indexOf(" ")+1);
				var sDay = serverTimeVal.substring(0, serverTimeVal.indexOf(" "));
				var travelTime = getSeconds(document.getElementById("duration").innerHTML);
				var aTimearray = aTime.split(":");		
				aTime = getSeconds(aTimearray[0] + "h " + aTimearray[1] + "m " + aTimearray[2] + "s");								
				if(aDay != sDay)
				{					
					if(aTimearray[0] == "0" || aTimearray[0]=="00")
					{
						aTime = aTime + (24*60*60);
					}
				}		
				var newTime = getTimeDisplay(aTime - travelTime);
				var newTimetemp = newTime.substring(0, newTime.indexOf("h ")) + ":";
				newTimetemp = newTimetemp + zeroPad(newTime.substring(newTime.indexOf("h ")+2, newTime.indexOf("m "))) + ":";
				newTimetemp = newTimetemp + zeroPad(newTime.substring(newTime.indexOf("m ")+2, newTime.indexOf("s")));
				newTime = aDay + " " +newTimetemp;
				// Add code to find the difference between the time they want to arrive at and the amount of time the trip will take then submit the forum when the servertime is equal to those times
				if(serverTimeVal == newTime){
					document.getElementsByTagName('form')[1].submit();
				}
			}
		}
      }
	  if(document.getElementById("updateCheckButton"))
	  {
		if(document.getElementById("updateCheckButton").value == "Checking For Updates..")
		{
			document.getElementById("updateCheckButton").value = "Checking For Updates...";
			var OldVersion = parseFloat(GM_getValue("scriptVersion",0+""));
	        var NewVersion = parseFloat(scriptVersion);
		    var LatestVersion = 0.0;
		    //console.log("LastChecked: " + lastCheck);
		    //console.log("Current Time: " + currTime);
		    //console.log(scriptVersion);			
			//console.log("Difference: " + Math.abs(currTime - lastCheck));

			 	GM_xmlhttpRequest({
				    method: 'GET',
				    url: 'http://www.wrathofgods.net/Sources/tools/WoGAEBitsScriptInfo.txt',
				    headers: {
				        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				        'Accept': 'application/scriptVersion+xml,application/xml,text/xml',
				    },
				    onload: function(responseDetails) {
						LatestVersion = parseFloat(responseDetails.responseText.substring(responseDetails.responseText.indexOf(":")+1));
					   if(OldVersion < LatestVersion)
						{
							insertNotification("There is a new version of WOLF AE Extras available!<br/> Please go <a target='_blank' href='http://www.wrathofgods.net/index.php?board=6.0'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+"<br/> Your Version: "+OldVersion+"<br/>");	
						}	
						else
						{
							insertNotification("No updates available. You are up to date!<br/> Your Version: "+OldVersion+"<br/>");
						}
						document.getElementById("updateCheckButton").value = "Check For Updates";
				    }
				});
		}
	  }
	  
	  if(showTime > 0)
	  {
		showTime--;
	  }
	  if(openDiv && showTime == 0 && !hover)
	  {
		openDiv = false;
		var fro = null;
	    for(var i = 0; i<=frc; i++)
		{
			fro = document.getElementById('fleetinfo'+i);
			if(fro) 
			{
				if(getSetting(FLEET_INFO_POPUP_FADE,true))
				{
					setFading(fro,100,20,200,function(){document.body.removeChild(fro);});
				}
				else
				{
					document.body.removeChild(fro);
				}
			}
		}
	  }
}
//-----------------------------------
//End Auto Launch count down script
//-----------------------------------
//-----------------------------------
//JG List Population Script
//-----------------------------------

function getJGList()
{
	GM_xmlhttpRequest({
	method: 'GET',
	url: "http://www.wrathofgods.net/index.php?action=jgwog",
	headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	onload: function(responseDetails) {
		var userGuild = getSetting(MY_GUILD_KEY,"WOLF").replace('%5B','').replace('%5D','');
		//console.log(userGuild);

		var JGRows = document.evaluate(
            "//table[@class='messages']",
            fr.innerHTML,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
		console.log(JGRows);
	}
    });	
}

//-----------------------------------
//End JG List Population Script
//-----------------------------------
//-----------------------------------
//Fleet Detail Popup Script
//-----------------------------------
var frc = 0;
var showTime = 0;
var openDiv = false;
var hover = false;
var event;
var obj;
var tmr

function fleetInfoPopUp()
{	
	var links = document.getElementsByTagName("a");
	var i = 0;
	while(links[i]) {
	    if(/fleet.aspx\?fleet=[0-9]{4,}$/.test(links[i].href)) {
		//links[i].addEventListener('mouseover',mkIframe,false);
		links[i].addEventListener('mouseover',startTmr,false);
		links[i].addEventListener('mouseout',stopTmr,false);

	    }
	    i++;
	}
}

function stopTmr() {
	hover = false;
    clearTimeout(tmr);
}

function startTmr(e) {
	hover = true;
    obj = this;
    event = e;
    tmr=setTimeout(tmrTarget,400);
}

function tmrTarget() {
    mkIframe(obj,event);
}


function killIframes() {
    var fro = null;
    for(var i = 0; i<frc; i++) {
	fro = document.getElementById('fleetinfo'+i);
	if(fro) {
	    //document.body.removeChild(fro);
		if(getSetting(FLEET_INFO_POPUP_FADE,true))
		{
			setFading(fro,100,20,200,function(){document.body.removeChild(fro);});
		}
		else
		{
			document.body.removeChild(fro);
		}
	}
    }
}

function mkIframe(objct,evt) {
    frc++;
    var fr = document.createElement("div");
    fr.setAttribute('id','fleetinfo'+frc);	
	geturl = objct.href;
    GM_xmlhttpRequest({
	method: 'GET',
	url: geturl,
	onload: function(responseDetails) {
	    document.body.appendChild(fr);
	    inner = responseDetails.responseText;
	    inner = inner.match(/<table id=\'fleet_overview\'.*<\/table>/)[0].replace(/Travel.*<form[^>]*>.*<\/form>/,'');
	    fr.innerHTML = inner;
		var divHeight = document.getElementById(fr.id).offsetHeight;
		var divWidth = 250;
		var topLY = evt.pageY, topLX = evt.pageX;
		if(topLX <= window.innerWidth/2)
		{
			topLX = topLX - 250;
			if(topLX < 0)
			{
				topLX = 0;
			}
		}
		else
		{
			topLX = topLX + 10;
			if((topLX + divWidth) > window.innerWidth)
			{
				topLX = (window.innerWidth - divWidth) + window.pageXOffset;
			}
		}
		if( (topLY+divHeight) > (window.innerHeight+window.pageYOffset))
		{
			topLY = (window.innerHeight - divHeight) + window.pageYOffset;
		}
		fr.setAttribute('style','position: absolute; top: ' + topLY + 'px; left: ' + topLX + 'px; z-index:50; opacity:0; width:200px;');	
	     killIframes(false);
		 if(getSetting(FLEET_INFO_POPUP_FADE,true))
		 {
			setFading(fr,20,100,500,'');
		 }
		 else
		 {
			fr.style.opacity = 100;
		 }
		openDiv = true;
		showTime = getSetting(FLEET_INFO_POPUP_TIMER,20);
	}
    });	
}
