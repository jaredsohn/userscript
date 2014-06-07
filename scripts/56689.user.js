// ==UserScript==
// @name                AE Extras - CP
// @namespace           http://userscripts.org/scripts/show/56689
// @description         Various user interface enhancements for the Astro Empires MMOG (www.astroempires.com)

// @include             http://*.astroempires.com/*
// @exclude             http://*.astroempires.com/
// @exclude             http://*.astroempires.com/home.aspx*
// @exclude             http://*.astroempires.com/login.aspx*
// @exclude             http://forum.astroempires.com/*
// @exclude             http://support.astroempires.com/*
// @exclude             http://wiki.astroempires.com/*
// @exclude             http://wiki.astroempires.com/*/*
// @exclude             http://*.astroempires.com/upgrade.aspx*
// @exclude             http://*.astroempires.com/tables.aspx*
// @exclude             http://*.astroempires.com/profile.aspx?action=*
// @exclude             http://*.astroempires.com/register.aspx*
// @exclude             http://*.astroempires.com/smilies.aspx*
// ==/UserScript==
/*
Created and Last Edited in May 2008 By knubile
Project taken over Sep 6, 2008 by Cold-Phoenix
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

<!--==UpdateText==-->
<span style="color:orange;font-weight:bold;">Please check the <a href="http://
userscripts.org/scripts/show/33239">userscripts site</a> for update info on
previous versions</span><br />
<span style="color:yellow;font-weight:bold;">Shout out to all those that have
supported and given feedback from Cold-Phoenix.</span><br />
<h3>Update (4.996):</h3>
<p>Fixed auto launcher, adjusted to server time rather than local time and improved accuracy.</p>
<h3>Update (4.995):</h3>
<p>Adjusted for timer features in AE</p>
<h3>Update (4.994):</h3>
<p>Fixed insert of empire submenu</p>
<h3>Update (4.993):</h3>
<p>Refresh map location page</p>
<h3>Update (4.992):</h3>
<p>Refresh scanner page</p>
<h3>Update (4.991):</h3>
<p>Adjusted to layout changes on profile page</p>
<h3>Update (4.99):</h3>
<p>Fixed the positioned production and construction queues</p>
<p>Enhanced the finish times for countdown timers</p>
<h3>Update (4.98):</h3>
<p>Reworked date and time related functions</p>
<h3>Update (4.97):</h3>
<p>Tried to fix broken production helper (not tested).</p>
<h3>Update (4.96):</h3>
<p>Fixed fleet summaries.</p>
<h3>Update (4.95):</h3>
<p>Configurable colors for Quick Bookmarks.</p>
<h3>Update (4.94):</h3>
<p>Added a simple auto launcher to fleet movement screen.</p>
<h3>Update (4.93):</h3>
<p>Duplicate trading partners are shown.</p>
<h3>Update (4.92):</h3>
<p>Believe I fixed the launch timer too :)</p>
<ul style="list-style: disc outside">
<li>Prevented that pressing Calculate Depart Time submitted the fleet movement form</li>
</ul>
<p>Remaining issues</p>
<ul style="list-style: disc outside">
<li>Time inputs in prodcution screen still not working</li>
</ul>
<h3>Update (4.91):</h3>
<p>Fixed some major issues (not all) after layout changes by AE</p>
<ul style="list-style: disc outside">
<li>Fixed Empire Fleet screen that was broken</li>
<li>Disabled time input in production view that caused Firefox to crash</li>
</ul>
<p>Remaining issues</p>
<ul style="list-style: disc outside">
<li>Timer in fleet movement screen is not working</li>
</ul>
<h3>Update (4.90):</h3>
<p>Tried to fix a minor issue with Arrival Time Format.</p>
<h3>Updated (4.89):</h3>
<p>Sincere appologies for being so long releasing a new version, lack of interest in ae and personal projects took me away for a while.</p>
<p>This is a hotfix to apply some of the many changes that are having to take place, not all bugs are addressed yet.
New layout btw is some of the worst html i have ever delt with, nested tables to kingdom come.</p>
<ul style="list-style: disc outside">
<li>Edit: Webchat link has been altered to the freenode based one, please remember i shall try to be in that channel as much as possible for support but i may not be active 24/7.</li>
<li>Bugfix: Numerous fixes to gathering page sections internally (to address changes now and in future).</li>
<li>Bugfix: Fixed base data collection.</li>
<li>Bugfix: Fixed multiple bugs with new layout.</li>
<li>Removal: AeProject has been completely removed, this will be standalone in future,
to ensure security for those who can't understand the code. No part of extras will ever be used to exploit data from anyone
and even given just the rumours i have decided to completely seperate aeproject.</li>
</ul><hr class="cphr" style="color:orange; width: 400px;" />
<!--==/UpdateText==-->

<!--==KnownIssues==-->
<h3>Known issues:</h3>
<span style="color:orange;">If something isn't listed please visit the forum or
chat to ensure its being addressed.</span>
<ul style="font-size:xx-small;">
<li>Bug: Fleet/defence not uploading in aep.</li>
<li>Bug: Max queue production page formatting error.</li>
<li>Bug: Add check for corrupt data.</li>
<li>Bug: Fixed queue showing more than allowed amount.</li>
<li>Bug: Estimated pillage.</li>
<li>Bug: Guild fleet only shows up if it's not the base owner/First fleet missed.</li>
<li>Bug: When 'unbalanced highlighting' is on, it doesnt record. I have to turn it off for it to update trade routes.</li>
<li>Bug: Fleets not uploading in astro view of aep (variables gathered just not appended)</li>
<li>Bug: Cons helper queued indicator not functioning on all buildings, suggest recode to include 'ignore' option.</li>
<li>Bug: Fleet timer am/pm swapped?</li>
<li>Bug: Timers not loading due to adblock should be altered to fix in cases where ae site scripts are disabled.</li>
<li>Bug: Work on scripting for production page when in fast build mode.</li>
<li>Bug: Unknown astros in aeproject and further aep updates.</li>
<li>Bug: On the production screen the total cost and total time doesn't seem to work now if you use a preset.</li>
<li>Bug: Trade helper not liking having additional menubar.</li>
<li>Bug: Base info not read from free accounts correctly.</li>
<li>Issue: Unicode characters not being handled by standard functions, function there needs implementing.</li>
<li>Issue: Add option for the trade announcements.</li>
<li>Issue: Readability prod/cons helper.</li>
<li>Issue: Css formatting for structures page buttons for visibility.</li>
<li>Issue: Add reset for advanced structures page.</li>
<li>Issue: Add quick bookmarks hide/show.</li>
</ul>
<!--==/KnownIssues==-->

<!--==FutureText==-->
<h3>Future update ideas:</h3>
<span style="color:orange;">Features currently being worked on.</span>
<ul style="font-size:xx-small;">
WIP = work in progress<br />
<li>WIP: Tabbed config to reduce the bulk into chunks easier to handle.</li>
<li>WIP: Battlecalc scripting to be expanded and start to build ui for it.</li>
<li>WIP: Add tooltips to the structures page buttons giving full names of presets.</li>
<li>WIP: Guild tag finding for autosetting pacts.</li>
<li>WIP: Option to move fleet links to right side, links added to other fleet pages.</li>
<li>WIP: Adjusting timers to hide date display on expired, potential to add a sound effect.</li>
<li>WIP: Hide/autoclose/disable/shrink announcements.</li>
<li>WIP: Colour support ships red, possible auto alert for attacking with them</li>
<li>WIP: Css overall generated should be editable.</li>
<li>WIP: Build own internal console display (replace notify) as half the time its not functional</li>
<li>WIP: Battlecalc inputs need updating still to the new system.</li>
<li>WIP: Add production presets by time.</li>
<li>WIP: Add check for guild pacts not set and alert, with hide option and repeat every x days for pacts.</li>
<li>WIP: Add static page loaded time.</li>
<li>Idea: Prod helper extend into 'emergency build' and 'spread accross bases'.</li>
<li>Idea: Quick bookmarking system to have easy reference to important temp locations. Monitor last x astros visited.</li>
<li>Idea: Add delete shortcut on board to save scrolling, also add hidden linestart marks so that quoting results in indentation.</li>
<li>Idea: Profit/loss calculation on attack results</li>
<li>Idea: An extended client side bookmarking system, with tags for types or bases and storing more than a few bookmarks.</li>
<li>Idea: Timer alerts, store timers and play a sound or give a overview in a corner so you can tell whats next to complete.</li>
<li>Idea: Add a disply showing how many of a ship can be built with current credits and secondary display with full hangers.</li>
<li>Idea: Work on integrating battlecalc scripting into ae extras to reduce need for external sites.</li>
<li>Idea: Battlecalc ui overlay/iframe built into ae extras.</li>
<li>Idea: Assistance for fight simulation, eg several preformed attack styles to weigh up effective attacks.</li>
<li>Idea: Defense guidelines and defense fleet protection, to avoid you moving fleet needed on a base and show you if your profitable to attack.</li>
<li>Idea: Customization of all ui elements so themes can be enforced properly based on user preference</li>
<li>Idea: Contacts/Help section links to guides, forums and other useful sources.</li>
<li>Idea: Profit/loss calculation on attack results</li>
<li>Idea: Add 'coming soon' feature and more integration of the userscripts.org site for feedback etc.</li>
<li>Idea: Multi coloured highlights for names, trade partner thats pacted. Possible mouseover tooltip?</li>
<li>Idea: Signatures for board posting, autoposting battlereports</li>
<li>Idea: Jumpgate autocollection, pull list of coords from guild.aspx then check each has jg on visit. Autoclear any with confirmation incase guild swapping.</li>
<li>Idea: Add time to return if recalled on fleet details view.</li>
<li>Idea: Somesort of guild chat system, iframe or frame, not sure how bad it would be.</li>
<li>Idea: Links for guild pages, possible autocollect.</li>
<li>Idea: Store funny 'quotes' to allow fun and games on board.</li>
<li>Idea: Builtin irc client extending ability to check for updates and transfering data, would avoid need for a server but allow guild data swapping.</li>
<li>Idea: Change title/make alert/make sound when announcements/pm's</li>
<li>Idea: Script announcements, some sort of rss? like feed to alert to changes</li>
<li>Idea: Recall time calculator to be able to land at precise times quickly.</li>
</ul>
<!--==/FutureText==-->
<!--==Notes==-->
Debris formula adjustment

Now:
Debris = Unit Cost x 2% Armour lvl

New:
Debris = Unit cost x (10% + 1.5% Armour lvl)

Examples:
Armour Level  Debris Now  Debris New
0 - 0% - 10%
10  20% - 25%
20  40% - 40%
30  60% - 55%

If a player attacks/occupies a player less that 65% of their level;
then they only get x% of the pillage/trade route plunder/occupation income.
x% = Defender level / Attacker level x 100%

bookmarks.aspx?action=add&astro=Xxx:xx:xx:xx

<!--==/Notes==-->
*/

var DEBUGNEWCODE = 0;

var scriptName='AE Extras - CP Fixed';
var scriptId='56689';
var scriptVersion=4.996;
var chatlink='http://webchat.freenode.net/?randomnick=1&channels=aeextras&prompt=1';
var dbase_url='http://guillaume.lebiller.free.fr/aeproject/';
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

try {
    var debugwith;
    if((console && console.log) || (unsafeWindow.console && unsafeWindow.console.log)) debugwith = "firefox";
    if(unsafeWindow.console && unsafeWindow.console.firebug) debugwith = "firebug";
    var console = {
        log: function () { // Basic logging function for loading etc
            if( LOG_LEVEL >= 1 && debugwith == "firebug" ) {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments[0] );
                }
                else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): %o",arguments );
                }
                else {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 1 && debugwith == "firefox" ) {
                unsafeWindow.console.log( "Location: "+location+" \nLog: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 1 && !debugwith ) { notify( "\nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        info: function () {// Show data relevent to any functions being worked on
            if( LOG_LEVEL >= 2 && debugwith == "firebug" ) {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments[0] );
                }
                else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): %o",arguments );
                }
                else {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 2 && debugwith == "firefox" ) {
                console.log( "Location: "+location+" \nInfo: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 2 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        warn: function () {// Show any non-fatal errors
            if( LOG_LEVEL >= 3 && debugwith == "firebug" ) {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): "+arguments[0] );
                }
                else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): %o",arguments );
                }
                else {
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

var _diff = new Date().getTime() - getServerTime();

if ($("top-header")) betalayout = 1, LOG_LEVEL = 4;

if(document.title.indexOf("Error")!= -1) return; // try to break out if connections down to avoid messing up error page

if (DEBUGNEWCODE) console.log("Log level: "+LOG_LEVEL+" Server: "+ getServer());

if (DEBUGNEWCODE) {	// Test save to check if functional
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
//==========================================
// Check if new install
//==========================================
function installCheck(){
    try{
       var OldVersion = 0;
       var NewVersion = 0;

       OldVersion=parseFloat(GM_getValue("scriptVersion",0+""));
       NewVersion=parseFloat(scriptVersion);

       if (OldVersion==null || OldVersion==""){
           GM_setValue("scriptVersion",NewVersion+"");
           if(GM_listValues() == null || GM_listValues() == "") resetConfig("newInstall");
           insertNotification("You have sucessfully installed "+scriptName+" Version: "+NewVersion+" to your web browser.<br />"
           +"Please note this script is constantly being updated, check the <a href='http://userscripts.org/scripts/show/"+scriptId+
           "'>userscripts.org/scripts/show/"+scriptId+"</a> site for information.");
           return;
       } else if (NewVersion>OldVersion){
           //console.log(NewVersion);
           GM_setValue("scriptVersion",NewVersion+"");
           insertNotification("You have sucessfully upgraded "+scriptName+" From ("+OldVersion+") To ("+NewVersion+").<br />"+
           "Check the <a href='http://userscripts.org/scripts/show/"+scriptId+"'>userscripts.org/scripts/show/"+scriptId+"</a> site for details on changes made.");
       }
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\ninstallCheck(): "+e); }
}

//==========================================
//---------Common Functions-----------
//==========================================

/**
 * Get player name.
 */
function getPlayerName(name){
    var regex = /(\[.*?\])\s(.*)/;
    result = regex.exec(name);
	
	return result ? result[1] : name;
}

/**
 * Get player guild.
 */
function getGuild(name){
    var regex = /\[.*?\]/;
    var guild = regex.exec(name);

	return guild ? guild[0] : name;
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
    if(location.indexOf('astroempires.com')!=-1) return "ae";
    return "battlecalc";
}

// new since 2.4 - thanks to BishopGumby
function parseNum(s) {
    try{
        s += '';
        return parseInt(s.replace(/,/g,''))
    } catch (e) { console.log ('parseNum('+s+') error '+e); return s }
}

function node(opt) {
    if (!opt) return;
//  console.log("node("+c+")");
    function attr(name) {
        var value = opt[name];
        delete opt[name];
        return value;
    }
    var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };
    var id = opt.id;
    var n = $(id);
    if(!n) {
        var tag = attr("tag") || "div";
        if ("string" == typeof tag) n = document.createElement(tag);
        else {
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

var EventManager = {
    _registry:null,Initialise:
    function() {
        if(this._registry==null) {
            this._registry=[];
            EventManager.Add(window,"unload",this.CleanUp)
        }
    }
    ,Add:
    function(a,b,c,d) {
//      console.log("EventManager.function("+a+","+b+","+c+","+d+")");
        this.Initialise();
        if(typeof a=="string") {
            if (!a) return false;
            a=$(a)
        }
        if(a==null||c==null) {
            return false
        }
        if(a.addEventListener) {
            a.addEventListener(b,c,d);
            this._registry.push({obj:a,type:b,fn:c,useCapture:d});
            return true
        }
        return false
    }
    ,CleanUp:
    function() {
        for(var i=0;i<EventManager._registry.length;i++) {
            with(EventManager._registry[i]) {
                obj.removeEventListener(type,fn,useCapture)
            }
        }
        EventManager._registry=null
    }
};

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
var _view = null;

/**
 * Get base view.
 */
function getView() {
	var exp = /view=([^&]+)/;
	var res = exp.exec(location);
	
	return res ? res[1] : "";
}

/*
    var view = location.split("view=",2);
    if(view.length<=1)
        return "";
    view = view[1].split("&")[0];
    view = view.substring(0,1).toUpperCase() + view.substring(1);
    //console.log(view);
    return view;
*/
function getPageType() {
	// console.log("getPageType()");
	if(location.indexOf('empire.aspx')!=-1) {
		if(location.indexOf('bases_capacities')!=-1) return 'bases_capacities';
		if(location.indexOf('scanners')!=-1) return 'scanners';
		return 'empire';
	}
	else if(location.indexOf('map.aspx')!=-1) {
		switch(window.location.search.length) {
			case 17:
				return location.indexOf('cmp=') > -1 ? 'mapRegion' : 'mapAstro';
			case 20:
            	return 'mapSystem'
		}
	}
	else if(location.indexOf('base.aspx')!=-1) {
    	if(location.indexOf('structures')==-1
        && location.indexOf('defenses')==-1 
        && location.indexOf('production')==-1 
        && location.indexOf('research')==-1 
        && location.indexOf('trade')==-1 
        && location.indexOf('base=')!=-1) {
        	return'baseOverview';
        }
        else if (location.indexOf('base=')==-1) return 'bases';
        else return 'other';
	}
	else if(location.indexOf('messages.aspx')!=-1)return'messages';
	else if(location.indexOf('guild.aspx')!=-1)return'guild';
	else if(location.indexOf('profile.aspx')!=-1 && location.indexOf('?player=')==-1)return'profile';
	else return 'other';
}
// Find how deep into map we are
function getCurrentLoc() {
    if (!pagetype) var pagetype = _page;
//  console.log("getCurrentLoc()");
    if(pagetype=='mapGalaxy'||pagetype=='mapRegion'||pagetype=='mapSystem'||pagetype=='mapAstro'||pagetype=='reportSearch')
    {
        var a=loc_re.exec(location);
        if(a)return a[1]
    }
    else if(pagetype=='baseOverview' && validastrolinks.length)
    {
        return validastrolinks[0][1]
    }
    return 'other';
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

    b.style.top = document.body.clientHeight/2 + document.body.scrollTop - bh/2;
    b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - bw/2;

    //console.log("window height: "+document.body.clientHeight);
    //console.log("window width: "+document.body.clientWidth);
    //console.log("window scroll x: "+document.body.scrollLeft);
    //console.log("window scroll y: "+document.body.scrollTop);

    b.style.display='block';
    var duration = 2000;
    var endOpacity = 0;
    if(c==MESSAGE_CLASS_ERROR)
    {
        b.className = "notifierError";
        b.id='errorMessage';
        var pos = notifycount * 40;
        b.style.top = (document.body.clientHeight/2 + document.body.scrollTop - bh/2) - (400 - pos);
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
        },d/50
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

/**
 * Get table width.
 */
function getTableWidth() {
    var tables = document.evaluate("//table[contains(@class,'top')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength == 0)
		return 900;
    return tables.snapshotItem(0).getAttribute("width");
}

function insertNotification(message){
    if (message != null) {
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
function sumShips(rows) {
    try{
    var hdrs = document.evaluate(
        "//table[contains(@class,'layout listing')]/thead/tr",
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null);
         
    var rows = document.evaluate(
        "//table[contains(@class,'layout listing')]/tbody/tr",
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null);

     if(rows.snapshotLength <= 1)
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
         hdrs.snapshotItem(0).lastChild.innerHTML = "<div><a>Attack Size / Size</a></div>";
//         hdrs.snapshotItem(0).lastChild.innerHTML = "<div><a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a></div>";
    var cells;
    var mobileFleetCount = 0,currentFleetTotal,overallFleetTotal = 0,overallFightingFleetTotal = 0, overallMobileFleetTotal = 0,overallMobileFightingFleetTotal = 0;;
    var fleetUrl;
    for (var i = 0; i < rows.snapshotLength; i++) {
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
            rows.snapshotItem(i).lastChild.innerHTML = "<small>" + currentFightingFleetTotal + " / " + rows.snapshotItem(i).lastChild.textContent + "</small>";
//            rows.snapshotItem(i).lastChild.textContent =currentFightingFleetTotal  +" / "+ rows.snapshotItem(i).lastChild.textContent;
        fleetUrl = rows.snapshotItem(i).firstChild.firstChild.firstChild.href;
        //console.log("fleeturl "+fleetUrl);
        if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
        {
            if(!rows.snapshotItem(i).firstChild.nextSibling.firstChild.textContent.match(/\*$/))
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
        hdrs.snapshotItem(0).firstChild.setAttribute("colspan","2");
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

    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n sumships error: "+e);  }
}

var galaxyInfoArrays = new Array();
function getGalaxyInfoArray(galaxy) {
	if(galaxyInfoArrays[galaxy]==undefined) {
		var newArray = new Array(20);
		for(var i = 0; i < 20;i++) {
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
function insertTotalsRow(nodeloc,sums,mobileSums,fleetCount,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal) {
    //GALAXY ROWS
	for(var i = 0;i<galaxyInfoArrays.length;i++) {
		var galaxyInfoArray = galaxyInfoArrays[i];

		if(galaxyInfoArray==undefined || galaxyInfoArray[1] == 0)
			continue;
		var sumRow = document.createElement("tr");
		sumRow.setAttribute('align','center');
		var element = sumRow.insertCell(0);
		if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
		element.innerHTML = "<small>Mobile Fleets ("+getGalaxy()+i+")</small>";
		element = sumRow.insertCell(1);
		element.innerHTML = "<small>" + galaxyInfoArray[1] + "</small>";
		var galaxyFleetSums = galaxyInfoArray[2];
		for(var k = 0; k < 20; k++) {
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
		cell.innerHTML = "<small>" + galaxyInfoArray[3] + " / " + galaxyInfoArray[4] + "</small>";
		//console.log(element);
		sumRow.insertBefore(cell,null);
		nodeloc.insertBefore(sumRow,null);
	}
	//MOBILE ROW
	var sumRow = document.createElement("tr");
	sumRow.setAttribute('align','center');
	var element = sumRow.insertCell(0);
	if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
	element.innerHTML = "<small>Total Mobile Fleets</small>";
	element = sumRow.insertCell(1);
	element.innerHTML = "<small>" + mobileFleetCount + "</small>";
	for(var k = 0; k < 20; k++) {
		//console.log(sums[k]);
		var cell = document.createElement("td");
		cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
		if(mobileSums[k] > 0)
			cell.innerHTML = "<small>" + mobileSums[k] + "</small>";
		//console.log(element);
		sumRow.insertBefore(cell,null);
	}
	//Add totals cell
	var cell = document.createElement("td");
	//cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	cell.innerHTML = "<small>" + overallMobileFightingFleetTotal + " / " + overallMobileFleetTotal + "</small>";
	//console.log(element);
	sumRow.insertBefore(cell,null);
	nodeloc.insertBefore(sumRow,null);
	//TOTAL ROW
	sumRow = document.createElement("tr");
	sumRow.setAttribute('align','center');
	element = sumRow.insertCell(0);
	if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true)) element.setAttribute("colspan","2");
	element.innerHTML = "<small>Total Fleets</small>";
	element = sumRow.insertCell(1);
	element.innerHTML = "<small>" + fleetCount + "</small>";
	for(var k = 0; k < 20; k++) {
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
	cell.innerHTML = "<small>" + overallFightingFleetTotal + " / " + overallFleetTotal + "</small>";
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
function highlightTrade(nameToFind) {
    var item;
    //console.log('Searching ' + tradeNodes.length + ' routes');
    for (var i = 0; i < tradeNodes.length; i++) {
        item = tradeNodes[i];
        //console.log(item.innerHTML + " " + nameToFind);
        if(item.innerHTML == nameToFind) {
            item.style.color = 'red';
            item.innerHTML = item.innerHTML + '*';
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
    if (!tradeNames) var tradeNames = new Array();
    //Find all trade name elements
    allNames = document.evaluate("//small[@class='gray']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //Iterate through all and add only odd ones to name and node arrays.
    //console.log ("Allnames: "+allNames);
    for (var i = 0; i < allNames.snapshotLength; i++) {
        if(i%2==1) {
            thisName = allNames.snapshotItem(i);
            tradeNames.push(thisName.innerHTML);
            tradeNodes.push(thisName);
            //console.log("Individual name: "+thisName.innerHTML);
        }
    }
    //console.log("tn length: "+tradeNames.length);
    if (!tradeNames) return;
    tradeNames.sort();
    saveTradePartners(tradeNodes,tradeNames);
    //console.log('Found ' + tradeNodes.length + ' trades.');
    //Iterate through sorted names and compare each to the one before it.
    //If a duplicate is found pass the name to the highlight method to find
    // all element objects and apply highlight.
    for (var i = 1; i < tradeNames.length; i++) {
        thisName = tradeNames[i];
        lastName = tradeNames[i-1];
        //console.log(thisName + " " + lastName);
        if(thisName == lastName)
            highlightTrade(thisName);
    }
}
//==========================================
//Persist Trade Partners
//==========================================
function saveTradePartners(tradeNodes,tradeNames){
        var saveData = tradeNames[0];
        for (var i = 1; i < tradeNames.length; i++)
            saveData +=";"+tradeNames[i];
        if (saveData == null) saveData = ";cpnotrades";
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
    if (saveData == ";cpnotrades") return false;
    var tradePartners = null;
    if(saveData != null) {
        saveData = unescape(saveData);
        //console.log("Check saved Data: "+saveData);
        tradePartners = saveData.split(";");
    }
//  console.log('Loaded ' + tradePartners.length + ' trade partners');
    if(tradeNames.length == 0) return false;
    tradeNames = tradePartners;
    return tradePartners;
}
//==========================================
//Check Trade Partners Data Age
//==========================================
function checkTradeDataAge(){
    if(getSetting('tradePartners') == null) {
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
	
    if(myGuild != null && myGuildColor != null) {
        myGuild = unescape(myGuild);
        myGuildColor = unescape(myGuildColor);
    }
    //console.log("myguild: "+myGuild+" colour:"+ myGuildColor);
    if(myGuild != null && myGuildColor != null) {
        if(myGuild == guild)
			return myGuildColor;
    }
    var guilds = getSetting(ALLIED_GUILDS_KEY,null);
    var guildColor = getSetting(ALLIED_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null) {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++) {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
				return guildColor;
        }
    }
    var guilds = getSetting(NAPPED_GUILDS_KEY,null);
    var guildColor = getSetting(NAPPED_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null) {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++) {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    guilds = getSetting(ENEMY_GUILDS_KEY,null);
    guildColor = getSetting(ENEMY_GUILDS_COLOUR_KEY,null);
    if(guilds != null && guildColor != null) {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++) {
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
    if(typeof tradeNames == 'undefined') var tradeNames = new Array();
    if(tradeNames && tradeNames.length == 0)
    {
        tradeNames = getTradePartners();
    }
    if(tradeNames.length == 0 || !tradeNames) return false;
    console.log('Searching through ' + tradeNames.length + ' trade partners');
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
        return;
    }
 // Unix time in seconds
//    console.log('lastTradeCheck: '+lastGuildCheck);
//    console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime > (lastTradeCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastGuildCheck + (86400*3*7))) {
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
function setGuildHighlight() {
    if(_page=='profile') {
        // Get cell from table
        var c=document.evaluate(
        "//b[starts-with(.,'Player:')]/../../../tr[1]/th[2]",
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
        var d=c.indexOf(' ',0); // check for space to show guild tag split
        if(d==-1) guild='';
        else guild=c.substring(0,d);
        name=c.substring(d+1,c.length); // split string into guild/tag
        notify("Setting players guild: "+guild);
        setSetting(MY_GUILD_KEY,escape(guild)); // set tag
        var d = new Date();
        var currentTime = Math.round(d.getTime() / 1000); // set date for notifications
        setSetting('lastGuildCheck', currentTime);
        //console.log ("lastguildcheck: "+getSetting('lastGuildCheck'));
    }
}
//==========================================
//Inserts Empire sub menu on all pages
//==========================================
function cleanEmpireMenus() {
	// Clear out additional menus cause i'm tired of having multiple ones loading if you run seperate scripts
	/*
    var cleanmenus = document.evaluate("//table[contains(@class,'header')]", document, null, XPathResult.UNORDERED_NODE_TYPE, null);
    if(cleanmenus.snapshotLength>1) {
        for (var i=0; i<cleanmenus.snapshotLength; i++) {
            cleanmenus.parentNode.removeChild(cleanmenus.previousSibling);
        }
    }
	*/
}

/**
 * Insert Empire Submenu.
 */
function insertEmpireMenu() {
	var submenu = '<tbody><tr><th width="10%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="10%" id="bases_production"><a href="empire.aspx?view=bases_production">Production</a></th><th width="10%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="10%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="10%" id="scanners"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr><tr><th width="10%" id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="10%" id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th width="10%" id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="10%"><a href="empire.aspx?view=units">Units</a></th><th width="*" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th></tr></tbody>';

	try {
		var main = document.evaluate("//table[@class='top']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var menu = document.createElement("table");
		var line = document.createElement("br");
		
		menu.setAttribute("id", "empire_menu");
		menu.setAttribute("class", "header");
		menu.setAttribute("align", "center");
		menu.setAttribute("height", "25");
		menu.setAttribute("width", main.getAttribute("width"));
		menu.innerHTML = submenu;
		main.parentNode.insertBefore(menu, main.nextSibling);
		main.parentNode.insertBefore(line, menu);
	}
	catch(e) {
		console.log("error inserting empire submenu: " + e);
	}
}

function moveEmpireMenu() {
    try {
        var empiremenu = document.evaluate( "//table[contains(@class,'header')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var header = document.evaluate("//table[contains(@class,'top')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
	catch (e) {}

    empiremenu.parentNode.removeChild(empiremenu.previousSibling);
    header.parentNode.insertBefore(empiremenu,header.nextSibling);
    empiremenu.parentNode.insertBefore(document.createElement("br"), empiremenu);
}

//==========================================
//Highlight Poor Trade Values
//==========================================
function findPoorTrades(){
    // Filter tr tags out
    var rows = document.evaluate(
    "//table[last()-1]/tbody/tr[2]/td/table/tbody/tr[@align='center']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//  console.log('Found '+ rows.snapshotLength + 'rows.');
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
    if(location.indexOf("empire.aspx")!=-1 && (getView()=="" || getView()=="structures"))
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
    for(var i=0; i<allLinks.snapshotLength; i++) {
        //console.log(allLinks.snapshotItem(i).href);
        item = allLinks.snapshotItem(i);
        //console.log(item);
        if( getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) && isTradePartner(item.innerHTML)) {
            item.style.color = unescape(getSetting(HIGHLIGHT_TRADE_COLOUR_KEY));
            //console.log(item.innerHTML+" (trade)");
        }
        if(highlightPlayers) {
            var guild = getGuild(item.innerHTML);
            // Highlight by guild
            var color = getHighlightColorForGuild(guild);
            //console.log(guild+": "+color);
            if(color != null)
                item.style.color = color;
            // Apply overrides
            var color = getHighlightColorForPlayer(getPlayerName(item.innerHTML));
            if(color != null)
                item.style.color = color;
        }
    }
}
//==========================================
//Update Checking Code
//==========================================
function checkForUpdates(forceCheck){
    //console.log('New version check.');
    var lastCheck = parseNum(getSetting('lastCheck', 0));
    var lastVersion = getSetting('lastVersion', 0);
    var needUserAction = getSetting('needUserAction',false);
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
//  console.log('lastCheck: '+lastCheck);
//  console.log('currentTime: '+currentTime);
//  console.log('Check Online: '+ (currentTime < (lastCheck + 86400) || needUserAction));
//  console.log('Next Check (minutes): '+ ( (lastCheck + 86400) - currentTime)/60 );
//  console.log('needUserAction: '+needUserAction);
//  setSetting('lastCheck', currentTime - 86500);
//  return;
    if (forceCheck || currentTime > (lastCheck + (2 * 3600)) || needUserAction) {
        //6 hours after last check
        setSetting('lastCheck', currentTime);   //Set time of check
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',
            },
            onload: function(responseDetails) {
                var text = responseDetails.responseText;
                var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
                var onSiteUpdateText = text.substring(text.indexOf("<!--==UpdateText==-->")+14,text.indexOf("<!--==/UpdateText==-->"));
                onSiteVersion = parseFloat(onSiteVersion.replace(/'/g,''));
              //console.log('OnSite Version: '+onSiteVersion);
              //console.log('Script Version: '+parseFloat(scriptVersion));
              //console.log("Need update: "+parseFloat(onSiteVersion) < parseFloat(scriptVersion));
              //console.log('Last Version: '+lastVersion);
              //console.log('text: '+text);
              //console.log('onSiteUpdateText: '+onSiteUpdateText);
                if (!parseFloat(lastVersion)) lastVersion = 0;
                if(parseFloat(onSiteVersion) > scriptVersion && parseFloat(onSiteVersion) > parseFloat(lastVersion)) {
                  //console.log("Found newer version");
                    setSetting('needUserAction', true);
                    var message = '  There is an update available for &quot;'+scriptName+'&quot; <br />'
                    +'  You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br />'
                    +'  <br />'
                    + onSiteUpdateText +'<br />'
                    +'  <div class="gm_update_alert_buttons">'
                    +'      <span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
                    +'      <span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
                    +'      <span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
                    +'      <span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
                    +'   until the next new version</a></span> </div>'
                    +'</div>';
                    insertNotification(message);
                    $('gm_update_alert_button_upgrade').addEventListener('click', function(event) {
                        setSetting('needUserAction',false);
                        document.body.removeChild($('gm_update_alert'));
                    }
                    , true);
                    $('gm_update_alert_button_wait').addEventListener('click', function(event) {
                        setSetting('needUserAction',false);
                        setSetting('lastCheck', currentTime);
                        alert("You will not be reminded again until tomorrow.");
                        document.body.removeChild($('gm_update_alert'));
                    }
                    , true);
                    $('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {
                        setSetting('needUserAction',false);
                        setSetting('lastVersion', onSiteVersion);
                        alert("You will not be reminded again until the next new version is released.");
                        document.body.removeChild($('gm_update_alert'));
                    }
                    , true);
                }
                else{
//                  console.log('Running latest version');
                    if(forceCheck)
                        notify("Running latest version ("+scriptVersion+").");
                }
            }
        }
        );
    }
}

//==========================================
//Insert Production Presets
//==========================================
function insertProductionPresetsButtons()
{
   try{
    try{
        var Button = document.evaluate("//input[@type='reset']",
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    } catch(e) { return; }
    if (!Button) return;
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

    var table = document.evaluate( "//table[@id='base_production']/tbody/tr/th[contains(@class,'th_header2')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //console.log (table);
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
   } catch (e) { console.log("insertProductionPresetsButtons: "+e) }
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
    try{
        var fastProduction = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.checked;
    } catch(e) { return; }
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
    try{
        document.evaluate("//input[@type='checkbox']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('change',onProductionTextBoxKeyUp,false);
        //document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxKeyUp,true);
        document.evaluate("//form[@method='post']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('reset',onProductionTextBoxKeyUp,false);
    } catch(e) { return; }
}
//==========================================
//Production Quantities by Time
//==========================================

function insertTimeTextBoxes() {
   try {
       try {
           var inputs = document.forms[1].elements;
       } catch(e) { console.log("No input boxes found."); }
       if (!inputs) return;
       for(var i = 0; i < inputs.length; i++) {
           if(inputs[i].value == 0 && inputs[i].className == 'input-numeric quant') {
               var row = inputs[i].parentNode.parentNode;
               //console.log(row);
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
       "//td[contains(@class,'help comment')]",
       document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
       //console.log(helpCells.snapshotLength);
       for(var i=0;i<helpCells.snapshotLength;i++)
       {
           helpCells.snapshotItem(i).setAttribute("colspan",7);
           if (getSetting(HIDE_HELP_TEXT_KEY,true) == true) helpCells.snapshotItem(i).parentNode.parentNode.removeChild(helpCells.snapshotItem(i).parentNode);
       }
       //adjust colspan for all red rows
       var redCells = document.evaluate(
       "//td[contains(@class,'red')]",
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
   } catch(e) { console.log("inserttimeboxes: "+e); }
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

function getSeconds(timeString) {
    var regex = /(\d*h)?\W?(\d*m)?\W?(\d*s)?/;
    var result = regex.exec(timeString);
    
    if(!result)
    	return -1;
	//console.log(result);
	var h=0; var m=0; var s=0;
	
	if(result[1] != null)
		h = result[1].substring(0,result[1].indexOf("h"));
	if(result[2] != null)
		m = result[2].substring(0,result[2].indexOf("m"));
	if(result[3] != null)
		s = result[3].substring(0,result[3].indexOf("s"));
	
	return h*3600 + m*60 + s*1;
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
function fixQueues() {
	try {
		var fixed, space;
		var queues = document.evaluate(
			"//table[@id='base-queue' or @id='base_events-production']",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue;

		if(queues == null)
			return;

		queues.setAttribute("width", getTableWidth());

		fixed = document.createElement("div");
		fixed.setAttribute("id", "queueFooter");
		fixed.appendChild(queues);
		document.body.appendChild(fixed);
		space = document.createElement("div");
		space.style.position = "absolute";
		space.style.height = fixed.offsetHeight;
		space.innerHTML = "&nbsp;";
		document.body.appendChild(space);
    }
	catch(e) {
		console.log("fixqueues: " + e);
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
        var logo = document.evaluate(
        "//table[contains(@class,'top')]/tbody/tr[1]",
        document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if (!logo) return;
//      Insert new cell to stick it all in
        var cell = logo.insertCell(1);
        cell.parentNode.firstChild.setAttribute("colspan","4");
//      Make new tag to hold
        var span = document.createElement("small");
        span.id = "cpmenu";
        span.textContent = "Extras CP Edition V"+scriptVersion;
        var br = document.createElement("br");
        span.appendChild(br);
    //  console.log('Found '+ logo.parentNode.firstChild + ' tables.');
//      Add links to next line
        var link = document.createElement("a");
        link.textContent = "Support Chat";
        link.href = chatlink;
        link.setAttribute("target","_new");
        span.appendChild(link,null);
        span.appendChild(document.createTextNode(" / "));
        var link = document.createElement("a");
        link.textContent = "Forums";
        link.href = "http://userscripts.org/scripts/discuss/"+scriptId;
        link.setAttribute("target","_new");
        span.appendChild(link,null);
        var br = document.createElement("br");
        span.appendChild(br);
        var configLink = document.createElement("a");
        configLink.setAttribute("href","javascript:void(0)");
        configLink.innerHTML = "Extras Config";
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
    if(bookmarkLink.innerHTML.indexOf('tr') == true) console.log (bookmarkLink.innerHTML);
    var th = document.createElement("th");
    th.setAttribute("width","11%");
    th.setAttribute("id","battlecalc");
    th.innerHTML = "<a href='http://guillaume.lebiller.free.fr/aeproject/calculator.php?server="+getServer()+"' target='_new'>Battle Calc</a>";
    bookmarkLink.parentNode.insertBefore(th,bookmarkLink);
    try{
       $("base").setAttribute("width","11%");
       $("map").setAttribute("width","11%");
       $("fleet").setAttribute("width","11%");
       $("empire").setAttribute("width","11%");
       $("commander").setAttribute("width","12%");
       $("guild").setAttribute("width","11%");
       $("notes").setAttribute("width","11%");
       $("bookmarks").setAttribute("width","11%");
    } catch (e) {}
//    var otherRows = document.evaluate("/html/body/table/tbody/tr/td",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
//    otherRows.setAttribute("colspan",5);
}

//==========================================
//Battle Calculator Functions
//==========================================
function insertAttackBattleCalcLink(){
//  console.log("inserting battle calc link on attack page");
    var button = '  <div class="gm_update_alert_buttons">'
    +'      <span id="openCalc"><a href="http://guillaume.lebiller.free.fr/aeproject/calculator.php?server='+getServer()+'" target="_new">Open in battle calculator</a></span>&nbsp;&nbsp;'
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
    +'      <span id="openCalc"><a href="http://guillaume.lebiller.free.fr/aeproject/calculator.php?server='+getServer()+'" target="_new">Open in battle calculator</a></span>&nbsp;&nbsp;'
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
//Auto login for battlecalc
//==========================================
function calcLogin()
{
    try
    {/*
removed test code till more time to work on it
        */
    } catch(e) {console.log("Line Number: "+e.lineNumber+"\n Login exception: "+e)}
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//==========================================
// Get refresh form
//==========================================
function getRefreshForm(key) {
	var form = document.createElement("form");
	var list = document.createElement("select");
	var item;
	var vals = getSetting(REFRESH_INTERVALS_KEY, "0,15,30,60").split(",");

	form.appendChild(document.createTextNode("Refresh Interval: "));
	form.appendChild(list);
	list.setAttribute("size", "1");
	list.setAttribute("style", "width: 40pt");
	for(var i=0; i<vals.length; i++) {
//		console.log("adding option: " + vals[i]);
		item = document.createElement("option");
		item.setAttribute("value", vals[i]);
		if(getSetting(key, "0") == vals[i])
			item.setAttribute("selected", "yes");
		item.appendChild(document.createTextNode(vals[i] > 0 ? vals[i] : "Off"));
		list.appendChild(item);
	}
	var time = getSelectedValue(list);
	if(time > 0)
		window.setTimeout("window.location.reload()", time * 1000);

	list.addEventListener("change", function(event) { setSetting(key, getSelectedValue(list)); window.location.reload() }, false);

	return form;
}

//==========================================
// Add refresh location
//==========================================
function refreshLocation() {
	var tree = document.evaluate(	"/html/body/center/b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	tree.appendChild(getRefreshForm(MAP_REFRESH_KEY));
}


//==========================================
// Add refresh scanner
//==========================================
function refreshScanner() {
	var tab = document.evaluate(	"//table[@id='empire_scanners']/tbody",
						document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var row = document.createElement("tr");
	var cel = document.createElement("td");

      tab.insertBefore(row, tab.firstChild);
	row.appendChild(cel);
	cel.setAttribute("style", "text-align: center");
	cel.appendChild(getRefreshForm(SCANNER_REFRESH_KEY));
}

function getSelectedValue(list) {
	return list.options[list.selectedIndex].value;
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
function sumFleets() {
    try {
        var rows = document.evaluate(
           "//table[@class='layout listing sorttable']/tbody",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
        if(!rows)
            return;
        rows = rows.childNodes;
        var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
        var addFleets = getSetting(SUM_FLEETS_KEY,true);
        var now = new Date(), future = new Date();
        var fleetData = new Array();
        for(var i=0;i<rows.length;i++) {
            var row = rows[i];
            var size = parseNum(row.childNodes[3].firstChild.textContent);
            if(formatNumbers)
                row.childNodes[3].firstChild.textContent = commaFormat(size);
            if(addFleets) {
                var player = row.childNodes[1].firstChild.textContent;
                var arrivalTimeCell = row.childNodes[2];
                var guild = getGuild(player);
                var incoming = (arrivalTimeCell.childNodes.length > 0);
                var incomingToday = false;
                //console.log(arrivalTimeCell);
                //console.log(arrivalTimeCell.id.indexOf('time') +": "+ parseNum(arrivalTimeCell.title)+"-<"+((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) &&
                //(parseNum(arrivalTimeCell.title) <= 0)));
                row.setAttribute("guild",guild);
                if((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseNum(arrivalTimeCell.title) >= 0) ) {
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
                addFleetSize(guild,size,incomingSize,incomingTodaySize,fleetData);
            }
       }
       if(addFleets) {
            if(guildSummed)
                insertFleetSummary(fleetData);
       }
    }
    catch(e) {
        console.log("sumfleets error: "+e);
    }
}
 //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function addFleetSize(guild,size,incomingSize,incomingTodaySize,fleetData)
{
    try{
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
                 return fleetData;
            }
        }
        //console.log("adding guild "+guild+" at index "+fleetData.length);
        if(incomingSize==0)
        fleetData[fleetData.length] = new Array(guild,size,0,0);
        else
        fleetData[fleetData.length] = new Array(guild,0,incomingSize,incomingTodaySize);
        return fleetData;
    } catch (e) {console.log("addFleetSize error: "+e);}
}
function insertFleetSummary(fleetData) {
    try {
        var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th>"
        +"<th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
        var style="";
        var incoming,arrived,incomingToday,total;
        var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
        for(var i=0;i<fleetData.length;i++) {
            incoming = fleetData[i][2];
            arrived = fleetData[i][1];
            total = fleetData[i][1] + fleetData[i][2];
            incomingToday = fleetData[i][3];
            var color = getHighlightColorForPlayer(getPlayerName(fleetData[i][0]));
            if(color==null)
            color = getHighlightColorForGuild(fleetData[i][0]);
            if(getSetting(HIGHLIGHT_PLAYERS_KEY,true)) style = "style='color:"+color+"'";
            if(formatNumbers) {
                 incoming = commaFormat(incoming);
                 arrived = commaFormat(arrived);
                 incomingToday = commaFormat(incomingToday);
                 total = commaFormat(total);
            }
            //console.log("arrived: " + arrived +" total: " + total
            //+" incomingSize: " + incoming + " incomingToday: " + incomingToday);
            html = html+"<tr align='center' "+style+"><td>"+fleetData[i][0]
            +"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived
            +"</td><td>"+total+
            "</td><td><a id='showHide"+fleetData[i][0]
            +"' href='javascript: void(0)'>Hide</a></td></tr>";
            //href='#showHide"+fleetData[i][0]+"'
        }
        var newTable = document.createElement("table");
        newTable.setAttribute("width","600");
        newTable.setAttribute("align","center");
        newTable.innerHTML = html;
        var table = document.evaluate("//table[@id='map_fleets']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //console.log("table: "+table.innerHTML);
        //table.setAttribute("name","fleetTable");
        document.body.insertBefore(newTable, table);
        document.body.insertBefore(document.createElement("br"), table);
        //console.log("registering events");
        for(var i=0;i<fleetData.length;i++) {
            var link = $("showHide"+fleetData[i][0]);
            link.addEventListener('click', getShowHideFleetClosure(fleetData[i][0]), true);
            //console.log(link);
            //console.log(getShowHideFleetClosure(fleetData[i][0]));
        }
    }
    catch (e) {
        console.log("insertFleetSummary error: " + e);
    }
}

function getShowHideFleetClosure(guild) {
    function func() {
        toggleFleetVisibility(guild);
    };
    return func;
}

function toggleFleetVisibility(guild) {
    //console.log("Toggle visibility for :" +guild);
     var guildRows = document.evaluate(
    "//tr[@guild='"+guild+"']",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);
    //console.log("Found " + guildRows.snapshotLength + " fleet(s)");
     for (var i = 0; i < guildRows.snapshotLength; i++) {
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
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    centerElement.parentNode.removeChild(centerElement.previousSibling);
    centerElement.parentNode.appendChild(centerElement);
    centerElement.parentNode.insertBefore(document.createElement("br"),centerElement);
    var linksElement = $("linksClones");
    if(linksElement) centerElement.setAttribute("style","position: relative; bottom: "+linksElement.offsetHeight);
}
function copyBaseLinks()
{
    var canvasElement = document.evaluate(
    "//div[@id='myCanvas']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!canvasElement) return;
    var baseLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'base')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("Found "+baseLinks.snapshotLength+" base(s).");
    if(baseLinks.snapshotLength ==0) return;
    var divElement = document.createElement("div");
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
    var canvasElement = document.evaluate(
    "//div[@id='myCanvas']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!canvasElement) return;
    var fleetLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'fleet')][not(contains(@href,'edit'))]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("Found "+fleetLinks.snapshotLength+" fleet(s).");
    if(fleetLinks.snapshotLength ==0) return;
    var divElement = document.createElement("div");
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
var DEFAULT_BASE_PRESET_TITLE_5 = "Defence";
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
    fillerTd.setAttribute("style", "vertical-align: bottom;");
    // Fix location for link if refreashed after clicking a setting
    var href = location.split("#")[0];
    fillerTd.innerHTML = "<a href='javascript:void(0)' id='editLink'>Edit Goals</a>";
    fillerTd.firstChild.addEventListener('click', function(event) {
                        setSetting("structedittemp",true);
                        window.location = href;
                    }, true);
    //fillerTd.setAttribute("width","*");
    //fillerTd.setAttribute("colspan","3");
    var styleColour1 = unescape(getSetting(STRUCT_COLOUR1_KEY,"aqua"));
    var styleColour2 = unescape(getSetting(STRUCT_COLOUR2_KEY,"orange"));

    var topRow = baseLinks.snapshotItem(0).parentNode.parentNode.previousSibling;
    var fillerTd2 = document.createElement("td");
    fillerTd2.setAttribute("width","*");
    //   fillerTd2.innerHTML = "--";

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
    topRow.insertBefore(fillerTd2,topRow.firstChild);
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
        if(baseTypes[i].split("=")[0]==baseId)
        {
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
            if(count < targetValue) small.style.color = styleColour1;
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
    try{
        var table = document.evaluate(
        "//table[last()]//table",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    } catch (e) { console.log("table: "+e+" "+table); return; }
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
    button.addEventListener('click',function(event){
        console.log("test");
        saveNewBaseTypeValues();
        window.location = location;
    }
    ,true);
    button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Cancel");
    button.setAttribute("id","Cancel");
    button.setAttribute("style","margin-left: 5px;");
    center.appendChild(button);
    button.addEventListener('click',function(event){
        setSetting("structedittemp",true);
        window.location = location;
    }
    ,true);
    button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Reset");
    button.setAttribute("id","Reset");
    button.setAttribute("style","margin-left: 5px;");
    center.appendChild(button);
    button.addEventListener('click',function(event){
        setSetting("structedittemp",true);
        structReset();
        window.location = location;
    }
    ,true);
    setSetting("structedittemp",false);
}

function structReset()
{
   setSetting(BASE_PRESET_1_NAME_KEY,DEFAULT_BASE_PRESET_NAME_1);
   setSetting(BASE_PRESET_2_NAME_KEY,DEFAULT_BASE_PRESET_NAME_2);
   setSetting(BASE_PRESET_3_NAME_KEY,DEFAULT_BASE_PRESET_NAME_3);
   setSetting(BASE_PRESET_4_NAME_KEY,DEFAULT_BASE_PRESET_NAME_4);
   setSetting(BASE_PRESET_5_NAME_KEY,DEFAULT_BASE_PRESET_NAME_5);
   setSetting(BASE_PRESET_6_NAME_KEY,DEFAULT_BASE_PRESET_NAME_6);
   setSetting(BASE_PRESET_7_NAME_KEY,DEFAULT_BASE_PRESET_NAME_7);
   setSetting(BASE_PRESET_8_NAME_KEY,DEFAULT_BASE_PRESET_NAME_8);

   setSetting(BASE_PRESET_1_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_1);
   setSetting(BASE_PRESET_2_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_2);
   setSetting(BASE_PRESET_3_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_3);
   setSetting(BASE_PRESET_4_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_4);
   setSetting(BASE_PRESET_5_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_5);
   setSetting(BASE_PRESET_6_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_6);
   setSetting(BASE_PRESET_7_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_7);
   setSetting(BASE_PRESET_8_TITLE_KEY,DEFAULT_BASE_PRESET_TITLE_8);
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
    //console.log(rows.snapshotLength);
     setSetting(BASE_PRESET_1_NAME_KEY,rows.snapshotItem(0).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_2_NAME_KEY,rows.snapshotItem(1).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_3_NAME_KEY,rows.snapshotItem(2).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_4_NAME_KEY,rows.snapshotItem(3).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_5_NAME_KEY,rows.snapshotItem(4).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_6_NAME_KEY,rows.snapshotItem(5).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_7_NAME_KEY,rows.snapshotItem(6).childNodes[0].firstChild.value);
     setSetting(BASE_PRESET_8_NAME_KEY,rows.snapshotItem(7).childNodes[0].firstChild.value);

     setSetting(BASE_PRESET_1_TITLE_KEY,rows.snapshotItem(0).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_2_TITLE_KEY,rows.snapshotItem(1).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_3_TITLE_KEY,rows.snapshotItem(2).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_4_TITLE_KEY,rows.snapshotItem(3).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_5_TITLE_KEY,rows.snapshotItem(4).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_6_TITLE_KEY,rows.snapshotItem(5).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_7_TITLE_KEY,rows.snapshotItem(6).childNodes[0].lastChild.value);
     setSetting(BASE_PRESET_8_TITLE_KEY,rows.snapshotItem(7).childNodes[0].lastChild.value);
    console.log(""+rows.snapshotItem(0).childNodes[1].firstChild.value);
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
//    console.log ("saveBaseCoords");
    baseCoordArray=document.body.innerHTML.match(/[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}/g);
    baseCoords = "";
    for(i=0; i<baseCoordArray.length; i=i+2){
        baseCoords += baseCoordArray[i]+",";
//        console.log ("Added to baseCoords: " + baseCoordArray[i]);
    }
    setSetting("baseCoords", baseCoords)
}
function saveBases()
{
//    console.log("Saving bases");
    var links = document.evaluate(
    "//a[contains(@href,'base.aspx?base=')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//    console.log("baselinks "+links.snapshotLength);
    bases = new Array();
    for(var i=0;i<links.snapshotLength;i++)
    {
        var link = links.snapshotItem(i);
//        console.log("baselink "+link);
        bases[i] = link.textContent+ "=" +link.href.split("=")[1];
    }
//    console.log("bases "+bases);
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
function debrisReformating()
{
    try {
        var debrisElement = document.evaluate(
        "//span[contains(@title,'Debris')]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //console.log("derbs "+debrisElement.parentNode.title);
        if(debrisElement !=null)
        {
            var debrisMessage = debrisElement.title;
            //console.log(""+debrisMessage);
            //console.log(debrisElement.textContent + " -< " + debrisElement.textContent.replace(debrisElement.textContent,debrisMessage));
            debrisElement.textContent = debrisElement.textContent.replace(debrisElement.textContent,debrisMessage);
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
        "//th[@colspan='3' and contains(@class,'th_header2')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(rows);
    //console.log(table);
    if(!table)
        return;
    table = table.parentNode.parentNode;
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
            else if(result[1].indexOf('New Trade Route') !== -1) tradeRoutes += parseNum(result[2]);
            else if(result[1].indexOf('Plunder of Trade Route') !== -1) plunderedRoutes += parseNum(result[2]);
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

function insertArriveTimeTextBox() {
    var moveButton = document.evaluate("//input[@value='Move']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!moveButton)
        return;
    var th = moveButton.parentNode;
    var eta = document.createElement("span");
    var textBox = document.createElement("input");
    eta.setAttribute("style", "font-weight:bold");
    textBox.setAttribute("class", "input-numeric quant");
    textBox.setAttribute("type", "text");
    textBox.setAttribute("style", "	width:150px;margin-top:5px;margin-bottom:5px;");
    textBox.setAttribute("id", "arrivalTime");
    textBox.value = getDateString(new Date(getCurrentServerTime()));
    eta.appendChild(document.createElement("br"));
    eta.appendChild(document.createTextNode("ETA: "));
    eta.appendChild(textBox);
    th.appendChild(eta);
    var calculateButton = document.createElement("input");
    calculateButton.setAttribute("value", "Calculate Depart Time");
    calculateButton.setAttribute("type", "button");
    calculateButton.setAttribute("id", "calculateButton");
    calculateButton.setAttribute("style", "margin-left:5px;margin-top:5px;margin-bottom:5px;");
    eta.appendChild(calculateButton);
    $("calculateButton").addEventListener("click",function(event){getLaunchTime();},true);
    $("duration").addEventListener("click",function(event){getLaunchTime();},true);
    var etd = document.createElement("span");
    etd.setAttribute("id", "departDateSpan");
    th.appendChild(etd);
//    $("calculateButton").parentNode.appendChild(departDateSpan);
}

function getLaunchTime() {
    try {
        var departDate = calculateLaunchTime();
        var departDateSpan = $("departDateSpan");

        departDateSpan.innerHTML = "<br/>Depart Time: " + getDateString(departDate);
        if(getSetting(FLEET_REMINDER_KEY,true))
            departDateSpan.parentNode.appendChild(getAutoMove());
    }
    catch(e) {
    	console.log("Line Number: " + e.lineNumber + "\n " + e);
    }
}

function getAutoMove() {
    var auto = document.createElement("input");

    auto.setAttribute("id", "autoMove");
    auto.setAttribute("type", "button");
    auto.setAttribute("value", "Auto Move");
    auto.setAttribute("style","margin-left:5px; font-weight: bold");
    auto.addEventListener("click", function(event) { setAutoLaunch(); }, true);

    return auto;
}

function calculateLaunchTime() {
    try {
        var durationString = $('duration').textContent;
        var arrivalString = $('arrivalTime').value;
        if(durationString == "")
            throw "No duration. Set fleet and destination.";
        var durationSeconds = getSeconds(durationString);
        var arrivalDate = getDateObject(arrivalString);
        var departDate = new Date(arrivalDate.getTime() - (durationSeconds * 1000));
        //console.log(departDate);
    } catch(e) { console.log ("Line Number: "+e.lineNumber+"\n "+e)}
    return departDate;
}

function setAutoLaunch() {
    var dur = getSeconds($('duration').textContent);
    var arr = getDateObject($('arrivalTime').value);
    var auto = document.getElementById("autoMove");

    auto.value = "Cancel";
    auto.style.backgroundColor = "red";
    auto.addEventListener("click", function() { window.location.reload() }, true);
    
    var tim = arr.getTime() - getCurrentServerTime() - 1000 * dur;
    window.setTimeout(function() { launch(document); }, tim);
    countDown(tim);
}

/**
 * Count down launch timer.
 *
 * @param tim milliseconds until launch
 */
function countDown(tim) {
	$('autoMove').value = getCountdown(tim);
	tim -= 1000;
	if(tim > 0)
		window.setTimeout(function() { countDown(tim)}, 1000);
}

/**
 * Format timer.
 * 
 * @param time timer value
 * @returns timer
 */
function getCountdown(time) {
	var cnt = Math.floor(time / 1000);
	var timer = "";
	
	timer += formatNumber(Math.floor(cnt / 3600), 2);
	timer += ":";
	timer += formatNumber(Math.floor((cnt % 3600) / 60), 2);
	timer += ":";
	timer += formatNumber(Math.floor(cnt % 60), 2);
	
	return timer;
}

function formatNumber(num, pos) {
	var str = String(num);
	
	while(str.length < pos)
		str = "0" + str;
	
	return str;
}

function launch(root) {
    var move = root.evaluate("//input[@value='Move']", root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(move)
        move.click();
}

function insertFleetReminderCountdowns() {
    try {
         var departDateString = getSetting("FleetReminders","-");
         if(departDateString == "-")
             return;
        var id = 0;
//        for (id=0;id!=null;id++){
         //console.log(parseNum(departDateString));
         var departDate = new Date();
         departDate.setTime(parseNum(departDateString));

         //console.log(departDate);

         var timeRemaining = (departDate.getTime() - getCurrentServerTime())/1000;

         //console.log("inserting fleet reminder countdowns");
         if(timeRemaining > 0) {
             //var id = unsafeWindow.q ==undefined? 1:unsafeWindow.q+1;
             var countDownDiv = document.createElement("div");

     //      countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='fleettime"+(id)+"'>-</span>";
             countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='fleettime"+id+"'>-</span>";
             //console.log(countDownDiv.innerHTML);
             document.body.firstChild.appendChild(countDownDiv);
         }
         else {
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
    var exp, res;

    exp = /(\d{4})-(\d+)-(\d+)+\W(\d+):(\d+):(\d+)/;
    res = exp.exec(dateString);
    if(res) // yyyy-MM-dd HH:mm:SS
        return new Date(res[1], (res[2]-1), res[3], res[4], res[5], res[6]);

    exp = /(\d+)-(\d+)-(\d{4})+\W(\d+):(\d+):(\d+)/;
    res = exp.exec(dateString);
    if(res) // MM-dd-yyyy HH:mm:SS
        return new Date(res[3], (res[2]-1), res[1], res[4], res[5], res[6]);

    notify ("Invalid arrival input "+dateString+". Ensure arrival time is in the following format. MM-DD-YYYY HH:MM:SS");
    setSetting("FleetReminders","-");
}

/**
 * Get current server time in milliseconds.
 * 
 * @returns {Number}
 */
function getCurrentServerTime() {
	return new Date().getTime() - _diff;
}

/**
 * Get static server time in milliseconds.
 * 
 * @return static server time
 */
function getServerTime() {
	var time = document.getElementById("server-time");
	
	if(time != null)
		return new Date().getTime();
    try {
		var exp = /(\d{4})\/(\d{2})\/(\d{2})\s(\d{2}):(\d{2}):(\d{2})/;
		var res = exp.exec(time.getAttribute("title"));
		
        if(res) { // yyyy-mm-dd HH:MM:SS
            var date = new Date();

            date.setFullYear(res[1]);
            date.setMonth(res[2] - 1);
            date.setDate(res[3]);
            date.setHours(res[4]);
            date.setMinutes(res[5]);
            date.setSeconds(res[6]);

            console.log("Server Time: " + date);
            return date.getTime();
        }
        console.log("Unable to parse date.");
		return new Date().getTime();
    }
    catch(e) {
        console.log("getServerTime error: " + e);
    }
}

//2010-04-28 00:08:42
function getDateString(date){
    var time = "";

    time += date.getFullYear();
    time += "-";
    time += zeroPad(date.getMonth() + 1);
    time += "-";
    time += zeroPad(date.getDate());
    time += " ";
    time += zeroPad(date.getHours());
    time += ":";
    time += zeroPad(date.getMinutes());
    time += ":";
    time += zeroPad(date.getSeconds());

    return time;
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

/**
 * Add finish times.
 *
 * @param singleLine
 */
function addFinishTimes(singleLine) {
//	console.log("addFinishTimes()");
	try {
		if(getSetting(USE_SERVER_TIME,false)) {
			var now = new Date(getCurrentServerTime());
			var future = now;
		}
		else {
			var now = new Date();
			var future = now;
		}
		var separator = singleLine ? " " : "<br/>";
		var cells = document.getElementsByTagName('td');
		for(var i=0; i<cells.length; i++) {
			if(cells[i].id.indexOf('time') != -1 && parseNum(cells[i].title) > 0) {
				var date = new Date();
				var time = cells[i].title;
				var span;

				cells[i].removeChild(cells[i].firstChild);
				date.setTime(now.getTime() + 1000 * time);
				span = document.createElement("span");
				span.id = cells[i].id;
				cells[i].id = "checked";
				span.setAttribute("title", time);
				cells[i].appendChild(span);
				cells[i].appendChild(document.createElement("br"));
				span = document.createElement("span");
				span.setAttribute("style", getAgeCol(time));
				span.appendChild(document.createTextNode(getDateString(date)));
				cells[i].appendChild(span);
			}
		}
		if(location.indexOf("fleet.aspx")!=-1) {
			var links = document.evaluate("//td[@id='checked']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i=0; i<links.snapshotLength; i++) {
				links.snapshotItem(i).width="9%"
			}
		}
	}
	catch(e) {
		console.log("addfinishtimers "+e);
	}
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

        if (s >= 1) {
            h = Math.floor(s/3600);
            m = Math.floor( (s % 3600)/60 );
            s = Math.floor( (s %60) );
            elem.innerHTML = h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
        }
        else {
            elem.innerHTML = '-';
        }
    }
}
setInterval(function(){t();}, 200);
*/
var start_date = (new Date).getTime();

var tFunction = function cpt() {
try {
    if(unsafeWindow.cpt != typeof func){
        for(var n=1; n<=unsafeWindow.q; n++) {
           var now = (new Date).getTime();
           var elem = null;
           if ($('time'+n)) {
              elem=$('time'+n);
              var m=0; var h=0; var s=0;
              var diff = (now - start_date) / 1000;
              var s = elem.title - diff;
              if (s <= 0) {
                elem.innerHTML = '-';
                if ($("datetime"+n)) $("datetime"+n).innerHTML = '';
              }
              else {
                  h = Math.floor(s/3600);
                  m = Math.floor( (s % 3600)/60 );
                  s = Math.floor( (s %60) );
                  //            if(s>59){ m=Math.floor(s/60); s=s-m*60 }
                  //            if(m>59){ h=Math.floor(m/60); m=m-h*60 }
                  elem.innerHTML=h+":"+zeroPad(m)+":"+zeroPad(s);
              }
           }
        }
    }
    window.setTimeout(function() { cpt(); }, 1000);

    } catch (e) { console.log ("tFunction "+e);}
};
//==========================================
// Updates the date section of timers
//==========================================

// This function is an adaptation of the t() func, clears out the date element and closes out the timer

var updateFunction = function dateupdate(){
    try {
		var start = new Date();
		var starttime = start.getTime();
		var q = unsafeWindow.q;
		for(var n=1;n<=unsafeWindow.q;n++) {
			var elem = null;
			if ($('time'+n))elem=$('time'+n);
			var s=elem.title;
			if(s<=0) {
				elem.innerHTML="-";
				elem.id="ended";
				$('datetime'+n).innerHTML = "";
			}
		}
	} catch (e) { console.log ("updateFunction "+e);}
};

//==========================================
// This should avoid loading tfunc multiple times, reducing computer load.
//==========================================
function setupT()
{
    try{
        if(typeof(unsafeWindow.t) != "undefined") {
//            unsafeWindow.t = function(){return null;};
//            unsafeWindow.clearInterval(window.t, 200);
//            unsafeWindow.dateupdatehandle = window.setTimeout(function() { dateupdate(); }, 1000);
//            Array.forEach(document.getElementsByTagName("script"),function(script){
//                console.log (script);
//                if (script.src == "jscript.js")
//                {
//                    script.textContents=function(){return null;};
//                    script.src = "javascript:void(0);";
//                    unsafewindow.t = null;
//                }
//            });
        } else {
//            cpt();
        }
    } catch (e) { console.log ("setupT: "+e);}
}

//==========================================
// Refreshs fleet timer
//==========================================
function localTFunction(id) {
//    console.log("Timer: " + id);
    try {
        elem=$('fleettime'+id);
        if(!elem) return;
//        console.log("elem: "+elem);
        s=elem.title;
        m=0; h=0;
        if(s <= 0) {
            elem.innerHTML="-";
        }
        else {
            if(s>59){ m=Math.floor(s/60); s=s-m*60 }
            if(m>59){ h=Math.floor(m/60); m=m-h*60 }
            if(s<10){ s="0"+s }
            if(m<10){ m="0"+m }
            elem.innerHTML=h+":"+m+":"+s;
            elem.title -= 1;
            window.setTimeout(function() { localTFunction(id); },1000);
        }
    } catch (e) { console.log ("localtfunction: "+e);}
}

//==========================================
//Warn if non-attack units in attack fleet.
//==========================================
function attackWarn() {
    if (window.location.pathname == '/fleet.aspx') {
    //      if (window.location.search.indexOf('&view=attack') >= 0) {
    //          $('input[value=Attack Fleet]').eq(0).parents('table').find('tr').each(function(){
    //              var player = $(this).children('td').eq(1).text();
    //                  $(this).hide();
    //              }
    //
    //We have a list of guilds to highlight already lets use them rather than hardcode tags
    //Edited out all the really nasty parts of this function that were concerning me >.>
    //var ENEMY_GUILDS_KEY;
    //var NAPPED_GUILDS_KEY;
    //var ALLIED_GUILDS_KEY;

//          if (window.location.search.indexOf('&view=move') != -1) {
                // fleet negation link
//          if($('a:contains(none)'))
//              $('a:contains(none)').parent().append('&nbsp;-&nbsp;').append( $('<a href="#">negate</a>').
//                  click(function(){
//                      $('[id^=avail]').each(function(){
//                          var inp = $(this).parent().find('td input');
//                          var v = inp.val();
//                          var av = $(this).text();
//                          if (av-v == 0)
//                              inp.val('');
//                          else
//                              inp.val( av - v );
//                      })
//                      return false;
//                  })
//              );
//          }
    }
}
function holdAttack () {
    // Attempt to update code to make it active
//  console.log('combat');
//  $('input[value=Start Attack]').width(300).height(100).css({'font-size':'20pt','vertical-align':'top'});
//  $('th:contains(Attack Force)').parent().siblings('tr').not(':first').each(function(){
//      var ship_type = $(this).children('td').eq(0).text();
//      if (ship_type == 'Fleet Carrier' || ship_type == 'Scout Ship' || ship_type == 'Carrier' || ship_type == 'Recycler')
//          $(this).css('color', 'red');
//  });
}
// Starting work on auto refresh to location you were trying to get to
// rather than being thrown back to account.aspx
//function refreshClosedPage(){
//<big class='red'><big>Server is Temporarily Closed</big></big>
//}

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
    var d=document.getElementsByTagName('table');
    for(var i=0;i<d.length;i++)
    {
        var t=d[i].firstChild;
        if(t.firstChild)
        {
            if(t.childNodes.length>1 &&
            t.childNodes[1].firstChild &&
            t.childNodes[1].firstChild.firstChild &&
            t.childNodes[1].firstChild.firstChild.nodeValue=='Processing capacity')
            {
//              console.log('baseid: '+e[3]);
//              console.log('construction: '+t.childNodes[2].childNodes[1].firstChild.nodeValue);
//              console.log('production: '+t.childNodes[3].childNodes[1].firstChild.nodeValue);
//              console.log('research: '+t.childNodes[4].childNodes[1].firstChild.nodeValue);
//              console.log('economy: '+t.childNodes[6].childNodes[1].firstChild.nodeValue);
//              console.log('income: '+t.childNodes[7].childNodes[1].firstChild.nodeValue);
//              console.log('baseowner: '+t.childNodes[9].childNodes[1].firstChild.innerHTML);
                var temp = [];
                temp[0] = t.childNodes[6].childNodes[1].firstChild.nodeValue;
                temp[1] = t.childNodes[7].childNodes[1].firstChild.nodeValue;
                return temp;
            }
        }
    }
}
function attachPillage(){
    try
    {
    var table = document.evaluate("//th[contains(text(),'Processing capacity')]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode.parentNode.insertRow(11);
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
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\ninstallCheck(): "+e); }
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
//==========================================
// Autofind pacts
//==========================================

function discoverPacts()
{
    try
    {
        if (location.indexOf("action=edit_internal") != -1) return;
//      split
        var command = "//body";
        var table=document.evaluate(command, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//        console.log (table.innerHTML);
//      tr[0] = titles
//      Rank 1  Alliances
//      Rank 2  Friendly
//      Rank 3  Neutral
//      Rank 4  Hostile
//      Rank 5  Enemy
        if (!table) return;
        var lines = table.innerHTML;
//        console.log ("content: "+lines);
        //.split('alli');
        var reg = new RegExp(/(\[.*?\])/ig);
        var tags = lines.match(reg);
        tags.sort();
        for (var i=0; i<tags.length; i++) {
            if (tags[i] == tags[i-1]) console.log ("duplicate " + tags[i]);
            else console.log ("unique tag "+tags[i]);
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
// Next Feature
//==========================================

//==========================================
//Config Page
//==========================================

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
var PREFILL_BATTLE_CALC_KEY = "config_prefillBattleCalc";
var ADD_FINISH_TIMES_KEY = "config_addFinishTimes";
var ADD_FINISH_TIMES_EMPIRE_KEY = "config_addFinishTimesEmpire";
var FINISH_TIMES_SINGLE_LINE_KEY = "config_finishTimesSingleLine";
var FILL_TECH_DATA_KEY = "config_fillTechData";
var ADJUST_TITLES_KEY = "config_adjustTitles";
var FIX_QUEUES_KEY = "config_fixQueues";
var HOUR_24_DISPLAY_KEY = "config_24hourDisplay";
var HIGHLIGHT_PLAYERS_KEY = "config_highlightPlayers";
var PLAYER_COLORS_KEY = "config_playerColors";
var MY_GUILD_KEY = "config_myGuild";
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
var REFRESH_PAGES_KEY = "config_refreshPages";
var REFRESH_INTERVALS_KEY = "config_refreshIntervals";
var SCANNER_REFRESH_KEY = "config_scannerRefreshInterval";
var MAP_REFRESH_KEY = "config_mapRefreshInterval";
var STRUCT_COLOUR1_KEY = "config_structColour1";
var STRUCT_COLOUR2_KEY = "config_structColour2";
var ADD_FLEET_MOVE_LINK_KEY = "config_addFleetMoveLink";
var AUTOSET_GUILD_KEY = "config_autosetGuild";
var AUTOSET_GUILD_NOTIFY_KEY = "config_autosetGuildNotify";
var SUM_FLEETS_KEY = "config_sumFleets";
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
var TIME_HELPER_KEY = "config_timeHelper";
var FLEET_REMINDER_KEY = "config_fleetReminders";
var USE_SERVER_TIME = "config_useServerTime";
var SHOW_PILLAGE_KEY = "config_showPillage";
var FORMAT_SCANNER_KEY = "config_formatScanner";
//var ANIMATE_SERVER_TIME_KEY = "config_animateServerTime";
var REMOVE_REDIRECT_KEY = "config_removeRedirect";
var PRODUCTION_ENHANCE_KEY = "config_enhanceProd";
var CONSTRUCT_ENHANCE_KEY = "config_enhanceCons";
var SCRIPT_BATTLECALC_KEY = "config_battlecalcScript";
//var STATIC_SERVER_TIME_KEY = "config_staticServerTime";
var HIDE_HELP_TEXT_KEY = "config_hideHelpText";
var QUICK_BOOKMARKS_KEY = "config_quickBookmarks";
var BOOKMARKS_COLOR1_KEY = "config_bookmarkColor1";
var BOOKMARKS_COLOR2_KEY = "config_bookmarkColor2";

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
    "<h2>Astro Empires Extras CP Edition "+scriptVersion+" - Configuration</h2>"+
    "<p>Release notes, information, and feedback/request forums are available <a href='http://userscripts.org/scripts/show/"+scriptId+"' target='_new'> here</a>.</p>"+
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
         "<td style='padding-left:20'>Inserts a link to the AstroEmpires Calculator Project by Guillaume Leonhart.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td><input type='checkbox' id='config_quickBookmarks' /></td><td class='featureName'>Enable Quick Bookmarks</td>"+
         "<td style='padding-left:20'>Adds an option on each link and stores that coord in the upper right of the screen.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Bookmark location:</td>"+
         "<td style='padding-left:20' class='subfeatureName'>Color<a href='#foot1'><sup class='footnote'>1</sup></a>: "+
         "<input type='text' id='config_bookmarkColor1' style='width:100;'/></td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Bookmark comment:</td>"+
         "<td style='padding-left:20' class='subfeatureName'>Color<a href='#foot1'><sup class='footnote'>1</sup></a>: "+
         "<input type='text' id='config_bookmarkColor2' style='width:100;'/></td></tr>"+

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
/*
         "<tr><td><input type='checkbox' id='config_animateServerTime' /></td><td class='featureName'>Animate Time</td>"+
         "<td style='padding-left:20'>Display constantly updated server time.</td><td style='padding-left:20'>All pages</td></tr>"+

		"<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_staticServerTime' /> Static time</td>"+
         "<td style='padding-left:20'>Shows additional static timer to show when page was loaded.</td><td style='padding-left:20'>All pages</td></tr>"+
*/
         "<tr><td><input type='checkbox' id='config_formatNumbers' /></td><td class='featureName'>Format numbers</td>"+
         "<td style='padding-left:20'>Formats fleet size numbers for better readability.</td><td style='padding-left:20'>Base pages</td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'>Delimeter: <input type='text' id='config_numberDelimeter' style='width:25;' /></td><td style='padding-left:20'></td><td></td></tr>"+

         "<tr><td><input type='checkbox' id='config_timeHelper' /></td><td class='featureName'>Time Helper</td>"+
         "<td style='padding-left:20'>Enter time you want to arrive at a location to be informed of the right time to leave.</td><td style='padding-left:20'>fleet move</td></tr>"+

         "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_fleetReminders' />Departure Countdown</td>"+
         "<td style='padding-left:20'>Shows countdown until departure time beneath server time.</td><td style='padding-left:20'>All pages</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Highlights")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Player Highlights</td></tr>"+

         "<tr><td><input type='checkbox' id='config_highlightPlayers' /></td><td class='featureName'>Highlight players</td>"+
         "<td style='padding-left:20'>Highlights players according to guild.<br /><b>Note:</b>This overrides colour from the player highlight feature.</td><td style='padding-left:20'>All</td></tr>"+

         "<tr><td class='featureName' colspan='2'><input type='checkbox' id='config_autosetGuild' /> Find guild</td>"+
         "<td style='padding-left:20'>Attempt to autoset guild when on profile page.</td><td style='padding-left:20'>Profile</td></tr>"+

         "<tr><td colspan='3' class='subfeatureName'>My Guild Tag<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_myGuild' style='width:100;' /></td>"+
         "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_myGuildColour' style='width:100;' /></td></tr>"+

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

        "<tr><td><input type='checkbox' id='config_refreshPages'/></td><td class='featureName'>Refresh pages</td>"+
        "<td style='padding-left:20'>Adds refresh option to map location and scanner pages.</td><td style='padding-left:20'>Map & Scanner</td></tr>"+

	  "<tr><td colspan='3' class='subfeatureName'>Refresh Intervals: <input type='text' id='config_refreshIntervals' style='width: 100'/></td></tr>"+

    "<tr><td colspan='5'></td></tr>";
    //if (tab == "Trade")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Trade</td></tr>"+

        "<tr><td><input type='checkbox' id='config_highlightTradePartners' /></td><td class='featureName'>Highlight trade partners</td>"+
        "<td style='padding-left:20'>Highights all links to trade partners in blue.</td><td style='padding-left:20'>All</td></tr>"+

        "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightPlayerColor' style='width:100;' /></td><td></td></tr>"+

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

        "<tr><td><input type='checkbox' id='config_showPillage' /></td><td class='featureName'>Insert estimated pillage on bases</td>"+
        "<td style='padding-left:20'>Displays rough guide to amount pillage would be worth per econ.</td><td style='padding-left:20'>Bases</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Misc")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Credits History</td></tr>"+

          "<tr><td><input type='checkbox' id='config_sumCredits' /></td><td class='featureName'>Credits Summary</td><td style='padding-left:20'>Displays a summary of credits.</td>"+
          "<td style='padding-left:20'>Credits History</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Highlights")
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
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Board/Forums/Guild</b></td></tr>"+

         "<tr><td><input type='checkbox' id='config_removeRedirect' /></td><td class='featureName' colspan='2'>Disable redirection on board links.</td>"+
         "<td style='padding-left:20'>Board/Guild pages only</td></tr>"+

    "<tr><td colspan='5'></td></tr>";

    //if (tab == "Calculator")
    newbody = newbody +"<tr><td colspan='5' class='configHeading'>Battle Calculator <b>(Experimental)</b></td></tr>"+

         "<tr><td><input type='checkbox' id='config_fillTechData' /></td><td class='featureName'>Pre-fill tech data</td>"+
         "<td style='padding-left:20'>*BROKEN* Fills attack tech data in AstroEmpires Calculator Project by Guillaume Leonhart. Tech data is updated with every visit to the empire technologies page.</td>"+
         "<td style='padding-left:20'>Battle Calculator</td></tr>"+

         "<tr><td><input type='checkbox' id='config_prefillBattleCalc' /></td><td class='featureName'>Pre-fill fleet data</td>"+
         "<td style='padding-left:20'>*BROKEN* Adds link to attack screen and enemy fleet screen that opens up and fills in all data in AstroEmpires Calculator Project by Guillaume Leonhart."+
         " Should be used along with Pre-fill tech data feature. <br /><b>Caution:</b>This feature does not support playing on multiple servers. It will use the tech from the last tech page "+
         "visited regardless of server.</td><td style='padding-left:20'>Attack / Enemy fleet</td></tr>";


    //if (tab == "Experimental")
    newbody = newbody +"<tr><td colspan='5'></td></tr>"+
        "<tr><td colspan='5' class='configHeading'>Experimental</td></tr>"+
"<tr><td><input type='checkbox' id='config_enhanceProd' /></td><td class='featureName'>Production enhancer script.</td>"+
         "<td style='padding-left:20'>*POSSIBLY DETECTABLE*</td><td style='padding-left:20'>All</td></tr>"+
"<tr><td><input type='checkbox' id='config_enhanceCons' /></td><td class='featureName'>Construction enhancer script.</td>"+
         "<td style='padding-left:20'></td><td style='padding-left:20'>All</td></tr>"+
"<tr><td><input type='checkbox' id='config_battlecalcScript' /></td><td class='featureName'>Battlecalc on attack pages.</td>"+
         "<td style='padding-left:20'></td><td style='padding-left:20'>All</td></tr>"+
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
    "<br /><br /><a id='backLink' href='"+url+"'>Return to Astro Empires</a> - <a id='updateCheck' href='#'>Check For Update</a> "+
    "</div>";
    return newbody;
}
function showConfig(page) {
    console.log("Loading config for "+getServer());
    if (DEBUGNEWCODE) {
        if($('Config')) {
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
        resetConfig(null);
    }
    , true);
    $('updateCheck').addEventListener('click', function(event) {
        checkForUpdates(true);
    }
    , true);
    $('config_highlightPoorTrades').addEventListener('change', function(event) {
        poorTradesChanged();
    }
    , true);
    $('config_fleetReminders').addEventListener('click', function(event) {
        if($('config_fleetReminders').checked)
            $('config_timeHelper').checked = true;
    }
    , true);
    $('config_timeHelper').addEventListener('click', function(event) {
        if(!$('config_timeHelper').checked)
            $('config_fleetReminders').checked = false;
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
    setSetting(FILL_TECH_DATA_KEY,$(FILL_TECH_DATA_KEY).checked);
    setSetting(PREFILL_BATTLE_CALC_KEY,$(PREFILL_BATTLE_CALC_KEY).checked);
    setSetting(ADD_FINISH_TIMES_KEY,$(ADD_FINISH_TIMES_KEY).checked);
    setSetting(ADD_FINISH_TIMES_EMPIRE_KEY,$(ADD_FINISH_TIMES_EMPIRE_KEY).checked);
    setSetting(FINISH_TIMES_SINGLE_LINE_KEY,$(FINISH_TIMES_SINGLE_LINE_KEY).checked);
//    setSetting(ANIMATE_SERVER_TIME_KEY,$(ANIMATE_SERVER_TIME_KEY).checked);
    setSetting(ADJUST_TITLES_KEY,$(ADJUST_TITLES_KEY).checked);
    setSetting(FIX_QUEUES_KEY,$(FIX_QUEUES_KEY).checked);
    setSetting(MAX_QUEUES_KEY,$(MAX_QUEUES_KEY).value);
    setSetting(HOUR_24_DISPLAY_KEY,$(HOUR_24_DISPLAY_KEY).checked);
    setSetting(HIGHLIGHT_PLAYERS_KEY,$(HIGHLIGHT_PLAYERS_KEY).checked);
    setSetting(PLAYER_COLORS_KEY,escape($(PLAYER_COLORS_KEY).value));
    setSetting(MY_GUILD_KEY,escape($(MY_GUILD_KEY).value));
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
    setSetting(SUM_FLEETS_KEY,$(SUM_FLEETS_KEY).checked);
    setSetting(SUM_CREDITS_KEY,$(SUM_CREDITS_KEY).checked);
    setSetting(REFRESH_PAGES_KEY,$(REFRESH_PAGES_KEY).checked);
    setSetting(REFRESH_INTERVALS_KEY,$(REFRESH_INTERVALS_KEY).value);
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
//    setSetting(STATIC_SERVER_TIME_KEY,$(STATIC_SERVER_TIME_KEY).checked);
    setSetting(AUTOSET_GUILD_NOTIFY_KEY,$(AUTOSET_GUILD_NOTIFY_KEY).checked);
    setSetting(TIME_HELPER_KEY,$(TIME_HELPER_KEY).checked);
    setSetting(FLEET_REMINDER_KEY,$(FLEET_REMINDER_KEY).checked);
    setSetting(QUICK_BOOKMARKS_KEY,$(QUICK_BOOKMARKS_KEY).checked);
    setSetting(BOOKMARKS_COLOR1_KEY,$(BOOKMARKS_COLOR1_KEY).value);
    setSetting(BOOKMARKS_COLOR2_KEY,$(BOOKMARKS_COLOR2_KEY).value);

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
function loadConfig() {
    try{
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
    if ($(FILL_TECH_DATA_KEY)) $(FILL_TECH_DATA_KEY).checked = getSetting(FILL_TECH_DATA_KEY,true);
    if ($(PREFILL_BATTLE_CALC_KEY)) $(PREFILL_BATTLE_CALC_KEY).checked = getSetting(PREFILL_BATTLE_CALC_KEY,true);
    if ($(ADD_FINISH_TIMES_KEY)) $(ADD_FINISH_TIMES_KEY).checked = getSetting(ADD_FINISH_TIMES_KEY,true);
    if ($(ADD_FINISH_TIMES_EMPIRE_KEY)) $(ADD_FINISH_TIMES_EMPIRE_KEY).checked = getSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true);
    if ($(FINISH_TIMES_SINGLE_LINE_KEY)) $(FINISH_TIMES_SINGLE_LINE_KEY).checked = getSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
    if ($(ADJUST_TITLES_KEY)) $(ADJUST_TITLES_KEY).checked = getSetting(ADJUST_TITLES_KEY,true);
    if ($(FIX_QUEUES_KEY)) $(FIX_QUEUES_KEY).checked = getSetting(FIX_QUEUES_KEY,true);
    if ($(MAX_QUEUES_KEY)) $(MAX_QUEUES_KEY).value = getSetting(MAX_QUEUES_KEY,5);
    if ($(HOUR_24_DISPLAY_KEY)) $(HOUR_24_DISPLAY_KEY).checked = getSetting(HOUR_24_DISPLAY_KEY,false);
//    if ($(ANIMATE_SERVER_TIME_KEY)) $(ANIMATE_SERVER_TIME_KEY).checked = getSetting(ANIMATE_SERVER_TIME_KEY,true);
    if ($(HIGHLIGHT_PLAYERS_KEY)) $(HIGHLIGHT_PLAYERS_KEY).checked = getSetting(HIGHLIGHT_PLAYERS_KEY,true);
    if ($(PLAYER_COLORS_KEY)) $(PLAYER_COLORS_KEY).value = unescape(getSetting(PLAYER_COLORS_KEY,"Drekons=#FF82AB,United Colonies=#7FFF00"));
    if ($(MY_GUILD_KEY)) $(MY_GUILD_KEY).value = unescape(getSetting(MY_GUILD_KEY,"[MyGuild]"));
    if ($(MY_GUILD_COLOUR_KEY)) $(MY_GUILD_COLOUR_KEY).value = unescape(getSetting(MY_GUILD_COLOUR_KEY,"#9999FF"));
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
    if ($(SUM_FLEETS_KEY)) $(SUM_FLEETS_KEY).checked = getSetting(SUM_FLEETS_KEY,true);
    if ($(SUM_CREDITS_KEY)) $(SUM_CREDITS_KEY).checked = getSetting(SUM_CREDITS_KEY,true);
    if ($(REFRESH_PAGES_KEY)) $(REFRESH_PAGES_KEY).checked = getSetting(REFRESH_PAGES_KEY,true);
    if ($(REFRESH_INTERVALS_KEY)) $(REFRESH_INTERVALS_KEY).value = getSetting(REFRESH_INTERVALS_KEY, "0,15,30,60");
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
//    if ($(STATIC_SERVER_TIME_KEY)) $(STATIC_SERVER_TIME_KEY).checked = getSetting(STATIC_SERVER_TIME_KEY,true);
    if ($(AUTOSET_GUILD_NOTIFY_KEY)) $(AUTOSET_GUILD_NOTIFY_KEY).checked = getSetting(AUTOSET_GUILD_NOTIFY_KEY,true);
    if ($(INSERT_MOVE_PRESETS_KEY)) $(INSERT_MOVE_PRESETS_KEY).checked = getSetting(INSERT_MOVE_PRESETS_KEY,true);
    if ($(SHOW_EXECUTION_TIME_KEY)) $(SHOW_EXECUTION_TIME_KEY).checked = getSetting(SHOW_EXECUTION_TIME_KEY,false);
    if ($(ENTER_PRODUCTION_TIME_KEY)) $(ENTER_PRODUCTION_TIME_KEY).checked = getSetting(ENTER_PRODUCTION_TIME_KEY,true);
    if ($(USE_SERVER_TIME)) $(USE_SERVER_TIME).checked = getSetting(USE_SERVER_TIME,true);

    if ($(TIME_HELPER_KEY)) $(TIME_HELPER_KEY).checked = getSetting(TIME_HELPER_KEY,true);
    if ($(FLEET_REMINDER_KEY)) $(FLEET_REMINDER_KEY).checked = getSetting(FLEET_REMINDER_KEY,true);

    if ($(NAME_LOCATIONS_KEY)) $(NAME_LOCATIONS_KEY).checked = getSetting(NAME_LOCATIONS_KEY,false);
    if ($(LOCATION_NAMES_KEY)) $(LOCATION_NAMES_KEY).value = unescape(getSetting(LOCATION_NAMES_KEY,"A12:12:12:12=my home base,A13:13:13:13=my other base"));

    if ($(SHOW_PILLAGE_KEY)) $(SHOW_PILLAGE_KEY).checked = getSetting(SHOW_PILLAGE_KEY,true);
    if ($(FORMAT_SCANNER_KEY)) $(FORMAT_SCANNER_KEY).checked = getSetting(FORMAT_SCANNER_KEY,true);
    if ($(REMOVE_REDIRECT_KEY)) $(REMOVE_REDIRECT_KEY).checked = getSetting(REMOVE_REDIRECT_KEY,true);
    if ($(QUICK_BOOKMARKS_KEY)) $(QUICK_BOOKMARKS_KEY).checked = getSetting(QUICK_BOOKMARKS_KEY,false);
    if ($(BOOKMARKS_COLOR1_KEY)) $(BOOKMARKS_COLOR1_KEY).value = getSetting(BOOKMARKS_COLOR1_KEY, "gold");
    if ($(BOOKMARKS_COLOR2_KEY)) $(BOOKMARKS_COLOR2_KEY).value = getSetting(BOOKMARKS_COLOR2_KEY, "gray");
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
    // Do a check to ensure people ment to reset
    if (install == null)
        if (!window.confirm('Are you sure you want to clear all of\nYour settings for '+scriptName+' v'+scriptVersion+' this will effect all servers.\n')) return;
    // If we have the version with GM_deleteValue() and GM_listValues() wipe all settings to cover any future updates
    if(typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function' && install == null)
    {
        var values = GM_listValues();
        for (var i in values)
        {
        console.log("deleting "+values[i])
        GM_deleteValue(values[i]);
        }
        notify('All servers settings have been deleted, setting defaults.');
    } else {
        if (install == null) notify('You need GreaseMonkey version: 0.8.20090123.1 or higher, please upgrade.');
        else notify('Error! In order to reset fully you need at least GreaseMonkey version: 0.8.20090123.1, please upgrade and try again. Using fall back reset meathod only.');
    }

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
    setSetting(FILL_TECH_DATA_KEY,true);
    setSetting(PREFILL_BATTLE_CALC_KEY,true);
    setSetting(ADD_FINISH_TIMES_KEY,true);
    setSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true);
    setSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
//    setSetting(ANIMATE_SERVER_TIME_KEY,true);
    setSetting(ADJUST_TITLES_KEY,true);
    setSetting(FIX_QUEUES_KEY,true);
    setSetting(MAX_QUEUES_KEY,5);
    setSetting(HOUR_24_DISPLAY_KEY,false);
    setSetting(AUTOSET_GUILD_KEY,true);
    setSetting(PRODUCTION_ENHANCE_KEY,false);
    setSetting(CONSTRUCT_ENHANCE_KEY,false);
    setSetting(SCRIPT_BATTLECALC_KEY,true);
//    setSetting(STATIC_SERVER_TIME_KEY,true);
    setSetting(AUTOSET_GUILD_NOTIFY_KEY,true);
    setSetting(HIGHLIGHT_PLAYERS_KEY,true);
    setSetting(PLAYER_COLORS_KEY,"Drekons=#FF82AB,United Colonies=#7FFF00");
    setSetting(MY_GUILD_KEY,"[MyGuild]");
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
    setSetting(SUM_FLEETS_KEY,true);
    setSetting(SUM_CREDITS_KEY,true);
    setSetting(REFRESH_PAGES_KEY,true);
    setSetting(REFRESH_INTERVALS_KEY,"0,15,30,60");
    setSetting(FORMAT_NUMBERS_KEY,true);
    setSetting(NUMBER_DELIMETER_KEY,",");
    setSetting(CLONE_BASE_LINKS_KEY,true);
    setSetting(CLONE_FLEET_LINKS_KEY,true);
    setSetting(MOVE_GALAXY_LINKS_KEY,false);
    setSetting(STRUCTURES_GOALS_KEY,true);
    setSetting(INSERT_MOVE_PRESETS_KEY,true);
    setSetting(SHOW_EXECUTION_TIME_KEY,false);
    setSetting(ENTER_PRODUCTION_TIME_KEY,true);
    setSetting(TIME_HELPER_KEY,true);
    setSetting(FLEET_REMINDER_KEY,true);
    setSetting(NAME_LOCATIONS_KEY,false);
    setSetting(LOCATION_NAMES_KEY,"A12:12:12:12=my home base,A13:13:13:13=my other base");
    setSetting(REMOVE_REDIRECT_KEY,true);
    setSetting(QUICK_BOOKMARKS_KEY,false);
    setSetting(BOOKMARKS_COLOR1_KEY,"gold");
    setSetting(BOOKMARKS_COLOR2_KEY,"gray");
    setSetting(DEBUG_KEY,false);

    setSetting(SHOW_PILLAGE_KEY,true);
    setSetting(FORMAT_SCANNER_KEY,true);
    if(install == "newInstall") { notify ("Settings set to default for new install."); return; }
    } catch (e) { console.log("Config reset: "+e); return; }
    notify("Settings successfully reset reloading page to update.");

    window.location.reload();
}

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

        var d = node({className: 'MarkData',
                      html: data,
                      style: { textIndent: '15', verticalAlign: '3', fontSize: 'x-small', color: getSetting(BOOKMARKS_COLOR2_KEY, "white")}})
        markslist.appendChild(d);
        EventManager.Add(d,'dblclick',(function(url,data){return function(){promptRename(url,data)}})(url,d));
    }
}

function createLink(url, text, onclick) {
    var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text, style: { color: getSetting(BOOKMARKS_COLOR1_KEY, 'gold')}});
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
        } else if (allLinks.snapshotItem(i).textContent.match(/\w\d{2}:\d{2}:\d{2}:\d{2}/)) {
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

function enhanceConstructionPage() {
    var urbanAdjust = 0, solarAdjust = 0, gasAdjust = 0, fusionAdjust = 0, antimatterAdjust = 0, researchAdjust = 0, metalAdjust = 0, crystalAdjust = 0,
    roboticsAdjust = 0, shipyardsAdjust = 0, osAdjust = 0, spaceportsAdjust = 0, ccAdjust = 0, naniteAdjust = 0, androidAdjust = 0, economicAdjust = 0,
    terraformAdjust = 0, mlpAdjust = 0, orbitalbaseAdjust = 0, jgAdjust = 0, biosphereAdjust = 0, capitalAdjust = 0, barrackAdjust = 0, laserAdjust = 0,
    missileAdjust = 0, plasmabaseAdjust = 0, ionAdjust = 0, photonAdjust = 0, disruptorAdjust = 0, deflectionAdjust = 0, pshieldAdjust = 0, pringAdjust = 0;
  table = document.getElementById("base_queue").getElementsByClassName("layout listing")[0]
  for(a=0; a<table.rows.length; a++){
  if(!table.rows[a].innerHTML.match(/name=.add_stack./)){
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
    if (!table.innerHTML.match(/The research of this base is linked to/)){

    if (table.rows.length > 4) {
        for (var nrow=1; nrow<table.rows.length; nrow+=2) {
            if(!table.rows[nrow].innerHTML.match(/Research Labs linked to this base research./)){
            table.rows[nrow+1].style.display='none';
            }
        }
    }
    techmultipliers=getSetting("techData", "0").split(",")
    var energytechmultiplier = (techmultipliers[0]*0.05)+1;
    var averageroute = getSetting("averageRoute", "31");
    var fertility = 0, uspopcost = 0, obpopcost = 0, obcostparentnode = 0, popcost = 0;
    var areacost = 0, energycost = 0, econcost = 0, prodcost = 0, constcost = 0, flag = 0;
    var bestAreaSignifier = node({tag: 'span', html: ' <br /> (Best Area)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    var bestEconSignifier = node({tag: 'span', html: ' <br /> (Best Econ)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    var bestProdSignifier = node({tag: 'span', html: ' <br /> (Best Prod)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    var bestConstSignifier = node({tag: 'span', html: ' <br /> (Best Const)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    var bestPopSignifier = node({tag: 'span', html: ' <br /> (Best Pop)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    var bestEnergySignifier = node({tag: 'span', html: ' <br /> (Best Energy)', style: {fontSize: '8pt', verticalAlign: 'top', color: 'orange'}});
    for (var nrow=1; nrow<table.rows.length; nrow+=2) {
        if(!table.rows[nrow].innerHTML.match(/linked to this base research./)){
        var cname = table.rows[nrow].childNodes[1].firstChild.firstChild.firstChild.nodeValue +
                    table.rows[nrow].childNodes[1].firstChild.firstChild.lastChild.nodeValue;
        if (location.indexOf('view=structures')!=-1) {
            table.rows[nrow].title = cname;
            var td1help_res = table.rows[nrow+1].innerHTML.match(/(fertility|metal resource|crystals resource).\((.+?)\)/)
            if (td1help_res) {
            if (flag == 0){
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
                if (cname=='Terraform') {
                makeAdjustments(nrow, terraformAdjust)
                terracost = parseNum(itemcost) / 5;
                    if(areacost == 0 || areacost > terracost){
                    areacost = terracost
                    table.rows[nrow].childNodes[2].appendChild(bestAreaSignifier);
                    }
                }
                if (cname=='Multi-Level Platforms') {
                adjust = mlpAdjust
                makeAdjustments(nrow, mlpAdjust)
                    var cost = parseNum(itemcost) / 10;
                    if (cost < areacost) {
                        areacost = cost;
                        bestAreaSignifier.parentNode.removeChild(bestAreaSignifier);
                        table.rows[nrow].childNodes[2].appendChild(bestAreaSignifier);
                    }
                }
                if (cname=='Urban Structures') {
                makeAdjustments(nrow, urbanAdjust)
          USLevel = table.rows[nrow].childNodes[1].innerHTML.match(/\(Level [0-9]{1,}/);
          USLevel = parseNum(USLevel[0].replace(/\(Level /, ""));
                    fertility = parseNum(td1help_res[2]);
                    uspopcost = parseNum(itemcost);
                    uspopcost = (uspopcost+areacost) / fertility;
                    if (popcost == 0 || popcost > uspopcost){
                    popcost = uspopcost;
                    table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);
                    }
                }
                if (cname=='Orbital Base') {
                makeAdjustments(nrow, orbitalbaseAdjust)
                    obpopcost = parseNum(itemcost) / 10;
                    obcostparentnode = table.rows[nrow].childNodes[2];
                    if (obpopcost && obpopcost < popcost) {
                        popcost = obpopcost;
                        bestPopSignifier.parentNode.removeChild(bestPopSignifier);
                        table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);
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
                    var c = parseNum(itemcost);
                    var e = parseNum(table.rows[nrow].childNodes[3].firstChild.nodeValue.slice(1));
                    c = (c + popcost + areacost) / (energytechmultiplier*e);
                    if (e>2){
                    if (!energycost)
                        energycost = c;
                    if (c <= energycost) {
                        energycost = c;
                        if (bestEnergySignifier.parentNode)
                            bestEnergySignifier.parentNode.removeChild(bestEnergySignifier);
                            table.rows[nrow].childNodes[2].appendChild(bestEnergySignifier);
                    }
                    }
                }
                if (cname == "Biosphere Modification"){
makeAdjustments(nrow, biosphereAdjust)
          var biopopcost = parseNum(itemcost);
                    biopopcost = (biopopcost+(24*energycost)+areacost)/USLevel

                    if (biopopcost < popcost) {
                        popcost = biopopcost;
                        bestPopSignifier.parentNode.removeChild(bestPopSignifier);
                        table.rows[nrow].childNodes[2].appendChild(bestPopSignifier);


                    }
                }
                if (cname == "Metal Refineries"){
                makeAdjustments(nrow, metalAdjust)
                var metal = parseNum(td1help_res[2]);
                var metalcost = parseNum(itemcost);
                metalprodcost = (metalcost + energycost + areacost + popcost)/ metal
                metalconstcost = (metalcost + energycost + areacost + popcost)/ metal
                metaleconcost = (metalcost + energycost + areacost + popcost)
            if(econcost == 0 || econcost > metaleconcost){
            econcost = metaleconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost == 0 || prodcost > metalprodcost){
            prodcost = metalprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                        if(constcost == 0 || constcost > metalconstcost){
            constcost = metalconstcost;
                        table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
                        }

                }
                if (cname == "Crystal Mines"){
                makeAdjustments(nrow, crystalAdjust)
                var crystal = parseNum(td1help_res[2]);
                var crystalcost = parseNum(itemcost);
                crystalcost = (crystalcost + energycost + areacost)/ crystal
            if(econcost > crystalcost){
            econcost = crystalcost;

                            table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                            }

                }
            }
                if (cname == "Robotic Factories"){
                makeAdjustments(nrow, roboticsAdjust)
                var robscost = parseNum(itemcost);
                robsprodcost = (robscost + energycost + areacost + popcost)/ 2
                robsconstcost = (robscost + energycost + areacost + popcost)/ 2
                robseconcost = (robscost + energycost + areacost + popcost)
            if(econcost > robseconcost){
            econcost = robseconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost > robsprodcost){
            prodcost = robsprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                        if(constcost > robsconstcost){
            constcost = robsconstcost;
                        table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
                        }

                }
                if (cname == "Shipyards"){
                makeAdjustments(nrow, shipyardsAdjust)
                var shipscost = parseNum(itemcost);
                shipsprodcost = (shipscost + energycost + areacost + popcost)/ 2
        shipseconcost = (shipscost + energycost + areacost + popcost)
            if(econcost > shipseconcost){
            econcost = shipseconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost > shipsprodcost){
            prodcost = shipsprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                }
                if (cname == "Orbital Shipyards"){
                makeAdjustments(nrow, osAdjust)
                var oscost = parseNum(itemcost);
                osprodcost = (oscost + (energycost*12) + popcost)/8
        oseconcost = (oscost + (energycost*12) + popcost)/2
            if(econcost > oseconcost){
            econcost = oseconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost > osprodcost){
            prodcost = osprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                }
                if (cname == "Spaceports"){
                makeAdjustments(nrow, spaceportsAdjust)
                var Spcost = parseNum(itemcost);
                Spcost = (Spcost + energycost + areacost)/ 2
            if(econcost > Spcost){
            econcost = Spcost;
                            table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                            }

                }
                if (cname == "Nanite Factories"){
                makeAdjustments(nrow, naniteAdjust)
                var nanicost = parseNum(itemcost);
                naniprodcost = (nanicost + (energycost*2) + areacost + popcost)/ 4
                naniconstcost = (nanicost + (energycost*2) + areacost + popcost)/ 4
                nanieconcost = (nanicost + (energycost*2) + areacost + popcost) /2
            if(econcost > nanieconcost){
            econcost = nanieconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost > naniprodcost){
            prodcost = naniprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                        if(constcost > naniconstcost){
            constcost = naniconstcost;
                        table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
                        }

                }
                if (cname == "Android Factories"){
                makeAdjustments(nrow, androidAdjust)
                var andrcost = parseNum(itemcost);
                andrprodcost = (andrcost + (energycost*4) + areacost + popcost)/ 6
                andrconstcost = (andrcost + (energycost*4) + areacost + popcost)/ 6
                andreconcost = (andrcost + (energycost*4) + areacost + popcost) /2
            if(econcost > andreconcost){
            econcost = andreconcost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                        if(prodcost > andrprodcost){
            prodcost = andrprodcost;
                        table.rows[nrow].childNodes[2].appendChild(bestProdSignifier);
                        }
                        if(constcost > andrconstcost){
            constcost = andrconstcost;
                        table.rows[nrow].childNodes[2].appendChild(bestConstSignifier);
                        }

                }

                if (cname == "Economic Centers"){
                makeAdjustments(nrow, economicAdjust)
                var eccost = parseNum(itemcost)
                eccost = (eccost + (energycost*2) + areacost + popcost) /3
            if(econcost > eccost){
            econcost = eccost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
                        }
                }
        if (cname == "Capital"){
        makeAdjustments(nrow, capitalAdjust)
                basesArray = getSetting("Bases")
                var eccost = parseNum(itemcost)
                eccost = (eccost + (energycost*12) + areacost + popcost) / (10+basesArray.length)
            if(econcost > eccost){
            econcost = eccost;
                        table.rows[nrow].childNodes[2].appendChild(bestEconSignifier);
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
                table.rows[nrow].childNodes[colnum].style.whiteSpace='nowrap';
                table.rows[nrow].childNodes[colnum].appendChild(buttontext);
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

function grabCaps(){
    try
    {
        capArray = $("empire_capacities").getElementsByClassName("layout listing")[0];
        cons = "", prod = "", res = "", shipyards = "", os = "", cmdr = ""
        for(x=2; x<capArray.rows.length-1; x=x+2){
            if((capArray.rows[x].innerHTML.match("Base Commander:")) && (capArray.rows[x].innerHTML.match("Production")))
            {
                prodcmdr=1+(capArray.rows[x].innerHTML.match(/Production ([0-9]+)/)[1]/100)
            } else {
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
    } catch(e) { console.log( "grabcaps: " + e ) }
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
    "//td[contains(@class,'help')]",
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
    $(box).value = parseNum($(box).value) + parseNum(num);
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
    try {
        if(!getSetting("Production Cap"))
            notify("Capacities not set, go to the capacities page to set.");
    var btn_details = [];
    btn_details.push([1,'+1 ']);
    btn_details.push([10,'+10 ']);
    btn_details.push([100,'+100 ']);
    btn_details.push([1000,'+1k ']);
    btn_details.push([1,'+1hr ']);
    btn_details.push([1,'+8hr ']);
    btn_details.push([1,'+24hr ']);
    table.rows[0].childNodes[3].innerHTML = 'Current Queue';
    table.rows[0].childNodes[4].innerHTML = 'Fast Prod';
    table.rows[0].childNodes[5].innerHTML = 'Unit Type';
    table.rows[0].childNodes[6].innerHTML = 'Quantity';
    a=0;
    var Prodcaps = [];
    var Shipyards = [];
    var OS = [];
    var Comm = [];
    var hidden;
    try {
        Prodcaps = getSetting("Production Cap").split(",")
        Shipyards = getSetting("Shipyards").split(",")
        OS = getSetting("Orbital Shipyards").split(",")
        Comm = getSetting("Production Commanders").split(",")
    } catch (e) {console.log("prod helper info collection: "+e)}
    for (i=1; i<table.rows.length; i++) {
        var currentRow = table.rows[i];
        var res = /\?base=((\d|,| |\.)+)/.exec(table.rows[i].childNodes[0].firstChild.href);
        empireLinks[a] = res[1];
        currentRow.childNodes[3].innerHTML = currentRow.childNodes[6].innerHTML;
        currentRow.childNodes[6].removeAttribute("sorttable_customkey");
        currentRow.childNodes[4].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+res[1]+"' onfocus=\"selectedBox='fast_"+res[1]+"'\" />";
        if (typeof Prodcaps[a] != "undefined") hidden = "<input type='hidden' id='quant_"+res[1]+"_cap' value='"+Math.round(Prodcaps[a]*Comm[a])+"'>";
        currentRow.childNodes[6].innerHTML = hidden+"<input type='text' name='quant' class='quant' id='quant_"+res[1]+"' size='5' maxlength='5' value='0' onfocus=\"selectedBox='quant_"+res[1]+"'\" />";
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
    if(!Shipyards[a]) {
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
        currentRow.childNodes[5].innerHTML = html;
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
        var prodTitle = table.rows[0].cells[6];
        scoutButton = document.createElement("a");
        scoutButton.href = "javascript:void(1);";
        scoutButton.id= "prodHelperButton";
        scoutButton.innerHTML=" [&#177;]";
        scoutButton.title = "Production Helper";
        prodTitle.appendChild(scoutButton);
        prodTitle.setAttribute("class", "sorttable_nosort");
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

function isConfirmPage()
{
    var temp = false;
    var confirmTitle = document.evaluate(
    "//center/b[contains(text(),'Confirm Attack')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
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

        // end quant = start quant
        row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
            row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue;
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

function attackOneWay(aRows, dRows)
{
    for (var i = 0; i < aRows.snapshotLength; i++)
    {
        var aRow = aRows.snapshotItem(i);
        var aUnits = aRow.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
        var aPower = aRow.childNodes[POWER_INDEX].firstChild.nodeValue - 0;
        var aName = aRow.childNodes[NAME_INDEX].firstChild.nodeValue;

        //find power over shields
        var aOverShields = 0.01;
        if (aName == "Ion Bombers" || aName == "Ion Frigates")
        {
            aOverShields = 0.50;
        }

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
                var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
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
                var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
                if (dUnits == 0)
                {
                    //console.log(dName+" group is destroyed, skipping.");
                    continue;
                }
                var dArmor = dRow.childNodes[ARMOR_INDEX].firstChild.nodeValue - 0;
                var dHp = dUnits * dArmor;
                var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;

                //console.log("dRow = dRows.snapshotItem("+j+")\n"+
                //        "\tdName = "+dName+"\n"+
                //        "\tdUnits = "+dUnits+"\n"+
                //        "\tdArmor = "+dArmor+"\n"+
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

                if (damage >= dHp)
                {
                    dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = 0;
                    aUnitsUsed = aUnitsUsed + dHp / damagePerUnit;
                    //console.log(dName+" units destroyed!\n"+
                    //        "\tdHp / damagePerUnit = "+(dHp/damagePerUnit)+"\n"+
                    //        "\taUnitsUsed = "+aUnitsUsed);
                }
                else
                {
                    dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
                        (dHp - damage) / dArmor;
                    aUnitsUsed = aUnitsUsed + attackingUnits;
                    //console.log(dName+" units remaining = "+((dHp-damage)/dArmor)+"\n"+
                    //        "\taUnitsUsed = "+aUnitsUsed);
                }
            }
            aUnits = aUnits - aUnitsUsed;
            //console.log("aUnits remaining = "+aUnits);
        }
    }
    //console.log("attackOneWay("+aRows+", "+dRows+") complete.");
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
        var roundedValue = roundUp(row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue, scale);
        row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = roundedValue;

        if (row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue !=
                row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue)
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

    attackOneWay(attackerRows, defenderRows);
    attackOneWay(defenderRows, attackerRows);

    roundEndQuants(attackerRows);
    roundEndQuants(defenderRows);

    var endTime = new Date();
    var runSeconds = endTime.getTime() - startTime.getTime();

    //console.log("AE Battle Calc Completed Successfully!\n\tCalc Duration: " + runSeconds / 1000 + " seconds\n\tEnd Time: " + endTime.toString());
    console.log("runBattleCalc() complete.");
}


//==========================================
// End of Battlecalc code
//==========================================
//==========================================
// Main Script (execution)
//==========================================

       // ==========================================================
       // New switching page loader function, should reduce codesize
       // ==========================================================
       function cp_ae_main()
       {
           try {
               if (!pagetype) var pagetype = _page;
               // console.log("pagetype is "+pagetype);
               //     Switch to run functions per pagetype
               switch(pagetype)
               {
                  case ("scanners"):
                  {
                      //
                      break;
                  };
                  case ("bases_capacities"):
                  {
                      if(getSetting(PRODUCTION_ENHANCE_KEY,false))
                      {
                          // Get capacities for production helper
                          grabCaps();
                          onFeatureComplete("Capacites stored (prodhelper)");
                      }
                      break;
                  };
                  case ("empire"):
                  {
                      // Move empire menu, unsure if needed anymore but left in place
                      if(getSetting(MOVE_EMPIRE_SUBMENU_KEY,true))
                      {
                          try { moveEmpireMenu(); } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Failed to move empire menu: "+e);  }
                          onFeatureComplete("Move Empire Menu");
                      }
                      break;
                  };
                  case ("mapRegion"):
                  {
                  //
                      break;
                  };
                  case ("mapAstro"):
                  {
                  //
                      break;
                  };
                  case ("mapSystem"):
                  {
                  //
                      break;
                  };
                  case ("baseOverview"):
                  {
                  //
                      break;
                  };
                  case ("other"):
                  {
                  //
                      break;
                  };
                  case ("messages"):
                  {
                  //
                      break;
                  };
                  case ("guild"):
                  {
                  //
                      break;
                  };
                  case ("profile"):
                  {
                  //
                      break;
                  };
                  case ("other"):
                  {
                  //
                      break;
                  };
              }

        //-----------------------------------
        //Insert Empire Menu
        //-----------------------------------

            if(location.indexOf('empire.aspx')==-1) {
                if(getSetting(ADD_EMPIRE_SUBMENU_KEY,true)) {
                    try {
                        insertEmpireMenu();
                        document.addEventListener('load',function() { window.setTimeout( function() { cleanEmpireMenus(); } ,300) },false);
                    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n Failed to insert empire menu: "+e);  }
                }
                onFeatureComplete("Insert Empire Menu");
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
//            setupTimer();
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

        if(document.location.href.match(/[A-F]\d+:\d+:\d+/))
        {
            debrisReformating();
            onFeatureComplete("Show debris");
        }
        //-----------------------------------
        //Advanced Production Features
        //-----------------------------------
        if(location.indexOf("base.aspx")!=-1 &&
        (getView()=="production" || getView()=="structures" || getView()=="defenses" || getView()=="research")) {
            if(getSetting(FIX_QUEUES_KEY,true)) {
                fixQueues();
                onFeatureComplete("Fix Queues");
            }
            if(getView()=="production") {
                if(getSetting(ENABLE_PRODUCTION_PRESETS_KEY,true)) {
                    registerTextBoxEventListeners();
                    insertProductionPresetsButtons();
                    onFeatureComplete("Production Presets");
                }
                if(getSetting(ENTER_PRODUCTION_TIME_KEY,true)) {
//                    insertTimeTextBoxes();
                    onFeatureComplete("Production Time Feature");
                }
            }
        }

	if(location.indexOf("map.aspx?loc=") != -1) {
		if(getSetting(REFRESH_PAGES_KEY, true))
			refreshLocation();
		onFeatureComplete("Refresh Page");
	}

        //-----------------------------------
        //Fleet Summary
        //-----------------------------------
        if(location.indexOf("base.aspx?base=") != -1 || location.indexOf("map.aspx?loc=") !=-1 ) {
            if(getSetting(SUM_FLEETS_KEY, true)) {
                sumFleets();
                onFeatureComplete("Fleet Summary");
            }
        }

        //-----------------------------------
        //Calculate Pillage
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
        }
        //-----------------------------------
        //Show total fleet on individual summery
        //-----------------------------------

        if(location.indexOf("fleet.aspx?fleet=")!=-1 && location.indexOf('view=attack') == -1)
        {
            if(getSetting(SUM_FLEETS_KEY,true))
            {
                sumSingleFleet();
                onFeatureComplete("Single Fleet Summary");
            }
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
        if(document.location.href.match(/empire.aspx$/) || document.location.href.match(/empire.aspx\?view=bases_events$/) || document.location.href.match(/base.aspx$/))
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
                if(getSetting("structedittemp") == true) insertEditRows();
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
            if(location.indexOf('view=technologies')!=-1) {
                saveTechData();
                onFeatureComplete("Save tech data");
            }
        //-----------------------------------
        //Fleet Movement Reminder
        //-----------------------------------
        if(getSetting(TIME_HELPER_KEY,true)) {
            if(location.indexOf('view=move')!=-1) {
                insertArriveTimeTextBox();
            }

            if(getSetting(FLEET_REMINDER_KEY,true) && (getSetting("FleetReminders","-") != "-")) {
                insertFleetReminderCountdowns();
            }
            onFeatureComplete("Fleet reminder");
        }
        //-----------------------------------
        // Run new battlecalc simulation
        //-----------------------------------
        if (getSetting(SCRIPT_BATTLECALC_KEY,true) && location.indexOf('combat.aspx')!=-1 && isConfirmPage()) {
            try {
                runBattleCalc();
                onFeatureComplete("Built in Battlecalc");
            } catch (e) { console.log("battlecalc error: "+ e)}
        }
        //-----------------------------------
        // Scanner features
        //-----------------------------------
	  if(location.indexOf('view=scanners') != -1) {
		if(getSetting(REFRESH_PAGES_KEY,true))
			refreshScanner();
		if(getSetting(FORMAT_SCANNER_KEY, true))
			scannerFormat();
		onFeatureComplete("Scanner features");
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
               //if(location.indexOf('view=move') == -1)
		   if(location.indexOf("fleet") == -1) {
                   if(getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) || getSetting(HIGHLIGHT_PLAYERS_KEY,true)) {
                       highlightTradePartners();
                       onFeatureComplete("Highlight Links");
                   }
               }
               //Remove redirections
               if((location.indexOf('board.aspx')!=-1 || location.indexOf('guild.aspx')!=-1 || location.indexOf('profile.aspx')!=-1) && _site == "ae") {
                   if(getSetting(REMOVE_REDIRECT_KEY,true)) {
                       removeRedirects();
                       onFeatureComplete("Remove Redirects");
                   }
               }
               if (DEBUGNEWCODE && location.indexOf('guild.aspx')!=-1) discoverPacts();
          }
		  catch (e) {
              console.log ("General exception raised cp_ae_main: Ln-" + e.lineNumber + " - " + e);
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
                  if(getView()!="trade")
                  {
                      checkTradeDataAge();
                      onFeatureComplete("Check Trade Data Age");
                  }
              }
              checkForUpdates(false);
              onFeatureComplete("Update Check");
              checkBaseDataAge();
              onFeatureComplete("Check Base Data Age");
              checkGuildDataAge();
              onFeatureComplete("Check Guild Data Age");
             //            if (getView()!="technologies")
             //            {
             //                checkTechDataAge();
             //                onFeatureComplete("Check Tech Data Age");
             //            }
              if(location.indexOf('bookmarks.aspx')==-1 && location.indexOf('empire.aspx')==-1 && (getSetting(NAME_LOCATIONS_KEY,false) || DEBUGNEWCODE))
              {
                  replaceLocationNames();
                  onFeatureComplete("Named Locations");
              }
              // Setup timers as ae ones are messed up
              setupT();
           }
           else
           {
              if((getSetting(INSERT_MOVE_PRESETS_KEY,true) || DEBUGNEWCODE))
              {
                  insertMoveFleetLinks();
                  onFeatureComplete("Insert Move Fleet Presets");
              }
           }
        //  Main
            cp_ae_main();

        //  Footer

           // gia additions
           if((getSetting(QUICK_BOOKMARKS_KEY,false) || DEBUGNEWCODE) && location.match(/astroempires.com/)) initRightMenu();

           if((getSetting(QUICK_BOOKMARKS_KEY,false) || DEBUGNEWCODE) && location.match(/view=scanners/)) displayQuickMarks();
            //Show Execution Times
            if(getSetting(SHOW_EXECUTION_TIME_KEY,false) || DEBUGNEWCODE) displayTimes();

        } else if (_site == "battlecalc") {
            // Clean iframes, probably not needed now but left in for security
            document.addEventListener('load',function() { cleanAdverts('IFRAME')},false);
            document.addEventListener('load',function() { cleanAdverts('iframe')},false);

           // Battle Calculator
           if(location.indexOf("calculator.php")!=-1)
           {
               try
               {
                   //console.log("On battle calc page");
                   if(getSetting(PREFILL_BATTLE_CALC_KEY,true))
                   {
                       if(getSetting("attacking",false))
                       {
                           window.addEventListener('load',function(){fillAttackFleetBattleCalc();fillEnemyFleetBattleCalc(true);setSetting("attacking",false);},true);
                           onFeatureComplete("Fill Enemy & Attack Fleet Quantities");
                       }
                       else if(getSetting("previewing",false))
                       {
                           window.addEventListener('load',function() {fillEnemyFleetBattleCalc(false);setSetting("previewing",false);},true);
                           onFeatureComplete("Fill Enemy Fleet");
                       }
                   }
                   if(getSetting(FILL_TECH_DATA_KEY,true))
                   {
                       window.addEventListener(
                       'load',
                       function() {
                           fillTechDataOnBattleCalc();
                       }
                       ,true);
                       onFeatureComplete("Fill Attack Tech Data");
                   }
               }
               catch(e)
               {
               console.log("Line Number: "+e.lineNumber+"\n fillbattlecalc: "+e);
               }
           }
        }
    }
try { cp_ae_initalisation() } catch (e) {
    console.error ("\n General error: "+e+"\nLine Number: "+e.lineNumber);
}

//notify("test error","notifierError");
//notify("test","notifier");

